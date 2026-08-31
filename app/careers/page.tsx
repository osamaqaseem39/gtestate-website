import type { Metadata } from 'next'
import { fetchPageBySlug } from '@/lib/api-public'
import CareersPageClient from './CareersPageClient'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPageBySlug('careers')
  return {
    title: page?.metaTitle || 'Careers',
    description:
      page?.metaDescription || 'Apply to join GT Estates — sales, marketing, operations, and more.',
  }
}

export default function CareersPage() {
  return <CareersPageClient />
}
