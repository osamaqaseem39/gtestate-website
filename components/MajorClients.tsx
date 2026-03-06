'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'

const CLIENTS = [
  'FARAH Experiences',
  'Yas Asset Management',
  'Department of Culture and Tourism',
  'AL FORSAN International Sports Resort',
  'MIRAL',
  'Healthpoint',
  'ABU DHABI AIRPORTS',
]

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
      aria-label="Major clients and projects"
    >
      {/* Main content: text left + image right, full width */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[70vh] lg:min-h-[85vh]">
        {/* Left: copy and controls */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 bg-cyan-400 rotate-45" aria-hidden />
              <span
                className="text-sm font-semibold text-cyan-400 tracking-[0.35em] uppercase"
                style={{ fontFamily: 'var(--font-spartan)' }}
              >
                Major clients
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight uppercase mb-6"
              style={{ fontFamily: 'var(--font-spartan)' }}
            >
              AL FORSAN
            </h2>
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8">
              International Sports Resort in Khalifa City, the Marriott Hotel Al Forsan Abu Dhabi offers
              unparalleled luxury and thoughtful amenities.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-3 border border-cyan-400 text-white px-6 py-3.5 font-medium text-sm uppercase tracking-wider hover:bg-cyan-400/10 transition-colors"
              style={{ fontFamily: 'var(--font-spartan)' }}
            >
              <span className="w-2 h-2 bg-cyan-400 rotate-45 flex-shrink-0" />
              Learn more
            </Link>
            {/* Navigation arrows */}
            <div className="flex items-center gap-3 mt-10">
              <span className="btn-hero-group">
                <button
                  type="button"
                  aria-label="Previous client"
                  className="btn-hero-outline w-12 h-12 p-0 justify-center"
                >
                  <span className="text-lg" aria-hidden>←</span>
                </button>
              </span>
              <span className="btn-hero-group">
                <button
                  type="button"
                  aria-label="Next client"
                  className="btn-hero-outline w-12 h-12 p-0 justify-center"
                >
                  <span className="text-lg" aria-hidden>→</span>
                </button>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right: image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative w-full h-[50vh] lg:h-auto min-h-[320px]"
        >
          <Image
            src="/house-1.jpeg"
            alt="Al Forsan – luxury reception and amenities"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </div>

      {/* Full-width client marquee strip */}
      <div className="w-full border-t border-white/10 bg-black/40">
        <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-6 md:py-8 overflow-hidden">
          <motion.div
            className="flex items-center gap-12 md:gap-16 lg:gap-20 whitespace-nowrap"
            initial={{ x: 0 }}
            animate={inView ? { x: '-50%' } : { x: 0 }}
            transition={{
              ease: 'linear',
              duration: 30,
              repeat: inView ? Infinity : 0,
            }}
          >
            {[...CLIENTS, ...CLIENTS].map((name, index) => (
              <span
                key={`${name}-${index}`}
                className="text-white/70 text-xs md:text-sm font-medium uppercase tracking-[0.35em] whitespace-nowrap"
                style={{ fontFamily: 'var(--font-spartan)' }}
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
