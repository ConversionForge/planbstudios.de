import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Aufruf,
  Block,
  Karte,
  Marke,
  Rueckweg,
  SeitenLayout,
  einblenden,
} from '../components/SeitenLayout'
import { startVariante } from '../lib/ssr'

// Eigenstaendige Seite fuer die beiden laufenden Leistungen, die bisher nur im
// Google-Unternehmensprofil standen und nirgends auf der Website: Betreuung und
// Automatisierungen. Beides beantwortet dieselbe Frage — was nach dem
// Livegang passiert — deshalb eine Seite statt zwei.
//
// REGEL FUER DEN TEXT: Keine Zahlen, keine Reaktionszeiten, keine Preise, die
// nicht abgesprochen sind. Was hier steht, deckt sich mit dem, was der Inhaber
// als Leistungsumfang bestaetigt hat, und mit dem, was auf dieser Website
// nachweislich schon gebaut ist (Akquise-Check: Formular, Benachrichtigung,
// Bestaetigungsmail, Kontakt im System, Terminbuchung).

const BETREUUNG = [
  {
    n: '01',
    titel: 'Technische Pflege',
    text: 'Updates, Sicherheit, Sicherungen. Ich behalte im Blick, dass die Seite erreichbar bleibt und nichts stillschweigend kaputtgeht — das merkt man sonst erst, wenn jemand anruft und sagt, das Formular gehe nicht.',
  },
  {
    n: '02',
    titel: 'Inhalte einpflegen',
    text: 'Neue Objekte, Texte, Bilder, Referenzen. Sie schicken mir, was dazukommt, ich setze es ein. Kein Einarbeiten in ein Redaktionssystem, keine Angst, beim Ändern etwas zu zerschießen.',
  },
  {
    n: '03',
    titel: 'Änderungen und Ausbau',
    text: 'Kleinere Umbauten, ein neuer Abschnitt, eine zusätzliche Seite. Eine Website ist nach dem Livegang nicht fertig, sie ändert sich mit dem, was Sie verkaufen.',
  },
  {
    n: '04',
    titel: 'Messung und Nachsteuern',
    text: 'An welcher Stelle Besucher aussteigen, bevor sie anfragen. Daraufhin wird geändert — an genau dieser Stelle, statt überall gleichzeitig. Cookiefrei aufgesetzt, damit auch Abbrüche sichtbar bleiben.',
  },
]

const AUTOMATISIERUNG = [
  {
    titel: 'Anfragestrecken',
    text: 'Vom Formular bis in Ihr Postfach: Benachrichtigung an Sie, Bestätigung an den Interessenten, Kontakt im System angelegt. Nichts davon müssen Sie von Hand nachtragen.',
  },
  {
    titel: 'Objektdaten übernehmen',
    text: 'Objekte aus Ihrer Maklersoftware oder aus Portalen auf die Website bringen, statt dieselben Angaben zweimal zu pflegen. Was sich dort ändert, ändert sich auch hier.',
  },
  {
    titel: 'Nachfassen per Mail',
    text: 'Was passiert, wenn jemand eine Strecke abschließt, aber nicht anruft. Eine kurze Folge von Nachrichten mit Inhalten statt Werbung, mit doppelter Bestätigung beim Eintragen und einem Abmeldelink in jeder Mail.',
  },
  {
    titel: 'Terminbuchung anbinden',
    text: 'Kalender einbinden, Bestätigungen und Erinnerungen. Der Interessent sucht sich selbst einen Termin, statt dass Sie drei Mails hin und her schreiben.',
  },
]

export function WebsiteBetreuung() {
  return (
    <SeitenLayout
      titel="Website-Betreuung & Automatisierung — Plan B Studios"
      aktion={{ text: 'Anfragen', zu: '/#kontakt' }}
    >
      {/* Einstieg */}
      <section className="pb-20 pt-20 md:pb-28 md:pt-28">
        <motion.div variants={einblenden} initial={startVariante} animate="show">
          <Marke>BETREUUNG · AUTOMATISIERUNG</Marke>
          <h1 className="font-serif text-[clamp(2.4rem,6.5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream">
            Eine Website ist nicht fertig,
            <br />
            wenn sie <em className="italic text-gold-bright">online</em> geht.
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-cream-soft md:text-xl">
            Laufende Betreuung und angebundene Abläufe für Immobilienunternehmen
            in Lübeck und Schleswig-Holstein.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
            Der häufigste Grund, warum eine gute Seite nach zwei Jahren schlecht
            aussieht, ist nicht das Design. Es ist, dass niemand zuständig war.
            Objekte stehen noch drin, die längst verkauft sind, das Formular
            schickt ins Leere, und niemand hat gemerkt, dass es seit Monaten so
            ist.
          </p>
          <div className="mt-10">
            <Aufruf to="/#kontakt">Betreuung anfragen</Aufruf>
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

      {/* Automatisierungen */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block>
          <Marke>AUTOMATISIERUNGEN</Marke>
          <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
            Abläufe, die ohne Sie
            <br />
            <em className="italic text-gold-bright">weiterlaufen</em>.
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-stone">
            Der Akquise-Check auf dieser Seite ist genau so gebaut: Formular,
            Benachrichtigung, Bestätigungsmail, Kontakt im System,
            Terminbuchung. Sie können ihn{' '}
            <Link
              to="/akquise-check/"
              className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold"
            >
              selbst ausprobieren
            </Link>
            .
          </p>
        </Block>

        <Block gestaffelteKinder className="mt-14 grid gap-10 md:grid-cols-2 md:gap-x-16">
          {AUTOMATISIERUNG.map((a) => (
            <motion.div
              key={a.titel}
              variants={einblenden}
              className="border-t border-night-line pt-7"
            >
              <h3 className="mb-4 font-serif text-xl font-light text-cream">{a.titel}</h3>
              <p className="text-[15px] leading-relaxed text-stone">{a.text}</p>
            </motion.div>
          ))}
        </Block>
      </section>

      {/* Handlungsaufruf */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block className="flex flex-col items-start">
          <Marke>ANFRAGEN</Marke>
          <h2 className="max-w-2xl font-serif text-[clamp(2rem,5vw,3.4rem)] font-light leading-tight text-cream">
            Was läuft gerade
            <br />
            <em className="italic text-gold-bright">von Hand</em>?
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-stone md:text-lg">
            Schreiben Sie mir, was Sie regelmäßig selbst machen und was liegen
            bleibt. Ich sage Ihnen, was sich davon anbinden lässt und was den
            Aufwand nicht wert ist.
          </p>
          <div className="mt-10">
            <Aufruf to="mailto:info@planbstudios.de" extern>
              info@planbstudios.de
            </Aufruf>
          </div>
        </Block>
      </section>

      <Rueckweg
        text={
          <>
            <Link
              to="/webdesign-luebeck/"
              className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold"
            >
              Webdesign in Lübeck
            </Link>{' '}
            ·{' '}
            <Link
              to="/3d-rundgaenge/"
              className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold"
            >
              3D-Rundgänge
            </Link>{' '}
            ·{' '}
            <Link
              to="/ueber-mich/"
              className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold"
            >
              Über mich
            </Link>{' '}
            ·{' '}
            <Link
              to="/"
              className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold"
            >
              Alle Leistungen
            </Link>
          </>
        }
      />
    </SeitenLayout>
  )
}
