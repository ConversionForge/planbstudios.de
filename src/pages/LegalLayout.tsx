import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CubeMark } from '../components/Logo'
import { Cursor } from '../components/Cursor'
import { GrainOverlay } from '../components/GrainOverlay'
import { Footer } from '../components/Footer'

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  useEffect(() => {
    document.title = `${title} — Plan B Studios`
    return () => {
      document.title = 'Plan B Studios — Webdesign & 3D-Rundgänge'
    }
  }, [title])

  return (
    <div className="min-h-screen bg-night text-cream">
      <Cursor />
      <GrainOverlay />

      <header className="sticky top-0 z-40 border-b border-night-line bg-night/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link to="/" className="group flex items-center gap-3">
            <CubeMark className="h-6 w-6 text-gold transition-colors group-hover:text-gold-bright" />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-[15px] tracking-wide text-cream">Plan B</span>
              <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.42em] text-gold">
                Studios
              </span>
            </span>
          </Link>
          <Link
            to="/"
            className="text-[13px] font-medium tracking-[0.06em] text-cream-soft transition-colors hover:text-gold"
          >
            ← Zurück
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-28 pt-20">
        <p className="mb-5 font-mono text-[12px] tracking-[0.3em] text-gold">RECHTLICHES</p>
        <h1 className="font-serif text-[clamp(2.4rem,6vw,4rem)] font-light leading-[1.05] text-cream">
          {title}
        </h1>
        <p className="mt-5 text-[13px] tracking-[0.05em] text-stone">Stand: {updated}</p>

        <div className="legal-prose mt-14">{children}</div>
      </main>

      <Footer />
    </div>
  )
}
