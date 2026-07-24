import { useLocation, useNavigate } from 'react-router-dom'

// Führt zurück zur exakten Stelle, von der die Beispielseite geöffnet wurde
// (mit wiederhergestellter Scroll-Position) — nicht zu einem festen Anker.
export function BackToStudio({ className }: { className?: string }) {
  const navigate = useNavigate()
  const location = useLocation()

  const back = () => {
    if (location.key !== 'default') navigate(-1)
    else navigate('/')
  }

  return (
    <button onClick={back} className={className}>
      ← Zurück zu Plan B Studios
    </button>
  )
}
