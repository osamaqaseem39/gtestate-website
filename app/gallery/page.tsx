import { Metadata } from 'next'
import GalleryPageClient from './GalleryPageClient'

export const metadata: Metadata = {
  title: 'Gallery - GT Estate',
  description: 'Explore our curated gallery of premium properties and real estate projects.',
}

export default function GalleryPage() {
  return <GalleryPageClient />
}
