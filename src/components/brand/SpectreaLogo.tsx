import { useState, useRef, useEffect, useCallback, useMemo, forwardRef } from 'react'

// ─── Logo configuration (Candidate H) ───────────────────────────
export const LOGO = {
  pathD: 'M 44 12 C 34 6, 20 6, 20 18 C 20 30, 44 34, 44 46 C 44 58, 30 58, 20 52',
  strokeW: 8,
  dotR: 3.5,
  totalDots: 10,
  tailDots: 3,
} as const

// ─── Color modes ──────────────────────────────────────────────────
// - 'color'    Full spectrum Cobalt → Teal → Amber. Used by AnimatedLogo.
// - 'cool'     Cool Duet — Cobalt → Teal. Primary static mark default.
// - 'balanced' Balanced Duet — Teal → Amber, with late-shift intermediate.
// - 'warm'     Warm Duet — Amber → Rose.
// - 'grey' | 'white' | 'ink' — solid colors.
export type ColorMode = 'color' | 'cool' | 'balanced' | 'warm' | 'grey' | 'white' | 'ink'

// The lockup is expressed as EITHER mono (solid color everywhere) OR gradient.
// `Logotype` requires MonoColorMode; `LogotypeGradient` covers all gradient cases.
export type MonoColorMode = 'ink' | 'white' | 'grey'

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function rgb(r: number, g: number, b: number) {
  return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`
}

// Full spectrum — Cobalt #4271DF → Teal #00B6A0 → Amber #E19000
export function gradientColor(t: number): string {
  if (t < 0.5) {
    const p = t / 0.5
    return rgb(lerp(66, 0, p), lerp(113, 182, p), lerp(223, 160, p))
  }
  const p = (t - 0.5) / 0.5
  return rgb(lerp(0, 225, p), lerp(182, 144, p), lerp(160, 0, p))
}

// Cool Duet — Cobalt #4271DF → Teal #00B6A0
export function coolDuetColor(t: number): string {
  return rgb(lerp(66, 0, t), lerp(113, 182, t), lerp(223, 160, t))
}

// Balanced Duet — Teal #00B6A0 → #6FB884 (at 65%) → Amber #E19000
// Late-shift intermediate avoids muddy olive desaturation.
export function balancedDuetColor(t: number): string {
  if (t < 0.65) {
    const p = t / 0.65
    return rgb(lerp(0, 111, p), lerp(182, 184, p), lerp(160, 132, p))
  }
  const p = (t - 0.65) / 0.35
  return rgb(lerp(111, 225, p), lerp(184, 144, p), lerp(132, 0, p))
}

// Warm Duet — Amber #E19000 → Rose #F24260
export function warmDuetColor(t: number): string {
  return rgb(lerp(225, 242, t), lerp(144, 66, t), lerp(0, 96, t))
}

export function fillForMode(t: number, mode: ColorMode): string {
  if (mode === 'white') return '#FDFDFB'   // Canvas — warm blend white
  if (mode === 'grey') return '#A3A3A3'    // Dot grey — deliberate mark-only value (not Pewter)
  if (mode === 'ink') return '#18181C'     // Ink — warm blend
  if (mode === 'cool') return coolDuetColor(t)
  if (mode === 'balanced') return balancedDuetColor(t)
  if (mode === 'warm') return warmDuetColor(t)
  return gradientColor(t)
}

// Mono modes produce true single-color logos where the dots match the stroke.
// Gradient/duet modes default to grey dots (the primary brand treatment:
// grey dots, spectrum stroke — dots are the raw data, stroke is insight).
export function isMonoMode(mode: ColorMode): boolean {
  return mode === 'ink' || mode === 'white' || mode === 'grey'
}

// Shared resolver used by StaticLogo, AnimatedLogo, and lockup components.
export function resolveDotMode(colorMode: ColorMode, dotColorMode?: ColorMode): ColorMode {
  if (dotColorMode) return dotColorMode
  return isMonoMode(colorMode) ? colorMode : 'grey'
}

// ─── Path metrics hook ��─────────────────────────────────────────
export function usePathMetrics(pathD: string, totalDots: number, tailDots: number) {
  const pathRef = useRef<SVGPathElement>(null)
  const [metrics, setMetrics] = useState<{
    totalLen: number
    connectedLen: number
    dots: { x: number; y: number; t: number }[]
  } | null>(null)

  useEffect(() => {
    const el = pathRef.current
    if (!el) return
    const totalLen = el.getTotalLength()

    const dots: { x: number; y: number; t: number }[] = []
    for (let i = 0; i < totalDots; i++) {
      const t = i / (totalDots - 1)
      const p = el.getPointAtLength(t * totalLen)
      dots.push({ x: p.x, y: p.y, t })
    }

    const firstTrailingIdx = totalDots - tailDots
    const connectedFraction = firstTrailingIdx / (totalDots - 1)
    const connectedLen = connectedFraction * totalLen

    setMetrics({ totalLen, connectedLen, dots })
  }, [pathD, totalDots, tailDots])

  return { pathRef, metrics }
}

// ─── Italic path transform ───────────────────────────────────────
// Shifts each control-point x based on its y, keeping dots circular
// and stroke width uniform (unlike skewX which distorts everything).
export function italicizePath(pathD: string, angleDeg: number, centerY = 32): string {
  if (angleDeg === 0) return pathD
  const t = Math.tan((angleDeg * Math.PI) / 180)
  const tokens = pathD.match(/[A-Za-z]|-?\d+\.?\d*/g) || []
  const out: string[] = []
  let i = 0
  while (i < tokens.length) {
    if (/[A-Za-z]/.test(tokens[i])) {
      out.push(tokens[i++])
    } else {
      const x = parseFloat(tokens[i])
      const y = parseFloat(tokens[i + 1])
      out.push((x + t * (centerY - y)).toFixed(1), String(y))
      i += 2
    }
  }
  return out.join(' ')
}

// ─── Static logo ──────────────────────────��─────────────────────
const STROKE_SEGMENTS = 48

export interface StaticLogoProps {
  size?: number
  colorMode?: ColorMode
  dotColorMode?: ColorMode
  dotColor?: string
  fadeStroke?: boolean
  pathD?: string
  strokeW?: number
  dotR?: number
  tailDots?: number
  totalDots?: number
  /** Italic slant in degrees (positive = top tilts right). 0 = upright. */
  italicAngle?: number
}

export const StaticLogo = forwardRef<SVGSVGElement, StaticLogoProps>(function StaticLogo({
  size = 64,
  colorMode = 'cool',
  dotColorMode,
  dotColor,
  fadeStroke = false,
  pathD = LOGO.pathD,
  strokeW = LOGO.strokeW,
  dotR = LOGO.dotR,
  tailDots = LOGO.tailDots,
  totalDots = LOGO.totalDots,
  italicAngle = 0,
}, ref) {
  const effectiveDotMode = resolveDotMode(colorMode, dotColorMode)

  // Proper italic: transform path control points so dots stay circular
  // and stroke width stays uniform (no skewX distortion).
  const effectivePathD = useMemo(
    () => italicizePath(pathD, italicAngle),
    [pathD, italicAngle],
  )
  const { pathRef, metrics } = usePathMetrics(effectivePathD, totalDots, tailDots)

  return (
    <svg ref={ref} width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path ref={pathRef} d={effectivePathD} fill="none" stroke="none" />

      {metrics && (
        <>
          {metrics.dots.map((dot, i) => (
            <circle key={i} cx={dot.x} cy={dot.y} r={dotR}
              fill={dotColor ?? fillForMode(dot.t, effectiveDotMode)}
            />
          ))}

          {(() => {
            const strokeLen = fadeStroke
              ? metrics.totalLen
              : metrics.connectedLen - strokeW / 2 + dotR * 0.75
            return Array.from({ length: STROKE_SEGMENTS }, (_, i) => {
              const segStart = (strokeLen * i) / STROKE_SEGMENTS
              const segEnd = (strokeLen * (i + 1)) / STROKE_SEGMENTS
              const progress = (segStart + segEnd) / 2 / strokeLen
              const color = fillForMode(progress, colorMode)
              const opacity = fadeStroke ? Math.max(0, Math.pow(1 - progress, 2.5)) : 1
              return (
                <path key={i}
                  d={effectivePathD}
                  fill="none"
                  stroke={color}
                  strokeWidth={strokeW}
                  strokeLinecap="round"
                  strokeDasharray={`${segEnd - segStart + 1.5} ${metrics.totalLen}`}
                  strokeDashoffset={-segStart}
                  opacity={opacity}
                />
              )
            })
          })()}
        </>
      )}
    </svg>
  )
})

// ─── Animated logo ─────────────────────��────────────────────────
export interface AnimatedLogoProps {
  size?: number
  colorMode?: ColorMode
  dotColorMode?: ColorMode
  pathD?: string
  strokeW?: number
  dotR?: number
  totalDots?: number
  tailDots?: number
  duration?: number
}

export function AnimatedLogo({
  size = 200,
  colorMode = 'color',
  dotColorMode,
  pathD = LOGO.pathD,
  strokeW = LOGO.strokeW,
  dotR = LOGO.dotR,
  totalDots = LOGO.totalDots,
  tailDots = LOGO.tailDots,
  duration = 3,
}: AnimatedLogoProps) {
  const effectiveDotMode = resolveDotMode(colorMode, dotColorMode)
  const { pathRef, metrics } = usePathMetrics(pathD, totalDots, tailDots)
  const [progress, setProgress] = useState(0)
  const animRef = useRef<number>(0)
  const startRef = useRef<number>(0)

  const animate = useCallback(() => {
    const elapsed = performance.now() - startRef.current
    setProgress((elapsed % (duration * 1000)) / (duration * 1000))
    animRef.current = requestAnimationFrame(animate)
  }, [duration])

  useEffect(() => {
    if (!metrics) return
    startRef.current = performance.now()
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [metrics, animate])

  let a = 0
  let b = 0

  if (metrics) {
    const L = metrics.totalLen
    if (progress < 0.57) {
      const t = progress / 0.57
      a = 0
      b = (1 - Math.pow(1 - t, 2)) * L
    } else if (progress < 0.60) {
      a = 0
      b = L
    } else if (progress < 0.97) {
      const t = (progress - 0.60) / 0.37
      a = t * t * L
      b = L
    } else {
      a = 0
      b = 0
    }
  }

  const segmentLen = b - a
  const showStroke = segmentLen > 0.5
  const isUndrawing = progress >= 0.60 && progress < 0.97
  const fadeLen = metrics ? metrics.totalLen * 0.15 : 0

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path ref={pathRef} d={pathD} fill="none" stroke="none" />

      {metrics && (
        <>
          {metrics.dots.map((dot, i) => (
            <circle key={i} cx={dot.x} cy={dot.y} r={dotR}
              fill={fillForMode(dot.t, effectiveDotMode)}
            />
          ))}

          {showStroke && Array.from({ length: STROKE_SEGMENTS }, (_, i) => {
            const segStart = a + (segmentLen * i) / STROKE_SEGMENTS
            const segEnd = a + (segmentLen * (i + 1)) / STROKE_SEGMENTS
            const midT = ((segStart + segEnd) / 2) / metrics.totalLen
            const color = fillForMode(midT, colorMode)

            let opacity = 1
            if (isUndrawing) {
              const distFromFront = segStart - a
              if (distFromFront < fadeLen) {
                opacity = distFromFront / fadeLen
              }
            }

            return (
              <path key={i}
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth={strokeW}
                strokeLinecap="round"
                strokeDasharray={`${segEnd - segStart + 1.5} ${metrics.totalLen}`}
                strokeDashoffset={-segStart}
                opacity={opacity}
              />
            )
          })}
        </>
      )}
    </svg>
  )
}

// ─── Shared lockup layout ─────────────────────────────────────────
// Both mono and gradient lockups use identical sizing so the S mark
// is always the same height as the capital letters.

function transformPathCoords(pathD: string, ox: number, oy: number, s: number): string {
  const tokens = pathD.match(/[A-Za-z]|-?\d+\.?\d*/g) || []
  const out: string[] = []
  let i = 0
  while (i < tokens.length) {
    if (/[A-Za-z]/.test(tokens[i])) {
      out.push(tokens[i++])
    } else {
      out.push(((parseFloat(tokens[i]) + ox) * s).toFixed(2))
      out.push(((parseFloat(tokens[i + 1]) + oy) * s).toFixed(2))
      i += 2
    }
  }
  return out.join(' ')
}

// Mark content bounds in the native 64x64 viewBox
const ML = 11, MT = 3, MH = 58, MW = 40

function useLockupLayout(fontSize: number) {
  const { pathRef, metrics } = usePathMetrics(LOGO.pathD, LOGO.totalDots, LOGO.tailDots)

  const capH = fontSize * 0.72
  const s = capH / MH
  const gap = fontSize * 0.05
  const pad = LOGO.strokeW * s * 0.75

  const vpPath = transformPathCoords(LOGO.pathD, -ML, -MT, s)
  const markW = MW * s
  const textX = markW + gap
  const textY = pad + capH
  const totalW = textX + fontSize * 5.5
  const totalH = capH + pad * 2

  let vpDots: { x: number; y: number }[] = []
  let connDots: { x: number; y: number }[] = []
  let tailDotsArr: { x: number; y: number }[] = []
  let vpStrokeW = 0
  let vpDotR = 0
  let vpConnLen = 0
  let vpTotalLen = 0

  if (metrics) {
    vpDots = metrics.dots.map(d => ({ x: (d.x - ML) * s, y: (d.y - MT) * s + pad }))
    connDots = vpDots.slice(0, LOGO.totalDots - LOGO.tailDots)
    tailDotsArr = vpDots.slice(LOGO.totalDots - LOGO.tailDots)
    vpStrokeW = LOGO.strokeW * s
    vpDotR = LOGO.dotR * s
    vpConnLen = (metrics.connectedLen - LOGO.strokeW / 2 + LOGO.dotR * 0.75) * s
    vpTotalLen = metrics.totalLen * s
  }

  return {
    pathRef, metrics, capH, s, pad, vpPath, markW, textX, textY,
    totalW, totalH, connDots, tailDotsArr, vpStrokeW, vpDotR, vpConnLen, vpTotalLen,
  }
}

// ─── Logotype: Mono lockup (single SVG, solid color) ──────────────
// The lockup has two forms only: mono (this component) or gradient
// (`LogotypeGradient`). Mono is constrained to ink/white/grey — the full-brand
// gradient cases go through `LogotypeGradient`.
export interface LogotypeProps {
  fontSize: number
  colorMode?: MonoColorMode
  dotColorMode?: MonoColorMode
  color?: string
}

export const Logotype = forwardRef<SVGSVGElement, LogotypeProps>(function Logotype(
  { fontSize, colorMode = 'ink', dotColorMode, color = '#18181C' },
  ref,
) {
  // Mono lockup — dots always match the stroke (true mono).
  const effectiveDotMode = resolveDotMode(colorMode, dotColorMode)
  const layout = useLockupLayout(fontSize)

  if (!layout.metrics) {
    return (
      <svg ref={ref} width={layout.totalW} height={layout.totalH}>
        <path ref={layout.pathRef} d={LOGO.pathD} fill="none" stroke="none" />
      </svg>
    )
  }

  const strokeColor = fillForMode(0.5, colorMode)
  const dotFill = (t: number) => fillForMode(t, effectiveDotMode)

  return (
    <svg ref={ref} width={layout.totalW} height={layout.totalH} viewBox={`0 0 ${layout.totalW} ${layout.totalH}`}>
      <path ref={layout.pathRef} d={LOGO.pathD} fill="none" stroke="none" />
      {layout.connDots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={layout.vpDotR}
          fill={dotFill(i / (LOGO.totalDots - 1))} />
      ))}
      {layout.tailDotsArr.map((d, i) => (
        <circle key={`t${i}`} cx={d.x} cy={d.y} r={layout.vpDotR}
          fill={dotFill((LOGO.totalDots - LOGO.tailDots + i) / (LOGO.totalDots - 1))} />
      ))}
      <g transform={`translate(0, ${layout.pad})`}>
        <path d={layout.vpPath} fill="none"
          stroke={strokeColor}
          strokeWidth={layout.vpStrokeW}
          strokeLinecap="round"
          strokeDasharray={`${layout.vpConnLen} ${layout.vpTotalLen * 10}`}
        />
      </g>
      <text x={layout.textX} y={layout.textY}
        fill={color}
        fontFamily="'Albert Sans', sans-serif"
        fontWeight={600}
        fontSize={fontSize}
        letterSpacing={`${fontSize * 0.02}px`}
      >PECTREA</text>
    </svg>
  )
})

// ─── The one and only lockup gradient ─────────────────────────────
// Full spectrum Cobalt → Teal → Amber → Rose with a late-shift intermediate
// at 55% to prevent muddy olive in the teal→amber transition. There is NO
// other gradient option for the lockup — duets belong to the static mark
// (via `StaticLogo colorMode="cool"` etc.), not the lockup.
const LOCKUP_GRADIENT_STOPS: Array<{ offset: number; color: string }> = [
  { offset: 0, color: '#4271DF' },
  { offset: 33, color: '#00B6A0' },
  { offset: 55, color: '#6FB884' },
  { offset: 66, color: '#E19000' },
  { offset: 100, color: '#F24260' },
]

// ─── LogotypeGradient: Unified gradient lockup (single SVG) ──────
// Mark AND wordmark share the full-spectrum gradient — this is the only
// gradient form. For mono lockups use `Logotype`. No duet lockups, no mixed
// coloured-mark + solid-wordmark — those are off-brand.
export interface LogotypeGradientProps {
  fontSize: number
  angle?: number
  /** Optional override of dot colour. Default: connected dots carry the
   *  gradient, trailing dots stay grey (the unified brand moment). */
  dotFill?: string
}

export const LogotypeGradient = forwardRef<SVGSVGElement, LogotypeGradientProps>(function LogotypeGradient(
  { fontSize, angle = 60, dotFill },
  ref,
) {
  const layout = useLockupLayout(fontSize)

  const rad = ((90 - angle) * Math.PI) / 180
  const halfDiag = Math.sqrt(layout.totalW * layout.totalW + layout.totalH * layout.totalH) / 2
  const cx = layout.totalW / 2, cy = layout.totalH / 2
  const gx1 = cx - Math.cos(rad) * halfDiag
  const gy1 = cy + Math.sin(rad) * halfDiag
  const gx2 = cx + Math.cos(rad) * halfDiag
  const gy2 = cy - Math.sin(rad) * halfDiag
  const gradId = `lg${fontSize}${angle}`

  if (!layout.metrics) {
    return (
      <svg ref={ref} width={layout.totalW} height={layout.totalH}>
        <path ref={layout.pathRef} d={LOGO.pathD} fill="none" stroke="none" />
      </svg>
    )
  }

  // Connected dots carry the gradient, trailing dots stay grey (the unified
  // brand moment). `dotFill` overrides both if provided.
  const connDotFill = dotFill ?? `url(#${gradId})`
  const tailDotFill = dotFill ?? '#A3A3A3'

  return (
    <svg ref={ref} width={layout.totalW} height={layout.totalH} viewBox={`0 0 ${layout.totalW} ${layout.totalH}`}>
      <path ref={layout.pathRef} d={LOGO.pathD} fill="none" stroke="none" />
      <defs>
        <linearGradient id={gradId} x1={gx1} y1={gy1} x2={gx2} y2={gy2} gradientUnits="userSpaceOnUse">
          {LOCKUP_GRADIENT_STOPS.map((s, i) => (
            <stop key={i} offset={`${s.offset}%`} stopColor={s.color} />
          ))}
        </linearGradient>
      </defs>
      {layout.connDots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={layout.vpDotR} fill={connDotFill} />
      ))}
      {layout.tailDotsArr.map((d, i) => (
        <circle key={`t${i}`} cx={d.x} cy={d.y} r={layout.vpDotR} fill={tailDotFill} />
      ))}
      <g transform={`translate(0, ${layout.pad})`}>
        <path d={layout.vpPath} fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={layout.vpStrokeW}
          strokeLinecap="round"
          strokeDasharray={`${layout.vpConnLen} ${layout.vpTotalLen * 10}`}
        />
      </g>
      <text x={layout.textX} y={layout.textY}
        fill={`url(#${gradId})`}
        fontFamily="'Albert Sans', sans-serif"
        fontWeight={600}
        fontSize={fontSize}
        letterSpacing={`${fontSize * 0.02}px`}
      >PECTREA</text>
    </svg>
  )
})
