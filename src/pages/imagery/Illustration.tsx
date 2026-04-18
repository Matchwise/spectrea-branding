import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import {
  SpectreaFigure, ALL_COLORS, type FigureColor,
  SceneCohort, SceneCrowd, ScenePair,
} from '../../components/illustrations/SpectreaFigure'

/* ------------------------------------------------------------------ */
/*  Tokens                                                             */
/* ------------------------------------------------------------------ */

const COBALT = '#4271DF'
const TEAL = '#00B6A0'
const AMBER = '#E19000'
const ROSE = '#F24260'
const INK = '#18181C'
const PEWTER = '#97979E'
const CLOUD = '#F4F4F1'
const CANVAS = '#FDFDFB'

const rand = (i: number, salt = 0) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

/* ================================================================== */
/*  PEOPLE — geometric figures and portraits                           */
/* ================================================================== */

function PortraitGeom() {
  return (
    <svg viewBox="0 0 160 160" className="w-full h-auto">
      <circle cx="80" cy="75" r="55" fill={INK} />
      <circle cx="62" cy="68" r="5" fill={CANVAS} />
      <circle cx="98" cy="68" r="5" fill={CANVAS} />
      <rect x="78" y="82" width="4" height="10" fill={CANVAS} />
      <path d="M62,108 Q80,118 98,108" stroke={CANVAS} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function PortraitAvatar() {
  return (
    <svg viewBox="0 0 160 160" className="w-full h-auto">
      <circle cx="80" cy="55" r="28" fill={INK} />
      <path d="M22,155 Q22,98 80,98 Q138,98 138,155 Z" fill={INK} />
    </svg>
  )
}

function Thinker() {
  return (
    <svg viewBox="0 0 240 160" className="w-full h-auto">
      <g transform="translate(30 0)">
        <circle cx="40" cy="48" r="18" fill={INK} />
        <rect x="17" y="66" width="46" height="55" rx="10" fill={COBALT} />
        <rect x="22" y="121" width="13" height="35" rx="3" fill={INK} />
        <rect x="46" y="121" width="13" height="35" rx="3" fill={INK} />
      </g>
      <circle cx="135" cy="80" r="4" fill={CANVAS} stroke={INK} strokeWidth="1.5" />
      <circle cx="155" cy="60" r="7" fill={CANVAS} stroke={INK} strokeWidth="1.5" />
      <circle cx="190" cy="40" r="22" fill={CANVAS} stroke={INK} strokeWidth="1.5" />
      <rect x="184" y="34" width="12" height="12" fill={AMBER} />
    </svg>
  )
}

/* ================================================================== */
/*  EMOTION                                                             */
/* ================================================================== */

function EmoFocus() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <circle cx="120" cy="85" r="60" fill="none" stroke={AMBER} strokeWidth="2" />
      <circle cx="120" cy="85" r="42" fill="none" stroke={AMBER} strokeWidth="2" opacity="0.7" />
      <circle cx="120" cy="85" r="24" fill="none" stroke={AMBER} strokeWidth="2" opacity="0.45" />
      <circle cx="120" cy="85" r="8" fill={AMBER} />
    </svg>
  )
}

function EmoCalm() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <circle cx="120" cy="85" r="55" fill={TEAL} />
    </svg>
  )
}

function EmoTension() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <polygon points="15,50 110,85 15,120" fill={COBALT} />
      <polygon points="225,50 130,85 225,120" fill={AMBER} />
      <rect x="117" y="82" width="6" height="6" fill={INK} />
    </svg>
  )
}

function EmoUncertainty() {
  const dots = Array.from({ length: 70 }, (_, i) => ({
    x: 20 + rand(i, 200) * 200,
    y: 20 + rand(i, 201) * 130,
  }))
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      {dots.map((d, i) => <rect key={i} x={d.x} y={d.y} width="3" height="3" fill={PEWTER} opacity="0.6" />)}
      <rect x="110" y="50" width="20" height="60" fill={ROSE} />
      <rect x="110" y="118" width="20" height="20" fill={ROSE} />
    </svg>
  )
}

function EmoJoy() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        const cx = 120 + Math.cos(a) * 55
        const cy = 85 + Math.sin(a) * 55
        const palette = [COBALT, TEAL, AMBER, ROSE]
        return <circle key={i} cx={cx} cy={cy} r="10" fill={palette[i % palette.length]} />
      })}
      <circle cx="120" cy="85" r="20" fill={INK} />
    </svg>
  )
}

function EmoAmbition() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <rect x="30" y="120" width="30" height="30" fill={PEWTER} />
      <rect x="80" y="95" width="30" height="55" fill={COBALT} />
      <rect x="130" y="60" width="30" height="90" fill={TEAL} />
      <rect x="180" y="25" width="30" height="125" fill={AMBER} />
    </svg>
  )
}

/* ================================================================== */
/*  DISCOVERY & INSIGHT                                                 */
/* ================================================================== */

function DiscoveryAha() {
  const cx = 120, cy = 85
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      {Array.from({ length: 80 }).map((_, i) => {
        const x = 15 + rand(i, 300) * 210
        const y = 15 + rand(i, 301) * 140
        const dx = x - cx, dy = y - cy
        if (Math.sqrt(dx * dx + dy * dy) < 22) return null
        return <rect key={i} x={x} y={y} width="2.5" height="2.5" fill={PEWTER} opacity="0.5" />
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2
        return <line key={i} x1={cx + Math.cos(a) * 20} y1={cy + Math.sin(a) * 20}
          x2={cx + Math.cos(a) * 32} y2={cy + Math.sin(a) * 32}
          stroke={AMBER} strokeWidth="2.5" strokeLinecap="square" />
      })}
      <circle cx={cx} cy={cy} r="14" fill={AMBER} />
    </svg>
  )
}

function DiscoveryLightbulb() {
  return (
    <svg viewBox="0 0 160 200" className="w-full h-auto">
      <circle cx="80" cy="80" r="45" fill={AMBER} />
      <rect x="63" y="120" width="34" height="22" fill={INK} />
      <line x1="63" y1="127" x2="97" y2="127" stroke={AMBER} strokeWidth="1.5" />
      <line x1="63" y1="134" x2="97" y2="134" stroke={AMBER} strokeWidth="1.5" />
      <rect x="72" y="142" width="16" height="10" fill={INK} />
      <line x1="80" y1="15" x2="80" y2="27" stroke={AMBER} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="38" x2="40" y2="46" stroke={AMBER} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="132" y1="38" x2="120" y2="46" stroke={AMBER} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="80" x2="28" y2="80" stroke={AMBER} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="144" y1="80" x2="132" y2="80" stroke={AMBER} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/* ================================================================== */
/*  INTERACTION                                                         */
/* ================================================================== */

function IntMeeting() {
  const seats = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2
    return { x: 120 + Math.cos(a) * 60, y: 85 + Math.sin(a) * 38, c: [COBALT, INK, TEAL, INK, AMBER, INK][i] }
  })
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <rect x="50" y="50" width="140" height="70" rx="35" fill={INK} />
      <rect x="65" y="60" width="110" height="50" rx="25" fill={CANVAS} />
      {seats.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r="10" fill={s.c} />)}
    </svg>
  )
}

function IntHandshake() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <polygon points="15,85 118,42 118,128" fill={COBALT} />
      <polygon points="225,85 122,42 122,128" fill={AMBER} />
    </svg>
  )
}

function IntNetwork() {
  const nodes = [
    { x: 60, y: 50, c: COBALT },
    { x: 180, y: 45, c: TEAL },
    { x: 40, y: 120, c: AMBER },
    { x: 200, y: 125, c: ROSE },
    { x: 120, y: 85, c: INK },
  ]
  const links: [number, number][] = [[0, 4], [1, 4], [2, 4], [3, 4], [0, 1], [2, 3]]
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke={PEWTER} strokeWidth="1.5" />
      ))}
      {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r={i === 4 ? 10 : 7} fill={n.c} />)}
    </svg>
  )
}

function IntConversation() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <rect x="22" y="20" width="88" height="46" rx="10" fill={COBALT} />
      <path d="M52,66 L58,80 L68,66 Z" fill={COBALT} />
      <circle cx="45" cy="43" r="3.5" fill={CANVAS} />
      <circle cx="66" cy="43" r="3.5" fill={CANVAS} />
      <circle cx="87" cy="43" r="3.5" fill={CANVAS} />
      <circle cx="60" cy="120" r="18" fill={INK} />
      <rect x="130" y="65" width="88" height="46" rx="10" fill={AMBER} />
      <path d="M188,111 L182,125 L172,111 Z" fill={AMBER} />
      <circle cx="153" cy="88" r="3.5" fill={CANVAS} />
      <circle cx="174" cy="88" r="3.5" fill={CANVAS} />
      <circle cx="195" cy="88" r="3.5" fill={CANVAS} />
      <circle cx="180" cy="140" r="18" fill={INK} />
    </svg>
  )
}

/* ================================================================== */
/*  CONCEPTS                                                            */
/* ================================================================== */

function ConSecurity() {
  return (
    <svg viewBox="0 0 160 180" className="w-full h-auto">
      <path d="M80,20 L135,40 L135,95 Q135,140 80,165 Q25,140 25,95 L25,40 Z" fill={COBALT} />
      <path d="M80,20 L135,40 L135,95 Q135,140 80,165 Z" fill={INK} opacity="0.15" />
      <circle cx="80" cy="85" r="20" fill={CANVAS} />
      <rect x="76" y="85" width="8" height="22" fill={CANVAS} />
    </svg>
  )
}

function ConGrowth() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <rect x="20" y="150" width="210" height="3" fill={INK} />
      <polygon points="40,130 60,130 50,105" fill={COBALT} />
      <polygon points="80,115 110,115 95,80" fill={TEAL} />
      <polygon points="130,95 170,95 150,45" fill={AMBER} />
      <polygon points="185,70 225,70 205,15" fill={ROSE} />
    </svg>
  )
}

function ConSpeed() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <path d="M40,85 L180,85 L180,55 L215,100 L180,145 L180,115 L40,115 Z" fill={COBALT} />
      <line x1="5" y1="85" x2="25" y2="85" stroke={INK} strokeWidth="3" strokeLinecap="square" />
      <line x1="10" y1="75" x2="28" y2="75" stroke={INK} strokeWidth="2" strokeLinecap="square" opacity="0.5" />
      <line x1="10" y1="95" x2="28" y2="95" stroke={INK} strokeWidth="2" strokeLinecap="square" opacity="0.5" />
    </svg>
  )
}

function ConBalance() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <circle cx="75" cy="80" r="42" fill={COBALT} />
      <circle cx="165" cy="80" r="42" fill={AMBER} />
      <rect x="50" y="140" width="140" height="6" fill={INK} />
      <rect x="117" y="140" width="6" height="15" fill={INK} />
    </svg>
  )
}

function ConChoice() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <circle cx="35" cy="85" r="10" fill={INK} />
      <line x1="45" y1="85" x2="115" y2="45" stroke={PEWTER} strokeWidth="2" />
      <line x1="45" y1="85" x2="115" y2="85" stroke={PEWTER} strokeWidth="2" />
      <line x1="45" y1="85" x2="115" y2="125" stroke={PEWTER} strokeWidth="2" />
      <circle cx="125" cy="45" r="12" fill={COBALT} />
      <circle cx="125" cy="85" r="12" fill={TEAL} />
      <circle cx="125" cy="125" r="12" fill={AMBER} />
      <line x1="137" y1="85" x2="195" y2="85" stroke={INK} strokeWidth="2.5" />
      <polygon points="195,80 205,85 195,90" fill={INK} />
    </svg>
  )
}

function ConPriority() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <circle cx="55" cy="85" r="28" fill={COBALT} />
      <circle cx="115" cy="85" r="20" fill={TEAL} />
      <circle cx="160" cy="85" r="14" fill={AMBER} />
      <circle cx="195" cy="85" r="8" fill={PEWTER} />
    </svg>
  )
}

function ConStability() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <rect x="45" y="35" width="150" height="30" fill={AMBER} />
      <rect x="55" y="65" width="130" height="25" fill={TEAL} />
      <rect x="65" y="90" width="110" height="25" fill={COBALT} />
      <rect x="30" y="115" width="180" height="35" fill={INK} />
    </svg>
  )
}

function ConInsight() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <path d="M20,85 Q120,45 220,85 Q120,125 20,85 Z" fill={INK} />
      <circle cx="120" cy="85" r="26" fill={CANVAS} />
      <circle cx="120" cy="85" r="20" fill={COBALT} />
      <circle cx="120" cy="85" r="8" fill={INK} />
      <circle cx="126" cy="80" r="3" fill={CANVAS} />
    </svg>
  )
}

/* ================================================================== */
/*  OBJECTS                                                              */
/* ================================================================== */

function ObjBook() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <rect x="40" y="35" width="160" height="110" fill={COBALT} />
      <rect x="115" y="35" width="10" height="110" fill={INK} opacity="0.2" />
      <rect x="55" y="55" width="50" height="4" fill={CANVAS} opacity="0.85" />
      <rect x="55" y="67" width="40" height="4" fill={CANVAS} opacity="0.6" />
      <rect x="55" y="79" width="45" height="4" fill={CANVAS} opacity="0.6" />
      <rect x="135" y="55" width="50" height="4" fill={CANVAS} opacity="0.85" />
      <rect x="135" y="67" width="40" height="4" fill={CANVAS} opacity="0.6" />
      <rect x="135" y="79" width="45" height="4" fill={CANVAS} opacity="0.6" />
    </svg>
  )
}

function ObjKey() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <circle cx="70" cy="85" r="35" fill={AMBER} />
      <circle cx="70" cy="85" r="15" fill={CANVAS} />
      <rect x="105" y="77" width="110" height="16" fill={AMBER} />
      <rect x="165" y="93" width="10" height="18" fill={AMBER} />
      <rect x="195" y="93" width="10" height="18" fill={AMBER} />
    </svg>
  )
}

function ObjGear() {
  const teeth = 8
  const outerR = 55, innerR = 40
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <g transform="translate(120 85)">
        {Array.from({ length: teeth }).map((_, i) => {
          const a = (i / teeth) * Math.PI * 2
          const w = 14, h = 18
          return (
            <rect key={i} x={-w / 2} y={-outerR - h / 2} width={w} height={h}
              fill={TEAL} transform={`rotate(${(a * 180 / Math.PI)})`} />
          )
        })}
        <circle r={outerR} fill={TEAL} />
        <circle r={innerR * 0.4} fill={CANVAS} />
      </g>
    </svg>
  )
}

function ObjTarget() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <circle cx="120" cy="85" r="60" fill={PEWTER} opacity="0.3" />
      <circle cx="120" cy="85" r="42" fill={COBALT} />
      <circle cx="120" cy="85" r="26" fill={AMBER} />
      <circle cx="120" cy="85" r="10" fill={ROSE} />
    </svg>
  )
}

/* ================================================================== */
/*  ENVIRONMENTS                                                         */
/* ================================================================== */

function EnvOffice() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <path d="M30,140 L120,90 L210,140 L120,190 Z" fill={CLOUD} />
      <path d="M65,115 L120,85 L175,115 L120,145 Z" fill={COBALT} />
      <path d="M175,115 L175,130 L120,160 L120,145 Z" fill={INK} opacity="0.55" />
      <path d="M65,115 L65,130 L120,160 L120,145 Z" fill={INK} opacity="0.75" />
      <path d="M100,105 L135,88 L150,96 L115,113 Z" fill={INK} />
      <path d="M105,108 L138,91 L148,94 L120,108 Z" fill={CANVAS} />
      <path d="M138,91 L148,94 L148,86 L138,83 Z" fill={INK} opacity="0.6" />
      <circle cx="155" cy="100" r="4" fill={AMBER} />
    </svg>
  )
}

function EnvCity() {
  const buildings = [
    { x: 20, h: 70, c: COBALT },
    { x: 55, h: 100, c: INK },
    { x: 95, h: 60, c: TEAL },
    { x: 130, h: 85, c: INK },
    { x: 170, h: 95, c: AMBER },
    { x: 200, h: 50, c: PEWTER },
  ]
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <line x1="0" y1="140" x2="240" y2="140" stroke={INK} strokeWidth="1" />
      {buildings.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={140 - b.h} width="32" height={b.h} fill={b.c} />
          {Array.from({ length: Math.floor(b.h / 12) }).map((_, row) => (
            [0, 1, 2].map(col => (
              <rect key={`${row}-${col}`} x={b.x + 6 + col * 10} y={140 - b.h + 8 + row * 12}
                width="2.5" height="2.5" fill={CANVAS} opacity={rand(i * 30 + row * 3 + col, 400) > 0.4 ? 0.95 : 0.3} />
            ))
          ))}
        </g>
      ))}
    </svg>
  )
}

function EnvLandscape() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <rect width="240" height="170" fill={CLOUD} />
      <circle cx="200" cy="40" r="22" fill={AMBER} />
      <rect y="85" width="240" height="30" fill={TEAL} opacity="0.45" />
      <rect y="115" width="240" height="55" fill={COBALT} opacity="0.85" />
      <polygon points="30,115 70,75 110,115" fill={INK} opacity="0.75" />
      <polygon points="90,115 140,55 190,115" fill={INK} />
    </svg>
  )
}

function EnvRoom() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <rect width="240" height="170" fill={CLOUD} />
      <polygon points="40,25 200,25 120,15" fill={INK} />
      <rect x="40" y="25" width="160" height="120" fill={COBALT} />
      <rect x="60" y="55" width="40" height="40" fill={CANVAS} />
      <line x1="80" y1="55" x2="80" y2="95" stroke={INK} strokeWidth="1.5" />
      <line x1="60" y1="75" x2="100" y2="75" stroke={INK} strokeWidth="1.5" />
      <rect x="140" y="55" width="40" height="40" fill={CANVAS} />
      <line x1="160" y1="55" x2="160" y2="95" stroke={INK} strokeWidth="1.5" />
      <line x1="140" y1="75" x2="180" y2="75" stroke={INK} strokeWidth="1.5" />
      <rect x="108" y="100" width="24" height="45" fill={AMBER} />
    </svg>
  )
}

/* ================================================================== */
/*  NARRATIVE                                                           */
/* ================================================================== */

function NarJourney() {
  const stops = [
    { x: 25, y: 130, c: PEWTER, label: 'start' },
    { x: 80, y: 95, c: COBALT },
    { x: 135, y: 115, c: INK },
    { x: 185, y: 60, c: TEAL },
    { x: 220, y: 30, c: AMBER, label: 'goal' },
  ]
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      {stops.slice(0, -1).map((s, i) => (
        <line key={i} x1={s.x} y1={s.y} x2={stops[i + 1].x} y2={stops[i + 1].y}
          stroke={PEWTER} strokeWidth="1.5" />
      ))}
      {stops.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r={i === 0 || i === stops.length - 1 ? 8 : 5} fill={s.c} />
          {s.label && <text x={s.x} y={s.y + 22} fontSize="9" fill={PEWTER} textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{s.label}</text>}
        </g>
      ))}
    </svg>
  )
}

function NarTransformation() {
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      <rect x="15" y="55" width="55" height="55" fill={PEWTER} />
      <line x1="75" y1="82" x2="92" y2="82" stroke={INK} strokeWidth="2" />
      <polygon points="92,77 100,82 92,87" fill={INK} />
      <rect x="105" y="55" width="55" height="55" fill={COBALT} transform="rotate(18 132.5 82.5)" />
      <line x1="170" y1="82" x2="187" y2="82" stroke={INK} strokeWidth="2" />
      <polygon points="187,77 195,82 187,87" fill={INK} />
      <polygon points="200,110 225,110 212.5,55" fill={AMBER} />
    </svg>
  )
}

function NarBeforeAfter() {
  const before = Array.from({ length: 20 }, (_, i) => ({
    x: 15 + rand(i, 40) * 85,
    y: 35 + rand(i, 41) * 100,
  }))
  return (
    <svg viewBox="0 0 240 170" className="w-full h-auto">
      {before.map((d, i) => <rect key={i} x={d.x} y={d.y} width="4" height="4" fill={PEWTER} opacity="0.7" />)}
      <line x1="115" y1="35" x2="125" y2="35" stroke={INK} strokeWidth="2" />
      <polygon points="125,30 133,35 125,40" fill={INK} />
      {Array.from({ length: 20 }).map((_, i) => {
        const row = Math.floor(i / 5)
        const col = i % 5
        return <rect key={i} x={145 + col * 16} y={45 + row * 20} width="4" height="4" fill={COBALT} />
      })}
    </svg>
  )
}

/* ================================================================== */
/*  DATA — schematic subset that is pure geometry                      */
/* ================================================================== */

function DataCohorts() {
  const clusters = [
    { cx: 55, cy: 55, color: COBALT, n: 9 },
    { cx: 170, cy: 45, color: TEAL, n: 11 },
    { cx: 65, cy: 115, color: AMBER, n: 7 },
    { cx: 175, cy: 110, color: ROSE, n: 10 },
  ]
  return (
    <svg viewBox="0 0 240 160" className="w-full h-auto">
      {clusters.map((cl, ci) => (
        <g key={ci}>
          {Array.from({ length: cl.n }).map((_, i) => {
            const a = rand(ci * 50 + i, 1) * Math.PI * 2
            const r = rand(ci * 50 + i, 2) * 22
            return <rect key={i} x={cl.cx + Math.cos(a) * r - 2.5} y={cl.cy + Math.sin(a) * r - 2.5}
              width="5" height="5" fill={cl.color} />
          })}
        </g>
      ))}
    </svg>
  )
}

function DataPercent() {
  const rows = 8, cols = 14
  const highlight = Math.round(rows * cols * 0.37)
  return (
    <svg viewBox="0 0 240 160" className="w-full h-auto">
      {Array.from({ length: rows * cols }).map((_, i) => {
        const r = Math.floor(i / cols)
        const c = i % cols
        return <rect key={i} x={25 + c * 14} y={25 + r * 14} width="7" height="7"
          fill={i < highlight ? COBALT : CLOUD} stroke={i < highlight ? 'none' : PEWTER} strokeWidth="0.6" />
      })}
      <text x="25" y="153" fontSize="20" fontWeight="700" fill={COBALT} fontFamily="'Albert Sans', sans-serif">37%</text>
    </svg>
  )
}

function DataComposition() {
  return (
    <svg viewBox="0 0 240 160" className="w-full h-auto">
      <rect x="20" y="55" width="120" height="40" fill={CANVAS} stroke={INK} strokeWidth="1.2" />
      <rect x="140" y="55" width="40" height="40" fill={COBALT} />
      <rect x="180" y="55" width="20" height="40" fill={TEAL} />
      <rect x="200" y="55" width="20" height="40" fill={AMBER} />
      <text x="80" y="118" fontSize="9" fill={PEWTER} textAnchor="middle" fontFamily="'JetBrains Mono', monospace">60 · canvas</text>
      <text x="160" y="118" fontSize="9" fill={COBALT} textAnchor="middle" fontFamily="'JetBrains Mono', monospace">20</text>
      <text x="190" y="118" fontSize="9" fill={TEAL} textAnchor="middle" fontFamily="'JetBrains Mono', monospace">10</text>
      <text x="210" y="118" fontSize="9" fill={AMBER} textAnchor="middle" fontFamily="'JetBrains Mono', monospace">10</text>
    </svg>
  )
}

function DataThreshold() {
  return (
    <svg viewBox="0 0 240 160" className="w-full h-auto">
      {Array.from({ length: 7 }).map((_, row) => (
        Array.from({ length: 14 }).map((_, col) => {
          const i = row * 14 + col
          return <rect key={i} x={20 + col * 15} y={25 + row * 15} width="6" height="6"
            fill={row < 3 ? AMBER : PEWTER} opacity={row < 3 ? 1 : 0.5} />
        })
      ))}
      <line x1="15" y1="68" x2="235" y2="68" stroke={INK} strokeWidth="1.2" strokeDasharray="4 3" />
      <text x="232" y="64" fontSize="8" fill={INK} textAnchor="end" fontFamily="'JetBrains Mono', monospace">threshold</text>
    </svg>
  )
}

/* ================================================================== */
/*  TYPOGRAPHIC — letterforms as geometric shapes                      */
/* ================================================================== */

function TypoInitialS() {
  return (
    <svg viewBox="0 0 240 160" className="w-full h-auto">
      <defs>
        <linearGradient id="typo-s" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={COBALT} />
          <stop offset="0.5" stopColor={TEAL} />
          <stop offset="1" stopColor={AMBER} />
        </linearGradient>
      </defs>
      <text x="120" y="140" fontSize="180" fontWeight="700" fill="url(#typo-s)"
        fontFamily="'Albert Sans', sans-serif" textAnchor="middle" letterSpacing="-0.05em">S</text>
    </svg>
  )
}

function TypoNumeral() {
  return (
    <svg viewBox="0 0 240 160" className="w-full h-auto">
      <text x="100" y="140" fontSize="160" fontWeight="700" fill="none" stroke={INK} strokeWidth="2"
        fontFamily="'Albert Sans', sans-serif" textAnchor="middle" letterSpacing="-0.04em">3</text>
      <rect x="175" y="40" width="8" height="8" fill={COBALT} />
      <rect x="175" y="82" width="8" height="8" fill={TEAL} />
      <rect x="175" y="124" width="8" height="8" fill={AMBER} />
    </svg>
  )
}

/* ================================================================== */
/*  PATTERNS                                                             */
/* ================================================================== */

function PatDotGrid() {
  return (
    <svg viewBox="0 0 240 160" className="w-full h-auto">
      {Array.from({ length: 8 }).map((_, row) => (
        Array.from({ length: 14 }).map((_, col) => {
          const i = row * 14 + col
          const size = 3 + (rand(i, 600) > 0.7 ? 4 : 0)
          const color = rand(i, 601) > 0.85 ? AMBER : rand(i, 602) > 0.7 ? COBALT : INK
          return <rect key={i} x={20 + col * 14} y={25 + row * 14} width={size} height={size} fill={color} opacity={size > 3 ? 1 : 0.7} />
        })
      ))}
    </svg>
  )
}

function PatRadial() {
  const rings = 8
  return (
    <svg viewBox="0 0 240 160" className="w-full h-auto">
      <rect width="240" height="160" fill={INK} />
      {Array.from({ length: rings }).map((_, i) => (
        <g key={i}>
          {Array.from({ length: 24 }).map((_, j) => {
            const a = (j / 24) * Math.PI * 2
            const r = 14 + i * 12
            const cx = 120 + Math.cos(a) * r
            const cy = 80 + Math.sin(a) * r
            const grad = i / rings
            const color = grad < 0.4 ? COBALT : grad < 0.7 ? TEAL : AMBER
            return <rect key={j} x={cx - 1} y={cy - 1} width="2" height="2" fill={color} opacity={1 - grad * 0.6} />
          })}
        </g>
      ))}
    </svg>
  )
}

function PatStripes() {
  return (
    <svg viewBox="0 0 240 160" className="w-full h-auto">
      {Array.from({ length: 20 }).map((_, i) => {
        const w = 8 + (i % 4) * 3
        const x = 5 + i * 12
        const palette = [COBALT, TEAL, AMBER, INK, PEWTER]
        return <rect key={i} x={x} y="15" width={w} height="130" fill={palette[i % palette.length]} opacity={0.6 + (i % 3) * 0.15} />
      })}
    </svg>
  )
}

function PatShapeGrid() {
  const items = [
    { t: 'c', c: COBALT }, { t: 'r', c: CANVAS }, { t: 'c', c: TEAL }, { t: 'r', c: AMBER },
    { t: 'r', c: INK }, { t: 'c', c: AMBER }, { t: 'r', c: COBALT }, { t: 'c', c: ROSE },
    { t: 'c', c: INK }, { t: 'r', c: TEAL }, { t: 'c', c: PEWTER }, { t: 'r', c: COBALT },
  ]
  return (
    <svg viewBox="0 0 240 160" className="w-full h-auto">
      <rect width="240" height="160" fill={CLOUD} />
      {items.map((it, i) => {
        const col = i % 4
        const row = Math.floor(i / 4)
        const cx = 35 + col * 57
        const cy = 30 + row * 45
        return it.t === 'c'
          ? <circle key={i} cx={cx} cy={cy} r="18" fill={it.c} />
          : <rect key={i} x={cx - 18} y={cy - 18} width="36" height="36" fill={it.c} />
      })}
    </svg>
  )
}

/* ================================================================== */
/*  LIBRARY STYLE RECONSTRUCTIONS                                       */
/*  (Approximations of what each library's output looks like,           */
/*   recoloured to the Spectrea palette for direct comparison.)         */
/* ================================================================== */

function LibHumaaans() {
  return (
    <svg viewBox="0 0 140 220" className="h-auto" style={{ maxHeight: 200 }}>
      <path d="M42,38 Q42,18 62,18 Q88,18 88,42 L83,42 Q83,28 62,28 Q47,28 47,42 Z" fill={INK} />
      <circle cx="62" cy="48" r="17" fill={AMBER} />
      <rect x="42" y="65" width="40" height="55" rx="5" fill={COBALT} />
      <rect x="27" y="67" width="12" height="46" rx="5" fill={COBALT} />
      <rect x="85" y="67" width="12" height="46" rx="5" fill={COBALT} />
      <circle cx="33" cy="117" r="7" fill={AMBER} />
      <circle cx="91" cy="117" r="7" fill={AMBER} />
      <rect x="43" y="120" width="17" height="60" fill={INK} />
      <rect x="64" y="120" width="17" height="60" fill={INK} />
      <rect x="40" y="178" width="22" height="10" rx="2" fill={TEAL} />
      <rect x="62" y="178" width="22" height="10" rx="2" fill={TEAL} />
    </svg>
  )
}

function LibVisx() {
  const values = [40, 90, 55, 120, 80, 160, 110, 70, 140]
  return (
    <svg viewBox="0 0 240 160" className="w-full h-auto">
      <line x1="25" y1="140" x2="225" y2="140" stroke={PEWTER} strokeWidth="0.6" />
      <line x1="25" y1="20" x2="25" y2="140" stroke={PEWTER} strokeWidth="0.6" />
      {values.map((v, i) => {
        const barW = 18, gap = 4
        return (
          <rect key={i} x={30 + i * (barW + gap)} y={140 - v * 0.7} width={barW} height={v * 0.7}
            fill={i === 5 ? AMBER : COBALT} opacity={i === 5 ? 1 : 0.8} />
        )
      })}
    </svg>
  )
}


function LibSpectreaNative() {
  return (
    <svg viewBox="0 0 240 160" className="w-full h-auto">
      <defs>
        <linearGradient id="lib-native" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={COBALT} />
          <stop offset="0.5" stopColor={TEAL} />
          <stop offset="1" stopColor={AMBER} />
        </linearGradient>
      </defs>
      <path d="M25,115 C70,50 130,130 215,30" stroke="url(#lib-native)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="25" cy="115" r="5" fill={COBALT} />
      <circle cx="75" cy="75" r="3.5" fill={INK} />
      <circle cx="130" cy="95" r="3.5" fill={INK} />
      <circle cx="175" cy="60" r="3.5" fill={TEAL} />
      <circle cx="215" cy="30" r="5" fill={AMBER} />
    </svg>
  )
}

/* ================================================================== */
/*  ANIMATION DEMOS — Framer Motion + native alternatives               */
/* ================================================================== */

function AnimStrokeDraw({ playKey }: { playKey: number }) {
  return (
    <svg viewBox="0 0 240 140" className="w-full h-auto">
      <defs>
        <linearGradient id={`anim-draw-${playKey}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={COBALT} />
          <stop offset="0.5" stopColor={TEAL} />
          <stop offset="1" stopColor={AMBER} />
        </linearGradient>
      </defs>
      <motion.path
        key={playKey}
        d="M25,110 C60,50 120,120 215,25"
        stroke={`url(#anim-draw-${playKey})`}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle cx="25" cy="110" r="5" fill={COBALT}
        key={`d1-${playKey}`}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0, duration: 0.4 }} />
      <motion.circle cx="215" cy="25" r="5" fill={AMBER}
        key={`d2-${playKey}`}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 400 }} />
    </svg>
  )
}

function AnimSpringStagger({ playKey }: { playKey: number }) {
  const dots = Array.from({ length: 16 }, (_, i) => ({
    x: 30 + (i % 8) * 25, y: 40 + Math.floor(i / 8) * 40,
    c: [COBALT, TEAL, AMBER, INK][i % 4],
  }))
  return (
    <svg viewBox="0 0 240 140" className="w-full h-auto">
      {dots.map((d, i) => (
        <motion.circle
          key={`${playKey}-${i}`}
          cx={d.x} cy={d.y} r="7" fill={d.c}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.04, type: 'spring', stiffness: 260, damping: 14 }}
        />
      ))}
    </svg>
  )
}

function AnimHover() {
  return (
    <svg viewBox="0 0 240 140" className="w-full h-auto">
      <motion.rect
        x="40" y="30" width="60" height="80" fill={COBALT} rx="6"
        whileHover={{ scale: 1.1, y: 25 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      <motion.rect
        x="140" y="30" width="60" height="80" fill={AMBER} rx="6"
        whileHover={{ scale: 1.1, y: 25 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
    </svg>
  )
}

function AnimMorph({ toggled }: { toggled: boolean }) {
  return (
    <svg viewBox="0 0 240 140" className="w-full h-auto">
      <motion.path
        d={toggled
          ? 'M 120 25 L 215 120 L 25 120 Z'
          : 'M 60 35 L 180 35 L 180 115 L 60 115 Z'}
        fill={toggled ? AMBER : COBALT}
        animate={{
          d: toggled
            ? 'M 120 25 L 215 120 L 25 120 Z'
            : 'M 60 35 L 180 35 L 180 115 L 60 115 Z',
          fill: toggled ? AMBER : COBALT,
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
    </svg>
  )
}

function AnimContinuous() {
  return (
    <svg viewBox="0 0 240 140" className="w-full h-auto">
      <motion.g
        style={{ originX: '120px', originY: '70px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2
          const r = 45
          return (
            <circle key={i} cx={120 + Math.cos(a) * r} cy={70 + Math.sin(a) * r}
              r="5" fill={[COBALT, TEAL, AMBER, ROSE][i % 4]} />
          )
        })}
      </motion.g>
      <circle cx="120" cy="70" r="8" fill={INK} />
    </svg>
  )
}

function AnimScroll() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const dots = Array.from({ length: 10 }, (_, i) => ({
    x: 20 + i * 22, y: 70,
  }))
  return (
    <svg ref={ref} viewBox="0 0 240 140" className="w-full h-auto">
      {dots.map((d, i) => (
        <motion.circle
          key={i} cx={d.x} cy={d.y} r="6"
          fill={i < 4 ? COBALT : i < 7 ? TEAL : AMBER}
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
          style={{ cx: d.x, cy: d.y }}
        />
      ))}
    </svg>
  )
}

function AnimCssHover() {
  return (
    <svg viewBox="0 0 240 140" className="w-full h-auto">
      <style>{`
        .css-box { transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), fill 300ms; transform-origin: center; transform-box: fill-box; }
        .css-box:hover { transform: scale(1.12) translateY(-6px); }
        .css-box-a:hover { fill: #3A63C4; }
        .css-box-b:hover { fill: #C58200; }
      `}</style>
      <rect className="css-box css-box-a" x="40" y="30" width="60" height="80" fill={COBALT} rx="6" />
      <rect className="css-box css-box-b" x="140" y="30" width="60" height="80" fill={AMBER} rx="6" />
    </svg>
  )
}

function AnimSmil() {
  return (
    <svg viewBox="0 0 240 140" className="w-full h-auto">
      <circle cx="120" cy="70" r="8" fill={AMBER}>
        <animate attributeName="r" values="8;28;8" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="120" cy="70" r="8" fill={AMBER} />
    </svg>
  )
}

/* ================================================================== */
/*  ANTI-PATTERNS                                                       */
/* ================================================================== */

function AntiCartoon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-auto">
      <circle cx="60" cy="60" r="35" fill={AMBER} />
      <circle cx="50" cy="52" r="5" fill={INK} />
      <circle cx="70" cy="52" r="5" fill={INK} />
      <path d="M45,72 Q60,85 75,72" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function AntiStock() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-auto">
      <rect width="120" height="120" rx="6" fill={CLOUD} />
      <rect x="15" y="25" width="90" height="60" rx="4" fill="#d1d5db" />
      <circle cx="35" cy="50" r="8" fill="#9ca3af" />
      <path d="M20,80 L45,60 L65,75 L100,50 L100,80 Z" fill="#9ca3af" />
      <text x="60" y="105" textAnchor="middle" fontSize="9" fill={PEWTER}>shutterstock-vibes</text>
    </svg>
  )
}

function AntiOffPalette() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-auto">
      <defs>
        <linearGradient id="a-over" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff00c8" />
          <stop offset="0.5" stopColor="#00e0ff" />
          <stop offset="1" stopColor="#fffc00" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="6" fill="url(#a-over)" />
      <text x="60" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">VIBES</text>
    </svg>
  )
}

function AntiSkeuomorph() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-auto">
      <defs>
        <radialGradient id="a-skeu" cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#a0a0a0" />
          <stop offset="1" stopColor="#404040" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="45" fill="url(#a-skeu)" stroke="#303030" strokeWidth="2" />
      <circle cx="60" cy="60" r="30" fill="#202020" />
      <circle cx="60" cy="60" r="20" fill="#000" />
      <circle cx="50" cy="50" r="5" fill="#ffffff" opacity="0.5" />
    </svg>
  )
}

/* ================================================================== */
/*  Display primitives                                                  */
/* ================================================================== */

function Tile({ children, label, bg = CLOUD }: { children: React.ReactNode; label: string; bg?: string }) {
  return (
    <div className="flex flex-col">
      <div
        className="rounded-xl p-4 flex items-center justify-center overflow-hidden"
        style={{ background: bg, aspectRatio: '16 / 10' }}
      >
        {children}
      </div>
      <p className="mt-2 text-xs font-mono text-stone-500">{label}</p>
    </div>
  )
}

function LibraryCard({
  children, name, license, note, url,
}: { children: React.ReactNode; name: string; license: string; note: string; url: string }) {
  return (
    <div className="flex flex-col rounded-xl border border-stone-200 overflow-hidden">
      <div className="p-4 flex items-center justify-center overflow-hidden bg-cloud" style={{ aspectRatio: '16 / 10' }}>
        {children}
      </div>
      <div className="p-3.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-stone-800 truncate" style={{ fontFamily: "'Albert Sans', sans-serif" }}>{name}</p>
          <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-500 shrink-0">{license}</span>
        </div>
        <p className="text-xs text-stone-500 mt-1.5 leading-snug">{note}</p>
        <p className="text-[10px] font-mono text-stone-400 mt-2">{url}</p>
      </div>
    </div>
  )
}

function AnimationDemos() {
  const [drawKey, setDrawKey] = useState(0)
  const [staggerKey, setStaggerKey] = useState(0)
  const [morphToggle, setMorphToggle] = useState(false)

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <AnimDemoCard
        title="Stroke draw"
        lib="Framer Motion"
        libColor={COBALT}
        snippet={`<motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6 }} />`}
        action={<button onClick={() => setDrawKey(k => k + 1)} className="text-xs font-mono text-brand hover:underline">Replay →</button>}
      >
        <AnimStrokeDraw playKey={drawKey} />
      </AnimDemoCard>

      <AnimDemoCard
        title="Spring stagger"
        lib="Framer Motion"
        libColor={COBALT}
        snippet={`<motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.04, type: 'spring' }} />`}
        action={<button onClick={() => setStaggerKey(k => k + 1)} className="text-xs font-mono text-brand hover:underline">Replay →</button>}
      >
        <AnimSpringStagger playKey={staggerKey} />
      </AnimDemoCard>

      <AnimDemoCard
        title="Hover + tap gesture"
        lib="Framer Motion"
        libColor={COBALT}
        snippet={`<motion.rect whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />`}
        action={<span className="text-xs font-mono text-stone-400">Hover and click →</span>}
      >
        <AnimHover />
      </AnimDemoCard>

      <AnimDemoCard
        title="Path morph"
        lib="Framer Motion"
        libColor={COBALT}
        snippet={`<motion.path animate={{ d: toggled ? pathA : pathB }} transition={{ duration: 0.8 }} />`}
        action={<button onClick={() => setMorphToggle(t => !t)} className="text-xs font-mono text-brand hover:underline">Toggle →</button>}
      >
        <AnimMorph toggled={morphToggle} />
      </AnimDemoCard>

      <AnimDemoCard
        title="Continuous loop"
        lib="Framer Motion"
        libColor={COBALT}
        snippet={`<motion.g animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />`}
        action={<span className="text-xs font-mono text-stone-400">Always running</span>}
      >
        <AnimContinuous />
      </AnimDemoCard>

      <AnimDemoCard
        title="Scroll-triggered"
        lib="Framer Motion"
        libColor={COBALT}
        snippet={`const inView = useInView(ref); animate={inView ? 'visible' : 'hidden'}`}
        action={<span className="text-xs font-mono text-stone-400">Scroll this tile in/out of view</span>}
      >
        <AnimScroll />
      </AnimDemoCard>

      <AnimDemoCard
        title="CSS hover"
        lib="No library"
        libColor={PEWTER}
        snippet={`.box { transition: transform 300ms; } .box:hover { transform: scale(1.12); }`}
        action={<span className="text-xs font-mono text-stone-400">Hover →</span>}
      >
        <AnimCssHover />
      </AnimDemoCard>

      <AnimDemoCard
        title="SVG SMIL"
        lib="Native SVG"
        libColor={PEWTER}
        snippet={`<animate attributeName="r" values="8;28;8" dur="2s" repeatCount="indefinite" />`}
        action={<span className="text-xs font-mono text-stone-400">Native playback</span>}
      >
        <AnimSmil />
      </AnimDemoCard>
    </div>
  )
}

function AnimDemoCard({
  children, title, lib, libColor, snippet, action,
}: { children: React.ReactNode; title: string; lib: string; libColor: string; snippet: string; action: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-xl border border-stone-200 overflow-hidden">
      <div className="p-4 flex items-center justify-center overflow-hidden bg-cloud" style={{ aspectRatio: '16 / 9' }}>
        {children}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-stone-800" style={{ fontFamily: "'Albert Sans', sans-serif" }}>{title}</p>
          <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full shrink-0" style={{ background: libColor + '22', color: libColor }}>{lib}</span>
        </div>
        <pre className="text-[10px] font-mono text-stone-500 mt-2 bg-stone-50 rounded p-2 overflow-x-auto leading-relaxed">{snippet}</pre>
        <div className="mt-2">{action}</div>
      </div>
    </div>
  )
}

function SubSection({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4">
        <p className="text-xs font-mono uppercase tracking-wider text-stone-400">{eyebrow}</p>
        <h3 className="text-lg font-semibold text-stone-800 mt-0.5" style={{ fontFamily: "'Albert Sans', sans-serif" }}>{title}</h3>
      </div>
      {children}
    </div>
  )
}

/* ================================================================== */
/*  Page                                                                */
/* ================================================================== */

export default function Illustration() {
  return (
    <PageShell
      title="Illustration"
      subtitle="Every Spectrea illustration assembles from five atoms — Dot, Curve, Cluster, Trail, Field — in the brand palette, on Canvas. The mark itself is this system at small scale; illustrations extend it at larger scale."
    >
      {/* ─── The Dot System manifesto ─── */}
      <Section>
        <div className="rounded-xl bg-ink text-white p-6 sm:p-8">
          <p className="text-xs font-mono uppercase tracking-wider" style={{ color: COBALT }}>The Dot System</p>
          <h2 className="text-2xl font-semibold mt-1" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Five atoms — one universal illustration vocabulary</h2>
          <p className="text-sm text-stone-400 mt-3 max-w-2xl leading-relaxed">
            The brand mark — 10 dots along a curve with the last 3 trailing — IS this system at small scale.
            Illustrations extend the same DNA: filled circles in brand colours, soft Bézier curves, clusters of dots,
            directional trails, atmospheric fields. Anything not assembled from these five atoms is off-brand.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            <div className="border-l-2 pl-3" style={{ borderColor: COBALT }}>
              <p className="text-xs font-mono uppercase tracking-wider" style={{ color: COBALT }}>Dot</p>
              <p className="text-xs text-stone-300 mt-1 leading-snug">A point of attention. Stand it for whatever you need.</p>
            </div>
            <div className="border-l-2 pl-3" style={{ borderColor: TEAL }}>
              <p className="text-xs font-mono uppercase tracking-wider" style={{ color: TEAL }}>Curve</p>
              <p className="text-xs text-stone-300 mt-1 leading-snug">The relationship between two things.</p>
            </div>
            <div className="border-l-2 pl-3" style={{ borderColor: AMBER }}>
              <p className="text-xs font-mono uppercase tracking-wider" style={{ color: AMBER }}>Cluster</p>
              <p className="text-xs text-stone-300 mt-1 leading-snug">Things that belong together. A whole of parts.</p>
            </div>
            <div className="border-l-2 pl-3" style={{ borderColor: ROSE }}>
              <p className="text-xs font-mono uppercase tracking-wider" style={{ color: ROSE }}>Trail</p>
              <p className="text-xs text-stone-300 mt-1 leading-snug">Movement through time. From then to now.</p>
            </div>
            <div className="border-l-2 pl-3" style={{ borderColor: PEWTER }}>
              <p className="text-xs font-mono uppercase tracking-wider" style={{ color: PEWTER }}>Field</p>
              <p className="text-xs text-stone-300 mt-1 leading-snug">The air around the subject. Atmosphere, never subject.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Five atoms — visual reference ─── */}
      <Section>
        <SubSection eyebrow="Reference" title="The five atoms">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Tile label="Dot — Cobalt"><svg viewBox="0 0 60 60" className="w-full h-full"><circle cx="30" cy="30" r="14" fill={COBALT}/></svg></Tile>
            <Tile label="Curve — connecting two dots"><svg viewBox="0 0 80 60" className="w-full h-full"><path d="M 14 40 C 30 10, 50 50, 66 20" stroke={COBALT} strokeWidth="3" fill="none" strokeLinecap="round"/><circle cx="14" cy="40" r="6" fill={COBALT}/><circle cx="66" cy="20" r="6" fill={TEAL}/></svg></Tile>
            <Tile label="Cluster — 5 dots wired"><svg viewBox="0 0 80 60" className="w-full h-full"><line x1="40" y1="30" x2="22" y2="22" stroke={PEWTER} strokeWidth="1.5" opacity="0.5"/><line x1="40" y1="30" x2="54" y2="20" stroke={PEWTER} strokeWidth="1.5" opacity="0.5"/><line x1="40" y1="30" x2="58" y2="42" stroke={PEWTER} strokeWidth="1.5" opacity="0.5"/><line x1="40" y1="30" x2="20" y2="42" stroke={PEWTER} strokeWidth="1.5" opacity="0.5"/><circle cx="40" cy="30" r="6" fill={TEAL}/><circle cx="22" cy="22" r="5" fill={COBALT}/><circle cx="54" cy="20" r="5" fill={AMBER}/><circle cx="58" cy="42" r="5" fill={ROSE}/><circle cx="20" cy="42" r="5" fill={COBALT}/></svg></Tile>
            <Tile label="Trail — provenance, faint→full"><svg viewBox="0 0 100 40" className="w-full h-full"><circle cx="12" cy="20" r="4" fill={COBALT} opacity="0.3"/><circle cx="32" cy="20" r="5" fill={COBALT} opacity="0.5"/><circle cx="54" cy="20" r="6" fill={COBALT} opacity="0.7"/><circle cx="78" cy="20" r="7" fill={COBALT} opacity="0.9"/><line x1="14" y1="20" x2="30" y2="20" stroke={COBALT} strokeWidth="1.5" opacity="0.3" strokeDasharray="3 2"/><line x1="34" y1="20" x2="52" y2="20" stroke={COBALT} strokeWidth="1.5" opacity="0.5" strokeDasharray="3 2"/><line x1="56" y1="20" x2="76" y2="20" stroke={COBALT} strokeWidth="1.5" opacity="0.7" strokeDasharray="3 2"/></svg></Tile>
            <Tile label="Field — Teal Mist wash"><svg viewBox="0 0 80 60" className="w-full h-full"><defs><radialGradient id="atom-field" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#E6F5F3"/><stop offset="100%" stopColor={CANVAS}/></radialGradient></defs><ellipse cx="40" cy="30" rx="36" ry="24" fill="url(#atom-field)"/><circle cx="40" cy="30" r="4" fill={TEAL}/></svg></Tile>
          </div>
          <p className="text-xs text-stone-500 mt-3 leading-relaxed">
            For brand-grade illustrations, generate via <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-xs">docs/illustration-prompt.md</code> (the Dot System v2 prompt).
            The geometric vocabulary below is a <em>specialisation</em> of the Dot System for product UI, iconography, and technical diagrams — circles, rectangles, triangles, arcs reduce to the same five-atom DNA.
          </p>
        </SubSection>
      </Section>
      {/* ─── Geometric specialisation manifesto ─── */}
      <Section>
        <div className="rounded-xl bg-ink text-white p-6 sm:p-8">
          <p className="text-xs font-mono uppercase tracking-wider" style={{ color: AMBER }}>Geometric specialisation — for product UI</p>
          <h2 className="text-2xl font-semibold mt-1" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Geometric primitives — Dot System for product surfaces</h2>
          <p className="text-sm text-stone-400 mt-3 max-w-2xl leading-relaxed">
            Circle, rectangle, triangle, arc, line — flat fills from the brand palette. Strict composition. Used for product UI, iconography, technical diagrams, and developer-facing surfaces. These shapes are how the Dot System renders when the surface needs structural precision (icons, diagrams, density). Bauhaus figures (below) are how the Dot System renders when the subject is human. Aesthetic lineage: Bauhaus, Müller-Brockmann, Saul Bass, Vignelli, Paula Scher, Studio Dumbar. For brand-grade marketing illustrations, use the Dot System prompt at <code className="bg-stone-800 px-1 py-0.5 rounded font-mono text-xs">docs/illustration-prompt.md</code>.
          </p>
          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="border-l-2 pl-3" style={{ borderColor: COBALT }}>
              <p className="text-xs font-mono uppercase tracking-wider" style={{ color: COBALT }}>Vocabulary</p>
              <p className="text-sm mt-1">Circle · rectangle · triangle · arc · line.</p>
            </div>
            <div className="border-l-2 pl-3" style={{ borderColor: TEAL }}>
              <p className="text-xs font-mono uppercase tracking-wider" style={{ color: TEAL }}>Palette</p>
              <p className="text-sm mt-1">Cobalt · Teal · Amber · Rose · Ink · Pewter. One colour per shape.</p>
            </div>
            <div className="border-l-2 pl-3" style={{ borderColor: AMBER }}>
              <p className="text-xs font-mono uppercase tracking-wider" style={{ color: AMBER }}>Discipline</p>
              <p className="text-sm mt-1">Flat. No gradients (outside hero S). No shadows. No texture.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── People ─── */}
      <Section>
        <SubSection eyebrow="Category" title="People">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Tile label="Portrait — features as primitives"><PortraitGeom /></Tile>
            <Tile label="Avatar — head and shoulders"><PortraitAvatar /></Tile>
            <Tile label="Single figure — cobalt"><SpectreaFigure color="cobalt" /></Tile>
            <Tile label="Single figure — amber"><SpectreaFigure color="amber" /></Tile>
            <Tile label="Cohort — team of four"><SceneCohort /></Tile>
            <Tile label="Crowd — modular grid of figures"><SceneCrowd /></Tile>
          </div>
        </SubSection>
      </Section>

      {/* ─── Emotion ─── */}
      <Section>
        <SubSection eyebrow="Category" title="Emotion">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Tile label="Focus — concentric rings"><EmoFocus /></Tile>
            <Tile label="Calm — single grounded form"><EmoCalm /></Tile>
            <Tile label="Tension — offset overlap"><EmoTension /></Tile>
            <Tile label="Uncertainty — scattered field + mark"><EmoUncertainty /></Tile>
            <Tile label="Joy — full spectrum around ink core"><EmoJoy /></Tile>
            <Tile label="Ambition — ascending stacks"><EmoAmbition /></Tile>
          </div>
        </SubSection>
      </Section>

      {/* ─── Discovery ─── */}
      <Section>
        <SubSection eyebrow="Category" title="Discovery & insight">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Tile label="Thinker — figure with ideas forming"><Thinker /></Tile>
            <Tile label="Aha — illuminated node in the field"><DiscoveryAha /></Tile>
            <Tile label="Lightbulb — rays around a lit bulb"><DiscoveryLightbulb /></Tile>
          </div>
        </SubSection>
      </Section>

      {/* ─── Interaction ─── */}
      <Section>
        <SubSection eyebrow="Category" title="Interaction">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Tile label="Meeting — top-down table"><IntMeeting /></Tile>
            <Tile label="Handshake — opposing triangles"><IntHandshake /></Tile>
            <Tile label="Conversation — speech frames"><IntConversation /></Tile>
            <Tile label="Network — hub and spokes"><IntNetwork /></Tile>
          </div>
        </SubSection>
      </Section>

      {/* ─── Concepts ─── */}
      <Section>
        <SubSection eyebrow="Category" title="Concepts">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Tile label="Security — shield + lock"><ConSecurity /></Tile>
            <Tile label="Growth — ascending triangles"><ConGrowth /></Tile>
            <Tile label="Speed — arrow thrust"><ConSpeed /></Tile>
            <Tile label="Balance — paired forms on beam"><ConBalance /></Tile>
            <Tile label="Choice — branching to options"><ConChoice /></Tile>
            <Tile label="Priority — ranked by size"><ConPriority /></Tile>
            <Tile label="Stability — stacked foundation"><ConStability /></Tile>
            <Tile label="Insight — eye composition"><ConInsight /></Tile>
          </div>
        </SubSection>
      </Section>

      {/* ─── Objects ─── */}
      <Section>
        <SubSection eyebrow="Category" title="Objects">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Tile label="Book — two-page spread"><ObjBook /></Tile>
            <Tile label="Key — disc and bit"><ObjKey /></Tile>
            <Tile label="Gear — teeth around a ring"><ObjGear /></Tile>
            <Tile label="Target — concentric bands"><ObjTarget /></Tile>
          </div>
        </SubSection>
      </Section>

      {/* ─── Environments ─── */}
      <Section>
        <SubSection eyebrow="Category" title="Environments">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Tile label="Office — isometric desk"><EnvOffice /></Tile>
            <Tile label="City — skyline composition"><EnvCity /></Tile>
            <Tile label="Landscape — horizon bands"><EnvLandscape /></Tile>
            <Tile label="Building — simple facade"><EnvRoom /></Tile>
          </div>
        </SubSection>
      </Section>

      {/* ─── Narrative ─── */}
      <Section>
        <SubSection eyebrow="Category" title="Narrative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Tile label="Journey — milestoned path"><NarJourney /></Tile>
            <Tile label="Transformation — shape change"><NarTransformation /></Tile>
            <Tile label="Before → after — field to grid"><NarBeforeAfter /></Tile>
          </div>
        </SubSection>
      </Section>

      {/* ─── Data ─── */}
      <Section>
        <SubSection eyebrow="Category" title="Data">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Tile label="Cohorts — coloured clusters"><DataCohorts /></Tile>
            <Tile label="Percentage — filled grid"><DataPercent /></Tile>
            <Tile label="Composition — 60/20/10/10"><DataComposition /></Tile>
            <Tile label="Threshold — above/below line"><DataThreshold /></Tile>
          </div>
        </SubSection>
      </Section>

      {/* ─── Typography ─── */}
      <Section>
        <SubSection eyebrow="Category" title="Typography as geometry">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Tile label="Initial S — gradient hero (only exception)" bg={CANVAS}><TypoInitialS /></Tile>
            <Tile label="Numeral — outlined with markers" bg={CANVAS}><TypoNumeral /></Tile>
          </div>
        </SubSection>
      </Section>

      {/* ─── Patterns ─── */}
      <Section>
        <SubSection eyebrow="Category" title="Patterns & backgrounds">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Tile label="Dot grid — density emphasis" bg={CANVAS}><PatDotGrid /></Tile>
            <Tile label="Radial — dot rings on ink"><PatRadial /></Tile>
            <Tile label="Stripes — rhythmic palette" bg={CANVAS}><PatStripes /></Tile>
            <Tile label="Shape grid — primitives tiled" bg={CANVAS}><PatShapeGrid /></Tile>
          </div>
        </SubSection>
      </Section>

      {/* ─── Construction rules ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Rules that keep error rate low. Because the vocabulary is small, deviations show immediately.">
            <span>Construction rules</span>
          </Tooltip>
        </h2>
        <div className="rounded-lg bg-stone-50 border border-stone-100 p-5">
          <ul className="text-sm text-stone-600 space-y-2 list-disc list-inside">
            <li><strong>Primitives only.</strong> Circle, rectangle, triangle, arc, line. If you reach for a path to draw a curve that isn't an arc, stop.</li>
            <li><strong>Flat fills only.</strong> One colour per shape from the brand palette. No gradients except the hero lockup and the initial-S treatment.</li>
            <li><strong>Colour hierarchy.</strong> One spectrum accent per composition. Ink and Pewter do the quiet work. Rose is a highlight, not a fill.</li>
            <li><strong>Alignment.</strong> Compose on a grid. Eyeballed placement drifts; grid placement stays.</li>
            <li><strong>No texture.</strong> No noise, no grain, no shadows, no blurs. The style is clean by definition.</li>
            <li><strong>No gradients for faces/figures.</strong> Faces are rectangles and circles; the moment you add a gradient, it turns into an app icon.</li>
            <li><strong>Generous negative space.</strong> Crowded compositions break the Swiss discipline. Let shapes breathe.</li>
          </ul>
        </div>
      </Section>

      {/* ─── Library reference (approved) ─── */}
      <Section>
        <div className="border-t border-stone-200 pt-8">
          <p className="text-xs font-mono uppercase tracking-wider text-stone-400">Stack</p>
          <h2 className="text-xl font-semibold text-stone-800 mt-1" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Illustration stack — free, open source, no attribution</h2>
          <p className="text-sm text-stone-500 mt-2 max-w-2xl">
            Every library below is MIT licensed, requires no attribution, and fits the geometric brand direction. Recoloured to the Spectrea palette for direct comparison.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <LibraryCard
            name="Spectrea native"
            license="Current · In use"
            note="Procedural inline SVG — what powers every illustration on this page. Zero dependency, full brand control."
            url="this codebase"
          >
            <LibSpectreaNative />
          </LibraryCard>
          <LibraryCard
            name="Humaaans"
            license="MIT · No attribution"
            note="Mix-and-match modular human figures by Pablo Stanley. Closest external match to the Spectrea figure language."
            url="humaaans.com"
          >
            <LibHumaaans />
          </LibraryCard>
          <LibraryCard
            name="visx"
            license="MIT · No attribution"
            note="Airbnb's D3 + React primitives. Use for dynamic data-viz illustrations where dots must come from real data."
            url="airbnb.io/visx"
          >
            <LibVisx />
          </LibraryCard>
        </div>
        <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-stone-400">Evaluated and rejected</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 text-sm">
            <div className="flex items-baseline gap-2">
              <span className="text-stone-800 font-semibold">unDraw</span>
              <span className="text-stone-500">— off-brand (editorial scene style, not geometric)</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-stone-800 font-semibold">Storyset</span>
              <span className="text-stone-500">— attribution required on free tier</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-stone-800 font-semibold">Lordicon</span>
              <span className="text-stone-500">— subscription required</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-stone-800 font-semibold">Rive</span>
              <span className="text-stone-500">— paid editor to author (see note below)</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-stone-800 font-semibold">GSAP MorphSVG</span>
              <span className="text-stone-500">— paid plugin</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-stone-800 font-semibold">Lottie / After Effects</span>
              <span className="text-stone-500">— needs a motion designer to produce source files</span>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-stone-200 p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <p className="font-semibold text-stone-800" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Note on Rive — worth knowing, not adopting</p>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 bg-stone-100 text-stone-500">Future candidate</span>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            Rive is uniquely good at <strong>interactive state machines</strong> — a single vector component that transitions between loading / success / error / hover states driven by app data. Runtime is ~50KB, files are tiny, two-way JS bridge lets animation and app state stay in sync. Better than Lottie for components that need to <em>respond</em> rather than play once. Skipped now because authoring requires the Rive editor and a motion designer — revisit if Spectrea hires one.
          </p>
        </div>
      </Section>

      {/* ─── Spectrea Figure System ─── */}
      <Section>
        <div className="border-t border-stone-200 pt-8">
          <p className="text-xs font-mono uppercase tracking-wider text-stone-400">System</p>
          <h2 className="text-xl font-semibold text-stone-800 mt-1" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Spectrea Figure — Bauhaus standing figure</h2>
          <p className="text-sm text-stone-500 mt-2 max-w-2xl">
            One first-party React component. Standing pose only — pose articulation (walking, pointing, sitting) is deliberately out of scope because hand-coded SVG can't deliver it cleanly. Composition multiplies the figure (cohort, crowd, meeting); it doesn't pose it.
          </p>
        </div>

        {/* Single figure — colour variants */}
        <div className="mt-8">
          <p className="text-xs font-mono uppercase tracking-wider text-stone-400">Colour variants</p>
          <div className="mt-3 grid grid-cols-3 sm:grid-cols-6 gap-3">
            {ALL_COLORS.map((color: FigureColor) => (
              <div key={color} className="flex flex-col">
                <div className="rounded-xl flex items-center justify-center p-3" style={{ background: CLOUD, aspectRatio: '3 / 4' }}>
                  <SpectreaFigure color={color} />
                </div>
                <p className="mt-2 text-xs font-mono text-stone-500 text-center">{color}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Compositions that actually work */}
        <div className="mt-8">
          <p className="text-xs font-mono uppercase tracking-wider text-stone-400">Compositions · multi-figure only</p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Tile label="Pair · partnership / interaction" bg={CANVAS}><ScenePair /></Tile>
            <Tile label="Cohort · team of four" bg={CANVAS}><SceneCohort /></Tile>
            <Tile label="Crowd · many small figures" bg={CANVAS}><SceneCrowd /></Tile>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-rose-100 bg-rose-50 p-5">
          <p className="text-xs font-mono uppercase tracking-wider text-rose-600">Honest limits</p>
          <p className="text-sm text-stone-700 mt-2 leading-relaxed">
            Compositions that need viewer interpretation (top-down meeting tables, walking-through-a-park scenes, "one figure standing out" leadership metaphors) don't read cleanly without a caption. They need anatomical pose articulation, perspective cues, or scene depth — none of which hand-coded SVG handles well. For those, use an image generation tool (Gemini, DALL-E, Midjourney) with a Spectrea-branded prompt, or commission an illustrator. Don't try to fake them in SVG.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg bg-stone-50 border border-stone-100 p-4">
            <p className="text-xs font-mono uppercase tracking-wider text-stone-400">API</p>
            <pre className="text-[11px] font-mono text-stone-600 mt-1.5 leading-relaxed">{`<SpectreaFigure
  color="cobalt"
  height={200}
/>`}</pre>
          </div>
          <div className="rounded-lg bg-stone-50 border border-stone-100 p-4">
            <p className="text-xs font-mono uppercase tracking-wider text-stone-400">Where</p>
            <p className="text-sm text-stone-600 mt-1.5">
              <code className="text-[11px] bg-white px-1 py-0.5 rounded">src/components/illustrations/SpectreaFigure.tsx</code>. Add new compositions as scene exports — same file.
            </p>
          </div>
        </div>
      </Section>

      {/* ─── Animation ─── */}
      <Section>
        <div className="border-t border-stone-200 pt-8">
          <p className="text-xs font-mono uppercase tracking-wider text-stone-400">Motion</p>
          <h2 className="text-xl font-semibold text-stone-800 mt-1" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Animation techniques — live demos</h2>
          <p className="text-sm text-stone-500 mt-2 max-w-2xl">
            Interactive side-by-side of Framer Motion (<code className="text-xs bg-cloud px-1 py-0.5 rounded">framer-motion@12</code>, installed), native CSS, and SVG SMIL. Click <em>Replay</em> to re-trigger. Hover tiles to test gestures.
          </p>
        </div>

        <AnimationDemos />
      </Section>

      {/* ─── Stack (final) ─── */}
      <Section>
        <div className="rounded-xl bg-ink text-white p-6 sm:p-8">
          <p className="text-xs font-mono uppercase tracking-wider" style={{ color: AMBER }}>Shipping stack</p>
          <h2 className="text-xl font-semibold mt-1" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Free, open source, no attribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            <div className="border-l-2 pl-3" style={{ borderColor: TEAL }}>
              <p className="text-xs font-mono uppercase tracking-wider" style={{ color: TEAL }}>Tier A · illustration</p>
              <p className="text-sm text-stone-400 mt-1">Procedural inline SVG + <code className="bg-graphite px-1.5 py-0.5 rounded text-xs">SpectreaFigure</code>. Add Humaaans only if you need varied human poses — MIT, no attribution.</p>
            </div>
            <div className="border-l-2 pl-3" style={{ borderColor: COBALT }}>
              <p className="text-xs font-mono uppercase tracking-wider" style={{ color: COBALT }}>Animation</p>
              <p className="text-sm text-stone-400 mt-1"><code className="bg-graphite px-1.5 py-0.5 rounded text-xs">framer-motion</code> — MIT, installed. Wraps inline SVG. Respect prefers-reduced-motion.</p>
            </div>
            <div className="border-l-2 pl-3" style={{ borderColor: AMBER }}>
              <p className="text-xs font-mono uppercase tracking-wider" style={{ color: AMBER }}>Data-viz</p>
              <p className="text-sm text-stone-400 mt-1"><code className="bg-graphite px-1.5 py-0.5 rounded text-xs">visx</code> — MIT, no attribution. Use when dots must come from real data rather than hand-placed.</p>
            </div>
            <div className="border-l-2 pl-3" style={{ borderColor: ROSE }}>
              <p className="text-xs font-mono uppercase tracking-wider" style={{ color: ROSE }}>Tier B · marketing</p>
              <p className="text-sm text-stone-400 mt-1">Generated via AI using <code className="bg-graphite px-1.5 py-0.5 rounded text-xs">docs/illustration-prompt.md</code>. Free + commercial: Gemini, Bing, Firefly, or Stable Diffusion local.</p>
            </div>
          </div>
          <p className="text-xs font-mono text-stone-500 mt-6">Skipped · unDraw · Storyset · Lordicon · Rive · GSAP MorphSVG · Lottie · Recraft free tier</p>
        </div>
      </Section>

      {/* ─── Anti-patterns ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">Anti-patterns</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Tile label="Mascot / character cartoon" bg="#FEF3F2"><AntiCartoon /></Tile>
          <Tile label="Generic stock photography" bg="#FEF3F2"><AntiStock /></Tile>
          <Tile label="Off-palette neon gradients" bg="#FEF3F2"><AntiOffPalette /></Tile>
          <Tile label="Skeuomorphic / photoreal 3D" bg="#FEF3F2"><AntiSkeuomorph /></Tile>
        </div>
        <div className="mt-5 rounded-lg bg-rose-50 border border-rose-100 p-4">
          <ul className="text-sm text-stone-700 space-y-1 list-disc list-inside">
            <li><strong>No mascots.</strong> Spectrea is a mentor, not a pet.</li>
            <li><strong>No stock photography.</strong> Licensed people-photos age badly. For warmth in marketing surfaces, use Tier B illustrated style (generated via the prompt workflow) — not stock.</li>
            <li><strong>No off-palette gradients.</strong> Cobalt → Teal → Amber is the only spectrum, and used only in the hero S.</li>
            <li><strong>No skeuomorphism.</strong> Chrome, glass, bevels belong to Apple's materialist tradition, not to Spectrea.</li>
          </ul>
        </div>
      </Section>
    </PageShell>
  )
}
