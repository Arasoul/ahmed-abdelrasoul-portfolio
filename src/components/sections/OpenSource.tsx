import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiBook, FiGitBranch } from 'react-icons/fi'
import { personalInfo } from '../../data/personal'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const packages = [
  {
    name: 'autoeda',
    display: 'autoeda',
    description: 'Automated exploratory data analysis with executive-ready reports in HTML, PDF, and Markdown. One-function-call EDA pipeline.',
    pypi: 'https://pypi.org/project/autoeda/',
    repo: 'https://github.com/Arasoul/AutoEDA',
    version: '1.0.0',
  },
  {
    name: 'datapreptoolkit',
    display: 'datapreptoolkit',
    description: 'Data preprocessing, profiling, validation, cleaning, and quality reporting. Complements AutoEDA as a pre-processing step.',
    pypi: 'https://pypi.org/project/datapreptoolkit/',
    repo: 'https://github.com/Arasoul/DataPrepToolkit',
    version: '1.0.0',
  },
]

export default function OpenSource() {
  const { ref, revealed } = useScrollReveal({ threshold: 0.05 })
  const username = personalInfo.github.split('/').filter(Boolean).pop() || 'Arasoul'

  return (
    <section id="opensource" ref={ref} data-section="opensource" className="section relative overflow-hidden">
      <div className="section-glow" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.012] dark:opacity-[0.02]">
        <svg className="h-full w-full" viewBox="0 0 1440 800">
          {Array.from({ length: 20 }).map((_, i) => (
            <circle key={`sn-${i}`} cx={80 + Math.random() * 1280} cy={50 + Math.random() * 700} r={1.5}
              fill="var(--accent-highlight)" opacity={0.15} />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`sl-${i}`} x1={100 + Math.random() * 1200} y1={80 + Math.random() * 600}
              x2={120 + Math.random() * 1200} y2={80 + Math.random() * 600}
              stroke="var(--accent-highlight)" strokeWidth={0.3} opacity={0.1} />
          ))}
        </svg>
      </div>

      <div className="relative z-10 section-container">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="section-title">Open <span className="gradient-text">Source</span></motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 0.15 }}
          className="section-subtitle">Published Python packages on PyPI — designed, built, tested, and documented</motion.p>

        <div className="grid gap-8 md:grid-cols-5">
          {/* GitHub profile sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={revealed ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="card-hover rounded-xl p-6 text-center mb-6">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: 'linear-gradient(135deg, var(--accent-20), var(--accent-highlight-20))' }}>
                <FiGithub size={28} className="text-accent" />
              </div>
              <h3 className="text-lg font-bold text-primary">{username}</h3>
              <p className="text-xs text-muted mt-1">Open source contributor</p>
              <div className="mt-4 flex justify-center gap-4">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                  className="btn btn-secondary text-xs py-1.5 px-3">
                  <FiGithub size={13} /> View Profile
                </a>
              </div>
            </div>
          </motion.div>

          {/* Package listings */}
          <div className="md:col-span-3">
            <motion.h3 initial={{ opacity: 0, x: 20 }} animate={revealed ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}
              className="mb-4 text-sm font-semibold text-accent-secondary">Published Packages</motion.h3>
            <div className="space-y-3">
              {packages.map((pkg, i) => (
                <motion.div key={pkg.name} initial={{ opacity: 0, x: 20 }} animate={revealed ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.25 + i * 0.06 }}
                  className="card-hover rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-accent-secondary"
                      style={{ background: 'var(--accent-secondary-10)' }}>
                      <FiBook size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-semibold text-primary">{pkg.display}</h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                          style={{ background: 'var(--accent-primary-5)', color: 'var(--text-muted)' }}>
                          v{pkg.version}
                        </span>
                      </div>
                      <p className="text-xs text-secondary mt-0.5">{pkg.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <a href={pkg.pypi} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[10px] font-medium text-accent hover:underline">
                          <FiExternalLink size={10} /> PyPI
                        </a>
                        <a href={pkg.repo} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[10px] font-medium text-accent hover:underline">
                          <FiGitBranch size={10} /> Repository
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
              className="mt-6 card-hover rounded-xl p-4 flex items-center gap-3"
            >
              <FiGithub size={14} className="text-accent" />
              <p className="text-xs text-secondary">
                All packages are <code className="text-accent">pip install</code>-able. Source code on{' '}
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-accent underline">GitHub</a>.
                Issues and PRs welcome.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
