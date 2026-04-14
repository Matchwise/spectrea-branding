import { useState } from 'react'
import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'

const brandGradient = {
  // Canonical CSS (OKLCH interpolation) — modern browsers only.
  css: 'linear-gradient(135deg in oklch, #4271DF, #00B6A0, #E19000)',
  // sRGB fallback for older browsers (Chrome <111, Safari <16.2, Firefox <117).
  fallbackCss: 'linear-gradient(135deg, #4271DF, #00B6A0, #E19000)',
  // Cross-browser recipe: sRGB base + @supports override. Paste into your stylesheet.
  recipe: `.brand-gradient {
  background: linear-gradient(135deg, #4271DF, #00B6A0, #E19000);
}
@supports (background: linear-gradient(in oklch, red, blue)) {
  .brand-gradient {
    background: linear-gradient(135deg in oklch, #4271DF, #00B6A0, #E19000);
  }
}`,
  stops: [
    { hex: '#4271DF', name: 'Cobalt' },
    { hex: '#00B6A0', name: 'Teal' },
    { hex: '#E19000', name: 'Amber' },
  ],
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      className="text-xs font-mono px-2.5 py-1.5 rounded border border-stone-200 hover:bg-stone-50 transition-colors text-left"
    >
      {copied ? 'Copied!' : label}
    </button>
  )
}

export default function Gradients() {
  return (
    <PageShell
      title="Gradients"
      subtitle="The Spectrea brand gradient — when and how to use it."
    >
      {/* Primary gradient */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="The brand gradient is the most distinctive visual element — the spectrum concept made visible. Reserve it for high-impact brand moments, not everyday UI. Overuse dilutes its power.">
            <span>Brand Gradient</span>
          </Tooltip>
        </h2>
        <div className="rounded-xl overflow-hidden border border-stone-200">
          <div className="h-32 brand-gradient" />
          <div className="p-4">
            <p className="text-sm text-stone-700 mb-3">Cobalt → Teal → Amber at 135°, interpolated in <strong>OKLCH</strong> on modern browsers (Chrome 111+ / Safari 16.2+ / Firefox 117+) with a clean sRGB fallback on older ones. The OKLCH path takes the "scenic route" around the hue wheel, keeping chroma high through the middle and avoiding the muddy olive zone.</p>
            <div className="flex gap-2 flex-wrap">
              <CopyButton value={brandGradient.css} label={`CSS: ${brandGradient.css}`} />
              <CopyButton value={brandGradient.recipe} label="Copy cross-browser recipe (sRGB + @supports OKLCH)" />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {brandGradient.stops.map(s => (
                <div key={s.hex} className="rounded-md border border-stone-100 overflow-hidden">
                  <div className="h-8" style={{ backgroundColor: s.hex }} />
                  <div className="px-1.5 py-1">
                    <p className="text-[10px] font-medium text-stone-700">{s.name}</p>
                    <p className="text-[9px] font-mono text-stone-400">{s.hex}</p>
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
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#008775' }}>Use for</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Logo mark background</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Hero section accent bars</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Marketing page headers</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Loading progress bars</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Slide deck title dividers</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Social media profile accents</li>
            </ul>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Never use for</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Buttons (use solid Cobalt)</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Text color (unreadable)</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Body backgrounds (overwhelming)</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Borders or outlines (too busy)</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Small icons or badges</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Repeated elements (it stops being special)</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Gradient variations */}
      <Section title="Gradient Variations">
        <p className="text-xs text-stone-500 mb-4">
          Two-colour gradients (<em>duets</em>) must use <strong>adjacent</strong> spectrum pairs only. Skip pairs (Cobalt→Amber direct, Teal→Rose, Cobalt→Rose) break the continuous-spectrum metaphor and are off-brand.
        </p>
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Primary (the brand gradient)</p>
            <div className="h-10 rounded-lg brand-gradient" />
            <p className="text-xs font-mono text-stone-400 mt-1">135° — Cobalt → Teal → Amber, OKLCH-interpolated with sRGB fallback. The default for everyday brand moments.</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Horizontal (90°)</p>
            <div className="h-10 rounded-lg brand-gradient-h" />
            <p className="text-xs font-mono text-stone-400 mt-1">For horizontal bars, dividers, and accent strips</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Cool Duet — Cobalt → Teal</p>
            <div className="h-10 rounded-lg" style={{ background: 'linear-gradient(135deg, #4271DF, #00B6A0)' }} />
            <p className="text-xs font-mono text-stone-400 mt-1">Intelligence + growth. The resting-state duet — use for data, technical contexts, and the static S mark.</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Balanced Duet — Teal → Amber (requires intermediate)</p>
            <div className="h-10 rounded-lg" style={{ background: 'linear-gradient(135deg, #00B6A0 0%, #6FB884 65%, #E19000 100%)' }} />
            <p className="text-xs font-mono text-stone-400 mt-1"><strong>Must include #6FB884 at 65%.</strong> Without the intermediate, teal and amber desaturate into muddy olive. For product/ecosystem moments.</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Warm Duet — Amber → Rose</p>
            <div className="h-10 rounded-lg" style={{ background: 'linear-gradient(135deg, #E19000, #F24260)' }} />
            <p className="text-xs font-mono text-stone-400 mt-1">Energy + urgency. For marketing, launches, and attention moments.</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Full spectrum with Rose</p>
            <div className="h-10 rounded-lg" style={{ background: 'linear-gradient(135deg, #4271DF, #00B6A0, #E19000, #F24260)' }} />
            <p className="text-xs font-mono text-stone-400 mt-1">All four spectrum colours. Use sparingly, for maximum brand expression.</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Lockup gradient (LogotypeGradient only)</p>
            <div className="h-10 rounded-lg" style={{ background: 'linear-gradient(135deg, #4271DF 0%, #00B6A0 33%, #6FB884 55%, #E19000 66%, #F24260 100%)' }} />
            <p className="text-xs font-mono text-stone-400 mt-1">5-stop with <strong>#6FB884 intermediate at 55%</strong> to prevent the muddy teal→amber transition. Baked into <code className="font-mono text-[11px]">LogotypeGradient</code> — not a general-purpose decorative gradient.</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Subtle (low opacity)</p>
            <div className="h-10 rounded-lg" style={{ background: 'linear-gradient(135deg, #4271DF15, #00B6A015, #E1900015)' }} />
            <p className="text-xs font-mono text-stone-400 mt-1">15% opacity — for background accents</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Accent bar (thin)</p>
            <div className="h-1.5 rounded-full" style={{ background: 'linear-gradient(90deg, #4271DF, #00B6A0, #E19000)' }} />
            <p className="text-xs font-mono text-stone-400 mt-1">For card borders, section dividers, progress indicators</p>
          </div>
        </div>
      </Section>

    </PageShell>
  )
}
