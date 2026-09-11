import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { PortfolioProvider } from './context/PortfolioProvider'
import NeuralCircuitBackground from './components/ui/NeuralCircuitBackground'
import HomePage from './pages/HomePage'
import { scrollToHash } from './utils/scroll'
import { projects, projectCategories } from './data/projects'

const ProjectCaseStudyPage = lazy(() => import('./pages/ProjectCaseStudyPage'))

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

const HOME_TITLE = 'Ahmed Abdelrasoul — AI & Data Engineer'
const HOME_DESCRIPTION =
  'AI & Data Engineer building intelligent systems that turn data, models, and automation into useful products. AI Engineering, Data Intelligence, Automation, and Analytics.'
const PERSON_NAME = 'Ahmed Abdelrasoul'

const categoryLabel = (id: string) => projectCategories.find((c) => c.id === id)?.label || id

function setMetaDescription(content: string) {
  let el = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', 'description')
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setMetaProperty(property: string, content: string) {
  const el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (el) el.setAttribute('content', content)
}

function RouteMeta() {
  const { pathname } = useLocation()
  const projectId = pathname.startsWith('/projects/') ? decodeURIComponent(pathname.slice('/projects/'.length)) : undefined

  useEffect(() => {
    const project = projectId ? projects.find((p) => p.id === projectId) : undefined
    const origin = window.location.origin
    let title = HOME_TITLE
    let description = HOME_DESCRIPTION
    let canonical = origin + pathname
    if (project) {
      title = `${project.title} — ${categoryLabel(project.category)} | ${PERSON_NAME}`
      description = project.overview
      canonical = `${origin}/projects/${project.id}`
    }
    document.title = title
    setMetaDescription(description)
    setMetaProperty('og:title', title)
    setMetaProperty('og:url', canonical)
    setMetaProperty('twitter:title', title)
    const link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (link) link.setAttribute('href', canonical)
  }, [pathname, projectId])

  return null
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = hash.slice(1)
    let timer = 0
    let attempts = 0
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        scrollToHash(hash, 92)
        return
      }
      attempts += 1
      if (attempts < 25) timer = window.setTimeout(tryScroll, 60)
    }
    timer = window.setTimeout(tryScroll, 0)
    return () => window.clearTimeout(timer)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <PortfolioProvider>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen transition-colors duration-300"
          style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }}
        >
          <NeuralCircuitBackground />
          <div className="relative z-10">
            <BrowserRouter basename={basename}>
              <ScrollToTop />
              <RouteMeta />
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
      </MotionConfig>
    </PortfolioProvider>
  )
}