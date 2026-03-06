'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import ReachUsSection from '@/components/ReachUsSection'
import FeaturedProperties from '@/components/FeaturedProperties'
import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'
import PageLoadAnimation from '@/components/PageLoadAnimation'

export default function ProjectsPageClient() {
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
            label="Our Portfolio"
            title="Our "
            titleAccent="Projects"
            description="Explore our curated selection of premium properties and real estate developments."
          />
        ) : (
          <MobilePageHero
            label="Our portfolio"
            title="Our"
            titleAccent="projects"
            description="See a snapshot of the residential, commercial, and hospitality work we deliver."
          />
        )}

        <section className="relative bg-black text-white">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
            <FeaturedProperties />
          </div>
        </section>

        <ReachUsSection />
        <Footer />
      </PageLoadAnimation>
    </main>
  )
}

