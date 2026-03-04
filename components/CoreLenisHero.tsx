'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Diamond } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from './GSAPContext'

export default function CoreLenisHero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)
  const headingLeftRef = useRef<HTMLHeadingElement | null>(null)
  const headingRightRef = useRef<HTMLHeadingElement | null>(null)
  const taglineRef = useRef<HTMLParagraphElement | null>(null)
  const descRef = useRef<HTMLParagraphElement | null>(null)
  const ctaRef = useRef<HTMLDivElement | null>(null)
  const scrollHintRef = useRef<HTMLDivElement | null>(null)

  const { scrollTo } = useGSAP()

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (taglineRef.current) {
        tl.from(taglineRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.6,
        })
      }

      if (headingLeftRef.current && headingRightRef.current) {
        tl.from(
          [headingLeftRef.current, headingRightRef.current],
          {
            opacity: 0,
            y: 80,
            duration: 1.1,
            stagger: 0.1,
          },
          '-=0.3'
        )
      }

      if (descRef.current) {
        tl.from(
          descRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          '-=0.4'
        )
      }

      if (ctaRef.current) {
        tl.from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          '-=0.4'
        )
      }

      if (scrollHintRef.current) {
        tl.from(
          scrollHintRef.current,
          {
            opacity: 0,
            y: 10,
            duration: 0.6,
          },
          '-=0.4'
        )
      }

      // Background parallax
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Subtle opposing motion for BUILDING / VISIONS
      if (headingLeftRef.current && headingRightRef.current) {
        gsap.to(headingLeftRef.current, {
          yPercent: -10,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        gsap.to(headingRightRef.current, {
          yPercent: 10,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  const handleScrollDown = () => {
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800
    scrollTo(vh)
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      {/* Background image */}
      <div ref={bgRef} className="absolute inset-0 -z-10">
        <Image
          src="/hero-landscape.jpeg"
          alt="Luxurious interior design"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative flex min-h-screen flex-col px-4 pb-16 pt-32 sm:px-6 lg:px-12 lg:pb-24 lg:pt-40">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
          {/* Tagline */}
          <p
            ref={taglineRef}
            className="mb-6 max-w-xl text-xs font-light uppercase tracking-[0.25em] text-white/70"
          >
            Best Renovation Company &amp; Fit Out Contractor Lahore, Pakistan
          </p>

          {/* BUILDING / VISIONS row */}
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <h1
                ref={headingLeftRef}
                className="text-5xl font-bold uppercase tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
              >
                BUILDING
              </h1>
            </div>

            <div className="flex flex-col items-end space-y-8">
              <h1
                ref={headingRightRef}
                className="text-5xl text-right font-bold uppercase tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
              >
                VISIONS
              </h1>

              <div
                ref={ctaRef}
                className="flex flex-wrap items-center justify-end gap-4"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 border border-white/60 bg-white px-6 py-3 text-xs font-medium uppercase tracking-[0.25em] text-black transition-colors hover:bg-transparent hover:text-white"
                >
                  <Diamond className="h-4 w-4" />
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Description under the center line */}
          <p
            ref={descRef}
            className="mt-10 max-w-xl text-sm font-light leading-relaxed text-white/80 sm:text-base"
          >
            Visionary turnkey solutions across Pakistan, blending global expertise
            with local insight, transforming spaces through innovative design and
            meticulous execution.
          </p>
        </div>

        {/* Scroll hint using Lenis scrollTo */}
        <div
          ref={scrollHintRef}
          className="mt-8 flex items-center justify-center text-[10px] uppercase tracking-[0.3em] text-white/60"
        >
          <button
            type="button"
            onClick={handleScrollDown}
            className="flex flex-col items-center gap-2 outline-none"
          >
            <span>Scroll to explore</span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/40">
              <ChevronDown className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

