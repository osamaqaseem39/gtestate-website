'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import ReachUsSection from '@/components/ReachUsSection'
import TechFeatures from '@/components/TechFeatures'
import FeaturedProperties from '@/components/FeaturedProperties'
import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'

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
      {isDesktop ? (
        <PageHero
          label="Our Services"
          title="What We "
          titleAccent="Do"
          description="We provide cutting-edge real estate solutions powered by technology, making property transactions seamless and accessible."
        />
      ) : (
        <MobilePageHero
          label="Our services"
          title="What we"
          titleAccent="do"
          description="From renovation to full real‑estate support, we handle planning, execution, and finishing with one coordinated team."
        />
      )}

      <section className="relative bg-black text-white">
        <TechFeatures />
      </section>

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

