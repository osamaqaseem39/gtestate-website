'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { MapPin, Building2, Navigation } from 'lucide-react'
import TrustMarquee from '@/components/TrustMarquee'
import { MAP_EMBED_QUERY, MAP_PLACE_OPEN_URL } from '@/lib/site-content'

const ADDRESS = 'GT Commercial Building #C43, 3rd Floor, Near Tehzeeb Bakers, Lake City, Lahore'
const OFFICE = 'GT Estates Office'

const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(MAP_EMBED_QUERY)}&output=embed`

export default function ReachUsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  })

  return (
    <section
      ref={ref}
      className="relative text-white overflow-hidden"
      style={{ position: 'relative', zIndex: 50 }}
      aria-label="Reach us – location and map"
    >
      <div className="absolute inset-0 -z-20">
        <iframe
          title="GT Properties office on Google Maps"
          src={mapEmbedSrc}
          width="100%"
          height="100%"
          className="w-full h-full border-0 grayscale"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="absolute inset-0 bg-black/70 -z-10" />
      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[480px] lg:min-h-[520px]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
              className="lg:col-span-5 xl:col-span-4 relative z-20 flex flex-col"
            >
              <div className="bg-white text-black rounded-2xl shadow-xl overflow-hidden flex flex-col h-full max-w-md lg:max-w-none mx-auto lg:mx-0 w-full">
                <div className="relative w-full aspect-[16/10] bg-gray-200 shrink-0">
                  <Image
                    src="/house-2.jpeg"
                    alt="GT Estates office"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 420px"
                    priority={false}
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Visit Us
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-black mb-4">
                    GT COMMERCIAL BUILDING #C43
                  </h2>
                  <div className="flex items-start gap-3 text-gray-700 mb-4">
                    <MapPin className="w-5 h-5 text-[#fabb22] shrink-0 mt-0.5" aria-hidden />
                    <span className="text-sm md:text-base">{ADDRESS}</span>
                  </div>
                  <div className="border-t border-[#fabb22]/30 pt-4 mb-4">
                    <div className="flex items-center gap-3 text-gray-700 mb-3">
                      <Building2 className="w-5 h-5 text-[#fabb22] shrink-0" aria-hidden />
                      <span className="font-medium">{OFFICE}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Open the full map for directions to our GT Properties location.
                    </p>
                  </div>
                  <a
                    href={MAP_PLACE_OPEN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#fabb22] text-black font-medium hover:bg-[#fabb22]/10 transition-colors duration-200"
                  >
                    <Navigation className="w-4 h-4 text-[#fabb22]" aria-hidden />
                    Take me there
                  </a>
                </div>
              </div>
            </motion.div>

            <div className="hidden lg:block lg:col-span-7 xl:col-span-8" />
          </div>
        </div>
      </div>

      <TrustMarquee inView={inView} />
    </section>
  )
}
