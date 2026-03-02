'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const CHOICE_CARDS = [
  {
    id: '1/3',
    label: 'PROJECTS EXECUTED',
    value: '741+ SUCCESSFUL PROJECTS',
  },
  {
    id: '2/3',
    label: 'YEARS OF EXPERIENCE',
    value: '28+ YEARS',
  },
  {
    id: '3/3',
    label: 'ENGINEERING',
    value: '73+ PROFESSIONAL ENGINEERS',
  },
]

export default function ChoiceSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section
      ref={ref}
      className="relative bg-black text-white overflow-hidden"
      style={{ position: 'relative', zIndex: 50 }}
      aria-label="Make your choice highlights"
    >
      {/* Background: housegallery at 0.1 opacity, then image + gradient */}
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/housegallery.webp)', opacity: 0.1 }} aria-hidden />
      <div className="absolute inset-0 z-0">
        <Image
          src="/house-2.jpeg"
          alt="Warm interior background"
          fill
          priority={false}
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/88 to-black/95" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-24 md:py-32 lg:py-40">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight uppercase"
            style={{ fontFamily: 'var(--font-spartan)' }}
          >
            MAKE YOUR CHOICE
          </h2>
        </motion.div>

        {/* Cards - full width grid */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {CHOICE_CARDS.map((card, index) => (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={
                  inView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 40, scale: 0.96 }
                }
                transition={{
                  duration: 0.7,
                  delay: 0.25 + index * 0.1,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className="relative bg-black/85 backdrop-blur-md border border-white/8 px-8 py-10 md:px-10 md:py-12 flex flex-col justify-between shadow-[0_32px_80px_rgba(0,0,0,0.9)]"
              >
                <div className="mb-8">
                  <p className="text-sm md:text-base font-medium text-white/60 tracking-[0.25em] uppercase mb-4">
                    {card.id}
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-cyan-400 tracking-[0.35em] uppercase mb-3">
                    {card.label}
                  </p>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-semibold uppercase leading-tight">
                    {card.value}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-16 md:mt-20 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-16 h-16 md:w-20 md:h-20"
          >
            <div className="absolute inset-0 border-2 border-cyan-400 rotate-45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-cyan-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] -rotate-45">
                SCROLL
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

