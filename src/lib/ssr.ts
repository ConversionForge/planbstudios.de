/**
 * Hilfen fuer das Vorrendern in Node.
 *
 * Beim Vorrendern gibt es kein window und keine Animationsframes. Komponenten,
 * die ihren Ausgangszustand auf "unsichtbar" setzen und erst per Animation
 * einblenden, wuerden deshalb mit Deckkraft 0 im statischen HTML landen: Der
 * Text stuende zwar da, waere aber ohne JavaScript unsichtbar. Genau das macht
 * das Vorrendern wertlos.
 *
 * Deshalb rendert der Server direkt den sichtbaren Endzustand. Im Browser
 * ersetzt React das Markup ohnehin sofort, die Animationen laufen dort normal.
 */
export const SSR = typeof window === 'undefined'

/** Fuer Bloecke mit benannten Varianten: statt "hidden" gleich "show". */
export const startVariante = SSR ? 'show' : 'hidden'

/**
 * Fuer Bloecke mit einem Ausgangszustand als Objekt. `false` sagt motion, dass
 * es gar keinen Ausgangszustand geben soll; das Element erscheint dann in
 * seinem normalen Zustand, also sichtbar.
 */
export function start<T>(zustand: T): T | false {
  return SSR ? false : zustand
}
