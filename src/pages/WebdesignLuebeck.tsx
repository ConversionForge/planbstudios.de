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

// Eigenstaendige Seite fuer die Suche nach "Webdesign Luebeck".
//
// Seit November 2026 die dritte Leistung nach Automatisierung und
// Akquise-Strecken, und nicht mehr nur fuer Immobilien: Websites baut Plan B
// Studios fuer Betriebe allgemein, mit Maklern als einem Schwerpunkt. Die
// Startseite hat den Begriff "Webdesign Luebeck" deshalb an diese Seite
// abgegeben, damit sich die beiden nicht gegenseitig Konkurrenz machen.
//
// REGEL FUER DEN TEXT: Nichts behaupten, was sich nicht belegen laesst. Keine
// Kundenzahlen, keine Umsatzversprechen. Die beiden gezeigten Projekte sind
// ausdruecklich Beispielprojekte mit erfundenen Marken und werden so benannt.

const GRUNDSAETZE = [
  {
    n: '01',
    titel: 'Einzeln gebaut',
    text: 'Kein Baukasten, keine gekaufte Vorlage. Die Seite entsteht aus Ihrem Angebot, Ihrem Auftritt und der Frage, wen Sie erreichen wollen. Eine gekaufte Vorlage sieht aus wie tausend andere Seiten, die dieselbe Vorlage gekauft haben.',
  },
  {
    n: '02',
    titel: 'Eine Person, kein Weiterreichen',
    text: 'Sie sprechen mit dem, der die Seite baut: Bilal Gnielka. Kein Projektleiter zwischen Ihnen und der Umsetzung. Website, Akquise-Strecke und Automatisierung kommen aus derselben Hand.',
  },
  {
    n: '03',
    titel: 'Schnell und am Handy brauchbar',
    text: 'Auf üblichen Verbindungen unter einer Sekunde bis zum sichtbaren Inhalt. Eine Seite, die am Handy ruckelt oder erst lädt, verliert Besucher vor der ersten Zeile.',
  },
  {
    n: '04',
    titel: 'Cookiefrei, wo es geht',
    text: 'Diese Seite hier setzt keine Cookies und bindet kein fremdes Skript ein. Das hat einen praktischen Grund: kein Zustimmungsbanner, das den ersten Eindruck verdeckt.',
  },
]

const LEISTUNG = [
  'Aufbau und Gestaltung der gesamten Seite',
  'Texte gemeinsam erarbeitet, nicht von Ihnen geliefert',
  'Leistungen, Referenzen und ein klarer Weg zur Anfrage',
  'Impressum und Datenschutzerklärung technisch eingebunden',
  'Übergabe mit Zugang, damit Sie unabhängig bleiben',
]

export function WebdesignLuebeck() {
  return (
    <SeitenLayout titel="Webdesign in Lübeck: Websites für Betriebe — Plan B Studios">
      {/* Einstieg */}
      <section className="pb-20 pt-16 md:pb-28 md:pt-24">
        <motion.div variants={einblenden} initial={startVariante} animate="show">
          <Marke>WEBDESIGN · LÜBECK</Marke>
          <h1 className="font-serif text-[clamp(2.4rem,6.5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream [text-wrap:balance]">
            Websites für Betriebe in <em className="italic text-gold-bright">Lübeck</em>
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-cream-soft md:text-xl">
            Ich baue Websites für Betriebe in Lübeck und Schleswig-Holstein, mit
            einem Schwerpunkt auf Immobilienmaklern. Einzeln gebaut, ohne
            Baukasten und ohne gekaufte Vorlage.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
            Eine Website ist bei mir selten das Ende. Meist ist sie der Ort, an dem
            eine Akquise-Strecke beginnt oder eine Automatisierung ihre Angaben
            herbekommt. Deshalb baue ich sie so, dass beides später dazukommen
            kann, ohne dass die Seite neu gebaut werden muss.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Aufruf to={TERMIN_URL} neuesFenster>
              Erstgespräch buchen
            </Aufruf>
            <TextVerweis to="#beispiele">Beispielprojekte ansehen</TextVerweis>
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

      {/* Webagentur
          Der Begriff "webagentur luebeck" tauchte in der Search Console auf,
          allerdings mit nur zwei Impressionen in drei Monaten. Das ist kein
          Ranking, sondern Zufall. Der Abschnitt bleibt trotzdem, weil er eine
          Frage beantwortet, die ein Besucher ohnehin hat: Ist das hier eine
          Agentur? */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block>
          <Marke>WEBAGENTUR ODER NICHT</Marke>
          <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
            Was eine Webagentur leistet,
            <br />
            ohne <em className="italic text-gold-bright">Agentur</em> zu sein.
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
            <p className="text-base leading-relaxed text-cream-soft">
              Wer in Lübeck nach einer Webagentur sucht, ist hier richtig, auch
              wenn auf dem Schild etwas anderes steht. Den Leistungsumfang einer
              Agentur bekommen Sie: Konzept, Gestaltung, Umsetzung, Texte, die
              rechtlich nötige Einbindung, Übergabe mit Zugang.
            </p>
            <p className="text-base leading-relaxed text-stone">
              Was Sie nicht bekommen, ist der Apparat darum herum. Keinen
              Projektleiter, der weitergibt, was Sie gesagt haben. Keine
              Abstimmungsrunde zwischen drei Leuten, die Sie nie zu Gesicht
              bekommen. Und keine Rechnung, auf der die Abstimmung mit drauf
              steht.
            </p>
          </div>
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
              Was nicht dabei ist, sage ich vorher und nicht als Nachtrag auf der
              Rechnung. Eine Website ist in der Regel in drei bis fünf Wochen
              online.
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
      <section id="beispiele" className="scroll-mt-28 border-t border-night-line py-20 md:py-28">
        <Block>
          <Marke>ZWEI BEISPIELPROJEKTE</Marke>
          <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
            Vollständig gebaut,
            <br />
            zum <em className="italic text-gold-bright">Durchklicken</em>.
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-stone">
            Beide Marken sind erfunden, es sind keine Kundenprojekte. Sie zeigen,
            wie eine fertige Seite von mir aussieht. Sie können sie anklicken und
            durchsehen wie eine echte.
          </p>
        </Block>

        <Block gestaffelteKinder className="mt-14 grid gap-6 md:grid-cols-2">
          {[
            {
              zu: '/meridian/',
              tag: 'NEUBAUQUARTIER',
              titel: 'MERIDIAN',
              text: 'Ein Wohnquartier an der Trave. Grundrisse, die sich beim Scrollen zeichnen, Wohnungstypen als Tabelle, Lage mit Entfernungen.',
            },
            {
              zu: '/beispiel/',
              tag: 'MAKLERBÜRO',
              titel: 'Havel & Grau',
              text: 'Ein Maklerbüro in Potsdam. Ruhige Schrift, Objekte im Mittelpunkt, kurzer Weg zur Anfrage.',
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
            Einschätzung dazu, woran es gerade hakt. Buchen Sie ein Erstgespräch
            oder schreiben Sie mir, ich melde mich in der Regel innerhalb von 24
            Stunden an Werktagen.
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
