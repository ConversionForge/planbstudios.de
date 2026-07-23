import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { CubeMark } from '../components/Logo'
import { Cursor } from '../components/Cursor'
import { GrainOverlay } from '../components/GrainOverlay'
import { Magnetic } from '../components/Magnetic'

export function NotFound() {
  useEffect(() => {
    document.title = 'Seite nicht gefunden — Plan B Studios'
    return () => {
      document.title = 'Plan B Studios — Webdesign & 3D-Rundgänge'
    }
  }, [])

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-night px-6 text-center text-cream">
      <Cursor />
      <GrainOverlay />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        <CubeMark animated className="h-16 w-16 text-gold" strokeWidth={1.2} />

        <p className="mt-10 font-mono text-[12px] tracking-[0.3em] text-gold">FEHLER 404</p>

        <h1 className="mt-5 font-serif text-[clamp(2.4rem,7vw,5rem)] font-light leading-[1.05] text-cream">
          Dieser Raum
          <br />
          <em className="italic text-gold-bright">existiert nicht</em>.
        </h1>

        <p className="mt-7 max-w-md text-base leading-relaxed text-stone">
          Die aufgerufene Seite gibt es nicht — vielleicht wurde sie verschoben oder
          die Adresse hat sich vertippt.
        </p>

        <Magnetic>
          <Link
            to="/"
            className="mt-10 block bg-gold px-8 py-3.5 text-[14px] font-medium tracking-[0.04em] text-night transition-colors duration-300 hover:bg-gold-bright"
          >
            Zurück zur Startseite
          </Link>
        </Magnetic>
      </motion.div>
    </div>
  )
}
