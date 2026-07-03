# codex-W2 findings - consistency-drift

Scope followed: `brief-worker-drift.md`; role `worker`; two investigation passes; no git; no writes outside this file. PDF line numbers below are `pypdf` extracted-text lines because the PDF has no source line numbers.

## Findings

### DR-1 | high | Source-of-truth authority conflicts across canonical surfaces

Surfaces + quoted values:
- `src/data/brand.ts:2` - `// Spectrea Brand Data - Single source of truth`
- `public/brand-guide.md:813` - `The live app at [spectrea.com/brand](/) is the canonical source of truth ... If the two ever disagree, the app wins.`
- `public/llms.txt:19` - `Offline mirror of the live app. The live app at [/](/) is canonical; this Markdown exists for LLM-readable and print use.`

Canonical value: per worker brief scope, `src/data/brand.ts` is canonical; app, Markdown, PDF, llms.txt, and assets should be derived/mirrors unless explicitly unique.

Draft amendment: replace guide/llms "app wins" language with "brand.ts is the canonical data source; the app renders/extends it; Markdown/PDF/llms/assets are generated or audited mirrors." Add generation ownership to make this true.

### DR-2 | critical | PDF is stale and still contains the pre-ratified category noun

Surfaces + quoted values:
- `src/data/brand.ts:34` - `category: 'Composable intelligence platform',`
- `public/brand-guide.md:3` - `The complete brand system for Spectrea - a composable intelligence platform...`
- `public/brand-guide.md:8` - `**Category:** Composable intelligence platform.`
- `public/llms.txt:82` - `**Category:** Composable intelligence platform.`
- `public/brand-guide.pdf:pypdf-line 2` - `The complete brand system for Spectrea - a composable knowledge platform that`
- `public/brand-guide.pdf:pypdf-line 21` - `Category: Composable knowledge platform.`
- `public/brand-guide.pdf:pypdf-line 825` - `Bio template: "We connect the dots. Composable knowledge platform."`
- `public/brand-guide.pdf:pypdf-line 974` - `Spectrea Brand Guide - Generated from /public/brand-guide.md - 2026-04-19`
- `scripts/generate-pdf.mjs:32` - `const mdPath = join(root, 'public', 'brand-guide.md')`
- `scripts/generate-pdf.mjs:33` - `const pdfPath = join(root, 'public', 'brand-guide.pdf')`
- `scripts/generate-pdf.mjs:280` - `Generated from /public/brand-guide.md - ${new Date().toISOString().slice(0, 10)}`
- `.github/workflows/deploy.yml:27` - `- run: npm run build`
- `.github/workflows/deploy.yml:30` - `path: dist`

Canonical value: `Composable intelligence platform`; the PDF must mirror current `public/brand-guide.md` after content changes. Current filesystem metadata also shows `brand-guide.md` updated 2026-07-03 17:18:27 +08:00 while `brand-guide.pdf` is 2026-06-14 15:16:49 +08:00; embedded PDF text says generated 2026-04-19.

Draft amendment: regenerate `public/brand-guide.pdf` from current Markdown, then make deploy or CI run `npm run generate:all` before `npm run build`, or fail if generated artifacts are older than their sources.

### DR-3 | high | Stale "Knowledge, connected." survives in generated typography and social templates

Surfaces + quoted values:
- `src/data/brand.ts:34` - `category: 'Composable intelligence platform',`
- `src/data/brand.ts:36` - `Turns scattered information into compounding intelligence`
- `public/brand-guide.md:651` - `**Bio template:** "We connect the dots. Composable intelligence platform."`
- `src/pages/communications/Social.tsx:26` - `bio: 'We connect the dots. Composable intelligence platform.'`
- `src/pages/communications/Social.tsx:27` - `bio: 'We connect the dots. Knowledge, connected.'`
- `scripts/generate-brand-assets.mjs:518` - `<text ...>Knowledge, connected.</text>`
- `public/brand-assets/type-samples.svg:7` - `<text ...>Knowledge, connected.</text>`
- `public/brand-guide.pdf:pypdf-line 594` - `Knowledge, connected.`

Canonical value: social bios and typography specimens should use the ratified intelligence/category language or the primary tagline. "Knowledge, connected." is a stale noun-form unless deliberately kept as a separate phrase, which no canonical surface states.

Draft amendment: change Twitter/X bio to `We connect the dots. Composable intelligence platform.` or `Turns scattered information into compounding intelligence.` Replace the type specimen phrase in the asset generator, then regenerate `type-samples.svg` and the PDF.

### DR-4 | high | Totalizing/unfalsifiable claims remain after the 2026-07-03 de-totalization

Surfaces + quoted values:
- `docs/brand-audit-2026-07/brief-worker-drift.md:26` - `de-totalized "incomparably better than the first" ->`
- `docs/brand-audit-2026-07/brief-worker-drift.md:27` - `"measurably better" + testability. brand.ts still says "incomparably"...`
- `..\..\..\spectrea\docs\00-overview\spectrea-vision.md:285` - `The second year of Spectrea is measurably better than the first because EVALUATE ran continuously - and EVALUATE itself must make that claim testable...`
- `..\..\..\spectrea\docs\superpowers\specs\audit\vision-market\decisions.md:104` - `incomparably better than the first ... totalizing/non-measurable phrasing`
- `src/data/brand.ts:62` - `Your second year is incomparably better than your first.`
- `src/data/brand.ts:149` - `Your second year is incomparably better than your first.`
- `public/brand-guide.md:35` - `Your second year is incomparably better than your first.`
- `src/pages/typography/TypeScale.tsx:130` - `Your second year is incomparably better.`
- `public/brand-guide.pdf:pypdf-line 32` - `incomparably better than your first.`
- `src/data/brand.ts:159` - `The floor is high, the ceiling is infinite.`
- `public/brand-guide.md:76` - `Floor high, ceiling infinite.`
- `public/brand-guide.pdf:pypdf-line 104` - `Floor high, ceiling infinite.`
- Additional totalizing claim patterns that should be reviewed under the same rule:
  - `public/brand-guide.md:11` / `public/llms.txt:5` - `Everything you know, in one living view`
  - `src/data/brand.ts:56` - `everything you see... You can always see...`
  - `src/data/brand.ts:144` - `Everything you see... Every action... Every connection...`
  - `src/data/brand.ts:145` - `Every piece... Confidence levels are visible, never hidden. Every change... AI actions are always...`
  - `src/data/brand.ts:180` - `You can always ask "why?" and get an answer. Every recommendation...`
  - `src/data/brand.ts:239` / `src/data/brand.ts:241` - `everything you see... every connection...`
  - `src/pages/communications/Copy.tsx:110` - `everything you see is transparent, every connection inspectable...`
  - `src/pages/communications/Copy.tsx:111` - `everything is transparent, every connection can be followed back...`

Canonical value: use the ratified testable language: `measurably better than the first`, with the measurement mechanism or falsifier named where the claim bears product/vision weight.

Draft amendment: replace all `incomparably` strings with the measurable/testable formulation; replace `ceiling infinite` with a bounded capability claim; run a copy pass on `everything/every/always/never` claims to keep prescriptive rules where appropriate and make product promises falsifiable.

### DR-5 | medium | Never-use vocabulary list is truncated in the guide and absent from llms key facts

Surfaces + quoted values:
- `src/data/brand.ts:332` - `neverUse: [`
- `src/data/brand.ts:333` - `'AI-powered (overused)', 'next-gen', 'state-of-the-art', 'world-class',`
- `src/data/brand.ts:334` - `'breakthrough', 'unprecedented', 'game-changer', 'revolutionary',`
- `src/data/brand.ts:335` - `'seamless', 'cutting-edge', 'synergy', 'leverage (as verb)',`
- `public/brand-guide.md:125` - `**Words we never use:** AI-powered (overused), next-gen, state-of-the-art, world-class, breakthrough, unprecedented, game-changer, revolutionary.`
- `public/llms.txt:94` - `**Privileged vocabulary (v2, 12 brand-evocative words):** ...` with no paired never-use list in `llms.txt:77-97` key facts.

Canonical value: the 12-item `voice.neverUse` array in `brand.ts`.

Draft amendment: generate the guide and llms never-use lists from `voice.neverUse`, or add the four missing guide terms and a full llms quick-facts entry manually until generation exists.

### DR-6 | medium | Naming "Never" rules diverge between guide, llms, and the naming page

Surfaces + quoted values:
- `public/brand-guide.md:139` - `**Never:** "SpectreAI", "Spectrea AI" (lead), "spectra" (missing e).`
- `public/llms.txt:79` - `**Name:** Spectrea (not "Spectre", "Spectra", or "SpectreAI").`
- `src/pages/foundation/Naming.tsx:12` - `incorrect: [`
- `src/pages/foundation/Naming.tsx:13` - `'SPECTREA (all caps in body text)',`
- `src/pages/foundation/Naming.tsx:16` - `'Spectrea's AI-powered... (avoid hype terms)',`
- `src/pages/foundation/Naming.tsx:17` - `'SpeCTReA (random capitalization)',`

Canonical value: per guide and worker brief, never lead with `Spectrea AI`; never use `SpectreAI`; never typo `spectra` for the brand name. Etymology can still mention Latin `spectra`.

Draft amendment: update `llms.txt` and the Naming page examples to include exactly the same forbidden forms, and decide whether `Spectre`/`Spectra` are additional formal never-use cases or remove them from llms.

### DR-7 | medium | Personality count says "five" in the app while canonical data has four traits

Surfaces + quoted values:
- `src/data/brand.ts:108` - `personality: [`
- `src/data/brand.ts:110` - `trait: 'Warm',`
- `src/data/brand.ts:115` - `trait: 'Perceptive',`
- `src/data/brand.ts:120` - `trait: 'Grounded',`
- `src/data/brand.ts:125` - `trait: 'Adaptive',`
- `public/llms.txt:92` - `**Personality (v2, 4 traits):** Warm - Perceptive - Grounded - Adaptive`
- `src/pages/foundation/Voice.tsx:50` - `Spectrea's voice is the verbal expression of its five personality traits.`

Canonical value: four traits: Warm, Perceptive, Grounded, Adaptive.

Draft amendment: replace the hardcoded `five` with `brand.personality.length` or the literal `four`.

### DR-8 | high | Logo lockup rules prohibit full-spectrum lockups, but component/app/generator allow them

Surfaces + quoted values:
- `public/brand-guide.md:176` - `**Gradient lockup** - LogotypeGradient component... two-tone Cool Duet...`
- `public/brand-guide.md:177` - `**Mono lockup** - Logotype component.`
- `public/brand-guide.md:183` - `No gradient-filled wordmark, no full-spectrum lockup... Duets (Balanced / Warm) belong to the static mark only; they are not lockup options.`
- `public/llms.txt:28` - `logo-lockup-gradient.svg: Gradient lockup - 2-stop Cool Duet...`
- `public/llms.txt:29` - `logo-lockup-ink.svg: Mono ink lockup.`
- `public/llms.txt:30` - `logo-lockup-white.svg: Mono white lockup on Ink.`
- `src/components/brand/SpectreaLogo.tsx:476` - `Colour mode for the gradient mark. Default 'cool'`
- `src/components/brand/SpectreaLogo.tsx:477` - `Pass 'color' for full spectrum (Cobalt -> Teal -> Amber).`
- `src/pages/logo/LogoExploration.tsx:157` - `note: 'Full spectrum mark with white wordmark. Use on dark or photographic surfaces.'`
- `src/pages/logo/LogoExploration.tsx:386` - `// Full-spectrum lockup wordmark: Ink on light surfaces, White on Ink.`
- `scripts/generate-brand-assets.mjs:334` - `// Full spectrum style - Cool Duet mark + white wordmark, transparent background.`
- `scripts/generate-brand-assets.mjs:336` - `await writeFile(resolve(outDir, 'logo-lockup-spectrum-white.svg'), renderLockup({`

Canonical value: approved lockups are Cool Duet `LogotypeGradient` and mono `Logotype`; no full-spectrum lockup.

Draft amendment: remove full-spectrum lockup option from `LogoExploration`, narrow `LogotypeGradient` API or docs so lockup mark mode is Cool Duet only, and delete `logo-lockup-spectrum-white.svg` generation unless Darren explicitly re-approves a third lockup.

### DR-9 | medium | Button/dark interaction colors are hand-invented outside canonical tokens

Surfaces + quoted values:
- `src/data/brand.ts:423` - `colors: [`
- `src/data/brand.ts:436` - `gradient: { from: '#4271DF', via: '#00B6A0', to: '#E19000', angle: 135 },`
- `src/data/brand.ts:437` - `darkMode: { bg: '#18181C', surface: '#212226', text: '#F4F4F1', muted: '#B0B0B6', border: '#2E2F35' },`
- `src/index.css:9` - `--color-brand: #4271DF;`
- `src/index.css:10` - `--color-brand-hover: #3A63C4;`
- `src/index.css:11` - `--color-brand-active: #3255A7;`
- `public/brand-guide.md:611` - `Primary (Cobalt) ... #4271DF, white text; hover #3A63C4; active #3255A7.`
- `src/pages/components/Buttons.tsx:52` - `brand: { light: { base: '#4271DF', hover: '#3A63C4', active: '#3255A7' }, dark: { base: '#4271DF', hover: '#5C87E5', active: '#7699EB' } },`
- `src/pages/components/Buttons.tsx:53` - `rose... dark: { base: '#F24260', hover: '#F56579', active: '#F78892' }`
- `src/pages/components/Buttons.tsx:54` - `teal... dark: { base: '#00B6A0', hover: '#20C8B2', active: '#40D4C3' }`
- `src/pages/components/Buttons.tsx:55` - `amber... dark: { base: '#E19000', hover: '#ECA41E', active: '#F2B63C' }`
- `src/pages/components/Buttons.tsx:207` - `hover: '#3A63C4 / #5C87E5'`

Canonical value: light button state colors are specified in guide/CSS; dark button state colors are not canonical anywhere except this component. Extended tokens (dark washes/lifts) also live in CSS/guide but not in `brand.ts`.

Draft amendment: add a structured token set to `brand.ts` for base/hover/active by color and mode, plus washes/lifts, then derive CSS, guide snippets, button demos, and asset generator constants from it. Until then, remove or label the dark hover/active values as exploratory.

### DR-10 | low | Type scale generator/output omits sizes present in live TypeScale and guide

Surfaces + quoted values:
- `src/pages/typography/TypeScale.tsx:13` - `H4 ... 20 ... lineHeight: '1.4'`
- `src/pages/typography/TypeScale.tsx:14` - `H5 ... 18 ... lineHeight: '1.4'`
- `src/pages/typography/TypeScale.tsx:21` - `Code SM ... 12 ... lineHeight: '1.5'`
- `public/brand-guide.md:474` - `| H4 | 20 px | 1.4 | 600 | Minor headings, dialog titles |`
- `public/brand-guide.md:475` - `| H5 | 18 px | 1.4 | 600 | Sidebar section titles |`
- `scripts/generate-brand-assets.mjs:543` - `Heading 3`
- `scripts/generate-brand-assets.mjs:546` - `Body Large - leading paragraphs`
- `public/brand-assets/type-scale.svg:11` - `Heading 3`
- `public/brand-assets/type-scale.svg:13` - `Body Large - leading paragraphs`

Canonical value: the live TypeScale and guide include H4/H5; Code SM exists in live TypeScale but not guide/assets, so it needs either promotion into the guide/assets or removal from the live table.

Draft amendment: move type scale into `brand.ts` and generate `TypeScale`, guide table, and `type-scale.svg` from the same list. In the short term, add H4/H5 to the SVG generator and decide Code SM's status.

### DR-11 | low | Shipped favicon uses non-canonical Ink/Canvas substitutions

Surfaces + quoted values:
- `index.html:5` - `<link rel="icon" type="image/svg+xml" href="favicon.svg" />`
- `src/data/brand.ts:429` - `{ name: 'Canvas', hex: '#FDFDFB', role: 'background' },`
- `src/data/brand.ts:431` - `{ name: 'Ink', hex: '#18181C', role: 'text' },`
- `public/brand-guide.md:191` - `'white' - Canvas #FDFDFB. Dark backgrounds.`
- `public/brand-guide.md:192` - `'ink' - Ink #18181C. Formal, co-branding, single-colour print.`
- `public/favicon.svg:1` - `<circle ... fill="#111827" />` and repeated `fill="#FFFFFF"` / `stroke="#FFFFFF"`

Canonical value: dark favicon ground should use Ink `#18181C`; light mark should use Canvas `#FDFDFB` unless a favicon-specific exception is documented.

Draft amendment: regenerate or hand-correct `favicon.svg` to Ink/Canvas and add favicon to the brand asset generation/inventory path.

## Section 6 - derived-vs-hand-maintained inventory

| Artifact | Classification | Source / drift note |
|---|---|---|
| `src/data/brand.ts` | Canonical hand-maintained source | Declares single source; contains foundation, voice, palette bases; still has DR-4 totalizing language and lacks extended token schema. |
| `src/index.css` | Hand-maintained duplicate token map | Defines runtime CSS tokens, hovers, washes, dark washes, lifts; not derived from `brand.ts`. |
| `src/data/navigation.ts` | Hand-maintained unique app navigation | No brand fact drift found beyond labels/routes. |
| `public/brand-guide.md` | Hand-maintained duplicate/mirror | Mirrors many `brand.ts` facts plus unique visual/component specs; not generated; authority conflict DR-1. |
| `public/llms.txt` | Hand-maintained duplicate/index | Machine-readable quick facts and links; lags on naming/never-use and authority DR-1/DR-5/DR-6. |
| `public/brand-guide.pdf` | Generated from `public/brand-guide.md` by `scripts/generate-pdf.mjs` | Stale; embedded generated date 2026-04-19; contains old category noun. |
| `public/favicon.svg` | Hand-maintained or externally generated duplicate brand asset | Not produced by asset generator; uses non-canonical `#111827`/`#FFFFFF`. |
| `public/icons.svg` | Hand-maintained unique icon symbol sheet | Unreferenced in current `src`/`index.html`; contains non-brand purple/near-black, but outside assigned `brand-assets` glob. |
| `public/robots.txt` | Hand-maintained unique crawler policy | AI-readable policy; points to `brand-guide.md`/`llms.txt`; no brand fact drift except follows hand-maintained files. |
| `index.html` | Hand-maintained app shell metadata | Ships favicon and generic title/meta; no stale category noun in metadata. |
| `.github/workflows/deploy.yml` | Hand-maintained shipping workflow | Builds with `npm run build`; does not regenerate PDF/assets before shipping. |
| `package.json` scripts | Hand-maintained generation commands | `generate:assets`, `generate:pdf`, `generate:all`; not invoked by deploy. |
| `scripts/generate-brand-assets.mjs` | Generator, but source constants are hand-maintained duplicates | Generates `public/brand-assets/*.svg`; hardcodes colors, geometry, type samples; contains DR-3 and DR-8. |
| `scripts/generate-pdf.mjs` | Generator from Markdown | Consumes `public/brand-guide.md`; embeds date footer; CSS tokens are duplicated in script. |
| `public/brand-assets/logo-mark-cool.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact; source is script, not `brand.ts`. |
| `public/brand-assets/logo-mark-ink.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact; source is script, not `brand.ts`. |
| `public/brand-assets/logo-mark-white.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact; source is script, not `brand.ts`. |
| `public/brand-assets/logo-mark-spectrum.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact; approved as mark/animated-frame color, not lockup. |
| `public/brand-assets/logo-lockup-gradient.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact; Cool Duet lockup. |
| `public/brand-assets/logo-lockup-ink.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact; mono ink lockup. |
| `public/brand-assets/logo-lockup-white.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact; mono white on Ink. |
| `public/brand-assets/swatches-spectrum.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact; color constants duplicated in script. |
| `public/brand-assets/swatches-neutrals.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact; color constants duplicated in script. |
| `public/brand-assets/swatches-bridge.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact; light washes duplicated in script. |
| `public/brand-assets/ratio-bar.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact; 60/20/10/10 ratio duplicated in script/guide. |
| `public/brand-assets/gradient-brand.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact; gradient duplicated in script. |
| `public/brand-assets/gradient-cool-duet.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact. |
| `public/brand-assets/gradient-balanced-duet.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact; bridge `#6FB884` duplicated in script/guide. |
| `public/brand-assets/gradient-warm-duet.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact. |
| `public/brand-assets/gradient-full-rose.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact. |
| `public/brand-assets/gradient-lockup.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact; Cool Duet lockup gradient. |
| `public/brand-assets/type-samples.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact; contains stale `Knowledge, connected.` DR-3. |
| `public/brand-assets/type-scale.svg` | Generated from `scripts/generate-brand-assets.mjs` | Generated artifact; omits H4/H5/Code SM DR-10. |
| `src/components/brand/SpectreaLogo.tsx` | Hand-maintained runtime brand implementation | Logo geometry/colors are code-native; should be shared with asset generator; allows full-spectrum lockup DR-8. |
| `src/components/brand/Tooltip.tsx` | Hand-maintained unique UI helper | Uses design tokens/classes; no independent brand fact drift found. |
| `src/components/layout/TopBar.tsx` | Hand-maintained app chrome | Uses `Logotype` plus descriptor; color override `#212226`; consistent with guide manual/canonical split. |
| `src/components/layout/Sidebar.tsx` | Hand-maintained app chrome | Uses `StaticLogo` + sentence-case `Spectrea`; consistent with guide wordmark casing rule. |
| `src/components/layout/PageShell.tsx` | Hand-maintained layout shell | Page title/subtitle wrapper; no independent brand fact drift found. |
| `src/pages/Home.tsx` | Mixed: renders many `brand.ts` fields plus hardcoded layout/colors | Mostly derived at runtime from `brand.ts`. |
| `src/pages/foundation/BrandStory.tsx` | Mixed: renders `brand.ts` plus hardcoded explanatory UI | Good derivation for mission/vision/tagline/values/personality/anti-values. |
| `src/pages/foundation/Positioning.tsx` | Mixed: renders `brand.ts` plus hardcoded category definition | Hardcoded category paragraph should derive from `brand.positioning.category`. |
| `src/pages/foundation/Voice.tsx` | Mixed: renders `brand`/`voice` plus hardcoded prose | Contains personality count drift DR-7. |
| `src/pages/foundation/Naming.tsx` | Mixed: imports name/pronunciation, hand-maintains examples/rules | Naming forbidden forms drift DR-6. |
| `src/pages/typography/Guidelines.tsx` | Mixed: imports `brand.typography`, hand-maintains guidance | No direct drift found. |
| `src/pages/typography/TypeExplorer.tsx` | Mixed: imports `brand.typography`, hand-maintains examples | No direct drift found. |
| `src/pages/typography/TypeScale.tsx` | Hand-maintained duplicate type scale with `brand.typography` families | Contains totalizing sample DR-4 and scale mismatch DR-10. |
| `src/pages/color/PrimaryPalette.tsx`, `PaletteExplorer.tsx`, `PaletteCompare.tsx`, `SemanticColors.tsx`, `Gradients.tsx` | Hand-maintained duplicate color/gradient specs | PaletteExplorer explicitly says colors are hardcoded; extended tokens not derived from `brand.ts`. |
| `src/pages/logo/PrimaryLogo.tsx`, `Variations.tsx`, `LogoGuidelines.tsx`, `LogoExploration.tsx`, `Misuse.tsx` | Mixed: use logo components plus hardcoded rules/copy | Wordmark casing mostly consistent; LogoExploration conflicts on full-spectrum lockup DR-8. |
| `src/pages/imagery/Illustration.tsx`, `Iconography.tsx`, `Motion.tsx` | Hand-maintained unique/duplicate visual-system specs | Motion `Infinite` is an animation-loop property, not counted as a product totalizing claim. |
| `src/pages/components/Buttons.tsx`, `Cards.tsx`, `Forms.tsx`, `LayoutPage.tsx` | Hand-maintained component specs | Buttons has hand-invented dark state colors DR-9; layout spacing/z-index rules duplicate guide. |
| `src/pages/communications/Copy.tsx` | Mixed: imports `brand`/`voice`, hand-maintains descriptions/boilerplate | Some totalizing boilerplate DR-4; press boilerplate hardcodes category instead of deriving. |
| `src/pages/communications/Email.tsx` | Hand-maintained communications templates | No category noun drift found; contains totalizing `Every interaction...` but less severe than DR-4 core occurrences. |
| `src/pages/communications/Social.tsx` | Hand-maintained social templates | Twitter/X bio drift DR-3. |
| `src/pages/communications/Presentations.tsx` | Hand-maintained deck guidance | Category tagline aligned; color tokens duplicated. |
| `src/pages/resources/Downloads.tsx` | Hand-maintained resource/download page and CSS snippets | Correctly states `generate:all`, but shipping workflow does not run it. |
| `src/pages/resources/Governance.tsx` | Hand-maintained governance guidance | Unique process content; no core brand fact drift found. |
| `src/pages/Placeholder.tsx`, `src/App.tsx`, `src/main.tsx` | Hand-maintained app plumbing | No independent brand fact drift found. |
| `README*` | Not present | `Get-ChildItem -Filter README*` returned none in repo root. |

## Residuals

- PDF quotations are extracted-text lines, not physical PDF source lines.
- No generation scripts were run because worker role is read-only; findings describe required amendments only.
- Exact text-file sweep found no remaining `knowledge platform` in `src`, `public/brand-guide.md`, `public/llms.txt`, `scripts`, or `index.html`; the surviving exact noun is in stale PDF text.
- Wordmark casing rules are broadly consistent between guide §3/§4, `Sidebar`, `TopBar`, and `SpectreaLogo`; the material logo drift is the prohibited full-spectrum lockup option, not sentence-case/lowercase-tail handling.
- `public/icons.svg` is unreferenced by current app files and was not promoted to a finding, but it contains non-brand colors and should be either removed, regenerated, or documented.

Breadth gate - what in my scope am I NOT looking at? I did not render the app or visually inspect SVG/PDF pixels; this was a source/text/metadata drift pass. I did inspect all assigned source surfaces, scripts, generated SVG text, PDF extracted text, workflow shipping path, sibling ratified vision lines, and README presence.

## Lens verdict

The failure mode is real: brand facts are copied into too many places.
`brand.ts` is nominally canonical, but guide/llms say the app is canonical, scripts hardcode their own constants, and deploy ships stale generated outputs.
The highest-risk drift is the stale PDF: it still says `composable knowledge platform`.
The next wave should not hand-patch every duplicate; it should move tokens, type scale, social bios, naming rules, and never-use lists into generated data paths.
Short-term patches are still needed for `incomparably`, `Knowledge, connected.`, `five personality traits`, and full-spectrum lockup permissions.
