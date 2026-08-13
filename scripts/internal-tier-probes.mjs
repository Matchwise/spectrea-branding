// ============================================================
// Internal-tier probes — derived, never hand-listed
//
// Both gates (the generate:ai output check and the whole-repo
// check-internal-tier scan) build their probes here, from internalCanon's
// field list. A hand-maintained probe list drifts from the registry the
// moment a field is added: the first version of this enforcement carried
// probes for three of five trustCopy strings, so trustCopy.aiUse and
// trustCopy.counselNote were registered but unenforced (fix-wave gate round 2,
// 2026-08-13). Walking the value means registering a field is enough.
// ============================================================

/** Case, whitespace, dash, and quote shape all vary between a canon string and
 *  its quotation elsewhere; none of them make a leak less of a leak. */
export const norm = s =>
  String(s)
    .toLowerCase()
    .replace(/[‘’“”]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()

/** Every leaf string beneath a canon value, with its path. */
function leafStrings(value, path, out = []) {
  if (typeof value === 'string') out.push({ path, text: value })
  else if (Array.isArray(value)) value.forEach((v, i) => leafStrings(v, `${path}[${i}]`, out))
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) leafStrings(v, `${path}.${k}`, out)
  }
  return out
}

/** Resolve a dotted registry path ('brand.antiBrands') against the canon module. */
function resolvePath(canon, dotted) {
  return dotted.split('.').reduce((node, key) => (node == null ? node : node[key]), canon)
}

// Long values are probed by a distinctive opening span — enough to identify the
// field, short enough to survive light re-wording of the tail. Short values are
// probed whole.
const SPAN = 70
const MIN_PROBE = 12

// The one field whose values are bare proper nouns. Naming a company only
// means "leak" where the file speaks as the brand; in the pre-rename naming
// analysis, naming a company is just naming a company. Scoped by FIELD
// IDENTITY, not by probe length: keying off length made "Microsoft 365"
// (13 chars) unexempt while "Jira" was, and would have handed the same
// exemption to any future short string from an unrelated field
// (gate round 3, 2026-08-13).
const HISTORICAL_DOC_EXEMPT = new Set(['brand.antiBrands'])

export function buildInternalProbes(canon) {
  const { internalCanon } = canon
  const probes = []
  const unprobed = []

  for (const field of internalCanon.fields) {
    const value = resolvePath(canon, field)
    if (value === undefined) {
      unprobed.push(`${field} (registered but not found in canon)`)
      continue
    }
    const leaves = leafStrings(value, field)
    if (!leaves.length) {
      unprobed.push(`${field} (no string content)`)
      continue
    }
    const exempt = HISTORICAL_DOC_EXEMPT.has(field)
    for (const { path, text } of leaves) {
      const probe = norm(text.length > SPAN ? text.slice(0, SPAN) : text)
      if (probe.length < MIN_PROBE && !exempt) {
        // Too short to match without firing on ordinary prose, and not from
        // the one field where short strings are expected. Silently skipping it
        // would leave a registered field unenforced; silently probing it would
        // flood every scan. Someone decides.
        unprobed.push(
          `${path} ("${text}") is shorter than ${MIN_PROBE} characters — decide explicitly whether it belongs in HISTORICAL_DOC_EXEMPT or needs a longer probe`
        )
        continue
      }
      probes.push({ field, path, probe, brandSurfacesOnly: exempt })
    }
  }

  return { probes, unprobed }
}
