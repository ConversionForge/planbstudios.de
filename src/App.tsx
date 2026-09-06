import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import { Home } from './pages/Home'
import { Impressum } from './pages/Impressum'
import { Datenschutz } from './pages/Datenschutz'
import { HavelGrauSite } from './example/HavelGrauSite'
import { MeridianSite } from './example/MeridianSite'
import { PropertyTour } from './tour/PropertyTour'
import { NotFound } from './pages/NotFound'
import { MaklerSituation } from './pages/MaklerSituation'
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
    // Die Startseite regelt ihre Scroll-Position (Lenis) selbst — in beiden
    // Sprachfassungen. Der abschliessende Schraegstrich muss weg: Beim direkten
    // Aufruf von /en/ liefert der Router "/en/", beim Klick auf den Umschalter
    // "/en". Ohne die Vereinheitlichung liefe hier die Verwaltung fuer
    // Unterseiten mit und wuerde gegen Lenis arbeiten.
    const pfad = location.pathname.replace(/\/+$/, '') || '/'
    if (pfad === '/' || pfad === '/en') return

    const key = location.key
    const saved = navType === 'POP' ? readScroll(key, location.pathname) : null
    const timers: number[] = []

    if (saved !== null) {
      // Mehrfach nachsetzen, bis Layout/Bilder stehen.
      window.scrollTo(0, saved)
      timers.push(window.setTimeout(() => window.scrollTo(0, saved), 60))
      timers.push(window.setTimeout(() => window.scrollTo(0, saved), 220))
    } else if (!location.hash) {
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
    <>
      <ScrollManager />
      <PageCurtain />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Englische Fassung der Startseite unter eigener Adresse. Beide sind
            ueber hreflang verknuepft; welche Sprache gilt, entscheidet die
            Adresse (siehe src/i18n/index.tsx). */}
        <Route path="/en" element={<Home />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/beispiel" element={<HavelGrauSite />} />
        <Route path="/meridian" element={<MeridianSite />} />
        <Route path="/rundgang" element={<PropertyTour />} />
        <Route path="/makler/mehr-eigentuemeranfragen" element={<MaklerSituation />} />
        <Route path="/akquise-check" element={<AkquiseCheck />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
