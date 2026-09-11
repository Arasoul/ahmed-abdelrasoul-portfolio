import type { IncomingMessage, ServerResponse } from 'node:http'

const ALLOWED_ORIGINS: string[] = [
  ...(process.env.ALLOWED_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean),
  'https://arasoul.dev',
  'http://localhost:5173',
]

const MAX_BODY_BYTES = 100_000
const MAX_MESSAGES = 8
const MAX_MESSAGE_LENGTH = 8_000

async function readBody(req: IncomingMessage): Promise<string> {
  let body = ''
  for await (const chunk of req) {
    body += chunk
    if (body.length > MAX_BODY_BYTES) {
      throw new Error('Request body too large')
    }
  }
  return body
}

function isValidMessage(m: unknown): boolean {
  if (typeof m !== 'object' || m === null) return false
  const msg = m as Record<string, unknown>
  if (msg.role !== 'system' && msg.role !== 'user' && msg.role !== 'assistant') return false
  return typeof msg.content === 'string' && msg.content.length <= MAX_MESSAGE_LENGTH
}

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.end()
    return
  }

  const origin = req.headers.origin
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    res.statusCode = 403
    res.end()
    return
  }

  const endpoint = process.env.LLM_ENDPOINT ?? 'https://api.openai.com/v1/chat/completions'
  const apiKey = process.env.LLM_API_KEY ?? ''
  const model = process.env.LLM_MODEL ?? 'gpt-4o-mini'

  if (!apiKey) {
    res.statusCode = 503
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'LLM not configured on the server' }))
    return
  }

  let payload: { messages?: unknown }
  try {
    payload = JSON.parse(await readBody(req))
  } catch {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Invalid request' }))
    return
  }

  const messages = payload.messages
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > MAX_MESSAGES ||
    !messages.every(isValidMessage)
  ) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Invalid messages payload' }))
    return
  }

  let upstream: Response
  try {
    upstream = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        stream: true,
        temperature: 0.3,
        messages,
      }),
    })
  } catch {
    res.statusCode = 502
    res.end()
    return
  }

  if (!upstream.ok) {
    res.statusCode = upstream.status
    res.end()
    return
  }

  if (!upstream.body) {
    res.statusCode = 502
    res.end()
    return
  }

  res.writeHead(200, {
    'Content-Type': upstream.headers.get('content-type') ?? 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
  })

  const reader = upstream.body.getReader()
  try {
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      res.write(Buffer.from(value))
    }
  } finally {
    reader.releaseLock()
  }
  res.end()
}