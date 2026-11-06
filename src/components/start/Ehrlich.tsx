import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Block, Marke, einblenden, gestaffelt } from '../SeitenLayout'
import { startVariante } from '../../lib/ssr'

// "Was ich Ihnen nicht verspreche" — steht dort, wo sonst Referenzen stuenden.
//
// Stand November 2026 gibt es noch keinen Kunden, der genannt werden kann
// (siehe src/inhalte/referenzen.ts). Statt das zu verstecken oder Beispiele
// als Kunden auszugeben, sagt die Seite es selbst. Die drei Punkte stammen
// aus der Praesentation des Inhabers (Folie "Ehrlichkeit") und sind nur fuer
// alle Leistungen statt nur fuer Makler formuliert.
//
// Sobald es eine freigegebene Referenz gibt, erscheint der Abschnitt
// "Referenzen" zusaetzlich. Dieser hier darf trotzdem bleiben: Er beantwortet
// den Einwand, den jeder Betrieb nach dem dritten Anbieteranruf hat.

const PUNKTE = [
  {
    titel: 'Keine Zahl vorab',
    text: 'Wie viel Zeit eine Automatisierung spart oder wie viele Aufträge eine Akquise-Strecke bringt, hängt an Ihrem Betrieb, Ihrem Markt und Ihrem Team. Wer Ihnen vorher eine Zahl nennt, rät. Ich messe es, sobald es läuft.',
  },
  {
    titel: 'Kein Ergebnis in Woche eins',
    text: 'Sichtbarkeit bei Google braucht Monate. Und eine neue Automatisierung läuft erst eine Weile neben der gewohnten Arbeit, bevor sie diese ersetzt.',
  },
  {
    titel: 'Keine erfundenen Referenzen',
    text: 'Ich baue Plan B Studios gerade auf. Ich zeige Ihnen, was ich kann, und sage Ihnen, wo ich noch lerne.',
  },
]

export function Ehrlich() {
  return (
    <section className="relative border-t border-night-line/60 py-28 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20 lg:px-10">
        <Block>
          <Marke>EHRLICH GESAGT</Marke>
          <h2 className="font-serif text-[clamp(2.2rem,4.8vw,4rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream [text-wrap:balance]">
            Was ich Ihnen <em className="italic text-gold-bright">nicht</em> verspreche
          </h2>
          <p className="mt-8 max-w-sm font-serif text-[clamp(1.15rem,2vw,1.4rem)] font-light leading-snug text-cream-soft">
            Alles, was ich zusage, steht im Vertrag. Alles andere sage ich nicht zu.
          </p>
        </Block>

        <div>
          <motion.ol
            variants={gestaffelt}
            initial={startVariante}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="border-b border-night-line"
          >
            {PUNKTE.map((p, i) => (
              <motion.li
                key={p.titel}
                variants={einblenden}
                className="grid gap-3 border-t border-night-line py-8 sm:grid-cols-[3rem_1fr] sm:gap-6"
              >
                <span className="font-mono text-[12px] tracking-[0.2em] text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-serif text-[1.6rem] font-light leading-tight text-cream">{p.titel}</h3>
                  <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-stone">{p.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          <Block className="mt-10">
            <p className="max-w-xl text-[15px] leading-relaxed text-stone">
              Was ich kann, sehen Sie am schnellsten am{' '}
              <Link
                to="/akquise-check/"
                className="text-cream-soft underline decoration-night-line underline-offset-4 transition-colors hover:text-gold-bright hover:decoration-gold"
              >
                Akquise-Check
              </Link>
              : Er ist selbst eine Akquise-Strecke, mit Formular, Benachrichtigung,
              Bestätigung und Terminbuchung.
            </p>
          </Block>
        </div>
      </div>
    </section>
  )
}
