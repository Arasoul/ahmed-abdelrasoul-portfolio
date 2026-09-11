import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chapters, CHAPTER_COUNT, chapterNumber } from './chapters'
import { projects, projectCategories, flagshipProjectIds, ecosystemToolIds, projectCtaUrl, allIndexedProjectIds } from './projects'
import { personalInfo } from './personal'
import { certifications } from './certifications'
import { experiences, currentExperiences, pastExperiences } from './experience'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const publicPath = (url: string) => resolve(repoRoot, 'public', url.replace(/^\//, ''))

const validId = /^[a-z0-9-]+$/

describe('chapter architecture', () => {
  it('has exactly seven chapters', () => {
    expect(CHAPTER_COUNT).toBe(7)
    expect(chapters).toHaveLength(7)
  })

  it('uses the canonical hash order', () => {
    expect(chapters.map((c) => c.hash)).toEqual([
      '#origin', '#map', '#systems', '#experience', '#engineering', '#now', '#connect',
    ])
  })

  it('has unique ids and hash references', () => {
    expect(new Set(chapters.map((c) => c.id)).size).toBe(chapters.length)
    expect(new Set(chapters.map((c) => c.hash)).size).toBe(chapters.length)
  })

  it('formats chapter numbers sequentially against the canonical order', () => {
    expect(chapterNumber('origin')).toBe('01 / 07')
    expect(chapterNumber('map')).toBe('02 / 07')
    expect(chapterNumber('systems')).toBe('03 / 07')
    expect(chapterNumber('experience')).toBe('04 / 07')
    expect(chapterNumber('engineering')).toBe('05 / 07')
    expect(chapterNumber('now')).toBe('06 / 07')
    expect(chapterNumber('connect')).toBe('07 / 07')
  })
})

describe('project data integrity', () => {
  it('has unique, route-safe project ids', () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length)
    for (const p of projects) expect(p.id).toMatch(validId)
  })

  it('points every GitHub link to an https URL', () => {
    for (const p of projects) {
      if (p.github) expect(p.github).toMatch(/^https:\/\/github\.com\//)
    }
  })

  it('provides a title, overview, category and technologies for every project', () => {
    for (const p of projects) {
      expect(p.title).toBeTruthy()
      expect(p.overview).toBeTruthy()
      expect(p.category).toBeTruthy()
      expect(p.technologies.length).toBeGreaterThan(0)
    }
  })

  it('uses a category defined in projectCategories', () => {
    const valid = new Set(projectCategories.map((c) => c.id))
    for (const p of projects) expect(valid.has(p.category)).toBe(true)
  })

  it('has valid cross-project related links', () => {
    const ids = new Set(projects.map((p) => p.id))
    for (const p of projects) {
      for (const rid of p.relatedProjects ?? []) expect(ids.has(rid)).toBe(true)
    }
  })

  it('flagships and ecosystem tools reference real projects', () => {
    const ids = new Set(projects.map((p) => p.id))
    for (const id of [...flagshipProjectIds, ...ecosystemToolIds]) expect(ids.has(id)).toBe(true)
  })

  it('uses a supported project status value', () => {
    for (const p of projects) {
      expect(['complete', 'in-progress', 'planning']).toContain(p.status)
    }
  })

  it('points every gallery image into the public images directory', () => {
    for (const p of projects) {
      for (const url of p.gallery ?? []) expect(url).toContain('/images/')
    }
  })

  it('resolves CTA destinations to http(s) URLs when one exists', () => {
    for (const p of projects) {
      const url = projectCtaUrl(p)
      if (url) expect(url).toMatch(/^https?:\/\//)
    }
  })

  it('never labels a real demo as Coming Soon (regression: AutoEDA, DataPrepToolkit)', () => {
    const autoEDA = projects.find((p) => p.id === 'auto-eda')
    const dataPrep = projects.find((p) => p.id === 'data-prep-toolkit')
    expect(autoEDA && projectCtaUrl(autoEDA)).toBe('https://pypi.org/project/autoeda/')
    expect(dataPrep && projectCtaUrl(dataPrep)).toBe('https://pypi.org/project/datapreptoolkit/')
  })

  it('indexes every project with no orphans (discoverability)', () => {
    const indexed = allIndexedProjectIds()
    expect(new Set(indexed).size).toBe(projects.length)
    for (const p of projects) expect(indexed).toContain(p.id)
  })
})

describe('personal & contact integrity', () => {
  it('uses https for all external identity links', () => {
    expect(personalInfo.github).toMatch(/^https:\/\//)
    expect(personalInfo.linkedin).toMatch(/^https:\/\//)
    expect(personalInfo.website).toMatch(/^https:\/\//)
  })

  it('points to the CV with a base-aware path', () => {
    expect(personalInfo.resumeUrl).toContain('Ahmed-CV.pdf')
  })
})

describe('certifications & experience integrity', () => {
  it('has unique certification ids', () => {
    expect(new Set(certifications.map((c) => c.id)).size).toBe(certifications.length)
  })

  it('points certification images into the public images directory', () => {
    for (const c of certifications) {
      if (c.image) expect(c.image).toContain('/images/')
      if (c.thumb) expect(c.thumb).toContain('/images/thumbs/')
    }
  })

  it('references only existing certification image files', () => {
    for (const c of certifications) {
      const refs = [c.image, c.thumb, ...(c.gallery ?? [])].filter((r): r is string => Boolean(r))
      for (const r of refs) {
        expect(existsSync(publicPath(r)), `expected ${r} to exist`).toBe(true)
      }
    }
  })

  it('has a thumbnail wherever a certification image exists', () => {
    for (const c of certifications) {
      if (c.image) expect(c.thumb).toBeTruthy()
    }
  })

  it('has unique experience entries and links', () => {
    expect(new Set(experiences.map((e) => e.id)).size).toBe(experiences.length)
    for (const e of experiences) {
      for (const pr of e.projects ?? []) {
        if (pr.link) expect(pr.link).toMatch(/^https:\/\//)
      }
    }
  })

  it('partitions every experience into exactly one of current or past', () => {
    const currentIds = currentExperiences.map((e) => e.id)
    const pastIds = pastExperiences.map((e) => e.id)
    expect([...currentIds, ...pastIds].length).toBe(experiences.length)
    expect(currentIds.some((id) => pastIds.includes(id))).toBe(false)
    for (const e of currentExperiences) expect(e.current).toBe(true)
    for (const e of pastExperiences) expect(e.current).toBe(false)
  })

  it('keeps a verifiable education record rendered inside Experience', () => {
    expect(personalInfo.education.length).toBeGreaterThan(0)
    for (const e of personalInfo.education) {
      expect(e.degree).toBeTruthy()
      expect(e.institution).toBeTruthy()
      expect(e.period).toBeTruthy()
    }
  })

  it('keeps every experience discoverable through the current or past path', () => {
    const grouped = new Set([...currentExperiences, ...pastExperiences].map((e) => e.id))
    for (const e of experiences) expect(grouped.has(e.id), `unreachable experience: ${e.id}`).toBe(true)
  })
})