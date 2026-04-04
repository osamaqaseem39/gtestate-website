'use client'

import { MapPin, Building2, Navigation as NavIcon } from 'lucide-react'
import TrustMarquee from '@/components/TrustMarquee'
import { MAP_EMBED_QUERY, MAP_PLACE_OPEN_URL } from '@/lib/site-content'

const ADDRESS = 'GT Commercial Building #C43, 3rd Floor, Near Tehzeeb Bakers, Lake City, Lahore'
const OFFICE = 'Real Estate & Investment Advisory'

const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(MAP_EMBED_QUERY)}&output=embed`

export default function MobileReachUsSection() {
  return (
    <section className="bg-black text-white" aria-label="Reach us">
      <div className="px-4 py-12 sm:px-6 space-y-4">
        <h2 className="text-2xl font-bold uppercase tracking-tight">Visit our office</h2>
        <p className="text-sm text-white/80">
          Visit Us: GT Commercial Building #C43, 3rd Floor, Near Tehzeeb Bakers, Lake City, Lahore.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="relative aspect-[4/3] w-full bg-gray-800">
            <iframe
              title="GT Properties office on Google Maps"
              src={mapEmbedSrc}
              width="100%"
              height="100%"
              className="absolute inset-0 h-full w-full border-0 grayscale"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="space-y-4 px-4 py-5">
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 text-neon-green shrink-0" />
              <p>{ADDRESS}</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/85">
              <Building2 className="h-4 w-4 text-neon-green shrink-0" />
              <span>{OFFICE}</span>
            </div>
            <a
              href={MAP_PLACE_OPEN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neon-green px-4 py-2 text-sm font-medium text-white hover:bg-neon-green/10 transition-colors"
            >
              <NavIcon className="h-4 w-4 text-neon-green" />
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>

      <TrustMarquee inView />
    </section>
  )
}
