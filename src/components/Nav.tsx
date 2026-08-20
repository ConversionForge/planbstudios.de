import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { LogoLockup } from './Logo'
import { Magnetic } from './Magnetic'
import { useLang } from '../i18n'

/** Kompakter Sprachumschalter DE | EN */
function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLang()
  return (
    <div
      className={`flex items-center gap-1.5 text-[12px] font-medium tracking-[0.08em] ${className}`}
      aria-label={t.nav.switchTo}
    >
      <button
        onClick={() => setLang('de')}
        aria-pressed={lang === 'de'}
        className={`transition-colors duration-300 ${
          lang === 'de' ? 'text-gold' : 'text-stone hover:text-cream-soft'
        }`}
      >
        DE
      </button>
      <span aria-hidden className="text-night-line">
        |
      </span>
      <button
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`transition-colors duration-300 ${
          lang === 'en' ? 'text-gold' : 'text-stone hover:text-cream-soft'
        }`}
      >
        EN
      </button>
    </div>
  )
}

export function Nav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const t = useLang().t

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 48))

  // Das eigentliche sanfte Scrollen zu einer Sektion übernimmt ein zentraler
  // Anker-Handler auf der Startseite (verhindert u. a. #-Hash in der URL). Hier
  // muss nur das mobile Menü geschlossen und die Scroll-Sperre gelöst werden –
  // ohne preventDefault/stopPropagation, damit der Klick den zentralen Handler
  // erreicht.
  const goTo = () => {
    setOpen(false)
    document.body.style.overflow = ''
  }

  // Scrollsperre, solange das Menü offen ist
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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? 'border-b border-night-line bg-night/75 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 lg:px-10 ${
            scrolled || open ? 'h-16' : 'h-24'
          }`}
        >
          <LogoLockup />

          <nav className="hidden items-center gap-9 md:flex">
            {t.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={goTo}
                className="group relative py-2 text-[13px] font-medium tracking-[0.08em] text-cream-soft transition-colors duration-300 hover:text-cream"
              >
                {link.label}
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-6 md:flex">
            <LangSwitch />
            <Magnetic>
              <a
                href="#kontakt"
                onClick={goTo}
                className="block border border-gold/40 px-5 py-2.5 text-[13px] font-medium tracking-[0.06em] text-cream transition-all duration-300 hover:border-gold hover:bg-gold hover:text-night"
              >
                {t.nav.cta}
              </a>
            </Magnetic>
          </div>

          {/* Menü-Schalter (mobil) */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={open}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
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

      {/* Vollbild-Menü (mobil) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-night px-8 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {t.nav.links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={goTo}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-night-line py-5 font-serif text-3xl font-light text-cream"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.a
              href="#kontakt"
              onClick={goTo}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 block bg-gold px-8 py-4 text-center text-[15px] font-medium tracking-[0.04em] text-night"
            >
              {t.nav.cta}
            </motion.a>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex flex-col gap-1 text-[13px] text-stone"
            >
              <a href="mailto:planbstudios.de@gmail.com" className="hover:text-gold">
                planbstudios.de@gmail.com
              </a>
              <a href="tel:+491788489408" className="hover:text-gold">
                0178 8489408
              </a>
              <LangSwitch className="mt-5 text-[13px]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
