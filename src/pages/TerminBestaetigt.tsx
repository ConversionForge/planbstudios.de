import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { CubeMark } from '../components/Logo'
import { GrainOverlay } from '../components/GrainOverlay'
import { LegalLinks } from '../components/LegalLinks'
import { melde } from '../akquise/ereignis'

// Ziel der Weiterleitung nach einer Buchung. Erst hier gilt ein Termin als
// gebucht, deshalb wird das Ereignis genau an dieser Stelle gemeldet und nicht
// schon beim Klick auf den Buchungsknopf: Ein Klick ist noch keine Buchung.
export function TerminBestaetigt() {
  useEffect(() => {
    document.title = 'Termin bestätigt — Plan B Studios'
    melde('termin_gebucht')
    return () => {
      document.title = 'Plan B Studios — Webdesign & 3D-Rundgänge'
    }
  }, [])

  return (
    <div className="flex min-h-[100dvh] flex-col bg-night text-cream">
      <GrainOverlay />

      <header className="border-b border-night-line">
        <div className="mx-auto flex max-w-2xl items-center px-6 py-5">
          <Link to="/" className="group flex items-center gap-3">
            <CubeMark className="h-6 w-6 text-gold transition-colors group-hover:text-gold-bright" />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-[15px] tracking-wide text-cream">Plan B</span>
              <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.42em] text-gold">
                Studios
              </span>
            </span>
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-5 font-mono text-[12px] tracking-[0.3em] text-gold">TERMIN STEHT</p>
          <h1 className="font-serif text-[clamp(2rem,5.5vw,3.2rem)] font-light leading-tight text-cream">
            Bis dann.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-cream-soft">
            Sie bekommen die Bestätigung per E-Mail. Ich sehe mir vorher Ihre Website
            an, damit wir die fünfzehn Minuten nicht mit Vorstellen verbringen.
          </p>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-stone">
            Falls etwas dazwischenkommt oder Sie vorher noch etwas loswerden wollen,
            schreiben Sie mir einfach an{' '}
            <a
              href="mailto:info@planbstudios.de"
              className="text-cream-soft underline underline-offset-4 transition-colors hover:text-gold"
            >
              info@planbstudios.de
            </a>
            .
          </p>

          <Link
            to="/"
            className="mt-10 inline-block border border-gold/40 px-7 py-3.5 text-[14px] font-medium tracking-[0.04em] text-cream transition-all duration-300 hover:border-gold hover:bg-gold hover:text-night"
          >
            Zur Startseite
          </Link>
        </motion.div>
      </main>

      <footer className="border-t border-night-line px-6 py-6">
        <div className="mx-auto flex max-w-2xl items-center justify-between text-[12px] text-stone">
          <span>© {new Date().getFullYear()} Plan B Studios</span>
          <LegalLinks />
        </div>
      </footer>
    </div>
  )
}
