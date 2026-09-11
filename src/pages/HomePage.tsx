import Navbar from '../components/ui/Navbar'
import CommandPalette from '../components/ui/CommandPalette'
import FloorRail from '../components/ui/FloorRail'
import StickyContext from '../components/ui/StickyContext'
import Hero from '../components/sections/Hero'
import Map from '../components/sections/Map'
import SystemsProducts from '../components/sections/SystemsProducts'
import Engineering from '../components/sections/Engineering'
import Experience from '../components/sections/Experience'
import Currently from '../components/sections/Currently'
import Contact from '../components/sections/Contact'
import { Suspense, lazy } from 'react'
import { useTheme } from '../hooks/useTheme'
import { useCommandPalette } from '../hooks/useCommandPalette'

const PortfolioAssistant = lazy(() => import('../components/ui/PortfolioAssistant'))

export default function HomePage() {
  const { dark, toggle } = useTheme()
  const palette = useCommandPalette()

  return (
    <>
      <Navbar dark={dark} toggleTheme={toggle} onOpenPalette={() => palette.setOpen(true)} />
      <CommandPalette />
      <FloorRail />
      <StickyContext />
      <Hero dark={dark} />
      <Map />
      <Suspense fallback={<div className="min-h-[40vh]" />}>
        <SystemsProducts />
      </Suspense>
      <Experience />
      <Engineering />
      <Currently />
      <Contact />
      <Suspense fallback={null}>
        <PortfolioAssistant />
      </Suspense>
    </>
  )
}
