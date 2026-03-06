'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import ReachUsSection from '@/components/ReachUsSection'
import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'
import WhatWeDoSections from '@/components/WhatWeDoSections'
import PageLoadAnimation from '@/components/PageLoadAnimation'

export default function WhatWeDoPageClient() {
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
            label="How we help you invest"
            title="What we "
            titleAccent="do"
            description="We verify every project, shortlist the right options, and guide you from first inquiry to handover so you can invest in Lahore with confidence."
          />
        ) : (
          <MobilePageHero
            label="How we help you invest"
            title="What we"
            titleAccent="do"
            description="From verification and shortlisting to site visits, booking, and documentation, we manage the full investment journey with you."
          />
        )}

        <WhatWeDoSections />

        <ReachUsSection />
        <Footer />
      </PageLoadAnimation>
    </main>
  )
}

