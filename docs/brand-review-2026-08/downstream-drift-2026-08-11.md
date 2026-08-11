# Downstream drift scan — 2026-08-11, against v2.10.0 (`11c2326`)

Read-only scan of both consumer repos, run from the branding session the day the
v2.10.0 snapshots were staged. This is the handoff's section-2/3 migration check,
executed; each repo's session fixes its own list. Historical documents (reviews,
changelogs, sweep reports, archived specs) that mention retired concepts as history
are NOT listed — only live code, live docs, and agent rules.

## spectrea (app)

### High — retired pre-v2.5.0 logo family still shipped

The K3′ mark replaced the old mark (path `M 44 12 …`, stroke 8, dots r 3.5) at
v2.5.0. Still carrying the old geometry:

- `src/app/icon.svg` — the app favicon renders the retired mark.
- `public/brand/spectrea_ink.svg`, `spectrea_primary.svg`, `spectrea_white.svg`,
  `spectrea_logotype_full-spectrum.svg`, `spectrea_logotype_full-spectrum-white.svg`,
  `spectrea_logotype_ink.svg`, `spectrea_logotype_white.svg` — seven shipped brand
  SVGs, all old-mark. Re-copy from upstream `public/brand-assets/` (current
  catalogue: 54 files incl. PNG exports and transparent White companions) and remap
  names, or adopt upstream names.

### High — focus system predates v2.5.1 (and v2.10.0 doctrine)

- `src/app/globals.css:130` — light-theme `--ring: rgba(225, 144, 0, 0.7)` is the
  retired universal ring. Canon since v2.5.1: light surfaces use solid Amber
  `#A86E00` (the alpha ring fails contrast on light); dark keeps
  `rgba(225, 144, 0, 0.7)` (`globals.css:260` is already correct).
- `src/components/workspace/dialogs/WorkspaceAvatarUploadDialog.tsx:745` and
  `WorkspaceAvatarSelectionDialog.tsx:632` — `focus:ring-2 focus:ring-primary
  focus:border-primary`: Cobalt focus ring + border change on focus. v2.10.0
  doctrine: focus is not a Cobalt job; ONE canonical ring; borders never change on
  focus.
- `src/components/ui/calendar.tsx:73` — `has-focus:border-ring … has-focus:ring-ring/50
  has-focus:ring-[3px]`: border change on focus + a 50%-alpha 3px ring instead of
  the canonical 2px ring.
- `src/components/workspace/members/MemberRemovalDialog.tsx:347` —
  `focus:border-success`: border change on focus (validation borders persist
  beneath the ring; they never switch ON focus).
- Token-driven sites (`focus:ring-ring` in input-field, badge, dialog, sheet,
  error-boundary, NotificationIcon, NotificationPreferences) inherit the fix once
  `--ring` is corrected — but review ring width/offset vs canon (2px solid, 2px
  offset) where Tailwind defaults differ.
- `scripts/verify-contrast.mjs:132–135` — asserts the retired universal ring value
  as canonical; update to the split light/dark values.

### Medium — agent rules and living docs teach retired canon

- `.cursor/rules/30-brand-alignment.mdc:45` + `.claude/rules/30-brand-alignment.mdc:49`
  — teach the universal rgba ring ("Never override per-component"); update to the
  v2.10.0 one-ring doctrine with split light/dark values.
- `docs/03-design/ui/design-principles.md:441,858–862` — cites `voice.toneSpectrum`
  (retired v2.5.4; `toneExamples` is the register taxonomy) and pins the retired
  ring value.
- `AGENTS.md:5,213`, `docs/05-reference/project-structure.md:26`,
  `docs/00-overview/app-overview.md:20`, `docs/05-reference/modeling-layer/glossary.md:1131`
  — stale pin note (`1399606`, now `11c2326`) and retired
  `matchwise.github.io` URLs (301s to https://branding.spectrea.com/#/ — update at
  convenience).

### Already staged (this refresh)

`docs/05-reference/brand/` — 12 vendored files + README at `11c2326`, uncommitted.
The README's canonical-facts block is critic-verified against v2.10.0 canon.

## spectrea-web (marketing site)

### High — the LIVE SITE renders the retired mark

- `src/components/brand/SpectreaLogo.tsx:7` — the logo component's `LOGO` constants
  are the retired geometry (`pathD: 'M 44 12 …'`, `strokeW: 8`, `dotR: 3.5`). The
  deployed site's logo is the old mark. Current canon: `logo.markGeometry` in the
  vendored `brand-contract.json` / upstream `brand.ts` (K3′ segs, strokeW 9.0531,
  dotR 3.9607, visible-ink extents) — or render the shipped SVGs instead of
  hardcoded constants.
- `public/favicon.svg` — retired mark; re-copy upstream `public/favicon.svg`.
- `public/brand-assets/logo-lockup-gradient.svg`, `logo-lockup-ink.svg`,
  `logo-lockup-white.svg`, `logo-mark-cool.svg` — old-mark copies with
  upstream-matching names; re-copy from upstream `public/brand-assets/`.
- `src/app/lab/hero-minimal/page.tsx:61` — old path in a lab page (low priority,
  not linked from production nav — fix or delete with the lab).

### Clean

- No blue/Cobalt focus styling, no gray-family border hexes, no never-use
  vocabulary in live copy (`seamless` appears once in a code comment, not copy).
- `docs/superpowers/` spec/plan references to the old URL are historical documents.

### Already staged (this refresh)

`docs/brand/` — 5 vendored files at `11c2326`, uncommitted.
