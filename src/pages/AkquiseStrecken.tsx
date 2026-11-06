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
import { sichtbareReferenzen } from '../inhalte/referenzen'
import { TERMIN_URL } from '../lib/kontakt'
import { startVariante } from '../lib/ssr'

// Leistungsseite Akquise-Strecken, gleichrangig mit der Automatisierung.
//
// Abgrenzung zu /makler/mehr-eigentuemeranfragen/: Diese Seite erklaert die
// Leistung (was eine Akquise-Strecke ist und wie ich sie baue). Die
// Makler-Seite ist der Ratgeber fuer eine Zielgruppe und fuehrt zum
// Akquise-Check. Beide verweisen aufeinander.
//
// REGEL FUER DEN TEXT: keine Wirkungsversprechen in Zahlen ("x % mehr
// Anfragen"). Beschrieben wird, was gebaut wird und warum es so gebaut ist.

const STRECKE = [
  {
    n: '01',
    titel: 'Gefunden werden',
    text: 'Eine Seite, die genau eine Frage beantwortet, die Ihre Kunden bei Google stellen. Keine Seite über Sie, sondern eine über deren Lage.',
  },
  {
    n: '02',
    titel: 'Einsteigen',
    text: 'Ein kurzes Formular, eine Frage pro Schritt, mit Fortschrittsanzeige. Der Einstieg bleibt leicht, und die Angaben sind am Ende trotzdem vollständig.',
  },
  {
    n: '03',
    titel: 'Sofort antworten',
    text: 'Sie bekommen alle Angaben in einer Mail, der Interessent im selben Moment eine Bestätigung mit Link zur Terminbuchung.',
  },
  {
    n: '04',
    titel: 'Nachfassen',
    text: 'Wer keinen Termin bucht, bekommt eine kurze Folge von Nachrichten mit Inhalt statt Werbung. Mit Einwilligung und Abmeldelink.',
  },
  {
    n: '05',
    titel: 'Messen',
    text: 'Jeder Schritt wird gezählt, vom ersten Klick bis zum gebuchten Termin. Sie sehen jeden Monat, wo Menschen aussteigen, und genau dort wird nachgebessert. Cookiefrei gemessen.',
  },
]

const ABLAUF = [
  {
    n: 'I',
    titel: 'Analyse',
    text: 'Was findet ein Interessent heute, wenn er sucht? Wie viele Klicks liegen zwischen Einstieg und Anfrage? Was passiert nach dem Absenden eines Formulars?',
  },
  {
    n: 'II',
    titel: 'Aufbau',
    text: 'Seite, Formular, Bestätigung, Terminbuchung und Messung werden gebaut und verbunden. Alles greift ineinander, statt aus einzelnen Werkzeugen zu bestehen.',
  },
  {
    n: 'III',
    titel: 'Betrieb',
    text: 'Die Strecke läuft und wird nachgezogen. Geändert wird an dem Schritt, an dem die Messung zeigt, dass Menschen aussteigen.',
  },
]

export function AkquiseStrecken() {
  const referenzen = sichtbareReferenzen().filter((r) => r.leistung === 'Akquise-Strecke')

  return (
    <SeitenLayout titel="Akquise-Strecken für Makler und Betriebe — Plan B Studios">
      {/* Einstieg */}
      <section className="pb-20 pt-16 md:pb-28 md:pt-24">
        <motion.div variants={einblenden} initial={startVariante} animate="show">
          <Marke>AKQUISE-STRECKEN</Marke>
          <h1 className="font-serif text-[clamp(2.4rem,6.5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream [text-wrap:balance]">
            Vom ersten Klick bis zum <em className="italic text-gold-bright">Termin</em>
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-cream-soft md:text-xl">
            Eine Akquise-Strecke ist der Weg, den ein Interessent geht, bis er bei
            Ihnen anfragt. Jeder Schritt hat genau eine Aufgabe, und was nach der
            Anfrage passiert, läuft automatisch.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
            Am weitesten ausgearbeitet ist das für Immobilienmakler, die
            Eigentümer gewinnen wollen. Das Prinzip passt überall, wo Kunden
            erst online suchen und dann anrufen.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Aufruf to={TERMIN_URL} neuesFenster>
              Erstgespräch buchen
            </Aufruf>
            <TextVerweis to="/akquise-check/">Akquise-Check für Makler</TextVerweis>
          </div>
        </motion.div>
      </section>

      {/* Die Strecke */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block>
          <Marke>DIE STRECKE</Marke>
          <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
            Fünf Schritte, die <em className="italic text-gold-bright">ineinandergreifen</em>.
          </h2>
        </Block>

        <Block gestaffelteKinder className="mt-14">
          <ol className="relative">
            {STRECKE.map((s, i) => (
              <motion.li
                key={s.n}
                variants={einblenden}
                className="relative grid gap-3 pb-10 pl-14 last:pb-0 sm:grid-cols-[12rem_1fr] sm:gap-8"
              >
                {/* Laufende Linie links, wie auf einer Strecke */}
                {i < STRECKE.length - 1 && (
                  <span aria-hidden className="absolute left-[0.95rem] top-9 h-[calc(100%-2.25rem)] w-px bg-gradient-to-b from-gold/60 to-night-line" />
                )}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 bg-night font-mono text-[11px] text-gold"
                >
                  {s.n}
                </span>
                <h3 className="pt-1 font-serif text-xl font-light text-cream">{s.titel}</h3>
                <p className="max-w-xl text-[15px] leading-relaxed text-stone md:text-base">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </Block>

        {/* Aus der Praesentation des Inhabers (Folie "Vier Bausteine"). */}
        <Block className="mt-14 border-t border-night-line pt-8">
          <p className="max-w-2xl text-[15px] leading-relaxed text-cream-soft md:text-base">
            Alles läuft auf Ihrer Domain. Alles gehört Ihnen, auch wenn wir
            irgendwann nicht mehr zusammenarbeiten.
          </p>
        </Block>
      </section>

      {/* Fuer Makler */}
      <section className="border-t border-night-line py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <Block>
            <Marke>FÜR IMMOBILIENMAKLER</Marke>
            <h2 className="font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
              Eigentümer entscheiden, <em className="italic text-gold-bright">bevor</em> sie anrufen.
            </h2>
          </Block>
          <Block>
            <p className="text-base leading-relaxed text-cream-soft md:text-lg">
              Wer sein Haus verkaufen will, sucht zuerst nach dem Wert, oft Wochen
              bevor er einen Makler anruft. Wer in dieser Phase nicht auftaucht,
              wird später nicht angerufen.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Für Makler baue ich deshalb Seiten zu den Lagen, in denen Eigentümer
              stecken, eine Bewertungsstrecke und das Nachfassen danach. Für die
              Objekte, die daraus entstehen, auf Wunsch auch{' '}
              <Link to="/3d-rundgaenge/" className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold">
                Objektfilme und 3D-Rundgänge
              </Link>
              .
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Aufruf to="/akquise-check/">Akquise-Check machen</Aufruf>
              <TextVerweis to="/makler/mehr-eigentuemeranfragen/">Ratgeber für Makler</TextVerweis>
            </div>
          </Block>
        </div>
      </section>

      {/* Live ansehen */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block>
          <Karte>
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <Marke>LIVE ANSEHEN</Marke>
                <h2 className="max-w-xl font-serif text-[clamp(1.6rem,3.4vw,2.4rem)] font-light leading-tight text-cream">
                  Der Akquise-Check auf dieser Seite ist selbst eine Akquise-Strecke.
                </h2>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-stone">
                  Fünf Fragen, eine pro Schritt. Danach eine Benachrichtigung an
                  mich, eine Bestätigung an Sie, der Kontakt im System und ein Link
                  zur Terminbuchung. Genau so würde ich es für Ihren Betrieb bauen.
                </p>
              </div>
              <Aufruf to="/akquise-check/" variante="rand">
                Ausprobieren
              </Aufruf>
            </div>
          </Karte>
        </Block>
      </section>

      {/* Referenzen, sobald freigegeben */}
      {referenzen.length > 0 && (
        <section className="border-t border-night-line py-20 md:py-28">
          <Block>
            <Marke>REFERENZEN</Marke>
            <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
              Schon im Einsatz
            </h2>
          </Block>
          <Block gestaffelteKinder className="mt-12 grid gap-6 md:grid-cols-2">
            {referenzen.map((r) => (
              <motion.div key={r.kunde} variants={einblenden}>
                <Karte className="h-full">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-gold">{r.branche.toUpperCase()}</p>
                  <h3 className="mt-4 font-serif text-2xl font-light text-cream">{r.kunde}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-stone">{r.titel}</p>
                  {r.jetzt && <p className="mt-3 text-[15px] leading-relaxed text-stone">{r.jetzt}</p>}
                  {!r.freigegeben && (
                    <p className="mt-5 inline-block rounded-md border border-dashed border-gold/50 px-2.5 py-1 font-mono text-[11px] tracking-[0.12em] text-gold">
                      ENTWURF · ANGABEN UND FREIGABE FEHLEN
                    </p>
                  )}
                </Karte>
              </motion.div>
            ))}
          </Block>
        </section>
      )}

      {/* Ablauf */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block>
          <Marke>ABLAUF</Marke>
          <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
            Drei Abschnitte, <em className="italic text-gold-bright">nacheinander</em>.
          </h2>
        </Block>
        <Block gestaffelteKinder className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {ABLAUF.map((a) => (
            <motion.div key={a.n} variants={einblenden} className="border-t border-night-line pt-7">
              <p className="mb-4 font-mono text-[12px] tracking-[0.2em] text-gold">{a.n}</p>
              <h3 className="mb-3 font-serif text-xl font-light text-cream">{a.titel}</h3>
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
            Wie kommen Ihre Kunden <em className="italic text-gold-bright">heute</em> zu Ihnen?
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-stone md:text-lg">
            Erzählen Sie es mir in fünfzehn Minuten. Danach wissen Sie, an welcher
            Stelle eine Strecke bei Ihnen ansetzen würde.
          </p>
          <div className="mt-10">
            <Aufruf to={TERMIN_URL} neuesFenster>
              Erstgespräch buchen
            </Aufruf>
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
            <Link to="/webdesign-luebeck/" className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold">
              Websites
            </Link>{' '}
            ·{' '}
            <Link to="/3d-rundgaenge/" className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold">
              3D-Rundgänge für Makler
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
