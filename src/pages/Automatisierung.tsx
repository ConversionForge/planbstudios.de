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
import { Einschaetzung } from '../components/Einschaetzung'
import { GastroBeispiel } from '../components/GastroBeispiel'
import { sichtbareReferenzen } from '../inhalte/referenzen'
import { TERMIN_URL } from '../lib/kontakt'
import { startVariante } from '../lib/ssr'

// Leistungsseite Automatisierung: die erste und wichtigste Leistung.
//
// REGEL FUER DEN TEXT: Beispiele beschreiben, was sich typischerweise
// automatisieren laesst. Sie behaupten nicht, was der Leser heute tut, und
// sie versprechen keine Zahlen (keine "Stunden pro Woche gespart"). Was ein
// konkreter Betrieb spart, weiss erst, wer sich dessen Ablaeufe angesehen hat.

const ABLAEUFE = [
  {
    titel: 'Daten übertragen',
    text: 'Eine Anfrage kommt per Mail, wird in eine Tabelle abgetippt und danach in den Kalender. Wenn ein Mensch nur Angaben von A nach B trägt, kann das ein Ablauf übernehmen.',
  },
  {
    titel: 'Dokumente erstellen',
    text: 'Angebote, Auftragsbestätigungen, Protokolle, Listen: aus Angaben, die ohnehin schon irgendwo stehen, statt jedes Mal aus einer alten Vorlage zusammenkopiert.',
  },
  {
    titel: 'Erinnern und nachfassen',
    text: 'Termine bestätigen, an fehlende Unterlagen erinnern, nach einem Angebot nachhaken. Pünktlich, ohne dass jemand daran denken muss.',
  },
  {
    titel: 'Anfragen sortieren',
    text: 'Eingehende Anfragen landen vorsortiert bei der richtigen Person, mit allen Angaben, statt in einem gemeinsamen Postfach, das jeder einmal öffnet.',
  },
]

// Wie der Inhaber Automatisierung tatsaechlich anbietet (siehe sein Angebot
// an einen Interessenten, November 2026): erst ein Pilot zum Festpreis, der an
// wenigen Zahlen gemessen wird, danach auf Wunsch eine laufende
// Zusammenarbeit mit schrittweisem Ausbau.
const VORGEHEN = [
  {
    n: 'I',
    titel: 'Ansehen',
    text: 'Bei Ihnen vor Ort oder per Video. Welche Abläufe gibt es, welche Programme sind beteiligt, wie oft fällt was an.',
  },
  {
    n: 'II',
    titel: 'Pilot',
    text: 'Ein Ablauf, wenige Wochen, fester Preis. Was er spart, messen wir an zwei, drei Zahlen, statt es vorher zu schätzen.',
  },
  {
    n: 'III',
    titel: 'Ausbauen',
    text: 'Was sich bewährt, wird erweitert. Ein Ablauf nach dem anderen, und jeder läuft erst eine Weile neben der gewohnten Arbeit.',
  },
  {
    n: 'IV',
    titel: 'Betreuen',
    text: 'Auf Wunsch betreue ich die Abläufe weiter, passe sie an und baue neue dazu. Sie wissen jederzeit, was wann passiert.',
  },
]

// Ein Beispiel dafuer, wie eine solche Automatisierung aussieht. Die vier
// Punkte entsprechen Modulen, die der Inhaber tatsaechlich gebaut und getestet
// hat (Stand November 2026). Bewusst ohne Branche und ohne Kundennamen: Es
// war ein Angebot an einen Interessenten, kein Auftrag.
const ASSISTENT = [
  {
    titel: 'Schreiben auslesen',
    text: 'Ein Brief oder eine PDF kommt an. Der Assistent erkennt Aktenzeichen, Fristen und Beteiligte, sucht den passenden Vorgang heraus und bereitet die Antwort vor.',
  },
  {
    titel: 'Offene Posten im Blick',
    text: 'Was überfällig ist, steht morgens auf einer Liste, statt dass es jemand zusammensuchen muss.',
  },
  {
    titel: 'Bewertungen auswerten',
    text: 'Kundenbewertungen, nach Themen sortiert, dazu Antwortentwürfe zum Kopieren. Veröffentlicht wird nichts von selbst.',
  },
  {
    titel: 'Nachtlauf mit Tagesbericht',
    text: 'Nachts läuft alles von selbst. Morgens liegt ein Bericht bereit: was erledigt ist und was sich jemand ansehen sollte.',
  },
]

export function Automatisierung() {
  const referenzen = sichtbareReferenzen().filter((r) => r.leistung === 'Automatisierung')

  return (
    <SeitenLayout titel="Prozessautomatisierung für Betriebe in Lübeck — Plan B Studios">
      {/* Einstieg */}
      <section className="pb-20 pt-16 md:pb-28 md:pt-24">
        <motion.div variants={einblenden} initial={startVariante} animate="show">
          <Marke>AUTOMATISIERUNG · LÜBECK</Marke>
          <h1 className="font-serif text-[clamp(2.4rem,6.5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream [text-wrap:balance]">
            Automatisierung für Betriebe in <em className="italic text-gold-bright">Lübeck</em>
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-cream-soft md:text-xl">
            Wenn dieselbe Arbeit jede Woche wieder anfällt, muss sie nicht jede
            Woche jemand von Hand machen.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
            Prozessautomatisierung heißt bei mir: Ich sehe mir an, wie in Ihrem
            Betrieb gearbeitet wird, finde die Abläufe, die immer nach demselben
            Muster laufen, und automatisiere die, bei denen es sich lohnt. Wo es geht, mit den Programmen, die Sie
            schon nutzen.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Aufruf to={TERMIN_URL} neuesFenster>
              Erstgespräch buchen
            </Aufruf>
            <TextVerweis to="#einschaetzung">Lieber erst schriftlich</TextVerweis>
          </div>
        </motion.div>
      </section>

      {/* Typische Ablaeufe */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block>
          <Marke>WAS SICH AUTOMATISIEREN LÄSST</Marke>
          <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
            Alles, was nach demselben <em className="italic text-gold-bright">Muster</em> läuft.
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-stone">
            Vier Arten von Abläufen, die in fast jedem Betrieb vorkommen. Was
            jedes Mal eine Entscheidung braucht, bleibt bei Ihnen.
          </p>
        </Block>

        <Block gestaffelteKinder className="mt-14 grid gap-6 md:grid-cols-2">
          {ABLAEUFE.map((a, i) => (
            <motion.div key={a.titel} variants={einblenden}>
              <Karte className="h-full">
                <span className="font-mono text-[12px] tracking-[0.2em] text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-4 mt-4 font-serif text-2xl font-light text-cream">{a.titel}</h3>
                <p className="text-[15px] leading-relaxed text-stone md:text-base">{a.text}</p>
              </Karte>
            </motion.div>
          ))}
        </Block>
      </section>

      {/* Erstes Beispiel: Assistent neben dem Branchenprogramm */}
      <section id="beispiel" className="scroll-mt-28 border-t border-night-line py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <Block>
            <Marke>ERSTES BEISPIEL · BÜROARBEIT</Marke>
            <h2 className="font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
              Ein Assistent <em className="italic text-gold-bright">neben</em> Ihrem Programm.
            </h2>
          </Block>
          <Block>
            <p className="text-base leading-relaxed text-cream-soft md:text-lg">
              So sieht eine Automatisierung aus, wie ich sie baue: Ein Assistent
              läuft neben dem Programm, mit dem Ihr Betrieb ohnehin arbeitet. Er
              ersetzt es nicht. Er liest dessen Exporte und erledigt die Arbeit
              zwischen den Systemen.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Dieses Beispiel läuft komplett auf einem Rechner im Betrieb, ohne
              Cloud. Briefe und Antworten verschickt es nicht selbst: Ein Mensch
              sieht sie an und entscheidet.
            </p>
          </Block>
        </div>

        <Block gestaffelteKinder className="mt-14 grid gap-px overflow-hidden rounded-[1.6rem] bg-night-line ring-1 ring-night-line sm:grid-cols-2">
          {ASSISTENT.map((a, i) => (
            <motion.div key={a.titel} variants={einblenden} className="bg-night p-8 md:p-9">
              <span className="font-mono text-[12px] tracking-[0.2em] text-gold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-3 mt-5 font-serif text-[1.45rem] font-light leading-tight text-cream">{a.titel}</h3>
              <p className="text-[15px] leading-relaxed text-stone">{a.text}</p>
            </motion.div>
          ))}
        </Block>
      </section>

      {/* Zweites Beispiel: Stammgaeste fuer Restaurants */}
      <GastroBeispiel />

      {/* Wann nicht */}
      <section className="border-t border-night-line py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <Block>
            <Marke>WANN ES SICH NICHT LOHNT</Marke>
            <h2 className="font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
              Manches bleibt besser <em className="italic text-gold-bright">Handarbeit</em>.
            </h2>
          </Block>
          <Block>
            <p className="text-base leading-relaxed text-cream-soft md:text-lg">
              Ein Ablauf, der zweimal im Jahr vorkommt, rechnet sich selten. Einer,
              der jedes Mal anders aussieht, lässt sich schlecht in feste Regeln
              fassen.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              In solchen Fällen sage ich Ihnen das im Erstgespräch, statt etwas zu
              bauen, das mehr kostet, als es Ihnen abnimmt. Dann bleibt die
              Handarbeit, und wir reden über den nächsten Ablauf.
            </p>
          </Block>
        </div>
      </section>

      {/* Vorgehen */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block>
          <Marke>SO GEHE ICH VOR</Marke>
          <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
            Vier Schritte, <em className="italic text-gold-bright">nacheinander</em>.
          </h2>
        </Block>

        <Block gestaffelteKinder className="mt-14 grid gap-10 md:grid-cols-2 md:gap-x-16 lg:grid-cols-4 lg:gap-8">
          {VORGEHEN.map((s) => (
            <motion.div key={s.n} variants={einblenden} className="border-t border-night-line pt-7">
              <p className="mb-4 font-mono text-[12px] tracking-[0.2em] text-gold">{s.n}</p>
              <h3 className="mb-3 font-serif text-xl font-light text-cream">{s.titel}</h3>
              <p className="text-[15px] leading-relaxed text-stone">{s.text}</p>
            </motion.div>
          ))}
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

      {/* Kostenloser Einstieg */}
      <section id="einschaetzung" className="scroll-mt-28 border-t border-night-line py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Block>
            <Marke>ABLAUF-EINSCHÄTZUNG · KOSTENLOS</Marke>
            <h2 className="font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
              Schicken Sie mir bis zu <em className="italic text-gold-bright">drei</em> Abläufe.
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-stone">
              Beschreiben Sie in ein paar Sätzen, was bei Ihnen jede Woche von
              Hand läuft. Ich lese es selbst und schreibe Ihnen, was sich davon
              automatisieren lässt und was nicht.
            </p>
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-stone">
              Keine automatische Auswertung, kein Newsletter. Sie bekommen eine
              Antwort von mir.
            </p>
          </Block>
          <Block>
            <Karte>
              <Einschaetzung />
            </Karte>
          </Block>
        </div>
      </section>

      <Rueckweg
        text={
          <>
            Außerdem:{' '}
            <Link to="/akquise-strecken/" className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold">
              Akquise-Strecken
            </Link>{' '}
            ·{' '}
            <Link to="/webdesign-luebeck/" className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold">
              Websites
            </Link>{' '}
            ·{' '}
            <Link to="/website-betreuung/" className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold">
              Website-Betreuung
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
