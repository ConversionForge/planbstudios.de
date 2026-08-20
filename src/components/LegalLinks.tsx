import { Link } from 'react-router-dom'
import { useT } from '../i18n'

/**
 * Impressum- und Datenschutz-Links zu Plan B Studios. Wird überall dort
 * eingebunden, wo der große Footer nicht passt (Demo-Seiten, 3D-Rundgang,
 * 404) — damit die Anbieterkennzeichnung nach § 5 DDG von JEDER Seite aus
 * erreichbar ist.
 */
export function LegalLinks({ className = '' }: { className?: string }) {
  const t = useT()
  return (
    <span className={className}>
      <Link to="/impressum" className="underline-offset-4 hover:underline">
        {t.common.imprint}
      </Link>
      <span aria-hidden> · </span>
      <Link to="/datenschutz" className="underline-offset-4 hover:underline">
        {t.common.privacy}
      </Link>
    </span>
  )
}
