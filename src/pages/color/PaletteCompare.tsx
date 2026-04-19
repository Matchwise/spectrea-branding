import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import PageShell, { Section } from '../../components/layout/PageShell'
import { LOGO } from '../../components/brand/SpectreaLogo'

// ─── OKLCH ↔ sRGB conversion ─────────────────────────────────────

function oklchToOklab(L: number, C: number, h: number) {
  const hRad = h * Math.PI / 180
  return { L, a: C * Math.cos(hRad), b: C * Math.sin(hRad) }
}

function oklabToLinearSrgb(L: number, a: number, b: number) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b
  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_
  return {
    r: +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  }
}

function linearToSrgb(c: number) {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
}

function srgbToLinear(c: number) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

function oklchToHex(L: number, C: number, h: number): string {
  const { L: oL, a, b: oB } = oklchToOklab(L, C, h)
  const lin = oklabToLinearSrgb(oL, a, oB)
  const r = Math.round(Math.max(0, Math.min(1, linearToSrgb(lin.r))) * 255)
  const g = Math.round(Math.max(0, Math.min(1, linearToSrgb(lin.g))) * 255)
  const b = Math.round(Math.max(0, Math.min(1, linearToSrgb(lin.b))) * 255)
  return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('').toUpperCase()
}

function isInGamut(L: number, C: number, h: number): boolean {
  const { L: oL, a, b: oB } = oklchToOklab(L, C, h)
  const lin = oklabToLinearSrgb(oL, a, oB)
  const r = linearToSrgb(lin.r)
  const g = linearToSrgb(lin.g)
  const b = linearToSrgb(lin.b)
  return r >= -0.002 && r <= 1.002 && g >= -0.002 && g <= 1.002 && b >= -0.002 && b <= 1.002
}

function maxChroma(L: number, h: number): number {
  let lo = 0, hi = 0.4
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2
    if (isInGamut(L, mid, h)) lo = mid; else hi = mid
  }
  return lo
}

function hexToOklch(hex: string): { L: number; C: number; h: number } {
  const r = srgbToLinear(parseInt(hex.slice(1, 3), 16) / 255)
  const g = srgbToLinear(parseInt(hex.slice(3, 5), 16) / 255)
  const b = srgbToLinear(parseInt(hex.slice(5, 7), 16) / 255)
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L2 = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s
  const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s
  const b2 = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s
  const C = Math.sqrt(a * a + b2 * b2)
  let h = Math.atan2(b2, a) * 180 / Math.PI
  if (h < 0) h += 360
  return { L: L2, C, h }
}

// ─── Custom logo with arbitrary gradient ──────────────────────────

function CustomLogo({ size, cobalt, teal, amber }: { size: number; cobalt: string; teal: string; amber: string }) {
  const pathRef = useRef<SVGPathElement>(null)
  const [metrics, setMetrics] = useState<{ totalLen: number; connectedLen: number; dots: { x: number; y: number; t: number }[] } | null>(null)

  useEffect(() => {
    const el = pathRef.current
    if (!el) return
    const totalLen = el.getTotalLength()
    const dots: { x: number; y: number; t: number }[] = []
    for (let i = 0; i < LOGO.totalDots; i++) {
      const t = i / (LOGO.totalDots - 1)
      const p = el.getPointAtLength(t * totalLen)
      dots.push({ x: p.x, y: p.y, t })
    }
    const connectedFraction = (LOGO.totalDots - LOGO.tailDots) / (LOGO.totalDots - 1)
    setMetrics({ totalLen, connectedLen: connectedFraction * totalLen, dots })
  }, [])

  function gradientColor(t: number): string {
    const parse = (hex: string) => [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)]
    const [r1, g1, b1] = parse(cobalt)
    const [r2, g2, b2] = parse(teal)
    const [r3, g3, b3] = parse(amber)
    if (t < 0.5) {
      const p = t / 0.5
      return `rgb(${Math.round(r1 + (r2 - r1) * p)},${Math.round(g1 + (g2 - g1) * p)},${Math.round(b1 + (b2 - b1) * p)})`
    }
    const p = (t - 0.5) / 0.5
    return `rgb(${Math.round(r2 + (r3 - r2) * p)},${Math.round(g2 + (g3 - g2) * p)},${Math.round(b2 + (b3 - b2) * p)})`
  }

  const strokeLen = metrics ? metrics.connectedLen - LOGO.strokeW / 2 + LOGO.dotR * 0.75 : 0

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path ref={pathRef} d={LOGO.pathD} fill="none" stroke="none" />
      {metrics && (
        <>
          {metrics.dots.map((dot, i) => (
            <circle key={i} cx={dot.x} cy={dot.y} r={LOGO.dotR} fill="#A3A3A3" />
          ))}
          {Array.from({ length: 48 }, (_, i) => {
            const segStart = (strokeLen * i) / 48
            const segEnd = (strokeLen * (i + 1)) / 48
            const progress = (segStart + segEnd) / 2 / strokeLen
            return (
              <path key={i} d={LOGO.pathD} fill="none"
                stroke={gradientColor(progress)}
                strokeWidth={LOGO.strokeW} strokeLinecap="round"
                strokeDasharray={`${segEnd - segStart + 1.5} ${metrics.totalLen}`}
                strokeDashoffset={-segStart}
              />
            )
          })}
        </>
      )}
    </svg>
  )
}

// ─── Gradient strip ───────────────────────────────────────────────

function GradientStrip({ cobalt, teal, amber, height = 24 }: { cobalt: string; teal: string; amber: string; height?: number }) {
  return (
    <div className="rounded-full overflow-hidden flex" style={{ height }}>
      {Array.from({ length: 60 }, (_, i) => {
        const t = i / 59
        const parse = (hex: string) => [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)]
        const [r1, g1, b1] = parse(cobalt)
        const [r2, g2, b2] = parse(teal)
        const [r3, g3, b3] = parse(amber)
        let r, g, b
        if (t < 0.5) {
          const p = t / 0.5
          r = Math.round(r1 + (r2 - r1) * p); g = Math.round(g1 + (g2 - g1) * p); b = Math.round(b1 + (b2 - b1) * p)
        } else {
          const p = (t - 0.5) / 0.5
          r = Math.round(r2 + (r3 - r2) * p); g = Math.round(g2 + (g3 - g2) * p); b = Math.round(b2 + (b3 - b2) * p)
        }
        return <div key={i} className="flex-1" style={{ backgroundColor: `rgb(${r},${g},${b})` }} />
      })}
    </div>
  )
}

// ─── Contrast ratio ───────────────────────────────────────────────

function luminance(hex: string): number {
  const r = srgbToLinear(parseInt(hex.slice(1, 3), 16) / 255)
  const g = srgbToLinear(parseInt(hex.slice(3, 5), 16) / 255)
  const b = srgbToLinear(parseInt(hex.slice(5, 7), 16) / 255)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = luminance(hex1)
  const l2 = luminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

// ─── Harmony indicator ────────────────────────────────────────────

function HarmonyBadge({ deltaL, deltaC }: { deltaL: number; deltaC: number }) {
  const lOk = deltaL <= 0.04
  const cOk = deltaC <= 0.03
  const perfect = deltaL <= 0.02 && deltaC <= 0.015
  const label = perfect ? 'Perfect' : (lOk && cOk) ? 'Harmonious' : lOk ? 'Chroma mismatch' : cOk ? 'Lightness mismatch' : 'Out of harmony'
  const style = (perfect || (lOk && cOk))
    ? { color: '#008775', backgroundColor: '#00B6A010', border: '1px solid #00B6A025' }
    : { color: '#92400E', backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }
  return (
    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={style}>
      {label} (dL={deltaL.toFixed(3)}, dC={deltaC.toFixed(3)})
    </span>
  )
}

// ─── Main page ────────────────────────────────────────────────────

const HUES = { cobalt: 264, teal: 180, amber: 70, rose: 16 }
export default function PaletteCompare() {
  // Control mode: shared sliders or per-color
  const [mode, setMode] = useState<'shared' | 'independent'>('independent')
  // Shared
  const [sharedL, setSharedL] = useState(0.65)
  const [sharedCPct, setSharedCPct] = useState(85)
  // Independent (defaults match current palette OKLCH values)
  const [cobaltL, setCobaltL] = useState(0.575)
  const [tealL, setTealL] = useState(0.695)
  const [amberL, setAmberL] = useState(0.720)
  const [roseL, setRoseL] = useState(0.645)
  const [cobaltCPct, setCobaltCPct] = useState(75)
  const [tealCPct, setTealCPct] = useState(100)
  const [amberCPct, setAmberCPct] = useState(100)
  const [roseCPct, setRoseCPct] = useState(86)
  // Chroma matching (only in shared mode)
  const [chromaMode, setChromaMode] = useState<'matched' | 'relative'>('matched')
  // Hues
  const [cobaltH, setCobaltH] = useState(HUES.cobalt)
  const [tealH, setTealH] = useState(HUES.teal)
  const [amberH, setAmberH] = useState(HUES.amber)
  const [roseH, setRoseH] = useState(HUES.rose)

  const compute = useCallback(() => {
    const Lc = mode === 'shared' ? sharedL : cobaltL
    const Lt = mode === 'shared' ? sharedL : tealL
    const La = mode === 'shared' ? sharedL : amberL
    const Lr = mode === 'shared' ? sharedL : roseL

    const maxCc = maxChroma(Lc, cobaltH)
    const maxCt = maxChroma(Lt, tealH)
    const maxCa = maxChroma(La, amberH)
    const maxCr = maxChroma(Lr, roseH)

    let Cc: number, Ct: number, Ca: number, Cr: number
    if (mode === 'shared') {
      const pct = sharedCPct / 100
      if (chromaMode === 'matched') {
        const cap = Math.min(maxCc, maxCt, maxCa, maxCr)
        Cc = Ct = Ca = Cr = cap * pct
      } else {
        Cc = maxCc * pct
        Ct = maxCt * pct
        Ca = maxCa * pct
        Cr = maxCr * pct
      }
    } else {
      Cc = maxCc * (cobaltCPct / 100)
      Ct = maxCt * (tealCPct / 100)
      Ca = maxCa * (amberCPct / 100)
      Cr = maxCr * (roseCPct / 100)
    }

    const cobaltHex = oklchToHex(Lc, Cc, cobaltH)
    const tealHex = oklchToHex(Lt, Ct, tealH)
    const amberHex = oklchToHex(La, Ca, amberH)
    const roseHex = oklchToHex(Lr, Cr, roseH)

    const Ls = [Lc, Lt, La, Lr]
    const Cs = [Cc, Ct, Ca, Cr]
    const deltaL = Math.max(...Ls) - Math.min(...Ls)
    const deltaC = Math.max(...Cs) - Math.min(...Cs)
    const avgL = (Lc + Lt + La + Lr) / 4
    const avgC = (Cc + Ct + Ca + Cr) / 4

    return {
      cobalt: { hex: cobaltHex, L: Lc, C: Cc, maxC: maxCc, h: cobaltH },
      teal: { hex: tealHex, L: Lt, C: Ct, maxC: maxCt, h: tealH },
      amber: { hex: amberHex, L: La, C: Ca, maxC: maxCa, h: amberH },
      rose: { hex: roseHex, L: Lr, C: Cr, maxC: maxCr, h: roseH },
      deltaL, deltaC, avgL, avgC,
    }
  }, [mode, sharedL, sharedCPct, cobaltL, tealL, amberL, roseL, cobaltCPct, tealCPct, amberCPct, roseCPct, chromaMode, cobaltH, tealH, amberH, roseH])

  const result = useMemo(compute, [compute])

  // Current palette for comparison
  const current = useMemo(() => {
    const c = hexToOklch('#4271DF')
    const t = hexToOklch('#00B6A0')
    const a = hexToOklch('#E19000')
    const r = hexToOklch('#F24260')
    return { cobalt: c, teal: t, amber: a, rose: r }
  }, [])

  return (
    <PageShell
      title="Palette Generator"
      subtitle="Nudge lightness, chroma, or hue and see what the family looks like next door — all within OKLCH harmony."
    >
      {/* Generator */}
      <Section>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {/* Mode toggle + harmony badge */}
          <div className="bg-stone-50 px-4 py-3 border-b border-stone-200 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMode('shared')}
                className={`text-xs font-medium px-3 py-1 rounded-lg transition-colors ${mode === 'shared' ? 'bg-white text-stone-800 shadow-sm border border-stone-200' : 'text-stone-400'}`}
              >
                Shared lightness
              </button>
              <button
                onClick={() => setMode('independent')}
                className={`text-xs font-medium px-3 py-1 rounded-lg transition-colors ${mode === 'independent' ? 'bg-white text-stone-800 shadow-sm border border-stone-200' : 'text-stone-400'}`}
              >
                Independent lightness
              </button>
            </div>
            <HarmonyBadge deltaL={result.deltaL} deltaC={result.deltaC} />
          </div>

          {/* Sliders */}
          <div className="p-4 space-y-4 border-b border-stone-200">
            {mode === 'shared' ? (
              <>
                <SliderRow label="Lightness (all)" value={sharedL} min={0.4} max={0.85} step={0.005} onChange={setSharedL} format={v => v.toFixed(3)} />
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-medium text-stone-600">Chroma</span>
                    <button
                      onClick={() => setChromaMode('matched')}
                      className={`text-[10px] font-medium px-2 py-0.5 rounded transition-colors ${chromaMode === 'matched' ? 'bg-white text-stone-800 shadow-sm border border-stone-200' : 'text-stone-400'}`}
                    >
                      Matched (same absolute C)
                    </button>
                    <button
                      onClick={() => setChromaMode('relative')}
                      className={`text-[10px] font-medium px-2 py-0.5 rounded transition-colors ${chromaMode === 'relative' ? 'bg-white text-stone-800 shadow-sm border border-stone-200' : 'text-stone-400'}`}
                    >
                      Relative (% of each max)
                    </button>
                  </div>
                  <SliderRow label={chromaMode === 'matched' ? 'Chroma (% of tightest gamut)' : 'Chroma (% of each max)'} value={sharedCPct} min={30} max={100} step={1} onChange={setSharedCPct} format={v => `${Math.round(v)}%`} />
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <SliderRow label="Cobalt L" value={cobaltL} min={0.4} max={0.85} step={0.005} onChange={setCobaltL} format={v => v.toFixed(3)} color={result.cobalt.hex} deviation={result.cobalt.L - result.avgL} />
                  <SliderRow label="Cobalt C" value={cobaltCPct} min={30} max={100} step={1} onChange={setCobaltCPct} format={v => `${Math.round(v)}%`} color={result.cobalt.hex} deviation={result.cobalt.C - result.avgC} />
                </div>
                <div className="space-y-2">
                  <SliderRow label="Teal L" value={tealL} min={0.4} max={0.85} step={0.005} onChange={setTealL} format={v => v.toFixed(3)} color={result.teal.hex} deviation={result.teal.L - result.avgL} />
                  <SliderRow label="Teal C" value={tealCPct} min={30} max={100} step={1} onChange={setTealCPct} format={v => `${Math.round(v)}%`} color={result.teal.hex} deviation={result.teal.C - result.avgC} />
                </div>
                <div className="space-y-2">
                  <SliderRow label="Amber L" value={amberL} min={0.4} max={0.85} step={0.005} onChange={setAmberL} format={v => v.toFixed(3)} color={result.amber.hex} deviation={result.amber.L - result.avgL} />
                  <SliderRow label="Amber C" value={amberCPct} min={30} max={100} step={1} onChange={setAmberCPct} format={v => `${Math.round(v)}%`} color={result.amber.hex} deviation={result.amber.C - result.avgC} />
                </div>
                <div className="space-y-2">
                  <SliderRow label="Rose L" value={roseL} min={0.4} max={0.85} step={0.005} onChange={setRoseL} format={v => v.toFixed(3)} color={result.rose.hex} deviation={result.rose.L - result.avgL} />
                  <SliderRow label="Rose C" value={roseCPct} min={30} max={100} step={1} onChange={setRoseCPct} format={v => `${Math.round(v)}%`} color={result.rose.hex} deviation={result.rose.C - result.avgC} />
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <SliderRow label="Cobalt hue" value={cobaltH} min={220} max={300} step={1} onChange={setCobaltH} format={v => `${Math.round(v)}°`} color={result.cobalt.hex} />
              <SliderRow label="Teal hue" value={tealH} min={150} max={210} step={1} onChange={setTealH} format={v => `${Math.round(v)}°`} color={result.teal.hex} />
              <SliderRow label="Amber hue" value={amberH} min={30} max={100} step={1} onChange={setAmberH} format={v => `${Math.round(v)}°`} color={result.amber.hex} />
              <SliderRow label="Rose hue" value={roseH} min={0} max={40} step={1} onChange={setRoseH} format={v => `${Math.round(v)}°`} color={result.rose.hex} />
            </div>
          </div>

          {/* Preview */}
          <div className="p-6">
            {/* Swatches */}
            <div className="flex gap-3 mb-4">
              {[
                { name: 'Cobalt', ...result.cobalt },
                { name: 'Teal', ...result.teal },
                { name: 'Amber', ...result.amber },
                { name: 'Rose', ...result.rose },
              ].map(c => (
                <div key={c.name} className="flex-1">
                  <div className="h-16 rounded-lg border border-black/5" style={{ backgroundColor: c.hex }} />
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-stone-700">{c.name}</span>
                    <span className="text-[10px] font-mono text-stone-400">{c.hex}</span>
                  </div>
                  <p className="text-[9px] font-mono text-stone-400">L={c.L.toFixed(3)} C={c.C.toFixed(3)} h={c.h}</p>
                </div>
              ))}
            </div>

            {/* Contrast validation */}
            <div className="border border-stone-200 rounded-lg overflow-x-auto mb-4">
              <div className="min-w-[520px]">
              <div className="grid grid-cols-4 bg-stone-50 border-b border-stone-200 px-3 py-1.5">
                <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Color</span>
                <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">vs White</span>
                <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">vs Ink</span>
                <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Status</span>
              </div>
              {[
                { name: 'Cobalt', hex: result.cobalt.hex },
                { name: 'Teal', hex: result.teal.hex },
                { name: 'Amber', hex: result.amber.hex },
                { name: 'Rose', hex: result.rose.hex },
              ].map((c, i) => {
                const vsWhite = contrastRatio(c.hex, '#FFFFFF')
                const vsInk = contrastRatio(c.hex, '#18181C')
                const whiteOk = vsWhite >= 2.5
                const inkOk = vsInk >= 2.5
                return (
                  <div key={c.name} className="grid grid-cols-4 px-3 py-1.5 items-center" style={{ borderBottom: i < 3 ? '1px solid #F3F4F6' : 'none' }}>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.hex }} />
                      <span className="text-[10px] font-medium text-stone-700">{c.name}</span>
                    </div>
                    <span className="text-[10px] font-mono" style={whiteOk ? { color: '#57534E' } : { color: '#F24260' }}>
                      {vsWhite.toFixed(2)}:1 {whiteOk ? '' : 'FAIL'}
                    </span>
                    <span className="text-[10px] font-mono" style={inkOk ? { color: '#57534E' } : { color: '#F24260' }}>
                      {vsInk.toFixed(2)}:1 {inkOk ? '' : 'FAIL'}
                    </span>
                    <span className="text-[10px] font-medium" style={{ color: whiteOk && inkOk ? '#008775' : whiteOk || inkOk ? '#D97706' : '#F24260' }}>
                      {whiteOk && inkOk ? 'Both pass' : whiteOk ? 'White only' : inkOk ? 'Dark only' : 'Neither'}
                    </span>
                  </div>
                )
              })}
              </div>
            </div>

            {/* Gradient */}
            <GradientStrip cobalt={result.cobalt.hex} teal={result.teal.hex} amber={result.amber.hex} height={32} />

            {/* Logo previews */}
            <div className="mt-5 flex items-center justify-center gap-8 flex-wrap">
              <CustomLogo size={100} cobalt={result.cobalt.hex} teal={result.teal.hex} amber={result.amber.hex} />
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <CustomLogo size={40} cobalt={result.cobalt.hex} teal={result.teal.hex} amber={result.amber.hex} />
                  <span className="font-heading font-semibold text-stone-900 text-lg" style={{ letterSpacing: '0.02em' }}>Spectrea</span>
                </div>
                <div className="bg-ink rounded-lg px-4 py-3 flex items-center gap-3">
                  <CustomLogo size={40} cobalt={result.cobalt.hex} teal={result.teal.hex} amber={result.amber.hex} />
                  <span className="font-heading font-semibold text-white text-lg" style={{ letterSpacing: '0.02em' }}>Spectrea</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison with current */}
          <div className="p-4 border-t border-stone-200 bg-stone-50">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">vs current palette</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-stone-500 mb-1">Current</p>
                <div className="flex gap-1.5 mb-2">
                  <div className="flex-1 h-8 rounded" style={{ backgroundColor: '#4271DF' }} />
                  <div className="flex-1 h-8 rounded" style={{ backgroundColor: '#00B6A0' }} />
                  <div className="flex-1 h-8 rounded" style={{ backgroundColor: '#E19000' }} />
                  <div className="flex-1 h-8 rounded" style={{ backgroundColor: '#F24260' }} />
                </div>
                <GradientStrip cobalt="#4271DF" teal="#00B6A0" amber="#E19000" height={16} />
                <p className="text-[9px] font-mono text-stone-400 mt-1">L: {current.cobalt.L.toFixed(2)} / {current.teal.L.toFixed(2)} / {current.amber.L.toFixed(2)} / {current.rose.L.toFixed(2)} — dL={Math.max(Math.abs(current.cobalt.L - current.teal.L), Math.abs(current.cobalt.L - current.amber.L), Math.abs(current.cobalt.L - current.rose.L), Math.abs(current.teal.L - current.amber.L), Math.abs(current.teal.L - current.rose.L), Math.abs(current.amber.L - current.rose.L)).toFixed(3)}</p>
              </div>
              <div>
                <p className="text-[10px] text-stone-500 mb-1">Generated</p>
                <div className="flex gap-1.5 mb-2">
                  <div className="flex-1 h-8 rounded" style={{ backgroundColor: result.cobalt.hex }} />
                  <div className="flex-1 h-8 rounded" style={{ backgroundColor: result.teal.hex }} />
                  <div className="flex-1 h-8 rounded" style={{ backgroundColor: result.amber.hex }} />
                  <div className="flex-1 h-8 rounded" style={{ backgroundColor: result.rose.hex }} />
                </div>
                <GradientStrip cobalt={result.cobalt.hex} teal={result.teal.hex} amber={result.amber.hex} height={16} />
                <p className="text-[9px] font-mono text-stone-400 mt-1">L: {result.cobalt.L.toFixed(2)} / {result.teal.L.toFixed(2)} / {result.amber.L.toFixed(2)} / {result.rose.L.toFixed(2)} — dL={result.deltaL.toFixed(3)}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Reference */}
      <Section>
        <h2 className="text-lg font-semibold text-stone-800 mb-3">Harmony Thresholds (OKLCH)</h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { metric: 'Delta L (lightness)', threshold: '< 0.04', note: 'Barely noticeable difference in perceived brightness' },
            { metric: 'Delta C (chroma)', threshold: '< 0.03', note: 'Acceptable vibrancy match across hues' },
            { metric: 'Perfect match', threshold: 'dL < 0.02, dC < 0.015', note: 'Imperceptible difference' },
            { metric: 'Gamut limit', threshold: 'Teal hue (~180) has the tightest sRGB gamut', note: 'Teal constrains how vivid all four can be at matched lightness' },
          ].map((row, i) => (
            <div key={row.metric} className="flex gap-4 px-4 py-2.5" style={{ borderBottom: i < 3 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-xs font-medium text-stone-600 w-32 flex-shrink-0">{row.metric}</span>
              <span className="text-xs font-mono text-brand w-40 flex-shrink-0">{row.threshold}</span>
              <span className="text-xs text-stone-500">{row.note}</span>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}

// ─── Slider component ─────────────────────────────────────────────

function SliderRow({ label, value, min, max, step, onChange, format, color, deviation }: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  format: (v: number) => string
  color?: string
  deviation?: number
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs font-medium text-stone-600 flex items-center gap-1.5">
          {color && <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: color }} />}
          {label}
        </label>
        <span className="text-xs font-mono text-stone-400 flex items-center gap-1.5">
          {deviation !== undefined && Math.abs(deviation) >= 0.001 && (
            <span className={`text-[9px] px-1 py-px rounded ${Math.abs(deviation) > 0.04 ? 'bg-amber-50 text-amber-600' : 'bg-stone-100 text-stone-400'}`}>
              {deviation > 0 ? '+' : ''}{deviation.toFixed(3)}
            </span>
          )}
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-stone-200 rounded-full appearance-none cursor-pointer accent-stone-600"
      />
    </div>
  )
}
