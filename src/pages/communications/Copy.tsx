import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { brand, voice } from '../../data/brand'

export default function Copy() {
  return (
    <PageShell
      title="Copy & Taglines"
      subtitle="Approved messaging, headline formulas, and copy patterns for Spectrea."
    >
      {/* Primary tagline */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content={brand.tagline.usage}>
            <span>Primary Tagline</span>
          </Tooltip>
        </h2>
        <div className="bg-stone-900 text-white rounded-xl p-8 text-center">
          <p className="text-3xl font-semibold" style={{ fontFamily: "'Albert Sans', sans-serif" }}>{brand.tagline.statement}</p>
          <p className="text-sm text-stone-400 mt-3 max-w-md mx-auto">{brand.tagline.usage}</p>
        </div>
      </Section>

      {/* Messaging hierarchy */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="The messaging hierarchy gives you pre-approved headlines for different themes. Use the primary message most often; secondary messages support specific conversations.">
            <span>Messaging Hierarchy</span>
          </Tooltip>
        </h2>
        <div className="space-y-4">
          {/* Primary */}
          <div className="border-2 border-brand/20 rounded-xl p-5 bg-brand/5">
            <span className="text-xs font-semibold text-brand uppercase tracking-wider">Primary — {brand.messaging.primary.theme}</span>
            <p className="text-xl font-semibold text-stone-900 mt-2" style={{ fontFamily: "'Albert Sans', sans-serif" }}>{brand.messaging.primary.headline}</p>
            <p className="text-sm text-stone-600 mt-1">{brand.messaging.primary.supporting}</p>
          </div>
          {/* Secondary */}
          {brand.messaging.secondary.map(msg => (
            <div key={msg.theme} className="border border-stone-200 rounded-xl p-5">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Secondary — {msg.theme}</span>
              <p className="text-lg font-semibold text-stone-900 mt-2" style={{ fontFamily: "'Albert Sans', sans-serif" }}>{msg.headline}</p>
              <p className="text-sm text-stone-600 mt-1">{msg.supporting}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Headline formulas */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
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
              <p className="text-sm font-mono text-stone-700">{item.formula}</p>
              <p className="text-xs text-stone-500 mt-2 italic">"{item.example}"</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Vocabulary */}
      <Section title="Vocabulary">
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
      <Section title="Boilerplate Copy">
        <div className="space-y-4">
          {[
            { label: 'One-liner', text: 'Spectrea is the composable knowledge platform that turns scattered information into compounding intelligence.' },
            { label: 'Short description (50 words)', text: 'Spectrea connects the dots. It\'s a composable knowledge platform where every claim is traceable, every insight is inspectable, and understanding compounds with every interaction. For anyone who works with knowledge — from business leaders to researchers — Spectrea turns scattered information into intelligence you can trust and build on.' },
            { label: 'Press boilerplate', text: `${brand.name} is a composable knowledge platform that makes knowledge trustworthy, connected, and actionable. Unlike fragmented point solutions that silo knowledge and hide their reasoning, Spectrea gives users a unified substrate where every claim has a source, every connection is traceable, and intelligence compounds over time. Learn more at spectrea.com.` },
          ].map(item => (
            <div key={item.label} className="border border-stone-200 rounded-xl p-5">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">{item.label}</p>
              <p className="text-sm text-stone-700 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
