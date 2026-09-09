import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { PortfolioProvider } from './context/PortfolioProvider'
import NeuralCircuitBackground from './components/ui/NeuralCircuitBackground'
import HomePage from './pages/HomePage'
import { scrollToHash } from './utils/scroll'

const ProjectCaseStudyPage = lazy(() => import('./pages/ProjectCaseStudyPage'))

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = hash.slice(1)
    window.requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) scrollToHash(hash, 92)
    })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <PortfolioProvider>
      <div className="relative min-h-screen transition-colors duration-300"
        style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }}
      >
        <NeuralCircuitBackground />
        <div className="relative z-10">
          <BrowserRouter basename={basename}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects/:id" element={
                <Suspense fallback={<div className="min-h-screen" />}>
                  <ProjectCaseStudyPage />
                </Suspense>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </PortfolioProvider>
  )
}