import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell, { Section } from '../../components/layout/PageShell'
import { selectedPalette, colorSystem, brandTokens } from '../../data/brand'

// Palette hexes, roles, and ratio numbers render from canon (selectedPalette +
// colorSystem, decision 30). Contrast and luminance are computed from the
// hexes — the numbers can never disagree with the palette.
const HEX = (name: string) => {
  const c = selectedPalette.colors.find(x => x.name === name)
  if (!c) throw new Error(`palette colour missing from canon: ${name}`)
  return c.hex
}

const srgbLin = (c: number) => { const v = c / 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }
const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map(i => srgbLin(parseInt(hex.slice(i, i + 2), 16)))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
const ratioStr = (r: number) => `${r >= 10 ? r.toFixed(1) : r.toFixed(2)}:1`
// Swatch label colour by computed lightness: soft on near-white, Ink on mids,
// Canvas on darks.
const labelColor = (hex: string) => {
  const L = luminance(hex)
  return L > 0.85 ? HEX('Pewter') : L > 0.3 ? HEX('Ink') : HEX('Canvas')
}

const ACCENTS = colorSystem.accents
const NEUTRALS = colorSystem.neutrals.tokens
const DARK = selectedPalette.darkMode

function Swatch({ name, hex, role }: { name: string; hex: string; role: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      className="group text-left btn-focus rounded-lg"
      title={`Copy ${hex}`}
    >
      <div className="h-16 rounded-lg border border-black/5 group-hover:scale-105 transition-transform flex items-end p-2" style={{ backgroundColor: hex }}>
        <span className="text-xs font-mono opacity-80" style={{ color: labelColor(hex) }}>{copied ? 'Copied!' : hex}</span>
      </div>
      <p className="text-xs font-medium text-iron mt-1">{name}</p>
      <p className="text-xs text-slate">{role}</p>
    </button>
  )
}

function MiniPreview({ dark }: { dark?: boolean }) {
  const bg = dark ? DARK.bg : HEX('Canvas')
  const surface = dark ? DARK.surface : HEX('Cloud')
  const text = dark ? DARK.text : HEX('Ink')
  const muted = dark ? DARK.muted : HEX('Pewter')
  const border = dark ? DARK.border : `${HEX('Ink')}08`
  const accentHexes = ACCENTS.map(a => HEX(a.name))

  return (
    <div className="rounded-lg overflow-hidden text-left" style={{ backgroundColor: bg, border: `1px solid ${border}` }}>
      {/* Nav */}
      <div className="flex items-center px-3 py-1.5" style={{ borderBottom: `1px solid ${border}` }}>
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 rounded brand-gradient" />
          <span className="text-[8px] font-bold" style={{ color: text }}>Spectrea</span>
        </div>
        <div className="flex-1" />
        <span className="text-[7px] px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: HEX('Cobalt') }}>Sign Up</span>
      </div>
      {/* Content */}
      <div className="p-3">
        <p className="text-[9px] font-bold mb-0.5" style={{ color: text }}>Knowledge Overview</p>
        <p className="text-[7px] mb-2" style={{ color: muted }}>3 new connections discovered</p>
        <div className="grid grid-cols-4 gap-1 mb-2">
          {accentHexes.map((c, i) => (
            <div key={i} className="rounded p-1" style={{ backgroundColor: surface, border: `1px solid ${border}` }}>
              <p className="text-[5px]" style={{ color: muted }}>{['Active', 'Growth', 'Pending', 'Alerts'][i]}</p>
              <p className="text-[8px] font-bold" style={{ color: text }}>{['2.8k', '+23%', '12', '3'][i]}</p>
              <p className="text-[5px]" style={{ color: c }}>{['■', '▲', '●', '!'][i]}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {accentHexes.map((c, i) => (
            <span key={i} className="text-[5px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: c + '18', color: c, border: `1px solid ${c}30` }}>
              {['items', 'connected', 'review', 'critical'][i]}
            </span>
          ))}
        </div>
      </div>
      <div className="h-0.5 brand-gradient-h" />
    </div>
  )
}

// Page-specific application notes per colour (what each is used FOR in the
// app); names, roles, hexes, and contrast figures come from canon/computation.
const ACCENT_USAGE: Record<string, string> = {
  Cobalt: 'Primary buttons, links, nav highlights, key CTAs',
  Teal: 'Positive states, connected status, growth indicators, completion',
  Amber: 'Warnings, pending states, confidence scores, highlights',
  Rose: 'Errors, destructive actions, critical alerts, notification badges',
}
// Ratio percentages and role phrases interpolate from canon verbatim — no
// independent copies.
const RATIO = Object.fromEntries(colorSystem.ratio.light.map(r => [r.token, r]))
const NEUTRAL_USAGE: Record<string, string> = {
  Canvas: `${RATIO.Canvas.what} — ${RATIO.Canvas.pct}% of any screen`,
  Cloud: `${RATIO.Cloud.what} — ${RATIO.Cloud.pct}% of any screen`,
  Pewter: 'Overlines, timestamps, chips, captions (below AA, supplementary only)',
  Slate: 'Descriptions, helper text, card sub-labels',
  Iron: 'Table headers, field labels, key body sentences',
  Graphite: 'Sidebar, tooltip, footer chrome. Dark-mode elevated surface (= Cloud on light)',
  Ink: 'Headings, body copy, labels',
}
const textContrastNote = (name: string) => {
  const r = contrast(HEX(name), HEX('Canvas'))
  if (r < 3) return ` — ${ratioStr(r)}`
  return ` — ${ratioStr(r)}${r >= 7 ? ' AAA' : r >= 4.5 ? ' AA' : ''}${name === 'Ink' ? ' on Canvas' : ''}`
}

export default function ColorOverview() {
  return (
    <PageShell
      title="Color System"
      subtitle="Spectrea's complete color system — a neutral canvas with a cobalt hero and three spectrum accents."
    >
      {/* Full palette at a glance */}
      <Section title="Palette at a Glance">
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-3">
          {ACCENTS.map(a => (
            <Swatch key={a.name} name={a.name} hex={HEX(a.name)} role={a.roleLabel} />
          ))}
          {NEUTRALS.map(n => (
            <Swatch key={n.name} name={n.name} hex={HEX(n.name)} role={n.roleLabel} />
          ))}
        </div>
        <p className="text-xs text-slate mt-3 leading-relaxed">{colorSystem.neutrals.ladderNote}</p>
      </Section>

      {/* Brand gradient */}
      <Section title="Brand Gradient">
        <div className="h-3 rounded-full brand-gradient" />
        <p className="text-xs text-slate mt-1.5 font-mono">Cobalt → Teal → Amber at {brandTokens.gradients.angleDeg}°, OKLCH-interpolated with sRGB fallback. Rose extends it for maximum-expression moments. The lockup uses a separate 2-stop Cool Duet on the mark only.</p>
      </Section>

      {/* Color roles summary */}
      <Section title="How Colors Are Used">
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            ...ACCENTS.map(a => ({ color: HEX(a.name), name: a.name, role: a.roleLabel, usage: ACCENT_USAGE[a.name] ?? a.meaning })),
            ...NEUTRALS.map(n => {
              const isText = ['Ink', 'Iron', 'Slate', 'Pewter'].includes(n.name)
              return { color: HEX(n.name), name: n.name, role: n.roleLabel, usage: `${NEUTRAL_USAGE[n.name] ?? ''}${isText ? textContrastNote(n.name) : ''}` }
            }),
          ].map((c, i, arr) => (
            <div key={c.name} className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: i < arr.length - 1 ? '1px solid #F5F5F4' : 'none' }}>
              <div className="w-5 h-5 rounded flex-shrink-0" style={{ backgroundColor: c.color, border: luminance(c.color) > 0.85 ? '1px solid #E7E5E4' : 'none' }} />
              <div className="w-16 flex-shrink-0">
                <p className="text-xs font-medium text-ink">{c.name}</p>
              </div>
              <div className="w-28 flex-shrink-0">
                <p className="text-xs text-slate">{c.role}</p>
              </div>
              <p className="text-xs text-iron">{c.usage}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Live preview */}
      <Section title="In Context">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-semibold text-pewter uppercase tracking-wider mb-2">Light Mode</p>
            <MiniPreview />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-pewter uppercase tracking-wider mb-2">Dark Mode</p>
            <MiniPreview dark />
          </div>
        </div>
      </Section>

      {/* Quick rules */}
      <Section title="Key Rules">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'One Cobalt primary action per section — if everything is Cobalt, nothing stands out',
            'Spectrum colors appear as small, purposeful moments — tags, dots, badges — not large fills',
            'Use dark text on Teal and Amber backgrounds — white text sits below the WCAG 2.x floor there unless covered by a ratified entry in the exception registry (see Primary Palette)',
            'The gradient is for brand moments only — hero sections, logo, marketing. Never on buttons or small UI',
            `Neutrals dominate: ${colorSystem.ratio.light.map(r => `${r.pct}% ${r.token}`).join(', ')}`,
            'Each semantic color carries one consistent meaning — never reuse a color for decoration',
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-2 bg-cloud rounded-lg px-3 py-2.5 border border-stone-100">
              <span className="text-[10px] font-bold text-pewter mt-px">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-xs text-iron">{rule}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Links to detail pages */}
      <Section title="Deep Dive">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Primary Palette', path: '/color/primary', desc: 'Every color with role, usage, and copy-able values' },
            { label: 'Semantic Colors', path: '/color/semantic', desc: 'Functional color mapping — wash, accent, on-wash text, plus dark-surface washes' },
            { label: 'Gradients', path: '/color/gradients', desc: 'Brand gradient variations and usage rules' },
          ].map(link => (
            <Link
              key={link.path}
              to={link.path}
              className="group flex flex-col p-4 rounded-xl border border-stone-200 hover:border-stone-300 hover:bg-cloud transition-all btn-focus"
            >
              <p className="text-sm font-medium text-ink group-hover:text-brand transition-colors">{link.label}</p>
              <p className="text-xs text-slate mt-0.5">{link.desc}</p>
            </Link>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
