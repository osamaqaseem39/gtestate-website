'use client'

import { motion, useTransform, useMotionValue } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'

const GALLERY_IMAGES = [
  { src: '/house-1.jpeg', alt: 'House 1' },
  { src: '/house-2.jpeg', alt: 'House 2' },
  { src: '/house-3.jpeg', alt: 'House 3' },
  { src: '/house-4.jpeg', alt: 'House 4' },
]

export default function HouseGallery() {
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  const [galleryRef, galleryInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  // Progress 0→1 based only on this section's position in the viewport (not whole page).
  // 0 = section top at viewport center; 1 = section bottom at viewport center.
  const scrollYProgress = useMotionValue(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el || !mounted) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = typeof window !== 'undefined' ? window.innerHeight : 0
      const centerY = vh / 2
      // progress 0 when section top reaches viewport center, 1 when section bottom reaches it
      const raw = (centerY - rect.top) / rect.height
      const clamped = Math.min(1, Math.max(0, raw))
      scrollYProgress.set(clamped)
    }

    update()
    const raf = requestAnimationFrame
    let id: number
    const tick = () => {
      update()
      id = raf(tick)
    }
    id = raf(tick)
    return () => cancelAnimationFrame(id)
  }, [mounted, scrollYProgress])

  // Home 1 image scroll-driven offsets (smoothed with springs)
  // As scrollYProgress goes from 0 → 1, move it noticeably but keep it in view
  const Home1Y = useTransform(scrollYProgress, [0.4, 0.7], ['0vh', '250vh'])
  const Home1X = useTransform(scrollYProgress, [0.4, 0.7], ['0px', '1500px'])


  // Back card (House 2) also moves down with scroll + slight left drift (smoothed)
  const Home2Y = useTransform(scrollYProgress, [0.4, 0.7], ['0vh', '230vh'])
  const Home2X = useTransform(scrollYProgress, [0.4, 0.7], ['0px', '-1600px'])

  // Main gallery side images: strong downward motion + sideways drift on scroll (smoothed by springs)
  const leftImageY = useTransform(scrollYProgress, [0.4, 0.7], ['0vh', '100vh'])
  const leftImageX = useTransform(scrollYProgress, [0.4, 0.7], ['0px', '-700px'])
  const rightImageY = useTransform(scrollYProgress, [0.4, 0.7], ['0vh', '100vh'])
  const rightImageX = useTransform(scrollYProgress, [0.4, 0.7], ['0px', '600px'])

  // Opacity transforms used in JSX styles
  const gridOpacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 0.06])
  const whyTextOpacity = useTransform(scrollYProgress, [0.51, 0.55], [0, 1])
  const sideOverlayOpacity = useTransform(scrollYProgress, [0.45, 0.55], [1, 0])
  const centerTextOpacity = useTransform(scrollYProgress, [0.45, 0.55], [1, 0])

  // Always render the section so sectionRef is in the DOM from first paint.
  // Otherwise useScroll({ target: sectionRef }) falls back to document scroll (whole page).
  if (!mounted) {
    return (
      <section
        ref={sectionRef}
        className="relative bg-black overflow-hidden h-[200vh]"
        style={{ position: 'relative' }}
        aria-label="Gallery and Why Choose GT Estate"
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/housegallery.webp)',
            opacity: 1,
          }}
          aria-hidden
        />
        <div className="min-h-[80vh] relative z-10" />
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden h-[200vh]"
      style={{ position: 'relative' }}
      aria-label="Gallery and Why Choose GT Estate"
    >
      {/* Background image behind section content */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/housegallery.webp)',
          opacity: 0.1,
        }}
        aria-hidden
      />
      {/* Static gallery block – original layout with text */}
      <div ref={galleryRef} className="relative z-10 py-24 bg-black pb-32">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.94 }}
          animate={galleryInView ? { opacity: 1, y: 0, scale: 1.02 } : { opacity: 0, y: 60, scale: 0.94 }}
          transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12"
        >
          <div className="relative min-h-[80vh] flex items-center justify-center">
            <div className="relative flex items-center justify-center gap-6 md:gap-10 lg:gap-12 w-full max-w-5xl">
              {/* Left tilted image (moves down and left on scroll) */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: -10, scale: 0.96 }}
                animate={
                  galleryInView
                    ? { opacity: 1, rotate: -6, scale: 1 }
                    : { opacity: 0, y: 40, rotate: -10, scale: 0.96 }
                }
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
                className="relative w-[220px] md:w-[260px] lg:w-[300px] flex-shrink-0 overflow-hidden shadow-2xl -rotate-6"
                style={{ aspectRatio: '3/4', y: leftImageY, x: leftImageX }}
              >
                <Image
                  src={GALLERY_IMAGES[2].src}
                  alt={GALLERY_IMAGES[2].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 260px, (max-width: 1024px) 320px, 380px"
                  quality={90}
                />
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    opacity: sideOverlayOpacity,
                    background:
                      'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.95) 100%)',
                  }}
                />
              </motion.div>

              {/* Center stack with CONTEMPORARY / TRUSTWORTHY text */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={galleryInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
                className="relative w-[300px] md:w-[360px] lg:w-[420px] flex-shrink-0"
                style={{ aspectRatio: '3/4' }}
              >
                {/* Back bottom text */}
                <motion.div
                  className="absolute inset-0 flex items-end justify-center pb-[10%] pointer-events-none z-0"
                  style={{ fontFamily: 'var(--font-spartan)', opacity: centerTextOpacity }}
                >
                  <span className="text-white/60 font-bold uppercase tracking-tight text-5xl md:text-6xl lg:text-7xl whitespace-nowrap">
                    TRUSTWORTHY
                  </span>
                </motion.div>

                {/* Back top text */}
                <motion.div
                  className="absolute inset-0 flex items-start justify-center pt-[10%] pointer-events-none z-0"
                  style={{ fontFamily: 'var(--font-spartan)', opacity: centerTextOpacity }}
                >
                  <span className="text-white/60 font-bold uppercase tracking-tight text-5xl md:text-6xl lg:text-7xl whitespace-nowrap">
                    PROFESSIONALISM
                  </span>
                </motion.div>

                {/* Stacked cards */}
                <div className="relative w-full h-full">
                  {/* House 2 (back card) – moves down and left with scroll */}
                  <motion.div
                    initial={{ opacity: 0, y: 40, rotate: -4 }}
                    animate={
                      galleryInView
                        ? { opacity: 0.7, rotate: 2 }
                        : { opacity: 0, y: 40, rotate: -4 }
                    }
                    transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
                    className="absolute top-0 left-0 w-full h-full overflow-hidden shadow-2xl"
                    style={{ aspectRatio: '3/4', zIndex: 7, y: Home2Y, x: Home2X }}
                  >
                    <Image
                      src={GALLERY_IMAGES[1].src}
                      alt={GALLERY_IMAGES[1].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 320px, (max-width: 1024px) 400px, 480px"
                      quality={90}
                    />
                  </motion.div>

                  {/* House 1 (front card) – moves down and right on scroll */}
                  <motion.div
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={
                      galleryInView
                        ? { opacity: 1, rotate: 2 }
                        : { opacity: 0, rotate: 0 }
                    }
                    transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
                    className="absolute top-0 left-0 w-full h-full overflow-hidden shadow-2xl"
                    style={{ aspectRatio: '3/4', zIndex: 8, y: Home1Y, x: Home1X }}
                  >
                    <Image
                      src={GALLERY_IMAGES[0].src}
                      alt={GALLERY_IMAGES[0].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 320px, (max-width: 1024px) 400px, 480px"
                      quality={90}
                    />
                  </motion.div>
                </div>

                {/* Center text CONTEMPORARY */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                  style={{
                    opacity: centerTextOpacity,
                    fontFamily: 'var(--font-spartan)',
                    textShadow: '0 6px 18px rgba(0, 0, 0, 0.9)',
                  }}
                >
                  <span className="text-white font-extrabold uppercase tracking-tight text-5xl md:text-6xl lg:text-7xl xl:text-8xl whitespace-nowrap">
                    CONTEMPORARY
                  </span>
                </motion.div>
              </motion.div>

              {/* Right tilted image (moves down and right on scroll) */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: 10, scale: 0.96 }}
                animate={
                  galleryInView
                    ? { opacity: 1, rotate: 6, scale: 1 }
                    : { opacity: 0, y: 40, rotate: 10, scale: 0.96 }
                }
                transition={{ duration: 0.8, delay: 0.14, ease: [0.22, 0.61, 0.36, 1] }}
                className="relative w-[220px] md:w-[260px] lg:w-[300px] flex-shrink-0 overflow-hidden shadow-2xl rotate-6"
                style={{ aspectRatio: '3/4', y: rightImageY, x: rightImageX }}
              >
                <Image
                  src={GALLERY_IMAGES[3].src}
                  alt={GALLERY_IMAGES[3].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 260px, (max-width: 1024px) 320px, 380px"
                  quality={90}
                />
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    opacity: sideOverlayOpacity,
                    background:
                      'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.95) 100%)',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sticky container: Why Choose text with subtle grid background */}
      <div className="sticky top-0 h-[80vh] w-full overflow-hidden pt-8 pb-4">
        {/* Subtle grid background for Why Choose phase */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            opacity: gridOpacity,
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Why Choose text only — centered over the sticky area */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4">
          <motion.div
            style={{
              opacity: whyTextOpacity,
            }}
            className="text-center max-w-4xl"
          >
            <h2
              className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 uppercase tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-spartan)' }}
            >
              WHY CHOOSE
            </h2>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-cyan-400 mb-6 md:mb-8 uppercase tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-spartan)' }}
            >
              GT ESTATE?
            </h2>
            <p className="text-white text-base md:text-lg leading-relaxed text-center mt-4">
              To achieve flawless real estate solutions from planning to execution, you need a skilled partner in property investment.
              Our experienced team delivers customized solutions, prioritizing client satisfaction and handling projects of all sizes with precision.
            </p>
          </motion.div>
        </div>

      </div>

      {/* Spacer removed so section height is controlled by min-h and content */}
      <div className="h-0" aria-hidden />
    </section>
  )
}