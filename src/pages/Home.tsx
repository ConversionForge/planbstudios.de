import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
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

export function Home() {
  const [introDone, setIntroDone] = useState(false)
  const { hash } = useLocation()

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: true })
    let rafId = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(loop)
    })

    // Ankersprung von einer anderen Route (z.B. /impressum -> /#webdesign)
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        requestAnimationFrame(() =>
          lenis.scrollTo(el, { offset: 0, immediate: false, duration: 1.2 }),
        )
      }
    }

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
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
