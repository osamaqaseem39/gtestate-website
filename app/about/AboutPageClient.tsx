'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import ReachUsSection from '@/components/ReachUsSection'
import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'
import PageLoadAnimation from '@/components/PageLoadAnimation'

export default function AboutPageClient() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const update = () => {
      if (typeof window === 'undefined') return
      setIsDesktop(window.innerWidth >= 1024)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <main className="min-h-screen bg-black">
      <PageLoadAnimation stagger>
        {isDesktop ? (
          <PageHero
            label="About GT Estates"
            title="Real estate built on "
            titleAccent="verification"
            description="Based in Lahore, Pakistan, GT Estates is a team of investors, realtors, and finance advisors focused on verified projects, honest guidance, and long-term value for every client."
          />
        ) : (
          <MobilePageHero
            label="About GT Estates"
            title="Real estate built on"
            titleAccent="verification"
            description="A Lahore-based team of investors, realtors, and finance advisors helping you invest smarter with verified options and honest guidance."
          />
        )}

        <section className="relative bg-black text-white">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 md:py-24">
          <div className="max-w-6xl mx-auto space-y-16">
            {/* WHO WE ARE + Quote */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              <div className="lg:col-span-2 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  About GT Estates
                </div>
                <h2
                  className="text-2xl md:text-3xl font-semibold uppercase tracking-tight"
                  style={{ fontFamily: 'var(--font-spartan)' }}
                >
                  Who we are
                </h2>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  We’re a team of investors, realtors, and finance advisors built to spot what
                  others miss. Our mission is simple: bring you exclusive plots, high-footfall
                  opportunities, and the best dream homes and business locations so you invest
                  smarter and grow faster.
                </p>
              </div>
              <div className="relative overflow-hidden border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-transparent px-5 py-6 text-sm md:text-base text-white/90">
                <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen">
                  <div className="absolute -top-10 -right-10 h-32 w-32 rotate-45 border border-cyan-400/50" />
                </div>
                <p className="relative leading-relaxed italic">
                  “Hard to verify. Easy with GT because we check everything before you commit.”
                </p>
              </div>
            </div>

            {/* Mission / Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative overflow-hidden p-6 bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  01 · Mission
                </p>
                <h3
                  className="text-xl font-semibold text-white uppercase tracking-tight"
                  style={{ fontFamily: 'var(--font-spartan)' }}
                >
                  Our mission
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  Our mission is to share honest, transparent facts and promote only those
                  projects that are authentic, verified, and built for long-term profitability.
                </p>
              </div>
              <div className="relative overflow-hidden p-6 bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  02 · Vision
                </p>
                <h3
                  className="text-xl font-semibold text-white uppercase tracking-tight"
                  style={{ fontFamily: 'var(--font-spartan)' }}
                >
                  Our vision
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  GT Estates envisions a market where every investor buys with clarity, not
                  confusion. We aim to deliver real, on-ground facts about the locations our
                  clients want to invest in, and match them with the best opportunities within
                  their budget. Our focus is simple: smart choices today that create lifelong
                  profitability tomorrow through verified options, honest guidance, and
                  investments that hold value over time.
                </p>
              </div>
            </div>

            {/* Qualities / Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative overflow-hidden p-6 bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  03 · Qualities
                </p>
                <h3
                  className="text-xl font-semibold text-white uppercase tracking-tight"
                  style={{ fontFamily: 'var(--font-spartan)' }}
                >
                  Our qualities
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  At GT Estates, our qualities are built around trust and clarity. We focus on
                  verification before recommendation, honest guidance without hype, and a
                  client-first approach that respects your budget and goals. From shortlisting
                  and site visits to booking, documentation, and finance advisory, we manage
                  the process end-to-end so you can invest with confidence. Above all, we aim
                  for long-term value bringing you exclusive opportunities that make sense
                  today and stay profitable tomorrow.
                </p>
              </div>
              <div className="relative overflow-hidden p-6 bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  04 · Projects
                </p>
                <h3
                  className="text-xl font-semibold text-white uppercase tracking-tight"
                  style={{ fontFamily: 'var(--font-spartan)' }}
                >
                  Our projects
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  Our projects include Etihad Town Lahore and New Metro City, two well-known
                  developments offering strong opportunities in both commercial and
                  residential segments. Through GT Estates, we help you explore the right
                  options within these projects with clear guidance, verified details, and
                  complete support from consultation to booking.
                </p>
              </div>
            </div>

            {/* Services */}
            <div className="p-6 bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 space-y-4">
              <h3
                className="text-xl font-semibold text-white uppercase tracking-tight"
                style={{ fontFamily: 'var(--font-spartan)' }}
              >
                Services
              </h3>
              <p className="text-white/75 text-sm md:text-base">
                Discover a complete, guided journey from first inquiry to handover:
              </p>
              <ol className="space-y-4">
                {[
                  {
                    title: 'Discover',
                    desc: 'We listen to your goals, budget, and timeline to understand the kind of property or investment that actually fits you.',
                  },
                  {
                    title: 'Verify & Shortlist',
                    desc: 'Our team verifies projects, documentation, and on-ground realities so the shortlist you see is already filtered for authenticity.',
                  },
                  {
                    title: 'Site Visit',
                    desc: 'We arrange on-site visits and walk you through each option with transparent pros, cons, and future potential.',
                  },
                  {
                    title: 'Deal & Documentation',
                    desc: 'From negotiation to paperwork and finance advisory, we help structure the deal correctly and securely.',
                  },
                  {
                    title: 'Handover & Support',
                    desc: 'Even after booking, we stay connected with post-sale support and guidance as your portfolio grows.',
                  },
                ].map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400/10 text-xs font-semibold text-cyan-300 border border-cyan-400/50">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {index !== 4 && (
                        <span className="mt-1 h-full w-px bg-white/15" aria-hidden />
                      )}
                    </div>
                    <div>
                      <p className="text-sm md:text-base font-semibold uppercase tracking-[0.12em] text-white">
                        {step.title}
                      </p>
                      <p className="mt-1 text-xs md:text-sm text-white/75 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Connect with us */}
            <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <h3
                  className="text-xl font-semibold text-white uppercase tracking-tight"
                  style={{ fontFamily: 'var(--font-spartan)' }}
                >
                  Connect with us
                </h3>
                <p className="text-white/75 text-sm md:text-base leading-relaxed">
                  Ready to take the next step? Contact us today to learn more about our
                  offerings or to schedule a site visit.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <span className="btn-hero-group">
                  <a href="/contact" className="btn-hero">
                    Schedule a visit
                  </a>
                </span>
                <span className="btn-hero-group">
                  <a href="/contact" className="btn-hero-outline">
                    Talk to our team
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
        </section>

        <ReachUsSection />
        <Footer />
      </PageLoadAnimation>
    </main>
  )
}

