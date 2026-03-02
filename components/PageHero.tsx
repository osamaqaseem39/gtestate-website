'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

type PageHeroProps = {
  label?: string
  title: string
  titleAccent?: string
  description?: string
  /** Minimal = no background image, full = same as ChoiceSection style */
  variant?: 'minimal' | 'full'
}

export default function PageHero({
  label,
  title,
  titleAccent,
  description,
  variant = 'full',
}: PageHeroProps) {
  const displayTitle = titleAccent ? (
    <>
      {title} <span className="text-cyan-400">{titleAccent}</span>
    </>
  ) : (
    title
  )

  return (
    <section
      className="relative bg-black text-white overflow-hidden"
      aria-label="Page header"
    >
      {variant === 'full' && (
        <>
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/housegallery.webp)', opacity: 0.08 }}
            aria-hidden
          />
          <div className="absolute inset-0 z-0">
            <Image
              src="/house-2.jpeg"
              alt=""
              fill
              priority={false}
              className="object-cover"
              sizes="100vw"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/92 to-black/98" />
          </div>
        </>
      )}

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-24 md:py-32 lg:py-36">
        <div className="max-w-4xl mx-auto text-center">
          {label && (
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-2 border border-cyan-400/40 text-cyan-400 text-xs md:text-sm font-medium uppercase tracking-[0.2em] mb-6"
            >
              {label}
            </motion.span>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight uppercase leading-tight"
            style={{ fontFamily: 'var(--font-spartan)' }}
          >
            {displayTitle}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/80 text-base md:text-lg mt-6 max-w-2xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}
