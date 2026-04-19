import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { StaticLogo, AnimatedLogo, LogotypeGradient } from '../../components/brand/SpectreaLogo'

export default function PrimaryLogo() {
  return (
    <PageShell
      title="The Logo"
      subtitle="The Spectrea mark tells a story: dots waiting to be connected, a spectrum stroke revealing the path between them."
    >
      {/* Brand context */}
      <Section>
        <div className="bg-cloud rounded-xl border border-stone-100 p-5 space-y-3">
          <p className="text-sm text-iron leading-relaxed">
            The logo embodies <strong>"connecting the dots"</strong> — Spectrea's core promise. Ten dots sit along an S-curve; a spectrum-gradient stroke connects the first eight, leaving two trailing dots <em>about to be connected</em>. The process is ongoing, never finished.
          </p>
          <p className="text-sm text-iron leading-relaxed">
            The <strong>spectrum gradient</strong> (Cobalt → Teal → Amber) is the prism metaphor made visible — raw information enters, and the full range of insight emerges. The <strong>grey dots</strong> are the raw data points, neutral until Spectrea connects them with meaning.
          </p>
        </div>
      </Section>

      {/* Anatomy */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="The logo has three parts: the connecting-dots mark, the wordmark, and the lockup. Each can be used independently in the right context.">
            <span>Anatomy</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-stone-200 rounded-xl p-6 flex flex-col items-center text-center">
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-4">Mark</p>
            <StaticLogo size={80} colorMode="cool" dotColorMode="grey" />
            <p className="text-xs text-slate mt-4">The "connecting the dots" S-curve. 10 dots along a cubic Bezier path, 2 visually trailing. Spectrum-gradient stroke connecting dots 1–8.</p>
          </div>
          <div className="border border-stone-200 rounded-xl p-6 flex flex-col items-center text-center">
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-4">Wordmark</p>
            <div className="h-20 flex items-center">
              <span
                className="font-heading font-semibold"
                style={{ fontSize: 32, letterSpacing: '0.02em', color: '#18181C' }}
              >Spectrea</span>
            </div>
            <p className="text-xs text-slate mt-4">Albert Sans Semibold 600, sentence-case with 0.02em tracking. Shown here as the full word for the structural anatomy — in production the wordmark never appears alone; inside the canonical <code className="font-mono text-[10px]">Logotype</code> / <code className="font-mono text-[10px]">LogotypeGradient</code>, the S mark replaces the leading <code className="font-mono text-[10px]">S</code> and only the tail <code className="font-mono text-[10px]">pectrea</code> is typeset in lowercase.</p>
          </div>
          <div className="border border-stone-200 rounded-xl p-6 flex flex-col items-center text-center">
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-4">Lockup</p>
            <div className="h-20 flex items-center">
              <LogotypeGradient fontSize={22} />
            </div>
            <p className="text-xs text-slate mt-4">S mark carries the Cool Duet gradient; the wordmark is monotone Ink (or White on dark). The lockup has exactly two forms: <code className="font-mono text-[11px]">LogotypeGradient</code> (two-tone mark + mono wordmark) and <code className="font-mono text-[11px]">Logotype</code> (fully mono — ink, white, or grey). See Variants for details.</p>
          </div>
        </div>
      </Section>

      {/* Construction */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="The mark is constructed from 10 dots on a cubic Bezier S-curve with a spectrum-gradient stroke connecting the first 8.">
            <span>Construction</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-center bg-cloud rounded-lg p-8">
              <StaticLogo size={160} colorMode="cool" dotColorMode="grey" />
            </div>
            <div className="space-y-3">
              <div className="bg-cloud rounded-lg px-4 py-3 border border-stone-100">
                <p className="text-xs font-semibold text-slate mb-1">Dots</p>
                <p className="text-sm text-iron">10 dots, radius 3.5. Grey (#A3A3A3) in the primary treatment. Evenly spaced from start to end of the path.</p>
              </div>
              <div className="bg-cloud rounded-lg px-4 py-3 border border-stone-100">
                <p className="text-xs font-semibold text-slate mb-1">Stroke</p>
                <p className="text-sm text-iron">Width 8, round linecap. In both the static mark and the lockup, the stroke carries the <strong>Cool Duet</strong> (Cobalt #4271DF → Teal #00B6A0). Connects dots 1–8, visually covering dot 8.</p>
              </div>
              <div className="bg-cloud rounded-lg px-4 py-3 border border-stone-100">
                <p className="text-xs font-semibold text-slate mb-1">Trailing dots</p>
                <p className="text-sm text-iron">2 dots left visually unconnected — the "about to connect" moment. This is the core visual metaphor: the process is never finished.</p>
              </div>
              <div className="bg-cloud rounded-lg px-4 py-3 border border-stone-100">
                <p className="text-xs font-semibold text-slate mb-1">Container</p>
                <p className="text-sm text-iron">64 × 64 viewBox. Circle container when needed at small sizes. Always round, never squircle — dots are round, so the container is round.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Animated */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">Animated Version</h2>
        <p className="text-sm text-iron mb-4">The spectrum stroke draws along the S connecting the dots, pauses, then dissolves to reveal them again. 3-second loop. Use for loading states, hero animations, and motion assets.</p>
        <div className="border border-stone-200 rounded-xl overflow-hidden inline-block">
          <div className="bg-white p-6 flex items-center justify-center">
            <AnimatedLogo size={200} duration={3} dotColorMode="grey" />
          </div>
        </div>
      </Section>

      {/* Size reference */}
      <Section title="Size Reference">
        <div className="flex items-end gap-6 bg-cloud rounded-xl p-6 border border-stone-100">
          {[24, 32, 48, 64, 96].map(s => (
            <div key={s} className="flex flex-col items-center gap-2">
              <StaticLogo size={s} colorMode="cool" dotColorMode="grey" />
              <span className="text-xs font-mono text-pewter">{s}px</span>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
