'use client'

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

type GSAPContextValue = {
  scrollTo: (y: number) => void
  getScrollY: () => number
  pauseSmoothScroll: () => void
  resumeSmoothScroll: () => void
}

const GSAPContext = createContext<GSAPContextValue>({
  scrollTo: () => {},
  getScrollY: () => 0,
  pauseSmoothScroll: () => {},
  resumeSmoothScroll: () => {},
})

export function useGSAP() {
  return useContext(GSAPContext)
}

export function GSAPProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
    })

    lenisRef.current = lenis

    const onLenisScroll = () => {
      ScrollTrigger.update()
    }

    lenis.on('scroll', onLenisScroll)

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    })

    setIsReady(true)

    return () => {
      lenis.off('scroll', onLenisScroll)
      lenis.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const scrollTo = (y: number) => {
    if (typeof window === 'undefined') return

    if (lenisRef.current) {
      lenisRef.current.scrollTo(y)
    } else {
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const getScrollY = () => {
    if (typeof window === 'undefined') {
      return 0
    }

    if (lenisRef.current) {
      return lenisRef.current.scroll
    }

    return window.scrollY
  }

  if (!isReady) {
    return <>{children}</>
  }

  return (
    <GSAPContext.Provider
      value={{
        scrollTo,
        getScrollY,
        pauseSmoothScroll: () => {
          if (lenisRef.current) {
            lenisRef.current.stop()
          }
        },
        resumeSmoothScroll: () => {
          if (lenisRef.current) {
            lenisRef.current.start()
          }
        },
      }}
    >
      {children}
    </GSAPContext.Provider>
  )
}
