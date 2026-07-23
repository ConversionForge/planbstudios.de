import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { Magnetic } from './Magnetic'
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
    <div className="select-none bg-hg-cream font-grotesk text-hg-ink">
      {/* Dunkler Kopfbereich */}
      <div className="bg-hg-navy px-10 pb-14 pt-6 text-hg-cream">
        <div className="flex items-center justify-between border-b border-hg-cream/15 pb-4">
          <div className="flex items-center gap-2.5">
            <MonogramHG className="h-6 w-6 text-hg-clay-soft" />
            <span className="font-display text-[15px] font-medium">Havel &amp; Grau</span>
          </div>
          <div className="flex items-center gap-6">
            {['Objekte', 'Haltung', 'Kontakt'].map((l) => (
              <span key={l} className="text-[10px] tracking-[0.06em] text-hg-cream/70">
                {l}
              </span>
            ))}
            <span className="bg-hg-clay px-3 py-1.5 text-[10px] font-medium text-hg-cream">
              Beratung
            </span>
          </div>
        </div>

        <p className="mt-10 text-[10px] uppercase tracking-[0.3em] text-hg-clay-soft">
          Immobilien in Potsdam · seit 1998
        </p>
        <p className="mt-5 font-display text-6xl font-medium leading-[0.92] tracking-[-0.02em]">
          Häuser mit
          <br />
          <span className="italic text-hg-clay-soft">Vorgeschichte.</span>
        </p>
        <div className="mt-8 flex items-end justify-between gap-8">
          <p className="max-w-xs text-[13px] leading-relaxed text-hg-cream/70">
            Wir vermitteln keine Quadratmeter, sondern Orte, die schon einmal
            jemandem etwas bedeutet haben.
          </p>
          <VillaIllo className="h-auto w-[150px] shrink-0 text-hg-cream/45" />
        </div>
        <span className="mt-8 inline-block bg-hg-clay px-6 py-3 text-[11px] font-medium text-hg-cream">
          Objekte ansehen
        </span>
      </div>

      {/* Kennzahlen */}
      <div className="grid grid-cols-4 gap-6 border-b border-hg-line px-10 py-8">
        {[
          ['27', 'Jahre an der Havel'],
          ['120+', 'vermittelte Objekte'],
          ['14', 'Objekte im Angebot'],
          ['1:1', 'persönliche Betreuung'],
        ].map(([v, l]) => (
          <div key={l}>
            <p className="font-display text-3xl font-medium leading-none text-hg-navy">{v}</p>
            <p className="mt-1.5 text-[9px] uppercase tracking-[0.16em] text-hg-muted">{l}</p>
          </div>
        ))}
      </div>

      {/* Objekt-Tafel */}
      <div className="px-10 py-12">
        <p className="mb-8 font-display text-3xl font-medium text-hg-navy">Das Verzeichnis</p>
        <div className="grid grid-cols-2 border border-hg-line bg-hg-cream">
          <div className="relative flex items-center justify-center bg-hg-shell p-8">
            <span className="absolute left-4 top-4 font-display text-[12px] text-hg-muted">01 / 14</span>
            <VillaIllo className="h-auto w-[72%] text-hg-navy" />
          </div>
          <div className="flex flex-col justify-center gap-3 p-8">
            <p className="text-[10px] uppercase tracking-[0.22em] text-hg-clay">Potsdam · Babelsberg</p>
            <p className="font-display text-2xl font-medium leading-tight text-hg-navy">
              Stadtvilla Babelsberg
            </p>
            <p className="text-[12px] leading-relaxed text-hg-muted">
              Gründerzeit, aufwendig saniert, Blick über den Park.
            </p>
            <div className="mt-1 flex items-baseline gap-5 border-t border-hg-line pt-3 text-[12px]">
              <span>6 Zimmer</span>
              <span>245 m²</span>
              <span className="font-display text-[17px] font-medium text-hg-navy">1.480.000 €</span>
            </div>
          </div>
        </div>
      </div>

      {/* Haltung */}
      <div className="bg-hg-clay px-10 py-14 text-hg-cream">
        <p className="max-w-lg font-display text-2xl font-medium leading-[1.2]">
          Ein Haus verkauft sich nicht über den Preis. Sondern über die Geschichte,
          <span className="italic"> die es weitererzählt.</span>
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
