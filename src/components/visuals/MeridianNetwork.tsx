import { useEffect, useRef, useState } from 'react'

const N = 12
const CX = 300
const CY = 180
const RX = 240
const RY = 120

interface Node {
  x: number
  y: number
  } 

function buildNodes(): Node[] {
  const pts: Node[] = []
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2
    pts.push({ x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) })
  }
  pts.push({ x: CX, y: CY })
  return pts
}

const nodes = buildNodes()

const routes: Array<[number, number]> = []
for (let i = 0; i < N; i++) {
  routes.push([i, (i + 1) % N])
  if (i % 3 === 0) routes.push([i, (i + 5) % N])
  if (i % 4 === 0 && i < N) routes.push([i, N]) // spoke to hub
}

const seq = [
  { label: 'DEMAND MODEL', note: 'stochastic demand at each station' },
  { label: 'ROUTE INTELLIGENCE', note: 'candidate routes evaluated' },
  { label: 'PREDICTIVE INTELLIGENCE', note: 'demand forecasts per route' },
  { label: 'MILP OPTIMIZATION', note: 'fleet + station constraints solved' },
  { label: 'NETWORK DECISION', note: '+$2.46M vs naive baseline' },
]

export default function MeridianNetwork() {
  const [step, setStep] = useState(0)
  const [inView, setInView] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => setStep((s) => (s + 1) % seq.length), 1900)
    return () => window.clearInterval(id)
  }, [inView])

  return (
    <div ref={rootRef} className="meridian-visual">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <svg viewBox="0 0 600 360" className="w-full" role="img" aria-label="Simplified airline route network diagram">
          {routes.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
              stroke="var(--border-accent)"
              strokeWidth="1"
              strokeDasharray={i % 2 === 0 ? '4 5' : '0'}
              className={i % 2 === 0 ? 'route-dash' : undefined}
            />
          ))}
          {nodes.map((n, i) => (
            <g key={i}>
              <circle className={`station-pulse ${i < N ? '' : 'station-pulse--hub'}`}
                cx={n.x} cy={n.y} r="7" fill="transparent" stroke="var(--accent)" strokeWidth="1" />
              <circle cx={n.x} cy={n.y} r={i < N ? 3.5 : 5}
                fill={i < N ? 'var(--bg-surface)' : 'var(--accent)'} stroke="var(--accent)" strokeWidth="1.5" />
            </g>
          ))}
        </svg>

        <div className="min-w-0 lg:w-64">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted">Optimization flow</p>
          <div className="flex flex-col gap-1.5">
            {seq.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setStep(i)}
                className={`flow-step ${i === step ? 'flow-step--active' : ''}`}
              >
                <span className="font-mono text-[9px]">{String(i + 1).padStart(2, '0')}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-mono text-[10px] font-semibold text-primary">{s.label}</span>
                  <span className="block text-[9px] leading-snug text-secondary">{s.note}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-lg border px-3 py-2.5" style={{ borderColor: 'var(--border-accent)', background: 'var(--accent-primary-5)' }}>
            <div className="font-mono text-[18px] font-bold text-accent">+$2.46M</div>
            <div className="text-[9px] uppercase tracking-wider text-secondary">vs naive baseline · 132 routes · 12 stations · 3 aircraft</div>
          </div>
        </div>
      </div>
    </div>
  )
}