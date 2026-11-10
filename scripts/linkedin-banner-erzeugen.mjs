// Erzeugt das LinkedIn-Banner (Hintergrundbild des Profils).
//
// Laufen lassen mit:  npm run linkedin-banner
//
// Wie bei den Bildern fuers Google-Profil (scripts/profilbilder-erzeugen.mjs)
// steckt die Marke im Code: Wuerfelkanten aus src/components/Logo.tsx, Farben
// aus src/index.css, Schriften aus denselben Paketen, die die Website laedt.
//
// Masse: 1584 x 396 (Empfehlung von LinkedIn, Verhaeltnis 4:1).
//
// AUFTEILUNG: Unten links liegt bei LinkedIn das runde Profilbild ueber dem
// Banner, auf dem Handy deutlich groesser als am Rechner (bis etwa x = 510).
// Deshalb steht dort nur Dekoration. Text beginnt erst bei x = 600. Die
// Vorschau-Datei zeichnet beide Profilbild-Lagen ein, zum Pruefen.
//
// INHALT: seit November 2026 Automatisierung zuerst, Webdesign als zweite
// Leistung. 3D-Rundgaenge stehen bewusst nicht mehr drauf.
import { createCanvas, GlobalFonts, Path2D, loadImage } from '@napi-rs/canvas'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ZIEL = process.argv[2] || '..'
const B = 1584
const H = 396

GlobalFonts.registerFromPath(
  'node_modules/@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2',
  'FrauncesMarke',
)
GlobalFonts.registerFromPath(
  'node_modules/@fontsource-variable/fraunces/files/fraunces-latin-opsz-italic.woff2',
  'FrauncesKursiv',
)
GlobalFonts.registerFromPath(
  'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  'InterMarke',
)

// Farben aus src/index.css (@theme)
const NACHT = '#0a0a0b'
const GOLD = '#b8894a'
const GOLD_HELL = '#d3a76f'
const CREME = '#f3eee5'
const STEIN = '#8c8985'

// Unveraendert aus src/components/Logo.tsx
const KANTEN = [
  'M32 4 L58 19 L58 49 L32 64 L6 49 L6 19 Z',
  'M6 19 L32 34 L58 19',
  'M32 34 L32 64',
]

function koernung(ctx, b, h, staerke) {
  const bild = ctx.getImageData(0, 0, b, h)
  const d = bild.data
  for (let i = 0; i < d.length; i += 4) {
    const r = (Math.random() - 0.5) * staerke
    d[i] += r
    d[i + 1] += r
    d[i + 2] += r
  }
  ctx.putImageData(bild, 0, 0)
}

/** Wuerfel aus der viewBox 0 0 64 68; `strich` in Bildpunkten. */
function wuerfel(ctx, x, y, groesse, farbe, strich) {
  const s = groesse / 64
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(s, s)
  ctx.strokeStyle = farbe
  ctx.lineWidth = strich / s
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  for (const d of KANTEN) ctx.stroke(new Path2D(d))
  ctx.restore()
}

/** Text mit Sperrung (canvas kennt kein letter-spacing). Gibt die Breite zurueck. */
function gesperrt(ctx, text, x, y, sperrung, ausrichtung = 'links') {
  const breite =
    text.split('').reduce((s, z) => s + ctx.measureText(z).width + sperrung, 0) - sperrung
  let cx = ausrichtung === 'mitte' ? x - breite / 2 : ausrichtung === 'rechts' ? x - breite : x
  const vorher = ctx.textAlign
  ctx.textAlign = 'left'
  for (const z of text) {
    ctx.fillText(z, cx, y)
    cx += ctx.measureText(z).width + sperrung
  }
  ctx.textAlign = vorher
  return breite
}

function banner() {
  const c = createCanvas(B, H)
  const ctx = c.getContext('2d')

  // Grund
  ctx.fillStyle = NACHT
  ctx.fillRect(0, 0, B, H)

  // Warmer Schein hinter dem Text, nicht mittig: Symmetrie wirkt nach Vorlage.
  const schein = ctx.createRadialGradient(980, 210, 0, 980, 210, 760)
  schein.addColorStop(0, 'rgba(184,137,74,0.15)')
  schein.addColorStop(0.55, 'rgba(184,137,74,0.05)')
  schein.addColorStop(1, 'rgba(184,137,74,0)')
  ctx.fillStyle = schein
  ctx.fillRect(0, 0, B, H)

  // Links, wo das Profilbild liegt: nur ein grosser, sehr leiser Wuerfel.
  wuerfel(ctx, 70, -40, 470, 'rgba(184,137,74,0.10)', 2)

  // Feine Ablauflinie ganz unten: vier Punkte, verbunden. Anklang an die
  // Ablaufkarte auf der Startseite (Anfrage, Benachrichtigung, Kontakt,
  // Termin), ohne Beschriftung, damit sie auch klein noch sauber ist.
  const linieY = 352
  const punkte = [600, 760, 920, 1080]
  ctx.strokeStyle = 'rgba(211,167,111,0.35)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(punkte[0], linieY)
  ctx.lineTo(punkte[punkte.length - 1], linieY)
  ctx.stroke()
  punkte.forEach((px, i) => {
    ctx.beginPath()
    ctx.arc(px, linieY, i === punkte.length - 1 ? 6 : 4.5, 0, Math.PI * 2)
    ctx.fillStyle = i === punkte.length - 1 ? GOLD_HELL : NACHT
    ctx.fill()
    ctx.strokeStyle = GOLD_HELL
    ctx.lineWidth = 1.5
    ctx.stroke()
  })

  // Textblock
  const X = 600

  // Oberzeile: kurze Goldlinie, dann die drei Leistungen in Gewichtung.
  ctx.fillStyle = GOLD
  ctx.fillRect(X, 104, 34, 1.5)
  ctx.font = '600 15px InterMarke'
  gesperrt(ctx, 'AUTOMATISIERUNG  ·  AKQUISE-STRECKEN  ·  WEBDESIGN', X + 50, 110, 3.4)

  // Kernsatz der Website
  ctx.textAlign = 'left'
  ctx.fillStyle = CREME
  ctx.font = '400 66px FrauncesMarke'
  ctx.fillText('Weniger Papierkram.', X - 4, 190)
  ctx.fillStyle = GOLD_HELL
  ctx.font = 'italic 400 66px FrauncesKursiv'
  ctx.fillText('Mehr Anfragen.', X - 2, 262)

  // Unterzeile
  ctx.fillStyle = STEIN
  ctx.font = '400 19px InterMarke'
  ctx.fillText('Für Betriebe in Lübeck und Schleswig-Holstein   ·   planbstudios.de', X, 310)

  // Rechts: Wortmarke wie im Logo
  const MX = 1418
  wuerfel(ctx, MX - 30, 118, 60, GOLD, 2.4)
  ctx.textAlign = 'center'
  ctx.fillStyle = CREME
  ctx.font = '400 36px FrauncesMarke'
  ctx.fillText('Plan B', MX, 232)
  ctx.fillStyle = GOLD
  ctx.font = '600 11px InterMarke'
  gesperrt(ctx, 'STUDIOS', MX, 254, 6.5, 'mitte')
  // feine Trennlinie zwischen Text und Wortmarke
  ctx.fillStyle = 'rgba(243,238,229,0.08)'
  ctx.fillRect(1290, 96, 1, 204)

  koernung(ctx, B, H, 9)
  return c
}

const c = banner()
const datei = join(ZIEL, 'linkedin-banner-automatisierung.png')
writeFileSync(datei, c.toBuffer('image/png'))

// Vorschau mit eingezeichnetem Profilbild: am Rechner (klein) und am Handy
// (gross). Nur zum Pruefen, nicht hochladen.
const v = createCanvas(B, H)
const vctx = v.getContext('2d')
vctx.drawImage(await loadImage(c.toBuffer('image/png')), 0, 0)
const kreis = (x, y, r, farbe, text) => {
  vctx.beginPath()
  vctx.arc(x, y, r, 0, Math.PI * 2)
  vctx.fillStyle = farbe
  vctx.fill()
  vctx.fillStyle = '#000'
  vctx.font = '600 20px InterMarke'
  vctx.textAlign = 'center'
  vctx.fillText(text, x, Math.min(y, H - 30))
}
kreis(68 + 220, 211 + 220, 220, 'rgba(120,160,255,0.35)', 'Profilbild Handy')
kreis(47 + 150, 245 + 150, 150, 'rgba(255,255,255,0.55)', 'Profilbild Rechner')
const vorschau = join(ZIEL, 'linkedin-banner-vorschau.png')
writeFileSync(vorschau, v.toBuffer('image/png'))

console.log('geschrieben:', datei, '|', vorschau)
