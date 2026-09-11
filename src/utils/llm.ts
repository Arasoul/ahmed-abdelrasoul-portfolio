import { projects } from '../data/projects'
import { experiences } from '../data/experience'
import { capabilityGroups } from '../data/skills'
import { personalInfo } from '../data/personal'

/**
 * Serverless LLM transport for PORTFOLIO INTELLIGENCE.
 *
 * The API key never ships to the browser. The client POSTs an OpenAI-style
 * message list to /api/portfolio-ai (a serverless function). The function
 * attaches the private key server-side and streams the completion back.
 *
 * Server-side environment (e.g. Vercel environment variables — never prefixed
 * with VITE_):
 *   LLM_ENDPOINT=https://api.openai.com/v1/chat/completions
 *   LLM_API_KEY=sk-...
 *   LLM_MODEL=gpt-4o-mini
 *
 * Client-side public flag (no secret — just switches the UI between modes):
 *   VITE_LLM_ENABLED=true
 *
 * When the function is disabled or unreachable, the assistant falls back to
 * the local structured retrieval engine — the site keeps working.
 */

export function llmConfigured(): boolean {
  return import.meta.env.VITE_LLM_ENABLED === 'true'
}

const assistantEndpoint = () =>
  `${(import.meta.env.BASE_URL ?? '/').replace(/\/$/, '')}/api/portfolio-ai`

export function buildSystemPrompt(): string {
  const tools = projects.map(
    (p) =>
      `- ${p.title} (${p.status?.toUpperCase() ?? 'COMPLETE'}) ${p.metric ? `[${p.metric}] ` : ''}— ${p.overview}`
  ).join('\n')

  const work = experiences
    .map((e) => `- ${e.role} @ ${e.company} (${e.period})${e.focus ? ' — focus: ' + e.focus.map((f) => f.title).join(', ') : ''}`)
    .join('\n')

  const skills = capabilityGroups
    .map((g) => `${g.title}: ${g.skills.map((s) => s.name).join(', ')}`)
    .join('\n')

  return `You are PORTFOLIO INTELLIGENCE — the AI assistant for Ahmed Abdelrasoul's engineering portfolio.

ROLE: Answer questions about Ahmed's systems, experience, capabilities, and projects. The visitor wants to understand what he builds, how it works, and what problems it solves. Be specific, technical, and concise (60-90 words). Do not invent metrics, projects, responsibilities, or URLs. If the portfolio data does not cover a topic, say what the data shows and stop.

PORTFOLIO CONTEXT:
NAME: ${personalInfo.name} — ${personalInfo.title}
MOTTO: ${personalInfo.motto}

COMPLETED SYSTEMS:
${tools}

CURRENT EXPERIENCE:
${work}

CAPABILITIES:
${skills}

AVAILABLE SECTIONS: ${personalInfo.availability.join(', ')}`
}

export function topReferences(query: string, limit = 3) {
  const q = query.toLowerCase()
  const scored = projects
    .map((p) => {
      const hay = `${p.title} ${p.overview} ${p.features?.join(' ')} ${p.technologies.join(' ')} ${p.category}`.toLowerCase()
      let score = 0
      for (const word of q.replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length > 2)) {
        if (hay.includes(word)) score += 1
      }
      if (p.title.toLowerCase().split(' ').some((w) => q.includes(w))) score += 3
      return { p, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  const sectionHits: { id: string; label: string }[] = []
  if (/experience|currently|working on|do(i|ing) (at|for) now/i.test(q)) {
    sectionHits.push({ id: 'experience', label: 'Experience' })
  }
  if (/skill|technolog|stack|tools do/i.test(q)) sectionHits.push({ id: 'engineering', label: 'Engineering' })
  if (/certif|educat|credential|degree/i.test(q)) sectionHits.push({ id: 'experience', label: 'Credentials' })
  if (/contact|hire|email|reach/i.test(q)) sectionHits.push({ id: 'connect', label: 'Connect' })
  if (/system|project|build|tool/i.test(q)) sectionHits.push({ id: 'systems', label: 'Systems Index' })

  return {
    sections: [...new Set(sectionHits)],
    projects: scored.map((r) => r.p.id),
  }
}

export function retrieveCorpus(query: string): string {
  const refs = topReferences(query, 4)
  const sample = projects.filter((p) => refs.projects.includes(p.id))
  const extra = sample.length < 3 ? projects.filter((p) => !refs.projects.includes(p.id)).slice(0, 3 - sample.length) : []
  const corpus = [...sample, ...extra].slice(0, 4)
  return corpus
    .map((c) => `${c.title} — ${c.overview}${c.metric ? ` Evidence: ${c.metric}.` : ''}`)
    .join('\n')
}

/** Stream a chat completion through the serverless proxy. */
export async function* streamChat(userQuery: string): AsyncGenerator<string> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), 45_000)
  try {
    const resp = await fetch(assistantEndpoint(), {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          {
            role: 'user',
            content: `Portfolio retrieval (use to support your answer):\n${retrieveCorpus(userQuery)}\n\nQUESTION: ${userQuery}`,
          },
        ],
      }),
    })

    if (!resp.ok || !resp.body) {
      const detail = await resp.text().catch(() => '')
      throw new Error(`LLM request failed (${resp.status}) ${detail.slice(0, 200)}`)
    }

    const reader = resp.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let yielded = false

    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const raw of lines) {
        const line = raw.trim()
        if (!line.startsWith('data:')) continue
        const payload = line.slice(5).trim()
        if (payload === '[DONE]') return
        try {
          const parsed = JSON.parse(payload)
          const delta = parsed.choices?.[0]?.delta?.content
          if (typeof delta === 'string' && delta.length > 0) {
            yielded = true
            yield delta
          }
        } catch {
          // ignore keep-alive / partial frames
        }
      }
    }

    // Non-SSE fallback: a full-JSON response (no streaming support on the server).
    if (!yielded) {
      const trimmed = buffer.trim().startsWith('{') ? buffer : buffer.slice(buffer.indexOf('{'))
      const parsed = JSON.parse(trimmed)
      const content = parsed.choices?.[0]?.message?.content
      if (typeof content === 'string') yield content
    }
  } finally {
    window.clearTimeout(timer)
  }
}