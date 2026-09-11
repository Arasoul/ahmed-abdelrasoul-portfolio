import { useState, useCallback, useMemo, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowDown, FiExternalLink, FiChevronRight, FiGithub, FiArrowRight } from 'react-icons/fi'
import { projects, flagshipProjectIds, ecosystemToolIds, projectCategories, indexPriorityIds, projectCtaUrl } from '../../data/projects'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { projectTopics, projectsForTopics } from '../../utils/projectTopics'
import { scrollToElement } from '../../utils/scroll'
import { usePortfolio } from '../../hooks/usePortfolio'
import { chapterNumber } from '../../data/chapters'
import AutoBIPipeline from '../visuals/AutoBIPipeline'
import MeridianNetwork from '../visuals/MeridianNetwork'
import PharaohPipeline from '../visuals/PharaohPipeline'

const categoryLabel = (id: string) => projectCategories.find((c) => c.id === id)?.label || id

const ecosystemTools = ecosystemToolIds
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p))
  .sort((a, b) => (a.ecosystemOrder ?? 99) - (b.ecosystemOrder ?? 99))

const flagships = flagshipProjectIds
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p))

const autoBI = projects.find((p) => p.id === 'auto-bi')

const secondary = projects.filter((p) =>
  !ecosystemToolIds.includes(p.id) && !flagshipProjectIds.includes(p.id)
)

const indexRows = (() => {
  const seen = new Set<string>()
  const rows: NonNullable<(typeof flagships)[number]>[] = []
  for (const id of [...indexPriorityIds, ...secondary.map((p) => p.id)]) {
    const p = projects.find((x) => x.id === id)
    if (p && !seen.has(p.id)) {
      seen.add(p.id)
      rows.push(p)
    }
  }
  return rows
})()

function ProductCta({ project }: { project: { productUrl?: string; demo?: string; ctaLabel?: string } }) {
  const url = projectCtaUrl(project)
  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="product-cta product-cta--active">
        <FiExternalLink size={11} /> {project.ctaLabel || 'Explore Product'}
      </a>
    )
  }
  return (
    <span className="product-cta product-cta--ghost">
      Coming Soon
    </span>
  )
}

const stageLabel = (order?: number) =>
  order === 1 ? 'ACQUIRE' : order === 2 ? 'PREPARE' : order === 3 ? 'EXPLORE' : order === 4 ? 'DISCOVER' : order === 5 ? 'DECIDE' : ''

function EcosystemNode({ project, index }: { project: NonNullable<(typeof ecosystemTools)[number]>; index: number }) {
  return (
    <div id={`project-${project.id}`} className="ecosystem-node scroll-target">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="flex items-center gap-2">
          <span className="term-label-accent">TOOL {String(index + 1).padStart(2, '0')}</span>
          <h3 className="font-mono text-sm font-bold text-primary">{project.title}</h3>
        </span>
        <span className="status-badge"><span className="status-dot" /> Completed</span>
      </div>
      <span className="term-bracket mb-3 inline-block">{stageLabel(project.ecosystemOrder)}</span>
      <p className="mb-3 text-xs leading-relaxed text-secondary">{project.overview}</p>
      {project.metric && (
        <p className="mb-3 font-mono text-[11px] text-accent">{project.metric}</p>
      )}
      <div className="mb-3 flex flex-wrap gap-1">
        {project.technologies.slice(0, 4).map((t) => (
          <span key={t} className="rounded-md px-2 py-0.5 text-[10px]"
            style={{ background: 'var(--accent-primary-5)', color: 'var(--text-muted)' }}>
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <ProductCta project={project} />
        <div className="flex items-center gap-2">
          <Link to={`/projects/${project.id}`}
            className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-accent transition-colors hover:text-secondary">
            Case study <FiArrowRight size={11} />
          </Link>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] text-muted transition-colors hover:text-accent">
              <FiGithub size={11} /> Source
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function Connector() {
  return (
    <div className="ecosystem-connector">
      <FiArrowDown size={13} />
    </div>
  )
}

interface FlagshipCardProps {
  project: NonNullable<(typeof flagships)[number]>
  matched?: boolean
  children?: React.ReactNode
}

function FlagshipCard({ project, matched = false, children }: FlagshipCardProps) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.05 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={revealed ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      id={`project-${project.id}`}
      className={`flagship-card scroll-target p-6 md:p-8 ${matched ? 'project-card--matched' : ''}`}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="term-label-accent">FLAGSHIP SYSTEM</span>
        <span className="status-badge"><span className="status-dot" /> Completed</span>
      </div>
      <h3 className="mb-2 text-2xl font-extrabold tracking-tight text-primary">{project.title}</h3>
      <p className="mb-2 text-sm font-medium text-accent">{project.overview}</p>
      {project.metric && (
        <span className="metric-chip inline-block mb-4">{project.metric}</span>
      )}
      <p className="mb-5 text-sm leading-relaxed text-secondary">{project.impact}</p>

      {children}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link to={`/projects/${project.id}`} className="product-cta product-cta--active">
          <FiArrowRight size={11} /> View Case Study
        </Link>
        <ProductCta project={project} />
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent">
            <FiGithub size={12} /> Source
          </a>
        )}
      </div>
    </motion.div>
  )
}

function SystemsIndex({ matchedTopicIds }: { matchedTopicIds: Set<string> }) {
  return (
    <div className="systems-index">
      <div className="mb-3 flex items-center gap-2">
        <span className="term-label-accent">LEVEL 1</span>
        <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Systems / Project Index</h3>
      </div>
      <ol className="flex flex-col">
        {indexRows.map((p, i) => {
          const highlighted = matchedTopicIds.has(p.id)
          const caps = (p.features ?? [])
            .slice(0, 2)
            .map((f) => f.split('—')[0].trim().split(':')[0].trim())
          return (
            <li key={p.id} className="border-b last:border-b-0" style={{ borderColor: 'var(--border-subtle)' }}>
              <Link
                to={`/projects/${p.id}`}
                className={`index-row group w-full ${highlighted ? 'index-row--match' : ''}`}
                style={
                  highlighted
                    ? { borderColor: 'var(--border-accent)', background: 'var(--accent-primary-10)' }
                    : undefined
                }
                aria-label={`Open ${p.title} case study`}
              >
                <span className="index-num font-mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left">
                  <span className="flex w-full items-center justify-between gap-2">
                    <span className="truncate text-xs font-bold tracking-wide text-primary">{p.title}</span>
                    <span className="index-status"><span className="status-dot" /> Done</span>
                  </span>
                  <span className="line-clamp-1 text-[11px] text-secondary">{p.overview}</span>
                  {caps.length > 0 && (
                    <span className="flex flex-wrap gap-1 pt-0.5">
                      {caps.map((c) => (
                        <span key={c} className="font-mono text-[9px] uppercase tracking-wider text-muted" style={{ color: 'var(--text-muted)' }}>
                          {c}
                          {caps.length > 1 && c !== caps[caps.length - 1] ? ' ·' : ''}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
                {p.metric && (
                  <span className="index-metric hidden font-mono text-[9px] text-accent sm:block">{p.metric}</span>
                )}
                <span className="index-cta font-mono text-[9px] uppercase tracking-wider text-muted opacity-0 transition-opacity group-hover:opacity-100">
                  Case study
                </span>
                <FiArrowRight size={12} className="text-muted transition-colors group-hover:text-accent" />
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function FindProject({ activeTopicId, onSelect }: { activeTopicId: string | null; onSelect: (id: string | null) => void }) {
  return (
    <div className="find-project">
      <div className="mb-3 flex items-center gap-2">
        <span className="term-label-accent">LEVEL 1</span>
        <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Find A Project</h3>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-secondary">
        Pick a topic to surface the systems that match it. Click anywhere on a card to jump straight there.
      </p>
      <div className="flex flex-wrap gap-1.5">
        {projectTopics.map((t) => {
          const active = activeTopicId === t.id
          return (
            <button
              key={t.id}
              onClick={() => onSelect(active ? null : t.id)}
              className={`topic-chip ${active ? 'topic-chip--active' : ''}`}
              style={active ? { borderColor: 'var(--border-accent)', background: 'var(--accent-primary-10)' } : undefined}
            >
              {t.label}
            </button>
          )
        })}
      </div>
      {activeTopicId && (
        <p className="mt-4 font-mono text-[10px] text-accent">
          MATCH {(projectsForTopics([activeTopicId])).length} SYSTEMS
        </p>
      )}
    </div>
  )
}

export default function SystemsProducts() {
  const { ref, revealed } = useScrollReveal({ threshold: 0.03 })
  const [showAllSecondary, setShowAllSecondary] = useState(false)
  const { activeTopic: activeTopicId, setActiveTopic: setActiveTopicId } = usePortfolio()

  const scrollToTopic = useCallback((topicId: string) => {
    window.requestAnimationFrame(() => {
      const matches = projectsForTopics([topicId]).filter((p) =>
        flagshipProjectIds.includes(p.id) || ecosystemToolIds.includes(p.id)
      )
      const target = document.getElementById(`project-${matches[0]?.id ?? projectsForTopics([topicId])[0]?.id}`)
      if (target) scrollToElement(target, 92)
    })
  }, [])

  const handleTopicSelect = useCallback((id: string | null) => {
    setActiveTopicId(id)
    if (id) scrollToTopic(id)
  }, [scrollToTopic, setActiveTopicId])

  const matchedTopicIds = useMemo(
    () => new Set(activeTopicId ? projectsForTopics([activeTopicId]).map((p) => p.id) : []),
    [activeTopicId]
  )

  return (
    <section id="systems" ref={ref} data-section="systems" className="section relative overflow-hidden">
      <div className="section-glow" />
      <div className="relative z-10 section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="section-head"
        >
          <span className="section-index">{chapterNumber('systems')}</span>
          <h2 className="section-title-left">Systems &amp; Products</h2>
          <div className="section-rule" />
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 0.15 }}
          className="mb-10 max-w-xl text-sm leading-relaxed text-secondary"
        >
          Reusable systems built to solve real technical and analytical problems. Use the index to browse, or
          filter by topic.
        </motion.p>

        {/* --- LEVEL 1: index + find --- */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          className="mb-14 grid min-w-0 gap-6 lg:grid-cols-2"
        >
          <SystemsIndex matchedTopicIds={matchedTopicIds} />
          <FindProject activeTopicId={activeTopicId} onSelect={handleTopicSelect} />
        </motion.div>

        {/* --- LEVEL 2: featured systems --- */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="mb-1 flex items-center gap-2">
            <span className="term-label-accent">LEVEL 2</span>
            <h3 className="text-lg font-bold text-primary">Featured Systems</h3>
          </div>
          <p className="mb-6 text-xs text-secondary">Engineered end to end — problem, approach, evidence.</p>
        </motion.div>

        <div className="space-y-8">
          {/* AutoBI flagship */}
          {autoBI && (
            <FlagshipCard project={autoBI} matched={matchedTopicIds.has('auto-bi')}>
              <AutoBIPipeline />
              <div className="mt-4 rounded-lg p-3" style={{ background: 'var(--accent-secondary-10)' }}>
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="term-label-accent">SYSTEM CHARACTERISTICS</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Deterministic', 'Local / offline', 'No API key', 'No LLM required', 'HTML export', '32-dataset matrix'].map((t) => (
                    <span key={t} className="rounded-md px-2 py-1 text-[11px] font-medium"
                      style={{ background: 'var(--accent-primary-5)', color: 'var(--text-secondary)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-xs text-secondary"><span className="font-semibold text-accent-secondary">Validated across 32 dataset cases</span> — an intelligent decision-support system, not automatic dashboard generation.</p>
              </div>
            </FlagshipCard>
          )}

          {/* AI Pharaoh */}
          {flagships.map((p) => (
            p.id === 'ai-pharaoh' && (
              <FlagshipCard key={p.id} project={p} matched={matchedTopicIds.has('ai-pharaoh')}>
                <PharaohPipeline />
                <div className="mb-4 mt-4 flex flex-wrap gap-1.5">
                  {['YOLOv8', 'SAM', 'ConvNeXt', 'DBSCAN', 'Beam Search'].map((t) => (
                    <span key={t} className="rounded-md px-2 py-1 text-[11px] font-medium"
                      style={{ background: 'var(--accent-primary-5)', color: 'var(--text-secondary)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-secondary">
                  A complete multi-stage AI system for hieroglyph interpretation — from raw image
                  to transliteration and translation.
                </p>
              </FlagshipCard>
            )
          ))}

          {/* Meridian Wings */}
          {flagships.map((p) => (
            p.id === 'meridian-wings' && (
              <FlagshipCard key={p.id} project={p} matched={matchedTopicIds.has('meridian-wings')}>
                <MeridianNetwork />
                <p className="mt-4 text-xs text-secondary">
                  Decision-support system combining predictive intelligence with <span className="font-semibold text-primary">MILP optimization</span>
                  to plan a route network under uncertainty.
                </p>
              </FlagshipCard>
            )
          ))}
        </div>

        {/* --- Data-Intelligence Tooling Ecosystem --- */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }}
          className="mt-16"
        >
          <div className="mb-1 flex items-center gap-2">
            <span className="term-label-accent">LEVEL 2</span>
            <h3 className="text-lg font-bold text-primary">The Data Intelligence Pipeline</h3>
          </div>
          <p className="mb-6 text-xs text-secondary">
            From raw data to decision — one connected product family. Each system exists because the stage
            before it needs it.
            <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-accent">One core · Connected stages</span>
          </p>

          {/* Pipeline narrative header */}
          <div className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted">
            <span className="text-primary font-semibold">RAW DATA</span>
            <span className="text-accent">&rarr;</span>
            <span>Web Scraping</span>
            <span className="text-accent-secondary">ACQUIRE</span>
            <span className="text-accent">&rarr;</span>
            <span>DataPrepToolkit</span>
            <span className="text-accent-secondary">CLEAN</span>
            <span className="text-accent">&rarr;</span>
            <span>AutoEDA</span>
            <span className="text-accent-secondary">EXPLORE</span>
            <span className="text-accent">&rarr;</span>
            <span>AutoAnalytics</span>
            <span className="text-accent-secondary">DISCOVER</span>
            <span className="text-accent">&rarr;</span>
            <span>AutoBI</span>
            <span className="text-accent-secondary">DECIDE</span>
            <span className="text-accent">&rarr;</span>
            <span className="text-primary font-semibold">ACTION</span>
          </div>

          <div className="mx-auto max-w-xl">
            {ecosystemTools.map((tool, i) => (
              <div key={tool.id}>
                <EcosystemNode project={tool} index={i} />
                <Connector />
              </div>
            ))}

            {/* Core */}
            <div className="ecosystem-node" id="project-ecosystem-core"
              style={{ borderColor: 'var(--border-accent)', background: 'var(--accent-primary-5)' } as CSSProperties}>
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <span className="term-label-accent">CORE</span>
                  <h3 className="font-mono text-sm font-bold text-primary">Shared Data-Intelligence Core</h3>
                </span>
                <span className="status-badge"><span className="status-dot" /> Completed</span>
              </div>
              <p className="text-xs leading-relaxed text-secondary">
                Reusable engineering foundation — tooling, validation, and analytical components
                shared across the ecosystem. Each tool plugs into the same core, so capabilities
                compound instead of fragmenting.
              </p>
              <div className="mt-3 rounded-lg p-3" style={{ background: 'var(--bg-surface)' }}>
                <div className="flex flex-col items-center gap-1 text-[10px]">
                  <span className="text-primary font-semibold">TOOLS</span>
                  <FiArrowDown size={11} className="text-accent-secondary" />
                  <span className="text-primary font-semibold">SHARED CORE</span>
                  <FiArrowDown size={11} className="text-accent-secondary" />
                  <span className="text-accent font-semibold">REUSABLE DATA INTELLIGENCE</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Other engineering work --- */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h3 className="mb-1 text-lg font-bold text-primary">Other Engineering Work</h3>
          <p className="mb-6 text-xs text-secondary">Additional completed systems supporting the same engineering standard.</p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(showAllSecondary ? secondary : secondary.slice(0, 3)).map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={revealed ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.05 }}
                id={`project-${p.id}`}
                className={`card-glow rounded-xl border p-4 transition-all scroll-target ${matchedTopicIds.has(p.id) ? 'project-card--matched' : ''}`}
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
              >
                <Link to={`/projects/${p.id}`} className="block">
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="text-[9px] font-semibold text-muted uppercase tracking-wider">{categoryLabel(p.category)}</span>
                  <span className="status-badge"><span className="status-dot" /> Done</span>
                </div>
                <h4 className="mb-1 text-sm font-semibold text-primary">{p.title}</h4>
                <p className="mb-3 line-clamp-2 text-[11px] leading-relaxed text-secondary">{p.overview}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted">{p.timeline}</span>
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-accent">
                    Case study <FiArrowRight size={10} />
                  </span>
                </div>
                </Link>
                {p.github && (
                  <div className="mt-2 flex justify-end">
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      className="btn-icon h-7 w-7" aria-label="Source">
                      <FiGithub size={12} />
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {secondary.length > 3 && !showAllSecondary && (
            <div className="mt-6 text-center">
              <button onClick={() => setShowAllSecondary(true)} className="btn btn-secondary">
                View More Work <FiChevronRight size={14} />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}