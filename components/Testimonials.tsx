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
    name: 'GT Estates Client',
    role: 'Investor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'GT Estates made my investment journey smooth and completely stress-free. Their guidance was honest, clear, and truly professional from start to finish.',
  },
  {
    id: 2,
    name: 'GT Estates Client',
    role: 'Investor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'I was impressed by their transparency and market knowledge. They helped me make the right decision with full confidence.',
  },
  {
    id: 3,
    name: 'GT Estates Client',
    role: 'Investor',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'Exceptional service and attention to detail. GT Estates understands client needs and delivers beyond expectations every time.',
  },
  {
    id: 4,
    name: 'GT Estates Client',
    role: 'Investor',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'A trustworthy team that values long-term relationships. Their professionalism really sets them apart in the real estate market.',
  },
  {
    id: 5,
    name: 'GT Estates Client',
    role: 'Investor',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'The entire process was handled with great care and efficiency. Highly recommended for anyone looking for reliable property consultation.',
  },
  {
    id: 6,
    name: 'GT Estates Client',
    role: 'Investor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'GT Estates provided me with expert advice and honest insights, making my investment secure and worthwhile.',
  },
  {
    id: 7,
    name: 'GT Estates Client',
    role: 'Investor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'From consultation to final deal, everything was seamless. Their commitment to quality service is truly remarkable.',
  },
  {
    id: 8,
    name: 'GT Estates Client',
    role: 'Investor',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'I appreciate their client-first approach and transparent dealings. It’s rare to find such dedication and integrity.',
  },
  {
    id: 9,
    name: 'GT Estates Client',
    role: 'Investor',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'A premium experience with a professional team. They made real estate investment simple and rewarding for me.',
  },
  {
    id: 10,
    name: 'GT Estates Client',
    role: 'Investor',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'Highly satisfied with their services. GT Estates delivers trust, expertise, and long-term value in every interaction.',
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
      className="relative bg-black text-white overflow-hidden py-20 md:py-28"
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
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[3px]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/95 via-black/90 to-cyan-950/50" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-center mb-10 md:mb-14"
        >
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight uppercase text-white"
            style={{ fontFamily: 'var(--font-spartan)' }}
          >
            What Clients Say
            <span className="block text-[#fabb22] mt-1 text-xl md:text-2xl">GT Estates</span>
          </h2>
          <p className="mt-2 md:mt-3 text-sm md:text-base text-white/70 max-w-2xl mx-auto">
            Real feedback from clients who trusted us with their residential and commercial plot investments.
          </p>
        </motion.div>

        {/* Carousel – partial cards on sides, center full, with edge fade instead of hard cut */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Edge fade gradients */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 md:w-20 lg:w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-20"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 md:w-20 lg:w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-20"
            aria-hidden
          />

          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1.05}
            centeredSlides
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1.1 },
              768: { slidesPerView: 1.2 },
              1024: { slidesPerView: 1.3 },
              1280: { slidesPerView: 1.35 },
            }}
            className="!overflow-visible"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <article className="bg-black/70 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl min-h-[320px] md:min-h-[340px] flex flex-col text-white/90 backdrop-blur-sm">
                  {/* Large quote mark – teal */}
                  <span
                    className="text-6xl md:text-7xl font-serif leading-none select-none block -mb-2"
                    style={{ color: '#fabb22', fontFamily: 'Georgia, serif' }}
                    aria-hidden
                  >
                    “
                  </span>
                  <p className="text-white/75 text-sm md:text-base leading-relaxed flex-1 mb-6">
                    {t.text}
                  </p>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-neutral-800">
                        <Image
                          src={t.image}
                          alt={t.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{t.name}</p>
                        <p className="text-sm text-white/60">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 flex-shrink-0"
                          style={{
                            color: '#fabb22',
                            fill: i <= t.rating ? '#fabb22' : 'transparent',
                            stroke: '#fabb22',
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
