import { useLocation } from 'react-router-dom'
import { motion } from 'motion/react'

// Cinematischer Seitenübergang: Bei jedem Routenwechsel deckt eine Fläche die
// Seite kurz ab und zieht dann mit einer goldenen Kante nach oben weg — die neue
// Seite wird darunter enthüllt.
export function PageCurtain() {
  const { pathname } = useLocation()

  return (
    <motion.div
      key={pathname}
      aria-hidden
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.06 }}
      className="pointer-events-none fixed inset-0 z-[92] bg-night"
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-gold" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gold/12 to-transparent" />
    </motion.div>
  )
}
