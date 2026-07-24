import type Lenis from 'lenis'

// Die aktive Lenis-Instanz (nur auf der Startseite gesetzt), damit die
// Scroll-Wiederherstellung dort über Lenis statt über window.scrollTo läuft.
export const lenisRef: { current: Lenis | null } = { current: null }

// Gemerkte Scroll-Positionen je History-Eintrag (location.key).
export const scrollPositions = new Map<string, number>()
