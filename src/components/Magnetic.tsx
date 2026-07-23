import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export function Magnetic({
  children,
  strength = 0.22,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.6 })

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className ?? ''}`}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const rect = ref.current!.getBoundingClientRect()
        x.set((e.clientX - rect.left - rect.width / 2) * strength)
        y.set((e.clientY - rect.top - rect.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
