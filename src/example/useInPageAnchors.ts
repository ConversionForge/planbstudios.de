import { useEffect } from 'react'

/**
 * Fängt auf den Beispielseiten (Havel & Grau, MERIDIAN) alle In-Page-Anker
 * (`<a href="#…">`) ab und scrollt nativ + smooth dorthin — OHNE den #-Anker in
 * die URL zu schreiben.
 *
 * Warum wichtig: Die Beispielseiten laufen ohne Lenis/zentralen Anker-Handler.
 * Ein nativer Anker-Klick pusht einen History-Eintrag und ändert den Hash, ohne
 * dass react-router (hört nicht auf `hashchange`) es mitbekommt. Dadurch geraten
 * Browser-History und Router-Keys aus dem Takt → beim „Zurück zu Plan B Studios"
 * findet die Startseite ihren gespeicherten Scroll-Key nicht mehr und springt
 * nach ganz oben. preventDefault verhindert genau das.
 */
export function useInPageAnchors(offset = 0) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey)
        return
      const a = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href') || ''
      if (href.length < 2) return
      const el = document.getElementById(href.slice(1))
      if (!el) return
      e.preventDefault()
      const y = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [offset])
}
