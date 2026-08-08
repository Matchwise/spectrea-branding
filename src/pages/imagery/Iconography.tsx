import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'

// Tabler Icons — primary icon library (outline + filled)
import {
  TbSearch, TbHome, TbSettings, TbUser, TbBell, TbPlus, TbCheck, TbX, TbEye, TbStack, TbStar, TbChevronRight,
  TbBellFilled, TbStarFilled, TbEyeFilled, TbHomeFilled,
} from 'react-icons/tb'

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Iconography() {
  return (
    <PageShell
      title="Iconography"
      subtitle="One icon library, one stroke, one grid — so every glyph in Spectrea feels like it was drawn by the same hand."
    >
      {/* ─── The System ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Spectrea uses Tabler Icons via react-icons. One library for outline and filled variants — 5,963 outline + 999 filled, all visually consistent.">
            <span>Icon System</span>
          </Tooltip>
        </h2>
        <div className="bg-ink text-white rounded-xl p-6">
          <p className="text-base font-semibold" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Tabler · Outline · Rounded · 2px Stroke</p>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: '#B0B0B6' }}>
            Rounded caps and joins create warmth. Clean geometry reads as intelligent. The 2px stroke has presence without heaviness — grounded but not boring. Outline is the default; filled is reserved for active/selected states.
          </p>
          <div className="flex items-center gap-4 mt-4 pt-4" style={{ borderTop: '1px solid #2E2F35' }}>
            <div className="flex items-center gap-3">
              {[TbSearch, TbHome, TbSettings, TbUser, TbBell, TbPlus, TbCheck, TbX, TbEye, TbStack, TbStar, TbChevronRight].map((Icon, i) => (
                <Icon key={i} size={20} style={{ color: '#B0B0B6' }} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Import Guide ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">How to Use</h2>
        <div className="bg-ink rounded-xl p-5 overflow-x-auto">
          <pre className="text-xs leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <span style={{ color: '#B0B0B6' }}>{'// Install\n'}</span>
            <span style={{ color: '#F4F4F1' }}>{'npm install react-icons\n\n'}</span>
            <span style={{ color: '#B0B0B6' }}>{'// Outline icons (default)\n'}</span>
            <span style={{ color: '#E19000' }}>{'import'}</span>
            <span style={{ color: '#F4F4F1' }}>{' { TbSearch, TbBell, TbSettings } '}</span>
            <span style={{ color: '#E19000' }}>{'from'}</span>
            <span style={{ color: '#00B6A0' }}>{" 'react-icons/tb'\n\n"}</span>
            <span style={{ color: '#B0B0B6' }}>{'// Filled icons (active/selected states)\n'}</span>
            <span style={{ color: '#E19000' }}>{'import'}</span>
            <span style={{ color: '#F4F4F1' }}>{' { TbBellFilled, TbStarFilled } '}</span>
            <span style={{ color: '#E19000' }}>{'from'}</span>
            <span style={{ color: '#00B6A0' }}>{" 'react-icons/tb'"}</span>
          </pre>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-cloud rounded-lg px-3 py-2 border border-stone-100">
            <p className="text-xs font-semibold text-iron">Library</p>
            <code className="text-xs text-brand font-mono">react-icons/tb</code>
            <p className="text-xs text-slate mt-0.5">Tabler Icons</p>
          </div>
          <div className="bg-cloud rounded-lg px-3 py-2 border border-stone-100">
            <p className="text-xs font-semibold text-iron">Outline</p>
            <code className="text-xs text-brand font-mono">TbSearch, TbBell…</code>
            <p className="text-xs text-slate mt-0.5">5,963 icons</p>
          </div>
          <div className="bg-cloud rounded-lg px-3 py-2 border border-stone-100">
            <p className="text-xs font-semibold text-iron">Filled</p>
            <code className="text-xs text-brand font-mono">TbBellFilled…</code>
            <p className="text-xs text-slate mt-0.5">999 matched variants</p>
          </div>
        </div>
      </Section>

      {/* ─── Specifications ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="All icons follow these specs. Custom icons must match to maintain visual consistency.">
            <span>Specifications</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { prop: 'Style', value: 'Outline (default)', note: 'Filled only for active/selected states' },
            { prop: 'Stroke width', value: '2px', note: 'Tabler default. Consistent across all icons.' },
            { prop: 'Stroke caps', value: 'Round', note: 'Matches the brand\'s warm, approachable personality' },
            { prop: 'Stroke joins', value: 'Round', note: 'Consistent with cap style' },
            { prop: 'Grid', value: '24 × 24px', note: 'Standard size. All icons sit on this grid.' },
            { prop: 'Padding', value: '2px inset', note: 'Content stays within a 20px live area' },
            { prop: 'Corner radius', value: '2px where applicable', note: 'Slightly rounded for warmth' },
            { prop: 'Source', value: 'react-icons/tb', note: 'Tabler Icons — outline + filled from one library' },
          ].map((row, i) => (
            <div key={row.prop} className="grid grid-cols-3 px-4 py-2.5" style={{ borderBottom: i < 7 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-sm font-medium text-iron">{row.prop}</span>
              <span className="text-xs font-mono text-iron">{row.value}</span>
              <span className="text-xs text-slate">{row.note}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Sizing ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Use these standard sizes. Custom sizes break visual consistency.">
            <span>Sizing</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-6">
          <div className="flex items-end justify-center gap-8 flex-wrap">
            {[
              { size: 16, label: '16px', use: 'Inline text, badges' },
              { size: 20, label: '20px', use: 'Buttons, nav items' },
              { size: 24, label: '24px', use: 'Default / standalone' },
              { size: 32, label: '32px', use: 'Feature highlights' },
              { size: 48, label: '48px', use: 'Empty states, heroes' },
            ].map(s => (
              <div key={s.size} className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center" style={{ width: s.size, height: s.size }}>
                  <TbSearch size={s.size} className="text-iron" />
                </div>
                <span className="text-xs font-mono text-slate">{s.label}</span>
                <span className="text-xs text-slate text-center">{s.use}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── Colors ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">Icon Colors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { color: '#18181C', name: 'Ink', hex: '#18181C', use: 'Primary — nav, headings, actions', bg: 'bg-white', border: true },
            { color: '#6D6D72', name: 'Slate', hex: '#6D6D72', use: 'Secondary — helpers, muted labels', bg: 'bg-white', border: true },
            { color: '#4271DF', name: 'Cobalt', hex: '#4271DF', use: 'Active state, selected, links', bg: 'bg-white', border: true },
            { color: '#F4F4F1', name: 'Cloud', hex: '#F4F4F1', use: 'On dark backgrounds', bg: 'bg-ink', border: false },
          ].map(c => (
            <div key={c.name} className={`${c.bg} rounded-xl p-4 text-center ${c.border ? 'border border-stone-200' : ''}`}>
              <div className="flex justify-center gap-2 mb-2" style={{ color: c.color }}>
                <TbSearch size={20} className="text-current" />
                <TbSettings size={20} className="text-current" />
                <TbUser size={20} className="text-current" />
              </div>
              <p className="text-xs font-semibold" style={{ color: c.border ? '#212226' : '#F4F4F1' }}>{c.name}</p>
              <p className="text-xs font-mono" style={{ color: c.border ? '#97979E' : '#B0B0B6' }}>{c.hex}</p>
              <p className="text-xs mt-1" style={{ color: c.border ? '#6D6D72' : '#B0B0B6' }}>{c.use}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 bg-cloud rounded-lg px-4 py-3 border border-stone-200">
          <p className="text-xs text-iron">
            <strong>Rule:</strong> Never use spectrum accent colors (Teal, Amber, Rose) for decorative icons. These colors are reserved for semantic meaning (success, warning, error). Pewter (#97979E) is reserved for disabled and decorative glyphs only — any icon that carries meaning uses Slate or darker.
          </p>
        </div>
      </Section>

      {/* ─── Icon States (Tiered Color) ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Icon states follow the tiered color system: Cobalt for responsive interaction, Ink for structural selection, semantic colors for status. See Color Application for the full framework.">
            <span>Icon States</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-iron mb-4">Icons follow Spectrea's three-tier color system. Each tier answers a different question.</p>

        <div className="space-y-4">
          {/* Tier: Default */}
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-cloud border-b border-stone-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ink">Default</p>
                <p className="text-xs text-slate mt-0.5">Resting state — no interaction, no selection, no status.</p>
              </div>
              <span className="text-xs font-mono text-slate">Slate #6D6D72</span>
            </div>
            <div className="p-5 flex items-center gap-5">
              {[TbSearch, TbHome, TbSettings, TbUser, TbBell, TbStar, TbEye].map((Icon, i) => (
                <Icon key={i} size={24} className="text-slate" />
              ))}
            </div>
          </div>

          {/* Tier 1: Responsive */}
          <div className="border border-brand/20 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-brand/5 border-b border-brand/10 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ink">Tier 1: Responsive <span className="text-xs font-normal text-slate">— user interacts</span></p>
                <p className="text-xs text-slate mt-0.5">Hover, focus, press. Temporary — appears while interacting, settles when done.</p>
              </div>
              <span className="text-xs font-mono text-brand">Cobalt #4271DF</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <TbBell size={22} className="text-slate" />
                  <span className="text-pewter text-xs">hover →</span>
                  <TbBell size={22} className="text-brand" />
                </div>
                <div className="flex items-center gap-3">
                  <TbStar size={22} className="text-slate" />
                  <span className="text-pewter text-xs">hover →</span>
                  <TbStar size={22} className="text-brand" />
                </div>
              </div>
              <p className="text-xs text-slate mt-3">Outline stays outline. Color changes from Slate to Cobalt. Reverts when interaction ends.</p>
            </div>
          </div>

          {/* Tier 2: Structural */}
          <div className="border border-stone-300 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-cloud border-b border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ink">Tier 2: Structural <span className="text-xs font-normal text-slate">— persistent state</span></p>
                <p className="text-xs text-slate mt-0.5">Active page, selected item, toggled on. Persists until the state changes.</p>
              </div>
              <span className="text-xs font-mono text-iron">Ink #18181C</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-8">
                {[
                  { outline: TbBell, filled: TbBellFilled, label: 'Notifications on' },
                  { outline: TbStar, filled: TbStarFilled, label: 'Favorited' },
                  { outline: TbEye, filled: TbEyeFilled, label: 'Visible' },
                  { outline: TbHome, filled: TbHomeFilled, label: 'Current page' },
                ].map(pair => (
                  <div key={pair.label} className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3">
                      <pair.outline size={22} className="text-slate" />
                      <span className="text-pewter text-xs">→</span>
                      <pair.filled size={22} className="text-ink" />
                    </div>
                    <span className="text-xs text-slate">{pair.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate mt-3">Outline becomes filled. Color changes from Slate to Ink. Weight signals the state, not color — canvas stays neutral.</p>
            </div>
          </div>

          {/* Tier 3: Semantic */}
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-cloud border-b border-stone-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ink">Tier 3: Semantic <span className="text-xs font-normal text-slate">— system communicates</span></p>
                <p className="text-xs text-slate mt-0.5">Success, warning, error. The icon carries status meaning.</p>
              </div>
              <span className="text-xs font-mono text-slate">Teal / Amber / Rose</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-8">
                <div className="flex flex-col items-center gap-1">
                  <TbCheck size={22} style={{ color: '#00B6A0' }} />
                  <span className="text-xs text-slate">Success</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <TbBell size={22} style={{ color: '#E19000' }} />
                  <span className="text-xs text-slate">Warning</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <TbX size={22} style={{ color: '#F24260' }} />
                  <span className="text-xs text-slate">Error</span>
                </div>
              </div>
              <p className="text-xs text-slate mt-3">Outline stays outline. Color matches the semantic meaning. Never use semantic colors for decoration.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Licensing ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">Licensing</h2>
        <div className="bg-cloud rounded-xl p-5 border border-stone-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-ink">Tabler Icons</p>
              <p className="text-xs text-slate mt-1">MIT License. Free for commercial use. No attribution required in product UI.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">react-icons</p>
              <p className="text-xs text-slate mt-1">MIT License. Wrapper library. Keep license file in source (handled by node_modules).</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Do/Don't ─── */}
      <Section title="Icon Dos & Don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#007D6E' }}>Do</h3>
            <ul className="space-y-2 text-sm text-iron">
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Import all icons from <code className="text-xs bg-cloud px-1 rounded">react-icons/tb</code></li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Pair icons with text labels for clarity</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use outline for default, filled for active state</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Vertically center icons with adjacent text</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use standard sizes: 16, 20, 24, 32, 48px</li>
            </ul>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Don't</h3>
            <ul className="space-y-2 text-sm text-iron">
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Import from other sets (<code className="text-xs bg-cloud px-1 rounded">md</code>, <code className="text-xs bg-cloud px-1 rounded">lu</code>, <code className="text-xs bg-cloud px-1 rounded">bs</code>, <code className="text-xs bg-cloud px-1 rounded">fa6</code>) — different visual style</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Mix outline and filled styles as decoration</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use icons without labels in primary navigation</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use spectrum colors (Teal, Amber) on decorative icons</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use custom sizes between the standard stops</li>
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
