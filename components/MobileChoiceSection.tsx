'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const CHOICE_ITEMS = [
  {
    label: 'Projects executed',
    value: '741+',
    detail: 'Turnkey renovations and fit‑out projects delivered.',
  },
  {
    label: 'Years of experience',
    value: '28+',
    detail: 'Hands-on industry experience across multiple sectors.',
  },
  {
    label: 'Professional engineers',
    value: '73+',
    detail: 'Specialists guiding every step from plan to handover.',
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
          Make your choice
        </h2>
        <p className="mt-2 text-sm text-white/80">
          A proven track record backed by experience, engineering strength, and on-time delivery.
        </p>
      </motion.div>

      <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
        {CHOICE_ITEMS.map((item, index) => (
          <motion.article
            key={item.label}
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
                {item.label}
              </p>
              <p className="text-xl font-semibold text-teal">{item.value}</p>
            </div>
            <p className="mt-2 text-xs text-white/75">{item.detail}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

