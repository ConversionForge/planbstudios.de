import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Home } from './pages/Home'
import { Impressum } from './pages/Impressum'
import { Datenschutz } from './pages/Datenschutz'
import { HavelGrauSite } from './example/HavelGrauSite'
import { MeridianSite } from './example/MeridianSite'
import { PropertyTour } from './tour/PropertyTour'
import { NotFound } from './pages/NotFound'
import { PageCurtain } from './components/PageCurtain'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <PageCurtain />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/beispiel" element={<HavelGrauSite />} />
        <Route path="/meridian" element={<MeridianSite />} />
        <Route path="/rundgang" element={<PropertyTour />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
