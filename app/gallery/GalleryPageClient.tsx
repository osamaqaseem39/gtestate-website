'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import ReachUsSection from '@/components/ReachUsSection'
import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'
import GalleryGrid from '@/components/GalleryGrid'
import PageLoadAnimation from '@/components/PageLoadAnimation'

export default function GalleryPageClient() {
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
            label="Gallery"
            title="Visualize Your"
            titleAccent="Next Property"
            description="Browse our curated collection of properties, interiors, and landmark projects that define GT Estate."
          />
        ) : (
          <MobilePageHero
            label="Gallery"
            title="Visualize your"
            titleAccent="next property"
            description="Scroll through a selection of interiors and exteriors from recent projects."
          />
        )}

        <section className="relative bg-black text-white">
          <GalleryGrid />
        </section>

        <ReachUsSection />
        <Footer />
      </PageLoadAnimation>
    </main>
  )
}

