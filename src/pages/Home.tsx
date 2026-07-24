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

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: true })
    lenisRef.current = lenis
    let rafId = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(loop)
    })

    // Scroll-Position laufend über Lenis' eigenes Event sichern — das überlebt
    // das Aushängen der Seite (window.scrollY wäre dann schon 0).
    lenis.on('scroll', () => scrollPositions.set(key, Math.round(lenis.scroll)))

    // Position direkt bei der Initialisierung setzen — so springt Lenis nicht in
    // eine falsche Ausgangsposition zurück.
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) lenis.scrollTo(el, { offset: 0, immediate: true })
    } else if (restore) {
      lenis.scrollTo(savedY, { immediate: true, force: true })
    } else {
      lenis.scrollTo(0, { immediate: true, force: true })
    }

    return () => {
      cancelAnimationFrame(rafId)
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
        <ChapterKontakt />
      </main>
      <Footer />
    </div>
  )
}
