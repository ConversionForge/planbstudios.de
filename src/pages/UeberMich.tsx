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
              Ich entwickle Websites und digitale Erlebnisse, die Immobilien
              nicht nur präsentieren, sondern sie erlebbar machen. Mit Plan B
              Studios verbinde ich Webdesign mit begehbaren 3D-Rundgängen, mit
              dem Anspruch, aus einer ersten Begegnung einen bleibenden Eindruck
              zu machen.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Plan B Studios ist mein eigenes Studio in Lübeck. Ein
              Ein-Personen-Unternehmen. Bewusst.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Denn hinter jedem Projekt steht bei mir nicht erst ein Vertrieb,
              dann ein Projektmanager und schließlich ein Designer. Wenn Sie
              mich kontaktieren, sprechen Sie direkt mit der Person, die Ihre
              Vorstellungen versteht, Entscheidungen trifft und die Arbeit
              umsetzt. Vom ersten Gespräch bis zum fertigen Ergebnis.
            </p>
            <Merksatz>
              Kurze Wege. Klare Verantwortung. Ein persönlicher Anspruch, der
              nicht mit der Übergabe an jemand anderen endet.
            </Merksatz>
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
              Mit dreizehn wusste ich, dass ich eines Tages mein eigenes
              Unternehmen führen wollte. Nicht als vage Vorstellung für
              irgendwann, sondern als Ziel, das mich über Jahre begleitet hat.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Die Idee hinter Plan B Studios entstand bereits zwei bis drei
              Jahre vor der Gründung. Ich habe mich mit Möglichkeiten
              beschäftigt, Konzepte entwickelt und daran gearbeitet, aus einer
              Vorstellung etwas Konkretes zu machen. Es fehlte nicht der Wille.
              Es fehlte schlicht das Alter.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Also stand für mich fest: Sobald ich gründen darf, tue ich es.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Am 15. Juli 2026, meinem achtzehnten Geburtstag, habe ich mein
              Unternehmen angemeldet. Nicht irgendwann, wenn alle Voraussetzungen
              perfekt sind. Nicht erst, wenn jeder Schritt risikofrei erscheint.
              Sondern an dem ersten Tag, an dem ich es selbst in die Hand nehmen
              konnte.
            </p>
            <Merksatz>
              Für mich war das kein spontaner Entschluss. Es war der Startschuss
              für etwas, auf das ich jahrelang hingearbeitet hatte.
            </Merksatz>
            <p className="mt-8 text-base leading-relaxed text-stone">
              Heute baue ich Plan B Studios auf und mache parallel mein Abitur.
              Beides verlangt Disziplin, Organisation und die Bereitschaft,
              Verantwortung zu übernehmen. Ich sehe darin keinen Widerspruch. Im
              Gegenteil: Ich möchte nicht erst irgendwann anfangen, das
              umzusetzen, was ich mir vorgenommen habe.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Ich glaube daran, dass man nicht warten muss, bis man sich bereit
              fühlt. Man muss bereit sein, anzufangen, dazuzulernen und die
              Verantwortung für das zu übernehmen, was man abliefert.
            </p>
          </Block>
        </div>
      </section>

      {/* Was das bedeutet */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block>
          <Marke>WAS DAS FÜR SIE BEDEUTET</Marke>
          <h2 className="max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
            Ich habe einen Namen,
            <br />
            den ich mir erst <em className="italic text-gold-bright">verdienen</em> muss.
          </h2>
        </Block>

        <Block gestaffelteKinder className="mt-12 grid gap-x-16 gap-y-6 md:grid-cols-2">
          <motion.div variants={einblenden}>
            <p className="text-base leading-relaxed text-cream-soft md:text-lg">
              Ich werde Ihnen nicht erzählen, dass ich auf jahrzehntelange
              Erfahrung und Hunderte abgeschlossene Projekte zurückblicke. Das
              wäre nicht ehrlich. Plan B Studios steht am Anfang seiner
              unternehmerischen Geschichte, und genau deshalb nehme ich meinen
              eigenen Anspruch besonders ernst.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Ich habe keinen riesigen Kundenstamm, hinter dem sich Ihr Projekt
              einreihen muss. Keine langen internen Abstimmungen, keine
              wechselnden Ansprechpartner und keine Distanz zwischen dem, was
              Ihnen versprochen wird, und dem, was tatsächlich umgesetzt wird.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Stattdessen bekommen Sie meine unmittelbare Aufmerksamkeit,
              direkte Kommunikation und jemanden, der sich persönlich mit Ihrem
              Projekt auseinandersetzt.
            </p>
          </motion.div>

          <motion.div variants={einblenden}>
            <p className="text-base leading-relaxed text-stone">
              Mir ist bewusst, dass Vertrauen nicht durch schöne Worte entsteht.
              Es entsteht dadurch, dass man zuhört, Zusagen einhält, Probleme
              offen anspricht und am Ende eine Arbeit abliefert, hinter der man
              stehen kann.
            </p>
            <Merksatz>
              Ihr Projekt ist für mich nicht einfach ein weiterer Auftrag. Es
              ist ein Teil des Rufs, den ich mir mit Plan B Studios aufbaue.
            </Merksatz>
            <p className="mt-8 text-base leading-relaxed text-stone">
              Eine etablierte Agentur hat möglicherweise bereits einen Namen,
              der über viele Jahre gewachsen ist. Ich baue meinen gerade auf.
              Deshalb möchte ich nicht, dass Sie sich für mich entscheiden, weil
              ich behaupte, der Beste zu sein. Ich möchte, dass Sie sich für mich
              entscheiden können, weil meine Arbeit, meine Kommunikation und mein
              Umgang mit Ihrem Projekt dafür sprechen.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Ich kann Ihnen nicht versprechen, dass auf Anhieb immer alles
              perfekt läuft. Was ich Ihnen versprechen möchte, ist, dass ich mich
              mit dem Anspruch an die Arbeit mache, eine Lösung zu finden,
              Probleme nicht zu verstecken und Ihr Projekt nicht halbherzig zu
              behandeln.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Denn am Ende zählt nicht, wie groß ein Unternehmen aussieht.
              Sondern was es für seine Kunden leistet.
            </p>
          </motion.div>
        </Block>
      </section>

      {/* Warum beides */}
      <section className="border-t border-night-line py-20 md:py-28">
        <Block>
          <Marke>WARUM WEBDESIGN UND 3D-RUNDGÄNGE</Marke>
          <h2 className="max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
            Eine Immobilie sollte mehr sein
            <br />
            als eine Sammlung von <em className="italic text-gold-bright">Bildern</em>.
          </h2>
        </Block>

        <Block gestaffelteKinder className="mt-12 grid gap-x-16 gap-y-6 md:grid-cols-2">
          <motion.div variants={einblenden}>
            <p className="text-base leading-relaxed text-cream-soft md:text-lg">
              Eine Website und ein begehbarer 3D-Rundgang erfüllen
              unterschiedliche Aufgaben. Richtig miteinander verbunden, können
              sie jedoch ein deutlich vollständigeres Bild einer Immobilie
              vermitteln.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Die Website ist häufig der erste Kontaktpunkt. Sie entscheidet mit
              darüber, welchen Eindruck ein Objekt hinterlässt, welche
              Informationen Interessenten finden und ob sie sich näher damit
              beschäftigen möchten.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Der 3D-Rundgang geht einen Schritt weiter. Er ermöglicht es
              Interessenten, Räume aus eigener Perspektive zu erkunden, sich
              räumliche Zusammenhänge besser vorzustellen und sich bereits vor
              einer Besichtigung intensiver mit dem Objekt auseinanderzusetzen.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Aus einzelnen Bildern wird ein räumlicher Eindruck. Aus einer
              gewöhnlichen Präsentation wird eine Erfahrung, bei der
              Interessenten selbst entscheiden, wohin sie schauen und welchen
              Bereich sie als Nächstes erkunden möchten.
            </p>
          </motion.div>

          <motion.div variants={einblenden}>
            <Merksatz>
              Technologie nicht einfach einzusetzen, weil sie modern ist, sondern
              weil sie Menschen helfen kann, etwas besser zu verstehen und zu
              erleben.
            </Merksatz>
            <p className="mt-8 text-base leading-relaxed text-stone">
              Warum also beide Leistungen getrennt betrachten, wenn sie gemeinsam
              ein stimmiges Gesamtbild schaffen können?
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Wenn Website und Rundgang aufeinander abgestimmt sind, lassen sich
              Gestaltung, Informationen und visuelle Präsentation miteinander
              verbinden. Das schafft einen konsistenten Auftritt und vermeidet
              unnötige Abstimmungen zwischen mehreren Dienstleistern.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Ich möchte nicht einfach eine weitere Website erstellen oder einen
              Rundgang produzieren, der für sich allein steht. Mein Ziel ist es,
              digitale Präsentationen zu entwickeln, bei denen die einzelnen
              Bestandteile sinnvoll ineinandergreifen.
            </p>
          </motion.div>
        </Block>
      </section>

      {/* Mein Anspruch */}
      <section className="border-t border-night-line py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <Block>
            <Marke>MEIN ANSPRUCH</Marke>
            <h2 className="font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
              Nicht größer wirken.
              <br />
              <em className="italic text-gold-bright">Besser</em> werden.
            </h2>
          </Block>

          <Block>
            <p className="text-base leading-relaxed text-cream-soft md:text-lg">
              Ich stehe mit Plan B Studios am Anfang einer langen Reise. Ich habe
              noch viel zu lernen, neue Herausforderungen vor mir und einen Namen
              aufzubauen, der irgendwann für eine bestimmte Qualität stehen soll.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Genau das motiviert mich.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Ich möchte mich nicht auf dem ausruhen, was ich heute kann. Ich
              möchte neue Techniken verstehen, bessere Lösungen entwickeln und
              mit jedem Projekt dazulernen. Nicht, um möglichst viele Leistungen
              auf eine Website schreiben zu können, sondern um meinen Kunden mit
              der Zeit noch mehr bieten zu können.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Dabei ist mir wichtig, dass die Zusammenarbeit genauso überzeugend
              ist wie das Ergebnis: ehrlich, unkompliziert und auf Augenhöhe.
            </p>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Ich glaube nicht, dass jedes Projekt kompliziert sein muss, um gut
              zu werden. Ich glaube aber, dass hinter jeder guten Arbeit klare
              Gedanken, Sorgfalt und ein echter Anspruch stehen sollten.
            </p>
            <Merksatz>
              Plan B Studios soll nicht durch große Versprechen wachsen, sondern
              durch Arbeit, die für sich selbst spricht.
            </Merksatz>
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
            Vielleicht möchten Sie Ihre Immobilie digital erlebbar machen.
            Vielleicht braucht Ihr Unternehmen eine Website, die professioneller
            auftritt und Ihre Leistungen verständlich vermittelt. Oder Sie haben
            eine Idee, für die Sie noch den richtigen Ansatz suchen.
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-stone">
            Was auch immer Sie vorhaben: Erzählen Sie mir davon. Ich möchte
            verstehen, was Sie erreichen wollen, was Ihnen wichtig ist und welche
            Lösung wirklich zu Ihrem Vorhaben passt. Daraus entwickeln wir
            gemeinsam den nächsten Schritt, direkt, persönlich und ohne unnötige
            Umwege.
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
