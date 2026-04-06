import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { TbChevronRight } from 'react-icons/tb'

export default function Cards() {
  return (
    <PageShell
      title="Cards"
      subtitle="Card patterns, elevation, and content layout for Spectrea UI."
    >
      {/* Card types */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Cards are the primary container for grouped content. They create visual separation on the Snow surface and give content a 'home.' Every card follows the same border, radius, and padding rules.">
            <span>Card Variants</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Default card */}
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Default</p>
            <div className="border border-stone-200 rounded-xl p-5 bg-white">
              <p className="text-sm font-semibold text-stone-900" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Revenue Model</p>
              <p className="text-xs text-stone-500 mt-1">Financial entity with 12 connections across 3 domains.</p>
              <div className="flex gap-2 mt-3">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#4271DF15', color: '#4271DF', border: '1px solid #4271DF30' }}>entity</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#00B6A015', color: '#00B6A0', border: '1px solid #00B6A030' }}>connected</span>
              </div>
            </div>
            <p className="text-xs text-stone-400 mt-2">White background, Stone 200 border, rounded-xl.</p>
          </div>

          {/* Elevated card */}
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Elevated</p>
            <div className="rounded-xl p-5 bg-white shadow-md border border-stone-100">
              <p className="text-sm font-semibold text-stone-900" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Quick Stats</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div>
                  <p className="text-lg font-semibold text-stone-900" style={{ fontFamily: "'Albert Sans', sans-serif" }}>2.8k</p>
                  <p className="text-xs text-stone-500">Entities</p>
                </div>
                <div>
                  <p className="text-lg font-semibold" style={{ fontFamily: "'Albert Sans', sans-serif", color: '#00B6A0' }}>+23%</p>
                  <p className="text-xs text-stone-500">Growth</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-stone-400 mt-2">Shadow-md for popovers, dropdowns, modals.</p>
          </div>

          {/* Interactive card */}
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Interactive</p>
            <div className="border border-stone-200 rounded-xl p-5 bg-white hover:border-stone-300 hover:bg-stone-50 transition-all cursor-pointer">
              <p className="text-sm font-semibold text-stone-900" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Knowledge Graph</p>
              <p className="text-xs text-stone-500 mt-1">Explore connections between entities and claims.</p>
              <div className="flex items-center gap-1 mt-3">
                <span className="text-xs font-medium" style={{ color: '#4271DF' }}>Open graph</span>
                <TbChevronRight size={12} style={{ color: '#4271DF' }} />
              </div>
            </div>
            <p className="text-xs text-stone-400 mt-2">Hover state: border darkens, subtle bg shift.</p>
          </div>
        </div>
      </Section>

      {/* Card specs */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">Specifications</h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { prop: 'Border', value: '1px solid Stone 200 (#E5E7EB)', note: 'Default container border' },
            { prop: 'Border radius', value: '12px (rounded-xl)', note: 'Friendly, modern corners' },
            { prop: 'Padding', value: '20px (p-5)', note: 'Comfortable inner spacing' },
            { prop: 'Background', value: 'White #FFFFFF', note: 'Cards sit on the Snow surface' },
            { prop: 'Shadow (elevated)', value: 'shadow-md', note: 'For floating elements only' },
            { prop: 'Hover border', value: 'Stone 300 (#D1D5DB)', note: 'Subtle darkening on interactive cards' },
            { prop: 'Card gap', value: '16px (gap-4)', note: 'Space between cards in a grid' },
            { prop: 'Title font', value: 'Albert Sans Semibold 600', note: 'Card titles use heading font' },
          ].map((row, i) => (
            <div key={row.prop} className="grid grid-cols-3 px-4 py-2.5" style={{ borderBottom: i < 7 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-sm font-medium text-stone-700">{row.prop}</span>
              <span className="text-xs font-mono text-stone-600">{row.value}</span>
              <span className="text-xs text-stone-500">{row.note}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Card content patterns */}
      <Section title="Content Patterns">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Stat card */}
          <div className="border border-stone-200 rounded-xl p-5">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Stat Card</p>
            <div className="rounded-lg border border-stone-200 p-4">
              <p className="text-xs text-stone-500">Active Entities</p>
              <p className="text-2xl font-semibold text-stone-900 mt-0.5" style={{ fontFamily: "'Albert Sans', sans-serif" }}>2,847</p>
              <p className="text-xs font-medium mt-1" style={{ color: '#00B6A0' }}>+12% from last month</p>
            </div>
            <p className="text-xs text-stone-400 mt-2">Label → Value → Trend. Always in this order.</p>
          </div>

          {/* Entity card */}
          <div className="border border-stone-200 rounded-xl p-5">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Entity Card</p>
            <div className="rounded-lg border border-stone-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-stone-900" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Revenue Model</p>
                <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: '#4271DF10', color: '#4271DF' }}>Financial</span>
              </div>
              <p className="text-xs text-stone-500">Quarterly revenue projections based on current pipeline data and historical conversion rates.</p>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-stone-100">
                <span className="text-xs text-stone-400 font-mono">94% trust</span>
                <span className="text-xs text-stone-400">12 connections</span>
                <span className="text-xs text-stone-400">Updated 2h ago</span>
              </div>
            </div>
            <p className="text-xs text-stone-400 mt-2">Title + type → Description → Metadata footer.</p>
          </div>
        </div>
      </Section>

      {/* Do/Don't */}
      <Section title="Card Dos & Don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-emerald-800 mb-3">Do</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Keep card content scannable — title, summary, metadata</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Use consistent padding and border radius across all cards</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Group related metadata in a footer row</li>
              <li className="flex gap-2"><span className="text-emerald-500">&#10003;</span>Use spectrum tags sparingly for categorical color</li>
            </ul>
          </div>
          <div className="border border-red-200 bg-red-50/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-red-700 mb-3">Don't</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Overload cards with too many actions or data points</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Use colored backgrounds on cards (white only)</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Mix card sizes in the same grid row</li>
              <li className="flex gap-2"><span className="text-red-400">&#10007;</span>Nest cards inside other cards</li>
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
