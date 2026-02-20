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
      {/* Spacer so page can scroll; content below scrolls under the fixed hero (z-30 < hero z-40) */}
      {/* Spacer matches Hero's max scroll range: heroHeight * 1.5 = 150vh */}
      <div className="h-[150vh]" aria-hidden />
      <div className="relative z-30">
        <QuickSearch />
        <Footer />
      </div>
    </main>
  )
}

