import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Block, Marke, einblenden, gestaffelt } from '../SeitenLayout'
import { startVariante } from '../../lib/ssr'

// Arbeitsproben: die Bruecke, bis es Kundenreferenzen gibt (Stand November
// 2026 noch keine, siehe src/inhalte/referenzen.ts).
//
// REGEL: Hier steht nur, was tatsaechlich gebaut ist und laeuft. Keine
// erfundenen Kunden, keine Logos, keine Zitate. Konzepte, die noch fuer
// niemanden gebaut sind (etwa die Strecke fuer Restaurants), gehoeren NICHT
// hierher, sondern als "So baue ich das" auf die Leistungsseite.
//
// - Akquise-Check: laeuft live auf dieser Seite.
// - Assistent: Software mit sechs Modulen und automatischen Tests, gebaut fuer
//   ein Angebot an einen Interessenten. Deshalb ohne Branche und Namen.
// - Beispiel-Websites: MERIDIAN und Havel & Grau, erfundene Marken.

function Pfeil() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1">
      <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Kennung({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-gold">
      {children}
    </span>
  )
}

export function Arbeitsproben() {
  return (
    <section id="arbeitsproben" className="relative border-t border-night-line/60 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Block className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Marke>ARBEITSPROBEN</Marke>
            <h2 className="font-serif text-[clamp(2.2rem,4.8vw,4rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream [text-wrap:balance]">
              Was ich schon gebaut habe
            </h2>
          </div>
          <p className="max-w-md text-[16px] leading-relaxed text-stone lg:justify-self-end">
            Referenzen von Kunden folgen. Bis dahin zeige ich Ihnen, was ich
            gebaut habe, statt es nur zu beschreiben. Alles davon läuft.
          </p>
        </Block>

        <motion.div
          variants={gestaffelt}
          initial={startVariante}
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
        >
          {/* Akquise-Check: die staerkste Probe, weil man sie selbst bedienen kann */}
          <motion.div variants={einblenden} className="h-full">
            <Link
              to="/akquise-check/"
              className="group block h-full rounded-[1.8rem] bg-cream/[0.03] p-1.5 ring-1 ring-cream/[0.06] transition-[box-shadow] duration-500 hover:ring-gold/40"
            >
              <span className="flex h-full flex-col rounded-[calc(1.8rem-0.375rem)] bg-night-raised p-8 shadow-[inset_0_1px_0_rgba(243,238,229,0.06)] md:p-10">
                <span className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-bright" />
                  </span>
                  <Kennung>LIVE · AKQUISE-STRECKE</Kennung>
                </span>
                <span className="mt-8 block font-serif text-[clamp(1.9rem,3.2vw,2.6rem)] font-light leading-[1.05] text-cream">
                  Akquise-Check für Makler
                </span>
                <span className="mt-5 block max-w-lg text-[16px] leading-relaxed text-stone">
                  Eine vollständige Akquise-Strecke, die auf dieser Seite läuft:
                  fünf Fragen, eine pro Schritt. Danach eine Benachrichtigung an
                  mich, eine Bestätigung an Sie, der Kontakt im System und ein Link
                  zur Terminbuchung.
                </span>

                {/* Die Stufen der Strecke, als schmale Leiste */}
                <span aria-hidden className="mt-9 grid max-w-md grid-cols-6 gap-1.5">
                  {['1', '2', '3', '4', '5', '✓'].map((s, i) => (
                    <span key={s} className="flex flex-col gap-2">
                      <span className="block h-1 rounded-full bg-gold-bright" style={{ opacity: 0.3 + i * 0.14 }} />
                      <span className="font-mono text-[11px] text-cream-soft">{s}</span>
                    </span>
                  ))}
                </span>

                <span aria-hidden className="min-h-8 flex-1" />
                <span className="mt-8 inline-flex items-center gap-2 border-t border-night-line pt-6 text-[15px] font-medium text-cream transition-colors group-hover:text-gold-bright">
                  Selbst ausprobieren
                  <Pfeil />
                </span>
              </span>
            </Link>
          </motion.div>

          <div className="grid gap-6">
            {/* Assistent */}
            <motion.div variants={einblenden}>
              <Link
                to="/automatisierung/#beispiel"
                className="group block h-full rounded-[1.8rem] border border-night-line p-8 transition-colors duration-300 hover:border-gold/40 md:p-9"
              >
                <Kennung>GEBAUT · AUTOMATISIERUNG</Kennung>
                <span className="mt-5 block font-serif text-[1.7rem] font-light leading-tight text-cream">
                  Assistent neben dem Branchenprogramm
                </span>
                <span className="mt-3 block text-[15px] leading-relaxed text-stone">
                  Software, die die Exporte eines bestehenden Programms liest:
                  Schreiben auslesen und Antworten vorbereiten, offene Posten,
                  Bewertungen, nachts ein Lauf mit Tagesbericht. Lokal, ohne Cloud,
                  mit automatischen Tests.
                </span>
                <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-cream transition-colors group-hover:text-gold-bright">
                  Wie das aussieht
                  <Pfeil />
                </span>
              </Link>
            </motion.div>

            {/* Beispiel-Websites */}
            <motion.div variants={einblenden}>
              <a
                href="#websites"
                className="group block h-full rounded-[1.8rem] border border-night-line p-8 transition-colors duration-300 hover:border-gold/40 md:p-9"
              >
                <Kennung>GEBAUT · WEBSITES</Kennung>
                <span className="mt-5 block font-serif text-[1.7rem] font-light leading-tight text-cream">
                  Zwei Beispiel-Websites
                </span>
                <span className="mt-3 block text-[15px] leading-relaxed text-stone">
                  MERIDIAN und Havel &amp; Grau, vollständig gebaut und zum
                  Durchklicken. Beide Marken sind erfunden.
                </span>
                <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-cream transition-colors group-hover:text-gold-bright">
                  Ansehen
                  <Pfeil />
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
