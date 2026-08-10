#!/usr/bin/env node
// ============================================================
// Spectrea hybrid guide generator (decision 2, ratified 2026-08-06)
//
// public/brand-guide.md is HYBRID: prose is hand-written; data-bearing
// sections (weights, sizes, hexes, ratios, clearspace) are generator-owned.
// Each generated region is fenced with markers:
//
//   <!-- generated:BLOCK-ID -->
//   ...content owned by this script...
//   <!-- /generated:BLOCK-ID -->
//
// This script rewrites ONLY the fenced regions from src/data/brand.ts (the
// canon, imported live via in-memory TypeScript transpile — no value is
// re-declared here). Everything outside the fences is left byte-untouched.
// A hand edit inside a fence is overwritten on the next run — that is the
// point: edit brand.ts, then `npm run generate:guide`.
//
// Run order matters: generate:guide must run BEFORE generate:pdf, because
// the PDF renders from brand-guide.md.
// ============================================================

import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { join, dirname, basename, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { tmpdir } from 'node:os'
import ts from 'typescript'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const guidePath = join(root, 'public', 'brand-guide.md')

/** Transpile a dependency-free .ts data module in-memory and import it. */
async function importTsModule(tsPath) {
  const source = readFileSync(tsPath, 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
    fileName: basename(tsPath),
  })
  const dir = mkdtempSync(join(tmpdir(), 'spectrea-guide-'))
  const file = join(dir, basename(tsPath).replace(/\.ts$/, '.mjs'))
  writeFileSync(file, outputText)
  try {
    return await import(pathToFileURL(file).href)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

const canon = await importTsModule(join(root, 'src', 'data', 'brand.ts'))
const { meta, brand, voice, brandTokens, accessibility, logo, selectedPalette, colorSystem, components, graphViz } = canon

// Tailwind stone constants (the sanctioned border family per
// colorSystem.tailwindMapping) — Tailwind values, not canon.
const TW_STONE = { 'stone-200': '#E7E5E4', 'stone-300': '#D6D3D1' }

/** Canonical hex for a named palette colour. */
const hexOf = name => {
  const c = selectedPalette.colors.find(x => x.name === name)
  if (!c) throw new Error(`palette colour "${name}" not found in canon`)
  return c.hex
}

/** Canonical name for a palette hex (gradient stops that ARE palette colours). */
const nameOfHex = hex => {
  const c = selectedPalette.colors.find(x => x.hex === hex)
  if (!c) throw new Error(`palette colour with hex "${hex}" not found in canon`)
  return c.name
}

/* ---------------------------------------------------------------- */
/* Colour math — OKLCH lightness and WCAG contrast are COMPUTED from */
/* canon hexes (decision 30): stored numbers could drift from the    */
/* hexes; computed ones cannot.                                      */
/* ---------------------------------------------------------------- */

const hexRgb = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16))
const srgbLin = c => { const v = c / 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }
const relLuminance = hex => { const [r, g, b] = hexRgb(hex).map(srgbLin); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
const contrast = (a, b) => { const [hi, lo] = [relLuminance(a), relLuminance(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05) }
// r >= 10 shows one decimal (17.4:1); below, two (5.05:1); exact 1 shows 1:1.
const ratioStr = r => `${r < 1.005 ? '1' : r >= 10 ? r.toFixed(1) : r.toFixed(2)}:1`
const oklchL = hex => {
  const [r, g, b] = hexRgb(hex).map(srgbLin)
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
  return 0.2104542553 * Math.cbrt(l) + 0.7936177850 * Math.cbrt(m) - 0.0040720468 * Math.cbrt(s)
}

/* ---------------------------------------------------------------- */
/* Rendering helpers                                                 */
/* ---------------------------------------------------------------- */

// Table-cell example text: the guide wraps examples in *"…"*, so inner double
// quotes become single quotes and ASCII ellipses become the typographic one.
const mdExample = s => s.replace(/"/g, "'").replace(/\.\.\./g, '…')
// Trim a canon sentence's trailing period for "value." composition.
const noDot = s => s.replace(/\.$/, '')

/* ---------------------------------------------------------------- */
/* Block renderers — each returns the full text BETWEEN its markers  */
/* ---------------------------------------------------------------- */

const blocks = {
  'version-header': () =>
    `**Version:** ${meta.version} (${meta.lastUpdated}). Canonical data: \`src/data/brand.ts\` — this guide is a hybrid mirror: prose is hand-written; fenced data blocks are generated from canon (\`npm run generate:guide\`).`,

  'version-footer': () =>
    `*\`src/data/brand.ts\` is the canonical brand data (v${meta.version}, ${meta.lastUpdated}). The live app at [branding.spectrea.com](https://branding.spectrea.com/#/) renders it; this document, llms.txt, the PDF, and the generated assets are derived mirrors for offline and LLM-readable use. If surfaces ever disagree, brand.ts wins.*`,

  'tone-registers': () => {
    const rows = voice.toneExamples
      .map(t => `| **${t.context}** · ${t.tone} | *"${mdExample(t.correct)}"* | *"${mdExample(t.incorrect)}"* |`)
      .join('\n')
    return `| Context · Tone | Right | Wrong |\n|---|---|---|\n${rows}`
  },

  'voice-formula': () =>
    `**${voice.formula}**\n\n**Attention rule.** ${voice.attentionRule}`,

  'surface-patterns': () => {
    const rows = voice.surfacePatterns
      .map(p => `| **${p.surface}** | ${p.rule} | *"${mdExample(p.correct)}"* | *"${mdExample(p.incorrect)}"* |`)
      .join('\n')
    return `| Surface | Rule | Right | Wrong |\n|---|---|---|---|\n${rows}`
  },

  'logo-construction': () => {
    const g = logo.markGeometry
    const l = logo.lockup
    const c = logo.constraints
    return [
      `- **Spine:** ${g.segs.length} ${g.continuity}-continuous cubics fitted to the ${brand.typography.heading.family} ${l.wordmarkWeight} S medial axis, with a deliberate shallow storytelling tail. Authoritative coordinates: \`brand.ts\` \`logo.markGeometry\` (record: docs/brand-review-2026-08).`,
      `- **Dots:** ${c.dotCount} dots at i/${c.dotCount - 1} arc fractions of the spine, radius ${c.dotRadius.toFixed(3)} (native units; dot diameter : stroke width stays ${l.dotToStrokeRatio}). Grey (\`${c.primaryDotColor}\`) in the primary treatment.`,
      `- **Stroke:** width ${c.strokeWidth.toFixed(3)} (native units), round linecap. Cool Duet (Cobalt \`${hexOf('Cobalt')}\` → Teal \`${hexOf('Teal')}\`) in the static mark and in the gradient lockup's mark. In the lockup the rendered stroke equals the wordmark's stem: **${l.strokeEm}em**.`,
      `- **Trailing dots:** the last ${c.trailingDots} dots are left visually unconnected — the "about to connect" moment.`,
      `- **Lockup metrics (on ink, never bounding boxes):** mark ink height ${l.markInkHeightEm}em (= the real S glyph's ink), mark→text ink gap ${l.markTextInkGapEm}em (= S right side bearing + ${l.trackingEm}em tracking + p left side bearing), mark ink bottom at baseline + ${g.placement.inkBottomVsBaselineEm}em (the S's baseline overshoot). Wordmark: ${brand.typography.heading.family} **${l.wordmarkWeight}** at every size, ${l.trackingEm}em tracking.`,
      `- **Container:** ${g.viewBox}×${g.viewBox} construction viewBox. ${c.container}`,
      `- **Small sizes:** ${c.smallSizes}`,
    ].join('\n')
  },

  'clear-space': () =>
    `Minimum clear space around the lockup: ${logo.constraints.clearSpace} No other graphic element (text, border, background image) enters the clear-space box.`,

  'accent-states': () => {
    const L = brandTokens.buttonStates.light
    const D = brandTokens.buttonStates.dark
    const cap = k => k[0].toUpperCase() + k.slice(1)
    const accents = ['cobalt', 'teal', 'amber', 'rose']
    const lightLines = accents
      .map(a => `- ${cap(a)}: base \`${L[a].base}\`, hover \`${L[a].hover}\`, active \`${L[a].active}\`.`)
      .join('\n')
    const darkStates = accents
      .map(a => `${cap(a)} hover \`${D[a].hover}\` / active \`${D[a].active}\``)
      .join(' · ')
    return (
      `Hover/active states for each accent (light surfaces — darken on interaction):\n${lightLines}\n\n` +
      `Dark surfaces (resolved 2026-07-04) — same bases, states lighten instead: ${darkStates}. ${D.rule} ` +
      `Dark secondary: bg \`${D.secondary.bg}\`, hover \`${D.secondary.hover}\`, text Cloud \`${D.secondary.text}\`.`
    )
  },

  'washes-light': () => {
    const rows = brandTokens.washes.light
      .map(w => `| ${w.name} | \`${w.hex}\` | ${w.accent} | ${w.use} (text on wash: \`${w.textOn}\`) |`)
      .join('\n')
    return `| Name | Hex | Paired accent | Use |\n|---|---|---|---|\n${rows}\n\n${brandTokens.washes.darkTextRule}`
  },

  'washes-dark': () => {
    const rows = brandTokens.washes.dark
      .map(w => `| ${w.name} | \`${w.hex}\` | ${w.accent} | ${w.use} |`)
      .join('\n')
    return `| Name | Hex | Paired accent | Use |\n|---|---|---|---|\n${rows}`
  },

  lifts: () => {
    const rows = brandTokens.lifts
      .map(l => `| ${l.name} | \`${l.hex}\` | ${l.use}. |`)
      .join('\n')
    return `| Accent | Dark-lift | When |\n|---|---|---|\n${rows}`
  },

  'type-system': () => {
    const t = brand.typography
    return [
      `| Role | Family | Weights | Use |`,
      `|---|---|---|---|`,
      `| Headings | ${t.heading.family} | ${t.heading.weights.semibold} (Semibold — incl. the logo wordmark at every size), ${t.heading.weights.bold} (Bold — hero headlines only) | Page titles, section headings, card titles, stat values |`,
      `| Body | ${t.body.family} | ${Object.values(t.body.weights).join(', ')} | Body text, descriptions, form labels, nav items; ${t.body.weights.semibold} for overlines and small section labels (uppercase/tracked) |`,
      `| Code / metadata | ${t.mono.family} | ${t.mono.weights.regular} | Inline code, data values, entity types, provenance |`,
    ].join('\n')
  },

  'min-sizes': () => `**Minimum sizes.** ${brand.typography.minSizes}`,

  'type-scale': () => {
    const rows = brand.typography.scale
      .map(r => `| ${r.name} | ${r.px} px | ${r.lineHeight} | ${r.weight} | ${r.use} |`)
      .join('\n')
    return `| Size | Value | Line height | Weight | Use |\n|---|---|---|---|---|\n${rows}`
  },

  'responsive-scale': () => {
    const r = brand.typography.responsive
    const rows = r.rows.map(x => `- ${x.name}: ${x.desktop} / ${x.tablet} / ${x.mobile}`).join('\n')
    return `${r.note}:\n${rows}\n- ${r.unchanged.replace(/\.$/, '.')}`
  },

  accessibility: () => {
    const a = accessibility
    const entry = a.exceptionRegistry.entries[0]
    const entryLines = a.exceptionRegistry.entries
      .map(
        e =>
          `  - \`${e.name}\` (ratified ${e.ratified}): ${e.exception} **Measured — WCAG 2.x:** ${e.measured.wcag2x} **APCA:** ${e.measured.apca} **Rationale:** ${e.rationale} **Bounds:** ${e.bounds}`
      )
      .join('\n')
    return [
      `The floor is **${a.floor}** on every shipped surface.`,
      `- ${a.rules[0]}`,
      `- Contrast ratio minimum: ${a.contrast.normalText} for normal text, ${a.contrast.largeTextAndUI} for large/UI. On Canvas (computed): ${colorSystem.textHierarchy
        .map(t => {
          const r = contrast(hexOf(t.token), hexOf('Canvas'))
          return `${t.token} ${ratioStr(r)}${r >= 7 ? ' (AAA)' : r >= 4.5 ? ' (AA)' : ' (supplementary only)'}`
        })
        .join(' · ')} — see the Pewter allow/deny matrix in §5.`,
      `- WCAG 2.2 specifics: ${a.wcag22Criteria.map(noDot).join(' · ')}.`,
      `- ${a.rules[1]}`,
      `- ${a.rules[2]}`,
      `- **Measurement doctrine (adopted 2026-08-07):** ${a.measurement}`,
      `- **Exception registry** — deliberate, ratified departures from the floors; a sub-floor usage not listed here is a defect, not a style. ${entry ? `${a.exceptionRegistry.entries.length === 1 ? 'One entry' : `${a.exceptionRegistry.entries.length} entries`}:` : 'No entries.'}`,
      entryLines,
    ]
      .filter(Boolean)
      .join('\n')
  },

  'motion-durations': () => {
    const d = brandTokens.motion.durationsMs
    return [
      `- ${d.micro} ms — micro (hover tints, colour shifts)`,
      `- ${d.standard} ms — standard (UI transitions, dropdowns)`,
      `- ${d.comfortable} ms — comfortable (modals, slide-overs)`,
      `- ${d.deliberate} ms — deliberate (page transitions, choreographed sequences)`,
      `- ${d.arrival} ms — arrival (the Arrival signature primitive)`,
      `- ${d.formation} ms — formation (the Formation signature primitive)`,
      `- ${d.spectrumSweep} ms — spectrumSweep (the Spectrum sweep signature primitive)`,
    ].join('\n')
  },

  'motion-easing': () => {
    const e = brandTokens.motion.easings
    // Easing names derive from the canonical keys (easeOut → ease-out).
    const kebab = k => k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())
    const desc = k => e[k].use
      .replace(/^Default — /, 'default for ')
      .replace(/^Back/, 'for back')
      .replace(/^Arrival primitive — /, 'the Arrival primitive — ')
    const line = k => `- \`${kebab(k)}\` (\`${e[k].css}\`) — ${desc(k)}.`
    return [line('easeOut'), line('easeInOut'), line('elasticSettle'), `- Never use ${e.never}.`].join('\n')
  },

  'motion-philosophy': () => {
    const d = brandTokens.motion.durationsMs
    return `Purposeful, subtle, natural — and alive. Every animation answers "what does this help the user understand?" — if the answer is "nothing," remove it. Most interactive motion stays restrained (${d.standard}–${d.deliberate}ms hovers, focus, state changes). Three signature primitives below carry the brand's "alive, growing, compounding" claim — used purposefully, not decoratively.`
  },

  'signature-primitives': () => {
    const d = brandTokens.motion.durationsMs
    const e = brandTokens.motion.easings
    return [
      `**1. Arrival (${d.arrival}ms).** When something important enters the frame — a new card, a fresh result, an inserted item. Spec: scale from 0 with soft elastic settle (\`${e.elasticSettle.css}\`), then a brief radial pulse in a brand spectrum colour. Reads as "something just arrived and is alive."`,
      ``,
      `**2. Formation (${d.formation}ms).** When two things visibly connect — a line, a link, a relationship being shown. Spec: a curved stroke draws between two points with the spectrum gradient running along the line (\`stroke-dashoffset\` animation on an SVG path with a linear gradient stroke), then settles to its resting colour. Echoes the Bézier curve in the brand mark.`,
      ``,
      `**3. Spectrum sweep (${d.spectrumSweep}ms).** The brand's signature moment — used sparingly when something meaningful happens that deserves the brand's full voice. Spec: a thin gradient strip (4px tall, ~75% width of its container) traverses Cobalt → Teal → Amber → Rose with \`background-position\` animation across a 4× wide gradient, fading in at 15% and out at 85%. Spectrea's most distinctive motion. Reserve for moments that genuinely matter — overuse dilutes it.`,
    ].join('\n')
  },

  'logo-animation': () => {
    const a = logo.animation
    const p = a.phases
    return [
      `The connecting-dots loop is the logo's OWN canonical spec (\`logo.animation\`) — deliberately outside the UI motion tokens:`,
      `- Loop: ${a.loopSeconds} s, infinite. Phases of the timeline: draw to ${p.drawEnd}, hold to ${p.holdEnd}, dissolve to ${p.dissolveEnd}, then an empty beat until restart. The dissolving edge fades over ${a.trailingFadeFraction * 100}% of the path length.`,
      `- Easing: ${a.easing}`,
      `- Reduced motion: ${a.reducedMotion}`,
      `- Use: ${a.use}`,
    ].join('\n')
  },

  // ── Gradient family (§6) — brandTokens.gradients, canonized 2026-08-09 ──

  'gradient-primary': () => {
    const g = brandTokens.gradients
    const names = g.primary.stops.map(s => nameOfHex(s.hex)).join(' → ')
    return `**${names}** at ${g.angleDeg}°, interpolated in **OKLCH** on modern browsers with a clean sRGB fallback. ${g.primary.use}`
  },

  'gradient-recipe': () => {
    const g = brandTokens.gradients.primary
    return [
      '```css',
      '.brand-gradient {',
      `  background: ${g.fallbackCss};`,
      '}',
      '@supports (background: linear-gradient(in oklch, red, blue)) {',
      '  .brand-gradient {',
      `    background: ${g.css};`,
      '  }',
      '}',
      '```',
      '',
      `Interpolation: ${g.interpolation} Browsers that don't understand OKLCH silently ignore the \`@supports\` block and keep the sRGB base.`,
    ].join('\n')
  },

  'gradient-lockup': () => {
    const cool = brandTokens.gradients.duets.cool
    return [
      `Two-tone ${cool.name} — the same gradient as the primary static mark. The wordmark stays monotone (Ink / White); only the mark carries colour.`,
      '```',
      cool.stops.map(s => `${Math.round(s.at * 100)}% ${s.hex}`).join('  →  '),
      '```',
      'Implemented in SVG (`<linearGradient>`). **Never used as a general-purpose decorative gradient.**',
    ].join('\n')
  },

  'gradient-full-rose': () => {
    const g = brandTokens.gradients
    const names = g.fullSpectrumWithRose.stops.map(s => nameOfHex(s.hex)).join(' → ')
    return `\`${names}\` at ${g.angleDeg}°. ${g.fullSpectrumWithRose.use}`
  },

  'gradient-duets': () => {
    const g = brandTokens.gradients
    const stopLabel = s => {
      const c = selectedPalette.colors.find(x => x.hex === s.hex)
      return c ? c.name : `\`${s.hex}\` at ${Math.round(s.at * 100)}%`
    }
    const duetLine = d =>
      `- **${d.name}** — ${d.stops.map(stopLabel).join(' → ')}. ${'bridgeRule' in d ? `*${d.bridgeRule}* ` : ''}${d.use}`
    return [
      g.adjacencyRule,
      duetLine(g.duets.cool),
      duetLine(g.duets.balanced),
      duetLine(g.duets.warm),
    ].join('\n')
  },

  'gradient-rules': () => {
    // Canon strings render verbatim — one bullet per item, no case-folding.
    const g = brandTokens.gradients
    return [
      '**Use for:**',
      ...g.useFor.map(s => `- ${s}`),
      '',
      '**Never for:**',
      ...g.neverFor.map(s => `- ${s}`),
    ].join('\n')
  },

  // ── Colour system (§5) — colorSystem, canonized 2026-08-09 ──────

  'neutral-ladder': () => {
    const n = colorSystem.neutrals
    const canvas = hexOf('Canvas')
    const rows = n.tokens
      .map(t => {
        const hex = hexOf(t.name)
        return `| ${t.roleLabel} | ${t.name} | \`${hex}\` | ${oklchL(hex).toFixed(3)} | ${ratioStr(contrast(hex, canvas))} | \`--color-${t.name.toLowerCase()}\` |`
      })
      .join('\n')
    return `${n.intro}\n\n| Role | Name | Hex | OKLCH L | Contrast on Canvas | CSS var |\n|---|---|---|---|---|---|\n${rows}\n\n${n.ladderNote}`
  },

  'accent-meanings': () => {
    const rows = colorSystem.accents
      .map(a => `| ${a.roleLabel} | ${a.name} | \`${hexOf(a.name)}\` | ${a.meaning} |`)
      .join('\n')
    return `| Role | Name | Hex | Meaning |\n|---|---|---|---|\n${rows}`
  },

  'text-hierarchy': () => {
    const canvas = hexOf('Canvas')
    // Conformance label derived from the computed ratio (AAA ≥ 7, AA ≥ 4.5).
    const label = r => (r >= 7 ? ' (AAA)' : r >= 4.5 ? ' (AA)' : '')
    const rows = colorSystem.textHierarchy
      .map(t => {
        const hex = hexOf(t.token)
        const r = contrast(hex, canvas)
        return `| ${t.tier} | ${t.token} \`${hex}\` | ${ratioStr(r)}${label(r)} | ${t.use} |`
      })
      .join('\n')
    const m = accessibility.pewterMatrix
    return [
      `The dark-on-light text tiers map to the Warm Blend's readable tokens:`,
      '',
      `| Tier | Token | Contrast | Use for |`,
      `|---|---|---|---|`,
      rows,
      '',
      `**Pewter is a whisper, not a readable tier.** ${m.principle} As a matrix — **allowed:** ${m.allowed.join(' · ')}. **Denied:** ${m.denied}`,
    ].join('\n')
  },

  'tailwind-mapping': () => {
    const t = colorSystem.tailwindMapping
    const rows = t.rows
      .map(r => `| \`${r.tailwind}\` | ${r.token === 'keep as-is' ? '**keep as-is**' : `\`${r.token}\``} | ${r.note} |`)
      .join('\n')
    return `${t.note}\n\n| Tailwind stone class | Brand token | Notes |\n|---|---|---|\n${rows}`
  },

  'colour-ratio': () =>
    colorSystem.ratio.light.map(r => `- **${r.pct}%** ${r.token} (${r.what})`).join('\n'),

  'colour-tiers': () =>
    [
      'Every colour in Spectrea lives in one of three tiers:',
      '',
      ...colorSystem.tiers.map(t => `${t.tier}. **Tier ${t.tier} — ${t.name} (${t.carrier}).** ${t.rule}`),
    ].join('\n'),

  'light-default': () => colorSystem.lightDefault,

  'dark-roles': () => {
    const d = colorSystem.darkRoles
    const dm = selectedPalette.darkMode
    const lightCell = name =>
      selectedPalette.colors.some(c => c.name === name) ? `${name} \`${hexOf(name)}\`` : `\`${name}\``
    const rows = d.rows
      .map(r => `| ${r.role} | ${lightCell(r.light)} | ${r.dark} \`${dm[r.darkModeKey]}\`${r.isNew ? ' *(new)*' : ''} | \`${r.cssVar}\` |`)
      .join('\n')
    // The whyTwoTokens rationale carries no stored figures; the on-Ink
    // ratios are computed from the hexes here.
    const ink = hexOf('Ink')
    const figures = `Computed on Ink: Pewter ${ratioStr(contrast(hexOf('Pewter'), ink))}, Mist ${ratioStr(contrast(dm.muted, ink))}.`
    return `${d.intro}\n\n| Role | Light | Dark | CSS var |\n|---|---|---|---|\n${rows}\n\n**Why two new tokens and not more.** ${d.whyTwoTokens} ${figures}`
  },

  'dark-ratio': () => colorSystem.ratio.darkRule,

  'dark-accents': () => {
    const ink = hexOf('Ink')
    const rows = colorSystem.accents
      .map(a => {
        const hex = hexOf(a.name)
        const r = contrast(hex, ink)
        // Conformance note derived from the computed ratio; a sub-AA accent
        // points at its canonical lift (matched by name).
        let note
        if (r >= 4.5) note = 'AA normal text.'
        else {
          const lift = brandTokens.lifts.find(l => l.name.startsWith(a.name))
          note = `UI only (passes 3:1 for non-text UI).${lift ? ` **For coloured text on Ink use ${lift.name} \`${lift.hex}\`.**` : ''}`
        }
        return `| ${a.name} \`${hex}\` | ${ratioStr(r)} | ${note} |`
      })
      .join('\n')
    return `${colorSystem.accentsOnDark}\n\n| Accent | On Ink contrast | Notes |\n|---|---|---|\n${rows}`
  },

  // §14 — the real generated token sheet, inlined (decision 30): the shown
  // CSS, the downloadable /spectrea-tokens.css, and the Downloads page's
  // display are one artifact.
  'css-tokens': () => {
    const tokensPath = join(root, 'public', 'spectrea-tokens.css')
    const css = readFileSync(tokensPath, 'utf8').trimEnd()
    return [
      'The complete generated token sheet — the same file served at [`/spectrea-tokens.css`](/spectrea-tokens.css) and on the Downloads page:',
      '',
      '```css',
      css,
      '```',
    ].join('\n')
  },

  'change-process': () => {
    const steps = meta.changeProcess
      .map((s, i) => `${i + 1}. **${s.step}** (${s.owner}) — ${s.detail}`)
      .join('\n')
    return `${steps}\n\nOne canonical process (\`meta.changeProcess\`, merged 2026-08-09) — the Governance page of the live guide renders these same five steps. Change severity sets each step's depth and approval weight, never which steps happen.`
  },

  'os-frame-example': () => {
    const ex = brand.positioning.onRamp.osFrameExample
    return [
      '**The coined frame, applied** (worked example, ratified 2026-08-09):',
      '',
      '| Right | Wrong |',
      '|---|---|',
      `| *"${mdExample(ex.right)}"* | *"${mdExample(ex.wrong)}"* |`,
      '',
      ex.why,
    ].join('\n')
  },

  radii: () => {
    const rows = brandTokens.radii
      .map(r => `| ${r.token} | ${r.px} px | \`${r.tailwind}\` | ${r.use} |`)
      .join('\n')
    return `| Token | Value | Tailwind | Use |\n| --- | --- | --- | --- |\n${rows}`
  },

  spacing: () => {
    const s = brandTokens.spacing
    const rows = s.scale
      .map(r => `| ${r.token} | ${r.px} px | \`${r.tailwind}\` | ${r.use} |`)
      .join('\n')
    return `${s.baseUnit} px base unit. ${s.rule}\n\n| Token | Value | Tailwind | Use |\n| --- | --- | --- | --- |\n${rows}`
  },

  elevation: () => {
    const rows = brandTokens.elevation
      .map(e => `| ${e.level} | ${e.zIndex} | ${e.shadow === 'none' ? '—' : `\`${e.shadow}\``} | ${e.use} |`)
      .join('\n')
    return `| Level | z-index | Shadow | Use |\n| --- | --- | --- | --- |\n${rows}\n\n${components.layout.elevationRule}`
  },

  // ── Components (§11) — components, canonized 2026-08-09 ─────────
  // Token references resolve through brandTokens (radii/spacing) and
  // buttonStates; palette names through hexOf. stone-* hexes are Tailwind
  // constants, not canon values.

  'buttons-types': () => {
    const B = components.buttons
    const L = brandTokens.buttonStates.light
    const D = brandTokens.buttonStates.dark
    const bullets = B.types
      .map(t => {
        if (t.stateKey) {
          if (!L[t.stateKey] || !D[t.stateKey]) throw new Error(`buttonStates missing stateKey: ${t.stateKey}`)
        }
        if (t.palette) {
          const s = L[t.stateKey]
          const d = D[t.stateKey]
          return `- **${t.name} (${t.palette})** — ${t.role} \`${s.base}\`, ${t.label} text; hover \`${s.hover}\` light / \`${d.hover}\` dark; active \`${s.active}\` light / \`${d.active}\` dark.`
        }
        // A stateKey without a palette is a fill/text-shaped state group —
        // structural branch, never keyed on the state group's name.
        if (t.stateKey) {
          const s = L[t.stateKey]
          const d = D[t.stateKey]
          if (!s.bg || !s.text || !d.bg || !d.hover || !d.text) throw new Error(`state group ${t.stateKey} is not fill/text-shaped`)
          return `- **${t.name}** — ${t.role} ${t.treatment} Fills \`${s.bg}\` light / \`${d.bg}\` dark (dark hover \`${d.hover}\`); text \`${s.text}\` light / \`${d.text}\` dark.`
        }
        return `- **${t.name}** — ${t.role} ${t.treatment}`
      })
      .join('\n')
    const entry = accessibility.exceptionRegistry.entries.find(e => e.name === 'semantic-button-labels-white')
    if (!entry) throw new Error('semantic-button-labels-white registry entry missing')
    return `${bullets}\n\n${B.rule} White labels at base state ride the ratified exception \`${entry.name}\` (ratified ${entry.ratified} — see the accessibility exception registry).`
  },

  'buttons-spec': () => {
    const B = components.buttons
    const radiusOf = token => {
      const r = brandTokens.radii.find(x => x.token === token)
      if (!r) throw new Error(`radius token missing: ${token}`)
      return r
    }
    const def = B.sizes.find(s => s.name === 'Default')
    if (!def) throw new Error('Default button size missing')
    const defR = radiusOf(def.radiusToken)
    const sizes = B.sizes
      .map(s => `${s.name} ${s.heightPx} px (\`${s.padding}\`, ${s.fontSizePx} px, \`${radiusOf(s.radiusToken).tailwind}\`) — ${s.use}`)
      .join(' · ')
    return `Common specs: font ${B.font}; default padding \`${def.padding}\`, radius ${defR.px} px (\`${defR.tailwind}\`), font-size ${def.fontSizePx} px; disabled ${B.disabled}.\n\nSizes: ${sizes}.\n\n${B.lightHoverRule} ${brandTokens.buttonStates.dark.rule}`
  },

  'focus-ring': () => {
    const f = brandTokens.focusRing
    return `Focus ring: ${f.width}, ${f.offset} offset (\`.btn-focus:focus-visible\`) — \`${f.light}\` light / \`${f.dark}\` dark. ${f.note}\n\n${f.rule}`
  },

  'graph-viz': () => {
    const labels = {
      nodeDefault: 'Node default',
      nodeHover: 'Node hover',
      nodeFocus: 'Node focus',
      nodeSelected: 'Node selected',
      edgeDefault: 'Edges',
      confidence: 'Confidence',
      status: 'Status',
      stale: 'Stale/dormant',
    }
    const keys = Object.keys(graphViz.semantics)
    const unlabelled = keys.filter(k => !(k in labels))
    if (unlabelled.length) throw new Error(`graph-viz block: unlabelled semantics keys: ${unlabelled.join(', ')}`)
    const orphaned = Object.keys(labels).filter(k => !keys.includes(k))
    if (orphaned.length) throw new Error(`graph-viz block: labels without canon keys: ${orphaned.join(', ')}`)
    const bullets = keys.map(k => `- **${labels[k]}:** ${graphViz.semantics[k]}`).join('\n')
    return `${bullets}\n\n${graphViz.note}`
  },

  'forms-spec': () => {
    const F = components.forms
    const r = brandTokens.radii.find(x => x.token === F.radiusToken)
    if (!r) throw new Error(`radius token missing: ${F.radiusToken}`)
    const rows = [
      ['Height', `${F.heights.defaultPx} px default, ${F.heights.compactPx} px compact`],
      ['Border', `${F.border} (\`${TW_STONE['stone-200']}\`)`],
      ['Radius', `${r.px} px (\`${r.tailwind}\`)`],
      ['Padding', `\`${F.padding}\``],
      ['Font', F.font],
      ['Placeholder', `${F.placeholder} \`${hexOf(F.placeholder)}\``],
      ['Focus', F.focus],
      ['Error', `${F.error} (\`${hexOf('Rose')}\`)`],
      ['Disabled', `${F.disabledBg} background (\`${hexOf(F.disabledBg)}\`)`],
    ]
      .map(([p, v]) => `| ${p} | ${v} |`)
      .join('\n')
    return `| Property | Value |\n|---|---|\n${rows}`
  },

  'cards-spec': () => {
    const C = components.cards
    const r = brandTokens.radii.find(x => x.token === C.radiusToken)
    const pad = brandTokens.spacing.scale.find(x => x.token === C.paddingToken)
    const gap = brandTokens.spacing.scale.find(x => x.token === C.gapToken)
    if (!r || !pad || !gap) throw new Error('cards token reference missing')
    return [
      `Container: ${C.border} (\`${TW_STONE['stone-200']}\`), ${r.px} px radius (\`${r.tailwind}\`), ${pad.px} px padding (\`${pad.tailwind}\`), ${C.background} background (\`${hexOf(C.background)}\`). Hover border ${C.hoverBorder} (\`${TW_STONE['stone-300']}\`). Elevated variant: ${C.elevated}. Grid gap ${gap.px} px. Titles: ${C.titleFont}.`,
      '',
      C.surfaceNote,
    ].join('\n')
  },

  'layout-spec': () => {
    const L = components.layout
    const gap = brandTokens.spacing.scale.find(x => x.token === L.gridGapToken)
    if (!gap) throw new Error('layout gridGapToken missing')
    const bullets = [
      `- **Sidebar:** ${L.sidebar.widthPx} px. ${L.sidebar.note}.`,
      `- **Top bar:** ${L.topBar.height} height. ${L.topBar.note}.`,
      `- **Content area:** ${L.contentArea.note}; ${L.contentArea.background} (\`${hexOf(L.contentArea.background)}\`) background.`,
      `- **Breakpoints:** ${L.breakpoints.map(b => `${b.name} \`${b.range}\` (${b.cols} ${b.cols === 1 ? 'column' : 'columns'})`).join(', ')}. Grid gap ${gap.px} px.`,
      `- **Content widths:** ${L.contentWidths.map(w => `${w.label} ${w.value} — ${w.use}`).join(' · ')}.`,
      `- **Base spacing unit:** ${brandTokens.spacing.baseUnit} px. ${brandTokens.spacing.rule}`,
      `- **Elevation:** ${L.elevationRule} Full ladder in §14.`,
    ].join('\n')
    const responsive = L.responsiveRules.map(x => `- **${x.rule}.** ${x.detail}`).join('\n')
    return `${bullets}\n\n**Responsive behaviour:**\n${responsive}`
  },
}

/* ---------------------------------------------------------------- */
/* Marker replacement                                                */
/* ---------------------------------------------------------------- */

let guide = readFileSync(guidePath, 'utf8')
const seen = []

for (const [id, render] of Object.entries(blocks)) {
  const open = `<!-- generated:${id} -->`
  const close = `<!-- /generated:${id} -->`
  const openCount = guide.split(open).length - 1
  const closeCount = guide.split(close).length - 1
  if (openCount !== 1 || closeCount !== 1) {
    console.error(`✗ marker "${id}": expected exactly one open and one close (found ${openCount}/${closeCount})`)
    process.exitCode = 1
    continue
  }
  const start = guide.indexOf(open) + open.length
  const end = guide.indexOf(close)
  if (end < start) {
    console.error(`✗ marker "${id}": close marker precedes open marker`)
    process.exitCode = 1
    continue
  }
  guide = guide.slice(0, start) + '\n' + render() + '\n' + guide.slice(end)
  seen.push(id)
}

if (process.exitCode) {
  console.error('Guide NOT written — fix the markers above.')
  process.exit(process.exitCode)
}

writeFileSync(guidePath, guide)
console.log(`✓ public/brand-guide.md — ${seen.length} generated blocks rewritten from brand.ts v${meta.version} (${meta.lastUpdated})`)
