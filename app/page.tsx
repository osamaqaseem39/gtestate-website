 'use client'

import dynamic from 'next/dynamic'
import ChoiceSection from '@/components/ChoiceSection'
import MajorClients from '@/components/MajorClients'
import Testimonials from '@/components/Testimonials'
import ReachUsSection from '@/components/ReachUsSection'
import Footer from '@/components/Footer'

export default function Home() {
  const Hero = dynamic(() => import('@/components/Hero'), { ssr: false })

  return (
    <main className="min-h-screen">
      <Hero />
      {/* Spacer so page can scroll; content below scrolls under the fixed hero (z-30 < hero z-40) */}
      <div className="h-[200vh]" aria-hidden />
      {/* Content scrolls under the hero (parallel scroll); hero z-40 stays on top until it translates away */}
      <div className="relative space-y-24" style={{ zIndex: 30, position: 'relative' }}>
        <ChoiceSection />
        <MajorClients />
        <Testimonials />
        <ReachUsSection />
        <Footer />
      </div>
    </main>
  )
}

