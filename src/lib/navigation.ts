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

const ALLE: NavEintrag[] = [
  { label: 'Automatisierung', zu: '/automatisierung/' },
  { label: 'Akquise-Strecken', zu: '/akquise-strecken/' },
  { label: 'Websites', zu: '/webdesign-luebeck/' },
  { label: 'Referenzen', zu: '/#referenzen' },
  { label: 'Über mich', zu: '/ueber-mich/' },
]

/**
 * Der Abschnitt "Referenzen" erscheint nur mit mindestens einer freigegebenen
 * Referenz. Ohne ihn waere der Eintrag ein toter Verweis.
 */
export const HAUPTNAVIGATION: NavEintrag[] = ALLE.filter(
  (e) => e.zu !== '/#referenzen' || sichtbareReferenzen().length > 0,
)
