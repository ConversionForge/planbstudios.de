// Erzeugt worker/plz-daten.ts aus dem Paket german-zip-codes.
//
// Warum eine erzeugte Datei statt des Pakets selbst: Das Paket ist rund 2 MB
// gross und enthaelt Felder, die hier niemand braucht (Bundesland, doppelte
// Eintraege). Der Worker bekommt daraus eine kompakte Fassung mit nur zwei
// Zeichenketten. Das Paket bleibt reine Entwicklungsabhaengigkeit.
//
// Neu erzeugen mit:  node scripts/plz-daten-erzeugen.mjs
//
// Datenquelle: german-zip-codes (MIT), basierend auf German-Zip-Codes.csv von
// jbspeakr. Deutsche Postleitzahlen aendern sich selten; ein erneuter Lauf ist
// nur noetig, wenn das Paket aktualisiert wurde.
import { createRequire } from 'node:module'
import { writeFileSync } from 'node:fs'

const require = createRequire(import.meta.url)
const roh = require('german-zip-codes/data/data.js').data

// PLZ -> Menge der Ortsnamen. Das Paket enthaelt Dubletten, deshalb ein Set.
const proPlz = new Map()
for (const e of roh) {
  const plz = String(e.plz).padStart(5, '0')
  const ort = String(e.ort || '').trim()
  if (!/^\d{5}$/.test(plz) || !ort) continue
  if (!proPlz.has(plz)) proPlz.set(plz, new Set())
  proPlz.get(plz).add(ort)
}

// Ortsnamen einmalig sammeln. "Berlin" haengt an rund 190 Postleitzahlen —
// ohne diese Trennung stuende der Name 190-mal in der Datei.
const orte = []
const ortIndex = new Map()
function indexVon(ort) {
  let i = ortIndex.get(ort)
  if (i === undefined) {
    i = orte.length
    orte.push(ort)
    ortIndex.set(ort, i)
  }
  return i
}

const zeilen = []
for (const plz of [...proPlz.keys()].sort()) {
  const namen = [...proPlz.get(plz)].sort((a, b) => a.localeCompare(b, 'de'))
  zeilen.push(plz + ':' + namen.map(indexVon).join(','))
}

if (orte.some((o) => o.includes('|')) || zeilen.some((z) => z.includes(';'))) {
  console.error('[plz] Trennzeichen kommt in den Daten vor — Format anpassen.')
  process.exit(1)
}

const inhalt = `// ERZEUGTE DATEI — nicht von Hand aendern.
// Erzeugt von scripts/plz-daten-erzeugen.mjs aus dem Paket german-zip-codes
// (MIT, Daten nach German-Zip-Codes.csv von jbspeakr).
//
// Zwei Zeichenketten statt eines Objektliterals: Das spart Anfuehrungszeichen
// und Klammern und haelt den Worker klein. Aufgeloest wird beim ersten Zugriff,
// nicht beim Laden des Moduls.
//
// ${proPlz.size} Postleitzahlen, ${orte.length} Ortsnamen.

/** Ortsnamen, durch | getrennt. */
const ORTE_ROH =
  '${orte.join('|')}'

/** Je Postleitzahl die Ortsindizes: "01067:0;01069:0;01454:5,6,7". */
const PLZ_ROH =
  '${zeilen.join(';')}'

let orte: string[] | null = null
let karte: Map<string, string[]> | null = null

function aufbauen() {
  orte = ORTE_ROH.split('|')
  karte = new Map()
  for (const zeile of PLZ_ROH.split(';')) {
    const trenner = zeile.indexOf(':')
    const plz = zeile.slice(0, trenner)
    const namen = zeile
      .slice(trenner + 1)
      .split(',')
      .map((i) => orte![Number(i)])
    karte.set(plz, namen)
  }
}

/**
 * Alle Ortsnamen zu einer Postleitzahl. Leeres Feld, wenn es die
 * Postleitzahl nicht gibt.
 */
export function orteZurPlz(plz: string): string[] {
  if (!karte) aufbauen()
  return karte!.get(plz) ?? []
}

/** Gibt es diese Postleitzahl ueberhaupt? */
export function plzExistiert(plz: string): boolean {
  if (!karte) aufbauen()
  return karte!.has(plz)
}
`

writeFileSync('worker/plz-daten.ts', inhalt)
console.log(
  `[plz] worker/plz-daten.ts geschrieben: ${proPlz.size} Postleitzahlen, ${orte.length} Ortsnamen, ${Math.round(inhalt.length / 1024)} KB.`,
)
