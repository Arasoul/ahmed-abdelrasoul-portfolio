import { motion } from 'framer-motion'
import { FiChevronRight } from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const visionPoints = [
  'Ship AI systems that work outside the lab — not just in notebooks.',
  'Build open-source tools that make data science and ML accessible to everyone.',
  'Bridge research and production: turn papers into reliable, testable code.',
  'Create interactive experiences where AI feels like a collaborator, not a black box.',
  'Keep learning in public — documenting what I build so others can build on it.',
]

export default function LookingAhead() {
  const { ref, revealed } = useScrollReveal({ threshold: 0.2 })

  return (
    <section id="looking-ahead" ref={ref} className="section relative overflow-hidden py-16 md:py-20">
      <div className="section-glow" />
      <div className="relative z-10 section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="card relative overflow-hidden rounded-2xl p-6 md:p-8 max-w-2xl mx-auto"
          style={{
            background: 'linear-gradient(135deg, var(--accent-primary-5), var(--accent-secondary-10), var(--accent-highlight-5))',
            border: '1px solid var(--border-accent)',
          }}
        >
          <div className="absolute -right-6 -top-6 text-7xl select-none leading-none opacity-[0.04] font-bold text-accent">Vision</div>

          <h3 className="mb-5 text-sm font-bold uppercase tracking-wider gradient-text">Looking Ahead</h3>

          <ul className="space-y-3">
            {visionPoints.map((point, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={revealed ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15 + i * 0.06 }}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-secondary"
              >
                <FiChevronRight size={12} className="mt-0.5 flex-shrink-0 text-accent" />
                {point}
              </motion.li>
            ))}
          </ul>

          <motion.p initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
            className="mt-5 pt-4 border-t text-xs text-muted text-center"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            This is not a destination. It is a direction.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
