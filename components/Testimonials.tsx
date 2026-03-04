'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Star } from 'lucide-react'
import Image from 'next/image'
import 'swiper/css'

const testimonials = [
  {
    id: 1,
    name: 'Yazan Kharouf',
    role: 'Engineer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'We recently hired the team for some engineering and maintenance work. The experience was outstanding—exceptional professionalism and quality from start to finish.',
  },
  {
    id: 2,
    name: 'Ahmad Kim',
    role: 'Architect',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'We recently engaged the team for our fitout project, and the experience was outstanding from start to finish. Their team demonstrated exceptional professionalism, creativity, and attention to detail throughout the entire process. They truly listened to our vision and brought it to life with precision and style.',
  },
  {
    id: 3,
    name: 'Akash M',
    role: 'Project manager',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 3,
    text: 'In my experience the team has a wonderful group of people and delivered the project on time as per our requirements. Professionalism, organization, and attention to detail were excellent throughout.',
  },
  {
    id: 4,
    name: 'Sarah Chen',
    role: 'Tech Entrepreneur',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'The platform completely transformed how I view real estate. The matching found me the perfect property in just two weeks. The attention to detail is unmatched.',
  },
  {
    id: 5,
    name: 'Michael Rodriguez',
    role: 'Investment Banker',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'Transparent process and clear communication at every step. I could track the entire transaction in real time. This is how real estate should work.',
  },
]

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      ref={ref}
      className="relative bg-neutral-900 text-white overflow-hidden py-20 md:py-28"
      style={{ position: 'relative', zIndex: 50 }}
      aria-label="Testimonials"
    >
      {/* Blurred background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/house-2.jpeg"
          alt=""
          fill
          priority={false}
          className="object-cover scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-neutral-900/90" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-center mb-14 md:mb-16"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-white"
            style={{ fontFamily: 'var(--font-spartan)' }}
          >
            Over 1000+ People Trust
          </h2>
        </motion.div>

        {/* Carousel – partial cards on sides, center full */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
          className="overflow-hidden"
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1.15}
            centeredSlides
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 1.35 },
              1024: { slidesPerView: 1.4 },
              1280: { slidesPerView: 1.35 },
            }}
            className="!overflow-visible"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <article className="bg-white rounded-2xl p-6 md:p-8 shadow-xl min-h-[320px] md:min-h-[340px] flex flex-col text-neutral-800">
                  {/* Large quote mark – teal */}
                  <span
                    className="text-6xl md:text-7xl font-serif leading-none select-none block -mb-2"
                    style={{ color: '#06B6D4', fontFamily: 'Georgia, serif' }}
                    aria-hidden
                  >
                    “
                  </span>
                  <p className="text-neutral-600 text-sm md:text-base leading-relaxed flex-1 mb-6">
                    {t.text}
                  </p>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-neutral-200">
                        <Image
                          src={t.image}
                          alt={t.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">{t.name}</p>
                        <p className="text-sm text-neutral-500">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 flex-shrink-0"
                          style={{
                            color: '#06B6D4',
                            fill: i <= t.rating ? '#06B6D4' : 'transparent',
                            stroke: '#06B6D4',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
