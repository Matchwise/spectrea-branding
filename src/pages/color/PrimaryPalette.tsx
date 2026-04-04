import { useState } from 'react'
import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { selectedPalette } from '../../data/brand'

function ColorCard({ name, hex, role, usage, textColor = '#FFFFFF' }: {
  name: string; hex: string; role: string; usage: string; textColor?: string
}) {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = (value: string, label: string) => {
    navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(null), 1500)
  }

  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden">
      <div className="h-24 px-4 py-3 flex flex-col justify-between" style={{ backgroundColor: hex }}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold" style={{ color: textColor }}>{name}</span>
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
            { label: 'CSS', value: `rgb(${r} ${g} ${b})` },
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
  const p = selectedPalette

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
          name="Cobalt" hex="#3451E0" role="hero"
          usage="Primary buttons, links, active nav items, focused inputs, key CTAs. The color that IS Spectrea. Use for the single most important action on any screen."
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
            name="Teal" hex="#12B5A3" role="spectrum"
            usage="Growth, success, positive change. Use for: success states, positive trends (+12%), completion indicators, knowledge graph nodes, 'connected' status."
            textColor="#111827"
          />
          <ColorCard
            name="Amber" hex="#E58D08" role="spectrum"
            usage="Attention, warmth, highlights. Use for: warnings, pending states, starred/bookmarked items, confidence scores, insight badges."
            textColor="#111827"
          />
          <ColorCard
            name="Rose" hex="#F43F5E" role="spectrum"
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
          <Tooltip content="The canvas is deliberately neutral — a blank page ready to be filled. White is the default background; Snow is for elevated surfaces (cards, dropdowns, modals). The canvas should feel open and spacious.">
            <span>Canvas</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorCard
            name="White" hex="#FFFFFF" role="background"
            usage="Page background. The default canvas. Clean, open, ready to be filled."
            textColor="#111827"
          />
          <ColorCard
            name="Snow" hex="#F9FAFB" role="surface"
            usage="Elevated surfaces: cards, sidebars, dropdowns, table headers, modal backgrounds. Creates subtle depth without color."
            textColor="#111827"
          />
        </div>
      </Section>

      {/* Text & UI */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Text colors create hierarchy. Ink for primary content, Gray for secondary/supporting. Graphite is used for dark UI elements (sidebar, dark buttons) and as the primary color in the brand system.">
            <span>Text & UI</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ColorCard
            name="Ink" hex="#111827" role="text"
            usage="Primary text, headings, body copy. High contrast on white (17.7:1). The default text color."
            textColor="#F9FAFB"
          />
          <ColorCard
            name="Graphite" hex="#1F2937" role="primary"
            usage="Dark UI elements: sidebar backgrounds, dark buttons, tooltip backgrounds, footer. Also the brand's primary neutral."
            textColor="#F9FAFB"
          />
          <ColorCard
            name="Gray" hex="#9CA3AF" role="muted"
            usage="Secondary text, placeholders, disabled states, timestamps, captions, helper text. Provides hierarchy without distraction."
            textColor="#111827"
          />
        </div>
      </Section>

      {/* Dark Mode */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Dark mode inverts the canvas while keeping accent colors consistent. The same spectrum accents work on dark backgrounds with even better contrast.">
            <span>Dark Mode</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorCard
            name="Dark Background" hex={p.darkMode.bg} role="dark-bg"
            usage="Page background in dark mode. Deep enough for comfortable night use."
            textColor="#F9FAFB"
          />
          <ColorCard
            name="Dark Surface" hex={p.darkMode.surface} role="dark-surface"
            usage="Cards, sidebars, elevated elements in dark mode. Subtle separation from the background."
            textColor="#F9FAFB"
          />
        </div>
        <div className="mt-3 bg-stone-50 rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-stone-600">
            <strong>Dark mode rule:</strong> All four spectrum accents (Cobalt, Teal, Amber, Rose) carry over unchanged. They have better contrast on dark backgrounds. Text becomes #F9FAFB (Snow). Muted text becomes #6B7280.
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
            <div className="flex-[60]" style={{ backgroundColor: '#FFFFFF' }} />
            <div className="flex-[20]" style={{ backgroundColor: '#F9FAFB' }} />
            <div className="flex-[8]" style={{ backgroundColor: '#9CA3AF' }} />
            <div className="flex-[5]" style={{ backgroundColor: '#3451E0' }} />
            <div className="flex-[3]" style={{ backgroundColor: '#12B5A3' }} />
            <div className="flex-[2]" style={{ backgroundColor: '#E58D08' }} />
            <div className="flex-[2]" style={{ backgroundColor: '#F43F5E' }} />
          </div>
          <div className="p-4 grid grid-cols-4 gap-3 text-center">
            <div>
              <p className="text-lg font-semibold text-stone-900">60%</p>
              <p className="text-xs text-stone-500">Canvas (White)</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-stone-900">20%</p>
              <p className="text-xs text-stone-500">Surface (Snow)</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-stone-900">10%</p>
              <p className="text-xs text-stone-500">Text & UI (Ink, Gray)</p>
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
          <div className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-emerald-800 mb-3">Do</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Use Cobalt for the single primary action per section</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Use spectrum colors as small, meaningful moments (tags, dots, badges)</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Use dark text on Teal and Amber backgrounds</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Let the canvas breathe — white space is a feature</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Use the gradient for brand moments (hero sections, logo, marketing)</li>
            </ul>
          </div>
          <div className="border border-red-200 bg-red-50/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-red-700 mb-3">Don't</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Fill large areas with accent colors — they lose meaning</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Use multiple Cobalt buttons in the same section</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Mix Teal for success AND as a decorative color — pick one meaning</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Use white text on Teal or Amber (insufficient contrast)</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Use the gradient on small UI elements — reserve for brand moments</li>
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
