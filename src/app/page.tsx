import Hero from '@/components/Hero'
import QuickSearch from '@/components/QuickSearch'
import FeaturedProperties from '@/components/FeaturedProperties'
import StatsSection from '@/components/StatsSection'
import TechFeatures from '@/components/TechFeatures'
import AboutPreview from '@/components/AboutPreview'
import Testimonials from '@/components/Testimonials'
import NewsPreview from '@/components/NewsPreview'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <QuickSearch />
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

