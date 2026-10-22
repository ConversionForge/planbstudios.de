// Erzeugt Logo und Titelbild fuer das Google-Unternehmensprofil.
//
// Laufen lassen mit:  node scripts/profilbilder-erzeugen.mjs
//
// Warum ein Skript und kein Bildprogramm: Die Marke steckt im Code — die
// Wuerfelkanten stammen unveraendert aus src/components/Logo.tsx, die Farben
// aus den @theme-Marken in src/index.css, die Schrift ist dieselbe Fraunces,
// die auch die Website laedt. Aendert sich eines davon, laufen die Bilder
// einfach neu, statt in einer Datei zu veralten.
//
// Masse nach Googles Vorgaben:
//   Logo      quadratisch, mindestens 250x250, empfohlen 720x720
//   Titelbild 16:9, mindestens 480x270, hier 1200x675
// Path2D kommt aus der Bibliothek, nicht aus dem globalen Namensraum — in Node
// gibt es die Browser-Variante nicht.
import { createCanvas, GlobalFonts, Path2D } from '@napi-rs/canvas'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ZIEL = process.argv[2] || 'C:/Users/bilal/Downloads/plan-b-profilbilder'
mkdirSync(ZIEL, { recursive: true })

GlobalFonts.registerFromPath(
  'node_modules/@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2',
  'FrauncesMarke',
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

/** Koernung wie die GrainOverlay-Ebene der Website. Bricht die digitale Flachheit. */
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

/** Wuerfel aus der viewBox 0 0 64 68 auf die gewuenschte Groesse skaliert. */
function wuerfel(ctx, x, y, groesse, farbe, strich) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(groesse / 64, groesse / 64)
  ctx.strokeStyle = farbe
  ctx.lineWidth = strich
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  for (const d of KANTEN) ctx.stroke(new Path2D(d))
  ctx.restore()
}

/** Text mit echter Sperrung — canvas kennt kein letter-spacing. */
function gesperrt(ctx, text, x, y, sperrung, zentriert = false) {
  const breite =
    text.split('').reduce((s, z) => s + ctx.measureText(z).width + sperrung, 0) - sperrung
  let cx = zentriert ? x - breite / 2 : x
  const vorher = ctx.textAlign
  ctx.textAlign = 'left'
  for (const z of text) {
    ctx.fillText(z, cx, y)
    cx += ctx.measureText(z).width + sperrung
  }
  ctx.textAlign = vorher
  return breite
}

// ---------------------------------------------------------------------------
// Logo 720 x 720
// ---------------------------------------------------------------------------
function logo() {
  const B = 720
  const c = createCanvas(B, B)
  const ctx = c.getContext('2d')

  ctx.fillStyle = NACHT
  ctx.fillRect(0, 0, B, B)
  const schein = ctx.createRadialGradient(B / 2, B * 0.36, 0, B / 2, B * 0.36, B * 0.62)
  schein.addColorStop(0, 'rgba(184,137,74,0.14)')
  schein.addColorStop(1, 'rgba(184,137,74,0)')
  ctx.fillStyle = schein
  ctx.fillRect(0, 0, B, B)

  wuerfel(ctx, B / 2 - 150, 150, 300, GOLD, 7)

  ctx.textAlign = 'center'
  ctx.fillStyle = CREME
  ctx.font = '300 92px FrauncesMarke'
  ctx.fillText('Plan B', B / 2, 560)

  ctx.fillStyle = GOLD
  ctx.font = '500 25px sans-serif'
  gesperrt(ctx, 'STUDIOS', B / 2, 610, 17, true)

  koernung(ctx, B, B, 11)
  writeFileSync(join(ZIEL, 'logo-720x720.png'), c.toBuffer('image/png'))
  return 'logo-720x720.png'
}

// ---------------------------------------------------------------------------
// Titelbild 1200 x 675
// ---------------------------------------------------------------------------
function titelbild() {
  const B = 1200
  const H = 675
  const c = createCanvas(B, H)
  const ctx = c.getContext('2d')

  ctx.fillStyle = NACHT
  ctx.fillRect(0, 0, B, H)

  // Schein bewusst aus der linken unteren Ecke, nicht mittig — Symmetrie
  // wirkt schnell nach Vorlage.
  const schein = ctx.createRadialGradient(B * 0.26, H * 0.82, 0, B * 0.26, H * 0.82, B * 0.72)
  schein.addColorStop(0, 'rgba(184,137,74,0.17)')
  schein.addColorStop(1, 'rgba(184,137,74,0)')
  ctx.fillStyle = schein
  ctx.fillRect(0, 0, B, H)

  // Feines Raster rechts: Anklang an die Bauzeichnung im MERIDIAN-Kapitel.
  ctx.strokeStyle = 'rgba(243,238,229,0.045)'
  ctx.lineWidth = 1
  for (let x = B * 0.58; x < B; x += 38) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, H)
    ctx.stroke()
  }
  for (let y = 0; y < H; y += 38) {
    ctx.beginPath()
    ctx.moveTo(B * 0.58, y)
    ctx.lineTo(B, y)
    ctx.stroke()
  }

  wuerfel(ctx, B - 300, H / 2 - 110, 220, GOLD_HELL, 4.5)

  const links = 92
  ctx.textAlign = 'left'

  ctx.fillStyle = GOLD
  ctx.font = '500 19px sans-serif'
  gesperrt(ctx, 'WEBDESIGN · 3D-RUNDGÄNGE · LÜBECK', links, 196, 4.2)

  ctx.fillStyle = CREME
  ctx.font = '300 76px FrauncesMarke'
  ctx.fillText('Digitale Räume.', links, 310)
  ctx.fillText('Mit Plan gebaut.', links, 398)

  ctx.fillStyle = STEIN
  ctx.font = '400 25px sans-serif'
  ctx.fillText('Websites und begehbare 3D-Rundgänge für Immobilien.', links, 470)

  ctx.strokeStyle = 'rgba(243,238,229,0.13)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(links, 520)
  ctx.lineTo(links + 420, 520)
  ctx.stroke()

  ctx.fillStyle = CREME
  ctx.font = '300 31px FrauncesMarke'
  ctx.fillText('Plan B Studios', links, 568)
  ctx.fillStyle = STEIN
  ctx.font = '400 19px sans-serif'
  ctx.fillText('planbstudios.de', links, 600)

  koernung(ctx, B, H, 10)
  writeFileSync(join(ZIEL, 'titelbild-1200x675.jpg'), c.toBuffer('image/jpeg', 92))
  return 'titelbild-1200x675.jpg'
}

// ---------------------------------------------------------------------------
// Arbeitsbilder aus ECHTEN Projektfotos
//
// Quelle sind die Aufnahmen aus public/rundgang — dieselben, aus denen der
// begehbare Rundgang des Design-Lofts entstanden ist. Keine erfundenen oder
// erzeugten Motive: Was hier zu sehen ist, ist ein Objekt, an dem gearbeitet
// wurde. Dazu eine zurueckhaltende Markenfassung am unteren Rand.
// ---------------------------------------------------------------------------
async function arbeitsbild(quelle, marke, zeile, datei) {
  const { loadImage } = await import('@napi-rs/canvas')
  const img = await loadImage(`public/rundgang/${quelle}`)
  const B = 1200
  const H = 900
  const c = createCanvas(B, H)
  const ctx = c.getContext('2d')

  ctx.drawImage(img, 0, 0, B, H)

  // Verlauf nach unten, damit die Schrift auf jedem Motiv lesbar bleibt.
  const verlauf = ctx.createLinearGradient(0, H * 0.52, 0, H)
  verlauf.addColorStop(0, 'rgba(10,10,11,0)')
  verlauf.addColorStop(1, 'rgba(10,10,11,0.93)')
  ctx.fillStyle = verlauf
  ctx.fillRect(0, 0, B, H)

  const links = 64
  ctx.textAlign = 'left'

  ctx.fillStyle = GOLD
  ctx.font = '500 17px sans-serif'
  gesperrt(ctx, marke, links, H - 148, 3.8)

  ctx.fillStyle = CREME
  ctx.font = '300 46px FrauncesMarke'
  ctx.fillText(zeile, links, H - 92)

  // Absender klein in der Ecke, Wuerfel daneben
  wuerfel(ctx, B - 132, H - 112, 56, GOLD, 2.4)
  ctx.fillStyle = STEIN
  ctx.font = '400 16px sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText('planbstudios.de', B - 150, H - 74)

  writeFileSync(join(ZIEL, datei), c.toBuffer('image/jpeg', 90))
  return datei
}

const dateien = [logo(), titelbild()]

const ARBEITEN = [
  ['living-1.jpg', '3D-RUNDGANG · DESIGN-LOFT HAMBURG', 'Sieben Räume, begehbar.', 'arbeit-1-rundgang.jpg'],
  ['library-1.jpg', 'OBJEKTFILM', 'Aus Fotos wird Bewegung.', 'arbeit-2-objektfilm.jpg'],
  ['kitchen-1.jpg', 'WEBDESIGN FÜR IMMOBILIEN', 'Einzeln gebaut, kein Baukasten.', 'arbeit-3-webdesign.jpg'],
]
for (const [q, m, z, d] of ARBEITEN) dateien.push(await arbeitsbild(q, m, z, d))

console.log(`[profilbilder] ${dateien.length} Dateien in ${ZIEL}:`)
for (const d of dateien) console.log('  ' + d)
