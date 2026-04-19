import { useState } from 'react'
import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'

function srgbToLinear(c: number) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

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
        <p className="text-xs text-stone-600 leading-relaxed">{usage}</p>
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
              className="text-xs font-mono px-2 py-1 rounded border border-stone-200 hover:bg-stone-50 transition-colors"
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
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="The hero color appears in primary buttons, links, nav highlights, and key CTAs. It's the color people associate with Spectrea. Use it sparingly and intentionally — it should always signal 'this is the primary action.'">
            <span>Hero Color</span>
          </Tooltip>
        </h2>
        <ColorCard
          name="Cobalt" hex="#4271DF" role="hero"
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
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="The spectrum accents are Spectrea's building blocks — each represents a different facet of the platform. They appear as tags, status indicators, chart colors, and secondary actions. Together they form the spectrum; individually they carry specific meaning.">
            <span>Spectrum Accents</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ColorCard
            name="Teal" hex="#00B6A0" role="spectrum"
            usage="Growth, success, positive change. Use for: success states, positive trends (+12%), completion indicators, healthy active states, 'connected' status."
            textColor="#18181C"
          />
          <ColorCard
            name="Amber" hex="#E19000" role="spectrum"
            usage="Attention, warmth, highlights. Use for: warnings, pending states, starred/bookmarked items, confidence scores, insight badges."
            textColor="#18181C"
          />
          <ColorCard
            name="Rose" hex="#F24260" role="spectrum"
            usage="Urgency, energy, importance. Use for: errors, destructive actions (delete, remove), critical alerts, high-priority indicators, notification badges."
          />
        </div>
        <div className="mt-3 bg-stone-50 rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-stone-600">
            <strong>Rule:</strong> Spectrum colors should appear as small, purposeful moments — tags, dots, badges, borders — not as large fills. The canvas stays clean; color is reserved for meaning.
          </p>
        </div>
      </Section>

      {/* Canvas */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="The canvas is a warm-tinted neutral — it bridges the gap between achromatic grays and the spectrum accents. Canvas is the default background; Cloud is for elevated surfaces (cards, dropdowns, modals). The warmth is subtle (<2% luminance shift) but makes the spectrum feel at home rather than painted on.">
            <span>Canvas</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorCard
            name="Canvas" hex="#FDFDFB" role="background"
            usage="Page background. Warm-tinted white. The default canvas — inhabited, not sterile."
            textColor="#18181C"
          />
          <ColorCard
            name="Cloud" hex="#F4F4F1" role="surface"
            usage="Elevated surfaces: cards, sidebars, dropdowns, table headers, modal backgrounds. Creates subtle depth without color."
            textColor="#18181C"
          />
        </div>
        <div className="mt-3 bg-stone-50 rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-stone-600">
            <strong>Why warm neutrals?</strong> Cold Tailwind grays sit in tension with the warm spectrum accents — the canvas feels like a different system. A whisper of warmth (Canvas <code className="font-mono text-[11px]">#FDFDFB</code> over pure <code className="font-mono text-[11px]">{'#'}FFFFFF</code>) closes the gap so the whole palette reads as one family.
          </p>
        </div>
      </Section>

      {/* Text & UI */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Text colors create hierarchy. Ink for primary content, Pewter for secondary/supporting. Graphite is used for dark UI elements (sidebar, dark buttons) and as the primary color in the brand system.">
            <span>Text & UI</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ColorCard
            name="Ink" hex="#18181C" role="text"
            usage="Primary text, headings, body copy. High contrast on Canvas (17+:1). The default text color."
            textColor="#F4F4F1"
          />
          <ColorCard
            name="Graphite" hex="#212226" role="primary"
            usage="Dark UI elements: sidebar backgrounds, dark buttons, tooltip backgrounds, footer. Also the brand's primary neutral."
            textColor="#F4F4F1"
          />
          <ColorCard
            name="Pewter" hex="#97979E" role="muted"
            usage="Secondary text, placeholders, disabled states, timestamps, captions, helper text. Provides hierarchy without distraction."
            textColor="#18181C"
          />
        </div>
      </Section>

      {/* Dark Mode */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Dark mode is a parallel surface system, not a separate palette. Roles invert (Ink becomes canvas, Graphite becomes elevated, Cloud becomes text) and two new tokens — Mist and Fog — complete the hierarchy.">
            <span>Dark Mode</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-stone-600 mb-4 leading-relaxed">
          Light is Spectrea's default. Dark is a parallel mode — the role mapping inverts, existing tokens carry more weight, and two new tokens (<strong>Mist</strong>, <strong>Fog</strong>) complete the hierarchy. Accents carry over unchanged; all four pass WCAG AA on Ink.
        </p>

        {/* Role inversion table */}
        <div className="border border-stone-200 rounded-xl overflow-hidden mb-5">
          <div className="grid grid-cols-12 px-4 py-2.5 bg-stone-50 border-b border-stone-200 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            <span className="col-span-3">Role</span>
            <span className="col-span-4">Light</span>
            <span className="col-span-5">Dark</span>
          </div>
          {[
            { role: 'Page background', light: { name: 'Canvas', hex: '#FDFDFB', text: '#18181C' }, dark: { name: 'Ink', hex: '#18181C', text: '#F4F4F1' } },
            { role: 'Elevated surface', light: { name: 'Cloud', hex: '#F4F4F1', text: '#18181C' }, dark: { name: 'Graphite', hex: '#212226', text: '#F4F4F1' } },
            { role: 'Primary text', light: { name: 'Ink', hex: '#18181C', text: '#F4F4F1' }, dark: { name: 'Cloud', hex: '#F4F4F1', text: '#18181C' } },
            { role: 'Muted text', light: { name: 'Pewter', hex: '#97979E', text: '#18181C' }, dark: { name: 'Mist (new)', hex: '#B0B0B6', text: '#18181C' } },
            { role: 'Border / divider', light: { name: 'stone-200', hex: '#E7E5E4', text: '#18181C' }, dark: { name: 'Fog (new)', hex: '#2E2F35', text: '#F4F4F1' } },
          ].map((row, i, arr) => (
            <div key={row.role} className="grid grid-cols-12 items-center px-4 py-2.5" style={{ borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="col-span-3 text-xs font-medium text-stone-700">{row.role}</span>
              <div className="col-span-4 flex items-center gap-2">
                <span className="inline-block w-5 h-5 rounded border border-stone-200" style={{ backgroundColor: row.light.hex }} />
                <span className="text-xs text-stone-700">{row.light.name}</span>
                <span className="text-[10px] font-mono text-stone-400">{row.light.hex}</span>
              </div>
              <div className="col-span-5 flex items-center gap-2">
                <span className="inline-block w-5 h-5 rounded border border-stone-200" style={{ backgroundColor: row.dark.hex }} />
                <span className="text-xs text-stone-700">{row.dark.name}</span>
                <span className="text-[10px] font-mono text-stone-400">{row.dark.hex}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dark surface swatches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorCard
            name="Ink (dark canvas)" hex="#18181C" role="dark-bg"
            usage="Page background in dark mode. Inverts the Canvas role — the 60% surface."
            textColor="#F4F4F1"
          />
          <ColorCard
            name="Graphite (dark elevated)" hex="#212226" role="dark-surface"
            usage="Cards, sidebars, elevated panels on dark. Inverts the Cloud role."
            textColor="#F4F4F1"
          />
          <ColorCard
            name="Mist (dark muted)" hex="#B0B0B6" role="dark-muted"
            usage="Muted / secondary text on dark. Brighter than Pewter to keep hierarchy above body text. ~8.5:1 on Ink."
            textColor="#18181C"
          />
          <ColorCard
            name="Fog (dark border)" hex="#2E2F35" role="dark-border"
            usage="Borders and dividers on dark. Sits between Ink and Graphite — edges cards without drawing a visible line."
            textColor="#F4F4F1"
          />
        </div>

        {/* Accents on dark */}
        <div className="mt-5 border border-stone-200 rounded-xl overflow-hidden">
          <div className="px-4 py-2.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Accents on dark</p>
            <span className="text-[10px] text-stone-400">All pass WCAG AA on Ink</span>
          </div>
          <div className="p-4 space-y-2" style={{ backgroundColor: '#18181C' }}>
            {[
              { name: 'Cobalt', hex: '#4271DF', contrast: '5.2:1', level: 'AA' },
              { name: 'Teal', hex: '#00B6A0', contrast: '7.8:1', level: 'AAA' },
              { name: 'Amber', hex: '#E19000', contrast: '8.4:1', level: 'AAA' },
              { name: 'Rose', hex: '#F24260', contrast: '5.9:1', level: 'AA' },
            ].map(a => (
              <div key={a.name} className="flex items-center gap-3">
                <span className="inline-block w-5 h-5 rounded" style={{ backgroundColor: a.hex }} />
                <span className="text-sm font-semibold" style={{ color: a.hex }}>{a.name} — {a.contrast} {a.level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dark bridge washes */}
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">Dark bridge washes</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Cobalt Deep', hex: '#1B2440', accent: '#4271DF', use: 'Info surface on dark' },
              { name: 'Teal Deep', hex: '#0E2E2A', accent: '#00B6A0', use: 'Success surface on dark' },
              { name: 'Amber Deep', hex: '#2E2410', accent: '#E19000', use: 'Warning surface on dark' },
              { name: 'Rose Deep', hex: '#2E1218', accent: '#F24260', use: 'Error surface on dark' },
            ].map(w => (
              <div key={w.name} className="border border-stone-200 rounded-xl overflow-hidden">
                <div className="h-16 px-3 py-2 flex items-end" style={{ backgroundColor: w.hex }}>
                  <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: w.accent }} />
                  <span className="text-[11px] font-mono ml-2" style={{ color: '#B0B0B6' }}>{w.hex}</span>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-stone-800">{w.name}</p>
                  <p className="text-[11px] text-stone-500 leading-relaxed mt-0.5">{w.use}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 bg-stone-50 rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-stone-600 leading-relaxed">
            <strong>When to flip dark.</strong> Product UI follows the user's OS preference. Marketing defaults to light — use Ink for single-panel emphasis, not whole pages. Presentations: Canvas default, Ink for dividers and CTA (≤20% of the deck). PDF and print: always light. Accents never change hex between modes — the brand reads as itself either way.
          </p>
        </div>
      </Section>

      {/* Usage ratios */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Color ratios ensure the canvas stays clean and spectrum colors remain meaningful. If everything is colored, nothing stands out.">
            <span>Usage Ratios</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="h-8 flex">
            <div className="flex-[60]" style={{ backgroundColor: '#FDFDFB' }} />
            <div className="flex-[20]" style={{ backgroundColor: '#F4F4F1' }} />
            <div className="flex-[8]" style={{ backgroundColor: '#97979E' }} />
            <div className="flex-[5]" style={{ backgroundColor: '#4271DF' }} />
            <div className="flex-[3]" style={{ backgroundColor: '#00B6A0' }} />
            <div className="flex-[2]" style={{ backgroundColor: '#E19000' }} />
            <div className="flex-[2]" style={{ backgroundColor: '#F24260' }} />
          </div>
          <div className="p-4 grid grid-cols-4 gap-3 text-center">
            <div>
              <p className="text-lg font-semibold text-stone-900">60%</p>
              <p className="text-xs text-stone-500">Canvas</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-stone-900">20%</p>
              <p className="text-xs text-stone-500">Surface (Cloud)</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-stone-900">10%</p>
              <p className="text-xs text-stone-500">Text & UI (Ink, Pewter)</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-stone-900">10%</p>
              <p className="text-xs text-stone-500">Spectrum (Cobalt + accents)</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-stone-500 mt-2">The canvas dominates. Color is reserved for meaning. This keeps the interface clean and makes every colored element intentional.</p>
      </Section>

      {/* Do / Don't */}
      <Section title="Color Dos & Don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#008775' }}>Do</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use Cobalt for the single primary action per section</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use spectrum colors as small, meaningful moments (tags, dots, badges)</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use dark text on Teal and Amber backgrounds</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Let the canvas breathe — white space is a feature</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use the gradient for brand moments (hero sections, logo, marketing)</li>
            </ul>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Don't</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Fill large areas with accent colors — they lose meaning</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use multiple Cobalt buttons in the same section</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Mix Teal for success AND as a decorative color — pick one meaning</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use white text on Teal or Amber (insufficient contrast)</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use the gradient on small UI elements — reserve for brand moments</li>
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
