import { Metadata } from 'next'
import Footer from '@/components/Footer'
import ReachUsSection from '@/components/ReachUsSection'
import FeaturedProperties from '@/components/FeaturedProperties'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Projects - GT Estate',
  description: 'Browse our portfolio of premium real estate projects and developments.',
}

export default function Projects() {
  return (
    <main className="min-h-screen bg-black">
      <PageHero
        label="Our Portfolio"
        title="Our "
        titleAccent="Projects"
        description="Explore our curated selection of premium properties and real estate developments."
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
