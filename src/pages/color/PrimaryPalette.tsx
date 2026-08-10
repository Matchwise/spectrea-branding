import { useState } from 'react'
import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { accessibility, brandTokens, colorSystem, selectedPalette } from '../../data/brand'

function srgbToLinear(c: number) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

// Canon lookups + computed contrast (decision 30): dark-role names, ratio
// percentages, and accent-on-Ink figures render from colorSystem /
// selectedPalette, with WCAG ratios computed from the hexes.
const HEX = (name: string) => {
  const c = selectedPalette.colors.find(x => x.name === name)
  if (!c) throw new Error(`palette colour missing from canon: ${name}`)
  return c.hex
}
const DARK = selectedPalette.darkMode
const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map(i => srgbToLinear(parseInt(hex.slice(i, i + 2), 16) / 255))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const wcagContrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
const ratioStr = (r: number) => `${r >= 10 ? r.toFixed(1) : r.toFixed(2)}:1`
// Role chips render colorSystem roleLabels verbatim — no private page copies.
const ROLE = (name: string) => {
  const e = [...colorSystem.accents, ...colorSystem.neutrals.tokens].find(x => x.name === name)
  if (!e) throw new Error(`colorSystem role missing: ${name}`)
  return e.roleLabel
}
const DARK_ROLE = (darkName: string) => {
  const r = colorSystem.darkRoles.rows.find(x => x.dark === darkName)
  if (!r) throw new Error(`colorSystem dark role missing: ${darkName}`)
  return r.role
}
// Contrast-on-Canvas figure with its conformance label, computed from the
// hexes (AAA ≥ 7, AA ≥ 4.5).
const CANVAS_RATIO = (name: string) => {
  const r = wcagContrast(HEX(name), HEX('Canvas'))
  return `${ratioStr(r)}${r >= 7 ? ' (AAA)' : r >= 4.5 ? ' (AA)' : ''}`
}
// Tailwind stone-200 — the sanctioned light border family (a Tailwind
// constant, not a palette token).
const STONE_200 = '#E7E5E4'

function hexToHSL(hex: string) {
  let r = parseInt(hex.slice(1, 3), 16) / 255
  let g = parseInt(hex.slice(3, 5), 16) / 255
  let b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
    else if (max === g) h = ((b - r) / d + 2) / 6
    else h = ((r - g) / d + 4) / 6
  }
  return `${Math.round(h * 360)} / ${Math.round(s * 100)}% / ${Math.round(l * 100)}%`
}

function hexToOKLCH(hex: string) {
  const r = srgbToLinear(parseInt(hex.slice(1, 3), 16) / 255)
  const g = srgbToLinear(parseInt(hex.slice(3, 5), 16) / 255)
  const b = srgbToLinear(parseInt(hex.slice(5, 7), 16) / 255)
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s
  const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s
  const b2 = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s
  const C = Math.sqrt(a * a + b2 * b2)
  let h2 = Math.atan2(b2, a) * 180 / Math.PI
  if (h2 < 0) h2 += 360
  return `${L.toFixed(3)} / ${C.toFixed(3)} / ${Math.round(h2)}`
}

function ColorCard({ name, hex, role, usage, textColor = '#FDFDFB' }: {
  name: string; hex: string; role: string; usage: string; textColor?: string
}) {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = (value: string, label: string) => {
    navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(null), 1500)
  }

  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const hsl = hexToHSL(hex)
  const oklch = hexToOKLCH(hex)

  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden">
      <div className="h-24 px-4 py-3 flex flex-col justify-between" style={{ backgroundColor: hex }}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold" style={{ color: textColor }}>{name}</span>
          <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ color: textColor, backgroundColor: textColor + '15' }}>{role}</span>
        </div>
        <span className="text-xs font-mono" style={{ color: textColor, opacity: 0.7 }}>{hex}</span>
      </div>
      <div className="p-3 space-y-2">
        <p className="text-xs text-iron leading-relaxed">{usage}</p>
        <div className="flex gap-1.5 flex-wrap">
          {[
            { label: 'HEX', value: hex },
            { label: 'RGB', value: `${r}, ${g}, ${b}` },
            { label: 'HSL', value: hsl },
            { label: 'OKLCH', value: oklch },
          ].map(f => (
            <button
              key={f.label}
              onClick={() => copy(f.value, f.label)}
              className="text-xs font-mono px-2 py-1 rounded border border-stone-200 hover:bg-cloud transition-colors btn-focus"
            >
              {copied === f.label ? 'Copied!' : `${f.label}: ${f.value}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PrimaryPalette() {
  return (
    <PageShell
      title="Primary Palette"
      subtitle="The complete Spectrea color system — every color, its role, and when to use it."
    >
      {/* Hero Color */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="The hero color appears in primary buttons, links, nav highlights, and key CTAs. It's the color people associate with Spectrea. Use it sparingly and intentionally — it should always signal 'this is the primary action.'">
            <span>Hero Color</span>
          </Tooltip>
        </h2>
        <ColorCard
          name="Cobalt" hex="#4271DF" role={ROLE('Cobalt')}
          usage="Primary buttons, links, focused inputs, hover accents. Reactive and temporary — appears when the user interacts, settles when done. Persistent selections use Ink instead."
        />
        <div className="mt-3 bg-brand/5 rounded-lg px-4 py-3 border border-brand/10">
          <p className="text-xs text-brand">
            <strong>Rule:</strong> Only one Cobalt primary action per section. If everything is Cobalt, nothing stands out. When in doubt, use a ghost/outline button instead.
          </p>
        </div>
      </Section>

      {/* Spectrum Accents */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="The spectrum accents are Spectrea's building blocks — each represents a different facet of the platform. They appear as tags, status indicators, chart colors, and secondary actions. Together they form the spectrum; individually they carry specific meaning.">
            <span>Spectrum Accents</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ColorCard
            name="Teal" hex="#00B6A0" role={ROLE('Teal')}
            usage="Growth, success, positive change. Use for: success states, positive trends (+12%), completion indicators, healthy active states, 'connected' status."
            textColor="#18181C"
          />
          <ColorCard
            name="Amber" hex="#E19000" role={ROLE('Amber')}
            usage="Attention, warmth, highlights. Use for: warnings, pending states, starred/bookmarked items, confidence scores, insight badges."
            textColor="#18181C"
          />
          <ColorCard
            name="Rose" hex="#F24260" role={ROLE('Rose')}
            usage="Urgency, energy, importance. Use for: errors, destructive actions (delete, remove), critical alerts, high-priority indicators, notification badges."
          />
        </div>
        <div className="mt-3 bg-cloud rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-iron">
            <strong>Rule:</strong> Spectrum colors should appear as small, purposeful moments — tags, dots, badges, borders — not as large fills. The canvas stays clean; color is reserved for meaning.
          </p>
        </div>
      </Section>

      {/* Canvas */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="The canvas is a warm-tinted neutral — it bridges the gap between achromatic grays and the spectrum accents. Canvas is the default background; Cloud is for elevated surfaces (cards, dropdowns, modals). The warmth is subtle (<2% luminance shift) but makes the spectrum feel at home rather than painted on.">
            <span>Canvas</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorCard
            name="Canvas" hex="#FDFDFB" role={ROLE('Canvas')}
            usage="Page background. Warm-tinted white. The default canvas — inhabited, not sterile."
            textColor="#18181C"
          />
          <ColorCard
            name="Cloud" hex="#F4F4F1" role={ROLE('Cloud')}
            usage="Elevated surfaces: cards, sidebars, dropdowns, table headers, modal backgrounds. Creates subtle depth without color."
            textColor="#18181C"
          />
        </div>
        <div className="mt-3 bg-cloud rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-iron">
            <strong>Why warm neutrals?</strong> Cold Tailwind grays sit in tension with the warm spectrum accents — the canvas feels like a different system. A whisper of warmth (Canvas <code className="font-mono">#FDFDFB</code> over pure <code className="font-mono">{'#'}FFFFFF</code>) closes the gap so the whole palette reads as one family.
          </p>
        </div>
      </Section>

      {/* Text & UI */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Warm Blend is a seven-token OKLCH-even ladder. Text hierarchy uses four tiers: Ink for headings & primary body, Iron for emphasized body, Slate for secondary body, Pewter as a whisper (below AA — supplementary only). Graphite is a dark-UI surface token, not text.">
            <span>Text & UI</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-iron mb-4 leading-relaxed">
          Four text tiers on Canvas, from loud to whisper. Slate and Iron fill the perceptual gap between Pewter and Graphite — the old three-token palette jumped straight from {ratioStr(wcagContrast(HEX('Pewter'), HEX('Canvas')))} whisper to {ratioStr(wcagContrast(HEX('Graphite'), HEX('Canvas')))} dark-surface with nothing in between.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorCard
            name="Ink" hex="#18181C" role={ROLE('Ink')}
            usage={`Headings, body copy, primary labels. ${CANVAS_RATIO('Ink')} on Canvas. The default text color.`}
            textColor="#F4F4F1"
          />
          <ColorCard
            name="Iron" hex="#46464B" role={ROLE('Iron')}
            usage={`Table headers, field labels, key body sentences, Dos/Don'ts copy. ${CANVAS_RATIO('Iron')} on Canvas — the load-bearing body token across the app.`}
            textColor="#F4F4F1"
          />
          <ColorCard
            name="Slate" hex="#6D6D72" role={ROLE('Slate')}
            usage={`Descriptions, helper text, card sub-labels, captions, small-print metadata. ${CANVAS_RATIO('Slate')} on Canvas.`}
            textColor="#F4F4F1"
          />
          <ColorCard
            name="Pewter" hex="#97979E" role={ROLE('Pewter')}
            usage={`Overlines, timestamps, meta chips, placeholder text, decorative labels. ${CANVAS_RATIO('Pewter')} — below WCAG AA large-text. Use only where the adjacent context already makes the content obvious; any text that must be read on its own steps up to Slate or Iron.`}
            textColor="#18181C"
          />
        </div>
        <div className="mt-4">
          <ColorCard
            name="Graphite" hex="#212226" role={ROLE('Graphite')}
            usage="Structural Ink-family surface — sidebar, tooltip, footer chrome on light. Doubles as the elevated surface role on dark mode (equivalent to Cloud on light). Not a text token."
            textColor="#F4F4F1"
          />
        </div>
      </Section>

      {/* Dark Mode */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Dark mode is a parallel surface system, not a separate palette. Roles invert (Ink becomes canvas, Graphite becomes elevated, Cloud becomes text) and two new tokens — Mist and Fog — complete the hierarchy.">
            <span>Dark Mode</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-iron mb-4 leading-relaxed">
          {colorSystem.lightDefault} {colorSystem.darkRoles.intro} {colorSystem.accentsOnDark}
        </p>

        {/* Role inversion table — colorSystem.darkRoles + darkMode hexes */}
        <div className="border border-stone-200 rounded-xl overflow-hidden mb-5">
          <div className="grid grid-cols-12 px-4 py-2.5 bg-cloud border-b border-stone-200 text-xs font-semibold uppercase tracking-wider text-slate">
            <span className="col-span-3">Role</span>
            <span className="col-span-4">Light</span>
            <span className="col-span-5">Dark</span>
          </div>
          {colorSystem.darkRoles.rows.map(r => ({
            role: r.role,
            light: { name: r.light, hex: r.light === 'stone-200' ? STONE_200 : HEX(r.light) },
            dark: { name: 'isNew' in r && r.isNew ? `${r.dark} (new)` : r.dark, hex: DARK[r.darkModeKey] },
          })).map((row, i, arr) => (
            <div key={row.role} className="grid grid-cols-12 items-center px-4 py-2.5" style={{ borderBottom: i < arr.length - 1 ? '1px solid #F5F5F4' : 'none' }}>
              <span className="col-span-3 text-xs font-medium text-iron">{row.role}</span>
              <div className="col-span-4 flex items-center gap-2">
                <span className="inline-block w-5 h-5 rounded border border-stone-200" style={{ backgroundColor: row.light.hex }} />
                <span className="text-xs text-iron">{row.light.name}</span>
                <span className="text-xs font-mono text-pewter">{row.light.hex}</span>
              </div>
              <div className="col-span-5 flex items-center gap-2">
                <span className="inline-block w-5 h-5 rounded border border-stone-200" style={{ backgroundColor: row.dark.hex }} />
                <span className="text-xs text-iron">{row.dark.name}</span>
                <span className="text-xs font-mono text-pewter">{row.dark.hex}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dark surface swatches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorCard
            name="Ink (dark canvas)" hex="#18181C" role={DARK_ROLE('Ink')}
            usage="Page background in dark mode. Inverts the Canvas role — the 60% surface."
            textColor="#F4F4F1"
          />
          <ColorCard
            name="Graphite (dark elevated)" hex="#212226" role={DARK_ROLE('Graphite')}
            usage="Cards, sidebars, elevated panels on dark. Inverts the Cloud role."
            textColor="#F4F4F1"
          />
          <ColorCard
            name="Mist (dark muted)" hex={DARK.muted} role={DARK_ROLE('Mist')}
            usage={`Muted / secondary text on dark. Brighter than Pewter to keep hierarchy above body text. ${ratioStr(wcagContrast(DARK.muted, HEX('Ink')))} on Ink.`}
            textColor="#18181C"
          />
          <ColorCard
            name="Fog (dark border)" hex={DARK.border} role={DARK_ROLE('Fog')}
            usage="Borders and dividers on dark. Sits between Ink and Graphite — edges cards without drawing a visible line."
            textColor="#F4F4F1"
          />
        </div>

        {/* Accents on dark */}
        <div className="mt-5 border border-stone-200 rounded-xl overflow-hidden">
          <div className="px-4 py-2.5 bg-cloud border-b border-stone-200 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate">Accents on dark</p>
            <span className="text-xs text-slate">Ratios computed on Ink</span>
          </div>
          <div className="p-4 space-y-2" style={{ backgroundColor: HEX('Ink') }}>
            {colorSystem.accents.map(a => {
              const hex = HEX(a.name)
              const r = wcagContrast(hex, HEX('Ink'))
              return { name: a.name, hex, contrast: ratioStr(r), level: r >= 4.5 ? 'AA' : 'UI only' }
            }).map(a => (
              <div key={a.name} className="flex items-center gap-3">
                <span className="inline-block w-5 h-5 rounded" style={{ backgroundColor: a.hex }} />
                <span className="text-sm font-semibold" style={{ color: a.hex }}>{a.name} — {a.contrast} {a.level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dark bridge washes */}
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate mb-3">Dark bridge washes</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {brandTokens.washes.dark.map(w => ({ name: w.name, hex: w.hex, accent: HEX(w.accent), use: w.use })).map(w => (
              <div key={w.name} className="border border-stone-200 rounded-xl overflow-hidden">
                <div className="h-16 px-3 py-2 flex items-end" style={{ backgroundColor: w.hex }}>
                  <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: w.accent }} />
                  <span className="text-xs font-mono ml-2" style={{ color: '#B0B0B6' }}>{w.hex}</span>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-ink">{w.name}</p>
                  <p className="text-xs text-slate leading-relaxed mt-0.5">{w.use}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 bg-cloud rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-iron leading-relaxed">
            <strong>When to flip dark.</strong> Product UI follows the user's OS preference. Marketing defaults to light — use Ink for single-panel emphasis, not whole pages. Presentations: Canvas default, Ink for dividers and CTA (≤20% of the deck). PDF and print: always light. Accents never change hex between modes — the brand reads as itself either way.
          </p>
        </div>
      </Section>

      {/* Usage ratios */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Color ratios ensure the canvas stays clean and spectrum colors remain meaningful. If everything is colored, nothing stands out.">
            <span>Usage Ratios</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {/* Bar geometry derives from colorSystem.ratio.light percentages;
              the spectrum segment splits evenly across the accents (mirrors
              ratio-bar.svg). Segment fills are presentational. */}
          <div className="h-8 flex">
            <div style={{ flex: colorSystem.ratio.light[0].pct, backgroundColor: HEX('Canvas') }} />
            <div style={{ flex: colorSystem.ratio.light[1].pct, backgroundColor: HEX('Cloud') }} />
            <div style={{ flex: colorSystem.ratio.light[2].pct, backgroundColor: HEX('Ink') }} />
            {colorSystem.accents.map(a => (
              <div key={a.name} style={{ flex: colorSystem.ratio.light[3].pct / colorSystem.accents.length, backgroundColor: HEX(a.name) }} />
            ))}
          </div>
          <div className="p-4 grid grid-cols-4 gap-3 text-center">
            {colorSystem.ratio.light.map(r => (
              <div key={r.token}>
                <p className="text-lg font-semibold text-ink">{r.pct}%</p>
                <p className="text-xs text-slate">{r.token}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate mt-2">The canvas dominates. Color is reserved for meaning. This keeps the interface clean and makes every colored element intentional.</p>
      </Section>

      {/* Contrast policy — floors, measurement doctrine, exception registry */}
      <Section title="Contrast Policy & Measurement">
        <p className="text-sm text-slate mb-4 leading-relaxed">
          The conformance floor is <strong>{accessibility.floor}</strong>. Token contrast on Canvas (computed):{' '}
          {colorSystem.textHierarchy.map(t => {
            const r = wcagContrast(HEX(t.token), HEX('Canvas'))
            return `${t.token} ${ratioStr(r)}${r >= 7 ? ' (AAA)' : r >= 4.5 ? ' (AA)' : ' (supplementary only)'}`
          }).join(' · ')}. {colorSystem.accentsOnDark} Computed on Ink:{' '}
          {colorSystem.accents.map(a => `${a.name} ${ratioStr(wcagContrast(HEX(a.name), HEX('Ink')))}`).join(', ')}.
        </p>
        <div className="bg-cloud rounded-xl p-5 border border-stone-200 mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-pewter mb-2">Measurement doctrine</p>
          <p className="text-sm text-iron leading-relaxed">{accessibility.measurement}</p>
        </div>
        <div className="border border-stone-200 rounded-xl p-5 mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-pewter mb-1">Accent text tones (light surfaces)</p>
          <p className="text-xs text-slate mb-3 leading-relaxed">
            Accent-coloured text on light surfaces uses these tones, not the raw accents — raw accents fail the
            4.5:1 text floor on light grounds. Raw accents remain correct for fills, dots, borders, and UI at 3:1.
            On dark surfaces, use the lifts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {brandTokens.accentText.map(t => (
              <div key={t.name} className="flex items-start gap-3">
                <span className="inline-block w-5 h-5 rounded flex-shrink-0 mt-0.5" style={{ backgroundColor: t.hex }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: t.hex }}>{t.name} — {t.hex}</p>
                  <p className="text-xs text-slate leading-relaxed">{t.use}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="bg-cloud px-5 py-2.5 border-b border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate">Exception registry</p>
            <p className="text-xs text-iron mt-1 leading-relaxed">{accessibility.exceptionRegistry.rule}</p>
          </div>
          {accessibility.exceptionRegistry.entries.map(e => (
            <div key={e.name} className="px-5 py-4 border-b last:border-b-0 border-stone-100">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-ink font-mono">{e.name}</span>
                <span className="text-xs text-pewter">ratified {e.ratified}</span>
              </div>
              <p className="text-sm text-iron mt-2 leading-relaxed">{e.exception}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="bg-cloud rounded-lg p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-pewter mb-1">WCAG 2.x</p>
                  <p className="text-xs text-iron leading-relaxed">{e.measured.wcag2x}</p>
                </div>
                <div className="bg-cloud rounded-lg p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-pewter mb-1">APCA-W3</p>
                  <p className="text-xs text-iron leading-relaxed">{e.measured.apca}</p>
                </div>
              </div>
              <p className="text-xs text-slate mt-3 leading-relaxed"><strong>Rationale:</strong> {e.rationale}</p>
              <p className="text-xs text-slate mt-1.5 leading-relaxed"><strong>Bounds:</strong> {e.bounds}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Do / Don't */}
      <Section title="Color Dos & Don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#007D6E' }}>Do</h3>
            <ul className="space-y-2 text-sm text-iron">
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use Cobalt for the single primary action per section</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use spectrum colors as small, meaningful moments (tags, dots, badges)</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use dark text on Teal and Amber backgrounds</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Let the canvas breathe — white space is a feature</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use the gradient for brand moments (hero sections, logo, marketing)</li>
            </ul>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Don't</h3>
            <ul className="space-y-2 text-sm text-iron">
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Fill large areas with accent colors — they lose meaning</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use multiple Cobalt buttons in the same section</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Mix Teal for success AND as a decorative color — pick one meaning</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use white text on Teal or Amber — below the WCAG 2.x text floor unless covered by a ratified entry in the exception registry above</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use the gradient on small UI elements — reserve for brand moments</li>
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
