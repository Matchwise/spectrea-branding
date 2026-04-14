import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { TbFileText, TbFileTypePdf, TbRobot } from 'react-icons/tb'

export default function Downloads() {
  return (
    <PageShell
      title="Downloads"
      subtitle="Brand assets, templates, and resources for creating on-brand Spectrea materials."
    >
      {/* Guide documents — available now */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-1">
          <Tooltip content="The complete brand guide in two formats. The Markdown version is the single source of truth and is optimised for LLMs and automation. The PDF is for humans who want offline / print reference.">
            <span>The Brand Guide</span>
          </Tooltip>
        </h2>
        <p className="text-xs text-stone-500 mb-4">Both files are the same content — pick whichever format suits your workflow.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="/brand-guide.md"
            download
            className="group flex flex-col gap-2 p-5 rounded-xl border border-stone-200 hover:border-brand/40 hover:bg-brand/5 transition-all"
          >
            <div className="flex items-center justify-between">
              <TbFileText size={22} className="text-brand" />
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Canonical</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900 group-hover:text-brand transition-colors">brand-guide.md</p>
              <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">Full brand guide in Markdown. Source of truth. LLM-friendly.</p>
            </div>
          </a>
          <a
            href="/brand-guide.pdf"
            download
            className="group flex flex-col gap-2 p-5 rounded-xl border border-stone-200 hover:border-brand/40 hover:bg-brand/5 transition-all"
          >
            <div className="flex items-center justify-between">
              <TbFileTypePdf size={22} className="text-brand" />
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Printable</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900 group-hover:text-brand transition-colors">brand-guide.pdf</p>
              <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">PDF version rendered from the same Markdown. For offline reading.</p>
            </div>
          </a>
          <a
            href="/llms.txt"
            download
            className="group flex flex-col gap-2 p-5 rounded-xl border border-stone-200 hover:border-brand/40 hover:bg-brand/5 transition-all"
          >
            <div className="flex items-center justify-between">
              <TbRobot size={22} className="text-brand" />
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">LLM index</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900 group-hover:text-brand transition-colors">llms.txt</p>
              <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">Small index file per <code className="font-mono text-[11px]">llmstxt.org</code>. Points AI tools at the canonical docs.</p>
            </div>
          </a>
        </div>
        <div className="mt-3 bg-stone-50 rounded-lg px-4 py-3 border border-stone-100">
          <p className="text-xs text-stone-600 leading-relaxed">
            <strong>LLM readability:</strong> the <code className="font-mono text-[11px]">brand-guide.md</code> and <code className="font-mono text-[11px]">llms.txt</code> files are designed for AI tools (Claude, ChatGPT browsing, Perplexity) to read directly. <code className="font-mono text-[11px]">robots.txt</code> explicitly allows GPTBot, ClaudeBot, CCBot, PerplexityBot, and Google-Extended.
          </p>
          <p className="text-xs text-stone-600 leading-relaxed mt-2">
            <strong>Visual assets</strong> for the guide (logo marks, lockups, colour swatches, gradient strips, type samples) live in <code className="font-mono text-[11px]">/brand-assets/</code> as standalone SVGs. They're referenced from the Markdown, embedded in the PDF, and regenerable from <code className="font-mono text-[11px]">npm run generate:assets</code>.
          </p>
          <p className="text-xs text-stone-600 leading-relaxed mt-2">
            <strong>Regeneration:</strong> edit <code className="font-mono text-[11px]">public/brand-guide.md</code> → run <code className="font-mono text-[11px]">npm run generate:all</code> to rebuild assets + PDF in one step.
          </p>
        </div>
      </Section>

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
            { resource: 'Brand gradient', value: 'linear-gradient(135deg in oklch, #4271DF, #00B6A0, #E19000)  —  sRGB fallback for <Chrome 111 / <Safari 16.2 / <Firefox 117' },
            { resource: 'Icon library', value: 'Tabler Icons via react-icons/tb (outline, 2px stroke)' },
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
        <div className="bg-ink rounded-xl p-5 overflow-x-auto">
          <pre className="text-xs leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#97979E' }}>
{`:root {
  /* Colors */
  --color-brand: #4271DF;
  --color-brand-teal: #00B6A0;
  --color-brand-amber: #E19000;
  --color-brand-rose: #F24260;
  --color-canvas: #FDFDFB;
  --color-cloud: #F4F4F1;
  --color-pewter: #97979E;
  --color-graphite: #212226;
  --color-ink: #18181C;

  /* Typography */
  --font-heading: 'Albert Sans', sans-serif;
  --font-body: 'Lexend', 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --radius-lg: 8px;
  --radius-xl: 12px;
}

/* Brand gradient — OKLCH with sRGB fallback for cross-browser safety.
   Chrome <111, Safari <16.2, Firefox <117 keep the sRGB version;
   modern browsers upgrade to perceptual interpolation. */
.brand-gradient {
  background: linear-gradient(135deg, #4271DF, #00B6A0, #E19000);
}
@supports (background: linear-gradient(in oklch, red, blue)) {
  .brand-gradient {
    background: linear-gradient(135deg in oklch, #4271DF, #00B6A0, #E19000);
  }
}`}
          </pre>
        </div>
      </Section>
    </PageShell>
  )
}
