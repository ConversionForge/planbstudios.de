import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { LangProvider } from './i18n'

// Wird beim Build (vite build --ssr) zu einem Node-Modul gebaut und von
// scripts/postbuild.mjs benutzt, um die Rechtsseiten als echtes HTML
// vorzurendern (Impressum/Datenschutz ohne JavaScript lesbar).
export function render(url: string): string {
  return renderToStaticMarkup(
    <StaticRouter location={url}>
      <LangProvider>
        <App />
      </LangProvider>
    </StaticRouter>,
  )
}
