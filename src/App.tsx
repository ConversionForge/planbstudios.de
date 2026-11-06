import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { Home } from './pages/Home'
import { Impressum } from './pages/Impressum'
import { Datenschutz } from './pages/Datenschutz'
import { HavelGrauSite } from './example/HavelGrauSite'
import { MeridianSite } from './example/MeridianSite'
import { PropertyTour } from './tour/PropertyTour'
import { NotFound } from './pages/NotFound'
import { MaklerSituation } from './pages/MaklerSituation'
import { WebdesignLuebeck } from './pages/WebdesignLuebeck'
import { Rundgaenge } from './pages/Rundgaenge'
import { UeberMich } from './pages/UeberMich'
import { WebsiteBetreuung } from './pages/WebsiteBetreuung'
import { Automatisierung } from './pages/Automatisierung'
import { AkquiseStrecken } from './pages/AkquiseStrecken'
import { AkquiseCheck } from './pages/AkquiseCheck'
import { PageCurtain } from './components/PageCurtain'
import { saveScroll, readScroll } from './lib/scroll'

function ScrollManager() {
  const location = useLocation()
  const navType = useNavigationType()

  // Scroll-Wiederherstellung selbst übernehmen (nicht der Browser).
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    // Die Startseite regelt ihre Scroll-Position (Lenis) selbst.
    if (location.pathname === '/') return

    const key = location.key
    const saved = navType === 'POP' ? readScroll(key, location.pathname) : null
    const timers: number[] = []

    if (saved !== null) {
      // Mehrfach nachsetzen, bis Layout/Bilder stehen.
      window.scrollTo(0, saved)
      timers.push(window.setTimeout(() => window.scrollTo(0, saved), 60))
      timers.push(window.setTimeout(() => window.scrollTo(0, saved), 220))
    } else if (location.hash) {
      // Verweis auf einen Abschnitt einer Unterseite, etwa
      // /automatisierung/#einschaetzung. Der Browser springt bei einem
      // Seitenwechsel innerhalb der App nicht von selbst dorthin. Kurz warten,
      // bis die Seite steht; 100 Pixel Abstand fuer die feste Kopfzeile.
      const springen = () => {
        const el = document.getElementById(decodeURIComponent(location.hash.slice(1)))
        if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 100)
      }
      timers.push(window.setTimeout(springen, 80))
      timers.push(window.setTimeout(springen, 400))
    } else {
      window.scrollTo(0, 0)
    }

    // Unterseiten feuern native Scroll-Events → Position laufend sichern.
    const onScroll = () => saveScroll(key, location.pathname, Math.round(window.scrollY))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('scroll', onScroll)
    }
  }, [location, navType])

  return null
}

function App() {
  return (
    // reducedMotion="user": Wer in den Systemeinstellungen "Bewegung
    // reduzieren" gewaehlt hat, bekommt Ein- und Ausblendungen ohne Fahrt und
    // ohne Skalierung.
    <MotionConfig reducedMotion="user">
      <ScrollManager />
      <PageCurtain />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/beispiel" element={<HavelGrauSite />} />
        <Route path="/meridian" element={<MeridianSite />} />
        <Route path="/rundgang" element={<PropertyTour />} />
        {/* Leistungsseiten, in der Reihenfolge ihres Gewichts. */}
        <Route path="/automatisierung" element={<Automatisierung />} />
        <Route path="/akquise-strecken" element={<AkquiseStrecken />} />
        <Route path="/webdesign-luebeck" element={<WebdesignLuebeck />} />
        <Route path="/website-betreuung" element={<WebsiteBetreuung />} />
        <Route path="/3d-rundgaenge" element={<Rundgaenge />} />
        <Route path="/makler/mehr-eigentuemeranfragen" element={<MaklerSituation />} />
        <Route path="/ueber-mich" element={<UeberMich />} />
        <Route path="/akquise-check" element={<AkquiseCheck />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MotionConfig>
  )
}

export default App
