// brand-conformance-ignore-file all — deliberate fixtures for every violation the checker detects
/**
 * Self-test for public/brand-conformance.mjs.
 *
 * Every case here was a real defect found at a gate, not a hypothetical. The
 * suite exists because the comment scanner was rebuilt four times and each
 * rebuild risked reviving an earlier bypass.
 *
 *   node scripts/conformance-selftest.mjs            run and assert
 *   node scripts/conformance-selftest.mjs --record   print observed results
 *
 * Fixtures are written to a temp directory; nothing is added to the repo tree.
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CHECKER = join(ROOT, 'public', 'brand-conformance.mjs')

const NOUN = 'composable knowledge platform'
const CLAIM = 'compounding intelligence'
const DIRECTIVE = 'brand-conformance-ignore-file'
const NEXTLINE = 'brand-conformance-ignore-next-line'

/**
 * exit  — expected process exit code (0 pass, 1 findings, 2 operational error)
 * rules — rule ids expected in `findings` (exact set, order-insensitive)
 * sup   — expected suppressed count; unjust — expected unjustified count
 */
const CASES = [
  // ---- detection: the three escapes the 2026-08 drift run found in production
  {
    name: 'escape/retired-noun',
    files: { 'a.ts': `const s = "${NOUN}"\n` },
    only: 'category-noun', exit: 1, rules: ['category-noun'],
  },
  {
    name: 'escape/never-use',
    files: { 'a.tsx': '<p>Our AI-powered assistant is revolutionary.</p>\n' },
    only: 'never-use', exit: 1, strict: true, rules: ['never-use', 'never-use'],
  },
  {
    name: 'escape/compounding-without-mechanism',
    files: { 'a.tsx': `<h1>${CLAIM}</h1>\n` },
    only: 'compounding-mechanism', exit: 1, strict: true, rules: ['compounding-mechanism'],
  },

  // ---- correct copy must stay silent
  {
    name: 'clean/mechanism-named',
    files: { 'a.md': `Turns scattered information into ${CLAIM}: every answer carries its provenance and respects per-viewer access.\n` },
    only: 'compounding-mechanism', exit: 0, strict: true, rules: [],
  },
  {
    name: 'clean/prose-mechanism-after-colon',
    files: { 'a.md': `Compounding intelligence grows through provenance: every source stays traceable.\n` },
    only: 'compounding-mechanism', exit: 0, strict: true, rules: [],
  },
  {
    name: 'clean/canonical-name-casings',
    files: { 'a.ts': 'const ok = "Spectrea and spectrea are both canon"\n' },
    only: 'name-misspelling', exit: 0, strict: true, rules: [],
  },

  // ---- the name family: every non-canon casing is caught without a literal
  // for each one, and canon's all-caps never-name keeps its own rule
  {
    name: 'name/internal-caps',
    files: { 'a.ts': 'const n = "SpeCtrea"\n' },
    only: 'name-misspelling', exit: 1, strict: true, rules: ['name-misspelling'],
  },
  {
    name: 'name/all-caps-styling',
    files: { 'a.ts': 'const n = "SPECTREA"\n' },
    only: 'name-styling', exit: 1, strict: true, rules: ['name-styling'],
  },

  // ---- suppression must require a reason
  {
    name: 'suppression/bare-file-level-is-an-error',
    files: { 'a.ts': `// ${DIRECTIVE} category-noun\nconst s = "${NOUN}"\n` },
    only: 'category-noun', exit: 1, rules: [], unjust: 1,
  },
  {
    name: 'suppression/justified-file-level',
    files: { 'a.ts': `// ${DIRECTIVE} category-noun -- quoting the retired noun deliberately\nconst s = "${NOUN}"\n` },
    only: 'category-noun', exit: 0, rules: [], sup: 1,
  },
  {
    name: 'suppression/html-comment-terminator-is-not-a-reason',
    files: { 'a.md': `<!-- ${DIRECTIVE} category-noun -->\n${NOUN}\n` },
    only: 'category-noun', exit: 1, rules: [], unjust: 1,
  },

  // ---- string literals are not comments (gate round 3)
  {
    name: 'bypass/directive-in-string-literal',
    files: { 'a.ts': `const s = "see // ${DIRECTIVE} category-noun -- nope"\nconst t = "${NOUN}"\n` },
    only: 'category-noun', exit: 1, rules: ['category-noun'],
  },
  {
    name: 'bypass/directive-in-string-next-line-form',
    files: { 'a.ts': `const d = "text // ${NEXTLINE} category-noun -- fixture"\nconst x = "${NOUN}"\n` },
    only: 'category-noun', exit: 1, rules: ['category-noun'],
  },
  {
    name: 'bypass/directive-inside-template-literal',
    files: { 'a.ts': `const t = \`\n// ${DIRECTIVE} category-noun -- inside a template\n\`\nconst x = "${NOUN}"\n` },
    only: 'category-noun', exit: 1, rules: ['category-noun'],
  },

  // ---- backtick parity desync (gate round 4): a quoted backtick must not
  // invert scanner state for the rest of the file
  {
    name: 'bypass/quoted-backtick-then-template',
    files: { 'a.ts': `const tick = "\\\`"\nconst template = \`\ntext // ${DIRECTIVE} category-noun -- fixture\n\`\nconst copy = "${NOUN}"\n` },
    only: 'category-noun', exit: 1, rules: ['category-noun'],
  },

  // ---- regex literals (gate round 5): a backtick inside /.../ opened a
  // phantom template that swallowed the rest of the file
  {
    name: 'bypass/regex-holding-a-backtick',
    files: { 'a.js': `const pattern = /\`/\nconst tpl = \`\n// ${DIRECTIVE} category-noun -- bogus\n\`\nconst copy = "${NOUN}"\n` },
    only: 'category-noun', exit: 1, rules: ['category-noun'],
  },
  {
    name: 'clean/comment-after-a-regex-still-suppresses',
    files: { 'a.ts': `const re = /["']/\n// ${DIRECTIVE} category-noun -- real comment after a regex\nconst copy = "${NOUN}"\n` },
    only: 'category-noun', exit: 0, rules: [], sup: 1,
  },
  {
    name: 'clean/division-is-not-a-regex',
    files: { 'a.js': `const r = total / count / 2\nconst copy = "${NOUN}"\n` },
    only: 'category-noun', exit: 1, rules: ['category-noun'],
  },

  // ---- regex after a keyword, not just punctuation (gate round 6)
  {
    name: 'bypass/regex-after-return-keyword',
    files: { 'a.js': `function f() { return /\`/ }\nconst tpl = \`\n// ${DIRECTIVE} category-noun -- bogus\n\`\nconst copy = "${NOUN}"\n` },
    only: 'category-noun', exit: 1, rules: ['category-noun'],
  },
  {
    name: 'clean/keyword-lookalike-is-still-division',
    files: { 'a.js': `const margin = gutter / 2\nconst copy = "${NOUN}"\n` },
    only: 'category-noun', exit: 1, rules: ['category-noun'],
  },

  // ---- quoted sample text in markup (gate round 6)
  {
    name: 'bypass/directive-in-a-markdown-fence',
    files: { 'a.md': `\`\`\`html\n<!-- ${DIRECTIVE} category-noun -- bogus -->\n\`\`\`\n${NOUN}\n` },
    only: 'category-noun', exit: 1, rules: ['category-noun'],
  },
  {
    name: 'bypass/directive-in-a-textarea',
    files: { 'a.html': `<textarea><!-- ${DIRECTIVE} category-noun -- bogus --></textarea>\n<p>${NOUN}</p>\n` },
    only: 'category-noun', exit: 1, rules: ['category-noun'],
  },

  // ---- triple-quoted blocks (gate round 5): Java text blocks read as comments
  {
    name: 'bypass/java-text-block',
    files: { 'B.java': `class A {\n  String example = """\n  // ${DIRECTIVE} category-noun -- bogus\n  """;\n  String copy = "${NOUN}";\n}\n` },
    only: 'category-noun', exit: 1, rules: ['category-noun'],
  },

  // ---- raw text elements (gate round 5): <!-- inside a script string
  {
    name: 'bypass/markup-delimiters-inside-script-string',
    files: { 'c.html': `<html><script>const s = "<!-- ${DIRECTIVE} category-noun -- bogus -->"</script>\n<p>${NOUN}</p></html>\n` },
    only: 'category-noun', exit: 1, rules: ['category-noun'],
  },
  {
    name: 'clean/js-comment-inside-script-still-suppresses',
    files: { 'd.html': `<html><script>\n// ${DIRECTIVE} category-noun -- legitimate reason here\nconst copy = "${NOUN}"\n</script></html>\n` },
    only: 'category-noun', exit: 0, rules: [], sup: 1,
  },
  {
    name: 'clean/ordinary-html-comment-suppresses',
    files: { 'e.html': `<!-- ${DIRECTIVE} category-noun -- legitimate reason here -->\n<p>${NOUN}</p>\n` },
    only: 'category-noun', exit: 0, rules: [], sup: 1,
  },

  // ---- CRLF (gate round 2): block boundaries are '\r\n\r\n', not '\n\n'
  {
    name: 'crlf/compounding-block-boundary',
    files: { 'a.tsx': `const a = { provenance: 1 }\r\n\r\n<h1>${CLAIM}</h1>\r\n` },
    only: 'compounding-mechanism', exit: 1, strict: true, rules: ['compounding-mechanism'],
  },

  // ---- the retired-values register (decision 35b)
  {
    name: 'retired/absolute-url-is-an-error',
    files: { 'a.md': 'The guide lives at matchwise.github.io/spectrea-branding for now.\n' },
    only: 'retired-guide-url-github-pages', exit: 1, rules: ['retired-guide-url-github-pages'],
  },
  {
    name: 'retired/contextual-rgba-is-review-not-error',
    files: { 'a.css': '.ring { box-shadow: 0 0 0 3px rgba(225,144,0,0.7); }\n' },
    only: 'retired-focus-ring-universal-rgba', exit: 0,
    rules: ['retired-focus-ring-universal-rgba'],
  },
  {
    name: 'retired/tone-spectrum-is-case-sensitive',
    files: { 'a.ts': 'const x = tonespectrum // lower-case: a different identifier, not the retired one\n' },
    only: 'retired-tone-spectrum-citation', exit: 0, rules: [],
  },

  // ---- operational failures must exit 2, never a silent pass
  {
    name: 'operational/bare-only-flag-is-an-error',
    files: { 'a.ts': `const s = "${NOUN}"\n` },
    rawArgs: ['--only'], exit: 2,
  },
  {
    name: 'operational/unknown-rule-id-is-an-error',
    files: { 'a.ts': 'const s = "x"\n' },
    rawArgs: ['--only', 'no-such-rule'], exit: 2,
  },
]

function run(dir, c) {
  const args = c.rawArgs
    ? [...c.rawArgs, dir]
    : ['--json', ...(c.only ? ['--only', c.only] : []), ...(c.strict ? ['--strict'] : []), dir]
  try {
    // stderr is captured, not inherited: the operational cases print usage text
    // on purpose and it would otherwise interleave with the pass/fail lines.
    const out = execFileSync(process.execPath, [CHECKER, ...args], {
      encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
    })
    return { code: 0, out }
  } catch (err) {
    return { code: err.status, out: String(err.stdout || '') }
  }
}

const tmp = mkdtempSync(join(tmpdir(), 'spectrea-conformance-'))
const record = process.argv.includes('--record')
let failed = 0

try {
  for (const c of CASES) {
    const dir = join(tmp, c.name.replace(/\W+/g, '-'))
    mkdirSync(dir, { recursive: true })
    for (const [rel, body] of Object.entries(c.files)) {
      mkdirSync(dirname(join(dir, rel)), { recursive: true })
      writeFileSync(join(dir, rel), body)
    }

    const { code, out } = run(dir, c)
    let parsed = null
    try { parsed = JSON.parse(out) } catch { /* exit 2 paths print to stderr */ }
    const rules = parsed ? parsed.findings.map((f) => f.rule).sort() : null
    const sup = parsed ? parsed.suppressed : null
    const unjust = parsed ? parsed.unjustifiedSuppressions : null

    if (record) {
      console.log(`${c.name}\n  exit=${code} rules=${JSON.stringify(rules)} sup=${sup} unjust=${unjust}`)
      continue
    }

    const problems = []
    if (code !== c.exit) problems.push(`exit ${code}, expected ${c.exit}`)
    if (c.rules && JSON.stringify(rules) !== JSON.stringify([...c.rules].sort())) {
      problems.push(`rules ${JSON.stringify(rules)}, expected ${JSON.stringify([...c.rules].sort())}`)
    }
    if (c.sup !== undefined && sup !== c.sup) problems.push(`suppressed ${sup}, expected ${c.sup}`)
    if (c.unjust !== undefined && unjust !== c.unjust) problems.push(`unjustified ${unjust}, expected ${c.unjust}`)

    if (problems.length) { failed++; console.log(`FAIL  ${c.name}\n      ${problems.join('\n      ')}`) }
    else console.log(`ok    ${c.name}`)
  }
} finally {
  rmSync(tmp, { recursive: true, force: true })
}

if (!record) {
  console.log(`\n${CASES.length} cases · ${failed} failed`)
  process.exit(failed ? 1 : 0)
}
