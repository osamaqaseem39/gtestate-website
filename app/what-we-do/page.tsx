import { Metadata } from 'next'
import Footer from '@/components/Footer'
import ReachUsSection from '@/components/ReachUsSection'
import TechFeatures from '@/components/TechFeatures'
import FeaturedProperties from '@/components/FeaturedProperties'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'What We Do - GT Estate',
  description: 'Discover our comprehensive real estate services including AI-powered matching, virtual tours, and smart home integration.',
}

export default function WhatWeDo() {
  return (
    <main className="min-h-screen bg-black">
      <PageHero
        label="Our Services"
        title="What We "
        titleAccent="Do"
        description="We provide cutting-edge real estate solutions powered by technology, making property transactions seamless and accessible."
      />

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
