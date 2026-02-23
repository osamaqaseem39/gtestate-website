'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import Image from 'next/image'

const IMAGES = [
  { src: '/house-1.jpeg', alt: 'House 1' }, // gallery: center front -> why: top-left
  { src: '/house-2.jpeg', alt: 'House 2' }, // gallery: center back -> why: top-right
  { src: '/house-3.jpeg', alt: 'House 3' }, // gallery: left tilted -> why: bottom-left
  { src: '/house-4.jpeg', alt: 'House 4' }, // gallery: right tilted -> why: bottom-right
]

// Layout: [left %, top %, width %, height %, rotation deg]
const GALLERY_LAYOUT: [number, number, number, number, number][] = [
  [38, 12, 24, 32, 2],   // house-1 center front
  [40, 14, 24, 32, 4],   // house-2 center back
  [8, 15, 18, 24, -8],   // house-3 left tilted
  [74, 15, 18, 24, 8],   // house-4 right tilted
]

const WHY_LAYOUT: [number, number, number, number, number][] = [
  [10, 32, 36, 21, 0],   // house-1 top-left
  [54, 32, 36, 21, 0],   // house-2 top-right
  [10, 58, 24, 30, 0],   // house-3 bottom-left
  [66, 58, 24, 30, 0],   // house-4 bottom-right
]

function MorphingImage({
  img,
  index,
  scrollYProgress,
}: {
  img: { src: string; alt: string }
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const start = GALLERY_LAYOUT[index]
  const end = WHY_LAYOUT[index]
  const left = useTransform(scrollYProgress, [0, 0.6], [start[0], end[0]])
  const top = useTransform(scrollYProgress, [0, 0.6], [start[1], end[1]])
  const width = useTransform(scrollYProgress, [0, 0.6], [start[2], end[2]])
  const height = useTransform(scrollYProgress, [0, 0.6], [start[3], end[3]])
  const rotate = useTransform(scrollYProgress, [0, 0.6], [start[4], end[4]])
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  const leftPct = useTransform(left, (v) => `${v}%`)
  const topPct = useTransform(top, (v) => `${v}%`)
  const widthPct = useTransform(width, (v) => `${v}%`)
  const heightPct = useTransform(height, (v) => `${v}%`)

  return (
    <motion.div
      className="absolute overflow-hidden shadow-2xl"
      style={{
        left: leftPct,
        top: topPct,
        width: widthPct,
        height: heightPct,
        rotate,
        transformOrigin: '0 0',
      }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        className="object-cover"
        sizes="50vw"
        quality={90}
      />
      {index >= 2 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.95) 100%)',
            opacity: gradientOpacity,
          }}
        />
      )}
    </motion.div>
  )
}

export default function GalleryToWhyChoose() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.4], [0.15, 0])

  return (
    <>
      <div
        ref={containerRef}
        className="relative bg-black"
        style={{ height: '180vh' }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: bgTextOpacity }}
          >
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white/10 text-[12vw] font-black uppercase tracking-wider whitespace-nowrap"
              style={{ fontFamily: 'var(--font-spartan)' }}
            >
              TRUSTWORTHY
            </span>
            <span
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white/10 text-[12vw] font-black uppercase tracking-wider whitespace-nowrap"
              style={{ fontFamily: 'var(--font-spartan)' }}
            >
              PROFESSIONAL
            </span>
          </motion.div>

          {IMAGES.map((img, i) => (
            <MorphingImage key={img.src} img={img} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>

      {/* WhyChooseGT content: heading + description (sits below the scroll block) */}
      <section className="relative -mt-[100vh] pt-[80vh] pb-32 bg-black overflow-hidden" style={{ zIndex: 50 }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="relative flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-4xl mx-auto mb-16 z-20 px-4"
            >
              <p className="text-white text-lg md:text-xl leading-relaxed text-left md:text-center">
                To achieve flawless real estate solutions from planning to execution, you need a skilled partner in property investment.
                Our experienced team delivers customized solutions, prioritizing client satisfaction and handling projects of all sizes with precision.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="z-20"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-20 h-20 mx-auto"
              >
                <div className="absolute inset-0 border-2 border-cyan-400 rotate-45" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider -rotate-45">SCROLL</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
