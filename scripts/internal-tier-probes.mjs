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
// probed whole. Anything shorter than this is a word, not a field: a probe that
// short would fire on ordinary prose, so it is skipped and reported.
const SPAN = 70
const MIN_PROBE = 12

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
    for (const { path, text } of leaves) {
      const probe = norm(text.length > SPAN ? text.slice(0, SPAN) : text)
      if (probe.length < MIN_PROBE) {
        // A bare proper noun — an antiBrand name. It only means "leak" where
        // the file speaks as the brand; elsewhere, naming a company is just
        // naming a company.
        probes.push({ field, path, probe, brandSurfacesOnly: true })
      } else {
        probes.push({ field, path, probe, brandSurfacesOnly: false })
      }
    }
  }

  return { probes, unprobed }
}
