'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

export default function WhyChooseGT() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const images = [
    {
      src: '/house-1.jpeg',
      position: 'top-left' as const,
      orientation: 'horizontal' as const,
    },
    {
      src: '/house-2.jpeg',
      position: 'top-right' as const,
      orientation: 'horizontal' as const,
    },
    {
      src: '/house-3.jpeg',
      position: 'bottom-left' as const,
      orientation: 'vertical' as const,
    },
    {
      src: '/house-4.jpeg',
      position: 'bottom-right' as const,
      orientation: 'vertical' as const,
    },
  ]

  return (
    <section ref={ref} className="relative py-32 bg-black overflow-hidden" style={{ position: 'relative', zIndex: 50 }}>
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="relative min-h-[90vh] flex flex-col items-center justify-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8 z-20"
          >
            <h2 
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-2 uppercase tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-spartan)' }}
            >
              WHY CHOOSE
            </h2>
            <h2 
              className="text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-cyan-400 mb-8 uppercase tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-spartan)' }}
            >
              GT ESTATE?
            </h2>
          </motion.div>

          {/* Description Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto mb-16 z-20 px-4"
          >
            <p className="text-white text-lg md:text-xl leading-relaxed text-left md:text-center">
              To achieve flawless real estate solutions from planning to execution, you need a skilled partner in property investment. 
              Our experienced team delivers customized solutions, prioritizing client satisfaction and handling projects of all sizes with precision.
            </p>
          </motion.div>

          {/* Images arranged around text */}
          <div className="relative w-full max-w-7xl mx-auto aspect-[4/3]">
            {/* Top Left - Horizontal */}
            <motion.div
              initial={{ opacity: 0, x: -100, y: -50 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute top-0 left-0 w-[45%] h-[35%] overflow-hidden shadow-2xl"
            >
              <Image
                src={images[0].src}
                alt="Property 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 45vw"
                quality={90}
              />
            </motion.div>

            {/* Top Right - Horizontal */}
            <motion.div
              initial={{ opacity: 0, x: 100, y: -50 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute top-0 right-0 w-[45%] h-[35%] overflow-hidden shadow-2xl"
            >
              <Image
                src={images[1].src}
                alt="Property 2"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 45vw"
                quality={90}
              />
            </motion.div>

            {/* Bottom Left - Vertical */}
            <motion.div
              initial={{ opacity: 0, x: -100, y: 50 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute bottom-0 left-0 w-[30%] h-[50%] overflow-hidden shadow-2xl"
            >
              <Image
                src={images[2].src}
                alt="Property 3"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 30vw, 30vw"
                quality={90}
              />
            </motion.div>

            {/* Bottom Right - Vertical */}
            <motion.div
              initial={{ opacity: 0, x: 100, y: 50 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-0 right-0 w-[30%] h-[50%] overflow-hidden shadow-2xl"
            >
              <Image
                src={images[3].src}
                alt="Property 4"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 30vw, 30vw"
                quality={90}
              />
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 z-20"
          >
            <motion.div
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-20 h-20 mx-auto"
            >
              <div className="absolute inset-0 border-2 border-cyan-400 rotate-45"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider -rotate-45">SCROLL</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
