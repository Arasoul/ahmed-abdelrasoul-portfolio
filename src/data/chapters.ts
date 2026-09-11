export interface Chapter {
  id: string
  label: string
  hash: string
  shortLabel: string
}

export const chapters: readonly Chapter[] = [
  { id: 'origin', label: 'Origin', hash: '#origin', shortLabel: 'Origin' },
  { id: 'map', label: 'Map', hash: '#map', shortLabel: 'Map' },
  { id: 'systems', label: 'Systems', hash: '#systems', shortLabel: 'Systems' },
  { id: 'experience', label: 'Experience', hash: '#experience', shortLabel: 'Experience' },
  { id: 'engineering', label: 'Engineering', hash: '#engineering', shortLabel: 'Engineering' },
  { id: 'now', label: 'Now', hash: '#now', shortLabel: 'Now' },
  { id: 'connect', label: 'Connect', hash: '#connect', shortLabel: 'Connect' },
] as const

export const CHAPTER_COUNT = chapters.length

export function chapterIndex(id: string): number {
  return chapters.findIndex((c) => c.id === id)
}

export function formatChapterNumber(index: number): string {
  return `${String(index + 1).padStart(2, '0')} / ${String(CHAPTER_COUNT).padStart(2, '0')}`
}

export function chapterNumber(id: string): string {
  return formatChapterNumber(chapterIndex(id))
}
