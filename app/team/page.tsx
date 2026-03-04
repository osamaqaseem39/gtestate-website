import { Metadata } from 'next'
import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import ReachUsSection from '@/components/ReachUsSection'
import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Team - GT Estate',
  description:
    'Meet the experts behind GT Estate – dedicated professionals delivering exceptional real estate services.',
}

const TEAM = [
  { name: 'Sarah Mitchell', role: 'Managing Director', area: 'Strategy & Operations' },
  { name: 'James Chen', role: 'Head of Sales', area: 'Residential & Commercial' },
  { name: 'Emma Williams', role: 'Senior Advisor', area: 'Luxury Properties' },
  { name: 'Omar Hassan', role: 'Project Manager', area: 'Developments' },
]

export default function Team() {
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
      {isDesktop ? (
        <PageHero
          label="Our People"
          title="Meet Our "
          titleAccent="Team"
          description="Experienced professionals committed to delivering outstanding real estate services and client satisfaction."
        />
      ) : (
        <MobilePageHero
          label="Our people"
          title="Meet our"
          titleAccent="team"
          description="Specialists in renovation, fit‑out, and real estate working together on every brief."
        />
      )}

      <section className="relative bg-black text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  className="p-6 bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-colors duration-200"
                >
                  <div className="w-20 h-20 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-2xl text-cyan-400 font-bold uppercase tracking-tight mb-4">
                    {member.name.charAt(0)}
                  </div>
                  <h3
                    className="text-lg font-semibold text-white mb-1 uppercase tracking-tight"
                    style={{ fontFamily: 'var(--font-spartan)' }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-cyan-400 text-sm font-medium uppercase tracking-wider mb-1">
                    {member.role}
                  </p>
                  <p className="text-white/60 text-sm">{member.area}</p>
                </div>
              ))}
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
    </main>
  )
}
