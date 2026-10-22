import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useT } from '../i18n'
import { start } from '../lib/ssr'

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-t border-night-line">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span
          className={`font-serif text-xl font-light transition-colors duration-300 md:text-2xl ${
            open ? 'text-gold-bright' : 'text-cream group-hover:text-gold-bright'
          }`}
        >
          {q}
        </span>
        <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
          <span className="absolute h-px w-4 bg-gold" />
          <span
            className={`absolute h-4 w-px bg-gold transition-transform duration-300 ${
              open ? 'rotate-90' : ''
            }`}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-stone md:text-base">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  const t = useT()
  const FAQS = t.faq.items
  const [open, setOpen] = useState<number | null>(0)

  /**
   * Strukturierte Daten fuer die Fragen.
   *
   * Ohne diesen Block sieht eine Suchmaschine hier fuenf Textabsaetze. Mit ihm
   * sieht sie fuenf Fragen mit Antworten — und genau daraus speisen sich die
   * KI-Uebersichten von Google und die Antworten von ChatGPT oder Perplexity.
   * Man wird zitiert, ohne selbst ein Modell zu betreiben.
   *
   * Bewusst aus denselben Daten erzeugt, die auch angezeigt werden: So koennen
   * sichtbarer Text und Markup nicht auseinanderlaufen. Google wertet es als
   * Verstoss, wenn im Markup etwas anderes steht als auf der Seite.
   *
   * Steht im Koerper statt im Kopf, weil es aus dem Woerterbuch kommt und damit
   * automatisch der jeweiligen Sprachfassung folgt. JSON-LD ist ein Datenblock
   * und wird nicht ausgefuehrt, deshalb greift die CSP hier nicht.
   */
  const fragenDaten = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section id="faq" className="relative border-t border-night-line/60 py-32 md:py-40">
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
          <p className="mb-6 font-mono text-[12px] tracking-[0.3em] text-gold">{t.faq.eyebrow}</p>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05] text-cream">
            {t.faq.title1}
            <br />
            <em className="italic text-gold-bright">{t.faq.titleEm}</em>
            {t.faq.title2}
          </h2>
          <p className="mt-8 max-w-xs text-[15px] leading-relaxed text-stone">
            {t.faq.lead}
          </p>
        </motion.div>

        <motion.div
          initial={start({ opacity: 0, y: 30 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="border-b border-night-line"
        >
          {FAQS.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
