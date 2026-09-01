// Prueft die Regeln aus src/akquise/pruefung.ts gegen echte Faelle.
// Laufen lassen mit:  node --experimental-strip-types scripts/pruefung-testen.ts
//
// Wichtiger als "erkennt Unsinn" ist die zweite Haelfte jeder Liste: laesst die
// Regel durch, was durchgehen MUSS. Eine zu strenge Pruefung sperrt echte
// Interessenten aus, und das faellt niemandem auf.
import { parsePhoneNumberFromString } from 'libphonenumber-js/max'
import {
  istEmailFormat,
  istTelefonFormat,
  istWegwerfAdresse,
  normalisiereWebsite,
  ortSchluessel,
  tippfehlerVorschlag,
  zerlegeRegion,
} from '../src/akquise/pruefung.ts'
import { orteZurPlz } from '../worker/plz-daten.ts'

let fehler = 0
function pruefe(gruppe: string, eingabe: string, erwartet: boolean, ergebnis: boolean) {
  const ok = erwartet === ergebnis
  if (!ok) fehler++
  console.log(
    `${ok ? '  ok  ' : ' FEHL '} ${gruppe.padEnd(9)} ${JSON.stringify(eingabe).padEnd(42)} ` +
      `erwartet ${erwartet ? 'gültig' : 'ungültig'}, bekommen ${ergebnis ? 'gültig' : 'ungültig'}`,
  )
}

console.log('\n=== E-Mail ===')
for (const [wert, erwartet] of [
  ['bilal@planbstudios.de', true],
  ['vorname.nachname@immobilien-mueller.de', true],
  ['b.g+akquise@gmx.de', true],
  ['info@sub.domain.co.uk', true],
  ["o'brien@example.com", true], // Apostroph im Namensteil ist erlaubt und kommt vor
  ['a@b.c', false], // Endung zu kurz
  ['keine-adresse', false],
  ['zwei@@at.de', false],
  ['leer zeichen@web.de', false],
  ['@web.de', false],
  ['ohne@punkt', false],
] as [string, boolean][]) {
  pruefe('email', wert, erwartet, istEmailFormat(wert))
}

console.log('\n=== Wegwerfadressen ===')
for (const [wert, erwartet] of [
  ['test@mailinator.com', true],
  ['x@trashmail.de', true],
  ['echt@web.de', false],
] as [string, boolean][]) {
  pruefe('wegwerf', wert, erwartet, istWegwerfAdresse(wert))
}

console.log('\n=== Tippfehler-Vorschlag ===')
for (const wert of ['bilal@gmial.com', 'bilal@gmail.com', 'x@web.de']) {
  console.log(`  ${wert.padEnd(24)} -> ${tippfehlerVorschlag(wert) ?? '(kein Vorschlag)'}`)
}

console.log('\n=== Website ===')
for (const [wert, erwartet] of [
  ['planbstudios.de', true],
  ['www.planbstudios.de', true],
  ['https://planbstudios.de', true],
  ['http://immobilien-mueller.de/ueber-uns', true],
  ['schoenwald-immobilien.de', true],
  ['sub.domain.co.uk', true],
  ['xn--mller-kva.de', true], // Umlautdomain in Punycode
  ['keinpunkt', false],
  ['192.168.0.1', false],
  ['localhost', false],
  ['ftp://firma.de', false],
  ['javascript:alert(1)', false],
  ['', false],
] as [string, boolean][]) {
  pruefe('website', wert, erwartet, normalisiereWebsite(wert) !== null)
}
console.log('  Normalisierung:', JSON.stringify(normalisiereWebsite('www.firma.de')))

console.log('\n=== Telefon (Browserpruefung, grob) ===')
for (const [wert, erwartet] of [
  ['0451 1234567', true],
  ['0451/123 45 67', true],
  ['+49 451 1234567', true],
  ['0049 451 1234567', true],
  ['0176 12345678', true],
  ['+41 44 1234567', true],
  ['12345', false],
  ['0123456789', false], // glatte Zahlenreihe
  ['1111111111', false], // eine Ziffer wiederholt
  ['abc', false],
  ['', false],
  ['0', false],
] as [string, boolean][]) {
  pruefe('telefon', wert, erwartet, istTelefonFormat(wert))
}

console.log('\n=== Telefon (Worker, libphonenumber — das entscheidet) ===')
for (const [wert, erwartet] of [
  ['0451 1234567', true],
  ['0176 12345678', true],
  ['+49 40 123456', true],
  ['+41 44 668 18 00', true],
  ['0451 1', false], // zu kurz
  ['0000 0000000', false], // keine echte Vorwahl
  ['123', false],
  ['0999 1234567', false], // Vorwahl gibt es nicht
  ['0123456789', false], // glatte Zahlenreihe
  ['1111111111', false], // eine Ziffer wiederholt
  ['012345', false],
  ['0176 1', false], // Mobilnummer zu kurz
  ['030 12345678', true], // Berlin
  ['0800 1234567', true], // gebuehrenfrei ist eine echte Rufnummer
] as [string, boolean][]) {
  const n = parsePhoneNumberFromString(wert, 'DE')
  pruefe('telefon+', wert, erwartet, !!n && n.isValid())
}

console.log('\n=== Postleitzahl und Ort ===')
const paare: [string, boolean][] = [
  ['23552 Lübeck', true],
  ['10115 Berlin', true],
  ['01067 Dresden', true],
  ['24103 Kiel', true],
  ['23552 Hamburg', false], // Paar passt nicht
  ['00000 Nirgendwo', false], // Postleitzahl gibt es nicht
  ['2355 Lübeck', false], // vier Ziffern
]
for (const [wert, erwartet] of paare) {
  const zerlegt = zerlegeRegion(wert)
  const orte = zerlegt ? orteZurPlz(zerlegt.plz) : []
  const gueltig =
    !!zerlegt && orte.some((o) => ortSchluessel(o) === ortSchluessel(zerlegt.ort))
  pruefe('plz+ort', wert, erwartet, gueltig)
}

console.log('\n=== Schreibweisen des Ortes muessen durchgehen ===')
for (const schreibweise of ['Lübeck', 'lübeck', 'LÜBECK', 'Luebeck', 'luebeck']) {
  const orte = orteZurPlz('23552')
  const ok = orte.some((o) => ortSchluessel(o) === ortSchluessel(schreibweise))
  pruefe('ort-form', schreibweise, true, ok)
}

console.log(
  fehler === 0
    ? '\nAlle Faelle wie erwartet.\n'
    : `\n${fehler} Fall/Faelle NICHT wie erwartet.\n`,
)
process.exit(fehler === 0 ? 0 : 1)
