'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useEffect, useMemo } from 'react'
import { API_BASE_URL, fetchGalleryItems, resolveMediaUrl, type ApiGalleryItem } from '@/lib/api-public'

type ImageShape = 'portrait' | 'landscape' | 'square'
type ImageDisplay = 'grid' | 'full-original'

export type GalleryImage = {
  src: string
  alt: string
  shape: ImageShape
  display: ImageDisplay
}

const FALLBACK_GALLERY: GalleryImage[] = [
  { src: '/house-1.jpeg', alt: 'Residential interior', shape: 'landscape', display: 'grid' },
  { src: '/house-2.jpeg', alt: 'Modern living room', shape: 'portrait', display: 'grid' },
  { src: '/house-3.jpeg', alt: 'Luxury villa exterior', shape: 'square', display: 'grid' },
  { src: '/house-4.jpeg', alt: 'Contemporary house facade', shape: 'landscape', display: 'full-original' },
]

function normalizeShape(shape: string | undefined): ImageShape {
  if (shape === 'portrait' || shape === 'landscape' || shape === 'square') return shape
  return 'landscape'
}

function mapApiItem(item: ApiGalleryItem): GalleryImage {
  const src = resolveMediaUrl(item.imageUrl) || item.imageUrl
  return {
    src,
    alt: item.alt || 'GT Estates project',
    shape: normalizeShape(item.shape),
    display: item.display === 'full-original' ? 'full-original' : 'grid',
  }
}

function lightboxAspectClass(shape: ImageShape): string {
  if (shape === 'portrait') return 'aspect-[3/4] max-h-[85vh] w-full max-w-3xl mx-auto'
  if (shape === 'square') return 'aspect-square max-h-[85vh] w-full max-w-3xl mx-auto'
  return 'aspect-[16/9] w-full'
}

export default function GalleryGrid() {
  const [baseImages, setBaseImages] = useState<GalleryImage[]>(FALLBACK_GALLERY)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!API_BASE_URL) return
    let cancelled = false
    void (async () => {
      try {
        const api = await fetchGalleryItems()
        if (cancelled || !api.length) return
        setBaseImages(api.map(mapApiItem))
      } catch {
        /* keep fallback */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const displayImages = useMemo(() => {
    if (!baseImages.length) return FALLBACK_GALLERY.concat(FALLBACK_GALLERY)
    return baseImages.length < 4 ? [...baseImages, ...baseImages] : baseImages
  }, [baseImages])

  const n = baseImages.length || FALLBACK_GALLERY.length

  const openSlide = useCallback(
    (displayIndex: number) => {
      setActiveIndex(displayIndex % n)
    },
    [n],
  )

  const closeSlide = useCallback(() => {
    setActiveIndex(null)
  }, [])

  const showNext = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % n))
  }, [n])

  const showPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + n) % n))
  }, [n])

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

  const current = activeIndex !== null ? baseImages[activeIndex] ?? FALLBACK_GALLERY[activeIndex % FALLBACK_GALLERY.length] : null

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {displayImages.map((img, index) => {
            const isFullOriginal = img.display === 'full-original'
            const colSpan = isFullOriginal ? 'md:col-span-2' : 'md:col-span-1'

            const aspectClass = isFullOriginal
              ? ''
              : img.shape === 'portrait'
                ? 'aspect-[3/4]'
                : img.shape === 'square'
                  ? 'aspect-square'
                  : 'aspect-[16/9]'

            const placementClass =
              isFullOriginal || img.shape === 'landscape'
                ? ''
                : 'md:max-w-md md:mx-auto md:justify-self-center md:w-full'

            const remote = img.src.startsWith('http')

            return (
              <motion.button
                key={`${img.src}-${index}`}
                type="button"
                className={`relative w-full overflow-hidden bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${colSpan} ${aspectClass} ${placementClass}`}
                onClick={() => openSlide(index)}
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
                      unoptimized={remote}
                    />
                  </div>
                ) : (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px"
                    unoptimized={remote}
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
              </motion.button>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && current && (
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
              <div
                className={`relative overflow-hidden bg-black ${lightboxAspectClass(current.shape)}`}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  unoptimized={current.src.startsWith('http')}
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
                    {activeIndex + 1} / {n}
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
