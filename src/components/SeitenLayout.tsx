import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { CubeMark } from './Logo'
import { GrainOverlay } from './GrainOverlay'
import { Footer } from './Footer'
import { startVariante } from '../lib/ssr'

/**
 * Gemeinsames Geruest fuer die eigenstaendigen Leistungsseiten.
 *
 * Bewusst eine schlanke Kopfzeile statt der Hauptnavigation: Wer ueber die
 * Suche auf einer dieser Seiten landet, sucht eine Sache. Die volle Navigation
 * wuerde davon ablenken. Der Weg zur Startseite bleibt ueber das Zeichen und
 * ueber den Abschnitt am Fuss offen — keine Sackgasse.
 */

export const einblenden = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
}

/** Gestaffelter Behaelter: Kinder laufen nacheinander ein, nicht alle zugleich. */
export const gestaffelt = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

/**
 * Abschnitt mit Einblendung beim Hereinscrollen. `startVariante` sorgt dafuer,
 * dass beim Vorrendern der sichtbare Zustand im HTML steht statt Deckkraft 0.
 */
export function Block({
  children,
  className = '',
  gestaffelteKinder = false,
}: {
  children: ReactNode
  className?: string
  gestaffelteKinder?: boolean
}) {
  return (
    <motion.div
      variants={gestaffelteKinder ? gestaffelt : einblenden}
      initial={startVariante}
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Kleine Marke ueber einer Ueberschrift. */
export function Marke({ children }: { children: ReactNode }) {
  return (
    <p className="mb-6 font-mono text-[12px] tracking-[0.3em] text-gold">{children}</p>
  )
}

/**
 * Karte in Doppelrand-Bauweise: aeussere Schale mit Haarlinie, innerer Kern mit
 * eigenem Untergrund und knapper berechnetem Radius. Das laesst die Flaeche wie
 * ein eingefasstes Bauteil wirken statt wie ein Rechteck auf dem Hintergrund.
 */
export function Karte({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-[1.6rem] bg-cream/[0.03] p-1.5 ring-1 ring-cream/[0.06] ${className}`}>
      <div className="h-full rounded-[calc(1.6rem-0.375rem)] bg-night-raised p-7 shadow-[inset_0_1px_0_rgba(243,238,229,0.06)] md:p-9">
        {children}
      </div>
    </div>
  )
}

/**
 * Handlungsaufruf mit eingefasstem Pfeil. Der Pfeil sitzt in einem eigenen
 * runden Feld statt nackt daneben und bewegt sich beim Zeigen leicht heraus.
 */
export function Aufruf({
  to,
  children,
  extern = false,
}: {
  to: string
  children: ReactNode
  extern?: boolean
}) {
  const inhalt = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="flex h-8 w-8 items-center justify-center rounded-full bg-night/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M5 12h14m0 0-6-6m6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  )
  const klassen =
    'group inline-flex items-center gap-3 rounded-full bg-gold py-2.5 pl-7 pr-2.5 text-[15px] font-medium tracking-[0.02em] text-night transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-gold-bright active:scale-[0.98]'

  return extern ? (
    <a href={to} className={klassen}>
      {inhalt}
    </a>
  ) : (
    <Link to={to} className={klassen}>
      {inhalt}
    </Link>
  )
}

export function SeitenLayout({
  titel,
  children,
  aktion,
}: {
  /** Fenstertitel. Steht zusaetzlich im HTML, das postbuild.mjs erzeugt. */
  titel: string
  children: ReactNode
  /** Verweis oben rechts, etwa auf den Akquise-Check. */
  aktion?: { text: string; zu: string }
}) {
  useEffect(() => {
    document.title = titel
    return () => {
      document.title = 'Plan B Studios — Webdesign & 3D-Rundgänge'
    }
  }, [titel])

  return (
    <div className="min-h-screen bg-night text-cream">
      <GrainOverlay />

      <header className="border-b border-night-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5 lg:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <CubeMark className="h-6 w-6 text-gold transition-colors group-hover:text-gold-bright" />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-[15px] tracking-wide text-cream">Plan B</span>
              <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.42em] text-gold">
                Studios
              </span>
            </span>
          </Link>
          {aktion && (
            <Link
              to={aktion.zu}
              className="text-[13px] font-medium tracking-[0.06em] text-cream-soft transition-colors hover:text-gold"
            >
              {aktion.text}
            </Link>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 lg:px-8">{children}</main>

      <Footer />
    </div>
  )
}

/**
 * Weg zurueck am Fuss jeder Leistungsseite. Wer ueber die Suche hier landet,
 * soll auch die uebrigen Leistungen finden.
 */
export function Rueckweg({ text }: { text: ReactNode }) {
  return (
    <section className="border-t border-night-line py-12">
      <p className="text-[15px] leading-relaxed text-stone">{text}</p>
    </section>
  )
}
