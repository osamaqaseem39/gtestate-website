'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Star, 
  Heart,
  Eye,
  ArrowRight
} from 'lucide-react'
// Grid layout version (no Swiper)

export default function FeaturedProperties() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const properties = [
    {
      id: 1,
      title: 'Cyber Tower Penthouse',
      location: 'Downtown Tech District',
      price: '$2,500,000',
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      featured: true,
      smart: true,
    },
    {
      id: 2,
      title: 'Neon Heights Villa',
      location: 'Silicon Valley',
      price: '$3,200,000',
      bedrooms: 5,
      bathrooms: 4,
      area: 3200,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      featured: true,
      smart: true,
    },
    {
      id: 3,
      title: 'Quantum Living Space',
      location: 'Future City',
      price: '$1,800,000',
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1600566753190-17f63ba47d4d?w=800&h=600&fit=crop',
      featured: true,
      smart: true,
    },
    {
      id: 4,
      title: 'Digital Oasis',
      location: 'Tech Park',
      price: '$2,100,000',
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      featured: true,
      smart: true,
    },
    {
      id: 5,
      title: 'Skyline Residences',
      location: 'City Financial District',
      price: '$1,450,000',
      bedrooms: 3,
      bathrooms: 3,
      area: 1900,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800&h=600&fit=crop',
      featured: true,
      smart: true,
    },
    {
      id: 6,
      title: 'Lakeview Manor',
      location: 'Emerald Lake Community',
      price: '$2,750,000',
      bedrooms: 5,
      bathrooms: 4,
      area: 3500,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
      featured: true,
      smart: true,
    },
    {
      id: 7,
      title: 'Garden Courtyard Home',
      location: 'Uptown Residences',
      price: '$980,000',
      bedrooms: 3,
      bathrooms: 3,
      area: 2100,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=600&fit=crop',
      featured: true,
      smart: true,
    },
    {
      id: 8,
      title: 'Marina Front Duplex',
      location: 'Harbor Bay',
      price: '$1,650,000',
      bedrooms: 4,
      bathrooms: 4,
      area: 2600,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      featured: true,
      smart: true,
    },
    {
      id: 9,
      title: 'Hilltop Signature Villa',
      location: 'Grand Hills Estate',
      price: '$3,950,000',
      bedrooms: 6,
      bathrooms: 6,
      area: 5200,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      featured: true,
      smart: true,
    },
    {
      id: 10,
      title: 'Urban Loft Collection',
      location: 'Creative Arts District',
      price: '$860,000',
      bedrooms: 2,
      bathrooms: 2,
      area: 1450,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&h=600&fit=crop',
      featured: true,
      smart: true,
    },
    {
      id: 11,
      title: 'Palm Courtyard Estate',
      location: 'Coastal Boulevard',
      price: '$2,150,000',
      bedrooms: 4,
      bathrooms: 4,
      area: 3000,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1617099404995-0a8048ec9c64?w=800&h=600&fit=crop',
      featured: true,
      smart: true,
    },
    {
      id: 12,
      title: 'Signature Penthouse Suite',
      location: 'City Center Residences',
      price: '$4,250,000',
      bedrooms: 5,
      bathrooms: 5,
      area: 4100,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1512914890250-353c97c9e7e2?w=800&h=600&fit=crop',
      featured: true,
      smart: true,
    },
  ]

  return (
    <section
      ref={ref}
      className="relative bg-black text-white overflow-hidden"
      aria-label="Featured properties"
    >
      {/* Subtle grid / texture background to match new theme */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          opacity: 0.06,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-14 md:mb-18"
        >
          <p className="text-[11px] md:text-xs font-semibold text-neon-green tracking-[0.35em] uppercase mb-3">
            Curated listings
          </p>
          <p className="mt-1 text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Discover our most exclusive properties, combining distinctive architecture with refined interior design.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group h-full"
              >
                <article className="relative h-full flex flex-col bg-black/85 backdrop-blur-md border border-white/10 rounded-none md:rounded-[18px] shadow-[0_32px_80px_rgba(0,0,0,0.9)] overflow-hidden">
                    {/* Image */}
                    <div className="relative h-56 md:h-64 overflow-hidden">
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {property.featured && (
                          <span className="px-3 py-1 bg-white/90 text-black text-[11px] font-semibold tracking-[0.18em] uppercase">
                            Featured
                          </span>
                        )}
                        {property.smart && (
                          <span className="px-3 py-1 bg-neon-green text-black text-[11px] font-semibold tracking-[0.18em] uppercase">
                            Smart Home
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button
                          type="button"
                          className="p-2 rounded-full bg-black/60 hover:bg-white/15 transition-colors duration-300"
                          aria-label="Save property"
                        >
                          <Heart className="h-4 w-4 text-white" />
                        </button>
                        <button
                          type="button"
                          className="p-2 rounded-full bg-black/60 hover:bg-white/15 transition-colors duration-300"
                          aria-label="Quick view"
                        >
                          <Eye className="h-4 w-4 text-white" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                        <span className="text-xl md:text-2xl font-semibold text-white">
                          {property.price}
                        </span>
                        <div className="hidden sm:flex items-center gap-2 text-[11px] md:text-xs font-medium uppercase tracking-[0.18em] text-white/70">
                          <span className="h-px w-6 bg-white/40" />
                          <span>View highlight</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-5 md:px-6 pt-5 pb-6 md:pb-7 flex-1 flex flex-col">
                      <h3 className="text-lg md:text-xl font-semibold uppercase tracking-tight mb-1.5 md:mb-2 group-hover:text-neon-green transition-colors duration-300">
                        {property.title}
                      </h3>
                      
                      <div className="flex items-center text-white/60 mb-3 md:mb-4 text-xs md:text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-neon-green" />
                        <span>{property.location}</span>
                      </div>

                      {/* Features */}
                      <div className="flex items-center justify-between mb-3 md:mb-4 text-xs md:text-sm text-white/70">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <Bed className="h-4 w-4" />
                            <span>{property.bedrooms} bd</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Bath className="h-4 w-4" />
                            <span>{property.bathrooms} ba</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Square className="h-4 w-4" />
                            <span>{property.area} sqft</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 md:gap-1.5">
                          <Star className="h-3.5 w-3.5 md:h-4 md:w-4 text-yellow-400" />
                          <span className="text-xs md:text-sm text-white">{property.rating}</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-auto pt-2">
                        <motion.span
                          className="btn-hero-group w-full block"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link href="/projects" className="btn-hero w-full">
                            <span>View details</span>
                            <ArrowRight className="h-4 w-4 text-black" />
                          </Link>
                        </motion.span>
                      </div>
                    </div>
                  </article>
                </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-8 md:mt-10"
        >
          <motion.span
            className="btn-hero-group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/projects" className="btn-hero">
              View all projects
            </Link>
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}