import PageShell, { Section } from '../../components/layout/PageShell'
import { StaticLogo, AnimatedLogo, Logotype, LogotypeGradient, ColorMode } from '../../components/brand/SpectreaLogo'

interface Variant {
  id: string
  name: string
  colorMode: ColorMode
  dotColorMode?: ColorMode
  wordmark: boolean
  /** Mono lockups only — ignored by gradient lockups (which carry the Cool Duet on the mark). */
  monoColor?: string
  bgColor: string
  borderColor: string
  circle?: { fill: string }
  note?: string
}

const variants: Variant[] = [
  { id: '1', name: 'Primary mark', colorMode: 'cool', dotColorMode: 'grey', wordmark: false, bgColor: '#FDFDFB', borderColor: '#E5E7EB' },
  { id: '2', name: 'Primary lockup', colorMode: 'cool', dotColorMode: 'grey', wordmark: true, bgColor: '#FDFDFB', borderColor: '#E5E7EB' },
  { id: '3', name: 'Ink mark', colorMode: 'ink', wordmark: false, bgColor: '#FDFDFB', borderColor: '#E5E7EB' },
  { id: '4', name: 'Ink lockup', colorMode: 'ink', wordmark: true, monoColor: '#18181C', bgColor: '#FDFDFB', borderColor: '#E5E7EB' },
  { id: '5', name: 'Grey mark', colorMode: 'grey', wordmark: false, bgColor: '#FDFDFB', borderColor: '#E5E7EB', note: 'Watermark only' },
  { id: '6', name: 'Primary on dark', colorMode: 'cool', dotColorMode: 'grey', wordmark: false, bgColor: '#18181C', borderColor: '#2E2E34' },
  { id: '7', name: 'Primary lockup on dark', colorMode: 'cool', dotColorMode: 'grey', wordmark: true, bgColor: '#18181C', borderColor: '#2E2E34' },
  { id: '8', name: 'White mark', colorMode: 'white', wordmark: false, bgColor: '#18181C', borderColor: '#2E2E34' },
  { id: '9', name: 'White lockup', colorMode: 'white', wordmark: true, monoColor: '#FDFDFB', bgColor: '#18181C', borderColor: '#2E2E34' },
  { id: '10', name: 'Ink circle', colorMode: 'white', wordmark: false, bgColor: '#F4F4F1', borderColor: '#E5E7EB', circle: { fill: '#18181C' } },
  { id: '11', name: 'White circle', colorMode: 'ink', wordmark: false, bgColor: '#18181C', borderColor: '#2E2E34', circle: { fill: '#FDFDFB' } },
]

function VariantCard({ v, highlight }: { v: Variant; highlight?: boolean }) {
  const isDark = v.bgColor === '#18181C'
  const renderMark = () => {
    if (v.circle) {
      return (
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: v.circle.fill, border: v.circle.fill === '#FDFDFB' ? '1px solid #E5E7EB' : 'none' }}>
          <StaticLogo size={36} colorMode={v.colorMode} dotColorMode={v.dotColorMode} />
        </div>
      )
    }
    if (v.wordmark) {
      // The lockup has TWO forms only: two-tone mark + mono wordmark
      // (`LogotypeGradient`), or fully mono mark + wordmark (`Logotype`).
      // No full-spectrum wordmark, no gradient wordmark.
      const lockupFont = 48
      const isDarkSurface = v.bgColor === '#18181C'
      const lockup = v.colorMode === 'ink' || v.colorMode === 'white'
        ? <Logotype fontSize={lockupFont} colorMode={v.colorMode} color={v.monoColor} />
        : <LogotypeGradient fontSize={lockupFont} colorMode={isDarkSurface ? 'white' : 'ink'} />
      return (
        <div style={{ backgroundColor: isDark ? v.bgColor : undefined, borderRadius: isDark ? 8 : 0, padding: isDark ? '8px 16px' : 0 }}>
          {lockup}
        </div>
      )
    }
    if (v.note) {
      return (
        <div style={{ opacity: 0.2 }}>
          <StaticLogo size={48} colorMode={v.colorMode} dotColorMode={v.dotColorMode} />
        </div>
      )
    }
    return (
      <div className="flex items-center justify-center" style={{ backgroundColor: isDark ? v.bgColor : undefined, borderRadius: isDark ? 8 : 0, padding: isDark ? 12 : 0 }}>
        <StaticLogo size={48} colorMode={v.colorMode} dotColorMode={v.dotColorMode} />
      </div>
    )
  }
  // Taller cards for lockups so the fontSize-48 lockup breathes naturally.
  const cardHeight = v.wordmark ? 'h-32' : 'h-28'
  return (
    <div className={`border rounded-xl overflow-hidden ${highlight ? 'border-brand/30 border-2' : 'border-stone-200'}`}>
      <div className={`p-4 flex flex-col items-center justify-center ${cardHeight}`} style={{ backgroundColor: v.circle ? v.bgColor : isDark ? '#212226' : '#FDFDFB' }}>
        {renderMark()}
      </div>
      <div className="p-2.5 border-t border-stone-100 bg-white">
        <p className="text-xs font-semibold text-stone-700">{v.id}. {v.name}</p>
        {v.note && <p className="text-[10px] text-stone-400 mt-0.5">{v.note}</p>}
      </div>
    </div>
  )
}

export default function Variations() {
  return (
    <PageShell
      title="Variants"
      subtitle="11 approved variants, 3 lockup arrangements. Everything you need to choose the right logo for any context."
    >
      {/* Gradient variants — focus on the primary */}
      <Section>
        <h2 className="text-lg font-semibold text-stone-800 mb-1">Gradient Mark</h2>
        <p className="text-xs text-stone-500 mb-5">
          The static S mark carries the <strong>Cool Duet</strong>. This is the treatment — everything else is a contextual possibility you reach for only when the primary genuinely doesn't fit.
        </p>

        {/* Primary — the one that matters */}
        <div className="border-2 border-brand/30 rounded-xl overflow-hidden mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-2 p-8 flex items-center justify-center bg-stone-50 min-h-[200px]">
              <StaticLogo size={120} colorMode="cool" dotColorMode="grey" />
            </div>
            <div className="md:col-span-3 p-5 space-y-3 bg-white border-t md:border-t-0 md:border-l border-stone-200">
              <div className="flex items-baseline gap-2 flex-wrap">
                <p className="text-base font-semibold text-stone-800">Cool Duet</p>
                <span className="text-[10px] text-brand bg-brand/10 px-1.5 py-0.5 rounded font-mono uppercase tracking-wider">The primary mark</span>
              </div>
              <p className="text-[11px] font-mono text-stone-400">Cobalt #4271DF → Teal #00B6A0 · grey dots #A3A3A3</p>
              <p className="text-xs text-stone-700 leading-relaxed">
                <strong>Intelligence + growth.</strong> Cold precision meeting verified insight. The brand's resting state — restrained, professional, calm. If you're not sure which gradient to reach for, use this one.
              </p>
              <div>
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Use for</p>
                <ul className="text-xs text-stone-600 space-y-1 pl-4 list-disc">
                  <li>Every everyday UI placement — sidebar, nav, breadcrumbs, headers</li>
                  <li>Documentation, settings, dashboards, admin surfaces</li>
                  <li>Technical and data-heavy contexts</li>
                  <li>Favicons and app icons (at ≥ 32px)</li>
                  <li>Anywhere no other personality is specifically called for</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Other possibilities — quiet, small */}
        <div>
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Other possibilities</p>
          <p className="text-xs text-stone-500 mb-4">
            Contextual gradient treatments for specific moments. Treat them as exceptions, not defaults. All available in the asset generator.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {([
              {
                name: 'Balanced Duet',
                colorMode: 'balanced' as const,
                hint: 'Teal → Amber. Product & ecosystem moments.',
              },
              {
                name: 'Warm Duet',
                colorMode: 'warm' as const,
                hint: 'Amber → Rose. Marketing, launches, attention.',
              },
              {
                name: 'Full Spectrum',
                colorMode: 'color' as const,
                hint: 'Cobalt → Teal → Amber. Hero moments, animated mark.',
              },
            ] as const).map(v => (
              <div key={v.name} className="border border-stone-200 rounded-xl overflow-hidden">
                <div className="p-4 flex items-center justify-center bg-stone-50 min-h-[96px]">
                  <StaticLogo size={56} colorMode={v.colorMode} dotColorMode="grey" />
                </div>
                <div className="p-3 bg-white">
                  <p className="text-xs font-semibold text-stone-700">{v.name}</p>
                  <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{v.hint}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Animated mark — always full spectrum */}
      <Section>
        <h2 className="text-lg font-semibold text-stone-800 mb-1">Animated Mark</h2>
        <p className="text-xs text-stone-500 mb-4">
          The animated mark always uses the <strong>full spectrum</strong> — the "reveal" moment. The stroke draws in and erases in a 3-second loop, carrying cobalt → teal → amber across the S curve.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-2 border-brand/20 rounded-xl p-6 flex flex-col items-center gap-3 bg-white">
            <AnimatedLogo size={120} />
            <p className="text-xs font-semibold text-stone-800">Full Spectrum · light</p>
          </div>
          <div className="rounded-xl p-6 flex flex-col items-center gap-3" style={{ backgroundColor: '#18181C' }}>
            <AnimatedLogo size={120} />
            <p className="text-xs font-semibold" style={{ color: '#F4F4F1' }}>Full Spectrum · dark</p>
          </div>
        </div>
      </Section>

      {/* Solid color treatments */}
      <Section>
        <h2 className="text-lg font-semibold text-stone-800 mb-1">Solid Color Treatments</h2>
        <p className="text-xs text-stone-500 mb-4">Single-color variants for formal, restrained, or print contexts.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-stone-200 rounded-xl p-4 flex flex-col items-center gap-3">
            <StaticLogo size={48} colorMode="ink" />
            <div className="text-center">
              <p className="text-xs font-semibold text-stone-800">Ink</p>
              <p className="text-xs text-stone-500 mt-1">All #18181C. Formal, co-branding, single-color print.</p>
            </div>
          </div>
          <div className="border border-stone-200 rounded-xl p-4 flex flex-col items-center gap-3 bg-ink">
            <StaticLogo size={48} colorMode="white" />
            <div className="text-center">
              <p className="text-xs font-semibold text-white">White</p>
              <p className="text-xs text-stone-400 mt-1">All #FDFDFB. Dark backgrounds, overlays.</p>
            </div>
          </div>
          <div className="border border-stone-200 rounded-xl p-4 flex flex-col items-center gap-3">
            <StaticLogo size={48} colorMode="ink" dotColorMode="grey" />
            <div className="text-center">
              <p className="text-xs font-semibold text-stone-800">Ink + Grey Dots</p>
              <p className="text-xs text-stone-500 mt-1">Quiet authority — connection formed, spectrum dormant.</p>
            </div>
          </div>
          <div className="border border-stone-200 rounded-xl p-4 flex flex-col items-center gap-3">
            <div style={{ opacity: 0.2 }}>
              <StaticLogo size={48} colorMode="grey" />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-stone-800">Grey (watermark)</p>
              <p className="text-xs text-stone-500 mt-1">All #A3A3A3 at low opacity. Watermarks only.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* All 11 variants */}
      <Section>
        <h2 className="text-lg font-semibold text-stone-800 mb-1">All 11 Variants</h2>
        <p className="text-xs text-stone-500 mb-4">Grouped by background. Blue border = default for that group.</p>

        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">On light backgrounds — marks</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {variants.filter(v => ['1','3','5'].includes(v.id)).map(v => (
            <VariantCard key={v.id} v={v} highlight={v.id === '1'} />
          ))}
        </div>

        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">On light backgrounds — lockups</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {variants.filter(v => ['2','4'].includes(v.id)).map(v => (
            <VariantCard key={v.id} v={v} highlight={v.id === '2'} />
          ))}
        </div>

        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">On dark backgrounds — marks</p>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 mb-4">
          {variants.filter(v => ['6','8'].includes(v.id)).map(v => (
            <VariantCard key={v.id} v={v} highlight={v.id === '6'} />
          ))}
        </div>

        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">On dark backgrounds — lockups</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {variants.filter(v => ['7','9'].includes(v.id)).map(v => (
            <VariantCard key={v.id} v={v} highlight={v.id === '7'} />
          ))}
        </div>

        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Contained (below 48px)</p>
        <div className="grid grid-cols-2 gap-3 max-w-sm">
          {variants.filter(v => ['10','11'].includes(v.id)).map(v => (
            <VariantCard key={v.id} v={v} highlight={v.id === '10'} />
          ))}
        </div>
      </Section>

      {/* Lockup arrangements */}
      <Section>
        <h2 className="text-lg font-semibold text-stone-800 mb-4">Lockup Arrangements</h2>
        <p className="text-xs text-stone-500 mb-4">Three ways to pair the mark with the wordmark. All color treatments work with all layouts.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-2 border-brand/20 rounded-xl overflow-hidden">
            <div className="p-5 flex items-center justify-center bg-stone-50 min-h-[130px]">
              <LogotypeGradient fontSize={30} />
            </div>
            <div className="p-3 border-t border-brand/10 bg-brand/5">
              <p className="text-xs font-semibold text-brand">Gradient logotype (preferred for brand)</p>
              <p className="text-xs text-stone-500 mt-0.5">Cool Duet on the S mark, monotone Ink on the lowercase wordmark. The gradient energy lives in the mark; the wordmark stays crisp and calm. For marketing, hero sections, and brand moments.</p>
            </div>
          </div>
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="p-5 flex flex-col gap-4 items-center justify-center bg-stone-50 min-h-[130px]">
              <div className="flex items-center gap-3">
                <StaticLogo size={36} colorMode="cool" dotColorMode="grey" />
                <div>
                  <span className="font-heading font-semibold text-stone-900 text-sm" style={{ letterSpacing: '0.02em' }}>Spectrea</span>
                  <p className="text-xs text-stone-400 uppercase tracking-widest">Brand Guide</p>
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-stone-100">
              <p className="text-xs font-semibold text-stone-700">Horizontal with descriptor</p>
              <p className="text-xs text-stone-500 mt-0.5">Mark + wordmark + descriptor. The descriptor fills the vertical gap. For navigation, product headers, and sub-brands.</p>
            </div>
          </div>
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="p-5 flex items-center justify-center bg-stone-50 min-h-[130px]">
              <div className="flex flex-col items-center gap-2">
                <StaticLogo size={52} colorMode="cool" dotColorMode="grey" />
                <span className="font-heading font-semibold text-stone-900 text-lg" style={{ letterSpacing: '0.02em' }}>Spectrea</span>
              </div>
            </div>
            <div className="p-3 border-t border-stone-100">
              <p className="text-xs font-semibold text-stone-700">Stacked</p>
              <p className="text-xs text-stone-500 mt-0.5">Title slides, centered compositions. Mark above wordmark. Wordmark width ≤ mark width.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Logotype at scale */}
      <Section>
        <h2 className="text-lg font-semibold text-stone-800 mb-4">Logotype at Scale</h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {/* Gradient lockup */}
          <div className="p-6 bg-stone-50 space-y-4">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Gradient</p>
            {[60, 48, 36].map(size => (
              <div key={size} className="flex items-center gap-4">
                <span className="text-xs font-mono text-stone-400 w-10 flex-shrink-0">{size}px</span>
                <LogotypeGradient fontSize={size} />
              </div>
            ))}
          </div>
          {/* Mono ink */}
          <div className="p-6 bg-white border-t border-stone-100 space-y-4">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Mono — Ink</p>
            {[48, 36].map(size => (
              <div key={size} className="flex items-center gap-4">
                <span className="text-xs font-mono text-stone-400 w-10 flex-shrink-0">{size}px</span>
                <Logotype fontSize={size} colorMode="ink" color="#18181C" />
              </div>
            ))}
          </div>
          {/* Mono white on dark */}
          <div className="p-6 bg-ink space-y-4">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Mono — White</p>
            {[48, 36].map(size => (
              <div key={size} className="flex items-center gap-4">
                <span className="text-xs font-mono text-stone-500 w-10 flex-shrink-0">{size}px</span>
                <Logotype fontSize={size} colorMode="white" color="#FDFDFB" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* With descriptor */}
      <Section>
        <h2 className="text-lg font-semibold text-stone-800 mb-4">With Descriptor</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {['Brand Guide', 'Documentation', 'Platform'].map(desc => (
            <div key={desc} className="border border-stone-200 rounded-xl p-5 flex items-center gap-3">
              <StaticLogo size={36} colorMode="cool" dotColorMode="grey" />
              <div>
                <span className="font-heading font-semibold text-stone-900 text-sm" style={{ letterSpacing: '0.02em' }}>Spectrea</span>
                <p className="text-xs text-stone-400 uppercase tracking-widest">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-stone-500 mt-3">Descriptor: uppercase, tracked widest, Grey (#97979E). Below the wordmark. Use only when the audience needs clarification about which Spectrea product they're in.</p>
      </Section>

      {/* Decision guide */}
      <Section>
        <h2 className="text-lg font-semibold text-stone-800 mb-4">Decision Guide</h2>
        <div className="bg-stone-50 rounded-xl border border-stone-100 p-5 mb-5">
          <p className="text-sm text-stone-700 leading-relaxed"><strong>Four questions, in order:</strong></p>
          <ol className="mt-2 space-y-1 text-sm text-stone-600 list-decimal list-inside">
            <li><strong>Is the background light or dark?</strong> Light → #1-5. Dark → #6-9.</li>
            <li><strong>Is color available?</strong> If not, ink (#3/#4 on light) or white (#8/#9 on dark).</li>
            <li><strong>Is there space for the wordmark?</strong> If yes, use a lockup. If not, mark only.</li>
            <li><strong>What arrangement?</strong> Logotype for horizontal at 36px+. Horizontal with descriptor for nav/product. Stacked for centered.</li>
          </ol>
          <p className="text-xs text-stone-500 mt-3">Below 48px → #10 (ink circle) or #11 (white circle). Grey (#5) is for watermarks only.</p>
        </div>
        <div className="border border-stone-200 rounded-xl overflow-x-auto">
          <div className="min-w-[640px]">
          <div className="grid grid-cols-12 bg-stone-50 border-b border-stone-200 px-4 py-2">
            <span className="col-span-4 text-xs font-semibold text-stone-400 uppercase tracking-wider">Context</span>
            <span className="col-span-2 text-xs font-semibold text-stone-400 uppercase tracking-wider">Variant</span>
            <span className="col-span-6 text-xs font-semibold text-stone-400 uppercase tracking-wider">Why</span>
          </div>
          {([
            { context: 'Website header (light)', variant: 'Logotype', why: 'Preferred horizontal treatment. Compact, balanced.' },
            { context: 'Website header (dark)', variant: 'Logotype (white)', why: 'White logotype on dark backgrounds.' },
            { context: 'Product sidebar / nav', variant: '#1 + descriptor', why: 'Primary mark with wordmark + descriptor. Ink circle only if mark stands alone.' },
            { context: 'Favicon (16-32px)', variant: '#10', why: 'Ink circle — high contrast at very small sizes.' },
            { context: 'App icon', variant: '#10', why: 'Ink circle — bold, distinctive in app grids.' },
            { context: 'Social avatar', variant: '#10', why: 'Circular crop on most platforms.' },
            { context: 'Social cover image', variant: '#2 or #7', why: 'Full lockup. Match to cover background.' },
            { context: 'Marketing hero', variant: 'Logotype or stacked', why: 'Logotype for inline display; stacked for centered.' },
            { context: 'Dark mode UI', variant: '#6 or #8', why: 'Primary if solid dark; white if simplified.' },
            { context: 'Presentation title slide', variant: 'Logotype or stacked', why: 'Logotype for bold titles; stacked for centered.' },
            { context: 'Presentation content', variant: '#1 or #6', why: 'Mark only, bottom corner.' },
            { context: 'Business card / letterhead', variant: 'Logotype or #4', why: 'Logotype if full-color; ink lockup with descriptor if single-color.' },
            { context: 'Co-branding', variant: '#3 or #4', why: 'Ink prevents color competition with partner.' },
            { context: 'Legal / formal', variant: '#4', why: 'Ink lockup — authoritative, max contrast.' },
            { context: 'Watermark', variant: '#5 at low opacity', why: 'Grey mark, subtle.' },
            { context: 'Photo / video overlay', variant: '#8 or #9', why: 'White on 40%+ dark overlay.' },
            { context: 'Emboss / foil stamp', variant: '#3', why: 'Single-tone production.' },
            { context: 'Fax / newspaper', variant: '#4', why: 'Ink lockup for poor reproduction.' },
          ] as const).map((row, i) => (
            <div key={row.context} className="grid grid-cols-12 px-4 py-2.5" style={{ borderBottom: i < 17 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="col-span-4 text-sm text-stone-700">{row.context}</span>
              <span className="col-span-2 text-xs font-mono font-semibold text-brand">{row.variant}</span>
              <span className="col-span-6 text-xs text-stone-500">{row.why}</span>
            </div>
          ))}
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
