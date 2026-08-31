import { Metadata } from 'next'
import { fetchSiteContent } from '@/lib/api-public'
import AboutPageClient from './AboutPageClient'

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchSiteContent('about')
  return {
    title: content.metaTitle || 'About Us - GT Estate',
    description:
      content.metaDescription ||
      'Learn about our mission to revolutionize real estate with cutting-edge technology and exceptional service.',
  }
}

export default function About() {
  return <AboutPageClient />
}
