import { useState, useRef, useEffect, useCallback, useMemo, forwardRef } from 'react'
import PageShell, { Section } from '../../components/layout/PageShell'
import { StaticLogo, LOGO, gradientColor, fillForMode, usePathMetrics, type ColorMode } from '../../components/brand/SpectreaLogo'

// ─── Export helpers ────────────────────────────────────────────────

function serializeSvg(el: SVGSVGElement | null): string | null {
  if (!el) return null
  const clone = el.cloneNode(true) as SVGSVGElement
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  return new XMLSerializer().serializeToString(clone)
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function downloadSvg(svgString: string, filename: string) {
  downloadBlob(new Blob([svgString], { type: 'image/svg+xml' }), filename)
}

async function downloadRaster(svgString: string, width: number, height: number, format: 'png' | 'jpg', filename: string) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  const img = new Image()
  await new Promise<void>((resolve) => {
    img.onload = () => {
      if (format === 'jpg') {
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, width, height)
      }
      ctx.drawImage(img, 0, 0, width, height)
      resolve()
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)))
  })
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((b) => resolve(b!), format === 'jpg' ? 'image/jpeg' : 'image/png', 0.95)
  })
  downloadBlob(blob, filename)
}

// ─── Generator config with rules ──────────────────────────────────

interface BgOption { value: string; label: string }

interface MarkStyle {
  id: string
  label: string
  colorMode: ColorMode
  dotColorMode?: ColorMode
  backgrounds: BgOption[]
  defaultBg: string
  note?: string
}

const markStyles: MarkStyle[] = [
  {
    id: 'color', label: 'Color', colorMode: 'color', dotColorMode: 'grey',
    backgrounds: [
      { value: 'transparent', label: 'Transparent' },
      { value: '#FFFFFF', label: 'White' },
      { value: '#111827', label: 'Ink (dark)' },
    ],
    defaultBg: 'transparent',
  },
  {
    id: 'ink', label: 'Ink', colorMode: 'ink',
    backgrounds: [
      { value: 'transparent', label: 'Transparent' },
      { value: '#FFFFFF', label: 'White' },
    ],
    defaultBg: 'transparent',
  },
  {
    id: 'white', label: 'White', colorMode: 'white',
    backgrounds: [
      { value: '#111827', label: 'Ink (dark)' },
      { value: 'transparent', label: 'Transparent' },
    ],
    defaultBg: '#111827',
  },
  {
    id: 'grey', label: 'Grey (watermark)', colorMode: 'grey',
    backgrounds: [
      { value: 'transparent', label: 'Transparent' },
      { value: '#FFFFFF', label: 'White' },
    ],
    defaultBg: 'transparent',
    note: 'Watermark use only — apply at low opacity',
  },
]

// Circle inverts the mark: ink circle gets white mark, white circle gets ink mark
const circleConfigs: Record<string, { circleFill: string; colorMode: ColorMode } | null> = {
  color: null,   // no circle variant for color mark
  ink: { circleFill: '#FFFFFF', colorMode: 'ink' },
  white: { circleFill: '#111827', colorMode: 'white' },
  grey: null,
}

const markSizes = [24, 32, 48, 64, 128, 256, 512, 1024]
const logotypeSizes = [32, 48, 64, 96, 128, 256, 512]

// ─── Logotype SVG (for export) ────────────────────────────────────

const STROKE_SEGMENTS = 48
const MARK_X0 = 11, MARK_X1 = 51, MARK_Y0 = 3, MARK_Y1 = 61
const MARK_CW = MARK_X1 - MARK_X0  // 42
const MARK_CH = MARK_Y1 - MARK_Y0  // 58

interface LogotypeSvgProps {
  height: number
  colorMode: ColorMode
  dotColorMode?: ColorMode
  textColor: string
}

const LogotypeSvg = forwardRef<SVGSVGElement, LogotypeSvgProps>(
  function LogotypeSvg({ height, colorMode, dotColorMode, textColor }, ref) {
    const textRef = useRef<SVGTextElement>(null)
    const [textW, setTextW] = useState<number | null>(null)

    const effectiveDotMode = dotColorMode ?? colorMode
    const { pathRef, metrics } = usePathMetrics(LOGO.pathD, LOGO.totalDots, LOGO.tailDots)

    // Scale mark so its visible height = requested height
    const scale = height / MARK_CH
    const markW = MARK_CW * scale
    const fontSize = height / 0.72
    const gap = fontSize * -0.01
    const descent = fontSize * 0.25
    const totalH = height + descent

    useEffect(() => {
      if (textRef.current) setTextW(textRef.current.getBBox().width)
    }, [fontSize])

    const textX = markW + gap
    const totalW = textW != null ? textX + textW + fontSize * 0.05 : textX + fontSize * 4

    return (
      <svg ref={ref} width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`} fill="none">
        <path ref={pathRef} d={LOGO.pathD} fill="none" stroke="none" />

        <defs>
          <clipPath id="lt-clip">
            <rect x="0" y="0" width={markW + 1} height={height + 1} />
          </clipPath>
        </defs>

        <g clipPath="url(#lt-clip)">
          <g transform={`translate(${-MARK_X0 * scale}, ${-MARK_Y0 * scale}) scale(${scale})`}>
            {metrics && (
              <>
                {metrics.dots.map((dot, i) => (
                  <circle key={i} cx={dot.x} cy={dot.y} r={LOGO.dotR}
                    fill={fillForMode(dot.t, effectiveDotMode)}
                  />
                ))}
                {(() => {
                  const strokeLen = metrics.connectedLen - LOGO.strokeW / 2 + LOGO.dotR * 0.75
                  return Array.from({ length: STROKE_SEGMENTS }, (_, i) => {
                    const segStart = (strokeLen * i) / STROKE_SEGMENTS
                    const segEnd = (strokeLen * (i + 1)) / STROKE_SEGMENTS
                    const progress = (segStart + segEnd) / 2 / strokeLen
                    const color = fillForMode(progress, colorMode)
                    return (
                      <path key={i} d={LOGO.pathD} fill="none" stroke={color}
                        strokeWidth={LOGO.strokeW} strokeLinecap="round"
                        strokeDasharray={`${segEnd - segStart + 1.5} ${metrics.totalLen}`}
                        strokeDashoffset={-segStart}
                      />
                    )
                  })
                })()}
              </>
            )}
          </g>
        </g>

        <text ref={textRef} x={textX} y={height}
          fontFamily="'Albert Sans', sans-serif" fontWeight={600}
          fontSize={fontSize} fill={textColor}
        >
          pectrea
        </text>
      </svg>
    )
  }
)

// ─── Dot color options ────────────────────────────────────────────

// ─── Asset Generator ──────────────────────────────────────────────

type Layout = 'mark' | 'logotype'

function AssetGenerator() {
  const [layout, setLayout] = useState<Layout>('mark')
  const [styleIdx, setStyleIdx] = useState(0)
  const [circle, setCircle] = useState(false)
  const [size, setSize] = useState(256)
  const [format, setFormat] = useState<'svg' | 'png' | 'jpg'>('svg')
  const [bg, setBg] = useState(markStyles[0].defaultBg)
  const svgRef = useRef<SVGSVGElement>(null)

  const style = markStyles[styleIdx]
  const isLogotype = layout === 'logotype'
  const circleConfig = circleConfigs[style.id]
  const useCircle = !isLogotype && circle && circleConfig != null

  const minSize = useCircle ? 32 : isLogotype ? 32 : 24
  const maxSize = useCircle ? 128 : 1024

  // Derive the actual colorMode and circle fill
  const renderColorMode = useCircle ? circleConfig!.colorMode : style.colorMode
  const renderDotColorMode = useCircle ? undefined : style.dotColorMode
  const circleFill = useCircle ? circleConfig!.circleFill : undefined

  // Text color for logotype: adapt to background
  const textColor = useMemo(() => {
    if (!isLogotype) return '#111827'
    if (style.colorMode === 'white') return '#FFFFFF'
    if (style.colorMode === 'ink') return '#111827'
    if (style.colorMode === 'grey') return '#A3A3A3'
    // color: derive from background
    return bg === '#111827' ? '#FFFFFF' : '#111827'
  }, [isLogotype, style, bg])

  // Circle backgrounds are the opposite of bare mark backgrounds
  const backgrounds = useMemo(() => {
    if (isLogotype) return style.backgrounds
    if (!useCircle) return style.backgrounds
    if (circleConfig!.circleFill === '#111827') {
      return [{ value: 'transparent', label: 'Transparent' }, { value: '#FFFFFF', label: 'White' }]
    }
    return [{ value: '#111827', label: 'Ink (dark)' }, { value: 'transparent', label: 'Transparent' }]
  }, [style, isLogotype, useCircle, circleConfig])

  const allSizes = isLogotype ? logotypeSizes : markSizes
  const availableSizes = useMemo(
    () => allSizes.filter(s => s >= minSize && s <= maxSize),
    [allSizes, minSize, maxSize]
  )

  const handleLayoutChange = useCallback((l: Layout) => {
    setLayout(l)
    setCircle(false)
    if (l === 'logotype') {
      setSize(prev => {
        const clamped = Math.max(32, Math.min(512, prev))
        return logotypeSizes.includes(clamped) ? clamped : 64
      })
    }
  }, [])

  const handleStyleChange = useCallback((idx: number) => {
    const s = markStyles[idx]
    setStyleIdx(idx)
    setCircle(false)
    setBg(s.defaultBg)
    setSize(prev => Math.max(minSize, Math.min(maxSize, prev)))
  }, [minSize, maxSize])

  const handleCircleToggle = useCallback((on: boolean) => {
    setCircle(on)
    if (on) {
      const cfg = circleConfigs[style.id]
      if (cfg) {
        setBg(cfg.circleFill === '#111827' ? 'transparent' : '#111827')
      }
      setSize(prev => Math.max(32, Math.min(128, prev)))
    } else {
      setBg(style.defaultBg)
      setSize(prev => Math.max(24, Math.min(1024, prev)))
    }
  }, [style])

  // Force white bg for JPG if transparent is selected
  const effectiveBg = useMemo(() => {
    if (format === 'jpg' && bg === 'transparent') {
      const whiteBg = backgrounds.find(b => b.value === '#FFFFFF')
      return whiteBg ? '#FFFFFF' : backgrounds[0].value
    }
    return bg
  }, [format, bg, backgrounds])

  const jpgWarning = format === 'jpg' && bg === 'transparent'

  const handleExport = useCallback(async () => {
    const svgEl = svgRef.current
    if (!svgEl) return

    if (isLogotype) {
      // Logotype export: serialize the rendered SVG, add bg rect if needed
      const vb = svgEl.viewBox.baseVal
      const w = vb.width, h = vb.height

      const clone = svgEl.cloneNode(true) as SVGSVGElement
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

      if (effectiveBg !== 'transparent') {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        rect.setAttribute('width', String(w))
        rect.setAttribute('height', String(h))
        rect.setAttribute('fill', effectiveBg)
        clone.insertBefore(rect, clone.firstChild)
      }

      const fullSvg = new XMLSerializer().serializeToString(clone)
      const name = `spectrea_logotype_${style.id}`

      if (format === 'svg') {
        downloadSvg(fullSvg, `${name}.svg`)
      } else {
        // Scale to export height
        const exportScale = size / h
        const exportW = Math.round(w * exportScale)
        const scaledSvg = fullSvg
          .replace(`width="${w}"`, `width="${exportW}"`)
          .replace(`height="${h}"`, `height="${size}"`)
        await downloadRaster(scaledSvg, exportW, size, format, `${name}_${size}h.${format}`)
      }
    } else {
      // Mark export (same as before)
      const innerSvg = serializeSvg(svgEl)
      if (!innerSvg) return

      const parser = new DOMParser()
      const doc = parser.parseFromString(innerSvg, 'image/svg+xml')
      const innerContent = doc.documentElement.innerHTML

      const exportSize = format === 'svg' ? 64 : size
      const scale = exportSize / 64
      let svgContent = ''

      if (effectiveBg !== 'transparent') {
        svgContent += `<rect width="${exportSize}" height="${exportSize}" fill="${effectiveBg}" />`
      }

      if (circleFill) {
        svgContent += `<g transform="scale(${scale})">`
        svgContent += `<circle cx="32" cy="32" r="32" fill="${circleFill}" />`
        svgContent += `<g transform="translate(10, 10) scale(0.6875)">`
        svgContent += innerContent
        svgContent += `</g></g>`
      } else {
        svgContent += `<g transform="scale(${scale})">`
        svgContent += innerContent
        svgContent += `</g>`
      }

      const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${exportSize}" height="${exportSize}" viewBox="0 0 ${exportSize} ${exportSize}">${svgContent}</svg>`
      const name = `spectrea_${style.id}${circleFill ? '_circle' : ''}`

      if (format === 'svg') {
        downloadSvg(fullSvg, `${name}.svg`)
      } else {
        await downloadRaster(fullSvg, size, size, format, `${name}_${size}px.${format}`)
      }
    }
  }, [isLogotype, style, circleFill, size, format, effectiveBg])

  const note = useCircle
    ? 'Circle container is for small sizes (below 48px). Use bare mark at larger sizes.'
    : style.note

  const label = isLogotype
    ? `${style.label} logotype`
    : `${style.label}${useCircle ? ' circle' : ''} mark`

  const selectClass = "w-full text-sm border border-stone-300 rounded-lg px-2 py-1.5 bg-white text-stone-800"

  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden">
      {/* Controls */}
      <div className="bg-stone-50 p-4 border-b border-stone-200 grid grid-cols-2 md:grid-cols-6 gap-3">
        <div>
          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">Layout</label>
          <select value={layout} onChange={e => handleLayoutChange(e.target.value as Layout)} className={selectClass}>
            <option value="mark">Mark</option>
            <option value="logotype">Logotype</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">Style</label>
          <select
            value={styleIdx}
            onChange={e => handleStyleChange(Number(e.target.value))}
            className={selectClass}
          >
            {markStyles.map((s, i) => (
              <option key={s.id} value={i}>{s.label}</option>
            ))}
          </select>
        </div>
        {!isLogotype && (
          <div>
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">Container</label>
            <select
              value={useCircle ? 'circle' : 'none'}
              onChange={e => handleCircleToggle(e.target.value === 'circle')}
              disabled={circleConfig == null}
              className={`${selectClass} disabled:opacity-40`}
            >
              <option value="none">None</option>
              <option value="circle" disabled={circleConfig == null}>Circle</option>
            </select>
          </div>
        )}
        <div>
          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">Background</label>
          <select value={bg} onChange={e => setBg(e.target.value)} className={selectClass}>
            {backgrounds.map(b => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
            {isLogotype ? 'Height' : 'Size'}
          </label>
          <select value={size} onChange={e => setSize(Number(e.target.value))} className={selectClass}>
            {availableSizes.map(s => (
              <option key={s} value={s}>{isLogotype ? `${s}px` : `${s} x ${s}px`}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">Format</label>
          <select
            value={format}
            onChange={e => setFormat(e.target.value as 'svg' | 'png' | 'jpg')}
            className={selectClass}
          >
            <option value="svg">SVG (vector)</option>
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
          </select>
        </div>
      </div>


      {/* Warnings */}
      {(note || jpgWarning) && (
        <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 flex items-start gap-2">
          <span className="text-amber-500 text-xs mt-0.5">!</span>
          <div className="text-xs text-amber-700">
            {jpgWarning && <p>JPG does not support transparency. Background will be set to {effectiveBg === '#FFFFFF' ? 'white' : 'ink'}.</p>}
            {note && <p>{note}</p>}
          </div>
        </div>
      )}

      {/* Preview */}
      <div className="p-8 flex flex-col items-center gap-4" style={{
        backgroundColor: effectiveBg === 'transparent' ? undefined : effectiveBg,
        backgroundImage: effectiveBg === 'transparent' ? 'repeating-conic-gradient(#E5E7EB 0% 25%, transparent 0% 50%)' : undefined,
        backgroundSize: effectiveBg === 'transparent' ? '16px 16px' : undefined,
      }}>
        {isLogotype ? (
          <LogotypeSvg
            ref={svgRef}
            height={Math.min(size, 120)}
            colorMode={style.colorMode}
            dotColorMode={style.dotColorMode}
            textColor={textColor}
          />
        ) : circleFill ? (
          <div className="rounded-full flex items-center justify-center" style={{
            width: Math.min(size, 200),
            height: Math.min(size, 200),
            backgroundColor: circleFill,
          }}>
            <StaticLogo
              ref={svgRef}
              size={Math.min(size, 200) * 0.6875}
              colorMode={renderColorMode}
              dotColorMode={renderDotColorMode}

            />
          </div>
        ) : (
          <StaticLogo
            ref={svgRef}
            size={Math.min(size, 200)}
            colorMode={renderColorMode}
            dotColorMode={renderDotColorMode}
          />
        )}
        <p className="text-xs" style={{ color: '#9CA3AF' }}>
          {label} — {isLogotype ? `${size}px height` : `${size}x${size}px`} — {format.toUpperCase()}{effectiveBg !== 'transparent' ? ` on ${effectiveBg === '#FFFFFF' ? 'white' : 'ink'}` : ''}
        </p>
      </div>

      {/* Export */}
      <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
        <p className="text-xs text-stone-500">
          {format === 'svg' ? 'Vector — scales to any size' : `${isLogotype ? `${size}px height` : `${size}x${size}px`} raster`}
        </p>
        <button
          onClick={handleExport}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
          style={{ backgroundColor: '#4271DF' }}
        >
          Download {format.toUpperCase()}
        </button>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────

export default function LogoExploration() {
  return (
    <PageShell
      title="Specs & Export"
      subtitle="Full technical specifications and guideline-safe asset generator."
    >
      {/* Generator */}
      <Section>
        <h2 className="text-lg font-semibold text-stone-800 mb-4">Asset Generator</h2>
        <p className="text-xs text-stone-500 mb-4">Only guideline-compliant combinations are available. Invalid backgrounds, sizes, and formats are prevented automatically.</p>
        <AssetGenerator />
      </Section>

      {/* Specs */}
      <Section>
        <h2 className="text-lg font-semibold text-stone-800 mb-4">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-stone-50 px-4 py-2 border-b border-stone-200">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Mark geometry</p>
            </div>
            {[
              { label: 'ViewBox', value: '0 0 64 64' },
              { label: 'Path (cubic Bezier)', value: LOGO.pathD },
              { label: 'Total dots', value: `${LOGO.totalDots} (evenly spaced t=0 to t=1)` },
              { label: 'Trailing dots', value: '2 (visually unconnected)' },
              { label: 'Dot radius', value: `${LOGO.dotR}` },
              { label: 'Stroke width', value: `${LOGO.strokeW}` },
              { label: 'Linecap', value: 'round' },
              { label: 'Stroke segments', value: '48 (individually colored for path-following gradient)' },
              { label: 'Segment overlap', value: '+1.5 units with round caps for seamless joins' },
            ].map((row, i) => (
              <div key={row.label} className="flex gap-3 px-4 py-2" style={{ borderBottom: i < 8 ? '1px solid #F3F4F6' : 'none' }}>
                <span className="text-xs font-medium text-stone-500 w-36 flex-shrink-0">{row.label}</span>
                <span className="text-xs font-mono text-stone-700 break-all">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-stone-50 px-4 py-2 border-b border-stone-200">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Colors</p>
            </div>
            {[
              { label: 'Gradient start', value: 'Cobalt #4271DF (t=0)' },
              { label: 'Gradient mid', value: 'Teal #00B6A0 (t=0.5)' },
              { label: 'Gradient end', value: 'Amber #E19000 (t=1)' },
              { label: 'Interpolation', value: 'Linear RGB, two-segment (Cobalt to Teal, Teal to Amber)' },
              { label: 'Grey (dots / watermark)', value: '#A3A3A3' },
              { label: 'Ink', value: '#111827' },
              { label: 'White', value: '#FFFFFF' },
            ].map((row, i) => (
              <div key={row.label} className="flex gap-3 px-4 py-2" style={{ borderBottom: i < 6 ? '1px solid #F3F4F6' : 'none' }}>
                <span className="text-xs font-medium text-stone-500 w-36 flex-shrink-0">{row.label}</span>
                <span className="text-xs font-mono text-stone-700">{row.value}</span>
              </div>
            ))}
            <div className="px-4 py-3 border-t border-stone-100">
              <p className="text-xs font-medium text-stone-500 mb-2">Gradient preview</p>
              <div className="h-4 rounded-full overflow-hidden flex">
                {Array.from({ length: 48 }, (_, i) => (
                  <div key={i} className="flex-1" style={{ backgroundColor: gradientColor(i / 47) }} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-stone-50 px-4 py-2 border-b border-stone-200">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Typography (wordmark)</p>
            </div>
            {[
              { label: 'Typeface', value: 'Albert Sans' },
              { label: 'Weight', value: 'Semibold (600)' },
              { label: 'Descriptor style', value: 'Uppercase, tracking-widest, Grey #9CA3AF' },
              { label: 'Logotype', value: 'Mark replaces "S", cropped to visual bounds, cap-height aligned' },
              { label: 'Logotype min size', value: '36px font-size' },
            ].map((row, i) => (
              <div key={row.label} className="flex gap-3 px-4 py-2" style={{ borderBottom: i < 4 ? '1px solid #F3F4F6' : 'none' }}>
                <span className="text-xs font-medium text-stone-500 w-36 flex-shrink-0">{row.label}</span>
                <span className="text-xs font-mono text-stone-700">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-stone-50 px-4 py-2 border-b border-stone-200">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Animation</p>
            </div>
            {[
              { label: 'Duration', value: '3 seconds (loop)' },
              { label: 'Draw phase', value: '0-57%, ease-out (quadratic)' },
              { label: 'Pause (drawn)', value: '57-60%' },
              { label: 'Undraw phase', value: '60-97%, ease-in, directional fade (15% path length)' },
              { label: 'Pause (erased)', value: '97-100%' },
              { label: 'Dots', value: 'Always visible beneath the stroke' },
            ].map((row, i) => (
              <div key={row.label} className="flex gap-3 px-4 py-2" style={{ borderBottom: i < 5 ? '1px solid #F3F4F6' : 'none' }}>
                <span className="text-xs font-medium text-stone-500 w-36 flex-shrink-0">{row.label}</span>
                <span className="text-xs font-mono text-stone-700">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

    </PageShell>
  )
}
