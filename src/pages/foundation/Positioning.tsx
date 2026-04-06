import PageShell, { Section } from '../../components/layout/PageShell'
import { brand } from '../../data/brand'

export default function Positioning() {
  return (
    <PageShell
      title="Positioning"
      subtitle="How Spectrea connects its purpose to the market."
    >
      {/* Brand Positioning — elevated */}
      <Section title="Brand Positioning">
        <div className="text-white rounded-xl p-6" style={{ backgroundColor: '#111827' }}>
          <p className="text-base leading-relaxed">{brand.positioning.brand}</p>
        </div>
      </Section>

      {/* Tactical Positioning — for competitive contexts */}
      <Section title="Tactical Positioning">
        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">For sales, pitch decks, and competitive contexts</p>
          <p className="text-sm text-stone-700 leading-relaxed italic">{brand.positioning.tactical}</p>
        </div>
      </Section>

      {/* Category */}
      <Section title="Category Definition">
        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
          <p className="text-sm text-stone-600 leading-relaxed">
            Spectrea is a <strong>composable knowledge platform</strong> — a new category at the intersection
            of knowledge management, graph intelligence, and composable architecture. The real competitor
            isn't Notion or Confluence. It's the fragmented, unverifiable information landscape itself —
            the dozens of disconnected tools and the noise that drowns out signal.
          </p>
          <p className="text-xs text-stone-400 mt-3">
            When compared to specific tools, the key message is: <em>"This isn't a better version of X — it's a fundamentally different kind of thing."</em>
          </p>
        </div>
      </Section>

      {/* Messaging Hierarchy */}
      <Section title="Messaging Hierarchy">
        <p className="text-sm text-stone-500 mb-4">
          Messages are layered. Lead with connection, support with trust, intelligence, composability, and transparency.
        </p>

        {/* Primary */}
        <div className="border-2 border-stone-800 rounded-xl p-5 mb-4">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Primary — Lead With This</span>
          <h3 className="text-xl font-semibold text-stone-900 mt-2">{brand.messaging.primary.headline}</h3>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">{brand.messaging.primary.supporting}</p>
          <span className="text-xs text-stone-400 mt-2 inline-block">Theme: {brand.messaging.primary.theme}</span>
        </div>

        {/* Secondary */}
        <div className="grid grid-cols-1 gap-3">
          {brand.messaging.secondary.map((msg, i) => (
            <div key={msg.theme} className="border border-stone-200 rounded-xl p-5">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Supporting Message {i + 1}
              </span>
              <h3 className="text-base font-semibold text-stone-900 mt-2">{msg.headline}</h3>
              <p className="text-sm text-stone-600 mt-1 leading-relaxed">{msg.supporting}</p>
              <span className="text-xs text-stone-400 mt-2 inline-block">Theme: {msg.theme}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Target Audiences */}
      <Section title="Audience Messaging">
        <p className="text-sm text-stone-500 mb-4">
          Spectrea is for everyone who works with knowledge — but the message adapts to what each audience cares about.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {brand.audiences.map(a => (
            <div key={a.title} className="border border-stone-200 rounded-xl p-5">
              <h3 className="font-semibold text-stone-900 mb-0.5">{a.title}</h3>
              <p className="text-xs text-stone-400 mb-3">{a.who}</p>
              <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">What they need</p>
              <p className="text-sm text-stone-600 mb-3">{a.need}</p>
              <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">What we say</p>
              <p className="text-sm text-stone-700 italic">{a.message}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Competitive Differentiation */}
      <Section title="Differentiation">
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-2 bg-stone-50 border-b border-stone-200">
            <div className="px-4 py-2 text-xs font-semibold text-stone-400 uppercase tracking-wider">Spectrea</div>
            <div className="px-4 py-2 text-xs font-semibold text-stone-400 uppercase tracking-wider">Traditional Tools</div>
          </div>
          {brand.differentiators.map((d, i) => (
            <div key={i} className="grid grid-cols-2 border-b last:border-b-0 border-stone-100">
              <div className="px-4 py-3 text-sm text-stone-700 flex items-start gap-2">
                <span className="mt-0.5 flex-shrink-0 text-xs" style={{ color: '#00B6A0' }}>&#10003;</span>
                {d.spectrea}
              </div>
              <div className="px-4 py-3 text-sm text-stone-400 flex items-start gap-2">
                <span className="text-stone-300 mt-0.5 flex-shrink-0 text-xs">&#10007;</span>
                {d.others}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
