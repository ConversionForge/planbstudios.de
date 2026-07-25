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

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: true })
    lenisRef.current = lenis
    let rafId = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(loop)
    })

    // Scroll-Position laufend sichern. lenis.on('scroll') deckt das Mausrad ab;
    // der native Listener deckt Touch-Scrollen (Handy) ab.
    const save = () => scrollPositions.set(key, Math.round(window.scrollY))
    lenis.on('scroll', save)
    window.addEventListener('scroll', save, { passive: true })

    // Reihenfolge wichtig: Beim Zurück (POP) hat die gemerkte Position Vorrang
    // vor einem Anker (#…), der noch in der URL steht.
    if (restore) {
      lenis.scrollTo(savedY, { immediate: true, force: true })
    } else if (hash) {
      const el = document.getElementById(hash.slice(1))
      lenis.scrollTo(el ?? 0, { offset: 0, immediate: true })
    } else {
      lenis.scrollTo(0, { immediate: true, force: true })
    }

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', save)
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
