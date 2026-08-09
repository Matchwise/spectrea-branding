import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { Logotype, LogotypeGradient } from '../../components/brand/SpectreaLogo'

// ─────────────────────────────────────────────────────────────────────
// Subtle corner wisp — echoes the brand gradient without shouting.
// Kept at 6–10% opacity so it reads as atmosphere, not decoration.
// ─────────────────────────────────────────────────────────────────────
function CanvasWisp() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse 70% 55% at 100% 0%, rgba(66,113,223,0.08), transparent 65%), ' +
          'radial-gradient(ellipse 55% 45% at 0% 100%, rgba(225,144,0,0.06), transparent 65%)',
      }}
    />
  )
}

function InkWisp() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse 65% 55% at 100% 0%, rgba(66,113,223,0.16), transparent 65%), ' +
          'radial-gradient(ellipse 55% 50% at 0% 100%, rgba(225,144,0,0.10), transparent 65%)',
      }}
    />
  )
}

export default function Presentations() {
  return (
    <PageShell
      title="Presentations"
      subtitle="How Spectrea decks look, sound, and hold together — from the opening slide to the closing ask."
    >
      {/* Mode balance */}
      <Section>
        <div className="rounded-xl border border-stone-200 overflow-hidden">
          <div className="px-5 py-3 bg-cloud border-b border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate">Deck mode balance</p>
          </div>
          <div className="p-5">
            <p className="text-sm text-iron leading-relaxed mb-3">
              Your deck lives on Canvas. The warmth is deliberate — it's what keeps a Spectrea talk from feeling like a system briefing. Ink slides earn their place as punctuation: a number that lands, a section break worth pausing on, the closing ask. Think four-fifths Canvas, one-fifth Ink.
            </p>
            <div className="h-7 rounded-md overflow-hidden flex mb-2 border border-stone-200">
              <div className="flex-[80] flex items-center justify-center" style={{ backgroundColor: '#FDFDFB' }}>
                <span className="text-xs font-semibold text-slate">Canvas — 80%</span>
              </div>
              <div className="flex-[20] flex items-center justify-center" style={{ backgroundColor: '#18181C' }}>
                <span className="text-xs font-semibold" style={{ color: '#F4F4F1' }}>Ink — 20%</span>
              </div>
            </div>
            <p className="text-xs text-slate leading-relaxed">
              Canvas carries the everyday — opening, agenda, content, data, close. Ink marks the moments you want the room to feel. When you do go dark, text shifts to Cloud <code className="font-mono">#F4F4F1</code>, muted to Mist <code className="font-mono">#B0B0B6</code>; accents don't flinch. The brand keeps its voice across both.
            </p>
          </div>
        </div>
      </Section>

      {/* Slide types — Canvas default (the 80%) */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-1">
          <Tooltip content="A small set of layouts covering the bulk of any deck. Consistency is the thing that makes different decks still feel like Spectrea.">
            <span>Slide Types — Canvas default</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-slate mb-4 leading-relaxed">
          These four carry most of a Spectrea deck. Warm ground, a gradient accent where emphasis is earned, type and spacing doing the real work. The backgrounds aren't empty — a soft corner wisp of the brand gradient keeps each slide breathing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Title slide — Canvas with full logotype centered */}
          <div>
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">Title Slide</p>
            <div className="rounded-xl overflow-hidden border border-stone-200 aspect-video relative" style={{ backgroundColor: '#FDFDFB' }}>
              <CanvasWisp />
              <div className="h-full flex flex-col items-center justify-center p-6 relative">
                <LogotypeGradient fontSize={22} />
                <p className="text-base font-semibold text-center mt-4" style={{ color: '#18181C', fontFamily: "'Albert Sans', sans-serif" }}>We connect the dots.</p>
                <p className="text-xs mt-1" style={{ color: '#6D6D72' }}>Composable intelligence platform</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 brand-gradient-h" />
            </div>
          </div>

          {/* Content slide — Canvas, logotype footer, subtle wisp */}
          <div>
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">Content Slide</p>
            <div className="rounded-xl overflow-hidden border border-stone-200 aspect-video relative" style={{ backgroundColor: '#FDFDFB' }}>
              <CanvasWisp />
              <div className="h-full flex flex-col p-5 relative">
                <p className="text-sm font-semibold text-ink" style={{ fontFamily: "'Albert Sans', sans-serif" }}>The Knowledge Problem</p>
                <div className="flex-1 flex items-center">
                  <div className="space-y-2 w-full">
                    {['More data, less truth', 'More tools, fewer insights', 'More noise, less action'].map((line, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: ['#4271DF', '#00B6A0', '#E19000'][i] }} />
                        <p className="text-xs text-iron">{line}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <Logotype fontSize={10} colorMode="ink" color="#97979E" />
                  <span className="text-xs text-pewter">3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stat / Impact slide — Canvas with Cobalt hero number + logotype footer */}
          <div>
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">Stat / Impact Slide</p>
            <div className="rounded-xl overflow-hidden border border-stone-200 aspect-video relative" style={{ backgroundColor: '#FDFDFB' }}>
              <CanvasWisp />
              <div className="h-full flex flex-col items-center justify-center p-6 relative">
                <p className="text-5xl font-semibold" style={{ color: '#4271DF', fontFamily: "'Albert Sans', sans-serif" }}>94%</p>
                <p className="text-xs mt-2" style={{ color: '#6D6D72' }}>average confidence across all items</p>
              </div>
              <div className="absolute bottom-3 left-4">
                <Logotype fontSize={9} colorMode="ink" color="#97979E" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 brand-gradient-h" />
            </div>
          </div>

          {/* Section divider — Canvas, centered logotype + title + gradient bar */}
          <div>
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">Section Divider</p>
            <div className="rounded-xl overflow-hidden border border-stone-200 aspect-video relative" style={{ backgroundColor: '#FDFDFB' }}>
              <CanvasWisp />
              <div className="h-full flex flex-col items-center justify-center p-6 gap-3 relative">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#97979E' }}>Chapter Two</p>
                <p className="text-xl font-semibold" style={{ color: '#18181C', fontFamily: "'Albert Sans', sans-serif" }}>How It Works</p>
              </div>
              <div className="absolute bottom-3 left-4">
                <Logotype fontSize={9} colorMode="ink" color="#97979E" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 brand-gradient-h" />
            </div>
          </div>

        </div>
      </Section>

      {/* Ink punctuation — the 20% */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-1">
          <Tooltip content="Going dark should feel like a choice, not a pattern. Use Ink when the shift itself carries the point.">
            <span>Ink Punctuation — use sparingly</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-slate mb-4 leading-relaxed">
          Used rarely on purpose. Save Ink for the moments where going dark <em>is</em> the point — a number that stops the room, a section break worth pausing on, the closing ask. Text becomes Cloud, muted becomes Mist, accents stay themselves. Same subtle wisp as Canvas, just warmed up a notch.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Stat emphasis (Ink) */}
          <div>
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">Stat emphasis (Ink)</p>
            <div className="rounded-xl overflow-hidden border border-stone-200 aspect-video relative" style={{ backgroundColor: '#18181C' }}>
              <InkWisp />
              <div className="h-full flex flex-col items-center justify-center p-6 relative">
                <p className="text-5xl font-semibold" style={{ color: '#F4F4F1', fontFamily: "'Albert Sans', sans-serif" }}>94%</p>
                <p className="text-xs mt-2" style={{ color: '#B0B0B6' }}>average confidence across all items</p>
              </div>
              <div className="absolute bottom-3 left-4">
                <Logotype fontSize={9} colorMode="white" color="#B0B0B6" />
              </div>
            </div>
          </div>

          {/* Closing CTA (Ink) */}
          <div>
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">Closing CTA (Ink)</p>
            <div className="rounded-xl overflow-hidden border border-stone-200 aspect-video relative" style={{ backgroundColor: '#18181C' }}>
              <InkWisp />
              <div className="h-full flex flex-col items-center justify-center p-6 gap-3 relative">
                <LogotypeGradient fontSize={18} />
                <p className="text-lg font-semibold mt-2" style={{ color: '#F4F4F1', fontFamily: "'Albert Sans', sans-serif" }}>Start connecting the dots.</p>
                <p className="text-xs" style={{ color: '#B0B0B6' }}>spectrea.com</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 brand-gradient-h" />
            </div>
          </div>

        </div>
      </Section>

      {/* Slide rules */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="The guardrails that keep different decks from drifting apart. Not many — enough.">
            <span>Design Rules</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { rule: 'Lead with Canvas, reach for Ink when it earns it', detail: 'Canvas is the ground. Ink is the emphasis — the stat, the divider, the closing ask. Keep Ink under a fifth of the deck.' },
            { rule: 'Titles in Albert Sans Semibold', detail: '24–36 px. Left-align on content slides, centre on dividers and titles.' },
            { rule: 'Body in Lexend Regular', detail: '14–18 px. Cap at six lines per slide — if you need more, it\'s already two slides.' },
            { rule: 'Logotype, not just the mark, when the slide has room', detail: 'Centered Logotype on title and closing slides; small Logotype footer bottom-left on content, stat, and divider slides. The bare mark is for favicons and tight spaces, not deck hero moments.' },
            { rule: 'Gradient bar at the bottom edge — title, stat, divider', detail: 'A 2–4 px gradient bar signals an emphasis slide. Leave it off content slides so it keeps its meaning.' },
            { rule: 'One idea per slide', detail: 'If you\'re scrolling, it\'s already two. Split before the room has to catch up.' },
            { rule: 'Bullet dots in spectrum order', detail: 'Cobalt, Teal, Amber in that sequence for three-point lists. Rose only when something is actually critical.' },
            { rule: 'Screenshots, data, or empty space', detail: 'A product shot or a chart earns its place. Clip art, stock icons, and decoration rarely do — leave them off.' },
          ].map((row, i, arr) => (
            <div key={row.rule} className="px-4 py-3" style={{ borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
              <p className="text-sm font-medium text-iron">{row.rule}</p>
              <p className="text-xs text-slate mt-0.5 leading-relaxed">{row.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Color in presentations */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-1">
          <Tooltip content="Decks use a trimmed palette on purpose. Fewer choices means faster decisions and decks that look like family.">
            <span>Colour in slides</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-slate mb-4 leading-relaxed">
          Two backgrounds, four accents. Fewer choices, faster decisions, decks that look like family even when different people make them.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { color: '#FDFDFB', name: 'Canvas', use: 'Content background — the 80%', textColor: '#18181C', border: true },
            { color: '#18181C', name: 'Ink', use: 'Emphasis background — the earned 20%', textColor: '#F4F4F1', border: false },
            { color: '#4271DF', name: 'Cobalt', use: 'Primary bullet dots, hero stats, key metrics', textColor: '#FDFDFB', border: false },
            { color: '#00B6A0', name: 'Teal', use: 'Growth, positive change, success', textColor: '#18181C', border: false },
            { color: '#E19000', name: 'Amber', use: 'Third bullet dot, attention highlights', textColor: '#18181C', border: false },
            { color: '#F24260', name: 'Rose', use: 'Critical items only — use sparingly', textColor: '#FDFDFB', border: false },
          ].map(c => (
            <div key={c.name} className="rounded-xl overflow-hidden" style={{ border: c.border ? '1px solid #E5E7EB' : 'none' }}>
              <div className="h-16 flex items-end p-2" style={{ backgroundColor: c.color }}>
                <span className="text-xs font-mono" style={{ color: c.textColor, opacity: 0.7 }}>{c.color}</span>
              </div>
              <div className="p-2 bg-white border-t border-stone-100">
                <p className="text-xs font-medium text-iron">{c.name}</p>
                <p className="text-xs text-slate leading-relaxed">{c.use}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Dos & Don'ts */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-1">
          <Tooltip content="Quick answers for the decisions you'll make most. When unsure, fewer elements and more breathing room wins.">
            <span>Working guide</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-slate mb-4 leading-relaxed">
          Quick answers for the calls you'll make most. When in doubt, fewer elements and more breathing room.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#007D6E' }}>Do</h3>
            <ul className="space-y-2 text-sm text-iron leading-relaxed">
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Pick one idea and let it breathe.</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Save the gradient bar for the slides that earn it — title, stat, divider.</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Reach for a product shot or a chart when a picture does the work faster than words.</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Keep bullets to three to six, with the spectrum dots in order.</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Put the Logotype — not just the mark — wherever the slide has room.</li>
            </ul>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Don't</h3>
            <ul className="space-y-2 text-sm text-iron leading-relaxed">
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Add a third background colour — the two-way split is what keeps the deck coherent.</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Let Ink creep past a fifth of the deck. Contrast is a signal, not a texture.</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Stack on clip art, decorative icons, or stock imagery — the content should be enough.</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Sprinkle the gradient bar across content slides — it loses meaning when it's everywhere.</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Reach for a font outside Albert Sans, Lexend, or JetBrains Mono. The kit is the kit.</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Centre body text on content slides — left-align reads better when the eye needs to move.</li>
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
