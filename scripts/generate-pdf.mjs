#!/usr/bin/env node
/**
 * Generate public/brand-guide.pdf from public/brand-guide.md
 *
 * How it works:
 *   1. Read the markdown.
 *   2. Render it to HTML with `marked` (via a minimal stylesheet).
 *   3. Write the HTML to a temp file.
 *   4. Run headless Chrome to print it to PDF.
 *
 * Prerequisites: `google-chrome` (or `chromium`) must be on PATH.
 * Install marked locally the first time: `npm install --no-save marked`
 */

import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises'
import { readFileSync, existsSync } from 'node:fs'
import { inflateSync } from 'node:zlib'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const root = resolve(__dirname, '..')
const mdPath = join(root, 'public', 'brand-guide.md')
const pdfPath = join(root, 'public', 'brand-guide.pdf')

// Find a working Chrome/Chromium binary (CHROME_PATH env overrides discovery)
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

// Minimal print stylesheet tuned for this brand's typography
const css = `
  @page {
    size: A4;
    margin: 20mm 18mm;
  }
  :root {
    --ink: #18181C;
    --pewter: #97979E;
    --canvas: #FDFDFB;
    --cloud: #F4F4F1;
    --brand: #4271DF;
    --teal: #00B6A0;
    --amber: #E19000;
    --rose: #F24260;
  }
  * { box-sizing: border-box; }
  html, body {
    background: var(--canvas);
    color: var(--ink);
    font-family: 'Lexend', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 10.5pt;
    line-height: 1.55;
    margin: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Albert Sans', 'Lexend', sans-serif;
    color: var(--ink);
    letter-spacing: -0.005em;
    page-break-after: avoid;
  }
  h1 { font-size: 26pt; font-weight: 700; margin: 0 0 14pt; letter-spacing: -0.015em; }
  h1 + blockquote { color: var(--pewter); font-size: 12pt; border: none; margin: -6pt 0 18pt; padding: 0; }
  h2 { font-size: 17pt; font-weight: 600; margin: 24pt 0 8pt; border-bottom: 1pt solid var(--cloud); padding-bottom: 6pt; }
  h3 { font-size: 13pt; font-weight: 600; margin: 18pt 0 6pt; }
  h4 { font-size: 11pt; font-weight: 600; margin: 14pt 0 4pt; }
  p { margin: 0 0 10pt; orphans: 3; widows: 3; }
  strong { color: var(--ink); font-weight: 600; }
  em { color: var(--ink); }
  blockquote {
    color: var(--pewter);
    border-left: 3pt solid var(--brand);
    margin: 0 0 14pt;
    padding: 4pt 0 4pt 14pt;
    font-style: normal;
  }
  code {
    font-family: 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;
    background: var(--cloud);
    border-radius: 3pt;
    padding: 1pt 4pt;
    font-size: 0.9em;
    color: var(--ink);
  }
  pre {
    background: var(--ink);
    color: #F4F4F1;
    padding: 10pt 12pt;
    border-radius: 4pt;
    overflow-x: auto;
    font-size: 9pt;
    line-height: 1.5;
    margin: 0 0 12pt;
  }
  pre code {
    background: transparent;
    color: inherit;
    padding: 0;
    font-size: inherit;
  }
  ul, ol { margin: 0 0 10pt; padding-left: 18pt; }
  li { margin-bottom: 3pt; }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 8pt 0 14pt;
    font-size: 9.5pt;
    /* Long tables split across pages (header repeats) instead of jumping
       whole to the next page and leaving orphan gaps (D42). */
    page-break-inside: auto;
  }
  thead { display: table-header-group; }
  tr { page-break-inside: avoid; }
  th, td {
    text-align: left;
    padding: 5pt 8pt;
    border-bottom: 0.5pt solid var(--cloud);
    vertical-align: top;
  }
  th {
    background: var(--cloud);
    font-weight: 600;
    color: var(--ink);
    border-bottom: 1pt solid #E5E5E2;
  }
  hr {
    border: none;
    border-top: 1pt solid var(--cloud);
    margin: 18pt 0;
  }
  a { color: var(--brand); text-decoration: none; }
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 10pt 0;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  figure {
    margin: 12pt 0;
    page-break-inside: avoid;
  }
  figcaption {
    font-size: 9pt;
    color: var(--pewter);
    margin-top: 4pt;
  }
  .inline-svg {
    margin: 10pt 0;
    page-break-inside: avoid;
  }
  .inline-svg svg {
    max-width: 100%;
    height: auto;
    display: block;
  }
  .footer {
    margin-top: 20pt;
    padding-top: 10pt;
    border-top: 0.5pt solid var(--cloud);
    color: var(--pewter);
    font-size: 8.5pt;
  }
`

// Build @font-face blocks from locally-cached woff2 files (see scripts/fonts/).
// Embedding as base64 data URIs means the PDF rendering doesn't rely on the
// network and doesn't race with Chrome's print snapshot — text always gets
// the right glyph outlines.
//
// The three Google Fonts latin files are the VARIABLE fonts (Albert Sans
// and Lexend 100–900; JetBrains Mono 100–800). They must be declared with
// the weight range: the previous single-weight declarations pinned Chrome
// to the default instance and synthesized every other weight (D42 faux-bold
// — Lexend 600, the Albert Sans 600/700 split, and code spans inside
// 600-weight headings/strong text were all synthetic).
//
// The latin subsets do not carry the guide's six non-latin glyphs
// Δ → ↔ ≈ ≤ ≥, nor ′ (D42) — without the companion subset files below they
// fell through to host fonts, making the PDF host-dependent. Coverage is
// split honestly: Lexend and Albert Sans natively contain Δ ≈ ≤ ≥ (tiny
// Google `text=`-subset files), but neither contains → ↔ ′ — those three
// come from an Inter subset registered UNDER THE SAME FAMILY NAMES with
// a disjoint unicode-range, so every context (inlined SVG stacks included)
// resolves in-family. Inter is already the body stack's first fallback, so
// its arrows are the sanctioned substitute. JetBrains Mono natively has all
// seven. (Noto Sans was tried first and shipped a ′-only file: base Noto
// Sans lacks → ↔, and Google's `text=` subsetter ECHOES the requested
// unicode-range while silently omitting glyphs the font lacks — verify any
// refetched subset file with a glyph-coverage probe, never trust the
// declared range.)
//
// All faces of one family must declare IDENTICAL weight descriptors:
// mixing ranges (100 900 base + 400 700 subset) makes Chrome's print
// pipeline skip the base face entirely (verified against the old PDF's
// embedded-font inventory).
const NATIVE_SYMBOLS = 'U+0394, U+2248, U+2264-2265'   // Δ ≈ ≤ ≥
const ARROW_SYMBOLS  = 'U+2032, U+2192, U+2194'        // ′ → ↔
const ALL_SYMBOLS    = 'U+0394, U+2192, U+2194, U+2248, U+2264-2265'
function buildFontFaceCss() {
  const fontDir = resolve(root, 'scripts', 'fonts')
  const faces = [
    { family: 'Albert Sans',    weight: '100 900', file: 'i7dOIFdwYjGaAMFtZd_QA1ZbYFc.woff2' },
    { family: 'Lexend',         weight: '100 900', file: 'wlpwgwvFAVdoq2_v-6QU.woff2' },
    { family: 'JetBrains Mono', weight: '100 800', file: 'tDbV2o-flEEny0FZhsfKu5WU4xD7OwE.woff2' },
    { family: 'Albert Sans',    weight: '100 900', file: 'albertsans-symbols.woff2',    range: NATIVE_SYMBOLS },
    { family: 'Lexend',         weight: '100 900', file: 'lexend-symbols.woff2',        range: NATIVE_SYMBOLS },
    { family: 'JetBrains Mono', weight: '100 800', file: 'jetbrainsmono-symbols.woff2', range: ALL_SYMBOLS },
    { family: 'Albert Sans',    weight: '100 900', file: 'inter-arrows.woff2',          range: ARROW_SYMBOLS },
    { family: 'Lexend',         weight: '100 900', file: 'inter-arrows.woff2',          range: ARROW_SYMBOLS },
  ]
  const blocks = faces.map(({ family, weight, file, range }) => {
    const path = resolve(fontDir, file)
    let data
    try {
      data = readFileSync(path)
    } catch {
      // Deterministic output requires every declared font. A missing file
      // means silent weight-synthesis or host-font fallback — fail loudly.
      throw new Error(`Font file missing: ${path}`)
    }
    const b64 = data.toString('base64')
    return `@font-face {
  font-family: '${family}';
  font-style: normal;
  font-weight: ${weight};
  font-display: block;
  src: url(data:font/woff2;base64,${b64}) format('woff2');${range ? `\n  unicode-range: ${range};` : ''}
}`
  })
  return blocks.join('\n')
}

async function main() {
  const md = await readFile(mdPath, 'utf8')
  const publicDir = resolve(root, 'public')
  const fontFaceCss = buildFontFaceCss()

  // Dynamic import so this script works without a hard dependency
  let marked
  try {
    ({ marked } = await import('marked'))
  } catch {
    console.error(
      'The `marked` package is not installed. Run:\n  npm install --save-dev marked\n'
    )
    process.exit(1)
  }

  marked.setOptions({ gfm: true, breaks: false })
  let body = marked.parse(md)

  // Inline every SVG referenced by an <img> tag. Embedding the SVG content
  // directly (instead of loading it via <img src>) lets the SVG share the
  // HTML's loaded fonts — otherwise Chrome renders each <img>-loaded SVG in
  // isolation with async @import, which can snapshot before Albert Sans 600
  // finishes loading and leave the wordmark in the default Regular weight.
  //
  // When inlining multiple SVGs we must namespace every `id=` and its
  // `url(#id)` references per instance — the same SVG file referenced in
  // multiple places would otherwise collide on IDs, and `url(#lockup)` in
  // the second instance would resolve to the first instance's gradient (or
  // worse, render as a solid rect).
  let svgCount = 0
  body = body.replace(/<img\s+([^>]*?)src="\/([^"]+\.svg)"([^>]*?)>/g, (match, before, relPath, after) => {
    try {
      const n = ++svgCount
      const raw = readFileSync(resolve(publicDir, relPath), 'utf8')
        .replace(/^<\?xml[^>]*\?>\s*/, '')
        // Strip any <style> carrying an @import before inlining. An inlined
        // SVG's <style> joins the DOCUMENT stylesheet, so a Google Fonts
        // @import (type-samples/type-scale carry one for standalone viewing)
        // declares single-weight latin-subset faces AFTER our data-URI
        // variable faces. Those exact-weight faces then win font selection at
        // their weights and evict every non-latin glyph (Δ → ↔ ≈ ≤ ≥ ′) from
        // the family — the D42 host-font fallback (Segoe UI/Arial). Inlined
        // SVGs are meant to use the document's embedded faces; imports are
        // both unnecessary and poisonous here. Handled per <style> block so
        // the strip can never span from one style element across intervening
        // SVG content into another; within a block only the @import RULES are
        // removed (comments go first so a mere mention inside one can't
        // corrupt a rule), and the block itself is dropped only when nothing
        // but whitespace/CDATA shell remains.
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, block => {
          if (!/@import/i.test(block)) return block
          const cleaned = block
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/@import\b[^;]*;?/gi, '')
          const inner = cleaned
            .replace(/^<style[^>]*>/i, '')
            .replace(/<\/style>$/i, '')
            .replace(/<!\[CDATA\[|\]\]>/g, '')
          return inner.trim() ? cleaned : ''
        })
        .replace(/<defs>\s*<\/defs>/g, '')
        .trim()
      // Collect all id values in this SVG, then rewrite them + their refs.
      const ids = [...raw.matchAll(/\bid="([^"]+)"/g)].map(m => m[1])
      let svg = raw
      for (const id of ids) {
        const fresh = `${id}-s${n}`
        // Replace the id definition
        svg = svg.replace(new RegExp(`\\bid="${id}"`, 'g'), `id="${fresh}"`)
        // Replace url(#id) references (stroke/fill via url())
        svg = svg.replace(new RegExp(`url\\(#${id}\\)`, 'g'), `url(#${fresh})`)
        // Replace href="#id" / xlink:href="#id" too (for completeness)
        svg = svg.replace(new RegExp(`(href|xlink:href)="#${id}"`, 'g'), `$1="#${fresh}"`)
      }
      const alt = (before + after).match(/alt="([^"]*)"/)?.[1] ?? ''
      return `<figure class="inline-svg" role="img" aria-label="${escapeHtml(alt)}">${svg}</figure>`
    } catch (err) {
      // A non-inlined SVG falls back to <img>, which Chrome renders in an
      // isolated document with host fonts — silently host-dependent output.
      // Deterministic output requires every referenced SVG to inline.
      throw new Error(`Could not inline ${relPath}: ${err.message}`)
    }
  })

  // marked wraps lone images in <p>…</p>. <figure> cannot live inside <p> —
  // browsers auto-close the <p> at the figure open tag, leaving an orphaned
  // </p> and fragile layout. Unwrap any <p><figure>…</figure></p> pattern.
  body = body.replace(/<p>(\s*<figure class="inline-svg"[\s\S]*?<\/figure>\s*)<\/p>/g, '$1')

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Spectrea Brand Guide</title>
  <style>${fontFaceCss}
${css}</style>
</head>
<body>
  ${body}
  <div class="footer">Spectrea Brand Guide · Generated from /public/brand-guide.md · ${new Date().toISOString().slice(0, 10)}</div>
</body>
</html>`

  const dir = await mkdtemp(join(tmpdir(), 'spectrea-pdf-'))
  const htmlPath = join(dir, 'brand-guide.html')
  await writeFile(htmlPath, html, 'utf8')

  // Debug affordance: PDF_DEBUG_HTML=<path> keeps a copy of the exact HTML
  // Chrome printed, for font/layout forensics on the real document.
  if (process.env.PDF_DEBUG_HTML) {
    await writeFile(process.env.PDF_DEBUG_HTML, html, 'utf8')
    console.log(`Debug HTML kept at ${process.env.PDF_DEBUG_HTML}`)
  }

  const chrome = findChrome()
  console.log(`Using Chrome at: ${chrome}`)
  console.log(`Rendering HTML → PDF ...`)

  const result = spawnSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--virtual-time-budget=15000',
      `--print-to-pdf=${pdfPath}`,
      '--no-pdf-header-footer',
      `file://${htmlPath}`,
    ],
    { stdio: 'inherit' }
  )

  await rm(dir, { recursive: true, force: true })

  if (result.status !== 0) {
    console.error(`Chrome exited with status ${result.status}`)
    process.exit(result.status ?? 1)
  }

  // Output gate: the printed PDF must contain no host-supplied text fonts.
  // Chrome falls back SILENTLY when an embedded face is corrupt or a subset
  // file lacks a glyph it was requested with (Google's `text=` subsetter
  // omits glyphs the font doesn't have while still echoing the requested
  // unicode-range — see the Noto Sans note above), so input checks can't
  // guarantee determinism: verify the OUTPUT.
  //
  // Hardening (critic round 2): names are matched EXACTLY (allowed family +
  // optional instance suffix — 'InterloperHost' must not ride 'Inter');
  // finding ZERO font records fails the gate (a scanner/PDF-layout mismatch
  // must fail loud, not open); and the two families that are also plausible
  // HOST fonts get glyph restrictions decoded from their ToUnicode CMaps:
  // Inter may carry only the arrow subset it exists for (′ → ↔), and
  // Segoe UI Emoji — the sole accepted host face — only the 🎉 the guide's
  // anti-examples use (colour emoji is host-rendered by design).
  const NAME_RE = /^(Albert-?Sans|Lexend|JetBrains-?Mono|Inter|SegoeUIEmoji)(-[A-Za-z0-9]+)?$/
  const FAMILY_RE = /^(Albert Sans|Lexend|JetBrains Mono|Inter|Segoe UI Emoji)$/
  const GLYPH_BOUNDS = [
    { name: /^Inter\b/, family: 'Inter', allowed: new Set([0x2032, 0x2192, 0x2194]) },
    { name: /^SegoeUIEmoji\b/, family: 'Segoe UI Emoji', allowed: new Set([0x1F389, 0xFE0F]) },
  ]
  const pdfBytes = readFileSync(pdfPath).toString('latin1')
  const objects = new Map()
  const objRe = /(\d+) 0 obj/g
  let om
  while ((om = objRe.exec(pdfBytes))) {
    const s = om.index + om[0].length
    const e = pdfBytes.indexOf('endobj', s)
    if (e > 0) objects.set(Number(om[1]), pdfBytes.slice(s, e))
  }
  const toUnicodeCodepoints = body => {
    const tu = body.match(/\/ToUnicode\s+(\d+) 0 R/)
    if (!tu || !objects.has(Number(tu[1]))) return null
    const ob = objects.get(Number(tu[1]))
    const sm = ob.match(/stream\r?\n/)
    if (!sm) return null
    const s = ob.indexOf(sm[0]) + sm[0].length
    let cmap
    try {
      cmap = inflateSync(Buffer.from(ob.slice(s, ob.indexOf('endstream', s)), 'latin1')).toString('latin1')
    } catch {
      return null
    }
    const cps = new Set()
    const addUtf16Hex = hex => {
      const units = []
      for (let i = 0; i + 4 <= hex.length; i += 4) units.push(parseInt(hex.slice(i, i + 4), 16))
      for (const c of String.fromCharCode(...units)) cps.add(c.codePointAt(0))
    }
    for (const sec of cmap.matchAll(/beginbfchar([\s\S]*?)endbfchar/g)) {
      for (const p of sec[1].matchAll(/<[0-9A-Fa-f]+>\s*<([0-9A-Fa-f]+)>/g)) addUtf16Hex(p[1])
    }
    for (const sec of cmap.matchAll(/beginbfrange([\s\S]*?)endbfrange/g)) {
      for (const p of sec[1].matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g)) {
        const lo = parseInt(p[1], 16), hi = parseInt(p[2], 16), d = parseInt(p[3].slice(0, 4), 16)
        for (let c = lo; c <= hi && c - lo < 512; c++) cps.add(d + (c - lo))
      }
    }
    return cps
  }
  const offenders = new Set()
  let records = 0
  for (const [, body] of objects) {
    const bf = body.match(/\/BaseFont\s*\/(?:[A-Z]{6}\+)?([A-Za-z0-9\-_.]+)/)
    const fn = body.match(/\/FontName\s*\/(?:[A-Z]{6}\+)?([A-Za-z0-9\-_.]+)/)
    const ff = body.match(/\/FontFamily\s*\(([^)]*)\)/)
    if (!bf && !fn && !ff) continue
    records++
    for (const name of [bf?.[1], fn?.[1]]) {
      if (name && !NAME_RE.test(name)) offenders.add(name)
    }
    if (ff && !FAMILY_RE.test(ff[1])) offenders.add(ff[1])
  }
  if (records === 0) {
    console.error(`Font gate found NO font records in ${pdfPath} — scanner/PDF layout mismatch; refusing to pass.`)
    process.exit(1)
  }

  // Glyph restriction for the dual-role families (embedded subset AND
  // plausible host font). In Chrome's PDF output the objects carrying the
  // NAMES (FontDescriptors) have no /ToUnicode, and the font objects carrying
  // /ToUnicode have no names — so identity must be resolved through the
  // object graph: font → /FontDescriptor, or font → /DescendantFonts →
  // /FontDescriptor (Type0). A bounded face whose CMap is missing or
  // undecodable FAILS CLOSED.
  const resolveDescriptor = body => {
    let fd = body.match(/\/FontDescriptor\s+(\d+) 0 R/)
    if (!fd) {
      const df = body.match(/\/DescendantFonts\s*(?:\[\s*)?(\d+) 0 R/)
      let dBody = df && objects.get(Number(df[1]))
      if (dBody && !/\/FontDescriptor/.test(dBody)) {
        // /DescendantFonts pointed at an array object; hop once more.
        const inner = dBody.match(/(\d+) 0 R/)
        dBody = inner && objects.get(Number(inner[1]))
      }
      fd = dBody && dBody.match(/\/FontDescriptor\s+(\d+) 0 R/)
    }
    return fd ? objects.get(Number(fd[1])) : null
  }
  let boundedChecked = 0
  for (const [num, body] of objects) {
    if (!/\/Type\s*\/Font\b/.test(body)) continue
    // Descendant CIDFonts never carry the CMap — it lives on their Type0
    // parent, which is scanned separately. Everything else (Type0, simple
    // TrueType/Type1) must be identity-resolved BEFORE any CMap look-up, so
    // a bounded face whose CMap was stripped still fails closed.
    if (/\/Subtype\s*\/CIDFontType/.test(body)) continue
    const desc = resolveDescriptor(body)
    const label =
      desc?.match(/\/FontName\s*\/(?:[A-Z]{6}\+)?([A-Za-z0-9\-_.]+)/)?.[1] ??
      body.match(/\/BaseFont\s*\/(?:[A-Z]{6}\+)?([A-Za-z0-9\-_.]+)/)?.[1] ?? ''
    const family = desc?.match(/\/FontFamily\s*\(([^)]*)\)/)?.[1] ?? ''
    const bound = GLYPH_BOUNDS.find(b => b.name.test(label) || (family && family === b.family))
    if (!bound) continue
    boundedChecked++
    const cps = /\/ToUnicode/.test(body) ? toUnicodeCodepoints(body) : null
    if (!cps || cps.size === 0) {
      offenders.add(`${label || bound.family} (obj ${num}): bounded face with missing/empty/undecodable ToUnicode — failing closed`)
      continue
    }
    for (const c of cps) {
      if (c > 0x20 && !bound.allowed.has(c)) {
        offenders.add(`${label || bound.family} carries out-of-bounds U+${c.toString(16).toUpperCase()}`)
      }
    }
  }
  if (offenders.size > 0) {
    console.error(
      `Host-font fallback detected in ${pdfPath}: ${[...offenders].join(', ')}\n` +
      'The PDF is host-dependent. Check scripts/fonts/ subset glyph coverage (D42).'
    )
    process.exit(1)
  }
  console.log(`Font gate passed: ${records} font records, ${boundedChecked} glyph-bounded faces checked, all embedded text fonts are declared brand faces.`)
  console.log(`Wrote ${pdfPath}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
