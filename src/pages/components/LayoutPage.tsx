import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'

export default function LayoutPage() {
  return (
    <PageShell
      title="Layout"
      subtitle="Grid systems, spacing scale, and page structure for Spectrea interfaces."
    >
      {/* Page structure */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Every Spectrea page follows the same shell: a fixed sidebar, a top bar, and a scrollable main content area. This ensures users always know where they are.">
            <span>Page Structure</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="flex h-64">
            {/* Sidebar mock */}
            <div className="w-48 border-r border-stone-200 bg-white p-3 flex-shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-md" style={{ background: 'linear-gradient(135deg, #4271DF, #00B6A0, #E19000)' }} />
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
          <div className="bg-stone-50 rounded-lg px-3 py-2 border border-stone-100 text-center">
            <p className="text-xs font-semibold text-stone-500">Sidebar</p>
            <p className="text-xs text-stone-400">256px fixed width</p>
          </div>
          <div className="bg-stone-50 rounded-lg px-3 py-2 border border-stone-100 text-center">
            <p className="text-xs font-semibold text-stone-500">Top Bar</p>
            <p className="text-xs text-stone-400">40-48px height</p>
          </div>
          <div className="bg-stone-50 rounded-lg px-3 py-2 border border-stone-100 text-center">
            <p className="text-xs font-semibold text-stone-500">Content</p>
            <p className="text-xs text-stone-400">Fluid, scrollable</p>
          </div>
        </div>
      </Section>

      {/* Spacing scale */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Consistent spacing creates rhythm. Spectrea uses a 4px base unit. All spacing values are multiples of 4.">
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
              <div className="w-16 flex-shrink-0">
                <span className="text-xs font-semibold text-stone-500">{row.name}</span>
              </div>
              <div className="w-16 flex-shrink-0">
                <span className="text-xs font-mono text-stone-600">{row.value}</span>
              </div>
              <div className="w-16 flex-shrink-0">
                <div className="h-3 rounded" style={{ width: row.value, backgroundColor: '#4271DF' }} />
              </div>
              <div className="w-16 flex-shrink-0">
                <span className="text-xs font-mono text-stone-400">{row.tw}</span>
              </div>
              <span className="text-xs text-stone-500">{row.use}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Grid */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="The content area uses a responsive grid. Column counts change at breakpoints. Gap stays consistent at 16px.">
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
            { bp: 'Tablet', width: '640–1023px', cols: '2 columns', usage: 'Side-by-side cards, split views' },
            { bp: 'Desktop', width: '1024–1279px', cols: '3 columns', usage: 'Dashboard grids, entity listings' },
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
      </Section>

      {/* Content width */}
      <Section title="Content Width">
        <div className="space-y-3">
          {[
            { label: 'Max content width', value: '768px (max-w-3xl)', note: 'For reading-focused pages (docs, settings, forms)' },
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
    </PageShell>
  )
}
