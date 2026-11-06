import { useState } from 'react'
import { motion } from 'motion/react'
import { start } from '../lib/ssr'

// Haeufige Fragen, neu geschrieben fuer die Gewichtung seit November 2026:
// zuerst Automatisierung und Akquise, dann Websites.
//
// REGEL: Keine Zusage, die der Inhaber nicht halten kann. Keine Zahlen ausser
// denen, die schon vorher galten (Website in drei bis fuenf Wochen).

const FRAGEN = [
  {
    q: 'Für welche Betriebe arbeiten Sie?',
    a: 'Für kleine und mittlere Betriebe in Lübeck und Schleswig-Holstein. Akquise-Strecken habe ich bisher vor allem für Immobilienmakler gebaut, Automatisierungen auch für Büro und Verwaltung und für die Gastronomie.',
  },
  {
    q: 'Was lässt sich überhaupt automatisieren?',
    a: 'Alles, was regelmäßig nach demselben Muster abläuft: Daten von einem Programm ins nächste übertragen, Dokumente erstellen, Nachrichten verschicken, Termine bestätigen, Anfragen sortieren. Was jedes Mal eine Entscheidung braucht, bleibt bei Ihnen. Im Erstgespräch gehen wir Ihre Abläufe durch, und ich sage Ihnen, wo es sich lohnt und wo nicht.',
  },
  {
    q: 'Muss ich dafür neue Programme kaufen?',
    a: 'Nicht unbedingt. Wo es geht, verbinde ich die Programme, die Sie schon nutzen. Ist ein neues Werkzeug nötig, erfahren Sie vorher, was es kostet, und entscheiden selbst.',
  },
  {
    q: 'Was kostet das?',
    a: 'Das hängt davon ab, wie viele Abläufe und Programme beteiligt sind. Nach dem Erstgespräch bekommen Sie einen Festpreis für den Aufbau. Laufende Kosten, etwa für Programme oder Betreuung, nenne ich vorher getrennt.',
  },
  {
    q: 'Wie lange dauert ein Projekt?',
    a: 'Eine Website ist in der Regel in drei bis fünf Wochen online. Wie lange eine Automatisierung oder eine Akquise-Strecke dauert, hängt vom Umfang ab. Den Zeitplan bekommen Sie zusammen mit dem Angebot.',
  },
  {
    q: 'Kommen Sie auch vorbei?',
    a: 'In Lübeck und Umgebung ja. Das Erstgespräch kann bei Ihnen im Betrieb stattfinden, am Telefon oder per Video. Vor Ort sehe ich am schnellsten, wie bei Ihnen gearbeitet wird.',
  },
  {
    q: 'Brauche ich eine neue Website, damit das funktioniert?',
    a: 'Nein. Eine Akquise-Strecke oder eine Automatisierung lässt sich in vielen Fällen an eine bestehende Website anbinden. Ob das bei Ihrer geht, sehe ich mir vorher an.',
  },
]

/**
 * Eine Frage. Die Antwort steht IMMER im HTML, auch wenn sie zugeklappt ist:
 * Sie wird nur ueber die Hoehe versteckt (grid-template-rows 0fr -> 1fr),
 * nicht aus dem Dokument entfernt. Vorher stand im vorgerenderten HTML nur
 * die erste Antwort, die uebrigen fehlten ganz.
 */
function Eintrag({
  q,
  a,
  offen,
  umschalten,
  id,
}: {
  q: string
  a: string
  offen: boolean
  umschalten: () => void
  id: string
}) {
  return (
    <div className="border-t border-night-line">
      <h3>
        <button
          onClick={umschalten}
          aria-expanded={offen}
          aria-controls={id}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright"
        >
          <span
            className={`font-serif text-xl font-light transition-colors duration-300 md:text-2xl ${
              offen ? 'text-gold-bright' : 'text-cream group-hover:text-gold-bright'
            }`}
          >
            {q}
          </span>
          <span aria-hidden className="relative flex h-6 w-6 shrink-0 items-center justify-center">
            <span className="absolute h-px w-4 bg-gold" />
            <span
              className={`absolute h-4 w-px bg-gold transition-transform duration-300 ${
                offen ? 'rotate-90' : ''
              }`}
            />
          </span>
        </button>
      </h3>
      <div
        id={id}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          offen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden" inert={!offen}>
          <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-stone md:text-base">{a}</p>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const [offen, setOffen] = useState<number | null>(0)

  /**
   * Strukturierte Daten fuer die Fragen.
   *
   * Ohne diesen Block sieht eine Suchmaschine hier Textabsaetze. Mit ihm sieht
   * sie Fragen mit Antworten, und genau daraus speisen sich die
   * KI-Uebersichten von Google und die Antworten von ChatGPT oder Perplexity.
   *
   * Bewusst aus denselben Daten erzeugt, die auch angezeigt werden: So koennen
   * sichtbarer Text und Markup nicht auseinanderlaufen. Google wertet es als
   * Verstoss, wenn im Markup etwas anderes steht als auf der Seite. JSON-LD ist
   * ein Datenblock und wird nicht ausgefuehrt, deshalb greift die CSP nicht.
   */
  const fragenDaten = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FRAGEN.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section id="faq" className="relative border-t border-night-line/60 py-28 md:py-36">
      <script
        type="application/ld+json"
        // Ein "</script>" im Text wuerde den Block sonst vorzeitig schliessen.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(fragenDaten).replace(/</g, '\\u003c'),
        }}
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10">
        <motion.div
          initial={start({ opacity: 0, y: 30 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-6 font-mono text-[12px] tracking-[0.3em] text-gold">FRAGEN</p>
          <h2 className="font-serif text-[clamp(2.2rem,4.8vw,4rem)] font-light leading-[1.05] text-cream">
            Was Betriebe vorher wissen wollen
          </h2>
          <p className="mt-8 max-w-xs text-[15px] leading-relaxed text-stone">
            Ihre Frage ist nicht dabei? Schreiben Sie mir, oder stellen Sie sie im
            Erstgespräch.
          </p>
        </motion.div>

        <motion.div
          initial={start({ opacity: 0, y: 30 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="border-b border-night-line"
        >
          {FRAGEN.map((f, i) => (
            <Eintrag
              key={f.q}
              id={`frage-${i}`}
              q={f.q}
              a={f.a}
              offen={offen === i}
              umschalten={() => setOffen(offen === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
