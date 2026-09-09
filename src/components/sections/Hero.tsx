import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiArrowDown, FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi'
import { personalInfo } from '../../data/personal'
import { withBase } from '../../utils/assetPath'

const heroFrames = [
  { src: withBase('/images/hero-dark.png'), label: 'Portrait' },
  { src: withBase('/images/me-light.png'), label: 'Studio' },
]

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const systemMap = [
  { stage: 'PREPARE', name: 'DataPrepToolkit', color: 'var(--accent-secondary)' },
  { stage: 'EXPLORE', name: 'AutoEDA', color: 'var(--accent)' },
  { stage: 'DISCOVER', name: 'AutoAnalytics', color: 'var(--accent)' },
  { stage: 'VISUALIZE', name: 'AutoBI', color: 'var(--accent)' },
  { stage: 'PERCEIVE', name: 'AI Pharaoh', color: '#F59E0B' },
  { stage: 'DECIDE', name: 'Meridian Wings', color: 'var(--accent-secondary)' },
]

export default function Hero({ dark = true }: { dark?: boolean }) {
  const [frame, setFrame] = useState(() => (dark ? 0 : 1))

  useEffect(() => {
    const t = window.setInterval(() => {
      setFrame((f) => (f + 1) % heroFrames.length)
    }, 6000)
    return () => window.clearInterval(t)
  }, [])

  return (
    <section id="origin" data-section="origin" className="relative flex min-h-screen items-center overflow-hidden px-4 pt-24 pb-16">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 1000px 700px at 25% 40%, var(--accent-primary-8, rgba(37,99,235,0.06)), transparent 70%)' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-page)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* Left: Identity + headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <h1 className="hero-headline mb-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              AHMED
              <br />
              <span className="gradient-text">ABDELRASOUL</span>
            </h1>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border px-3 py-1 font-mono text-[11px] font-semibold tracking-wider"
                style={{ borderColor: 'var(--border-accent)', color: 'var(--accent)', background: 'var(--accent-primary-5)' }}>
                AI / DATA / AUTOMATION
              </span>
            </div>

            <p className="mb-3 max-w-lg text-base leading-relaxed text-secondary md:text-lg">
              Building intelligent systems from raw data to decisions.
            </p>
            <p className="mb-8 max-w-md text-sm leading-relaxed text-muted">
              AI, data and automation systems engineered for real use.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#systems" className="btn btn-primary hover-glow w-full justify-center sm:w-auto">
                EXPLORE SYSTEMS <FiArrowRight size={16} />
              </a>
              <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer"
                className="btn btn-secondary w-full justify-center sm:w-auto">
                <FiDownload size={15} /> DOWNLOAD CV
              </a>
              <div className="mt-2 flex items-center justify-center gap-1 sm:ml-2 sm:mt-0 sm:justify-start">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub"><FiGithub size={18} /></a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn"><FiLinkedin size={18} /></a>
                <a href={`mailto:${personalInfo.email}`} className="btn-icon" aria-label="Email"><FiMail size={18} /></a>
              </div>
            </div>
          </motion.div>

          {/* Right: Portrait + System Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="mb-6"
            >
              <div className="profile-ring hero-frame-stage max-w-xs mx-auto">
                {heroFrames.map((f, i) => (
                  <motion.img
                    key={f.src}
                    src={f.src}
                    alt={i === frame ? `Portrait of ${personalInfo.name}` : ''}
                    aria-hidden={i !== frame}
                    loading="eager"
                    decoding="async"
                    className="hero-frame-img"
                    initial={false}
                    animate={{ opacity: frame === i ? 1 : 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: 'easeInOut' }}
                  />
                ))}
              </div>
            </motion.div>

            {/* System Map */}
            <div className="sysmap">
              <div className="sysmap-title">SYSTEM MAP</div>
              <div className="sysmap-grid">
                {systemMap.map((node, i) => (
                  <motion.div
                    key={node.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                    className="sysmap-node"
                  >
                    <span className="sysmap-dot" style={{ background: node.color }} />
                    <span className="sysmap-stage">{node.stage}</span>
                    <span className="sysmap-name">{node.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] font-medium text-secondary">Scroll</span>
          <FiArrowDown size={12} className="text-accent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
