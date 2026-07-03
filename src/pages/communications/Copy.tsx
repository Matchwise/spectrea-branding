import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { brand, voice } from '../../data/brand'

export default function Copy() {
  return (
    <PageShell
      title="Copy & Taglines"
      subtitle="The sanctioned phrases, headline formulas, and vocabulary that keep every Spectrea surface sounding like the same brand."
    >
      {/* Primary tagline */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content={brand.tagline.usage}>
            <span>Primary Tagline</span>
          </Tooltip>
        </h2>
        <div className="text-white rounded-xl p-8 text-center" style={{ backgroundColor: '#18181C' }}>
          <p className="text-3xl font-semibold" style={{ fontFamily: "'Albert Sans', sans-serif" }}>{brand.tagline.statement}</p>
          <p className="text-sm mt-3 max-w-md mx-auto" style={{ color: '#B0B0B6' }}>{brand.tagline.usage}</p>
        </div>
      </Section>

      {/* Messaging hierarchy */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="The messaging hierarchy gives you pre-approved headlines for different themes. Use the primary message most often; secondary messages support specific conversations.">
            <span>Messaging Hierarchy</span>
          </Tooltip>
        </h2>
        <div className="space-y-4">
          {/* Primary */}
          <div className="border-2 border-brand/20 rounded-xl p-5 bg-brand/5">
            <span className="text-xs font-semibold text-brand uppercase tracking-wider">Primary — {brand.messaging.primary.theme}</span>
            <p className="text-xl font-semibold text-ink mt-2" style={{ fontFamily: "'Albert Sans', sans-serif" }}>{brand.messaging.primary.headline}</p>
            <p className="text-sm text-iron mt-1">{brand.messaging.primary.supporting}</p>
          </div>
          {/* Secondary */}
          {brand.messaging.secondary.map(msg => (
            <div key={msg.theme} className="border border-stone-200 rounded-xl p-5">
              <span className="text-xs font-semibold text-pewter uppercase tracking-wider">Secondary — {msg.theme}</span>
              <p className="text-lg font-semibold text-ink mt-2" style={{ fontFamily: "'Albert Sans', sans-serif" }}>{msg.headline}</p>
              <p className="text-sm text-iron mt-1">{msg.supporting}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Headline formulas */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="These patterns generate on-brand headlines. Fill in the brackets with context-appropriate words.">
            <span>Headline Formulas</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { formula: '[Verb] the [noun] that [outcome].', example: 'Surface the connections that drive decisions.' },
            { formula: '[Problem]. [Spectrea solution].', example: 'Information overload. Intelligent clarity.' },
            { formula: 'From [bad state] to [good state].', example: 'From scattered data to compounding intelligence.' },
            { formula: '[Number/metric] that [emotional benefit].', example: 'One graph that makes everything click.' },
            { formula: 'Your [thing] [compounds/grows/evolves].', example: 'Your understanding compounds with every interaction.' },
            { formula: '[Adjective] enough for [expert]. [Adjective] enough for [beginner].', example: 'Powerful enough for architects. Clear enough for everyone.' },
          ].map(item => (
            <div key={item.formula} className="border border-stone-200 rounded-xl p-4">
              <p className="text-sm font-mono text-iron">{item.formula}</p>
              <p className="text-xs text-slate mt-2 italic">"{item.example}"</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Vocabulary */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="The approved vocabulary list — also documented in Voice & Tone. These words shape how Spectrea sounds across every channel.">
            <span>Vocabulary</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#008775' }}>Words We Use</h3>
            <div className="flex flex-wrap gap-1.5">
              {voice.alwaysUse.map(word => (
                <span key={word} className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: '#00B6A010', color: '#008775' }}>{word}</span>
              ))}
            </div>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Words We Never Use</h3>
            <div className="flex flex-wrap gap-1.5">
              {voice.neverUse.map(word => (
                <span key={word} className="text-xs px-2 py-1 rounded-md line-through" style={{ backgroundColor: '#F2426010', color: '#D63B55', textDecorationColor: '#F2426060' }}>{word}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Boilerplate */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Pre-approved descriptions for use in press releases, partner pages, app store listings, and anywhere Spectrea needs a standard description. Copy verbatim — don't paraphrase.">
            <span>Boilerplate Copy</span>
          </Tooltip>
        </h2>
        <div className="space-y-4">
          {[
            { label: 'One-liner', text: 'Spectrea is the composable intelligence platform that turns scattered information into compounding intelligence.' },
            { label: 'Short description (50 words)', text: 'Spectrea connects the dots. It\'s a composable intelligence platform where everything you see is transparent, every connection inspectable, and understanding compounds with every interaction. For anyone who works with knowledge — from business leaders to researchers — Spectrea turns scattered information into intelligence you can trust and build on.' },
            { label: 'Press boilerplate', text: `${brand.name} is a composable intelligence platform that makes knowledge trustworthy, connected, and actionable. Unlike fragmented point solutions that silo knowledge and hide their reasoning, Spectrea gives users a unified substrate where everything is transparent, every connection can be followed back to its source, and intelligence compounds over time. Learn more at spectrea.com.` },
          ].map(item => (
            <div key={item.label} className="border border-stone-200 rounded-xl p-5">
              <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">{item.label}</p>
              <p className="text-sm text-iron leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Dos & Don'ts */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Quick reference for writing Spectrea copy. When in doubt, lead with the human benefit, not the technical feature.">
            <span>Copy Dos & Don'ts</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#008775' }}>Do</h3>
            <ul className="space-y-2 text-sm text-iron">
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Lead with the problem, then the solution</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use the approved vocabulary list</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Show what the user experiences, not what we built</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use headline formulas for consistency across authors</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Copy boilerplate text verbatim — don't paraphrase</li>
            </ul>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Don't</h3>
            <ul className="space-y-2 text-sm text-iron">
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use hype words — "revolutionary", "game-changer", "next-gen"</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Lead with technical architecture instead of human benefit</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use "AI-powered" as a selling point — earn the jargon</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Paraphrase boilerplate text — it's pre-approved for a reason</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use forced enthusiasm or exclamation marks in headlines</li>
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
