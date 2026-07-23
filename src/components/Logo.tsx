import { motion } from 'motion/react'

const CUBE_EDGES = [
  'M32 4 L58 19 L58 49 L32 64 L6 49 L6 19 Z',
  'M6 19 L32 34 L58 19',
  'M32 34 L32 64',
]

interface CubeMarkProps {
  className?: string
  strokeWidth?: number
  animated?: boolean
  delay?: number
  stagger?: number
  duration?: number
}

export function CubeMark({
  className,
  strokeWidth = 1.5,
  animated = false,
  delay = 0.25,
  stagger = 0.35,
  duration = 1.4,
}: CubeMarkProps) {
  return (
    <svg viewBox="0 0 64 68" fill="none" className={className} aria-hidden="true">
      {CUBE_EDGES.map((d, i) =>
        animated ? (
          <motion.path
            key={d}
            d={d}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration, delay: delay + i * stagger, ease: [0.65, 0, 0.35, 1] }}
          />
        ) : (
          <path
            key={d}
            d={d}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ),
      )}
    </svg>
  )
}

export function LogoLockup({ className }: { className?: string }) {
  return (
    <a href="#top" className={`group flex items-center gap-3 ${className ?? ''}`}>
      <CubeMark className="h-7 w-7 text-gold transition-colors duration-300 group-hover:text-gold-bright" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[17px] tracking-wide text-cream">Plan B</span>
        <span className="mt-1 text-[8.5px] font-medium uppercase tracking-[0.42em] text-gold">
          Studios
        </span>
      </span>
    </a>
  )
}
