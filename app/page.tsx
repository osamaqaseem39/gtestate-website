import type { Metadata } from 'next'
import { fetchPageBySlug } from '@/lib/api-public'
import HomePageClient from './HomePageClient'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPageBySlug('home')
  return {
    title: page?.metaTitle || 'GT Estate | Next‑Gen Real Estate Platform',
    description:
      page?.metaDescription ||
      'GT Estates is a trusted real estate consultancy in Pakistan offering residential and commercial plots, farmhouses, and investment opportunities.',
  }
}

export default function Home() {
  return <HomePageClient />
}
