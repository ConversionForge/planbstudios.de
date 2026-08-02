import { useEffect, useRef, useState } from 'react'
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
import { lenisRef, saveScroll, readScroll } from '../lib/scroll'

export function Home() {
  const [introDone, setIntroDone] = useState(false)
  const location = useLocation()
  const navType = useNavigationType()
  // Dunkler Vorhang für weite Sektionssprünge: Der Sprung passiert verdeckt,
  // statt dass sichtbar die ganze Seite vorbeirast.
  const veilRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const key = location.key
    // Nur beim Zurück (POP) wiederherstellen; sessionStorage-Fallback deckt
    // den Fall ab, dass ein Reload die Merkliste geleert hat.
    const savedY = navType === 'POP' ? readScroll(key, '/') : null
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

    // Scroll-Position laufend sichern. lenis.on('scroll') deckt das Mausrad ab;
    // der native Listener deckt Touch-Scrollen (Handy) ab.
    const save = () => saveScroll(key, '/', Math.round(window.scrollY))
    lenis.on('scroll', save)
    window.addEventListener('scroll', save, { passive: true })

    const timers: number[] = []
    let restoreRaf = 0

    // Weiter Sprung hinter kurzem Vorhang: abdunkeln → unsichtbar springen →
    // aufdecken. Die Ziel-Sektion "erscheint", nichts rattert vorbei.
    const veilJump = (targetY: number) => {
      const veil = veilRef.current
      if (!veil) {
        lenis.scrollTo(targetY, { immediate: true, force: true })
        return
      }
      veil.style.transition = 'opacity 220ms ease-out'
      veil.style.opacity = '1'
      timers.push(
        window.setTimeout(() => {
          lenis.scrollTo(targetY, { immediate: true, force: true })
          timers.push(
            window.setTimeout(() => {
              veil.style.transition = 'opacity 500ms ease-in-out'
              veil.style.opacity = '0'
            }, 160),
          )
        }, 230),
      )
    }

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    // Zentrales Scrollen für ALLE In-Page-Anker (Nav, Footer, CTAs).
    // preventDefault verhindert den nativen Sprung UND die Hash-Verschmutzung.
    // Kurze Distanzen gleiten sanft; alles über ~1,5 Bildschirmhöhen springt
    // hinter dem Vorhang.
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
      const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 80)
      const distance = Math.abs(targetY - window.scrollY)
      if (distance > window.innerHeight * 1.5) {
        veilJump(targetY)
      } else {
        lenis.scrollTo(targetY, {
          duration: Math.min(1.2, Math.max(0.8, distance / 2400)),
          easing: easeInOutCubic,
        })
      }
    }
    document.addEventListener('click', onAnchorClick)

    // ---- Wiederherstellung beim Zurück (POP) ----
    // Pro Frame nachführen, bis die Position nachweislich sitzt (Layout/Bilder
    // können die Seitenhöhe anfangs noch ändern). Echtes Nutzer-Scrollen bricht
    // ab — aber erst nach kurzer Schonfrist, damit Rest-Momentum vom Touch die
    // Wiederherstellung nicht killt.
    let cancelled = false
    const cancelRestore = () => {
      cancelled = true
    }
    if (savedY !== null) {
      timers.push(
        window.setTimeout(() => {
          window.addEventListener('wheel', cancelRestore, { passive: true })
          window.addEventListener('touchmove', cancelRestore, { passive: true })
        }, 350),
      )
      const started = performance.now()
      let stable = 0
      const step = () => {
        if (cancelled) return
        if (Math.abs(window.scrollY - savedY) > 1) {
          lenis.resize()
          lenis.scrollTo(savedY, { immediate: true, force: true })
          stable = 0
        } else {
          stable++
        }
        if (performance.now() - started < 1200 && stable < 12) {
          restoreRaf = requestAnimationFrame(step)
        }
      }
      step()
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
    if (hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      cancelAnimationFrame(restoreRaf)
      timers.forEach(clearTimeout)
      document.removeEventListener('click', onAnchorClick)
      window.removeEventListener('scroll', save)
      window.removeEventListener('wheel', cancelRestore)
      window.removeEventListener('touchmove', cancelRestore)
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
      {/* Sprung-Vorhang: unter der Navigation (z-50), über dem Inhalt */}
      <div
        ref={veilRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[45] bg-night opacity-0"
      />
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
