import { useEffect, useRef, useState } from 'react'
import { FiPlay, FiPause } from 'react-icons/fi'

interface Stage {
  label: string
  note: string
}

const stages: Stage[] = [
  { label: 'DATAFRAME', note: 'raw numeric table enters' },
  { label: 'SEMANTIC UNDERSTANDING', note: 'assign meaning to each column' },
  { label: 'MEASURE SAFETY', note: 'SUM(customer_id) is rejected' },
  { label: 'KPI SELECTION', note: 'SUM(revenue) selected' },
  { label: 'DIMENSION SELECTION', note: 'region' },
  { label: 'VISUALIZATION SELECTION', note: 'bar chart · region × revenue' },
  { label: 'ADAPTIVE DASHBOARD', note: 'decision-ready output' },
]

const columns = [
  { name: 'customer_id', role: 'IDENTIFIER', safe: false },
  { name: 'revenue', role: 'MEASURE', safe: true },
  { name: 'region', role: 'DIMENSION', safe: true },
  { name: 'units', role: 'MEASURE', safe: true },
]

function Bars({ active }: { active: boolean }) {
  const bars = [42, 68, 31, 55, 79, 47]
  return (
    <div className="flex items-end gap-1.5" style={{ height: 84 }}>
      {bars.map((h, i) => (
        <div
          key={i}
          className="dash-bar"
          style={{
            height: `${h}%`,
            opacity: active ? 1 : 0.35,
            transitionDelay: `${i * 80}ms`,
          }}
        />
      ))}
    </div>
  )
}

export default function AutoBIPipeline() {
  const [stage, setStage] = useState(0)
  const [playing, setPlaying] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useRef(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      inView.current = e.isIntersecting
    }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      if (!inView.current) return
      setStage((s) => (s + 1) % stages.length)
    }, 1500)
    return () => window.clearInterval(id)
  }, [playing])

  const active = stage >= 1
  const rejected = stage >= 2
  const kpi = stage >= 3
  const dashboard = stage >= 6

  return (
    <div ref={rootRef} className="autobi-visual">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="term-bracket">PIPELINE</span>
          <span className="font-mono text-[10px] text-muted">7 STAGES · AUTO</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-[9px] uppercase tracking-widest text-muted sm:inline">
            deterministic · offline · no LLM
          </span>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="pa-icon-btn"
            aria-label={playing ? 'Pause animation' : 'Play animation'}
          >
            {playing ? <FiPause size={13} /> : <FiPlay size={13} />}
          </button>
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          {/* stage rail */}
          <div className="flex flex-col items-center gap-0.5 py-1">
            {stages.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setStage(i)}
                className="rail-dot"
                style={{
                  background: i <= stage ? 'var(--accent)' : 'var(--border-subtle)',
                  boxShadow: i <= stage && !dashboard ? '0 0 0 3px var(--accent-primary-10)' : undefined,
                }}
                aria-label={s.label}
              />
            ))}
          </div>

          {/* active stage content */}
          <div className="min-w-0 flex-1">
            <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-accent">
              STAGE {String(stage + 1).padStart(2, '0')} · {stages[stage].label}
            </div>
            <p className="text-[11px] leading-relaxed text-secondary">{stages[stage].note}</p>

            {!dashboard && (
              <div className="mt-3">
                {stage === 0 && (
                  <div className="grid grid-cols-2 gap-1.5">
                    {columns.map((c) => (
                      <div key={c.name} className="dash-chip">[{c.name}]</div>
                    ))}
                  </div>
                )}
                {active && (
                  <div className="space-y-1.5">
                    {columns.filter((c) => c.name !== 'units').map((c) => (
                      <div key={c.name} className="flex items-center gap-2">
                        <span className="dash-chip">{c.name}</span>
                        <span className="text-[9px] text-muted">&rarr;</span>
                        <span className={`role-chip ${!c.safe && rejected ? 'role-chip--reject' : ''}`}>{c.role}</span>
                        {!c.safe && rejected && (
                          <span className="reject-tag">SUM({c.name}) REJECTED</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {rejected && (
                  <p className="reject-note">
                    <span className="font-semibold text-red-400">Numeric &ne; Meaningful Measure.</span>{' '}
                    An identifier is not a metric.
                  </p>
                )}
                {kpi && (
                  <p className="mt-2 font-mono text-[10px] text-accent">
                    KPI: SUM(revenue) · DIM : region
                  </p>
                )}
              </div>
            )}

            {dashboard && (
              <div className="rounded-lg border p-3" style={{ borderColor: 'var(--border-accent)', background: 'var(--bg-surface)' }}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-accent">Adaptive dashboard</span>
                  <span className="font-mono text-[9px] text-muted">illustrative</span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <Bars active />
                  <div className="flex flex-col gap-1 text-right">
                    <span className="font-mono text-lg font-bold text-accent">$2.4M</span>
                    <span className="text-[9px] uppercase tracking-wider text-muted">KPI · revenue</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}