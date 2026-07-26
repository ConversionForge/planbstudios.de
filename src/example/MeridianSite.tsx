import { useEffect, useRef, useState, type ReactNode } from 'react'
import { BackToStudio } from './BackToStudio'
import { LegalLinks } from '../components/LegalLinks'
import { useInPageAnchors } from './useInPageAnchors'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { MeridianMark, ElevationDrawing, FloorPlan, WaveLines } from './meridianBlueprint'
import { Magnetic } from '../components/Magnetic'

const EASE = [0.22, 1, 0.36, 1] as const

const GRID_BG = {
  backgroundImage:
    'linear-gradient(to right, rgba(20,23,28,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,23,28,0.05) 1px, transparent 1px)',
  backgroundSize: '72px 72px',
}

/* Zeile für Zeile aus einer Maske aufsteigende Headline. */
function MaskLines({ lines, className }: { lines: ReactNode[]; className?: string }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: '112%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: EASE, delay: i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const dur = 1300
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return <span ref={ref}>{n}</span>
}

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionHead({ no, title, dark = false }: { no: string; title: string; dark?: boolean }) {
  return (
    <Reveal
      className={`flex items-baseline justify-between border-t pt-5 ${
        dark ? 'border-mer-paper/25' : 'border-mer-ink/20'
      }`}
    >
      <span className={`font-data text-[12px] tracking-[0.25em] ${dark ? 'text-[#3fa8b0]' : 'text-mer-tide'}`}>
        {no}
      </span>
      <span className={`font-data text-[12px] uppercase tracking-[0.25em] ${dark ? 'text-mer-paper/60' : 'text-mer-muted'}`}>
        {title}
      </span>
    </Reveal>
  )
}

const MARQUEE = ['42 Wohnungen', 'Bezug 2026', 'Lübeck · An der Trave', '38–142 m²', 'Provisionsfrei', 'KfW 40']

const UNITS = [
  { i: '01', typ: 'Atelier', rooms: '1–2 Zimmer', area: '38–54 m²', price: 'ab 329.000 €', status: 'Verfügbar', free: true },
  { i: '02', typ: 'Kai-Wohnung', rooms: '2–3 Zimmer', area: '62–89 m²', price: 'ab 489.000 €', status: 'Verfügbar', free: true },
  { i: '03', typ: 'Familienflügel', rooms: '3–4 Zimmer', area: '96–118 m²', price: 'ab 620.000 €', status: 'Wenige frei', free: true },
  { i: '04', typ: 'Penthouse', rooms: '4 Zimmer · Dachterrasse', area: '142 m²', price: 'auf Anfrage', status: 'Reserviert', free: false },
]

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const drawingY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} id="top" className="relative overflow-hidden bg-mer-paper">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={GRID_BG} />

      <div className="relative mx-auto max-w-6xl px-6 pt-12 md:pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-baseline justify-between border-b border-mer-ink/20 pb-4 font-data text-[11px] tracking-[0.22em] text-mer-muted"
        >
          <span>N° 01 — NEUBAUPROJEKT</span>
          <span className="hidden sm:block">53°52′N · 10°41′E</span>
        </motion.div>

        <motion.div style={{ y: textY, opacity: textOpacity }} className="will-change-transform">
          <h1 className="mt-10 font-tech text-[clamp(3.2rem,10.5vw,8.6rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-mer-ink">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: '112%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
              >
                Wohnen
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="mer-outline block"
                initial={{ y: '112%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.38 }}
              >
                am Wasser
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-end justify-between gap-6"
          >
            <p className="max-w-sm text-[15px] leading-relaxed text-mer-muted">
              42 Wohnungen in vier Baukörpern, direkt am Kai der Trave. Entworfen
              wie ein Bauwerk, nicht wie ein Produkt — MERIDIAN ist Architektur
              zum Einziehen.
            </p>
            <div className="flex flex-col gap-1.5 font-data text-[12px] tracking-[0.16em] text-mer-ink">
              <a href="#wohnungen" className="text-mer-tide underline-offset-4 hover:underline">WOHNUNGEN ANSEHEN ↓</a>
              <a href="#architektur" className="underline-offset-4 hover:underline">ZUM GRUNDRISS ↓</a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: drawingY }} className="relative mt-6 will-change-transform">
          <ElevationDrawing className="mx-auto h-auto w-full max-w-4xl" />
        </motion.div>
      </div>

      {/* Laufband */}
      <div className="relative overflow-hidden border-y border-mer-ink/20 bg-mer-paper py-3.5">
        <div className="mer-marquee-track">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
              {MARQUEE.map((m) => (
                <span key={m} className="flex items-center font-data text-[12px] uppercase tracking-[0.24em] text-mer-ink">
                  <span className="mx-7 inline-block h-1.5 w-1.5 bg-mer-tide" />
                  {m}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Architektur() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const o0 = useTransform(scrollYProgress, [0.04, 0.12, 0.3, 0.38], [0, 1, 1, 0])
  const o1 = useTransform(scrollYProgress, [0.38, 0.46, 0.62, 0.7], [0, 1, 1, 0])
  const o2 = useTransform(scrollYProgress, [0.7, 0.78, 1, 1], [0, 1, 1, 0])
  const captions = [
    { o: o0, t: 'Tragwerk aus Recycling-Beton, Fassade in hellem Klinker.' },
    { o: o1, t: 'Jede Wohnung nach Süden orientiert — zur Wasserseite.' },
    { o: o2, t: 'Loggien statt Balkone: windgeschützt, ganzjährig nutzbar.' },
  ]

  return (
    <section id="architektur" className="relative bg-mer-paper">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead no="02" title="Architektur" />
      </div>
      <div ref={ref} className="relative h-[320vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 className="font-tech text-[clamp(2rem,4.5vw,3.6rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em] text-mer-ink">
                <MaskLines lines={['Der Grundriss', 'ist das Versprechen.']} />
              </h2>
              <div className="relative mt-8 h-24">
                {captions.map((c) => (
                  <motion.p
                    key={c.t}
                    style={{ opacity: c.o }}
                    className="absolute inset-x-0 max-w-md text-[16px] leading-relaxed text-mer-muted"
                  >
                    {c.t}
                  </motion.p>
                ))}
              </div>
              <p className="mt-4 font-data text-[11px] tracking-[0.22em] text-mer-tide">
                TYP 02 — KAI-WOHNUNG · M 1:100
              </p>
            </div>
            <FloorPlan progress={scrollYProgress} className="mx-auto h-auto w-full max-w-[560px] max-lg:max-h-[42vh]" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function MeridianSite() {
  // Interne #-Anker abfangen (kein Hash/History-Eintrag → Zurück-Restore auf der
  // Startseite bleibt heil). Versatz für sticky Band (41px) + Kopfzeile.
  useInPageAnchors(100)

  useEffect(() => {
    document.title = 'MERIDIAN — Wohnquartier an der Trave (Beispielprojekt)'
    return () => {
      document.title = 'Plan B Studios — Webdesign & 3D-Rundgänge'
    }
  }, [])

  return (
    <div className="min-h-screen bg-mer-paper font-tech text-mer-ink antialiased">
      {/* Beispielprojekt-Leiste */}
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-night px-4 py-2.5 text-center font-sans text-[12px] text-cream-soft">
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 bg-gold" />
          Beispielprojekt — erstellt von Plan B Studios
        </span>
        <BackToStudio className="font-medium text-gold underline-offset-4 transition-colors hover:text-gold-bright hover:underline" />
      </div>

      {/* Navigation */}
      <header className="sticky top-[41px] z-40 border-b border-mer-ink/15 bg-mer-paper/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <MeridianMark className="h-5 w-5 text-mer-ink" />
            <span className="font-tech text-[15px] font-bold tracking-[0.18em]">MERIDIAN</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {['Quartier', 'Architektur', 'Wohnungen', 'Lage'].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="font-data text-[11px] uppercase tracking-[0.18em] text-mer-muted transition-colors hover:text-mer-ink"
              >
                {l}
              </a>
            ))}
          </nav>
          <a
            href="#kontakt"
            className="bg-mer-ink px-5 py-2 font-data text-[11px] uppercase tracking-[0.18em] text-mer-paper transition-colors duration-300 hover:bg-mer-tide"
          >
            Anfragen
          </a>
        </div>
      </header>

      <Hero />

      {/* 01 — Quartier */}
      <section id="quartier" className="bg-mer-paper py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead no="01" title="Das Quartier" />
          <h2 className="mt-12 max-w-3xl font-tech text-[clamp(2.2rem,5.5vw,4.4rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em]">
            <MaskLines lines={['Ein Quartier.', <span className="text-mer-tide">Kein Kompromiss.</span>]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-mer-muted md:text-[17px]">
              Zwischen Altstadt und Hafenbecken entsteht ein Ort, der beides kann:
              Ruhe am Wasser und fünf Minuten ins Leben. Vier Baukörper, ein
              gemeinsamer Hof, eine Uferpromenade — geplant von Menschen, die hier
              selbst wohnen würden.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 gap-px border border-mer-ink/15 bg-mer-ink/15 md:grid-cols-4">
            {[
              { n: <CountUp to={42} />, l: 'Wohnungen' },
              { n: <CountUp to={4} />, l: 'Baukörper' },
              { n: '38–142', l: 'm² Wohnfläche' },
              { n: <CountUp to={2026} />, l: 'Bezugsfertig' },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 0.08} className="bg-mer-paper p-6 md:p-8">
                <p className="font-tech text-[clamp(2rem,4.5vw,3.2rem)] font-bold tracking-[-0.02em] text-mer-ink">
                  {s.n}
                </p>
                <p className="mt-1 font-data text-[11px] uppercase tracking-[0.2em] text-mer-muted">{s.l}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Architektur (gepinnter Grundriss) */}
      <Architektur />

      {/* 03 — Wohnungen */}
      <section id="wohnungen" className="bg-mer-paper py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead no="03" title="Wohnungen" />
          <h2 className="mt-12 font-tech text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em]">
            <MaskLines lines={['Vier Typen.', 'Ein Anspruch.']} />
          </h2>

          <div className="mt-14">
            <div className="hidden grid-cols-[3rem_1.4fr_1fr_1fr_1fr_8rem] gap-4 border-b border-mer-ink/20 pb-3 font-data text-[10px] uppercase tracking-[0.2em] text-mer-muted md:grid">
              <span>N°</span>
              <span>Typ</span>
              <span>Zimmer</span>
              <span>Fläche</span>
              <span>Preis</span>
              <span className="text-right">Status</span>
            </div>
            {UNITS.map((u, idx) => (
              <Reveal key={u.i} delay={idx * 0.08}>
                <a
                  href="#kontakt"
                  className="group relative block overflow-hidden border-b border-mer-ink/15"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 bg-mer-ink transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />
                  <span className="relative grid grid-cols-2 items-center gap-x-4 gap-y-1 py-5 transition-colors duration-300 group-hover:text-mer-paper md:grid-cols-[3rem_1.4fr_1fr_1fr_1fr_8rem] md:py-6">
                    <span className="font-data text-[12px] tracking-[0.2em] text-mer-tide transition-colors duration-300 group-hover:text-[#3fa8b0]">
                      {u.i}
                    </span>
                    <span className="font-tech text-[clamp(1.3rem,2.6vw,1.9rem)] font-bold uppercase tracking-[-0.01em]">
                      {u.typ}
                    </span>
                    <span className="text-[14px] text-mer-muted transition-colors duration-300 group-hover:text-mer-paper/70">{u.rooms}</span>
                    <span className="text-[14px] text-mer-muted transition-colors duration-300 group-hover:text-mer-paper/70">{u.area}</span>
                    <span className="text-[15px] font-medium">{u.price}</span>
                    <span className="flex items-center gap-2 font-data text-[10px] uppercase tracking-[0.16em] md:justify-end">
                      <span className={`inline-block h-1.5 w-1.5 rounded-full ${u.free ? 'bg-mer-tide group-hover:bg-[#3fa8b0]' : 'bg-mer-muted'}`} />
                      {u.status}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Lage */}
      <section id="lage" className="bg-mer-deep py-24 text-mer-paper md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead no="04" title="Lage" dark />
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-tech text-[clamp(2.2rem,5.5vw,4.4rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em]">
                <MaskLines lines={['Am Kai.', <span className="mer-outline-paper">Nicht irgendwo.</span>]} />
              </h2>
              <Reveal delay={0.15}>
                <p className="mt-8 max-w-md text-[16px] leading-relaxed text-mer-paper/70">
                  Direkt an der Trave, fußläufig zur Altstadtinsel, mit dem Rad an
                  die Ostsee. MERIDIAN liegt dort, wo Lübeck am schönsten ist — und
                  bleibt trotzdem mitten im Leben.
                </p>
              </Reveal>
              <div className="mt-10 flex flex-col">
                {[
                  ['Altstadtinsel', '5 Min zu Fuß'],
                  ['Hauptbahnhof', '12 Min mit dem Rad'],
                  ['Ostseestrand', '20 Min mit dem Auto'],
                ].map(([place, time], i) => (
                  <Reveal key={place} delay={0.1 + i * 0.08}>
                    <div className="flex items-baseline justify-between border-t border-mer-paper/20 py-4 font-data text-[12px] uppercase tracking-[0.18em]">
                      <span className="text-mer-paper/60">{place}</span>
                      <span className="text-mer-paper">{time}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <div>
              <WaveLines className="h-auto w-full" />
              <p className="mt-4 text-right font-data text-[11px] tracking-[0.22em] text-mer-paper/50">
                DIE TRAVE — 40 M VOR DER HAUSTÜR
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="relative overflow-hidden bg-mer-paper py-28 md:py-36">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={GRID_BG} />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-tech text-[clamp(2.4rem,6.5vw,5rem)] font-bold uppercase leading-[0.92] tracking-[-0.015em]">
            <MaskLines lines={['Ziehen Sie ein,', <span className="mer-outline">bevor es alle tun.</span>]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-7 max-w-xl text-[16px] leading-relaxed text-mer-muted">
              Vereinbaren Sie ein Beratungsgespräch und sichern Sie sich Ihren
              Grundriss — unverbindlich und provisionsfrei.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 flex justify-center">
            <Magnetic strength={0.25}>
              <a
                href="#top"
                className="block bg-mer-ink px-9 py-4 font-data text-[12px] uppercase tracking-[0.2em] text-mer-paper transition-colors duration-300 hover:bg-mer-tide"
              >
                Beratung anfragen
              </a>
            </Magnetic>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="mt-6 font-data text-[10px] uppercase tracking-[0.24em] text-mer-muted">
              Verkaufsstart Q3 2026 — Antwort in der Regel innerhalb von 24 h
            </p>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-mer-ink/15 bg-mer-panel py-12 text-[12px] text-mer-muted">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-6 border-b border-mer-ink/10 pb-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2.5 text-mer-ink">
              <MeridianMark className="h-5 w-5" />
              <span className="font-tech text-[14px] font-bold tracking-[0.18em]">MERIDIAN</span>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 font-data text-[10px] uppercase tracking-[0.18em]">
              {['Quartier', 'Architektur', 'Wohnungen', 'Lage'].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="transition-colors hover:text-mer-ink">{l}</a>
              ))}
            </div>
          </div>
          <p className="mt-6 font-sans leading-relaxed">
            Fiktives Beispielprojekt zu Demonstrationszwecken — gestaltet und
            entwickelt von Plan B Studios. „MERIDIAN" ist ein erfundenes
            Bauvorhaben. Preise und Angaben sind Platzhalter.
          </p>
          <LegalLinks className="mt-3 block font-sans text-[11px]" />
        </div>
      </footer>
    </div>
  )
}
