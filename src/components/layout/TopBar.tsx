export default function TopBar({ onMenuToggle }: { onMenuToggle: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-white/80 backdrop-blur-sm border-b border-stone-200 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg hover:bg-stone-100 lg:hidden"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-sm text-stone-400">
          Spectrea Brand Guide
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-stone-400 bg-stone-100 px-2 py-1 rounded">v0.1</span>
      </div>
    </header>
  )
}
