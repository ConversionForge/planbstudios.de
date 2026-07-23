import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { CubeMark } from './Logo'
import { Magnetic } from './Magnetic'
import { MeridianMark, ElevationDrawing } from '../example/meridianBlueprint'

const LOFT_IMG = `${import.meta.env.BASE_URL}rundgang/living-1.jpg`

interface Case {
  to: string
  tag: string
  kind: string
  title: string
  text: string
  media: 'meridian' | 'loft'
}

const CASES: Case[] = [
  {
    to: '/meridian',
    tag: 'Webdesign · Neubau',
    kind: 'Konzeptstudie',
    title: 'MERIDIAN',
    text: 'Ein Wohnquartier als technisches Manifest — Blaupausen-Ästhetik, Schweizer Typografie und Zeichnungen, die sich beim Scrollen selbst zeichnen.',
    media: 'meridian',
  },
  {
    to: '/rundgang',
    tag: '3D-Rundgang · Objektfilm',
    kind: 'Objekt-Demo',
    title: 'Design-Loft Hamburg',
    text: 'Aus reinen Objektfotos ein cinematischer Walkthrough und ein begehbarer Rundgang durch sieben Räume — ein Loft in Bewegung.',
    media: 'loft',
  },
]

function MeridianMini() {
  return (
    <div
      className="flex h-full flex-col bg-mer-paper text-mer-ink"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(20,23,28,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,23,28,0.05) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
      }}
    >
      <div className="flex items-center justify-between border-b border-mer-ink/15 px-5 py-2.5">
        <div className="flex items-center gap-2">
          <MeridianMark className="h-4 w-4 text-mer-ink" />
          <span className="font-tech text-[11px] font-bold tracking-[0.18em]">MERIDIAN</span>
        </div>
        <span className="hidden font-data text-[8px] tracking-[0.14em] text-mer-muted sm:block">
          53°52′N · 10°41′E
        </span>
      </div>
      <div className="grid flex-1 grid-cols-[1fr_1.1fr] items-center gap-4 px-5 py-3">
        <div>
          <p className="font-data text-[8px] tracking-[0.2em] text-mer-tide">
            N° 01 — NEUBAU · LÜBECK
          </p>
          <p className="mt-2 font-tech text-2xl font-bold uppercase leading-[0.92] tracking-[-0.02em] md:text-3xl">
            Wohnen
            <br />
            <span className="mer-outline">am Wasser</span>
          </p>
        </div>
        <ElevationDrawing animate={false} className="h-auto w-full" />
      </div>
    </div>
  )
}

function CaseCard({ to, tag, kind, title, text, media }: Case) {
  return (
    <Link
      to={to}
      data-cursor="Ansehen"
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
              Objektfilm
            </span>
          </>
        ) : (
          <MeridianMini />
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
          Projekt ansehen
          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none">
            <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export function ChapterReferenzen() {
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-7xl px-6 lg:px-10"
          >
            <p className="mb-6 font-mono text-[12px] tracking-[0.3em] text-gold">03 — REFERENZEN</p>
            <h2 className="max-w-3xl font-serif text-[clamp(2.2rem,5vw,4.5rem)] font-light leading-[1.05] text-cream">
              Arbeiten, die für sich
              <br />
              <em className="italic text-gold-bright">sprechen</em>.
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
                Ihr Projekt könnte
                <br />
                hier stehen.
              </p>
              <Magnetic>
                <a
                  href="#kontakt"
                  className="block border border-gold/40 px-7 py-3 text-[13px] font-medium tracking-[0.06em] text-cream transition-all duration-300 hover:border-gold hover:bg-gold hover:text-night"
                >
                  Das erste sein
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
