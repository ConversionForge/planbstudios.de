import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Aufruf,
  Block,
  Karte,
  Marke,
  Rueckweg,
  SeitenLayout,
  TextVerweis,
  einblenden,
} from '../components/SeitenLayout'
import { TERMIN_URL } from '../lib/kontakt'
import { startVariante } from '../lib/ssr'

// Laufende Betreuung einer Website.
//
// Bis November 2026 stand hier auch die Automatisierung ("Betreuung &
// Automatisierung"). Seit die Automatisierung die wichtigste Leistung ist, hat
// sie eine eigene Seite (/automatisierung/). Hier bleibt nur, was nach dem
// Livegang einer Website passiert; fuer Ablaeufe gibt es einen Verweis.
//
// REGEL FUER DEN TEXT: Keine Zahlen, keine Reaktionszeiten, keine Preise, die
// nicht abgesprochen sind.

const BETREUUNG = [
  {
    n: '01',
    titel: 'Technische Pflege',
    text: 'Updates, Sicherheit, Sicherungen. Ich behalte im Blick, dass die Seite erreichbar bleibt und nichts stillschweigend kaputtgeht. Das merkt man sonst erst, wenn jemand anruft und sagt, das Formular gehe nicht.',
  },
  {
    n: '02',
    titel: 'Inhalte einpflegen',
    text: 'Neue Angebote, Texte, Bilder, Referenzen. Sie schicken mir, was dazukommt, ich setze es ein. Kein Einarbeiten in ein Redaktionssystem, keine Angst, beim Ändern etwas zu zerschießen.',
  },
  {
    n: '03',
    titel: 'Änderungen und Ausbau',
    text: 'Kleinere Umbauten, ein neuer Abschnitt, eine zusätzliche Seite. Eine Website ist nach dem Livegang nicht fertig, sie ändert sich mit dem, was Sie anbieten.',
  },
  {
    n: '04',
    titel: 'Messung und Nachsteuern',
    text: 'An welcher Stelle Besucher aussteigen, bevor sie anfragen. Daraufhin wird geändert, an genau dieser Stelle statt überall gleichzeitig. Cookiefrei aufgesetzt, damit auch Abbrüche sichtbar bleiben.',
  },
]

export function WebsiteBetreuung() {
  return (
    <SeitenLayout titel="Website-Betreuung in Lübeck — Plan B Studios">
      {/* Einstieg */}
      <section className="pb-20 pt-16 md:pb-28 md:pt-24">
        <motion.div variants={einblenden} initial={startVariante} animate="show">
          <Marke>WEBSITE-BETREUUNG</Marke>
          <h1 className="font-serif text-[clamp(2.4rem,6.5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream">
            Eine Website ist nicht fertig,
            <br />
            wenn sie <em className="italic text-gold-bright">online</em> geht.
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-cream-soft md:text-xl">
            Laufende Betreuung für Websites von Betrieben in Lübeck und
            Schleswig-Holstein.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
            Der häufigste Grund, warum eine gute Seite nach zwei Jahren schlecht
            aussieht, ist nicht das Design. Es ist, dass niemand zuständig war.
            Angebote stehen noch drin, die es längst nicht mehr gibt, das Formular
            schickt ins Leere, und niemand hat gemerkt, dass es seit Monaten so
            ist.
          </p>
          <div className="mt-10">
            <Aufruf to={TERMIN_URL} neuesFenster>
              Erstgespräch buchen
            </Aufruf>
          </div>
        </motion.div>
      </section>

      {/* Betreuung */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block>
          <Marke>WAS LAUFEND PASSIERT</Marke>
          <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
            Vier Dinge, um die
            <br />
            Sie sich <em className="italic text-gold-bright">nicht</em> kümmern.
          </h2>
        </Block>

        <Block gestaffelteKinder className="mt-14 grid gap-6 md:grid-cols-2">
          {BETREUUNG.map((b) => (
            <motion.div key={b.n} variants={einblenden}>
              <Karte className="h-full">
                <span className="font-mono text-[12px] tracking-[0.2em] text-gold">{b.n}</span>
                <h3 className="mb-4 mt-4 font-serif text-2xl font-light text-cream">
                  {b.titel}
                </h3>
                <p className="text-[15px] leading-relaxed text-stone md:text-base">{b.text}</p>
              </Karte>
            </motion.div>
          ))}
        </Block>
      </section>

      {/* Verweis auf die Automatisierung */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block>
          <Karte>
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <Marke>MEHR ALS PFLEGE</Marke>
                <h2 className="max-w-xl font-serif text-[clamp(1.6rem,3.4vw,2.4rem)] font-light leading-tight text-cream">
                  Abläufe, die ohne Sie weiterlaufen.
                </h2>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-stone">
                  Anfragen, die automatisch beantwortet und einsortiert werden,
                  Termine, die sich Interessenten selbst buchen: Das ist keine
                  Pflege mehr, sondern Automatisierung. Dafür gibt es eine eigene
                  Seite.
                </p>
              </div>
              <TextVerweis to="/automatisierung/">Zur Automatisierung</TextVerweis>
            </div>
          </Karte>
        </Block>
      </section>

      {/* Handlungsaufruf */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block className="flex flex-col items-start">
          <Marke>ANFRAGEN</Marke>
          <h2 className="max-w-2xl font-serif text-[clamp(2rem,5vw,3.4rem)] font-light leading-tight text-cream">
            Wer kümmert sich gerade
            <br />
            um Ihre <em className="italic text-gold-bright">Website</em>?
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-stone md:text-lg">
            Schreiben Sie mir, um welche Seite es geht und was zuletzt liegen
            geblieben ist. Ich sage Ihnen, was laufende Betreuung bei Ihnen
            umfassen würde.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Aufruf to={TERMIN_URL} neuesFenster>
              Erstgespräch buchen
            </Aufruf>
            <a
              href="mailto:info@planbstudios.de"
              className="text-[15px] font-medium text-cream-soft underline-offset-4 transition-colors hover:text-gold-bright hover:underline"
            >
              info@planbstudios.de
            </a>
          </div>
        </Block>
      </section>

      <Rueckweg
        text={
          <>
            Außerdem:{' '}
            <Link to="/automatisierung/" className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold">
              Automatisierung
            </Link>{' '}
            ·{' '}
            <Link to="/akquise-strecken/" className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold">
              Akquise-Strecken
            </Link>{' '}
            ·{' '}
            <Link to="/webdesign-luebeck/" className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold">
              Websites
            </Link>{' '}
            ·{' '}
            <Link to="/" className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold">
              Alle Leistungen
            </Link>
          </>
        }
      />
    </SeitenLayout>
  )
}
