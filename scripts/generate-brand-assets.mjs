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
import { readFileSync, writeFileSync, mkdtempSync, rmSync, existsSync, readdirSync, statSync } from 'node:fs'
import { resolve, join, basename, sep } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { tmpdir } from 'node:os'
import { spawnSync } from 'node:child_process'
import ts from 'typescript'
import fontkit from '@pdf-lib/fontkit'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const root = resolve(__dirname, '..')
const outDir = resolve(root, 'public', 'brand-assets')
await mkdir(outDir, { recursive: true })

// ─── Canon import (same in-memory transpile as generate-ai-formats.mjs) ──
// No brand constant is re-declared in this script: palette and logo values
// are read from src/data/brand.ts so the assets cannot drift from canon.
async function importTsModule(tsPath) {
  const source = readFileSync(tsPath, 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
    fileName: basename(tsPath),
  })
  const dir = mkdtempSync(join(tmpdir(), 'spectrea-assets-'))
  const file = join(dir, basename(tsPath).replace(/\.ts$/, '.mjs'))
  writeFileSync(file, outputText)
  try {
    return await import(pathToFileURL(file).href)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}
const canon = await importTsModule(resolve(root, 'src', 'data', 'brand.ts'))

// ─── Load Albert Sans variable font for text-to-path conversion ─────
// Rendering the wordmark as a path (not a <text fill="url(#g)">) works around
// a Chrome --print-to-pdf bug where gradient-filled text renders as a
// solid rectangle instead of glyph outlines.
const albertSansBuf = await readFile(resolve(root, 'scripts', 'fonts', 'AlbertSans.ttf'))
const albertSans600 = fontkit.create(albertSansBuf).getVariation({ wght: canon.logo.lockup.wordmarkWeight })

/**
 * Build an SVG path `d` string that renders the given text at the specified
 * fontSize with its baseline at `baselineY`. Uses fontkit's laid-out advance
 * positions (kerning applied) plus the canonical 0.02em wordmark tracking —
 * matching the SPA component (SpectreaLogo.tsx letterSpacing), which the old
 * raw-advanceWidth version did not (the shipped lockups were 0.144em narrower
 * and unkerned). Returns { d, advanceWidth }.
 */
function textToPath(text, fontSize, baselineY, startX = 0, trackingEm = canon.logo.lockup.trackingEm) {
  const run = albertSans600.layout(text)
  const scale = fontSize / albertSans600.unitsPerEm
  let x = startX
  let d = ''
  for (let i = 0; i < run.glyphs.length; i++) {
    // Scale font units to px, flip Y (font Y up → SVG Y down), place at baseline.
    const gPath = run.glyphs[i].path.scale(scale, -scale).translate(x, baselineY)
    d += gPath.toSVG() + ' '
    x += run.positions[i].xAdvance * scale + trackingEm * fontSize
  }
  return { d: d.trim(), advanceWidth: x - startX }
}

// ─── Brand constants (derived from canon — closes prior residual R10) ──
const paletteHex = (name) => {
  const c = canon.selectedPalette.colors.find(c => c.name === name)
  if (!c) throw new Error(`palette colour missing from canon: ${name}`)
  return c.hex
}
const COBALT = paletteHex('Cobalt')
const TEAL   = paletteHex('Teal')
const AMBER  = paletteHex('Amber')
const ROSE   = paletteHex('Rose')

// Gradient family from canon (brandTokens.gradients, canonized 2026-08-09).
const GRADIENTS = canon.brandTokens.gradients
const gradStopsOf = g => g.stops.map(s => ({ offset: `${Math.round(s.at * 100)}%`, color: s.hex }))
const gradChain = g => g.stops.map(s => s.hex).join(' → ')
const BRIDGE = GRADIENTS.duets.balanced.stops.find(s => s.at === 0.65)?.hex
if (!BRIDGE) throw new Error('Balanced Duet bridge stop (at 0.65) missing from canon')

// src/index.css is the app's ENFORCED mirror of the primary gradient: its
// .brand-gradient / .brand-gradient-h utility classes must carry canon's
// exact css/fallbackCss strings (and their 90deg rotations). Every page
// uses these classes; validating here makes canon-vs-CSS drift a build
// failure instead of a silent stale consumer.
{
  const indexCss = readFileSync(resolve(root, 'src', 'index.css'), 'utf8')
  const rotate = s => s.replace(`${GRADIENTS.angleDeg}deg`, '90deg')
  const required = [
    GRADIENTS.primary.fallbackCss,
    GRADIENTS.primary.css,
    rotate(GRADIENTS.primary.fallbackCss),
    rotate(GRADIENTS.primary.css),
  ]
  const missing = required.filter(s => !indexCss.includes(s))
  if (missing.length) {
    throw new Error(`src/index.css brand-gradient classes drifted from canon (brandTokens.gradients.primary); missing: ${missing.join(' | ')}`)
  }
}

const CANVAS   = paletteHex('Canvas')
const CLOUD    = paletteHex('Cloud')
const PEWTER   = paletteHex('Pewter')
const SLATE    = paletteHex('Slate')
const IRON     = paletteHex('Iron')
const GRAPHITE = paletteHex('Graphite')
const INK      = paletteHex('Ink')

const DOT_GREY = canon.logo.constraints.primaryDotColor

// ─── Logo geometry (K3′, read from canon markGeometry) ──────────
const GEO = canon.logo.markGeometry
const LOGO = {
  segments: GEO.segs,
  pathD:
    `M ${GEO.segs[0][0][0]} ${GEO.segs[0][0][1]} ` +
    GEO.segs.map(sg => `C ${sg[1][0]} ${sg[1][1]}, ${sg[2][0]} ${sg[2][1]}, ${sg[3][0]} ${sg[3][1]}`).join(' '),
  strokeW: canon.logo.constraints.strokeWidth,
  dotR: canon.logo.constraints.dotRadius,
  totalDots: canon.logo.constraints.dotCount,
  tailDots: 2,
}

// Visible ink extent of the mark within the 64×64 construction canvas —
// canon's ink box (path + dots, ±strokeWidth/2). The lockup aligns on ink,
// never element bounding boxes.
const INK_BOX = GEO.inkExtents
const MARK = {
  viewBox: {
    x: INK_BOX.left,
    y: INK_BOX.top,
    w: INK_BOX.right - INK_BOX.left,
    h: INK_BOX.bottom - INK_BOX.top,
  },
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

// ─── Favicon (public/favicon.svg) ───────────────────────────────
// White mono mark on an Ink circle — the canonical contained treatment
// (circle, never a squircle; the standard mark scales down unchanged per
// the ratified small-sizes rule). Derived from canon like every other asset.
{
  const vb = MARK.viewBox
  const fit = 44 / Math.max(vb.w, vb.h) // mark ink fits a 44-unit band inside the 64 circle
  const ox = 32 - (vb.x + vb.w / 2) * fit
  const oy = 32 - (vb.y + vb.h / 2) * fit
  const circles = DOTS.map(d =>
    `<circle cx="${(d.x * fit + ox).toFixed(2)}" cy="${(d.y * fit + oy).toFixed(2)}" r="${(LOGO.dotR * fit).toFixed(2)}" fill="${CANVAS}"/>`
  ).join('\n  ')
  const favicon = xml(`
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="32" fill="${INK}"/>
  ${circles}
  <path d="${LOGO.pathD}" transform="translate(${ox.toFixed(2)} ${oy.toFixed(2)}) scale(${fit.toFixed(4)})" fill="none" stroke="${CANVAS}" stroke-width="${LOGO.strokeW}" stroke-linecap="round" stroke-dasharray="${(connectedLen - LOGO.strokeW / 2 + LOGO.dotR * 0.75 + 1.5).toFixed(2)} ${totalLen.toFixed(2)}"/>
</svg>
`)
  await writeFile(resolve(root, 'public', 'favicon.svg'), favicon)
}

// ─── Lockups (mark + pectrea wordmark) ───────────────────────────
/**
 * Build a lockup SVG under the ratified "B" constants (2026-08-06, canon
 * logo.lockup + logo.markGeometry) — the same math as the live
 * `useLockupLayout` in src/components/brand/SpectreaLogo.tsx:
 *   - mark scale: rendered stroke = 0.113em (the wordmark's stem weight)
 *   - vertical: mark ink bottom at baseline + 0.007em (S baseline overshoot)
 *   - horizontal: wordmark pen at ink-right + 0.0643em (S rsb + tracking;
 *     the p's own lsb completes the ratified 0.131em ink-to-ink gap)
 *   - all alignment on the ink box, never element bounding boxes
 */
function renderLockup({ strokeFill, strokeColorFn, dotFill, wordmarkFill, bg = null, fontSize = 80 }) {
  const F = fontSize
  const s = (canon.logo.lockup.strokeEm * F) / LOGO.strokeW
  const capH = F * 0.72 // frame band (presentation); true capHeight is 0.700em
  const pad = F * 0.0745

  const inkW = INK_BOX.right - INK_BOX.left
  const inkH = INK_BOX.bottom - INK_BOX.top
  const markW = inkW * s
  const textX = markW + F * GEO.placement.penAdvanceEm
  const textY = pad + capH // baseline
  const markOY = textY + F * GEO.placement.inkBottomVsBaselineEm - inkH * s

  // Render "pectrea" as an outline path (see textToPath comment) and use
  // its measured width for the lockup totalW, so the SVG box always fits
  // the glyphs exactly with no clipping or dead space.
  const { d: textD, advanceWidth: textW } = textToPath('pectrea', F, textY, textX)
  const totalW = textX + textW + pad
  // The `p` in "pectrea" drops below the baseline — use the font's actual
  // descent so the viewBox fits the glyph outline exactly.
  const descender = Math.abs(albertSans600.descent) * (F / albertSans600.unitsPerEm)
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
  <g transform="translate(${(-INK_BOX.left * s).toFixed(2)} ${(-INK_BOX.top * s + markOY).toFixed(2)}) scale(${s})">
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

// Gradient lockup, dark-surface rendering (lockup form 1 on dark) — Cool Duet
// mark + white wordmark, transparent background. Same mark as
// logo-lockup-gradient.svg; white wordmark for dark/photo surfaces.
await writeFile(resolve(outDir, 'logo-lockup-gradient-white.svg'), renderLockup({
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

// Swatch rows derive from canon (colorSystem order, palette/wash hexes) —
// decision 30: no label hex is declared here.
const CS = canon.colorSystem
const paletteSwatch = name => ({ color: paletteHex(name), name, hex: paletteHex(name) })

await writeFile(resolve(outDir, 'swatches-spectrum.svg'), renderSwatchRow(
  CS.accents.map(a => paletteSwatch(a.name)),
  { rowLabel: 'SPECTRUM ACCENTS' }))

await writeFile(resolve(outDir, 'swatches-neutrals.svg'), renderSwatchRow(
  CS.neutrals.tokens.map(t => paletteSwatch(t.name)),
  { rowLabel: 'WARM BLEND NEUTRALS (OKLCH-EVEN LADDER)' }))

await writeFile(resolve(outDir, 'swatches-bridge.svg'), renderSwatchRow(
  canon.brandTokens.washes.light.map(w => ({ color: w.hex, name: w.name, hex: w.hex })),
  { rowLabel: 'BRIDGE TIER (TINTED WASHES)' }))

// ─── Usage ratio bar ────────────────────────────────────────────
// Geometry derives from colorSystem.ratio.light percentages (600 px = 100%);
// the spectrum segment splits evenly across the four accents. The short
// section labels are presentational abbreviations of the canon tokens.
{
  const RATIO_W = 600
  const segs = CS.ratio.light.map(r => ({ ...r, w: (r.pct / 100) * RATIO_W }))
  let x = 0
  const xs = segs.map(s => { const at = x; x += s.w; return at })
  const accentHexes = CS.accents.map(a => paletteHex(a.name))
  const sliceW = segs[3].w / accentHexes.length
  const spectrumRects = accentHexes
    .map((hex, i) => `<rect x="${xs[3] + i * sliceW}" width="${sliceW}" height="40" fill="${hex}"/>`)
    .join('\n    ')
  const shortLabels = ['Canvas', 'Cloud', 'Text', 'Spectrum']
  const labels = segs
    .map((s, i) => `<text x="${xs[i]}" y="58" font-size="10" font-weight="600" fill="${INK}">${s.pct}%</text>\n  <text x="${xs[i]}" y="72" font-size="10" fill="${PEWTER}">${shortLabels[i]}</text>`)
    .join('\n  ')
  await writeFile(resolve(outDir, 'ratio-bar.svg'), xml(`
<svg xmlns="http://www.w3.org/2000/svg" width="${RATIO_W}" height="84" viewBox="0 0 ${RATIO_W} 84" font-family="Lexend, sans-serif">
  <g>
    <rect width="${segs[0].w}" height="40" fill="${CANVAS}" stroke="${CLOUD}"/>
    <rect x="${xs[1]}" width="${segs[1].w}" height="40" fill="${CLOUD}"/>
    <rect x="${xs[2]}" width="${segs[2].w}" height="40" fill="${INK}"/>
    ${spectrumRects}
  </g>
  ${labels}
</svg>
`))
}

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
  stops: gradStopsOf(GRADIENTS.primary),
  label: 'Brand gradient',
  sublabel: `${GRADIENTS.primary.css} — sRGB fallback`,
}))

await writeFile(resolve(outDir, 'gradient-cool-duet.svg'), gradientStrip({
  id: 'g-cool',
  stops: gradStopsOf(GRADIENTS.duets.cool),
  label: 'Cool Duet — intelligence + growth',
  sublabel: gradChain(GRADIENTS.duets.cool),
}))

await writeFile(resolve(outDir, 'gradient-balanced-duet.svg'), gradientStrip({
  id: 'g-bal',
  stops: gradStopsOf(GRADIENTS.duets.balanced),
  label: `Balanced Duet — must include ${BRIDGE} bridge`,
  sublabel: GRADIENTS.duets.balanced.stops.map(s => (s.at > 0 && s.at < 1 ? `${s.hex} (${Math.round(s.at * 100)}%)` : s.hex)).join(' → '),
}))

await writeFile(resolve(outDir, 'gradient-warm-duet.svg'), gradientStrip({
  id: 'g-warm',
  stops: gradStopsOf(GRADIENTS.duets.warm),
  label: 'Warm Duet — energy + urgency',
  sublabel: gradChain(GRADIENTS.duets.warm),
}))

await writeFile(resolve(outDir, 'gradient-full-rose.svg'), gradientStrip({
  id: 'g-full',
  stops: gradStopsOf(GRADIENTS.fullSpectrumWithRose),
  label: 'Full spectrum with Rose — marketing only, use sparingly',
  sublabel: gradChain(GRADIENTS.fullSpectrumWithRose),
}))

await writeFile(resolve(outDir, 'gradient-lockup.svg'), gradientStrip({
  id: 'g-lock',
  stops: gradStopsOf(GRADIENTS.duets.cool),
  label: 'Lockup mark gradient — LogotypeGradient only, Cool Duet',
  sublabel: `${GRADIENTS.duets.cool.stops.map(s => `${Math.round(s.at * 100)}% ${s.hex}`).join(' → ')} (wordmark stays monotone Ink / White)`,
}))

// ─── Typography samples ─────────────────────────────────────────
// The `<style>` block EMBEDS the three brand fonts as data-URI woff2
// subsets (printable ASCII + the specimens' punctuation: · – — ‘ ’ “ ”),
// so the specimens render with the real typefaces EVERYWHERE — including
// `<img>` contexts, which block external loads. The previous Google Fonts
// @import never worked in any <img> consumer (specimens silently rendered
// in fallback fonts precisely where typeface fidelity was the point), and
// when the PDF pipeline inlined the SVGs the import joined the document
// stylesheet and evicted non-latin glyphs from the brand families (D42/D43).
// The PDF inliner strips this whole <style> block — inside the PDF document
// the same faces are already declared, so the embed is redundant there.
//
// The subset files were fetched once from Google Fonts (variable weight
// ranges) and glyph-coverage-verified; refetch + reverify if the specimen
// text ever needs glyphs outside ASCII + the punctuation above. Never trust
// a `text=` subset's declared unicode-range — Google echoes the request
// while silently omitting glyphs the font lacks (D42).
const specimenFace = (family, weight, file) => {
  const b64 = readFileSync(resolve(root, 'scripts', 'fonts', file)).toString('base64')
  return `@font-face { font-family: '${family}'; font-style: normal; font-weight: ${weight}; src: url(data:font/woff2;base64,${b64}) format('woff2'); }`
}
const FONT_IMPORT = `<defs><style type="text/css"><![CDATA[
  ${specimenFace('Albert Sans', '100 900', 'specimen-albertsans.woff2')}
  ${specimenFace('Lexend', '100 900', 'specimen-lexend.woff2')}
  ${specimenFace('JetBrains Mono', '100 800', 'specimen-jetbrainsmono.woff2')}
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

// ─── PNG logo exports (D43) ─────────────────────────────────────
// Rasterised at 1x/2x/4x from the SVGs just written, via the same headless
// Chrome the PDF pipeline uses. The screenshot background is transparent,
// so each PNG inherits exactly what its SVG draws: the Gradient/White
// lockup and the colour/Ink variants are transparent-backed, while the
// plain White mark and White lockup SVGs carry their own Ink plates (the
// PNGs keep them — the manifest descriptions say so).
function findChrome() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH
  if (process.platform === 'win32') {
    const winCandidates = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    ]
    for (const c of winCandidates) if (existsSync(c)) return c
    throw new Error('No Chrome/Edge binary found (set CHROME_PATH to a browser executable).')
  }
  const candidates = ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']
  for (const c of candidates) {
    const r = spawnSync('which', [c], { encoding: 'utf8' })
    if (r.status === 0) return r.stdout.trim()
  }
  throw new Error('No Chrome/Chromium binary found on PATH.')
}
const RASTER_ASSETS = [
  'logo-mark-cool.svg', 'logo-mark-ink.svg', 'logo-mark-white.svg', 'logo-mark-spectrum.svg',
  'logo-lockup-gradient.svg', 'logo-lockup-gradient-white.svg', 'logo-lockup-ink.svg', 'logo-lockup-white.svg',
]
const chrome = findChrome()
const pngsFor = {}
for (const svgFile of RASTER_ASSETS) {
  const svgPath = resolve(outDir, svgFile)
  const svg = readFileSync(svgPath, 'utf8')
  const w = Number(svg.match(/<svg[^>]*\swidth="(\d+)"/)?.[1])
  const h = Number(svg.match(/<svg[^>]*\sheight="(\d+)"/)?.[1])
  if (!w || !h) throw new Error(`Cannot read width/height from ${svgFile}`)
  pngsFor[svgFile] = []
  for (const scale of [1, 2, 4]) {
    const out = svgFile.replace(/\.svg$/, scale === 1 ? '.png' : `@${scale}x.png`)
    const r = spawnSync(chrome, [
      '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
      `--window-size=${w},${h}`, `--force-device-scale-factor=${scale}`,
      '--default-background-color=00000000',
      `--screenshot=${resolve(outDir, out)}`,
      'file://' + svgPath,
    ], { encoding: 'utf8' })
    if (r.status !== 0 || !existsSync(resolve(outDir, out))) {
      throw new Error(`PNG export failed for ${svgFile} @${scale}x (Chrome status ${r.status})`)
    }
    pngsFor[svgFile].push(out)
  }
}
console.log(`PNG exports written (${RASTER_ASSETS.length} assets × 3 scales)`)

// ─── Design token files (D43) ───────────────────────────────────
// Downloadable, GENERATED mirrors of canon. The Downloads page fetches
// spectrea-tokens.css to DISPLAY it, so the shown CSS and the downloaded
// file are one artifact and cannot drift from brand.ts (the page previously
// hand-mirrored this block). No value below is declared here — everything
// is read from canon.
const publicDir = resolve(root, 'public')
const T = canon.brandTokens
const pal = canon.selectedPalette
const typo = canon.brand.typography
const grad = pal.gradient
const versionLine = `GENERATED from src/data/brand.ts v${canon.meta.version} (${canon.meta.lastUpdated}) — do not hand-edit; regenerate with npm run generate:assets`

// Palette entries derived from canon ROLES, not name or role lists — the
// accent/neutral split is the only structure declared here, so adding or
// renaming ANY canonical palette entry propagates automatically (no fixed
// role ladder to fall out of date, no find() to hide a duplicate role).
// The first accent in canon order is the brand colour.
const ACCENTS = pal.colors.filter(c => c.role === 'accent')
const NEUTRALS = pal.colors.filter(c => c.role !== 'accent')
if (!ACCENTS.length || !NEUTRALS.length) throw new Error('Palette derivation produced an empty accent or neutral set')
const accentVar = (name) => name.split(' ')[0].toLowerCase()
// Canon strings render verbatim in comments — no case-folding (round-1 critic
// finding: §14 inlines this file into the guide, so folded labels would be a
// paraphrase of canon).
const gradStops = [grad.from, grad.via, grad.to].filter(Boolean).join(', ')
// Button state groups: any entry with a base fill is an accent ladder;
// entries keyed bg/text are the secondary treatment.
const btnGroupVars = (states, prefix) => Object.entries(states)
  .filter(([, v]) => typeof v === 'object')
  .map(([k, v]) => {
    const vars = Object.entries(v).map(([sk, sv]) =>
      `--btn-${prefix}${k}${sk === 'base' ? '' : `-${sk}`}: ${sv};`)
    return '  ' + vars.join('  ')
  })
  .join('\n')

const tokensCss = `/* Spectrea design tokens — ${versionLine}. */
:root {
  /* Spectrum — first accent in canon order is the brand colour */
  --color-brand: ${ACCENTS[0].hex};
${ACCENTS.slice(1).map(a => `  --color-brand-${a.name.toLowerCase()}: ${a.hex};`).join('\n')}

  /* Warm Blend neutrals — every non-accent palette entry, canon order */
${NEUTRALS.map(n => `  --color-${n.name.toLowerCase()}: ${n.hex};`).join('\n')}

  /* Bridge washes (light) — text on a wash uses its textOn value, never the raw accent */
${T.washes.light.map(w => `  --wash-${accentVar(w.accent)}: ${w.hex};  --wash-${accentVar(w.accent)}-text: ${w.textOn};`).join('\n')}

  /* Dark surfaces (parallel mode — role-inverted; names + roles from colorSystem.darkRoles) */
${CS.darkRoles.rows.map(r => `  ${r.cssVar}: ${pal.darkMode[r.darkModeKey]};   /* ${r.dark} — ${r.role} on dark */`).join('\n')}

  /* Dark bridge washes */
${T.washes.dark.map(w => `  --dark-wash-${accentVar(w.accent)}: ${w.hex};`).join('\n')}

  /* Accent dark-lifts (long-form coloured text on dark only) */
${T.lifts.map(l => `  --${accentVar(l.name)}-lift: ${l.hex};`).join('\n')}

  /* Accent text tones (coloured text on LIGHT surfaces — raw accents fail the 4.5:1 text floor) */
${T.accentText.map(a => `  --${accentVar(a.name)}-text: ${a.hex};`).join('\n')}

  /* Button states — light surfaces */
${btnGroupVars(T.buttonStates.light, '')}

  /* Button states — dark surfaces (transient fills lighten; their label flips to the transient text colour) */
${btnGroupVars(T.buttonStates.dark, 'dark-')}
  --btn-dark-transient-text: ${T.buttonStates.dark.transientText};

  /* Focus ring — ${T.focusRing.note.split('.')[0]} */
  --focus-ring-light: ${T.focusRing.light};
  --focus-ring-dark: ${T.focusRing.dark};
  --focus-ring-width: ${T.focusRing.width.split(' ')[0]};
  --focus-ring-offset: ${T.focusRing.offset};

  /* Typography */
  --font-heading: ${typo.heading.css};
  --font-body:    ${typo.body.css};
  --font-mono:    ${typo.mono.css};

  /* Type scale — size, line-height, and weight per step */
${typo.scale.map(s => {
  const n = s.name.toLowerCase().replace(/ /g, '-')
  return `  --text-${n}: ${s.px}px;  --text-${n}-lh: ${s.lineHeight};  --text-${n}-weight: ${s.weight};  /* ${s.use} */`
}).join('\n')}

  /* Radii */
${T.radii.map(r => `  --radius-${r.token}: ${r.px}px;  /* ${r.use} */`).join('\n')}

  /* Spacing — ${T.spacing.baseUnit} px base unit */
${T.spacing.scale.map(s => `  --space-${s.token}: ${s.px}px;  /* ${s.tailwind} — ${s.use} */`).join('\n')}
}

/* Elevation — z-index steps; shadows are Tailwind classes.
${T.elevation.map(e => `   ${e.level} ${e.zIndex} (${e.shadow})`).join(' ·\n')} */

/* Brand gradient — OKLCH with sRGB fallback for cross-browser safety. */
.brand-gradient {
  background: linear-gradient(${grad.angle}deg, ${gradStops});
}
@supports (background: linear-gradient(in oklch, red, blue)) {
  .brand-gradient {
    background: linear-gradient(${grad.angle}deg in oklch, ${gradStops});
  }
}
`
await writeFile(resolve(publicDir, 'spectrea-tokens.css'), tokensCss)

const fontList = (t) => JSON.stringify([t.family, ...t.fallback.split(',').map(s => s.trim().replace(/^'|'$/g, ''))])
const tailwindSnippet = `/**
 * Spectrea brand — Tailwind theme extension.
 * ${versionLine}.
 * Merge into your tailwind.config.js theme.extend.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '${ACCENTS[0].hex}',
${ACCENTS.slice(1).map(a => `          ${a.name.toLowerCase()}: '${a.hex}',`).join('\n')}
        },
${NEUTRALS.map(n => `        ${n.name.toLowerCase()}: '${n.hex}',`).join('\n')}
        wash: {
${T.washes.light.map(w => `          ${accentVar(w.accent)}: '${w.hex}',`).join('\n')}
        },
        'wash-dark': {
${T.washes.dark.map(w => `          ${accentVar(w.accent)}: '${w.hex}',`).join('\n')}
        },
        lift: {
${T.lifts.map(l => `          ${accentVar(l.name)}: '${l.hex}',`).join('\n')}
        },
        'accent-text': {
${T.accentText.map(a => `          ${accentVar(a.name)}: '${a.hex}',`).join('\n')}
        },
      },
      fontFamily: {
        heading: ${fontList(typo.heading)},
        body: ${fontList(typo.body)},
        mono: ${fontList(typo.mono)},
      },
    },
  },
}
`
await writeFile(resolve(publicDir, 'spectrea-tailwind.config.js'), tailwindSnippet)
console.log('Token files written: spectrea-tokens.css, spectrea-tailwind.config.js')

// ─── Asset manifest (D43) ───────────────────────────────────────
// The Downloads page renders its asset listing FROM this manifest, so the
// page cannot drift from what the generator actually ships (0/20 finding).
// Descriptions name treatments and uses, never canon values.
const item = (file, label, desc) => ({
  path: `/brand-assets/${file}`,
  label,
  desc,
  ...(pngsFor[file] ? { pngs: pngsFor[file].map(p => `/brand-assets/${p}`) } : {}),
})
const manifest = {
  '//': `Asset manifest — ${versionLine}`,
  version: canon.meta.version,
  groups: [
    {
      title: 'Logo marks',
      items: [
        item('logo-mark-cool.svg', 'Mark — Cool Duet', 'Primary mark: gradient-stroked spine over the grey dot field. Default on light surfaces.'),
        item('logo-mark-spectrum.svg', 'Mark — Full Spectrum', 'Full-spectrum stroke variant. Marketing moments only.'),
        item('logo-mark-ink.svg', 'Mark — Ink', 'Monotone Ink mark for single-colour contexts.'),
        item('logo-mark-white.svg', 'Mark — White', 'White mark on its Ink plate for dark-surface use (the plate ships in the SVG and its PNGs).'),
      ],
    },
    {
      title: 'Logo lockups',
      items: [
        item('logo-lockup-gradient.svg', 'Lockup — Gradient', 'Mark + wordmark, gradient mark with Ink wordmark. Default lockup on light surfaces.'),
        item('logo-lockup-gradient-white.svg', 'Lockup — Gradient / White', 'Gradient mark with White wordmark for dark surfaces (white-on-transparent).'),
        item('logo-lockup-ink.svg', 'Lockup — Ink', 'Monotone Ink lockup for single-colour contexts.'),
        item('logo-lockup-white.svg', 'Lockup — White', 'Monotone White lockup on its Ink plate (the plate ships in the SVG and its PNGs).'),
      ],
    },
    {
      title: 'Colour swatches',
      items: [
        item('swatches-spectrum.svg', 'Spectrum accents', 'The four accent swatches with names and values.'),
        item('swatches-neutrals.svg', 'Warm Blend neutrals', 'The seven-token neutral ladder with names and values.'),
        item('swatches-bridge.svg', 'Bridge washes', 'The four tinted wash swatches with names and values.'),
      ],
    },
    {
      title: 'Gradient strips',
      items: [
        item('gradient-brand.svg', 'Brand gradient', 'The three-stop brand gradient with its CSS recipe.'),
        item('gradient-cool-duet.svg', 'Cool Duet', 'Cobalt-to-Teal duet strip.'),
        item('gradient-balanced-duet.svg', 'Balanced Duet', 'Teal-to-Amber strip through the green midpoint.'),
        item('gradient-warm-duet.svg', 'Warm Duet', 'Amber-to-Rose duet strip.'),
        item('gradient-full-rose.svg', 'Full spectrum + Rose', 'Four-stop marketing gradient. Use sparingly.'),
        item('gradient-lockup.svg', 'Lockup gradient', 'The gradient the lockup mark carries.'),
      ],
    },
    {
      title: 'Typography specimens',
      items: [
        item('type-samples.svg', 'Type samples', 'The three typefaces in their roles, with embedded fonts — renders correctly everywhere.'),
        item('type-scale.svg', 'Type scale ladder', 'Display through code sizes, with embedded fonts.'),
      ],
    },
    {
      title: 'Usage',
      items: [
        item('ratio-bar.svg', 'Colour usage ratio', 'The neutral-to-accent usage ratio bar.'),
      ],
    },
    {
      title: 'Design tokens',
      items: [
        { path: '/spectrea-tokens.css', label: 'CSS custom properties', desc: 'Colour, wash, button-state, focus-ring, font-stack, type-scale (size / line-height / weight), radius, and spacing tokens as CSS variables. Generated from canon.' },
        { path: '/spectrea-tailwind.config.js', label: 'Tailwind theme extension', desc: 'Brand colours and font stacks as a theme.extend block. Generated from canon.' },
      ],
    },
  ],
}
await writeFile(
  resolve(root, 'src', 'data', 'brand-assets-manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n'
)
console.log('Asset manifest written: src/data/brand-assets-manifest.json')

// Validate the manifest both ways: every advertised path must exist under
// public/, and every file the generator shipped into public/brand-assets/
// must be advertised. Either miss fails the build — the "cannot drift"
// guarantee above is enforced, not asserted.
const advertised = new Set()
for (const group of manifest.groups) {
  for (const entry of group.items) {
    advertised.add(entry.path)
    for (const p of entry.pngs ?? []) advertised.add(p)
  }
}
const escaped = []
const missing = []
for (const p of advertised) {
  const abs = resolve(publicDir, p.slice(1))
  // Containment first: a traversal path like /../x can resolve to a real file
  // OUTSIDE public/ that will not ship — existence alone would pass it.
  if (!abs.startsWith(publicDir + sep)) { escaped.push(p); continue }
  if (!existsSync(abs) || !statSync(abs).isFile()) missing.push(p)
}
if (escaped.length) {
  throw new Error(`Manifest advertises paths that resolve outside public/: ${escaped.join(', ')}`)
}
if (missing.length) {
  throw new Error(`Manifest advertises paths that are not real files under public/: ${missing.join(', ')}`)
}
const unlisted = readdirSync(outDir).filter(f => !advertised.has(`/brand-assets/${f}`))
if (unlisted.length) {
  throw new Error(`Files in public/brand-assets/ not advertised in the manifest: ${unlisted.join(', ')}`)
}
console.log(`Manifest validated: ${advertised.size} advertised paths all exist; no unlisted files in brand-assets/`)

console.log('Brand assets written to', outDir)
