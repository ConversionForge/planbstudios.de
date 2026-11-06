import { Link } from 'react-router-dom'
import { CubeMark } from '../Logo'
import { Aufruf, Block, Marke } from '../SeitenLayout'
import { EMAIL, TELEFON, TELEFON_ANZEIGE, TERMIN_URL } from '../../lib/kontakt'

// Abschluss der Startseite. Der Hauptaufruf ist jetzt die Terminbuchung statt
// einer E-Mail-Adresse: Ein Klick, und das Gespraech steht im Kalender.
// E-Mail und Telefon bleiben fuer alle, die nicht buchen wollen.

export function Kontakt() {
  return (
    <section id="kontakt" className="relative overflow-hidden border-t border-night-line/60 py-32 md:py-40">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <CubeMark className="h-[62vh] w-[62vh] text-gold/[0.07]" strokeWidth={0.4} />
      </div>

      <Block className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <Marke>KONTAKT</Marke>
        <h2 className="font-serif text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1.04] tracking-[-0.015em] text-cream [text-wrap:balance]">
          Was läuft bei Ihnen gerade <em className="italic text-gold-bright">von Hand</em>?
        </h2>
        <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-stone md:text-lg">
          Erzählen Sie es mir in einem Erstgespräch von fünfzehn Minuten. Danach
          wissen Sie, was sich automatisieren lässt und was den Aufwand nicht wert
          ist.
        </p>

        <div className="mt-12">
          <Aufruf to={TERMIN_URL} neuesFenster>
            Erstgespräch buchen
          </Aufruf>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-2 text-[15px]">
          <a
            href={`mailto:${EMAIL}`}
            className="py-2 text-cream-soft underline-offset-4 transition-colors hover:text-gold-bright hover:underline"
          >
            {EMAIL}
          </a>
          <a
            href={`tel:${TELEFON}`}
            className="py-2 text-cream-soft underline-offset-4 transition-colors hover:text-gold-bright hover:underline"
          >
            {TELEFON_ANZEIGE}
          </a>
        </div>

        <p className="mt-8 max-w-md text-[14px] leading-relaxed text-stone">
          Lieber schriftlich?{' '}
          <Link
            to="/automatisierung/#einschaetzung"
            className="text-cream-soft underline decoration-night-line underline-offset-4 transition-colors hover:text-gold-bright hover:decoration-gold"
          >
            Schicken Sie mir bis zu drei Abläufe
          </Link>
          , ich antworte persönlich.
        </p>
      </Block>
    </section>
  )
}
