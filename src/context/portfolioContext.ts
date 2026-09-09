import { createContext } from 'react'

interface PortfolioState {
  activeTopic: string | null
  setActiveTopic: (id: string | null) => void
}

export const PortfolioContext = createContext<PortfolioState>({
  activeTopic: null,
  setActiveTopic: () => {},
})