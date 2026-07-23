import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CubeMark } from './Logo'

export function Preloader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(() => !sessionStorage.getItem('pb-intro'))

  useEffect(() => {
    if (!show) {
      onDone()
      return
    }
    const t = setTimeout(() => {
      sessionStorage.setItem('pb-intro', '1')
      setShow(false)
      onDone()
    }, 2000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-night"
        >
          <CubeMark
            animated
            delay={0.15}
            stagger={0.22}
            duration={0.9}
            strokeWidth={1.2}
            className="h-20 w-20 text-gold"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-[10px] font-medium uppercase tracking-[0.5em] text-stone"
          >
            Plan B Studios
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
