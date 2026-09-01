// Testet die verbindliche Pruefung im Worker ueber echte HTTP-Aufrufe.
//
// Voraussetzung: der Worker laeuft lokal.
//   1) npm run build
//   2) npx wrangler dev --local --port 8788
//   3) node scripts/endpunkt-testen.mjs
//
// Die Website- und E-Mail-Faelle fragen echtes DNS ab, es braucht also eine
// Internetverbindung.
// Ohne BREVO_API_KEY endet ein gueltiger Fall bei 503 "Versand noch nicht
// eingerichtet" — genau das ist hier das Zeichen, dass alle Pruefungen
// bestanden wurden.
const URL_ = 'http://127.0.0.1:8788/api/akquise-check'

const GUELTIG = {
  antworten: {
    region: '23552 Lübeck',
    objekte: '1-3',
    herkunft: 'portale',
    wertermittlung: 'nein',
    website: 'https://planbstudios.de/',
  },
  kontakt: {
    name: 'Max Mustermann',
    firma: 'Muster Immobilien',
    email: 'info@planbstudios.de',
    telefon: '0451 1234567',
  },
  einwilligung: true,
  dauerMs: 9000,
  koeder: '',
}

const tief = (o) => JSON.parse(JSON.stringify(o))

/** Faelle: [Name, Aenderung am gueltigen Fall, erwarteter Status, erwartetes Feld] */
const FAELLE = [
  ['gueltig (muss durch die Pruefung)', (d) => d, 503, null],

  // Postleitzahl und Ort
  ['PLZ gibt es nicht', (d) => { d.antworten.region = '00000 Nirgendwo'; return d }, 400, 'region'],
  ['Ort passt nicht zur PLZ', (d) => { d.antworten.region = '23552 Hamburg'; return d }, 400, 'region'],
  ['Region leer', (d) => { d.antworten.region = ''; return d }, 400, 'region'],
  ['nur PLZ ohne Ort', (d) => { d.antworten.region = '23552'; return d }, 400, 'region'],
  ['Ort klein geschrieben (muss durch)', (d) => { d.antworten.region = '23552 lübeck'; return d }, 503, null],
  ['Ort mit ue statt ü (muss durch)', (d) => { d.antworten.region = '23552 Luebeck'; return d }, 503, null],

  // Website
  ['Website leer', (d) => { d.antworten.website = ''; return d }, 400, 'website'],
  ['Website ohne Punkt', (d) => { d.antworten.website = 'keinpunkt'; return d }, 400, 'website'],
  ['Website ist IP', (d) => { d.antworten.website = '192.168.0.1'; return d }, 400, 'website'],
  ['Domain existiert nicht', (d) => { d.antworten.website = 'gibt-es-ganz-sicher-nicht-4711-xyz.de'; return d }, 400, 'website'],
  ['Website ohne Schema (muss durch)', (d) => { d.antworten.website = 'planbstudios.de'; return d }, 503, null],

  // E-Mail
  ['E-Mail unvollstaendig', (d) => { d.kontakt.email = 'keine-adresse'; return d }, 400, 'email'],
  ['E-Mail Wegwerfadresse', (d) => { d.kontakt.email = 'x@mailinator.com'; return d }, 400, 'email'],
  ['E-Mail-Domain nimmt keine Post', (d) => { d.kontakt.email = 'x@gibt-es-ganz-sicher-nicht-4711-xyz.de'; return d }, 400, 'email'],

  // Telefon
  ['Telefon leer', (d) => { d.kontakt.telefon = ''; return d }, 400, 'telefon'],
  ['Telefon Zahlenreihe', (d) => { d.kontakt.telefon = '0123456789'; return d }, 400, 'telefon'],
  ['Telefon eine Ziffer', (d) => { d.kontakt.telefon = '1111111111'; return d }, 400, 'telefon'],
  ['Telefon Vorwahl gibt es nicht', (d) => { d.kontakt.telefon = '0999 1234567'; return d }, 400, 'telefon'],
  ['Telefon zu kurz', (d) => { d.kontakt.telefon = '0176 1'; return d }, 400, 'telefon'],
  ['Telefon mobil (muss durch)', (d) => { d.kontakt.telefon = '0176 12345678'; return d }, 503, null],
  ['Telefon Schweiz (muss durch)', (d) => { d.kontakt.telefon = '+41 44 668 18 00'; return d }, 503, null],

  // Name und Spamschutz
  ['Name fehlt', (d) => { d.kontakt.name = ''; return d }, 400, 'name'],
  ['zu schnell abgesendet', (d) => { d.dauerMs = 500; return d }, 400, null],
  ['Einwilligung fehlt', (d) => { d.einwilligung = false; return d }, 400, null],
]

let fehler = 0
// Je Fall eine eigene Absenderadresse: Der Zaehler im Worker begrenzt sonst
// nach fuenf Aufrufen. In Produktion greift er ohnehin nicht (siehe Kommentar
// im Worker), lokal aber schon, weil dort nur eine Instanz laeuft.
let nr = 0
for (const [bez, aendern, erwStatus, erwFeld] of FAELLE) {
  nr++
  const koerper = aendern(tief(GUELTIG))
  let status = 0
  let daten = {}
  try {
    const a = await fetch(URL_, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'cf-connecting-ip': '203.0.113.' + nr },
      body: JSON.stringify(koerper),
    })
    status = a.status
    daten = await a.json().catch(() => ({}))
  } catch (e) {
    console.log(' FEHL  ' + bez + ' -> Aufruf gescheitert: ' + e.message)
    fehler++
    continue
  }

  const feldOk = erwFeld === null ? true : daten.feld === erwFeld
  const ok = status === erwStatus && feldOk
  if (!ok) fehler++
  console.log(
    `${ok ? '  ok  ' : ' FEHL '} ${bez.padEnd(36)} ${status}` +
      (daten.feld ? ` [${daten.feld}]` : '') +
      (daten.fehler ? '  ' + daten.fehler.slice(0, 62) : ''),
  )
}
console.log(fehler === 0 ? '\nAlle Faelle wie erwartet.' : `\n${fehler} abweichend.`)
process.exit(fehler === 0 ? 0 : 1)
