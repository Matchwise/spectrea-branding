import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'

function DemoButton({ variant, label, className, style }: { variant: string; label: string; className: string; style?: React.CSSProperties }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button className={className} style={style}>{label}</button>
      <span className="text-xs font-mono text-stone-400">{variant}</span>
    </div>
  )
}

export default function Buttons() {
  return (
    <PageShell
      title="Buttons"
      subtitle="Button styles, sizes, and usage rules for the Spectrea design system."
    >
      {/* Button types */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Spectrea uses four button variants. Primary (Cobalt) is the hero action — use sparingly. Secondary and ghost provide supporting actions. Destructive is reserved for irreversible operations.">
            <span>Button Variants</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-6">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <DemoButton variant="Primary" label="Create Entity" className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors" style={{ backgroundColor: '#4271DF' }} />
            <DemoButton variant="Secondary" label="View Details" className="px-4 py-2 rounded-lg text-sm font-medium text-stone-700 bg-stone-100 transition-colors" />
            <DemoButton variant="Ghost" label="Cancel" className="px-4 py-2 rounded-lg text-sm font-medium text-stone-500 border border-stone-200 transition-colors" />
            <DemoButton variant="Destructive" label="Delete" className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors" style={{ backgroundColor: '#F43F5E' }} />
          </div>
        </div>
      </Section>

      {/* Specs table */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Every button has consistent padding, radius, and typography. These specs ensure visual harmony across the product.">
            <span>Specifications</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-5 bg-stone-50 border-b border-stone-200 px-4 py-2">
            {['Variant', 'Background', 'Text', 'Border', 'Usage'].map(h => (
              <span key={h} className="text-xs font-semibold text-stone-400 uppercase tracking-wider">{h}</span>
            ))}
          </div>
          {[
            { variant: 'Primary', bg: 'Cobalt #4271DF', text: 'White #FFFFFF', border: 'None', usage: 'One per section. The main CTA.' },
            { variant: 'Secondary', bg: 'Stone 100', text: 'Stone 700', border: 'None', usage: 'Supporting actions. "View", "Edit", "Filter".' },
            { variant: 'Ghost', bg: 'Transparent', text: 'Stone 500', border: 'Stone 200', usage: 'Tertiary actions. "Cancel", "Back", "More".' },
            { variant: 'Destructive', bg: 'Rose #F43F5E', text: 'White #FFFFFF', border: 'None', usage: 'Delete, remove, revoke. Always with confirmation.' },
          ].map((row, i) => (
            <div key={row.variant} className="grid grid-cols-5 px-4 py-3" style={{ borderBottom: i < 3 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-sm font-medium text-stone-800">{row.variant}</span>
              <span className="text-xs font-mono text-stone-600">{row.bg}</span>
              <span className="text-xs font-mono text-stone-600">{row.text}</span>
              <span className="text-xs font-mono text-stone-600">{row.border}</span>
              <span className="text-xs text-stone-500">{row.usage}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Sizes */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Button sizes match the density of the surrounding UI. Compact for toolbars and tables, default for most contexts, large for standalone CTAs.">
            <span>Sizes</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-6">
          <div className="flex items-end justify-center gap-6 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <button className="px-3 py-1.5 rounded-md text-xs font-medium text-white" style={{ backgroundColor: '#4271DF' }}>Compact</button>
              <span className="text-xs font-mono text-stone-400">32px / px-3 py-1.5</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: '#4271DF' }}>Default</button>
              <span className="text-xs font-mono text-stone-400">36px / px-4 py-2</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="px-6 py-3 rounded-lg text-base font-medium text-white" style={{ backgroundColor: '#4271DF' }}>Large</button>
              <span className="text-xs font-mono text-stone-400">48px / px-6 py-3</span>
            </div>
          </div>
        </div>
      </Section>

      {/* States */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Button states give users feedback about interactivity. Every button must have distinct hover, active, focus, and disabled states.">
            <span>States</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-6">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {[
              { label: 'Default', bg: '#4271DF', opacity: 1 },
              { label: 'Hover', bg: '#2A41B3', opacity: 1 },
              { label: 'Active', bg: '#1E3099', opacity: 1 },
              { label: 'Focus', bg: '#4271DF', opacity: 1, ring: true },
              { label: 'Disabled', bg: '#4271DF', opacity: 0.4 },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${s.ring ? 'ring-2 ring-brand/30 ring-offset-2' : ''}`}
                  style={{ backgroundColor: s.bg, opacity: s.opacity }}
                  disabled={s.label === 'Disabled'}
                >
                  Button
                </button>
                <span className="text-xs font-mono text-stone-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 bg-stone-50 rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-stone-600">
            <strong>Focus ring:</strong> 2px ring in Cobalt at 30% opacity with 2px offset. Required for keyboard accessibility (WCAG 2.4.7).
          </p>
        </div>
      </Section>

      {/* Do/Don't */}
      <Section title="Button Dos & Don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-emerald-800 mb-3">Do</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Use verb-first labels: "Create Entity", "Save Draft"</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>One Primary button per section maximum</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Pair destructive actions with a confirmation step</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Use Lexend Medium (500) for button labels</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Show loading state with a spinner, not label change</li>
            </ul>
          </div>
          <div className="border border-red-200 bg-red-50/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-red-700 mb-3">Don't</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Put two Primary buttons next to each other</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Use the gradient on buttons (solid colors only)</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Make buttons look like links or vice versa</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Use vague labels like "Submit" or "Click Here"</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Disable buttons without explaining why</li>
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
