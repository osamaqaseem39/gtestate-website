'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const wrapper = wrapperRef.current
    const bar = barRef.current

    let barTween: gsap.core.Tween | null = null

    if (bar) {
      gsap.set(bar, { scaleX: 0, transformOrigin: 'left' })

      barTween = gsap.to(bar, {
        scaleX: 1,
        duration: 1.8,
        ease: 'power2.inOut',
        transformOrigin: 'left',
        onUpdate() {
          const p = Math.round((barTween?.progress() ?? 0) * 100)
          setProgress(p)
        },
      })
    }

    const totalDuration = 2000
    const timeout = window.setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (wrapper) {
            gsap.set(wrapper, { pointerEvents: 'none' })
          }
          setIsVisible(false)
        },
      })

      tl.to(wrapper, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      })
    }, totalDuration)

    return () => {
      window.clearTimeout(timeout)
      barTween?.kill()
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[9999] bg-black text-white"
      aria-hidden="true"
    >
      {/* Centered logo */}
      <div className="flex h-full w-full flex-col">
        <div className="flex flex-1 items-center justify-center">
          <div className="relative h-24 w-24 sm:h-28 sm:w-28">
            <div className="absolute inset-0 rounded-full border border-white/15" />
            <Image
              src="/logo.png"
              alt="GT Estate logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Bottom bar + text row */}
        <div className="w-full px-6 pb-6 sm:px-10 sm:pb-8">
          <div className="mb-2 flex items-center justify-between text-xs sm:text-sm md:text-base">
            <span className="font-medium tracking-[0.18em] uppercase text-white/90">
              Brewing your experience
            </span>
            <span className="font-semibold text-white">{progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/15">
            <div
              ref={barRef}
              className="h-full w-full origin-left scale-x-0 rounded-full bg-white"
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
