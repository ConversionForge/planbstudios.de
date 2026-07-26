import { Link } from 'react-router-dom'

/**
 * Impressum- und Datenschutz-Links zu Plan B Studios. Wird überall dort
 * eingebunden, wo der große Footer nicht passt (Demo-Seiten, 3D-Rundgang,
 * 404) — damit die Anbieterkennzeichnung nach § 5 DDG von JEDER Seite aus
 * erreichbar ist.
 */
export function LegalLinks({ className = '' }: { className?: string }) {
  return (
    <span className={className}>
      <Link to="/impressum" className="underline-offset-4 hover:underline">
        Impressum
      </Link>
      <span aria-hidden> · </span>
      <Link to="/datenschutz" className="underline-offset-4 hover:underline">
        Datenschutz
      </Link>
    </span>
  )
}
