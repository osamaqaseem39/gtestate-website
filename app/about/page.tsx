import { Metadata } from 'next'
import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import ReachUsSection from '@/components/ReachUsSection'
import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'

export const metadata: Metadata = {
  title: 'About Us - GT Estate',
  description:
    'Learn about our mission to revolutionize real estate with cutting-edge technology and exceptional service.',
}

export default function About() {
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
          label="About GT Estate"
          title="Revolutionizing Real Estate with "
          titleAccent="Technology"
          description="Founded in 2024, GT Estate is at the forefront of the digital transformation in the real estate industry. We combine artificial intelligence, virtual reality, and blockchain technology to create an unparalleled property buying and selling experience."
        />
      ) : (
        <MobilePageHero
          label="About GT Estate"
          title="Revolutionizing real estate with"
          titleAccent="technology"
          description="Founded in 2024, we blend interior, exterior, and real‑estate expertise to deliver complete, end‑to‑end property solutions."
        />
      )}

      {isDesktop ? (
        <section className="relative bg-black text-white">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 md:py-24">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="p-6 bg-white/5 border border-white/10">
                      <h3
                        className="text-xl font-semibold text-white mb-2 uppercase tracking-tight"
                        style={{ fontFamily: 'var(--font-spartan)' }}
                      >
                        Our Mission
                      </h3>
                      <p className="text-white/60 text-sm md:text-base">
                        To make property transactions seamless, transparent, and accessible
                        through cutting-edge technology.
                      </p>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10">
                      <h3
                        className="text-xl font-semibold text-white mb-2 uppercase tracking-tight"
                        style={{ fontFamily: 'var(--font-spartan)' }}
                      >
                        Our Vision
                      </h3>
                      <p className="text-white/60 text-sm md:text-base">
                        To become the global leader in next-generation real estate solutions.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <span className="btn-hero-group">
                      <a href="/contact" className="btn-hero">
                        Learn More
                      </a>
                    </span>
                    <span className="btn-hero-group">
                      <a href="/contact" className="btn-hero-outline">
                        Contact Us
                      </a>
                    </span>
                  </div>
                </div>
                <div className="relative aspect-[4/3] max-h-[420px] bg-white/5 border border-white/10 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl text-cyan-400/30">
                    ◆
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-black px-4 py-10 text-white sm:px-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold uppercase tracking-tight">
                Our mission
              </h3>
              <p className="text-sm text-white/80">
                To deliver seamless, transparent renovation and real‑estate services that
                respect both timelines and budgets.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold uppercase tracking-tight">
                Our vision
              </h3>
              <p className="text-sm text-white/80">
                To be the trusted partner for clients who expect design quality, technical
                precision, and long‑term value in every project.
              </p>
            </div>
          </div>
        </section>
      )}

      <ReachUsSection />
      <Footer />
    </main>
  )
}
