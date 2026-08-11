// ============================================================
// Spectrea brand conformance — ENGINE (source fragment)
//
// This file is NOT canon-derived and NOT standalone: it is concatenated after
// a generated `const RULES = […]` block by scripts/generate-conformance.mjs to
// produce public/brand-conformance.mjs. Read on its own it references an
// undeclared RULES binding; that is expected.
//
// Everything the engine knows about the brand arrives through RULES. Keep it
// that way — a brand fact hard-coded here is a fact that stops tracking canon.
// ============================================================

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve, sep } from 'node:path'

const SEVERITIES = ['error', 'warn', 'review']

// Directories that never contain reviewable brand copy.
const SKIP_DIRS = new Set([
  '.git', 'node_modules', 'dist', 'build', 'out', 'coverage', '.next', '.nuxt',
  '.svelte-kit', '.turbo', '.cache', '.venv', 'venv', '__pycache__', '.runs',
  'vendor', 'target', '.gradle', '.idea', '.vscode', '.pnpm-store',
  '.jest-cache', '.pytest_cache', '.mypy_cache', '.parcel-cache', '.eslintcache',
  'storybook-static', 'playwright-report', 'test-results', '.terraform',
  // Git worktrees are separate checkouts at other commits. Scanning them
  // reports another branch's state as this one's drift — 18 of the 30 findings
  // in a spectrea root scan came from two worktrees.
  '.worktrees', 'worktrees',
])

// The vendored canon snapshot legitimately contains every forbidden phrase —
// the never-use list IS a list of never-use words. Scanning it would report the
// rulebook as a violation of itself. Override with --include-canon.
// AGENTS.md / CLAUDE.md inline the generated brand rulebook, so they quote every
// forbidden example verbatim — five errors per repo, all of them the rulebook
// doing its job.
const CANON_FILENAMES = new Set([
  'brand.ts', 'brand-contract.json', 'brand-agent-rules.md', 'brand-guide.md',
  'brand-checklist.md', 'brand-few-shots.md', 'brand-critical-review.md',
  'llms.txt', 'brand-conformance.mjs', 'illustration-prompt.md',
  'AGENTS.md', 'CLAUDE.md',
])

// A suppression directive only counts inside a comment. Without this, the string
// literal "brand-conformance-ignore-file never-use — x" in ordinary code silently
// waives checking for that file.
// `{` is allowed as a lead-in because a JSX comment is `{/* … */}`, which is the
// only way to comment inside JSX markup — where brand copy actually lives.
const COMMENT_LEAD = /(^|\s|\{)(\/\/|\/\*|\*|<!--|#|;|--)\s*$/

const BINARY_EXT = new Set([
  'png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'ico', 'icns', 'bmp', 'tiff',
  'woff', 'woff2', 'ttf', 'otf', 'eot', 'pdf', 'zip', 'gz', 'tgz', 'br', 'rar',
  '7z', 'mp3', 'mp4', 'wav', 'ogg', 'webm', 'mov', 'avi', 'wasm', 'so', 'dll',
  'dylib', 'exe', 'bin', 'class', 'jar', 'pyc', 'lock', 'snap',
])

const SUPPRESS = /brand-conformance-ignore-next-line\s+([a-z0-9-]+)(?:\s*(?:—|--|:)\s*(.*))?/i

// File-level opt-out. Earns its place: a repo's own brand test legitimately
// enumerates the forbidden vocabulary, and annotating every listed word is
// friction that pushes people to disable the checker instead.
const SUPPRESS_FILE = /brand-conformance-ignore-file\s+([a-z0-9-]+)(?:\s*(?:—|--|:)\s*([^\n]*))?/gi

function parseArgs(argv) {
  const opts = {
    paths: [], json: false, strict: false, strictReview: false,
    includeCanon: false, ignore: [], only: null, quiet: false, help: false,
  }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--json') opts.json = true
    else if (a === '--strict') opts.strict = true
    else if (a === '--strict-review') { opts.strict = true; opts.strictReview = true }
    else if (a === '--include-canon') opts.includeCanon = true
    else if (a === '--quiet') opts.quiet = true
    else if (a === '--help' || a === '-h') opts.help = true
    else if (a === '--ignore') {
      const v = argv[++i]
      if (!v || v.startsWith('-')) throw new Error('--ignore needs a path fragment')
      opts.ignore.push(v)
    } else if (a === '--only') {
      // A bare --only used to yield [], which is truthy, so every rule was
      // filtered out and the run passed having checked nothing.
      const v = argv[++i]
      if (!v || v.startsWith('-')) throw new Error('--only needs at least one rule id')
      opts.only = v.split(',').map((s) => s.trim()).filter(Boolean)
      if (!opts.only.length) throw new Error('--only needs at least one rule id')
    }
    else if (a.startsWith('-')) throw new Error('unknown option: ' + a)
    else opts.paths.push(a)
  }
  if (!opts.paths.length) opts.paths.push('.')
  return opts
}

function usage() {
  return [
    'Spectrea brand conformance checker — enforcing canon v' + RULES_META.version + ' (' + RULES_META.generatedFrom + ')',
    '',
    'Usage: node brand-conformance.mjs [paths...] [options]',
    '',
    '  --json             machine-readable findings on stdout',
    '  --strict           exit non-zero on warn as well as error',
    '  --strict-review    exit non-zero on review findings too (very noisy)',
    '  --only <ids>       comma-separated rule ids to run',
    '  --ignore <frag>    skip paths containing this fragment (repeatable)',
    '  --include-canon    also scan the vendored canon snapshot (normally skipped)',
    '  --quiet            suppress the per-finding listing, print the tally only',
    '',
    'Exit codes: 0 clean · 1 findings at a failing severity · 2 checker error.',
    '',
    'Suppress one line with a comment on the line above it:',
    '    <!-- brand-conformance-ignore-next-line never-use — quoting a competitor -->',
    'Suppress a rule for a whole file with a comment anywhere in it:',
    '    // brand-conformance-ignore-file never-use — this test enumerates the list',
    'A reason is required; a bare suppression is reported as unjustified.',
    '',
    'Severity meanings:',
    '  error   canon forbids this outright and the match is mechanical.',
    '  warn    canon forbids this; check the match is not an incidental substring.',
    '  review  canon forbids it CONDITIONALLY and no checker can judge the',
    '          condition — a human reads these. Never fails the build by default.',
  ].join('\n')
}

function walk(root, opts, out, unreadableDirs) {
  let entries
  // An unreadable DIRECTORY is the same hole as an unreadable file, and a bigger
  // one: swallowing it reported filesScanned: 0 and a clean PASS.
  try { entries = readdirSync(root, { withFileTypes: true }) } catch (err) {
    unreadableDirs.push({ dir: root, reason: err.code || String(err.message) })
    return out
  }
  for (const e of entries) {
    const full = join(root, e.name)
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue
      walk(full, opts, out, unreadableDirs)
    } else if (e.isFile()) {
      if (!opts.includeCanon && CANON_FILENAMES.has(e.name)) continue
      const ext = e.name.includes('.') ? e.name.split('.').pop().toLowerCase() : ''
      if (BINARY_EXT.has(ext)) continue
      if (opts.ignore.some((frag) => full.split(sep).join('/').includes(frag))) continue
      out.push(full)
    }
  }
  return out
}

function collectFiles(opts, unreadableDirs) {
  const files = []
  for (const p of opts.paths) {
    const abs = resolve(p)
    let st
    try { st = statSync(abs) } catch { throw new Error('no such path: ' + p) }
    if (st.isDirectory()) walk(abs, opts, files, unreadableDirs)
    else files.push(abs)
  }
  return files
}

/**
 * Offsets of every line start, computed once per file. Without this, locate()
 * counted newlines from offset 0 for every match — quadratic in file size, and
 * slow enough that a whole-repo scan timed out rather than finishing.
 */
function lineIndex(text) {
  const starts = [0]
  for (let i = 0; i < text.length; i++) if (text.charCodeAt(i) === 10) starts.push(i + 1)
  return starts
}

/** Line/column for a character offset, plus that line's text. O(log n). */
function locate(text, index, starts) {
  const s = starts || lineIndex(text)
  let lo = 0, hi = s.length - 1
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1
    if (s[mid] <= index) lo = mid; else hi = mid - 1
  }
  const lineStart = s[lo]
  let lineEnd = text.indexOf('\n', lineStart)
  if (lineEnd === -1) lineEnd = text.length
  return { line: lo + 1, column: index - lineStart + 1, text: text.slice(lineStart, lineEnd) }
}

/**
 * Is the directive at `index` genuinely in a comment?
 *
 * Two ways this was fooled. A comment lead-in anywhere earlier on the line was
 * enough, so `const s = "see // brand-conformance-ignore-file never-use — x"`
 * counted; and an odd number of quotes before the directive means we are inside
 * a string literal regardless of what precedes it.
 */
const MARKUP_EXT = new Set(['md', 'markdown', 'html', 'htm', 'xml', 'svg', 'vue'])
const CFAMILY_EXT = new Set([
  'js', 'jsx', 'mjs', 'cjs', 'ts', 'tsx', 'mts', 'cts', 'css', 'scss', 'less',
  'java', 'go', 'rs', 'c', 'h', 'cc', 'cpp', 'hpp', 'cs', 'swift', 'kt', 'php',
])
const LINE_COMMENT_START = /^\s*(\/\/|\/\*|\*|<!--|#|;|--)/

/**
 * Mark every character that sits inside a comment.
 *
 * Counting quote or backtick PARITY does not work: one backtick inside an
 * ordinary string (`const tick = "\`"`) inverts the parser's state for the rest
 * of the file and revives every suppression bypass below it. Parity is not
 * lexing, so this scans.
 *
 * It is a scanner, not a lexer, and the difference is load-bearing: single- and
 * double-quoted strings recover at the newline, but template literals and
 * triple-quoted blocks legitimately span lines, so a misread of one of those
 * desynchronizes until its terminator — not until end of line. Regex literals
 * and triple quotes are handled below because both produced real bypasses; the
 * remaining multi-line string forms this does not model (heredocs, raw strings)
 * can still fool it. That residual is covered by reporting every suppression,
 * not by claiming the scanner is complete.
 */
/** Chars after which a `/` begins a regex literal rather than a division. */
const REGEX_PRECEDERS = new Set(['(', ',', '=', ':', '[', '!', '&', '|', '?', '{', '}', ';', '\n', '+', '-', '*', '%', '<', '>', '~', '^'])
/** Keywords after which a `/` is likewise a regex, not a division. */
const REGEX_KEYWORDS = /(?:^|[^\w$])(return|typeof|instanceof|in|of|new|delete|void|throw|case|do|else|yield|await)$/

function cFamilyCommentMask(text) {
  const N = text.length
  const mask = new Uint8Array(N)
  let i = 0
  let lastSignificant = '\n'
  while (i < N) {
    const c = text[i]
    if (c === '/' && text[i + 1] === '/') {
      const e = text.indexOf('\n', i)
      const end = e === -1 ? N : e
      mask.fill(1, i, end); i = end; lastSignificant = '\n'; continue
    }
    if (c === '/' && text[i + 1] === '*') {
      const e = text.indexOf('*/', i + 2)
      const end = e === -1 ? N : e + 2
      mask.fill(1, i, end); i = end; continue
    }
    // A regex literal can hold a backtick (`/\`/`), and skipping it as ordinary
    // text opened a phantom template literal that swallowed the rest of the
    // file. Consume the regex so its contents never change scanner state.
    // Punctuation is not the only regex context — `return /`/` is one too — so
    // the preceding keyword is checked as well.
    if (c === '/' && (REGEX_PRECEDERS.has(lastSignificant) ||
        REGEX_KEYWORDS.test(text.slice(Math.max(0, i - 12), i).trimEnd()))) {
      let j = i + 1
      let cls = false
      while (j < N) {
        const d = text[j]
        if (d === '\\') { j += 2; continue }
        if (d === '\n') break            // not a regex after all — bail
        if (d === '[') cls = true
        else if (d === ']') cls = false
        else if (d === '/' && !cls) { j++; break }
        j++
      }
      i = j; lastSignificant = '/'; continue
    }
    // Triple-quoted blocks: Java text blocks and Python-style strings span
    // lines, and reading them as three ordinary quotes made their contents look
    // like code — so a directive inside one counted as a comment.
    if ((c === '"' || c === "'") && text[i + 1] === c && text[i + 2] === c) {
      const q = c.repeat(3)
      const e = text.indexOf(q, i + 3)
      i = e === -1 ? N : e + 3
      lastSignificant = c
      continue
    }
    if (c === '"' || c === "'" || c === '`') {
      const q = c
      i++
      while (i < N) {
        if (text[i] === '\\') { i += 2; continue }
        if (text[i] === q) { i++; break }
        if (q !== '`' && text[i] === '\n') break // unterminated — recover at EOL
        i++
      }
      lastSignificant = q
      continue
    }
    if (!/\s/.test(c)) lastSignificant = c
    else if (c === '\n') lastSignificant = '\n'
    i++
  }
  return mask
}

/**
 * `<script>` and `<style>` hold raw text, not markup: an `<!--` inside a JS
 * string there is a string, not a comment. Locate those spans first so the
 * markup scan can step over them.
 */
const RAW_TEXT_OPEN = /<(script|style|textarea)\b[^>]*>/gi

/** Fenced code blocks in Markdown are quoted samples, not markup. */
function fencedSpans(text) {
  const spans = []
  const fence = /^[ \t]*(`{3,}|~{3,})[^\n]*$/gm
  let open = null
  let m
  while ((m = fence.exec(text)) !== null) {
    if (!open) open = { start: m.index, marker: m[1][0], len: m[1].length }
    else if (m[1][0] === open.marker && m[1].length >= open.len) {
      spans.push([open.start, m.index + m[0].length]); open = null
    }
  }
  if (open) spans.push([open.start, text.length]) // unclosed fence runs to EOF
  return spans
}

function rawTextSpans(text) {
  const spans = []
  RAW_TEXT_OPEN.lastIndex = 0
  let m
  while ((m = RAW_TEXT_OPEN.exec(text)) !== null) {
    const inner = m.index + m[0].length
    const close = text.toLowerCase().indexOf(`</${m[1].toLowerCase()}`, inner)
    const end = close === -1 ? text.length : close
    spans.push([inner, end, m[1].toLowerCase()])
    RAW_TEXT_OPEN.lastIndex = end
  }
  return spans
}

/** Markup knows exactly one comment form, and quotes inside it are irrelevant. */
function markupCommentMask(text, isMarkdown) {
  const mask = new Uint8Array(text.length)
  // A fenced block and a <textarea> both hold quoted sample text: an `<!--`
  // there is something being shown, not a comment being written.
  const fences = isMarkdown ? fencedSpans(text) : []
  const inFence = (i) => fences.some(([s, e]) => i >= s && i < e)
  const raw = rawTextSpans(text).filter(([s]) => !inFence(s))
  const quoted = [...raw, ...fences]
  const inQuoted = (i) => quoted.some(([s, e]) => i >= s && i < e)
  let i = 0
  for (;;) {
    const s = text.indexOf('<!--', i)
    if (s === -1) break
    if (inQuoted(s)) { i = s + 4; continue }
    const e = text.indexOf('-->', s + 4)
    const end = e === -1 ? text.length : e + 3
    mask.fill(1, s, end)
    i = end
  }
  // Script and style bodies are their own language — scan them for real comments
  // so a directive in an inline `//` comment still works. Textarea is not: its
  // content is literal text, where `//` means nothing.
  for (const [s, e, tag] of raw) {
    if (tag === 'textarea') continue
    const sub = cFamilyCommentMask(text.slice(s, e))
    for (let k = 0; k < sub.length; k++) if (sub[k]) mask[s + k] = 1
  }
  return mask
}

function commentMask(text, rel) {
  const ext = rel.includes('.') ? rel.split('.').pop().toLowerCase() : ''
  if (MARKUP_EXT.has(ext)) return markupCommentMask(text, ext === 'md' || ext === 'markdown')
  if (CFAMILY_EXT.has(ext)) return cFamilyCommentMask(text)
  return null // unknown language: fall back to the line-shape rule below
}

/**
 * Is the directive at `index` genuinely in a comment? For languages we scan,
 * ask the mask. For everything else, require the directive's own line to BEGIN
 * with a comment opener — conservative, and immune to desynchronization because
 * it never carries state across lines.
 */
function inComment(text, index, mask) {
  if (mask) return mask[index] === 1
  const lineStart = text.lastIndexOf('\n', index - 1) + 1
  let lineEnd = text.indexOf('\n', lineStart)
  if (lineEnd === -1) lineEnd = text.length
  return LINE_COMMENT_START.test(text.slice(lineStart, lineEnd))
}

/**
 * Remove comment terminators before the directive parser sees them. `-->` ends
 * an HTML comment, but its `--` also reads as the reason separator, so a bare
 * `<!-- … ignore-file category-noun -->` parsed as reason `">"` — justified.
 */
const stripTerminators = (s) => s.replace(/(-->|\*\/|\*\}|\}\s*$)/g, ' ')

/** File-level opt-outs, collected once before any rule runs. */
function fileSuppressionsIn(text, mask) {
  const map = new Map()
  const starts = lineIndex(text)
  // Parse line by line with terminators already stripped, so `-->` cannot be
  // read as a separator plus a reason of ">".
  for (let i = 0; i < starts.length; i++) {
    const lineStart = starts[i]
    let lineEnd = text.indexOf('\n', lineStart)
    if (lineEnd === -1) lineEnd = text.length
    const raw = text.slice(lineStart, lineEnd)
    if (!raw.includes('brand-conformance-ignore-file')) continue
    const line = stripTerminators(raw)
    const re = new RegExp(SUPPRESS_FILE.source, 'i')
    const fm = re.exec(line)
    if (!fm) continue
    if (!inComment(text, lineStart + fm.index, mask)) continue
    map.set(fm[1].toLowerCase(), { reason: (fm[2] || '').trim(), line: i + 1 })
  }
  return map
}

/**
 * The suppression (if any) declared on the line above `line`.
 * `text` and `starts` are needed because the comment test must see the whole
 * file — a template literal opened earlier makes this line code, not a comment.
 */
function suppressionFor(text, starts, lines, line, mask) {
  const raw = lines[line - 2]
  if (!raw) return null
  // Strip the comment terminator BEFORE parsing. In "<!-- … never-use -->" the
  // "--" of "-->" otherwise reads as the reason separator and ">" as the reason,
  // so a bare suppression would pass as a justified one.
  const prev = raw.replace(/(-->|\*\/|\*}|}\s*$)/g, ' ')
  const m = SUPPRESS.exec(prev)
  if (!m) return null
  // Absolute offset of the directive, so inComment can look at the whole file.
  if (!inComment(text, starts[line - 2] + m.index, mask)) return null
  return { ruleId: m[1], reason: (m[2] || '').trim() }
}

function scanFile(text, rel, opts, mask) {
  if (text.includes('\u0000')) return []
  const lines = text.split('\n')
  const starts = lineIndex(text)
  const findings = []
  const fileSuppressed = fileSuppressionsIn(text, mask)

  for (const rule of RULES) {
    if (opts.only && !opts.only.includes(rule.id)) continue
    const fs = fileSuppressed.get(rule.id) || fileSuppressed.get('all')
    if (fs) {
      // One entry for the whole file, not one per match — the point is to keep
      // the report readable while still showing that coverage was waived.
      // Every pattern must be tested: a rule may carry a case-sensitive and a
      // case-insensitive one, and checking only the first let a bare suppression
      // on a second-pattern match escape the reason requirement entirely.
      const hit = rule.patterns.some((p) => {
        const re = new RegExp(p.source, p.flags)
        let mm
        while ((mm = re.exec(text)) !== null) {
          if (mm[0].length === 0) { re.lastIndex++; continue }
          if (rule.excludeMatches && rule.excludeMatches.includes(mm[0])) continue
          return true
        }
        return false
      })
      if (hit) {
        findings.push({
          rule: rule.id, severity: rule.severity, file: rel, line: fs.line, column: 1,
          match: '(whole file)', lineText: '', canon: rule.canon, note: rule.note,
          condition: null, suppressed: true, suppressionReason: fs.reason,
          unjustifiedSuppression: !fs.reason, fileLevel: true,
        })
      }
      continue
    }
    for (const p of rule.patterns) {
      const re = new RegExp(p.source, p.flags)
      let m
      while ((m = re.exec(text)) !== null) {
        if (m[0].length === 0) { re.lastIndex++; continue }
        // A rule may match a family and exempt its canonical members — the
        // internal-caps rule matches every casing of the name and exempts the
        // three canon allows, so an unlisted internal-caps spelling is caught
        // without needing a literal for it. (No example here on purpose: this
        // file is scanned like any other, and one would be a real finding.)
        if (rule.excludeMatches && rule.excludeMatches.includes(m[0])) continue
        const loc = locate(text, m.index, starts)
        const sup = suppressionFor(text, starts, lines, loc.line, mask)
        const suppressed = sup && (sup.ruleId === rule.id || sup.ruleId === 'all')
        findings.push({
          rule: rule.id,
          severity: rule.severity,
          file: rel,
          line: loc.line,
          column: loc.column,
          match: m[0].replace(/\s+/g, ' '),
          lineText: loc.text.trim().slice(0, 160),
          canon: rule.canon,
          note: rule.note,
          condition: (rule.conditionByPhrase && rule.conditionByPhrase[m[0].toLowerCase().replace(/\s+/g, ' ')]) || rule.condition || null,
          suppressed: Boolean(suppressed),
          suppressionReason: suppressed ? sup.reason : null,
          unjustifiedSuppression: Boolean(suppressed && !sup.reason),
        })
      }
    }
  }
  return findings
}

/**
 * guardrails.compoundingClaim is a proximity rule, not a phrase ban: the claim
 * is allowed, unnamed mechanism is not. Report claims with no mechanism word
 * inside the window. Heuristic by construction — hence severity `review`.
 */
function scanCompounding(text, rel, opts, mask) {
  if (!COMPOUNDING) return []
  if (opts.only && !opts.only.includes(COMPOUNDING.id)) return []
  const lines = text.split('\n')
  const starts = lineIndex(text)
  const fileSup = fileSuppressionsIn(text, mask)
  const fs = fileSup.get(COMPOUNDING.id) || fileSup.get('all')
  const claim = new RegExp(COMPOUNDING.claim.source, COMPOUNDING.claim.flags)
  const mech = new RegExp(COMPOUNDING.mechanism.source, COMPOUNDING.mechanism.flags)
  const out = []
  let m
  while ((m = claim.exec(text)) !== null) {
    if (m[0].length === 0) { claim.lastIndex++; continue }
    // The window stops at a blank line in either direction. A character count
    // alone let an unrelated internal "provenance" field satisfy the guardrail
    // for a public tagline several elements away — a false negative on exactly
    // the claim this rule exists to police.
    // A literal '\n\n' test missed CRLF files entirely (they use \r\n\r\n) and
    // treated a whitespace-only line as content, so the whole file collapsed
    // into one block and any distant mechanism word satisfied the guardrail.
    const blockStart = (() => {
      const floor = Math.max(0, m.index - COMPOUNDING.window)
      const before = text.slice(floor, m.index)
      const i = before.search(/(?:\r?\n[ \t]*)+\r?\n(?![\s\S]*(?:\r?\n[ \t]*)+\r?\n)/)
      return i === -1 ? floor : floor + i + before.slice(i).match(/^(?:\r?\n[ \t]*)+\r?\n/)[0].length
    })()
    const blockEnd = (() => {
      const cap = Math.min(text.length, m.index + m[0].length + COMPOUNDING.window)
      const after = text.slice(m.index, cap)
      const i = after.search(/(?:\r?\n[ \t]*)+\r?\n/)
      return i === -1 ? cap : m.index + i
    })()
    // Plain presence in the block. An earlier revision tried to tell a prose
    // mechanism from a code identifier by looking at adjacent punctuation, and
    // it failed in BOTH directions: `const x = "provenance"` and `{ provenance }`
    // still read as prose, while genuine copy — "…grows through provenance:
    // every source stays traceable" — was rejected because of its colon. A rule
    // that flags correct brand writing costs more trust than one that
    // occasionally misses, so the heuristic is gone and the residual false
    // negative is declared in the generated header instead.
    const block = text.slice(blockStart, blockEnd)
    mech.lastIndex = 0
    if (mech.test(block)) continue
    const loc = locate(text, m.index, starts)
    const sup = fs || suppressionFor(text, starts, lines, loc.line, mask)
    const suppressed = Boolean(fs) ||
      Boolean(sup && (sup.ruleId === COMPOUNDING.id || sup.ruleId === 'all'))
    out.push({
      rule: COMPOUNDING.id,
      severity: COMPOUNDING.severity,
      file: rel,
      // A file-level waiver is reported at the DIRECTIVE, not at the claim it
      // silenced — CI needs the line it has to go and edit.
      line: fs ? fs.line : loc.line,
      column: fs ? 1 : loc.column,
      fileLevel: Boolean(fs),
      match: fs ? '(whole file)' : m[0].replace(/\s+/g, ' '),
      lineText: loc.text.trim().slice(0, 160),
      canon: COMPOUNDING.canon,
      note: COMPOUNDING.note,
      condition: 'No mechanism named in the same block (within ' + COMPOUNDING.window + ' characters, not crossing a blank line).',
      suppressed,
      suppressionReason: suppressed ? sup.reason : null,
      unjustifiedSuppression: Boolean(suppressed && !sup.reason),
    })
  }
  return out
}

function main() {
  let opts
  try { opts = parseArgs(process.argv.slice(2)) } catch (err) {
    process.stderr.write(String(err.message) + '\n'); process.exit(2)
  }
  if (opts.help) { process.stdout.write(usage() + '\n'); process.exit(0) }

  if (opts.only) {
    const known = new Set(RULES.map((r) => r.id).concat(COMPOUNDING ? [COMPOUNDING.id] : []))
    const bad = opts.only.filter((id) => !known.has(id))
    if (bad.length) {
      process.stderr.write('unknown rule id(s): ' + bad.join(', ') + '\nknown: ' + [...known].join(', ') + '\n')
      process.exit(2)
    }
  }

  const cwd = process.cwd()
  let files
  const unreadableDirs = []
  try { files = collectFiles(opts, unreadableDirs) } catch (err) {
    process.stderr.write(String(err.message) + '\n'); process.exit(2)
  }

  // Read once per file. A file we cannot read is a hole in coverage, not a pass:
  // silently swallowing the error let an unreadable file count as scanned and
  // clean.
  let all = []
  const unreadable = []
  for (const f of files) {
    const rel = relative(cwd, f).split(sep).join('/')
    let text
    try { text = readFileSync(f, 'utf8') } catch (err) {
      unreadable.push({ file: rel, reason: err.code || String(err.message) })
      continue
    }
    if (text.includes('\u0000')) continue // binary past the extension filter
    const mask = commentMask(text, rel)
    all = all.concat(scanFile(text, rel, opts, mask))
    all = all.concat(scanCompounding(text, rel, opts, mask))
  }
  if (unreadable.length || unreadableDirs.length) {
    const lines = ['checker error — part of the tree could not be read, so it was NOT checked:']
    for (const u of unreadableDirs) lines.push('  ' + relative(cwd, u.dir).split(sep).join('/') + '/  (directory, ' + u.reason + ')')
    for (const u of unreadable) lines.push('  ' + u.file + '  (' + u.reason + ')')
    process.stderr.write(lines.join('\n') + '\n')
    process.exit(2)
  }
  all.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line || a.column - b.column)

  const live = all.filter((f) => !f.suppressed)
  const suppressed = all.filter((f) => f.suppressed)
  const unjustified = suppressed.filter((f) => f.unjustifiedSuppression)
  const tally = {}
  for (const s of SEVERITIES) tally[s] = live.filter((f) => f.severity === s).length

  const failing = new Set(['error'])
  if (opts.strict) failing.add('warn')
  if (opts.strictReview) failing.add('review')
  const failures = live.filter((f) => failing.has(f.severity)).length + unjustified.length

  if (opts.json) {
    process.stdout.write(JSON.stringify({
      canonVersion: RULES_META.version,
      generatedFrom: RULES_META.generatedFrom,
      filesScanned: files.length,
      tally,
      suppressed: suppressed.length,
      unjustifiedSuppressions: unjustified.length,
      failures,
      findings: live,
      // Unjustified suppressions exit non-zero, so CI needs their locations to
      // act on them — reporting only a count made the failure unactionable.
      unjustifiedSuppressionDetails: unjustified.map((f) => ({
        file: f.file, line: f.line, rule: f.rule, fileLevel: Boolean(f.fileLevel),
      })),
      // Every silenced finding is reported. The comment scanner is best-effort
      // across languages it does not fully lex, so the guarantee that matters is
      // that nothing is silenced invisibly — not that no text can ever silence.
      suppressedDetails: suppressed.map((f) => ({
        file: f.file, line: f.line, rule: f.rule, match: f.match,
        reason: f.suppressionReason, fileLevel: Boolean(f.fileLevel),
      })),
    }, null, 2) + '\n')
    process.exit(failures ? 1 : 0)
  }

  const lines = []
  if (!opts.quiet) {
    let lastFile = null
    for (const f of live) {
      if (f.file !== lastFile) { lines.push(''); lines.push(f.file); lastFile = f.file }
      lines.push(
        '  ' + String(f.line) + ':' + String(f.column) + '  ' + f.severity.padEnd(6) +
        '  ' + f.rule + '  "' + f.match + '"'
      )
      lines.push('        ' + f.note + (f.condition ? '  [' + f.condition + ']' : ''))
      lines.push('        canon: ' + f.canon)
    }
    for (const f of unjustified) {
      if (f.file !== lastFile) { lines.push(''); lines.push(f.file); lastFile = f.file }
      lines.push('  ' + String(f.line) + ':1  error   unjustified-suppression  ' + f.rule)
      lines.push('        A suppression must state its reason: add "— why" after the rule id.')
    }
    // Silenced findings are printed, not just counted. The scanner cannot prove
    // a directive is a real comment in every language, so the durable safeguard
    // is that every suppression is visible in the run that honoured it.
    const justified = suppressed.filter((f) => !f.unjustifiedSuppression)
    if (justified.length) {
      lines.push('')
      lines.push('Suppressed (' + justified.length + ') — review these; a directive in data or fixture text still counts:')
      for (const f of justified) {
        lines.push(
          '  ' + f.file + ':' + String(f.line) + '  ' + f.rule +
          (f.fileLevel ? '  [file]' : '') + '  — ' + (f.suppressionReason || '')
        )
      }
    }
  }

  lines.push('')
  lines.push(
    'Spectrea conformance · canon v' + RULES_META.version + ' · ' + files.length +
    (files.length === 1 ? ' file · ' : ' files · ') +
    (tally.error + unjustified.length) + ' error, ' + tally.warn + ' warn, ' + tally.review + ' review' +
    (suppressed.length ? ' · ' + suppressed.length + ' suppressed' : '')
  )
  if (!opts.strict && tally.warn) lines.push('(warn findings do not fail the build; use --strict to enforce them)')
  if (tally.review) lines.push('(review findings are conditional rules a checker cannot judge — read them by hand)')
  lines.push(failures
    ? 'FAIL — ' + failures + (failures === 1 ? ' finding' : ' findings') + ' at a failing severity.'
    : 'PASS')
  process.stdout.write(lines.join('\n') + '\n')
  process.exit(failures ? 1 : 0)
}

main()
