import { useEffect, useState } from 'react'
import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { TbFileText, TbFileTypePdf, TbRobot, TbDownload, TbBrandCss3, TbBrandTailwind } from 'react-icons/tb'
import manifest from '../../data/brand-assets-manifest.json'
import { brandTokens } from '../../data/brand'

interface ManifestItem {
  path: string
  label: string
  desc: string
  pngs?: string[]
}
interface ManifestGroup {
  title: string
  items: ManifestItem[]
}

const TOKEN_ICONS: Record<string, React.ReactNode> = {
  '/spectrea-tokens.css': <TbBrandCss3 size={22} className="text-brand" />,
  '/spectrea-tailwind.config.js': <TbBrandTailwind size={22} className="text-brand" />,
}

export default function Downloads() {
  const [tokensCss, setTokensCss] = useState<string | null>(null)
  useEffect(() => {
    fetch('/spectrea-tokens.css')
      .then(r => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then(setTokensCss)
      .catch(() => setTokensCss('/* Could not load /spectrea-tokens.css — download it directly. */'))
  }, [])

  const groups = manifest.groups as ManifestGroup[]

  return (
    <PageShell
      title="Downloads"
      subtitle="Everything you need to make something that looks like Spectrea — logos, swatches, specimens, and the tokens that tie it together."
    >
      {/* Guide documents */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-1">
          <Tooltip content="The complete brand guide in two formats, both derived mirrors of the canonical brand data (src/data/brand.ts). The Markdown version is optimised for LLMs and automation; the PDF is for humans who want offline / print reference.">
            <span>The Brand Guide</span>
          </Tooltip>
        </h2>
        <p className="text-xs text-slate mb-4">Both files are the same content — pick whichever format suits your workflow.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="/brand-guide.md"
            download
            className="group flex flex-col gap-2 p-5 rounded-xl border border-stone-200 hover:border-brand/40 hover:bg-brand/5 transition-all btn-focus"
          >
            <div className="flex items-center justify-between">
              <TbFileText size={22} className="text-brand" />
              <span className="text-[10px] font-semibold text-pewter uppercase tracking-wider">LLM-ready</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">brand-guide.md</p>
              <p className="text-xs text-slate mt-0.5 leading-relaxed">Full brand guide in Markdown. Derived mirror of brand.ts. LLM-friendly.</p>
            </div>
          </a>
          <a
            href="/brand-guide.pdf"
            download
            className="group flex flex-col gap-2 p-5 rounded-xl border border-stone-200 hover:border-brand/40 hover:bg-brand/5 transition-all btn-focus"
          >
            <div className="flex items-center justify-between">
              <TbFileTypePdf size={22} className="text-brand" />
              <span className="text-[10px] font-semibold text-pewter uppercase tracking-wider">Printable</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">brand-guide.pdf</p>
              <p className="text-xs text-slate mt-0.5 leading-relaxed">PDF version rendered from the same Markdown. For offline reading.</p>
            </div>
          </a>
          <a
            href="/llms.txt"
            download
            className="group flex flex-col gap-2 p-5 rounded-xl border border-stone-200 hover:border-brand/40 hover:bg-brand/5 transition-all btn-focus"
          >
            <div className="flex items-center justify-between">
              <TbRobot size={22} className="text-brand" />
              <span className="text-[10px] font-semibold text-pewter uppercase tracking-wider">LLM index</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">llms.txt</p>
              <p className="text-xs text-slate mt-0.5 leading-relaxed">Small index file per <code className="font-mono">llmstxt.org</code>. Points AI tools at the canonical docs.</p>
            </div>
          </a>
        </div>
        <div className="mt-3 bg-cloud rounded-lg px-4 py-3 border border-stone-100">
          <p className="text-xs text-iron leading-relaxed">
            <strong>LLM readability:</strong> the <code className="font-mono">brand-guide.md</code> and <code className="font-mono">llms.txt</code> files are designed for AI tools (Claude, ChatGPT browsing, Perplexity) to read directly. <code className="font-mono">robots.txt</code> explicitly allows GPTBot, ClaudeBot, CCBot, PerplexityBot, and Google-Extended.
          </p>
          <p className="text-xs text-iron leading-relaxed mt-2">
            <strong>Regeneration:</strong> the canonical data lives in <code className="font-mono">src/data/brand.ts</code> (mirrored into <code className="font-mono">public/brand-guide.md</code>) → run <code className="font-mono">npm run generate:all</code> to rebuild assets + PDF in one step. On any conflict between surfaces, brand.ts wins.
          </p>
        </div>
      </Section>

      {/* Brand assets — rendered from the generated manifest */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-1">
          <Tooltip content="Every asset listed here exists and downloads directly. The listing is rendered from a manifest the asset generator writes, so this page cannot advertise files that do not ship. Always use these assets — never recreate the logo or modify colours.">
            <span>Brand Assets</span>
          </Tooltip>
        </h2>
        <p className="text-xs text-slate mb-4">
          {groups.filter(g => g.title !== 'Design tokens').reduce((n, g) => n + g.items.length, 0)} assets, regenerable with <code className="font-mono">npm run generate:assets</code>. Logo files also ship as PNG at 1×/2×/4×.
        </p>
        <div className="space-y-6">
          {groups.map(group => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">{group.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {group.items.map(item => {
                  const isSvg = item.path.endsWith('.svg')
                  const darkPreview = /white/i.test(item.path)
                  return (
                    <div key={item.path} className="border border-stone-200 rounded-xl p-4 flex gap-4 items-start">
                      {isSvg ? (
                        <div
                          className={`shrink-0 w-24 h-16 rounded-lg border border-stone-100 flex items-center justify-center overflow-hidden ${darkPreview ? 'bg-ink' : 'bg-cloud'}`}
                        >
                          <img src={item.path} alt={item.label} className="max-w-full max-h-full object-contain" loading="lazy" />
                        </div>
                      ) : (
                        <div className="shrink-0 w-24 h-16 rounded-lg border border-stone-100 bg-cloud flex items-center justify-center">
                          {TOKEN_ICONS[item.path] ?? <TbDownload size={22} className="text-brand" />}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink">{item.label}</p>
                        <p className="text-xs text-slate mt-0.5 leading-relaxed">{item.desc}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <a
                            href={item.path}
                            download
                            aria-label={`Download ${item.label} — ${isSvg ? 'SVG' : item.path.split('/').pop()}`}
                            className="text-xs font-mono text-brand border border-brand/30 hover:bg-brand/5 px-2 py-0.5 rounded transition-colors btn-focus"
                          >
                            {isSvg ? 'SVG' : item.path.split('/').pop()}
                          </a>
                          {item.pngs?.map((png, i) => (
                            <a
                              key={png}
                              href={png}
                              download
                              aria-label={`Download ${item.label} — PNG ${['1×', '2×', '4×'][i] ?? ''}`}
                              className="text-xs font-mono text-slate border border-stone-200 hover:border-brand/40 hover:text-brand px-2 py-0.5 rounded transition-colors btn-focus"
                            >
                              PNG {['1×', '2×', '4×'][i] ?? ''}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Quick reference */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">Quick Reference</h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-2 bg-cloud border-b border-stone-200 px-4 py-2">
            <span className="text-xs font-semibold text-pewter uppercase tracking-wider">Resource</span>
            <span className="text-xs font-semibold text-pewter uppercase tracking-wider">Value</span>
          </div>
          {[
            { resource: 'Primary brand color', value: '#4271DF (Cobalt)' },
            { resource: 'Heading font', value: 'Albert Sans — Google Fonts' },
            { resource: 'Body font', value: 'Lexend — Google Fonts' },
            { resource: 'Mono font', value: 'JetBrains Mono — Google Fonts' },
            { resource: 'Brand gradient', value: `${brandTokens.gradients.primary.css}  —  sRGB fallback for <Chrome 111 / <Safari 16.2 / <Firefox 117` },
            { resource: 'Icon library', value: 'Tabler Icons via react-icons/tb (outline, 2px stroke)' },
            { resource: 'Border radius (cards)', value: '12px (rounded-xl)' },
            { resource: 'Border radius (buttons)', value: '8px (rounded-lg)' },
          ].map((row, i) => (
            <div key={row.resource} className="grid grid-cols-2 px-4 py-2.5" style={{ borderBottom: i < 7 ? '1px solid #F5F5F4' : 'none' }}>
              <span className="text-sm text-iron">{row.resource}</span>
              <span className="text-xs font-mono text-iron">{row.value}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* CSS tokens — displayed from the same generated file that downloads */}
      <Section title="CSS Tokens">
        <p className="text-xs text-slate mb-3">
          Shown from <code className="font-mono">/spectrea-tokens.css</code> — the displayed CSS and the downloadable file are the same generated artifact, so they cannot drift from <code className="font-mono">brand.ts</code>.
        </p>
        <div className="bg-ink rounded-xl p-5 overflow-x-auto">
          <pre className="text-xs leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#B0B0B6' }}>
            {tokensCss ?? '/* Loading /spectrea-tokens.css… */'}
          </pre>
        </div>
      </Section>
    </PageShell>
  )
}
