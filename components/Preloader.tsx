'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
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
        duration: 0.8,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        transformOrigin: 'left',
      })

    const minDisplayTime = 1200
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
          duration: 0.4,
          ease: 'power2.inOut',
          transformOrigin: 'left',
        })
      }
      tl.to(
          text,
          {
            opacity: 0,
            y: -12,
            duration: 0.35,
            ease: 'power2.in',
          },
          '-=0.2'
        )
        .to(
          wrapper,
          {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          '-=0.15'
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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      aria-hidden="true"
    >
      <span
        ref={textRef}
        className="font-semibold tracking-wide text-white/90 text-xl sm:text-2xl"
      >
        GT Estate
      </span>
      <div className="mt-4 w-24 h-0.5 overflow-hidden rounded-full bg-white/10">
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple"
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </div>
  )
}
