# Spectrea brand

The source of truth for the Spectrea brand, and the guide that renders it —
live at **[branding.spectrea.com](https://branding.spectrea.com/#/)**.

`src/data/brand.ts` is canon. Everything else that carries brand data — the
site, `public/brand-guide.md`, the PDF, `brand-contract.json`, `llms.txt`, the
agent rules, the conformance checker, the exported assets — is generated from
it. Edit canon, then regenerate; a hand-edited derived file is overwritten on
the next run.

```bash
npm install
npm run dev            # the guide, locally
npm run generate:all   # regenerate every derived artefact from brand.ts
npm run build
```

## What is here

| Path | What it is |
|---|---|
| `src/data/brand.ts` | Canon: identity, voice, colour, type, logo, motion, illustration, and the ratification ledger |
| `src/` | The brand guide app (Vite + React) |
| `public/brand-guide.md`, `public/brand-guide.pdf` | The guide as a document — prose is hand-written, data blocks are generated |
| `public/brand-contract.json`, `public/llms.txt`, `public/brand-*.md` | Machine-readable mirrors for AI tools |
| `public/brand-conformance.mjs` | A checker consumer repos vendor and run in CI |
| `public/brand-assets/` | Generated logos, swatches, and token files |
| `docs/archive/` | Superseded pre-rename material, kept for traceability |

## For AI tools

Start at [`/llms.txt`](https://branding.spectrea.com/llms.txt) — it routes to
the right document in the right order. On any conflict between surfaces,
`brand.ts` wins.

## What this repository is not

It is an **identity system**, and nothing in it is a legal instrument, a
specification of shipped behaviour, or a commitment on Spectrea's behalf. The
guide does carry capability language — it has to, to show the brand's voice —
but that language is anchored to the ratified product vision rather than to
shipped code, and it is written to be read as brand copy, not as a promise.

Trust, security, and compliance masters are **internal-tier**
(`internalCanon` in `brand.ts`): brand-voice drafts pending a legal read. The
tier means those fields render to no public artefact — not the site, the
guide, the PDF, `brand-contract.json`, or `llms.txt` — and a build fails if one
does. It does not mean they are secret: canon is this repository's public
source, so the text stays readable here. The tier removes the rendered
surfaces and the first-party-statement reading, not the words.

There is no product code and no credential material here — by design, and
checked across the full history in the 2026-08 public-exposure audit. The only
infrastructure in the repository is the Pages deploy workflow that publishes
the guide.

## Names and licences

Spectrea is the product and brand name. Matchwise Pte. Ltd. is the legal
entity, and appears only where a legal entity is required.

The name, marks, palette, and visual identity are published for reference and
for teams building Spectrea surfaces. Publishing them grants no licence to use
the Spectrea name or marks; ask first.

The three typefaces bundled under `public/fonts/` are third-party font software
under the SIL Open Font License 1.1 — see
[`public/fonts/OFL.txt`](public/fonts/OFL.txt).
