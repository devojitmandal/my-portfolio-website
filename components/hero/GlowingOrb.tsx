'use client'

import { motion } from 'framer-motion'

export function GlowingOrb() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute"
        style={{
          top: '10%',
          right: '8%',
          width: '560px',
          height: '560px',
        }}
        animate={{
          x: [0, 25, -15, 0],
          y: [0, -18, 22, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle at 40% 40%, oklch(0.55 0.22 220 / 0.45) 0%, oklch(0.45 0.20 250 / 0.20) 50%, transparent 75%)',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>
      <motion.div
        className="absolute"
        style={{
          bottom: '15%',
          left: '5%',
          width: '320px',
          height: '320px',
        }}
        animate={{
          x: [0, -20, 10, 0],
          y: [0, 20, -10, 0],
          scale: [1, 0.92, 1.06, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle at 60% 60%, oklch(0.50 0.20 195 / 0.30) 0%, oklch(0.40 0.18 230 / 0.12) 55%, transparent 80%)',
            filter: 'blur(50px)',
          }}
        />
      </motion.div>
      <motion.div
        className="absolute"
        style={{
          top: '5%',
          left: '20%',
          width: '180px',
          height: '180px',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, oklch(0.65 0.18 220 / 0.25) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </motion.div>
    </div>
  )
}
