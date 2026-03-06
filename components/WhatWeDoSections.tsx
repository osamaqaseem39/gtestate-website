'use client'

import Link from 'next/link'

export default function WhatWeDoSections() {
  return (
    <section className="relative bg-black text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Mission / Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white/5 border border-white/10 space-y-3">
              <h2
                className="text-xl md:text-2xl font-semibold uppercase tracking-tight"
                style={{ fontFamily: 'var(--font-spartan)' }}
              >
                Our mission
              </h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                Our mission is to share honest, transparent facts and promote only those projects that are
                authentic, verified, and built for long-term profitability.
              </p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 space-y-3">
              <h2
                className="text-xl md:text-2xl font-semibold uppercase tracking-tight"
                style={{ fontFamily: 'var(--font-spartan)' }}
              >
                Our vision
              </h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                GT Estates envisions a market where every investor buys with clarity, not confusion. We deliver
                real, on-ground facts about the locations our clients want to invest in, and match them with the
                best opportunities within their budget. Our focus is simple: smart choices today that create
                lifelong profitability tomorrow.
              </p>
            </div>
          </div>

          {/* Qualities / Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 bg-white/5 border border-white/10 space-y-3">
              <h2
                className="text-xl md:text-2xl font-semibold uppercase tracking-tight"
                style={{ fontFamily: 'var(--font-spartan)' }}
              >
                Our qualities
              </h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                At GT Estates, our qualities are built around trust and clarity. We focus on verification before
                recommendation, honest guidance without hype, and a client-first approach that respects your budget
                and goals. From shortlisting and site visits to booking, documentation, and finance advisory, we
                manage the process end-to-end so you can invest with confidence.
              </p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 space-y-3">
              <h2
                className="text-xl md:text-2xl font-semibold uppercase tracking-tight"
                style={{ fontFamily: 'var(--font-spartan)' }}
              >
                Our projects
              </h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                Our projects include Etihad Town Lahore and New Metro City, two well-known developments offering
                strong opportunities in both commercial and residential segments. Through GT Estates, we help you
                explore the right options within these projects with clear guidance, verified details, and complete
                support from consultation to booking.
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="p-6 bg-white/5 border border-white/10 space-y-4">
            <h2
              className="text-xl md:text-2xl font-semibold uppercase tracking-tight"
              style={{ fontFamily: 'var(--font-spartan)' }}
            >
              Services
            </h2>
            <p className="text-white/75 text-sm md:text-base">
              Discover a complete, guided journey from first inquiry to handover:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Discover',
                'Verify & Shortlist',
                'Site Visit',
                'Deal & Documentation',
                'Handover & Support',
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs md:text-sm text-white/85"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Quote + Connect */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="border border-white/15 bg-white/5 px-5 py-6 text-sm md:text-base text-white/90 italic">
              <p className="leading-relaxed">
                “Hard to verify. Easy with GT because we check everything before you commit.”
              </p>
            </div>
            <div className="lg:col-span-2 space-y-4">
              <h2
                className="text-xl md:text-2xl font-semibold uppercase tracking-tight"
                style={{ fontFamily: 'var(--font-spartan)' }}
              >
                Connect with us
              </h2>
              <p className="text-white/75 text-sm md:text-base leading-relaxed">
                Ready to take the next step? Contact us today to learn more about our offerings or to schedule a
                site visit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <span className="btn-hero-group">
                  <Link href="/contact" className="btn-hero">
                    Schedule a visit
                  </Link>
                </span>
                <span className="btn-hero-group">
                  <Link href="/contact" className="btn-hero-outline">
                    Talk to our team
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

