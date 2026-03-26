'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const CHOICE_ITEMS = [
  {
    id: 'BOX 1',
    primary: 'TRUST BUILT',
    secondary: 'STRONG MARKET REPUTATION',
    detail: 'Delivering reliable guidance with complete transparency in every deal.',
  },
  {
    id: 'BOX 2',
    primary: 'SMART DECISIONS',
    secondary: 'EXPERT CONSULTANCY',
    detail: 'Helping clients choose the right opportunities with clarity and confidence.',
  },
  {
    id: 'BOX 3',
    primary: 'CLIENT FIRST',
    secondary: 'LONG-TERM RELATIONSHIPS',
    detail: 'Focused on lasting partnerships, not just one-time transactions.',
  },
]

export default function MobileChoiceSection() {
  const [ref, inView] = useInView({
    // Animate both when entering and leaving viewport
    triggerOnce: false,
    threshold: 0.2,
  })

  return (
    <section
      ref={ref}
      className="bg-black text-white px-4 py-12 space-y-6 sm:px-6 md:py-16"
      aria-label="Why choose GT Estate numbers"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <h2 className="text-2xl font-bold uppercase tracking-tight">
          <span>DEFINED BY EXCELLENCE</span>
          <br />
          <span className="text-neon-green">WHERE TRUST MEETS EXPERTISE</span>
        </h2>
        <p className="mt-2 text-sm text-white/80">
          Built to help investors make smart, confident decisions every step of the way.
        </p>
      </motion.div>

      <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
        {CHOICE_ITEMS.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={
              inView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 30, scale: 0.96 }
            }
            transition={{
              duration: 0.6,
              delay: 0.15 + index * 0.08,
              ease: [0.22, 0.61, 0.36, 1],
            }}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-4"
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                {item.id}
              </p>
              <p className="text-[11px] font-semibold text-neon-green tracking-[0.35em] uppercase">
                {item.primary}
              </p>
            </div>
            <p className="mt-3 text-xl font-semibold uppercase leading-tight">{item.secondary}</p>
            <p className="mt-2 text-xs text-white/75">{item.detail}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

