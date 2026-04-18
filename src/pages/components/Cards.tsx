import { useState } from 'react'
import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { TbChevronRight, TbX, TbInfoCircle, TbCircleCheck, TbAlertTriangle, TbAlertCircle } from 'react-icons/tb'

/* ------------------------------------------------------------------ */

export default function Cards() {
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set())
  const [removedTags, setRemovedTags] = useState<Set<string>>(new Set())

  const alerts = [
    { color: '#4271DF', bg: '#4271DF08', border: '#4271DF20', title: 'Info', message: '3 new items were added to your collection.', icon: <TbInfoCircle size={14} /> },
    { color: '#00B6A0', bg: '#00B6A008', border: '#00B6A020', title: 'Success', message: 'Document uploaded and processed. Ready to use.', icon: <TbCircleCheck size={14} /> },
    { color: '#E19000', bg: '#E1900008', border: '#E1900020', title: 'Warning', message: 'This item has moderate confidence (62%). Review the source before relying on it.', icon: <TbAlertTriangle size={14} /> },
    { color: '#F24260', bg: '#F2426008', border: '#F2426020', title: 'Error', message: 'Failed to reach the server. Your changes are saved locally and will sync when reconnected.', icon: <TbAlertCircle size={14} /> },
  ]

  const visibleAlerts = alerts.filter(a => !dismissedAlerts.has(a.title))

  return (
    <PageShell
      title="Cards"
      subtitle="Card patterns, elevation, content layout, and special states for Spectrea UI."
    >
      {/* ── Card Variants ────────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Cards are the primary container for grouped content. They create visual separation on the Cloud surface and give content a 'home.' Every card follows the same border, radius, and padding rules.">
            <span>Card Variants</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Default card */}
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Default</p>
            <div className="border border-stone-200 rounded-xl p-5 bg-white">
              <p className="text-sm font-semibold text-stone-900" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Card title</p>
              <p className="text-xs text-stone-500 mt-1">A short supporting description. Keep it to one or two lines so the card stays scannable.</p>
              <div className="flex gap-2 mt-3">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#4271DF15', color: '#4271DF', border: '1px solid #4271DF30' }}>tag</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#00B6A015', color: '#00B6A0', border: '1px solid #00B6A030' }}>connected</span>
              </div>
            </div>
            <p className="text-xs text-stone-400 mt-2">White background, Stone 200 border, rounded-xl.</p>
          </div>

          {/* Elevated card */}
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Elevated</p>
            <div className="rounded-xl p-5 bg-white shadow-md border border-stone-100 hover:shadow-lg transition-shadow">
              <p className="text-sm font-semibold text-stone-900" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Quick Stats</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div>
                  <p className="text-lg font-semibold text-stone-900" style={{ fontFamily: "'Albert Sans', sans-serif" }}>2.8k</p>
                  <p className="text-xs text-stone-500">Items</p>
                </div>
                <div>
                  <p className="text-lg font-semibold" style={{ fontFamily: "'Albert Sans', sans-serif", color: '#00B6A0' }}>+23%</p>
                  <p className="text-xs text-stone-500">Growth</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-stone-400 mt-2">Shadow-md, hover lifts to shadow-lg.</p>
          </div>

          {/* Interactive card */}
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Interactive</p>
            <div className="border border-stone-200 rounded-xl p-5 bg-white hover:border-stone-300 hover:bg-stone-50 active:bg-stone-100 transition-all cursor-pointer group">
              <p className="text-sm font-semibold text-stone-900 group-hover:text-brand transition-colors" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Section title</p>
              <p className="text-xs text-stone-500 mt-1">Short supporting line. Two lines maximum.</p>
              <div className="flex items-center gap-1 mt-3">
                <span className="text-xs font-medium transition-colors" style={{ color: '#4271DF' }}>Open</span>
                <TbChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" style={{ color: '#4271DF' }} />
              </div>
            </div>
            <p className="text-xs text-stone-400 mt-2">Hover: border darkens, title shifts to Cobalt, arrow nudges.</p>
          </div>
        </div>
      </Section>

      {/* ── Specifications ───────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">Specifications</h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { prop: 'Border', value: '1px solid Stone 200 (#E5E7EB)', note: 'Default container border' },
            { prop: 'Border radius', value: '12px (rounded-xl)', note: 'Friendly, modern corners' },
            { prop: 'Padding', value: '20px (p-5)', note: 'Comfortable inner spacing' },
            { prop: 'Background', value: 'Canvas #FDFDFB', note: 'Cards sit on the Cloud surface' },
            { prop: 'Shadow (elevated)', value: 'shadow-md', note: 'For floating elements only' },
            { prop: 'Hover border', value: 'Stone 300 (#D1D5DB)', note: 'Subtle darkening on interactive cards' },
            { prop: 'Card gap', value: '16px (gap-4)', note: 'Space between cards in a grid' },
            { prop: 'Title font', value: 'Albert Sans Semibold 600', note: 'Card titles use the heading font' },
          ].map((row, i) => (
            <div key={row.prop} className="grid grid-cols-3 px-4 py-2.5" style={{ borderBottom: i < 7 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-sm font-medium text-stone-700">{row.prop}</span>
              <span className="text-xs font-mono text-stone-600">{row.value}</span>
              <span className="text-xs text-stone-500">{row.note}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Content Patterns ─────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Card content follows predictable patterns. Users learn to scan: title first, then summary, then metadata footer. Consistent structure reduces cognitive load.">
            <span>Content Patterns</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Stat card */}
          <div className="border border-stone-200 rounded-xl p-5">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Stat Card</p>
            <div className="rounded-lg border border-stone-200 p-4 hover:border-stone-300 transition-colors">
              <p className="text-xs text-stone-500">Active Items</p>
              <p className="text-2xl font-semibold text-stone-900 mt-0.5" style={{ fontFamily: "'Albert Sans', sans-serif" }}>2,847</p>
              <p className="text-xs font-medium mt-1" style={{ color: '#00B6A0' }}>+12% from last month</p>
            </div>
            <p className="text-xs text-stone-400 mt-2">Label → Value → Trend. Always in this order.</p>
          </div>

          {/* Detail card */}
          <div className="border border-stone-200 rounded-xl p-5">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Detail Card</p>
            <div className="rounded-lg border border-stone-200 p-4 hover:border-stone-300 hover:bg-stone-50/50 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-stone-900" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Item title</p>
                <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: '#4271DF10', color: '#4271DF' }}>Type</span>
              </div>
              <p className="text-xs text-stone-500">A short description of what this item represents and why it might matter to the reader.</p>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-stone-100">
                <span className="text-xs text-stone-400 font-mono">94% confidence</span>
                <span className="text-xs text-stone-400">12 links</span>
                <span className="text-xs text-stone-400">Updated 2h ago</span>
              </div>
            </div>
            <p className="text-xs text-stone-400 mt-2">Title + type → Description → Metadata footer.</p>
          </div>
        </div>
      </Section>

      {/* ── Alert & Status Cards ─────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Alert cards use semantic colors to convey urgency. The left accent bar provides an immediate visual cue. Dismissible alerts animate out on close.">
            <span>Alerts & Status</span>
          </Tooltip>
        </h2>
        {visibleAlerts.length > 0 ? (
          <div className="space-y-3">
            <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Interactive — click to dismiss</p>
            {visibleAlerts.map(a => (
              <div
                key={a.title}
                className="flex items-start rounded-xl overflow-hidden transition-all"
                style={{ backgroundColor: a.bg, border: `1px solid ${a.border}` }}
              >
                <div className="flex-1 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0" style={{ color: a.color }}>{a.icon}</span>
                    <p className="text-sm font-medium" style={{ color: a.color }}>{a.title}</p>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">{a.message}</p>
                </div>
                <button
                  className="px-3.5 py-3.5 flex-shrink-0 opacity-40 hover:opacity-100 transition-opacity"
                  onClick={() => setDismissedAlerts(p => new Set(p).add(a.title))}
                  aria-label={`Dismiss ${a.title}`}
                >
                  <TbX size={14} style={{ color: a.color }} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-stone-300 rounded-xl p-6 text-center">
            <p className="text-sm text-stone-500">All alerts dismissed.</p>
            <button
              className="mt-2 text-xs font-medium text-brand hover:underline"
              onClick={() => setDismissedAlerts(new Set())}
            >
              Reset alerts
            </button>
          </div>
        )}
        <div className="mt-3 bg-brand/5 rounded-lg px-4 py-3 border border-brand/10">
          <p className="text-xs text-brand">
            <strong>Rule:</strong> Alerts use semantic icons on a tinted background. Info (circle-i), Success (checkmark), Warning (triangle), Error (alert circle). Icon + title + message — consistent with the validation pattern of icon + text.
          </p>
        </div>
      </Section>

      {/* ── Tags & Badges ────────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Tags and badges are small, categorical labels that appear inside cards, tables, and lists. They use spectrum colors at low opacity for background with the full color for text.">
            <span>Tags & Badges</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-6 bg-white">
          <div className="space-y-5">
            {/* Removable spectrum tags */}
            <div>
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Spectrum Tags — click to remove</p>
              <div className="flex gap-2 flex-wrap min-h-[28px]">
                {[
                  { label: 'tag', color: '#4271DF' },
                  { label: 'connected', color: '#00B6A0' },
                  { label: 'pending review', color: '#E19000' },
                  { label: 'critical', color: '#F24260' },
                ].filter(t => !removedTags.has(t.label)).map(t => (
                  <button
                    key={t.label}
                    onClick={() => setRemovedTags(p => new Set(p).add(t.label))}
                    className="text-xs px-2.5 py-1 rounded-full inline-flex items-center gap-1 transition-all hover:opacity-80 active:opacity-60"
                    style={{ backgroundColor: t.color + '12', color: t.color, border: `1px solid ${t.color}25` }}
                  >
                    {t.label}
                    <TbX size={10} />
                  </button>
                ))}
                {removedTags.size > 0 && (
                  <button
                    onClick={() => setRemovedTags(new Set())}
                    className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
              <p className="text-xs text-stone-400 mt-2">Rounded-full, 8% background opacity, 15% border opacity.</p>
            </div>

            {/* Neutral tags */}
            <div>
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Neutral Tags</p>
              <div className="flex gap-2 flex-wrap">
                {['Category', 'Type', 'v2.1', 'Draft'].map(label => (
                  <span key={label} className="text-xs px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-200">{label}</span>
                ))}
              </div>
              <p className="text-xs text-stone-400 mt-2">For non-semantic metadata: types, versions, statuses without urgency.</p>
            </div>

            {/* Count badges */}
            <div>
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Count Badges</p>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-xs text-stone-600">
                  Notifications <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-semibold text-white" style={{ backgroundColor: '#F24260' }}>3</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-stone-600">
                  Connections <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-semibold text-white" style={{ backgroundColor: '#4271DF' }}>12</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-stone-600">
                  Updates <span className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-full text-[10px] font-semibold px-1.5" style={{ backgroundColor: '#E1900015', color: '#E19000' }}>5</span>
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-2">Solid fill for high urgency (notifications, errors). Tinted fill for informational counts.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Loading & Empty States ───────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Skeleton cards preserve layout during loading, preventing content shift. Empty states guide users toward action instead of showing a blank page.">
            <span>Loading & Empty States</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Skeleton */}
          <div className="border border-stone-200 rounded-xl p-5">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Skeleton Loading</p>
            <div className="rounded-lg border border-stone-200 p-4 space-y-3">
              <div className="h-3 w-28 bg-stone-200 rounded animate-pulse" />
              <div className="space-y-1.5">
                <div className="h-2 w-full bg-stone-100 rounded animate-pulse" />
                <div className="h-2 w-3/4 bg-stone-100 rounded animate-pulse" />
              </div>
              <div className="flex gap-2 pt-2 border-t border-stone-100">
                <div className="h-2 w-12 bg-stone-100 rounded animate-pulse" />
                <div className="h-2 w-16 bg-stone-100 rounded animate-pulse" />
                <div className="h-2 w-14 bg-stone-100 rounded animate-pulse" />
              </div>
            </div>
            <p className="text-xs text-stone-400 mt-2">Match the card's content structure. Animate with pulse. Use Stone 100-200 fills.</p>
          </div>

          {/* Empty state */}
          <div className="border border-stone-200 rounded-xl p-5">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Empty State</p>
            <div className="rounded-lg border border-dashed border-stone-300 p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-stone-400 text-lg">+</span>
              </div>
              <p className="text-sm font-medium text-stone-700">Nothing here yet</p>
              <p className="text-xs text-stone-400 mt-1">Add your first item to get started.</p>
              <button className="mt-3 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-brand transition-all hover:bg-brand-hover active:bg-brand-active btn-focus">Add Item</button>
            </div>
            <p className="text-xs text-stone-400 mt-2">Dashed border, icon, explanation, and a CTA. Never leave empty space unexplained.</p>
          </div>
        </div>
      </Section>

      {/* ── Dos & Don'ts ─────────────────────────────────────────── */}
      <Section title="Dos & Don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#008775' }}>Do</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Keep card content scannable: title, summary, metadata</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use consistent padding and radius across all cards</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Group related metadata in a footer row</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use spectrum tags sparingly for categorical color</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Show skeleton loaders that match card structure</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Provide a CTA in empty states</li>
            </ul>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Don't</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Overload cards with too many actions or data points</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use colored backgrounds on cards (white only)</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Mix card sizes in the same grid row</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Nest cards inside other cards</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use more than 3 tags per card</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Show empty space without an explanation or CTA</li>
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
