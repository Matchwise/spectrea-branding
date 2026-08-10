import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'

export default function Social() {
  return (
    <PageShell
      title="Social Media"
      subtitle="How Spectrea reads in the feed — profiles, post patterns, and visual templates that hold their shape across platforms."
    >
      {/* Profile setup */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Consistent profile setup across platforms builds recognition. The mark works as an avatar; the lockup works as a cover image element.">
            <span>Profile Setup</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-x-auto">
          <div className="min-w-[640px]">
          <div className="grid grid-cols-4 bg-cloud border-b border-stone-200 px-4 py-2">
            <span className="text-xs font-semibold text-pewter uppercase tracking-wider">Platform</span>
            <span className="text-xs font-semibold text-pewter uppercase tracking-wider">Avatar</span>
            <span className="text-xs font-semibold text-pewter uppercase tracking-wider">Cover</span>
            <span className="text-xs font-semibold text-pewter uppercase tracking-wider">Bio</span>
          </div>
          {[
            { platform: 'LinkedIn', avatar: 'Gradient mark (400x400px)', cover: 'Brand gradient bar + tagline on Ink background', bio: 'We connect the dots. Composable intelligence platform.' },
            { platform: 'Twitter / X', avatar: 'Gradient mark (400x400px)', cover: 'Gradient bar at bottom, tagline centered', bio: 'We connect the dots. Composable intelligence platform.' },
            { platform: 'GitHub', avatar: 'Gradient mark (square)', cover: 'N/A', bio: 'Composable intelligence platform. Open interfaces and developer tools.' },
            { platform: 'Product Hunt', avatar: 'Gradient mark', cover: 'Product screenshot with gradient accent', bio: 'Answers that show their sources, from a system that gets sharper every week.' },
          ].map((row, i) => (
            <div key={row.platform} className="grid grid-cols-4 px-4 py-3" style={{ borderBottom: i < 3 ? '1px solid #F5F5F4' : 'none' }}>
              <span className="text-sm font-medium text-ink">{row.platform}</span>
              <span className="text-xs text-iron">{row.avatar}</span>
              <span className="text-xs text-iron">{row.cover}</span>
              <span className="text-xs text-slate italic">{row.bio}</span>
            </div>
          ))}
          </div>
        </div>
      </Section>

      {/* Post templates */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
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
              example: 'Every document you add now strengthens what the system already knows. Connections you might have missed start surfacing on their own. Your second month is better than your first.',
            },
            {
              type: 'Social Proof',
              template: 'Metric or quote → Context → Implication',
              example: '"We went from 4 hours of manual research to instant answers we could trust and trace." — Knowledge team at [Company]',
            },
            {
              type: 'Question / Engagement',
              template: 'Provocative question → Implied answer → Invitation',
              // The compounding claim always carries its mechanism (canon
              // usageGuardrail): the mechanism, not the slogan, carries it.
              example: 'What if every document you uploaded made your whole system smarter? Every upload is connected — source attached — to everything you\'ve already added, and each answer feeds the next one. That\'s the loop behind compounding intelligence.',
            },
          ].map(post => (
            <div key={post.type} className="border border-stone-200 rounded-xl p-5">
              <p className="text-sm font-semibold text-ink mb-1">{post.type}</p>
              <p className="text-xs text-slate font-mono mb-3">{post.template}</p>
              <div className="bg-cloud rounded-lg p-3 border border-stone-100">
                <p className="text-xs text-iron leading-relaxed italic">"{post.example}"</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Visual templates */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Social graphics keep one idea per card with a gradient accent. Ink backgrounds are for quote and single-stat emphasis cards — the earned-Ink rule from decks applies in the feed too. Product visuals and everything else sit on Canvas.">
            <span>Visual Templates</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Quote card */}
          <div>
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">Quote Card</p>
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#18181C' }}>
              <div className="p-6">
                <p className="text-sm font-semibold leading-relaxed" style={{ color: '#F4F4F1', fontFamily: "'Albert Sans', sans-serif" }}>
                  "See everything your organization knows in one connected view."
                </p>
                <p className="text-xs mt-3" style={{ color: '#B0B0B6' }}>— Spectrea</p>
              </div>
              <div className="h-1 brand-gradient-h" />
            </div>
          </div>

          {/* Stat card */}
          <div>
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">Stat Card</p>
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#18181C' }}>
              <div className="p-6 text-center">
                <p className="text-3xl font-semibold" style={{ color: '#F4F4F1', fontFamily: "'Albert Sans', sans-serif" }}>94%</p>
                <p className="text-xs mt-1" style={{ color: '#B0B0B6' }}>average confidence across all items</p>
              </div>
              <div className="h-1 brand-gradient-h" />
            </div>
          </div>
        </div>
      </Section>

      {/* Rules */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="These rules apply to every Spectrea social post. They keep the brand voice consistent across platforms and team members.">
            <span>Social Media Rules</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#007D6E' }}>Do</h3>
            <ul className="space-y-2 text-sm text-iron">
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Lead with ideas, not product features</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use the approved vocabulary list</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Keep visuals clean — Ink is earned (quote / stat emphasis only), Canvas elsewhere</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>End with an invitation, not a hard sell</li>
            </ul>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Don't</h3>
            <ul className="space-y-2 text-sm text-iron">
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
