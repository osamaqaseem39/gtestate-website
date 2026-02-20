'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
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
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

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
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent" />

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured <span className="text-gradient">Properties</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Discover our most exclusive smart properties, designed for the future of living.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-16"
          >
            {properties.map((property, index) => (
              <SwiperSlide key={property.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="card card-hover h-full overflow-hidden">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex space-x-2">
                        {property.featured && (
                          <span className="px-3 py-1 bg-neon-blue/90 text-black text-xs font-bold rounded-full">
                            Featured
                          </span>
                        )}
                        {property.smart && (
                          <span className="px-3 py-1 bg-neon-purple/90 text-black text-xs font-bold rounded-full">
                            Smart Home
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button className="p-2 bg-black/50 rounded-full hover:bg-neon-blue/20 transition-colors duration-300">
                          <Heart className="h-4 w-4 text-white" />
                        </button>
                        <button className="p-2 bg-black/50 rounded-full hover:bg-neon-purple/20 transition-colors duration-300">
                          <Eye className="h-4 w-4 text-white" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="absolute bottom-4 left-4">
                        <span className="text-2xl font-bold text-white">
                          {property.price}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-colors duration-300">
                        {property.title}
                      </h3>
                      
                      <div className="flex items-center text-white/60 mb-4">
                        <MapPin className="h-4 w-4 mr-2 text-neon-blue" />
                        <span className="text-sm">{property.location}</span>
                      </div>

                      {/* Features */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-white/60 text-sm">
                          <div className="flex items-center">
                            <Bed className="h-4 w-4 mr-1" />
                            <span>{property.bedrooms}</span>
                          </div>
                          <div className="flex items-center">
                            <Bath className="h-4 w-4 mr-1" />
                            <span>{property.bathrooms}</span>
                          </div>
                          <div className="flex items-center">
                            <Square className="h-4 w-4 mr-1" />
                            <span>{property.area} sqft</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-white">{property.rating}</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <motion.button 
                        className="w-full btn-secondary flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>View Details</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <motion.button 
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Properties
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}