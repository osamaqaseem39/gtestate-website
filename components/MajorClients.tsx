'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { LUXURY_TAGLINES } from '@/lib/site-content'

const MARQUEE_ITEMS = [...LUXURY_TAGLINES, ...LUXURY_TAGLINES]

export default function MajorClients() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      ref={ref}
      className="relative w-full bg-zinc-950 text-white overflow-hidden"
      style={{ position: 'relative', zIndex: 50 }}
      aria-label="Major projects"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[70vh] lg:min-h-[80vh]">
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 bg-[#fabb22] rotate-45" aria-hidden />
              <span
                className="text-sm font-semibold text-[#fabb22] tracking-[0.35em] uppercase"
                style={{ fontFamily: 'var(--font-spartan)' }}
              >
                Major Projects
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight uppercase mb-4"
              style={{ fontFamily: 'var(--font-spartan)' }}
            >
              Jannat Homes
            </h2>
            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6">
              A thoughtfully planned residential community offering modern living, prime location benefits, and a
              peaceful environment. Designed for comfort and long-term value, making it an ideal choice for both
              living and secure investment.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-[#fabb22] text-white px-6 py-3.5 font-medium text-sm uppercase tracking-wider hover:bg-[#fabb22]/10 transition-colors"
              style={{ fontFamily: 'var(--font-spartan)' }}
            >
              <span className="w-2 h-2 bg-[#fabb22] rotate-45 flex-shrink-0" />
              Contact Us / Book Now
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative w-full h-[50vh] lg:h-auto min-h-[320px]"
        >
          <Image
            src="/house-1.jpeg"
            alt="Jannat Homes – residential community"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </div>

      <div className="w-full border-t border-white/10 bg-black/40">
        <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-6 md:py-8 overflow-hidden">
          <motion.div
            className="flex items-center gap-12 md:gap-16 lg:gap-20 whitespace-nowrap"
            initial={{ x: 0 }}
            animate={inView ? { x: '-50%' } : { x: 0 }}
            transition={{
              ease: 'linear',
              duration: 45,
              repeat: inView ? Infinity : 0,
            }}
          >
            {MARQUEE_ITEMS.map((line, index) => (
              <span
                key={`${line}-${index}`}
                className="text-white/70 text-xs md:text-sm font-medium uppercase tracking-[0.2em] whitespace-nowrap shrink-0"
                style={{ fontFamily: 'var(--font-spartan)' }}
              >
                {line}
                <span className="mx-8 text-[#fabb22]" aria-hidden>
                  ◆
                </span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
