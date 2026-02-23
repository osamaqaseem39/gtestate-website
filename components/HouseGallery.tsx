'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

export default function HouseGallery() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stackedImages = [
    {
      src: '/house-1.jpeg',
      text: 'CONTEMPORARY',
    },
    {
      src: '/house-2.jpeg',
      text: 'TRUSTWORTHY',
    },
  ]

  const tiltedImages = [
    {
      src: '/house-3.jpeg',
      text: 'PROFESSIONAL',
      side: 'left' as const,
      rotation: -8,
    },
    {
      src: '/house-4.jpeg',
      text: 'EXCELLENCE',
      side: 'right' as const,
      rotation: 8,
    },
  ]

  return (
    <section ref={ref} className="relative py-32 bg-black overflow-hidden" style={{ position: 'relative', zIndex: 50, marginTop: 0 }}>
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full h-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.15 } : {}}
            transition={{ duration: 1 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-white/10 text-[15vw] md:text-[12vw] font-black uppercase tracking-wider whitespace-nowrap"
            style={{ fontFamily: 'var(--font-spartan)' }}
          >
            TRUSTWORTHY
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.15 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white/10 text-[15vw] md:text-[12vw] font-black uppercase tracking-wider whitespace-nowrap"
            style={{ fontFamily: 'var(--font-spartan)' }}
          >
            PROFESSIONAL
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="relative min-h-[80vh] flex items-center justify-center">
          {/* Images + text within same area - text on and behind, within image bounds */}
          <div className="relative flex items-center justify-center gap-6 md:gap-10 lg:gap-14 w-full max-w-6xl">
            {/* Left Tilted Image - back layer, faded */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -15 }}
              animate={inView ? { opacity: 0.75, x: 0, rotate: tiltedImages[0].rotation } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-[260px] md:w-[320px] lg:w-[380px] flex-shrink-0 overflow-hidden shadow-2xl"
              style={{
                aspectRatio: '3/4',
              }}
            >
              <Image
                src={tiltedImages[0].src}
                alt="House 3"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 260px, (max-width: 1024px) 320px, 380px"
                quality={90}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.95) 100%)',
                }}
              />
            </motion.div>

            {/* Center: text (behind) + stacked images + text (on) - all in one block */}
            <div className="relative w-[320px] md:w-[400px] lg:w-[480px] flex-shrink-0" style={{ aspectRatio: '3/4' }}>
              {/* Back text layer - behind images, bottom */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.5 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute inset-0 flex items-end justify-center pb-[18%] pointer-events-none z-0"
                style={{ fontFamily: 'var(--font-spartan)' }}
              >
                <span className="text-white font-bold uppercase tracking-tight text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl whitespace-nowrap">
                  {stackedImages[1].text}
                </span>
              </motion.div>

              {/* Back text layer - Professionalism at upper side, behind images */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.5 } : {}}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="absolute inset-0 flex items-start justify-center pt-[18%] pointer-events-none z-0"
                style={{ fontFamily: 'var(--font-spartan)' }}
              >
                <span className="text-white font-bold uppercase tracking-tight text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl whitespace-nowrap">
                  PROFESSIONALISM
                </span>
              </motion.div>

              {/* Center Stacked Images - Deck; back card faded */}
              <div className="relative w-full h-full">
                {stackedImages.map((house, index) => {
                  const offsetX = index * 10
                  const offsetY = index * 14
                  const rotation = index * 2
                  const layerOpacity = index === 0 ? 1 : 0.7
                  return (
                    <motion.div
                      key={house.src}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                        x: index === 0 ? -20 : 20,
                        y: index === 0 ? -30 : 30,
                        rotate: rotation - 2,
                      }}
                      animate={inView ? {
                        opacity: layerOpacity,
                        scale: 1,
                        x: offsetX,
                        y: offsetY,
                        rotate: rotation,
                      } : {}}
                      transition={{
                        duration: 0.6,
                        delay: 0.4 + index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="absolute top-0 left-0 w-full h-full overflow-hidden shadow-2xl"
                      style={{
                        aspectRatio: '3/4',
                        zIndex: 5 + stackedImages.length - index,
                      }}
                    >
                      <Image
                        src={house.src}
                        alt={`House ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 320px, (max-width: 1024px) 400px, 480px"
                        quality={90}
                      />
                    </motion.div>
                  )
                })}
              </div>

              {/* On text layer - CONTEMPORARY centered in the middle */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 0.9, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                style={{
                  fontFamily: 'var(--font-spartan)',
                  textShadow: '0 4px 24px rgba(0, 0, 0, 0.9)',
                }}
              >
                <span className="text-white font-bold uppercase tracking-tight text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl whitespace-nowrap">
                  {stackedImages[0].text}
                </span>
              </motion.div>
            </div>

            {/* Right Tilted Image - back layer, faded */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 15 }}
              animate={inView ? { opacity: 0.75, x: 0, rotate: tiltedImages[1].rotation } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-[260px] md:w-[320px] lg:w-[380px] flex-shrink-0 overflow-hidden shadow-2xl"
              style={{
                aspectRatio: '3/4',
              }}
            >
              <Image
                src={tiltedImages[1].src}
                alt="House 4"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 260px, (max-width: 1024px) 320px, 380px"
                quality={90}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.95) 100%)',
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
