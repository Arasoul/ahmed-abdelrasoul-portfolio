import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSend, FiX, FiCornerUpLeft, FiCpu } from 'react-icons/fi'
import { answer, suggestions, assistantSourceNote } from '../../utils/assistant'
import type { AssistantReference } from '../../utils/assistant'
import { streamChat, llmConfigured, topReferences } from '../../utils/llm'
import { projects } from '../../data/projects'
import { scrollToHash } from '../../utils/scroll'
import { useFocusTrap } from '../../hooks/useFocusTrap'

interface Message {
  id: number
  role: 'user' | 'assistant'
  text: string
  references?: AssistantReference[]
}

let messageId = 0

const welcome: Message = {
  id: ++messageId,
  role: 'assistant',
  text: `I can answer questions from Ahmed's portfolio knowledge base — systems, data tooling, experience, skills, and credentials.\n\nAsk about a system ("explain AutoBI"), a topic ("computer vision", "optimization"), or his current work.`,
}

function referenceTarget(ref: AssistantReference): string {
  if (ref.kind === 'section') return `#${ref.id}`
  return `/projects/${ref.id}`
}

export default function PortfolioAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([welcome])
  const [streaming, setStreaming] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const llmMode = llmConfigured()

  useFocusTrap(panelRef, open, () => setOpen(false))

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 60)
      return () => window.clearTimeout(t)
    }
  }, [open])

  const buildRefs = useCallback((raw: string): AssistantReference[] => {
    const t = topReferences(raw, 3)
    const projectRefs: AssistantReference[] = t.projects
      .slice(0, 3)
      .map((id) => projects.find((p) => p.id === id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .map((p) => ({ id: p.id, label: p.title, kind: 'project' }))
    const sectionRefs: AssistantReference[] = t.sections.map((s) => ({ id: s.id, label: s.label, kind: 'section' }))
    return [...projectRefs, ...sectionRefs]
  }, [])

  const ask = useCallback(async (raw: string) => {
    const text = raw.trim()
    if (!text || streaming) return
    setInput('')
    setMessages((m) => [...m, { id: ++messageId, role: 'user', text }])

    if (!llmMode) {
      const result = answer(text)
      setMessages((m) => [...m, { id: ++messageId, role: 'assistant', text: result.text, references: result.references }])
      return
    }

    const asstId = ++messageId
    setMessages((m) => [...m, { id: asstId, role: 'assistant', text: '', references: buildRefs(text) }])
    setStreaming(true)
    try {
      let acc = ''
      for await (const chunk of streamChat(text)) {
        acc += chunk
        setMessages((m) => m.map((msg) => (msg.id === asstId ? { ...msg, text: acc } : msg)))
      }
      if (!acc) {
        setMessages((m) =>
          m.map((msg) => (msg.id === asstId ? { ...msg, text: '(No response was returned. Check the LLM configuration, then try again.)' } : msg))
        )
      }
    } catch {
      const fallback = answer(text)
      setMessages((m) =>
        m.map((msg) =>
          msg.id === asstId
            ? { ...msg, text: fallback.text, references: fallback.references }
            : msg
        )
      )
    } finally {
      setStreaming(false)
    }
  }, [streaming, llmMode, buildRefs])

  const openReference = useCallback((ref: AssistantReference) => {
    setOpen(false)
    const target = referenceTarget(ref)
    window.setTimeout(() => {
      if (target.startsWith('/')) {
        navigate(target)
        return
      }
      scrollToHash(target, 60)
    }, 60)
  }, [navigate])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="pa-trigger"
        aria-expanded={open}
        aria-controls="portfolio-assistant-panel"
      >
        {open ? <FiX size={16} /> : <FiCpu size={16} />}
        {!open && <span className="pa-trigger-label">ASK THE PORTFOLIO</span>}
      </button>

      {open && (
        <div id="portfolio-assistant-panel" role="dialog" aria-label="Portfolio intelligence assistant"
          className="pa-panel" ref={panelRef}>
          <header className="pa-header">
            <div>
              <p className="pa-title"><span className="pa-caret">▸</span> PORTFOLIO INTELLIGENCE</p>
              <p className="pa-note">
                {llmMode ? 'LLM-ENHANCED · RETRIEVAL + GENERATION' : `${assistantSourceNote} · NO GENERATIVE AI`}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" className="pa-icon-btn" onClick={() => openReference({ id: 'systems', label: 'Systems', kind: 'section' })} aria-label="Go to systems">
                <FiCornerUpLeft size={13} />
              </button>
              <button type="button" className="pa-icon-btn" onClick={() => setOpen(false)} aria-label="Close assistant">
                <FiX size={14} />
              </button>
            </div>
          </header>

          <div ref={listRef} className="pa-scroll">
{messages.map((m) => (
                  <div key={m.id} className={m.role === 'user' ? 'pa-msg pa-msg--user' : 'pa-msg'}>
                    <p className="pa-text">{m.text}</p>
                    {m.references && m.references.length > 0 && (
                      <div className="pa-refs">
                        {m.references.map((r) => (
                          <button key={r.kind + r.id} type="button" className="pa-ref" onClick={() => openReference(r)}>
                            {r.kind === 'section' ? '§ ' : '› '}{r.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {streaming && (
                  <div className="pa-msg">
                    <p className="pa-text pa-typing" aria-label="Assistant is typing">
                      <span /><span /><span />
                    </p>
                  </div>
                )}
              </div>

          <div className="pa-suggest">
            {suggestions.map((s) => (
              <button key={s} type="button" className="pa-chip" onClick={() => ask(s)}>{s}</button>
            ))}
          </div>

          <form className="pa-input" onSubmit={(e) => { e.preventDefault(); ask(input) }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about systems, topics, skills…"
              aria-label="Ask the portfolio"
            />
            <button type="submit" className="pa-send" aria-label="Send question" disabled={!input.trim() || streaming}>
              <FiSend size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}