import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { CubeMark } from '../components/Logo'
import { Cursor } from '../components/Cursor'
import { GrainOverlay } from '../components/GrainOverlay'
import { Magnetic } from '../components/Magnetic'
import { LegalLinks } from '../components/LegalLinks'
import { useT } from '../i18n'

export function NotFound() {
  const t = useT()
  useEffect(() => {
    document.title = t.notFound.docTitle
    return () => {
      document.title = t.siteTitle
    }
  }, [t])

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center bg-night px-6 text-center text-cream">
      <Cursor />
      <GrainOverlay />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        <CubeMark animated className="h-16 w-16 text-gold" strokeWidth={1.2} />

        <p className="mt-10 font-mono text-[12px] tracking-[0.3em] text-gold">{t.notFound.eyebrow}</p>

        <h1 className="mt-5 font-serif text-[clamp(2.4rem,7vw,5rem)] font-light leading-[1.05] text-cream">
          {t.notFound.title1}
          <br />
          <em className="italic text-gold-bright">{t.notFound.titleEm}</em>
          {t.notFound.title2}
        </h1>

        <p className="mt-7 max-w-md text-base leading-relaxed text-stone">
          {t.notFound.lead}
        </p>

        <Magnetic>
          <Link
            to="/"
            className="mt-10 block bg-gold px-8 py-3.5 text-[14px] font-medium tracking-[0.04em] text-night transition-colors duration-300 hover:bg-gold-bright"
          >
            {t.notFound.cta}
          </Link>
        </Magnetic>
      </motion.div>

      <LegalLinks className="absolute inset-x-0 bottom-8 text-[12px] text-stone" />
    </div>
  )
}
