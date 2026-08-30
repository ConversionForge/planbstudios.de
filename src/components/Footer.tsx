import { Link, useLocation } from 'react-router-dom'
import { CubeMark } from './Logo'
import { useT } from '../i18n'

const YEAR = new Date().getFullYear()

// Auf der Startseite: reiner Anker (Lenis scrollt smooth). Von einer Unterseite:
// Router-Navigation zur Startseite mit Anker.
function SectionLink({ id, children }: { id: string; children: string }) {
  const { pathname } = useLocation()
  const cls = 'text-[14px] text-cream-soft transition-colors hover:text-gold'
  if (pathname === '/') {
    return (
      <a href={`#${id}`} className={cls}>
        {children}
      </a>
    )
  }
  return (
    <Link to={`/#${id}`} className={cls}>
      {children}
    </Link>
  )
}

export function Footer() {
  const t = useT()
  return (
    <footer className="relative border-t border-night-line bg-night-soft">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
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
              {t.footer.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-3">
            <div className="flex flex-col gap-3">
              <span className="mb-1 text-[11px] uppercase tracking-[0.2em] text-stone/60">{t.footer.colServices}</span>
              <SectionLink id="webdesign">{t.footer.linkWebdesign}</SectionLink>
              <SectionLink id="rundgaenge">{t.footer.linkRundgaenge}</SectionLink>
              <Link
                to="/makler/mehr-eigentuemeranfragen"
                className="text-[14px] text-cream-soft transition-colors hover:text-gold"
              >
                {t.footer.linkMakler}
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="mb-1 text-[11px] uppercase tracking-[0.2em] text-stone/60">{t.footer.colStudio}</span>
              <SectionLink id="referenzen">{t.footer.linkArbeiten}</SectionLink>
              <SectionLink id="studio">{t.footer.linkAbout}</SectionLink>
            </div>
            <div className="flex flex-col gap-3">
              <span className="mb-1 text-[11px] uppercase tracking-[0.2em] text-stone/60">{t.footer.colContact}</span>
              <a href="mailto:info@planbstudios.de" className="text-[14px] text-cream-soft transition-colors hover:text-gold">{t.footer.linkEmail}</a>
              <SectionLink id="kontakt">{t.footer.linkRequest}</SectionLink>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-night-line pt-8 text-[13px] text-stone sm:flex-row sm:items-center sm:justify-between">
          <span>© {YEAR} Plan B Studios. {t.footer.rights}</span>
          <div className="flex gap-8">
            <Link to="/impressum" className="transition-colors hover:text-cream-soft">{t.common.imprint}</Link>
            <Link to="/datenschutz" className="transition-colors hover:text-cream-soft">{t.common.privacy}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
