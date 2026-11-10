import { sichtbareReferenzen } from '../inhalte/referenzen'

// Hauptnavigation, gemeinsam fuer Startseite, Leistungsseiten und Fussbereich.
//
// Die Reihenfolge ist die Gewichtung des Angebots und kein Zufall:
// Automatisierung und Akquise-Strecken zuerst, Websites danach. Die
// 3D-Rundgaenge stehen bewusst NICHT in der Hauptnavigation. Sie sind eine
// Ergaenzung fuer Makler und werden dort angeboten, wo es um Akquise geht.

export interface NavEintrag {
  label: string
  /** Echter Pfad mit abschliessendem Schraegstrich (siehe canonical). */
  zu: string
}

/**
 * Nachweis-Eintrag: "Referenzen", sobald es mindestens eine freigegebene
 * Kundenreferenz gibt, bis dahin "Arbeitsproben". Ein Eintrag "Referenzen"
 * ohne Referenzen waere ein toter Verweis, und als Referenzen ausgegebene
 * Beispiele waeren eine irrefuehrende Werbeaussage.
 */
const NACHWEIS: NavEintrag =
  sichtbareReferenzen().length > 0
    ? { label: 'Referenzen', zu: '/#referenzen' }
    : { label: 'Arbeitsproben', zu: '/#arbeitsproben' }

export const HAUPTNAVIGATION: NavEintrag[] = [
  { label: 'Automatisierung', zu: '/automatisierung/' },
  { label: 'Akquise-Strecken', zu: '/akquise-strecken/' },
  { label: 'Websites', zu: '/webdesign-luebeck/' },
  NACHWEIS,
  { label: 'Über mich', zu: '/ueber-mich/' },
]
