import { useEffect, useRef, useState } from 'react'
import { Tilt } from './Tilt'

const VIDEO_SRC = `${import.meta.env.BASE_URL}rundgang/loft-walkthrough.mp4`
const POSTER = `${import.meta.env.BASE_URL}rundgang/living-1.jpg`

export function WalkthroughVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(false)

  // Nur abspielen, wenn im Sichtbereich (schont Akku/Leistung)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.4 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  const togglePlay = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }
  const goFullscreen = () => ref.current?.requestFullscreen?.()

  return (
    <figure className="m-0">
      <Tilt max={4} className="group relative aspect-video w-full overflow-hidden rounded-xl border border-night-line bg-night-raised">
        {/* Stummer Kino-Loop — das Quellvideo hat keine nutzbare Tonspur. */}
        <video
          ref={ref}
          src={VIDEO_SRC}
          poster={POSTER}
          loop
          muted
          playsInline
          autoPlay
          preload="metadata"
          onClick={togglePlay}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          className="h-full w-full cursor-pointer object-cover"
        />

        {/* Label oben links */}
        <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-night/45 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-cream backdrop-blur-sm">
          <span className="h-1.5 w-1.5 bg-gold" />
          Cinematic Walkthrough
        </div>

        {/* Play-Overlay, wenn pausiert */}
        {paused && (
          <button
            onClick={togglePlay}
            aria-label="Abspielen"
            className="absolute inset-0 flex items-center justify-center bg-night/30"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-night/50 backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-night md:h-20 md:w-20">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 text-gold md:h-7 md:w-7" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}

        {/* Vollbild */}
        <div className="absolute bottom-4 right-4 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={goFullscreen}
            aria-label="Vollbild"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-night-line bg-night/50 text-cream-soft backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5" />
            </svg>
          </button>
        </div>
      </Tilt>

      <figcaption className="mt-4 text-[13px] text-stone">
        Cinematischer Rundgang durch ein Design-Loft in Hamburg — als Bewegtbild aus
        den Objektaufnahmen komponiert.
      </figcaption>
    </figure>
  )
}
