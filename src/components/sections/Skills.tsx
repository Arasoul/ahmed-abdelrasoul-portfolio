import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCpu, FiDatabase, FiCode, FiBox, FiMonitor, FiChevronRight, FiX, FiBookOpen, FiBriefcase, FiAward, FiChevronDown } from 'react-icons/fi'
import { projects } from '../../data/projects'
import { experiences } from '../../data/experience'
import { certifications } from '../../data/certifications'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { usePortfolio } from '../../context/PortfolioContext'

interface DomainDef {
  id: string
  label: string
  icon: React.ComponentType<{ size?: number }>
  color: string
  technologies: string[]
  description: string
}

const domains: DomainDef[] = [
  {
    id: 'ai',
    label: 'Artificial Intelligence',
    icon: FiCpu,
    color: 'var(--accent)',
    technologies: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Natural Language Processing', 'Transformers', 'Large Language Models'],
    description: 'Building intelligent systems that perceive, reason, and learn from data',
  },
  {
    id: 'data-science',
    label: 'Data Science & Analytics',
    icon: FiDatabase,
    color: 'var(--accent-secondary)',
    technologies: ['EDA', 'Statistics', 'Feature Engineering', 'Data Cleaning', 'Data Visualization', 'Business Intelligence', 'Power BI'],
    description: 'Transforming raw data into actionable insights through analysis and visualization',
  },
  {
    id: 'swe',
    label: 'Software Engineering',
    icon: FiCode,
    color: 'var(--accent)',
    technologies: ['Python', 'C#', 'C++', 'SQL', 'JavaScript', 'PHP', 'Git', 'OOP', 'SOLID', 'Testing', 'Design Patterns', 'Python Packaging'],
    description: 'Designing and building maintainable, scalable software systems',
  },
  {
    id: 'ecosystem',
    label: 'AI & Data Ecosystem',
    icon: FiBox,
    color: 'var(--accent-secondary)',
    technologies: ['PyTorch', 'TensorFlow', 'OpenCV', 'Pandas', 'NumPy', 'Scikit-learn', 'spaCy', 'NLTK'],
    description: 'Core frameworks and libraries powering AI and data workflows',
  },
  {
    id: 'tools',
    label: 'Development Tools',
    icon: FiCode,
    color: 'var(--accent-highlight)',
    technologies: ['VS Code', 'Visual Studio', 'Jupyter', 'GitHub', 'MySQL'],
    description: 'Essential tools for productive development and collaboration',
  },
  {
    id: 'exploring',
    label: 'Currently Exploring',
    icon: FiMonitor,
    color: 'var(--accent-highlight)',
    technologies: ['Unity', 'Game Development', 'Game AI', 'Interactive Systems', 'Computer Graphics'],
    description: 'Expanding into game development, real-time systems, and interactive AI',
  },
]

const skillLevels: Record<string, 'Expert' | 'Advanced' | 'Intermediate' | 'Learning'> = {
  'Python': 'Expert',
  'Machine Learning': 'Expert',
  'Deep Learning': 'Expert',
  'Computer Vision': 'Expert',
  'EDA': 'Expert',
  'OOP': 'Expert',
  'Git': 'Expert',
  'PyTorch': 'Advanced',
  'TensorFlow': 'Advanced',
  'OpenCV': 'Advanced',
  'Pandas': 'Advanced',
  'NumPy': 'Advanced',
  'Scikit-learn': 'Advanced',
  'Natural Language Processing': 'Advanced',
  'Transformers': 'Advanced',
  'Large Language Models': 'Advanced',
  'Data Visualization': 'Advanced',
  'Feature Engineering': 'Advanced',
  'Testing': 'Advanced',
  'Design Patterns': 'Advanced',
  'Statistics': 'Intermediate',
  'Data Cleaning': 'Intermediate',
  'Business Intelligence': 'Intermediate',
  'Power BI': 'Intermediate',
  'C#': 'Intermediate',
  'C++': 'Intermediate',
  'SQL': 'Intermediate',
  'JavaScript': 'Intermediate',
  'PHP': 'Intermediate',
  'SOLID': 'Intermediate',
  'Python Packaging': 'Intermediate',
  'spaCy': 'Intermediate',
  'NLTK': 'Intermediate',
  'Unity': 'Learning',
  'Game Development': 'Learning',
  'Game AI': 'Learning',
  'Interactive Systems': 'Learning',
  'Computer Graphics': 'Learning',
  'VS Code': 'Learning',
  'Visual Studio': 'Learning',
  'Jupyter': 'Learning',
  'GitHub': 'Learning',
  'MySQL': 'Learning',
}

const levelColors: Record<string, string> = {
  Expert: 'var(--accent)',
  Advanced: 'var(--accent-secondary)',
  Intermediate: 'var(--accent-highlight)',
  Learning: 'var(--text-muted)',
}

export default function Skills() {
  const [activeDomain, setActiveDomain] = useState<string | null>(null)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const [view, setView] = useState<'domains' | 'cloud'>('domains')
  const { ref, revealed } = useScrollReveal({ threshold: 0.05 })
  const { setHighlight, clearHighlight } = usePortfolio()

  function domainCounts(domain: DomainDef) {
    const techs = domain.technologies
    const matchedProjects = projects.filter((p) => p.technologies.some((t) => techs.some((dt) => t.toLowerCase().includes(dt.toLowerCase()))))
    const matchedExp = experiences.filter((exp) => [...(exp.skills || []), ...(exp.technologies || [])].some((s) => techs.some((dt) => s.toLowerCase().includes(dt.toLowerCase()))))
    const matchedCerts = certifications.filter((c) => c.skills.some((s) => techs.some((dt) => s.toLowerCase().includes(dt.toLowerCase()))))
    return { techCount: techs.length, projectCount: matchedProjects.length, expCount: matchedExp.length, certCount: matchedCerts.length }
  }

  const activeDomainData = activeDomain ? domains.find((d) => d.id === activeDomain) : null
  const activeCounts = activeDomainData ? domainCounts(activeDomainData) : null
  const allTechnologies = useMemo(() => domains.flatMap((d) => d.technologies), [])

  const filteredProjects = useMemo(() => {
    const techs = selectedTech ? [selectedTech] : (activeDomainData?.technologies || [])
    return projects.filter((p) => p.technologies.some((t) => techs.some((dt) => t.toLowerCase().includes(dt.toLowerCase()))))
  }, [selectedTech, activeDomainData])

  const filteredExperience = useMemo(() => {
    const techs = selectedTech ? [selectedTech] : (activeDomainData?.technologies || [])
    return experiences.filter((exp) => [...(exp.skills || []), ...(exp.technologies || [])].some((s) => techs.some((dt) => s.toLowerCase().includes(dt.toLowerCase()))))
  }, [selectedTech, activeDomainData])

  const filteredCerts = useMemo(() => {
    const techs = selectedTech ? [selectedTech] : (activeDomainData?.technologies || [])
    return certifications.filter((c) => c.skills.some((s) => techs.some((dt) => s.toLowerCase().includes(dt.toLowerCase()))))
  }, [selectedTech, activeDomainData])

  const hasConnections = (activeDomain || selectedTech) && (filteredProjects.length > 0 || filteredExperience.length > 0 || filteredCerts.length > 0)

  const exploringIndex = domains.findIndex((d) => d.id === 'exploring')
  const roadmapTechs = domains[exploringIndex]?.technologies || []
  const coreStrengths = ['Machine Learning', 'Computer Vision', 'NLP', 'Python', 'Data Pipelines', 'MLOps']

  return (
    <section id="skills" ref={ref} data-section="skills" className="section relative overflow-hidden">
      <div className="section-glow" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.012] dark:opacity-[0.02]">
        <svg className="h-full w-full" viewBox="0 0 1440 800">
          <defs>
            <pattern id="skills-hex" width="80" height="69.28" patternUnits="userSpaceOnUse">
              <path d="M40 0 L80 23.09 L80 69.28 L40 92.38 L0 69.28 L0 23.09 Z" fill="none" stroke="var(--accent-highlight)" strokeWidth={0.3} opacity={0.3} />
            </pattern>
          </defs>
          <rect x="0" y="0" width="1440" height="800" fill="url(#skills-hex)" />
        </svg>
      </div>

      <div className="relative z-10 section-container">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="section-title">Skills <span className="gradient-text">Snapshot</span></motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 0.15 }}
          className="section-subtitle">Core strengths across AI, data, software engineering, and emerging intelligent systems.</motion.p>

        <motion.div initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-2"
        >
          {coreStrengths.map((skill) => (
            <span key={skill} className="badge badge-accent" style={{ padding: '0.45rem 0.8rem', fontSize: '10px' }}>
              {skill}
            </span>
          ))}
        </motion.div>

        {/* Domain cards */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {domains.map((domain) => {
            const counts = domainCounts(domain)
            return (
              <motion.button key={domain.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => setActiveDomain(activeDomain === domain.id ? null : domain.id)}
                className={`domain-card ${activeDomain === domain.id ? 'domain-active' : ''}`}
              >
                <div className="domain-icon" style={{ background: `${domain.color}15`, color: domain.color }}>
                  <domain.icon size={16} />
                </div>
                <div className="domain-title">{domain.label}</div>
                <p className="mt-1 text-[11px] leading-relaxed text-secondary text-left line-clamp-2">{domain.description}</p>
                <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-0.5">
                  <div className="text-[10px] text-muted">{counts.techCount} Technologies</div>
                  <div className="text-[10px] text-muted">{counts.projectCount} Projects</div>
                  <div className="text-[10px] text-muted">{counts.expCount} Experiences</div>
                  <div className="text-[10px] text-muted">{counts.certCount} Certifications</div>
                </div>
                <div className="mt-2 flex items-center gap-1 text-[10px] font-medium text-accent">
                  <span>{activeDomain === domain.id ? 'Close' : 'Explore'}</span>
                  <FiChevronRight size={10} className={`transition-transform ${activeDomain === domain.id ? 'rotate-90' : ''}`} />
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* View toggle */}
        <motion.div initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-2 mb-6"
        >
          <button onClick={() => setView('domains')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${view === 'domains' ? 'text-white' : 'text-secondary'}`}
            style={view === 'domains' ? { background: 'var(--accent)' } : { background: 'var(--accent-primary-5)' }}
          >Knowledge Graph</button>
          <button onClick={() => setView('cloud')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${view === 'cloud' ? 'text-white' : 'text-secondary'}`}
            style={view === 'cloud' ? { background: 'var(--accent-secondary)' } : { background: 'var(--accent-primary-5)' }}
          >Tech Cloud</button>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Knowledge Graph Panel */}
          {view === 'domains' && (activeDomain || selectedTech) && hasConnections && (
            <motion.div key="knowledge" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="knowledge-panel mb-8"
            >
              <div className="knowledge-panel-section flex items-center justify-between">
                <span className="text-xs font-semibold text-accent">
                  {selectedTech
                    ? `Connections for "${selectedTech}"`
                    : activeDomainData
                      ? `${activeDomainData.label} \u2014 ${activeCounts?.techCount} technologies, ${activeCounts?.projectCount} projects, ${activeCounts?.expCount} experiences, ${activeCounts?.certCount} certifications`
                      : ''}
                </span>
                <button onClick={() => { setActiveDomain(null); setSelectedTech(null) }}
                  className="text-muted hover:text-primary transition-colors"><FiX size={14} /></button>
              </div>

              {/* Domain technologies */}
              {activeDomainData && (
                <div className="knowledge-panel-section">
                  <h4 className="mb-3 text-xs font-semibold" style={{ color: activeDomainData.color }}>Technologies</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDomainData.technologies.map((t) => {
                      const level = skillLevels[t] || 'Intermediate'
                      return (
                        <button key={t} onClick={() => setSelectedTech(selectedTech === t ? null : t)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all cursor-pointer border ${selectedTech === t ? 'text-white' : ''}`}
                          style={{
                            background: selectedTech === t ? levelColors[level] : `${levelColors[level]}10`,
                            borderColor: selectedTech === t ? levelColors[level] : 'transparent',
                            color: selectedTech === t ? 'white' : levelColors[level],
                          }}
                        >
                          {t} &middot; {level}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {filteredProjects.length > 0 && (
                <div className="knowledge-panel-section">
                  <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold text-accent">
                    <FiBookOpen size={12} /> Projects ({filteredProjects.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {filteredProjects.map((p) => (
                      <a key={p.id} href={`#project-${p.id}`}
                        onMouseEnter={() => setHighlight(p.id)} onMouseLeave={clearHighlight}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--accent-primary-5)] text-secondary hover:text-accent hover:bg-[var(--accent-primary-10)] transition-all"
                      >{p.title}</a>
                    ))}
                  </div>
                </div>
              )}
              {filteredExperience.length > 0 && (
                <div className="knowledge-panel-section">
                  <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--accent-secondary)' }}>
                    <FiBriefcase size={12} /> Experience ({filteredExperience.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {filteredExperience.map((exp) => (
                      <span key={exp.id}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--accent-secondary-10)] text-secondary"
                      >{exp.role} @ {exp.company}</span>
                    ))}
                  </div>
                </div>
              )}
              {filteredCerts.length > 0 && (
                <div className="knowledge-panel-section">
                  <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--accent-highlight)' }}>
                    <FiAward size={12} /> Certifications ({filteredCerts.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {filteredCerts.map((c) => (
                      <span key={c.id}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--accent-highlight-10)] text-secondary"
                      >{c.title}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Tech Cloud */}
          {view === 'cloud' && (
            <motion.div key="cloud" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="mb-8"
            >
              <p className="mb-4 text-xs text-secondary text-center">Technologies sized by expertise — click any to see its connections</p>
              <div className="tech-cloud">
                {allTechnologies.map((tech) => {
                  const level = skillLevels[tech] || 'Intermediate'
                  const sizeMap: Record<string, number> = { Expert: 1, Advanced: 0.85, Intermediate: 0.7, Learning: 0.6 }
                  const size = sizeMap[level] || 0.7
                  return (
                    <button key={tech} onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                      className={`tech-cloud-item ${selectedTech === tech ? 'active' : ''}`}
                      style={{
                        fontSize: `${0.65 + size * 0.3}rem`,
                        padding: `${0.15 + size * 0.15}rem ${0.4 + size * 0.3}rem`,
                      }}
                    >{tech}</button>
                  )
                })}
              </div>

              {selectedTech && hasConnections && (
                <div className="knowledge-panel mt-6">
                  <div className="knowledge-panel-section flex items-center justify-between">
                    <span className="text-xs font-semibold text-accent">
                      &ldquo;{selectedTech}&rdquo; &middot; {skillLevels[selectedTech] || 'Intermediate'}
                    </span>
                    <button onClick={() => setSelectedTech(null)} className="text-muted hover:text-primary transition-colors"><FiX size={14} /></button>
                  </div>
                  {filteredProjects.length > 0 && (
                    <div className="knowledge-panel-section">
                      <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold text-accent">
                        <FiBookOpen size={12} /> Projects ({filteredProjects.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {filteredProjects.map((p) => (
                          <a key={p.id} href={`#project-${p.id}`}
                            onMouseEnter={() => setHighlight(p.id)} onMouseLeave={clearHighlight}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--accent-primary-5)] text-secondary hover:text-accent hover:bg-[var(--accent-primary-10)] transition-all"
                          >{p.title}</a>
                        ))}
                      </div>
                    </div>
                  )}
                  {filteredExperience.length > 0 && (
                    <div className="knowledge-panel-section">
                      <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--accent-secondary)' }}>
                        <FiBriefcase size={12} /> Experience ({filteredExperience.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {filteredExperience.map((exp) => (
                          <span key={exp.id}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--accent-secondary-10)] text-secondary"
                          >{exp.role} @ {exp.company}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {filteredCerts.length > 0 && (
                    <div className="knowledge-panel-section">
                      <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--accent-highlight)' }}>
                        <FiAward size={12} /> Certifications ({filteredCerts.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {filteredCerts.map((c) => (
                          <span key={c.id}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--accent-highlight-10)] text-secondary"
                          >{c.title}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Currently Exploring — Visual Roadmap */}
        <motion.div initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <h3 className="mb-4 text-sm font-semibold" style={{ color: 'var(--accent-highlight)' }}>Currently Exploring</h3>
          <div className="flex flex-wrap items-center gap-0">
            {roadmapTechs.map((tech, i) => (
              <div key={tech} className="flex items-center">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-highlight-15), var(--accent-secondary-10))',
                    color: 'var(--accent-highlight)',
                    border: '1px solid var(--accent-highlight-20)',
                  }}
                >{tech}</span>
                {i < roadmapTechs.length - 1 && (
                  <FiChevronDown size={12} className="mx-1 text-muted rotate-[-90deg] sm:rotate-0" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
