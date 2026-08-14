import { useState, useEffect } from 'react'
import { projects } from '../data/projects'
import { skillGroups } from '../data/skills'
import { navLinks } from '../data/personal'

export interface CommandItem {
  id: string
  label: string
  description: string
  type: 'nav' | 'project' | 'skill'
  action: () => void
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const commands: CommandItem[] = [
    ...navLinks.map((link) => ({
      id: `nav-${link.href}`,
      label: link.label,
      description: `Navigate to ${link.label}`,
      type: 'nav' as const,
      action: () => {
        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
        setOpen(false)
      },
    })),
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      label: p.title,
      description: `${p.category} — ${p.role || 'Project'}`,
      type: 'project' as const,
      action: () => {
        const el = document.getElementById('projects')
        el?.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => setOpen(false), 300)
      },
    })),
    ...skillGroups.flatMap((g) =>
      g.skills.map((s) => ({
        id: `skill-${s.name}`,
        label: s.name,
        description: `Skill in ${g.title}`,
        type: 'skill' as const,
        action: () => {
          document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
          setTimeout(() => setOpen(false), 300)
        },
      }))
    ),
  ]

  const filtered = query.trim()
    ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()) || c.description.toLowerCase().includes(query.toLowerCase()))
    : commands

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen((v) => !v); setQuery('') }
      if (e.key === 'Escape') { setOpen(false); setQuery('') }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return { open, setOpen, query, setQuery, filtered }
}
