import { useTheme } from './hooks/useTheme'
import { useCommandPalette } from './hooks/useCommandPalette'
import { PortfolioProvider } from './context/PortfolioContext'
import Navbar from './components/ui/Navbar'
import CommandPalette from './components/ui/CommandPalette'
import NeuralCircuitBackground from './components/ui/NeuralCircuitBackground'
import SectionDivider from './components/ui/SectionDivider'
import Hero from './components/sections/Hero'
import EngineerProfile from './components/sections/EngineerProfile'
import ProfessionalJourney from './components/sections/ProfessionalJourney'
import Skills from './components/sections/Skills'
import FeaturedWork from './components/sections/FeaturedWork'
import ProjectLibrary from './components/sections/ProjectLibrary'
import CertificationsLearning from './components/sections/CertificationsLearning'
import ResearchFuture from './components/sections/ResearchFuture'
import LookingAhead from './components/sections/LookingAhead'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'

export default function App() {
  const { dark, toggle } = useTheme()
  const palette = useCommandPalette()

  return (
    <PortfolioProvider>
      <div className={dark ? 'dark' : ''}>
        <div className="relative min-h-screen transition-colors duration-300"
          style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }}
        >
          <NeuralCircuitBackground />
          <div className="relative z-10">
            <Navbar dark={dark} toggleTheme={toggle} onOpenPalette={() => palette.setOpen(true)} />
            <CommandPalette />
            <Hero dark={dark} />
            <SectionDivider variant="neural" />
            <EngineerProfile />
            <SectionDivider variant="gradient" />
            <Skills />
            <SectionDivider variant="gradient" />
            <FeaturedWork />
            <SectionDivider variant="circuit" />
            <ProfessionalJourney />
            <SectionDivider variant="neural" />
            <CertificationsLearning />
            <SectionDivider variant="circuit" />
            <ProjectLibrary />
            <SectionDivider variant="neural" />
            <ResearchFuture />
            <SectionDivider variant="gradient" />
            <LookingAhead />
            <SectionDivider variant="gradient" />
            <Contact />
            <Footer />
          </div>
        </div>
      </div>
    </PortfolioProvider>
  )
}
