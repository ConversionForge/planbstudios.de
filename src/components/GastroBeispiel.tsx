import { motion } from 'motion/react'
import { Block, Marke, einblenden } from './SeitenLayout'

// Zweites Beispiel auf /automatisierung/: Stammgaeste fuer Restaurants.
//
// Vorlage ist ein Ablauf, den der Inhaber als Blaupause geschickt hat
// (November 2026): QR-Code am Tisch, Anmeldung gegen ein kleines Dankeschoen,
// Kontakt im System, Bestaetigung, spaeter Angebote zu ruhigen Zeiten.
//
// Fuer Deutschland angepasst und bewusst NICHT als erledigter Auftrag
// formuliert ("Fuer Restaurants baue ich ..."), denn gebaut ist es noch fuer
// niemanden. Keine Wirkungszahl ("die Tische fuellen sich"): Was es bringt,
// zeigt sich an Anmeldungen und eingeloesten Angeboten.
//
// RECHT: Werbung per SMS, WhatsApp oder Mail braucht nach § 7 UWG in aller
// Regel eine ausdrueckliche Einwilligung, und jede Nachricht einen Weg zur
// Abmeldung. Der Text sagt das, weil genau das bei Anbietern solcher Systeme
// oft fehlt.

const SCHRITTE = [
  {
    titel: 'QR-Code am Tisch',
    text: 'Ein Aufsteller bietet ein kleines Dankeschön für die Anmeldung, zum Beispiel eine Vorspeise aufs Haus.',
  },
  {
    titel: 'Anmelden in einer Minute',
    text: 'Name und Handynummer oder E-Mail, auf Wunsch der Geburtstag. Mit einem Häkchen für die Einwilligung in Angebote.',
  },
  {
    titel: 'Kontakt im System',
    text: 'Jede Anmeldung landet automatisch in Ihrer Kontaktliste. Kein Zettel, kein Abtippen.',
  },
  {
    titel: 'Bestätigung',
    text: 'Der Gast bestätigt seine Anmeldung per Nachricht. Danach löst er sein Dankeschön beim Service ein.',
  },
  {
    titel: 'Angebot zur ruhigen Zeit',
    text: 'Sie wählen einen Zeitpunkt, an dem sonst wenig los ist, etwa Montag um 16 Uhr, und ein Angebot. Die Nachricht geht an alle, die zugestimmt haben.',
  },
]

const ANLAESSE = ['Geburtstage', 'Wochenangebote', 'Feiertage', 'Veranstaltungen']

/**
 * Deterministisches Muster, das wie ein QR-Code aussieht, aber keiner ist.
 * Absichtlich nicht scannbar: Es ist eine Illustration, und ein echter Code
 * auf einer Beispielkarte wuerde irgendwohin fuehren muessen.
 */
function Scheincode() {
  const n = 21
  const istFinder = (x: number, y: number) => {
    const ecke = (ox: number, oy: number) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7
    return ecke(0, 0) || ecke(n - 7, 0) || ecke(0, n - 7)
  }
  const finderZelle = (x: number, y: number) => {
    const lx = x >= n - 7 ? x - (n - 7) : x
    const ly = y >= n - 7 ? y - (n - 7) : y
    const rand = lx === 0 || lx === 6 || ly === 0 || ly === 6
    const kern = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4
    return rand || kern
  }
  const zellen: [number, number][] = []
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (istFinder(x, y)) {
        if (finderZelle(x, y)) zellen.push([x, y])
        continue
      }
      // Fester Pseudozufall, damit Vorrendern und Browser dasselbe zeigen.
      if (((x * 73 + y * 151 + x * y * 7) % 11) < 5) zellen.push([x, y])
    }
  }
  return (
    <svg aria-hidden viewBox={`0 0 ${n} ${n}`} className="h-full w-full" shapeRendering="crispEdges">
      {zellen.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#14171c" />
      ))}
    </svg>
  )
}

/** Tischaufsteller als Illustration: so sieht der Einstieg fuer den Gast aus. */
function Tischaufsteller() {
  return (
    <figure className="relative mx-auto w-full max-w-sm">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-y-8 inset-x-0 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(184,137,74,0.14),transparent)] blur-2xl sm:-inset-x-8"
      />
      <div className="relative -rotate-2 rounded-2xl bg-[#f6efe4] p-7 text-[#1d1a16] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] ring-1 ring-black/5 transition-transform duration-700 hover:rotate-0">
        <p className="font-mono text-[10px] tracking-[0.22em] text-[#8a6a3b]">IHR RESTAURANT</p>
        <p className="mt-4 font-serif text-[1.9rem] font-light leading-[1.05]">
          Vorspeise
          <br />
          <em className="italic">aufs Haus.</em>
        </p>
        <p className="mt-3 max-w-[15rem] text-[13px] leading-snug text-[#4a443c]">
          QR-Code scannen, anmelden und beim Service einlösen.
        </p>
        <div className="mt-6 flex items-end justify-between gap-4">
          <div className="h-24 w-24 rounded-lg bg-white p-2 ring-1 ring-black/10">
            <Scheincode />
          </div>
          <p className="max-w-[7.5rem] text-right text-[10px] leading-snug text-[#7a7268]">
            Mit Ihrer Anmeldung erhalten Sie Angebote. Abmelden geht jederzeit.
          </p>
        </div>
      </div>
      <figcaption className="mt-6 text-center text-[13px] text-stone">
        Beispiel für einen Aufsteller. Der Code ist nur angedeutet.
      </figcaption>
    </figure>
  )
}

export function GastroBeispiel() {
  return (
    <section id="gastronomie" className="scroll-mt-28 border-t border-night-line py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <Block>
          <Marke>ZWEITES BEISPIEL · GASTRONOMIE</Marke>
          <h2 className="font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-cream">
            Gäste, die Sie <em className="italic text-gold-bright">wieder</em> einladen können.
          </h2>
        </Block>
        <Block>
          <p className="text-base leading-relaxed text-cream-soft md:text-lg">
            Für Restaurants baue ich eine Strecke, über die sich Gäste am Tisch
            selbst in Ihre Kontaktliste eintragen. Ist es an einem
            Montagnachmittag ruhig, geht ein Angebot an genau diese Gäste.
          </p>
          <p className="mt-6 text-base leading-relaxed text-stone">
            Die Gäste melden sich freiwillig an, für ein kleines Dankeschön. Sie
            bekommen dafür einen Weg, Ihre Gäste direkt zu erreichen, ohne
            Anzeigen und ohne Plattform dazwischen.
          </p>
        </Block>
      </div>

      <div className="mt-16 grid items-start gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Block>
          <Tischaufsteller />
        </Block>

        <Block gestaffelteKinder>
          <ol className="relative">
            {SCHRITTE.map((s, i) => (
              <motion.li
                key={s.titel}
                variants={einblenden}
                className="relative pb-9 pl-14 last:pb-0"
              >
                {i < SCHRITTE.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[0.95rem] top-9 h-[calc(100%-2.25rem)] w-px bg-gradient-to-b from-gold/60 to-night-line"
                  />
                )}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 bg-night font-mono text-[11px] text-gold"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="pt-1 font-serif text-xl font-light text-cream">{s.titel}</h3>
                <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-stone">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </Block>
      </div>

      <Block className="mt-16 grid gap-px overflow-hidden rounded-[1.6rem] bg-night-line ring-1 ring-night-line md:grid-cols-2">
        <div className="bg-night p-8 md:p-9">
          <p className="font-mono text-[12px] tracking-[0.2em] text-gold">WOFÜR DIE LISTE NOCH TAUGT</p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-cream-soft">
            {ANLAESSE.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <span aria-hidden className="h-1 w-1 rounded-full bg-gold" />
                {a}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[14px] leading-relaxed text-stone">
            Wie viele Gäste dadurch wiederkommen, hängt an Ihrem Restaurant und
            Ihrem Angebot. Sehen lässt es sich an den Anmeldungen und an den
            eingelösten Angeboten.
          </p>
        </div>
        <div className="bg-night p-8 md:p-9">
          <p className="font-mono text-[12px] tracking-[0.2em] text-gold">RECHTLICH SAUBER</p>
          <p className="mt-5 text-[15px] leading-relaxed text-cream-soft">
            Werbung per SMS, WhatsApp oder Mail braucht in Deutschland in aller
            Regel eine ausdrückliche Einwilligung, und jede Nachricht muss einen
            Weg zur Abmeldung enthalten.
          </p>
          <p className="mt-4 text-[14px] leading-relaxed text-stone">
            Genau so ist die Strecke gebaut: Anmeldung mit Häkchen, Bestätigung
            per Nachricht, Abmeldung in jeder Nachricht.
          </p>
        </div>
      </Block>
    </section>
  )
}
