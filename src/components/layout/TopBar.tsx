import { TbMenu2 } from 'react-icons/tb'
import { Logotype } from '../brand/SpectreaLogo'

export default function TopBar({ onMenuToggle }: { onMenuToggle: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-canvas/80 backdrop-blur-sm border-b border-stone-200 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg hover:bg-cloud transition-colors duration-150 lg:hidden btn-focus"
          aria-label="Toggle menu"
        >
          <TbMenu2 size={20} className="text-slate" />
        </button>
        <div className="flex items-center gap-2">
          <Logotype fontSize={13} colorMode="ink" color="#212226" />
          <span className="text-xs text-pewter uppercase tracking-widest">Brand Guide</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-pewter bg-cloud px-2 py-1 rounded">v0.1</span>
      </div>
    </header>
  )
}
