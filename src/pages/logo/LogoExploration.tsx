import { useState, useRef, useCallback, useMemo } from 'react'
import PageShell, { Section } from '../../components/layout/PageShell'
import {
  StaticLogo,
  Logotype,
  LogotypeGradient,
  LOGO,
  gradientColor,
  type ColorMode,
  type MonoColorMode,
} from '../../components/brand/SpectreaLogo'

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
        ctx.fillStyle = '#FDFDFB'
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

// ─── Style catalogue ──────────────────────────────────────────────
// Aligned with the brand rules:
//   - Mark: Primary (Cool Duet), Full Spectrum (hero), Ink, White, Grey
//   - Lockup: Full Spectrum (the one and only gradient) OR Mono (Ink, White)
// Duets (cool/balanced/warm) are mark-only — they are never a lockup treatment.

interface BgOption { value: string; label: string }

interface Style {
  id: string
  label: string
  /** Used for the standalone mark (StaticLogo). */
  markColorMode: ColorMode
  /** Used for the mono lockup (Logotype). `null` means "not available as mono
   *  lockup"; full-spectrum routes through LogotypeGradient instead. */
  monoLockup: MonoColorMode | null
  /** Whether this style has a valid lockup form at all. Grey watermark is
   *  mark-only — lockups need full readability. */
  lockupEnabled: boolean
  /** Whether this style can be contained inside a circle. */
  circle: { fill: string; inner: MonoColorMode } | null
  backgrounds: BgOption[]
  defaultBg: string
  note?: string
}

const styles: Style[] = [
  {
    id: 'primary',
    label: 'Primary (Cool Duet)',
    markColorMode: 'cool',
    monoLockup: null,  // Cool Duet is NOT a valid lockup — mark-only treatment
    lockupEnabled: false,
    circle: null,
    backgrounds: [
      { value: 'transparent', label: 'Transparent' },
      { value: '#FDFDFB', label: 'Canvas' },
      { value: '#18181C', label: 'Ink (dark)' },
    ],
    defaultBg: 'transparent',
  },
  {
    id: 'balanced',
    label: 'Balanced Duet',
    markColorMode: 'balanced',
    monoLockup: null,  // duets are mark-only
    lockupEnabled: false,
    circle: null,
    backgrounds: [
      { value: 'transparent', label: 'Transparent' },
      { value: '#FDFDFB', label: 'Canvas' },
      { value: '#18181C', label: 'Ink (dark)' },
    ],
    defaultBg: 'transparent',
    note: 'Mark-only treatment. Use for product & ecosystem moments.',
  },
  {
    id: 'warm',
    label: 'Warm Duet',
    markColorMode: 'warm',
    monoLockup: null,  // duets are mark-only
    lockupEnabled: false,
    circle: null,
    backgrounds: [
      { value: 'transparent', label: 'Transparent' },
      { value: '#FDFDFB', label: 'Canvas' },
      { value: '#18181C', label: 'Ink (dark)' },
    ],
    defaultBg: 'transparent',
    note: 'Mark-only treatment. Use for marketing, launches, attention moments.',
  },
  {
    id: 'full-spectrum',
    label: 'Full Spectrum',
    markColorMode: 'color',
    monoLockup: null,  // routes to LogotypeGradient for the lockup
    lockupEnabled: true,
    circle: null,
    backgrounds: [
      { value: 'transparent', label: 'Transparent' },
      { value: '#FDFDFB', label: 'Canvas' },
      { value: '#18181C', label: 'Ink (dark)' },
    ],
    defaultBg: 'transparent',
  },
  {
    id: 'full-spectrum-white',
    label: 'Full Spectrum / White',
    markColorMode: 'color',
    monoLockup: null,  // routes to LogotypeGradient with markColorMode='color'
    lockupEnabled: true,
    circle: null,
    backgrounds: [
      { value: 'transparent', label: 'Transparent' },
      { value: '#18181C', label: 'Ink (dark)' },
    ],
    defaultBg: 'transparent',
    note: 'Full spectrum mark with white wordmark. Use on dark or photographic surfaces.',
  },
  {
    id: 'ink',
    label: 'Ink',
    markColorMode: 'ink',
    monoLockup: 'ink',
    lockupEnabled: true,
    circle: { fill: '#FDFDFB', inner: 'ink' },  // ink mark in white circle (variant #11)
    backgrounds: [
      { value: 'transparent', label: 'Transparent' },
      { value: '#FDFDFB', label: 'Canvas' },
    ],
    defaultBg: 'transparent',
  },
  {
    id: 'white',
    label: 'White',
    markColorMode: 'white',
    monoLockup: 'white',
    lockupEnabled: true,
    circle: { fill: '#18181C', inner: 'white' },  // white mark in ink circle (variant #10)
    backgrounds: [
      { value: '#18181C', label: 'Ink (dark)' },
      { value: 'transparent', label: 'Transparent' },
    ],
    defaultBg: '#18181C',
  },
  {
    id: 'grey',
    label: 'Grey (watermark)',
    markColorMode: 'grey',
    monoLockup: null,
    lockupEnabled: false,
    circle: null,
    backgrounds: [
      { value: 'transparent', label: 'Transparent' },
      { value: '#FDFDFB', label: 'Canvas' },
    ],
    defaultBg: 'transparent',
    note: 'Watermark use only — apply at low opacity. No lockup form.',
  },
]

const markSizes = [24, 32, 48, 64, 128, 256, 512, 1024]
const logotypeSizes = [32, 48, 64, 96, 128, 256, 512]

// ─── Asset Generator ──────────────────────────────────────────────

type Layout = 'mark' | 'logotype'

function AssetGenerator() {
  const [layout, setLayout] = useState<Layout>('mark')
  const [styleIdx, setStyleIdx] = useState(0)
  const [circle, setCircle] = useState(false)
  const [size, setSize] = useState(256)
  const [format, setFormat] = useState<'svg' | 'png' | 'jpg'>('svg')
  const [bg, setBg] = useState(styles[0].defaultBg)
  const svgRef = useRef<SVGSVGElement>(null)

  const style = styles[styleIdx]
  const isLogotype = layout === 'logotype'

  // Available styles depend on layout. Logotypes require lockupEnabled.
  const availableStyleIndexes = useMemo(
    () => styles.map((s, i) => ({ s, i })).filter(({ s }) => !isLogotype || s.lockupEnabled).map(({ i }) => i),
    [isLogotype],
  )

  const useCircle = !isLogotype && circle && style.circle != null
  const minSize = useCircle ? 32 : isLogotype ? 32 : 24
  const maxSize = useCircle ? 128 : 1024

  // Backgrounds depend on whether we're in circle mode.
  const backgrounds = useMemo(() => {
    if (isLogotype) return style.backgrounds
    if (!useCircle || !style.circle) return style.backgrounds
    // A contained mark is rendered against the OPPOSITE of its circle fill.
    if (style.circle.fill === '#18181C') {
      return [{ value: 'transparent', label: 'Transparent' }, { value: '#FDFDFB', label: 'Canvas' }]
    }
    return [{ value: '#18181C', label: 'Ink (dark)' }, { value: 'transparent', label: 'Transparent' }]
  }, [isLogotype, useCircle, style])

  const allSizes = isLogotype ? logotypeSizes : markSizes
  const availableSizes = useMemo(
    () => allSizes.filter(s => s >= minSize && s <= maxSize),
    [allSizes, minSize, maxSize],
  )

  const handleLayoutChange = useCallback((l: Layout) => {
    setLayout(l)
    setCircle(false)
    // If switching to logotype and the current style isn't lockup-enabled,
    // bump to the first enabled style.
    if (l === 'logotype' && !styles[styleIdx].lockupEnabled) {
      const first = styles.findIndex(s => s.lockupEnabled)
      if (first >= 0) {
        setStyleIdx(first)
        setBg(styles[first].defaultBg)
      }
    }
    if (l === 'logotype') {
      setSize(prev => {
        const clamped = Math.max(32, Math.min(512, prev))
        return logotypeSizes.includes(clamped) ? clamped : 64
      })
    }
  }, [styleIdx])

  const handleStyleChange = useCallback((idx: number) => {
    const s = styles[idx]
    setStyleIdx(idx)
    setCircle(false)
    setBg(s.defaultBg)
    setSize(prev => Math.max(minSize, Math.min(maxSize, prev)))
  }, [minSize, maxSize])

  const handleCircleToggle = useCallback((on: boolean) => {
    setCircle(on)
    if (on && style.circle) {
      setBg(style.circle.fill === '#18181C' ? 'transparent' : '#18181C')
      setSize(prev => Math.max(32, Math.min(128, prev)))
    } else {
      setBg(style.defaultBg)
      setSize(prev => Math.max(24, Math.min(1024, prev)))
    }
  }, [style])

  const effectiveBg = useMemo(() => {
    if (format === 'jpg' && bg === 'transparent') {
      const canvasBg = backgrounds.find(b => b.value === '#FDFDFB')
      return canvasBg ? '#FDFDFB' : backgrounds[0].value
    }
    return bg
  }, [format, bg, backgrounds])

  const jpgWarning = format === 'jpg' && bg === 'transparent'

  // Preview-size clamp so nothing overflows the preview area.
  const previewMarkSize = Math.min(size, 200)
  const previewLockupFont = Math.min(size / 0.72, 120) // height → fontSize

  // ─── Export ──────────────────────────────────────────────────────
  const handleExport = useCallback(async () => {
    const svgEl = svgRef.current
    if (!svgEl) return

    const namePrefix = isLogotype
      ? `spectrea_logotype_${style.id}`
      : `spectrea_${style.id}${useCircle ? '_circle' : ''}`

    if (isLogotype) {
      // Serialize the rendered lockup SVG directly.
      const vb = svgEl.viewBox.baseVal
      const w = vb.width || Number(svgEl.getAttribute('width'))
      const h = vb.height || Number(svgEl.getAttribute('height'))

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

      if (format === 'svg') {
        downloadSvg(fullSvg, `${namePrefix}.svg`)
      } else {
        const exportScale = size / h
        const exportW = Math.round(w * exportScale)
        const scaledSvg = fullSvg
          .replace(`width="${w}"`, `width="${exportW}"`)
          .replace(`height="${h}"`, `height="${size}"`)
        await downloadRaster(scaledSvg, exportW, size, format, `${namePrefix}_${size}h.${format}`)
      }
    } else {
      // Mark export: wrap the serialized StaticLogo in a fixed-size viewBox.
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

      if (useCircle && style.circle) {
        svgContent += `<g transform="scale(${scale})">`
        svgContent += `<circle cx="32" cy="32" r="32" fill="${style.circle.fill}" />`
        svgContent += `<g transform="translate(10, 10) scale(0.6875)">`
        svgContent += innerContent
        svgContent += `</g></g>`
      } else {
        svgContent += `<g transform="scale(${scale})">`
        svgContent += innerContent
        svgContent += `</g>`
      }

      const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${exportSize}" height="${exportSize}" viewBox="0 0 ${exportSize} ${exportSize}">${svgContent}</svg>`

      if (format === 'svg') {
        downloadSvg(fullSvg, `${namePrefix}.svg`)
      } else {
        await downloadRaster(fullSvg, size, size, format, `${namePrefix}_${size}px.${format}`)
      }
    }
  }, [isLogotype, style, useCircle, size, format, effectiveBg])

  const note = useCircle
    ? 'Circle container is for small sizes (below 48px). Use the bare mark at larger sizes.'
    : style.note

  const label = isLogotype
    ? `${style.label} logotype`
    : `${style.label}${useCircle ? ' circle' : ''} mark`

  const selectClass = 'w-full text-sm border border-stone-300 rounded-lg px-2 py-1.5 bg-white text-ink'

  // Full-spectrum lockup wordmark: Ink on light surfaces, White on Ink.
  // On transparent (checker preview), default to Ink — that's the expected
  // resting state and prints correctly on paper / light slides.
  const fullSpectrumWordmarkMode: MonoColorMode = effectiveBg === '#18181C' ? 'white' : 'ink'

  // ─── Render the preview ──────────────────────────────────────────
  const preview = (() => {
    if (isLogotype) {
      if (style.id === 'full-spectrum') {
        return <LogotypeGradient ref={svgRef} fontSize={previewLockupFont} colorMode={fullSpectrumWordmarkMode} />
      }
      if (style.id === 'full-spectrum-white') {
        return <LogotypeGradient ref={svgRef} fontSize={previewLockupFont} colorMode="white" />
      }
      if (style.monoLockup) {
        const textColor = style.monoLockup === 'white' ? '#FDFDFB' : style.monoLockup === 'ink' ? '#18181C' : '#A3A3A3'
        return (
          <Logotype
            ref={svgRef}
            fontSize={previewLockupFont}
            colorMode={style.monoLockup}
            color={textColor}
          />
        )
      }
      return null
    }

    if (useCircle && style.circle) {
      return (
        <div
          className="rounded-full flex items-center justify-center"
          style={{ width: previewMarkSize, height: previewMarkSize, backgroundColor: style.circle.fill }}
        >
          <StaticLogo
            ref={svgRef}
            size={previewMarkSize * 0.6875}
            colorMode={style.circle.inner}
          />
        </div>
      )
    }

    return <StaticLogo ref={svgRef} size={previewMarkSize} colorMode={style.markColorMode} />
  })()

  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden">
      {/* Controls */}
      <div className="bg-cloud p-4 border-b border-stone-200 grid grid-cols-2 md:grid-cols-6 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate uppercase tracking-wider block mb-1">Layout</label>
          <select value={layout} onChange={e => handleLayoutChange(e.target.value as Layout)} className={selectClass}>
            <option value="mark">Mark</option>
            <option value="logotype">Logotype</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate uppercase tracking-wider block mb-1">Style</label>
          <select value={styleIdx} onChange={e => handleStyleChange(Number(e.target.value))} className={selectClass}>
            {availableStyleIndexes.map(i => (
              <option key={styles[i].id} value={i}>{styles[i].label}</option>
            ))}
          </select>
        </div>
        {!isLogotype && (
          <div>
            <label className="text-xs font-semibold text-slate uppercase tracking-wider block mb-1">Container</label>
            <select
              value={useCircle ? 'circle' : 'none'}
              onChange={e => handleCircleToggle(e.target.value === 'circle')}
              disabled={style.circle == null}
              className={`${selectClass} disabled:opacity-40`}
            >
              <option value="none">None</option>
              <option value="circle" disabled={style.circle == null}>Circle</option>
            </select>
          </div>
        )}
        <div>
          <label className="text-xs font-semibold text-slate uppercase tracking-wider block mb-1">Background</label>
          <select value={bg} onChange={e => setBg(e.target.value)} className={selectClass}>
            {backgrounds.map(b => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>
        {format !== 'svg' && (
          <div>
            <label className="text-xs font-semibold text-slate uppercase tracking-wider block mb-1">
              {isLogotype ? 'Height' : 'Size'}
            </label>
            <select value={size} onChange={e => setSize(Number(e.target.value))} className={selectClass}>
              {availableSizes.map(s => (
                <option key={s} value={s}>{isLogotype ? `${s}px` : `${s} x ${s}px`}</option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label className="text-xs font-semibold text-slate uppercase tracking-wider block mb-1">Format</label>
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
            {jpgWarning && <p>JPG does not support transparency. Background will be set to {effectiveBg === '#FDFDFB' ? 'canvas' : 'ink'}.</p>}
            {note && <p>{note}</p>}
          </div>
        </div>
      )}

      {/* Preview */}
      <div
        className="p-8 flex flex-col items-center gap-4"
        style={{
          backgroundColor: effectiveBg === 'transparent' ? undefined : effectiveBg,
          backgroundImage: effectiveBg === 'transparent' ? 'repeating-conic-gradient(#E5E7EB 0% 25%, transparent 0% 50%)' : undefined,
          backgroundSize: effectiveBg === 'transparent' ? '16px 16px' : undefined,
        }}
      >
        {preview}
        <p className="text-xs" style={{ color: effectiveBg === '#18181C' ? '#B0B0B6' : '#97979E' }}>
          {label} — {isLogotype ? `${size}px height` : `${size}x${size}px`} — {format.toUpperCase()}{effectiveBg !== 'transparent' ? ` on ${effectiveBg === '#FDFDFB' ? 'canvas' : 'ink'}` : ''}
        </p>
      </div>

      {/* Export */}
      <div className="p-4 border-t border-stone-200 bg-cloud flex items-center justify-between">
        <p className="text-xs text-slate">
          {format === 'svg' ? 'Vector — scales to any size' : `${isLogotype ? `${size}px height` : `${size}x${size}px`} raster`}
        </p>
        <button
          onClick={handleExport}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand hover:bg-brand-hover active:bg-brand-active transition-colors btn-focus"
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
      subtitle="The spec sheet, plus an exporter — so whatever you need, in whatever format, is one click away and still within the rules."
    >
      {/* Generator */}
      <Section>
        <h2 className="text-lg font-semibold text-ink mb-4">Asset Generator</h2>
        <p className="text-xs text-slate mb-4">
          Only guideline-compliant combinations are available. The logotype offers the two approved forms only — <strong>Full Spectrum</strong> (gradient) or <strong>Mono</strong> (Ink / White). Cool Duet and Grey are mark-only treatments.
        </p>
        <AssetGenerator />
      </Section>

      {/* Specs */}
      <Section>
        <h2 className="text-lg font-semibold text-ink mb-4">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-cloud px-4 py-2 border-b border-stone-200">
              <p className="text-xs font-semibold text-pewter uppercase tracking-wider">Mark geometry</p>
            </div>
            {[
              { label: 'ViewBox', value: '0 0 64 64' },
              { label: 'Path (cubic Bezier)', value: LOGO.pathD },
              { label: 'Total dots', value: `${LOGO.totalDots} (evenly spaced t=0 to t=1)` },
              { label: 'Trailing dots', value: '2 (visually unconnected)' },
              { label: 'Dot radius', value: `${LOGO.dotR}` },
              { label: 'Stroke width', value: `${LOGO.strokeW}` },
              { label: 'Linecap', value: 'round' },
              { label: 'Stroke segments', value: '48 (individually coloured for path-following gradient)' },
              { label: 'Segment overlap', value: '+1.5 units with round caps for continuous joins' },
            ].map((row, i, arr) => (
              <div key={row.label} className="flex gap-3 px-4 py-2" style={{ borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                <span className="text-xs font-medium text-slate w-36 flex-shrink-0">{row.label}</span>
                <span className="text-xs font-mono text-iron break-all">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-cloud px-4 py-2 border-b border-stone-200">
              <p className="text-xs font-semibold text-pewter uppercase tracking-wider">Colours</p>
            </div>
            {[
              { label: 'Mark — Cool Duet start', value: 'Cobalt #4271DF' },
              { label: 'Mark — Cool Duet end', value: 'Teal #00B6A0' },
              { label: 'Lockup gradient — stop 1', value: 'Cobalt #4271DF (0%)' },
              { label: 'Lockup gradient — stop 2', value: 'Teal #00B6A0 (100%)' },
              { label: 'Lockup wordmark', value: 'Monotone — Ink #18181C (light) / Canvas #FDFDFB (dark)' },
              { label: 'Grey (dots / watermark)', value: '#A3A3A3' },
              { label: 'Ink', value: '#18181C' },
              { label: 'Canvas / White', value: '#FDFDFB' },
            ].map((row, i, arr) => (
              <div key={row.label} className="flex gap-3 px-4 py-2" style={{ borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                <span className="text-xs font-medium text-slate w-40 flex-shrink-0">{row.label}</span>
                <span className="text-xs font-mono text-iron">{row.value}</span>
              </div>
            ))}
            <div className="px-4 py-3 border-t border-stone-100">
              <p className="text-xs font-medium text-slate mb-2">Full-spectrum preview (mark `color` mode)</p>
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
            <div className="bg-cloud px-4 py-2 border-b border-stone-200">
              <p className="text-xs font-semibold text-pewter uppercase tracking-wider">Typography (wordmark)</p>
            </div>
            {[
              { label: 'Typeface', value: 'Albert Sans' },
              { label: 'Weight', value: 'Semibold (600)' },
              { label: 'Case', value: 'ALL CAPS' },
              { label: 'Tracking', value: '0.02em' },
              { label: 'Descriptor style', value: 'Uppercase, tracking-widest, Pewter #97979E' },
              { label: 'Lockup composition', value: 'Mark replaces "S", cropped to visual bounds, cap-height aligned' },
              { label: 'Logotype min size', value: '32px font-size' },
            ].map((row, i, arr) => (
              <div key={row.label} className="flex gap-3 px-4 py-2" style={{ borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                <span className="text-xs font-medium text-slate w-36 flex-shrink-0">{row.label}</span>
                <span className="text-xs font-mono text-iron">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-cloud px-4 py-2 border-b border-stone-200">
              <p className="text-xs font-semibold text-pewter uppercase tracking-wider">Animation</p>
            </div>
            {[
              { label: 'Duration', value: '3 seconds (loop)' },
              { label: 'Draw phase', value: '0-57%, ease-out (quadratic)' },
              { label: 'Pause (drawn)', value: '57-60%' },
              { label: 'Undraw phase', value: '60-97%, ease-in, directional fade (15% path length)' },
              { label: 'Pause (erased)', value: '97-100%' },
              { label: 'Dots', value: 'Always grey, visible beneath the stroke' },
            ].map((row, i, arr) => (
              <div key={row.label} className="flex gap-3 px-4 py-2" style={{ borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                <span className="text-xs font-medium text-slate w-36 flex-shrink-0">{row.label}</span>
                <span className="text-xs font-mono text-iron">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
