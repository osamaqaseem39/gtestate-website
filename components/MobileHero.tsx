 'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Diamond } from 'lucide-react'

export default function MobileHero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-landscape.jpeg"
          alt="Luxurious interior design"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[90vh] flex-col px-4 pt-28 pb-10">
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-light uppercase tracking-[0.18em] text-white/80">
            Renovation & Fit Out • Lahore, Pakistan
          </p>

          <h1 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
            <span className="block">Building</span>
            <span className="mt-1 block text-gradient-teal">Visions</span>
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-white/80">
            Turnkey renovation and fit‑out solutions that blend global design standards with
            local insight, delivering spaces that feel tailored, timeless, and truly livable.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="btn-hero-group">
              <Link href="/contact" className="btn-hero">
                <Diamond className="h-4 w-4" />
                <span>Contact Us</span>
              </Link>
            </span>

            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm hover:border-teal hover:text-teal transition-colors"
            >
              <span>View Properties</span>
            </Link>
          </div>
        </div>

        {/* Bottom helper */}
        <button
          type="button"
          onClick={() => {
            if (typeof window === 'undefined') return
            const y = window.innerHeight * 0.9
            window.scrollTo({ top: y, behavior: 'smooth' })
          }}
          className="mt-auto flex flex-col items-center gap-1 self-center rounded bg-black/10 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}

