'use client'

import Image from 'next/image'
import { MapPin, Building2, Navigation as NavIcon } from 'lucide-react'

const ADDRESS = 'GT Estates Office, Lahore, Pakistan'
const OFFICE = 'Real Estate & Investment Advisory'
const MAP_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'GT Estates Lahore Pakistan',
)}` as string

export default function MobileReachUsSection() {
  return (
    <section
      className="bg-black text-white px-4 py-12 sm:px-6"
      aria-label="Reach us"
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-bold uppercase tracking-tight">
          Visit our office
        </h2>
        <p className="text-sm text-white/80">
          Find us in Lahore, Pakistan. Save the details or open the location in Google Maps.
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="relative aspect-[16/10] w-full bg-gray-800">
          <Image
            src="/house-2.jpeg"
            alt="Al Otaiba Building"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        </div>
        <div className="space-y-4 px-4 py-5">
          <div className="flex items-start gap-3 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 text-neon-green" />
            <p>{ADDRESS}</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/85">
            <Building2 className="h-4 w-4 text-neon-green" />
            <span>{OFFICE}</span>
          </div>
          <a
            href={MAP_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neon-green px-4 py-2 text-sm font-medium text-white hover:bg-neon-green/10 transition-colors"
          >
            <NavIcon className="h-4 w-4 text-neon-green" />
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}

