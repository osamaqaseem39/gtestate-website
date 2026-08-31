import { Metadata } from 'next'
import { Suspense } from 'react'
import { fetchPageBySlug } from '@/lib/api-public'
import ContactPageClient from './ContactPageClient'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPageBySlug('contact')
  return {
    title: page?.metaTitle || 'Contact Us - GT Estate',
    description:
      page?.metaDescription || 'Get in touch with our team for personalized real estate assistance and support.',
  }
}

export default function Contact() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-black" />}>
      <ContactPageClient />
    </Suspense>
  )
}
