import { useState, useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiCpu, FiTarget, FiTrendingUp, FiAward, FiMapPin, FiDownload, FiCheckCircle } from 'react-icons/fi'
import { personalInfo } from '../../data/personal'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { computeMetrics } from '../../utils/metrics'
import { withBase } from '../../utils/assetPath'
import AnimatedCounter from '../ui/AnimatedCounter'
import { usePortfolio } from '../../context/PortfolioContext'

const infoCards = [
  {
    icon: FiUser, label: 'WHO I AM', accent: 'var(--accent)',
    content: personalInfo.summary,
  },
  {
    icon: FiCpu, label: 'WHAT I BUILD', accent: 'var(--accent-secondary)',
    items: ['AI Systems', 'Data Science & Analytics', 'AI Automation', 'Python Packages', 'Workflow Intelligence', 'Software Engineering Projects'],
  },
  {
    icon: FiTarget, label: 'CURRENT FOCUS', accent: 'var(--accent)',
    items: personalInfo.currentInterests.slice(0, 5),
  },
  {
    icon: FiTrendingUp, label: 'EXPLORING NEXT', accent: 'var(--accent-highlight)',
    items: personalInfo.futureInterests,
  },
]

const coreTechs = ['Python', 'Machine Learning', 'Computer Vision', 'PyTorch', 'Power BI', 'Unity', 'Git']

export default function EngineerProfile() {
  const { ref, revealed } = useScrollReveal({ threshold: 0.03 })
  const { activeTech, setActiveTech } = usePortfolio()
  const metrics = useMemo(() => computeMetrics(), [])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current; if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setMousePos({ x: ((e.clientX - rect.left) / rect.width - 0.5) * 10, y: ((e.clientY - rect.top) / rect.height - 0.5) * 10 })
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section id="profile" ref={sectionRef} data-section="profile" className="section relative overflow-hidden">
      <div className="section-glow" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)` }}>
          <svg className="h-full w-full" style={{ opacity: 'var(--bg-pattern-opacity)' }} viewBox="0 0 1440 800">
            {[[100,150],[180,90],[250,200],[130,350],[200,450],[100,550],[250,650],[300,300],[80,700],[350,150],[180,280],[290,500],[150,300],[320,80]].map((n,i) => (
              <circle key={`an-${i}`} cx={n[0]} cy={n[1]} r={2.5} fill="var(--accent)" className="neural-node"
                style={{ animationDelay: `${i * 0.25}s` }} />
            ))}
            {[[100,150,180,90],[100,150,250,200],[180,90,350,150],[250,200,300,300],[130,350,200,450],[200,450,100,550],[100,550,250,650],[130,350,300,300],[350,150,300,300],[200,450,290,500],[250,650,80,700],[290,500,250,650],[150,300,130,350],[320,80,350,150],[150,300,250,200]].map((l,i) => (
              <line key={`al-${i}`} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke="var(--accent)" strokeWidth={0.4} opacity={0.2} />
            ))}
          </svg>
        </div>
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div key={`fp-${i}`} className="absolute h-1 w-1 rounded-full"
            style={{ background: 'var(--accent)', left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%` }}
            animate={{ y: [0, -30 - Math.random() * 40, 0], opacity: [0, 0.1, 0] }}
            transition={{ duration: 6 + Math.random() * 8, repeat: Infinity, delay: Math.random() * 5, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div ref={ref} className="relative z-10 section-container">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="section-title">Engineer <span className="gradient-text">Profile</span></motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 0.15 }}
          className="section-subtitle">Who I am, what I build, and where I'm headed</motion.p>

        <div className="grid gap-10 md:grid-cols-5">
          {/* Left sidebar — professional identity panel */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={revealed ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2"
          >
            <div className="sticky top-24 space-y-5">
              {/* 1. Portrait */}
              <div className="orbit-frame mx-auto h-56 w-56 md:mx-0 md:h-64 md:w-64">
                <div className="h-full w-full overflow-hidden rounded-[1rem]" style={{ boxShadow: '0 0 0 1px var(--border-accent), 0 8px 32px var(--accent-10)' }}>
                  <img src={withBase('/images/me.jpeg')} alt={personalInfo.name} className="h-full w-full object-cover object-center"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="%233B82F6"><rect width="256" height="256" rx="16"/><text x="128" y="160" font-size="64" text-anchor="middle" fill="white">A</text></svg>' }}
                  />
                </div>
                <div className="orbit-node" />
                <div className="orbit-node" />
                <div className="orbit-node" />
                <div className="orbit-node" />
                <div className="orbit-node" />
                <div className="orbit-node" />
                <div className="absolute inset-0 rounded-[1rem] border opacity-30 animate-pulse" style={{ borderColor: 'var(--accent-secondary)', animationDuration: '3s' }} />
                <div className="absolute inset-2 rounded-[0.85rem] border opacity-20 animate-pulse" style={{ borderColor: 'var(--accent-highlight)', animationDuration: '4s' }} />
              </div>

              {/* 2. Name */}
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold text-primary">{personalInfo.name}</h3>
              </div>

              {/* 3. Professional Title */}
              <p className="text-sm font-semibold text-accent">{personalInfo.title}</p>

              {/* 4. Location */}
              <div className="flex items-center justify-center gap-1 text-[11px] text-muted md:justify-start">
                <FiMapPin size={11} />
                <span>{personalInfo.location}</span>
              </div>

              {/* 5. Status badge */}
              <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold"
                  style={{ background: 'var(--accent-primary-10)', color: 'var(--accent)' }}>
                  <FiCheckCircle size={9} /> AI Engineer
                </span>
                <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold"
                  style={{ background: 'var(--accent-secondary-10)', color: 'var(--accent-secondary)' }}>
                  <FiCheckCircle size={9} /> Open to Opportunities
                </span>
              </div>

              {/* 6. Download Resume */}
              <a href={withBase('/Ahmed-CV.pdf')} download className="btn btn-primary w-full justify-center hover-glow">
                <FiDownload size={14} /> Download Resume
              </a>

              {/* 7. Engineering Metrics */}
              <div className="grid grid-cols-2 gap-2">
                {metrics.slice(0, 4).map((m) => (
                  <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 + Math.random() * 0.1 }}>
                    <AnimatedCounter value={m.value} label={m.label} description={m.description} />
                  </motion.div>
                ))}
              </div>

              {/* 8. Education */}
              <div className="card rounded-xl p-4">
                <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                  <FiAward size={12} /> Education
                </h4>
                <div className="space-y-3">
                  {personalInfo.education.map((edu) => (
                    <div key={edu.degree}>
                      <div className="text-sm font-semibold text-primary">{edu.degree}</div>
                      <div className="text-xs text-secondary">{edu.institution}</div>
                      {edu.period && <div className="text-[10px] text-muted">{edu.period}</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* 9. Core Technologies */}
              <div className="card rounded-xl p-4">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent-secondary">Core Technologies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {coreTechs.map((t) => (
                    <motion.span key={t} whileHover={{ scale: 1.08 }}
                      className={`badge badge-accent badge-pulse tech-badge-clickable ${activeTech === t ? 'active-tech' : ''}`}
                      style={{ animationDelay: `${Math.random() * 3}s` }}
                      onClick={() => setActiveTech(activeTech === t ? null : t)}
                    >{t}</motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column — info cards + philosophy */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={revealed ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5 md:col-span-3"
          >
            {infoCards.map((card, idx) => (
              <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + idx * 0.08 }}
                className="card-hover rounded-xl p-5"
              >
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `${card.accent}15` }}>
                    <card.icon size={13} style={{ color: card.accent }} />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: card.accent }}>{card.label}</span>
                </div>
                {card.content && <p className="text-sm leading-relaxed text-secondary">{card.content}</p>}
                {card.items && (
                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {card.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-secondary"
                        style={{ background: 'var(--accent-primary-5)' }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: card.accent }} />
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.6 }}
              className="card relative overflow-hidden rounded-xl p-5"
              style={{ borderColor: 'var(--border-accent)', background: 'linear-gradient(135deg, var(--accent-primary-5), var(--accent-secondary-10), var(--accent-highlight-5))' }}
            >
              <div className="absolute -right-4 -top-4 text-6xl select-none leading-none opacity-10 text-accent">&ldquo;</div>
              <div className="relative">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-lg leading-none text-accent">&ldquo;</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-secondary">Engineering Philosophy</span>
                </div>
                <p className="text-sm italic leading-relaxed text-secondary">&ldquo;{personalInfo.philosophy}&rdquo;</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
