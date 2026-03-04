import type { Metadata } from 'next'
import HeroLenisGsap from '@/components/HeroLenisGsap'

export const metadata: Metadata = {
  title: 'GT Estate – Alternate Hero',
  description: 'An alternate hero page showcasing core GSAP + Lenis powered animations.',
}

export default function HeroAltPage() {
  return (
    <main className="bg-black text-white">
      <HeroLenisGsap />
    </main>
  )
}

