import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { CubeMark } from '../components/Logo'
import { Magnetic } from '../components/Magnetic'
import { GrainOverlay } from '../components/GrainOverlay'
import { Footer } from '../components/Footer'

// Situationsseite für die eigene Akquise. Bewusst nur auf Deutsch: Die
// Zielgruppe sind Makler in Schleswig-Holstein. Bewusst nicht in der
// Hauptnavigation: Die Seite wird gezielt verlinkt und über die Suche
// gefunden, die Startseite bleibt davon unberührt.

// Beim Vorrendern in Node gibt es kein window. Dann direkt den sichtbaren
// Zustand rendern, sonst steht der gesamte Text mit opacity:0 im statischen
// HTML und ist ohne JavaScript unsichtbar.
const SSR = typeof window === 'undefined'
const initialState = SSR ? 'show' : 'hidden'

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const BAUSTEINE = [
  {
    n: '01',
    title: 'Situationsseiten',
    text: 'Je eine Seite für eine konkrete Lage, in der ein Eigentümer steckt, statt einer Seite über Ihr Leistungsangebot. Wer nach dem Wert eines geerbten Hauses sucht, landet auf einer Seite zu genau dieser Lage und nicht auf Ihrer Startseite.',
  },
  {
    n: '02',
    title: 'Bewertungsstrecke',
    text: 'Der Weg von der Frage nach dem Wert bis zum Gespräch. Mehrstufig aufgebaut, eine Frage pro Ansicht, mit Fortschrittsanzeige. Der Einstieg bleibt niedrig, die Angaben werden trotzdem vollständig.',
  },
  {
    n: '03',
    title: 'Follow-up',
    text: 'Was passiert, wenn jemand die Strecke abschließt, aber keinen Termin bucht. Eine kurze Folge von Nachrichten mit Inhalten statt Werbung, mit doppelter Bestätigung beim Eintragen und einem Abmeldelink in jeder Mail.',
  },
  {
    n: '04',
    title: 'Messung',
    text: 'An welcher Stelle Menschen aussteigen. Cookiefrei aufgesetzt, damit auch Abbrüche sichtbar bleiben und nicht nur diejenigen gezählt werden, die vorher zugestimmt haben.',
  },
]

const ABLAUF = [
  {
    n: 'I',
    title: 'Analyse',
    text: 'Bestandsaufnahme dessen, was bereits da ist. Was findet ein Eigentümer, wenn er sucht. Wie viele Klicks liegen zwischen Einstieg und Anfrage. Was passiert nach dem Absenden eines Formulars.',
  },
  {
    n: 'II',
    title: 'Aufbau',
    text: 'Die Strecke wird gebaut und angeschlossen: Seite, Formular, Bestätigungsmail, Terminbuchung, Messung. Alles greift ineinander, statt aus einzelnen Werkzeugen zu bestehen.',
  },
  {
    n: 'III',
    title: 'Betrieb',
    text: 'Die Strecke läuft und wird nachgezogen. Die Messung zeigt, an welchem Schritt Menschen aussteigen. Genau dort wird geändert, statt überall gleichzeitig.',
  },
]

export function MaklerSituation() {
  useEffect(() => {
    document.title = 'Mehr Eigentümeranfragen — Plan B Studios'
    return () => {
      document.title = 'Plan B Studios — Webdesign & 3D-Rundgänge'
    }
  }, [])

  return (
    <div className="min-h-screen bg-night text-cream">
      <GrainOverlay />

      {/* Schlanke Kopfzeile statt der Hauptnavigation */}
      <header className="border-b border-night-line">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5 lg:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <CubeMark className="h-6 w-6 text-gold transition-colors group-hover:text-gold-bright" />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-[15px] tracking-wide text-cream">Plan B</span>
              <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.42em] text-gold">
                Studios
              </span>
            </span>
          </Link>
          <a
            href="#check"
            className="text-[13px] font-medium tracking-[0.06em] text-cream-soft transition-colors hover:text-gold"
          >
            Akquise-Check
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* 1 + 2 — Problem benennen */}
        <section className="pb-20 pt-20 md:pb-28 md:pt-28">
          <motion.div variants={reveal} initial={initialState} animate="show">
            <p className="mb-6 font-mono text-[12px] tracking-[0.3em] text-gold">
              FÜR MAKLER
            </p>
            <h1 className="font-serif text-[clamp(2.4rem,6.5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream">
              Eigentümer entscheiden,
              <br />
              <em className="italic text-gold-bright">bevor</em> sie anrufen.
            </h1>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-cream-soft md:text-xl">
              Eigentümer suchen online nach dem Wert ihrer Immobilie, lange bevor
              sie einen Makler anrufen. Wer in dieser Phase nicht auftaucht, wird
              später nicht angerufen.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
              Die Entscheidung fällt also nicht im Erstgespräch, sondern Wochen
              davor, an einem Abend, an dem jemand eine Zahl sucht und nicht ein
              Beratungsangebot. Wer zu diesem Zeitpunkt nur eine Seite über sich
              selbst anzubieten hat, ist zu spät.
            </p>
          </motion.div>
        </section>

        {/* 3 — Die vier Bausteine */}
        <section className="border-t border-night-line py-20 md:py-28">
          <motion.div
            variants={reveal}
            initial={initialState}
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="mb-6 font-mono text-[12px] tracking-[0.3em] text-gold">
              WAS ICH BAUE
            </p>
            <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
              Vier Bausteine, die
              <br />
              <em className="italic text-gold-bright">zusammen</em> arbeiten.
            </h2>
          </motion.div>

          <motion.div
            initial={initialState}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="mt-14 flex flex-col gap-10"
          >
            {BAUSTEINE.map((b) => (
              <motion.div
                key={b.n}
                variants={reveal}
                className="border-t border-night-line pt-7 sm:grid sm:grid-cols-[4rem_1fr] sm:gap-6"
              >
                <span className="mb-3 block font-mono text-[12px] tracking-[0.2em] text-gold sm:mb-0">
                  {b.n}
                </span>
                <div>
                  <h3 className="mb-3 font-serif text-2xl font-light text-cream">
                    {b.title}
                  </h3>
                  <p className="max-w-xl text-[15px] leading-relaxed text-stone md:text-base">
                    {b.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 4 — Ablauf */}
        <section className="border-t border-night-line py-20 md:py-28">
          <motion.div
            variants={reveal}
            initial={initialState}
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="mb-6 font-mono text-[12px] tracking-[0.3em] text-gold">
              ABLAUF
            </p>
            <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
              Drei Abschnitte,
              <br />
              <em className="italic text-gold-bright">nacheinander</em>.
            </h2>
          </motion.div>

          <motion.div
            initial={initialState}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8"
          >
            {ABLAUF.map((a) => (
              <motion.div key={a.n} variants={reveal} className="border-t border-night-line pt-7">
                <p className="mb-4 font-mono text-[12px] tracking-[0.2em] text-gold">{a.n}</p>
                <h3 className="mb-3 font-serif text-xl font-light text-cream">{a.title}</h3>
                <p className="text-[15px] leading-relaxed text-stone">{a.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 5 — Handlungsaufruf */}
        <section id="check" className="border-t border-night-line py-20 md:py-28">
          <motion.div
            variants={reveal}
            initial={initialState}
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col items-start"
          >
            <p className="mb-6 font-mono text-[12px] tracking-[0.3em] text-gold">
              AKQUISE-CHECK
            </p>
            <h2 className="max-w-2xl font-serif text-[clamp(2rem,5vw,3.4rem)] font-light leading-tight text-cream">
              Wo steht Ihre Akquise
              <br />
              <em className="italic text-gold-bright">gerade</em>?
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-stone md:text-lg">
              Fünf Fragen, keine Anmeldung. Am Ende stehen drei Hinweise, die sich
              aus Ihren eigenen Antworten ergeben, und die Möglichkeit, ein
              Fünfzehn-Minuten-Gespräch zu buchen.
            </p>

            <Magnetic>
              <Link
                to="/akquise-check"
                className="group mt-10 flex items-center gap-3 bg-gold px-8 py-4 text-[15px] font-medium tracking-[0.04em] text-night transition-colors duration-300 hover:bg-gold-bright"
              >
                Zum Akquise-Check
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M5 12h14m0 0-6-6m6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </Magnetic>

            <p className="mt-6 text-[13px] text-stone">
              Lieber direkt sprechen?{' '}
              <a
                href="mailto:planbstudios.de@gmail.com"
                className="text-cream-soft underline-offset-4 transition-colors hover:text-gold hover:underline"
              >
                planbstudios.de@gmail.com
              </a>
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
