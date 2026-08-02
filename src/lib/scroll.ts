import type Lenis from 'lenis'

// Die aktive Lenis-Instanz (nur auf der Startseite gesetzt), damit andere
// Komponenten darüber scrollen können statt über window.scrollTo.
export const lenisRef: { current: Lenis | null } = { current: null }

// Scroll-Positionen überleben in sessionStorage: Ein Reload der Unterseite
// (oder ein vom mobilen Browser verworfener Tab) löscht sonst die Merkliste,
// und "Zurück" landet an einer falschen Position.
const SS_KEY = 'pb-scroll'

function load(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(SS_KEY) || '{}')
  } catch {
    return {}
  }
}

const store: Record<string, number> = load()

let writeTimer = 0
function persist() {
  if (writeTimer) return
  writeTimer = window.setTimeout(() => {
    writeTimer = 0
    try {
      sessionStorage.setItem(SS_KEY, JSON.stringify(store))
    } catch {
      /* Speicher voll oder blockiert — dann eben nur im Arbeitsspeicher */
    }
  }, 120)
}

export function saveScroll(key: string, pathname: string, y: number) {
  store[key] = y
  // Fallback pro Pfad: greift, wenn der History-Key nach einem Reload
  // nicht mehr in der Merkliste steht.
  store['last:' + pathname] = y
  persist()
}

export function readScroll(key: string, pathname: string): number | null {
  if (typeof store[key] === 'number') return store[key]
  const last = store['last:' + pathname]
  return typeof last === 'number' ? last : null
}
