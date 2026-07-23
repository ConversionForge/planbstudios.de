import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { Magnetic } from './Magnetic'
import { PROPERTIES } from '../example/HavelGrauSite'
import { VillaIllo, MonogramHG } from '../example/illustrations'

const reveal = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
}

// Kompakte, echte Vorschau der Kundenmarke "Havel & Grau" — bewusst hell/warm
// als klarer Kontrast zu Plan B Studios, damit erkennbar ist: eine andere Marke.
function HavelGrauPreview() {
  return (
    <div className="select-none bg-hg-paper font-grotesk text-hg-ink">
      <div className="flex items-center justify-between border-b border-hg-line px-10 py-5">
        <div className="flex items-center gap-2.5">
          <MonogramHG className="h-6 w-6 text-hg-olive" />
          <span className="text-[12px] font-medium uppercase tracking-[0.24em] text-hg-ink">
            Havel &amp; Grau
          </span>
        </div>
        <div className="flex items-center gap-6">
          {['Objekte', 'Philosophie', 'Kontakt'].map((l) => (
            <span key={l} className="text-[10px] font-medium uppercase tracking-[0.14em] text-hg-muted">
              {l}
            </span>
          ))}
          <span className="border border-hg-olive px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-hg-olive">
            Beratung
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 items-center gap-10 px-10 py-12">
        <div>
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-hg-olive">
            Immobilien · Potsdam · seit 1998
          </p>
          <p className="font-display text-6xl font-light leading-[0.98] text-hg-ink">
            Zuhause mit
            <br />
            <span className="italic text-hg-olive">Charakter.</span>
          </p>
          <p className="mt-6 max-w-xs text-[13px] leading-relaxed text-hg-muted">
            Ausgewählte Objekte an der Havel — ehrlich beraten, sorgfältig vermittelt.
          </p>
          <div className="mt-7 flex items-center gap-3">
            <span className="bg-hg-olive px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-hg-paper">
              Objekte ansehen
            </span>
            <span className="px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-hg-ink">
              Beratung
            </span>
          </div>
        </div>
        <div className="flex aspect-[4/5] items-center justify-center bg-hg-olive">
          <VillaIllo className="h-[70%] w-[70%] text-hg-paper" />
        </div>
      </div>

      <div className="border-t border-hg-line px-10 py-12">
        <div className="mb-8 flex items-end justify-between">
          <p className="font-display text-3xl font-light text-hg-ink">Ausgewählte Objekte</p>
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-hg-olive">
            Alle 14 →
          </span>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {PROPERTIES.map((p) => {
            const { Illo } = p
            return (
              <div key={p.name}>
                <div className="mb-4 flex aspect-[4/3] items-center justify-center bg-hg-panel">
                  <Illo className="h-[74%] w-[74%] text-hg-olive" />
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-display text-lg font-medium leading-tight text-hg-ink">{p.name}</p>
                  <span className="shrink-0 text-[12px] font-medium text-hg-olive">{p.price}</span>
                </div>
                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-hg-muted">
                  {p.rooms} · {p.area}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-hg-olive px-10 py-16 text-center text-hg-paper">
        <p className="mx-auto max-w-lg font-display text-2xl font-light italic leading-relaxed">
          „Ein Zuhause erkennt man in dem Moment, in dem man eintritt."
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
              <div className="relative overflow-hidden rounded-xl border border-night-line bg-hg-paper shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]">
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
                    <span className="text-[11px] tracking-[0.05em] text-stone">havel-grau.example</span>
                  </div>
                  <div className="w-12" />
                </div>
                <div className="relative h-[min(64vh,600px)] overflow-hidden">
                  <motion.div style={{ y: pageY }} className="will-change-transform">
                    <HavelGrauPreview />
                  </motion.div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-hg-paper to-transparent" />
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
                  to="/beispiel"
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
