// Referenzen: echte Kundenprojekte.
//
// ---------------------------------------------------------------------------
// STAND 06.11.2026: NOCH KEINE KUNDENREFERENZ.
//
// - ImNordenImmobilien war ein angepasstes Beispiel fuer eine Praesentation,
//   kein Kunde. Darf hier nie auftauchen.
// - Wucherpfennig (Matthias Krohn) ist ein Interessent: Praesentation
//   angefragt, noch keine Antwort. Erst eintragen, wenn ein Auftrag laeuft UND
//   er der Nennung zugestimmt hat. Bis dahin auch nicht anonymisiert
//   beschreiben: Ein Unternehmen mit ueber 80 Stationen erkennt sich selbst,
//   und ein oeffentlich ausgeschlachteter Pitch kostet den Auftrag.
//
// REGEL: Hier steht nur, was der Inhaber selbst angegeben und freigegeben hat.
// Nichts erfinden, nichts ausschmuecken, keine Zahlen schaetzen. Eine
// Kundenreferenz ist eine Werbeaussage (§ 5 UWG): Sie muss stimmen, und der
// Kunde muss mit der Nennung einverstanden sein.
//
// Solange die Liste leer ist, erscheinen der Abschnitt "Referenzen" und sein
// Eintrag in der Navigation nirgends. Statt dessen steht auf der Startseite
// "Was ich Ihnen nicht verspreche" (src/components/start/Ehrlich.tsx).
//
// `freigegeben: true` erst setzen, wenn BEIDES geklaert ist: Die Angaben
// stimmen, und der Kunde ist mit der Nennung einverstanden. Nicht
// freigegebene Eintraege erscheinen nur in der lokalen Vorschau
// (npm run dev), mit sichtbarem Hinweis, und NIE in der veroeffentlichten
// Seite.
// ---------------------------------------------------------------------------

export type Leistungsart = 'Automatisierung' | 'Akquise-Strecke' | 'Website'

export interface Referenz {
  /** Kunde, wie er genannt werden moechte (Firma oder Person). */
  kunde: string
  /** Branche des Kunden, z. B. "Immobilienmakler". */
  branche: string
  ort?: string
  leistung: Leistungsart
  /** Ein Satz: Was wurde gebaut? */
  titel: string
  /** Wie lief es vorher? */
  vorher?: string
  /** Was laeuft jetzt automatisch? */
  jetzt?: string
  /** Nur nachpruefbare Ergebnisse, keine Schaetzungen. */
  ergebnis?: string
  zitat?: { text: string; person: string }
  /** Oeffentlich sichtbare Adresse des Ergebnisses, falls es eine gibt. */
  url?: string
  freigegeben: boolean
}

export const REFERENZEN: Referenz[] = []

/**
 * Was angezeigt werden darf. In der lokalen Vorschau alles (zum Gestalten),
 * im fertigen Build nur Freigegebenes.
 */
export function sichtbareReferenzen(): Referenz[] {
  return REFERENZEN.filter((r) => r.freigegeben || import.meta.env.DEV)
}
