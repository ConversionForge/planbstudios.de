// Ereignis-Meldung für den Akquise-Check.
//
// Solange kein Analytics eingebunden ist, passiert hier nichts. Die Aufrufe
// stehen aber schon an den richtigen Stellen, sodass Plausible später nur noch
// eingebunden werden muss, ohne die Formularstrecke erneut anzufassen.
//
// Bewusst kein eigener Netzwerkaufruf: Ein selbstgebautes Zählen würde IP und
// Zeitpunkt an einen eigenen Endpunkt schicken und wäre damit
// datenschutzrechtlich genau die Verarbeitung, die das cookiefreie Werkzeug
// gerade vermeiden soll.

declare global {
  interface Window {
    plausible?: (ereignis: string, optionen?: { props?: Record<string, string> }) => void
  }
}

export type Ereignis =
  | 'check_start'
  | 'check_schritt_2'
  | 'check_schritt_3'
  | 'check_schritt_4'
  | 'check_schritt_5'
  | 'check_kontakt_gesendet'

export function melde(ereignis: Ereignis) {
  try {
    window.plausible?.(ereignis)
  } catch {
    /* Messung darf die Seite nie stoeren */
  }
}

/** Schritt-Ereignis für die Fragen 2 bis 5 (Frage 1 zählt als check_start). */
export function meldeSchritt(nummer: number) {
  if (nummer >= 2 && nummer <= 5) {
    melde(`check_schritt_${nummer}` as Ereignis)
  }
}
