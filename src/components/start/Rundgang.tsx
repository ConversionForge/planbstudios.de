import { Link } from 'react-router-dom'
import { Block } from '../SeitenLayout'

// 3D-Rundgaenge: bewusst nur noch ein schmales Band.
//
// Vorher ein eigenes Kapitel mit einer 420 vh langen Flugszene in einen
// Drahtgitterraum ("Treten Sie ein"). Die Rueckmeldung: Der Wuerfel fuehlt
// sich beim Scrollen nicht gut an, und der Text ist zu schnell wieder weg.
// Ausserdem sind die Rundgaenge keine Hauptleistung mehr, sondern eine
// Ergaenzung fuer Makler. Der Film selbst laeuft auf /3d-rundgaenge/.

const VORSCHAU = `${import.meta.env.BASE_URL}rundgang/living-1.jpg`

export function Rundgang() {
  return (
    <section className="relative border-t border-night-line/60 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Block>
          <Link
            to="/3d-rundgaenge/"
            data-cursor="Ansehen"
            className="group grid items-center gap-8 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)_auto] md:gap-12"
          >
            <span className="relative block aspect-video overflow-hidden rounded-xl border border-night-line">
              <img
                src={VORSCHAU}
                alt="Wohnbereich eines Design-Lofts in Hamburg, Standbild aus dem Objektfilm"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-night/25" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-night/70 text-cream ring-1 ring-cream/20 backdrop-blur transition-colors group-hover:bg-gold group-hover:text-night">
                  <svg aria-hidden viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </span>

            <span>
              <span className="mb-4 block font-mono text-[12px] tracking-[0.3em] text-gold">
                3D-RUNDGÄNGE · FÜR MAKLER
              </span>
              <span className="block font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-light leading-tight text-cream">
                Objektfilme und Rundgänge aus Ihren Fotos
              </span>
              <span className="mt-3 block max-w-xl text-[15px] leading-relaxed text-stone">
                Aus vorhandenen Objektfotos entsteht ein Film, der durch die Räume
                fährt, oder ein geführter Rundgang. Als Ergänzung zur
                Akquise-Strecke, für die Objekte, die Sie vermarkten.
              </span>
            </span>

            <span className="inline-flex items-center gap-2 text-[15px] font-medium text-cream transition-colors group-hover:text-gold-bright">
              Film ansehen
              <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </Block>
      </div>
    </section>
  )
}
