import { useState } from 'react'
import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { TbPlus, TbSearch, TbSettings, TbCheck } from 'react-icons/tb'

/* ------------------------------------------------------------------ */

function CopyValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1200) }}
      className="text-xs font-mono text-pewter hover:text-iron transition-colors"
      title={`Copy ${value}`}
    >
      {copied ? 'Copied!' : value}
    </button>
  )
}

function Spinner() {
  return (
    <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-r-transparent" />
  )
}

/* ------------------------------------------------------------------ */

export default function Buttons() {
  const [dark, setDark] = useState(false)
  const [toolbarActive, setToolbarActive] = useState(0)
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const startLoading = (key: string) => {
    setLoading(p => ({ ...p, [key]: true }))
    setTimeout(() => setLoading(p => ({ ...p, [key]: false })), 2000)
  }

  /* Dark mode surface colors — Warm Blend palette (parallel mode) */
  const dm = {
    bg: '#18181C',       // Ink — canvas role
    surface: '#212226',  // Graphite — elevated role
    border: '#2E2F35',   // Fog — border / divider
    text: '#F4F4F1',     // Cloud — primary text
    muted: '#B0B0B6',    // Mist — muted text on dark
    secondaryBg: '#2E2F35',
    secondaryHover: '#3A3A40',
  }

  /* Explicit hover/active colors for filled buttons */
  const hc = {
    brand:  { light: { base: '#4271DF', hover: '#3A63C4', active: '#3255A7' }, dark: { base: '#4271DF', hover: '#5C87E5', active: '#7699EB' } },
    rose:   { light: { base: '#F24260', hover: '#D63B55', active: '#BA3249' }, dark: { base: '#F24260', hover: '#F56579', active: '#F78892' } },
    teal:   { light: { base: '#00B6A0', hover: '#009E8A', active: '#008775' }, dark: { base: '#00B6A0', hover: '#20C8B2', active: '#40D4C3' } },
    amber:  { light: { base: '#E19000', hover: '#C58200', active: '#A86E00' }, dark: { base: '#E19000', hover: '#ECA41E', active: '#F2B63C' } },
  }
  const mode = dark ? 'dark' : 'light'

  /* Hover/active handlers for demo buttons */
  const filledHandlers = (color: keyof typeof hc) => ({
    style: { backgroundColor: hc[color][mode].base } as React.CSSProperties,
    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.backgroundColor = hc[color][mode].hover },
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.backgroundColor = hc[color][mode].base },
    onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.backgroundColor = hc[color][mode].active },
    onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.backgroundColor = hc[color][mode].hover },
  })

  return (
    <PageShell
      title="Buttons"
      subtitle="Six variants, a clear hierarchy, and a single rule underneath — every click should feel like the obvious next move."
    >
      {/* ── Variants ─────────────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Spectrea uses four core button variants plus two semantic variants. Primary (Cobalt) is the hero action. Confirm (Teal) and Caution (Amber) are reserved for specific semantic contexts.">
            <span>Button Variants</span>
          </Tooltip>
        </h2>

        {/* Mode toggle */}
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setDark(false)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors btn-focus ${!dark ? 'bg-ink text-white' : 'text-pewter hover:text-iron'}`}
          >
            Light
          </button>
          <button
            onClick={() => setDark(true)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors btn-focus ${dark ? 'bg-ink text-white' : 'text-pewter hover:text-iron'}`}
          >
            Dark
          </button>
        </div>

        <div
          className="border rounded-xl p-6 transition-colors"
          style={dark
            ? { backgroundColor: dm.bg, borderColor: dm.border }
            : { backgroundColor: '#FDFDFB', borderColor: '#E5E7EB' }
          }
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-center mb-5" style={{ color: dark ? dm.muted : '#97979E' }}>
            Interactive — hover, press, and focus these buttons
          </p>

          {/* Hierarchy variants */}
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: dark ? dm.muted : '#97979E' }}>Hierarchy</p>
          <div className="flex items-center gap-4 flex-wrap mb-6">
            {/* Primary */}
            <div className="flex flex-col items-center gap-2">
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all btn-focus"
                {...filledHandlers('brand')}
              >
                Create
              </button>
              <span className="text-xs font-mono" style={{ color: dark ? dm.muted : '#97979E' }}>Primary</span>
            </div>
            {/* Secondary */}
            <div className="flex flex-col items-center gap-2">
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all btn-focus"
                style={dark
                  ? { backgroundColor: dm.secondaryBg, color: dm.text }
                  : { backgroundColor: '#F3F4F6', color: '#212226' }
                }
                onMouseEnter={e => e.currentTarget.style.backgroundColor = dark ? dm.secondaryHover : '#E5E7EB'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = dark ? dm.secondaryBg : '#F3F4F6'}
              >
                View Details
              </button>
              <span className="text-xs font-mono" style={{ color: dark ? dm.muted : '#97979E' }}>Secondary</span>
            </div>
            {/* Ghost */}
            <div className="flex flex-col items-center gap-2">
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all btn-focus"
                style={dark
                  ? { borderColor: '#B0B0B6', color: '#F4F4F1' }
                  : { borderColor: '#D1D5DB', color: '#97979E' }
                }
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = dark ? dm.secondaryBg : '#F4F4F1'; e.currentTarget.style.borderColor = dark ? '#F4F4F1' : '#97979E' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = dark ? '#B0B0B6' : '#D1D5DB' }}
              >
                Cancel
              </button>
              <span className="text-xs font-mono" style={{ color: dark ? dm.muted : '#97979E' }}>Ghost</span>
            </div>
          </div>

          {/* Semantic variants */}
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: dark ? dm.muted : '#97979E' }}>Semantic</p>
          <div className="flex items-center gap-4 flex-wrap">
            {/* Destructive (Rose) */}
            <div className="flex flex-col items-center gap-2">
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all btn-focus"
                {...filledHandlers('rose')}
              >
                Delete
              </button>
              <span className="text-xs font-mono" style={{ color: dark ? dm.muted : '#97979E' }}>Destructive</span>
            </div>
            {/* Confirm (Teal) */}
            <div className="flex flex-col items-center gap-2">
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all btn-focus"
                {...filledHandlers('teal')}
              >
                <TbCheck size={16} /> Confirm
              </button>
              <span className="text-xs font-mono" style={{ color: dark ? dm.muted : '#97979E' }}>Confirm</span>
            </div>
            {/* Caution (Amber) */}
            <div className="flex flex-col items-center gap-2">
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all btn-focus"
                {...filledHandlers('amber')}
              >
                Override Score
              </button>
              <span className="text-xs font-mono" style={{ color: dark ? dm.muted : '#97979E' }}>Caution</span>
            </div>
          </div>
        </div>

        <div className="mt-3 bg-brand/5 rounded-lg px-4 py-3 border border-brand/10">
          <p className="text-xs text-brand">
            <strong>Rule:</strong> One Primary button per section maximum. Confirm and Caution are reserved for specific semantic contexts — never as general-purpose actions.
          </p>
        </div>
      </Section>

      {/* ── Specifications ───────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Every button has consistent padding, radius, and typography. Dark mode inverts hover direction: lighten instead of darken.">
            <span>Specifications</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-x-auto">
          <div className="min-w-[720px]">
          <div className="grid grid-cols-6 bg-cloud border-b border-stone-200 px-4 py-2">
            {['Variant', 'Light Bg', 'Dark Bg', 'Text', 'Hover', 'Usage'].map(h => (
              <span key={h} className="text-[10px] font-semibold text-pewter uppercase tracking-wider">{h}</span>
            ))}
          </div>
          {[
            { variant: 'Primary', lightBg: 'Cobalt', darkBg: 'Cobalt', text: 'White', hover: '#3A63C4 / #5C87E5', usage: 'Main CTA. One per section.' },
            { variant: 'Secondary', lightBg: 'Stone 100', darkBg: 'Graphite tint', text: 'Stone 700 / Cloud', hover: 'Stone 200 / #3A3A40', usage: 'Supporting actions.' },
            { variant: 'Ghost', lightBg: 'Transparent', darkBg: 'Transparent', text: 'Stone 500 / Stone 300', hover: 'Stone 50 / Graphite tint', usage: 'Tertiary actions. 2px border.' },
            { variant: 'Destructive', lightBg: 'Rose', darkBg: 'Rose', text: 'White', hover: '#D63B55 / #F56579', usage: 'Irreversible actions.' },
            { variant: 'Confirm', lightBg: 'Teal', darkBg: 'Teal', text: 'White', hover: '#009E8A / #20C8B2', usage: 'Verify, approve, connect.' },
            { variant: 'Caution', lightBg: 'Amber', darkBg: 'Amber', text: 'White', hover: '#C58200 / #ECA41E', usage: 'Override, merge, proceed.' },
          ].map((row, i) => (
            <div key={row.variant} className="grid grid-cols-6 px-4 py-2.5 items-center" style={{ borderBottom: i < 5 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-sm font-medium text-ink">{row.variant}</span>
              <span className="text-xs font-mono text-iron">{row.lightBg}</span>
              <span className="text-xs font-mono text-iron">{row.darkBg}</span>
              <span className="text-xs font-mono text-iron">{row.text}</span>
              <span className="text-xs font-mono text-iron">{row.hover}</span>
              <span className="text-xs text-slate">{row.usage}</span>
            </div>
          ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div className="bg-cloud rounded-lg px-4 py-3 border border-stone-100">
            <p className="text-xs font-semibold text-slate mb-1">Light Mode Hover</p>
            <p className="text-xs text-slate">Hand-picked darker shade — buttons recede into the surface on press.</p>
          </div>
          <div className="bg-cloud rounded-lg px-4 py-3 border border-stone-100">
            <p className="text-xs font-semibold text-slate mb-1">Dark Mode Hover</p>
            <p className="text-xs text-slate">Hand-picked lighter shade — buttons lift toward the user on hover.</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mt-3">
          {[
            { label: 'Font', value: 'Lexend Medium 500' },
            { label: 'Radius', value: '8px (rounded-lg)' },
            { label: 'Semantic text', value: 'White' },
            { label: 'Focus ring', value: '2px Amber, 2px offset' },
          ].map(s => (
            <div key={s.label} className="bg-cloud rounded-lg px-3 py-2 border border-stone-100 text-center">
              <p className="text-xs font-semibold text-slate">{s.label}</p>
              <p className="text-xs font-mono text-pewter">{s.value}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Semantic Usage Rules ──────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Semantic buttons carry meaning through color. Unlike Primary (which just means 'main action'), Confirm and Caution tell the user what kind of action they're taking.">
            <span>Semantic Button Rules</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A030', backgroundColor: '#00B6A005' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00B6A0' }} />
              <h3 className="text-sm font-semibold text-ink">Confirm (Teal)</h3>
            </div>
            <p className="text-xs text-iron mb-3">For actions that affirm, verify, or establish positive connections. The outcome is constructive.</p>
            <div className="space-y-1.5">
              {['Verify', 'Approve', 'Connect', 'Mark as Trusted'].map(ex => (
                <p key={ex} className="text-xs font-mono text-slate">"{ex}"</p>
              ))}
            </div>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#E1900030', backgroundColor: '#E1900005' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#E19000' }} />
              <h3 className="text-sm font-semibold text-ink">Caution (Amber)</h3>
            </div>
            <p className="text-xs text-iron mb-3">For actions that acknowledge a warning or override a safeguard. Reversible but consequential.</p>
            <div className="space-y-1.5">
              {['Override', 'Merge', 'Proceed Anyway', 'Dismiss Warning'].map(ex => (
                <p key={ex} className="text-xs font-mono text-slate">"{ex}"</p>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 bg-cloud rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-iron">
            <strong>Contrast note:</strong> White text on Teal and Amber does not meet WCAG AA (4.5:1). This is accepted because semantic buttons are large, infrequent, and carry strong contextual meaning through color. The label is always reinforced by the action context (e.g. a confirmation dialog).
          </p>
        </div>
      </Section>

      {/* ── Sizes ────────────────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Button sizes match the density of the surrounding UI. Compact for toolbars and tables, Default for most contexts, Large for standalone CTAs.">
            <span>Sizes</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-6">
          <div className="flex items-end justify-center gap-8 flex-wrap">
            {[
              { name: 'Compact', h: '32px', padding: 'px-3 py-1.5', text: 'text-xs', radius: 'rounded-md' },
              { name: 'Default', h: '36px', padding: 'px-4 py-2', text: 'text-sm', radius: 'rounded-lg' },
              { name: 'Large', h: '48px', padding: 'px-6 py-3', text: 'text-base', radius: 'rounded-lg' },
            ].map(s => (
              <div key={s.name} className="flex flex-col items-center gap-2">
                <button className={`${s.padding} ${s.radius} ${s.text} font-medium text-white bg-brand transition-all hover:bg-brand-hover active:bg-brand-active btn-focus`}>{s.name}</button>
                <span className="text-xs font-mono text-pewter">{s.h}</span>
                <CopyValue value={`${s.padding} ${s.radius} ${s.text}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 bg-cloud rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-iron">
            <strong>Custom sizes:</strong> These three cover most cases. When a specific layout demands a different height, compose it from the same building blocks — Lexend Medium, rounded-lg, and padding on the 4px grid. The system provides defaults, not constraints.
          </p>
        </div>
      </Section>

      {/* ── Icon Buttons ─────────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Icons reinforce button intent. Always pair an icon with a text label when space allows. Icon-only buttons need a visible tooltip or aria-label.">
            <span>Icon Buttons</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-stone-200 rounded-xl p-5">
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-3">Icon + Label</p>
            <div className="flex items-center gap-3 flex-wrap">
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand transition-all hover:bg-brand-hover active:bg-brand-active btn-focus">
                <TbPlus size={16} /> Create
              </button>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-iron bg-cloud transition-all hover:bg-stone-200 active:bg-stone-300 btn-focus">
                <TbSearch size={16} /> Search
              </button>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate border-2 border-stone-300 transition-all hover:bg-cloud hover:border-stone-400 active:bg-cloud btn-focus">
                <TbSettings size={16} /> Settings
              </button>
            </div>
            <p className="text-xs text-slate mt-3">Icon left, 6px gap (gap-1.5), 16px icon for default buttons.</p>
          </div>
          <div className="border border-stone-200 rounded-xl p-5">
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-3">Icon Only</p>
            <div className="flex items-center gap-3 flex-wrap">
              <button className="flex items-center justify-center w-9 h-9 rounded-lg text-white bg-brand transition-all hover:bg-brand-hover active:bg-brand-active btn-focus" aria-label="Add">
                <TbPlus size={18} />
              </button>
              <button className="flex items-center justify-center w-9 h-9 rounded-lg text-iron bg-cloud transition-all hover:bg-stone-200 active:bg-stone-300 btn-focus" aria-label="Search">
                <TbSearch size={18} />
              </button>
              <button className="flex items-center justify-center w-9 h-9 rounded-lg text-slate border-2 border-stone-300 transition-all hover:bg-cloud hover:border-stone-400 active:bg-cloud btn-focus" aria-label="Settings">
                <TbSettings size={18} />
              </button>
            </div>
            <p className="text-xs text-slate mt-3">36px square. Always provide <code className="text-xs font-mono bg-cloud px-1 rounded">aria-label</code>.</p>
          </div>
        </div>
      </Section>

      {/* ── States ───────────────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Button states provide feedback. In dark mode, hover direction reverses: buttons brighten toward the user instead of darkening into the surface.">
            <span>States</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Light mode states */}
          <div className="border border-stone-200 rounded-xl p-5 bg-white">
            <p className="text-[10px] font-semibold text-pewter uppercase tracking-wider mb-3">Light Mode</p>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex flex-col items-center gap-1.5">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-brand transition-all hover:bg-brand-hover active:bg-brand-active btn-focus">Hover me</button>
                <span className="text-[10px] font-mono text-pewter">Interactive</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-brand" style={{ outline: '2px solid rgba(225, 144, 0, 0.7)', outlineOffset: '2px' }}>Focused</button>
                <span className="text-[10px] font-mono text-pewter">Amber ring</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate border-2 border-stone-300" style={{ outline: '2px solid rgba(225, 144, 0, 0.7)', outlineOffset: '2px' }}>Focused</button>
                <span className="text-[10px] font-mono text-pewter">Ghost + ring</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-brand opacity-40 cursor-not-allowed" disabled>Disabled</button>
                <span className="text-[10px] font-mono text-pewter">40% opacity</span>
              </div>
            </div>
          </div>
          {/* Dark mode states */}
          <div className="rounded-xl p-5" style={{ backgroundColor: dm.bg, border: `1px solid ${dm.border}` }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: dm.muted }}>Dark Mode</p>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex flex-col items-center gap-1.5">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all btn-focus"
                  style={{ backgroundColor: hc.brand.dark.base }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = hc.brand.dark.hover}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = hc.brand.dark.base}
                  onMouseDown={e => e.currentTarget.style.backgroundColor = hc.brand.dark.active}
                  onMouseUp={e => e.currentTarget.style.backgroundColor = hc.brand.dark.hover}
                >Hover me</button>
                <span className="text-[10px] font-mono" style={{ color: dm.muted }}>Interactive</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-brand" style={{ outline: '2px solid rgba(225, 144, 0, 0.7)', outlineOffset: '2px' }}>Focused</button>
                <span className="text-[10px] font-mono" style={{ color: dm.muted }}>Amber ring</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium border-2" style={{ borderColor: '#97979E', color: '#D1D5DB', outline: '2px solid rgba(225, 144, 0, 0.7)', outlineOffset: '2px' }}>Focused</button>
                <span className="text-[10px] font-mono" style={{ color: dm.muted }}>Ghost + ring</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-brand opacity-40 cursor-not-allowed" disabled>Disabled</button>
                <span className="text-[10px] font-mono" style={{ color: dm.muted }}>40% opacity</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-stone-200 rounded-xl overflow-hidden mt-4">
          {[
            { state: 'Default', light: 'Base color', dark: 'Same base color' },
            { state: 'Hover', light: 'Explicit darker shade', dark: 'Explicit lighter shade' },
            { state: 'Active', light: 'Explicit darkest shade', dark: 'Explicit lightest shade' },
            { state: 'Focus', light: '2px Amber outline, 2px offset', dark: '2px Amber outline, 2px offset' },
            { state: 'Disabled', light: 'opacity-40', dark: 'opacity-40' },
          ].map((row, i) => (
            <div key={row.state} className="grid grid-cols-3 px-4 py-2.5" style={{ borderBottom: i < 4 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-sm font-medium text-iron">{row.state}</span>
              <span className="text-xs font-mono text-iron">{row.light}</span>
              <span className="text-xs font-mono text-iron">{row.dark}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 bg-cloud rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-iron">
            <strong>Focus ring:</strong> 2px solid Amber outline with 2px offset. Amber = "attention" in the semantic color system — focus is literally where attention should go. The warm tone contrasts with every button variant and works equally well on light and dark surfaces. Only appears on keyboard navigation (<code className="font-mono bg-cloud px-1 rounded">focus-visible</code>), never on click.
          </p>
        </div>
      </Section>

      {/* ── Loading State ────────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Loading buttons prevent double-submission. The spinner replaces the icon, never the label, keeping button width stable.">
            <span>Loading State</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-6 bg-white">
          <p className="text-[10px] font-semibold text-pewter uppercase tracking-wider text-center mb-4">Click to trigger a 2-second loading state</p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <button
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand transition-all hover:bg-brand-hover active:bg-brand-active btn-focus disabled:hover:bg-brand disabled:opacity-80 disabled:cursor-not-allowed"
                disabled={loading.primary}
                onClick={() => startLoading('primary')}
              >
                {loading.primary ? <><Spinner /> Creating...</> : <><TbPlus size={16} /> Create</>}
              </button>
              <span className="text-xs font-mono text-pewter">Primary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-iron bg-cloud transition-all hover:bg-stone-200 btn-focus disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:bg-cloud"
                disabled={loading.secondary}
                onClick={() => startLoading('secondary')}
              >
                {loading.secondary ? <><Spinner /> Saving...</> : 'Save Draft'}
              </button>
              <span className="text-xs font-mono text-pewter">Secondary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-rose transition-all hover:bg-brand-rose-hover active:bg-brand-rose-active btn-focus disabled:hover:bg-brand-rose disabled:opacity-80 disabled:cursor-not-allowed"
                disabled={loading.destructive}
                onClick={() => startLoading('destructive')}
              >
                {loading.destructive ? <><Spinner /> Deleting...</> : 'Delete'}
              </button>
              <span className="text-xs font-mono text-pewter">Destructive</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          {[
            { rule: 'Spinner replaces icon', detail: 'Never replace the label — width must stay stable' },
            { rule: 'Disable during loading', detail: 'Prevent double-submission with pointer-events-none' },
            { rule: 'Use verb + "..."', detail: '"Creating...", "Saving...", not just "Loading..."' },
          ].map(r => (
            <div key={r.rule} className="bg-cloud rounded-lg px-3 py-2.5 border border-stone-100">
              <p className="text-xs font-medium text-iron">{r.rule}</p>
              <p className="text-xs text-slate mt-0.5">{r.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Button Groups ────────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Button groups cluster related actions. Use for toolbars, pagination, and segmented controls. Maintain a clear primary/secondary hierarchy within the group.">
            <span>Button Groups</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-stone-200 rounded-xl p-5">
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-3">Segmented Control</p>
            <div className="inline-flex rounded-lg overflow-hidden border border-stone-200">
              {['List', 'Grid', 'Graph'].map((label, i) => (
                <button
                  key={label}
                  onClick={() => setToolbarActive(i)}
                  className={`px-3 py-1.5 text-xs font-medium transition-all btn-focus ${
                    i === toolbarActive
                      ? 'bg-ink text-white'
                      : 'text-slate hover:bg-cloud hover:text-ink active:bg-cloud'
                  }`}
                  style={i > 0 && i !== toolbarActive && i - 1 !== toolbarActive ? { borderLeft: '1px solid #E5E7EB' } : undefined}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate mt-3">Click to switch. Active = Ink fill (Tier 2: Structural), not Cobalt.</p>
          </div>
          <div className="border border-stone-200 rounded-xl p-5">
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-3">Action Pair</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand transition-all hover:bg-brand-hover active:bg-brand-active btn-focus">Save Changes</button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate border-2 border-stone-300 transition-all hover:bg-cloud hover:border-stone-400 active:bg-cloud btn-focus">Discard</button>
            </div>
            <p className="text-xs text-slate mt-3">Primary left, Ghost right. 8px gap.</p>
          </div>
        </div>
      </Section>

      {/* ── Dos & Don'ts ─────────────────────────────────────────── */}
      <Section title="Dos & Don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#008775' }}>Do</h3>
            <ul className="space-y-2 text-sm text-iron">
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use verb-first labels: "Create", "Save Draft", "Open"</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>One Primary button per section maximum</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Pair destructive actions with a confirmation step</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use Confirm/Caution only for their defined semantic contexts</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Show loading state with a spinner, not label change</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use explicit hover tokens — darken in light mode, lighten in dark mode</li>
            </ul>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Don't</h3>
            <ul className="space-y-2 text-sm text-iron">
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Put two Primary buttons next to each other</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use semantic buttons as general-purpose actions</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use semantic buttons where a Primary would do</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use the gradient on buttons (solid colors only)</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use vague labels: "Submit", "Click Here", "OK"</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Disable buttons without explaining why</li>
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
