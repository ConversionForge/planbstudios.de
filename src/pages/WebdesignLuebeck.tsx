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

// Eigenstaendige Seite fuer die Suche nach "Webdesign Lübeck" und
// "Website für Makler". Bewusst enger gefasst als die Startseite: Die
// Startseite stellt das Studio vor, diese Seite eine Leistung.
//
// REGEL FUER DEN TEXT: Nichts behaupten, was sich nicht belegen laesst. Keine
// Kundenzahlen, keine Umsatzversprechen. Die beiden gezeigten Projekte sind
// ausdruecklich Beispielprojekte und werden auch so benannt.

const GRUNDSAETZE = [
  {
    n: '01',
    titel: 'Einzeln gebaut',
    text: 'Kein Baukasten, keine gekaufte Vorlage. Die Seite entsteht aus Ihrer Marke, Ihren Objekten und der Frage, wen Sie erreichen wollen. Wer eine Vorlage kauft, bekommt eine Seite, die es schon tausendmal gibt — in einer Branche, in der der erste Eindruck über den Preis mitentscheidet.',
  },
  {
    n: '02',
    titel: 'Eine Person, kein Weiterreichen',
    text: 'Sie sprechen mit dem, der die Seite baut: Bilal Gnielka. Kein Projektleiter zwischen Ihnen und der Umsetzung, keine Abstimmungsrunde zwischen Agentur und Fotograf. Website und 3D-Rundgang kommen aus derselben Hand.',
  },
  {
    n: '03',
    titel: 'Schnell und am Handy brauchbar',
    text: 'Auf üblichen Verbindungen unter einer Sekunde bis zum sichtbaren Inhalt. Die meisten Immobiliensuchen laufen am Handy — eine Seite, die dort ruckelt oder erst lädt, verliert den Interessenten vor der ersten Zeile.',
  },
  {
    n: '04',
    titel: 'Cookiefrei, wo es geht',
    text: 'Diese Seite hier setzt keine Cookies und bindet kein fremdes Skript ein. Das ist keine Ideologie, sondern praktisch: kein Zustimmungsbanner, das den ersten Eindruck verdeckt, und keine Diskussion über Auftragsverarbeitung.',
  },
]

const LEISTUNG = [
  'Aufbau und Gestaltung der gesamten Seite',
  'Texte gemeinsam erarbeitet, nicht von Ihnen geliefert',
  'Objektdarstellung, Referenzen, Kontaktstrecke',
  'Impressum und Datenschutzerklärung technisch eingebunden',
  'Übergabe mit Zugang, damit Sie unabhängig bleiben',
]

export function WebdesignLuebeck() {
  return (
    <SeitenLayout
      titel="Webdesign für Immobilien in Lübeck — Plan B Studios"
      aktion={{ text: 'Anfragen', zu: '/#kontakt' }}
    >
      {/* Einstieg */}
      <section className="pb-20 pt-20 md:pb-28 md:pt-28">
        <motion.div variants={einblenden} initial={startVariante} animate="show">
          <Marke>WEBDESIGN · LÜBECK</Marke>
          <h1 className="font-serif text-[clamp(2.4rem,6.5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream">
            Websites für
            <br />
            <em className="italic text-gold-bright">Immobilien</em>.
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-cream-soft md:text-xl">
            Ich baue Websites für Makler, Hausverwaltungen und Bauträger — aus
            Lübeck, einzeln gebaut, ohne Baukasten und ohne Vorlage.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
            Ein Objekt für 1,5 Millionen, präsentiert wie ein Möbelhausprospekt:
            Das ist der Normalfall in dieser Branche. Die meisten Makler- und
            Bauträgerseiten sehen aus wie tausend andere, obwohl der erste Klick
            darüber mitentscheidet, ob jemand anruft.
          </p>
          <div className="mt-10">
            <Aufruf to="/#kontakt">Projekt anfragen</Aufruf>
          </div>
        </motion.div>
      </section>

      {/* Grundsaetze */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block>
          <Marke>WIE ICH ARBEITE</Marke>
          <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
            Vier Dinge, auf die ich
            <br />
            mich <em className="italic text-gold-bright">festlege</em>.
          </h2>
        </Block>

        <Block gestaffelteKinder className="mt-14 grid gap-6 md:grid-cols-2">
          {GRUNDSAETZE.map((g) => (
            <motion.div key={g.n} variants={einblenden}>
              <Karte className="h-full">
                <span className="font-mono text-[12px] tracking-[0.2em] text-gold">{g.n}</span>
                <h3 className="mb-4 mt-4 font-serif text-2xl font-light text-cream">
                  {g.titel}
                </h3>
                <p className="text-[15px] leading-relaxed text-stone md:text-base">{g.text}</p>
              </Karte>
            </motion.div>
          ))}
        </Block>
      </section>

      {/* Umfang */}
      <section className="border-t border-night-line py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <Block>
            <Marke>WAS DABEI IST</Marke>
            <h2 className="font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
              Eine Seite,
              <br />
              nicht ein <em className="italic text-gold-bright">Bausatz</em>.
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-stone">
              Was nicht dabei ist, sage ich vorher — nicht als Nachtrag auf der
              Rechnung.
            </p>
          </Block>

          <Block gestaffelteKinder>
            <ul className="flex flex-col">
              {LEISTUNG.map((l) => (
                <motion.li
                  key={l}
                  variants={einblenden}
                  className="flex items-start gap-4 border-t border-night-line py-5 text-[15px] leading-relaxed text-cream-soft md:text-base"
                >
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {l}
                </motion.li>
              ))}
            </ul>
          </Block>
        </div>
      </section>

      {/* Beispiele */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block>
          <Marke>ZWEI BEISPIELPROJEKTE</Marke>
          <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
            Vollständig gebaut,
            <br />
            hier <em className="italic text-gold-bright">begehbar</em>.
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-stone">
            Beides sind Arbeiten aus dem Studio, keine Kundenprojekte. Sie
            zeigen, wie eine fertige Seite aussieht — Sie können sie anklicken
            und durchsehen wie eine echte.
          </p>
        </Block>

        <Block gestaffelteKinder className="mt-14 grid gap-6 md:grid-cols-2">
          {[
            {
              zu: '/beispiel',
              tag: 'MAKLERBÜRO',
              titel: 'Havel & Grau',
              text: 'Ein Maklerbüro in Potsdam. Ruhige Typografie, Objekte im Mittelpunkt, klarer Weg zur Anfrage.',
            },
            {
              zu: '/meridian',
              tag: 'NEUBAUPROJEKT',
              titel: 'MERIDIAN',
              text: 'Ein Wohnquartier an der Trave. Architektonisch gedacht, mit Grundrissen und Bauabschnitten.',
            },
          ].map((b) => (
            <motion.div key={b.titel} variants={einblenden}>
              <Link to={b.zu} className="group block h-full">
                <Karte className="h-full transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:ring-gold/30">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-gold">{b.tag}</span>
                  <h3 className="mb-4 mt-4 font-serif text-2xl font-light text-cream">
                    {b.titel}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-stone">{b.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[14px] text-cream-soft transition-colors group-hover:text-gold">
                    Ansehen
                    <span aria-hidden className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Karte>
              </Link>
            </motion.div>
          ))}
        </Block>
      </section>

      {/* Handlungsaufruf */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block className="flex flex-col items-start">
          <Marke>ANFRAGEN</Marke>
          <h2 className="max-w-2xl font-serif text-[clamp(2rem,5vw,3.4rem)] font-light leading-tight text-cream">
            Was haben Sie
            <br />
            <em className="italic text-gold-bright">vor</em>?
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-stone md:text-lg">
            Eine neue Seite, ein Umbau der bestehenden oder erst einmal eine
            Einschätzung dazu, woran es gerade hakt. Schreiben Sie mir, ich melde
            mich in der Regel innerhalb von 24 Stunden an Werktagen.
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
            Plan B Studios baut außerdem begehbare Rundgänge für Immobilien.{' '}
            <Link
              to="/3d-rundgaenge"
              className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold"
            >
              3D-Rundgänge
            </Link>{' '}
            ·{' '}
            <Link
              to="/ueber-mich"
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
