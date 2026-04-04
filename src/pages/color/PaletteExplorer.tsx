import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell, { Section } from '../../components/layout/PageShell'
// Brand colors are hardcoded below to match selectedPalette from brand.ts

function Swatch({ name, hex, role, textColor = '#FFFFFF' }: { name: string; hex: string; role: string; textColor?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      className="group text-left"
      title={`Copy ${hex}`}
    >
      <div className="h-16 rounded-lg border border-black/5 group-hover:scale-105 transition-transform flex items-end p-2" style={{ backgroundColor: hex }}>
        <span className="text-[9px] font-mono opacity-80" style={{ color: textColor }}>{copied ? 'Copied!' : hex}</span>
      </div>
      <p className="text-[10px] font-medium text-stone-700 mt-1">{name}</p>
      <p className="text-[9px] text-stone-400">{role}</p>
    </button>
  )
}

function MiniPreview({ dark }: { dark?: boolean }) {
  const bg = dark ? '#111827' : '#FFFFFF'
  const surface = dark ? '#1F2937' : '#F9FAFB'
  const text = dark ? '#F9FAFB' : '#111827'
  const muted = dark ? '#6B7280' : '#9CA3AF'
  const border = dark ? '#6B728020' : '#11182708'

  return (
    <div className="rounded-lg overflow-hidden text-left" style={{ backgroundColor: bg, border: `1px solid ${border}` }}>
      {/* Nav */}
      <div className="flex items-center px-3 py-1.5" style={{ borderBottom: `1px solid ${border}` }}>
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 rounded" style={{ background: 'linear-gradient(135deg, #3451E0, #12B5A3, #E58D08)' }} />
          <span className="text-[8px] font-bold" style={{ color: text }}>Spectrea</span>
        </div>
        <div className="flex-1" />
        <span className="text-[7px] px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: '#3451E0' }}>Sign Up</span>
      </div>
      {/* Content */}
      <div className="p-3">
        <p className="text-[9px] font-bold mb-0.5" style={{ color: text }}>Knowledge Overview</p>
        <p className="text-[7px] mb-2" style={{ color: muted }}>3 new connections discovered</p>
        <div className="grid grid-cols-4 gap-1 mb-2">
          {['#3451E0', '#12B5A3', '#E58D08', '#F43F5E'].map((c, i) => (
            <div key={i} className="rounded p-1" style={{ backgroundColor: surface, border: `1px solid ${border}` }}>
              <p className="text-[5px]" style={{ color: muted }}>{['Active', 'Growth', 'Pending', 'Alerts'][i]}</p>
              <p className="text-[8px] font-bold" style={{ color: text }}>{['2.8k', '+23%', '12', '3'][i]}</p>
              <p className="text-[5px]" style={{ color: c }}>{['■', '▲', '●', '!'][i]}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {['#3451E0', '#12B5A3', '#E58D08', '#F43F5E'].map((c, i) => (
            <span key={i} className="text-[5px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: c + '18', color: c, border: `1px solid ${c}30` }}>
              {['entities', 'connected', 'review', 'critical'][i]}
            </span>
          ))}
        </div>
      </div>
      <div className="h-0.5" style={{ background: 'linear-gradient(90deg, #3451E0, #12B5A3, #E58D08)' }} />
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
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
          <Swatch name="Cobalt" hex="#3451E0" role="Hero" />
          <Swatch name="Teal" hex="#12B5A3" role="Spectrum" textColor="#111827" />
          <Swatch name="Amber" hex="#E58D08" role="Spectrum" textColor="#111827" />
          <Swatch name="Rose" hex="#F43F5E" role="Spectrum" />
          <Swatch name="White" hex="#FFFFFF" role="Background" textColor="#9CA3AF" />
          <Swatch name="Snow" hex="#F9FAFB" role="Surface" textColor="#9CA3AF" />
          <Swatch name="Ink" hex="#111827" role="Text" />
          <Swatch name="Graphite" hex="#1F2937" role="Primary" />
          <Swatch name="Gray" hex="#9CA3AF" role="Muted" textColor="#111827" />
        </div>
      </Section>

      {/* Brand gradient */}
      <Section title="Brand Gradient">
        <div className="h-3 rounded-full" style={{ background: 'linear-gradient(135deg, #3451E0, #12B5A3, #E58D08)' }} />
        <p className="text-xs text-stone-400 mt-1.5 font-mono">Cobalt → Teal → Amber at 135°</p>
      </Section>

      {/* Color roles summary */}
      <Section title="How Colors Are Used">
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { color: '#3451E0', name: 'Cobalt', role: 'Hero', usage: 'Primary buttons, links, nav highlights, focused inputs, key CTAs' },
            { color: '#12B5A3', name: 'Teal', role: 'Success / Growth', usage: 'Positive states, connected status, growth indicators, completion' },
            { color: '#E58D08', name: 'Amber', role: 'Warning / Attention', usage: 'Warnings, pending states, confidence scores, highlights' },
            { color: '#F43F5E', name: 'Rose', role: 'Error / Urgency', usage: 'Errors, destructive actions, critical alerts, notification badges' },
            { color: '#FFFFFF', name: 'White', role: 'Canvas', usage: 'Page background — 60% of any screen' },
            { color: '#F9FAFB', name: 'Snow', role: 'Surface', usage: 'Cards, sidebars, dropdowns — 20% of any screen' },
            { color: '#111827', name: 'Ink', role: 'Primary Text', usage: 'Headings, body copy, labels' },
            { color: '#9CA3AF', name: 'Gray', role: 'Secondary Text', usage: 'Captions, placeholders, timestamps, helper text' },
          ].map((c, i) => (
            <div key={c.name} className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: i < 7 ? '1px solid #F3F4F6' : 'none' }}>
              <div className="w-5 h-5 rounded flex-shrink-0" style={{ backgroundColor: c.color, border: c.color === '#FFFFFF' ? '1px solid #E5E7EB' : 'none' }} />
              <div className="w-16 flex-shrink-0">
                <p className="text-xs font-medium text-stone-800">{c.name}</p>
              </div>
              <div className="w-28 flex-shrink-0">
                <p className="text-[10px] text-stone-400">{c.role}</p>
              </div>
              <p className="text-xs text-stone-600">{c.usage}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Live preview */}
      <Section title="In Context">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">Light Mode</p>
            <MiniPreview />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">Dark Mode</p>
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
            'Use dark text on Teal and Amber backgrounds (white text has insufficient contrast)',
            'The gradient is for brand moments only — hero sections, logo, marketing. Never on buttons or small UI',
            'Canvas dominates: 60% White, 20% Snow, 10% Text, 10% Spectrum',
            'Each semantic color carries one consistent meaning — never reuse a color for decoration',
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-2 bg-stone-50 rounded-lg px-3 py-2.5 border border-stone-100">
              <span className="text-[10px] font-bold text-stone-400 mt-px">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-xs text-stone-600">{rule}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Links to detail pages */}
      <Section title="Deep Dive">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Primary Palette', path: '/color/primary', desc: 'Every color with role, usage, and copy-able values' },
            { label: 'Semantic Colors', path: '/color/semantic', desc: 'Functional color mapping with light/default/dark variants' },
            { label: 'Gradients', path: '/color/gradients', desc: 'Brand gradient variations and usage rules' },
          ].map(link => (
            <Link
              key={link.path}
              to={link.path}
              className="group flex flex-col p-4 rounded-xl border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-all"
            >
              <p className="text-sm font-medium text-stone-900 group-hover:text-brand transition-colors">{link.label}</p>
              <p className="text-xs text-stone-500 mt-0.5">{link.desc}</p>
            </Link>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
