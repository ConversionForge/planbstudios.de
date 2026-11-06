import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { LogoLockup } from './Logo'
import { HAUPTNAVIGATION, type NavEintrag } from '../lib/navigation'
import { EMAIL, TELEFON, TELEFON_ANZEIGE, TERMIN_URL } from '../lib/kontakt'

/**
 * Ein Eintrag der Hauptnavigation.
 *
 * Ziele wie "/#referenzen" sind Abschnitte der Startseite. AUF der Startseite
 * werden sie als nackter Anker "#referenzen" ausgegeben, damit der zentrale
 * Klick-Handler dort weich scrollt, ohne den Anker in die Adresszeile zu
 * schreiben. Auf jeder anderen Seite sind sie ein normaler Verweis zurueck.
 */
function Verweis({
  eintrag,
  className,
  onClick,
}: {
  eintrag: NavEintrag
  className: string
  onClick?: () => void
}) {
  const { pathname } = useLocation()
  const abschnitt = eintrag.zu.startsWith('/#')

  if (abschnitt && pathname === '/') {
    return (
      <a href={eintrag.zu.slice(1)} onClick={onClick} className={className}>
        {eintrag.label}
      </a>
    )
  }

  const aktiv = !abschnitt && pathname === eintrag.zu
  return (
    <Link
      to={eintrag.zu}
      onClick={onClick}
      aria-current={aktiv ? 'page' : undefined}
      className={className}
    >
      {eintrag.label}
    </Link>
  )
}

export function Nav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 48))

  // Nur das Menue schliessen und die Scrollsperre loesen. Bewusst ohne
  // preventDefault: Auf der Startseite muss der Klick den zentralen
  // Anker-Handler erreichen, der das weiche Scrollen uebernimmt.
  const schliessen = () => {
    setOpen(false)
    document.body.style.overflow = ''
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Sprungmarke fuer Tastatur und Screenreader. Setzt den Fokus selbst, weil
  // der zentrale Anker-Handler der Startseite den Standardsprung abfaengt.
  const zumInhalt = () => {
    const ziel = document.getElementById('inhalt')
    ziel?.focus({ preventScroll: true })
  }

  return (
    <>
      <a
        href="#inhalt"
        onClick={zumInhalt}
        className="fixed left-4 top-4 z-[95] -translate-y-24 rounded-full bg-gold px-5 py-2.5 text-[14px] font-medium text-night transition-transform focus:translate-y-0"
      >
        Zum Inhalt springen
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? 'border-b border-night-line bg-night/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 transition-all duration-500 lg:px-10 ${
            scrolled || open ? 'h-16' : 'h-24'
          }`}
        >
          <LogoLockup />

          <nav aria-label="Hauptnavigation" className="hidden items-center gap-8 lg:flex">
            {HAUPTNAVIGATION.map((e) => (
              <Verweis
                key={e.zu}
                eintrag={e}
                className="group relative py-2 text-[14px] font-medium text-cream-soft transition-colors duration-300 hover:text-cream aria-[current=page]:text-gold-bright"
              />
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href={TERMIN_URL}
              target="_blank"
              rel="noopener"
              className="block rounded-full bg-gold px-5 py-2.5 text-[14px] font-medium text-night transition-colors duration-300 hover:bg-gold-bright active:scale-[0.98]"
            >
              Erstgespräch buchen
            </a>
          </div>

          {/* Menue-Schalter unterhalb von lg. Fuenf Eintraege plus Aufruf
              passen erst ab etwa 1024 Pixeln nebeneinander. */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
            className="relative z-50 -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`h-px w-6 bg-cream transition-all duration-300 ${
                open ? 'translate-y-[3px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-px w-6 bg-cream transition-all duration-300 ${
                open ? '-translate-y-[3px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center overflow-y-auto bg-night px-8 py-24 lg:hidden"
          >
            <nav aria-label="Hauptnavigation" className="flex flex-col">
              {HAUPTNAVIGATION.map((e, i) => (
                <motion.div
                  key={e.zu}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.06 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Verweis
                    eintrag={e}
                    onClick={schliessen}
                    className="block border-b border-night-line py-4 font-serif text-[1.9rem] font-light text-cream aria-[current=page]:text-gold-bright"
                  />
                </motion.div>
              ))}
            </nav>

            <motion.a
              href={TERMIN_URL}
              target="_blank"
              rel="noopener"
              onClick={schliessen}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 block rounded-full bg-gold px-8 py-4 text-center text-[15px] font-medium text-night"
            >
              Erstgespräch buchen
            </motion.a>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex flex-col gap-1 text-[15px] text-stone"
            >
              <a href={`mailto:${EMAIL}`} className="py-2 hover:text-gold">
                {EMAIL}
              </a>
              <a href={`tel:${TELEFON}`} className="py-2 hover:text-gold">
                {TELEFON_ANZEIGE}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
