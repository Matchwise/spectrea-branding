import PageShell, { Section } from '../../components/layout/PageShell'
import { StaticLogo, Logotype, ColorMode } from '../../components/brand/SpectreaLogo'

interface Variant {
  id: string
  name: string
  colorMode: ColorMode
  dotColorMode?: ColorMode
  wordmark: boolean
  wordmarkColor: string
  bgColor: string
  borderColor: string
  circle?: { fill: string }
  note?: string
}

const variants: Variant[] = [
  { id: '1', name: 'Primary mark', colorMode: 'color', dotColorMode: 'grey', wordmark: false, wordmarkColor: '', bgColor: '#FFFFFF', borderColor: '#E5E7EB' },
  { id: '2', name: 'Primary lockup', colorMode: 'color', dotColorMode: 'grey', wordmark: true, wordmarkColor: '#111827', bgColor: '#FFFFFF', borderColor: '#E5E7EB' },
  { id: '3', name: 'Ink mark', colorMode: 'ink', wordmark: false, wordmarkColor: '', bgColor: '#FFFFFF', borderColor: '#E5E7EB' },
  { id: '4', name: 'Ink lockup', colorMode: 'ink', wordmark: true, wordmarkColor: '#111827', bgColor: '#FFFFFF', borderColor: '#E5E7EB' },
  { id: '5', name: 'Grey mark', colorMode: 'grey', wordmark: false, wordmarkColor: '', bgColor: '#FFFFFF', borderColor: '#E5E7EB', note: 'Watermark only' },
  { id: '6', name: 'Primary on dark', colorMode: 'color', dotColorMode: 'grey', wordmark: false, wordmarkColor: '', bgColor: '#111827', borderColor: '#374151' },
  { id: '7', name: 'Primary lockup on dark', colorMode: 'color', dotColorMode: 'grey', wordmark: true, wordmarkColor: '#F9FAFB', bgColor: '#111827', borderColor: '#374151' },
  { id: '8', name: 'White mark', colorMode: 'white', wordmark: false, wordmarkColor: '', bgColor: '#111827', borderColor: '#374151' },
  { id: '9', name: 'White lockup', colorMode: 'white', wordmark: true, wordmarkColor: '#FFFFFF', bgColor: '#111827', borderColor: '#374151' },
  { id: '10', name: 'Ink circle', colorMode: 'white', wordmark: false, wordmarkColor: '', bgColor: '#F9FAFB', borderColor: '#E5E7EB', circle: { fill: '#111827' } },
  { id: '11', name: 'White circle', colorMode: 'ink', wordmark: false, wordmarkColor: '', bgColor: '#111827', borderColor: '#374151', circle: { fill: '#FFFFFF' } },
]

function VariantCard({ v, highlight }: { v: Variant; highlight?: boolean }) {
  const isDark = v.bgColor === '#111827'
  const renderMark = () => {
    if (v.circle) {
      return (
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: v.circle.fill, border: v.circle.fill === '#FFFFFF' ? '1px solid #E5E7EB' : 'none' }}>
          <StaticLogo size={36} colorMode={v.colorMode} dotColorMode={v.dotColorMode} />
        </div>
      )
    }
    if (v.wordmark) {
      return (
        <div className="flex items-center gap-2" style={{ backgroundColor: isDark ? v.bgColor : undefined, borderRadius: isDark ? 8 : 0, padding: isDark ? '8px 12px' : 0 }}>
          <StaticLogo size={32} colorMode={v.colorMode} dotColorMode={v.dotColorMode} />
          <span className="font-heading font-semibold text-xs" style={{ color: v.wordmarkColor }}>Spectrea</span>
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
  return (
    <div className={`border rounded-xl overflow-hidden ${highlight ? 'border-brand/30 border-2' : 'border-stone-200'}`}>
      <div className="p-4 flex flex-col items-center justify-center h-28" style={{ backgroundColor: v.circle ? v.bgColor : isDark ? '#1F2937' : '#FFFFFF' }}>
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
      {/* Color treatments */}
      <Section>
        <h2 className="text-lg font-semibold text-stone-800 mb-4">Color Treatments</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border-2 border-brand/20 rounded-xl p-4 flex flex-col items-center gap-3">
            <StaticLogo size={48} colorMode="color" dotColorMode="grey" />
            <div className="text-center">
              <p className="text-xs font-semibold text-stone-800">Primary</p>
              <p className="text-xs text-stone-500 mt-1">Spectrum stroke, grey dots. Default everywhere.</p>
            </div>
          </div>
          <div className="border border-stone-200 rounded-xl p-4 flex flex-col items-center gap-3">
            <StaticLogo size={48} colorMode="ink" />
            <div className="text-center">
              <p className="text-xs font-semibold text-stone-800">Ink</p>
              <p className="text-xs text-stone-500 mt-1">All #111827. Formal, co-branding, single-color print.</p>
            </div>
          </div>
          <div className="border border-stone-200 rounded-xl p-4 flex flex-col items-center gap-3 bg-stone-900">
            <StaticLogo size={48} colorMode="white" />
            <div className="text-center">
              <p className="text-xs font-semibold text-white">White</p>
              <p className="text-xs text-stone-400 mt-1">All #FFFFFF. Dark backgrounds, overlays.</p>
            </div>
          </div>
          <div className="border border-stone-200 rounded-xl p-4 flex flex-col items-center gap-3">
            <div style={{ opacity: 0.2 }}>
              <StaticLogo size={48} colorMode="grey" />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-stone-800">Grey</p>
              <p className="text-xs text-stone-500 mt-1">All #9CA3AF at low opacity. Watermarks only.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* All 11 variants */}
      <Section>
        <h2 className="text-lg font-semibold text-stone-800 mb-1">All 11 Variants</h2>
        <p className="text-xs text-stone-500 mb-4">Grouped by background. Blue border = default for that group.</p>

        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">On light backgrounds</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
          {variants.filter(v => ['1','2','3','4','5'].includes(v.id)).map(v => (
            <VariantCard key={v.id} v={v} highlight={v.id === '1'} />
          ))}
        </div>

        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">On dark backgrounds</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {variants.filter(v => ['6','7','8','9'].includes(v.id)).map(v => (
            <VariantCard key={v.id} v={v} highlight={v.id === '6'} />
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
              <Logotype fontSize={30} />
            </div>
            <div className="p-3 border-t border-brand/10 bg-brand/5">
              <p className="text-xs font-semibold text-brand">Logotype (preferred for horizontal)</p>
              <p className="text-xs text-stone-500 mt-0.5">The mark replaces the "S", creating a compact, balanced wordmark. Preferred for headers, marketing, and any horizontal context at 36px+.</p>
            </div>
          </div>
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="p-5 flex flex-col gap-4 items-center justify-center bg-stone-50 min-h-[130px]">
              <div className="flex items-center gap-2.5">
                <StaticLogo size={36} colorMode="color" dotColorMode="grey" />
                <div>
                  <span className="font-heading font-semibold text-stone-900 text-sm">Spectrea</span>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest">Brand Guide</p>
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
                <StaticLogo size={52} colorMode="color" dotColorMode="grey" />
                <span className="font-heading font-semibold text-stone-900 text-lg">Spectrea</span>
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
          <div className="p-6 bg-stone-50 space-y-4">
            {[60, 48, 36].map(size => (
              <div key={size} className="flex items-center gap-4">
                <span className="text-xs font-mono text-stone-400 w-10 flex-shrink-0">{size}px</span>
                <Logotype fontSize={size} />
              </div>
            ))}
          </div>
          <div className="p-6 bg-stone-900 space-y-4">
            {[48, 36].map(size => (
              <div key={size} className="flex items-center gap-4">
                <span className="text-xs font-mono text-stone-500 w-10 flex-shrink-0">{size}px</span>
                <Logotype fontSize={size} colorMode="white" dotColorMode="white" color="#FFFFFF" />
              </div>
            ))}
          </div>
          <div className="p-6 bg-white border-t border-stone-100 space-y-4">
            {[48, 36].map(size => (
              <div key={size} className="flex items-center gap-4">
                <span className="text-xs font-mono text-stone-400 w-10 flex-shrink-0">{size}px</span>
                <Logotype fontSize={size} colorMode="ink" dotColorMode="ink" />
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
              <StaticLogo size={36} colorMode="color" dotColorMode="grey" />
              <div>
                <span className="font-heading font-semibold text-stone-900 text-sm">Spectrea</span>
                <p className="text-xs text-stone-400 uppercase tracking-widest">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-stone-500 mt-3">Descriptor: uppercase, tracked widest, Grey (#9CA3AF). Below the wordmark. Use only when the audience needs clarification about which Spectrea product they're in.</p>
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
        <div className="border border-stone-200 rounded-xl overflow-hidden">
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
      </Section>
    </PageShell>
  )
}
