import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { CubeMark } from './Logo'
import { WalkthroughVideo } from './WalkthroughVideo'
import { useT } from '../i18n'

const TOUR_COVER = `${import.meta.env.BASE_URL}rundgang/living-1.jpg`

const GOLD_GRID = {
  backgroundColor: 'rgba(10,10,11,0.72)',
  backgroundImage:
    'repeating-linear-gradient(0deg, rgba(184,137,74,0.18) 0px, rgba(184,137,74,0.18) 1px, transparent 1px, transparent 90px), repeating-linear-gradient(90deg, rgba(184,137,74,0.18) 0px, rgba(184,137,74,0.18) 1px, transparent 1px, transparent 90px)',
  border: '1px solid rgba(184,137,74,0.28)',
}

const DEPTH = 1100

function Hotspot({
  label,
  style,
  opacity,
}: {
  label: string
  style: React.CSSProperties
  opacity: any
}) {
  return (
    <motion.div
      style={{ ...style, opacity }}
      className="absolute flex items-center gap-3"
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <span className="absolute h-full w-full animate-ping rounded-full bg-gold/30" />
        <span className="relative h-2 w-2 rounded-full bg-gold" />
      </span>
      <span className="whitespace-nowrap border border-night-line bg-night/80 px-3 py-1.5 text-[11px] tracking-[0.15em] text-cream-soft backdrop-blur-sm">
        {label}
      </span>
    </motion.div>
  )
}

const reveal = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function Chapter3D() {
  const t = useT()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const introOpacity = useTransform(scrollYProgress, [0, 0.08, 0.15], [1, 1, 0])
  const cubeScale = useTransform(scrollYProgress, [0, 0.22], [1, 3.6])
  const cubeOpacity = useTransform(scrollYProgress, [0, 0.12, 0.2], [1, 1, 0])

  const camZ = useTransform(scrollYProgress, [0.14, 0.72], [-1700, 300])
  const roomOpacity = useTransform(scrollYProgress, [0.14, 0.3], [0, 1])
  const lookY = useTransform(scrollYProgress, [0.72, 1], [0, -10])

  const hotspotOpacity = useTransform(scrollYProgress, [0.52, 0.62], [0, 1])
  const textOpacity = useTransform(scrollYProgress, [0.62, 0.74], [0, 1])
  const textY = useTransform(scrollYProgress, [0.62, 0.74], [50, 0])

  return (
    <section id="rundgaenge" className="relative">
      <div ref={ref} className="relative h-[420vh]">
        <div
          className="sticky top-0 h-screen overflow-hidden"
          style={{ perspective: '900px' }}
        >
          <motion.div
            style={{
              z: camZ,
              rotateY: lookY,
              opacity: roomOpacity,
              transformStyle: 'preserve-3d',
            }}
            className="absolute inset-0 will-change-transform"
          >
            <div
              className="absolute inset-0"
              style={{
                ...GOLD_GRID,
                transform: `translateZ(${-DEPTH}px)`,
              }}
            >
              <div
                className="absolute left-[18%] top-[22%] h-[42%] w-[26%]"
                style={{ border: '1px solid rgba(184,137,74,0.4)' }}
              >
                <div className="absolute left-1/2 top-0 h-full w-px bg-gold/40" />
                <div className="absolute left-0 top-1/2 h-px w-full bg-gold/40" />
              </div>
              <div
                className="absolute right-[16%] top-[30%] h-[52%] w-[22%]"
                style={{ border: '1px solid rgba(184,137,74,0.35)' }}
              >
                <div className="absolute right-[12%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-gold/50" />
              </div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(184,137,74,0.08), transparent 70%)',
                }}
              />
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 origin-bottom"
              style={{ ...GOLD_GRID, height: DEPTH, transform: 'rotateX(90deg)' }}
            />
            <div
              className="absolute left-0 right-0 top-0 origin-top"
              style={{ ...GOLD_GRID, height: DEPTH, transform: 'rotateX(-90deg)' }}
            />
            <div
              className="absolute bottom-0 left-0 top-0 origin-left"
              style={{ ...GOLD_GRID, width: DEPTH, transform: 'rotateY(90deg)' }}
            />
            <div
              className="absolute bottom-0 right-0 top-0 origin-right"
              style={{ ...GOLD_GRID, width: DEPTH, transform: 'rotateY(-90deg)' }}
            />

            <Hotspot
              label={t.rundgaenge.hotspot1}
              style={{ left: '24%', top: '48%', transform: `translateZ(${-DEPTH * 0.55}px)` }}
              opacity={hotspotOpacity}
            />
            <Hotspot
              label={t.rundgaenge.hotspot2}
              style={{ left: '58%', top: '62%', transform: `translateZ(${-DEPTH * 0.35}px)` }}
              opacity={hotspotOpacity}
            />
          </motion.div>

          <motion.div
            style={{ opacity: cubeOpacity, scale: cubeScale }}
            className="absolute inset-0 flex items-center justify-center will-change-transform"
          >
            <CubeMark className="h-24 w-24 text-gold md:h-32 md:w-32" strokeWidth={1.1} />
          </motion.div>

          <motion.div
            style={{ opacity: introOpacity }}
            className="absolute inset-x-0 top-[16%] flex flex-col items-center gap-5 px-6 text-center"
          >
            <p className="font-mono text-[12px] tracking-[0.3em] text-gold">
              {t.rundgaenge.eyebrow}
            </p>
            <p className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-light italic text-cream">
              {t.rundgaenge.enter}
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="absolute inset-x-0 bottom-0 px-6 pb-14 pt-40 lg:px-14"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(10,10,11,0.92) 20%, rgba(10,10,11,0.5) 60%, transparent 100%)',
              }}
            />
            <div className="relative mx-auto max-w-7xl">
              <h2 className="max-w-2xl font-serif text-[clamp(2.4rem,5.5vw,4.8rem)] font-light leading-[1.05] text-cream">
                {t.rundgaenge.title1}
                <br />
                <em className="italic text-gold-bright">{t.rundgaenge.titleEm}</em>
                {t.rundgaenge.title2}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-soft md:text-lg">
                {t.rundgaenge.lead}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-10">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-4 font-mono text-[12px] tracking-[0.3em] text-gold">{t.rundgaenge.demoEyebrow}</p>
              <h3 className="max-w-2xl font-serif text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-tight text-cream">
                {t.rundgaenge.demoTitle1}
                <em className="italic text-gold-bright">{t.rundgaenge.demoTitleEm}</em>
                {t.rundgaenge.demoTitle2}
              </h3>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-stone">
              {t.rundgaenge.demoText}
            </p>
          </div>

          <WalkthroughVideo />

          <Link
            to="/rundgang"
            className="group mt-10 flex items-center gap-4 border-t border-night-line pt-6"
          >
            <img
              src={TOUR_COVER}
              alt=""
              className="h-14 w-20 shrink-0 rounded object-cover"
            />
            <span className="flex-1">
              <span className="block text-[14px] font-medium text-cream transition-colors duration-300 group-hover:text-gold-bright">
                {t.rundgaenge.tourLinkTitle}
              </span>
              <span className="block text-[13px] text-stone">
                {t.rundgaenge.tourLinkText}
              </span>
            </span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-stone transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold" fill="none">
              <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-40 pt-28 lg:px-10">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-120px' }}
          className="mb-20"
        >
          <p className="mb-6 font-mono text-[12px] tracking-[0.3em] text-gold">{t.rundgaenge.forWhoEyebrow}</p>
          <h3 className="max-w-2xl font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-tight text-cream">
            {t.rundgaenge.forWhoTitle1}
            <br />
            {t.rundgaenge.forWhoTitle2a}
            <em className="italic text-gold-bright">{t.rundgaenge.forWhoTitleEm}</em>
            {t.rundgaenge.forWhoTitle2b}
          </h3>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          className="grid gap-14 md:grid-cols-3 md:gap-10"
        >
          {t.rundgaenge.audience.map((p) => (
            <motion.div key={p.title} variants={reveal} className="border-t border-night-line pt-8">
              <h4 className="mb-4 font-serif text-2xl font-light text-cream">{p.title}</h4>
              <p className="text-[15px] leading-relaxed text-stone">{p.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
