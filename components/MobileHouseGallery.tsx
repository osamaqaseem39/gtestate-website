 'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { API_BASE_URL, fetchGalleryItems, resolveMediaUrl, type ApiGalleryItem } from '@/lib/api-public'

const FALLBACK_GALLERY_IMAGES = [
  { src: '/house-1.jpeg', alt: 'Residential interior' },
  { src: '/house-2.jpeg', alt: 'Modern living room' },
  { src: '/house-3.jpeg', alt: 'Luxury villa exterior' },
  { src: '/house-4.jpeg', alt: 'Contemporary house facade' },
]

function mapApiItem(item: ApiGalleryItem) {
  return {
    src: resolveMediaUrl(item.imageUrl) || item.imageUrl,
    alt: item.alt || 'GT Estates project',
  }
}

export default function MobileHouseGallery() {
  const [images, setImages] = useState(FALLBACK_GALLERY_IMAGES)

  useEffect(() => {
    if (!API_BASE_URL) return
    let cancelled = false
    void (async () => {
      try {
        const api = await fetchGalleryItems()
        if (cancelled || !api.length) return
        setImages(api.map(mapApiItem))
      } catch {
        /* keep fallback */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const displayImages = useMemo(() => {
    if (!images.length) return FALLBACK_GALLERY_IMAGES
    return images.length < 4 ? [...images, ...images].slice(0, 4) : images.slice(0, 4)
  }, [images])

  return (
    <section
      className="bg-black text-white px-4 py-12 space-y-6 sm:px-6 md:py-16"
      aria-label="Featured homes"
    >
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
          Featured homes
        </p>
        <h2 className="mt-2 text-2xl font-bold uppercase tracking-tight">
          Handpicked properties
        </h2>
        <p className="mt-3 text-sm text-white/80">
          A quick look at some of the spaces we&apos;ve transformed and delivered.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {displayImages.map((img, index) => (
          <figure
            key={`${img.src}-${index}`}
            className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white/5"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="50vw"
              unoptimized={img.src.startsWith('http')}
            />
          </figure>
        ))}
      </div>
    </section>
  )
}

