'use client'

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import Lenis from 'lenis'

type LenisContextValue = {
  lenis: Lenis | null
  scrollTo: (y: number) => void
}

const LenisContext = createContext<LenisContextValue>({ lenis: null, scrollTo: () => {} })

export function useLenis() {
  return useContext(LenisContext)
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 20,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    setLenis(instance)

    function raf(time: number) {
      instance.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafRef.current)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  const scrollTo = (y: number) => {
    if (lenis) {
      lenis.scrollTo(y, { immediate: false })
    } else {
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <LenisContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </LenisContext.Provider>
  )
}
