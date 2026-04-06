import { useState, useRef, useEffect, useCallback, forwardRef } from 'react'

// ─── Logo configuration (Candidate H) ───────────────────────────
export const LOGO = {
  pathD: 'M 44 12 C 34 6, 20 6, 20 18 C 20 30, 44 34, 44 46 C 44 58, 30 58, 20 52',
  strokeW: 8,
  dotR: 3.5,
  totalDots: 10,
  tailDots: 3,
} as const

// ─── Color modes ──────────────────────────────��─────────────────
export type ColorMode = 'color' | 'grey' | 'white' | 'ink'

// Cobalt #4271DF -> Teal #00B6A0 -> Amber #E19000
export function gradientColor(t: number): string {
  let r: number, g: number, b: number
  if (t < 0.5) {
    const p = t / 0.5
    r = 66 + (0 - 66) * p
    g = 113 + (182 - 113) * p
    b = 223 + (160 - 223) * p
  } else {
    const p = (t - 0.5) / 0.5
    r = 0 + (225 - 0) * p
    g = 182 + (144 - 182) * p
    b = 160 + (0 - 160) * p
  }
  return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`
}

export function fillForMode(t: number, mode: ColorMode): string {
  if (mode === 'white') return '#FFFFFF'
  if (mode === 'grey') return '#9CA3AF'
  if (mode === 'ink') return '#111827'
  return gradientColor(t)
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

// ─── Static logo ──────────────────────────��─────────────────────
const STROKE_SEGMENTS = 48

export interface StaticLogoProps {
  size?: number
  colorMode?: ColorMode
  dotColorMode?: ColorMode
  fadeStroke?: boolean
  pathD?: string
  strokeW?: number
  dotR?: number
  tailDots?: number
  totalDots?: number
}

export const StaticLogo = forwardRef<SVGSVGElement, StaticLogoProps>(function StaticLogo({
  size = 64,
  colorMode = 'color',
  dotColorMode,
  fadeStroke = false,
  pathD = LOGO.pathD,
  strokeW = LOGO.strokeW,
  dotR = LOGO.dotR,
  tailDots = LOGO.tailDots,
  totalDots = LOGO.totalDots,
}, ref) {
  const effectiveDotMode = dotColorMode ?? colorMode
  const { pathRef, metrics } = usePathMetrics(pathD, totalDots, tailDots)

  return (
    <svg ref={ref} width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path ref={pathRef} d={pathD} fill="none" stroke="none" />

      {metrics && (
        <>
          {metrics.dots.map((dot, i) => (
            <circle key={i} cx={dot.x} cy={dot.y} r={dotR}
              fill={fillForMode(dot.t, effectiveDotMode)}
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
  const effectiveDotMode = dotColorMode ?? colorMode
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
    if (progress < 0.47) {
      const t = progress / 0.47
      a = 0
      b = (1 - Math.pow(1 - t, 2)) * L
    } else if (progress < 0.50) {
      a = 0
      b = L
    } else if (progress < 0.97) {
      const t = (progress - 0.50) / 0.47
      a = t * t * L
      b = L
    } else {
      a = 0
      b = 0
    }
  }

  const segmentLen = b - a
  const showStroke = segmentLen > 0.5
  const isUndrawing = progress >= 0.50 && progress < 0.97
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

// ─── Logotype (mark as S in "Spectrea") ───────────────────────────
export interface LogotypeProps {
  fontSize: number
  colorMode?: ColorMode
  dotColorMode?: ColorMode
  color?: string
}

export function Logotype({ fontSize, colorMode = 'color', dotColorMode = 'grey', color = '#111827' }: LogotypeProps) {
  const capHeight = fontSize * 0.72
  const svgSize = capHeight / (58 / 64)
  const contentLeft = 11 / 64
  const contentRight = 51 / 64
  const clipW = svgSize * (contentRight - contentLeft)
  const offsetX = svgSize * contentLeft
  const contentTop = 3 / 64
  const contentBottom = 61 / 64
  const clipH = svgSize * (contentBottom - contentTop)
  const offsetY = svgSize * contentTop
  const descender = fontSize * 0.22

  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', lineHeight: 1 }}>
      <span
        style={{
          display: 'inline-block',
          width: clipW,
          height: clipH,
          overflow: 'hidden',
          position: 'relative',
          verticalAlign: 'baseline',
          marginBottom: -descender,
          marginRight: -fontSize * 0.01,
        }}
      >
        <span style={{ position: 'absolute', left: -offsetX, top: -offsetY }}>
          <StaticLogo size={svgSize} colorMode={colorMode} dotColorMode={dotColorMode} />
        </span>
      </span>
      <span className="font-heading font-semibold" style={{ fontSize, color }}>pectrea</span>
    </span>
  )
}
