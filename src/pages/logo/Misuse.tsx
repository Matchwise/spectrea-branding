import PageShell, { Section } from '../../components/layout/PageShell'
import { StaticLogo } from '../../components/brand/SpectreaLogo'

function MisuseExample({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-xl overflow-hidden" style={{ borderColor: '#F2426025' }}>
      <div className="h-32 flex items-center justify-center bg-stone-50 relative">
        {children}
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F2426010' }}>
          <span className="text-xs font-semibold" style={{ color: '#F24260' }}>&#10007;</span>
        </div>
      </div>
      <div className="px-4 py-3 border-t" style={{ backgroundColor: '#F2426008', borderColor: '#F2426015' }}>
        <p className="text-sm font-medium" style={{ color: '#BA3249' }}>{title}</p>
        <p className="text-xs text-stone-500 mt-0.5">{description}</p>
      </div>
    </div>
  )
}

export default function Misuse() {
  return (
    <PageShell
      title="Logo Misuse"
      subtitle="How NOT to use the Spectrea logo. If you see any of these, fix it."
    >
      <Section title="Common Violations">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Stretched */}
          <MisuseExample title="Don't stretch or distort" description="Always maintain the original aspect ratio. Never squeeze or stretch the mark.">
            <div style={{ transform: 'scaleX(1.5)' }}>
              <StaticLogo size={48} colorMode="color" dotColorMode="grey" />
            </div>
          </MisuseExample>

          {/* Wrong colors */}
          <MisuseExample title="Don't change the colors" description="The spectrum gradient is Cobalt to Teal to Amber. Never substitute with other colors.">
            <div style={{ filter: 'hue-rotate(120deg) saturate(1.5)' }}>
              <StaticLogo size={48} colorMode="color" dotColorMode="grey" />
            </div>
          </MisuseExample>

          {/* Rotated */}
          <MisuseExample title="Don't rotate the logo" description="The S-curve should always be in its original orientation. Never tilt or rotate.">
            <div style={{ transform: 'rotate(-20deg)' }}>
              <div className="flex items-center gap-2">
                <StaticLogo size={40} colorMode="color" dotColorMode="grey" />
                <span className="font-heading font-semibold text-stone-900 text-sm">Spectrea</span>
              </div>
            </div>
          </MisuseExample>

          {/* Drop shadow */}
          <MisuseExample title="Don't add effects" description="No drop shadows, glows, bevels, or 3D effects on the mark.">
            <div style={{ filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.4))' }}>
              <StaticLogo size={48} colorMode="color" dotColorMode="grey" />
            </div>
          </MisuseExample>

          {/* Outline only */}
          <MisuseExample title="Don't use only the stroke path" description="The dots are integral to the mark. Never render just the S-curve stroke without dots.">
            <svg width={48} height={48} viewBox="0 0 64 64" fill="none">
              <path d="M 44 12 C 34 6, 20 6, 20 18 C 20 30, 44 34, 44 46 C 44 58, 30 58, 20 52" stroke="#4271DF" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>
          </MisuseExample>

          {/* Low contrast */}
          <MisuseExample title="Don't use on low-contrast backgrounds" description="The mark must maintain at least 2.5:1 contrast. Never place on backgrounds that reduce legibility.">
            <div style={{ opacity: 0.25 }}>
              <StaticLogo size={48} colorMode="color" dotColorMode="grey" />
            </div>
          </MisuseExample>

          {/* Changed dot count */}
          <MisuseExample title="Don't change the number of dots" description="The mark always has exactly 10 dots with 2 visually trailing. Never add, remove, or rearrange dots.">
            <StaticLogo size={48} colorMode="color" dotColorMode="grey" totalDots={6} tailDots={2} />
          </MisuseExample>

          {/* Rearranged */}
          <MisuseExample title="Don't rearrange the lockup" description="The mark is always to the left of the wordmark. Never stack or swap positions.">
            <div className="flex flex-col items-center gap-1">
              <span className="font-heading font-semibold text-stone-900 text-sm">Spectrea</span>
              <StaticLogo size={36} colorMode="color" dotColorMode="grey" />
            </div>
          </MisuseExample>

          {/* Crowded */}
          <MisuseExample title="Don't violate clear space" description="The logo needs room to breathe. The trailing dots especially need space to read as 'about to connect.'">
            <div className="flex items-center gap-0">
              <span className="text-xs text-stone-400">Check out</span>
              <StaticLogo size={32} colorMode="color" dotColorMode="grey" />
              <span className="font-heading font-semibold text-stone-900 text-xs">Spectrea</span>
              <span className="text-xs text-stone-400">today!</span>
            </div>
          </MisuseExample>

          {/* Squircle container */}
          <MisuseExample title="Don't use a squircle container" description="The mark container is always a circle, never a rounded square or squircle.">
            <div className="w-16 h-16 rounded-2xl bg-[#111827] flex items-center justify-center">
              <StaticLogo size={40} colorMode="white" />
            </div>
          </MisuseExample>

          {/* Colored dots */}
          <MisuseExample title="Don't color the dots" description="In the primary treatment, dots are always grey (#A3A3A3). The spectrum color lives in the stroke only.">
            <StaticLogo size={48} colorMode="color" />
          </MisuseExample>

          {/* Wrong font */}
          <MisuseExample title="Don't use the wrong typeface" description="The wordmark is always Albert Sans Semibold. Never substitute another font.">
            <div className="flex items-center gap-2">
              <StaticLogo size={36} colorMode="color" dotColorMode="grey" />
              <span className="font-semibold text-stone-900 text-sm" style={{ fontFamily: 'serif' }}>Spectrea</span>
            </div>
          </MisuseExample>
        </div>
      </Section>

      {/* Simple test */}
      <Section title="The Simple Test">
        <div className="bg-stone-900 text-white rounded-xl p-6">
          <p className="text-sm leading-relaxed">
            If you need to ask "is this OK?" — it probably isn't. The logo should always look exactly like the approved versions on the <strong>Variations</strong> page. When in doubt, use the primary treatment (grey dots, spectrum stroke) on a white background. That's always correct.
          </p>
        </div>
      </Section>
    </PageShell>
  )
}
