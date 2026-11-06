import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Aufruf, Block, Marke, TextVerweis, einblenden, gestaffelt } from '../SeitenLayout'
import { startVariante } from '../../lib/ssr'

// Das Akquise-System fuer Makler, sichtbar auf der Startseite.
//
// Vorher war es ein schmales Band zwischen "Studio" und FAQ, ohne eigenen
// Platz in der Navigation. So versteckt, dass ein Gutachter die ganze Seite
// durchgesehen hat, ohne es zu bemerken. Jetzt hat es einen eigenen,
// abgesetzten Abschnitt mit dem Akquise-Check als Hauptaufruf.
//
// Die vier Bausteine entsprechen der Seite /makler/mehr-eigentuemeranfragen/.
// Wer dort etwas aendert, zieht es hier nach.

const BAUSTEINE = [
  {
    n: '01',
    titel: 'Situationsseiten',
    text: 'Eine Seite je Lage, in der ein Eigentümer steckt, etwa ein geerbtes Haus. Wer nach genau dieser Frage sucht, landet bei Ihnen statt auf einem Portal.',
  },
  {
    n: '02',
    titel: 'Bewertungsstrecke',
    text: 'Eine Frage pro Schritt, mit Fortschrittsanzeige. Der Einstieg bleibt leicht, und die Angaben sind am Ende trotzdem vollständig.',
  },
  {
    n: '03',
    titel: 'Nachfassen',
    text: 'Wer die Strecke abschließt, aber keinen Termin bucht, bekommt eine kurze Folge von Nachrichten. Mit Einwilligung und Abmeldelink.',
  },
  {
    n: '04',
    titel: 'Messung',
    text: 'Sie sehen, an welchem Schritt Eigentümer aussteigen. Genau dort wird nachgebessert, statt überall ein bisschen.',
  },
]

export function Makler() {
  return (
    <section id="makler" className="relative border-t border-night-line/60 bg-night-soft py-28 md:py-36">
      {/* Feine Goldkante oben: Der Abschnitt soll sich vom Rest absetzen. */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-20">
          <Block>
            <Marke>FÜR IMMOBILIENMAKLER</Marke>
            <h2 className="font-serif text-[clamp(2.2rem,4.8vw,4rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream [text-wrap:balance]">
              Eigentümer suchen online, <em className="italic text-gold-bright">bevor</em> sie
              einen Makler anrufen.
            </h2>
          </Block>
          <Block>
            <p className="text-[17px] leading-relaxed text-cream-soft md:text-lg">
              Wer in dieser Phase nicht auftaucht, wird später nicht angerufen.
              Ich baue Maklern die Strecke, über die Eigentümer anfragen: von der
              Seite, die bei Google zu ihrer Frage erscheint, bis zum gebuchten
              Termin.
            </p>
          </Block>
        </div>

        {/* Haarlinien-Raster statt vier einzelner Karten */}
        <motion.ol
          variants={gestaffelt}
          initial={startVariante}
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid gap-px overflow-hidden rounded-[1.6rem] bg-night-line ring-1 ring-night-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {BAUSTEINE.map((b) => (
            <motion.li key={b.n} variants={einblenden} className="bg-night-soft p-8 md:p-9">
              <span className="font-mono text-[12px] tracking-[0.2em] text-gold">{b.n}</span>
              <h3 className="mt-6 font-serif text-[1.6rem] font-light leading-tight text-cream">
                {b.titel}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-stone">{b.text}</p>
            </motion.li>
          ))}
        </motion.ol>

        <Block className="mt-14 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <Aufruf to="/akquise-check/">Akquise-Check machen</Aufruf>
            <TextVerweis to="/akquise-strecken/">So baue ich eine Akquise-Strecke auf</TextVerweis>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-stone">
            Fünf Fragen, ohne Anmeldung. Am Ende stehen drei Hinweise, die sich aus
            Ihren eigenen Antworten ergeben.
          </p>
        </Block>

        <Block className="mt-14 border-t border-night-line pt-8">
          <p className="text-[15px] leading-relaxed text-stone">
            Für Ihre Objekte auf Wunsch zusätzlich:{' '}
            <Link
              to="/3d-rundgaenge/"
              className="text-cream-soft underline decoration-night-line underline-offset-4 transition-colors hover:text-gold-bright hover:decoration-gold"
            >
              Objektfilme und 3D-Rundgänge
            </Link>
            .
          </p>
        </Block>
      </div>
    </section>
  )
}
