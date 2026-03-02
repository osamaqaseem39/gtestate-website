import { Metadata } from 'next'
import Footer from '@/components/Footer'
import ReachUsSection from '@/components/ReachUsSection'
import FeaturedProperties from '@/components/FeaturedProperties'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Properties - GT Estate',
  description: 'Browse our extensive collection of premium properties with AI-powered search and virtual tours.',
}

export default function Properties() {
  return (
    <main className="min-h-screen bg-black">
      <PageHero
        label="Property Search"
        title="Find Your "
        titleAccent="Dream Home"
        description="Discover premium properties with our AI-powered search, virtual reality tours, and smart matching technology."
      />

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
