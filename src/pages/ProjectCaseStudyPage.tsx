import { Link, Navigate, useParams } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight, FiGithub, FiExternalLink, FiBookOpen, FiGrid, FiLinkedin, FiMail } from 'react-icons/fi'
import { projects, projectCategories } from '../data/projects'
import { personalInfo } from '../data/personal'

const categoryLabel = (id: string) => projectCategories.find((c) => c.id === id)?.label || id

interface Block {
  index: string
  label: string
  title: string
  body?: string
  items?: string[]
  tone?: 'default' | 'accent'
}

export default function ProjectCaseStudyPage() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return <Navigate to="/" replace />
  }

  const blocks: Block[] = (
    [
      project.problem
        ? { index: '01', label: 'PROBLEM', title: 'The problem', body: project.problem }
        : null,
      { index: '02', label: 'SYSTEM', title: 'The system', body: project.overview },
      (project.caseWhy ?? project.approach)
        ? { index: '03', label: 'WHY', title: 'Why it was built', body: project.caseWhy, tone: 'accent' as const }
        : null,
      project.solution
        ? { index: '04', label: 'HOW', title: 'How it works', body: project.solution, items: project.features }
        : project.approach
          ? { index: '04', label: 'HOW', title: 'How it works', body: project.approach, items: project.features }
          : null,
      { index: '05', label: 'ENGINEERING', title: 'The engineering', body: project.challenges, items: project.technologies },
      { index: '06', label: 'EVIDENCE', title: 'Verified evidence', items: project.features },
      project.impact
        ? { index: '07', label: 'RESULT', title: 'The result', body: project.impact, tone: 'accent' as const }
        : null,
      project.limitations && project.limitations.length > 0
        ? { index: '08', label: 'LIMITATIONS', title: `What ${project.title} does not do yet`, items: project.limitations }
        : null,
    ] as (Block | null)[]
  ).filter((b): b is Block => b !== null)

  const exploreLinks: { label: string; href?: string; icon: React.ReactNode }[] = [
    { label: 'Source code', href: project.github, icon: <FiGithub size={12} /> },
    { label: project.ctaLabel || 'Product / demo', href: project.productUrl || project.demo, icon: <FiExternalLink size={12} /> },
    { label: 'Live system', href: project.live, icon: <FiExternalLink size={12} /> },
  ].filter((l) => Boolean(l.href))

  const related = (project.relatedProjects ?? [])
    .map((rid) => projects.find((p) => p.id === rid))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  const showToc = blocks.length >= 3

  return (
    <div className="case-study">
      {/* Top bar */}
      <header className="cs-topbar">
        <div className="section-container cs-topbar-inner">
          <Link to="/" className="cs-back">
            <FiArrowLeft size={13} /> Back to portfolio
          </Link>
          <span className="cs-topbar-id">
            <span className="status-dot" /> {project.title.toUpperCase()} · CASE STUDY
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="section-container cs-hero" id="top">
        <p className="cs-crumb font-mono">
          CASE STUDY / <span className="text-muted">{categoryLabel(project.category)}</span>
        </p>
        <h1 className="cs-title">{project.title}</h1>
        <p className="cs-hero-overview">{project.overview}</p>

        <div className="cs-hero-meta">
          {project.metric && <span className="metric-chip">{project.metric}</span>}
          {project.timeline && <span className="cs-meta-item font-mono">TIMELINE / {project.timeline}</span>}
          {project.role && <span className="cs-meta-item font-mono">ROLE / {project.role}</span>}
          <span className="status-badge"><span className="status-dot" /> {project.status === 'complete' ? 'Completed' : project.status}</span>
        </div>

        <div className="cs-hero-actions">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="cs-btn">
              <FiGithub size={14} /> Source
            </a>
          )}
          {(project.productUrl || project.demo) && (
            <a href={project.productUrl || project.demo} target="_blank" rel="noopener noreferrer" className="cs-btn">
              <FiExternalLink size={14} /> {project.ctaLabel || 'Explore'}
            </a>
          )}
          <Link to="/#systems" className="cs-btn cs-btn--ghost">
            <FiGrid size={14} /> All systems
          </Link>
        </div>
      </section>

      {/* Table of contents */}
      {showToc && (
        <nav className="section-container cs-toc" aria-label="Case study sections">
          {blocks.map((b) => (
            <a key={b.index} href={`#cs-${b.index}`} className="cs-toc-item font-mono">
              <span>{b.index}</span> {b.label}
            </a>
          ))}
        </nav>
      )}

      {/* Sections */}
      <main className="section-container cs-body">
        {blocks.map((b) => (
          <section key={b.index} id={`cs-${b.index}`} className="cs-block">
            <div className="cs-block-head">
              <span className="cs-block-num font-mono">{b.index}</span>
              <span className="term-label-accent">{b.label}</span>
            </div>
            <div className="cs-block-content">
              <h2 className="cs-block-title">{b.title}</h2>
              {b.body && <p className="cs-block-body">{b.body}</p>}
              {b.items && b.items.length > 0 && (
                <ul className="cs-list">
                  {b.items.map((it) => (
                    <li key={it} className="cs-list-item">
                      <span className="cs-list-marker" aria-hidden="true">›</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}

        {/* EXPLORE */}
        <section id="cs-explore" className="cs-block">
          <div className="cs-block-head">
            <span className="cs-block-num font-mono">09</span>
            <span className="term-label-accent">EXPLORE</span>
          </div>
          <div className="cs-block-content">
            <h2 className="cs-block-title">Explore {project.title}</h2>
            {exploreLinks.length > 0 && (
              <div className="cs-explore-links">
                {exploreLinks.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="cs-btn">
                    {l.icon} {l.label}
                  </a>
                ))}
              </div>
            )}
            {related.length > 0 && (
              <>
                <h3 className="cs-related-title font-mono">RELATED SYSTEMS</h3>
                <div className="cs-related-grid">
                  {related.map((p) => (
                    <Link key={p.id} to={`/projects/${p.id}`} className="cs-related-card">
                      <span className="text-xs font-bold text-primary">{p.title}</span>
                      <span className="line-clamp-2 text-[11px] text-secondary">{p.overview}</span>
                      <span className="cs-related-go font-mono text-[10px] uppercase tracking-wider text-accent">
                        View <FiArrowRight size={11} className="inline" />
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Back */}
        <section className="cs-block">
          <div className="cs-block-content cs-back-bottom">
            <Link to="/" className="cs-btn cs-btn--ghost">
              <FiArrowLeft size={14} /> Back to the portfolio
            </Link>
            <a href="#top" className="cs-btn cs-btn--ghost css-top">
              <FiBookOpen size={14} /> Top
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t px-4 py-8 md:px-8" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="section-container flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
            <div className="text-xs font-semibold text-primary">{personalInfo.name}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-accent">AI &amp; Data Engineer</div>
            <div className="text-[10px] text-muted">&copy; {new Date().getFullYear()}. Built with React, TypeScript &amp; Tailwind CSS.</div>
          </div>
          <div className="flex items-center gap-3">
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn">
              <FiLinkedin size={14} />
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub">
              <FiGithub size={14} />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="btn-icon" aria-label="Email">
              <FiMail size={14} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}