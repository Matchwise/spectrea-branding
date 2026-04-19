import { useState } from 'react'
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

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/20 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-canvas border-r border-stone-200 p-4 overflow-y-auto transition-transform lg:translate-x-0 lg:static lg:z-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5 mb-6 px-3">
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
