import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { StaticLogo } from '../../components/brand/SpectreaLogo'

/* ------------------------------------------------------------------ */

export default function LayoutPage() {
  return (
    <PageShell
      title="Layout"
      subtitle="Grid systems, spacing scale, elevation, and page structure for Spectrea interfaces."
    >
      {/* ── Page Structure ───────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Every Spectrea page follows the same shell: a fixed sidebar, a top bar, and a scrollable main content area. This ensures users always know where they are and how to navigate.">
            <span>Page Structure</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="flex h-64">
            {/* Sidebar mock */}
            <div className="w-48 border-r border-stone-200 bg-white p-3 flex-shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <StaticLogo size={24} />
                <span className="text-xs font-heading font-semibold text-stone-900">Spectrea</span>
              </div>
              {['Overview', 'Entities', 'Graph', 'Documents', 'Settings'].map((item, i) => (
                <div key={item} className={`px-2 py-1.5 rounded-md text-xs mb-0.5 ${i === 1 ? 'bg-stone-100 text-stone-900 font-medium' : 'text-stone-400'}`}>
                  {item}
                </div>
              ))}
            </div>
            {/* Main area */}
            <div className="flex-1 flex flex-col">
              {/* Top bar */}
              <div className="h-10 border-b border-stone-200 bg-white px-4 flex items-center justify-between flex-shrink-0">
                <span className="text-xs text-stone-400">Breadcrumb / Search</span>
                <div className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-stone-200" />
                </div>
              </div>
              {/* Content */}
              <div className="flex-1 bg-stone-50 p-4 overflow-hidden">
                <div className="bg-white rounded-lg border border-stone-200 p-3 mb-3">
                  <div className="h-2 w-32 bg-stone-200 rounded mb-2" />
                  <div className="h-2 w-48 bg-stone-100 rounded" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="bg-white rounded-lg border border-stone-200 p-3">
                      <div className="h-2 w-16 bg-stone-200 rounded mb-2" />
                      <div className="h-6 w-12 bg-stone-100 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {[
            { label: 'Sidebar', value: '256px fixed width', note: 'Collapsible on mobile' },
            { label: 'Top Bar', value: '40-48px height', note: 'Search + user menu' },
            { label: 'Content Area', value: 'Fluid, scrollable', note: 'Snow (#F9FAFB) background' },
          ].map(s => (
            <div key={s.label} className="bg-stone-50 rounded-lg px-3 py-2 border border-stone-100 text-center">
              <p className="text-xs font-semibold text-stone-500">{s.label}</p>
              <p className="text-xs font-mono text-stone-400">{s.value}</p>
              <p className="text-[10px] text-stone-400 mt-0.5">{s.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Spacing Scale ────────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Consistent spacing creates rhythm. Spectrea uses a 4px base unit. All spacing values are multiples of 4. This prevents arbitrary values and keeps the UI harmonious.">
            <span>Spacing Scale</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { name: '2xs', value: '4px', tw: 'p-1', use: 'Tight inline spacing, icon gaps' },
            { name: 'xs', value: '8px', tw: 'p-2', use: 'Input padding, badge padding, compact gaps' },
            { name: 'sm', value: '12px', tw: 'p-3', use: 'Card internal padding (compact), list item gaps' },
            { name: 'md', value: '16px', tw: 'p-4', use: 'Default content gap, section padding' },
            { name: 'lg', value: '20px', tw: 'p-5', use: 'Card padding (default), modal padding' },
            { name: 'xl', value: '24px', tw: 'p-6', use: 'Section spacing, form field gaps' },
            { name: '2xl', value: '32px', tw: 'p-8', use: 'Major section breaks' },
            { name: '3xl', value: '48px', tw: 'p-12', use: 'Page top padding, hero spacing' },
          ].map((row, i) => (
            <div key={row.name} className="flex items-center gap-4 px-4 py-2.5" style={{ borderBottom: i < 7 ? '1px solid #F3F4F6' : 'none' }}>
              <div className="w-12 flex-shrink-0">
                <span className="text-xs font-semibold text-stone-500">{row.name}</span>
              </div>
              <div className="w-14 flex-shrink-0">
                <span className="text-xs font-mono text-stone-600">{row.value}</span>
              </div>
              <div className="w-16 flex-shrink-0">
                <div className="h-3 rounded" style={{ width: row.value, backgroundColor: '#4271DF' }} />
              </div>
              <div className="w-14 flex-shrink-0">
                <span className="text-xs font-mono text-stone-400">{row.tw}</span>
              </div>
              <span className="text-xs text-stone-500">{row.use}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 bg-brand/5 rounded-lg px-4 py-3 border border-brand/10">
          <p className="text-xs text-brand">
            <strong>Rule:</strong> Primary spacing (margins, section padding, gaps between elements) uses the 4px grid. Small inline elements — badges, labels, compact controls — may use 2px increments (6px, 10px) for fine control. Never use arbitrary values like 5px, 7px, or 15px.
          </p>
        </div>
      </Section>

      {/* ── Grid System ──────────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="The content area uses a responsive grid. Column counts change at breakpoints. Gap stays consistent at 16px. Tailwind's grid utilities handle all layout.">
            <span>Grid System</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 bg-stone-50 border-b border-stone-200 px-4 py-2">
            {['Breakpoint', 'Width', 'Columns', 'Usage'].map(h => (
              <span key={h} className="text-xs font-semibold text-stone-400 uppercase tracking-wider">{h}</span>
            ))}
          </div>
          {[
            { bp: 'Mobile', width: '<640px', cols: '1 column', usage: 'Stacked cards, full-width forms' },
            { bp: 'Tablet', width: '640-1023px', cols: '2 columns', usage: 'Side-by-side cards, split views' },
            { bp: 'Desktop', width: '1024-1279px', cols: '3 columns', usage: 'Dashboard grids, entity listings' },
            { bp: 'Wide', width: '1280px+', cols: '4 columns', usage: 'Dense dashboards, data tables' },
          ].map((row, i) => (
            <div key={row.bp} className="grid grid-cols-4 px-4 py-2.5" style={{ borderBottom: i < 3 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-sm font-medium text-stone-700">{row.bp}</span>
              <span className="text-xs font-mono text-stone-600">{row.width}</span>
              <span className="text-xs font-mono text-brand">{row.cols}</span>
              <span className="text-xs text-stone-500">{row.usage}</span>
            </div>
          ))}
        </div>
        {/* Visual grid demo */}
        <div className="mt-4 border border-stone-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Grid Preview (Desktop: 3 columns)</p>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-12 rounded-lg flex items-center justify-center text-xs font-mono" style={{ backgroundColor: '#4271DF10', color: '#4271DF', border: '1px dashed #4271DF30' }}>
                {i}
              </div>
            ))}
          </div>
          <p className="text-xs text-stone-400 mt-2">16px gap between cells. Cards fill available width within their column.</p>
        </div>
      </Section>

      {/* ── Content Width ────────────────────────────────────────── */}
      <Section title="Content Width">
        <div className="space-y-3">
          {[
            { label: 'Max content width', value: '768px (max-w-3xl)', note: 'For reading-focused pages: docs, settings, forms' },
            { label: 'Max dashboard width', value: 'Full width', note: 'Dashboards and data views use all available space' },
            { label: 'Max prose width', value: '65ch (max-w-prose)', note: 'For long-form text blocks within any page' },
          ].map(item => (
            <div key={item.label} className="bg-stone-50 rounded-lg px-4 py-3 border border-stone-100 flex items-center gap-4">
              <div className="w-40 flex-shrink-0">
                <p className="text-sm font-medium text-stone-700">{item.label}</p>
              </div>
              <span className="text-xs font-mono text-brand">{item.value}</span>
              <span className="text-xs text-stone-500">{item.note}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Elevation & Z-Index ──────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Elevation creates visual hierarchy through shadow and z-index. Higher elements feel closer to the user. Use elevation sparingly — most UI sits at the base level.">
            <span>Elevation & Z-Index</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { level: 'Base', z: '0', shadow: 'none', use: 'Page content, cards, sections', example: 'bg-white border' },
            { level: 'Raised', z: '10', shadow: 'shadow-sm', use: 'Sticky headers, toolbars', example: 'shadow-sm' },
            { level: 'Dropdown', z: '20', shadow: 'shadow-md', use: 'Dropdowns, popovers, tooltips', example: 'shadow-md' },
            { level: 'Modal', z: '30', shadow: 'shadow-lg', use: 'Modals, dialogs, slide-overs', example: 'shadow-lg' },
            { level: 'Overlay', z: '40', shadow: 'shadow-xl', use: 'Modal backdrops, full-screen overlays', example: 'shadow-xl' },
            { level: 'Toast', z: '50', shadow: 'shadow-lg', use: 'Notifications, toasts (above everything)', example: 'shadow-lg' },
          ].map((row, i) => (
            <div key={row.level} className="grid grid-cols-5 px-4 py-3 items-center" style={{ borderBottom: i < 5 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-sm font-medium text-stone-700">{row.level}</span>
              <span className="text-xs font-mono text-brand">z-{row.z}</span>
              <span className="text-xs font-mono text-stone-600">{row.shadow}</span>
              <span className="text-xs text-stone-500">{row.use}</span>
              <div className="flex justify-end">
                <div className={`w-10 h-6 bg-white rounded border border-stone-200 ${row.example}`} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 bg-stone-50 rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-stone-600">
            <strong>Convention:</strong> Z-index values increment by 10 to leave room for intermediate layers. Never use arbitrary z-index values outside this scale.
          </p>
        </div>
      </Section>

      {/* ── Border Radius ────────────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Spectrea uses rounded corners throughout. Larger containers get larger radii. Small inline elements get smaller radii. This creates a consistent visual warmth.">
            <span>Border Radius</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { name: 'sm', value: '4px', tw: 'rounded', use: 'Tags, badges, inline code' },
            { name: 'md', value: '6px', tw: 'rounded-md', use: 'Compact buttons, small controls' },
            { name: 'lg', value: '8px', tw: 'rounded-lg', use: 'Buttons, inputs, dropdowns' },
            { name: 'xl', value: '12px', tw: 'rounded-xl', use: 'Cards, panels, modals' },
            { name: '2xl', value: '16px', tw: 'rounded-2xl', use: 'Hero sections, large feature cards' },
            { name: 'full', value: '9999px', tw: 'rounded-full', use: 'Avatars, spectrum tags, toggles' },
          ].map((row, i) => (
            <div key={row.name} className="flex items-center gap-4 px-4 py-2.5" style={{ borderBottom: i < 5 ? '1px solid #F3F4F6' : 'none' }}>
              <div className="w-12 flex-shrink-0">
                <span className="text-xs font-semibold text-stone-500">{row.name}</span>
              </div>
              <div className="w-14 flex-shrink-0">
                <span className="text-xs font-mono text-stone-600">{row.value}</span>
              </div>
              <div className="w-12 flex-shrink-0">
                <div className="w-10 h-8 bg-stone-200" style={{ borderRadius: row.value === '9999px' ? '9999px' : row.value }} />
              </div>
              <div className="w-24 flex-shrink-0">
                <span className="text-xs font-mono text-stone-400">{row.tw}</span>
              </div>
              <span className="text-xs text-stone-500">{row.use}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Responsive Behavior ──────────────────────────────────── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Spectrea must work well from mobile to ultrawide. These rules ensure consistent behavior across breakpoints without device-specific hacks.">
            <span>Responsive Behavior</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { rule: 'Sidebar collapses to overlay on mobile', detail: 'Below 1024px, the sidebar becomes a slide-over panel triggered by the menu button.' },
            { rule: 'Grids collapse to single column', detail: 'Below 640px, all multi-column grids stack vertically. Cards go full-width.' },
            { rule: 'Tables scroll horizontally', detail: 'Don\'t hide columns. Wrap the table in a horizontal scroll container with a fade edge.' },
            { rule: 'Touch targets: 44px minimum', detail: 'Buttons, links, and interactive elements must be at least 44x44px on touch devices.' },
            { rule: 'Modals become full-screen on mobile', detail: 'Below 640px, modals take the full viewport. No side margins, full-height content.' },
            { rule: 'Heading sizes scale down at breakpoints', detail: 'Body text stays at 16px minimum. Headings reduce proportionally — see Typography for the full responsive scaling table.' },
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
