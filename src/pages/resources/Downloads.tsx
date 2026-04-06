import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'

export default function Downloads() {
  return (
    <PageShell
      title="Downloads"
      subtitle="Brand assets, templates, and resources for creating on-brand Spectrea materials."
    >
      {/* Asset packages */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="These asset packages contain everything you need to create on-brand materials. Always use assets from this kit — never recreate the logo or modify colors.">
            <span>Asset Packages</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: 'Logo Kit',
              description: 'All logo variations in SVG, PNG (1x, 2x, 4x), and PDF formats. Includes mark-only, wordmark-only, and full lockup in all color treatments.',
              contents: ['SVG (vector)', 'PNG @1x, @2x, @4x', 'PDF (print)', 'All color variations'],
            },
            {
              name: 'Color Palette',
              description: 'Complete color system in multiple formats for design tools and development.',
              contents: ['Figma variables', 'CSS custom properties', 'Tailwind config', 'ASE (Adobe Swatch)'],
            },
            {
              name: 'Typography',
              description: 'Font files and configuration for the three-font system.',
              contents: ['Google Fonts links', 'Font weight reference', 'Type scale tokens', 'Figma text styles'],
            },
            {
              name: 'Presentation Template',
              description: 'Slide deck template with all approved layouts and brand elements.',
              contents: ['Google Slides template', 'PowerPoint template', 'Keynote template', 'Slide masters'],
            },
            {
              name: 'Social Media Kit',
              description: 'Templates for social media profiles, posts, and story formats.',
              contents: ['Profile images (all platforms)', 'Post templates', 'Story templates', 'Cover images'],
            },
            {
              name: 'Email Templates',
              description: 'HTML email templates for transactional and marketing communications.',
              contents: ['Transactional HTML', 'Newsletter HTML', 'Signature HTML', 'Plain-text templates'],
            },
          ].map(pkg => (
            <div key={pkg.name} className="border border-stone-200 rounded-xl p-5">
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-semibold text-stone-900">{pkg.name}</p>
                <span className="text-xs font-mono text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">Coming soon</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">{pkg.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {pkg.contents.map(item => (
                  <span key={item} className="text-xs bg-stone-50 text-stone-500 px-2 py-0.5 rounded border border-stone-100">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Quick reference */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">Quick Reference</h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-2 bg-stone-50 border-b border-stone-200 px-4 py-2">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Resource</span>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Value</span>
          </div>
          {[
            { resource: 'Primary brand color', value: '#4271DF (Cobalt)' },
            { resource: 'Heading font', value: 'Albert Sans — Google Fonts' },
            { resource: 'Body font', value: 'Lexend — Google Fonts' },
            { resource: 'Mono font', value: 'JetBrains Mono — Google Fonts' },
            { resource: 'Brand gradient', value: 'linear-gradient(135deg, #4271DF, #00B6A0, #E19000)' },
            { resource: 'Icon library', value: 'Lucide Icons (outline, 1.5px stroke)' },
            { resource: 'Border radius (cards)', value: '12px (rounded-xl)' },
            { resource: 'Border radius (buttons)', value: '8px (rounded-lg)' },
          ].map((row, i) => (
            <div key={row.resource} className="grid grid-cols-2 px-4 py-2.5" style={{ borderBottom: i < 7 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-sm text-stone-700">{row.resource}</span>
              <span className="text-xs font-mono text-stone-600">{row.value}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* CSS tokens */}
      <Section title="CSS Tokens">
        <div className="bg-stone-900 rounded-xl p-5 overflow-x-auto">
          <pre className="text-xs leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#9CA3AF' }}>
{`:root {
  /* Colors */
  --color-brand: #4271DF;
  --color-brand-teal: #00B6A0;
  --color-brand-amber: #E19000;
  --color-brand-rose: #F43F5E;
  --color-ink: #111827;
  --color-snow: #F9FAFB;
  --color-gray: #9CA3AF;

  /* Typography */
  --font-heading: 'Albert Sans', sans-serif;
  --font-body: 'Lexend', 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --radius-lg: 8px;
  --radius-xl: 12px;
}`}
          </pre>
        </div>
      </Section>
    </PageShell>
  )
}
