import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { VillaIllo, LoftIllo, GartenhausIllo, MonogramHG } from './illustrations'
import { Magnetic } from '../components/Magnetic'

const EASE = [0.22, 1, 0.36, 1] as const

/* ---------- Bausteine ---------- */

/**
 * Maskierte Zeilen. Ein eigener Beobachter pro Headline steuert alle Zeilen —
 * verschachtelte whileInView-Beobachter lösen sonst unzuverlässig aus.
 */
function MaskLines({ lines, className }: { lines: ReactNode[]; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em]">
          <motion.span
            className="block"
            initial={{ y: '115%' }}
            animate={{ y: inView ? 0 : '115%' }}
            transition={{ duration: 0.95, ease: EASE, delay: i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1400, 1)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.85, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Daten ---------- */

export const PROPERTIES = [
  {
    no: '01',
    name: 'Stadtvilla Babelsberg',
    location: 'Potsdam · Babelsberg',
    rooms: '6 Zimmer',
    area: '245 m²',
    price: '1.480.000 €',
    note: 'Gründerzeit, aufwendig saniert, Blick über den Park.',
    Illo: VillaIllo,
  },
  {
    no: '02',
    name: 'Loft am Hafen',
    location: 'Potsdam · Speicherstadt',
    rooms: '3 Zimmer',
    area: '138 m²',
    price: '790.000 €',
    note: 'Ehemaliger Speicher, fünf Meter Deckenhöhe, Wasserblick.',
    Illo: LoftIllo,
  },
  {
    no: '03',
    name: 'Gartenhaus Sanssouci',
    location: 'Potsdam · Westend',
    rooms: '4 Zimmer',
    area: '176 m²',
    price: '960.000 €',
    note: 'Ruhige Seitenstraße, alter Baumbestand, Südgarten.',
    Illo: GartenhausIllo,
  },
]

/* ---------- Kopf ---------- */

function Ribbon() {
  return (
    <div className="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-night px-4 py-2.5 text-center font-sans text-[12px] text-cream-soft">
      <span className="flex items-center gap-2">
        <span className="inline-block h-1.5 w-1.5 bg-gold" />
        Beispielprojekt — erstellt von Plan B Studios
      </span>
      <Link
        to="/#webdesign"
        className="font-medium text-gold underline-offset-4 transition-colors hover:text-gold-bright hover:underline"
      >
        ← Zurück zu Plan B Studios
      </Link>
    </div>
  )
}

function HGNav() {
  return (
    <header className="sticky top-[41px] z-40 border-b border-hg-cream/15 bg-hg-navy/90 text-hg-cream backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#hg-top" className="flex items-center gap-3">
          <MonogramHG className="h-8 w-8 text-hg-clay-soft" />
          <span className="font-display text-[19px] font-medium tracking-[0.02em]">
            Havel&nbsp;&amp;&nbsp;Grau
          </span>
        </a>
        <nav className="hidden items-center gap-9 md:flex">
          {['Objekte', 'Haltung', 'Kontakt'].map((l) => (
            <a
              key={l}
              href={`#hg-${l.toLowerCase()}`}
              className="group relative py-1 font-grotesk text-[13px] tracking-[0.04em] text-hg-cream/70 transition-colors hover:text-hg-cream"
            >
              {l}
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-hg-clay-soft transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <a
          href="#hg-kontakt"
          className="group relative overflow-hidden bg-hg-clay px-5 py-2.5 font-grotesk text-[13px] font-medium text-hg-cream"
        >
          <span className="relative z-10">Beratung</span>
          <span className="absolute inset-0 origin-left scale-x-0 bg-hg-cream/20 transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </a>
      </div>
    </header>
  )
}

/* ---------- Hero ---------- */

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 90])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const illoY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section ref={ref} id="hg-top" className="relative overflow-hidden bg-hg-navy text-hg-cream">
      <motion.div style={{ y, opacity }} className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:pt-28 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 font-grotesk text-[12px] uppercase tracking-[0.32em] text-hg-clay-soft"
        >
          Immobilien in Potsdam · seit 1998
        </motion.p>

        <h1 className="font-display text-[clamp(3.4rem,11vw,9rem)] font-medium leading-[0.92] tracking-[-0.02em]">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              initial={{ y: '112%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            >
              Häuser mit
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block italic text-hg-clay-soft"
              initial={{ y: '112%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.34 }}
            >
              Vorgeschichte.
            </motion.span>
          </span>
        </h1>

        <div className="mt-14 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
            className="max-w-md font-grotesk text-[17px] leading-relaxed text-hg-cream/70"
          >
            Wir vermitteln keine Quadratmeter, sondern Orte, die schon einmal
            jemandem etwas bedeutet haben. Vierzehn ausgewählte Objekte an der
            Havel — jedes persönlich besichtigt, jedes ehrlich beschrieben.
          </motion.p>

          <motion.div
            style={{ y: illoY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden justify-self-end md:block"
          >
            <VillaIllo animate className="h-auto w-[260px] text-hg-cream/45" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
          className="mt-14 flex flex-wrap items-center gap-4"
        >
          <Magnetic strength={0.2}>
            <a
              href="#hg-objekte"
              className="block bg-hg-clay px-8 py-4 font-grotesk text-[14px] font-medium text-hg-cream transition-colors duration-300 hover:bg-hg-clay-soft hover:text-hg-navy"
            >
              Objekte ansehen
            </a>
          </Magnetic>
          <a
            href="#hg-kontakt"
            className="group flex items-center gap-2 px-2 font-grotesk text-[14px] text-hg-cream/80 transition-colors hover:text-hg-cream"
          >
            Beratung anfragen
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ---------- Signature: gestapelte Objekt-Tafeln ---------- */

function Plate({ p, index, total }: { p: (typeof PROPERTIES)[number]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1])
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const { Illo } = p

  return (
    <div ref={ref} className="sticky top-24 md:top-28" style={{ zIndex: index + 1 }}>
      <motion.article
        style={{ scale }}
        className="grid overflow-hidden border border-hg-line bg-hg-cream shadow-[0_-8px_40px_-20px_rgba(16,31,60,0.35)] md:grid-cols-2"
      >
        <div className="relative flex items-center justify-center overflow-hidden bg-hg-shell p-10">
          <span className="absolute left-6 top-6 font-display text-[15px] text-hg-muted">
            {p.no} / {String(total).padStart(2, '0')}
          </span>
          <Illo animate play={inView} className="h-auto w-[76%] text-hg-navy" />
        </div>

        <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
          <p className="font-grotesk text-[12px] uppercase tracking-[0.24em] text-hg-clay">
            {p.location}
          </p>
          <h3 className="font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-medium leading-[1.05] text-hg-navy">
            {p.name}
          </h3>
          <p className="max-w-sm font-grotesk text-[15px] leading-relaxed text-hg-muted">{p.note}</p>

          <div className="mt-2 flex flex-wrap items-baseline gap-x-8 gap-y-2 border-t border-hg-line pt-5 font-grotesk text-[14px] text-hg-ink">
            <span>{p.rooms}</span>
            <span>{p.area}</span>
            <span className="font-display text-[22px] font-medium text-hg-navy">{p.price}</span>
          </div>

          <a
            href="#hg-kontakt"
            className="group mt-2 flex w-fit items-center gap-2 font-grotesk text-[13px] font-medium uppercase tracking-[0.14em] text-hg-clay"
          >
            Besichtigung anfragen
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </motion.article>
    </div>
  )
}

/* ---------- Haltung ---------- */

function Haltung() {
  return (
    <section id="hg-haltung" className="bg-hg-clay py-24 text-hg-cream md:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Reveal>
          <p className="mb-10 font-grotesk text-[12px] uppercase tracking-[0.3em] text-hg-cream/70">
            Unsere Haltung
          </p>
        </Reveal>
        <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] font-medium leading-[1.15]">
          <MaskLines
            lines={[
              'Ein Haus verkauft sich nicht',
              <span key="2" className="italic">über den Preis.</span>,
              'Sondern über die Geschichte,',
              <span key="4" className="italic">die es weitererzählt.</span>,
            ]}
          />
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-12 max-w-xl font-grotesk text-[16px] leading-relaxed text-hg-cream/80">
            Deshalb nehmen wir jedes Objekt selbst in Augenschein, bevor es in
            unser Verzeichnis kommt. Wer bei uns kauft, weiß vorher, was ihn
            erwartet — auch das, was renoviert werden muss.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-8 font-display text-[18px] italic text-hg-cream/90">
            Katharina Grau — Gründerin
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Seite ---------- */

export function HavelGrauSite() {
  useEffect(() => {
    document.title = 'Havel & Grau — Immobilien in Potsdam (Beispielprojekt)'
    return () => {
      document.title = 'Plan B Studios — Webdesign & 3D-Rundgänge'
    }
  }, [])

  return (
    <div className="min-h-screen bg-hg-cream font-grotesk text-hg-ink antialiased">
      <Ribbon />
      <HGNav />
      <Hero />

      {/* Kennzahlen als Band */}
      <section className="border-b border-hg-line bg-hg-cream py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 md:grid-cols-4 lg:px-8">
          {[
            { v: <CountUp to={27} />, l: 'Jahre an der Havel' },
            { v: <CountUp to={120} suffix="+" />, l: 'vermittelte Objekte' },
            { v: <CountUp to={14} />, l: 'Objekte im Angebot' },
            { v: '1:1', l: 'persönliche Betreuung' },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08}>
              <p className="font-display text-[clamp(2.4rem,5vw,3.6rem)] font-medium leading-none text-hg-navy">
                {s.v}
              </p>
              <p className="mt-2 font-grotesk text-[12px] uppercase tracking-[0.16em] text-hg-muted">
                {s.l}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Objekte — gestapelte Tafeln */}
      <section id="hg-objekte" className="bg-hg-cream pb-32 pt-24 md:pt-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.05] text-hg-navy">
              <MaskLines lines={['Das Verzeichnis']} />
            </h2>
            <Reveal delay={0.15}>
              <p className="max-w-xs font-grotesk text-[15px] leading-relaxed text-hg-muted">
                Drei von vierzehn Objekten. Der vollständige Bestand auf Anfrage.
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-8">
            {PROPERTIES.map((p, i) => (
              <Plate key={p.no} p={p} index={i} total={14} />
            ))}
          </div>
        </div>
      </section>

      <Haltung />

      {/* Kontakt */}
      <section id="hg-kontakt" className="bg-hg-navy py-28 text-hg-cream md:py-36">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-medium leading-[1.05]">
              <MaskLines lines={['Reden wir', <span key="2" className="italic text-hg-clay-soft">über Ihr Haus.</span>]} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-md font-grotesk text-[16px] leading-relaxed text-hg-cream/70">
                Ob Verkauf, Kauf oder eine ehrliche Einschätzung — kommen Sie auf
                einen Kaffee in unser Büro in der Potsdamer Innenstadt.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <Magnetic strength={0.2}>
                <a
                  href="#hg-top"
                  className="mt-10 block w-fit bg-hg-clay px-8 py-4 font-grotesk text-[14px] font-medium text-hg-cream transition-colors duration-300 hover:bg-hg-clay-soft hover:text-hg-navy"
                >
                  Termin vereinbaren
                </a>
              </Magnetic>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center">
            {[
              ['Büro', 'Brandenburger Straße 22, 14467 Potsdam'],
              ['Telefon', '0331 · 24 00 18'],
              ['E-Mail', 'kontakt@havel-grau.example'],
              ['Sprechzeiten', 'Mo–Fr 9–18 Uhr · Sa nach Vereinbarung'],
            ].map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.08}>
                <div className="flex flex-col gap-1 border-b border-hg-cream/15 py-5">
                  <span className="font-grotesk text-[11px] uppercase tracking-[0.22em] text-hg-cream/50">
                    {k}
                  </span>
                  <span className="font-display text-[19px]">{v}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-hg-navy-deep py-14 text-hg-cream/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3 text-hg-cream">
            <MonogramHG className="h-7 w-7 text-hg-clay-soft" />
            <span className="font-display text-[17px] font-medium">Havel&nbsp;&amp;&nbsp;Grau</span>
          </div>
          <p className="max-w-xs font-grotesk text-[13px] leading-relaxed">
            Immobilienvermittlung in Potsdam und Umgebung. Persönlich seit 1998.
          </p>
          <div className="font-grotesk text-[12px]">© {new Date().getFullYear()} Havel &amp; Grau</div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl px-6 lg:px-8">
          <p className="border-t border-hg-cream/10 pt-6 font-sans text-[11px] leading-relaxed text-hg-cream/40">
            Fiktives Beispielprojekt zu Demonstrationszwecken — gestaltet und
            entwickelt von Plan B Studios. Diese Website ist nicht öffentlich
            erreichbar; „Havel &amp; Grau" ist ein erfundenes Unternehmen.
          </p>
        </div>
      </footer>
    </div>
  )
}
