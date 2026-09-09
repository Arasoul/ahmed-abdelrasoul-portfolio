import { useState } from 'react'
import { PortfolioContext } from './portfolioContext'

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [activeTopic, setActiveTopic] = useState<string | null>(null)
  return (
    <PortfolioContext.Provider value={{ activeTopic, setActiveTopic }}>
      {children}
    </PortfolioContext.Provider>
  )
}