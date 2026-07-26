// Statisches Hosting (GitHub Pages) kennt keine Server-Rewrites. Dieses Skript
// erzeugt aus der gebauten SPA-Hülle:
//
// 1. Für jede bekannte Route eine echte index.html (HTTP 200 statt 404).
// 2. Für die Rechtsseiten (Impressum/Datenschutz) VOLLES vorgerendertes HTML —
//    der Text ist damit auch ohne JavaScript und für Prüf-Bots lesbar (§ 5 DDG).
// 3. Pro Route korrektes <title>, canonical und og:url (statt überall die
//    Startseite → sonst „Duplicate"-Signal an Suchmaschinen).
// 4. Eine 404.html als Auffangnetz (liefert bewusst Status 404).
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const shellPath = 'dist/index.html'
if (!existsSync(shellPath)) {
  console.error(`[postbuild] ${shellPath} nicht gefunden — wurde vite build ausgeführt?`)
  process.exit(1)
}
const shell = readFileSync(shellPath, 'utf8')
const BASE = 'https://planbstudios.de'

// SSR-Renderer aus dem --ssr-Build laden. Fehlt er, wird ohne Vorrendern
// weitergemacht (Seite bleibt HTTP 200, nur eben JS-abhängig) — der Build
// bricht dadurch nie ab.
let render = null
try {
  const mod = await import(
    pathToFileURL(join(process.cwd(), 'dist-ssr/entry-prerender.js')).href
  )
  render = mod.render
} catch (e) {
  console.warn('[postbuild] SSR-Renderer nicht ladbar — überspringe Vorrendern:', e.message)
}

const ROUTES = {
  impressum: {
    title: 'Impressum — Plan B Studios',
    desc: 'Impressum und Anbieterkennzeichnung von Plan B Studios, Lübeck.',
    prerender: true,
  },
  datenschutz: {
    title: 'Datenschutz — Plan B Studios',
    desc: 'Datenschutzerklärung von Plan B Studios.',
    prerender: true,
  },
  beispiel: { title: 'Havel & Grau — Beispielprojekt von Plan B Studios', prerender: false },
  meridian: { title: 'MERIDIAN — Beispielprojekt von Plan B Studios', prerender: false },
  rundgang: { title: 'Design-Loft — 3D-Rundgang von Plan B Studios', prerender: false },
}

function withMeta(html, route, cfg) {
  const url = `${BASE}/${route}/`
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${cfg.title}</title>`)
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}">`)
  html = html.replace(
    /<meta property="og:url"[^>]*>/,
    `<meta property="og:url" content="${url}">`,
  )
  html = html.replace(
    /<meta property="og:title"[^>]*>/,
    `<meta property="og:title" content="${cfg.title}">`,
  )
  html = html.replace(
    /<meta name="twitter:title"[^>]*>/,
    `<meta name="twitter:title" content="${cfg.title}">`,
  )
  if (cfg.desc) {
    html = html.replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${cfg.desc}">`,
    )
    html = html.replace(
      /<meta property="og:description"[^>]*>/,
      `<meta property="og:description" content="${cfg.desc}">`,
    )
  }
  return html
}

let prerendered = 0
for (const [route, cfg] of Object.entries(ROUTES)) {
  let html = withMeta(shell, route, cfg)

  if (cfg.prerender && render) {
    try {
      const body = render(`/${route}`)
      html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
      prerendered++
    } catch (e) {
      console.warn(`[postbuild] Vorrendern von /${route} fehlgeschlagen:`, e.message)
    }
  }

  const dir = join('dist', route)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

// 404-Fallback: unveränderte Hülle, liefert Status 404 für unbekannte Pfade.
copyFileSync(shellPath, 'dist/404.html')

console.log(
  `[postbuild] ${Object.keys(ROUTES).length} Routen erzeugt (HTTP 200), davon ${prerendered} vorgerendert, + 404.html als Fallback.`,
)
