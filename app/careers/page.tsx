import type { Metadata } from 'next'
import CareersPageClient from './CareersPageClient'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Apply to join GT Estates — sales, marketing, operations, and more.',
}

export default function CareersPage() {
  return <CareersPageClient />
}
