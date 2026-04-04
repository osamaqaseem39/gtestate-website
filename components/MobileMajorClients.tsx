'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { LUXURY_TAGLINES } from '@/lib/site-content'

const MARQUEE_ROW = [...LUXURY_TAGLINES, ...LUXURY_TAGLINES]
const MARQUEE_ITEMS = [...MARQUEE_ROW, ...MARQUEE_ROW]

export default function MobileMajorClients() {
  return (
    <section
      className="bg-black text-white px-4 py-12 space-y-8 sm:px-6 md:py-16"
      aria-label="Major projects"
    >
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#fabb22]">
          Major Projects
        </p>
        <h2 className="mt-2 text-2xl font-bold uppercase tracking-tight">Jannat Homes</h2>
        <p className="mt-3 text-sm text-white/80 leading-relaxed">
          A thoughtfully planned residential community offering modern living, prime location benefits, and a
          peaceful environment. Designed for comfort and long-term value, making it an ideal choice for both
          living and secure investment.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center gap-2 border border-[#fabb22] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#fabb22]/10 transition-colors"
        >
          Contact Us / Book Now
        </Link>
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-white/5">
        <Image
          src="/house-1.jpeg"
          alt="Jannat Homes"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
      </div>

      <div className="relative mt-2 overflow-hidden">
        <motion.div
          className="flex gap-4 whitespace-nowrap"
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{
            ease: 'linear',
            duration: 40,
            repeat: Infinity,
          }}
        >
          {MARQUEE_ITEMS.map((line, index) => (
            <span
              key={`${line}-${index}`}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/70 flex-shrink-0"
            >
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[#fabb22]" />
              <span>{line}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
