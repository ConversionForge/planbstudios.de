import { Link, useLocation } from 'react-router-dom'
import { CubeMark } from './Logo'
import { sichtbareReferenzen } from '../inhalte/referenzen'

const JAHR = new Date().getFullYear()

// Fussbereich.
//
// Seit November 2026 ohne E-Mail-Adresse und ohne "Anfragen"-Verweis. An ihrer
// Stelle stehen die kostenlosen Einstiege (Lead-Magneten): Wer bis hierher
// gescrollt hat, ohne anzufragen, bekommt etwas, das ihm jetzt schon nuetzt.
// Kontakt steht weiterhin im Abschnitt direkt darueber und in der
// Navigation.
//
// Tippflaechen: Jeder Verweis ist mindestens 44 Pixel hoch (py-2.5 auf
// 15-Pixel-Schrift). Vorher waren es 19 Pixel, zu klein fuer den Daumen.

const LEISTUNGEN = [
  { text: 'Automatisierung', zu: '/automatisierung/' },
  { text: 'Akquise-Strecken', zu: '/akquise-strecken/' },
  { text: 'Websites', zu: '/webdesign-luebeck/' },
  { text: 'Website-Betreuung', zu: '/website-betreuung/' },
  { text: '3D-Rundgänge für Makler', zu: '/3d-rundgaenge/' },
]

const KOSTENLOS = [
  {
    titel: 'Akquise-Check für Makler',
    text: 'Fünf Fragen zu Ihrer Eigentümer-Akquise, drei Hinweise am Ende.',
    zu: '/akquise-check/',
  },
  {
    titel: 'Ablauf-Einschätzung',
    text: 'Schicken Sie mir bis zu drei Abläufe. Ich sage Ihnen, was sich automatisieren lässt.',
    zu: '/automatisierung/#einschaetzung',
  },
  {
    titel: 'Ratgeber: Mehr Eigentümeranfragen',
    text: 'Woran es liegt, dass Eigentümer erst spät anrufen, und was ein Makler dagegen tun kann.',
    zu: '/makler/mehr-eigentuemeranfragen/',
  },
]

const verweisKlasse =
  'block py-2.5 text-[15px] leading-tight text-cream-soft transition-colors hover:text-gold-bright md:py-1.5'

/** Abschnitt der Startseite: dort Anker, von ueberall sonst Verweis dorthin. */
function AbschnittVerweis({ id, children }: { id: string; children: string }) {
  const { pathname } = useLocation()
  return pathname === '/' ? (
    <a href={`#${id}`} className={verweisKlasse}>
      {children}
    </a>
  ) : (
    <Link to={`/#${id}`} className={verweisKlasse}>
      {children}
    </Link>
  )
}

export function Footer() {
  const mitReferenzen = sichtbareReferenzen().length > 0

  return (
    <footer className="relative border-t border-night-line bg-night-soft">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)_minmax(0,1.3fr)] lg:gap-12">
          {/* Marke und zwei Spalten Navigation */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <CubeMark className="h-7 w-7 text-gold" strokeWidth={1.4} />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-[17px] tracking-wide text-cream">Plan B</span>
                <span className="mt-1 text-[8.5px] font-medium uppercase tracking-[0.42em] text-gold">
                  Studios
                </span>
              </span>
            </div>
            <p className="max-w-xs text-[14px] leading-relaxed text-stone">
              Automatisierungen, Akquise-Strecken und Websites für Betriebe in
              Lübeck und Schleswig-Holstein.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-10">
            <nav aria-label="Leistungen">
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone/70">Leistungen</p>
              {LEISTUNGEN.map((l) => (
                <Link key={l.zu} to={l.zu} className={verweisKlasse}>
                  {l.text}
                </Link>
              ))}
            </nav>
            <nav aria-label="Studio">
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone/70">Studio</p>
              {mitReferenzen ? (
                <AbschnittVerweis id="referenzen">Referenzen</AbschnittVerweis>
              ) : (
                <AbschnittVerweis id="arbeitsproben">Arbeitsproben</AbschnittVerweis>
              )}
              <Link to="/ueber-mich/" className={verweisKlasse}>
                Über mich
              </Link>
              <AbschnittVerweis id="faq">Fragen</AbschnittVerweis>
            </nav>
          </div>

          {/* Kostenlose Einstiege */}
          <div className="rounded-[1.6rem] bg-cream/[0.03] p-1.5 ring-1 ring-cream/[0.06]">
            <div className="h-full rounded-[calc(1.6rem-0.375rem)] bg-night-raised px-6 py-6 shadow-[inset_0_1px_0_rgba(243,238,229,0.06)] md:px-8 md:py-7">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold">Kostenlos für Sie</p>
              <ul className="mt-3 divide-y divide-night-line">
                {KOSTENLOS.map((k) => (
                  <li key={k.titel}>
                    <Link to={k.zu} className="group flex items-start justify-between gap-6 py-4">
                      <span>
                        <span className="block text-[15px] font-medium text-cream transition-colors group-hover:text-gold-bright">
                          {k.titel}
                        </span>
                        <span className="mt-1 block text-[13px] leading-relaxed text-stone">{k.text}</span>
                      </span>
                      <svg aria-hidden viewBox="0 0 24 24" fill="none" className="mt-1 h-4 w-4 shrink-0 text-stone transition-all group-hover:translate-x-1 group-hover:text-gold-bright">
                        <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-night-line pt-6 text-[13px] text-stone sm:flex-row sm:items-center sm:justify-between">
          <span className="py-2">© {JAHR} Plan B Studios, Lübeck</span>
          <div className="flex gap-8">
            <Link to="/impressum/" className="py-2.5 transition-colors hover:text-cream-soft">
              Impressum
            </Link>
            <Link to="/datenschutz/" className="py-2.5 transition-colors hover:text-cream-soft">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
