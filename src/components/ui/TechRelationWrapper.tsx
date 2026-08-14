export function isDimmed(technologies: string[], activeTech: string | null): boolean {
  if (!activeTech) return false
  return !technologies.some((t) => t.toLowerCase().includes(activeTech.toLowerCase()))
}

export function isTechActive(tech: string, activeTech: string | null): boolean {
  if (!activeTech) return false
  return tech.toLowerCase().includes(activeTech.toLowerCase()) || activeTech.toLowerCase().includes(tech.toLowerCase())
}
