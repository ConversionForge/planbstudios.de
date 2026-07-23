// Statisches Hosting (GitHub Pages) kennt keine Server-Rewrites. Damit die
// Single-Page-App trotzdem sauber funktioniert, erzeugen wir hier zwei Dinge:
//
// 1. Für jede bekannte Route eine echte index.html — so antwortet der Server
//    mit HTTP 200 (wichtig für Suchmaschinen und geteilte Links).
// 2. Eine 404.html als Auffangnetz für alles Übrige. Sie liefert bewusst den
//    Status 404 und zeigt die gestaltete Fehlerseite der App.
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const src = 'dist/index.html'

if (!existsSync(src)) {
  console.error(`[postbuild] ${src} nicht gefunden — wurde vite build ausgeführt?`)
  process.exit(1)
}

const ROUTES = ['impressum', 'datenschutz', 'beispiel', 'meridian', 'rundgang']

for (const route of ROUTES) {
  const dir = join('dist', route)
  mkdirSync(dir, { recursive: true })
  copyFileSync(src, join(dir, 'index.html'))
}

copyFileSync(src, 'dist/404.html')

console.log(
  `[postbuild] ${ROUTES.length} Routen vorgerendert (HTTP 200) + 404.html als Fallback.`,
)
