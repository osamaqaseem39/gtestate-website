'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type GSAPContextValue = {
  scrollTo: (y: number) => void
  getScrollY: () => number
}

const GSAPContext = createContext<GSAPContextValue>({
  scrollTo: () => {},
  getScrollY: () => 0,
})

export function useGSAP() {
  return useContext(GSAPContext)
}

export function GSAPProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    if (typeof window !== 'undefined') {
      ScrollTrigger.config({
        autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      })
      
      setIsReady(true)

      return () => {
        // Cleanup ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }
  }, [])

  const scrollTo = (y: number) => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const getScrollY = () => {
    if (typeof window !== 'undefined') {
      return window.scrollY
    }
    return 0
  }

  return (
    <GSAPContext.Provider value={{ scrollTo, getScrollY }}>
      {children}
    </GSAPContext.Provider>
  )
}
