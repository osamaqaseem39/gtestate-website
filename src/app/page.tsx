import dynamic from 'next/dynamic'

import Hero from '@/components/Hero'
import StatsSection from '@/components/StatsSection'
import TechFeatures from '@/components/TechFeatures'
import AboutPreview from '@/components/AboutPreview'
import NewsPreview from '@/components/NewsPreview'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

const FeaturedProperties = dynamic(() => import('@/components/FeaturedProperties'), {
  ssr: false,
})

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProperties />
      <StatsSection />
      <TechFeatures />
      <AboutPreview />
      <Testimonials />
      <NewsPreview />
      <CTA />
      <Footer />
    </main>
  )
}

