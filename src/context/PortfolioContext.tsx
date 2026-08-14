import { createContext, useContext, useState, useCallback } from 'react'

interface PortfolioState {
  highlight: string | null
  setHighlight: (id: string | null) => void
  clearHighlight: () => void
  activeTech: string | null
  setActiveTech: (tech: string | null) => void
}

const PortfolioContext = createContext<PortfolioState>({
  highlight: null,
  setHighlight: () => {},
  clearHighlight: () => {},
  activeTech: null,
  setActiveTech: () => {},
})

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [highlight, setHighlight] = useState<string | null>(null)
  const [activeTech, setActiveTech] = useState<string | null>(null)
  const clearHighlight = useCallback(() => setHighlight(null), [])
  return (
    <PortfolioContext.Provider value={{ highlight, setHighlight, clearHighlight, activeTech, setActiveTech }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  return useContext(PortfolioContext)
}
