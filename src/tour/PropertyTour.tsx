import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { TOUR } from './tourData'
import { CubeMark } from '../components/Logo'
import { LegalLinks } from '../components/LegalLinks'
import { useT } from '../i18n'

export function PropertyTour() {
  const t = useT()
  const navigate = useNavigate()
  const location = useLocation()
  const [room, setRoom] = useState(0)
  const [shot, setShot] = useState(0)

  // Schließen = zurück zur vorigen Stelle (Referenzen/Vorschau), nicht nach oben.
  const close = useCallback(() => {
    if (location.key !== 'default') navigate(-1)
    else navigate('/')
  }, [navigate, location.key])

  const rooms = TOUR.rooms
  const current = rooms[room]
  const image = current.images[shot]

  const totalShots = useMemo(
    () => rooms.reduce((n, r) => n + r.images.length, 0),
    [rooms],
  )
  const flatIndex = useMemo(() => {
    let n = 0
    for (let i = 0; i < room; i++) n += rooms[i].images.length
    return n + shot
  }, [rooms, room, shot])

  const isFirst = room === 0 && shot === 0
  const isLast = room === rooms.length - 1 && shot === current.images.length - 1

  const next = useCallback(() => {
    if (shot < rooms[room].images.length - 1) setShot((s) => s + 1)
    else if (room < rooms.length - 1) {
      setRoom((r) => r + 1)
      setShot(0)
    }
  }, [room, shot, rooms])

  const prev = useCallback(() => {
    if (shot > 0) setShot((s) => s - 1)
    else if (room > 0) {
      const pr = room - 1
      setRoom(pr)
      setShot(rooms[pr].images.length - 1)
    }
  }, [room, shot, rooms])

  const goRoom = useCallback((i: number) => {
    setRoom(i)
    setShot(0)
  }, [])

  // Tastatursteuerung
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  // Nächstes Bild vorladen
  useEffect(() => {
    const r = rooms[room]
    const nextSrc =
      shot < r.images.length - 1
        ? r.images[shot + 1].src
        : rooms[room + 1]?.images[0]?.src
    if (nextSrc) {
      const pre = new Image()
      pre.src = nextSrc
    }
  }, [room, shot, rooms])

  useEffect(() => {
    document.title = `${TOUR.title} — 3D-Rundgang · Plan B Studios`
    return () => {
      document.title = t.siteTitle
    }
  }, [t])

  const forwardLabel = isLast
    ? null
    : shot < current.images.length - 1
      ? t.tour.nextView
      : rooms[room + 1].name

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden bg-night text-cream">
      {/* Fortschritt */}
      <div className="absolute inset-x-0 top-0 z-30 h-0.5 bg-night-line">
        <motion.div
          className="h-full bg-gold"
          animate={{ width: `${((flatIndex + 1) / totalShots) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Bildbühne */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={image.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* Unscharfer Vollflächen-Hintergrund gegen schwarze Balken */}
            <img
              src={image.src}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
            />
            <div className="absolute inset-0 bg-night/50" />
            {/* Scharfes Bild, vollständig sichtbar, mit langsamem Ken-Burns */}
            <div className="tour-kenburns absolute inset-0 flex items-center justify-center">
              <img
                src={image.src}
                alt={image.caption}
                className="max-h-full max-w-full object-contain shadow-[0_30px_120px_-20px_rgba(0,0,0,0.9)]"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Vignette + Verläufe für Lesbarkeit */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/70 via-transparent to-night/80" />
      </div>

      {/* Kopfzeile */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-6 lg:p-8">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            <span className="h-1.5 w-1.5 bg-gold" />
            {t.tour.eyebrow}
          </div>
          <h1 className="font-serif text-2xl font-light text-cream md:text-3xl">
            {TOUR.title}
            <span className="text-stone"> · {TOUR.location}</span>
          </h1>
          <LegalLinks className="mt-2 block text-[11px] text-stone/70" />
        </div>
        <button
          onClick={close}
          aria-label={t.tour.close}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-night-line bg-night/40 text-cream-soft backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Seitliche Navigation */}
      {!isFirst && (
        <button
          onClick={prev}
          aria-label={t.tour.prev}
          className="group absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-night-line bg-night/40 text-cream-soft backdrop-blur-sm transition-all duration-300 hover:border-gold hover:text-gold lg:left-8"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      {!isLast && (
        <button
          onClick={next}
          aria-label={t.tour.next}
          className="group absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-night-line bg-night/40 text-cream-soft backdrop-blur-sm transition-all duration-300 hover:border-gold hover:text-gold lg:right-8"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Untere Ebene: Bildunterschrift, Raum-Punkte, Weiter-Hotspot, Raum-Menü */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-5 p-6 lg:p-8">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-lg">
            <p className="mb-2 font-mono text-[11px] tracking-[0.25em] text-gold">
              {t.tour.room} {room + 1} / {rooms.length} · {current.subtitle.toUpperCase()}
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={image.caption}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="font-serif text-xl font-light leading-snug text-cream md:text-2xl"
              >
                {image.caption}
              </motion.p>
            </AnimatePresence>

            {/* Bildpunkte im Raum */}
            <div className="mt-4 flex items-center gap-2">
              {current.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setShot(i)}
                  aria-label={`${t.tour.view} ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === shot ? 'w-7 bg-gold' : 'w-1.5 bg-cream/30 hover:bg-cream/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Weiter-Hotspot */}
          {forwardLabel && (
            <button
              onClick={next}
              className="group hidden shrink-0 items-center gap-3 border border-gold/40 bg-night/50 px-5 py-3 backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-gold hover:text-night sm:flex"
            >
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold transition-colors group-hover:text-night">
                  {t.tour.nextLabel}
                </span>
                <span className="text-[14px] font-medium">{forwardLabel}</span>
              </span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold group-hover:bg-night" />
              </span>
            </button>
          )}
        </div>

        {/* Raum-Menü */}
        <div className="-mx-1 flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {rooms.map((r, i) => (
            <button
              key={r.id}
              onClick={() => goRoom(i)}
              className={`shrink-0 border-b-2 px-4 py-2.5 text-[13px] font-medium tracking-[0.04em] transition-all duration-300 ${
                i === room
                  ? 'border-gold text-cream'
                  : 'border-transparent text-stone hover:text-cream-soft'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>

      {/* Studio-Signatur */}
      <div className="pointer-events-none absolute bottom-6 right-6 z-10 hidden items-center gap-2 opacity-50 lg:flex">
        <CubeMark className="h-4 w-4 text-gold" strokeWidth={1.4} />
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone">Plan B Studios</span>
      </div>
    </div>
  )
}
