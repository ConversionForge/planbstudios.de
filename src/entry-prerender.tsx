import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'

// Wird beim Build (vite build --ssr) zu einem Node-Modul gebaut und von
// scripts/postbuild.mjs benutzt, um die Seiten als echtes HTML vorzurendern
// (Inhalt ohne JavaScript lesbar, fuer Suchmaschinen und Pruef-Bots).
export function render(url: string): string {
  return renderToStaticMarkup(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}
