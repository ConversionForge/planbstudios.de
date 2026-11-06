// Referenzen: echte Kundenprojekte.
//
// ---------------------------------------------------------------------------
// REGEL: Hier steht nur, was der Inhaber selbst angegeben und freigegeben hat.
//
// Nichts erfinden, nichts ausschmuecken, keine Zahlen schaetzen. Ein Makler,
// der eine erfundene Referenz liest und nachfragt, glaubt danach auch dem Rest
// der Seite nicht mehr. Ausserdem ist eine Kundenreferenz eine Werbeaussage
// (§ 5 UWG): Sie muss stimmen, und der Kunde muss mit der Nennung
// einverstanden sein.
//
// `freigegeben: true` erst setzen, wenn BEIDES geklaert ist: Die Angaben
// stimmen, und der Kunde ist mit der Nennung seines Namens einverstanden.
// Nicht freigegebene Eintraege erscheinen nur in der lokalen Vorschau
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

export const REFERENZEN: Referenz[] = [
  {
    kunde: 'ImNordenImmobilien',
    branche: 'Immobilienmakler',
    leistung: 'Akquise-Strecke',
    titel: 'Akquise-Strecke für Eigentümer',
    // OFFEN (vom Inhaber): Was genau gebaut wurde, wie es vorher lief, was
    // jetzt automatisch passiert, ob es ein nachpruefbares Ergebnis gibt,
    // Ort, oeffentliche Adresse, Einverstaendnis mit der Nennung.
    freigegeben: false,
  },
  {
    kunde: 'Matthias Krohn',
    branche: 'Branche offen',
    leistung: 'Automatisierung',
    titel: 'Automatisierung von Büro- und Verwaltungsarbeit',
    // OFFEN (vom Inhaber): Branche, welche Ablaeufe automatisiert wurden,
    // vorher und jetzt, Ergebnis, Einverstaendnis mit der Nennung.
    freigegeben: false,
  },
  {
    kunde: 'Restaurant (Name offen)',
    branche: 'Gastronomie',
    leistung: 'Automatisierung',
    titel: 'Automatisierung im Restaurantbetrieb',
    // OFFEN (vom Inhaber): Name des Betriebs, Ort, welche Ablaeufe, vorher
    // und jetzt, Ergebnis, Einverstaendnis mit der Nennung.
    freigegeben: false,
  },
]

/**
 * Was angezeigt werden darf. In der lokalen Vorschau alles (zum Gestalten),
 * im fertigen Build nur Freigegebenes.
 */
export function sichtbareReferenzen(): Referenz[] {
  return REFERENZEN.filter((r) => r.freigegeben || import.meta.env.DEV)
}
