import type { Metadata } from 'next'
import { fetchSiteContent } from '@/lib/api-public'
import HeroLenisGsap from '@/components/HeroLenisGsap'

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchSiteContent('hero-alt')
  return {
    title: content.metaTitle || 'GT Estate – Alternate Hero',
    description:
      content.metaDescription || 'An alternate hero page showcasing core GSAP + Lenis powered animations.',
  }
}

export default function HeroAltPage() {
  return (
    <main className="bg-black text-white">
      <HeroLenisGsap />
    </main>
  )
}

