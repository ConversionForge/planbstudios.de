import { useEffect, useState } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import Lenis from 'lenis'
import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { Statement } from '../components/Statement'
import { ChapterWebdesign } from '../components/ChapterWebdesign'
import { Chapter3D } from '../components/Chapter3D'
import { ChapterReferenzen } from '../components/ChapterReferenzen'
import { ChapterStudio } from '../components/ChapterStudio'
import { FAQ } from '../components/FAQ'
import { ChapterKontakt } from '../components/ChapterKontakt'
import { Footer } from '../components/Footer'
import { Cursor } from '../components/Cursor'
import { GrainOverlay } from '../components/GrainOverlay'
import { Preloader } from '../components/Preloader'
import { ScrollProgress } from '../components/ScrollProgress'
import { lenisRef, scrollPositions } from '../lib/scroll'

export function Home() {
  const [introDone, setIntroDone] = useState(false)
  const location = useLocation()
  const navType = useNavigationType()

  useEffect(() => {
    const key = location.key
    // Zielwert vor dem Abonnieren lesen, damit ein Init-Scroll-Event ihn nicht
    // vorher mit 0 überschreibt.
    const savedY = scrollPositions.get(key) ?? 0
    const restore = navType === 'POP' && scrollPositions.has(key)
    const hash = location.hash

    // anchors: false → Lenis fasst Anker-Klicks NICHT an. Wir übernehmen das
    // selbst (siehe onAnchorClick), damit die URL keinen #-Hash bekommt. Sonst
    // würde ein Reload zum alten Anker springen statt nach oben.
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: false })
    lenisRef.current = lenis
    let rafId = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(loop)
    })

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    // Zentrales, ruhiges Scrollen für ALLE In-Page-Anker (Nav, Footer, CTAs).
    // preventDefault verhindert den nativen Sprung UND die Hash-Verschmutzung.
    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return
      const a = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href') || ''
      if (href.length < 2) return
      const el = document.getElementById(href.slice(1))
      if (!el) return
      e.preventDefault()
      const targetY = el.getBoundingClientRect().top + window.scrollY - 80
      const distance = Math.abs(targetY - window.scrollY)
      const duration = Math.min(2.6, Math.max(1.4, distance / 4200))
      lenis.scrollTo(targetY, { duration, easing: easeInOutCubic })
    }
    document.addEventListener('click', onAnchorClick)

    // Scroll-Position laufend sichern. lenis.on('scroll') deckt das Mausrad ab;
    // der native Listener deckt Touch-Scrollen (Handy) ab.
    const save = () => scrollPositions.set(key, Math.round(window.scrollY))
    lenis.on('scroll', save)
    window.addEventListener('scroll', save, { passive: true })

    const timers: number[] = []

    // Erst bei ECHTER Scroll-Bewegung nicht mehr nachsetzen — ein bloßer Tap
    // (touchstart) darf die Wiederherstellung auf dem Handy nicht abbrechen.
    let interrupted = false
    const interrupt = () => {
      interrupted = true
    }
    const onKeyInterrupt = (e: KeyboardEvent) => {
      if (
        ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(
          e.key,
        )
      )
        interrupted = true
    }
    window.addEventListener('wheel', interrupt, { passive: true })
    window.addEventListener('touchmove', interrupt, { passive: true })
    window.addEventListener('keydown', onKeyInterrupt)

    // Reihenfolge wichtig: Beim Zurück (POP) hat die gemerkte Position Vorrang
    // vor einem Anker (#…), der noch in der URL steht.
    if (restore) {
      // Beim Neu-Mount kennt Lenis die volle Seitenhöhe evtl. noch nicht
      // (Fonts/Layout). Dann würde scrollTo(savedY) zu weit oben festklemmen.
      // Darum resize() + mehrfaches Nachsetzen, bis das Layout steht.
      const applyRestore = () => {
        if (interrupted) return
        lenis.resize()
        lenis.scrollTo(savedY, { immediate: true, force: true })
      }
      applyRestore()
      timers.push(window.setTimeout(applyRestore, 60))
      timers.push(window.setTimeout(applyRestore, 180))
      timers.push(window.setTimeout(applyRestore, 400))
      timers.push(window.setTimeout(applyRestore, 700))
    } else if (hash) {
      const el = document.getElementById(hash.slice(1))
      lenis.scrollTo(el ? el.getBoundingClientRect().top + window.scrollY - 80 : 0, {
        immediate: true,
      })
    } else {
      lenis.scrollTo(0, { immediate: true, force: true })
    }

    // Einen (evtl. veralteten) #-Anker aus der URL entfernen, nachdem er einmal
    // ausgewertet wurde. Sonst springt ein späteres Neuladen wieder dorthin —
    // z. B. wenn noch ein alter Link mit #webdesign in der Adresszeile steht.
    if (location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }

    return () => {
      cancelAnimationFrame(rafId)
      timers.forEach(clearTimeout)
      document.removeEventListener('click', onAnchorClick)
      window.removeEventListener('scroll', save)
      window.removeEventListener('wheel', interrupt)
      window.removeEventListener('touchmove', interrupt)
      window.removeEventListener('keydown', onKeyInterrupt)
      lenis.destroy()
      lenisRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bg-night text-cream">
      <Preloader onDone={() => setIntroDone(true)} />
      <Cursor />
      <GrainOverlay />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero introDone={introDone} />
        <Statement />
        <ChapterWebdesign />
        <Chapter3D />
        <ChapterReferenzen />
        <ChapterStudio />
        <FAQ />
        <ChapterKontakt />
      </main>
      <Footer />
    </div>
  )
}
