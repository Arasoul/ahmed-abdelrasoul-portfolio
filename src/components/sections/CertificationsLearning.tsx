import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiAward, FiExternalLink, FiX, FiChevronLeft, FiChevronRight, FiChevronDown } from 'react-icons/fi'
import { certifications } from '../../data/certifications'
import { personalInfo } from '../../data/personal'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { usePortfolio } from '../../context/PortfolioContext'
import { isDimmed } from '../ui/TechRelationWrapper'

type Tab = 'certifications' | 'roadmap'

const tabLabels: Record<Tab, string> = {
  certifications: 'Certifications',
  roadmap: 'Roadmap',
}

const statusColors: Record<string, string> = {
  completed: 'var(--accent-secondary)',
  learning: 'var(--accent)',
  planned: 'var(--accent-highlight)',
}

const statusLabels: Record<string, string> = {
  completed: 'Completed',
  learning: 'In Progress',
  planned: 'Planned',
}

export default function CertificationsLearning() {
  const [tab, setTab] = useState<Tab>('certifications')
  const [selected, setSelected] = useState<string | null>(null)
  const [cardImgIdx, setCardImgIdx] = useState<Record<string, number>>({})
  const [modalImgIdx, setModalImgIdx] = useState(0)
  const [showAllCerts, setShowAllCerts] = useState(false)
  const { ref, revealed } = useScrollReveal({ threshold: 0.05 })
  const { activeTech, setActiveTech } = usePortfolio()
  const cert = certifications.find((c) => c.id === selected)

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden'
      setModalImgIdx(0)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selected])

  return (
    <section id="certifications" ref={ref} data-section="certifications" className="section relative overflow-hidden">
      <div className="section-glow" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.01] dark:opacity-[0.015]">
        <svg className="h-full w-full" viewBox="0 0 1440 800">
          {Array.from({ length: 30 }).map((_, i) => (
            <circle key={`pl-${i}`} cx={50 + Math.random() * 1340} cy={30 + Math.random() * 740} r={1 + Math.random() * 2}
              fill={i < 10 ? 'var(--accent)' : i < 20 ? 'var(--accent-secondary)' : 'var(--accent-highlight)'} opacity={0.08} />
          ))}
        </svg>
      </div>

      <div className="relative z-10 section-container">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="section-title">Certifications & <span className="gradient-text">Learning</span></motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 0.15 }}
          className="section-subtitle">Professional credentials, research interests, and continuous learning roadmap</motion.p>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          className="tabs max-w-sm mx-auto"
        >
          {(['certifications', 'roadmap'] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`tab-btn ${tab === t ? 'active' : ''}`}
            >{tabLabels[t]}</button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Certifications Tab */}
          {tab === 'certifications' && (
            <motion.div key="certs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(showAllCerts ? certifications : certifications.slice(0, 3)).map((c, i) => {
                  const certDimmed = isDimmed(c.skills, activeTech)
                  return (
                  <motion.button key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                    onClick={() => setSelected(c.id)}
                    className={`card-hover rounded-xl border p-4 text-left transition-all relative overflow-hidden tech-relation-target ${certDimmed ? 'dimmed' : ''}`}
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                  >
                  {/* Premium timeline accent */}
                  <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary), var(--accent-highlight))' }} />
                  {(() => {
                    const imgs = c.gallery ?? (c.image ? [c.image] : [])
                    const idx = cardImgIdx[c.id] ?? 0
                    const src = imgs[idx]
                    if (!src) return null
                    return (
                      <div className="mb-3 overflow-hidden rounded-lg relative group">
                        <img src={src} alt={c.title}
                          className="w-full h-28 object-cover rounded-lg"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                        {imgs.length > 1 && (
                          <>
                            <button onClick={(e) => { e.stopPropagation(); setCardImgIdx(p => ({ ...p, [c.id]: (idx - 1 + imgs.length) % imgs.length })) }}
                              className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            ><FiChevronLeft size={12} /></button>
                            <button onClick={(e) => { e.stopPropagation(); setCardImgIdx(p => ({ ...p, [c.id]: (idx + 1) % imgs.length })) }}
                              className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            ><FiChevronRight size={12} /></button>
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                              {imgs.map((_, di) => (
                                <span key={di} className={`block w-1.5 h-1.5 rounded-full ${di === idx ? 'bg-white' : 'bg-white/40'}`} />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })()}
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                      style={{ background: 'linear-gradient(135deg, var(--accent-20), var(--accent-highlight-20))' }}>
                      <FiAward size={16} className="text-accent" />
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-primary leading-tight">{c.title}</h4>
                      <p className="text-[11px] text-accent">{c.issuer}</p>
                    </div>
                  </div>
                  <p className="mb-3 text-[12px] leading-relaxed text-secondary line-clamp-2">{c.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted">{c.date}</span>
                    <span className="text-[10px] font-medium text-accent">View Details &rarr;</span>
                  </div>
                </motion.button>
              )
              })}
              </div>
              {!showAllCerts && certifications.length > 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
                  <button onClick={() => setShowAllCerts(true)}
                    className="btn btn-secondary group"
                  >
                    +{certifications.length - 3} More Certifications <FiChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Roadmap Tab */}
          {tab === 'roadmap' && (
            <motion.div key="roadmap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="max-w-xl mx-auto"
            >
              <p className="mb-6 text-xs text-secondary text-center">Continuous learning journey from fundamentals to advanced topics</p>
              <div className="relative pl-6">
                {/* Vertical connecting line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 rounded-full"
                  style={{ background: 'linear-gradient(to bottom, var(--accent-secondary), var(--accent), var(--accent-highlight))' }} />
                {personalInfo.learningRoadmap.map((lr, i) => {
                  const isSection = !lr.description
                  return (
                    <motion.div key={lr.topic} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                      className={`relative ${isSection ? 'pb-2 pt-6 first:pt-0' : 'pb-5'} last:pb-0`}
                    >
                      {isSection ? (
                        <div className="ml-2">
                          <div className="flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
                            <h4 className="text-sm font-bold tracking-wider uppercase gradient-text">{lr.topic}</h4>
                            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, var(--accent-20), transparent)' }} />
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Dot on timeline */}
                          <div className="absolute left-[-18px] top-1.5 h-[10px] w-[10px] rounded-full border-2"
                            style={{
                              background: 'var(--bg-page)',
                              borderColor: statusColors[lr.status] || 'var(--text-muted)',
                            }}
                          />
                          <div className="card-hover rounded-xl p-3 ml-2">
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <h5 className="text-sm font-semibold text-primary">{lr.topic}</h5>
                              <span className="text-[10px] font-medium flex-shrink-0 px-2 py-0.5 rounded-full"
                                style={{
                                  background: `${statusColors[lr.status] || 'var(--text-muted)'}15`,
                                  color: statusColors[lr.status] || 'var(--text-muted)',
                                }}
                              >{statusLabels[lr.status] || lr.status}</span>
                            </div>
                            {lr.description && <p className="text-[11px] text-secondary">{lr.description}</p>}
                          </div>
                        </>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {cert && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
              onClick={() => setSelected(null)}>
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()} className="modal-content max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl border p-6"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-accent)' }}
              >
                <button onClick={() => setSelected(null)} className="btn-icon absolute right-4 top-4"><FiX size={18} /></button>
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl text-accent"
                    style={{ background: 'linear-gradient(135deg, var(--accent-20), var(--accent-highlight-20))' }}>
                    <FiAward size={22} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-primary">{cert.title}</h3>
                    <p className="text-sm text-accent">{cert.issuer}</p>
                  </div>
                </div>
                {(() => {
                  const imgs = cert.gallery ?? (cert.image ? [cert.image] : [])
                  const src = imgs[modalImgIdx]
                  if (!src) return null
                  return (
                    <div className="mb-4 overflow-hidden rounded-xl relative group">
                      <img src={src} alt={cert.title}
                        className="w-full h-auto object-contain rounded-xl max-h-[70vh]"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                      {imgs.length > 1 && (
                        <>
                          <button onClick={(e) => { e.stopPropagation(); setModalImgIdx((modalImgIdx - 1 + imgs.length) % imgs.length) }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          ><FiChevronLeft size={14} /></button>
                          <button onClick={(e) => { e.stopPropagation(); setModalImgIdx((modalImgIdx + 1) % imgs.length) }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          ><FiChevronRight size={14} /></button>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {imgs.map((_, di) => (
                              <button key={di} onClick={(e) => { e.stopPropagation(); setModalImgIdx(di) }}
                                className={`block w-2 h-2 rounded-full ${di === modalImgIdx ? 'bg-white' : 'bg-white/40'} transition-colors`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })()}
                <p className="mb-4 text-sm leading-relaxed text-secondary">{cert.description}</p>
                {cert.credentialId && (
                  <div className="mb-3 rounded-xl p-3" style={{ backgroundColor: 'var(--accent-primary-5)' }}>
                    <span className="text-[10px] font-semibold text-accent">Credential ID</span>
                    <p className="font-mono text-xs text-secondary">{cert.credentialId}</p>
                  </div>
                )}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="mb-4">
                    <h4 className="mb-2 text-xs font-semibold" style={{ color: 'var(--accent-secondary)' }}>Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((s) => (
                        <span key={s} className={`rounded-full px-2.5 py-1 text-[10px] tech-badge-clickable ${activeTech === s ? 'active-tech' : ''}`}
                          style={{ backgroundColor: activeTech === s ? 'var(--accent)' : 'var(--accent-secondary-10)', color: activeTech === s ? 'white' : 'var(--accent-secondary)' }}
                          onClick={() => setActiveTech(activeTech === s ? null : s)}
                        >{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <FiExternalLink size={14} /> View Credential
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
