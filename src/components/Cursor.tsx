import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [down, setDown] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 400, damping: 38, mass: 0.7 })
  const ringY = useSpring(y, { stiffness: 400, damping: 38, mass: 0.7 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    document.documentElement.classList.add('custom-cursor')

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null
      const labelled = t?.closest('[data-cursor]') as HTMLElement | null
      if (labelled) {
        setLabel(labelled.dataset.cursor || null)
        setHovering(true)
      } else {
        setLabel(null)
        setHovering(!!t?.closest('a, button'))
      }
    }
    const onLeave = () => setVisible(false)
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95]">
      <motion.div style={{ x, y }} className="absolute">
        <div
          className={`h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream transition-opacity duration-300 ${
            visible && !label ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </motion.div>
      <motion.div style={{ x: ringX, y: ringY }} className="absolute">
        {label ? (
          <div
            className={`flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-night transition-opacity duration-200 ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {label}
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
              <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ) : (
          <div
            className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out ${
              visible ? 'opacity-100' : 'opacity-0'
            } ${down ? 'scale-90' : 'scale-100'} ${
              hovering ? 'h-12 w-12 border-gold/70 bg-gold/[0.06]' : 'h-8 w-8 border-cream/25'
            }`}
          />
        )}
      </motion.div>
    </div>
  )
}
