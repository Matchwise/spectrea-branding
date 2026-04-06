import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { brand } from '../../data/brand'

const t = brand.typography

export default function TypographyGuidelines() {
  return (
    <PageShell
      title="Typography Guidelines"
      subtitle="Rules for pairing, hierarchy, and applying the Spectrea type system."
    >
      {/* Font pairing */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Spectrea uses exactly three typefaces. Each has a clear lane. Mixing them outside these rules creates visual confusion.">
            <span>Font Pairing Rules</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-stone-50 rounded-lg p-4 border border-stone-100 text-center">
              <p className="text-2xl font-semibold mb-2" style={{ fontFamily: t.heading.css }}>Headings</p>
              <p className="text-xs font-mono text-stone-400">Albert Sans</p>
              <p className="text-xs text-stone-500 mt-1">Signals structure and hierarchy</p>
            </div>
            <div className="bg-stone-50 rounded-lg p-4 border border-stone-100 text-center">
              <p className="text-2xl mb-2" style={{ fontFamily: t.body.css }}>Body text</p>
              <p className="text-xs font-mono text-stone-400">Lexend</p>
              <p className="text-xs text-stone-500 mt-1">Optimized for reading fluency</p>
            </div>
            <div className="bg-stone-50 rounded-lg p-4 border border-stone-100 text-center">
              <p className="text-2xl mb-2" style={{ fontFamily: t.mono.css }}>Data & code</p>
              <p className="text-xs font-mono text-stone-400">JetBrains Mono</p>
              <p className="text-xs text-stone-500 mt-1">Signals technical precision</p>
            </div>
          </div>
          <div className="bg-brand/5 rounded-lg px-4 py-3 border border-brand/10">
            <p className="text-xs text-brand">
              <strong>Rule:</strong> Three fonts maximum. Never introduce a fourth typeface. If you need variety, use weight and size changes within the existing three.
            </p>
          </div>
        </div>
      </Section>

      {/* Hierarchy */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Visual hierarchy guides the eye from most important to least important. Size, weight, and color all work together.">
            <span>Building Hierarchy</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-6 bg-white">
          <div className="max-w-lg space-y-4">
            <div>
              <p className="text-xs font-mono text-stone-400 mb-1">Level 1 — Albert Sans 600, 30px, Ink</p>
              <p className="text-3xl font-semibold text-stone-900" style={{ fontFamily: t.heading.css }}>Knowledge Overview</p>
            </div>
            <div>
              <p className="text-xs font-mono text-stone-400 mb-1">Level 2 — Albert Sans 600, 20px, Ink</p>
              <p className="text-xl font-semibold text-stone-900" style={{ fontFamily: t.heading.css }}>Recent Connections</p>
            </div>
            <div>
              <p className="text-xs font-mono text-stone-400 mb-1">Level 3 — Lexend 500, 14px, Ink</p>
              <p className="text-sm font-medium text-stone-900" style={{ fontFamily: t.body.css }}>Entity: Revenue Model</p>
            </div>
            <div>
              <p className="text-xs font-mono text-stone-400 mb-1">Body — Lexend 400, 16px, Ink</p>
              <p className="text-base text-stone-700" style={{ fontFamily: t.body.css }}>This entity connects to 12 other nodes across 3 knowledge domains, with a trust score of 94%.</p>
            </div>
            <div>
              <p className="text-xs font-mono text-stone-400 mb-1">Secondary — Lexend 400, 14px, Gray</p>
              <p className="text-sm text-stone-500" style={{ fontFamily: t.body.css }}>Last updated 2 hours ago by Sarah Chen</p>
            </div>
            <div>
              <p className="text-xs font-mono text-stone-400 mb-1">Metadata — JetBrains Mono 400, 12px, Gray</p>
              <p className="text-xs text-stone-400" style={{ fontFamily: t.mono.css }}>entity.type: "Financial Model" | confidence: 0.94</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Weight rules */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Incorrect weight usage is the most common brand violation. These rules prevent muddy hierarchy.">
            <span>Weight Discipline</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-emerald-800 mb-3">Correct</h3>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-emerald-100">
                <p className="text-lg font-semibold text-stone-900" style={{ fontFamily: t.heading.css }}>Page Title</p>
                <p className="text-sm text-stone-600" style={{ fontFamily: t.body.css }}>Body text at regular weight. Nice and readable.</p>
                <p className="text-xs text-stone-400 mt-1" style={{ fontFamily: t.body.css }}>Caption text, lighter color, same weight.</p>
              </div>
              <p className="text-xs text-emerald-700">Clear distinction: size + font family creates hierarchy without excessive bolding.</p>
            </div>
          </div>
          <div className="border border-red-200 bg-red-50/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-red-700 mb-3">Incorrect</h3>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-red-100">
                <p className="text-lg font-bold text-stone-900" style={{ fontFamily: t.body.css }}>Page Title in Wrong Font</p>
                <p className="text-sm font-semibold text-stone-600" style={{ fontFamily: t.body.css }}>Body text that's too bold. Fights with the title.</p>
                <p className="text-xs font-medium text-stone-900 mt-1" style={{ fontFamily: t.body.css }}>Caption that's too dark and heavy.</p>
              </div>
              <p className="text-xs text-red-600">Everything competes. No clear hierarchy when body is bold and captions are medium weight.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Spacing */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Consistent spacing between typographic elements creates rhythm. These values ensure text breathes properly.">
            <span>Spacing & Rhythm</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { rule: 'Space after H1', value: '16px (1rem)', note: 'Tight coupling to subtitle or first paragraph' },
            { rule: 'Space after H2', value: '12px (0.75rem)', note: 'Section headings sit close to their content' },
            { rule: 'Space between paragraphs', value: '16px (1rem)', note: 'One line-height of body text' },
            { rule: 'Space between sections', value: '32–48px (2–3rem)', note: 'Clear visual break between topics' },
            { rule: 'Line height for body', value: '1.6', note: 'Generous for Lexend — aids scanning in dense content' },
            { rule: 'Line height for headings', value: '1.1–1.3', note: 'Tighter — large text needs less leading' },
            { rule: 'Letter spacing for overlines', value: '0.05em', note: 'Uppercase small text needs tracking to breathe' },
          ].map((row, i) => (
            <div key={row.rule} className="grid grid-cols-3 px-4 py-3" style={{ borderBottom: i < 6 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-sm text-stone-700">{row.rule}</span>
              <span className="text-sm font-mono text-brand">{row.value}</span>
              <span className="text-xs text-stone-500">{row.note}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { rule: 'Minimum body size: 16px', detail: 'WCAG AAA target. Never go below this for primary content.' },
            { rule: 'Minimum caption size: 12px', detail: 'Absolute floor. Below this, text becomes inaccessible.' },
            { rule: 'Contrast ratio: 4.5:1 minimum', detail: 'Ink on White = 17.7:1. Gray on White = 3.1:1 (decorative only).' },
            { rule: 'Avoid text in images', detail: 'Screen readers can\'t read it. Use real HTML text.' },
            { rule: 'Don\'t rely on color alone', detail: 'Use icons, patterns, or labels alongside color coding.' },
            { rule: 'Support text resizing to 200%', detail: 'Layout must not break when users increase browser font size.' },
          ].map(item => (
            <div key={item.rule} className="bg-stone-50 rounded-lg px-4 py-3 border border-stone-100">
              <p className="text-sm font-medium text-stone-700">{item.rule}</p>
              <p className="text-xs text-stone-500 mt-0.5">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
