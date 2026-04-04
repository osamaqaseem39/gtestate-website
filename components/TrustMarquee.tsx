'use client'

import { motion } from 'framer-motion'
import { TRUST_TAGLINES } from '@/lib/site-content'

type TrustMarqueeProps = {
  inView?: boolean
}

export default function TrustMarquee({ inView = true }: TrustMarqueeProps) {
  const items = [...TRUST_TAGLINES, ...TRUST_TAGLINES]

  return (
    <div className="w-full border-t border-white/10 bg-black/80 overflow-hidden py-4 md:py-5">
      <motion.div
        className="flex items-center gap-10 md:gap-14 lg:gap-20 whitespace-nowrap"
        initial={{ x: 0 }}
        animate={inView ? { x: '-50%' } : { x: 0 }}
        transition={{
          ease: 'linear',
          duration: 40,
          repeat: inView ? Infinity : 0,
        }}
      >
        {items.map((line, index) => (
          <span
            key={`${line}-${index}`}
            className="text-white/75 text-xs md:text-sm font-medium uppercase tracking-[0.25em] shrink-0"
            style={{ fontFamily: 'var(--font-spartan)' }}
          >
            {line}
            <span className="mx-6 md:mx-10 text-[#fabb22]" aria-hidden>
              ◆
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
