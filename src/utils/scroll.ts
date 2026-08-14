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

export function scrollToElement(element: HTMLElement, offset = 96): void {
  const y = window.scrollY + element.getBoundingClientRect().top - offset
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
}

export function scrollToHash(hash: string, offset = 96): void {
  const element = document.querySelector(hash)
  if (element instanceof HTMLElement) {
    scrollToElement(element, offset)
  }
}
