import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CSSProperties } from 'react'
import {
  FiCalendar, FiMapPin, FiBriefcase, FiCpu, FiUsers, FiGitBranch, FiLink,
  FiTerminal, FiMessageCircle, FiTool, FiShare2, FiChevronDown, FiAward,
  FiMaximize2, FiChevronLeft, FiChevronRight, FiX,
} from 'react-icons/fi'
import { experiences } from '../../data/experience'
import { certifications } from '../../data/certifications'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { Experience as ExperienceEntry, Certification } from '../../types'

const typeLabel: Record<ExperienceEntry['type'], string> = {
  'full-time': 'Full-time',
  internship: 'Internship',
  'co-founder': 'Co-Founder',
}

const currentOrder = ['depi', 'ecu']
const pastOrder = ['voidspark', 'dolab', 'fuzetek', 'amit']

const current = currentOrder
  .map((id) => experiences.find((e) => e.id === id))
  .filter((e): e is ExperienceEntry => Boolean(e))

const past = pastOrder
  .map((id) => experiences.find((e) => e.id === id))
  .filter((e): e is ExperienceEntry => Boolean(e))

const trackOf = (id: string) =>
  id === 'depi'
    ? { label: 'Building Intelligent Systems', Icon: FiCpu, accent: 'var(--accent)' }
    : { label: 'Sharing Technical Knowledge', Icon: FiUsers, accent: 'var(--accent-secondary)' }

const focusIconOf = (id: string) => {
  if (id === 'ecu') return [FiMessageCircle, FiTool, FiShare2, FiUsers]
  return [FiGitBranch, FiLink, FiCpu, FiTerminal]
}

const focusLabelOf = (id: string) => (id === 'ecu' ? 'Key Strengths' : 'Key Focus Areas')

function CredentialsModule({ revealed }: { revealed: boolean }) {
  const [open, setOpen] = useState(false)
  const [viewer, setViewer] = useState<Certification | null>(null)
  const [page, setPage] = useState(0)

  const galleryImages = viewer?.gallery?.length
    ? viewer.gallery
    : viewer?.image
      ? [viewer.image]
      : []

  useEffect(() => {
    if (!viewer) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setViewer(null)
        return
      }
      if (galleryImages.length > 1) {
        if (e.key === 'ArrowRight') setPage((p) => (p + 1) % galleryImages.length)
        if (e.key === 'ArrowLeft') setPage((p) => (p - 1 + galleryImages.length) % galleryImages.length)
      }
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [viewer, galleryImages.length])

  const openViewer = (cert: Certification) => {
    setPage(0)
    setViewer(cert)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={revealed ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
        className="credentials-compact"
      >
        <button
          onClick={() => setOpen(!open)}
          className="credentials-toggle"
        >
          <div className="flex items-center gap-2">
            <FiAward size={13} className="text-accent" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
              {certifications.length} Certifications & Training
            </span>
          </div>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FiChevronDown size={14} className="text-muted" />
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="credentials-list"
            >
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <button
                    type="button"
                    onClick={() => openViewer(cert)}
                    className="credential-item"
                    aria-label={`View certificate: ${cert.title}`}
                    disabled={!cert.image}
                  >
                    <span className="credential-thumb">
                      {cert.thumb && (
                        <img
                          src={cert.thumb}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-semibold text-primary truncate">{cert.title}</div>
                      <div className="text-[9px] text-muted">{cert.issuer}</div>
                    </div>
                    <span className="text-[9px] text-muted whitespace-nowrap">{cert.date}</span>
                    <span className="credential-view">
                      <FiMaximize2 size={11} />
                    </span>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {viewer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cert-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${viewer.title} certificate`}
            onClick={() => setViewer(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="cert-lightbox-card"
              onClick={(e) => e.stopPropagation()}
            >
              <header className="cert-lightbox-header">
                <div className="min-w-0">
                  <h3 className="cert-lightbox-title truncate">{viewer.title}</h3>
                  <p className="cert-lightbox-sub truncate">
                    {viewer.issuer} · {viewer.date}
                  </p>
                </div>
                <button
                  type="button"
                  className="cert-lightbox-close"
                  onClick={() => setViewer(null)}
                  aria-label="Close certificate"
                >
                  <FiX size={16} />
                </button>
              </header>

              <div className="cert-lightbox-stage">
                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="cert-lightbox-nav cert-lightbox-nav--prev"
                      onClick={() => setPage((p) => (p - 1 + galleryImages.length) % galleryImages.length)}
                      aria-label="Previous page"
                    >
                      <FiChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      className="cert-lightbox-nav cert-lightbox-nav--next"
                      onClick={() => setPage((p) => (p + 1) % galleryImages.length)}
                      aria-label="Next page"
                    >
                      <FiChevronRight size={16} />
                    </button>
                  </>
                )}
                <img
                  key={galleryImages[Math.min(page, galleryImages.length - 1)] ?? viewer.image}
                  src={galleryImages[Math.min(page, galleryImages.length - 1)] ?? viewer.image}
                  alt={`${viewer.title} certificate`}
                  className="cert-lightbox-img"
                />
              </div>

              <footer className="cert-lightbox-footer">
                <span>{viewer.credentialId ? `ID: ${viewer.credentialId}` : viewer.description.slice(0, 72)}</span>
                {galleryImages.length > 1 && (
                  <span className="whitespace-nowrap">
                    {Math.min(page, galleryImages.length - 1) + 1} / {galleryImages.length}
                  </span>
                )}
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function CurrentRoleCard({ exp }: { exp: ExperienceEntry }) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.05 })
  const track = trackOf(exp.id)
  const icons = focusIconOf(exp.id)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={revealed ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="current-exp-card"
      style={{ '--card-accent': track.accent } as CSSProperties}
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <span className="exp-track"><track.Icon size={12} /> {track.label}</span>
        <span className="status-badge status-badge--current">
          <span className="status-dot status-dot--pulse" /> Current
        </span>
      </div>

      <h3 className="exp-role">{exp.role.toUpperCase()}</h3>
      <p className="exp-org">{exp.company}</p>

      <div className="exp-type"><FiBriefcase size={11} /> {typeLabel[exp.type]}</div>

      <div className="exp-meta">
        <span className="exp-meta-item"><FiCalendar size={11} /> {exp.period}</span>
        {exp.location && <span className="exp-meta-item"><FiMapPin size={11} /> {exp.location}</span>}
      </div>

      <p className="exp-description">{exp.overview}</p>

      <div className="exp-focus-label">{focusLabelOf(exp.id)}</div>
      <div className="exp-focus-grid">
        {exp.focus?.map((f, i) => {
          const Icon = icons[i % icons.length] ?? FiGitBranch
          return (
            <div key={f.title} className="exp-focus-item">
              <span className="exp-focus-icon"><Icon size={12} /></span>
              <div className="min-w-0">
                <div className="exp-focus-title">{f.title}</div>
                <p className="exp-focus-text">{f.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {exp.technologies && exp.technologies.length > 0 && (
        <div className="exp-tech">
          {exp.technologies.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default function Experience() {
  const { ref, revealed } = useScrollReveal({ threshold: 0.03 })

  return (
    <section id="experience" ref={ref} data-section="experience" className="section relative overflow-hidden">
      <div className="section-glow" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.015] dark:opacity-[0.025]">
        <svg className="h-full w-full" viewBox="0 0 1440 800">
          <pattern id="experience-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--accent-secondary)" strokeWidth={0.3} />
          </pattern>
          <rect x="0" y="0" width="1440" height="800" fill="url(#experience-grid)" />
        </svg>
      </div>

      <div className="relative z-10 section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-head"
        >
          <span className="section-index">05 / 07</span>
          <h2 className="section-title-left">Experience</h2>
          <div className="section-rule" />
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mb-10 max-w-2xl"
        >
          <span className="term-label-accent mb-2 block">BUILDING SYSTEMS. SHARING KNOWLEDGE.</span>
          <p className="text-sm leading-relaxed text-secondary">
            Current work combines AI-powered automation with technical education — building
            practical intelligent workflows while helping make complex technical concepts easier
            to understand.
          </p>
        </motion.div>

        {/* Current experience — two complementary tracks */}
        <div className="relative">
          <div className="mb-4 flex items-center gap-2">
            <span className="term-label-accent">CURRENT EXPERIENCE</span>
            <span className="hidden text-xs text-secondary sm:inline">two complementary directions</span>
          </div>

          <div className="exp-connector" aria-hidden>＋</div>

          <div className="grid gap-6 md:grid-cols-2">
            {current.map((exp) => (
              <CurrentRoleCard key={exp.id} exp={exp} />
            ))}
          </div>
        </div>

        {/* Path to here */}
        <div className="exp-divider"><span>Path to Here</span></div>

        <div className="exp-history">
          {past.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -12 }}
              animate={revealed ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.05 * i, duration: 0.4 }}
              className="exp-history-row"
            >
              <div className="flex min-w-0 items-start gap-3">
                <span className="exp-history-dot" />
                <div className="min-w-0">
                  <div className="exp-history-role">{exp.role}</div>
                  <div className="exp-history-org">{exp.company}</div>
                </div>
              </div>
              <div className="exp-history-meta">
                <span className="exp-history-type">{typeLabel[exp.type]}</span>
                <span className="exp-history-period">{exp.period}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Credentials - compact expandable module */}
        <CredentialsModule revealed={revealed} />
      </div>
    </section>
  )
}
