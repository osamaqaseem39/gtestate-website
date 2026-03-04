'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import ReachUsSection from '@/components/ReachUsSection'
import PageHero from '@/components/PageHero'
import HouseGallery from '@/components/HouseGallery'
import MobilePageHero from '@/components/MobilePageHero'
import MobileHouseGallery from '@/components/MobileHouseGallery'

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
        <div className="w-full">
          {isDesktop ? <HouseGallery /> : <MobileHouseGallery />}
        </div>
      </section>

      <ReachUsSection />
      <Footer />
    </main>
  )
}

