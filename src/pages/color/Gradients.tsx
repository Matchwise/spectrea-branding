import { useState } from 'react'
import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'

const brandGradient = {
  css: 'linear-gradient(135deg, #3451E0, #12B5A3, #E58D08)',
  from: '#3451E0',
  via: '#12B5A3',
  to: '#E58D08',
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
          <div className="h-32" style={{ background: brandGradient.css }} />
          <div className="p-4">
            <p className="text-sm text-stone-700 mb-3">Cobalt → Teal → Amber at 135°. The spectrum in motion — from intelligence through growth to insight.</p>
            <div className="flex gap-2 flex-wrap">
              <CopyButton value="linear-gradient(135deg, #3451E0, #12B5A3, #E58D08)" label="CSS: linear-gradient(135deg, #3451E0, #12B5A3, #E58D08)" />
              <CopyButton value="background: linear-gradient(135deg, #3451E0, #12B5A3, #E58D08);" label="Copy full CSS property" />
            </div>
          </div>
        </div>
      </Section>

      {/* Where to use */}
      <Section title="When to Use the Gradient">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-emerald-800 mb-3">Use for</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Logo mark background</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Hero section accent bars</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Marketing page headers</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Loading progress bars</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Slide deck title dividers</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Social media profile accents</li>
            </ul>
          </div>
          <div className="border border-red-200 bg-red-50/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-red-700 mb-3">Never use for</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Buttons (use solid Cobalt)</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Text color (unreadable)</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Body backgrounds (overwhelming)</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Borders or outlines (too busy)</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Small icons or badges</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Repeated elements (it stops being special)</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Gradient variations */}
      <Section title="Gradient Variations">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Full spectrum (primary)</p>
            <div className="h-10 rounded-lg" style={{ background: 'linear-gradient(135deg, #3451E0, #12B5A3, #E58D08)' }} />
            <p className="text-xs font-mono text-stone-400 mt-1">135° — Cobalt → Teal → Amber</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Horizontal</p>
            <div className="h-10 rounded-lg" style={{ background: 'linear-gradient(90deg, #3451E0, #12B5A3, #E58D08)' }} />
            <p className="text-xs font-mono text-stone-400 mt-1">90° — For horizontal bars and dividers</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Subtle (low opacity)</p>
            <div className="h-10 rounded-lg" style={{ background: 'linear-gradient(135deg, #3451E015, #12B5A315, #E58D0815)' }} />
            <p className="text-xs font-mono text-stone-400 mt-1">15% opacity — For subtle background accents</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Full spectrum with Rose</p>
            <div className="h-10 rounded-lg" style={{ background: 'linear-gradient(135deg, #3451E0, #12B5A3, #E58D08, #F43F5E)' }} />
            <p className="text-xs font-mono text-stone-400 mt-1">All four spectrum colors — Use sparingly, for maximum brand expression</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Accent bar (thin)</p>
            <div className="h-1.5 rounded-full" style={{ background: 'linear-gradient(90deg, #3451E0, #12B5A3, #E58D08)' }} />
            <p className="text-xs font-mono text-stone-400 mt-1">For card borders, section dividers, progress indicators</p>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
