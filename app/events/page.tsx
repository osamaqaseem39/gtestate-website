import { Metadata } from 'next'
import EventsPageClient from './EventsPageClient'
import { fetchPageBySlug } from '@/lib/api-public'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPageBySlug('events')
  return {
    title: page?.metaTitle || 'Events - GT Estate',
    description: page?.metaDescription || 'GT Estates events, launches, and on-site experiences.',
  }
}

export default function EventsPage() {
  return <EventsPageClient />
}
