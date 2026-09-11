import { motion } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { scrollToHash } from '../../utils/scroll'
import { chapterNumber } from '../../data/chapters'

interface DomainBranch {
  domain: string
  tag: string
  accent: string
  systems: { label: string; id: string }[]
}

const branches: DomainBranch[] = [
  {
    domain: 'DATA',
    tag: 'PREPARE · EXPLORE · VISUALIZE',
    accent: 'var(--accent-secondary)',
    systems: [
      { label: 'DataPrepToolkit', id: 'systems' },
      { label: 'AutoEDA', id: 'systems' },
      { label: 'AutoBI', id: 'systems' },
    ],
  },
  {
    domain: 'AI',
    tag: 'VISION · NLP · MODELS',
    accent: 'var(--accent)',
    systems: [
      { label: 'AI Pharaoh', id: 'systems' },
    ],
  },
  {
    domain: 'AUTOMATION',
    tag: 'WORKFLOWS · AGENTS · APIs',
    accent: 'var(--accent-highlight)',
    systems: [
      { label: 'n8n / AI Agents', id: 'experience' },
    ],
  },
  {
    domain: 'DECISION',
    tag: 'OPTIMIZATION · PLANNING',
    accent: '#F59E0B',
    systems: [
      { label: 'Meridian Wings', id: 'systems' },
    ],
  },
]

function BranchCard({ branch, index }: { branch: DomainBranch; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.1 + index * 0.08 }}
      className="map-branch"
      style={{ borderTopColor: branch.accent }}
    >
      <div className="mb-3">
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted">{branch.tag}</span>
        <h3 className="font-mono text-sm font-bold tracking-wide text-primary">{branch.domain}</h3>
      </div>
      <div className="flex flex-col gap-1.5">
        {branch.systems.map((sys) => (
          <button
            key={sys.label}
            onClick={() => scrollToHash(`#${sys.id}`, 92)}
            className="map-system-link"
          >
            <span className="map-system-dot" style={{ background: branch.accent }} />
            <span className="text-[11px] font-semibold text-primary">{sys.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

export default function Map() {
  const { ref, revealed } = useScrollReveal({ threshold: 0.05 })

  return (
    <section id="map" ref={ref} data-section="map" className="section relative overflow-hidden">
      <div className="section-glow" />
      <div className="relative z-10 section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-head"
        >
          <span className="section-index">{chapterNumber('map')}</span>
          <h2 className="section-title map-title">Map</h2>
          <div className="section-rule" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          className="mb-10 max-w-xl text-sm leading-relaxed text-secondary"
        >
          Four engineering domains — each connected to completed systems.
        </motion.p>

        {/* Root */}
        <div className="mb-4 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            className="journey-root"
          >
            <span className="journey-node-dot" />
            <span className="font-mono text-sm font-bold tracking-[0.2em] text-primary">AI & DATA ENGINEER</span>
          </motion.div>
        </div>
        <div className="journey-trunk hidden lg:block" aria-hidden="true" />
        <div className="journey-trunk-mobile lg:hidden" aria-hidden="true">
          <FiArrowDown size={12} />
        </div>

        {/* Branches */}
        <div className="grid gap-4 lg:grid-cols-4">
          {branches.map((b, i) => (
            <BranchCard key={b.domain} branch={b} index={i} />
          ))}
        </div>

        {/* Outcome */}
        <div className="mt-4 flex justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={revealed ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="journey-outcome"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">From data to decisions</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
