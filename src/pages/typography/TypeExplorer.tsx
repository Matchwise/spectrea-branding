import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { brand } from '../../data/brand'

const t = brand.typography

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const numbers = '0123456789'
const special = '!@#$%&*()—–.,;:\'\"?/{}[]<>'

export default function TypeExplorer() {
  return (
    <PageShell
      title="Typography"
      subtitle="Spectrea's type system — Albert Sans headings, Lexend body, JetBrains Mono code."
    >
      {/* Overview */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Heading', family: t.heading.family, style: t.heading.css, weight: t.heading.defaultWeight, usage: t.heading.usage },
            { label: 'Body', family: t.body.family, style: t.body.css, weight: t.body.defaultWeight, usage: t.body.usage },
            { label: 'Code', family: t.mono.family, style: t.mono.css, weight: t.mono.defaultWeight, usage: t.mono.usage },
          ].map(f => (
            <div key={f.label} className="border border-stone-200 rounded-xl p-5">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">{f.label}</p>
              <p className="text-2xl mb-1" style={{ fontFamily: f.style, fontWeight: f.weight }}>{f.family}</p>
              <p className="text-xs text-stone-500 leading-relaxed mt-2">{f.usage}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Specimens */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Full character set for each typeface. Verify all needed glyphs render correctly, especially for multilingual content (SG/AU/US markets).">
            <span>Character Specimens</span>
          </Tooltip>
        </h2>

        {[
          { label: 'Albert Sans (Heading)', style: t.heading.css, weight: 600 },
          { label: 'Lexend (Body)', style: t.body.css, weight: 400 },
          { label: 'JetBrains Mono (Code)', style: t.mono.css, weight: 400 },
        ].map(spec => (
          <div key={spec.label} className="mb-6 border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-stone-50 px-4 py-2 border-b border-stone-200">
              <span className="text-xs font-semibold text-stone-500">{spec.label}</span>
            </div>
            <div className="p-4 space-y-2" style={{ fontFamily: spec.style, fontWeight: spec.weight }}>
              <p className="text-lg text-stone-800 tracking-wide">{alphabet}</p>
              <p className="text-lg text-stone-800">{numbers}</p>
              <p className="text-lg text-stone-500">{special}</p>
            </div>
          </div>
        ))}
      </Section>

      {/* Live preview */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="How the type system looks in a realistic Spectrea UI context — headings, body, stats, code, and dark mode.">
            <span>In Context</span>
          </Tooltip>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Light */}
          <div className="border border-stone-200 rounded-xl p-5 bg-white">
            <p className="text-2xl font-semibold text-stone-900 mb-1" style={{ fontFamily: t.heading.css }}>
              We connect the dots.
            </p>
            <p className="text-sm text-stone-500 mb-4" style={{ fontFamily: t.body.css }}>
              Make knowledge trustworthy, connected, and actionable.
            </p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['Entities', 'Connections', 'Trust Score'].map((label, i) => (
                <div key={label} className="rounded-lg border border-stone-200 p-3">
                  <p className="text-xs text-stone-400 mb-0.5" style={{ fontFamily: t.body.css }}>{label}</p>
                  <p className="text-lg font-semibold text-stone-900" style={{ fontFamily: t.heading.css }}>
                    {['2,847', '8,291', '94%'][i]}
                  </p>
                  <p className="text-xs font-medium" style={{ fontFamily: t.body.css, color: ['#00B6A0', '#00B6A0', '#4271DF'][i] }}>
                    {['+12%', '+23%', 'High'][i]}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-stone-600 leading-relaxed mb-3" style={{ fontFamily: t.body.css }}>
              Every document you upload enriches your knowledge graph. Connections you never noticed start surfacing. The system gets sharper — your second month is better than your first.
            </p>
            <div className="bg-stone-50 rounded-lg px-3 py-2 border border-stone-200">
              <p className="text-xs text-stone-500" style={{ fontFamily: t.mono.css }}>
                entity.type: "Financial Model" | confidence: 0.94 | source: "Q4_report.pdf"
              </p>
            </div>
          </div>

          {/* Dark */}
          <div className="border border-stone-700 rounded-xl p-5" style={{ backgroundColor: '#18181C' }}>
            <p className="text-2xl font-semibold mb-1" style={{ fontFamily: t.heading.css, color: '#F4F4F1' }}>
              We connect the dots.
            </p>
            <p className="text-sm mb-4" style={{ fontFamily: t.body.css, color: '#97979E' }}>
              Make knowledge trustworthy, connected, and actionable.
            </p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['Entities', 'Connections', 'Trust Score'].map((label, i) => (
                <div key={label} className="rounded-lg p-3" style={{ backgroundColor: '#212226', border: '1px solid #2E2E34' }}>
                  <p className="text-xs mb-0.5" style={{ fontFamily: t.body.css, color: '#97979E' }}>{label}</p>
                  <p className="text-lg font-semibold" style={{ fontFamily: t.heading.css, color: '#F4F4F1' }}>
                    {['2,847', '8,291', '94%'][i]}
                  </p>
                  <p className="text-xs font-medium" style={{ fontFamily: t.body.css, color: ['#00B6A0', '#00B6A0', '#4271DF'][i] }}>
                    {['+12%', '+23%', 'High'][i]}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: t.body.css, color: '#97979E' }}>
              Every document you upload enriches your knowledge graph. Connections you never noticed start surfacing.
            </p>
            <div className="rounded-lg px-3 py-2" style={{ backgroundColor: '#212226', border: '1px solid #2E2E34' }}>
              <p className="text-xs" style={{ fontFamily: t.mono.css, color: '#97979E' }}>
                entity.type: "Financial Model" | confidence: 0.94
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Weight usage */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Which weights to use and when. Consistency in weight usage creates clear visual hierarchy.">
            <span>Weight Usage</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { font: 'Albert Sans', weight: 700, label: 'Bold', use: 'Logo wordmark, hero headlines only', style: t.heading.css },
            { font: 'Albert Sans', weight: 600, label: 'Semibold', use: 'Page titles, section headings, card titles, stat values', style: t.heading.css },
            { font: 'Lexend', weight: 500, label: 'Medium', use: 'Button labels, nav items, emphasized body text, form labels', style: t.body.css },
            { font: 'Lexend', weight: 400, label: 'Regular', use: 'Body text, descriptions, helper text, tooltips', style: t.body.css },
            { font: 'Lexend', weight: 300, label: 'Light', use: 'Large display text, oversized numbers, decorative use only', style: t.body.css },
            { font: 'JetBrains Mono', weight: 400, label: 'Regular', use: 'Code, data values, entity types, provenance', style: t.mono.css },
          ].map((w, i) => (
            <div key={`${w.font}-${w.weight}`} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-4 py-3" style={{ borderBottom: i < 5 ? '1px solid #F3F4F6' : 'none' }}>
              <p className="text-base sm:text-lg sm:w-48 sm:flex-shrink-0" style={{ fontFamily: w.style, fontWeight: w.weight }}>
                {w.font}
              </p>
              <div className="sm:w-20 sm:flex-shrink-0">
                <span className="text-xs font-mono text-stone-400">{w.weight} {w.label}</span>
              </div>
              <p className="text-xs text-stone-600">{w.use}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Do / Don't */}
      <Section title="Typography Dos & Don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl p-5" style={{ border: '1px solid #00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#008775' }}>Do</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use Albert Sans only for headings and display text</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use Lexend for all body text and UI labels</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use JetBrains Mono for anything code-like or data-like</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Maintain minimum 16px for body text on web</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use Semibold 600 as the default heading weight</li>
            </ul>
          </div>
          <div className="rounded-xl p-5" style={{ border: '1px solid #F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Don't</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Mix in other font families — three is the maximum</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use Albert Sans for long body paragraphs</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use Bold 700 for anything except the logo and hero headlines</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use all-caps for body text (headings only, sparingly)</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Go below 12px for any text (accessibility minimum)</li>
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
