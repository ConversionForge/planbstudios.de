import { de, type Dict } from './dict'

/**
 * Die Seite ist einsprachig deutsch.
 *
 * Vorgeschichte, damit das nicht versehentlich zurueckkommt: Bis November 2026
 * gab es unter /en/ eine englische Fassung der Startseite, verknuepft ueber
 * hreflang. Sie ist entfallen. Die Zielgruppe sind Betriebe in
 * Schleswig-Holstein, und jede neue Seite haette doppelt gepflegt werden
 * muessen. Die alte Adresse leitet dauerhaft (301) auf die Startseite um,
 * siehe public/_redirects.
 *
 * Der Haken bleibt bestehen, damit die Komponenten, die gemeinsame Texte
 * brauchen (404, Rundgang, Video, Rechtslinks), sie an einer Stelle finden.
 */
export function useT(): Dict {
  return de
}
