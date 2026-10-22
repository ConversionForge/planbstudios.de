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
// 1. Suche nach dem Namen "Bilal Gnielka". Der Name stand vorher nur im
//    Impressum und in den strukturierten Daten, nirgends als eigene Seite.
// 2. Die Signale, die Google unter E-E-A-T zusammenfasst: eine benannte,
//    auffindbare Person hinter der Arbeit, mit nachpruefbarem Profil.
//
// ---------------------------------------------------------------------------
// DER TEXT STAMMT VOM INHABER SELBST.
//
// Er hat ihn im Wortlaut geliefert. Hier wird er umgesetzt, nicht umgeschrieben:
// Es ist seine Biografie und seine Stimme. Angaben, die er nicht gemacht hat,
// stehen auch nicht drin — insbesondere nicht, wie er zu Immobilien gekommen
// ist.
//
// Das Portraitfoto reicht er nach. Es ist das staerkste Einzelsignal dieser
// Seite, fuer Vertrauen wie fuer die Bildsuche.
// ---------------------------------------------------------------------------

/** Hervorgehobener Satz zwischen den Absaetzen. Setzt Takt in einen langen Text. */
function Merksatz({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-8 border-l-2 border-gold/50 pl-6 font-serif text-[clamp(1.15rem,2.2vw,1.45rem)] font-light leading-snug text-cream">
      {children}
    </p>
  )
}

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

          <p className="mt-10 max-w-2xl font-serif text-[clamp(1.3rem,2.6vw,1.75rem)] font-light leading-snug text-cream">
            Ich wollte nie einfach nur für andere arbeiten. Ich wollte etwas
            Eigenes aufbauen.
          </p>

          <div className="mt-10 max-w-2xl">
            <p className="text-base leading-relaxed text-cream-soft md:text-lg">
              Ich baue Websites und begehbare 3D-Rundgänge für Immobilien. Plan
              B Studios ist mein Studio in Lübeck, ein Ein-Personen-Unternehmen,
              und das ist Absicht.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Bei mir steht nicht erst ein Vertrieb, dann ein Projektleiter und
              schließlich ein Designer. Wenn Sie anfragen, sprechen Sie mit der
              Person, die anschließend auch die Arbeit macht. Vom ersten
              Gespräch bis zur fertigen Seite.
            </p>
            <Merksatz>Kurze Wege. Klare Verantwortung.</Merksatz>
          </div>
        </motion.div>
      </section>

      {/* Der Anfang */}
      <section className="border-t border-night-line py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <Block>
            <Marke>DER ANFANG</Marke>
            <h2 className="font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
              Angemeldet an dem Tag,
              <br />
              an dem ich <em className="italic text-gold-bright">durfte</em>.
            </h2>
          </Block>

          <Block>
            <p className="text-base leading-relaxed text-cream-soft md:text-lg">
              Mit dreizehn stand für mich fest, dass ich etwas Eigenes machen
              will. Nicht als Plan für irgendwann, sondern als Ziel, das mich
              seitdem begleitet.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Die Idee zu Plan B Studios gibt es seit zwei bis drei Jahren. Ich
              habe Konzepte entwickelt und daran gearbeitet, aus einer
              Vorstellung etwas Konkretes zu machen. Es fehlte nicht der Wille.
              Es fehlte das Alter.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Am 15. Juli 2026, meinem achtzehnten Geburtstag, habe ich die
              Firma angemeldet. Nicht irgendwann, wenn alles perfekt vorbereitet
              ist. An dem ersten Tag, an dem ich es durfte.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Nebenher mache ich mein Abitur.
            </p>
            <Merksatz>
              Man muss nicht warten, bis man sich bereit fühlt. Man muss bereit
              sein anzufangen, dazuzulernen und für das geradezustehen, was man
              abliefert.
            </Merksatz>
          </Block>
        </div>
      </section>

      {/* Was das heisst
          Hier lagen vorher zwei Abschnitte, die dieselbe Aussage gebracht
          haben ("Was das fuer Sie bedeutet" und "Mein Anspruch"). Zusammengelegt
          traegt sie einmal und dafuer deutlich. */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block>
          <Marke>WAS DAS FÜR SIE HEISST</Marke>
          <h2 className="max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
            Ich habe einen Namen,
            <br />
            den ich mir erst <em className="italic text-gold-bright">verdienen</em> muss.
          </h2>
        </Block>

        <Block gestaffelteKinder className="mt-12 grid gap-x-16 gap-y-6 md:grid-cols-2">
          <motion.div variants={einblenden}>
            <p className="text-base leading-relaxed text-cream-soft md:text-lg">
              Ich werde Ihnen nicht erzählen, dass ich auf zehn Jahre Erfahrung
              und hunderte abgeschlossene Projekte zurückblicke. Das wäre nicht
              wahr. Plan B Studios steht am Anfang.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Für Sie heißt das zweierlei. Sie reihen sich nicht hinter einem
              Kundenstamm ein, den ich nebenher mitbediene. Und es gibt keine
              Distanz zwischen dem, was Ihnen zugesagt wird, und dem, was
              gebaut wird, weil beides von derselben Person kommt.
            </p>
            <Merksatz>
              Ihr Projekt ist für mich nicht ein Auftrag mehr. Es ist ein Teil
              des Rufs, den ich mir gerade aufbaue.
            </Merksatz>
          </motion.div>

          <motion.div variants={einblenden}>
            <p className="text-base leading-relaxed text-stone">
              Eine Agentur mit zweihundert Projekten übersteht eine schlechte
              Arbeit. Ich nicht. Entscheiden Sie sich deshalb nicht für mich,
              weil ich behaupte, der Beste zu sein. Entscheiden Sie sich, wenn
              meine Arbeit und der Umgang damit dafür sprechen.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Ich verspreche Ihnen nicht, dass immer alles auf Anhieb sitzt. Ich
              verspreche Ihnen, dass ich Probleme anspreche statt sie zu
              verstecken, und dass ich nicht halb arbeite.
            </p>
            <Merksatz>Nicht größer wirken. Besser werden.</Merksatz>
          </motion.div>
        </Block>
      </section>

      {/* Warum beides */}
      <section className="border-t border-night-line py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <Block>
            <Marke>WARUM BEIDES</Marke>
            <h2 className="font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
              Eine Immobilie ist mehr
              <br />
              als eine Sammlung von <em className="italic text-gold-bright">Bildern</em>.
            </h2>
          </Block>

          <Block>
            <p className="text-base leading-relaxed text-cream-soft md:text-lg">
              Die Website entscheidet, ob jemand bleibt. Sie ist meist der erste
              Kontakt und bestimmt, welchen Eindruck ein Objekt hinterlässt.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Der Rundgang entscheidet, ob jemand sich das Objekt vorstellen
              kann. Er lässt Interessenten selbst durch die Räume gehen,
              Zusammenhänge erfassen und sich eine Meinung bilden, bevor der
              erste Termin steht.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Getrennt vergeben heißt in der Praxis: Jeder wartet auf den
              anderen, die Übergabe passt nicht, und am Ende ist niemand
              zuständig. Deshalb mache ich beides. Nicht weil es bequemer ist,
              sondern weil es sonst nicht zusammengeht.
            </p>
          </Block>
        </div>
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
          <h2 className="max-w-3xl font-serif text-[clamp(2rem,5vw,3.4rem)] font-light leading-tight text-cream">
            Ein Projekt beginnt
            <br />
            mit einem <em className="italic text-gold-bright">Gespräch</em>.
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-stone md:text-lg">
            Vielleicht wollen Sie ein Objekt begehbar machen. Vielleicht braucht
            Ihre Firma eine Seite, die zeigt, was sie kann. Vielleicht haben Sie
            eine Idee und noch keinen Weg dorthin.
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-stone">
            Erzählen Sie mir davon. Ich will verstehen, was Sie erreichen
            wollen, bevor ich etwas vorschlage.
          </p>
          <p className="mt-8 max-w-xl font-serif text-[clamp(1.15rem,2.2vw,1.45rem)] font-light leading-snug text-cream">
            Ich bin Bilal Gnielka. Ich baue Plan B Studios auf. Und ich freue
            mich darauf, zu zeigen, was daraus werden kann.
          </p>
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
              to="/website-betreuung"
              className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold"
            >
              Betreuung & Automatisierung
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
