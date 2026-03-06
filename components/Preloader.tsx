'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !wrapperRef.current) return

    const wrapper = wrapperRef.current
    const text = textRef.current
    const bar = barRef.current

    // Loading bar pulse while waiting
    const loadingTween =
      bar &&
      gsap.to(bar, {
        scaleX: 1,
        duration: 0.9,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        transformOrigin: 'left',
      })

    const minDisplayTime = 1400
    const start = performance.now()

    const hide = () => {
      loadingTween?.kill()
      const elapsed = performance.now() - start
      const delay = Math.max(0, minDisplayTime - elapsed)

      const tl = gsap.timeline({
        delay,
        onComplete: () => {
          gsap.set(wrapper, { pointerEvents: 'none' })
          setIsVisible(false)
        },
      })

      if (bar) {
        tl.to(bar, {
          scaleX: 1,
          duration: 0.5,
          ease: 'power2.inOut',
          transformOrigin: 'left',
        })
      }

      tl.to(
        text,
        {
          opacity: 0,
          y: -16,
          duration: 0.4,
          ease: 'power2.in',
        },
        '-=0.25'
      ).to(
        wrapper,
        {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        '-=0.2'
      )
    }

    if (document.readyState === 'complete') {
      hide()
    } else {
      window.addEventListener('load', hide)
      return () => {
        window.removeEventListener('load', hide)
        loadingTween?.kill()
      }
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[9999] bg-black bg-cyber-grid"
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 bottom-0 px-6 pb-7 sm:px-10 sm:pb-9">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <Image
                src="/logo.png"
                alt="GT Estate logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-white/40">
                GT Estate
              </p>
              <p className="text-sm text-white/60">
                Next‑gen real estate platform
              </p>
            </div>
          </div>

          <p
            ref={textRef}
            className="mt-4 text-lg sm:text-xl font-semibold text-gradient text-sharp"
          >
            Preparing your experience
          </p>
          <p className="mt-1.5 text-sm text-white/60">
            Calibrating market data, tailoring properties and setting up your
            journey.
          </p>
        </div>

        <div className="mt-6 h-1 w-full overflow-hidden rounded-none bg-white/5">
          <div
            ref={barRef}
            className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple"
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </div>
    </div>
  )
}
