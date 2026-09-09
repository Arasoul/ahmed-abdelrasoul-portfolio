import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { projects } from '../../data/projects'
import { Link } from 'react-router-dom'

const capabilities = [
  {
    num: '01',
    title: 'PERCEIVE',
    skills: ['Computer Vision', 'Object Detection', 'Image Segmentation', 'NLP'],
    evidence: ['AI Pharaoh'],
    accent: '#F59E0B',
  },
  {
    num: '02',
    title: 'UNDERSTAND DATA',
    skills: ['EDA', 'Statistics', 'Semantic Understanding', 'Data Validation'],
    evidence: ['DataPrepToolkit', 'AutoEDA', 'AutoBI'],
    accent: 'var(--accent-secondary)',
  },
  {
    num: '03',
    title: 'AUTOMATE',
    skills: ['n8n', 'AI Agents', 'APIs', 'Workflow Engineering'],
    evidence: ['DEPI'],
    accent: 'var(--accent-highlight)',
  },
  {
    num: '04',
    title: 'DECIDE',
    skills: ['Optimization', 'Forecasting', 'MILP', 'Analytics'],
    evidence: ['Meridian Wings'],
    accent: 'var(--accent)',
  },
]

const method = [
  'UNDERSTAND',
  'DESIGN',
  'BUILD',
  'TEST',
  'VALIDATE',
  'DOCUMENT',
  'RELEASE',
]

const principles = [
  { label: 'TESTED', desc: 'Automated test suites with measurable coverage' },
  { label: 'TYPE-SAFE', desc: 'Structured interfaces and validation layers' },
  { label: 'VALIDATED', desc: 'Statistical and dataset-level validation' },
  { label: 'DOCUMENTED', desc: 'Code, reports, and case studies' },
  { label: 'REPRODUCIBLE', desc: 'Local, deterministic execution' },
  { label: 'VERSIONED', desc: 'Public releases and semantic versioning' },
]

export default function Engineering() {
  const { ref, revealed } = useScrollReveal({ threshold: 0.03 })

  const getProjectLink = (name: string) => {
    const p = projects.find(
      (proj) => proj.title === name || proj.id.includes(name.toLowerCase().replace(/\s+/g, '-'))
    )
    return p ? `/projects/${p.id}` : '#systems'
  }

  return (
    <section id="engineering" ref={ref} data-section="engineering" className="section relative overflow-hidden">
      <div className="section-glow" />
      <div className="relative z-10 section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-head"
        >
          <span className="section-index">04 / 07</span>
          <h2 className="section-title-left">Engineering</h2>
          <div className="section-rule" />
        </motion.div>

        {/* Three-column layout: Capability | Method | Evidence */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT: Capability Matrix */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              <span className="term-label-accent mb-3 block">CAPABILITIES</span>
              <p className="mb-6 text-xs leading-relaxed text-secondary">
                What can be engineered — each backed by shipped systems.
              </p>
            </motion.div>

            <div className="space-y-3">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.num}
                  initial={{ opacity: 0, x: -12 }}
                  animate={revealed ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="eng-capability"
                  style={{ borderLeftColor: cap.accent }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold" style={{ color: cap.accent }}>{cap.num}</span>
                    <h3 className="text-xs font-bold tracking-wide text-primary">{cap.title}</h3>
                  </div>
                  <div className="mb-2 flex flex-wrap gap-1">
                    {cap.skills.map((s) => (
                      <span key={s} className="rounded px-1.5 py-0.5 text-[10px]"
                        style={{ background: 'var(--accent-primary-5)', color: 'var(--text-secondary)' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cap.evidence.map((e) => (
                      <Link
                        key={e}
                        to={getProjectLink(e)}
                        className="eng-evidence-link"
                      >
                        {e}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CENTER: Method */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <span className="term-label-accent mb-3 block">METHOD</span>
              <p className="mb-6 text-xs leading-relaxed text-secondary">
                How engineering is practiced — a complete lifecycle from understanding to release.
              </p>
            </motion.div>

            <div className="eng-method">
              {method.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -8 }}
                  animate={revealed ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.04 }}
                  className="eng-method-step"
                >
                  <span className="font-mono text-[10px] font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-xs font-semibold text-primary">{step}</span>
                  {i < method.length - 1 && (
                    <FiArrowRight size={10} className="text-muted ml-auto" />
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={revealed ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-4 rounded-lg p-3 text-center"
              style={{ background: 'linear-gradient(135deg, var(--accent-primary-5), var(--accent-secondary-10))', border: '1px solid var(--border-accent)' }}
            >
              <p className="font-mono text-[10px] text-secondary leading-loose">
                <span className="text-accent">$ </span>build
                <span className="text-accent"> &rarr; </span>validate
                <span className="text-accent"> &rarr; </span>release
              </p>
            </motion.div>
          </div>

          {/* RIGHT: Engineering Proof */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <span className="term-label-accent mb-3 block">EVIDENCE</span>
              <p className="mb-6 text-xs leading-relaxed text-secondary">
                Engineering discipline — principles applied consistently across every system.
              </p>
            </motion.div>

            <div className="space-y-2">
              {principles.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, x: 12 }}
                  animate={revealed ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.04 }}
                  className="eng-principle"
                >
                  <span className="eng-principle-dot" />
                  <div>
                    <span className="text-[11px] font-bold tracking-wide text-primary">{p.label}</span>
                    <p className="text-[10px] text-muted">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={revealed ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-6 rounded-lg p-3"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
            >
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted mb-2 block">CORE STACK</span>
              <div className="flex flex-wrap gap-1">
                {['Python', 'PyTorch', 'pandas', 'scikit-learn', 'n8n', 'FastAPI', 'Docker', 'Git'].map((t) => (
                  <span key={t} className="rounded px-2 py-0.5 text-[10px] font-medium"
                    style={{ background: 'var(--accent-primary-5)', color: 'var(--text-secondary)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
