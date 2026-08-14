import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCpu, FiLayers, FiZap, FiEye, FiMessageSquare, FiBox, FiCamera, FiChevronRight } from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { usePortfolio } from '../../context/PortfolioContext'

interface Interest {
  id: string
  title: string
  description: string
  status: 'Exploring' | 'Researching' | 'Learning' | 'Building' | 'Planned'
  why: string
  applications: string[]
  relatedTechs: string[]
  icon: React.ComponentType<{ size?: number }>
}

const interests: Interest[] = [
  {
    id: 'game-ai',
    title: 'Game AI',
    description: 'Intelligent agents and decision-making for interactive experiences',
    status: 'Exploring',
    icon: FiLayers,
    why: 'Games are a controlled environment where AI can be researched without real-world safety constraints. I want to understand how behavior trees, state machines, and planning algorithms create believable agent behavior.',
    applications: ['NPC behavior trees', 'Procedural content generation', 'Adaptive difficulty systems'],
    relatedTechs: ['Unity', 'C#', 'Pathfinding'],
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    description: 'Teaching machines to see, understand, and interpret visual data',
    status: 'Researching',
    icon: FiEye,
    why: 'Vision is our richest sensor. I want to build systems that work reliably on real-world data — not just curated benchmarks. Cultural heritage applications are a particular interest.',
    applications: ['Cultural heritage preservation', 'Document analysis', 'Real-time object detection'],
    relatedTechs: ['OpenCV', 'PyTorch', 'YOLO'],
  },
  {
    id: 'interactive-systems',
    title: 'Intelligent Interactive Systems',
    description: 'Real-time applications where AI and user input shape the experience together',
    status: 'Learning',
    icon: FiZap,
    why: 'Most AI systems are request-response: input in, prediction out. I want to explore continuous, bidirectional interaction where the system adapts as the user acts.',
    applications: ['AI-assisted creative tools', 'Gesture-controlled interfaces', 'Adaptive learning platforms'],
    relatedTechs: ['Unity', 'C#', 'Real-time Systems'],
  },
  {
    id: 'generative-ai',
    title: 'Generative AI',
    description: 'Creating new content — images, text, code — with generative models',
    status: 'Exploring',
    icon: FiCamera,
    why: 'Generative models are moving from novelty to utility. I am interested in practical applications — procedural content for games, synthetic data for training, and AI-assisted design.',
    applications: ['Procedural content in games', 'Synthetic data generation', 'AI-assisted design tools'],
    relatedTechs: ['Diffusion Models', 'Transformers', 'Python'],
  },
  {
    id: 'automation',
    title: 'AI Automation & Agentic Workflows',
    description: 'AI-driven systems that automate complex, multi-step business workflows',
    status: 'Building',
    icon: FiBox,
    why: 'This is the path I am actively building toward: turning AI from a model into a practical operating layer. I am interested in workflow automation, AI agents, internal copilots, and business processes that run with less manual effort and more consistency.',
    applications: ['n8n workflow orchestration', 'Slack, email, and web agents', 'Internal AI copilots', 'Automated reporting and processing'],
    relatedTechs: ['Python', 'n8n', 'LLMs', 'API Integration', 'Automation'],
  },
  {
    id: 'nlp',
    title: 'Natural Language Processing',
    description: 'Bridging human language and machine understanding',
    status: 'Researching',
    icon: FiMessageSquare,
    why: 'Language is how humans communicate intent. I want to build systems that understand not just keywords, but meaning, sentiment, and context.',
    applications: ['Multilingual text analysis', 'Sentiment and intent classification', 'Information extraction'],
    relatedTechs: ['spaCy', 'Transformers', 'LLMs'],
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    description: 'Deepening expertise in modern AI architectures and systems',
    status: 'Building',
    icon: FiCpu,
    why: 'AI is the most impactful technology I can work on. I want to build systems that work in production — not just in notebooks — and that genuinely augment human capability.',
    applications: ['End-to-end ML pipelines', 'Real-time decision systems', 'AI-powered development tools'],
    relatedTechs: ['Python', 'PyTorch', 'scikit-learn'],
  },
]

const statusColors: Record<string, string> = {
  Exploring: 'var(--accent-highlight)',
  Researching: 'var(--accent-secondary)',
  Learning: 'var(--accent)',
  Building: '#6366f1',
  Planned: 'var(--text-muted)',
}

export default function ResearchFuture() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const { ref, revealed } = useScrollReveal({ threshold: 0.05 })
  const { activeTech, setActiveTech } = usePortfolio()

  return (
    <section id="research-future" ref={ref} data-section="research-future" className="section relative overflow-hidden">
      <div className="section-glow" />
      <div className="relative z-10 section-container">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="section-title">Research <span className="gradient-text">Interests</span></motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 0.15 }}
          className="section-subtitle">Topics I actively read, prototype, and explore — distinct from my structured learning roadmap</motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {interests.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`card-hover rounded-xl p-4 cursor-pointer relative transition-all ${expanded === item.id ? 'ring-2' : ''}`}
              style={{
                borderColor: expanded === item.id ? statusColors[item.status] : undefined,
                ...(expanded === item.id ? { boxShadow: `0 0 20px ${statusColors[item.status]}20` } : {}),
              }}
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
              role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpanded(expanded === item.id ? null : item.id) }}
              aria-expanded={expanded === item.id}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ background: `${statusColors[item.status]}15`, color: statusColors[item.status] }}>
                    <item.icon size={15} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-primary">{item.title}</h3>
                    <p className="text-[11px] text-secondary">{item.description}</p>
                  </div>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: `${statusColors[item.status]}15`, color: statusColors[item.status] }}
                >{item.status}</span>
              </div>

              <AnimatePresence>
                {expanded === item.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }} className="overflow-hidden"
                  >
                    <div className="border-t pt-3 mt-2 space-y-3" style={{ borderColor: 'var(--border-subtle)' }}>
                      <div>
                        <h4 className="text-[10px] font-semibold uppercase tracking-wider text-accent mb-1">Why This Interests Me</h4>
                        <p className="text-[12px] text-secondary leading-relaxed">{item.why}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-semibold uppercase tracking-wider text-accent-secondary mb-1">Potential Applications</h4>
                        <ul className="space-y-1">
                          {item.applications.map((a) => (
                            <li key={a} className="flex items-center gap-1.5 text-[11px] text-secondary">
                              <FiChevronRight size={9} className="text-accent-secondary flex-shrink-0" /> {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-semibold uppercase tracking-wider text-accent-highlight mb-1.5">Related Technologies</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {item.relatedTechs.map((t) => (
                            <span key={t} className="tech-badge-clickable px-2 py-0.5 rounded-full text-[9px] font-medium"
                              style={{ background: activeTech === t ? 'var(--accent)' : 'var(--accent-primary-5)', color: activeTech === t ? 'white' : 'var(--accent)' }}
                              onClick={(e) => { e.stopPropagation(); setActiveTech(activeTech === t ? null : t) }}
                            >{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-2 flex items-center gap-1 text-[10px] font-medium text-muted">
                <span>{expanded === item.id ? 'Show less' : 'Learn more'}</span>
                <FiChevronRight size={10} className={`transition-transform ${expanded === item.id ? 'rotate-90' : ''}`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
