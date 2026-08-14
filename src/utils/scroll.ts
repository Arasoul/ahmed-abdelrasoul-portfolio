export function smartScrollIntoView(element: HTMLElement, padding = 100): void {
  const rect = element.getBoundingClientRect()
  const viewportHeight = window.innerHeight

  const topGap = rect.top - padding
  const bottomGap = rect.bottom - (viewportHeight - padding)

  if (topGap >= 0 && bottomGap <= 0) return

  if (topGap < 0) {
    window.scrollBy({ top: topGap, behavior: 'smooth' })
  } else {
    window.scrollBy({ top: Math.min(bottomGap, topGap), behavior: 'smooth' })
  }
}
