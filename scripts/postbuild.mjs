// SPA-Fallback für statisches Hosting (GitHub Pages):
// Ohne diese Datei liefern direkte Aufrufe von Unterseiten wie /impressum,
// /datenschutz oder /beispiel einen 404. GitHub Pages liefert bei einem 404
// die Datei 404.html aus — ist das eine Kopie der index.html, bootet React
// Router dort und rendert die richtige Route.
import { copyFileSync, existsSync } from 'node:fs'

const src = 'dist/index.html'
const dest = 'dist/404.html'

if (!existsSync(src)) {
  console.error(`[postbuild] ${src} nicht gefunden — wurde vite build ausgeführt?`)
  process.exit(1)
}

copyFileSync(src, dest)
console.log('[postbuild] dist/404.html aus index.html erzeugt (SPA-Fallback).')
