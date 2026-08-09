import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { Logotype } from '../../components/brand/SpectreaLogo'
import { brandTokens, components, selectedPalette } from '../../data/brand'

/* Layout, spacing, radii, and elevation specs render canon
   (components.layout + brandTokens, decision 31); demo mock-ups stay
   page-side. */
const L = components.layout
const HEX = (name: string) => {
  const c = selectedPalette.colors.find(x => x.name === name)
  if (!c) throw new Error(`palette colour missing from canon: ${name}`)
  return c.hex
}
const GRID_GAP = (() => {
  const s = brandTokens.spacing.scale.find(x => x.token === L.gridGapToken)
  if (!s) throw new Error('layout gridGapToken missing from canon')
  return s
})()

/* ------------------------------------------------------------------ */

export default function LayoutPage() {
  return (
    <PageShell
      title="Layout"
      subtitle="The scaffolding underneath every Spectrea surface — grids, spacing, elevation. The part users never notice, which is the point."
    >
      {/* ── Page Structure ───────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Every Spectrea page follows the same shell: a fixed sidebar, a top bar, and a scrollable main content area. This ensures users always know where they are and how to navigate.">
            <span>Page Structure</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-x-auto">
          <div className="flex h-64 min-w-[560px]">
            {/* Sidebar mock */}
            <div className="w-48 border-r border-stone-200 bg-white p-3 flex-shrink-0">
              <div className="mb-4">
                <Logotype fontSize={11} colorMode="ink" />
              </div>
              {['Overview', 'Library', 'Connections', 'Documents', 'Settings'].map((item, i) => (
                <div key={item} className={`px-2 py-1.5 rounded-md text-xs mb-0.5 ${i === 1 ? 'bg-cloud text-ink font-medium' : 'text-pewter'}`}>
                  {item}
                </div>
              ))}
            </div>
            {/* Main area */}
            <div className="flex-1 flex flex-col">
              {/* Top bar */}
              <div className="h-10 border-b border-stone-200 bg-white px-4 flex items-center justify-between flex-shrink-0">
                <span className="text-xs text-pewter">Breadcrumb / Search</span>
                <div className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-stone-200" />
                </div>
              </div>
              {/* Content */}
              <div className="flex-1 bg-cloud p-4 overflow-hidden">
                <div className="bg-white rounded-lg border border-stone-200 p-3 mb-3">
                  <div className="h-2 w-32 bg-stone-200 rounded mb-2" />
                  <div className="h-2 w-48 bg-cloud rounded" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="bg-white rounded-lg border border-stone-200 p-3">
                      <div className="h-2 w-16 bg-stone-200 rounded mb-2" />
                      <div className="h-6 w-12 bg-cloud rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {[
            { label: 'Sidebar', value: `${L.sidebar.widthPx}px`, note: L.sidebar.note },
            { label: 'Top Bar', value: `${L.topBar.height} height`, note: L.topBar.note },
            { label: 'Content Area', value: L.contentArea.note, note: `${L.contentArea.background} (${HEX(L.contentArea.background)}) background` },
          ].map(s => (
            <div key={s.label} className="bg-cloud rounded-lg px-3 py-2 border border-stone-100 text-center">
              <p className="text-xs font-semibold text-slate">{s.label}</p>
              <p className="text-xs font-mono text-slate">{s.value}</p>
              <p className="text-xs text-pewter mt-0.5">{s.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Spacing Scale ────────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content={`Consistent spacing creates rhythm. ${brandTokens.spacing.baseUnit}px base unit — ${brandTokens.spacing.rule}`}>
            <span>Spacing Scale</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {brandTokens.spacing.scale.map(s => ({ name: s.token, value: `${s.px}px`, tw: s.tailwind, use: s.use })).map((row, i) => (
            <div key={row.name} className="flex items-center gap-4 px-4 py-2.5" style={{ borderBottom: i < 7 ? '1px solid #F3F4F6' : 'none' }}>
              <div className="w-12 flex-shrink-0">
                <span className="text-xs font-semibold text-slate">{row.name}</span>
              </div>
              <div className="w-14 flex-shrink-0">
                <span className="text-xs font-mono text-iron">{row.value}</span>
              </div>
              <div className="w-16 flex-shrink-0">
                <div className="h-3 rounded" style={{ width: row.value, backgroundColor: '#4271DF' }} />
              </div>
              <div className="w-14 flex-shrink-0">
                <span className="text-xs font-mono text-pewter">{row.tw}</span>
              </div>
              <span className="text-xs text-slate">{row.use}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 bg-brand/5 rounded-lg px-4 py-3 border border-brand/10">
          <p className="text-xs text-brand">
            <strong>Rule:</strong> {brandTokens.spacing.baseUnit}px base unit. {brandTokens.spacing.rule}
          </p>
        </div>
      </Section>

      {/* ── Grid System ──────────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content={`The content area uses a responsive grid. Column counts change at breakpoints. Gap stays consistent at ${GRID_GAP.px}px. Tailwind's grid utilities handle all layout.`}>
            <span>Grid System</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-x-auto">
          <div className="min-w-[560px]">
          <div className="grid grid-cols-4 bg-cloud border-b border-stone-200 px-4 py-2">
            {['Breakpoint', 'Width', 'Columns', 'Usage'].map(h => (
              <span key={h} className="text-xs font-semibold text-pewter uppercase tracking-wider">{h}</span>
            ))}
          </div>
          {L.breakpoints.map(b => ({ bp: b.name, width: b.range, cols: `${b.cols} ${b.cols === 1 ? 'column' : 'columns'}`, usage: b.use })).map((row, i) => (
            <div key={row.bp} className="grid grid-cols-4 px-4 py-2.5" style={{ borderBottom: i < 3 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-sm font-medium text-iron">{row.bp}</span>
              <span className="text-xs font-mono text-iron">{row.width}</span>
              <span className="text-xs font-mono text-brand">{row.cols}</span>
              <span className="text-xs text-slate">{row.usage}</span>
            </div>
          ))}
          </div>
        </div>
        {/* Visual grid demo */}
        <div className="mt-4 border border-stone-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-3">Grid Preview (Desktop: 3 columns)</p>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-12 rounded-lg flex items-center justify-center text-xs font-mono" style={{ backgroundColor: '#4271DF10', color: '#4271DF', border: '1px dashed #4271DF30' }}>
                {i}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate mt-2">{GRID_GAP.px}px gap between cells. Cards fill available width within their column.</p>
        </div>
      </Section>

      {/* ── Content Width ────────────────────────────────────────── */}
      <Section title="Content Width">
        <div className="space-y-3">
          {L.contentWidths.map(w => ({ label: w.label, value: w.value, note: w.use })).map(item => (
            <div key={item.label} className="bg-cloud rounded-lg px-4 py-3 border border-stone-100 flex items-center gap-4">
              <div className="w-40 flex-shrink-0">
                <p className="text-sm font-medium text-iron">{item.label}</p>
              </div>
              <span className="text-xs font-mono text-brand">{item.value}</span>
              <span className="text-xs text-slate">{item.note}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Elevation & Z-Index ──────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Elevation creates visual hierarchy through shadow and z-index. Higher elements feel closer to the user. Use elevation sparingly — most UI sits at the base level.">
            <span>Elevation & Z-Index</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-x-auto">
          <div className="min-w-[600px]">
          {brandTokens.elevation.map(e => ({ level: e.level, z: String(e.zIndex), shadow: e.shadow, use: e.use, example: e.shadow === 'none' ? 'bg-white border' : e.shadow })).map((row, i) => (
            <div key={row.level} className="grid grid-cols-5 px-4 py-3 items-center" style={{ borderBottom: i < 5 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-sm font-medium text-iron">{row.level}</span>
              <span className="text-xs font-mono text-brand">z-{row.z}</span>
              <span className="text-xs font-mono text-iron">{row.shadow}</span>
              <span className="text-xs text-slate">{row.use}</span>
              <div className="flex justify-end">
                <div className={`w-10 h-6 bg-white rounded border border-stone-200 ${row.example}`} />
              </div>
            </div>
          ))}
          </div>
        </div>
        <div className="mt-3 bg-cloud rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-iron">
            <strong>Convention:</strong> {L.elevationRule}
          </p>
        </div>
      </Section>

      {/* ── Border Radius ────────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Spectrea uses rounded corners throughout. Larger containers get larger radii. Small inline elements get smaller radii. This creates a consistent visual warmth.">
            <span>Border Radius</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {brandTokens.radii.map(r => ({ name: r.token, value: `${r.px}px`, tw: r.tailwind, use: r.use })).map((row, i) => (
            <div key={row.name} className="flex items-center gap-4 px-4 py-2.5" style={{ borderBottom: i < 5 ? '1px solid #F3F4F6' : 'none' }}>
              <div className="w-12 flex-shrink-0">
                <span className="text-xs font-semibold text-slate">{row.name}</span>
              </div>
              <div className="w-14 flex-shrink-0">
                <span className="text-xs font-mono text-iron">{row.value}</span>
              </div>
              <div className="w-12 flex-shrink-0">
                <div className="w-10 h-8 bg-stone-200" style={{ borderRadius: row.value === '9999px' ? '9999px' : row.value }} />
              </div>
              <div className="w-24 flex-shrink-0">
                <span className="text-xs font-mono text-pewter">{row.tw}</span>
              </div>
              <span className="text-xs text-slate">{row.use}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Responsive Behavior ──────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Spectrea must work well from mobile to ultrawide. These rules ensure consistent behavior across breakpoints without device-specific hacks.">
            <span>Responsive Behavior</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {L.responsiveRules.map(item => (
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
