'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Diamond } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from './GSAPContext'

/**
 * HeroLenisGsap
 *
 * A new hero that mimics the existing BUILDING / VISIONS hero,
 * but drives all animations via GSAP + ScrollTrigger + Lenis (useGSAP),
 * with no framer-motion and no manual window scroll handlers.
 */
export default function HeroLenisGsap() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)
  const squareRef = useRef<HTMLDivElement | null>(null)
  const innerContentRef = useRef<HTMLDivElement | null>(null)
  const buildingRef = useRef<HTMLHeadingElement | null>(null)
  const visionsRef = useRef<HTMLHeadingElement | null>(null)
  const taglineRef = useRef<HTMLParagraphElement | null>(null)
  const descRef = useRef<HTMLParagraphElement | null>(null)
  const ctaRef = useRef<HTMLDivElement | null>(null)
  const scrollHintRef = useRef<HTMLDivElement | null>(null)
  const aboutBlockRef = useRef<HTMLDivElement | null>(null)
  const visionBlockRef = useRef<HTMLDivElement | null>(null)
  const aboutDescRef = useRef<HTMLDivElement | null>(null)
  const visionDescRef = useRef<HTMLDivElement | null>(null)
  const centerImageOneRef = useRef<HTMLDivElement | null>(null)
  const centerImageTwoRef = useRef<HTMLDivElement | null>(null)

  const { scrollTo } = useGSAP()

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const animationDistance = () => window.innerHeight * 2

      // Single master timeline controlling scroll-driven pieces while pinned.
      const master = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${animationDistance()}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
        },
      })

      // Intro timeline – plays once on load, bringing text in from outside viewport.
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (taglineRef.current) {
        intro.from(taglineRef.current, {
          opacity: 0,
          y: -40,
          duration: 0.6,
        })
      }

      if (buildingRef.current) {
        intro.from(
          buildingRef.current,
          {
            opacity: 0,
            x: -200,
            duration: 0.8,
          },
          '-=0.4',
        )
      }

      if (visionsRef.current) {
        intro.from(
          visionsRef.current,
          {
            opacity: 0,
            x: 200,
            duration: 0.8,
          },
          '-=0.7',
        )
      }

      if (descRef.current) {
        intro.from(
          descRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.6,
          },
          '-=0.5',
        )
      }

      if (ctaRef.current) {
        intro.from(
          ctaRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.5,
          },
          '-=0.5',
        )
      }

      if (scrollHintRef.current) {
        intro.from(
          scrollHintRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          '-=0.4',
        )
      }

      // Tilted square: keep a fixed scale so that
      // only the inner content appears to scale down.
      if (squareRef.current) {
        master.fromTo(
          squareRef.current,
          { scale: 1, rotation: 45 },
          { scale: 15, rotation: 80 },
          0.01,
        )
      }

      // Inner content ("about / vision" screen) is always full width/height.
      // Keep it at a constant scale so the screen itself does not zoom;
      // only the square window animates.
      if (innerContentRef.current) {
        master.fromTo(
          innerContentRef.current,
          { scale: 1, opacity: 1 , rotation: -45},
          { scale: 1/15, opacity: 1 , rotation: -80},
          0.01,
        )
      }

      // About -> Vision text animation inside the scaled square.
      // Wait until the square has fully scaled, then reveal About once,
      // and fully hide About as Vision fades in.
      if (aboutBlockRef.current && visionBlockRef.current) {
        master
          // Ensure About starts hidden for the whole scroll, then fades in after scale
          .set(
            aboutBlockRef.current,
            {
              autoAlpha: 0,
              y: 40,
            },
            0,
          )
          .to(
            aboutBlockRef.current,
            {
              autoAlpha: 1,
              y: 0,
            },
            1, // fade in after the square has finished scaling
          )
          .to(
            aboutBlockRef.current,
            {
              autoAlpha: 0,
            },
            1.8, // hide About when Vision starts to appear
          )
          .fromTo(
            visionBlockRef.current,
            { autoAlpha: 0 },
            { autoAlpha: 1, immediateRender: false },
            1.8, // later in the scroll, crossfade to Vision
          )
      }

      // Right-column description: About -> Vision
      if (aboutDescRef.current && visionDescRef.current) {
        master
          .set(
            aboutDescRef.current,
            { autoAlpha: 0, y: 20 },
            0,
          )
          .to(
            aboutDescRef.current,
            { autoAlpha: 1, y: 0 },
            1,
          )
          .to(
            aboutDescRef.current,
            {
              autoAlpha: 0,
            },
            1.8,
          )
          .fromTo(
            visionDescRef.current,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, immediateRender: false },
            1.8,
          )
      }

      // Center image 1 -> 2 crossfade
      // Image 1 is visible from the start of the About section,
      // then later crossfades to image 2.
      if (centerImageOneRef.current && centerImageTwoRef.current) {
        master
          .to(
            centerImageOneRef.current,
            {
              opacity: 0,
            },
            1.8, // then fade out as image 2 fades in
          )
          .fromTo(
            centerImageTwoRef.current,
            { opacity: 0 },
            { opacity: 1 },
            1.8,
          )
      }

      // Background + headings parallax and lateral motion toward center
      if (bgRef.current) {
        master.to(
          bgRef.current,
          {
            yPercent: 15,
          },
          0,
        )
      }

      if (buildingRef.current) {
        master.to(
          buildingRef.current,
          {
            yPercent: -10,
            xPercent: 25, // stronger move toward center on scroll
          },
          0,
        )
      }

      if (visionsRef.current) {
        master.to(
          visionsRef.current,
          {
            yPercent: 10,
            xPercent: -25, // stronger move toward center on scroll
          },
          0,
        )
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
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col pt-20">
        {/* Main content area */}
        <div className="flex flex-1 items-center justify-center px-4 py-20 sm:px-6 lg:px-8 xl:px-12">
          <div className="relative w-full">
            {/* Center horizontal line */}
            <div
              className="absolute left-0 right-0 hidden h-px bg-white/60 lg:block"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            />

            {/* Tilted square "window" with about/vision content (scroll-driven) */}
            <div
              ref={squareRef}
              className="absolute z-20 "
              style={{
                width: 200,
                height: 200,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%) rotate(45deg)',
                overflow: 'hidden',
                backgroundColor: 'transparent',
              }}
            >
              <div
                ref={innerContentRef}
                className="relative"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: '100vw',
                  height: '100vh',
                  marginLeft: '-50vw',
                  marginTop: '-50vh',
                  transform: 'rotate(-45deg)',
                  transformOrigin: 'center center',
                }}
              >
                <div className="relative flex h-full w-full items-center justify-center py-20">
                  {/* Background for inner about/vision area that shows through the square */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/about-bg.jpeg')" }}
                  />
                  <div className="absolute inset-0 bg-black/80" />

                  {/* Center image stack that the square reveals */}
                  <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[min(40vw,512px)] max-w-[512px] aspect-[4/5] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                    <div
                      ref={centerImageOneRef}
                      className="absolute inset-0"
                    >
                      <Image
                        src="/about-1.jpeg"
                        alt="Luxurious interior design"
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1280px) 40vw, (max-width: 1536px) 35vw, 512px"
                      />
                    </div>
                    <div
                      ref={centerImageTwoRef}
                      className="absolute inset-0 opacity-0"
                    >
                      <Image
                        src="/about-2.jpeg"
                        alt="Luxurious interior design"
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1280px) 40vw, (max-width: 1536px) 35vw, 512px"
                      />
                    </div>
                  </div>

                  <div className="relative z-20 grid w-full grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 xl:px-12">
                    {/* About / Vision text block (left column) */}
                    <div className="relative lg:col-span-4">
                      <div ref={aboutBlockRef} className="space-y-6">
                        <p className="text-sm font-light uppercase tracking-wider text-white">
                          ABOUT GT ESTATES
                        </p>
                        <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
                          <span className="whitespace-nowrap">REDEFINE THE FUTURE</span>
                          <br />
                          <span className="whitespace-nowrap">OF REAL ESTATE</span>
                        </h2>
                        <p className="text-sm font-light leading-relaxed text-white md:text-base">
                          Delivering smart investment opportunities through premium residential
                          and commercial plots that shape modern living.
                        </p>
                      </div>

                      <div
                        ref={visionBlockRef}
                        className="pointer-events-none absolute inset-0 space-y-6 opacity-0"
                      >
                        <p className="text-sm font-light uppercase tracking-wider text-white">
                          OUR VISION
                        </p>
                        <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
                          <span className="whitespace-nowrap">BUILDING TRUST THROUGH</span>
                          <br />
                          <span className="whitespace-nowrap">SMART INVESTMENTS</span>
                        </h2>
                        <p className="text-sm font-light leading-relaxed text-white md:text-base">
                          Creating opportunities that inspire growth, value, and long-term
                          success in real estate.
                        </p>
                      </div>
                    </div>

                    {/* Spacer + right column text (About / Vision descriptions) */}
                    <div className="hidden lg:block lg:col-span-5" />

                    <div className="relative lg:col-span-3">
                      <div ref={aboutDescRef} className="space-y-3">
                        <p className="mb-1 text-sm font-light leading-relaxed text-white md:text-sm">
                          GT Estates is a Lahore-based real estate firm specializing in residential
                          and commercial plot investments, offering trusted opportunities in Etihad
                          Town Phase 3 and Etihad Town Sialkot.
                        </p>
                        <p className="text-sm font-light leading-relaxed text-white md:text-sm">
                          We combine market expertise with strong credibility to help you invest with
                          confidence, turning the right location into long-term value and growth.
                        </p>
                      </div>

                      <div
                        ref={visionDescRef}
                        className="pointer-events-none absolute inset-0 space-y-3 opacity-0"
                      >
                        <p className="mb-1 text-sm font-light leading-relaxed text-white md:text-sm">
                          We envision a real estate market where every investor makes decisions with
                          clarity and confidence - Backed by verified projects, transparent dealings,
                          and real market insights.
                        </p>
                        <p className="text-sm font-light leading-relaxed text-white md:text-sm">
                          Our vision is to guide clients in Lahore and beyond toward secure investments
                          in Etihad Town Phase 3 and Etihad Town Sialkot, helping them achieve
                          sustainable growth and lasting returns.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BUILDING / VISIONS headings and CTA */}
            <div className="relative grid w-full grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-24">
              {/* Left side: tagline + BUILDING */}
              <div
                className="relative"
                style={{ position: 'absolute', left: 0, bottom: 'calc(50% + 0.5rem)' }}
              >
                <p
                  ref={taglineRef}
                  className="mb-4 text-sm font-light uppercase tracking-wider text-white md:text-base"
                >
                  Professional Real Estate &amp; Plot Specialists – Pakistan
                </p>
                <h1
                  ref={buildingRef}
                  className="text-5xl font-bold uppercase tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl"
                >
                  <span className="whitespace-nowrap">CREATING</span>
                  <br />
                  <span className="whitespace-nowrap">VALUE</span>
                </h1>
              </div>

              {/* Right side: VISIONS + CTA */}
              <div
                className="flex flex-col items-end space-y-8 lg:items-end"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(50% + 0.5rem)',
                  paddingTop: '2em',
                }}
              >
                <h1
                  ref={visionsRef}
                  className="text-right text-5xl font-bold uppercase tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl"
                >
                  <span className="whitespace-nowrap">SHAPING</span>
                  <br />
                  <span className="whitespace-nowrap">FUTURES</span>
                </h1>
                <div ref={ctaRef} className="mt-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <span className="btn-hero-group">
                      <Link href="/contact" className="btn-hero">
                        <Diamond className="h-4 w-4" />
                        <span>Start Investing</span>
                      </Link>
                    </span>
                    <span className="btn-hero-group">
                      <Link href="/projects" className="btn-hero-outline">
                        <span>View Opportunities</span>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description below the line */}
            <p
              ref={descRef}
              className="absolute left-4 z-10 max-w-md text-sm font-light leading-relaxed text-white/80 sm:left-6 lg:left-8 lg:max-w-lg xl:left-12 md:text-base"
              style={{ top: 'calc(50% + 2rem)' }}
            >
              We focus on residential and commercial plots, delivering secure investments,
              prime areas, honest guidance, and profitable growth through reliable projects.
            </p>
          </div>
        </div>

        {/* Scroll hint hooked into Lenis scrollTo */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 transform flex-col items-center gap-2 text-xs font-light uppercase tracking-[0.25em] text-white/70"
        >
          <button
            type="button"
            onClick={handleScrollDown}
            className="flex flex-col items-center gap-2 bg-transparent outline-none"
          >
            <span>Scroll to Explore</span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/40">
              <ChevronDown className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

