import { Metadata } from 'next'
import Footer from '@/components/Footer'
import TechFeatures from '@/components/TechFeatures'
import FeaturedProperties from '@/components/FeaturedProperties'

export const metadata: Metadata = {
  title: 'What We Do - GT Estate',
  description: 'Discover our comprehensive real estate services including AI-powered matching, virtual tours, and smart home integration.',
}

export default function WhatWeDo() {
  return (
    <main className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-20" />
        
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-neon-blue/10 border border-neon-blue/30 rounded-full text-neon-blue text-sm font-medium mb-4">
                Our Services
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              What We <span className="text-gradient">Do</span>
            </h1>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              We provide cutting-edge real estate solutions powered by technology, 
              making property transactions seamless and accessible.
            </p>
          </div>
        </div>
      </section>

      <TechFeatures />
      <FeaturedProperties />
      <Footer />
    </main>
  )
}
