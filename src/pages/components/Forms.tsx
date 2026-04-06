import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'

export default function Forms() {
  return (
    <PageShell
      title="Forms"
      subtitle="Input styles, validation patterns, and form layout rules."
    >
      {/* Input types */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Consistent form styling builds trust. Users learn the patterns once and apply them everywhere. Every input follows the same border, radius, and spacing rules.">
            <span>Input Styles</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-6 space-y-5 max-w-md">
          {/* Text input */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Entity Name</label>
            <input
              type="text"
              placeholder="e.g., Revenue Model"
              className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              readOnly
            />
            <p className="text-xs text-stone-400 mt-1">Helper text provides context or constraints.</p>
          </div>

          {/* Focused */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Search</label>
            <input
              type="text"
              defaultValue="knowledge graph"
              className="w-full px-3 py-2 text-sm rounded-lg bg-white text-stone-900"
              style={{ border: '1px solid #4271DF', boxShadow: '0 0 0 3px rgba(52, 81, 224, 0.15)' }}
              readOnly
            />
            <p className="text-xs text-brand mt-1">Focused state — Cobalt border + ring.</p>
          </div>

          {/* Error */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Email Address</label>
            <input
              type="text"
              defaultValue="not-an-email"
              className="w-full px-3 py-2 text-sm rounded-lg bg-white text-stone-900"
              style={{ border: '1px solid #F43F5E', boxShadow: '0 0 0 3px rgba(244, 63, 94, 0.1)' }}
              readOnly
            />
            <p className="text-xs mt-1" style={{ color: '#F43F5E' }}>Please enter a valid email address.</p>
          </div>

          {/* Disabled */}
          <div>
            <label className="block text-sm font-medium text-stone-400 mb-1.5">Organization (read-only)</label>
            <input
              type="text"
              defaultValue="Spectrea Inc."
              className="w-full px-3 py-2 text-sm border border-stone-100 rounded-lg bg-stone-50 text-stone-400"
              disabled
            />
          </div>

          {/* Select */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Entity Type</label>
            <select className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg bg-white text-stone-900">
              <option>Select a type...</option>
              <option>Financial Model</option>
              <option>Research Paper</option>
              <option>Organization</option>
            </select>
          </div>

          {/* Textarea */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Description</label>
            <textarea
              placeholder="Describe this entity..."
              rows={3}
              className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg bg-white text-stone-900 placeholder:text-stone-400 resize-none"
              readOnly
            />
          </div>
        </div>
      </Section>

      {/* Specs */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">Input Specifications</h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { prop: 'Height', value: '36px (default), 32px (compact)', note: 'Compact for tables and dense UI' },
            { prop: 'Border', value: '1px solid Stone 200 (#E5E7EB)', note: 'Subtle but visible' },
            { prop: 'Border radius', value: '8px (rounded-lg)', note: 'Matches button radius' },
            { prop: 'Padding', value: '8px 12px (py-2 px-3)', note: 'Comfortable click target' },
            { prop: 'Font', value: 'Lexend Regular 400, 14px', note: 'Body SM size for input text' },
            { prop: 'Placeholder', value: 'Stone 400 (#9CA3AF)', note: 'Clearly distinct from entered text' },
            { prop: 'Focus border', value: 'Cobalt #4271DF', note: 'Clear active state' },
            { prop: 'Focus ring', value: '3px, Cobalt at 15% opacity', note: 'Softer than button focus ring' },
            { prop: 'Error border', value: 'Rose #F43F5E', note: 'Semantic error color' },
            { prop: 'Disabled bg', value: 'Stone 50 (#F9FAFB)', note: 'Subtle visual demotion' },
          ].map((row, i) => (
            <div key={row.prop} className="grid grid-cols-3 px-4 py-2.5" style={{ borderBottom: i < 9 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-sm font-medium text-stone-700">{row.prop}</span>
              <span className="text-xs font-mono text-stone-600">{row.value}</span>
              <span className="text-xs text-stone-500">{row.note}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Validation */}
      <Section title="Validation Patterns">
        <div className="border border-stone-200 rounded-xl p-5 space-y-3">
          {[
            { state: 'Success', color: '#00B6A0', bg: '#F0FDFA', border: '#00B6A020', message: 'Entity name is available.' },
            { state: 'Warning', color: '#E19000', bg: '#FFFBEB', border: '#E1900020', message: 'This name is similar to an existing entity. Continue?' },
            { state: 'Error', color: '#F43F5E', bg: '#FFF1F2', border: '#F43F5E20', message: 'Entity name is required.' },
          ].map(v => (
            <div key={v.state} className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: v.bg, border: `1px solid ${v.border}` }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: v.color }} />
              <p className="text-xs" style={{ color: v.color }}>{v.message}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 bg-stone-50 rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-stone-600">
            <strong>Rule:</strong> Validate on blur, not on every keystroke. Show errors inline below the field, not in a modal or toast. Always tell users what went wrong and how to fix it.
          </p>
        </div>
      </Section>

      {/* Form layout */}
      <Section title="Layout Rules">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { rule: 'Labels above inputs, not beside', reason: 'Better for scanning and mobile responsiveness' },
            { rule: 'One column for forms, not multi-column', reason: 'Users read top-to-bottom. Side-by-side breaks flow.' },
            { rule: '24px (1.5rem) between fields', reason: 'Enough space to distinguish groups without wasting space' },
            { rule: 'Group related fields visually', reason: 'Use a subtle border or background to cluster related inputs' },
            { rule: 'Primary action at the bottom-right', reason: 'Follows the natural reading direction (LTR)' },
            { rule: 'Always provide a cancel/back option', reason: 'Users should never feel trapped in a form' },
          ].map(item => (
            <div key={item.rule} className="bg-stone-50 rounded-lg px-4 py-3 border border-stone-100">
              <p className="text-sm text-stone-700">{item.rule}</p>
              <p className="text-xs text-stone-400 mt-0.5">{item.reason}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
