import { Metadata } from 'next'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About Us - GT Estate',
  description: 'Learn about our mission to revolutionize real estate with cutting-edge technology and exceptional service.',
}

export default function About() {
  return (
    <main className="min-h-screen">
      <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent" />
        
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="min-h-screen flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <div>
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-neon-blue/10 border border-neon-blue/30 rounded-full text-neon-blue text-sm font-medium mb-4">
                    About GT Estate
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Revolutionizing Real Estate with <span className="text-gradient">Technology</span>
                </h1>

                <p className="text-white/70 text-lg mb-8 leading-relaxed">
                  Founded in 2024, GT Estate is at the forefront of the digital transformation 
                  in the real estate industry. We combine artificial intelligence, virtual reality, 
                  and blockchain technology to create an unparalleled property buying and selling experience.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-2">Our Mission</h3>
                    <p className="text-white/60">
                      To make property transactions seamless, transparent, and accessible through cutting-edge technology.
                    </p>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-2">Our Vision</h3>
                    <p className="text-white/60">
                      To become the global leader in next-generation real estate solutions.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold rounded-full hover:scale-105 transition-transform">
                    Learn More
                  </button>
                  <button className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors">
                    Contact Us
                  </button>
                </div>
              </div>

              {/* Visual */}
              <div className="relative">
                <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl">🏠</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

