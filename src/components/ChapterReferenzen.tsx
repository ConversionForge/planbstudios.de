import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { CubeMark } from './Logo'
import { Magnetic } from './Magnetic'
import { MonogramHG, VillaIllo } from '../example/illustrations'
import { useT } from '../i18n'
import { start } from '../lib/ssr'

const LOFT_IMG = `${import.meta.env.BASE_URL}rundgang/living-1.jpg`

interface Case {
  to: string
  tag: string
  kind: string
  title: string
  text: string
  media: 'havelgrau' | 'loft'
}

// Struktur (Ziel + Bildart) bleibt fest, die Texte kommen aus dem Wörterbuch.
const CASE_STRUCT = [
  { to: '/beispiel', media: 'havelgrau' as const },
  { to: '/rundgang', media: 'loft' as const },
]

function HavelGrauMini() {
  return (
    <div className="flex h-full flex-col bg-hg-navy text-hg-cream">
      <div className="flex items-center justify-between border-b border-hg-cream/15 px-5 py-2.5">
        <div className="flex items-center gap-2">
          <MonogramHG className="h-4 w-4 text-hg-clay-soft" />
          <span className="font-display text-[12px] font-medium">Havel &amp; Grau</span>
        </div>
        <span className="bg-hg-clay px-3 py-1 text-[9px] font-medium text-hg-cream">Beratung</span>
      </div>
      <div className="flex flex-1 flex-col justify-center px-6 py-4">
        <p className="text-[8px] uppercase tracking-[0.26em] text-hg-clay-soft">
          Immobilien in Potsdam · seit 1998
        </p>
        <p className="mt-2 font-display text-3xl font-medium leading-[0.9] tracking-[-0.02em] md:text-4xl">
          Häuser mit
          <br />
          <span className="italic text-hg-clay-soft">Vorgeschichte.</span>
        </p>
        <VillaIllo className="mt-4 h-auto w-[130px] text-hg-cream/40" />
      </div>
    </div>
  )
}

function CaseCard({ to, tag, kind, title, text, media }: Case) {
  const t = useT()
  return (
    <Link
      to={to}
      data-cursor={t.arbeiten.cursorLabel}
      className="group relative flex h-[64vh] min-h-[460px] w-[62vw] shrink-0 flex-col overflow-hidden rounded-xl border border-night-line bg-night-raised transition-all duration-500 hover:-translate-y-1 hover:border-gold/40"
    >
      <div className="relative h-[54%] overflow-hidden border-b border-night-line">
        {media === 'loft' ? (
          <>
            <img
              src={LOFT_IMG}
              alt=""
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-raised/60 to-transparent" />
            <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-night/50 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              {t.arbeiten.filmLabel}
            </span>
          </>
        ) : (
          <HavelGrauMini />
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-8 md:p-10">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="border border-gold/40 px-3 py-1 text-[11px] tracking-[0.2em] text-gold">
              {tag.toUpperCase()}
            </span>
            <span className="text-[11px] tracking-[0.2em] text-stone">{kind.toUpperCase()}</span>
          </div>
          <h3 className="font-serif text-[clamp(1.8rem,3.2vw,2.8rem)] font-light leading-tight text-cream">
            {title}
          </h3>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone">{text}</p>
        </div>
        <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-gold">
          {t.arbeiten.cardCta}
          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none">
            <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export function ChapterReferenzen() {
  const t = useT()
  const CASES: Case[] = t.arbeiten.cases.map((c, i) => ({ ...c, ...CASE_STRUCT[i] }))
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0.1, 0.9], ['0vw', '-118vw'])

  return (
    <section id="referenzen" className="relative border-t border-night-line/60">
      <div ref={ref} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen flex-col justify-center gap-12 overflow-hidden pt-20">
          <motion.div
            initial={start({ opacity: 0, y: 30 })}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-7xl px-6 lg:px-10"
          >
            <p className="mb-6 font-mono text-[12px] tracking-[0.3em] text-gold">{t.arbeiten.eyebrow}</p>
            <h2 className="max-w-3xl font-serif text-[clamp(2.2rem,5vw,4.5rem)] font-light leading-[1.05] text-cream">
              {t.arbeiten.title1}
              <br />
              <em className="italic text-gold-bright">{t.arbeiten.titleEm}</em>
              {t.arbeiten.title2}
            </h2>
          </motion.div>

          <motion.div
            style={{ x }}
            className="flex gap-[5vw] pl-[12vw] pr-[12vw] will-change-transform"
          >
            {CASES.map((c) => (
              <CaseCard key={c.title} {...c} />
            ))}
            <div className="flex h-[64vh] min-h-[460px] w-[62vw] shrink-0 flex-col items-center justify-center gap-8 rounded-xl border border-dashed border-night-line bg-transparent p-8 text-center">
              <CubeMark className="h-12 w-12 text-gold/50" strokeWidth={1} />
              <p className="max-w-sm font-serif text-[clamp(1.6rem,2.8vw,2.4rem)] font-light leading-snug text-cream-soft">
                {t.arbeiten.emptyTitle1}
                <br />
                {t.arbeiten.emptyTitle2}
              </p>
              <Magnetic>
                <a
                  href="#kontakt"
                  className="block border border-gold/40 px-7 py-3 text-[13px] font-medium tracking-[0.06em] text-cream transition-all duration-300 hover:border-gold hover:bg-gold hover:text-night"
                >
                  {t.arbeiten.emptyCta}
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
