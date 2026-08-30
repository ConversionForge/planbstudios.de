import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { CubeMark } from './Logo'
import { Magnetic } from './Magnetic'
import { useT } from '../i18n'
import { startVariante } from '../lib/ssr'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
}

const item = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function Hero({ introDone }: { introDone: boolean }) {
  const t = useT()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.94])
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -90])
  const cubeY = useTransform(scrollYProgress, [0, 0.6], [0, 60])
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const auroraOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} id="top" className="relative h-[165vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24">
        <motion.div
          aria-hidden
          style={{ opacity: auroraOpacity }}
          className="pointer-events-none absolute inset-0 z-0"
        >
          <div
            className="aurora-blob left-[8%] top-[12%] h-[46vw] w-[46vw]"
            style={{
              background: 'radial-gradient(circle, rgba(184,137,74,0.16), transparent 62%)',
              animation: 'aurora-a 16s ease-in-out infinite',
            }}
          />
          <div
            className="aurora-blob right-[6%] bottom-[8%] h-[40vw] w-[40vw]"
            style={{
              background: 'radial-gradient(circle, rgba(211,167,111,0.12), transparent 62%)',
              animation: 'aurora-b 20s ease-in-out infinite',
            }}
          />
        </motion.div>

        <motion.div
          variants={container}
          initial={startVariante}
          animate={introDone ? 'show' : 'hidden'}
          style={{ opacity, scale, y }}
          className="relative z-10 flex flex-col items-center text-center will-change-transform"
        >
          <div className="hidden flex-col items-center [@media(min-height:780px)]:flex">
            <motion.div variants={item} style={{ y: cubeY }} className="mb-6">
              <CubeMark animated className="h-12 w-12 text-gold md:h-16 md:w-16" strokeWidth={1.3} />
            </motion.div>

            <motion.div variants={item} className="mb-7 h-px w-12 bg-gold/70" />
          </div>

          <motion.p
            variants={item}
            className="mb-7 text-[11px] font-medium uppercase tracking-[0.45em] text-stone"
          >
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-serif text-[clamp(2.9rem,8vw,8rem)] font-light leading-[1.02] tracking-[-0.015em] text-cream"
          >
            {t.hero.title1}
            <br />
            {t.hero.title2a}
            <em className="italic text-gold-bright">{t.hero.title2em}</em>
            {t.hero.title2b}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-base leading-relaxed text-stone md:text-lg"
          >
            {t.hero.lead}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Magnetic>
              <a
                href="#kontakt"
                className="block bg-gold px-8 py-3.5 text-[14px] font-medium tracking-[0.04em] text-night transition-colors duration-300 hover:bg-gold-bright"
              >
                {t.hero.ctaPrimary}
              </a>
            </Magnetic>
            <Magnetic strength={0.15}>
              <a
                href="#webdesign"
                className="block px-8 py-3.5 text-[14px] font-medium tracking-[0.04em] text-cream-soft transition-colors duration-300 hover:text-cream"
              >
                {t.hero.ctaSecondary}
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-8 hidden flex-col items-center gap-3 [@media(min-height:760px)_and_(min-width:768px)]:flex"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-stone">
            {t.hero.scroll}
          </span>
          <div className="relative h-14 w-px overflow-hidden bg-night-line">
            <motion.div
              className="absolute left-0 top-0 h-5 w-px bg-gold"
              animate={{ y: [-20, 56] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
