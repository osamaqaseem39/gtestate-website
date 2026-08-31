import { Metadata } from 'next'
import { Suspense } from 'react'
import { fetchSiteContent } from '@/lib/api-public'
import ContactPageClient from './ContactPageClient'

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchSiteContent('contact')
  return {
    title: content.metaTitle || 'Contact Us - GT Estate',
    description:
      content.metaDescription || 'Get in touch with our team for personalized real estate assistance and support.',
  }
}

export default function Contact() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-black" />}>
      <ContactPageClient />
    </Suspense>
  )
}
