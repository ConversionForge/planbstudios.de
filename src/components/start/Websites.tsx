import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Block, Marke, TextVerweis, einblenden, gestaffelt } from '../SeitenLayout'
import { BrowserRahmen, HavelGrauMini, MeridianPreview } from '../../example/Vorschauen'
import { startVariante } from '../../lib/ssr'

// Websites: die dritte Leistung, gezeigt an zwei Beispielprojekten.
//
// MERIDIAN ("Wohnen am Wasser") lag vorher in einer 320 vh langen,
// festgehefteten Szene und ging dort unter. Jetzt ist es die groesste Flaeche
// des Abschnitts, mit sichtbarem Knopf, und beim Zeigen scrollt die Vorschau
// von selbst ein Stueck weiter.
//
// Beide Marken sind erfunden. Das steht im Text, weil eine erfundene Marke,
// die wie eine Kundenreferenz aussieht, eine irrefuehrende Werbeaussage waere.

/**
 * Rendert eine Vorschau in ihrer Entwurfsbreite und skaliert sie auf die
 * verfuegbare Breite. Ohne das wuerden die Schriftgroessen der Vorschau, die
 * fuer etwa 1000 Pixel gesetzt sind, in einer schmaleren Spalte umbrechen.
 */
function Skaliert({ breite, children }: { breite: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [faktor, setFaktor] = useState(0.7)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setFaktor(e.contentRect.width / breite))
    ro.observe(el)
    return () => ro.disconnect()
  }, [breite])

  // overflow-hidden: Die innere Ebene ist absichtlich 1000 Pixel breit und wird
  // nur optisch verkleinert. Ohne Abschneiden zaehlt ihre volle Breite beim
  // Layout mit, und auf dem Handy wurde die ganze Seite 1026 Pixel breit
  // (gemessen bei 390 Pixel Bildschirmbreite).
  return (
    <div ref={ref} className="w-full overflow-hidden">
      <div style={{ width: breite, transform: `scale(${faktor})`, transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  )
}

function Ansehen({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-night/85 px-5 py-2.5 text-[14px] font-medium text-cream ring-1 ring-cream/15 backdrop-blur transition-colors group-hover:bg-gold group-hover:text-night">
      {text}
      <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform group-hover:translate-x-0.5">
        <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export function Websites() {
  return (
    <section id="websites" className="relative border-t border-night-line/60 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Block className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Marke>WEBSITES</Marke>
            <h2 className="font-serif text-[clamp(2.2rem,4.8vw,4rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream [text-wrap:balance]">
              So sieht eine Website von mir aus
            </h2>
          </div>
          <p className="max-w-md text-[16px] leading-relaxed text-stone lg:justify-self-end">
            Zwei Beispielprojekte, vollständig gebaut und zum Durchklicken. Beide
            Marken sind erfunden, es sind keine Kundenaufträge.
          </p>
        </Block>

        <motion.div
          variants={gestaffelt}
          initial={startVariante}
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-8"
        >
          {/* MERIDIAN: die grosse Flaeche */}
          <motion.div variants={einblenden}>
            <Link to="/meridian/" className="group block" data-cursor="Ansehen">
              <BrowserRahmen adresse="meridian.example">
                <div className="relative aspect-[16/11] overflow-hidden bg-mer-paper lg:aspect-auto lg:h-[34rem]">
                  <div className="transition-transform duration-[2600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[22%] motion-reduce:transition-none">
                    <Skaliert breite={1000}>
                      <MeridianPreview />
                    </Skaliert>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-mer-paper to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <Ansehen text="Website ansehen" />
                  </div>
                </div>
              </BrowserRahmen>
              <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-serif text-[1.9rem] font-light text-cream">MERIDIAN</h3>
                <span className="text-[13px] text-stone">Neubauquartier · Beispielprojekt</span>
              </div>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-stone">
                Ein Wohnquartier an der Trave. Grundrisse, die sich beim Scrollen
                zeichnen, Wohnungstypen als Tabelle, Lage mit Entfernungen.
              </p>
            </Link>
          </motion.div>

          {/* Havel & Grau: die zweite, kleinere Flaeche */}
          <motion.div variants={einblenden}>
            <Link to="/beispiel/" className="group block" data-cursor="Ansehen">
              <BrowserRahmen adresse="havel-grau.example">
                <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto lg:h-[34rem]">
                  <HavelGrauMini />
                  <div className="absolute bottom-5 left-5">
                    <Ansehen text="Website ansehen" />
                  </div>
                </div>
              </BrowserRahmen>
              <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-serif text-[1.9rem] font-light text-cream">Havel &amp; Grau</h3>
                <span className="text-[13px] text-stone">Maklerbüro · Beispielprojekt</span>
              </div>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-stone">
                Ein Maklerbüro in Potsdam. Ruhige Schrift, Objekte im Mittelpunkt,
                kurzer Weg zur Anfrage.
              </p>
            </Link>
          </motion.div>
        </motion.div>

        <Block className="mt-14">
          <TextVerweis to="/webdesign-luebeck/">Wie ich Websites baue und was dazugehört</TextVerweis>
        </Block>
      </div>
    </section>
  )
}
