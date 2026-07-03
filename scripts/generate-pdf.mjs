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
  p { margin: 0 0 10pt; }
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
    page-break-inside: avoid;
  }
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
function buildFontFaceCss() {
  const fontDir = resolve(root, 'scripts', 'fonts')
  const faces = [
    { family: 'Albert Sans',    weight: 600, file: 'i7dOIFdwYjGaAMFtZd_QA1ZbYFc.woff2' },
    { family: 'Albert Sans',    weight: 700, file: 'i7dOIFdwYjGaAMFtZd_QA1ZbYFc.woff2' },
    { family: 'Lexend',         weight: 400, file: 'wlpwgwvFAVdoq2_v-6QU.woff2' },
    { family: 'Lexend',         weight: 500, file: 'wlpwgwvFAVdoq2_v-6QU.woff2' },
    { family: 'JetBrains Mono', weight: 400, file: 'tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff2' },
  ]
  const blocks = faces.map(({ family, weight, file }) => {
    const path = resolve(fontDir, file)
    let data
    try { data = readFileSync(path) } catch { return null }
    const b64 = data.toString('base64')
    return `@font-face {
  font-family: '${family}';
  font-style: normal;
  font-weight: ${weight};
  font-display: block;
  src: url(data:font/woff2;base64,${b64}) format('woff2');
}`
  }).filter(Boolean)
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
      console.warn(`Could not inline ${relPath}: ${err.message}`)
      return match
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
  console.log(`Wrote ${pdfPath}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
