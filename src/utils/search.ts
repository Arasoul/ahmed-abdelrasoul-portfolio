export function fuzzyMatch(text: string, query: string): boolean {
  const t = text.toLowerCase().replace(/[^a-z0-9\s]/g, '')
  const q = query.toLowerCase().replace(/[^a-z0-9\s]/g, '')

  if (t.includes(q)) return true

  const qWords = q.split(/\s+/).filter(Boolean)
  const tWords = t.split(/\s+/).filter(Boolean)

  // all query words must appear in text
  if (qWords.length > 1) {
    return qWords.every((qw) => tWords.some((tw) => tw.startsWith(qw) || tw.includes(qw)))
  }

  if (q.length <= 2) return t.startsWith(q)

  // character-level fuzzy: check if at least 70% of query chars are present in order
  let qi = 0
  let matches = 0
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) { matches++; qi++ }
  }
  return matches / q.length >= 0.7
}
