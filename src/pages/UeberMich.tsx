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

// Autorenseite. Zwei Zwecke:
//
// 1. Suche nach dem Namen "Bilal Gnielka". Bisher stand der Name nur im
//    Impressum und in den strukturierten Daten — nirgends als eigene Seite.
// 2. Die Signale, die Google unter E-E-A-T zusammenfasst: eine benannte,
//    auffindbare Person hinter der Arbeit, mit nachpruefbarem Profil.
//
// ---------------------------------------------------------------------------
// LUECKE, DIE NUR DER INHABER SCHLIESSEN KANN
//
// Hier steht ausschliesslich, was sich aus der bestehenden Seite belegen
// laesst. Was fehlt und NICHT erfunden werden darf:
//   - Werdegang: Ausbildung, vorherige Stationen, seit wann selbststaendig
//   - Warum Immobilien: der konkrete Anlass
//   - Womit gearbeitet wird, falls es genannt werden soll
//   - Ein Portraitfoto (starkes Signal, sowohl fuer Vertrauen als auch fuer
//     die Bildsuche)
//
// Bis diese Angaben vorliegen, bleibt die Seite kurz. Eine kurze, wahre Seite
// ist besser als eine lange mit erfundenem Lebenslauf.
// ---------------------------------------------------------------------------

const ARBEITSWEISE = [
  {
    titel: 'Sie sprechen mit dem, der es baut',
    text: 'Es gibt keinen Projektleiter zwischen Ihnen und der Umsetzung. Was wir besprechen, baue ich — vom ersten Entwurf bis zur fertigen Seite.',
  },
  {
    titel: 'Website und Rundgang aus einer Hand',
    text: 'Kein Weiterreichen zwischen Agentur und Fotograf, keine Abstimmung zwischen zwei Dienstleistern, die sich gegenseitig die Schuld geben.',
  },
  {
    titel: 'Erst fragen, dann bauen',
    text: 'Bevor etwas entsteht, klären wir, wen Sie erreichen wollen und was der Interessent auf Ihrer Seite eigentlich sucht. Design kommt danach.',
  },
]

export function UeberMich() {
  return (
    <SeitenLayout
      titel="Bilal Gnielka — Plan B Studios, Lübeck"
      aktion={{ text: 'Anfragen', zu: '/#kontakt' }}
    >
      {/* Einstieg */}
      <section className="pb-20 pt-20 md:pb-28 md:pt-28">
        <motion.div variants={einblenden} initial={startVariante} animate="show">
          <Marke>ÜBER MICH</Marke>
          <h1 className="font-serif text-[clamp(2.4rem,6.5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream">
            Bilal Gnielka
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-cream-soft md:text-xl">
            Ich baue Websites und begehbare 3D-Rundgänge für Immobilien. Plan B
            Studios ist mein Studio in Lübeck — ein Ein-Personen-Betrieb, und
            das ist Absicht.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
            Wer bei mir anfragt, bekommt keine Angebotsmappe einer Agentur,
            sondern eine Antwort von der Person, die anschließend auch die
            Arbeit macht.
          </p>
        </motion.div>
      </section>

      {/* Arbeitsweise */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block>
          <Marke>WIE ICH ARBEITE</Marke>
          <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
            Drei Dinge, die sich
            <br />
            daraus <em className="italic text-gold-bright">ergeben</em>.
          </h2>
        </Block>

        <Block gestaffelteKinder className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {ARBEITSWEISE.map((a) => (
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

      {/* Erreichbarkeit */}
      <section className="border-t border-night-line py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
          <Block>
            <Marke>ERREICHBAR</Marke>
            <h2 className="font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
              Direkt,
              <br />
              ohne <em className="italic text-gold-bright">Umweg</em>.
            </h2>
          </Block>

          <Block>
            <Karte>
              <dl className="flex flex-col gap-6 text-[15px]">
                <div>
                  <dt className="mb-1 font-mono text-[11px] tracking-[0.2em] text-gold">STUDIO</dt>
                  <dd className="leading-relaxed text-cream-soft">
                    Plan B Studios
                    <br />
                    Robert-Koch-Straße 24
                    <br />
                    23562 Lübeck
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 font-mono text-[11px] tracking-[0.2em] text-gold">E-MAIL</dt>
                  <dd>
                    <a
                      href="mailto:info@planbstudios.de"
                      className="text-cream-soft underline-offset-4 transition-colors hover:text-gold hover:underline"
                    >
                      info@planbstudios.de
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 font-mono text-[11px] tracking-[0.2em] text-gold">TELEFON</dt>
                  <dd>
                    <a
                      href="tel:+491788489408"
                      className="text-cream-soft underline-offset-4 transition-colors hover:text-gold hover:underline"
                    >
                      +49 178 8489408
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 font-mono text-[11px] tracking-[0.2em] text-gold">PROFIL</dt>
                  <dd>
                    {/*
                      Sichtbarer Verweis aufs Profil, nicht nur sameAs in den
                      Daten: Google verknuepft Namen und Person zuverlaessiger,
                      wenn der Verweis auch auf der Seite steht.
                    */}
                    <a
                      href="https://www.linkedin.com/in/bilal-gnielka"
                      target="_blank"
                      rel="me noreferrer"
                      className="text-cream-soft underline-offset-4 transition-colors hover:text-gold hover:underline"
                    >
                      LinkedIn: bilal-gnielka
                    </a>
                  </dd>
                </div>
              </dl>
            </Karte>
          </Block>
        </div>
      </section>

      {/* Handlungsaufruf */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block className="flex flex-col items-start">
          <h2 className="max-w-2xl font-serif text-[clamp(2rem,5vw,3.4rem)] font-light leading-tight text-cream">
            Lassen Sie uns
            <br />
            etwas <em className="italic text-gold-bright">bauen</em>.
          </h2>
          <div className="mt-10">
            <Aufruf to="/#kontakt">Projekt anfragen</Aufruf>
          </div>
        </Block>
      </section>

      <Rueckweg
        text={
          <>
            <Link
              to="/webdesign-luebeck"
              className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold"
            >
              Webdesign in Lübeck
            </Link>{' '}
            ·{' '}
            <Link
              to="/3d-rundgaenge"
              className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold"
            >
              3D-Rundgänge
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
