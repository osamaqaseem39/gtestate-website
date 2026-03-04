'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import ReachUsSection from '@/components/ReachUsSection'
import FeaturedProperties from '@/components/FeaturedProperties'
import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'

export default function PropertiesPageClient() {
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
          label="Property Search"
          title="Find Your "
          titleAccent="Dream Home"
          description="Discover premium properties with our AI-powered search, virtual reality tours, and smart matching technology."
        />
      ) : (
        <MobilePageHero
          label="Property search"
          title="Find your"
          titleAccent="dream home"
          description="Browse a selection of residential and commercial options that can be tailored to your needs."
        />
      )}

      <section className="relative bg-black text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          <FeaturedProperties />
        </div>
      </section>

      <ReachUsSection />
      <Footer />
    </main>
  )
}

