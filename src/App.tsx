import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import TopBar from './components/layout/TopBar'
import Home from './pages/Home'
import BrandStory from './pages/foundation/BrandStory'
import Positioning from './pages/foundation/Positioning'
import Voice from './pages/foundation/Voice'
import Naming from './pages/foundation/Naming'
import PaletteExplorer from './pages/color/PaletteExplorer'
import PrimaryPalette from './pages/color/PrimaryPalette'
import SemanticColors from './pages/color/SemanticColors'
import Gradients from './pages/color/Gradients'
import PaletteCompare from './pages/color/PaletteCompare'
import TypeExplorer from './pages/typography/TypeExplorer'
import TypeScale from './pages/typography/TypeScale'
import TypographyGuidelines from './pages/typography/Guidelines'
import PrimaryLogo from './pages/logo/PrimaryLogo'
import Variations from './pages/logo/Variations'
import LogoGuidelines from './pages/logo/LogoGuidelines'
import Misuse from './pages/logo/Misuse'
import LogoExploration from './pages/logo/LogoExploration'
import Buttons from './pages/components/Buttons'
import Forms from './pages/components/Forms'
import Cards from './pages/components/Cards'
import LayoutPage from './pages/components/LayoutPage'
import Copy from './pages/communications/Copy'
import Social from './pages/communications/Social'
import Email from './pages/communications/Email'
import Presentations from './pages/communications/Presentations'
import Illustration from './pages/imagery/Illustration'
import DataViz from './pages/imagery/DataViz'
import Iconography from './pages/imagery/Iconography'
import Motion from './pages/imagery/Motion'
import Downloads from './pages/resources/Downloads'
import Governance from './pages/resources/Governance'
import Placeholder from './pages/Placeholder'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex h-screen bg-canvas">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onMenuToggle={() => setSidebarOpen(o => !o)} />
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/foundation/story" element={<BrandStory />} />
            <Route path="/foundation/positioning" element={<Positioning />} />
            <Route path="/foundation/voice" element={<Voice />} />
            <Route path="/foundation/naming" element={<Naming />} />
            <Route path="/color/overview" element={<PaletteExplorer />} />
            <Route path="/color/primary" element={<PrimaryPalette />} />
            <Route path="/color/semantic" element={<SemanticColors />} />
            <Route path="/color/gradients" element={<Gradients />} />
            {/* /color/compare is an internal exploration tool — intentionally unlisted in navigation.ts */}
            <Route path="/color/compare" element={<PaletteCompare />} />
            <Route path="/typography/typefaces" element={<TypeExplorer />} />
            <Route path="/typography/scale" element={<TypeScale />} />
            <Route path="/typography/guidelines" element={<TypographyGuidelines />} />
            <Route path="/logo/primary" element={<PrimaryLogo />} />
            <Route path="/logo/variations" element={<Variations />} />
            <Route path="/logo/guidelines" element={<LogoGuidelines />} />
            <Route path="/logo/misuse" element={<Misuse />} />
            <Route path="/logo/exploration" element={<LogoExploration />} />
            <Route path="/components/buttons" element={<Buttons />} />
            <Route path="/components/forms" element={<Forms />} />
            <Route path="/components/cards" element={<Cards />} />
            <Route path="/components/layout" element={<LayoutPage />} />
            <Route path="/communications/copy" element={<Copy />} />
            <Route path="/communications/social" element={<Social />} />
            <Route path="/communications/email" element={<Email />} />
            <Route path="/communications/presentations" element={<Presentations />} />
            <Route path="/imagery/illustration" element={<Illustration />} />
            <Route path="/imagery/dataviz" element={<DataViz />} />
            <Route path="/imagery/iconography" element={<Iconography />} />
            <Route path="/imagery/motion" element={<Motion />} />
            <Route path="/resources/downloads" element={<Downloads />} />
            <Route path="/resources/governance" element={<Governance />} />
            <Route path="*" element={<Placeholder />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
