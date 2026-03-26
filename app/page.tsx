'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import ChoiceSection from '@/components/ChoiceSection'
import MajorClients from '@/components/MajorClients'
import HouseGallery from '@/components/HouseGallery'
import Testimonials from '@/components/Testimonials'
import OurProjectsSection from '@/components/OurProjectsSection'
import ReachUsSection from '@/components/ReachUsSection'
import Footer from '@/components/Footer'
import MobileHero from '@/components/MobileHero'
import MobileHouseGallery from '@/components/MobileHouseGallery'
import MobileChoiceSection from '@/components/MobileChoiceSection'
import MobileMajorClients from '@/components/MobileMajorClients'
import MobileTestimonials from '@/components/MobileTestimonials'
import MobileReachUsSection from '@/components/MobileReachUsSection'
import PageLoadAnimation from '@/components/PageLoadAnimation'

const Hero = dynamic(() => import('@/components/HeroLenisGsap'), { ssr: false })

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const update = () => {
      if (typeof window === 'undefined') return
      setIsDesktop(window.innerWidth >= 1024) // Tailwind "lg" breakpoint
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <main className="min-h-screen">
      <PageLoadAnimation>
        {isDesktop ? (
          <>
            <Hero />
            <HouseGallery />
            <ChoiceSection />
            <OurProjectsSection />
            <MajorClients />
            <Testimonials />
            <ReachUsSection />
          </>
        ) : (
          <>
            <MobileHero />
            <MobileHouseGallery />
            <MobileChoiceSection />
            <OurProjectsSection />
            <MobileMajorClients />
            <MobileTestimonials />
            <MobileReachUsSection />
          </>
        )}
        <Footer />
      </PageLoadAnimation>
    </main>
  )
}
