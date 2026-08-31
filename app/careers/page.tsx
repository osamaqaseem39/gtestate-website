import type { Metadata } from 'next'
import { fetchSiteContent } from '@/lib/api-public'
import CareersPageClient from './CareersPageClient'

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchSiteContent('careers')
  return {
    title: content.metaTitle || 'Careers',
    description:
      content.metaDescription || 'Apply to join GT Estates — sales, marketing, operations, and more.',
  }
}

export default function CareersPage() {
  return <CareersPageClient />
}
