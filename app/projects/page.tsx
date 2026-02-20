import { Metadata } from 'next'
import Footer from '@/components/Footer'
import FeaturedProperties from '@/components/FeaturedProperties'
import QuickSearch from '@/components/QuickSearch'

export const metadata: Metadata = {
  title: 'Projects - GT Estate',
  description: 'Browse our portfolio of premium real estate projects and developments.',
}

export default function Projects() {
  return (
    <main className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-20" />
        
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-neon-blue/10 border border-neon-blue/30 rounded-full text-neon-blue text-sm font-medium mb-4">
                Our Portfolio
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Explore our curated selection of premium properties and real estate developments.
            </p>
          </div>
        </div>
      </section>

      <QuickSearch />
      <FeaturedProperties />
      <Footer />
    </main>
  )
}
