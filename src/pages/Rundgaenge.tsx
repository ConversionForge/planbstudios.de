import { Link } from 'react-router-dom'
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
import { motion } from 'motion/react'

// Eigenstaendige Seite fuer die Suche nach "3D-Rundgang Immobilien",
// "virtueller Rundgang" und verwandten Begriffen. Die Startseite streift das
// Thema; wer gezielt danach sucht, braucht eine Seite, die nur davon handelt.
//
// REGEL FUER DEN TEXT: Keine Zahlen, keine Studien, keine Behauptungen ueber
// Wirkung ("verkauft schneller", "mehr Anfragen"). Was hier steht, ist
// belegbar: was gebaut wird, wie es entsteht, was es voraussetzt.

const WEGE = [
  {
    n: '01',
    titel: 'Aus vorhandenen Fotos',
    text: 'Wenn das Objekt bereits fotografiert ist, entsteht daraus ein cinematischer Walkthrough — eine Kamerafahrt durch die Räume, komponiert aus den Aufnahmen. Kein Termin vor Ort, kein Scan, keine zusätzliche Technik.',
    braucht: 'Was ich brauche: die Objektfotos in voller Auflösung.',
  },
  {
    n: '02',
    titel: 'Begehbarer Rundgang',
    text: 'Der Interessent bewegt sich selbst durch die Räume, wechselt Standpunkte, sieht sich um. Punkte im Raum lassen sich beschriften — Quadratmeter, Ausstattung, Hinweise zur Lage.',
    braucht: 'Was ich brauche: Aufnahmen aller Räume, die zusammenhängen sollen.',
  },
]

const FUER_WEN = [
  {
    titel: 'Makler',
    text: 'Das Exposé zeigt Bilder. Ein Rundgang zeigt, wie die Räume zusammenhängen — welcher Raum an welchen grenzt, wie hoch die Decken sind, wohin die Fenster gehen. Fragen, die sonst am Telefon oder gar nicht geklärt werden.',
  },
  {
    titel: 'Bauträger',
    text: 'Vor der Fertigstellung gibt es nichts zu besichtigen. Ein Rundgang macht aus Grundriss und Visualisierung einen Raum, den man betreten kann, bevor er steht.',
  },
  {
    titel: 'Hausverwaltungen',
    text: 'Bei wiederkehrender Vermietung lohnt sich ein Rundgang mehrfach: Er bleibt bestehen, während die Interessenten wechseln.',
  },
]

const ABLAUF = [
  {
    n: 'I',
    titel: 'Material sichten',
    text: 'Ich sehe mir an, was vorhanden ist, und sage Ihnen, welcher der beiden Wege dazu passt — oder was fehlt, damit er möglich wird.',
  },
  {
    n: 'II',
    titel: 'Aufbau',
    text: 'Der Rundgang entsteht. Sie bekommen eine Zwischenfassung zum Ansehen, bevor er fertig ist, nicht erst am Ende.',
  },
  {
    n: 'III',
    titel: 'Einbinden',
    text: 'Der Rundgang bekommt eine eigene Adresse und lässt sich verlinken oder in Ihre Seite einbetten. Er läuft im Browser, ohne Installation, auch am Handy.',
  },
]

export function Rundgaenge() {
  return (
    <SeitenLayout
      titel="3D-Rundgänge für Immobilien — Plan B Studios"
      aktion={{ text: 'Anfragen', zu: '/#kontakt' }}
    >
      {/* Einstieg */}
      <section className="pb-20 pt-20 md:pb-28 md:pt-28">
        <motion.div variants={einblenden} initial={startVariante} animate="show">
          <Marke>3D-RUNDGÄNGE</Marke>
          <h1 className="font-serif text-[clamp(2.4rem,6.5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream">
            Ein Exposé zeigt Bilder.
            <br />
            Ein Rundgang zeigt den <em className="italic text-gold-bright">Raum</em>.
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-cream-soft md:text-xl">
            Begehbare 3D-Rundgänge und cinematische Objektfilme für Immobilien —
            gebaut in Lübeck, für Makler, Bauträger und Hausverwaltungen in
            Schleswig-Holstein und darüber hinaus.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
            Wer eine Wohnung online sucht, sieht acht Fotos und weiß danach
            nicht, wie die Räume zusammenhängen. Ein Rundgang beantwortet genau
            das — vor dem ersten Termin.
          </p>
          <div className="mt-10">
            <Aufruf to="/rundgang">Einen Rundgang ansehen</Aufruf>
          </div>
        </motion.div>
      </section>

      {/* Zwei Wege */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block>
          <Marke>ZWEI WEGE</Marke>
          <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
            Es hängt davon ab,
            <br />
            was schon <em className="italic text-gold-bright">da ist</em>.
          </h2>
        </Block>

        <Block gestaffelteKinder className="mt-14 grid gap-6 md:grid-cols-2">
          {WEGE.map((w) => (
            <motion.div key={w.n} variants={einblenden}>
              <Karte className="h-full">
                <span className="font-mono text-[12px] tracking-[0.2em] text-gold">{w.n}</span>
                <h3 className="mb-4 mt-4 font-serif text-2xl font-light text-cream">
                  {w.titel}
                </h3>
                <p className="text-[15px] leading-relaxed text-stone md:text-base">{w.text}</p>
                <p className="mt-5 border-t border-night-line pt-5 text-[14px] leading-relaxed text-cream-soft">
                  {w.braucht}
                </p>
              </Karte>
            </motion.div>
          ))}
        </Block>

        <Block className="mt-10">
          <p className="max-w-2xl text-[15px] leading-relaxed text-stone">
            Der Rundgang unter{' '}
            <Link
              to="/rundgang"
              className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold"
            >
              dieser Adresse
            </Link>{' '}
            ist auf dem ersten Weg entstanden: ein Design-Loft in Hamburg,
            sieben Räume, ausschließlich aus Objektfotos — ohne 3D-Scan und ohne
            Termin vor Ort.
          </p>
        </Block>
      </section>

      {/* Fuer wen */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block>
          <Marke>FÜR WEN</Marke>
          <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
            Drei Fälle, in denen
            <br />
            Fotos <em className="italic text-gold-bright">nicht reichen</em>.
          </h2>
        </Block>

        <Block gestaffelteKinder className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {FUER_WEN.map((f) => (
            <motion.div
              key={f.titel}
              variants={einblenden}
              className="border-t border-night-line pt-7"
            >
              <h3 className="mb-4 font-serif text-xl font-light text-cream">{f.titel}</h3>
              <p className="text-[15px] leading-relaxed text-stone">{f.text}</p>
            </motion.div>
          ))}
        </Block>
      </section>

      {/* Ablauf */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block>
          <Marke>ABLAUF</Marke>
          <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
            Drei Schritte,
            <br />
            <em className="italic text-gold-bright">nacheinander</em>.
          </h2>
        </Block>

        <Block gestaffelteKinder className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {ABLAUF.map((a) => (
            <motion.div
              key={a.n}
              variants={einblenden}
              className="border-t border-night-line pt-7"
            >
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
            Erzählen Sie mir
            <br />
            vom <em className="italic text-gold-bright">Objekt</em>.
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-stone md:text-lg">
            Schicken Sie mir, was Sie haben — Fotos, Grundriss, die Adresse des
            Exposés. Ich sage Ihnen, was daraus wird und was es kostet, bevor
            irgendetwas beginnt.
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
            Plan B Studios baut außerdem Websites für Immobilienunternehmen.{' '}
            <Link
              to="/webdesign-luebeck"
              className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold"
            >
              Webdesign in Lübeck
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
