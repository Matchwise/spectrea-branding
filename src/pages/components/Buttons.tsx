import { useState } from 'react'
import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { accessibility, brandTokens, components, selectedPalette } from '../../data/brand'
import { TbPlus, TbSearch, TbSettings, TbCheck } from 'react-icons/tb'

/* Specs render canon (components + buttonStates + focusRing, decision 31);
   demo styling stays page-side. */
const BS = brandTokens.buttonStates
const BTN = components.buttons
const TYPE = (name: string) => {
  const t = BTN.types.find(x => x.name === name)
  if (!t) throw new Error(`button type missing from canon: ${name}`)
  return t
}
const RADIUS = (token: string) => {
  const r = brandTokens.radii.find(x => x.token === token)
  if (!r) throw new Error(`radius token missing from canon: ${token}`)
  return r
}
const EXCEPTION = (() => {
  const e = accessibility.exceptionRegistry.entries.find(x => x.name === 'semantic-button-labels-white')
  if (!e) throw new Error('semantic-button-labels-white registry entry missing')
  return e
})()
const destructiveType = TYPE('Destructive')
const SEMANTIC_TEXT = 'label' in destructiveType ? destructiveType.label : '—'
const DEFAULT_SIZE = (() => {
  const s = BTN.sizes.find(x => x.name === 'Default')
  if (!s) throw new Error('Default button size missing from canon')
  return s
})()
const HEX = (name: string) => {
  const c = selectedPalette.colors.find(x => x.name === name)
  if (!c) throw new Error(`palette colour missing from canon: ${name}`)
  return c.hex
}
const SEMANTIC_CARDS = (['Confirm', 'Caution'] as const).map(name => {
  const t = TYPE(name)
  if (!('detail' in t) || !('examples' in t) || !('palette' in t)) throw new Error(`semantic detail missing on ${name}`)
  return t
})
// Tailwind constants (not canon): stone border family + text-size utilities.
const STONE_200 = '#E7E5E4'
const TEXT_CLASS: Record<number, string> = { 12: 'text-xs', 14: 'text-sm', 16: 'text-base' }

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

  /* Dark mode surface colors — selectedPalette.darkMode + dark secondary
     states (canon; no private copies) */
  const DM = selectedPalette.darkMode
  const dm = {
    bg: DM.bg,           // Ink — canvas role
    surface: DM.surface, // Graphite — elevated role
    border: DM.border,   // Fog — border / divider
    text: DM.text,       // Cloud — primary text
    muted: DM.muted,     // Mist — muted text on dark
    secondaryBg: BS.dark.secondary.bg,
    secondaryHover: BS.dark.secondary.hover,
  }

  /* Hover/active ladders for filled buttons — brandTokens.buttonStates */
  const hc = {
    brand:  { light: BS.light.cobalt, dark: BS.dark.cobalt },
    rose:   { light: BS.light.rose, dark: BS.dark.rose },
    teal:   { light: BS.light.teal, dark: BS.dark.teal },
    amber:  { light: BS.light.amber, dark: BS.dark.amber },
  }
  const mode = dark ? 'dark' : 'light'

  /* Hover/active handlers for demo buttons.
     Dark mode: fills lighten and the label flips to Ink while lightened —
     see brandTokens.buttonStates.dark.rule. */
  const transientText = dark ? BS.dark.transientText : '#FFFFFF'
  const filledHandlers = (color: keyof typeof hc) => ({
    style: { backgroundColor: hc[color][mode].base, color: '#FFFFFF' } as React.CSSProperties,
    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.backgroundColor = hc[color][mode].hover; e.currentTarget.style.color = transientText },
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.backgroundColor = hc[color][mode].base; e.currentTarget.style.color = '#FFFFFF' },
    onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.backgroundColor = hc[color][mode].active; e.currentTarget.style.color = transientText },
    onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.backgroundColor = hc[color][mode].hover; e.currentTarget.style.color = transientText },
  })

  return (
    <PageShell
      title="Buttons"
      subtitle="Six variants, a clear hierarchy, and a single rule underneath — every click should feel like the obvious next move."
    >
      {/* ── Variants ─────────────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content={`Six canonical types — Hierarchy (${BTN.types.filter(t => t.tier === 'Hierarchy').map(t => t.name).join(', ')}) and Semantic (${BTN.types.filter(t => t.tier === 'Semantic').map(t => t.name).join(', ')}). ${BTN.rule}`}>
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
            : { backgroundColor: '#FDFDFB', borderColor: '#E7E5E4' }
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
              <button className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-all ${dark ? 'btn-focus-dark' : 'btn-focus'}`}
                {...filledHandlers('brand')}
              >
                Create
              </button>
              <span className="text-xs font-mono" style={{ color: dark ? dm.muted : '#6D6D72' }}>Primary</span>
            </div>
            {/* Secondary */}
            <div className="flex flex-col items-center gap-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${dark ? 'btn-focus-dark' : 'btn-focus'}`}
                style={dark
                  ? { backgroundColor: dm.secondaryBg, color: dm.text }
                  : { backgroundColor: BS.light.secondary.bg, color: BS.light.secondary.text }
                }
                onMouseEnter={e => e.currentTarget.style.backgroundColor = dark ? dm.secondaryHover : STONE_200}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = dark ? dm.secondaryBg : BS.light.secondary.bg}
              >
                View Details
              </button>
              <span className="text-xs font-mono" style={{ color: dark ? dm.muted : '#6D6D72' }}>Secondary</span>
            </div>
            {/* Ghost */}
            <div className="flex flex-col items-center gap-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${dark ? 'btn-focus-dark' : 'btn-focus'}`}
                style={dark
                  ? { borderColor: '#B0B0B6', color: '#F4F4F1' }
                  : { borderColor: '#D6D3D1', color: '#6D6D72' }
                }
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = dark ? dm.secondaryBg : '#F4F4F1'; e.currentTarget.style.borderColor = dark ? '#F4F4F1' : '#97979E' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = dark ? '#B0B0B6' : '#D6D3D1' }}
              >
                Cancel
              </button>
              <span className="text-xs font-mono" style={{ color: dark ? dm.muted : '#6D6D72' }}>Ghost</span>
            </div>
          </div>

          {/* Semantic variants */}
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: dark ? dm.muted : '#97979E' }}>Semantic</p>
          <div className="flex items-center gap-4 flex-wrap">
            {/* Destructive (Rose) */}
            <div className="flex flex-col items-center gap-2">
              <button className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-all ${dark ? 'btn-focus-dark' : 'btn-focus'}`}
                {...filledHandlers('rose')}
              >
                Delete
              </button>
              <span className="text-xs font-mono" style={{ color: dark ? dm.muted : '#6D6D72' }}>Destructive</span>
            </div>
            {/* Confirm (Teal) */}
            <div className="flex flex-col items-center gap-2">
              <button className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all ${dark ? 'btn-focus-dark' : 'btn-focus'}`}
                {...filledHandlers('teal')}
              >
                <TbCheck size={16} /> Confirm
              </button>
              <span className="text-xs font-mono" style={{ color: dark ? dm.muted : '#6D6D72' }}>Confirm</span>
            </div>
            {/* Caution (Amber) */}
            <div className="flex flex-col items-center gap-2">
              <button className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-all ${dark ? 'btn-focus-dark' : 'btn-focus'}`}
                {...filledHandlers('amber')}
              >
                Override Score
              </button>
              <span className="text-xs font-mono" style={{ color: dark ? dm.muted : '#6D6D72' }}>Caution</span>
            </div>
          </div>
        </div>

        <div className="mt-3 bg-brand/5 rounded-lg px-4 py-3 border border-brand/10">
          <p className="text-xs text-brand">
            <strong>Rule:</strong> {BTN.rule}
          </p>
        </div>
      </Section>

      {/* ── Specifications ───────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Every button has consistent padding, radius, and typography. The transient direction per surface is canonical — see the two cards below the table.">
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
          {BTN.types.map(t => {
            if ('palette' in t) {
              const k = t.stateKey
              return {
                variant: t.name, lightBg: t.palette, darkBg: t.palette, text: t.label,
                hover: `${BS.light[k].hover} / ${BS.dark[k].hover}`, usage: t.role,
              }
            }
            /* structural branch: stateKey without palette = fill/text-shaped
               state group — never keyed on the group's name */
            if ('stateKey' in t) {
              const s = BS.light[t.stateKey]
              const d = BS.dark[t.stateKey]
              return {
                variant: t.name, lightBg: s.bg, darkBg: d.bg,
                text: `${s.text} / ${d.text}`,
                hover: `— / ${d.hover}`,
                usage: `${t.role}${'treatment' in t ? ` ${t.treatment}` : ''}`,
              }
            }
            return {
              variant: t.name, lightBg: '—', darkBg: '—', text: '—', hover: '—',
              usage: `${t.role}${'treatment' in t ? ` ${t.treatment}` : ''}`,
            }
          }).map((row, i) => (
            <div key={row.variant} className="grid grid-cols-6 px-4 py-2.5 items-center" style={{ borderBottom: i < 5 ? '1px solid #F5F5F4' : 'none' }}>
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
            <p className="text-xs text-slate">{BTN.lightHoverRule}</p>
          </div>
          <div className="bg-cloud rounded-lg px-4 py-3 border border-stone-100">
            <p className="text-xs font-semibold text-slate mb-1">Dark Mode Hover</p>
            <p className="text-xs text-slate">{BS.dark.rule}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mt-3">
          {[
            { label: 'Font', value: BTN.font },
            { label: 'Radius', value: `${RADIUS(DEFAULT_SIZE.radiusToken).px}px (${RADIUS(DEFAULT_SIZE.radiusToken).tailwind})` },
            { label: 'Semantic text', value: SEMANTIC_TEXT },
            { label: 'Focus ring', value: `${brandTokens.focusRing.width}, ${brandTokens.focusRing.offset} offset · ${brandTokens.focusRing.light} light / ${brandTokens.focusRing.dark} dark` },
          ].map(s => (
            <div key={s.label} className="bg-cloud rounded-lg px-3 py-2 border border-stone-100 text-center">
              <p className="text-xs font-semibold text-slate">{s.label}</p>
              <p className="text-xs font-mono text-slate">{s.value}</p>
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
          {SEMANTIC_CARDS.map(t => {
            const hex = HEX(t.palette)
            return (
              <div key={t.name} className="border rounded-xl p-5" style={{ borderColor: `${hex}30`, backgroundColor: `${hex}05` }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: hex }} />
                  <h3 className="text-sm font-semibold text-ink">{t.name} ({t.palette})</h3>
                </div>
                <p className="text-xs text-iron mb-3">{t.detail}</p>
                <div className="space-y-1.5">
                  {t.examples.map(ex => (
                    <p key={ex} className="text-xs font-mono text-slate">"{ex}"</p>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-3 bg-cloud rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-iron">
            <strong>Contrast note — ratified exception <code className="font-mono bg-white px-1 rounded">{EXCEPTION.name}</code> ({EXCEPTION.ratified}):</strong>{' '}
            {EXCEPTION.exception} <strong>Measured — WCAG 2.x:</strong> {EXCEPTION.measured.wcag2x} <strong>APCA:</strong> {EXCEPTION.measured.apca}{' '}
            <strong>Rationale:</strong> {EXCEPTION.rationale} <strong>Bounds:</strong> {EXCEPTION.bounds}
          </p>
        </div>
      </Section>

      {/* ── Sizes ────────────────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content={`Button sizes match the density of the surrounding UI. ${BTN.sizes.map(s => `${s.name} — ${s.use}`).join(' · ')}.`}>
            <span>Sizes</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-6">
          <div className="flex items-end justify-center gap-8 flex-wrap">
            {BTN.sizes.map(t => ({
              name: t.name, h: `${t.heightPx}px`, padding: t.padding,
              text: TEXT_CLASS[t.fontSizePx] ?? 'text-sm', radius: RADIUS(t.radiusToken).tailwind,
            })).map(s => (
              <div key={s.name} className="flex flex-col items-center gap-2">
                <button className={`${s.padding} ${s.radius} ${s.text} font-medium text-white bg-brand transition-all hover:bg-brand-hover active:bg-brand-active btn-focus`}>{s.name}</button>
                <span className="text-xs font-mono text-slate">{s.h}</span>
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
          <Tooltip content="Button states provide feedback. The dark-mode transient direction is canonical (buttonStates.dark.rule) — rendered in full under Specifications.">
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
                <span className="text-xs font-mono text-slate">Interactive</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-brand" style={{ outline: `2px solid ${brandTokens.focusRing.light}`, outlineOffset: '2px' }}>Focused</button>
                <span className="text-xs font-mono text-slate">Amber ring</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate border-2 border-stone-300" style={{ outline: `2px solid ${brandTokens.focusRing.light}`, outlineOffset: '2px' }}>Focused</button>
                <span className="text-xs font-mono text-slate">Ghost + ring</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-brand opacity-40 cursor-not-allowed" disabled>Disabled</button>
                <span className="text-xs font-mono text-slate">40% opacity</span>
              </div>
            </div>
          </div>
          {/* Dark mode states */}
          <div className="rounded-xl p-5" style={{ backgroundColor: dm.bg, border: `1px solid ${dm.border}` }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: dm.muted }}>Dark Mode</p>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex flex-col items-center gap-1.5">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all btn-focus-dark"
                  style={{ backgroundColor: hc.brand.dark.base, color: '#FFFFFF' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = hc.brand.dark.hover; e.currentTarget.style.color = '#18181C' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = hc.brand.dark.base; e.currentTarget.style.color = '#FFFFFF' }}
                  onMouseDown={e => { e.currentTarget.style.backgroundColor = hc.brand.dark.active; e.currentTarget.style.color = '#18181C' }}
                  onMouseUp={e => { e.currentTarget.style.backgroundColor = hc.brand.dark.hover; e.currentTarget.style.color = '#18181C' }}
                >Hover me</button>
                <span className="text-xs font-mono" style={{ color: dm.muted }}>Interactive</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-brand" style={{ outline: `2px solid ${brandTokens.focusRing.dark}`, outlineOffset: '2px' }}>Focused</button>
                <span className="text-xs font-mono" style={{ color: dm.muted }}>Amber ring</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium border-2" style={{ borderColor: '#97979E', color: '#D6D3D1', outline: `2px solid ${brandTokens.focusRing.dark}`, outlineOffset: '2px' }}>Focused</button>
                <span className="text-xs font-mono" style={{ color: dm.muted }}>Ghost + ring</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-brand opacity-40 cursor-not-allowed" disabled>Disabled</button>
                <span className="text-xs font-mono" style={{ color: dm.muted }}>40% opacity</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-stone-200 rounded-xl overflow-hidden mt-4">
          {[
            { state: 'Default', light: 'Base color', dark: 'Same base color' },
            { state: 'Hover', light: 'Explicit darker shade', dark: 'Explicit lighter shade + Ink label' },
            { state: 'Active', light: 'Explicit darkest shade', dark: 'Explicit lightest shade + Ink label' },
            { state: 'Focus', light: `${brandTokens.focusRing.width} Amber outline, ${brandTokens.focusRing.offset} offset`, dark: `${brandTokens.focusRing.width} Amber outline, ${brandTokens.focusRing.offset} offset` },
            { state: 'Disabled', light: BTN.disabled, dark: BTN.disabled },
          ].map((row, i) => (
            <div key={row.state} className="grid grid-cols-3 px-4 py-2.5" style={{ borderBottom: i < 4 ? '1px solid #F5F5F4' : 'none' }}>
              <span className="text-sm font-medium text-iron">{row.state}</span>
              <span className="text-xs font-mono text-iron">{row.light}</span>
              <span className="text-xs font-mono text-iron">{row.dark}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 bg-cloud rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-iron">
            <strong>Focus ring:</strong> {brandTokens.focusRing.width} outline with {brandTokens.focusRing.offset} offset. Focus is literally where attention should go. {brandTokens.focusRing.note} Only appears on keyboard navigation (<code className="font-mono bg-cloud px-1 rounded">focus-visible</code>), never on click.
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
              <span className="text-xs font-mono text-slate">Primary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-iron bg-cloud transition-all hover:bg-stone-200 btn-focus disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:bg-cloud"
                disabled={loading.secondary}
                onClick={() => startLoading('secondary')}
              >
                {loading.secondary ? <><Spinner /> Saving...</> : 'Save Draft'}
              </button>
              <span className="text-xs font-mono text-slate">Secondary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-rose transition-all hover:bg-brand-rose-hover active:bg-brand-rose-active btn-focus disabled:hover:bg-brand-rose disabled:opacity-80 disabled:cursor-not-allowed"
                disabled={loading.destructive}
                onClick={() => startLoading('destructive')}
              >
                {loading.destructive ? <><Spinner /> Deleting...</> : 'Delete'}
              </button>
              <span className="text-xs font-mono text-slate">Destructive</span>
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
                  style={i > 0 && i !== toolbarActive && i - 1 !== toolbarActive ? { borderLeft: '1px solid #E7E5E4' } : undefined}
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
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#007D6E' }}>Do</h3>
            <ul className="space-y-2 text-sm text-iron">
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use verb-first labels: "Create", "Save Draft", "Open"</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>{BTN.rule}</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Pair destructive actions with a confirmation step</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Show loading state with a spinner, not label change</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use the explicit hover tokens from buttonStates — never ad-hoc shades</li>
            </ul>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Don't</h3>
            <ul className="space-y-2 text-sm text-iron">
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
