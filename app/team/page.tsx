import { Metadata } from 'next'
import { fetchPageBySlug } from '@/lib/api-public'
// @ts-ignore - local client component resolved by Next.js
import TeamPageClient from './TeamPageClient'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPageBySlug('team')
  return {
    title: page?.metaTitle || 'Team - GT Estate',
    description:
      page?.metaDescription ||
      'Meet the experts behind GT Estate – dedicated professionals delivering exceptional real estate services.',
  }
}

export default function Team() {
  return <TeamPageClient />
}
