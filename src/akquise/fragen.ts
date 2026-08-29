// Fragen und Auswertung des Akquise-Checks.
//
// Regel für alle Hinweise (vom Inhaber vorgegeben): Es wird nie eine Tatsache
// über das Geschäft des Lesers behauptet. Erlaubt ist nur, das zu wiederholen,
// was er selbst geantwortet hat, und eine Folge daraus zu benennen — oder eine
// Frage zu stellen. Keine Zahlen, keine Schätzungen, keine Prozentwerte.

export type FrageId = 'region' | 'objekte' | 'herkunft' | 'wertermittlung' | 'website'

export interface Option {
  wert: string
  label: string
}

export interface Frage {
  id: FrageId
  nummer: number
  frage: string
  hinweis?: string
  art: 'auswahl' | 'text'
  optionen?: Option[]
  platzhalter?: string
  pflicht: boolean
}

export const FRAGEN: Frage[] = [
  {
    id: 'region',
    nummer: 1,
    frage: 'In welcher Region sind Sie tätig?',
    hinweis: 'Ort oder Postleitzahl genügt.',
    art: 'text',
    platzhalter: 'z. B. Lübeck oder 23562',
    pflicht: true,
  },
  {
    id: 'objekte',
    nummer: 2,
    frage: 'Wie viele Objekte vermarkten Sie im Monat?',
    art: 'auswahl',
    optionen: [
      { wert: '1-3', label: '1 bis 3' },
      { wert: '4-10', label: '4 bis 10' },
      { wert: '10+', label: 'Mehr als 10' },
    ],
    pflicht: true,
  },
  {
    id: 'herkunft',
    nummer: 3,
    frage: 'Woher kommen Ihre Verkaufsaufträge überwiegend?',
    art: 'auswahl',
    optionen: [
      { wert: 'empfehlungen', label: 'Empfehlungen' },
      { wert: 'portale', label: 'Portale' },
      { wert: 'website', label: 'Eigene Website' },
      { wert: 'gemischt', label: 'Gemischt' },
    ],
    pflicht: true,
  },
  {
    id: 'wertermittlung',
    nummer: 4,
    frage: 'Haben Sie eine Online-Wertermittlung auf Ihrer Website?',
    art: 'auswahl',
    optionen: [
      { wert: 'prominent', label: 'Ja, prominent platziert' },
      { wert: 'versteckt', label: 'Ja, aber versteckt' },
      { wert: 'nein', label: 'Nein' },
      { wert: 'unklar', label: 'Weiß ich nicht' },
    ],
    pflicht: true,
  },
  {
    id: 'website',
    nummer: 5,
    frage: 'Wie lautet Ihre Website-Adresse?',
    hinweis: 'Ich sehe sie mir vor dem Gespräch an. Sie wird nicht automatisch ausgewertet.',
    art: 'text',
    platzhalter: 'z. B. ihre-firma.de',
    pflicht: false,
  },
]

export type Antworten = Partial<Record<FrageId, string>>

// --- Hinweis 1: aus Frage 4 (Online-Wertermittlung) ---
const HINWEIS_WERTERMITTLUNG: Record<string, string> = {
  nein: 'Ihnen fehlt der Einstiegspunkt für die Phase, in der Eigentümer noch nicht mit einem Makler sprechen wollen. Wer den Wert seiner Immobilie sucht, hinterlässt Daten eher für eine Einschätzung als für ein Erstgespräch. Das ist in Ihrem Fall der direkteste Hebel.',
  versteckt:
    'Das Werkzeug ist vorhanden, steht aber hinter Klicks. Ein Angebot, das gesucht werden muss, wird nicht gefunden. Es gehört auf die Einstiegsseite und in die Hauptnavigation.',
  unklar:
    'Der erste Schritt ist eine Bestandsaufnahme: Was ist vorhanden, wie viele Klicks ist es entfernt, und was passiert nach dem Absenden.',
  prominent:
    'Der Einstieg steht. Ihr Hebel liegt nicht mehr im Werkzeug, sondern danach: Was passiert mit jemandem, der die Bewertung abgeschlossen, aber keinen Termin gemacht hat.',
}

// --- Hinweis 2: aus Frage 3 (Herkunft der Aufträge) ---
const HINWEIS_HERKUNFT: Record<string, string> = {
  empfehlungen:
    'Empfehlungen sind der beste Kanal, aber der einzige, den Sie nicht steuern können. Sie kommen, wenn sie kommen. Eine eigene Strecke ersetzt das nicht, sie stellt etwas Planbares daneben.',
  portale:
    'Über Portale zahlen Sie für Reichweite auf fremdem Boden, und der Kontakt gehört zuerst dem Portal. Eine eigene Strecke macht Sie unabhängiger von deren Preisen und Regeln.',
  website:
    'Sie haben die Grundlage, die den meisten fehlt. Der nächste Schritt ist nicht mehr Sichtbarkeit, sondern Messung: an welcher Stelle Interessenten abspringen, bevor sie anfragen.',
  gemischt:
    'Mehrere Kanäle nebeneinander machen es schwer zu sagen, welcher davon trägt. Bevor man ausbaut, lohnt die Frage, welcher Kanal zuletzt tatsächlich Aufträge gebracht hat.',
}

// --- Hinweis 3: aus Frage 2 (Objekte pro Monat) ---
const HINWEIS_OBJEKTE: Record<string, string> = {
  '1-3': 'Bei dieser Zahl fällt jeder zusätzliche Auftrag deutlich ins Gewicht. Entsprechend schlank sollte der Aufbau sein: eine Seite, eine Strecke, kein großes System.',
  '4-10':
    'In dieser Größenordnung lohnt sich ein fester Einstiegspunkt, weil er nicht von einzelnen Objekten abhängt, sondern dauerhaft läuft.',
  '10+': 'Bei diesem Volumen stellt sich die Frage anders: Fehlen Ihnen Anfragen, oder kostet Sie die Vorqualifizierung zu viel Zeit? Je nachdem sieht der sinnvolle Aufbau anders aus.',
}

export interface Hinweis {
  titel: string
  text: string
}

/**
 * Erzeugt genau drei Hinweise, je einer aus Frage 4, 3 und 2. Frage 1 (Region)
 * liefert bewusst keinen Hinweis, weil sich daraus ohne Daten nichts Belegbares
 * ableiten ließe; sie wird nur für die Anrede verwendet. Frage 5 (Website) wird
 * nicht automatisch ausgewertet.
 */
export function hinweiseAus(a: Antworten): Hinweis[] {
  const out: Hinweis[] = []
  const w = a.wertermittlung && HINWEIS_WERTERMITTLUNG[a.wertermittlung]
  if (w) out.push({ titel: 'Ihr Einstiegspunkt', text: w })
  const h = a.herkunft && HINWEIS_HERKUNFT[a.herkunft]
  if (h) out.push({ titel: 'Ihre Kanäle', text: h })
  const o = a.objekte && HINWEIS_OBJEKTE[a.objekte]
  if (o) out.push({ titel: 'Ihr Zuschnitt', text: o })
  return out
}
