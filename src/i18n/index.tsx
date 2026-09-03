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

/**
 * Hat der Besucher die Sprache selbst gewaehlt — oder wurde sie nur aus dem
 * Browser geraten? Eine gespeicherte Wahl entsteht ausschliesslich durch einen
 * Klick auf die Umschaltung.
 */
function hatEigeneWahl(): boolean {
  if (typeof window === 'undefined') return false // Vorrendern in Node
  try {
    const gespeichert = localStorage.getItem(STORE_KEY)
    return gespeichert === 'de' || gespeichert === 'en'
  } catch {
    return false // Speicher blockiert: dann gilt es als nicht gewaehlt
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)
  const [gewaehlt, setGewaehlt] = useState<boolean>(hatEigeneWahl)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    setGewaehlt(true)
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

  // lang-Attribut mitfuehren, damit Screenreader den Text richtig aussprechen.
  // Das folgt bewusst dem TATSAECHLICH angezeigten Inhalt.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  /**
   * Titel und Beschreibung nur bei AUSDRUECKLICHER Sprachwahl anfassen.
   *
   * GEMESSEN, und der Grund fuer diese Unterscheidung: Googlebot rendert die
   * Seite mit navigator.languages = ["en-US","en"]. Die Erkennung lieferte
   * daraufhin "en", und dieser Effekt hat Titel und Beschreibung mit den
   * englischen Fassungen ueberschrieben. In der Google-Suche stand deshalb
   * "Web design & 3D tours for real estate — Plan B Studios, Lübeck", obwohl
   * der Server durchgehend Deutsch ausliefert.
   *
   * Ein Robot hat keine gespeicherte Wahl, sieht also weiterhin genau das, was
   * im ausgelieferten HTML steht: Deutsch. Wer dagegen selbst auf EN klickt,
   * bekommt den englischen Titel — das ist eine Entscheidung des Besuchers und
   * kein Ratespiel.
   *
   * Zweite Korrektur hier: Die Beschreibung wurde bisher auf JEDER Seite
   * ueberschrieben (nur der Titel hatte die Bereichspruefung). Damit hat sie
   * die eigenen Beschreibungen der Unterseiten aus postbuild.mjs wieder
   * plattgemacht. Jetzt gilt fuer beide dieselbe Grenze: nur die Startseite.
   */
  useEffect(() => {
    if (!gewaehlt) return
    if (window.location.pathname !== '/') return
    const dict = lang === 'de' ? de : en
    document.title = dict.siteTitle
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', dict.siteDesc)
  }, [lang, gewaehlt])

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
