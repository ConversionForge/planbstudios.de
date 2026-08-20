import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { de, en, type Dict } from './dict'

export type Lang = 'de' | 'en'

const STORE_KEY = 'pb-lang'

/**
 * Sprache bestimmen — ueber die BROWSERSPRACHE, nicht ueber die IP.
 *
 * Bewusste Entscheidung: IP-Geolokalisierung braeuchte einen Drittanbieter,
 * der bei jedem Aufruf die IP der Besucher verarbeitet. Das wuerde die
 * Datenschutzerklaerung ("keine Dienste Dritter eingebunden") kippen. Die
 * Browsersprache ist ausserdem treffsicherer: Deutsche im Ausland bekommen
 * Deutsch, Englischsprachige in Deutschland bekommen Englisch.
 *
 * Reihenfolge: gespeicherte Wahl > Browsersprache > Deutsch.
 */
export function detectLang(): Lang {
  if (typeof window === 'undefined') return 'de' // Vorrendern in Node

  try {
    const stored = localStorage.getItem(STORE_KEY)
    if (stored === 'de' || stored === 'en') return stored
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
}

const LangContext = createContext<Ctx>({
  lang: 'de',
  t: de,
  setLang: () => {},
  toggle: () => {},
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORE_KEY, l)
    } catch {
      /* egal */
    }
  }, [])

  const toggle = useCallback(
    () => setLang(lang === 'de' ? 'en' : 'de'),
    [lang, setLang],
  )

  // lang-Attribut und Seiten-Meta mitfuehren (Screenreader, Suchmaschinen)
  useEffect(() => {
    const dict = lang === 'de' ? de : en
    document.documentElement.lang = lang
    // Nur den Standardtitel setzen; Unterseiten setzen ihren eigenen.
    if (window.location.pathname === '/') document.title = dict.siteTitle
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', dict.siteDesc)
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, t: lang === 'de' ? de : en, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

/** Kurzform, wenn nur die Texte gebraucht werden. */
export function useT(): Dict {
  return useContext(LangContext).t
}
