import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { brand } from '../../data/brand'
import { useState } from 'react'

const t = brand.typography

const scale = [
  { name: 'Display', size: '3rem', px: 48, lineHeight: '1.1', weight: 600, font: 'heading', usage: 'Hero headlines, landing page titles' },
  { name: 'H1', size: '2.25rem', px: 36, lineHeight: '1.2', weight: 600, font: 'heading', usage: 'Page titles' },
  { name: 'H2', size: '1.875rem', px: 30, lineHeight: '1.25', weight: 600, font: 'heading', usage: 'Major section headings' },
  { name: 'H3', size: '1.5rem', px: 24, lineHeight: '1.3', weight: 600, font: 'heading', usage: 'Sub-section headings, card titles' },
  { name: 'H4', size: '1.25rem', px: 20, lineHeight: '1.4', weight: 600, font: 'heading', usage: 'Minor headings, dialog titles' },
  { name: 'H5', size: '1.125rem', px: 18, lineHeight: '1.4', weight: 600, font: 'heading', usage: 'Small headings, sidebar section titles' },
  { name: 'Body LG', size: '1.125rem', px: 18, lineHeight: '1.6', weight: 400, font: 'body', usage: 'Lead paragraphs, introductions' },
  { name: 'Body', size: '1rem', px: 16, lineHeight: '1.6', weight: 400, font: 'body', usage: 'Default body text, descriptions' },
  { name: 'Body SM', size: '0.875rem', px: 14, lineHeight: '1.5', weight: 400, font: 'body', usage: 'Secondary text, table cells, form inputs' },
  { name: 'Caption', size: '0.75rem', px: 12, lineHeight: '1.5', weight: 500, font: 'body', usage: 'Labels, timestamps, helper text, badges' },
  { name: 'Overline', size: '0.75rem', px: 12, lineHeight: '1.5', weight: 600, font: 'body', usage: 'Section labels, category tags (uppercase, tracked)' },
  { name: 'Code', size: '0.875rem', px: 14, lineHeight: '1.5', weight: 400, font: 'mono', usage: 'Inline code, data values, entity types' },
  { name: 'Code SM', size: '0.75rem', px: 12, lineHeight: '1.5', weight: 400, font: 'mono', usage: 'Provenance chains, technical metadata' },
]

const sampleText = 'We connect the dots.'

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      className="text-xs font-mono text-stone-400 hover:text-stone-600 transition-colors"
    >
      {copied ? 'Copied!' : value}
    </button>
  )
}

export default function TypeScale() {
  return (
    <PageShell
      title="Type Scale"
      subtitle="The complete sizing system — every text size, its role, and when to use it."
    >
      {/* Visual scale */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="A consistent type scale ensures visual hierarchy across every page. Each size has a specific role — don't use sizes outside this scale.">
            <span>Scale</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {scale.map((s, i) => {
            const fontStyle = s.font === 'heading' ? t.heading.css : s.font === 'mono' ? t.mono.css : t.body.css
            return (
              <div key={s.name} className="flex items-center gap-4 px-4 py-3" style={{ borderBottom: i < scale.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                <div className="w-20 flex-shrink-0">
                  <p className="text-xs font-semibold text-stone-400">{s.name}</p>
                  <CopyButton value={`${s.size} / ${s.lineHeight}`} />
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p
                    className="text-stone-900 truncate"
                    style={{
                      fontFamily: fontStyle,
                      fontSize: s.size,
                      lineHeight: s.lineHeight,
                      fontWeight: s.weight,
                      letterSpacing: s.name === 'Overline' ? '0.05em' : undefined,
                      textTransform: s.name === 'Overline' ? 'uppercase' : undefined,
                    }}
                  >
                    {sampleText}
                  </p>
                </div>
                <div className="w-32 flex-shrink-0 text-right">
                  <p className="text-xs text-stone-500">{s.usage}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Responsive adjustments */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="On smaller screens, large headings scale down to prevent overflow. Body text stays at 16px minimum for readability.">
            <span>Responsive Scaling</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 bg-stone-50 border-b border-stone-200 px-4 py-2">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Size</span>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Desktop (1024+)</span>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Tablet (640–1023)</span>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Mobile (&lt;640)</span>
          </div>
          {[
            { name: 'Display', desktop: '48px', tablet: '36px', mobile: '30px' },
            { name: 'H1', desktop: '36px', tablet: '30px', mobile: '24px' },
            { name: 'H2', desktop: '30px', tablet: '24px', mobile: '20px' },
            { name: 'H3', desktop: '24px', tablet: '20px', mobile: '18px' },
            { name: 'Body', desktop: '16px', tablet: '16px', mobile: '16px' },
            { name: 'Body SM', desktop: '14px', tablet: '14px', mobile: '14px' },
          ].map((r, i) => (
            <div key={r.name} className="grid grid-cols-4 px-4 py-2" style={{ borderBottom: i < 5 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-xs font-medium text-stone-700">{r.name}</span>
              <span className="text-xs text-stone-600 font-mono">{r.desktop}</span>
              <span className="text-xs text-stone-600 font-mono">{r.tablet}</span>
              <span className="text-xs text-stone-600 font-mono">{r.mobile}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-stone-400 mt-2">Body text never drops below 16px. Heading sizes scale proportionally. Mobile H1 = Desktop H3.</p>
      </Section>

      {/* Line length */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Optimal line length for readability is 50–75 characters. Too wide = eyes lose their place. Too narrow = constant line breaks.">
            <span>Line Length</span>
          </Tooltip>
        </h2>
        <div className="space-y-4">
          <div className="rounded-xl p-5" style={{ border: '1px solid #F2426025', backgroundColor: '#F2426008' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#F24260' }}>Too wide (90+ chars)</p>
            <p className="text-sm text-stone-600 leading-relaxed" style={{ fontFamily: t.body.css, maxWidth: '800px' }}>
              Every document you upload enriches your knowledge graph. Connections you never noticed start surfacing. The system gets sharper — your second month is better than your first. Your second year is incomparably better.
            </p>
          </div>
          <div className="rounded-xl p-5" style={{ border: '1px solid #00B6A025', backgroundColor: '#00B6A008' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#00B6A0' }}>Ideal (50–75 chars)</p>
            <p className="text-sm text-stone-600 leading-relaxed" style={{ fontFamily: t.body.css, maxWidth: '540px' }}>
              Every document you upload enriches your knowledge graph. Connections you never noticed start surfacing. The system gets sharper — your second month is better than your first.
            </p>
          </div>
          <div className="rounded-xl p-5" style={{ border: '1px solid #F2426025', backgroundColor: '#F2426008' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#F24260' }}>Too narrow (30 chars)</p>
            <p className="text-sm text-stone-600 leading-relaxed" style={{ fontFamily: t.body.css, maxWidth: '220px' }}>
              Every document you upload enriches your knowledge graph. Connections you never noticed start surfacing.
            </p>
          </div>
        </div>
        <p className="text-xs text-stone-400 mt-2">Target max-width for body text: <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-xs">max-w-prose</code> (65ch) or ~540px at 16px body size.</p>
      </Section>
    </PageShell>
  )
}
