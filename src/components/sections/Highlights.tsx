import { motion } from 'framer-motion'
import { FiAward, FiCode, FiShield, FiBox, FiSend, FiCpu, FiTool, FiTarget } from 'react-icons/fi'
import { projects } from '../../data/projects'
import { certifications } from '../../data/certifications'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  '\uD83C\uDF93': FiAward, '\uD83D\uDCBB': FiCode, '\uD83D\uDCDC': FiShield, '\uD83D\uDCE6': FiBox,
  '\uD83D\uDE80': FiSend, '\uD83E\uDD16': FiCpu, '\uD83D\uDD27': FiTool, '\uD83C\uDFAF': FiTarget,
}

export default function Highlights() {
  const { ref, revealed } = useScrollReveal<HTMLElement>({ threshold: 0.1 })

  const stats = [
    { icon: '\uD83C\uDF93', label: 'Computer Science', value: 'B.Sc.', desc: 'Graduate' },
    { icon: '\uD83D\uDCBB', label: 'Professional Projects', value: `${projects.length}+`, desc: 'Across AI, Data & SWE' },
    { icon: '\uD83D\uDCDC', label: 'Certifications', value: `${certifications.length}+`, desc: 'Professional Credentials' },
    { icon: '\uD83D\uDCE6', label: 'Open Source', value: `${projects.filter(p => p.github).length}+`, desc: 'Public Repositories' },
    { icon: '\uD83D\uDE80', label: 'Co-Founder', value: 'VoidSpark', desc: 'Game Studio' },
    { icon: '\uD83E\uDD16', label: 'AI Engineer', value: 'Experienced', desc: 'ML, CV, NLP' },
    { icon: '\uD83D\uDD27', label: 'Software Engineer', value: 'Full-Stack', desc: 'Python, C++, C#' },
    { icon: '\uD83C\uDFAF', label: 'Career', value: 'Active', desc: 'Open for Opportunities' },
  ]

  return (
    <section id="highlights" ref={ref} className="section">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          At a <span className="gradient-text">Glance</span>
        </motion.h2>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stats.map((s, i) => {
            const Icon = iconMap[s.icon] || FiTarget
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                animate={revealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06, ease: 'easeOut' }}
                className="card-hover rounded-2xl p-4 text-center"
              >
                <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: 'linear-gradient(135deg, var(--accent-primary-10), var(--accent-highlight-10))' }}
                >
                  <span className="text-accent"><Icon size={18} /></span>
                </div>
                <div className="text-lg font-bold text-accent">{s.value}</div>
                <div className="text-xs font-medium text-secondary">{s.label}</div>
                <div className="mt-0.5 text-[10px] text-muted opacity-60" style={{ color: 'var(--text-muted)' }}>{s.desc}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
