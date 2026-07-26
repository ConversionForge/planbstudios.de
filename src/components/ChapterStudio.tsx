import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const reveal = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const PRINCIPLES = [
  {
    n: '01',
    title: 'Einzeln gebaut.',
    text: 'Kein Template, keine Vorlage — jede Seite entsteht von Grund auf aus Ihrer Marke, Ihrem Objekt, Ihrer Zielgruppe. So unverwechselbar wie das, was Sie verkaufen. Die Konkurrenz klickt zusammen; Sie fallen auf.',
  },
  {
    n: '02',
    title: 'Alles aus einer Hand.',
    text: 'Website und 3D-Rundgang von derselben Person. Sie sprechen mit dem, der es baut — vom ersten Entwurf bis zur fertigen Seite. Keine Schnittstellen, keine Wartezeit, keine Ausreden.',
  },
  {
    n: '03',
    title: 'Technik, die verkauft.',
    text: 'Auf üblichen Verbindungen Ladezeiten unter einer Sekunde, flüssige Darstellung, tadellos am Handy. Denn die schönste Seite bringt nichts, wenn der Interessent vorher abspringt.',
  },
]

export function ChapterStudio() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const bigTextX = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const bigTextOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.06, 0.06, 0])

  return (
    <section id="studio" ref={ref} className="relative overflow-hidden border-t border-night-line/60">
      <motion.div
        style={{ x: bigTextX, opacity: bigTextOpacity }}
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-0 -z-0 -translate-y-1/2 whitespace-nowrap font-serif text-[24vw] font-light leading-none text-cream"
      >
        Plan B
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 py-40 lg:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="md:col-span-5"
          >
            <p className="mb-6 font-mono text-[12px] tracking-[0.3em] text-gold">04 — STUDIO</p>
            <h2 className="font-serif text-[clamp(2.4rem,5vw,4.2rem)] font-light leading-[1.05] text-cream">
              Warum
              <br />
              <em className="italic text-gold-bright">Plan B</em>?
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-stone md:text-lg">
              In der Immobilienbranche entscheidet der erste Klick über den Preis.
              Trotzdem sehen die meisten Makler- und Bauträger-Seiten aus wie tausend
              andere — ein Objekt für 1,5&nbsp;Millionen, präsentiert wie ein
              Möbelhaus-Prospekt.
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-stone md:text-lg">
              Bei Plan B Studios kommt beides aus einer Hand: Websites, die eine
              Marke tragen, und begehbare 3D-Rundgänge, die Objekte verkaufen,
              bevor der erste Besichtigungstermin steht. Kein Weiterreichen, kein
              Baukasten, kein Kompromiss.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
            className="flex flex-col gap-12 md:col-span-6 md:col-start-7"
          >
            {PRINCIPLES.map((p) => (
              <motion.div key={p.n} variants={reveal} className="border-t border-night-line pt-7">
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-[12px] tracking-[0.2em] text-gold">{p.n}</span>
                  <div>
                    <h3 className="mb-3 font-serif text-2xl font-light text-cream">{p.title}</h3>
                    <p className="text-[15px] leading-relaxed text-stone">{p.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
