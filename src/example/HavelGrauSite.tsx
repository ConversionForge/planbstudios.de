import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  VillaIllo,
  LoftIllo,
  GartenhausIllo,
  FloorplanIllo,
  MonogramHG,
} from './illustrations'

export const PROPERTIES = [
  {
    name: 'Stadtvilla Babelsberg',
    location: 'Potsdam · Babelsberg',
    rooms: '6 Zimmer',
    area: '245 m²',
    price: '1.480.000 €',
    Illo: VillaIllo,
  },
  {
    name: 'Loft am Hafen',
    location: 'Potsdam · Speicherstadt',
    rooms: '3 Zimmer',
    area: '138 m²',
    price: '790.000 €',
    Illo: LoftIllo,
  },
  {
    name: 'Gartenhaus Sanssouci',
    location: 'Potsdam · Westend',
    rooms: '4 Zimmer',
    area: '176 m²',
    price: '960.000 €',
    Illo: GartenhausIllo,
  },
]

function Ribbon() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-center gap-x-3 gap-y-1 bg-night px-4 py-2.5 text-center text-[12px] text-cream-soft flex-wrap">
      <span className="flex items-center gap-2">
        <span className="inline-block h-1.5 w-1.5 bg-gold" />
        Beispielprojekt — erstellt von Plan B Studios
      </span>
      <Link
        to="/#webdesign"
        className="font-medium text-gold underline-offset-4 transition-colors hover:text-gold-bright hover:underline"
      >
        ← Zurück zu Plan B Studios
      </Link>
    </div>
  )
}

function HGNav() {
  return (
    <header className="sticky top-[41px] z-40 border-b border-hg-line bg-hg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
        <a href="#hg-top" className="flex items-center gap-3 text-hg-ink">
          <MonogramHG className="h-8 w-8 text-hg-olive" />
          <span className="text-[15px] font-medium uppercase tracking-[0.28em] text-hg-ink">
            Havel&nbsp;&amp;&nbsp;Grau
          </span>
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {['Objekte', 'Philosophie', 'Kontakt'].map((l) => (
            <a
              key={l}
              href={`#hg-${l.toLowerCase()}`}
              className="text-[13px] font-medium uppercase tracking-[0.16em] text-hg-muted transition-colors hover:text-hg-olive"
            >
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#hg-kontakt"
          className="border border-hg-olive px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.16em] text-hg-olive transition-colors duration-300 hover:bg-hg-olive hover:text-hg-paper"
        >
          Beratung
        </a>
      </div>
    </header>
  )
}

function PropertyCard({ p }: { p: (typeof PROPERTIES)[number] }) {
  const { Illo } = p
  return (
    <a href="#hg-kontakt" className="group block">
      <div className="relative mb-5 flex aspect-[4/3] items-center justify-center overflow-hidden bg-hg-panel">
        <Illo className="h-[78%] w-[78%] text-hg-olive transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
        <span className="absolute left-4 top-4 bg-hg-paper px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-hg-olive">
          Zu verkaufen
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-[26px] font-medium leading-tight text-hg-ink">{p.name}</h3>
        <span className="shrink-0 font-grotesk text-[15px] font-medium text-hg-olive">{p.price}</span>
      </div>
      <p className="mt-1 text-[13px] uppercase tracking-[0.14em] text-hg-muted">{p.location}</p>
      <div className="mt-4 flex items-center gap-5 border-t border-hg-line pt-4 text-[13px] text-hg-muted">
        <span>{p.rooms}</span>
        <span className="h-3 w-px bg-hg-line" />
        <span>{p.area}</span>
        <span className="ml-auto flex items-center gap-1.5 font-medium text-hg-ink transition-colors group-hover:text-hg-olive">
          Details
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
            <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </a>
  )
}

export function HavelGrauSite() {
  useEffect(() => {
    document.title = 'Havel & Grau — Immobilien in Potsdam (Beispielprojekt)'
    return () => {
      document.title = 'Plan B Studios — Webdesign & 3D-Rundgänge'
    }
  }, [])

  return (
    <div id="hg-top" className="min-h-screen bg-hg-paper font-grotesk text-hg-ink antialiased">
      <Ribbon />
      <HGNav />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:gap-16 md:py-24 lg:px-8">
        <div>
          <p className="mb-6 text-[12px] font-medium uppercase tracking-[0.3em] text-hg-olive">
            Immobilien · Potsdam · seit 1998
          </p>
          <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] font-light leading-[0.98] text-hg-ink">
            Zuhause mit
            <br />
            <span className="italic text-hg-olive">Charakter.</span>
          </h1>
          <p className="mt-8 max-w-md text-[16px] leading-relaxed text-hg-muted">
            Ausgewählte Objekte an der Havel — ehrlich beraten, sorgfältig
            vermittelt. Wir verkaufen keine Quadratmeter, sondern Orte zum Bleiben.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#hg-objekte"
              className="bg-hg-olive px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.14em] text-hg-paper transition-colors duration-300 hover:bg-hg-ink"
            >
              Objekte ansehen
            </a>
            <a
              href="#hg-kontakt"
              className="px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.14em] text-hg-ink underline-offset-4 transition-colors duration-300 hover:text-hg-olive hover:underline"
            >
              Beratung anfragen
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="flex aspect-[4/5] items-center justify-center bg-hg-olive">
            <VillaIllo className="h-[72%] w-[72%] text-hg-paper" />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden bg-hg-paper p-5 shadow-[0_20px_50px_-24px_rgba(35,32,26,0.5)] sm:block">
            <p className="font-display text-[40px] leading-none text-hg-olive">120+</p>
            <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-hg-muted">
              vermittelte Objekte
            </p>
          </div>
        </div>
      </section>

      {/* Objekte */}
      <section id="hg-objekte" className="border-t border-hg-line py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.3em] text-hg-olive">
                Aktuelle Angebote
              </p>
              <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-light text-hg-ink">
                Ausgewählte Objekte
              </h2>
            </div>
            <a
              href="#hg-kontakt"
              className="text-[13px] font-medium uppercase tracking-[0.14em] text-hg-olive underline-offset-4 hover:underline"
            >
              Alle 14 Objekte →
            </a>
          </div>
          <div className="grid gap-x-10 gap-y-14 md:grid-cols-3">
            {PROPERTIES.map((p) => (
              <PropertyCard key={p.name} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophie */}
      <section id="hg-philosophie" className="bg-hg-olive py-24 text-hg-paper md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <FloorplanIllo className="mx-auto mb-10 h-16 w-16 text-hg-paper/70" />
          <p className="font-display text-[clamp(1.9rem,4vw,3.2rem)] font-light italic leading-[1.3]">
            „Eine gute Wohnung findet man. Ein Zuhause erkennt man in dem Moment,
            in dem man eintritt."
          </p>
          <p className="mt-8 text-[12px] uppercase tracking-[0.3em] text-hg-paper/70">
            Katharina Grau · Gründerin
          </p>
        </div>
      </section>

      {/* Zahlen */}
      <section className="border-t border-hg-line py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-12 px-6 md:grid-cols-4 lg:px-8">
          {[
            ['27', 'Jahre an der Havel'],
            ['120+', 'vermittelte Objekte'],
            ['14', 'Objekte im Angebot'],
            ['1:1', 'persönliche Betreuung'],
          ].map(([num, label]) => (
            <div key={label} className="text-center">
              <p className="font-display text-[clamp(2.8rem,6vw,4.2rem)] font-light leading-none text-hg-olive">
                {num}
              </p>
              <p className="mt-3 text-[12px] uppercase tracking-[0.16em] text-hg-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Kontakt */}
      <section id="hg-kontakt" className="border-t border-hg-line py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.3em] text-hg-olive">
              Kontakt
            </p>
            <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-light leading-tight text-hg-ink">
              Sprechen wir über
              <br />
              Ihr <span className="italic text-hg-olive">Zuhause</span>.
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-hg-muted">
              Ob Verkauf, Kauf oder eine ehrliche Einschätzung — vereinbaren Sie ein
              unverbindliches Gespräch in unserem Büro in der Potsdamer Innenstadt.
            </p>
          </div>
          <div className="border border-hg-line bg-hg-panel/40 p-8 md:p-10">
            <dl className="space-y-6">
              {[
                ['Büro', 'Brandenburger Straße 22, 14467 Potsdam'],
                ['Telefon', '0331 · 24 00 18'],
                ['E-Mail', 'kontakt@havel-grau.example'],
                ['Sprechzeiten', 'Mo–Fr 9–18 Uhr · Sa nach Vereinbarung'],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1 border-b border-hg-line pb-5 last:border-0 last:pb-0">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-hg-muted">{k}</dt>
                  <dd className="text-[16px] text-hg-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-hg-line bg-hg-panel/50 py-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <MonogramHG className="h-7 w-7 text-hg-olive" />
            <span className="text-[14px] font-medium uppercase tracking-[0.24em] text-hg-ink">
              Havel&nbsp;&amp;&nbsp;Grau
            </span>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-hg-muted">
            Immobilienvermittlung in Potsdam und Umgebung. Persönlich seit 1998.
          </p>
          <div className="text-[12px] uppercase tracking-[0.14em] text-hg-muted">
            © {new Date().getFullYear()} Havel &amp; Grau
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl px-6 lg:px-8">
          <p className="border-t border-hg-line pt-6 text-[11px] leading-relaxed text-hg-muted/80">
            Fiktives Beispielprojekt zu Demonstrationszwecken — gestaltet und
            entwickelt von Plan B Studios. Diese Website ist nicht öffentlich
            erreichbar; „Havel &amp; Grau" ist ein erfundenes Unternehmen.
          </p>
        </div>
      </footer>
    </div>
  )
}
