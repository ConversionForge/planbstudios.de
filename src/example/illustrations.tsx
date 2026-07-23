import { motion } from 'motion/react'

interface IlloProps {
  className?: string
  /** Zeichnet sich beim Sichtbarwerden Strich für Strich selbst. */
  animate?: boolean
  /**
   * Expliziter Auslöser. Ist er gesetzt, steuert der Aufrufer den Start —
   * das vermeidet Wettläufe, wenn mehrere ineinander verschachtelte
   * Beobachter dieselbe Karte beobachten.
   */
  play?: boolean
}

type Line = { d: string; o?: number }
type Dot = { cx: number; cy: number; r: number; o?: number }

// Alle Illustrationen sind Strichzeichnungen in currentColor — bewusst editorial,
// damit sofort erkennbar ist, dass es sich um eine gestaltete Beispiel-Website handelt.

function Drawing({
  lines,
  dots = [],
  className,
  animate = false,
  play,
}: IlloProps & { lines: Line[]; dots?: Dot[] }) {
  // Gesteuerter Modus (play gesetzt) vs. eigener Sichtbarkeits-Beobachter.
  const driven = play !== undefined
  const viewport = { once: true, margin: '-40px' }

  const lineTrigger = driven
    ? { animate: { pathLength: play ? 1 : 0 } }
    : { whileInView: { pathLength: 1 }, viewport }

  const dotTrigger = driven
    ? { animate: { opacity: play ? 1 : 0 } }
    : { whileInView: { opacity: 1 }, viewport }

  return (
    <svg viewBox="0 0 400 300" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        {lines.map((l, i) =>
          animate ? (
            <motion.path
              key={i}
              d={l.d}
              strokeOpacity={l.o ?? 1}
              initial={{ pathLength: 0 }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.65, 0, 0.35, 1] }}
              {...lineTrigger}
            />
          ) : (
            <path key={i} d={l.d} strokeOpacity={l.o ?? 1} />
          ),
        )}
        {dots.map((c, i) =>
          animate ? (
            <motion.circle
              key={`d${i}`}
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              strokeOpacity={c.o ?? 1}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + lines.length * 0.1 }}
              {...dotTrigger}
            />
          ) : (
            <circle key={`d${i}`} cx={c.cx} cy={c.cy} r={c.r} strokeOpacity={c.o ?? 1} />
          ),
        )}
      </g>
    </svg>
  )
}

const VILLA: Line[] = [
  { d: 'M40 250 H360' },
  { d: 'M60 150 L200 70 L340 150' },
  { d: 'M90 132 V250 H310 V132' },
  { d: 'M300 70 v-22 h18 v40' },
  { d: 'M130 170 h45 v45 h-45 z' },
  { d: 'M225 170 h45 v45 h-45 z' },
  { d: 'M130 192 h45 M152 170 v45 M225 192 h45 M247 170 v45' },
  { d: 'M180 200 h40 v50 h-40 z' },
  { d: 'M70 250 v-30 h-18 v30', o: 0.5 },
  { d: 'M340 250 c0-26 16-26 16 0', o: 0.6 },
  { d: 'M348 224 v-14', o: 0.6 },
]

const LOFT: Line[] = [
  { d: 'M50 250 H350' },
  { d: 'M70 250 V90 H330 V250' },
  { d: 'M70 90 L200 50 L330 90' },
  { d: 'M110 250 V140 H180 V250' },
  { d: 'M110 140 h70 M110 180 h70 M110 220 h70 M145 140 v110', o: 0.6 },
  { d: 'M220 130 h90 v70 h-90 z' },
  { d: 'M220 165 h90 M265 130 v70', o: 0.6 },
  { d: 'M220 225 h60' },
  { d: 'M298 235 a8 8 0 1 1 -16 0 a8 8 0 1 1 16 0', o: 0.6 },
]

const GARTENHAUS: Line[] = [
  { d: 'M40 250 H360' },
  { d: 'M110 250 V150 L200 100 L290 150 V250' },
  { d: 'M95 160 L200 100 L305 160' },
  { d: 'M175 195 h50 v55 h-50 z' },
  { d: 'M200 195 v55', o: 0.6 },
  { d: 'M150 175 h30 v25 h-30 z', o: 0.7 },
  { d: 'M60 250 c0-40 30-40 30 0', o: 0.5 },
  { d: 'M75 218 v-18', o: 0.5 },
  { d: 'M320 250 c0-32 24-32 24 0', o: 0.5 },
  { d: 'M332 224 v-14', o: 0.5 },
]

const FLOORPLAN: Line[] = [
  { d: 'M60 50 h280 v200 h-280 z' },
  { d: 'M200 50 V150 M60 150 H200 M200 110 H340 M250 150 V250' },
  { d: 'M60 95 a12 12 0 0 0 12 12', o: 0.55 },
  { d: 'M132 150 a12 12 0 0 1 12 -12', o: 0.55 },
  { d: 'M250 195 a12 12 0 0 0 12 12', o: 0.55 },
  { d: 'M110 250 v10 M150 250 v10', o: 0.5 },
  { d: 'M300 70 a10 10 0 1 1 -20 0 a10 10 0 1 1 20 0', o: 0.5 },
  { d: 'M95 185 h45 v28 h-45 z', o: 0.5 },
]

export const VillaIllo = (p: IlloProps) => (
  <Drawing {...p} lines={VILLA} dots={[{ cx: 211, cy: 225, r: 2 }]} />
)
export const LoftIllo = (p: IlloProps) => <Drawing {...p} lines={LOFT} />
export const GartenhausIllo = (p: IlloProps) => (
  <Drawing {...p} lines={GARTENHAUS} dots={[{ cx: 192, cy: 222, r: 1.6 }]} />
)
export const FloorplanIllo = (p: IlloProps) => <Drawing {...p} lines={FLOORPLAN} />

export function MonogramHG({ className }: IlloProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="1" y="1" width="46" height="46" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M14 15 V33 M14 24 H24 M24 15 V33"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M28 33 V15 h6 a5 5 0 0 1 0 10 h-6 M34 25 a5 5 0 0 1 0 8 h-6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
