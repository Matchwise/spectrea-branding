import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'

// Primary: Lucide
import { LuSearch, LuHouse, LuSettings, LuUser, LuBell, LuPlus, LuCheck, LuX, LuEye, LuLayers, LuStar, LuChevronRight } from 'react-icons/lu'

// Fallback: Tabler (visually identical to Lucide)
import { TbBrandGithub, TbGraph, TbNetwork, TbTopologyRing } from 'react-icons/tb'

// Filled variants for active states: Phosphor fill
import { PiBellFill, PiStarFill, PiEyeFill, PiHouseFill } from 'react-icons/pi'

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
          <Tooltip content="Spectrea uses react-icons as a single dependency. Lucide is the primary icon style; Tabler fills coverage gaps. Both use the same 2px rounded stroke.">
            <span>Icon System</span>
          </Tooltip>
        </h2>
        <div className="bg-stone-900 text-white rounded-xl p-6">
          <p className="text-base font-semibold" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Lucide · Outline · Rounded · 2px Stroke</p>
          <p className="text-sm text-stone-400 mt-2 leading-relaxed">
            Rounded caps and joins create warmth. Clean geometry reads as intelligent. The 2px stroke has presence without heaviness — grounded but not boring. Outline is the default; filled is reserved for active/selected states.
          </p>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-stone-700">
            <div className="flex items-center gap-3">
              {[LuSearch, LuHouse, LuSettings, LuUser, LuBell, LuPlus, LuCheck, LuX, LuEye, LuLayers, LuStar, LuChevronRight].map((Icon, i) => (
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
            <span style={{ color: '#9CA3AF' }}>{'// Primary — always try Lucide first\n'}</span>
            <span style={{ color: '#E19000' }}>{'import'}</span>
            <span style={{ color: '#F9FAFB' }}>{' { LuSearch, LuBell, LuSettings } '}</span>
            <span style={{ color: '#E19000' }}>{'from'}</span>
            <span style={{ color: '#00B6A0' }}>{" 'react-icons/lu'\n\n"}</span>
            <span style={{ color: '#9CA3AF' }}>{'// Fallback — Tabler for icons Lucide lacks\n'}</span>
            <span style={{ color: '#E19000' }}>{'import'}</span>
            <span style={{ color: '#F9FAFB' }}>{' { TbGraph, TbNetwork } '}</span>
            <span style={{ color: '#E19000' }}>{'from'}</span>
            <span style={{ color: '#00B6A0' }}>{" 'react-icons/tb'\n\n"}</span>
            <span style={{ color: '#9CA3AF' }}>{'// Active states — Phosphor filled\n'}</span>
            <span style={{ color: '#E19000' }}>{'import'}</span>
            <span style={{ color: '#F9FAFB' }}>{' { PiBellFill, PiStarFill } '}</span>
            <span style={{ color: '#E19000' }}>{'from'}</span>
            <span style={{ color: '#00B6A0' }}>{" 'react-icons/pi'"}</span>
          </pre>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-stone-50 rounded-lg px-3 py-2 border border-stone-100">
            <p className="text-xs font-semibold text-stone-600">Primary</p>
            <code className="text-[10px] text-brand font-mono">react-icons/lu</code>
            <p className="text-xs text-stone-400 mt-0.5">1,541 icons · Lucide</p>
          </div>
          <div className="bg-stone-50 rounded-lg px-3 py-2 border border-stone-100">
            <p className="text-xs font-semibold text-stone-600">Fallback</p>
            <code className="text-[10px] text-brand font-mono">react-icons/tb</code>
            <p className="text-xs text-stone-400 mt-0.5">5,963 icons · Tabler</p>
          </div>
          <div className="bg-stone-50 rounded-lg px-3 py-2 border border-stone-100">
            <p className="text-xs font-semibold text-stone-600">Filled states</p>
            <code className="text-[10px] text-brand font-mono">react-icons/pi</code>
            <p className="text-xs text-stone-400 mt-0.5">9,072 icons · Phosphor</p>
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
            { prop: 'Stroke width', value: '2px', note: 'Lucide and Tabler default. Consistent across all icons.' },
            { prop: 'Stroke caps', value: 'Round', note: 'Matches the brand\'s warm, approachable personality' },
            { prop: 'Stroke joins', value: 'Round', note: 'Consistent with cap style' },
            { prop: 'Grid', value: '24 × 24px', note: 'Standard size. All icons sit on this grid.' },
            { prop: 'Padding', value: '2px inset', note: 'Content stays within a 20px live area' },
            { prop: 'Corner radius', value: '2px where applicable', note: 'Slightly rounded for warmth' },
            { prop: 'Source', value: 'react-icons (lu → tb → pi)', note: 'Lucide first, Tabler fallback, Phosphor for filled' },
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
                  <LuSearch size={s.size} className="text-stone-600" />
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
                <LuSearch size={20} className="text-current" />
                <LuSettings size={20} className="text-current" />
                <LuUser size={20} className="text-current" />
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
              { outline: LuBell, filled: PiBellFill, label: 'Notifications' },
              { outline: LuStar, filled: PiStarFill, label: 'Favorites' },
              { outline: LuEye, filled: PiEyeFill, label: 'Visibility' },
              { outline: LuHouse, filled: PiHouseFill, label: 'Navigation' },
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
            <strong>Source:</strong> Outline from Lucide (<code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-[10px]">lu</code>). Filled from Phosphor (<code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-[10px]">pi</code>). Phosphor's filled variants have the closest visual match to Lucide's outlines.
          </p>
        </div>
      </Section>

      {/* ─── Fallback Demo ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">Tabler Fallback</h2>
        <p className="text-sm text-stone-600 mb-4">When Lucide doesn't have the icon you need, Tabler's 5,963 icons fill the gap. Same 2px stroke, same rounded caps — visually indistinguishable.</p>
        <div className="border border-stone-200 rounded-xl p-5">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex flex-col items-center gap-1.5">
              <LuSearch size={24} className="text-stone-700" />
              <span className="text-[10px] text-stone-400">Lucide</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <LuSettings size={24} className="text-stone-700" />
              <span className="text-[10px] text-stone-400">Lucide</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <LuUser size={24} className="text-stone-700" />
              <span className="text-[10px] text-stone-400">Lucide</span>
            </div>
            <div className="w-px h-8 bg-stone-200" />
            <div className="flex flex-col items-center gap-1.5">
              <TbGraph size={24} className="text-stone-700" />
              <span className="text-[10px] text-stone-400">Tabler</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <TbNetwork size={24} className="text-stone-700" />
              <span className="text-[10px] text-stone-400">Tabler</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <TbTopologyRing size={24} className="text-stone-700" />
              <span className="text-[10px] text-stone-400">Tabler</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <TbBrandGithub size={24} className="text-stone-700" />
              <span className="text-[10px] text-stone-400">Tabler</span>
            </div>
          </div>
          <p className="text-xs text-stone-400 mt-4">Lucide and Tabler icons side by side — same stroke, same rounding, same visual weight.</p>
        </div>
      </Section>

      {/* ─── Do/Don't ─── */}
      <Section title="Icon Dos & Don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-emerald-800 mb-3">Do</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Import from <code className="text-xs bg-stone-100 px-1 rounded">lu</code> first, <code className="text-xs bg-stone-100 px-1 rounded">tb</code> if missing</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Pair icons with text labels for clarity</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Use outline for default, filled for active state</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Vertically center icons with adjacent text</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Use standard sizes: 16, 20, 24, 32, 48px</li>
            </ul>
          </div>
          <div className="border border-red-200 bg-red-50/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-red-700 mb-3">Don't</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Import from <code className="text-xs bg-stone-100 px-1 rounded">md</code>, <code className="text-xs bg-stone-100 px-1 rounded">bs</code>, or <code className="text-xs bg-stone-100 px-1 rounded">fa6</code> — different visual style</li>
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
