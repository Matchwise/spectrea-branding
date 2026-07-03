#!/usr/bin/env node
/**
 * Generate static brand asset SVGs into public/brand-assets/.
 *
 *   - Logo marks (Cool Duet, Ink, White, Full Spectrum) on neutral + dark
 *   - Logo lockups (Gradient, Ink, White)
 *   - Colour swatches (Spectrum, Warm Blend neutrals, Bridge tones)
 *   - Usage ratio bar (60/20/10/10)
 *   - Gradient strips (Brand, Cool Duet, Balanced, Warm, Full+Rose, Lockup)
 *   - Typography samples (Albert Sans, Lexend, JetBrains Mono)
 *
 * The logo paths are cubic Béziers — dot positions are computed numerically
 * here (no DOM required) so the static SVGs match what the React component
 * renders at runtime.
 */

import { writeFile, mkdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import fontkit from '@pdf-lib/fontkit'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const root = resolve(__dirname, '..')
const outDir = resolve(root, 'public', 'brand-assets')
await mkdir(outDir, { recursive: true })

// ─── Load Albert Sans variable font for text-to-path conversion ─────
// Rendering the wordmark as a path (not a <text fill="url(#g)">) works around
// a Chrome --print-to-pdf bug where gradient-filled text renders as a
// solid rectangle instead of glyph outlines.
const albertSansBuf = await readFile(resolve(root, 'scripts', 'fonts', 'AlbertSans.ttf'))
const albertSans600 = fontkit.create(albertSansBuf).getVariation({ wght: 600 })

/**
 * Build an SVG path `d` string that renders the given text at the specified
 * fontSize with its baseline at `baselineY`. Handles kerning via fontkit's
 * layout engine. Returns { d, advanceWidth }.
 */
function textToPath(text, fontSize, baselineY, startX = 0) {
  const run = albertSans600.layout(text)
  const scale = fontSize / albertSans600.unitsPerEm
  let x = startX
  let d = ''
  for (const glyph of run.glyphs) {
    // Scale font units to px, flip Y (font Y up → SVG Y down), place at baseline.
    const gPath = glyph.path.scale(scale, -scale).translate(x, baselineY)
    d += gPath.toSVG() + ' '
    x += glyph.advanceWidth * scale
  }
  return { d: d.trim(), advanceWidth: x - startX }
}

// ─── Brand constants ─────────────────────────────────────────────
// MIRROR of src/data/brand.ts (selectedPalette + logo construction values) —
// kept in sync by hand pending full derivation via the ts-transpile import
// used by scripts/generate-ai-formats.mjs. On any conflict, brand.ts wins.
const COBALT = '#4271DF'
const TEAL   = '#00B6A0'
const AMBER  = '#E19000'
const ROSE   = '#F24260'
const BRIDGE = '#6FB884'

const CANVAS   = '#FDFDFB'
const CLOUD    = '#F4F4F1'
const PEWTER   = '#97979E'
const SLATE    = '#6D6D72'
const IRON     = '#46464B'
const GRAPHITE = '#212226'
const INK      = '#18181C'

const DOT_GREY = '#A3A3A3'

// ─── Logo geometry (mirrors src/components/brand/SpectreaLogo.tsx) ──
const LOGO = {
  segments: [
    [[44, 12], [34, 6],  [20, 6],  [20, 18]],
    [[20, 18], [20, 30], [44, 34], [44, 46]],
    [[44, 46], [44, 58], [30, 58], [20, 52]],
  ],
  pathD: 'M 44 12 C 34 6, 20 6, 20 18 C 20 30, 44 34, 44 46 C 44 58, 30 58, 20 52',
  strokeW: 8,
  dotR: 3.5,
  totalDots: 10,
  tailDots: 2,
}

// Visible extent of the glyph within the original 64×64 coordinate space.
// These are the EXACT values used by the live LogotypeGradient component
// (ML/MT/MW/MH in src/components/brand/SpectreaLogo.tsx) — keeping them
// in sync ensures assets match what the app renders.
const MARK = {
  ML: 11, MT: 3, MW: 40, MH: 58,
  viewBox: { x: 11, y: 3, w: 40, h: 58 },
}

function bezier(t, [p0, p1, p2, p3]) {
  const omt = 1 - t
  return [
    omt ** 3 * p0[0] + 3 * omt ** 2 * t * p1[0] + 3 * omt * t ** 2 * p2[0] + t ** 3 * p3[0],
    omt ** 3 * p0[1] + 3 * omt ** 2 * t * p1[1] + 3 * omt * t ** 2 * p2[1] + t ** 3 * p3[1],
  ]
}

// Sample the full path at fine granularity, accumulate arc length.
const SAMPLES = 2000
const samples = []
let prev = null
let totalLen = 0
for (let s = 0; s < LOGO.segments.length; s++) {
  const iStart = s === 0 ? 0 : 1
  for (let i = iStart; i <= SAMPLES; i++) {
    const t = i / SAMPLES
    const [x, y] = bezier(t, LOGO.segments[s])
    if (prev) totalLen += Math.hypot(x - prev.x, y - prev.y)
    samples.push({ x, y, cumLen: totalLen })
    prev = { x, y }
  }
}

function pointAtLength(targetLen) {
  // Binary search for the first sample with cumLen >= targetLen.
  let lo = 0, hi = samples.length - 1
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (samples[mid].cumLen < targetLen) lo = mid + 1
    else hi = mid
  }
  return { x: samples[lo].x, y: samples[lo].y }
}

// Compute 10 evenly-spaced dot positions by arc length.
const DOTS = []
for (let i = 0; i < LOGO.totalDots; i++) {
  const t = i / (LOGO.totalDots - 1)
  DOTS.push({ ...pointAtLength(t * totalLen), t })
}

// tailDots counts VISUALLY trailing dots — stroke round-cap covers the
// last math-trailing dot, so offset by 1 to align config with what renders.
const firstTrailingIdx = LOGO.totalDots - LOGO.tailDots - 1
const connectedLen = (firstTrailingIdx / (LOGO.totalDots - 1)) * totalLen

// ─── Helpers to build SVG strings ───────────────────────────────
const xml = (s) => s.trim().replace(/\n\s+/g, '\n  ')

function linearGradientDef(id, stops, { x1 = '0', y1 = '0', x2 = '64', y2 = '64', units = 'userSpaceOnUse' } = {}) {
  return `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" gradientUnits="${units}">
    ${stops.map(s => `<stop offset="${s.offset}" stop-color="${s.color}"/>`).join('\n    ')}
  </linearGradient>`
}

// ─── Per-segment stroke rendering (mirrors StaticLogo) ──────────
// Mirrors the 48-segment approach in src/components/brand/SpectreaLogo.tsx.
// The key property: each segment is a solid colour from `colorFn(progress)`,
// so the gradient appears distributed along the VISIBLE stroke (0→1) rather
// than projected across an arbitrary bounding box. This is what makes the
// static mark, the lockup mark, and the React mark all render identically.
const STROKE_SEGMENTS = 48

function rgbLerp(a, b, t) { return Math.round(a + (b - a) * t) }
function coolDuetColorFn(t) {
  return `rgb(${rgbLerp(66, 0, t)},${rgbLerp(113, 182, t)},${rgbLerp(223, 160, t)})`
}
function spectrumColorFn(t) {
  if (t < 0.5) {
    const p = t / 0.5
    return `rgb(${rgbLerp(66, 0, p)},${rgbLerp(113, 182, p)},${rgbLerp(223, 160, p)})`
  }
  const p = (t - 0.5) / 0.5
  return `rgb(${rgbLerp(0, 225, p)},${rgbLerp(182, 144, p)},${rgbLerp(160, 0, p)})`
}

function strokeSegments(colorFn) {
  const strokeLen = connectedLen - LOGO.strokeW / 2 + LOGO.dotR * 0.75
  const out = []
  for (let i = 0; i < STROKE_SEGMENTS; i++) {
    const segStart = (strokeLen * i) / STROKE_SEGMENTS
    const segEnd = (strokeLen * (i + 1)) / STROKE_SEGMENTS
    const progress = (segStart + segEnd) / 2 / strokeLen
    const color = colorFn(progress)
    out.push(
      `<path d="${LOGO.pathD}" fill="none" stroke="${color}" ` +
      `stroke-width="${LOGO.strokeW}" stroke-linecap="round" ` +
      `stroke-dasharray="${(segEnd - segStart + 1.5).toFixed(2)} ${totalLen.toFixed(2)}" ` +
      `stroke-dashoffset="${(-segStart).toFixed(2)}"/>`
    )
  }
  return out.join('\n  ')
}

/**
 * Render a logo mark as a static SVG. Uses a TIGHT viewBox that matches the
 * visible glyph extent (not the original 64×64 construction canvas), so the
 * mark fills its SVG without awkward empty padding.
 *
 * Z-order matches the live React component: dots first, then stroke on top —
 * the stroke visually passes through the dots rather than sitting under them.
 */
function renderMark({ size = 160, strokeFill, strokeColorFn, dotFill, bg = null }) {
  const vb = MARK.viewBox
  const aspect = vb.w / vb.h
  const width = Math.round(size * aspect)
  const height = size
  const bgRect = bg
    ? `<rect x="${vb.x}" y="${vb.y}" width="${vb.w}" height="${vb.h}" fill="${bg}"/>`
    : ''
  const circles = DOTS.map(d =>
    `<circle cx="${d.x.toFixed(2)}" cy="${d.y.toFixed(2)}" r="${LOGO.dotR}" fill="${dotFill}"/>`
  ).join('\n  ')
  // When a per-segment colour function is provided, emit 48 overlapping
  // dasharrayed paths (identical to StaticLogo's runtime rendering). For mono
  // strokes, a single solid-coloured path is enough.
  const strokeMarkup = strokeColorFn
    ? strokeSegments(strokeColorFn)
    : `<path d="${LOGO.pathD}" fill="none" stroke="${strokeFill}" stroke-width="${LOGO.strokeW}" ` +
      `stroke-linecap="round" stroke-dasharray="${(connectedLen - LOGO.strokeW / 2 + LOGO.dotR * 0.75 + 1.5).toFixed(2)} ${totalLen.toFixed(2)}"/>`
  return xml(`
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${vb.x} ${vb.y} ${vb.w} ${vb.h}">
  ${bgRect}
  ${circles}
  ${strokeMarkup}
</svg>
`)
}

// ─── Logo variants ──────────────────────────────────────────────

// Static logo — Cool Duet + grey dots (primary)
await writeFile(resolve(outDir, 'logo-mark-cool.svg'), renderMark({
  size: 200,
  strokeColorFn: coolDuetColorFn,
  dotFill: DOT_GREY,
}))

// Static logo — Ink (mono)
await writeFile(resolve(outDir, 'logo-mark-ink.svg'), renderMark({
  size: 200,
  strokeFill: INK,
  dotFill: INK,
}))

// Static logo — White on Ink (mono)
await writeFile(resolve(outDir, 'logo-mark-white.svg'), renderMark({
  size: 200,
  strokeFill: CANVAS,
  dotFill: CANVAS,
  bg: INK,
}))

// Static logo — full spectrum (animated mark's frame)
await writeFile(resolve(outDir, 'logo-mark-spectrum.svg'), renderMark({
  size: 200,
  strokeColorFn: spectrumColorFn,
  dotFill: DOT_GREY,
}))

// ─── Lockups (mark + pectrea wordmark) ───────────────────────────
/**
 * Build a lockup SVG. Layout mirrors the live LogotypeGradient component
 * exactly (src/components/brand/SpectreaLogo.tsx `useLockupLayout`):
 *   - cap height = fontSize * 0.72
 *   - mark scale = capH / MH (makes mark visible height == cap height)
 *   - gap between mark and wordmark = fontSize * 0.05
 *   - total width = textX + fontkit-measured advance width of "pectrea"
 */
function renderLockup({ strokeFill, strokeColorFn, dotFill, wordmarkFill, bg = null, fontSize = 80 }) {
  const { ML, MT, MW, MH } = MARK
  const capH = fontSize * 0.72
  const s = capH / MH
  const gap = fontSize * 0.05
  const pad = LOGO.strokeW * s * 0.75

  const markW = MW * s
  const textX = markW + gap
  const textY = pad + capH

  // Render "pectrea" as an outline path (see textToPath comment) and use
  // its measured width for the lockup totalW, so the SVG box always fits
  // the glyphs exactly with no clipping or dead space.
  const { d: textD, advanceWidth: textW } = textToPath('pectrea', fontSize, textY, textX)
  const totalW = textX + textW + pad
  // The `p` in "pectrea" drops below the baseline — use the font's actual
  // descent so the viewBox fits the glyph outline exactly.
  const descender = Math.abs(albertSans600.descent) * (fontSize / albertSans600.unitsPerEm)
  const totalH = pad + capH + descender + pad

  const circles = DOTS.map(d =>
    `<circle cx="${d.x.toFixed(2)}" cy="${d.y.toFixed(2)}" r="${LOGO.dotR}" fill="${dotFill}"/>`
  ).join('\n    ')
  const bgRect = bg
    ? `<rect width="${totalW.toFixed(0)}" height="${totalH.toFixed(0)}" fill="${bg}"/>`
    : ''
  // Same per-segment logic as renderMark: gradient strokes emit 48 overlapping
  // dasharrayed paths, mono strokes emit one solid path.
  const strokeMarkup = strokeColorFn
    ? strokeSegments(strokeColorFn)
    : `<path d="${LOGO.pathD}" fill="none" stroke="${strokeFill}" stroke-width="${LOGO.strokeW}" ` +
      `stroke-linecap="round" stroke-dasharray="${(connectedLen - LOGO.strokeW / 2 + LOGO.dotR * 0.75 + 1.5).toFixed(2)} ${totalLen.toFixed(2)}"/>`
  return xml(`
<svg xmlns="http://www.w3.org/2000/svg" width="${totalW.toFixed(0)}" height="${totalH.toFixed(0)}" viewBox="0 0 ${totalW.toFixed(0)} ${totalH.toFixed(0)}">
  ${bgRect}
  <g transform="translate(${(-ML * s).toFixed(2)} ${(-MT * s + pad).toFixed(2)}) scale(${s})">
    ${circles}
    ${strokeMarkup}
  </g>
  <path d="${textD}" fill="${wordmarkFill}"/>
</svg>
`)
}

// Gradient lockup. The mark carries a two-tone Cool Duet (Cobalt → Teal);
// the wordmark is monotone Ink. The wordmark renders as a single <path>
// (not <text>) to avoid the Chrome --print-to-pdf gradient-text bug and
// to keep every lockup SVG glyph-shape consistent regardless of whether
// the fill is solid or gradient.
await writeFile(resolve(outDir, 'logo-lockup-gradient.svg'), renderLockup({
  strokeColorFn: coolDuetColorFn,
  dotFill: DOT_GREY,
  wordmarkFill: INK,
}))

// Mono ink lockup
await writeFile(resolve(outDir, 'logo-lockup-ink.svg'), renderLockup({
  strokeFill: INK,
  dotFill: INK,
  wordmarkFill: INK,
}))

// Mono white lockup on dark background
await writeFile(resolve(outDir, 'logo-lockup-white.svg'), renderLockup({
  strokeFill: CANVAS,
  dotFill: CANVAS,
  wordmarkFill: CANVAS,
  bg: INK,
}))

// Full spectrum style — Cool Duet mark + white wordmark, transparent background.
// Same mark as logo-lockup-gradient.svg; white wordmark for dark/photo surfaces.
await writeFile(resolve(outDir, 'logo-lockup-spectrum-white.svg'), renderLockup({
  strokeColorFn: coolDuetColorFn,
  dotFill: DOT_GREY,
  wordmarkFill: CANVAS,
}))

// ─── Colour swatches ────────────────────────────────────────────

// A swatch: color block on top, Canvas label strip below with Ink text.
function swatch(color, name, hex, { w = 140, h = 110 } = {}) {
  const sep = h - 32
  return `
    <g>
      <rect width="${w}" height="${sep}" fill="${color}" stroke="${CLOUD}" stroke-width="0.5"/>
      <rect y="${sep}" width="${w}" height="32" fill="${CANVAS}" stroke="${CLOUD}" stroke-width="0.5"/>
      <text x="10" y="${sep + 14}" font-size="11" font-weight="600" fill="${INK}" font-family="Lexend, sans-serif">${name}</text>
      <text x="10" y="${sep + 26}" font-size="9" fill="${PEWTER}" font-family="JetBrains Mono, monospace">${hex}</text>
    </g>
  `
}

function renderSwatchRow(swatches, { rowLabel, w = 140 }) {
  const gap = 8
  const totalW = swatches.length * (w + gap) - gap
  const height = 110 + 36
  const inner = swatches.map((s, i) =>
    `<g transform="translate(${i * (w + gap)} 36)">${swatch(s.color, s.name, s.hex, { w })}</g>`
  ).join('\n  ')
  return xml(`
<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${height}" viewBox="0 0 ${totalW} ${height}">
  <text x="0" y="18" font-size="11" font-weight="600" fill="${PEWTER}" font-family="Lexend, sans-serif" letter-spacing="0.05em">${rowLabel}</text>
  ${inner}
</svg>
`)
}

await writeFile(resolve(outDir, 'swatches-spectrum.svg'), renderSwatchRow([
  { color: COBALT, name: 'Cobalt', hex: '#4271DF' },
  { color: TEAL,   name: 'Teal',   hex: '#00B6A0' },
  { color: AMBER,  name: 'Amber',  hex: '#E19000' },
  { color: ROSE,   name: 'Rose',   hex: '#F24260' },
], { rowLabel: 'SPECTRUM ACCENTS' }))

await writeFile(resolve(outDir, 'swatches-neutrals.svg'), renderSwatchRow([
  { color: CANVAS,   name: 'Canvas',   hex: '#FDFDFB' },
  { color: CLOUD,    name: 'Cloud',    hex: '#F4F4F1' },
  { color: PEWTER,   name: 'Pewter',   hex: '#97979E' },
  { color: SLATE,    name: 'Slate',    hex: '#6D6D72' },
  { color: IRON,     name: 'Iron',     hex: '#46464B' },
  { color: GRAPHITE, name: 'Graphite', hex: '#212226' },
  { color: INK,      name: 'Ink',      hex: '#18181C' },
], { rowLabel: 'WARM BLEND NEUTRALS (OKLCH-EVEN LADDER)' }))

await writeFile(resolve(outDir, 'swatches-bridge.svg'), renderSwatchRow([
  { color: '#EDF0F8', name: 'Cobalt Wash', hex: '#EDF0F8' },
  { color: '#E6F5F3', name: 'Teal Mist',   hex: '#E6F5F3' },
  { color: '#F5F0E6', name: 'Amber Stone', hex: '#F5F0E6' },
  { color: '#FDF0F2', name: 'Rose Blush',  hex: '#FDF0F2' },
], { rowLabel: 'BRIDGE TIER (TINTED WASHES)' }))

// ─── Usage ratio bar (60 / 20 / 10 / 10) ────────────────────────
// Labels sit directly below each section. To avoid overlap at the tight
// 10% + 10% end, the two right labels stack on two lines each.
await writeFile(resolve(outDir, 'ratio-bar.svg'), xml(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="84" viewBox="0 0 600 84" font-family="Lexend, sans-serif">
  <g>
    <rect width="360" height="40" fill="${CANVAS}" stroke="${CLOUD}"/>
    <rect x="360" width="120" height="40" fill="${CLOUD}"/>
    <rect x="480" width="60" height="40" fill="${INK}"/>
    <rect x="540" width="15" height="40" fill="${COBALT}"/>
    <rect x="555" width="15" height="40" fill="${TEAL}"/>
    <rect x="570" width="15" height="40" fill="${AMBER}"/>
    <rect x="585" width="15" height="40" fill="${ROSE}"/>
  </g>
  <text x="0"   y="58" font-size="10" font-weight="600" fill="${INK}">60%</text>
  <text x="0"   y="72" font-size="10" fill="${PEWTER}">Canvas</text>
  <text x="360" y="58" font-size="10" font-weight="600" fill="${INK}">20%</text>
  <text x="360" y="72" font-size="10" fill="${PEWTER}">Cloud</text>
  <text x="480" y="58" font-size="10" font-weight="600" fill="${INK}">10%</text>
  <text x="480" y="72" font-size="10" fill="${PEWTER}">Text</text>
  <text x="540" y="58" font-size="10" font-weight="600" fill="${INK}">10%</text>
  <text x="540" y="72" font-size="10" fill="${PEWTER}">Spectrum</text>
</svg>
`))

// ─── Gradient strips ────────────────────────────────────────────

function gradientStrip({ id, stops, label, sublabel, w = 600, h = 80 }) {
  const stopsSvg = stops.map(s => `<stop offset="${s.offset}" stop-color="${s.color}"/>`).join('\n    ')
  return xml(`
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h + 40}" viewBox="0 0 ${w} ${h + 40}" font-family="Lexend, sans-serif">
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="${w}" y2="0" gradientUnits="userSpaceOnUse">
    ${stopsSvg}
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${id})" rx="4"/>
  <text x="0" y="${h + 16}" font-size="11" font-weight="600" fill="${INK}">${label}</text>
  <text x="0" y="${h + 32}" font-size="10" fill="${PEWTER}" font-family="JetBrains Mono, monospace">${sublabel}</text>
</svg>
`)
}

await writeFile(resolve(outDir, 'gradient-brand.svg'), gradientStrip({
  id: 'g-brand',
  stops: [
    { offset: '0%',   color: COBALT },
    { offset: '50%',  color: TEAL },
    { offset: '100%', color: AMBER },
  ],
  label: 'Brand gradient',
  sublabel: 'linear-gradient(135deg in oklch, #4271DF, #00B6A0, #E19000) — sRGB fallback',
}))

await writeFile(resolve(outDir, 'gradient-cool-duet.svg'), gradientStrip({
  id: 'g-cool',
  stops: [
    { offset: '0%',   color: COBALT },
    { offset: '100%', color: TEAL },
  ],
  label: 'Cool Duet — intelligence + growth',
  sublabel: '#4271DF → #00B6A0',
}))

await writeFile(resolve(outDir, 'gradient-balanced-duet.svg'), gradientStrip({
  id: 'g-bal',
  stops: [
    { offset: '0%',   color: TEAL },
    { offset: '65%',  color: BRIDGE },
    { offset: '100%', color: AMBER },
  ],
  label: 'Balanced Duet — must include #6FB884 bridge',
  sublabel: '#00B6A0 → #6FB884 (65%) → #E19000',
}))

await writeFile(resolve(outDir, 'gradient-warm-duet.svg'), gradientStrip({
  id: 'g-warm',
  stops: [
    { offset: '0%',   color: AMBER },
    { offset: '100%', color: ROSE },
  ],
  label: 'Warm Duet — energy + urgency',
  sublabel: '#E19000 → #F24260',
}))

await writeFile(resolve(outDir, 'gradient-full-rose.svg'), gradientStrip({
  id: 'g-full',
  stops: [
    { offset: '0%',   color: COBALT },
    { offset: '33%',  color: TEAL },
    { offset: '66%',  color: AMBER },
    { offset: '100%', color: ROSE },
  ],
  label: 'Full spectrum with Rose — marketing only, use sparingly',
  sublabel: '#4271DF → #00B6A0 → #E19000 → #F24260',
}))

await writeFile(resolve(outDir, 'gradient-lockup.svg'), gradientStrip({
  id: 'g-lock',
  stops: [
    { offset: '0%',   color: COBALT },
    { offset: '100%', color: TEAL },
  ],
  label: 'Lockup mark gradient — LogotypeGradient only, Cool Duet',
  sublabel: '0% #4271DF → 100% #00B6A0 (wordmark stays monotone Ink / White)',
}))

// ─── Typography samples ─────────────────────────────────────────
// The `<style>` block embeds a Google Fonts @import so the SVG renders
// with the correct typefaces when viewed standalone (GitHub, VSCode,
// direct browser open). In the PDF pipeline the fonts are also loaded
// via a <link> in the HTML wrapper.
const FONT_IMPORT = `<defs><style type="text/css"><![CDATA[
  @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@600;700&family=Lexend:wght@400;500&family=JetBrains+Mono:wght@400&display=swap');
]]></style></defs>`

await writeFile(resolve(outDir, 'type-samples.svg'), xml(`
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="260" viewBox="0 0 640 260">
  ${FONT_IMPORT}
  <text x="0" y="30" font-family="'Albert Sans', sans-serif" font-weight="700" font-size="32" fill="${INK}" letter-spacing="-0.01em">We connect the dots.</text>
  <text x="0" y="52" font-family="'Lexend', sans-serif" font-size="11" font-weight="500" fill="${PEWTER}" letter-spacing="0.05em">ALBERT SANS BOLD 700 · 32px · Display / Hero</text>

  <text x="0" y="100" font-family="'Albert Sans', sans-serif" font-weight="600" font-size="22" fill="${INK}">Composable intelligence platform.</text>
  <text x="0" y="122" font-family="'Lexend', sans-serif" font-size="11" font-weight="500" fill="${PEWTER}" letter-spacing="0.05em">ALBERT SANS SEMIBOLD 600 · 22px · H2 / Section heading</text>

  <text x="0" y="168" font-family="'Lexend', sans-serif" font-size="16" fill="${INK}">Every document you upload enriches your knowledge graph.</text>
  <text x="0" y="190" font-family="'Lexend', sans-serif" font-size="11" font-weight="500" fill="${PEWTER}" letter-spacing="0.05em">LEXEND REGULAR 400 · 16px · Body</text>

  <text x="0" y="234" font-family="'JetBrains Mono', monospace" font-size="13" fill="${COBALT}">entity.type: "Financial Model" | confidence: 0.94</text>
  <text x="0" y="250" font-family="'Lexend', sans-serif" font-size="11" font-weight="500" fill="${PEWTER}" letter-spacing="0.05em">JETBRAINS MONO REGULAR 400 · 13px · Code / Metadata</text>
</svg>
`))

// ─── Type scale ladder ──────────────────────────────────────────

await writeFile(resolve(outDir, 'type-scale.svg'), xml(`
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="440" viewBox="0 0 640 440">
  ${FONT_IMPORT}
  <text x="0" y="50"  font-family="'Albert Sans', sans-serif" font-weight="600" font-size="48" fill="${INK}">Display</text>
  <text x="320" y="50" font-family="'JetBrains Mono', monospace" font-size="12" fill="${PEWTER}">48px · line 1.1</text>

  <text x="0" y="98"  font-family="'Albert Sans', sans-serif" font-weight="600" font-size="36" fill="${INK}">Heading 1</text>
  <text x="320" y="98" font-family="'JetBrains Mono', monospace" font-size="12" fill="${PEWTER}">36px · line 1.2</text>

  <text x="0" y="138" font-family="'Albert Sans', sans-serif" font-weight="600" font-size="30" fill="${INK}">Heading 2</text>
  <text x="320" y="138" font-family="'JetBrains Mono', monospace" font-size="12" fill="${PEWTER}">30px · line 1.25</text>

  <text x="0" y="172" font-family="'Albert Sans', sans-serif" font-weight="600" font-size="24" fill="${INK}">Heading 3</text>
  <text x="320" y="172" font-family="'JetBrains Mono', monospace" font-size="12" fill="${PEWTER}">24px · line 1.3</text>

  <text x="0" y="202" font-family="'Albert Sans', sans-serif" font-weight="600" font-size="20" fill="${INK}">Heading 4</text>
  <text x="320" y="202" font-family="'JetBrains Mono', monospace" font-size="12" fill="${PEWTER}">20px · line 1.4</text>

  <text x="0" y="230" font-family="'Albert Sans', sans-serif" font-weight="600" font-size="18" fill="${INK}">Heading 5</text>
  <text x="320" y="230" font-family="'JetBrains Mono', monospace" font-size="12" fill="${PEWTER}">18px · line 1.4</text>

  <text x="0" y="258" font-family="'Lexend', sans-serif" font-size="18" fill="${INK}">Body Large — leading paragraphs</text>
  <text x="320" y="258" font-family="'JetBrains Mono', monospace" font-size="12" fill="${PEWTER}">18px · line 1.6</text>

  <text x="0" y="286" font-family="'Lexend', sans-serif" font-size="16" fill="${INK}">Body — default paragraphs</text>
  <text x="320" y="286" font-family="'JetBrains Mono', monospace" font-size="12" fill="${PEWTER}">16px · line 1.6</text>

  <text x="0" y="312" font-family="'Lexend', sans-serif" font-size="14" fill="${INK}">Body SM — secondary text</text>
  <text x="320" y="312" font-family="'JetBrains Mono', monospace" font-size="12" fill="${PEWTER}">14px · line 1.5</text>

  <text x="0" y="336" font-family="'Lexend', sans-serif" font-size="12" font-weight="500" fill="${INK}">Caption — labels, timestamps</text>
  <text x="320" y="336" font-family="'JetBrains Mono', monospace" font-size="12" fill="${PEWTER}">12px · line 1.5</text>

  <text x="0" y="360" font-family="'Lexend', sans-serif" font-size="12" font-weight="600" fill="${INK}" letter-spacing="0.05em">OVERLINE — SECTION LABELS</text>
  <text x="320" y="360" font-family="'JetBrains Mono', monospace" font-size="12" fill="${PEWTER}">12px · 0.05em tracking</text>

  <text x="0" y="390" font-family="'JetBrains Mono', monospace" font-size="14" fill="${INK}">code · data values · 0.94</text>
  <text x="320" y="390" font-family="'JetBrains Mono', monospace" font-size="12" fill="${PEWTER}">14px · mono</text>

  <text x="0" y="414" font-family="'JetBrains Mono', monospace" font-size="12" fill="${INK}">code sm · trace details · technical metadata</text>
  <text x="320" y="414" font-family="'JetBrains Mono', monospace" font-size="12" fill="${PEWTER}">12px · mono</text>
</svg>
`))

console.log('Brand assets written to', outDir)
