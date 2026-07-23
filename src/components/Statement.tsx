import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'

const WORDS: { t: string; gold?: boolean }[] = [
  { t: 'Die' }, { t: 'meisten' }, { t: 'Websites' }, { t: 'sehen' }, { t: 'aus' },
  { t: 'wie' }, { t: 'Websites.' }, { t: 'Wir' }, { t: 'bauen' }, { t: 'digitale' },
  { t: 'Orte', gold: true }, { t: '—' }, { t: 'Räume,' }, { t: 'die' }, { t: 'man' },
  { t: 'betritt', gold: true }, { t: 'und' }, { t: 'nicht' }, { t: 'mehr' },
  { t: 'vergisst.' },
]

function Word({
  children,
  progress,
  range,
  gold,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  gold?: boolean
}) {
  const opacity = useTransform(progress, range, [0.1, 1])
  return (
    <motion.span
      style={{ opacity }}
      className={gold ? 'italic text-gold-bright' : undefined}
    >
      {children}{' '}
    </motion.span>
  )
}

export function Statement() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const start = 0.12
  const end = 0.82
  const step = (end - start) / WORDS.length

  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center px-6">
        <p className="max-w-4xl text-center font-serif text-[clamp(1.9rem,4.2vw,3.6rem)] font-light leading-[1.35] text-cream">
          {WORDS.map((w, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[start + i * step, start + i * step + step * 3]}
              gold={w.gold}
            >
              {w.t}
            </Word>
          ))}
        </p>
      </div>
    </section>
  )
}
