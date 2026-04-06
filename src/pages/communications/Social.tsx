import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'

export default function Social() {
  return (
    <PageShell
      title="Social Media"
      subtitle="Social media guidelines — profile setup, post patterns, and visual templates."
    >
      {/* Profile setup */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Consistent profile setup across platforms builds recognition. The mark works as an avatar; the lockup works as a cover image element.">
            <span>Profile Setup</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { platform: 'LinkedIn', avatar: 'Gradient mark (400x400px)', cover: 'Brand gradient bar + tagline on Ink background', bio: 'We connect the dots. Composable knowledge platform.' },
            { platform: 'Twitter / X', avatar: 'Gradient mark (400x400px)', cover: 'Gradient bar at bottom, tagline centered', bio: 'We connect the dots. Knowledge, connected.' },
            { platform: 'GitHub', avatar: 'Gradient mark (square)', cover: 'N/A', bio: 'Composable knowledge platform. Open-source tools.' },
            { platform: 'Product Hunt', avatar: 'Gradient mark', cover: 'Product screenshot with gradient accent', bio: 'Turns scattered info into compounding intelligence.' },
          ].map((row, i) => (
            <div key={row.platform} className="grid grid-cols-4 px-4 py-3" style={{ borderBottom: i < 3 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-sm font-medium text-stone-800">{row.platform}</span>
              <span className="text-xs text-stone-600">{row.avatar}</span>
              <span className="text-xs text-stone-600">{row.cover}</span>
              <span className="text-xs text-stone-500 italic">{row.bio}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Post templates */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Social posts should feel thoughtful, not salesy. Lead with an idea or question, then connect to Spectrea. Never use hype words.">
            <span>Post Patterns</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              type: 'Thought Leadership',
              template: 'Observation about the problem → Insight → Spectrea connection',
              example: 'Most teams have more data than ever and less clarity than ever. The problem isn\'t collection — it\'s connection. When information compounds instead of piling up, everything changes.',
            },
            {
              type: 'Feature Announcement',
              template: 'What users experience → What changed → Why it matters',
              example: 'Every document you upload now automatically enriches your knowledge graph. Connections you never noticed start surfacing. Your second month is better than your first.',
            },
            {
              type: 'Social Proof',
              template: 'Metric or quote → Context → Implication',
              example: '"We went from 4 hours of manual research to instant answers with full provenance." — Knowledge team at [Company]',
            },
            {
              type: 'Question / Engagement',
              template: 'Provocative question → Implied answer → Invitation',
              example: 'What if every document you uploaded made your whole system smarter? That\'s not a hypothetical — it\'s how compounding intelligence works.',
            },
          ].map(post => (
            <div key={post.type} className="border border-stone-200 rounded-xl p-5">
              <p className="text-sm font-semibold text-stone-800 mb-1">{post.type}</p>
              <p className="text-xs text-stone-400 font-mono mb-3">{post.template}</p>
              <div className="bg-stone-50 rounded-lg p-3 border border-stone-100">
                <p className="text-xs text-stone-600 leading-relaxed italic">"{post.example}"</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Visual templates */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Social graphics follow a simple template: dark background, brand gradient accent, and clear typography. Keep it clean and confident.">
            <span>Visual Templates</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Quote card */}
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Quote Card</p>
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#111827' }}>
              <div className="p-6">
                <p className="text-sm font-semibold leading-relaxed" style={{ color: '#F9FAFB', fontFamily: "'Albert Sans', sans-serif" }}>
                  "Stop losing knowledge to silos."
                </p>
                <p className="text-xs mt-3" style={{ color: '#6B7280' }}>— Spectrea</p>
              </div>
              <div className="h-1" style={{ background: 'linear-gradient(90deg, #4271DF, #00B6A0, #E19000)' }} />
            </div>
          </div>

          {/* Stat card */}
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Stat Card</p>
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#111827' }}>
              <div className="p-6 text-center">
                <p className="text-3xl font-semibold" style={{ color: '#F9FAFB', fontFamily: "'Albert Sans', sans-serif" }}>94%</p>
                <p className="text-xs mt-1" style={{ color: '#6B7280' }}>average trust score across all entities</p>
              </div>
              <div className="h-1" style={{ background: 'linear-gradient(90deg, #4271DF, #00B6A0, #E19000)' }} />
            </div>
          </div>
        </div>
      </Section>

      {/* Rules */}
      <Section title="Social Media Rules">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#008775' }}>Do</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Lead with ideas, not product features</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use the approved vocabulary list</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Keep visuals clean — dark bg + gradient accent</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>End with an invitation, not a hard sell</li>
            </ul>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Don't</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use hype words ("revolutionary", "game-changer")</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Post clickbait or engagement bait</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use stock photos — use product screenshots instead</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Over-post — quality over frequency</li>
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
