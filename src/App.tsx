import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
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
import TypeExplorer from './pages/typography/TypeExplorer'
import TypeScale from './pages/typography/TypeScale'
import Placeholder from './pages/Placeholder'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-white">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onMenuToggle={() => setSidebarOpen(o => !o)} />
        <main className="flex-1 overflow-y-auto">
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
            <Route path="/typography/typefaces" element={<TypeExplorer />} />
            <Route path="/typography/scale" element={<TypeScale />} />
            <Route path="*" element={<Placeholder />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
