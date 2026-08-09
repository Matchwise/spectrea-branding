import { useState } from 'react'
import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { brandTokens, selectedPalette } from '../../data/brand'

// Rendered from canon (brandTokens.gradients, canonized 2026-08-09) — no
// gradient value on this page is declared locally.
const G = brandTokens.gradients

const paletteName = (hex: string) =>
  selectedPalette.colors.find(c => c.hex === hex)?.name ?? hex

const pct = (at: number) => `${Math.round(at * 100)}%`

/** CSS linear-gradient string from canonical stops (sRGB). */
const cssFor = (stops: readonly { hex: string; at: number }[], angle = `${G.angleDeg}deg`) =>
  `linear-gradient(${angle}, ${stops.map(s => `${s.hex} ${pct(s.at)}`).join(', ')})`

// Cross-browser recipe assembled from the canonical css/fallbackCss pair.
const recipe = `.brand-gradient {
  background: ${G.primary.fallbackCss};
}
@supports (background: linear-gradient(in oklch, red, blue)) {
  .brand-gradient {
    background: ${G.primary.css};
  }
}`

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      className="text-xs font-mono px-2.5 py-1.5 rounded border border-stone-200 hover:bg-cloud transition-colors text-left btn-focus"
    >
      {copied ? 'Copied!' : label}
    </button>
  )
}

export default function Gradients() {
  const duets = [G.duets.cool, G.duets.balanced, G.duets.warm]
  return (
    <PageShell
      title="Gradients"
      subtitle="The Spectrea brand gradient — when and how to use it."
    >
      {/* Primary gradient */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="The brand gradient is the most distinctive visual element — the spectrum concept made visible. Reserve it for high-impact brand moments, not everyday UI. Overuse dilutes its power.">
            <span>Brand Gradient</span>
          </Tooltip>
        </h2>
        <div className="rounded-xl overflow-hidden border border-stone-200">
          <div className="h-32 brand-gradient" />
          <div className="p-4">
            <p className="text-sm text-iron mb-3">
              {G.primary.stops.map(s => paletteName(s.hex)).join(' → ')} at {G.angleDeg}°, interpolated in <strong>OKLCH</strong>. {G.primary.interpolation}
            </p>
            <div className="flex gap-2 flex-wrap">
              <CopyButton value={G.primary.css} label={`CSS: ${G.primary.css}`} />
              <CopyButton value={recipe} label="Copy cross-browser recipe (sRGB + @supports OKLCH)" />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {G.primary.stops.map(s => (
                <div key={s.hex} className="rounded-md border border-stone-100 overflow-hidden">
                  <div className="h-8" style={{ backgroundColor: s.hex }} />
                  <div className="px-1.5 py-1">
                    <p className="text-xs font-medium text-iron">{paletteName(s.hex)}</p>
                    <p className="text-xs font-mono text-slate">{s.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Where to use */}
      <Section title="When to Use the Gradient">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#007D6E' }}>Use for</h3>
            <ul className="space-y-2 text-sm text-iron">
              {G.useFor.map(item => (
                <li key={item} className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Never use for</h3>
            <ul className="space-y-2 text-sm text-iron">
              {G.neverFor.map(item => (
                <li key={item} className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Gradient variations */}
      <Section title="Gradient Variations">
        <p className="text-xs text-slate mb-4">{G.adjacencyRule}</p>
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">Primary (the brand gradient)</p>
            <div className="h-10 rounded-lg brand-gradient" />
            <p className="text-xs font-mono text-slate mt-1">{G.angleDeg}° — {G.primary.stops.map(s => paletteName(s.hex)).join(' → ')}, OKLCH-interpolated with sRGB fallback. {G.primary.use}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">Horizontal (90°)</p>
            <div className="h-10 rounded-lg brand-gradient-h" />
            <p className="text-xs font-mono text-slate mt-1">For horizontal bars, dividers, and accent strips</p>
          </div>
          {duets.map(d => (
            <div key={d.name}>
              <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">
                {d.name} — {d.stops.filter(s => selectedPalette.colors.some(c => c.hex === s.hex)).map(s => paletteName(s.hex)).join(' → ')}
                {'bridgeRule' in d ? ' (requires intermediate)' : ''}
              </p>
              <div className="h-10 rounded-lg" style={{ background: cssFor(d.stops) }} />
              <p className="text-xs font-mono text-slate mt-1">
                {'bridgeRule' in d && <strong>{d.bridgeRule} </strong>}
                {d.use}
              </p>
            </div>
          ))}
          <div>
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">{G.fullSpectrumWithRose.name}</p>
            <div className="h-10 rounded-lg" style={{ background: cssFor(G.fullSpectrumWithRose.stops) }} />
            <p className="text-xs font-mono text-slate mt-1">{G.fullSpectrumWithRose.use}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">Lockup gradient (LogotypeGradient only)</p>
            <div className="h-10 rounded-lg" style={{ background: cssFor(G.duets.cool.stops) }} />
            <p className="text-xs font-mono text-slate mt-1">2-stop Cool Duet ({G.duets.cool.stops.map(s => `${paletteName(s.hex)} ${s.hex}`).join(' → ')}) on the mark stroke only; the wordmark stays monotone (Ink on light, White on dark). Baked into <code className="font-mono">LogotypeGradient</code> — not a general-purpose decorative gradient.</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">Subtle (low opacity)</p>
            <div className="h-10 rounded-lg" style={{ background: cssFor(G.primary.stops.map(s => ({ ...s, hex: `${s.hex}15` }))) }} />
            <p className="text-xs font-mono text-slate mt-1">15% opacity — for background accents</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">Accent bar (thin)</p>
            <div className="h-1.5 rounded-full" style={{ background: cssFor(G.primary.stops, '90deg') }} />
            <p className="text-xs font-mono text-slate mt-1">For card borders, section dividers, progress indicators</p>
          </div>
        </div>
      </Section>

    </PageShell>
  )
}
