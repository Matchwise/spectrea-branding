/**
 * Spectrea Figure System.
 *
 * One Bauhaus full-body figure (head + torso + arms + legs), standing only.
 * Compositions multiply this figure (cohort, crowd, meeting); they don't
 * pose it. Single-figure-with-context scenes are deliberately omitted —
 * those need anatomical pose articulation and don't work well in
 * hand-coded SVG.
 */

const C = {
  ink: '#18181C',
  cobalt: '#4271DF',
  teal: '#00B6A0',
  amber: '#E19000',
  rose: '#F24260',
  pewter: '#97979E',
  canvas: '#FDFDFB',
  cloud: '#F4F4F1',
}

export type FigureColor = 'cobalt' | 'teal' | 'amber' | 'rose' | 'ink' | 'pewter'

const FIGURE_COLOR: Record<FigureColor, string> = {
  cobalt: C.cobalt,
  teal: C.teal,
  amber: C.amber,
  rose: C.rose,
  ink: C.ink,
  pewter: C.pewter,
}

export const ALL_COLORS: FigureColor[] = ['cobalt', 'teal', 'amber', 'rose', 'ink', 'pewter']

/* ---------------------------------------------------------------- */
/*  Base — single Bauhaus standing figure                           */
/* ---------------------------------------------------------------- */

export interface SpectreaFigureProps {
  color?: FigureColor
  height?: number
}

export function SpectreaFigure({ color = 'cobalt', height = 200 }: SpectreaFigureProps) {
  const body = FIGURE_COLOR[color]
  return (
    <svg viewBox="0 0 120 180" className="h-auto" style={{ maxHeight: height, width: 'auto' }}>
      <circle cx="60" cy="28" r="14" fill={C.ink} />
      <rect x="42" y="44" width="36" height="52" rx="8" fill={body} />
      <rect x="26" y="46" width="14" height="56" rx="7" fill={body} />
      <rect x="80" y="46" width="14" height="56" rx="7" fill={body} />
      <rect x="44" y="96" width="14" height="66" rx="4" fill={C.ink} />
      <rect x="62" y="96" width="14" height="66" rx="4" fill={C.ink} />
    </svg>
  )
}

/* Inline figure for use inside scenes */
function Fig({ x = 0, y = 0, scale = 1, color = C.cobalt }: { x?: number; y?: number; scale?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="60" cy="28" r="14" fill={C.ink} />
      <rect x="42" y="44" width="36" height="52" rx="8" fill={color} />
      <rect x="26" y="46" width="14" height="56" rx="7" fill={color} />
      <rect x="80" y="46" width="14" height="56" rx="7" fill={color} />
      <rect x="44" y="96" width="14" height="66" rx="4" fill={C.ink} />
      <rect x="62" y="96" width="14" height="66" rx="4" fill={C.ink} />
    </g>
  )
}

/* ---------------------------------------------------------------- */
/*  Compositions — multiple figures only                            */
/* ---------------------------------------------------------------- */

/* Row of 4 figures, distinct colours = team */
export function SceneCohort() {
  const colors = [C.cobalt, C.teal, C.amber, C.ink]
  return (
    <svg viewBox="0 0 320 180" className="w-full h-auto">
      {colors.map((color, i) => (
        <Fig key={i} x={5 + i * 78} scale={0.95} color={color} />
      ))}
    </svg>
  )
}

/* Many small figures in a grid = crowd */
export function SceneCrowd() {
  const palette = [C.cobalt, C.teal, C.amber, C.ink, C.pewter, C.ink, C.cobalt, C.amber, C.teal]
  return (
    <svg viewBox="0 0 320 180" className="w-full h-auto">
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 9 }).map((_, col) => {
          const i = row * 9 + col
          return (
            <g key={i} transform={`translate(${10 + col * 35} ${5 + row * 42})`}>
              <Fig scale={0.27} color={palette[i % palette.length]} />
            </g>
          )
        })
      )}
    </svg>
  )
}

/* Pair: two figures side by side = relationship / partnership */
export function ScenePair() {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-auto">
      <Fig x={20} scale={0.95} color={C.cobalt} />
      <Fig x={130} scale={0.95} color={C.amber} />
    </svg>
  )
}
