import PageShell, { Section } from '../../components/layout/PageShell'
import { StaticLogo, Logotype, LogotypeGradient } from '../../components/brand/SpectreaLogo'

function DoExample({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-xl overflow-hidden" style={{ borderColor: '#00B6A025' }}>
      <div className="h-24 flex items-center justify-center relative" style={{ backgroundColor: '#00B6A008' }}>
        {children}
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00B6A010' }}>
          <span className="text-xs font-semibold" style={{ color: '#00B6A0' }}>&#10003;</span>
        </div>
      </div>
      <div className="px-3 py-2 border-t" style={{ borderColor: '#00B6A015' }}>
        <p className="text-xs" style={{ color: '#008775' }}>{label}</p>
      </div>
    </div>
  )
}

function DontExample({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-xl overflow-hidden" style={{ borderColor: '#F2426025' }}>
      <div className="h-24 flex items-center justify-center relative" style={{ backgroundColor: '#F2426008' }}>
        {children}
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F2426010' }}>
          <span className="text-xs font-semibold" style={{ color: '#F24260' }}>&#10007;</span>
        </div>
      </div>
      <div className="px-3 py-2 border-t" style={{ borderColor: '#F2426015' }}>
        <p className="text-xs" style={{ color: '#D63B55' }}>{label}</p>
      </div>
    </div>
  )
}

export default function LogoGuidelines() {
  return (
    <PageShell
      title="Guidelines"
      subtitle="How to use the logo correctly — spacing, sizing, backgrounds, and partnerships."
    >
      {/* Clear space */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">Clear Space</h2>
        <p className="text-sm text-stone-600 mb-4">The two trailing dots represent connections <em>about to be made</em>. When elements crowd into that space, the dots stop reading as intentional and look like noise.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DoExample label="1x mark width on all sides (minimum)">
            <div className="border-2 border-dashed border-brand/20 rounded-full p-6">
              <LogotypeGradient fontSize={18} />
            </div>
          </DoExample>
          <DontExample label="Elements crowding the trailing dots">
            <div className="flex items-center gap-0">
              <span className="text-xs text-stone-400">Check out</span>
              <StaticLogo size={28} colorMode="cool" dotColorMode="grey" />
              <span className="font-heading font-semibold text-stone-900 text-xs" style={{ letterSpacing: '0.02em' }}>SPECTREA</span>
              <span className="text-xs text-stone-400">today!</span>
            </div>
          </DontExample>
        </div>
        <p className="text-xs text-stone-500 mt-3">On print, maintain at least 10mm margin from page edges to account for bleed and trim variation.</p>
      </Section>

      {/* Minimum sizes */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">Minimum Sizes</h2>
        <p className="text-sm text-stone-600 mb-4">Below these sizes, the dots and stroke become indistinguishable.</p>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { context: 'Full lockup (print)', min: '24mm wide', note: 'Below this, switch to mark only' },
            { context: 'Full lockup (digital)', min: '120px wide', note: 'Below this, switch to mark only' },
            { context: 'Mark only (print)', min: '8mm', note: 'S-curve still discernible' },
            { context: 'Mark only (digital)', min: '24px', note: 'Dots still visible' },
            { context: 'In ink circle (digital)', min: '32px container', note: 'Circle gives weight at small sizes' },
            { context: 'Logotype', min: '36px font-size', note: 'Below this, mark detail is lost — use horizontal lockup' },
          ].map((row, i) => (
            <div key={row.context} className="flex items-center gap-4 px-4 py-3" style={{ borderBottom: i < 5 ? '1px solid #F3F4F6' : 'none' }}>
              <div className="w-44 flex-shrink-0">
                <p className="text-sm font-medium text-stone-700">{row.context}</p>
              </div>
              <div className="w-28 flex-shrink-0">
                <span className="text-xs font-mono text-brand bg-brand/5 px-2 py-1 rounded">{row.min}</span>
              </div>
              <p className="text-xs text-stone-500">{row.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Backgrounds */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">Background Pairing</h2>
        <p className="text-sm text-stone-600 mb-4">All logo elements must maintain at least 2.5:1 contrast. Mid-tone backgrounds are the danger zone.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <DoExample label="Primary on white or light neutrals">
            <LogotypeGradient fontSize={16} />
          </DoExample>
          <DoExample label="Primary on solid dark (Ink / Graphite)">
            <div className="bg-ink rounded-lg px-3 py-2">
              <LogotypeGradient fontSize={14} />
            </div>
          </DoExample>
          <DoExample label="White on photo with 40%+ dark overlay">
            <div className="relative rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-stone-500 to-stone-600 px-3 py-2">
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative">
                  <Logotype fontSize={14} colorMode="white" color="#FDFDFB" />
                </div>
              </div>
            </div>
          </DoExample>
          <DontExample label="Any variant on mid-tone backgrounds">
            <div className="bg-stone-400 rounded-lg px-3 py-2 flex items-center gap-2">
              <StaticLogo size={28} colorMode="cool" dotColorMode="grey" />
              <span className="font-heading font-semibold text-stone-900 text-xs" style={{ letterSpacing: '0.02em' }}>SPECTREA</span>
            </div>
          </DontExample>
          <DontExample label="Photo without sufficient overlay">
            <div className="bg-gradient-to-r from-stone-400 to-stone-500 rounded-lg px-3 py-2 flex items-center gap-2">
              <StaticLogo size={28} colorMode="white" />
              <span className="font-heading font-semibold text-white text-xs" style={{ letterSpacing: '0.02em' }}>SPECTREA</span>
            </div>
          </DontExample>
          <DontExample label="Ink mark on dark — invisible">
            <div className="bg-ink rounded-lg px-3 py-3 flex items-center justify-center">
              <StaticLogo size={28} colorMode="ink" />
            </div>
          </DontExample>
        </div>
      </Section>

      {/* Contained marks */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">Contained Marks</h2>
        <p className="text-sm text-stone-600 mb-4">Below 48px, the bare mark's dots and stroke are hard to distinguish. Use a circle container. The circle is a legibility aid — use the bare mark whenever size allows.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <DoExample label="Ink circle at favicon / app icon size">
            <div className="w-10 h-10 rounded-full bg-[#18181C] flex items-center justify-center">
              <StaticLogo size={26} colorMode="white" />
            </div>
          </DoExample>
          <DoExample label="Ink circle in nav sidebar">
            <div className="bg-stone-100 rounded-lg px-2 py-1.5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#18181C] flex items-center justify-center">
                <StaticLogo size={18} colorMode="white" />
              </div>
              <span className="font-heading font-semibold text-stone-700 text-[10px]" style={{ letterSpacing: '0.02em' }}>SPECTREA</span>
            </div>
          </DoExample>
          <DontExample label="Squircle or rounded-square">
            <div className="w-12 h-12 rounded-2xl bg-[#18181C] flex items-center justify-center">
              <StaticLogo size={30} colorMode="white" />
            </div>
          </DontExample>
          <DontExample label="Circle when mark is large enough">
            <div className="flex items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-[#18181C] flex items-center justify-center">
                <StaticLogo size={40} colorMode="white" />
              </div>
            </div>
          </DontExample>
        </div>
      </Section>

      {/* Co-branding */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">Co-Branding</h2>
        <p className="text-sm text-stone-600 mb-4">The spectrum gradient is distinctive — placed next to another brand's colors, it creates visual noise rather than partnership. Switch to ink so both logos sit on equal footing.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DoExample label="Ink logos, divider, equal sizing">
            <div className="flex items-center gap-6">
              <Logotype fontSize={14} colorMode="ink" />
              <div className="w-px h-6 bg-stone-300" />
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-stone-300" />
                <span className="text-xs text-stone-400">Partner</span>
              </div>
            </div>
          </DoExample>
          <DontExample label="Spectrum gradient competing with partner colors">
            <div className="flex items-center gap-4">
              <LogotypeGradient fontSize={14} />
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-purple-500" />
                <span className="text-xs font-medium text-purple-500">Partner</span>
              </div>
            </div>
          </DontExample>
        </div>
        <div className="bg-stone-50 rounded-xl border border-stone-100 p-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { rule: 'Use ink treatment (#3 or #4)', reason: 'Removes color competition — the focus is the partnership, not the palette.' },
              { rule: 'Equal or proportional sizing', reason: 'The viewer should read "partnership", not "endorsement."' },
              { rule: 'Separate with a vertical divider or generous space', reason: 'Makes it immediately clear these are two separate brands.' },
              { rule: 'Never merge, interlock, or overlay logos', reason: 'The dots-and-stroke structure must remain intact and readable.' },
            ].map(item => (
              <div key={item.rule} className="bg-white rounded-lg px-3 py-2 border border-stone-100">
                <p className="text-xs font-medium text-stone-700">{item.rule}</p>
                <p className="text-xs text-stone-400 mt-0.5">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Accessibility */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">Contrast & Accessibility</h2>
        <p className="text-sm text-stone-600 mb-4">Logos are exempt from WCAG contrast requirements, but we hold ourselves to a 2.5:1 minimum so the mark remains legible in all contexts. The ink and white treatments far exceed this.</p>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { element: 'Cobalt stroke on white', ratio: '4.5:1', status: 'Exceeds minimum' },
            { element: 'Teal stroke on white', ratio: '2.6:1', status: 'Passes 2.5:1' },
            { element: 'Amber stroke on white', ratio: '2.6:1', status: 'Passes 2.5:1' },
            { element: 'Grey dots (#A3A3A3) on white', ratio: '2.7:1', status: 'Decorative — no minimum required' },
            { element: 'Ink mark on white', ratio: '17.7:1', status: 'Exceeds WCAG AAA' },
            { element: 'White mark on Ink', ratio: '17.7:1', status: 'Exceeds WCAG AAA' },
          ].map((row, i) => (
            <div key={row.element} className="grid grid-cols-3 px-4 py-2.5" style={{ borderBottom: i < 5 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-sm text-stone-700">{row.element}</span>
              <span className="text-xs font-mono text-stone-600">{row.ratio}</span>
              <span className="text-xs font-medium" style={{ color: '#00B6A0' }}>{row.status}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-stone-500 mt-3">When contrast is critical (legal, accessibility-sensitive contexts), use the ink (#3/#4) or white (#8/#9) treatments which provide 17.7:1.</p>
      </Section>
    </PageShell>
  )
}
