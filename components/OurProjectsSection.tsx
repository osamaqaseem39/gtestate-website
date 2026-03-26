'use client'

export default function OurProjectsSection() {
  return (
    <section className="relative bg-black text-white overflow-hidden py-20 md:py-28">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 uppercase tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-spartan)' }}
          >
            OUR PROJECTS
          </h2>
          <h3
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-neon-green mb-6 uppercase tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-spartan)' }}
          >
            CURATED INVESTMENTS IN PRIME LOCATIONS
          </h3>
          <p className="text-white/80 text-sm md:text-base leading-relaxed mx-auto max-w-3xl">
            Discover premium residential and commercial plot opportunities carefully selected for location, value,
            and growth, offering secure investments designed to deliver long-term returns and unmatched lifestyle
            potential.
          </p>
        </div>
      </div>
    </section>
  )
}

