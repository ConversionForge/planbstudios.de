import { motion } from 'motion/react'
import { Block, Marke, einblenden, gestaffelt } from '../SeitenLayout'
import { sichtbareReferenzen, type Referenz } from '../../inhalte/referenzen'
import { startVariante } from '../../lib/ssr'

// Referenzen: nur echte Kundenprojekte, Daten aus src/inhalte/referenzen.ts.
//
// Vorher hiess dieser Abschnitt "Arbeiten" und zeigte zwei erfundene
// Beispielprojekte plus eine leere Karte "Ihr Projekt koennte hier stehen /
// Das erste sein". Das passte nicht mehr, sobald es echte Kunden gab. Die
// Beispielprojekte stehen jetzt bei den Websites, ausdruecklich als erfunden
// gekennzeichnet. Hier steht nur, was fuer einen echten Kunden gebaut wurde.

function Zeile({ r }: { r: Referenz }) {
  const details = [
    { label: 'Vorher', text: r.vorher },
    { label: 'Jetzt', text: r.jetzt },
    { label: 'Ergebnis', text: r.ergebnis },
  ].filter((d) => d.text)

  return (
    <motion.li
      variants={einblenden}
      className="grid gap-6 border-t border-night-line py-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-12 md:py-12"
    >
      <div>
        <p className="font-mono text-[11px] tracking-[0.2em] text-gold">
          {r.leistung.toUpperCase()}
        </p>
        <h3 className="mt-4 font-serif text-[clamp(1.7rem,3vw,2.4rem)] font-light leading-tight text-cream">
          {r.kunde}
        </h3>
        <p className="mt-2 text-[14px] text-stone">
          {r.branche}
          {r.ort ? ` · ${r.ort}` : ''}
        </p>
        {!r.freigegeben && (
          // Nur in der lokalen Vorschau sichtbar, siehe sichtbareReferenzen().
          <p className="mt-4 inline-block rounded-md border border-dashed border-gold/50 px-2.5 py-1 font-mono text-[11px] tracking-[0.12em] text-gold">
            ENTWURF · ANGABEN UND FREIGABE FEHLEN
          </p>
        )}
      </div>

      <div>
        <p className="text-[17px] leading-relaxed text-cream-soft md:text-lg">{r.titel}</p>

        {details.length > 0 && (
          <dl className="mt-6 grid gap-4">
            {details.map((d) => (
              <div key={d.label} className="grid gap-1 sm:grid-cols-[6rem_1fr] sm:gap-4">
                <dt className="text-[13px] font-medium text-stone">{d.label}</dt>
                <dd className="text-[15px] leading-relaxed text-stone">{d.text}</dd>
              </div>
            ))}
          </dl>
        )}

        {r.zitat && (
          <blockquote className="mt-8 border-l-2 border-gold/50 pl-6">
            <p className="font-serif text-[1.25rem] font-light leading-snug text-cream">
              „{r.zitat.text}“
            </p>
            <footer className="mt-3 text-[13px] text-stone">{r.zitat.person}</footer>
          </blockquote>
        )}

        {r.url && (
          <a
            href={r.url}
            target="_blank"
            rel="noopener"
            className="group mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-cream transition-colors hover:text-gold-bright"
          >
            Ansehen
            <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform group-hover:translate-x-1">
              <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </motion.li>
  )
}

export function Referenzen() {
  const liste = sichtbareReferenzen()
  // Ohne freigegebene Referenz gibt es diesen Abschnitt nicht. Der Eintrag in
  // der Navigation verschwindet dann ebenfalls (src/lib/navigation.ts).
  if (liste.length === 0) return null

  return (
    <section id="referenzen" className="relative border-t border-night-line/60 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Block className="max-w-3xl">
          <Marke>REFERENZEN</Marke>
          <h2 className="font-serif text-[clamp(2.2rem,4.8vw,4rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream [text-wrap:balance]">
            Für wen ich das schon gebaut habe
          </h2>
        </Block>

        <motion.ol
          variants={gestaffelt}
          initial={startVariante}
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 border-b border-night-line"
        >
          {liste.map((r) => (
            <Zeile key={r.kunde} r={r} />
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
