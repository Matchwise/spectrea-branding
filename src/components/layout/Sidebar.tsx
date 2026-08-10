import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navigation, type NavItem } from '../../data/navigation'
import { StaticLogo } from '../brand/SpectreaLogo'
import { TbChevronRight } from 'react-icons/tb'

function NavGroup({ item }: { item: NavItem }) {
  const location = useLocation()
  const isActive = location.pathname === item.path ||
    item.children?.some(c => location.pathname === c.path)
  const [open, setOpen] = useState(isActive)

  if (!item.children) {
    return (
      <Link
        to={item.path}
        aria-current={location.pathname === item.path ? 'page' : undefined}
        className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 btn-focus ${
          location.pathname === item.path
            ? 'bg-cloud text-ink'
            : 'text-slate hover:bg-cloud hover:text-ink'
        }`}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 btn-focus ${
          isActive ? 'text-ink' : 'text-slate hover:text-ink'
        }`}
      >
        {item.label}
        <TbChevronRight size={16} className={`transition-transform duration-150 ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && (
        <div className="ml-3 mt-1 space-y-0.5 border-l border-stone-200 pl-3">
          {item.children.map(child => (
            <Link
              key={child.path}
              to={child.path}
              aria-current={location.pathname === child.path ? 'page' : undefined}
              className={`block px-3 py-1.5 rounded-md text-sm transition-colors duration-150 btn-focus ${
                location.pathname === child.path
                  ? 'text-ink font-medium bg-cloud'
                  : 'text-slate hover:text-ink hover:bg-cloud'
              }`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// The lg breakpoint — where the drawer becomes the always-visible sidebar.
// Shared with App so drawer inertness and content inertness stay in sync.
const DESKTOP_QUERY = '(min-width: 1024px)'

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isDesktop
}

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const asideRef = useRef<HTMLElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const isDesktop = useIsDesktop()

  // Mobile drawer semantics: Escape closes; focus moves to the drawer's first
  // link (which carries the canonical ring) on open and returns to the opener
  // on close. Tab containment comes from App marking the obscured content
  // inert while the drawer is open.
  useEffect(() => {
    if (isDesktop || !open) return
    restoreRef.current = document.activeElement as HTMLElement | null
    asideRef.current?.querySelector<HTMLElement>('a, button')?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCloseRef.current() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      restoreRef.current?.focus()
    }
  }, [open, isDesktop])

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/20 lg:hidden" onClick={onClose} />
      )}

      <aside
        ref={asideRef}
        // Off-canvas on mobile = out of the page for keyboards too; the
        // desktop breakpoint keeps the always-visible sidebar tabbable.
        inert={!open && !isDesktop}
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-canvas border-r border-stone-200 p-4 overflow-y-auto transition-transform lg:translate-x-0 lg:static lg:z-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5 mb-6 px-3 btn-focus">
          <StaticLogo size={32} colorMode="cool" dotColorMode="grey" />
          <div>
            <div className="font-semibold text-ink text-sm font-heading" style={{ letterSpacing: '0.02em' }}>Spectrea</div>
            <div className="text-xs text-pewter uppercase tracking-widest">Brand Guide</div>
          </div>
        </Link>

        <nav className="space-y-1">
          {navigation.map(item => (
            <NavGroup key={item.path} item={item} />
          ))}
        </nav>
      </aside>
    </>
  )
}
