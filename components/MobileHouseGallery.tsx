 'use client'

import Image from 'next/image'

const GALLERY_IMAGES = [
  { src: '/house-1.jpeg', alt: 'Residential interior' },
  { src: '/house-2.jpeg', alt: 'Modern living room' },
  { src: '/house-3.jpeg', alt: 'Luxury villa exterior' },
  { src: '/house-4.jpeg', alt: 'Contemporary house facade' },
]

export default function MobileHouseGallery() {
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
        {GALLERY_IMAGES.map((img) => (
          <figure
            key={img.src}
            className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white/5"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="50vw"
            />
          </figure>
        ))}
      </div>
    </section>
  )
}

