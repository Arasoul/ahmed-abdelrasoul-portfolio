import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiArrowRight, FiAward, FiBarChart2, FiAlertTriangle, FiCheckCircle, FiCpu } from 'react-icons/fi'
import { projects, projectCategories } from '../../data/projects'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { usePortfolio } from '../../context/PortfolioContext'
import { isDimmed } from '../ui/TechRelationWrapper'

const flagshipIds = ['ai-pharaoh', 'auto-eda', 'data-prep-toolkit']

const categoryLabel = (id: string) => projectCategories.find(c => c.id === id)?.label || id
const flagship = projects.filter((p) => flagshipIds.includes(p.id))

const storySections = [
  { key: 'problem' as const, label: 'Problem', icon: FiAlertTriangle, accent: 'var(--accent)' },
  { key: 'approach' as const, label: 'Approach', icon: FiCpu, accent: 'var(--accent-secondary)' },
  { key: 'challenges' as const, label: 'Challenges', icon: FiAward, accent: 'var(--accent-highlight)' },
  { key: 'solution' as const, label: 'Solution', icon: FiBarChart2, accent: 'var(--accent)' },
  { key: 'impact' as const, label: 'Impact', icon: FiCheckCircle, accent: 'var(--accent-secondary)' },
]

export default function FeaturedWork() {
  const [expandedMobileProject, setExpandedMobileProject] = useState<string | null>(null)
  const { ref, revealed } = useScrollReveal({ threshold: 0.05 })
  const { highlight, activeTech, setActiveTech } = usePortfolio()
  return (
    <section id="work" ref={ref} data-section="work" className="section relative overflow-hidden">
      <div className="section-glow" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.015] dark:opacity-[0.025]">
        <svg className="h-full w-full" viewBox="0 0 1440 800">
          <pattern id="work-circuit" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 0 50 L 30 50 L 30 20 L 50 20 M 50 80 L 70 80 L 70 50 L 100 50" fill="none" stroke="var(--accent)" strokeWidth={0.3} opacity={0.2} />
            <circle cx="30" cy="50" r="2" fill="none" stroke="var(--accent-secondary)" strokeWidth={0.3} opacity={0.2} />
            <circle cx="50" cy="20" r="2" fill="none" stroke="var(--accent-highlight)" strokeWidth={0.3} opacity={0.2} />
            <circle cx="70" cy="50" r="2" fill="none" stroke="var(--accent-secondary)" strokeWidth={0.3} opacity={0.2} />
          </pattern>
          <rect x="0" y="0" width="1440" height="800" fill="url(#work-circuit)" />
        </svg>
      </div>

      <div className="relative z-10 section-container">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="section-title">Featured <span className="gradient-text">Work</span></motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 0.15 }}
          className="section-subtitle">Flagship projects that define my engineering approach</motion.p>

        <div className="grid gap-8">
          {flagship.map((project, idx) => {
            const dimmed = isDimmed(project.technologies, activeTech)
            const showTechs = project.primaryTechnologies ?? project.technologies
            const mobileExpanded = expandedMobileProject === project.id
            return (
            <motion.div key={project.id} id={`project-${project.id}`}
              initial={{ opacity: 0, y: 30 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={`card-featured group relative rounded-2xl border p-6 md:p-8 cross-highlight tech-relation-target ${highlight === project.id ? 'active' : ''} ${dimmed ? 'dimmed' : ''}`}
            >
              <div className="grid gap-6 md:grid-cols-5">
                <div className="md:col-span-3 md:border-r md:pr-6" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-block rounded-full px-3 py-1 text-[10px] font-semibold text-accent"
                      style={{ background: 'linear-gradient(to right, var(--accent-20), var(--accent-highlight-20))' }}>
                      {categoryLabel(project.category)}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-icon border" style={{ borderColor: 'var(--border-subtle)' }}>
                          <FiGithub size={14} />
                        </a>
                      )}
                      {(project.live || project.demo) && (
                        <a href={project.live || project.demo} target="_blank" rel="noopener noreferrer" className="btn-icon border" style={{ borderColor: 'var(--border-subtle)' }}>
                          <FiExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-primary">{project.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-secondary">{project.overview}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {showTechs.map((t) => (
                      <span key={t} className={`badge badge-accent tech-badge-clickable ${activeTech === t ? 'active-tech' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setActiveTech(activeTech === t ? null : t) }}
                      >{t}</span>
                    ))}
                  </div>

                  <span className="block mb-4 text-[10px] text-muted">{project.timeline} &middot; {project.role}</span>

                  <button
                    type="button"
                    onClick={() => setExpandedMobileProject(mobileExpanded ? null : project.id)}
                    className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold text-accent md:hidden"
                    style={{ borderColor: 'var(--border-accent)' }}
                  >
                    {mobileExpanded ? 'Hide project story' : 'Read project story'}
                  </button>

                  {/* Engineering story */}
                  <div className={`space-y-4 ${mobileExpanded ? 'block' : 'hidden md:block'}`}>
                    {storySections.map((section) => {
                      const content = project[section.key]
                      if (!content) return null
                      const Icon = section.icon
                      return (
                        <div key={section.key}>
                          <h4 className="mb-1 flex items-center gap-2 text-xs font-semibold" style={{ color: section.accent }}>
                            <Icon size={12} /> {section.label}
                          </h4>
                          <p className="text-xs leading-relaxed text-secondary">{content}</p>
                        </div>
                      )
                    })}

                    {project.results && (
                      <div className="rounded-xl p-3" style={{ background: 'linear-gradient(135deg, var(--accent-primary-5), var(--accent-secondary-10))' }}>
                        <h4 className="mb-1 flex items-center gap-2 text-xs font-semibold text-accent-secondary">
                          <FiCheckCircle size={12} /> Results
                        </h4>
                        <p className="text-xs leading-relaxed text-secondary">{project.results}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2 flex items-start">
                  {project.gallery?.[0] && (
                    <div className="w-full overflow-hidden rounded-xl">
                      <img src={project.gallery[0]} alt={project.title}
                        className="w-full h-auto object-cover rounded-xl"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
            )
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
          className="mt-10 text-center">
          <a href="#projects" className="btn btn-secondary">
            Explore All Projects <FiArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
