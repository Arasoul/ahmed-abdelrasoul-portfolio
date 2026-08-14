import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiFolder, FiChevronDown } from 'react-icons/fi'
import { projects, projectCategories } from '../../data/projects'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { usePortfolio } from '../../context/PortfolioContext'
import { isDimmed } from '../ui/TechRelationWrapper'

const flagshipIds = ['ai-pharaoh', 'auto-eda', 'data-prep-toolkit']
const remaining = projects.filter((p) => !flagshipIds.includes(p.id))
const compactProjects = remaining.slice(0, 3)
const categoryLabel = (id: string) => projectCategories.find((c) => c.id === id)?.label || id

export default function ProjectLibrary() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const { ref, revealed } = useScrollReveal({ threshold: 0.03 })
  const { highlight, activeTech, setActiveTech } = usePortfolio()

  return (
    <section id="projects" ref={ref} data-section="projects" className="section relative overflow-hidden">
      <div className="section-glow" />

      <div className="relative z-10 section-container">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="section-title">Project <span className="gradient-text">Snapshot</span></motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 0.15 }}
          className="section-subtitle">Three additional projects with quick context. Expand any card for deeper details.</motion.p>

        <motion.div initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
          {compactProjects.map((p, i) => {
            const cardDimmed = isDimmed(p.technologies, activeTech)
            const open = expandedCard === p.id
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={revealed ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.07 }}
                className={`card-glow group min-w-[85%] snap-center rounded-2xl border p-5 transition-all cross-highlight tech-relation-target sm:min-w-0 ${highlight === p.id ? 'active' : ''} ${cardDimmed ? 'dimmed' : ''}`}
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: highlight === p.id ? 'var(--accent)' : 'var(--border-subtle)' }}
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-accent"
                    style={{ background: 'linear-gradient(135deg, var(--accent-10), var(--accent-highlight-10))' }}>
                    <FiFolder size={15} />
                  </span>
                  <span className="badge" style={{ background: 'var(--accent-primary-5)', color: 'var(--accent)', padding: '0.15rem 0.5rem', fontSize: '9px' }}>
                    {categoryLabel(p.category)}
                  </span>
                </div>

                <h3 className="mb-1.5 font-semibold text-primary">{p.title}</h3>
                <p className="mb-2 text-[10px] text-muted">{p.timeline} &middot; {p.role}</p>
                <p className="mb-3 line-clamp-3 text-xs leading-relaxed text-secondary">{p.overview}</p>

                <div className="mb-3 flex flex-wrap gap-1">
                  {p.technologies.slice(0, 3).map((t) => (
                    <span key={t} className={`badge badge-accent tech-badge-clickable ${activeTech === t ? 'active-tech' : ''}`}
                      style={{ fontSize: '9px', padding: '0.15rem 0.5rem' }}
                      onClick={() => setActiveTech(activeTech === t ? null : t)}
                    >{t}</span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setExpandedCard(open ? null : p.id)}
                  className="flex items-center gap-1 text-[11px] font-medium text-accent"
                >
                  {open ? 'Hide details' : 'Expand details'}
                  <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <FiChevronDown size={12} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 space-y-2 border-t pt-3" style={{ borderColor: 'var(--border-subtle)' }}>
                        {p.impact && <p className="text-[11px] leading-relaxed text-secondary">{p.impact}</p>}
                        <div className="flex gap-2">
                          {p.live && (
                            <a href={p.live} target="_blank" rel="noopener noreferrer"
                              className="btn-ghost rounded-lg px-2 py-1 text-[10px]" style={{ background: 'var(--accent-primary-5)' }}>
                              <FiExternalLink size={10} className="mr-1 inline" />Live
                            </a>
                          )}
                          {p.github && (
                            <a href={p.github} target="_blank" rel="noopener noreferrer"
                              className="btn-ghost rounded-lg px-2 py-1 text-[10px]" style={{ background: 'var(--accent-primary-5)' }}>
                              <FiGithub size={10} className="mr-1 inline" />Source
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
