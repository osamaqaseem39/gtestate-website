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
      <div className="relative z-10 flex min-h-[90vh] flex-col px-4 pt-24 pb-10 sm:px-6 md:pt-28">
        <div className="max-w-xl md:max-w-2xl">
          <p className="mb-3 text-xs font-light uppercase tracking-[0.18em] text-white/80">
              Professional Real Estate & Plot Specialists – Pakistan
          </p>

          <h1 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            <span className="block leading-tight">Creating</span>
            <span className="block leading-tight">Value</span>
            <span className="mt-2 block text-gradient-teal leading-tight">Shaping Futures</span>
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-white/80 md:text-base md:max-w-xl">
            We focus on residential and commercial plots, delivering secure investments, prime areas,
            honest guidance, and profitable growth through reliable projects.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="btn-hero-group">
              <Link href="/contact" className="btn-hero">
                <Diamond className="h-4 w-4" />
                <span>Start Investing</span>
              </Link>
            </span>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm hover:border-neon-green hover:text-neon-green transition-colors"
            >
              <span>View Opportunities</span>
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

