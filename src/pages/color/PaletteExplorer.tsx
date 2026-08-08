import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell, { Section } from '../../components/layout/PageShell'
// Brand colors are hardcoded below to match selectedPalette from brand.ts

function Swatch({ name, hex, role, textColor = '#FDFDFB' }: { name: string; hex: string; role: string; textColor?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      className="group text-left btn-focus rounded-lg"
      title={`Copy ${hex}`}
    >
      <div className="h-16 rounded-lg border border-black/5 group-hover:scale-105 transition-transform flex items-end p-2" style={{ backgroundColor: hex }}>
        <span className="text-[9px] font-mono opacity-80" style={{ color: textColor }}>{copied ? 'Copied!' : hex}</span>
      </div>
      <p className="text-[10px] font-medium text-iron mt-1">{name}</p>
      <p className="text-[9px] text-pewter">{role}</p>
    </button>
  )
}

function MiniPreview({ dark }: { dark?: boolean }) {
  const bg = dark ? '#18181C' : '#FDFDFB'
  const surface = dark ? '#212226' : '#F4F4F1'
  const text = dark ? '#F4F4F1' : '#18181C'
  const muted = dark ? '#B0B0B6' : '#97979E'
  const border = dark ? '#2E2F35' : '#18181C08'

  return (
    <div className="rounded-lg overflow-hidden text-left" style={{ backgroundColor: bg, border: `1px solid ${border}` }}>
      {/* Nav */}
      <div className="flex items-center px-3 py-1.5" style={{ borderBottom: `1px solid ${border}` }}>
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 rounded" style={{ background: 'linear-gradient(135deg, #4271DF, #00B6A0, #E19000)' }} />
          <span className="text-[8px] font-bold" style={{ color: text }}>Spectrea</span>
        </div>
        <div className="flex-1" />
        <span className="text-[7px] px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: '#4271DF' }}>Sign Up</span>
      </div>
      {/* Content */}
      <div className="p-3">
        <p className="text-[9px] font-bold mb-0.5" style={{ color: text }}>Knowledge Overview</p>
        <p className="text-[7px] mb-2" style={{ color: muted }}>3 new connections discovered</p>
        <div className="grid grid-cols-4 gap-1 mb-2">
          {['#4271DF', '#00B6A0', '#E19000', '#F24260'].map((c, i) => (
            <div key={i} className="rounded p-1" style={{ backgroundColor: surface, border: `1px solid ${border}` }}>
              <p className="text-[5px]" style={{ color: muted }}>{['Active', 'Growth', 'Pending', 'Alerts'][i]}</p>
              <p className="text-[8px] font-bold" style={{ color: text }}>{['2.8k', '+23%', '12', '3'][i]}</p>
              <p className="text-[5px]" style={{ color: c }}>{['■', '▲', '●', '!'][i]}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {['#4271DF', '#00B6A0', '#E19000', '#F24260'].map((c, i) => (
            <span key={i} className="text-[5px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: c + '18', color: c, border: `1px solid ${c}30` }}>
              {['items', 'connected', 'review', 'critical'][i]}
            </span>
          ))}
        </div>
      </div>
      <div className="h-0.5" style={{ background: 'linear-gradient(90deg, #4271DF, #00B6A0, #E19000)' }} />
    </div>
  )
}

export default function ColorOverview() {
  return (
    <PageShell
      title="Color System"
      subtitle="Spectrea's complete color system — a neutral canvas with a cobalt hero and three spectrum accents."
    >
      {/* Full palette at a glance */}
      <Section title="Palette at a Glance">
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-3">
          <Swatch name="Cobalt" hex="#4271DF" role="Hero" />
          <Swatch name="Teal" hex="#00B6A0" role="Spectrum" textColor="#18181C" />
          <Swatch name="Amber" hex="#E19000" role="Spectrum" textColor="#18181C" />
          <Swatch name="Rose" hex="#F24260" role="Spectrum" />
          <Swatch name="Canvas" hex="#FDFDFB" role="Background" textColor="#97979E" />
          <Swatch name="Cloud" hex="#F4F4F1" role="Surface" textColor="#97979E" />
          <Swatch name="Pewter" hex="#97979E" role="Whisper muted" textColor="#18181C" />
          <Swatch name="Slate" hex="#6D6D72" role="Body secondary" />
          <Swatch name="Iron" hex="#46464B" role="Emphasized body" />
          <Swatch name="Graphite" hex="#212226" role="Dark surface" />
          <Swatch name="Ink" hex="#18181C" role="Primary text" />
        </div>
        <p className="text-xs text-slate mt-3 leading-relaxed">The Warm Blend neutrals form a seven-token OKLCH-even ladder — Canvas and Cloud anchor the bg/surface pair, then Pewter → Slate → Iron → Graphite → Ink step down in even perceptual thirds through the body-text range into the dark-UI surfaces.</p>
      </Section>

      {/* Brand gradient */}
      <Section title="Brand Gradient">
        <div className="h-3 rounded-full brand-gradient" />
        <p className="text-xs text-slate mt-1.5 font-mono">Cobalt → Teal → Amber at 135°, OKLCH-interpolated with sRGB fallback. Rose extends it for maximum-expression moments. The lockup uses a separate 2-stop Cool Duet on the mark only.</p>
      </Section>

      {/* Color roles summary */}
      <Section title="How Colors Are Used">
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { color: '#4271DF', name: 'Cobalt', role: 'Hero', usage: 'Primary buttons, links, nav highlights, focused inputs, key CTAs' },
            { color: '#00B6A0', name: 'Teal', role: 'Success / Growth', usage: 'Positive states, connected status, growth indicators, completion' },
            { color: '#E19000', name: 'Amber', role: 'Warning / Attention', usage: 'Warnings, pending states, confidence scores, highlights' },
            { color: '#F24260', name: 'Rose', role: 'Error / Urgency', usage: 'Errors, destructive actions, critical alerts, notification badges' },
            { color: '#FDFDFB', name: 'Canvas', role: 'Background', usage: 'Page background — 60% of any screen' },
            { color: '#F4F4F1', name: 'Cloud', role: 'Surface', usage: 'Cards, sidebars, dropdowns — 20% of any screen' },
            { color: '#18181C', name: 'Ink', role: 'Primary Text', usage: 'Headings, body copy, labels — 17.4:1 on Canvas' },
            { color: '#46464B', name: 'Iron', role: 'Emphasized Body', usage: 'Table headers, field labels, key body sentences — 9.21:1 AAA' },
            { color: '#6D6D72', name: 'Slate', role: 'Body Secondary', usage: 'Descriptions, helper text, card sub-labels — 5.05:1 AA' },
            { color: '#212226', name: 'Graphite', role: 'Dark Surface', usage: 'Sidebar, tooltip, footer chrome. Dark-mode elevated surface (= Cloud on light)' },
            { color: '#97979E', name: 'Pewter', role: 'Whisper Muted', usage: 'Overlines, timestamps, chips, captions — 2.85:1 (below AA, supplementary only)' },
          ].map((c, i, arr) => (
            <div key={c.name} className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
              <div className="w-5 h-5 rounded flex-shrink-0" style={{ backgroundColor: c.color, border: c.color === '#FDFDFB' ? '1px solid #E5E7EB' : 'none' }} />
              <div className="w-16 flex-shrink-0">
                <p className="text-xs font-medium text-ink">{c.name}</p>
              </div>
              <div className="w-28 flex-shrink-0">
                <p className="text-[10px] text-pewter">{c.role}</p>
              </div>
              <p className="text-xs text-iron">{c.usage}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Live preview */}
      <Section title="In Context">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-semibold text-pewter uppercase tracking-wider mb-2">Light Mode</p>
            <MiniPreview />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-pewter uppercase tracking-wider mb-2">Dark Mode</p>
            <MiniPreview dark />
          </div>
        </div>
      </Section>

      {/* Quick rules */}
      <Section title="Key Rules">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'One Cobalt primary action per section — if everything is Cobalt, nothing stands out',
            'Spectrum colors appear as small, purposeful moments — tags, dots, badges — not large fills',
            'Use dark text on Teal and Amber backgrounds — white text sits below the WCAG 2.x floor there unless covered by a ratified entry in the exception registry (see Primary Palette)',
            'The gradient is for brand moments only — hero sections, logo, marketing. Never on buttons or small UI',
            'Neutrals dominate: 60% Canvas, 20% Cloud, 10% Text, 10% Spectrum',
            'Each semantic color carries one consistent meaning — never reuse a color for decoration',
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-2 bg-cloud rounded-lg px-3 py-2.5 border border-stone-100">
              <span className="text-[10px] font-bold text-pewter mt-px">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-xs text-iron">{rule}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Links to detail pages */}
      <Section title="Deep Dive">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Primary Palette', path: '/color/primary', desc: 'Every color with role, usage, and copy-able values' },
            { label: 'Semantic Colors', path: '/color/semantic', desc: 'Functional color mapping — wash, accent, on-wash text, plus dark-surface washes' },
            { label: 'Gradients', path: '/color/gradients', desc: 'Brand gradient variations and usage rules' },
          ].map(link => (
            <Link
              key={link.path}
              to={link.path}
              className="group flex flex-col p-4 rounded-xl border border-stone-200 hover:border-stone-300 hover:bg-cloud transition-all"
            >
              <p className="text-sm font-medium text-ink group-hover:text-brand transition-colors">{link.label}</p>
              <p className="text-xs text-slate mt-0.5">{link.desc}</p>
            </Link>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
