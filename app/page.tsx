import type { Metadata } from 'next'
import { fetchSiteContent } from '@/lib/api-public'
import HomePageClient from './HomePageClient'

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchSiteContent('home')
  return {
    title: content.metaTitle || 'GT Estate | Next‑Gen Real Estate Platform',
    description:
      content.metaDescription ||
      'GT Estates is a trusted real estate consultancy in Pakistan offering residential and commercial plots, farmhouses, and investment opportunities.',
  }
}

export default function Home() {
  return <HomePageClient />
}
