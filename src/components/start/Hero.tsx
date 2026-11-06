import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { Aufruf, TextVerweis } from '../SeitenLayout'
import { TERMIN_URL } from '../../lib/kontakt'
import { SSR, startVariante } from '../../lib/ssr'

// Einstieg der Startseite.
//
// Aus der Rueckmeldung von Marco Reuter (November 2026), die hier umgesetzt
// ist: Beim ersten Blick muss klar sein, was Plan B Studios macht. Die alte
// Ueberschrift ("Digitale Raeume. Mit Plan gebaut.") liess das offen. Jetzt
// steht links in Worten, was es bringt, und rechts das Ergebnis selbst: ein
// Ablauf, der ohne Handarbeit durchlaeuft.
//
// Ausserdem entfernt: der Scroll-Hinweis (lag bei 1920x1080 hinter dem
// Knopf) und die 165 vh hohe, festgeheftete Einstiegsszene. Wer sofort
// klicken will, soll das koennen.

const behaelter = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const eintrag = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
}

/**
 * Beispielablauf einer Akquise-Strecke. Jeder Schritt entspricht etwas, das
 * der Akquise-Check auf dieser Seite tatsaechlich tut: Formular,
 * Benachrichtigung, Bestaetigung mit Terminlink, Kontakt im System,
 * Terminbuchung. Nichts davon ist erfunden; nur die Angaben im Beispiel sind
 * es, und die Karte sagt das auch.
 */
const SCHRITTE = [
  {
    titel: 'Anfrage über die Website',
    detail: 'Wertermittlung · Einfamilienhaus · 23566 Lübeck',
    zeit: '09:41',
  },
  {
    titel: 'Benachrichtigung an Sie',
    detail: 'Alle Angaben in einer Mail, Antworten geht direkt',
    zeit: '09:41',
  },
  {
    titel: 'Antwort an den Eigentümer',
    detail: 'Bestätigung mit Link zur Terminbuchung',
    zeit: '09:41',
  },
  {
    titel: 'Kontakt angelegt',
    detail: 'Im System, ohne dass jemand etwas abtippt',
    zeit: '09:41',
  },
  {
    titel: 'Termin gebucht',
    detail: 'Donnerstag, 14:00 Uhr · Erstgespräch',
    zeit: '09:58',
  },
]

const TAKT = 0.55 // Sekunden zwischen zwei Schritten
const BEGINN = 0.9 // Sekunden bis zum ersten Schritt

function Ablaufkarte() {
  const ruhig = useReducedMotion()
  // Ohne Bewegung (Systemeinstellung) und beim Vorrendern: gleich der fertige
  // Zustand, ohne Ablauf.
  const start = SSR || ruhig ? 'show' : 'hidden'
  const v = (verzoegerung: number) => (ruhig ? 0 : verzoegerung)

  return (
    <motion.div
      initial={start}
      animate="show"
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 1, delay: v(0.35), ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className="relative"
    >
      {/* Weicher Schein hinter der Karte, damit sie vom Grund abhebt. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(184,137,74,0.14),transparent)] blur-2xl"
      />

      <figure className="relative rounded-[1.8rem] bg-cream/[0.03] p-1.5 ring-1 ring-cream/[0.07]">
        <div className="rounded-[calc(1.8rem-0.375rem)] bg-night-raised shadow-[inset_0_1px_0_rgba(243,238,229,0.06)]">
          {/* Kopf */}
          <div className="flex items-center justify-between border-b border-night-line px-6 py-4">
            <span className="flex items-center gap-2.5 text-[13px] font-medium text-cream">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-bright" />
              </span>
              Läuft automatisch
            </span>
            <span className="font-mono text-[11px] tracking-[0.18em] text-stone">BEISPIEL</span>
          </div>

          {/* Schritte */}
          <ol className="px-6 py-5">
            {SCHRITTE.map((s, i) => {
              const letzter = i === SCHRITTE.length - 1
              return (
                <motion.li
                  key={s.titel}
                  custom={i}
                  variants={{
                    hidden: { opacity: 0.28 },
                    show: (n: number) => ({
                      opacity: 1,
                      transition: { delay: v(BEGINN + n * TAKT), duration: 0.45 },
                    }),
                  }}
                  className="relative grid grid-cols-[1.75rem_1fr_auto] gap-x-4 pb-5 last:pb-0"
                >
                  {/* Verbindungslinie zum naechsten Schritt */}
                  {!letzter && (
                    <span aria-hidden className="absolute left-[0.8rem] top-7 h-[calc(100%-1.5rem)] w-px bg-night-line">
                      <motion.span
                        custom={i}
                        variants={{
                          hidden: { scaleY: 0 },
                          show: (n: number) => ({
                            scaleY: 1,
                            transition: {
                              delay: v(BEGINN + n * TAKT + 0.25),
                              duration: 0.35,
                              ease: 'easeInOut',
                            },
                          }),
                        }}
                        className="block h-full w-px origin-top bg-gold/70"
                      />
                    </span>
                  )}

                  {/* Haken */}
                  <motion.span
                    aria-hidden
                    custom={i}
                    variants={{
                      hidden: {
                        backgroundColor: 'rgba(184,137,74,0)',
                        borderColor: 'rgba(140,137,133,0.35)',
                      },
                      show: (n: number) => ({
                        backgroundColor: letzter ? 'rgba(211,167,111,1)' : 'rgba(184,137,74,0.16)',
                        borderColor: 'rgba(211,167,111,0.9)',
                        transition: { delay: v(BEGINN + n * TAKT), duration: 0.35 },
                      }),
                    }}
                    className="relative z-10 mt-0.5 flex h-[1.65rem] w-[1.65rem] items-center justify-center rounded-full border"
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                      <motion.path
                        d="M3.5 8.4 6.6 11.3 12.5 4.9"
                        stroke={letzter ? '#0a0a0b' : '#d3a76f'}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        custom={i}
                        variants={{
                          hidden: { pathLength: 0 },
                          show: (n: number) => ({
                            pathLength: 1,
                            transition: {
                              delay: v(BEGINN + n * TAKT + 0.08),
                              duration: 0.4,
                              ease: [0.65, 0, 0.35, 1],
                            },
                          }),
                        }}
                      />
                    </svg>
                  </motion.span>

                  <span className="min-w-0">
                    <span className="block text-[15px] font-medium leading-snug text-cream">
                      {s.titel}
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-stone">{s.detail}</span>
                  </span>
                  <span className="pt-0.5 font-mono text-[11px] tabular-nums tracking-[0.06em] text-stone">
                    {s.zeit}
                  </span>
                </motion.li>
              )
            })}
          </ol>

          {/* Fuss */}
          <figcaption className="flex flex-col gap-3 border-t border-night-line px-6 py-4 text-[13px] leading-relaxed text-stone sm:flex-row sm:items-center sm:justify-between">
            <span>Beispielablauf einer Akquise-Strecke für Makler.</span>
            <Link
              to="/akquise-check/"
              className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 font-medium text-cream-soft transition-colors hover:text-gold-bright"
            >
              Live auf dieser Seite ansehen
              <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </figcaption>
        </div>
      </figure>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pb-20 pt-32 lg:pb-16 lg:pt-28"
    >
      {/* Zwei langsam treibende Lichtflecken, sehr zurueckhaltend. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="aurora-blob left-[-6%] top-[8%] h-[44vw] w-[44vw]"
          style={{
            background: 'radial-gradient(circle, rgba(184,137,74,0.13), transparent 62%)',
            animation: 'aurora-a 18s ease-in-out infinite',
          }}
        />
        <div
          className="aurora-blob bottom-[-10%] right-[-4%] h-[38vw] w-[38vw]"
          style={{
            background: 'radial-gradient(circle, rgba(211,167,111,0.09), transparent 62%)',
            animation: 'aurora-b 22s ease-in-out infinite',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 px-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-14 lg:px-10 xl:gap-20">
        <motion.div variants={behaelter} initial={startVariante} animate="show">
          <motion.p
            variants={eintrag}
            className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-medium tracking-[0.04em] text-stone"
          >
            <span className="text-gold">Plan B Studios</span>
            <span aria-hidden className="h-px w-6 bg-night-line" />
            <span>Automatisierung, Akquise und Websites aus Lübeck</span>
          </motion.p>

          <motion.h1
            variants={eintrag}
            className="font-serif text-[clamp(2.75rem,5.4vw,5.25rem)] font-light leading-[1.02] tracking-[-0.02em] text-cream [text-wrap:balance]"
          >
            Weniger Papierkram.
            <br />
            <em className="italic text-gold-bright">Mehr Anfragen.</em>
          </motion.h1>

          <motion.p
            variants={eintrag}
            className="mt-8 max-w-[35rem] text-[17px] leading-relaxed text-cream-soft md:text-lg [text-wrap:pretty]"
          >
            Ich automatisiere Abläufe, die in Ihrem Betrieb jede Woche von Hand
            laufen, und baue Akquise-Strecken, über die neue Kunden bei Ihnen
            anfragen. Für Betriebe in Lübeck und Schleswig-Holstein.
          </motion.p>

          <motion.div
            variants={eintrag}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <Aufruf to={TERMIN_URL} neuesFenster>
              Erstgespräch buchen
            </Aufruf>
            <TextVerweis to="#leistungen">Leistungen ansehen</TextVerweis>
          </motion.div>

          {/* Der Weg fuer Makler gehoert nach oben. Vorher lag der
              Akquise-Check so tief, dass ein Gutachter beim Durchsehen der
              ganzen Seite nicht ein Mal darauf gestossen ist. */}
          <motion.div variants={eintrag} className="mt-12 max-w-[35rem] border-t border-night-line pt-6">
            <Link
              to="/akquise-check/"
              className="group flex items-start gap-4 text-[15px] leading-relaxed text-stone transition-colors hover:text-cream-soft"
            >
              <span className="mt-0.5 shrink-0 rounded-md border border-gold/40 px-2 py-0.5 font-mono text-[11px] tracking-[0.14em] text-gold">
                MAKLER
              </span>
              <span>
                <span className="font-medium text-cream group-hover:text-gold-bright">
                  Akquise-Check machen:
                </span>{' '}
                fünf Fragen zu Ihrer Eigentümer-Akquise, ohne Anmeldung, mit drei
                Hinweisen am Ende.
              </span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="mx-auto w-full max-w-[30rem] lg:mx-0 lg:max-w-none">
          <Ablaufkarte />
        </div>
      </div>
    </section>
  )
}
