import { Block, Marke, TextVerweis } from '../SeitenLayout'

// Kurzvorstellung auf der Startseite. Der volle Text steht auf /ueber-mich/
// und stammt vom Inhaber selbst; hier nur, was ein Betrieb vor dem ersten
// Anruf wissen will: Mit wem spreche ich, und kommt der auch vorbei?
//
// "Vor Ort" ist ausdruecklich gewollt: Der Inhaber will zu Betrieben fahren
// und dort vorstellen, was sich automatisieren laesst.

const ECKDATEN = [
  { titel: 'Sitz', wert: 'Lübeck, Schleswig-Holstein' },
  { titel: 'Gegründet', wert: 'Juli 2026' },
  { titel: 'Ansprechpartner', wert: 'Immer derselbe: ich' },
  { titel: 'Erstgespräch', wert: 'Bei Ihnen vor Ort, am Telefon oder per Video' },
]

export function UeberMichKurz() {
  return (
    <section className="relative border-t border-night-line/60 py-28 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20 lg:px-10">
        <Block>
          <Marke>WER DAS BAUT</Marke>
          <h2 className="font-serif text-[clamp(2.2rem,4.8vw,4rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream">
            Bilal Gnielka
          </h2>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-cream-soft md:text-lg">
            Plan B Studios bin ich. Sie sprechen mit mir, und ich baue es auch.
            Dazwischen steht kein Vertrieb und kein Projektleiter.
          </p>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-stone">
            In Lübeck und Umgebung komme ich für das Erstgespräch gern zu Ihnen in
            den Betrieb. So sehe ich, wie bei Ihnen gearbeitet wird, bevor ich
            etwas vorschlage.
          </p>
          <div className="mt-10">
            <TextVerweis to="/ueber-mich/">Mehr über mich</TextVerweis>
          </div>
        </Block>

        <Block className="lg:pt-24">
          <dl className="border-t border-night-line">
            {ECKDATEN.map((e) => (
              <div
                key={e.titel}
                className="grid gap-1 border-b border-night-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6"
              >
                <dt className="text-[13px] font-medium text-stone">{e.titel}</dt>
                <dd className="text-[16px] text-cream">{e.wert}</dd>
              </div>
            ))}
          </dl>
        </Block>
      </div>
    </section>
  )
}
