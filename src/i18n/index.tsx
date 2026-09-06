import { createContext, useCallback, useContext, useEffect, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { de, en, type Dict } from './dict'

export type Lang = 'de' | 'en'

const STORE_KEY = 'pb-lang'

/** Unter dieser Adresse liegt die englische Fassung der Startseite. */
export const EN_PFAD = '/en'

/**
 * Die ADRESSE bestimmt die Sprache — nicht der Browser.
 *
 * Vorgeschichte, damit das nicht wieder aufgeweicht wird: Frueher hat der
 * Browser entschieden, und beide Sprachen lagen unter derselben Adresse.
 * Googlebot rendert mit navigator.languages = ["en-US","en"], bekam also die
 * englische Fassung — und genau die stand dann in der deutschen Suche. Eine
 * Adresse, die je nach Besucher etwas anderes zeigt, kann eine Suchmaschine
 * nicht sauber einordnen.
 *
 * Jetzt gilt: "/" ist deutsch, "/en" ist englisch, beide sind ueber
 * hreflang miteinander verknuepft. Was ein Robot unter einer Adresse sieht,
 * ist immer dasselbe.
 */
export function langAusPfad(pathname: string): Lang {
  return pathname === EN_PFAD || pathname.startsWith(EN_PFAD + '/') ? 'en' : 'de'
}

/**
 * Bevorzugte Sprache des Browsers. Wird NUR noch fuer den dezenten Hinweis
 * benutzt ("This site is also available in English"), nicht mehr fuer die
 * Auslieferung. Ein Hinweis laesst dem Besucher die Wahl; eine automatische
 * Umleitung wuerde Suchmaschinen dieselbe Wahl nehmen — davon raet Google
 * ausdruecklich ab.
 */
export function browserBevorzugt(): Lang {
  if (typeof window === 'undefined') return 'de' // Vorrendern in Node

  try {
    const gespeichert = localStorage.getItem(STORE_KEY)
    if (gespeichert === 'de' || gespeichert === 'en') return gespeichert
  } catch {
    /* Speicher blockiert — dann eben Browsersprache */
  }

  const prefs: string[] = navigator.languages?.length
    ? [...navigator.languages]
    : [navigator.language]

  // Deutsch nur, wenn es die BEVORZUGTE Sprache ist (erste passende Angabe).
  for (const p of prefs) {
    const tag = p.toLowerCase()
    if (tag.startsWith('de')) return 'de'
    if (/^[a-z]{2}/.test(tag)) return 'en'
  }
  return 'de'
}

interface Ctx {
  lang: Lang
  t: Dict
  setLang: (l: Lang) => void
  toggle: () => void
  /** Adresse der jeweils anderen Sprachfassung, fuer echte Verweise. */
  pfadFuer: (l: Lang) => string
}

const LangContext = createContext<Ctx>({
  lang: 'de',
  t: de,
  setLang: () => {},
  toggle: () => {},
  pfadFuer: () => '/',
})

export function LangProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const lang = langAusPfad(pathname)

  const pfadFuer = useCallback((l: Lang) => (l === 'en' ? EN_PFAD : '/'), [])

  const setLang = useCallback(
    (l: Lang) => {
      // Die Wahl merken, damit ein Wiederkehrer nicht erneut hingewiesen wird.
      try {
        localStorage.setItem(STORE_KEY, l)
      } catch {
        /* egal */
      }
      navigate(pfadFuer(l))
    },
    [navigate, pfadFuer],
  )

  const toggle = useCallback(() => setLang(lang === 'de' ? 'en' : 'de'), [lang, setLang])

  // lang-Attribut mitfuehren, damit Screenreader den Text richtig aussprechen.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  /**
   * Titel und Beschreibung bei einem Sprachwechsel INNERHALB der Seite
   * nachziehen. Beim ersten Aufruf steht das Richtige schon im ausgelieferten
   * HTML (scripts/postbuild.mjs schreibt es je Adresse); das hier greift nur
   * beim Klick auf DE/EN, wenn kein Neuladen stattfindet.
   *
   * Massgeblich ist die ADRESSE. Ein Robot laedt jede Adresse frisch und sieht
   * damit immer genau das, was der Server ausliefert.
   */
  useEffect(() => {
    const istStartseite =
      pathname === '/' || pathname === EN_PFAD || pathname === EN_PFAD + '/'
    if (!istStartseite) return // Unterseiten setzen ihren eigenen Titel

    const dict = lang === 'de' ? de : en
    const basis = 'https://planbstudios.de'
    const url = lang === 'en' ? `${basis}${EN_PFAD}/` : `${basis}/`

    document.title = dict.siteTitle
    setzeMeta('name', 'description', dict.siteDesc)
    setzeMeta('property', 'og:title', dict.siteTitle)
    setzeMeta('property', 'og:description', dict.siteDesc)
    setzeMeta('property', 'og:url', url)
    setzeMeta('property', 'og:locale', lang === 'en' ? 'en_US' : 'de_DE')
    setzeMeta('name', 'twitter:title', dict.siteTitle)
    setzeMeta('name', 'twitter:description', dict.siteDesc)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
  }, [lang, pathname])

  return (
    <LangContext.Provider
      value={{ lang, t: lang === 'de' ? de : en, setLang, toggle, pfadFuer }}
    >
      {children}
    </LangContext.Provider>
  )
}

function setzeMeta(art: 'name' | 'property', schluessel: string, wert: string) {
  document.querySelector(`meta[${art}="${schluessel}"]`)?.setAttribute('content', wert)
}

export function useLang() {
  return useContext(LangContext)
}

/** Kurzform, wenn nur die Texte gebraucht werden. */
export function useT(): Dict {
  return useContext(LangContext).t
}
