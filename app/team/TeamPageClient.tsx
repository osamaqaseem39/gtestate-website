'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import ReachUsSection from '@/components/ReachUsSection'
import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'
import PageLoadAnimation from '@/components/PageLoadAnimation'
import Link from 'next/link'

const CORE_EXPERTS = [
  {
    name: 'Mohammad Nasir Ramzan',
    role: 'CEO',
    area: 'Leadership & Investment Strategy',
  },
  {
    name: 'Usman Shafique',
    role: 'Managing Director',
    area: 'Operations & Growth',
  },
  {
    name: 'Mohammad Qasim',
    role: 'Director Sales & Marketing',
    area: 'Go-to-Market & Client Acquisition',
  },
  {
    name: 'Syed Hasam',
    role: 'General Manager Sales & Marketing',
    area: 'Sales Leadership & Performance',
  },
]

const TEAM = [
  { name: 'Mohammad Nasir Ramzan', role: 'CEO' },
  { name: 'Usman Shafique', role: 'Managing Director' },
  { name: 'Mohammad Qasim', role: 'Director Sales & Marketing' },
  { name: 'Syed Hasam', role: 'General Manager Sales & Marketing' },
  { name: 'Khawaja Furqan', role: 'Head of Sales' },
  { name: 'Rameen Kiani', role: 'Marketing Head' },
  { name: 'Shoaib Gujjar', role: 'Accounts Manager' },
  { name: 'Maryam Khan', role: 'HR Manager' },
  { name: 'Hafiz Jamal', role: 'Sales Executive' },
  { name: 'Talha Gujar', role: 'Sales Executive' },
  { name: 'Aizaz Ahmad', role: 'Senior Investment Adviser' },
  { name: 'Saad Hussain', role: 'Investment Adviser' },
  { name: 'Rai Touqeer', role: 'Investment Advisor' },
  { name: 'Mehroz Mehboob', role: 'Investment Advisor' },
  { name: 'Rizwan', role: 'Investment Advisor' },
  { name: 'Yasir Hussain', role: 'Content Creator' },
  { name: 'Ali Raza', role: 'Video Editor' },
  { name: 'Utba bin Waqas', role: 'Graphic Designer' },
]

export default function TeamPageClient() {
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
          label="Our People"
          title="Meet the GT "
          titleAccent="Family"
          description="A Lahore-based team of investors, realtors, and finance advisors treating every client like family with honest guidance and full support."
        />
      ) : (
        <MobilePageHero
          label="Our people"
          title="Meet the GT"
          titleAccent="family"
          description="We’re more than a company – we’re GT Estates, a team that supports you at every step of your investment journey."
        />
        )}

        <section className="relative bg-black text-white">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 md:py-24">
            <div className="max-w-6xl mx-auto">
              {/* Meet the Team intro */}
              <div className="max-w-3xl mb-12 space-y-3">
              <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                Meet the team
              </p>
              <p className="text-white/75 text-sm md:text-base leading-relaxed">
                We’re more than a company – we’re the GT family. We treat our clients like
                family too, with genuine care, honest guidance, and full support at every
                step. Get to know the people behind GT Estates.
              </p>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                We&apos;re proud of the talented individuals who make our company great. Scroll
                to meet the dedicated team behind everything we do.
              </p>
            </div>

            {/* Our Experts */}
            <div className="mb-16 space-y-6">
              <h3
                className="text-xl md:text-2xl font-semibold uppercase tracking-tight"
                style={{ fontFamily: 'var(--font-spartan)' }}
              >
                Our experts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {CORE_EXPERTS.map((member) => (
                  <div
                    key={member.name}
                    className="p-6 bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-colors duration-200"
                  >
                    <div className="w-20 h-20 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-2xl text-cyan-400 font-bold uppercase tracking-tight mb-4">
                      {member.name.charAt(0)}
                    </div>
                    <h4
                      className="text-lg font-semibold text-white mb-1 uppercase tracking-tight"
                      style={{ fontFamily: 'var(--font-spartan)' }}
                    >
                      {member.name}
                    </h4>
                    <p className="text-cyan-400 text-sm font-medium uppercase tracking-wider mb-1">
                      {member.role}
                    </p>
                    <p className="text-white/60 text-sm">{member.area}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Team */}
            <div className="space-y-6">
              <h3
                className="text-xl md:text-2xl font-semibold uppercase tracking-tight"
                style={{ fontFamily: 'var(--font-spartan)' }}
              >
                Team intro
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEAM.map((member) => (
                  <div
                    key={member.name}
                    className="p-5 bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-colors duration-200"
                  >
                    <h4
                      className="text-base md:text-lg font-semibold text-white mb-1 uppercase tracking-tight"
                      style={{ fontFamily: 'var(--font-spartan)' }}
                    >
                      {member.name}
                    </h4>
                    <p className="text-cyan-400 text-xs md:text-sm font-medium uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-16">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-400 text-black font-semibold uppercase tracking-wider hover:bg-cyan-300 transition-colors"
              >
                Get in touch
              </Link>
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

