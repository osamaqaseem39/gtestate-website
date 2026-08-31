import { Metadata } from 'next'
import { fetchPageBySlug } from '@/lib/api-public'
import GalleryPageClient from './GalleryPageClient'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPageBySlug('gallery')
  return {
    title: page?.metaTitle || 'Gallery - GT Estate',
    description:
      page?.metaDescription || 'Explore our curated gallery of premium properties and real estate projects.',
  }
}

export default function GalleryPage() {
  return <GalleryPageClient />
}
