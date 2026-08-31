'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, MapPin, Ruler, Building2, Tag } from 'lucide-react'
import Footer from '@/components/Footer'
import InquiryForm from '@/components/InquiryForm'
import ReachUsSection from '@/components/ReachUsSection'
import PageLoadAnimation from '@/components/PageLoadAnimation'
import {
  resolvePropertyPrimaryImage,
  normalizePropertyGalleryEntry,
  type ApiProperty,
  type ApiInventoryItem,
} from '@/lib/api-public'

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
  townhouse: 'Townhouse',
  other: 'Other',
}

const CATEGORY_LABELS: Record<string, string> = {
  residential: 'Residential plots',
  commercial: 'Commercial plots',
  townhouse: 'Townhouses',
  other: 'Other inventory',
}

function formatPrice(price: number | null | undefined): string | null {
  if (price == null || Number.isNaN(price)) return null
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(price)
}

function groupInventory(items: ApiInventoryItem[] | undefined) {
  const map = new Map<string, ApiInventoryItem[]>()
  for (const item of items || []) {
    const key = item.category || 'other'
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(item)
  }
  return map
}

export default function ProjectDetailPageClient({ property }: ProjectDetailPageClientProps) {
  const primaryImage = resolvePropertyPrimaryImage(property) || '/house-1.jpeg'
  const galleryImages = useMemo(() => {
    const entries = (property.gallery || [])
      .map(normalizePropertyGalleryEntry)
      .filter((e): e is { url: string; alt: string; title: string } => e !== null)
    return entries.filter((e) => e.url !== primaryImage)
  }, [property.gallery, primaryImage])

  const inventoryGroups = useMemo(() => groupInventory(property.inventory), [property.inventory])
  const paymentPlan = property.paymentPlan
  const showPaymentPlan = paymentPlan?.enabled && (paymentPlan.rows?.length ?? 0) > 0

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

  const thumbs = [
    { url: primaryImage, alt: property.title, title: property.title },
    ...galleryImages,
  ]
  const activeEntry = thumbs.find((t) => t.url === activeImage) ?? thumbs[0]

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
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.2em] text-white/60 hover:text-neon-green transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                All projects
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-7">
                <div className="relative aspect-[4/3] md:aspect-[16/11] overflow-hidden bg-white/5 border border-white/10">
                  <Image
                    src={activeImage}
                    alt={activeEntry.alt || property.title}
                    title={activeEntry.title || undefined}
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
                    {thumbs.map((thumb) => (
                      <button
                        key={thumb.url}
                        type="button"
                        onClick={() => setActiveImage(thumb.url)}
                        className={`relative aspect-square overflow-hidden border transition-colors ${
                          thumb.url === activeImage ? 'border-neon-green' : 'border-white/15 hover:border-white/40'
                        }`}
                      >
                        <Image
                          src={thumb.url}
                          alt={thumb.alt}
                          title={thumb.title || undefined}
                          fill
                          sizes="120px"
                          className="object-cover"
                          unoptimized={thumb.url.startsWith('http')}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-5 flex flex-col"
              >
                <p className="text-[11px] md:text-xs font-semibold text-neon-green tracking-[0.35em] uppercase mb-3">
                  Project detail
                </p>
                <h1
                  className={`font-bold uppercase tracking-tight leading-tight mb-4 ${isDesktop ? 'text-3xl xl:text-4xl' : 'text-2xl'}`}
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
                      <Ruler className="h-3.5 w-3.5 text-neon-green" /> Size
                    </dt>
                    <dd className="text-sm md:text-base font-medium">{property.marla}</dd>
                  </div>
                  <div className="border border-white/10 bg-white/[0.03] px-4 py-3">
                    <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45 mb-1">
                      <Building2 className="h-3.5 w-3.5 text-neon-green" /> Type
                    </dt>
                    <dd className="text-sm md:text-base font-medium">{typeLabel}</dd>
                  </div>
                  <div className="border border-white/10 bg-white/[0.03] px-4 py-3">
                    <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45 mb-1">
                      <Tag className="h-3.5 w-3.5 text-neon-green" /> Status
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
                    <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50 mb-3">Overview</h2>
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

        {inventoryGroups.size > 0 && (
          <section className="border-b border-white/10 py-14 md:py-20">
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-6xl mx-auto space-y-12">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight" style={{ fontFamily: 'var(--font-spartan)' }}>
                Available inventory
              </h2>
              {[...inventoryGroups.entries()].map(([category, rows]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-neon-green mb-4">
                    {CATEGORY_LABELS[category] || category}
                  </h3>
                  <div className="overflow-x-auto border border-white/10">
                    <table className="w-full min-w-[520px] text-left text-sm">
                      <thead className="bg-white/5 text-white/60 uppercase tracking-wider text-xs">
                        <tr>
                          <th className="px-4 py-3">Label</th>
                          <th className="px-4 py-3">Size</th>
                          <th className="px-4 py-3">Price</th>
                          <th className="px-4 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, i) => (
                          <tr key={row._id || i} className="border-t border-white/10">
                            <td className="px-4 py-3">{row.label || '—'}</td>
                            <td className="px-4 py-3">{row.size || '—'}</td>
                            <td className="px-4 py-3">{row.price || '—'}</td>
                            <td className="px-4 py-3 capitalize">{row.status || 'available'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {showPaymentPlan && (
          <section className="border-b border-white/10 py-14 md:py-20">
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-6" style={{ fontFamily: 'var(--font-spartan)' }}>
                {paymentPlan!.title || 'Payment plan'}
              </h2>
              <div className="overflow-x-auto border border-white/10">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead className="bg-white/5 text-white/60 uppercase tracking-wider text-xs">
                    <tr>
                      <th className="px-4 py-3">Milestone</th>
                      <th className="px-4 py-3">%</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(paymentPlan!.rows || []).map((row, i) => (
                      <tr key={i} className="border-t border-white/10">
                        <td className="px-4 py-3">{row.milestone || '—'}</td>
                        <td className="px-4 py-3">{row.percentage || '—'}</td>
                        <td className="px-4 py-3">{row.amount || '—'}</td>
                        <td className="px-4 py-3">{row.dueOn || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        <ReachUsSection />
        <InquiryForm />
        <Footer />
      </PageLoadAnimation>
    </main>
  )
}
