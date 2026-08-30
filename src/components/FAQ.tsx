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

  return (
    <section className="relative border-t border-night-line/60 py-32 md:py-40">
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
