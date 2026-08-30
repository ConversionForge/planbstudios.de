import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Magnetic } from './Magnetic'
import { useT } from '../i18n'
import { start } from '../lib/ssr'

// Dezenter Verweis auf die Situationsseite fuer Makler. Bewusst kein eigenes
// nummeriertes Kapitel: Die Seite ist ein vertiefender Abzweig fuer eine
// bestimmte Zielgruppe, kein weiteres Leistungsversprechen. Deshalb ein
// schmales Band zwischen Studio und FAQ statt einer vollen Bildschirmhoehe,
// und bewusst nicht in der Hauptnavigation.
export function ChapterMakler() {
  const t = useT()

  return (
    <section className="relative border-t border-night-line/60">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28 lg:px-10">
        <motion.div
          initial={start({ opacity: 0, y: 28 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16"
        >
          <div className="max-w-2xl">
            <p className="mb-5 font-mono text-[12px] tracking-[0.3em] text-gold">
              {t.makler.eyebrow}
            </p>
            <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-light leading-tight text-cream">
              {t.makler.title1}{' '}
              <em className="italic text-gold-bright">{t.makler.titleEm}</em>
              {t.makler.title2}
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-stone md:text-base">
              {t.makler.text}
            </p>
          </div>

          <Magnetic strength={0.2}>
            <Link
              to="/makler/mehr-eigentuemeranfragen"
              className="group flex shrink-0 items-center gap-3 border border-gold/40 px-7 py-3.5 text-[14px] font-medium tracking-[0.04em] text-cream transition-all duration-300 hover:border-gold hover:bg-gold hover:text-night"
            >
              {t.makler.cta}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M5 12h14m0 0-6-6m6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
