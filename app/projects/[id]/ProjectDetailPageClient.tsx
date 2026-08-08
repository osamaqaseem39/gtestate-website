'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, MapPin, Ruler, Building2, Tag } from 'lucide-react'
import Footer from '@/components/Footer'
import ReachUsSection from '@/components/ReachUsSection'
import PageLoadAnimation from '@/components/PageLoadAnimation'
import { resolveMediaUrl, type ApiProperty } from '@/lib/api-public'

type ProjectDetailPageClientProps = {
  property: ApiProperty
}

const STATUS_LABELS: Record<string, string> = {
  available: 'Available',
  sold: 'Sold',
  reserved: 'Reserved',
  coming_soon: 'Coming soon',
}

const TYPE_LABELS: Record<string, string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  mixed: 'Mixed use',
  other: 'Other',
}

function formatPrice(price: number | null | undefined): string | null {
  if (price == null || Number.isNaN(price)) return null
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(price)
}

export default function ProjectDetailPageClient({ property }: ProjectDetailPageClientProps) {
  const primaryImage = resolveMediaUrl(property.primaryImage || '') || '/house-1.jpeg'
  const galleryImages = useMemo(() => {
    const urls = (property.gallery || [])
      .map((src) => resolveMediaUrl(src))
      .filter(Boolean)
    const unique = urls.filter((url) => url !== primaryImage)
    return unique
  }, [property.gallery, primaryImage])

  const [activeImage, setActiveImage] = useState(primaryImage)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setActiveImage(primaryImage)
  }, [primaryImage])

  useEffect(() => {
    const update = () => {
      if (typeof window === 'undefined') return
      setIsDesktop(window.innerWidth >= 1024)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const statusLabel = STATUS_LABELS[property.status || ''] || property.status || 'Available'
  const typeLabel = TYPE_LABELS[property.type || ''] || property.type || 'Residential'
  const priceLabel = formatPrice(property.price)
  const contactHref = `/contact?project=${encodeURIComponent(property.title)}`

  const thumbs = [primaryImage, ...galleryImages]

  return (
    <main className="min-h-screen bg-black text-white">
      <PageLoadAnimation stagger>
        <section className="relative overflow-hidden border-b border-white/10">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              opacity: 0.05,
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 md:pt-28 pb-10 md:pb-14">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.2em] text-white/60 hover:text-neon-green transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                All projects
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7"
              >
                <div className="relative aspect-[4/3] md:aspect-[16/11] overflow-hidden bg-white/5 border border-white/10">
                  <Image
                    src={activeImage}
                    alt={property.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                    unoptimized={activeImage.startsWith('http')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-neon-green text-black text-[11px] font-semibold tracking-[0.18em] uppercase">
                    {property.marla}
                  </span>
                </div>

                {thumbs.length > 1 && (
                  <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 gap-2 md:gap-3">
                    {thumbs.map((src) => {
                      const selected = src === activeImage
                      return (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setActiveImage(src)}
                          className={`relative aspect-square overflow-hidden border transition-colors ${
                            selected
                              ? 'border-neon-green'
                              : 'border-white/15 hover:border-white/40'
                          }`}
                          aria-label="View gallery image"
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="120px"
                            className="object-cover"
                            unoptimized={src.startsWith('http')}
                          />
                        </button>
                      )
                    })}
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-5 flex flex-col"
              >
                <p className="text-[11px] md:text-xs font-semibold text-neon-green tracking-[0.35em] uppercase mb-3">
                  Project detail
                </p>
                <h1
                  className={`font-bold uppercase tracking-tight leading-tight mb-4 ${
                    isDesktop ? 'text-3xl xl:text-4xl' : 'text-2xl'
                  }`}
                  style={{ fontFamily: 'var(--font-spartan)' }}
                >
                  {property.title}
                </h1>

                <div className="flex items-start text-white/70 mb-6 text-sm md:text-base">
                  <MapPin className="h-4 w-4 mr-2 mt-1 text-neon-green shrink-0" />
                  <span>{property.location}</span>
                </div>

                <dl className="grid grid-cols-2 gap-3 mb-8">
                  <div className="border border-white/10 bg-white/[0.03] px-4 py-3">
                    <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45 mb-1">
                      <Ruler className="h-3.5 w-3.5 text-neon-green" />
                      Size
                    </dt>
                    <dd className="text-sm md:text-base font-medium">{property.marla}</dd>
                  </div>
                  <div className="border border-white/10 bg-white/[0.03] px-4 py-3">
                    <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45 mb-1">
                      <Building2 className="h-3.5 w-3.5 text-neon-green" />
                      Type
                    </dt>
                    <dd className="text-sm md:text-base font-medium">{typeLabel}</dd>
                  </div>
                  <div className="border border-white/10 bg-white/[0.03] px-4 py-3">
                    <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45 mb-1">
                      <Tag className="h-3.5 w-3.5 text-neon-green" />
                      Status
                    </dt>
                    <dd className="text-sm md:text-base font-medium">{statusLabel}</dd>
                  </div>
                  {priceLabel && (
                    <div className="border border-white/10 bg-white/[0.03] px-4 py-3">
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-white/45 mb-1">Price</dt>
                      <dd className="text-sm md:text-base font-medium text-neon-green">{priceLabel}</dd>
                    </div>
                  )}
                </dl>

                {property.description?.trim() && (
                  <div className="mb-8">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50 mb-3">
                      Overview
                    </h2>
                    <p className="text-white/75 text-sm md:text-base leading-relaxed whitespace-pre-line">
                      {property.description.trim()}
                    </p>
                  </div>
                )}

                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <motion.span className="btn-hero-group flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href={contactHref} className="btn-hero w-full">
                      <span>Inquire now</span>
                      <ArrowRight className="h-4 w-4 text-black" />
                    </Link>
                  </motion.span>
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-white/25 text-xs md:text-sm font-medium uppercase tracking-wider text-white/80 hover:border-neon-green hover:text-neon-green transition-colors"
                  >
                    Browse projects
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <ReachUsSection />
        <Footer />
      </PageLoadAnimation>
    </main>
  )
}
