import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { CubeMark } from './Logo'
import { Magnetic } from './Magnetic'
import { useT } from '../i18n'

export function ChapterKontakt() {
  const t = useT()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })

  const cubeScale = useTransform(scrollYProgress, [0, 1], [0.7, 1])
  const cubeOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.5])
  const cubeRotate = useTransform(scrollYProgress, [0, 1], [-8, 8])

  return (
    <section id="kontakt" ref={ref} className="relative overflow-hidden border-t border-night-line/60">
      <motion.div
        style={{ scale: cubeScale, opacity: cubeOpacity, rotate: cubeRotate }}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2"
      >
        <CubeMark className="h-[70vh] w-[70vh] text-gold/20" strokeWidth={0.4} />
      </motion.div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-44 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 font-mono text-[12px] tracking-[0.3em] text-gold"
        >
          {t.kontakt.eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(2.6rem,7vw,6rem)] font-light leading-[1.04] tracking-[-0.015em] text-cream"
        >
          {t.kontakt.title1}
          <br />
          {t.kontakt.title2a}
          <em className="italic text-gold-bright">{t.kontakt.titleEm}</em>
          {t.kontakt.title2b}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-10 max-w-xl text-base leading-relaxed text-stone md:text-lg"
        >
          {t.kontakt.lead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-14"
        >
          <Magnetic strength={0.3}>
            <a
              href="mailto:info@planbstudios.de"
              className="group flex items-center gap-4 bg-gold px-9 py-4 text-[15px] font-medium tracking-[0.04em] text-night transition-colors duration-300 hover:bg-gold-bright"
            >
              <span>info@planbstudios.de</span>
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-8 flex flex-col items-center gap-2 text-[14px] text-stone"
        >
          <span>
            {t.kontakt.callPrefix}
            <a
              href="tel:+491788489408"
              className="text-cream-soft underline-offset-4 transition-colors duration-300 hover:text-gold hover:underline"
            >
              0178&nbsp;8489408
            </a>
          </span>
          <span className="text-[11px] uppercase tracking-[0.35em] text-stone/70">
            {t.kontakt.studio}
          </span>
        </motion.div>
      </div>
    </section>
  )
}
