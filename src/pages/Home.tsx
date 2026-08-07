import { Link } from 'react-router-dom'
import { brand } from '../data/brand'
import Tooltip from '../components/brand/Tooltip'
import { LogotypeGradient } from '../components/brand/SpectreaLogo'
import { TbChevronRight } from 'react-icons/tb'

const sections = [
  {
    group: 'Foundation',
    items: [
      { label: 'Brand Story', path: '/foundation/story', desc: 'Origin, mission, vision, values, personality' },
      { label: 'Positioning', path: '/foundation/positioning', desc: 'Audience, differentiation, messaging hierarchy' },
      { label: 'Voice & Tone', path: '/foundation/voice', desc: 'How Spectrea speaks across every context' },
      { label: 'Naming', path: '/foundation/naming', desc: 'Pronunciation, usage rules, naming conventions' },
    ],
  },
  {
    group: 'Visual Identity',
    items: [
      { label: 'Palette Explorer', path: '/color/overview', desc: 'Choose the brand color direction' },
      { label: 'Typography', path: '/typography/typefaces', desc: 'Typeface selection and type scale' },
      { label: 'Logo', path: '/logo/primary', desc: 'Logo system and usage guidelines' },
    ],
  },
  {
    group: 'Application',
    items: [
      { label: 'Components', path: '/components/buttons', desc: 'UI component library and code' },
      { label: 'Communications', path: '/communications/copy', desc: 'Copy, social media, email, presentations' },
      { label: 'Resources', path: '/resources/downloads', desc: 'Downloads, governance, changelog' },
    ],
  },
]

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero */}
      <div className="mb-10 sm:mb-14">
        <h1 className="sr-only">Spectrea Brand Guide</h1>
        <div className="mb-1 [&_svg]:max-w-full" aria-hidden="true">
          <LogotypeGradient fontSize={48} />
        </div>
        <p className="text-lg text-slate">Brand Guide</p>
        <p className="text-base text-slate mt-3">
          <Tooltip content={brand.tagline.usage}>
            {brand.tagline.statement}
          </Tooltip>
        </p>

        {/* Why We Exist */}
        <div className="mt-8 bg-ink text-white rounded-xl p-6">
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#B0B0B6' }}>
            <Tooltip content={brand.why.usage}>
              <span style={{ color: '#B0B0B6' }}>Why We Exist</span>
            </Tooltip>
          </p>
          <p className="text-sm leading-relaxed">{brand.why.statement}</p>
        </div>

        {/* Mission */}
        <div className="mt-4 bg-cloud rounded-xl p-6 border border-stone-200">
          <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">
            <Tooltip content={brand.mission.usage}>
              <span className="text-pewter">Mission</span>
            </Tooltip>
          </p>
          <p className="text-sm text-iron leading-relaxed">{brand.mission.statement}</p>
        </div>

        {/* Vision */}
        <div className="mt-4 bg-cloud rounded-xl p-6 border border-stone-200">
          <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">
            <Tooltip content={brand.vision.usage}>
              <span className="text-pewter">Vision</span>
            </Tooltip>
          </p>
          <p className="text-sm text-iron leading-relaxed">{brand.vision.statement}</p>
        </div>
      </div>

      {/* Brand at a glance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 sm:mb-14">
        <div className="bg-cloud rounded-xl p-5 border border-stone-100">
          <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">
            <Tooltip content="One character, three inseparable facets. Every brand moment — marketing, trust, product — reveals, grounds, and equips in a single motion. The emphasis shifts with context; the character doesn't.">
              <span className="text-pewter">Archetypes</span>
            </Tooltip>
          </p>
          <p className="text-sm font-semibold text-ink">{brand.archetypes.map(a => a.name).join(' → ')}</p>
          <p className="text-xs text-slate mt-1">Three facets, one motion. Reveal (Magician) · Ground (Sage) · Equip (Creator) — present in every brand moment.</p>
        </div>
        <div className="bg-cloud rounded-xl p-5 border border-stone-100">
          <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">
            <Tooltip content="The two emotions every interaction with Spectrea should evoke. Used to evaluate UX, marketing copy, and product decisions: 'Does this make users feel empowered and clear?'">
              <span className="text-pewter">Emotional Core</span>
            </Tooltip>
          </p>
          <p className="text-sm font-semibold text-ink">{brand.emotionalCore.primary} + {brand.emotionalCore.secondary}</p>
          <p className="text-xs text-slate mt-1">{brand.emotionalCore.primaryDescription}</p>
        </div>
        <div className="bg-cloud rounded-xl p-5 border border-stone-100">
          <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">
            <Tooltip content="The overall visual feeling the brand should convey. Guides color, typography, spacing, and imagery decisions. Everything should feel warm and intelligent — like a brilliant mentor.">
              <span className="text-pewter">Aesthetic</span>
            </Tooltip>
          </p>
          <p className="text-sm font-semibold text-ink">{brand.aesthetic.direction}</p>
          <p className="text-xs text-slate mt-1">{brand.aesthetic.description}</p>
        </div>
        <div className="bg-cloud rounded-xl p-5 border border-stone-100">
          <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">
            <Tooltip content="The two visual metaphors that inform logo, illustration, and motion design. The prism represents the 'reveal' moment; the network represents 'growth over time.'">
              <span className="text-pewter">Visual Metaphor</span>
            </Tooltip>
          </p>
          <p className="text-sm font-semibold text-ink">{brand.visualMetaphor.metaphors.map(m => m.name).join(' + ')}</p>
          <p className="text-xs text-slate mt-1">{brand.visualMetaphor.combined}</p>
        </div>
      </div>

      {/* Sections */}
      {sections.map(group => (
        <div key={group.group} className="mb-10">
          <h2 className="text-xs font-semibold text-pewter uppercase tracking-wider mb-3">{group.group}</h2>
          <div className="space-y-2">
            {group.items.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="group flex items-center justify-between p-4 rounded-xl border border-stone-200 hover:border-stone-300 hover:bg-cloud transition-all duration-150 btn-focus"
              >
                <div>
                  <p className="text-sm font-medium text-ink group-hover:text-brand transition-colors duration-150">{item.label}</p>
                  <p className="text-xs text-slate mt-0.5">{item.desc}</p>
                </div>
                <TbChevronRight size={16} className="text-pewter group-hover:text-brand/60 transition-colors duration-150" />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
