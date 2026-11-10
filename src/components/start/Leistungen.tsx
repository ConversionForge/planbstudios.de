import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Block, Marke, einblenden, gestaffelt } from '../SeitenLayout'
import { startVariante } from '../../lib/ssr'

// Leistungen in der Reihenfolge ihres Gewichts.
//
// 1 und 2 sind das, wofuer Plan B Studios bekannt werden will:
// Automatisierung und Akquise-Strecken. Websites folgen als dritte, ruhigere
// Zeile. Die 3D-Rundgaenge stehen nur noch als eine Zeile darunter, als
// Ergaenzung fuer Makler. Die Gewichtung soll man sehen, nicht nur lesen:
// Zwei grosse Flaechen, eine schmale, eine Textzeile.

interface Leistung {
  nummer: string
  titel: string
  text: string
  beispiele: string[]
  verweise: { text: string; zu: string }[]
  bild: 'ablauf' | 'strecke'
}

const OBEN: Leistung[] = [
  {
    nummer: '01',
    titel: 'Automatisierung',
    text: 'Was in Ihrem Betrieb jede Woche gleich abläuft, muss nicht jede Woche jemand von Hand machen. Daten von einem Programm ins nächste tragen, Dokumente erstellen, an Termine erinnern, Anfragen sortieren: Ich sehe mir an, wie es bei Ihnen läuft, und automatisiere das, wo es sich lohnt.',
    beispiele: ['Büro und Verwaltung', 'Gastronomie', 'Anfragen und Termine'],
    verweise: [
      { text: 'Mehr zur Automatisierung', zu: '/automatisierung/' },
      { text: 'Beispiel für Restaurants', zu: '/automatisierung/#gastronomie' },
    ],
    bild: 'ablauf',
  },
  {
    nummer: '02',
    titel: 'Akquise-Strecken',
    text: 'Eine Akquise-Strecke führt Interessenten vom ersten Klick bis zum Termin: eine Seite zu ihrer konkreten Frage, ein kurzes Formular, eine sofortige Antwort und ein Nachfassen, wenn sich niemand meldet. Am weitesten ausgearbeitet ist das für Immobilienmakler, die Eigentümer gewinnen wollen.',
    beispiele: ['Eigentümer-Akquise für Makler', 'Anfrageformulare', 'Nachfassen per Mail'],
    verweise: [
      { text: 'Mehr zu Akquise-Strecken', zu: '/akquise-strecken/' },
      { text: 'Akquise-Check für Makler', zu: '/akquise-check/' },
    ],
    bild: 'strecke',
  },
]

/** Kleines Schaubild: drei Programme, die ein Ablauf verbindet. */
function BildAblauf() {
  const knoten = ['E-Mail', 'Tabelle', 'Kalender']
  return (
    <div aria-hidden className="flex items-center gap-2">
      {knoten.map((k, i) => (
        <div key={k} className="flex items-center gap-2">
          <span className="rounded-lg border border-night-line bg-night px-3 py-1.5 font-mono text-[11px] tracking-[0.08em] text-cream-soft">
            {k}
          </span>
          {i < knoten.length - 1 && (
            <span className="relative block h-px w-6 overflow-hidden bg-night-line sm:w-10">
              <span className="absolute inset-y-0 left-0 w-1/2 animate-[fluss_2.4s_ease-in-out_infinite] bg-gold-bright motion-reduce:animate-none" />
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

/** Kleines Schaubild: die Stufen einer Strecke, eine nach der anderen. */
function BildStrecke() {
  const stufen = ['Seite', 'Formular', 'Antwort', 'Termin']
  return (
    <div aria-hidden className="grid w-72 grid-cols-4 gap-3">
      {stufen.map((s, i) => (
        <div key={s}>
          <span
            className="block h-1 rounded-full bg-gold-bright"
            style={{ opacity: 0.35 + i * 0.2 }}
          />
          <span className="mt-2 block font-mono text-[11px] tracking-[0.08em] text-cream-soft">{s}</span>
        </div>
      ))}
    </div>
  )
}

function Pfeil() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1">
      <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GrosseKarte({ l }: { l: Leistung }) {
  return (
    <motion.article variants={einblenden} className="h-full">
      <div className="h-full rounded-[1.8rem] bg-cream/[0.03] p-1.5 ring-1 ring-cream/[0.06]">
        <div className="flex h-full flex-col rounded-[calc(1.8rem-0.375rem)] bg-night-raised p-8 shadow-[inset_0_1px_0_rgba(243,238,229,0.06)] md:p-10">
          <div className="flex items-start justify-between gap-6">
            <span className="font-mono text-[12px] tracking-[0.2em] text-gold">{l.nummer}</span>
            <div className="hidden sm:block">{l.bild === 'ablauf' ? <BildAblauf /> : <BildStrecke />}</div>
          </div>

          <h3 className="mt-10 font-serif text-[clamp(2rem,3.4vw,2.75rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream">
            {l.titel}
          </h3>
          <p className="mt-5 max-w-[34rem] text-[16px] leading-relaxed text-stone [text-wrap:pretty]">
            {l.text}
          </p>

          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-cream-soft">
            {l.beispiele.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <span aria-hidden className="h-1 w-1 rounded-full bg-gold" />
                {b}
              </li>
            ))}
          </ul>

          {/* Verweise am Fuss der Karte festhalten, damit sie in beiden Karten
              auf derselben Hoehe stehen, egal wie lang der Text ist. Der
              Abstandhalter waechst mit, haelt aber mindestens 2,5 rem. */}
          <div aria-hidden className="min-h-10 flex-1" />
          <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-night-line pt-6">
            {l.verweise.map((v) => (
              <Link
                key={v.zu}
                to={v.zu}
                className="group inline-flex items-center gap-2 text-[15px] font-medium text-cream transition-colors hover:text-gold-bright"
              >
                {v.text}
                <Pfeil />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function Leistungen() {
  return (
    <section id="leistungen" className="relative border-t border-night-line/60 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Block className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Marke>LEISTUNGEN</Marke>
            <h2 className="font-serif text-[clamp(2.2rem,4.8vw,4rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream [text-wrap:balance]">
              Was ich für Betriebe baue
            </h2>
          </div>
          <p className="max-w-md text-[16px] leading-relaxed text-stone lg:justify-self-end">
            Alles, was ich baue, soll Ihnen entweder Arbeit abnehmen oder Kunden
            bringen. Oft beides.
          </p>
        </Block>

        <motion.div
          variants={gestaffelt}
          initial={startVariante}
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 grid gap-6 lg:grid-cols-2"
        >
          {OBEN.map((l) => (
            <GrosseKarte key={l.nummer} l={l} />
          ))}
        </motion.div>

        {/* Websites: dritte Leistung, deshalb eine ruhigere, schmale Zeile. */}
        <Block className="mt-6">
          <Link
            to="/webdesign-luebeck/"
            className="group grid gap-5 rounded-[1.8rem] border border-night-line px-8 py-8 transition-colors duration-300 hover:border-gold/40 md:grid-cols-[3rem_minmax(0,1fr)_auto] md:items-center md:gap-8 md:px-10"
          >
            <span className="font-mono text-[12px] tracking-[0.2em] text-gold">03</span>
            <span>
              <span className="block font-serif text-[1.75rem] font-light leading-tight text-cream">
                Websites
              </span>
              <span className="mt-2 block max-w-2xl text-[15px] leading-relaxed text-stone">
                Ohne Baukasten gebaut, schnell geladen, am Handy so gut wie am
                Rechner. Oft der erste Schritt, denn Akquise-Strecken und
                Automatisierungen setzen auf einer Website auf.
              </span>
            </span>
            <span className="inline-flex items-center gap-2 text-[15px] font-medium text-cream transition-colors group-hover:text-gold-bright">
              Mehr zu Websites
              <Pfeil />
            </span>
          </Link>
        </Block>

        {/* 3D-Rundgaenge: bewusst nur eine Zeile. */}
        <Block className="mt-8 px-1">
          <p className="text-[15px] leading-relaxed text-stone">
            Für Immobilienmakler zusätzlich:{' '}
            <Link
              to="/3d-rundgaenge/"
              className="text-cream-soft underline decoration-night-line underline-offset-4 transition-colors hover:text-gold-bright hover:decoration-gold"
            >
              Objektfilme und 3D-Rundgänge
            </Link>{' '}
            aus vorhandenen Fotos.
          </p>
        </Block>
      </div>
    </section>
  )
}
