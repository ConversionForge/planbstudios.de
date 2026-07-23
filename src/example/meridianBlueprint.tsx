import { motion, useTransform, type MotionValue } from 'motion/react'

interface ArtProps {
  className?: string
}

/* Markenzeichen: Nivellier-Quadrat mit M */
export function MeridianMark({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 17V8L12 13L17 8V17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* Gebäude-Ansicht (Schnitt) als technische Strichzeichnung, die sich selbst zeichnet. */
const ELEVATION: { d: string; cls: 'main' | 'grid' | 'accent' | 'water' }[] = [
  { d: 'M20 260H620', cls: 'main' },
  { d: 'M60 260V120H180V260', cls: 'main' },
  { d: 'M180 260V70H330V260', cls: 'main' },
  { d: 'M330 260V150H480V260', cls: 'main' },
  { d: 'M480 260V190H590V260', cls: 'main' },
  { d: 'M245 260V230H267V260', cls: 'main' },
  { d: 'M330 70V48', cls: 'main' },
  { d: 'M60 145H180M60 180H180M60 215H180', cls: 'grid' },
  { d: 'M100 120V260M140 120V260', cls: 'grid' },
  { d: 'M180 105H330M180 145H330M180 185H330M180 225H330', cls: 'grid' },
  { d: 'M230 70V260M280 70V260', cls: 'grid' },
  { d: 'M330 180H480M330 215H480', cls: 'grid' },
  { d: 'M380 150V260M430 150V260', cls: 'grid' },
  { d: 'M480 225H590', cls: 'grid' },
  { d: 'M535 190V260', cls: 'grid' },
  { d: 'M180 145H210M180 185H210M180 225H210', cls: 'accent' },
  {
    d: 'M20 278q20 -7 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0',
    cls: 'water',
  },
  {
    d: 'M60 292q20 -7 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0',
    cls: 'water',
  },
]

const STROKE: Record<string, { stroke: string; width: number; opacity?: number }> = {
  main: { stroke: 'var(--color-mer-ink)', width: 1.6 },
  grid: { stroke: 'var(--color-mer-ink)', width: 0.8, opacity: 0.4 },
  accent: { stroke: 'var(--color-mer-tide)', width: 2.4 },
  water: { stroke: 'var(--color-mer-tide)', width: 2, opacity: 0.8 },
}

export function ElevationDrawing({ className, animate = true }: ArtProps & { animate?: boolean }) {
  return (
    <svg viewBox="0 0 640 300" fill="none" className={className} aria-hidden="true">
      {ELEVATION.map((p, i) => {
        const s = STROKE[p.cls]
        return animate ? (
          <motion.path
            key={i}
            d={p.d}
            stroke={s.stroke}
            strokeWidth={s.width}
            strokeOpacity={s.opacity ?? 1}
            strokeLinecap="square"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1, delay: 0.25 + i * 0.09, ease: [0.65, 0, 0.35, 1] }}
          />
        ) : (
          <path
            key={i}
            d={p.d}
            stroke={s.stroke}
            strokeWidth={s.width}
            strokeOpacity={s.opacity ?? 1}
            strokeLinecap="square"
          />
        )
      })}
    </svg>
  )
}

/* Grundriss, der sich an den Scroll-Fortschritt gekoppelt zeichnet. */
export function FloorPlan({
  progress,
  className,
}: ArtProps & { progress: MotionValue<number> }) {
  const outer = useTransform(progress, [0.02, 0.28], [0, 1])
  const inner = useTransform(progress, [0.22, 0.48], [0, 1])
  const doors = useTransform(progress, [0.44, 0.62], [0, 1])
  const windows = useTransform(progress, [0.52, 0.68], [0, 1])
  const furniture = useTransform(progress, [0.62, 0.78], [0, 1])
  const labels = useTransform(progress, [0.72, 0.86], [0, 1])
  const dims = useTransform(progress, [0.8, 0.94], [0, 1])

  return (
    <svg viewBox="0 0 560 412" fill="none" className={className} aria-hidden="true">
      <motion.path
        d="M24 28H536V388H24Z"
        stroke="var(--color-mer-ink)"
        strokeWidth="2.5"
        style={{ pathLength: outer }}
      />
      <motion.path
        d="M204 28V138M204 186V308M204 356V388M24 228H94M142 228H204"
        stroke="var(--color-mer-ink)"
        strokeWidth="1.5"
        style={{ pathLength: inner }}
      />
      <motion.path
        d="M204 186H156M156 186A48 48 0 0 1 204 138M94 228V276M94 276A48 48 0 0 0 142 228"
        stroke="var(--color-mer-ink)"
        strokeWidth="0.8"
        strokeOpacity="0.6"
        style={{ pathLength: doors }}
      />
      <motion.path
        d="M64 388H150M230 388H330M410 388H500"
        stroke="var(--color-mer-tide)"
        strokeWidth="5"
        style={{ pathLength: windows }}
      />
      <motion.g style={{ opacity: furniture }} stroke="var(--color-mer-ink)" strokeOpacity="0.45" strokeWidth="1">
        <path d="M44 68H164V148H44ZM44 96H164" fill="none" />
        <path d="M364 88H504V130H364ZM364 100H504" fill="none" />
        <circle cx="304" cy="308" r="36" fill="none" />
        <path d="M304 260v-8M304 356v8M256 308h-8M352 308h8" />
        <rect x="54" y="278" width="80" height="96" rx="12" fill="none" />
      </motion.g>
      <motion.g
        style={{ opacity: labels }}
        fill="var(--color-mer-ink)"
        fontFamily="var(--font-data)"
        textAnchor="middle"
        letterSpacing="0.14em"
      >
        <text x="114" y="192" fontSize="11">SCHLAFEN</text>
        <text x="114" y="208" fontSize="9" fillOpacity="0.55">16 M²</text>
        <text x="114" y="256" fontSize="11">BAD</text>
        <text x="370" y="214" fontSize="11">WOHNEN · KÜCHE</text>
        <text x="370" y="230" fontSize="9" fillOpacity="0.55">54 M²</text>
      </motion.g>
      <motion.g style={{ opacity: dims }}>
        <path d="M24 12H536M24 6V18M536 6V18" stroke="var(--color-mer-ink)" strokeWidth="0.8" strokeOpacity="0.6" />
        <text
          x="280"
          y="9"
          fontSize="9"
          fill="var(--color-mer-ink)"
          fillOpacity="0.7"
          fontFamily="var(--font-data)"
          textAnchor="middle"
          letterSpacing="0.1em"
        >
          17,40 M
        </text>
        <text
          x="280"
          y="406"
          fontSize="10"
          fill="var(--color-mer-tide)"
          fontFamily="var(--font-data)"
          textAnchor="middle"
          letterSpacing="0.2em"
        >
          WASSERSEITE — TRAVE
        </text>
      </motion.g>
    </svg>
  )
}

/* Wasserlinien für die Lage-Sektion. */
export function WaveLines({ className }: ArtProps) {
  const wave =
    'q30 -9 60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0'
  return (
    <svg viewBox="0 0 600 130" fill="none" className={className} aria-hidden="true">
      {[18, 52, 86, 116].map((y, i) => (
        <motion.path
          key={y}
          d={`M30 ${y}${wave}`}
          stroke={i === 1 ? '#3fa8b0' : 'rgba(241,240,236,0.35)'}
          strokeWidth={i === 1 ? 2 : 1.2}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.4, delay: i * 0.15, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
    </svg>
  )
}
