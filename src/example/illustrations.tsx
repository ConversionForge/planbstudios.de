interface IlloProps {
  className?: string
}

// Alle Illustrationen sind Strichzeichnungen in currentColor — bewusst editorial,
// damit sofort erkennbar ist, dass es sich um eine gestaltete Beispiel-Website handelt.

export function VillaIllo({ className }: IlloProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M60 150 L200 70 L340 150" />
        <path d="M90 132 V250 H310 V132" />
        <rect x="130" y="170" width="45" height="45" />
        <rect x="225" y="170" width="45" height="45" />
        <path d="M130 192 h45 M152 170 v45 M225 192 h45 M247 170 v45" />
        <rect x="180" y="200" width="40" height="50" />
        <circle cx="211" cy="225" r="2" />
        <path d="M40 250 H360" />
        <path d="M300 70 v-22 h18 v40" />
        <path d="M70 250 v-30 h-18 v30" opacity="0.5" />
        <path d="M340 250 c0-26 16-26 16 0" opacity="0.6" />
        <path d="M348 224 v-14" opacity="0.6" />
      </g>
    </svg>
  )
}

export function LoftIllo({ className }: IlloProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M50 250 H350" />
        <path d="M70 250 V90 H330 V250" />
        <path d="M70 90 L200 50 L330 90" />
        <path d="M110 250 V140 H180 V250" />
        <path d="M110 140 h70 M110 180 h70 M110 220 h70 M145 140 v110" opacity="0.6" />
        <path d="M220 130 h90 v70 h-90 z" />
        <path d="M220 165 h90 M265 130 v70" opacity="0.6" />
        <path d="M220 225 h60" />
        <circle cx="290" cy="235" r="8" opacity="0.6" />
      </g>
    </svg>
  )
}

export function GartenhausIllo({ className }: IlloProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M40 250 H360" />
        <path d="M110 250 V150 L200 100 L290 150 V250" />
        <path d="M95 160 L200 100 L305 160" />
        <rect x="175" y="195" width="50" height="55" />
        <path d="M200 195 v55" opacity="0.6" />
        <circle cx="192" cy="222" r="1.6" />
        <path d="M150 175 h30 v25 h-30 z" opacity="0.7" />
        <path d="M60 250 c0-40 30-40 30 0" opacity="0.5" />
        <path d="M75 218 v-18" opacity="0.5" />
        <path d="M320 250 c0-32 24-32 24 0" opacity="0.5" />
        <path d="M332 224 v-14" opacity="0.5" />
      </g>
    </svg>
  )
}

export function FloorplanIllo({ className }: IlloProps) {
  return (
    <svg viewBox="0 0 400 300" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        <rect x="60" y="50" width="280" height="200" />
        <path d="M200 50 V150 M60 150 H200 M200 110 H340 M250 150 V250" />
        <path d="M60 95 a12 12 0 0 0 12 12" opacity="0.55" />
        <path d="M132 150 a12 12 0 0 1 12 -12" opacity="0.55" />
        <path d="M250 195 a12 12 0 0 0 12 12" opacity="0.55" />
        <path d="M110 250 v10 M150 250 v10" opacity="0.5" />
        <circle cx="290" cy="70" r="10" opacity="0.5" />
        <rect x="95" y="185" width="45" height="28" opacity="0.5" />
      </g>
    </svg>
  )
}

export function MonogramHG({ className }: IlloProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="1" y="1" width="46" height="46" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M14 15 V33 M14 24 H24 M24 15 V33"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M28 33 V15 h6 a5 5 0 0 1 0 10 h-6 M34 25 a5 5 0 0 1 0 8 h-6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
