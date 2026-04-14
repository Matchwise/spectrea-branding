import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { StaticLogo, Logotype } from '../../components/brand/SpectreaLogo'

export default function Presentations() {
  return (
    <PageShell
      title="Presentations"
      subtitle="Slide design rules, templates, and visual patterns for Spectrea decks."
    >
      {/* Slide anatomy */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Every slide follows the same grid: logo placement, typography rules, and color usage. Consistency across decks builds brand credibility.">
            <span>Slide Types</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title slide */}
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Title Slide</p>
            <div className="rounded-xl overflow-hidden border border-stone-200 aspect-video relative" style={{ backgroundColor: '#18181C' }}>
              <div className="h-full flex flex-col items-center justify-center p-6">
                <div className="mb-3">
                  <StaticLogo size={40} />
                </div>
                <p className="text-lg font-semibold text-center" style={{ color: '#F4F4F1', fontFamily: "'Albert Sans', sans-serif" }}>We connect the dots.</p>
                <p className="text-xs mt-1" style={{ color: '#97979E' }}>Composable knowledge platform</p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #4271DF, #00B6A0, #E19000)' }} />
              </div>
            </div>
          </div>

          {/* Content slide */}
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Content Slide</p>
            <div className="rounded-xl overflow-hidden border border-stone-200 aspect-video bg-white">
              <div className="h-full flex flex-col p-5">
                <p className="text-sm font-semibold text-stone-900" style={{ fontFamily: "'Albert Sans', sans-serif" }}>The Knowledge Problem</p>
                <div className="flex-1 flex items-center">
                  <div className="space-y-2 w-full">
                    {['More data, less truth', 'More tools, fewer insights', 'More noise, less action'].map((line, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: ['#4271DF', '#00B6A0', '#E19000'][i] }} />
                        <p className="text-xs text-stone-700">{line}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <Logotype fontSize={9} colorMode="ink" color="#97979E" />
                  <span className="text-xs text-stone-300">3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stat slide */}
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Stat / Impact Slide</p>
            <div className="rounded-xl overflow-hidden border border-stone-200 aspect-video" style={{ backgroundColor: '#18181C' }}>
              <div className="h-full flex flex-col items-center justify-center p-6">
                <p className="text-4xl font-semibold" style={{ color: '#F4F4F1', fontFamily: "'Albert Sans', sans-serif" }}>94%</p>
                <p className="text-xs mt-1" style={{ color: '#97979E' }}>average trust score across all entities</p>
              </div>
            </div>
          </div>

          {/* Section divider */}
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Section Divider</p>
            <div className="rounded-xl overflow-hidden border border-stone-200 aspect-video relative" style={{ backgroundColor: '#18181C' }}>
              <div className="h-full flex items-center justify-center p-6">
                <p className="text-lg font-semibold" style={{ color: '#F4F4F1', fontFamily: "'Albert Sans', sans-serif" }}>How It Works</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #4271DF, #00B6A0, #E19000)' }} />
            </div>
          </div>
        </div>
      </Section>

      {/* Slide rules */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="These rules apply to every Spectrea presentation. They ensure slides look branded even when different people create them.">
            <span>Design Rules</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { rule: 'Two backgrounds only', detail: 'White for content slides, Ink (#18181C) for emphasis/divider slides. No other backgrounds.' },
            { rule: 'Title: Albert Sans Semibold', detail: '24–36px for slide titles. Left-aligned on content slides, centered on divider slides.' },
            { rule: 'Body: Lexend Regular', detail: '14–18px for bullet points and descriptions. Maximum 6 lines per slide.' },
            { rule: 'Logo: bottom-left on content slides', detail: 'Small mark + wordmark. Never on title or stat slides (they have the centered mark).' },
            { rule: 'Gradient bar: bottom of emphasis slides', detail: 'Thin horizontal bar (2–4px) at the bottom edge. Never on content slides.' },
            { rule: 'One idea per slide', detail: 'If you need to scroll, you need another slide.' },
            { rule: 'Spectrum colors for bullet dots', detail: 'Use Cobalt, Teal, Amber in sequence for 3-point lists. Rose for critical items only.' },
            { rule: 'No clip art or decorative elements', detail: 'Product screenshots, data visualizations, or nothing. Clean > decorated.' },
          ].map((row, i) => (
            <div key={row.rule} className="px-4 py-3" style={{ borderBottom: i < 7 ? '1px solid #F3F4F6' : 'none' }}>
              <p className="text-sm font-medium text-stone-700">{row.rule}</p>
              <p className="text-xs text-stone-500 mt-0.5">{row.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Color in presentations */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Presentations use a restricted subset of the full color system. Only four colors appear in slides — fewer choices mean faster, more consistent deck creation.">
            <span>Color Usage in Slides</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { color: '#FDFDFB', name: 'Canvas', use: 'Content slide background', textColor: '#18181C', border: true },
            { color: '#18181C', name: 'Ink', use: 'Emphasis / divider background', textColor: '#F4F4F1', border: false },
            { color: '#4271DF', name: 'Cobalt', use: 'Primary bullet dots, key metrics', textColor: '#FDFDFB', border: false },
            { color: '#00B6A0', name: 'Teal', use: 'Growth metrics, positive change', textColor: '#18181C', border: false },
            { color: '#E19000', name: 'Amber', use: 'Third bullet dot, attention highlights', textColor: '#18181C', border: false },
            { color: '#F24260', name: 'Rose', use: 'Critical items only — use sparingly', textColor: '#FDFDFB', border: false },
          ].map(c => (
            <div key={c.name} className="rounded-xl overflow-hidden" style={{ border: c.border ? '1px solid #E5E7EB' : 'none' }}>
              <div className="h-16 flex items-end p-2" style={{ backgroundColor: c.color }}>
                <span className="text-xs font-mono" style={{ color: c.textColor, opacity: 0.7 }}>{c.color}</span>
              </div>
              <div className="p-2 bg-white border-t border-stone-100">
                <p className="text-xs font-medium text-stone-700">{c.name}</p>
                <p className="text-xs text-stone-400">{c.use}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Dos & Don'ts */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Quick reference for common slide design decisions. When in doubt, default to fewer elements and more white space.">
            <span>Slide Dos & Don'ts</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#008775' }}>Do</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use one idea per slide — if you need to scroll, split</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use the gradient bar on emphasis/divider slides only</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use product screenshots or data visualizations for visuals</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Keep bullet points to 3–6 per slide using spectrum dot colors</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use the small logo lockup in bottom-left of content slides</li>
            </ul>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Don't</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use backgrounds other than White or Ink (#18181C)</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Add clip art, decorative icons, or stock imagery</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Put the gradient bar on content slides</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use fonts outside the three-font system (Albert Sans, Lexend, JetBrains Mono)</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Center-align body text — left-align on content slides</li>
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
