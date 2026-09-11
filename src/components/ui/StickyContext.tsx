import { chapters } from '../../data/chapters'
import { useActiveChapter } from '../../hooks/useActiveChapter'

const context: Record<string, { label: string; context?: string; mode?: string }> = {
  origin: { label: 'IDENTITY', context: 'ORIGIN' },
  map: { label: 'DOMAIN MAP' },
  systems: { label: 'SYSTEMS', context: 'SYSTEM DIRECTORY', mode: 'BROWSE' },
  experience: { label: 'EXPERIENCE', context: 'CREDENTIALS' },
  engineering: { label: 'ENGINEERING', context: 'CAPABILITIES & METHOD' },
  now: { label: 'CURRENT FOCUS' },
  connect: { label: 'CONNECT', mode: 'BUILD TOGETHER' },
}

const sections = chapters.map((ch) => ({
  id: ch.id,
  ...(context[ch.id] ?? { label: ch.label }),
}))

export default function StickyContext() {
  const active = useActiveChapter()

  const idx = sections.findIndex((s) => s.id === active)
  const current = sections[idx]

  return (
    <aside className="sticky-context" aria-hidden="true">
      <div className="sticky-context-inner">
        <div className="sticky-context-num">
          {String(idx + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
        </div>
        <div className="sticky-context-label">{current?.label}</div>
        {current?.context && (
          <div className="sticky-context-row">
            <span className="sticky-context-k">CONTEXT</span>
            <span className="sticky-context-v">{current.context}</span>
          </div>
        )}
        {current?.mode && (
          <div className="sticky-context-row">
            <span className="sticky-context-k">MODE</span>
            <span className="sticky-context-v">{current.mode}</span>
          </div>
        )}
      </div>
    </aside>
  )
}