import { Metadata } from 'next'
import Footer from '@/components/Footer'
import FeaturedProperties from '@/components/FeaturedProperties'
import QuickSearch from '@/components/QuickSearch'

export const metadata: Metadata = {
  title: 'Properties - GT Estate',
  description: 'Browse our extensive collection of premium properties with AI-powered search and virtual tours.',
}

export default function Properties() {
  return (
    <main className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-20" />
        
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-neon-blue/10 border border-neon-blue/30 rounded-full text-neon-blue text-sm font-medium mb-4">
                Property Search
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Find Your <span className="text-gradient">Dream Home</span>
            </h1>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Discover premium properties with our AI-powered search, virtual reality tours, 
              and smart matching technology.
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

