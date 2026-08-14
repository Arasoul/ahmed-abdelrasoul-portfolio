import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiMail, FiCommand, FiArrowDown, FiCpu, FiDatabase, FiCompass } from 'react-icons/fi'
import { personalInfo, highlights } from '../../data/personal'
import { withBase } from '../../utils/assetPath'

const focusAreas = [
  { icon: FiCpu, title: 'AI Systems', text: 'Vision • NLP • ML pipelines' },
  { icon: FiDatabase, title: 'Data + Automation', text: 'Analytics • experimentation • workflows' },
  { icon: FiCompass, title: 'Research + Build', text: 'AI agents • automation • product thinking' },
]

function Typewriter() {
  const [index, setIndex] = useState(0)
  const [char, setChar] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const current = personalInfo.titles[index]

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (char < current.length) setChar((c) => c + 1)
        else setTimeout(() => setDeleting(true), 2000)
      } else {
        if (char > 0) setChar((c) => c - 1)
        else { setDeleting(false); setIndex((i) => (i + 1) % personalInfo.titles.length) }
      }
    }, deleting ? 30 : 70)
    return () => clearTimeout(timeout)
  }, [char, deleting, current])

  return (
    <span className="inline-block min-h-[1.4em]">
      {current.slice(0, char)}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.7 }}
        className="ml-0.5 inline-block h-[1em] w-[2px] rounded-full"
        style={{ background: 'linear-gradient(to bottom, var(--accent), var(--accent-secondary))' }}
      />
    </span>
  )
}

export default function Hero({ dark }: { dark: boolean }) {
  const profileImage = dark ? withBase('/images/hero-dark.png') : withBase('/images/me-light.png')

  return (
    <section id="hero" data-section="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24 pb-12 md:pb-0">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 800px 500px at 30% 40%, var(--accent-primary-10), transparent 70%), radial-gradient(ellipse 600px 400px at 70% 60%, var(--accent-secondary-10), transparent 70%)' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-page)]" />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full"
        style={{ background: 'var(--accent)', filter: 'blur(100px)', opacity: 0.06 }} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
        className="absolute right-1/4 bottom-1/3 h-48 w-48 rounded-full"
        style={{ background: 'var(--accent-secondary)', filter: 'blur(80px)', opacity: 0.05 }} />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-8 md:gap-16 lg:flex-row lg:gap-20">
        {/* Left content ~55% */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="flex flex-1 flex-col items-center text-center md:items-start md:text-left"
        >
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-accent sm:text-sm sm:tracking-[0.18em]">AI Engineer • Data Scientist • Automation Specialist</motion.p>
          <h1 className="mb-3 text-3xl font-extrabold tracking-wide text-primary sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ textShadow: '0 0 40px var(--accent-10)' }}
          >{personalInfo.name}</h1>
          <h2 className="mb-1 text-base font-semibold text-secondary sm:text-lg md:text-xl"><Typewriter /></h2>
          <p className="mb-6 max-w-lg text-sm leading-relaxed text-secondary md:text-base">{personalInfo.motto}</p>

          <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <a href={withBase('/Ahmed-CV.pdf')} download className="btn btn-primary hover-glow w-full justify-center sm:w-auto">
              <FiDownload size={16} /> Download Resume
            </a>
            <a href="#work" className="btn btn-secondary w-full justify-center sm:w-auto">
              View Work <FiArrowRight size={16} />
            </a>
            <div className="flex items-center justify-center sm:justify-start">
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn"><FiLinkedin size={18} /></a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub"><FiGithub size={18} /></a>
              <a href={`mailto:${personalInfo.email}`} className="btn-icon" aria-label="Email"><FiMail size={18} /></a>
            </div>
          </div>

          <div className="mt-6 grid w-full max-w-xl gap-3 sm:grid-cols-3">
            {focusAreas.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card-glass rounded-2xl p-3 text-left">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: 'var(--accent-primary-10)', color: 'var(--accent)' }}>
                  <Icon size={14} />
                </div>
                <div className="text-[11px] font-semibold text-primary">{title}</div>
                <p className="mt-1 text-[10px] leading-relaxed text-secondary">{text}</p>
              </div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            className="card-glass mt-8 hidden items-center gap-2 rounded-full px-3 py-1.5 text-[10px] text-secondary md:flex"
          >
            <FiCommand size={10} /> <span>Press </span>
            <kbd className="rounded border px-1 font-mono text-[10px] text-secondary" style={{ borderColor: 'var(--border-accent)' }}>Ctrl</kbd>
            <span>+</span>
            <kbd className="rounded border px-1 font-mono text-[10px] text-secondary" style={{ borderColor: 'var(--border-accent)' }}>K</kbd>
            <span>to navigate</span>
          </motion.div>
        </motion.div>

        {/* Right portrait ~45% */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: 'easeOut' }}
            className="order-first flex-shrink-0 lg:order-none"
        >
          <div className="relative">
            {/* Layered ambient glow */}
            <div className="absolute -inset-8 rounded-full opacity-40" style={{ background: 'radial-gradient(circle, var(--accent-20), transparent 70%)', filter: 'blur(60px)' }} />
            <div className="absolute -inset-4 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, var(--accent-secondary-15), transparent 60%)', filter: 'blur(40px)' }} />

            {/* Premium frame with light sweep */}
            <div className="relative light-sweep rounded-[1.25rem]" style={{ boxShadow: '0 0 0 1px var(--border-accent), 0 20px 60px -12px rgba(0,0,0,0.3), 0 0 40px var(--accent-10)' }}>
              <div className="rounded-[1.25rem] p-[6px]" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary), var(--accent-highlight))' }}>
                <div className="w-[240px] sm:w-[280px] md:w-[360px] lg:w-[420px] aspect-[4/5] overflow-hidden rounded-[1.1rem] p-3" style={{ background: 'var(--bg-surface)' }}>
                  <img src={profileImage} alt={personalInfo.name}
                    className="h-full w-full rounded-lg object-cover object-center transition-transform duration-700 hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="420" height="525" fill="%233B82F6"><rect width="420" height="525" rx="18"/><text x="210" y="274" font-size="80" text-anchor="middle" fill="white">A</text></svg>' }}
                  />
                </div>
              </div>
            </div>

            {/* Floating particles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div key={i} className="absolute h-1.5 w-1.5 rounded-full"
                style={{
                  background: i % 3 === 0 ? 'var(--accent)' : i % 3 === 1 ? 'var(--accent-secondary)' : 'var(--accent-highlight)',
                  left: `${-10 + Math.random() * 120}%`,
                  top: `${-10 + Math.random() * 120}%`,
                }}
                animate={{ y: [0, -20 - Math.random() * 30, 0], opacity: [0, 0.5, 0], scale: [0, 1, 0] }}
                transition={{ duration: 4 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 4, ease: 'easeInOut' }}
              />
            ))}
          </div>

          {/* Quick metrics as premium stat cards */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4"
          >
            {highlights.slice(0, 4).map((h) => (
              <div key={h.title} className="stat-card">
                <div className="stat-value">{h.value}</div>
                <div className="stat-label">{h.title}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] font-medium text-secondary">Scroll</span>
          <FiArrowDown size={12} className="text-accent icon-float" />
        </motion.div>
      </motion.div>
    </section>
  )
}
