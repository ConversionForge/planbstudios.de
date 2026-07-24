import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { Magnetic } from './Magnetic'
import { MeridianMark, ElevationDrawing } from '../example/meridianBlueprint'

const GRID_BG = {
  backgroundImage:
    'linear-gradient(to right, rgba(20,23,28,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,23,28,0.05) 1px, transparent 1px)',
  backgroundSize: '54px 54px',
}

const reveal = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
}

// Kompakte, echte Vorschau der Kundenmarke "MERIDIAN" — Blaupausen-Ästhetik als
// klarer Kontrast zu Plan B Studios, damit erkennbar ist: eine andere Marke.
function MeridianPreview() {
  return (
    <div className="select-none bg-mer-paper font-tech text-mer-ink" style={GRID_BG}>
      {/* Nav */}
      <div className="flex items-center justify-between border-b border-mer-ink/15 px-10 py-4">
        <div className="flex items-center gap-2.5">
          <MeridianMark className="h-5 w-5 text-mer-ink" />
          <span className="font-tech text-[15px] font-bold tracking-[0.18em]">MERIDIAN</span>
        </div>
        <div className="flex items-center gap-6">
          {['Quartier', 'Architektur', 'Wohnungen', 'Lage'].map((l) => (
            <span key={l} className="font-data text-[10px] uppercase tracking-[0.16em] text-mer-muted">
              {l}
            </span>
          ))}
          <span className="bg-mer-ink px-4 py-2 font-data text-[10px] uppercase tracking-[0.16em] text-mer-paper">
            Anfragen
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="px-10 pt-10">
        <div className="flex items-baseline justify-between border-b border-mer-ink/20 pb-3 font-data text-[10px] tracking-[0.22em] text-mer-muted">
          <span>N° 01 — NEUBAUPROJEKT</span>
          <span>53°52′N · 10°41′E</span>
        </div>
        <h1 className="mt-8 font-tech text-7xl font-bold uppercase leading-[0.9] tracking-[-0.02em]">
          Wohnen
          <br />
          <span className="mer-outline">am Wasser</span>
        </h1>
        <div className="mt-6 flex items-end justify-between gap-6 pb-6">
          <p className="max-w-xs text-[13px] leading-relaxed text-mer-muted">
            42 Wohnungen in vier Baukörpern, direkt am Kai der Trave.
          </p>
          <span className="font-data text-[11px] tracking-[0.16em] text-mer-tide">
            WOHNUNGEN ANSEHEN ↓
          </span>
        </div>
        <ElevationDrawing className="mx-auto h-auto w-[82%]" />
      </div>

      {/* Laufband */}
      <div className="mt-6 flex items-center gap-8 overflow-hidden border-y border-mer-ink/20 px-10 py-3 font-data text-[11px] uppercase tracking-[0.24em] text-mer-ink">
        {['42 Wohnungen', 'Bezug 2026', 'An der Trave', 'Provisionsfrei', 'KfW 40'].map((m) => (
          <span key={m} className="flex items-center gap-8 whitespace-nowrap">
            <span className="inline-block h-1.5 w-1.5 bg-mer-tide" />
            {m}
          </span>
        ))}
      </div>

      {/* Kennzahlen */}
      <div className="grid grid-cols-4 gap-4 px-10 py-10">
        {[
          ['42', 'Wohnungen'],
          ['4', 'Baukörper'],
          ['38–142', 'm² Wohnfläche'],
          ['2026', 'Bezugsfertig'],
        ].map(([v, l]) => (
          <div key={l}>
            <p className="font-tech text-3xl font-bold tracking-[-0.02em] text-mer-ink">{v}</p>
            <p className="mt-1 font-data text-[9px] uppercase tracking-[0.18em] text-mer-muted">{l}</p>
          </div>
        ))}
      </div>

      {/* Wohnungs-Zeile */}
      <div className="border-t border-mer-ink/15 px-10 py-10">
        <p className="mb-6 font-tech text-3xl font-bold uppercase tracking-[-0.01em]">Vier Typen.</p>
        <div className="grid grid-cols-[3rem_1.4fr_1fr_1fr_8rem] items-baseline gap-4 border-b border-mer-ink/15 py-5">
          <span className="font-data text-[12px] tracking-[0.2em] text-mer-tide">01</span>
          <span className="font-tech text-xl font-bold uppercase">Atelier</span>
          <span className="text-[13px] text-mer-muted">1–2 Zimmer</span>
          <span className="text-[13px] text-mer-muted">ab 38 m²</span>
          <span className="text-[14px] font-medium">ab 329.000 €</span>
        </div>
      </div>

      {/* Lage */}
      <div className="bg-mer-deep px-10 py-14 text-mer-paper">
        <p className="font-tech text-2xl font-bold uppercase leading-[1.1]">
          Am Kai. <span className="mer-outline-paper">Nicht irgendwo.</span>
        </p>
      </div>
    </div>
  )
}

export function ChapterWebdesign() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.35], [24, 0])
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.86, 1])
  const frameY = useTransform(scrollYProgress, [0, 0.35], [70, 0])
  const pageY = useTransform(scrollYProgress, [0.42, 0.96], ['0%', '-56%'])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1])

  return (
    <section id="webdesign" className="relative">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-36 lg:px-10">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-120px' }}
        >
          <p className="mb-6 font-mono text-[12px] tracking-[0.3em] text-gold">01 — WEBDESIGN</p>
          <h2 className="max-w-3xl font-serif text-[clamp(2.6rem,6vw,5.5rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream">
            Websites mit
            <br />
            <em className="italic text-gold-bright">Haltung.</em>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-stone md:text-lg">
            Kein Baukasten, keine Vorlage. Jede Seite entsteht aus Marke, Zielgruppe
            und Inhalt — und wird so lange verdichtet, bis nichts Überflüssiges
            mehr übrig ist.
          </p>
        </motion.div>
      </div>

      <div ref={sceneRef} className="relative h-[320vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-4">
          <div style={{ perspective: 1400 }}>
            <motion.div
              style={{ rotateX, scale, y: frameY, transformStyle: 'preserve-3d' }}
              className="relative w-[min(94vw,1000px)] will-change-transform"
            >
              <motion.div
                style={{ opacity: glowOpacity }}
                className="pointer-events-none absolute -inset-x-16 -bottom-10 top-1/2 rounded-[50%] bg-gold/[0.05] blur-3xl"
              />
              <div className="relative overflow-hidden rounded-xl border border-night-line bg-mer-paper shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]">
                <div className="flex h-11 items-center gap-4 border-b border-night-line bg-[#101011] px-5">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-stone/25" />
                    <div className="h-2.5 w-2.5 rounded-full bg-stone/25" />
                    <div className="h-2.5 w-2.5 rounded-full bg-stone/25" />
                  </div>
                  <div className="mx-auto flex items-center gap-2 rounded-full bg-night px-5 py-1">
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-gold" fill="none">
                      <rect x="2.5" y="5" width="7" height="5" rx="1" stroke="currentColor" />
                      <path d="M4 5V3.5a2 2 0 0 1 4 0V5" stroke="currentColor" />
                    </svg>
                    <span className="text-[11px] tracking-[0.05em] text-stone">meridian.example</span>
                  </div>
                  <div className="w-12" />
                </div>
                <div className="relative h-[min(64vh,600px)] overflow-hidden">
                  <motion.div style={{ y: pageY }} className="will-change-transform">
                    <MeridianPreview />
                  </motion.div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-mer-paper to-transparent" />
                </div>
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: glowOpacity }}
              className="mt-8 flex flex-col items-center gap-4 text-center"
            >
              <p className="text-[13px] leading-relaxed text-stone">
                Ein Beispielprojekt aus dem Studio — vollständig gebaut, hier begehbar.
              </p>
              <Magnetic>
                <Link
                  to="/meridian"
                  className="group flex items-center gap-3 border border-gold/40 bg-night/40 px-7 py-3.5 text-[14px] font-medium tracking-[0.04em] text-cream transition-all duration-300 hover:border-gold hover:bg-gold hover:text-night"
                >
                  Beispiel-Website öffnen
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-40 pt-28 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          className="grid gap-14 md:grid-cols-3 md:gap-10"
        >
          {[
            {
              n: '01',
              title: 'Maßgeschneidert',
              text: 'Konzept, Gestaltung und Text aus einer Hand — entworfen für genau eine Marke: Ihre.',
            },
            {
              n: '02',
              title: 'Präzise gebaut',
              text: 'Sauberer Code, flüssige 60 fps, Ladezeiten unter einer Sekunde. Technik, die man spürt, ohne sie zu sehen.',
            },
            {
              n: '03',
              title: 'Auf Wirkung ausgelegt',
              text: 'Dramaturgie statt Datenblatt: Jede Seite führt Besucher dorthin, wo Entscheidungen fallen.',
            },
          ].map((p) => (
            <motion.div key={p.n} variants={reveal} className="border-t border-night-line pt-8">
              <p className="mb-5 font-mono text-[12px] tracking-[0.2em] text-gold">{p.n}</p>
              <h3 className="mb-4 font-serif text-2xl font-light text-cream">{p.title}</h3>
              <p className="text-[15px] leading-relaxed text-stone">{p.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
