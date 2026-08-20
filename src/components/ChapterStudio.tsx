import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useT } from '../i18n'

const reveal = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function ChapterStudio() {
  const t = useT()
  const PRINCIPLES = t.studio.principles
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const bigTextX = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const bigTextOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.06, 0.06, 0])

  return (
    <section id="studio" ref={ref} className="relative overflow-hidden border-t border-night-line/60">
      <motion.div
        style={{ x: bigTextX, opacity: bigTextOpacity }}
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-0 -z-0 -translate-y-1/2 whitespace-nowrap font-serif text-[24vw] font-light leading-none text-cream"
      >
        Plan B
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 py-40 lg:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="md:col-span-5"
          >
            <p className="mb-6 font-mono text-[12px] tracking-[0.3em] text-gold">{t.studio.eyebrow}</p>
            <h2 className="font-serif text-[clamp(2.4rem,5vw,4.2rem)] font-light leading-[1.05] text-cream">
              {t.studio.title1}
              <br />
              <em className="italic text-gold-bright">{t.studio.titleEm}</em>
              {t.studio.title2}
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-stone md:text-lg">
              {t.studio.lead1}
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-stone md:text-lg">
              {t.studio.lead2}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
            className="flex flex-col gap-12 md:col-span-6 md:col-start-7"
          >
            {PRINCIPLES.map((p) => (
              <motion.div key={p.n} variants={reveal} className="border-t border-night-line pt-7">
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-[12px] tracking-[0.2em] text-gold">{p.n}</span>
                  <div>
                    <h3 className="mb-3 font-serif text-2xl font-light text-cream">{p.title}</h3>
                    <p className="text-[15px] leading-relaxed text-stone">{p.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
