import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate as fmAnimate } from 'framer-motion'
import { FiAward, FiBookOpen, FiTarget, FiExternalLink, FiGithub, FiCalendar } from 'react-icons/fi'
import { usePortfolio } from '../../context/PortfolioContext'
import { experiences } from '../../data/experience'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { smartScrollIntoView } from '../../utils/scroll'

interface MilestoneEvent {
  id: string
  title: string
  subtitle?: string
  description: string
}

interface MilestoneProject {
  name: string
  description: string
  technologies: string[]
  link?: string
}

interface MilestoneData {
  year: string
  title: string
  summary: string
  color: string
  glowColor: string
  bgColor: string
  borderColor: string
  events: MilestoneEvent[]
  technologies: string[]
  projects: MilestoneProject[]
  achievements: string[]
}

const YEAR_STYLE: Record<string, { color: string; glowColor: string; bgColor: string; borderColor: string }> = {
  '2023': { color: 'var(--accent)', glowColor: 'rgba(37,99,235,0.25)', bgColor: 'var(--accent-primary-10)', borderColor: 'var(--accent-primary-20)' },
  '2024': { color: 'var(--accent-secondary)', glowColor: 'rgba(6,182,212,0.25)', bgColor: 'var(--accent-secondary-10)', borderColor: 'var(--accent-secondary-20)' },
  '2025': { color: 'var(--accent-highlight)', glowColor: 'rgba(139,92,246,0.25)', bgColor: 'var(--accent-highlight-10)', borderColor: 'var(--accent-highlight-20)' },
  '2026': { color: '#6366f1', glowColor: 'rgba(99,102,241,0.25)', bgColor: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.2)' },
  'Next': { color: 'var(--accent)', glowColor: 'rgba(37,99,235,0.2)', bgColor: 'var(--accent-primary-5)', borderColor: 'var(--accent-primary-20)' },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 8, filter: 'blur(2px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  },
}

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

function buildMilestones(): MilestoneData[] {
  const amit = experiences.find(e => e.id === 'amit')
  const fuzetek = experiences.find(e => e.id === 'fuzetek')
  const dolab = experiences.find(e => e.id === 'dolab')
  const voidspark = experiences.find(e => e.id === 'voidspark')

  return [
    {
      year: '2023',
      title: 'AI & Machine Learning Foundations',
      summary: 'Began my professional journey in Artificial Intelligence, establishing a strong foundation in ML, computer vision, and NLP through hands-on training and model development.',
      ...YEAR_STYLE['2023'],
      events: [
        {
          id: 'amit',
          title: 'AI & Machine Learning Intern',
          subtitle: 'AMIT Learning',
          description: amit?.overview ?? 'Completed an intensive AI program covering supervised and unsupervised learning, computer vision, and natural language processing.',
        },
      ],
      technologies: amit?.technologies ?? [],
      projects: amit?.projects ?? [],
      achievements: amit?.achievements ?? [],
    },
    {
      year: '2024',
      title: 'Advanced AI & Professional Development',
      summary: 'Expanded expertise through advanced training in deep learning, NLP, cybersecurity, and project management while earning multiple professional certifications.',
      ...YEAR_STYLE['2024'],
      events: [
        {
          id: 'advanced-training',
          title: 'Advanced Training & Certifications',
          subtitle: 'Multiple Institutions',
          description: 'Completed advanced training at AMIT, Zewail City, The British University in Egypt, and MSA CLC — covering deep learning architectures, CNNs, RNNs, Transformers, and NLP pipelines.',
        },
      ],
      technologies: ['Deep Learning', 'Neural Networks', 'Computer Vision', 'NLP', 'Big Data', 'Cybersecurity', 'Project Management'],
      projects: [],
      achievements: [
        'Earned certifications from AMIT, Zewail City, British University in Egypt, and MSA CLC',
        'Built end-to-end NLP pipelines for text classification and sentiment analysis',
        'Gained practical experience with CNN, RNN, and Transformer architectures',
      ],
    },
    {
      year: '2025',
      title: 'Software Engineering Practice',
      summary: 'Applied software engineering principles to real-world C++ and Python projects, focusing on OOP, data structures, algorithms, testing, and maintainable code.',
      ...YEAR_STYLE['2025'],
      events: [
        {
          id: 'fuzetek',
          title: 'Software Engineering Trainee',
          subtitle: 'Fuzetek',
          description: fuzetek?.overview ?? 'Developed core software engineering skills through hands-on projects in C++ and Python, focusing on OOP, data structures, algorithms, testing, and debugging.',
        },
      ],
      technologies: fuzetek?.technologies ?? [],
      projects: fuzetek?.projects ?? [],
      achievements: fuzetek?.achievements ?? [],
    },
    {
      year: '2026',
      title: 'Graduation, Data & Entrepreneurship',
      summary: 'A defining year — graduated with a Computer Science degree, completed a data analytics internship, and co-founded VoidSpark Studio to explore AI-driven game development.',
      ...YEAR_STYLE['2026'],
      events: [
        {
          id: 'graduation',
          title: 'Computer Science Graduate',
          subtitle: 'MSA University & University of Greenwich',
          description: 'Graduated with a dual Bachelor of Science in Computer Science, building a strong academic foundation in algorithms, software engineering, databases, AI, and system design.',
        },
        {
          id: 'dolab',
          title: 'Data Analysis Internship',
          subtitle: 'DoLab Academy',
          description: dolab?.overview ?? 'Focused on practical data analytics — cleaning, transforming, analyzing, and visualizing datasets to generate actionable business insights using SQL, Power BI, and Python.',
        },
        {
          id: 'voidspark',
          title: 'Co-Founder',
          subtitle: 'VoidSpark Studio',
          description: voidspark?.overview ?? 'Co-founded VoidSpark Studio to design and develop intelligent interactive experiences. Building game systems while exploring AI integration in Unity.',
        },
      ],
      technologies: [...new Set([...(dolab?.technologies ?? []), ...(voidspark?.technologies ?? [])])],
      projects: voidspark?.projects ?? [],
      achievements: [...(dolab?.achievements ?? []), ...(voidspark?.achievements ?? [])],
    },
    {
      year: 'Next',
      title: 'AI & Intelligent Interactive Systems',
      summary: 'Continuing to build AI-powered software, automation tools, open-source projects, and intelligent game experiences while exploring Game AI and interactive systems research.',
      ...YEAR_STYLE['Next'],
      events: [
        {
          id: 'future',
          title: 'Next Chapter',
          subtitle: 'Research & Innovation',
          description: 'Exploring behavior trees and pathfinding for intelligent game agents, generative AI for procedural content generation, and building interactive systems with deep AI integration.',
        },
      ],
      technologies: ['Game AI', 'Interactive Systems', 'Unity', 'Generative AI', 'Procedural Content Generation', 'Behavior Trees', 'Pathfinding'],
      projects: [],
      achievements: [
        'Researching AI-driven gameplay mechanics and intelligent agent behavior',
        'Exploring generative AI for procedural content generation in games',
      ],
    },
  ]
}

function renderSummary(summary: string, color: string) {
  return (
    <div className="flex items-start gap-2.5 mb-5" data-section-name="summary">
      <FiTarget size={14} style={{ color, marginTop: 2, flexShrink: 0 }} />
      <p className="text-sm leading-relaxed text-secondary">{summary}</p>
    </div>
  )
}

function renderEvents(events: MilestoneEvent[], color: string) {
  return (
    <div className="mb-5" data-section-name="events">
      <h4 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
        <FiCalendar size={11} /> Major Milestones
      </h4>
      <div className="space-y-3">
        {events.map((ev) => (
          <div key={ev.id} className="rounded-xl p-3.5"
            style={{ background: `color-mix(in srgb, ${color} 6%, transparent)` }}
          >
            <div className="text-sm font-semibold text-primary">{ev.title}</div>
            {ev.subtitle && <div className="text-xs font-medium mt-0.5" style={{ color }}>{ev.subtitle}</div>}
            <p className="text-xs text-secondary mt-1.5 leading-relaxed">{ev.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function renderTechnologies(technologies: string[], color: string, activeTech: string | null, setActiveTech: (t: string | null) => void) {
  if (!technologies.length) return null
  return (
    <div className="mb-5" data-section-name="tech">
      <h4 className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
        <FiBookOpen size={11} /> Technologies
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {technologies.map((t) => (
          <span key={t} className={`px-2.5 py-1 text-[10px] font-medium rounded-full tech-badge-clickable ${activeTech === t ? 'active-tech' : ''}`}
            style={{ background: activeTech === t ? color : `color-mix(in srgb, ${color} 12%, transparent)`, color: activeTech === t ? 'white' : color, border: `1px solid color-mix(in srgb, ${color} 20%, transparent)` }}
            onClick={() => setActiveTech(activeTech === t ? null : t)}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function renderProjects(projects: MilestoneProject[], color: string) {
  if (!projects.length) return null
  return (
    <div className="mb-5" data-section-name="projects">
      <h4 className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
        <FiGithub size={11} /> Representative Projects
      </h4>
      <div className="grid gap-2">
        {projects.map((p) => (
          <a key={p.name} href={p.link} target="_blank" rel="noopener noreferrer"
            className="flex items-start gap-2.5 rounded-xl p-3 transition-all card-hover"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-primary">{p.name}</span>
                <FiExternalLink size={10} className="flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
              </div>
              <p className="text-[11px] text-secondary mt-0.5 leading-relaxed line-clamp-2">{p.description}</p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {p.technologies.map((t) => (
                  <span key={t} className="text-[9px] px-1.5 py-0.5 rounded"
                    style={{ background: `color-mix(in srgb, ${color} 10%, transparent)`, color: 'var(--text-muted)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

function renderAchievements(achievements: string[], color: string) {
  if (!achievements.length) return null
  return (
    <div data-section-name="achievements">
      <h4 className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
        <FiAward size={11} /> Key Achievements
      </h4>
      <ul className="space-y-1.5">
        {achievements.map((a) => (
          <li key={a} className="flex items-start gap-2 text-xs text-secondary leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: color }} />
            {a}
          </li>
        ))}
      </ul>
    </div>
  )
}

function AnimatedCard({
  milestone, activeTech, setActiveTech, animState,
}: {
  milestone: MilestoneData
  activeTech: string | null
  setActiveTech: (t: string | null) => void
  animState: 'entering' | 'visible' | 'exiting'
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const entering = animState === 'entering'
  const exiting = animState === 'exiting'

  const sections = useMemo(() => [
    { key: 'summary', el: renderSummary(milestone.summary, milestone.color) },
    { key: 'events', el: renderEvents(milestone.events, milestone.color) },
    { key: 'tech', el: renderTechnologies(milestone.technologies, milestone.color, activeTech, setActiveTech) },
    { key: 'projects', el: renderProjects(milestone.projects, milestone.color) },
    { key: 'achievements', el: renderAchievements(milestone.achievements, milestone.color) },
  ].filter((s) => s.el), [milestone, activeTech, setActiveTech])

  useLayoutMeasurement(cardRef, animState)

  return (
    <motion.div ref={cardRef}
      initial={entering ? { opacity: 0, y: 10, scale: 0.98, filter: 'blur(3px)' } : false}
      animate={exiting
        ? { opacity: 0, y: 8, scale: 0.98, filter: 'blur(3px)' }
        : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
      }
      exit={{ opacity: 0, y: 8, scale: 0.98, filter: 'blur(3px)' }}
      transition={exiting
        ? { duration: 0.25, ease: [0.65, 0, 0.35, 1] }
        : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
      }
      className="card-glass p-5 md:p-6 rounded-2xl"
      style={{ borderColor: `color-mix(in srgb, ${milestone.color} 30%, var(--border-subtle))` }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={entering ? 'visible' : !exiting ? 'visible' : 'hidden'}
        style={{ willChange: 'transform, opacity' }}
      >
        {sections.map((s) => (
          <motion.div key={s.key} variants={sectionVariants} style={{ willChange: 'transform, opacity, filter' }}>
            {s.el}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

function useLayoutMeasurement(ref: React.RefObject<HTMLDivElement | null>, animState: string) {
  const measured = useRef(false)
  useEffect(() => {
    if (animState === 'visible' && !measured.current && ref.current) {
      measured.current = true
    }
  }, [animState, ref])
}

function TimelinePulse({
  fromIdx, toIdx, color, animating,
}: {
  fromIdx: number
  toIdx: number
  color: string
  animating: boolean
}) {
  const pulseY = useMotionValue(0)
  const topPct = useTransform(pulseY, (v) => `${v}%`)

  useEffect(() => {
    if (animating && fromIdx >= 0 && toIdx >= 0) {
      const fromPct = (fromIdx / 4) * 100
      const toPct = (toIdx / 4) * 100
      pulseY.set(fromPct)
      const controls = fmAnimate(pulseY, toPct, { duration: 0.3, ease: 'easeInOut' })
      return () => controls.stop()
    }
  }, [animating, fromIdx, toIdx, pulseY])

  if (!animating) return null

  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full z-20"
      style={{
        top: topPct,
        background: color,
        boxShadow: `0 0 12px ${color}, 0 0 24px ${color}40`,
      }}
    />
  )
}

export default function ProfessionalJourney() {
  const [activeYear, setActiveYear] = useState<string | null>(null)
  const [exitingYear, setExitingYear] = useState<string | null>(null)
  const [enteringYear, setEnteringYear] = useState<string | null>(null)
  const [pulseAnimating, setPulseAnimating] = useState(false)
  const [pulseFrom, setPulseFrom] = useState(-1)
  const [pulseTo, setPulseTo] = useState(-1)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { ref, revealed } = useScrollReveal({ threshold: 0.05 })
  const milestones = useMemo(() => buildMilestones(), [])
  const { activeTech, setActiveTech } = usePortfolio()

  const handleYearClick = useCallback(async (year: string) => {
    const idx = milestones.findIndex(m => m.year === year)
    const prevIdx = activeYear ? milestones.findIndex(m => m.year === activeYear) : -1

    if (activeYear === year) {
      setExitingYear(year)
      await delay(250)
      setActiveYear(null)
      setExitingYear(null)
      return
    }

    if (activeYear) {
      setExitingYear(activeYear)
      setPulseFrom(prevIdx)
      setPulseTo(idx)
      setPulseAnimating(true)

      await delay(250)

      setPulseAnimating(false)
      setActiveYear(year)
      setEnteringYear(year)
      setExitingYear(null)

      await delay(350)

      setEnteringYear(null)

      const node = document.querySelector(`[data-timeline-node="${idx}"]`)
      if (node) smartScrollIntoView(node as HTMLElement, 120)
      return
    }

    setActiveYear(year)
    setEnteringYear(year)

    await delay(350)
    setEnteringYear(null)

    const node = document.querySelector(`[data-timeline-node="${idx}"]`)
    if (node) smartScrollIntoView(node as HTMLElement, 120)
  }, [activeYear, milestones])

  return (
    <section id="journey" ref={ref} data-section="journey" className="section relative overflow-hidden">
      <div className="section-glow" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.015] dark:opacity-[0.025]">
        <svg className="h-full w-full" viewBox="0 0 1440 800">
          <pattern id="journey-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--accent-secondary)" strokeWidth={0.3} />
          </pattern>
          <rect x="0" y="0" width="1440" height="800" fill="url(#journey-grid)" />
        </svg>
      </div>

      <div className="relative z-10 section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          Professional <span className="gradient-text">Journey</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          className="section-subtitle"
        >
          How I've grown from 2023 to today — a chronological roadmap
        </motion.p>

        <div ref={timelineRef} className="relative mt-16 md:mt-20 pb-8">
          <div className="hidden md:block absolute left-1/2 top-0 w-[2px] h-full -translate-x-1/2 overflow-hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={revealed ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="origin-top w-full h-full"
              style={{
                background: 'linear-gradient(to bottom, var(--accent), var(--accent-secondary), var(--accent-highlight), #6366f1, var(--accent))',
              }}
            />
            {revealed && [...Array(4)].map((_, i) => {
              const dotColors = ['var(--accent)', 'var(--accent-secondary)', 'var(--accent-highlight)', '#6366f1']
              return (
                <motion.div key={i}
                  className="absolute left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full"
                  style={{ background: dotColors[i % dotColors.length], boxShadow: `0 0 6px ${dotColors[i % dotColors.length]}` }}
                  animate={{ top: ['-2%', '102%'], opacity: [0, 0.8, 0.8, 0] }}
                  transition={{ duration: 5 + i * 1.2, repeat: Infinity, delay: i * 1.5, ease: 'linear' }}
                />
              )
            })}

            <TimelinePulse
              fromIdx={pulseFrom}
              toIdx={pulseTo}
              color={
                pulseTo >= 0
                  ? milestones[pulseTo]?.color ?? 'var(--accent)'
                  : 'var(--accent)'
              }
              animating={pulseAnimating}
            />
          </div>

          <div className="md:hidden absolute left-[29px] top-0 w-[2px] h-full overflow-hidden">
            <div className="w-full h-full" style={{ background: 'linear-gradient(to bottom, var(--accent), var(--accent-secondary), var(--accent-highlight), #6366f1, var(--accent))' }} />
          </div>

          <div className="space-y-16 md:space-y-24">
            {milestones.map((m, i) => {
              const isExpanded = activeYear === m.year
              const isExiting = exitingYear === m.year
              const showCard = isExpanded || isExiting || enteringYear === m.year
              const animState = isExiting ? 'exiting' : enteringYear === m.year ? 'entering' : 'visible'
              const side = i % 2 === 0 ? 'left' : 'right'

              return (
                <div key={m.year} className="relative">
                  <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-0">
                    <div className="md:hidden flex flex-col items-start w-full pl-16">
                      <button onClick={() => handleYearClick(m.year)} className="relative mb-4 -ml-16">
                        <MobileBubble
                          year={m.year}
                          color={m.color}
                          glowColor={m.glowColor}
                          isExpanded={isExpanded}
                          isExiting={isExiting}
                        />
                      </button>
                      <AnimatePresence>
                        {showCard && (
                          <AnimatedCard
                            key={m.year}
                            milestone={m}
                            activeTech={activeTech}
                            setActiveTech={setActiveTech}
                            animState={animState}
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="hidden md:flex w-full items-start">
                      <div className={`w-1/2 ${side === 'left' ? 'flex justify-end pr-14' : 'flex justify-start pl-14'}`}>
                        {side === 'left' ? (
                          <button onClick={() => handleYearClick(m.year)} className="relative">
                            <DesktopBubble
                              year={m.year}
                              color={m.color}
                              glowColor={m.glowColor}
                              isExpanded={isExpanded}
                              isExiting={isExiting}
                            />
                          </button>
                        ) : (
                          <AnimatePresence>
                            {showCard && (
                              <AnimatedCard
                                key={m.year}
                                milestone={m}
                                activeTech={activeTech}
                                setActiveTech={setActiveTech}
                                animState={animState}
                              />
                            )}
                          </AnimatePresence>
                        )}
                      </div>

                      <div className="flex-shrink-0 w-0 flex justify-center relative">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={revealed ? { scale: 1 } : {}}
                          transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
                          className="w-4 h-4 rounded-full border-2 relative z-10"
                          data-timeline-node={i}
                          style={{
                            borderColor: m.color,
                            backgroundColor: isExpanded ? m.color : 'var(--bg-page)',
                            boxShadow: isExpanded ? `0 0 16px ${m.glowColor}` : 'none',
                            transition: 'background-color 0.35s ease, box-shadow 0.35s ease',
                          }}
                        />
                        {isExpanded && (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.4, opacity: 0.5 }}
                            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                            className="absolute inset-0 rounded-full"
                            style={{ border: `2px solid ${m.glowColor}`, boxShadow: `0 0 12px ${m.glowColor}` }}
                          />
                        )}
                      </div>

                      <div className={`w-1/2 ${side === 'right' ? 'flex justify-start pl-14' : 'flex justify-end pr-14'}`}>
                        {side === 'right' ? (
                          <button onClick={() => handleYearClick(m.year)} className="relative">
                            <DesktopBubble
                              year={m.year}
                              color={m.color}
                              glowColor={m.glowColor}
                              isExpanded={isExpanded}
                              isExiting={isExiting}
                            />
                          </button>
                        ) : (
                          <AnimatePresence>
                            {showCard && (
                              <AnimatedCard
                                key={m.year}
                                milestone={m}
                                activeTech={activeTech}
                                setActiveTech={setActiveTech}
                                animState={animState}
                              />
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function DesktopBubble({ year, color, glowColor, isExpanded, isExiting }: {
  year: string
  color: string
  glowColor: string
  isExpanded: boolean
  isExiting: boolean
}) {
  const isNext = year === 'Next'

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      className="relative cursor-pointer select-none"
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: isExpanded ? 1.35 : 1,
          opacity: isExpanded ? 0.55 : 0.25,
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{ background: `radial-gradient(circle, ${glowColor}, transparent 70%)` }}
      />

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1.12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full"
          style={{
            border: `2px solid ${glowColor}`,
            boxShadow: `0 0 24px ${glowColor}`,
          }}
        />
      )}

      <motion.div
        className="relative flex items-center justify-center rounded-full overflow-hidden"
        style={{
          width: 136,
          height: 136,
          background: isNext
            ? 'linear-gradient(135deg, var(--accent), var(--accent-secondary), var(--accent-highlight))'
            : `radial-gradient(circle at 35% 35%, ${color}22, ${color}08)`,
          border: isNext ? '2px solid var(--border-accent)' : `2px solid color-mix(in srgb, ${color} 40%, transparent)`,
        }}
        animate={{
          scale: isExpanded ? 1.08 : isExiting ? 0.92 : 1,
          boxShadow: isExpanded
            ? `0 0 40px ${glowColor}, inset 0 0 30px ${glowColor}`
            : `0 8px 32px rgba(0,0,0,0.1)`,
          borderColor: isExpanded
            ? color
            : isNext ? 'var(--border-accent)' : `color-mix(in srgb, ${color} 40%, transparent)`,
        }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 22,
          mass: 0.8,
        }}
      >
        <motion.div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute top-[8%] left-[15%] w-[50%] h-[30%] rounded-full opacity-30"
            style={{ background: `linear-gradient(135deg, ${color}, transparent)` }}
          />
        </motion.div>

        <motion.span className="relative z-10 text-3xl font-extrabold tracking-tight"
          style={{ color: isNext ? 'var(--text-primary)' : color }}
        >
          {year}
        </motion.span>
      </motion.div>
    </motion.div>
  )
}

function MobileBubble({ year, color, glowColor, isExpanded, isExiting }: {
  year: string
  color: string
  glowColor: string
  isExpanded: boolean
  isExiting: boolean
}) {
  const isNext = year === 'Next'

  return (
    <motion.div whileTap={{ scale: 0.95 }} className="relative cursor-pointer select-none">
      <div className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${glowColor}, transparent 70%)`,
          transform: 'scale(1.3)',
          opacity: isExpanded ? 0.55 : 0.25,
          transition: 'opacity 0.35s ease',
        }}
      />
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 rounded-full"
          style={{ border: `2px solid ${glowColor}`, boxShadow: `0 0 16px ${glowColor}` }}
        />
      )}
      <motion.div
        className="relative flex items-center justify-center rounded-full overflow-hidden"
        style={{
          width: 56,
          height: 56,
          background: isNext
            ? 'linear-gradient(135deg, var(--accent), var(--accent-secondary), var(--accent-highlight))'
            : `radial-gradient(circle at 35% 35%, ${color}22, ${color}08)`,
          border: isNext ? '2px solid var(--border-accent)' : `2px solid color-mix(in srgb, ${color} 40%, transparent)`,
        }}
        animate={{
          scale: isExpanded ? 1.08 : isExiting ? 0.92 : 1,
          boxShadow: isExpanded ? `0 0 24px ${glowColor}` : `0 4px 16px rgba(0,0,0,0.1)`,
          borderColor: isExpanded ? color : isNext ? 'var(--border-accent)' : `color-mix(in srgb, ${color} 40%, transparent)`,
        }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 22,
          mass: 0.8,
        }}
      >
        <motion.span className="relative z-10 text-base font-extrabold tracking-tight"
          style={{ color: isNext ? 'var(--text-primary)' : color }}
        >
          {year}
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
