'use client'

import Image from 'next/image'
import { MapPin, Building2, Navigation as NavIcon } from 'lucide-react'

const ADDRESS = 'Al Otaiba Building, Hamdan Street, Abu Dhabi - UAE'
const OFFICE = 'Office 404'
const MAP_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'Al Otaiba Building Hamdan Street Abu Dhabi UAE',
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
          Find us in the heart of Abu Dhabi. Save the details or open the
          location in Google Maps.
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
            <MapPin className="mt-0.5 h-4 w-4 text-teal" />
            <p>{ADDRESS}</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/85">
            <Building2 className="h-4 w-4 text-teal" />
            <span>{OFFICE}</span>
          </div>
          <a
            href={MAP_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal/10 transition-colors"
          >
            <NavIcon className="h-4 w-4 text-teal" />
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}

