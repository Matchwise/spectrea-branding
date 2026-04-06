import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'

// Tabler Icons — primary icon library (outline + filled)
import {
  TbSearch, TbHome, TbSettings, TbUser, TbBell, TbPlus, TbCheck, TbX, TbEye, TbStack, TbStar, TbChevronRight,
  TbBellFilled, TbStarFilled, TbEyeFilled, TbHomeFilled,
} from 'react-icons/tb'

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Iconography() {
  return (
    <PageShell
      title="Iconography"
      subtitle="Icon library, style specs, sizing, and usage rules for Spectrea interfaces."
    >
      {/* ─── The System ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Spectrea uses Tabler Icons via react-icons. One library for outline and filled variants — 5,963 outline + 999 filled, all visually consistent.">
            <span>Icon System</span>
          </Tooltip>
        </h2>
        <div className="bg-stone-900 text-white rounded-xl p-6">
          <p className="text-base font-semibold" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Tabler · Outline · Rounded · 2px Stroke</p>
          <p className="text-sm text-stone-400 mt-2 leading-relaxed">
            Rounded caps and joins create warmth. Clean geometry reads as intelligent. The 2px stroke has presence without heaviness — grounded but not boring. Outline is the default; filled is reserved for active/selected states.
          </p>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-stone-700">
            <div className="flex items-center gap-3">
              {[TbSearch, TbHome, TbSettings, TbUser, TbBell, TbPlus, TbCheck, TbX, TbEye, TbStack, TbStar, TbChevronRight].map((Icon, i) => (
                <Icon key={i} size={20} className="text-stone-400" />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Import Guide ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">How to Use</h2>
        <div className="bg-stone-900 rounded-xl p-5 overflow-x-auto">
          <pre className="text-xs leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <span style={{ color: '#9CA3AF' }}>{'// Install\n'}</span>
            <span style={{ color: '#F9FAFB' }}>{'npm install react-icons\n\n'}</span>
            <span style={{ color: '#9CA3AF' }}>{'// Outline icons (default)\n'}</span>
            <span style={{ color: '#E19000' }}>{'import'}</span>
            <span style={{ color: '#F9FAFB' }}>{' { TbSearch, TbBell, TbSettings } '}</span>
            <span style={{ color: '#E19000' }}>{'from'}</span>
            <span style={{ color: '#00B6A0' }}>{" 'react-icons/tb'\n\n"}</span>
            <span style={{ color: '#9CA3AF' }}>{'// Filled icons (active/selected states)\n'}</span>
            <span style={{ color: '#E19000' }}>{'import'}</span>
            <span style={{ color: '#F9FAFB' }}>{' { TbBellFilled, TbStarFilled } '}</span>
            <span style={{ color: '#E19000' }}>{'from'}</span>
            <span style={{ color: '#00B6A0' }}>{" 'react-icons/tb'"}</span>
          </pre>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-stone-50 rounded-lg px-3 py-2 border border-stone-100">
            <p className="text-xs font-semibold text-stone-600">Library</p>
            <code className="text-[10px] text-brand font-mono">react-icons/tb</code>
            <p className="text-xs text-stone-400 mt-0.5">Tabler Icons</p>
          </div>
          <div className="bg-stone-50 rounded-lg px-3 py-2 border border-stone-100">
            <p className="text-xs font-semibold text-stone-600">Outline</p>
            <code className="text-[10px] text-brand font-mono">TbSearch, TbBell…</code>
            <p className="text-xs text-stone-400 mt-0.5">5,963 icons</p>
          </div>
          <div className="bg-stone-50 rounded-lg px-3 py-2 border border-stone-100">
            <p className="text-xs font-semibold text-stone-600">Filled</p>
            <code className="text-[10px] text-brand font-mono">TbBellFilled…</code>
            <p className="text-xs text-stone-400 mt-0.5">999 matched variants</p>
          </div>
        </div>
      </Section>

      {/* ─── Specifications ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="All icons follow these specs. Custom icons must match to maintain visual consistency.">
            <span>Specifications</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { prop: 'Style', value: 'Outline (default)', note: 'Filled only for active/selected states' },
            { prop: 'Stroke width', value: '2px', note: 'Tabler default. Consistent across all icons.' },
            { prop: 'Stroke caps', value: 'Round', note: 'Matches the brand\'s warm, approachable personality' },
            { prop: 'Stroke joins', value: 'Round', note: 'Consistent with cap style' },
            { prop: 'Grid', value: '24 × 24px', note: 'Standard size. All icons sit on this grid.' },
            { prop: 'Padding', value: '2px inset', note: 'Content stays within a 20px live area' },
            { prop: 'Corner radius', value: '2px where applicable', note: 'Slightly rounded for warmth' },
            { prop: 'Source', value: 'react-icons/tb', note: 'Tabler Icons — outline + filled from one library' },
          ].map((row, i) => (
            <div key={row.prop} className="grid grid-cols-3 px-4 py-2.5" style={{ borderBottom: i < 7 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-sm font-medium text-stone-700">{row.prop}</span>
              <span className="text-xs font-mono text-stone-600">{row.value}</span>
              <span className="text-xs text-stone-500">{row.note}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Sizing ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Use these standard sizes. Custom sizes break visual consistency.">
            <span>Sizing</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-6">
          <div className="flex items-end justify-center gap-8 flex-wrap">
            {[
              { size: 16, label: '16px', use: 'Inline text, badges' },
              { size: 20, label: '20px', use: 'Buttons, nav items' },
              { size: 24, label: '24px', use: 'Default / standalone' },
              { size: 32, label: '32px', use: 'Feature highlights' },
              { size: 48, label: '48px', use: 'Empty states, heroes' },
            ].map(s => (
              <div key={s.size} className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center" style={{ width: s.size, height: s.size }}>
                  <TbSearch size={s.size} className="text-stone-600" />
                </div>
                <span className="text-xs font-mono text-stone-500">{s.label}</span>
                <span className="text-xs text-stone-400 text-center">{s.use}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── Colors ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">Icon Colors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { color: '#111827', name: 'Ink', hex: '#111827', use: 'Primary — nav, headings, actions', bg: 'bg-white', border: true },
            { color: '#9CA3AF', name: 'Gray', hex: '#9CA3AF', use: 'Secondary — helpers, disabled, muted', bg: 'bg-white', border: true },
            { color: '#4271DF', name: 'Cobalt', hex: '#4271DF', use: 'Active state, selected, links', bg: 'bg-white', border: true },
            { color: '#F9FAFB', name: 'Snow', hex: '#F9FAFB', use: 'On dark backgrounds', bg: 'bg-stone-900', border: false },
          ].map(c => (
            <div key={c.name} className={`${c.bg} rounded-xl p-4 text-center ${c.border ? 'border border-stone-200' : ''}`}>
              <div className="flex justify-center gap-2 mb-2" style={{ color: c.color }}>
                <TbSearch size={20} className="text-current" />
                <TbSettings size={20} className="text-current" />
                <TbUser size={20} className="text-current" />
              </div>
              <p className="text-xs font-semibold" style={{ color: c.border ? '#374151' : '#F9FAFB' }}>{c.name}</p>
              <p className="text-xs font-mono" style={{ color: c.border ? '#9CA3AF' : '#6B7280' }}>{c.hex}</p>
              <p className="text-xs mt-1" style={{ color: c.border ? '#6B7280' : '#9CA3AF' }}>{c.use}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 bg-stone-50 rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-stone-600">
            <strong>Rule:</strong> Never use spectrum accent colors (Teal, Amber, Rose) for decorative icons. These colors are reserved for semantic meaning (success, warning, error).
          </p>
        </div>
      </Section>

      {/* ─── Outline / Filled States ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Outline is the default. Filled indicates an active or selected state. This creates a clear visual language without needing color change.">
            <span>Outline vs Filled States</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { outline: TbBell, filled: TbBellFilled, label: 'Notifications' },
              { outline: TbStar, filled: TbStarFilled, label: 'Favorites' },
              { outline: TbEye, filled: TbEyeFilled, label: 'Visibility' },
              { outline: TbHome, filled: TbHomeFilled, label: 'Navigation' },
            ].map(pair => (
              <div key={pair.label} className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <pair.outline size={24} className="text-stone-400" />
                    <span className="text-[10px] text-stone-400">default</span>
                  </div>
                  <span className="text-stone-300 text-xs">→</span>
                  <div className="flex flex-col items-center gap-1">
                    <pair.filled size={24} className="text-brand" />
                    <span className="text-[10px] text-brand">active</span>
                  </div>
                </div>
                <span className="text-xs text-stone-500">{pair.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 bg-stone-50 rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-stone-600">
            <strong>Source:</strong> Both outline and filled from Tabler (<code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-[10px]">tb</code>). Filled variants are designed to match their outlines — guaranteed visual consistency. Append <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-[10px]">Filled</code> to the icon name.
          </p>
        </div>
      </Section>

      {/* ─── Licensing ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">Licensing</h2>
        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-stone-800">Tabler Icons</p>
              <p className="text-xs text-stone-500 mt-1">MIT License. Free for commercial use. No attribution required in product UI.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-800">react-icons</p>
              <p className="text-xs text-stone-500 mt-1">MIT License. Wrapper library. Keep license file in source (handled by node_modules).</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Do/Don't ─── */}
      <Section title="Icon Dos & Don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-emerald-800 mb-3">Do</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Import all icons from <code className="text-xs bg-stone-100 px-1 rounded">react-icons/tb</code></li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Pair icons with text labels for clarity</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Use outline for default, filled for active state</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Vertically center icons with adjacent text</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Use standard sizes: 16, 20, 24, 32, 48px</li>
            </ul>
          </div>
          <div className="border border-red-200 bg-red-50/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-red-700 mb-3">Don't</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Import from other sets (<code className="text-xs bg-stone-100 px-1 rounded">md</code>, <code className="text-xs bg-stone-100 px-1 rounded">lu</code>, <code className="text-xs bg-stone-100 px-1 rounded">bs</code>, <code className="text-xs bg-stone-100 px-1 rounded">fa6</code>) — different visual style</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Mix outline and filled styles as decoration</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Use icons without labels in primary navigation</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Use spectrum colors (Teal, Amber) on decorative icons</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Use custom sizes between the standard stops</li>
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
