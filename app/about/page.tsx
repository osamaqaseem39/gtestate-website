import { Metadata } from 'next'
import { fetchPageBySlug } from '@/lib/api-public'
import AboutPageClient from './AboutPageClient'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPageBySlug('about')
  return {
    title: page?.metaTitle || 'About Us - GT Estate',
    description:
      page?.metaDescription ||
      'Learn about our mission to revolutionize real estate with cutting-edge technology and exceptional service.',
  }
}

export default function About() {
  return <AboutPageClient />
}
