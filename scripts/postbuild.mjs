// Statisches Hosting (GitHub Pages) kennt keine Server-Rewrites. Dieses Skript
// erzeugt aus der gebauten SPA-Hülle:
//
// 1. Für jede bekannte Route eine echte index.html (HTTP 200 statt 404).
// 2. Für die Startseite und die Textseiten VOLLES vorgerendertes HTML — der
//    Inhalt ist damit auch ohne JavaScript und für Bots ohne JS-Ausführung
//    lesbar (Rechtsseiten zusätzlich für Prüf-Bots, § 5 DDG).
// 3. Pro Route korrektes <title>, canonical und og:url (statt überall die
//    Startseite → sonst „Duplicate"-Signal an Suchmaschinen).
// 4. Eine 404.html als Auffangnetz (liefert bewusst Status 404).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
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
  // Englische Fassung der Startseite. Eigene Adresse statt Umschalten unter
  // derselben — sonst kann eine Suchmaschine nicht entscheiden, welche Sprache
  // die Seite hat. Verknuepft sind beide ueber die hreflang-Angaben, die schon
  // in index.html stehen und deshalb in beiden Dateien identisch landen.
  en: {
    title: 'Web design & 3D tours for real estate | Plan B Studios',
    desc: 'Plan B Studios designs websites and walkable 3D tours for real estate — tailor-made for estate agents, property managers and developers in northern Germany.',
    ogDesc: 'Websites and walkable 3D tours for real estate, from Lübeck. Built, not clicked together.',
    lang: 'en',
    locale: 'en_US',
    prerender: true,
  },
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
  'makler/mehr-eigentuemeranfragen': {
    title: 'Mehr Eigentümeranfragen — Plan B Studios',
    desc: 'Eigentümer suchen online nach dem Wert ihrer Immobilie, lange bevor sie einen Makler anrufen. Situationsseiten, Bewertungsstrecke, Follow-up und Messung — aus einer Hand.',
    prerender: true,
  },
  // Formularstrecke und Bestaetigungsseite: echte HTML-Datei fuer HTTP 200,
  // aber kein Vorrendern (ein Formular hat im statischen HTML keinen Wert) und
  // bewusst NICHT in der sitemap.xml.
  'akquise-check': {
    title: 'Akquise-Check für Makler — Plan B Studios',
    desc: 'Fünf Fragen zur eigenen Akquise, ohne Anmeldung. Am Ende stehen drei Hinweise, die sich aus den eigenen Antworten ergeben.',
    prerender: false,
  },
  beispiel: { title: 'Havel & Grau — Beispielprojekt von Plan B Studios', prerender: false },
  meridian: { title: 'MERIDIAN — Beispielprojekt von Plan B Studios', prerender: false },
  rundgang: { title: 'Design-Loft — 3D-Rundgang von Plan B Studios', prerender: false },
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

// Ersetzt ein Meta-Tag und meldet, wenn nichts passiert ist. Wichtig, weil die
// Tags in index.html ueber MEHRERE Zeilen gehen: Ein einzeiliges Suchmuster
// findet sie nicht und scheitert dabei lautlos — genau das ist vorher
// passiert, die Beschreibung blieb auf allen Unterseiten die der Startseite.
function swap(html, pattern, ersatz, label, route) {
  const neu2 = html.replace(pattern, ersatz)
  if (neu2 === html) {
    console.warn(`[postbuild] WARNUNG: ${label} in /${route} nicht ersetzt`)
  }
  return neu2
}

/**
 * Breadcrumb-Daten fuer eine Unterseite. Google stellt damit den Pfad statt
 * der nackten Adresse ins Suchergebnis. Die Startseite bekommt keine — sie ist
 * die Wurzel und haette nur einen einzigen Eintrag.
 */
function breadcrumb(route, cfg) {
  const teile = [{ name: cfg.wurzel || 'Startseite', url: `${BASE}/` }]
  if (cfg.oberBegriff && cfg.oberPfad) {
    teile.push({ name: cfg.oberBegriff, url: `${BASE}/${cfg.oberPfad}/` })
  }
  teile.push({ name: cfg.krume || cfg.title.split(/\s+[—|]\s+/)[0], url: `${BASE}/${route}/` })

  return (
    '<script type="application/ld+json">' +
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: teile.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t.name,
        item: t.url,
      })),
    }) +
    '</script>'
  )
}

function withMeta(html, route, cfg) {
  const url = `${BASE}/${route}/`

  // Sprachfassung: lang-Attribut, og:locale und die Sprachangabe in den
  // strukturierten Daten muessen zur Seite passen, sonst widersprechen sich
  // die Signale.
  if (cfg.lang && cfg.lang !== 'de') {
    html = swap(html, /<html lang="de">/, `<html lang="${cfg.lang}">`, 'html lang', route)
    html = swap(
      html,
      /<meta property="og:locale"[\s\S]*?>/i,
      `<meta property="og:locale" content="${cfg.locale || 'en_US'}" />`,
      'og:locale',
      route,
    )
    html = swap(html, /"inLanguage": "de"/, `"inLanguage": "${cfg.lang}"`, 'inLanguage', route)
  }
  html = swap(html, /<title>[\s\S]*?<\/title>/i, `<title>${esc(cfg.title)}</title>`, 'title', route)
  html = swap(html, /<link\s+rel="canonical"[\s\S]*?>/i, `<link rel="canonical" href="${url}" />`, 'canonical', route)
  html = swap(html, /<meta\s+property="og:url"[\s\S]*?>/i, `<meta property="og:url" content="${url}" />`, 'og:url', route)
  html = swap(html, /<meta\s+property="og:title"[\s\S]*?>/i, `<meta property="og:title" content="${esc(cfg.title)}" />`, 'og:title', route)
  html = swap(html, /<meta\s+name="twitter:title"[\s\S]*?>/i, `<meta name="twitter:title" content="${esc(cfg.title)}" />`, 'twitter:title', route)
  if (cfg.desc) {
    // ogDesc ist optional: Die Sozialvorschau darf kuerzer sein als die
    // Beschreibung fuer die Suche. Fehlt sie, gilt dieselbe fuer beides.
    const sozial = cfg.ogDesc || cfg.desc
    html = swap(html, /<meta\s+name="description"[\s\S]*?>/i, `<meta name="description" content="${esc(cfg.desc)}" />`, 'description', route)
    html = swap(html, /<meta\s+property="og:description"[\s\S]*?>/i, `<meta property="og:description" content="${esc(sozial)}" />`, 'og:description', route)
    html = swap(html, /<meta\s+name="twitter:description"[\s\S]*?>/i, `<meta name="twitter:description" content="${esc(sozial)}" />`, 'twitter:description', route)
  }
  // Breadcrumbs vor dem schliessenden </head> einhaengen. Die englische
  // Startseite bekommt keine: Sie ist die Wurzel ihrer Sprachfassung.
  if (route !== 'en') {
    html = html.replace('</head>', '    ' + breadcrumb(route, cfg) + '\n  </head>')
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
// Bewusst aus `shell` im Speicher und nicht von der Platte kopiert — dort
// steht gleich die vorgerenderte Startseite, und die gehört nicht in eine
// 404-Seite.
writeFileSync('dist/404.html', shell)

// Startseite. Sie ist der Sonderfall: keine eigene Unterordner-Datei, sondern
// dist/index.html selbst, und ihre Meta-Angaben stimmen bereits. Bis hierhin
// war sie eine leere Hülle — ohne JavaScript stand kein einziges Wort darin.
if (render) {
  try {
    const body = render('/')
    const html = shell.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
    if (html === shell) {
      console.warn('[postbuild] WARNUNG: Startseite nicht vorgerendert — <div id="root"></div> nicht gefunden.')
    } else {
      writeFileSync(shellPath, html)
      prerendered++
    }
  } catch (e) {
    // Fehlschlag ist kein Baufehler: dist/index.html bleibt dann die Hülle,
    // die Seite funktioniert im Browser wie bisher.
    console.warn('[postbuild] Vorrendern der Startseite fehlgeschlagen:', e.message)
  }
}

console.log(
  `[postbuild] ${Object.keys(ROUTES).length} Routen erzeugt (HTTP 200) + Startseite, davon ${prerendered} vorgerendert, + 404.html als Fallback.`,
)

// ---------------------------------------------------------------------------
// Content-Security-Policy
//
// Die Seite enthaelt ein Inline-Skript (setzt history.scrollRestoration, damit
// ein Neuladen nicht zur alten Position springt) und einen Inline-Style. Eine
// CSP mit "script-src 'self'" wuerde das Skript blockieren und den Fehler
// zurueckbringen. Statt 'unsafe-inline' zu erlauben, was die ganze Richtlinie
// entwerten wuerde, wird der Hash des Skripts hier bei JEDEM Build neu
// berechnet. So kann er nicht veralten, wenn jemand das Skript aendert.
//
// style-src braucht 'unsafe-inline', weil motion/react Animationen ueber
// style-Attribute setzt. Das laesst sich nicht per Hash abbilden.
//
// Kommt spaeter Plausible dazu, muessen dessen Domain in script-src und
// connect-src ergaenzt werden.
const inlineScripts = [...shell.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/gi)]
  .map((m) => m[1])
  .filter((code) => code.trim().length > 0)

const scriptHashes = inlineScripts.map(
  (code) => `'sha256-${createHash('sha256').update(code, 'utf8').digest('base64')}'`,
)

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' ${scriptHashes.join(' ')}`.trim(),
  "connect-src 'self'",
  "media-src 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ')

const headersPath = 'dist/_headers'
if (existsSync(headersPath)) {
  const existing = readFileSync(headersPath, 'utf8').replace(/\s*$/, '')
  writeFileSync(headersPath, `${existing}\n  Content-Security-Policy: ${csp}\n`)
  console.log(
    `[postbuild] CSP gesetzt (${scriptHashes.length} Inline-Skript-Hash${scriptHashes.length === 1 ? '' : 'es'}).`,
  )
} else {
  console.warn('[postbuild] dist/_headers fehlt — CSP nicht gesetzt.')
}
