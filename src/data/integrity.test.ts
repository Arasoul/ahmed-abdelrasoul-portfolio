import { describe, it, expect } from 'vitest'
import { chapters, CHAPTER_COUNT } from './chapters'
import { projects } from './projects'
import { personalInfo } from './personal'
import { certifications } from './certifications'
import { experiences } from './experience'

const validId = /^[a-z0-9-]+$/

describe('chapter architecture', () => {
  it('has exactly seven chapters', () => {
    expect(CHAPTER_COUNT).toBe(7)
    expect(chapters).toHaveLength(7)
  })

  it('uses the canonical hash order', () => {
    expect(chapters.map((c) => c.hash)).toEqual([
      '#origin', '#map', '#systems', '#engineering', '#experience', '#now', '#connect',
    ])
  })

  it('has unique ids and hash references', () => {
    expect(new Set(chapters.map((c) => c.id)).size).toBe(chapters.length)
    expect(new Set(chapters.map((c) => c.hash)).size).toBe(chapters.length)
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

  it('has valid cross-project related links', () => {
    const ids = new Set(projects.map((p) => p.id))
    for (const p of projects) {
      for (const rid of p.relatedProjects ?? []) expect(ids.has(rid)).toBe(true)
    }
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
})