'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Diamond } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from './GSAPContext'

export default function NewHero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const subheadingRef = useRef<HTMLParagraphElement | null>(null)
  const ctaRef = useRef<HTMLDivElement | null>(null)
  const badgeRef = useRef<HTMLDivElement | null>(null)
  const scrollHintRef = useRef<HTMLDivElement | null>(null)

  const { scrollTo } = useGSAP()

  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (badgeRef.current) {
      tl.from(badgeRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
      })
    }

    if (headingRef.current) {
      tl.from(
        headingRef.current,
        {
          opacity: 0,
          y: 40,
          duration: 0.9,
        },
        '-=0.2'
      )
    }

    if (subheadingRef.current) {
      tl.from(
        subheadingRef.current,
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

    if (sectionRef.current && bgRef.current) {
      // Simple parallax on scroll powered by core GSAP + ScrollTrigger.
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      tl.kill()
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
      {/* Background image with subtle parallax */}
      <div ref={bgRef} className="absolute inset-0 -z-10">
        <Image
          src="/hero-landscape.jpeg"
          alt="Signature real estate experience"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center px-4 pb-16 pt-32 sm:px-6 lg:px-12 lg:pb-24 lg:pt-40">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
          {/* Top badge */}
          <div ref={badgeRef} className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/70">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-neon-green/60 bg-white/5">
              <Diamond className="h-3 w-3 text-neon-green" />
            </span>
            <span>Signature Experience</span>
          </div>

          {/* Core heading */}
          <div className="space-y-6">
            <h1
              ref={headingRef}
              className="text-4xl font-bold uppercase tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Crafting
              <span className="block text-neon-green">Living Landmarks</span>
            </h1>

            <p
              ref={subheadingRef}
              className="max-w-xl text-sm font-light leading-relaxed text-white/80 sm:text-base"
            >
              A cinematic hero powered by core GSAP, ScrollTrigger, and Lenis smooth scrolling.
              Scroll to reveal the story as the background gently shifts and typography glides into view.
            </p>
          </div>

          {/* CTA row */}
          <div
            ref={ctaRef}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-neon-green bg-neon-green px-6 py-3 text-xs font-medium uppercase tracking-[0.25em] text-black transition-colors hover:bg-transparent hover:text-neon-green"
            >
              <Diamond className="h-4 w-4" />
              <span>Request a consultation</span>
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-white/80 hover:text-white"
            >
              <span>Explore projects</span>
            </Link>
          </div>
        </div>

        {/* Scroll hint tied into Lenis scrollTo */}
        <div
          ref={scrollHintRef}
          className="mt-8 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/60"
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

