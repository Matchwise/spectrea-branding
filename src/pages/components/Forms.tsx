import { useState } from 'react'
import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { TbCheck, TbAlertTriangle, TbX } from 'react-icons/tb'

/* ------------------------------------------------------------------ */

export default function Forms() {
  /* Selection control state */
  const [checks, setChecks] = useState<Record<string, boolean>>({ optionA: true, optionB: true })
  const [radio, setRadio] = useState('connected')
  const [toggles, setToggles] = useState<Record<string, boolean>>({ autoConnect: true })

  /* Input state for validation demo */
  const [email, setEmail] = useState('')
  const emailValid = email === '' ? null : /^[^@]+@[^@]+\.[^@]+$/.test(email)

  return (
    <PageShell
      title="Forms"
      subtitle="Inputs, selects, toggles, and the quiet mechanics of a good form — the parts that should disappear while the user thinks."
    >
      {/* ── Text Inputs ──────────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Consistent form styling builds trust. Users learn the patterns once and apply them everywhere. Every input follows the same border, radius, and spacing rules.">
            <span>Text Inputs</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-6 space-y-5 max-w-md bg-white">
          <p className="text-[10px] font-semibold text-pewter uppercase tracking-wider">Interactive — type in these fields to see focus and validation states</p>

          {/* Default */}
          <div>
            <label className="block text-sm font-medium text-iron mb-2">Name</label>
            <input
              type="text"
              placeholder="e.g., Quarterly summary"
              className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg bg-white text-ink placeholder:text-pewter outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
            />
            <p className="text-xs text-slate mt-1">Helper text provides context or constraints.</p>
          </div>

          {/* Live validation */}
          <div>
            <label className="block text-sm font-medium text-iron mb-2">Email Address</label>
            <input
              type="text"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-white text-ink placeholder:text-pewter outline-none focus:ring-2 focus:ring-brand/20 transition-all"
              style={emailValid === null
                ? { border: '1px solid #E5E7EB' }
                : emailValid
                  ? { border: '2px solid #00B6A0' }
                  : { border: '2px solid #F24260' }
              }
            />
            {emailValid === false && <p className="flex items-center gap-1.5 text-xs mt-1" style={{ color: '#F24260' }}><TbX size={14} /> Please enter a valid email address.</p>}
            {emailValid === true && <p className="flex items-center gap-1.5 text-xs mt-1" style={{ color: '#00B6A0' }}><TbCheck size={14} /> Valid email address.</p>}
            {emailValid === null && <p className="text-xs text-slate mt-1">Type to see live validation.</p>}
          </div>

          {/* Search input */}
          <div>
            <label className="block text-sm font-medium text-iron mb-2">Search</label>
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg bg-white text-ink placeholder:text-pewter outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
            />
          </div>

          {/* Disabled */}
          <div>
            <label className="block text-sm font-medium text-slate mb-2">Workspace (read-only)</label>
            <input
              type="text"
              defaultValue="Spectrea Inc."
              className="w-full px-3 py-2 text-sm border border-stone-100 rounded-lg bg-cloud text-pewter cursor-not-allowed"
              disabled
            />
          </div>

          {/* Select */}
          <div>
            <label className="block text-sm font-medium text-iron mb-2">Category</label>
            <select className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg bg-white text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all">
              <option>Select a category...</option>
              <option>Category A</option>
              <option>Category B</option>
              <option>Category C</option>
            </select>
          </div>

          {/* Textarea */}
          <div>
            <label className="block text-sm font-medium text-iron mb-2">Description</label>
            <textarea
              placeholder="Describe this item..."
              rows={3}
              className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg bg-white text-ink placeholder:text-pewter resize-none outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
            />
          </div>
        </div>
      </Section>

      {/* ── Input Specifications ─────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">Input Specifications</h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { prop: 'Height', value: '36px (default), 32px (compact)', note: 'Compact for tables and dense UI' },
            { prop: 'Border', value: '1px solid Stone 200 (#E5E7EB)', note: 'Subtle but visible' },
            { prop: 'Border radius', value: '8px (rounded-lg)', note: 'Matches button radius' },
            { prop: 'Padding', value: '8px 12px (py-2 px-3)', note: 'Comfortable click target' },
            { prop: 'Font', value: 'Lexend Regular 400, 14px', note: 'Body SM size for input text' },
            { prop: 'Placeholder', value: 'Stone 400 (#97979E)', note: 'Clearly distinct from entered text' },
            { prop: 'Focus border', value: '2px solid Cobalt #4271DF', note: 'Thicker on focus, no glow — one clear signal' },
            { prop: 'Error border', value: 'Rose #F24260', note: 'Semantic error color' },
            { prop: 'Disabled bg', value: 'Stone 50 (#F4F4F1)', note: 'Subtle visual demotion' },
          ].map((row, i) => (
            <div key={row.prop} className="grid grid-cols-3 px-4 py-2.5" style={{ borderBottom: i < 9 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-sm font-medium text-iron">{row.prop}</span>
              <span className="text-xs font-mono text-iron">{row.value}</span>
              <span className="text-xs text-slate">{row.note}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Selection Controls ───────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Selection controls let users choose from a set of options. Checkboxes for multi-select, radios for single-select, toggles for binary on/off states.">
            <span>Selection Controls</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Checkboxes */}
          <div className="border border-stone-200 rounded-xl p-5 bg-white">
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-3">Checkbox</p>
            <div className="space-y-3">
              {[
                { key: 'optionA', label: 'Option A' },
                { key: 'optionB', label: 'Option B' },
                { key: 'optionC', label: 'Option C' },
              ].map(c => (
                <label key={c.key} className="flex items-center gap-2.5 cursor-pointer group" onClick={() => setChecks(p => ({ ...p, [c.key]: !p[c.key] }))}>
                  <span
                    className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border text-white text-[10px] transition-colors"
                    style={checks[c.key]
                      ? { backgroundColor: '#4271DF', borderColor: '#4271DF' }
                      : { borderColor: '#D1D5DB', backgroundColor: 'white' }
                    }
                  >
                    {checks[c.key] && <TbCheck size={10} />}
                  </span>
                  <span className="text-sm text-iron group-hover:text-ink transition-colors">{c.label}</span>
                </label>
              ))}
              <label className="flex items-center gap-2.5 opacity-40 cursor-not-allowed">
                <span className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border text-[10px]" style={{ borderColor: '#D1D5DB', backgroundColor: 'white' }} />
                <span className="text-sm text-iron">Archived items</span>
              </label>
            </div>
            <p className="text-xs text-pewter mt-3">Multi-select. Click to toggle. Use for filters and independent options.</p>
          </div>

          {/* Radio buttons */}
          <div className="border border-stone-200 rounded-xl p-5 bg-white">
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-3">Radio</p>
            <div className="space-y-3">
              {[
                { key: 'all', label: 'All items' },
                { key: 'connected', label: 'Connected only' },
                { key: 'unconnected', label: 'Unconnected only' },
              ].map(r => (
                <label key={r.key} className="flex items-center gap-2.5 cursor-pointer group" onClick={() => setRadio(r.key)}>
                  <span
                    className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-colors"
                    style={radio === r.key
                      ? { borderColor: '#4271DF' }
                      : { borderColor: '#D1D5DB' }
                    }
                  >
                    {radio === r.key && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4271DF' }} />}
                  </span>
                  <span className="text-sm text-iron group-hover:text-ink transition-colors">{r.label}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-pewter mt-3">Single-select. Click to switch. Use when exactly one option must be chosen.</p>
          </div>

          {/* Toggle */}
          <div className="border border-stone-200 rounded-xl p-5 bg-white">
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-3">Toggle</p>
            <div className="space-y-4">
              {[
                { key: 'autoConnect', label: 'Auto-connect new items' },
                { key: 'confidence', label: 'Show confidence scores' },
              ].map(t => (
                <button
                  key={t.key}
                  className="flex items-center justify-between w-full text-left group"
                  onClick={() => setToggles(p => ({ ...p, [t.key]: !p[t.key] }))}
                >
                  <span className="text-sm text-iron group-hover:text-ink transition-colors">{t.label}</span>
                  <span
                    className="relative w-9 h-5 rounded-full flex-shrink-0 transition-colors"
                    style={{ backgroundColor: toggles[t.key] ? '#4271DF' : '#D1D5DB' }}
                  >
                    <span
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all"
                      style={{ left: toggles[t.key] ? '18px' : '2px' }}
                    />
                  </span>
                </button>
              ))}
              <div className="flex items-center justify-between opacity-40 cursor-not-allowed">
                <span className="text-sm text-iron">Dark mode</span>
                <span className="relative w-9 h-5 rounded-full flex-shrink-0" style={{ backgroundColor: '#D1D5DB' }}>
                  <span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm" />
                </span>
              </div>
            </div>
            <p className="text-xs text-pewter mt-3">Binary on/off. Click to toggle. Use for instant-apply settings.</p>
          </div>
        </div>
        <div className="mt-3 bg-brand/5 rounded-lg px-4 py-3 border border-brand/10">
          <p className="text-xs text-brand">
            <strong>Rule:</strong> Use checkboxes for 2+ independent options, radios for 2-5 mutually exclusive options, and dropdowns for 6+ options. Toggles are for settings that apply immediately.
          </p>
        </div>
      </Section>

      {/* ── Validation Patterns ──────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Validation feedback uses semantic colors to communicate state. Messages appear inline below the field, never in modals or toasts.">
            <span>Validation Patterns</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-5 space-y-1.5">
          {[
            { color: '#00B6A0', icon: <TbCheck size={14} />, message: 'Name is available.' },
            { color: '#E19000', icon: <TbAlertTriangle size={14} />, message: 'This name is similar to an existing item. Continue?' },
            { color: '#F24260', icon: <TbX size={14} />, message: 'Name is required.' },
          ].map(v => (
            <div key={v.message} className="flex items-center gap-1.5 px-1">
              <span className="flex-shrink-0" style={{ color: v.color }}>{v.icon}</span>
              <p className="text-xs" style={{ color: v.color }}>{v.message}</p>
            </div>
          ))}
        </div>
        <div className="border border-stone-200 rounded-xl overflow-hidden mt-4">
          {[
            { rule: 'Validate on blur', detail: 'Not on every keystroke. Reduces visual noise while typing.' },
            { rule: 'Inline messages only', detail: 'Show errors below the field, never in modals or toasts.' },
            { rule: 'Explain and fix', detail: 'Always tell users what went wrong and how to resolve it.' },
            { rule: 'Preserve input', detail: 'Never clear a field on error. Let users fix, not re-type.' },
          ].map((row, i) => (
            <div key={row.rule} className="flex items-start gap-3 px-4 py-3" style={{ borderBottom: i < 3 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-xs font-semibold text-pewter mt-px">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="text-sm font-medium text-iron">{row.rule}</p>
                <p className="text-xs text-slate mt-0.5">{row.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Layout Rules ─────────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Form layout directly impacts completion rate. These rules are based on usability research — single-column forms consistently outperform multi-column layouts.">
            <span>Layout Rules</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { rule: 'Labels above inputs, not beside', reason: 'Better for scanning and mobile responsiveness' },
            { rule: 'One column for forms, not multi-column', reason: 'Users read top-to-bottom. Side-by-side breaks flow.' },
            { rule: '24px (1.5rem) between fields', reason: 'Enough space to distinguish groups without wasting space' },
            { rule: 'Group related fields visually', reason: 'Use a subtle border or background to cluster related inputs' },
            { rule: 'Primary action at the bottom-right', reason: 'Follows the natural reading direction (LTR)' },
            { rule: 'Always provide a cancel/back option', reason: 'Users should never feel trapped in a form' },
          ].map(item => (
            <div key={item.rule} className="bg-cloud rounded-lg px-4 py-3 border border-stone-100">
              <p className="text-sm font-medium text-iron">{item.rule}</p>
              <p className="text-xs text-pewter mt-0.5">{item.reason}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Accessibility ────────────────────────────────────────── */}
      <Section title="Accessibility">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { rule: 'Every input needs a visible label', detail: 'Placeholder text is not a label. It disappears on input and is skipped by screen readers.' },
            { rule: 'Associate labels with htmlFor', detail: 'Clicking the label should focus the input. Use matching id and htmlFor attributes.' },
            { rule: 'Error messages linked via aria-describedby', detail: 'Screen readers announce the error when the input is focused.' },
            { rule: 'Required fields marked visually and programmatically', detail: 'Use aria-required="true" alongside a visual indicator (asterisk or "required" text).' },
            { rule: 'Keyboard navigation for all controls', detail: 'Tab moves between fields. Space toggles checkboxes. Arrow keys move between radios.' },
            { rule: 'Sufficient contrast on all states', detail: 'Error text at 4.5:1 against background. Disabled state exempt but must still be perceptible.' },
          ].map(item => (
            <div key={item.rule} className="bg-cloud rounded-lg px-4 py-3 border border-stone-100">
              <p className="text-sm font-medium text-iron">{item.rule}</p>
              <p className="text-xs text-slate mt-0.5">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
