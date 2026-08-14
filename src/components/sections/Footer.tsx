import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { personalInfo } from '../../data/personal'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t px-4 py-8 md:px-8" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="section-container flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-1 text-xs text-muted">
          &copy; {year} {personalInfo.name}. Built with
          <span className="mx-0.5 text-accent">&hearts;</span>
          using React, TypeScript & Tailwind CSS.
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
  )
}
