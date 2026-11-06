import type { ReactNode } from 'react'
import { MeridianMark, ElevationDrawing } from './meridianBlueprint'
import { MonogramHG, VillaIllo } from './illustrations'

// Verkleinerte Vorschauen der beiden Beispielprojekte. Liegen hier statt in
// einem Startseiten-Kapitel, weil sie an mehreren Stellen gebraucht werden
// (Startseite, Webdesign-Seite). Beide Marken sind erfunden und werden auf
// der Seite auch so gekennzeichnet.

const GRID_BG = {
  backgroundImage:
    'linear-gradient(to right, rgba(20,23,28,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,23,28,0.05) 1px, transparent 1px)',
  backgroundSize: '54px 54px',
}

// Kompakte, echte Vorschau der Kundenmarke "MERIDIAN" — Blaupausen-Ästhetik als
// klarer Kontrast zu Plan B Studios, damit erkennbar ist: eine andere Marke.
export function MeridianPreview() {
  return (
    <div className="select-none bg-mer-paper font-tech text-mer-ink" style={GRID_BG}>
      {/* Nav */}
      <div className="flex items-center justify-between border-b border-mer-ink/15 px-10 py-4">
        <div className="flex items-center gap-2.5">
          <MeridianMark className="h-5 w-5 text-mer-ink" />
          <span className="font-tech text-[15px] font-bold tracking-[0.18em]">MERIDIAN</span>
        </div>
        <div className="flex items-center gap-6">
          {['Quartier', 'Architektur', 'Wohnungen', 'Lage'].map((l) => (
            <span key={l} className="font-data text-[10px] uppercase tracking-[0.16em] text-mer-muted">
              {l}
            </span>
          ))}
          <span className="bg-mer-ink px-4 py-2 font-data text-[10px] uppercase tracking-[0.16em] text-mer-paper">
            Anfragen
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="px-10 pt-10">
        <div className="flex items-baseline justify-between border-b border-mer-ink/20 pb-3 font-data text-[10px] tracking-[0.22em] text-mer-muted">
          <span>N° 01 — NEUBAUPROJEKT</span>
          <span>53°52′N · 10°41′E</span>
        </div>
        {/* Bewusst KEIN h1: Das hier ist ein Mockup einer fremden Website im
            Rahmen. Ein zweites h1 auf der Startseite waere semantisch falsch —
            die Startseite hat genau eine Hauptueberschrift. */}
        <div className="mt-8 font-tech text-7xl font-bold uppercase leading-[0.9] tracking-[-0.02em]">
          Wohnen
          <br />
          <span className="mer-outline">am Wasser</span>
        </div>
        <div className="mt-6 flex items-end justify-between gap-6 pb-6">
          <p className="max-w-xs text-[13px] leading-relaxed text-mer-muted">
            42 Wohnungen in vier Baukörpern, direkt am Kai der Trave.
          </p>
          <span className="font-data text-[11px] tracking-[0.16em] text-mer-tide">
            WOHNUNGEN ANSEHEN ↓
          </span>
        </div>
        <ElevationDrawing className="mx-auto h-auto w-[82%]" />
      </div>

      {/* Laufband */}
      <div className="mt-6 flex items-center gap-8 overflow-hidden border-y border-mer-ink/20 px-10 py-3 font-data text-[11px] uppercase tracking-[0.24em] text-mer-ink">
        {['42 Wohnungen', 'Bezug 2026', 'An der Trave', 'Provisionsfrei', 'KfW 40'].map((m) => (
          <span key={m} className="flex items-center gap-8 whitespace-nowrap">
            <span className="inline-block h-1.5 w-1.5 bg-mer-tide" />
            {m}
          </span>
        ))}
      </div>

      {/* Kennzahlen */}
      <div className="grid grid-cols-4 gap-4 px-10 py-10">
        {[
          ['42', 'Wohnungen'],
          ['4', 'Baukörper'],
          ['38–142', 'm² Wohnfläche'],
          ['2026', 'Bezugsfertig'],
        ].map(([v, l]) => (
          <div key={l}>
            <p className="font-tech text-3xl font-bold tracking-[-0.02em] text-mer-ink">{v}</p>
            <p className="mt-1 font-data text-[9px] uppercase tracking-[0.18em] text-mer-muted">{l}</p>
          </div>
        ))}
      </div>

      {/* Wohnungs-Zeile */}
      <div className="border-t border-mer-ink/15 px-10 py-10">
        <p className="mb-6 font-tech text-3xl font-bold uppercase tracking-[-0.01em]">Vier Typen.</p>
        <div className="grid grid-cols-[3rem_1.4fr_1fr_1fr_8rem] items-baseline gap-4 border-b border-mer-ink/15 py-5">
          <span className="font-data text-[12px] tracking-[0.2em] text-mer-tide">01</span>
          <span className="font-tech text-xl font-bold uppercase">Atelier</span>
          <span className="text-[13px] text-mer-muted">1–2 Zimmer</span>
          <span className="text-[13px] text-mer-muted">ab 38 m²</span>
          <span className="text-[14px] font-medium">ab 329.000 €</span>
        </div>
      </div>

      {/* Lage */}
      <div className="bg-mer-deep px-10 py-14 text-mer-paper">
        <p className="font-tech text-2xl font-bold uppercase leading-[1.1]">
          Am Kai. <span className="mer-outline-paper">Nicht irgendwo.</span>
        </p>
      </div>
    </div>
  )
}

export function HavelGrauMini() {
  return (
    <div className="flex h-full flex-col bg-hg-navy text-hg-cream">
      <div className="flex items-center justify-between border-b border-hg-cream/15 px-5 py-2.5">
        <div className="flex items-center gap-2">
          <MonogramHG className="h-4 w-4 text-hg-clay-soft" />
          <span className="font-display text-[12px] font-medium">Havel &amp; Grau</span>
        </div>
        <span className="bg-hg-clay px-3 py-1 text-[9px] font-medium text-hg-cream">Beratung</span>
      </div>
      <div className="flex flex-1 flex-col justify-center px-6 py-4">
        <p className="text-[8px] uppercase tracking-[0.26em] text-hg-clay-soft">
          Immobilien in Potsdam · seit 1998
        </p>
        <p className="mt-2 font-display text-3xl font-medium leading-[0.9] tracking-[-0.02em] md:text-4xl">
          Häuser mit
          <br />
          <span className="italic text-hg-clay-soft">Vorgeschichte.</span>
        </p>
        <VillaIllo className="mt-4 h-auto w-[130px] text-hg-cream/40" />
      </div>
    </div>
  )
}

/**
 * Browserrahmen um eine Vorschau. Die Adresszeile macht auf einen Blick klar:
 * Das hier ist eine eigene Website, nicht ein Teil von Plan B Studios.
 */
export function BrowserRahmen({
  adresse,
  children,
  className = '',
}: {
  adresse: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-night-line shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)] ${className}`}
    >
      <div className="flex h-10 items-center gap-4 border-b border-night-line bg-[#101011] px-4">
        <div aria-hidden className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-stone/25" />
          <div className="h-2.5 w-2.5 rounded-full bg-stone/25" />
          <div className="h-2.5 w-2.5 rounded-full bg-stone/25" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-full bg-night px-4 py-1">
          <svg aria-hidden viewBox="0 0 12 12" className="h-2.5 w-2.5 text-gold" fill="none">
            <rect x="2.5" y="5" width="7" height="5" rx="1" stroke="currentColor" />
            <path d="M4 5V3.5a2 2 0 0 1 4 0V5" stroke="currentColor" />
          </svg>
          <span className="text-[11px] tracking-[0.05em] text-stone">{adresse}</span>
        </div>
        <div className="w-10" />
      </div>
      {children}
    </div>
  )
}
