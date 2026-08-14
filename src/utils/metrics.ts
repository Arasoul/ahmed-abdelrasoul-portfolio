import { projects } from '../data/projects'
import { experiences } from '../data/experience'
import { certifications } from '../data/certifications'

export interface Metric {
  value: string
  label: string
  description: string
}

export function computeMetrics(): Metric[] {
  const allLanguages = new Set<string>()
  const allTechs = new Set<string>()

  for (const p of projects) {
    for (const t of p.technologies) {
      allTechs.add(t)
      const lang = t.split(' ')[0]
      if (['Python', 'C++', 'C#', 'TypeScript', 'JavaScript', 'SQL', 'PHP'].includes(lang)) {
        allLanguages.add(lang)
      }
    }
  }

  const aiProjects = projects.filter(
    (p) => p.category === 'ai-ml' || p.category === 'computer-vision-nlp'
  ).length
  const gameProjects = projects.filter((p) => p.category === 'game-development').length
  const pythonPkgs = projects.filter((p) => p.category === 'python-libraries' && p.demo?.includes('pypi')).length
  function extractYears(period: string) {
    const years = period.match(/\d{4}/g)?.map(Number) ?? []
    return { start: years[0] ?? 0, end: years[years.length - 1] ?? 0 }
  }
  const yearRanges = experiences.map((e) => extractYears(e.period))
  const earliest = Math.min(...yearRanges.map((r) => r.start).filter(Boolean))
  const latest = Math.max(...yearRanges.map((r) => r.end).filter(Boolean))
  const expYears = latest - earliest || 3

  return [
    { value: String(projects.length), label: 'Projects', description: 'Total projects across all categories' },
    { value: String(allLanguages.size), label: 'Languages', description: `Programming languages: ${[...allLanguages].join(', ')}` },
    { value: String(aiProjects), label: 'AI Projects', description: 'Machine learning, CV, and NLP projects' },
    { value: String(gameProjects), label: 'Game Projects', description: 'Game development prototypes and tools' },
    { value: String(pythonPkgs), label: 'PyPI Packages', description: 'Python packages published to PyPI' },
    { value: String(expYears) + '+', label: 'Years of XP', description: `Since ${earliest}` },
    { value: String(certifications.length), label: 'Certifications', description: 'Professional credentials earned' },
    { value: String(allTechs.size), label: 'Technologies', description: 'Distinct technologies used across projects' },
  ]
}
