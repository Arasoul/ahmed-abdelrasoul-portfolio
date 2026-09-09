import { describe, it, expect } from 'vitest'
import { answer, suggestions, assistantSourceNote } from './assistant'

describe('assistant fallback engine', () => {
  it('answers computer vision questions with follow-up references', () => {
    const res = answer('Which project best demonstrates computer vision?')
    expect(res.text).toContain('vision')
    expect(res.references?.length ?? 0).toBeGreaterThan(0)
  })

  it('explains AutoBI and references the project', () => {
    const res = answer('What does AutoBI do?')
    expect(res.text).toContain('AutoBI')
    const ids = res.references?.map((r) => r.id) ?? []
    expect(ids).toContain('auto-bi')
  })

  it('maps "what is Ahmed working on now" to current-focus sections', () => {
    const res = answer('What is Ahmed working on now?')
    const ids = res.references?.map((r) => r.id) ?? []
    expect(ids).toContain('now')
  })

  it('answers optimization questions', () => {
    const res = answer('Which project involves optimization?')
    expect(res.references?.length ?? 0).toBeGreaterThan(0)
  })

  it('surfaces the contact channel', () => {
    const res = answer('How can I contact Ahmed?')
    expect(res.text).toContain('ahmedmrasoul@gmail.com')
  })

  it('returns a graceful fallback for unmatched input', () => {
    const res = answer('zxqplmnop weird nonsense')
    expect(res.text).toContain('Try one of these')
  })

  it('handles empty input without throwing', () => {
    const res = answer('   ')
    expect(res.text.length).toBeGreaterThan(0)
  })

  it('exposes suggestion chips', () => {
    expect(suggestions.length).toBeGreaterThan(4)
  })

  it('declares the local retrieval source note', () => {
    expect(assistantSourceNote).toContain('LOCAL RETRIEVAL')
  })
})