'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Star, Quote, ArrowRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Tech Entrepreneur',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'NexusReal completely transformed how I view real estate. The AI-powered matching found me the perfect smart home in just 2 weeks. The virtual tour was so immersive, I felt like I was already living there!',
      property: 'Cyber Tower Penthouse'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Investment Banker',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'The blockchain security and smart contracts made the entire buying process transparent and secure. I could track every step of the transaction in real-time. This is the future of real estate!',
      property: 'Neon Heights Villa'
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'AI Researcher',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'As someone who works with AI daily, I was impressed by their predictive analytics. They accurately predicted market trends and helped me make the best investment decision. The smart home integration is flawless.',
      property: 'Quantum Living Space'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Software Engineer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'The 24/7 AI support was incredible. I got instant answers to all my questions, and the virtual assistant even scheduled viewings for me. The entire experience was seamless and futuristic.',
      property: 'Digital Oasis'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'Marketing Director',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'The virtual reality tours were mind-blowing! I could explore every corner of the property from my living room. The attention to detail and technology integration is unmatched in the industry.',
      property: 'Cyber Tower Penthouse'
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'Real Estate Investor',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'NexusReal\'s market analytics helped me identify the best investment opportunities. Their AI predicted property value appreciation with 95% accuracy. This is revolutionary for real estate investing.',
      property: 'Neon Heights Villa'
    }
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent" />

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our satisfied clients who have experienced the future of real estate.
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
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="card card-hover h-full p-8 relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Quote Icon */}
                    <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                      <Quote className="h-12 w-12 text-neon-blue" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-white/80 mb-6 leading-relaxed group-hover:text-white transition-colors duration-300">
                      "{testimonial.text}"
                    </p>

                    {/* Property Reference */}
                    <div className="mb-6 p-3 bg-black/30 rounded-lg border border-neon-blue/20">
                      <p className="text-neon-blue text-sm font-medium">Property: {testimonial.property}</p>
                    </div>

                    {/* Client Info */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="absolute inset-0 rounded-full bg-neon-blue/20 blur-sm group-hover:bg-neon-purple/20 transition-colors duration-300" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold group-hover:text-gradient transition-colors duration-300">
                          {testimonial.name}
                        </h4>
                        <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors duration-300">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-white/60 mb-6">
              Experience the future of real estate and become part of our growing community of satisfied clients.
            </p>
            <motion.button 
              className="btn-primary flex items-center justify-center space-x-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Your Journey</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}