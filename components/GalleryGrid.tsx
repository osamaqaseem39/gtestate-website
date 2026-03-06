'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useEffect } from 'react'

type ImageShape = 'portrait' | 'landscape' | 'square'
type ImageDisplay = 'grid' | 'full-original'

export type GalleryImage = {
  src: string
  alt: string
  /** How the image should be framed in the grid. */
  shape: ImageShape
  /**
   * How the image should be displayed:
   * - 'grid' = cropped into a fixed aspect ratio tile
   * - 'full-original' = span full width and respect original aspect ratio as much as possible
   */
  display: ImageDisplay
}

// Example static data – replace with backend data mapping later
const GALLERY_IMAGES: GalleryImage[] = [
  { src: '/house-1.jpeg', alt: 'Residential interior', shape: 'landscape', display: 'grid' },
  { src: '/house-2.jpeg', alt: 'Modern living room', shape: 'portrait', display: 'grid' },
  { src: '/house-3.jpeg', alt: 'Luxury villa exterior', shape: 'square', display: 'grid' },
  { src: '/house-4.jpeg', alt: 'Contemporary house facade', shape: 'landscape', display: 'full-original' },
]

export default function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const openSlide = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const closeSlide = useCallback(() => {
    setActiveIndex(null)
  }, [])

  const showNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? 0 : (prev + 1) % GALLERY_IMAGES.length,
    )
  }, [])

  const showPrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null
        ? 0
        : (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
    )
  }, [])

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSlide()
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'ArrowLeft') showPrev()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, closeSlide, showNext, showPrev])

  return (
    <section
      className="bg-black text-white px-0 py-16 sm:px-0"
      aria-label="Property gallery"
    >
      <div className="space-y-10">
        <div className="space-y-2 text-center px-4 sm:px-6 lg:px-8 xl:px-12">
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
            Gallery
          </p>
          <h2
            className="text-2xl md:text-3xl font-semibold uppercase tracking-tight text-white"
            style={{ fontFamily: 'var(--font-spartan)' }}
          >
            Explore our properties
          </h2>
          <p className="text-sm md:text-base text-white/75 max-w-2xl mx-auto">
            A curated selection of interiors and exteriors from GT Estates projects in Lahore and beyond.
          </p>
        </div>

        {/* Mixed layout: portrait, landscape, square and full-width/original images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {GALLERY_IMAGES.concat(GALLERY_IMAGES).map((img, index) => {
            const isFullOriginal = img.display === 'full-original'
            const colSpan = isFullOriginal ? 'md:col-span-2' : 'md:col-span-1'

            // For cropped grid tiles, pick an aspect ratio based on shape.
            // For full-original, let height adjust with content (no forced aspect).
            const aspectClass = isFullOriginal
              ? ''
              : img.shape === 'portrait'
              ? 'aspect-[3/4]'
              : img.shape === 'square'
              ? 'aspect-square'
              : 'aspect-[16/9]'

            return (
              <motion.button
                key={`${img.src}-${index}`}
                type="button"
                className={`relative w-full overflow-hidden bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${colSpan} ${aspectClass}`}
                onClick={() => openSlide(index % GALLERY_IMAGES.length)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
              >
                {isFullOriginal ? (
                  <div className="relative w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={1600}
                      height={900}
                      className="w-full h-auto object-contain md:object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                      sizes="100vw"
                    />
                  </div>
                ) : (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Lightbox / slide viewer */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSlide}
          >
            <motion.div
              className="relative w-full max-w-5xl px-4 sm:px-6"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-black">
                <Image
                  src={GALLERY_IMAGES[activeIndex].src}
                  alt={GALLERY_IMAGES[activeIndex].alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-white/80">
                <button
                  type="button"
                  onClick={closeSlide}
                  className="px-3 py-1 border border-white/40 hover:border-cyan-400 rounded-full transition-colors"
                >
                  Close
                </button>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={showPrev}
                    className="px-3 py-1 border border-white/40 hover:border-cyan-400 rounded-full transition-colors"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="px-3 py-1 border border-white/40 hover:border-cyan-400 rounded-full transition-colors"
                  >
                    Next
                  </button>
                  <span className="text-xs text-white/60">
                    {activeIndex + 1} / {GALLERY_IMAGES.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}



