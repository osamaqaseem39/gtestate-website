import { Metadata } from 'next'
import { fetchSiteContent } from '@/lib/api-public'
// @ts-ignore - local client component resolved by Next.js
import TeamPageClient from './TeamPageClient'

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchSiteContent('team')
  return {
    title: content.metaTitle || 'Team - GT Estate',
    description:
      content.metaDescription ||
      'Meet the experts behind GT Estate – dedicated professionals delivering exceptional real estate services.',
  }
}

export default function Team() {
  return <TeamPageClient />
}
