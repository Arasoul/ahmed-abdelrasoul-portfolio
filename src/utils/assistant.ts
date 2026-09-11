import { projects } from '../data/projects'
import { currentExperiences, pastExperiences } from '../data/experience'
import { capabilityGroups } from '../data/skills'
import { personalInfo } from '../data/personal'
import { certifications } from '../data/certifications'
import { projectTopics } from './projectTopics'
import type { Project, Experience as ExperienceEntry } from '../types'

export interface AssistantReference {
  id: string
  label: string
  kind: 'project' | 'section'
}

export interface AssistantAnswer {
  text: string
  references?: AssistantReference[]
}

const stopwords = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'be', 'to', 'of', 'in', 'on', 'at', 'for',
  'and', 'or', 'but', 'it', 'that', 'this', 'what', 'which', 'who', 'how', 'with',
  'about', 'from', 'his', 'her', 'he', 'she', 'they', 'them', 'tell', 'me', 'show',
  'list', 'does', 'do', 'did', 'can', 'could', 'would', 'some', 'any', 'you', 'ive',
  'im', 'has', 'have', 'there', 'their', 'by', 'as', 'your', 'please', 'more',
])

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter((w) => !stopwords.has(w) && w.length > 1)
}

function hasAny(input: string, words: string[]): boolean {
  const q = input.toLowerCase()
  return words.some((w) => q.includes(w))
}

const ecoIds = ['auto-eda', 'data-prep-toolkit', 'auto-bi', 'web-scraping-toolkit']
const flagshipIds = ['ai-pharaoh', 'meridian-wings', 'auto-bi']

function projectRef(project: Project): AssistantReference {
  return { id: project.id, label: project.title, kind: 'project' }
}

function describeProject(project: Project): string {
  const parts = [
    `${project.title} — ${project.overview}`,
    project.impact ? `Impact: ${project.impact}` : '',
  ].filter(Boolean)
  return parts.join('\n\n')
}

function projectSearchScore(project: Project, terms: string[]): number {
  const title = project.title.toLowerCase()
  const overview = project.overview.toLowerCase()
  const features = (project.features ?? []).join(' ').toLowerCase()
  const tech = project.technologies.join(' ').toLowerCase()
  const category = project.category.replace(/-/g, ' ')

  let score = 0
  for (const term of terms) {
    if (title.includes(term)) score += 6
    else if (title.split(/[^a-z0-9]/).includes(term)) score += 8
    if (overview.includes(term)) score += 3
    if (tech.includes(term)) score += 3
    if (category.includes(term)) score += 2
    if (features.includes(term)) score += 2
  }
  return score
}

function generalSearch(query: string): AssistantAnswer[] {
  const terms = tokenize(query)
  if (!terms.length) return []
  const ranked = projects
    .map((p) => ({ p, score: projectSearchScore(p, terms) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)

  if (!ranked.length) return []

  const top = ranked.slice(0, 3)
  return [{
    text: `Systems matching "${query}":\n\n${top.map((r) => `• ${r.p.title} — ${r.p.overview}`).join('\n\n')}`,
    references: top.map((r) => projectRef(r.p)),
  }]
}

const suggestions: string[] = [
  'Which project best demonstrates computer vision?',
  'Compare AutoEDA and AutoAnalytics',
  'Why is AutoBI deterministic?',
  'Which systems run locally?',
  'What does Ahmed use n8n for?',
  'Which project involves optimization?',
  'What engineering evidence exists for AutoEDA?',
]

export function answer(query: string): AssistantAnswer {
  const q = query.trim()

  if (!q) {
    return {
      text: `I can answer questions from Ahmed's portfolio knowledge base — systems, data tooling, experience, skills, and credentials.\n\nTry asking about a project ("explain AutoBI"), a topic ("computer vision", "optimization", "automation"), or his current work.`,
    }
  }

  // Greeting / help
  if (hasAny(q, ['hi', 'hello', 'hey', 'help', 'guidance', 'who are you', 'what can you'])) {
    return {
      text: `This is Portfolio Intelligence — a retrieval interface over Ahmed's actual portfolio data.\n\nTry:\n${suggestions.map((s) => `• ${s}`).join('\n')}`,
      references: [{ id: 'systems', label: 'Browse the systems index', kind: 'section' }],
    }
  }

  // Current work
  if (hasAny(q, ['currently', 'working on', 'doing now', 'now building', 'right now', 'focus', 'productiz', 'automation trainee'])) {
    const current = currentExperiences
    return {
      text: `Ahmed is building intelligent systems while expanding practical expertise in AI-powered automation. He is currently:\n\n${current.map((e) => `• ${e.role} — ${e.company} (${e.period})`).join('\n')}\n\nHe is also moving completed data and AI systems (AutoBI, AutoEDA, AutoAnalytics, DataPrepToolkit, Web Scraping Toolkit) toward productization and public release.`,
      references: [
        { id: 'now', label: 'Current work', kind: 'section' },
        { id: 'experience', label: 'Experience', kind: 'section' },
      ],
    }
  }

  // Experience / roles
  if (hasAny(q, ['experience', 'career', 'job', 'role', 'roles', 'teaching', 'ta ', 'depi', 'internship', 'assistant', 'work history', 'employed'])) {
    const typeWord = (t: ExperienceEntry['type']) =>
      t === 'full-time' ? 'Full-time' : t === 'internship' ? 'Internship' : 'Co-Founder'
    return {
      text: `Ahmed's current roles:\n\n${currentExperiences.map((e) => `• ${e.role} — ${e.company} (${typeWord(e.type)}, ${e.period})\n  ${e.overview ?? ''}`).join('\n\n')}\n\nEarlier: ${pastExperiences.map((e) => `${e.role} (${e.company})`).join(', ')}.`,
      references: [{ id: 'experience', label: 'See the Experience section', kind: 'section' }],
    }
  }

  // Skills / technologies
  if (hasAny(q, ['skills', 'technologies', 'stack', 'tools does', 'languages', 'libraries', 'tech stack', 'proficient', 'expertise', 'knowledge'])) {
    return {
      text: `Ahmed works across:\n\n${capabilityGroups.map((g) => `• ${g.title}: ${g.skills.map((s) => s.name).join(', ')}`).join('\n\n')}\n\nThe full breakdown is in the Engineering section.`,
      references: [{ id: 'engineering', label: 'Engineering', kind: 'section' }],
    }
  }

  // Education / credentials
  if (hasAny(q, ['education', 'degree', 'certif', 'study', 'studies', 'academic', 'university', 'credentials', 'learn'])) {
    return {
      text: `Education: ${personalInfo.education.map((e) => `${e.degree} — ${e.institution}`).join(', ')}.\n\nSelected credentials: ${certifications.slice(0, 6).map((c) => c.title + ' (' + c.issuer + ')').join('; ')}.`,
      references: [{ id: 'experience', label: 'Credentials', kind: 'section' }],
    }
  }

  // Contact
  if (hasAny(q, ['contact', 'email', 'reach', 'hire', 'connect', 'message', 'phone'])) {
    return {
      text: `You can reach Ahmed at ${personalInfo.email}, or via LinkedIn (${personalInfo.linkedin}). The contact section has a direct form.`,
      references: [{ id: 'connect', label: 'Connect', kind: 'section' }],
    }
  }

// AutoBI deterministic / not an LLM
  if (hasAny(q, ['deterministic', 'run locally', 'local', 'offline', 'api key', 'llm', 'auto-bi off', 'sum', 'identifier', 'numeric'])) {
    const autoBI = projects.find((p) => p.id === 'auto-bi')
    return {
      text: [
        'AutoBI is deliberately deterministic and offline.',
        '',
        '- Runs locally: no API key, no cloud, no LLM requirement.',
        '- Uses semantic column roles (identifier, measure, dimension, temporal dimension) to reason about the dataframe.',
        '- Enforces the principle "Numeric is not a Meaningful Measure": SUM(customer_id) is rejected because customer_id behaves as an identifier, not a measure.',
        '- Validated across 32 dataset cases, with an HTML dashboard export path.',
        '',
        'Note: AutoBI is a separate system from this Portfolio Intelligence assistant. This assistant may use an LLM; AutoBI deliberately does not.',
      ].join('\n'),
      references: autoBI ? [projectRef(autoBI)] : [],
    }
  }

  // Strongest / best data project
  if (hasAny(q, ['strongest', 'best project', 'most impressive', 'favorite', 'greatest data', 'top project', 'key system'])) {
    const autoBI = projects.find((p) => p.id === 'auto-bi')
    const pharaoh = projects.find((p) => p.id === 'ai-pharaoh')
    const mw = projects.find((p) => p.id === 'meridian-wings')
    if (autoBI && pharaoh) {
      return {
        text: `Two systems stand out:\n\n• ${autoBI.title} — a data-intelligence system validated across 32 dataset cases that turns raw numeric data into decision-ready dashboards (semantic understanding → KPI selection → adaptive dashboards).\n\n• ${pharaoh.title} — an end-to-end vision + NLP system for hieroglyphs, trained on 40K+ files across 1,080 classes.\n\nAnd Meridian Wings demonstrates decision-support under uncertainty (+$2.46M vs a naive baseline).`,
        references: [projectRef(autoBI), projectRef(pharaoh), ...(mw ? [projectRef(mw)] : [])],
      }
    }
  }

  // "what has he built / projects / tools" — list
  if (hasAny(q, ['built', 'build', 'create', 'portfolio of', 'all your projects', 'what projects', 'what tools', 'list of', 'overview of', 'many projects', 'systems has'])) {
    const flagships = flagshipIds.map((id) => projects.find((p) => p.id === id)).filter((p): p is Project => Boolean(p))
    const tools = ecoIds.map((id) => projects.find((p) => p.id === id)).filter((p): p is Project => Boolean(p))
    return {
      text: `Ahmed has built ${projects.length} completed systems. The strongest:\n\n${flagships.map((p) => `• ${p.title} — ${p.overview}`).join('\n\n')}\n\nData-intelligence tooling:\n\n${tools.map((p) => `• ${p.title} — ${p.overview}`).join('\n\n')}\n\nEverything else (games, engineering, networking, algorithms) is in the full systems index.`,
      references: flagships.map(projectRef),
    }
  }

  // Topic: computer vision
  if (hasAny(q, ['computer vision', 'vision', 'image', 'object detection', 'segmentation', 'face', 'hieroglyph', 'recognition'])) {
    const refs = projectTopics.find((t) => t.id === 'computer-vision')
    const list = refs?.projectIds.map((id) => projects.find((p) => p.id === id)).filter((p): p is Project => Boolean(p)) ?? []
    return {
      text: `Computer vision work:\n\n${list.map((p) => `• ${p.title} — ${p.overview}`).join('\n\n')}`,
      references: list.map(projectRef),
    }
  }

  // Topic: optimization / decisions
  if (hasAny(q, ['optimization', 'milo', 'milp', 'mathematical programming', 'network planning', 'routes', 'decision system', 'scheduling', 'optimal'])) {
    const mw = projects.find((p) => p.id === 'meridian-wings')
    const refs = projectTopics.find((t) => t.id === 'optimization')
    const list = (refs?.projectIds ?? []).map((id) => projects.find((p) => p.id === id)).filter((p): p is Project => Boolean(p))
    return {
      text: `Optimization & decision systems:\n\n${list.map((p) => `• ${p.title} — ${p.overview}\n  ${p.metric ?? ''}`.trim()).join('\n\n')}${mw ? `\n\n${mw.title} uses MILP optimization to plan a route network under uncertainty.` : ''}`,
      references: list.map(projectRef),
    }
  }

  // Topic: data / analytics / statistics
  if (hasAny(q, ['data', 'analytics', 'analysis', 'statistic', 'eda', 'dashboard', 'preprocessing', 'clean', 'tabular', 'dataset', 'report', 'bi'])) {
    const topicIds = ['data', 'analytics']
    let list = projects.filter((p) => topicIds.some((t) => projectTopics.find((x) => x.id === t)?.projectIds.includes(p.id)))
    const unique = new Map(list.map((p) => [p.id, p]))
    list = [...unique.values()]
    const topList = list.filter((p) => ['auto-bi', 'auto-eda', 'auto-analytics', 'data-prep-toolkit', 'web-scraping-toolkit'].includes(p.id))
    return {
      text: `Data & analytics systems:\n\n${topList.map((p) => `• ${p.title} — ${p.overview}`).join('\n\n')}\n\nAutoEDA is a deterministic analytical system (187 tests passing · 92.5% coverage) — it automates repetitive analysis without hiding the statistical reasoning.`,
      references: topList.map(projectRef),
    }
  }

  // Topic: automation / workflows / n8n / agents
  if (hasAny(q, ['automation', 'workflow', 'n8n', 'agents', 'api', 'integration', 'pipeline', 'automate', 'process'])) {
    const refs = projectTopics.find((t) => t.id === 'automation')
    const list = (refs?.projectIds ?? []).map((id) => projects.find((p) => p.id === id)).filter((p): p is Project => Boolean(p))
    return {
      text: `Automation & workflow engineering:\n\n${list.map((p) => `• ${p.title} — ${p.overview}`).join('\n\n')}\n\nCurrently Ahmed is applying n8n, AI agents, API integration, and prompt engineering in the DEPI AI Automation program — see the Experience section.`,
      references: [...list.map(projectRef), { id: 'experience', label: 'Experience', kind: 'section' }],
    }
  }

  // Topic: AI / ML broadly
  if (hasAny(q, ['machine learning', 'ai ', ' ml ', 'deep learning', 'neural', 'model', 'training', 'pytorch', 'tensorflow', 'artificial intelligence'])) {
    const refs = projectTopics.find((t) => t.id === 'ai-ml')
    const list = (refs?.projectIds ?? []).map((id) => projects.find((p) => p.id === id)).filter((p): p is Project => Boolean(p))
    return {
      text: `AI / machine learning systems:\n\n${list.map((p) => `• ${p.title} — ${p.overview}`).join('\n\n')}`,
      references: list.map(projectRef),
    }
  }

  // Specific project reference (by title match)
  const exact = projects.find((p) => tokenize(p.title).some((t) => tokenize(q).includes(t)))
  const titleHit = projects.find((p) => q.toLowerCase().includes(p.title.toLowerCase().split(/[^a-z0-9]/)[0]))
  const target = exact ?? titleHit
  if (target && hasAny(q, [...tokenize(q), 'explain', 'what is', 'tell', 'about'])) {
    return {
      text: `${describeProject(target)}\n\nStatus: ${target.status === 'complete' ? 'COMPLETED' : target.status}\n${target.metric ? `Verifiable evidence: ${target.metric}` : ''}`.trim(),
      references: [projectRef(target)],
    }
  }

  // Topic labels used directly ("AI / ML", "data", "automation", "optimization", "analytics", "computer vision")
  const askedTopic = projectTopics.find((t) => q.toLowerCase().includes(t.label.toLowerCase()))
  if (askedTopic) {
    const list = askedTopic.projectIds.map((id) => projects.find((p) => p.id === id)).filter((p): p is Project => Boolean(p))
    return {
      text: `${askedTopic.label} — ${askedTopic.hint ?? ''}\n\n${list.map((p) => `• ${p.title} — ${p.overview}`).join('\n\n')}`,
      references: list.map(projectRef),
    }
  }

  // General keyword search
  const searchResults = generalSearch(q)
  if (searchResults.length) return searchResults[0]

  return {
    text: `I couldn't match that against the portfolio knowledge base.\n\nTry one of these:\n${suggestions.map((s) => `• ${s}`).join('\n')}\n\nor ask about a specific system, topic, or skill.`,
  }
}

export { suggestions }

export const assistantSourceNote = 'LOCAL RETRIEVAL · PORTFOLIO KNOWLEDGE BASE'