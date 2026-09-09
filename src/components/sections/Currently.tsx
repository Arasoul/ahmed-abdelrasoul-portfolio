import { motion } from 'framer-motion'
import { FiZap, FiUsers, FiBox, FiGithub, FiExternalLink } from 'react-icons/fi'
import type { CSSProperties } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const directions = [
  {
    title: 'AI Automation',
    Icon: FiZap,
    text: 'Training and building practical AI-powered workflows using n8n, AI services, APIs, agents and intelligent automation techniques.',
    accent: 'var(--accent)',
    link: null,
  },
  {
    title: 'Technical Education',
    Icon: FiUsers,
    text: 'Working as a Teaching Assistant, supporting practical learning, technical understanding and problem-solving.',
    accent: 'var(--accent-secondary)',
    link: null,
  },
  {
    title: 'Productizing Systems',
    Icon: FiBox,
    text: 'Moving completed data and AI engineering systems toward polished, reusable product experiences.',
    accent: 'var(--accent-highlight)',
    link: 'https://github.com/Arasoul',
  },
]

export default function Currently() {
  const { ref, revealed } = useScrollReveal({ threshold: 0.15 })

  return (
    <section id="now" ref={ref} data-section="now" className="section relative overflow-hidden py-12 md:py-16">
      <div className="section-glow" />
      <div className="relative z-10 section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="section-head"
        >
          <span className="section-index">06 / 07</span>
          <h2 className="section-title-left">Now</h2>
          <div className="section-rule" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mb-8 max-w-2xl"
        >
          <span className="term-label-accent mb-2 block">CURRENT FOCUS</span>
          <p className="text-sm leading-relaxed text-secondary">
            Three active directions — automation, education, and productizing completed systems.
          </p>
        </motion.div>

        {/* Compact status board */}
        <div className="now-board">
          {directions.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 12 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
              className="now-row"
              style={{ '--row-accent': d.accent } as CSSProperties}
            >
              <span className="now-indicator" />
              <div className="now-icon"><d.Icon size={14} /></div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold tracking-wide text-primary">{d.title}</div>
                <p className="text-[10px] leading-relaxed text-secondary">{d.text}</p>
              </div>
              {d.link && (
                <a href={d.link} target="_blank" rel="noopener noreferrer"
                  className="now-link" aria-label={`View ${d.title}`}>
                  <FiExternalLink size={12} />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-6 flex items-center justify-center gap-4 font-mono text-[10px] text-muted"
        >
          <span className="text-accent">LEARN</span>
          <span>&rarr;</span>
          <span className="text-accent-secondary">BUILD</span>
          <span>&rarr;</span>
          <span className="text-accent-highlight">VALIDATE</span>
          <span>&rarr;</span>
          <span className="font-semibold text-primary">PRODUCTIZE</span>
        </motion.div>

        <div className="mt-4 text-center">
          <a href="https://github.com/Arasoul" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] text-muted transition-colors hover:text-accent">
            <FiGithub size={12} /> follow the build on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
