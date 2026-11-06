import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { GrainOverlay } from './GrainOverlay'
import { Footer } from './Footer'
import { Nav } from './Nav'
import { startVariante } from '../lib/ssr'
import { useInPageAnchors } from '../example/useInPageAnchors'

/**
 * Gemeinsames Geruest fuer die eigenstaendigen Leistungsseiten.
 *
 * Seit dem Neuaufbau im November 2026 mit der vollen Hauptnavigation statt
 * einer schlanken Kopfzeile. Grund: Wer ueber die Suche auf "Webdesign
 * Luebeck" landet, soll sehen, dass es Automatisierung und Akquise-Strecken
 * gibt. Das sind die Leistungen, fuer die Plan B Studios bekannt werden will,
 * und eine Kopfzeile ohne Navigation hat sie versteckt.
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
 *
 * Ziele, die mit "#" beginnen, werden als einfacher Anker ausgegeben: Auf der
 * Startseite faengt ein zentraler Klick-Handler genau diese ab und scrollt
 * weich, ohne den Anker in die Adresszeile zu schreiben. Ein Router-Link
 * wuerde daraus "/#..." machen und am Handler vorbeilaufen.
 */
export function Aufruf({
  to,
  children,
  extern = false,
  neuesFenster = false,
  variante = 'gold',
}: {
  to: string
  children: ReactNode
  extern?: boolean
  /** Fuer fremde Seiten wie die Terminbuchung: Plan B Studios bleibt offen. */
  neuesFenster?: boolean
  /** "gold" fuer den Hauptaufruf, "rand" fuer einen zweiten daneben. */
  variante?: 'gold' | 'rand'
}) {
  const gold = variante === 'gold'
  const inhalt = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105 ${
          gold ? 'bg-night/15' : 'bg-cream/[0.08]'
        }`}
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
  const klassen = `group inline-flex items-center gap-3 rounded-full py-2.5 pl-7 pr-2.5 text-[15px] font-medium tracking-[0.02em] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright ${
    gold
      ? 'bg-gold text-night hover:bg-gold-bright'
      : 'text-cream ring-1 ring-cream/20 hover:text-gold-bright hover:ring-gold/60'
  }`

  if (extern || neuesFenster || to.startsWith('#')) {
    return (
      <a
        href={to}
        className={klassen}
        {...(neuesFenster ? { target: '_blank', rel: 'noopener' } : {})}
      >
        {inhalt}
      </a>
    )
  }
  return (
    <Link to={to} className={klassen}>
      {inhalt}
    </Link>
  )
}

/**
 * Leiser Textverweis mit Pfeil, fuer den zweiten Weg neben einem Aufruf.
 * Bewusst kein zweiter Knopf: Zwei gleich laute Knoepfe nebeneinander lassen
 * offen, welcher gemeint ist.
 */
export function TextVerweis({
  to,
  children,
  className = '',
}: {
  to: string
  children: ReactNode
  className?: string
}) {
  const klassen = `group inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-cream-soft transition-colors duration-300 hover:text-gold-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright ${className}`
  const pfeil = (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        d="M5 12h14m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
  if (to.startsWith('#')) {
    return (
      <a href={to} className={klassen}>
        <span>{children}</span>
        {pfeil}
      </a>
    )
  }
  return (
    <Link to={to} className={klassen}>
      <span>{children}</span>
      {pfeil}
    </Link>
  )
}

export function SeitenLayout({
  titel,
  children,
}: {
  /** Fenstertitel. Steht zusaetzlich im HTML, das postbuild.mjs erzeugt. */
  titel: string
  children: ReactNode
}) {
  useEffect(() => {
    document.title = titel
    return () => {
      document.title = 'Automatisierung & Akquise-Strecken in Lübeck | Plan B Studios'
    }
  }, [titel])

  // Anker innerhalb der Seite (etwa "#einschaetzung") abfangen: Ein nativer
  // Sprung schriebe den Anker in die Adresszeile und braechte Browser-Verlauf
  // und Router aus dem Takt (siehe useInPageAnchors). 100 Pixel Abstand fuer
  // die feste Kopfzeile.
  useInPageAnchors(100)

  return (
    <div className="min-h-screen bg-night text-cream">
      <GrainOverlay />
      <Nav />
      {/* Platz fuer die feste Kopfzeile (h-24, beim Scrollen h-16). */}
      <div aria-hidden className="h-24" />

      <main id="inhalt" tabIndex={-1} className="mx-auto max-w-5xl px-6 outline-none lg:px-8">
        {children}
      </main>

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
