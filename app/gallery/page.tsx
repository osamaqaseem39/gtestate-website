import { Metadata } from 'next'
import { fetchSiteContent } from '@/lib/api-public'
import GalleryPageClient from './GalleryPageClient'

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchSiteContent('gallery')
  return {
    title: content.metaTitle || 'Gallery - GT Estate',
    description:
      content.metaDescription || 'Explore our curated gallery of premium properties and real estate projects.',
  }
}

export default function GalleryPage() {
  return <GalleryPageClient />
}
