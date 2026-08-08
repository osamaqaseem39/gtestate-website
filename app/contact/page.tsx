import { Metadata } from 'next'
import { Suspense } from 'react'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact Us - GT Estate',
  description: 'Get in touch with our team for personalized real estate assistance and support.',
}

export default function Contact() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-black" />}>
      <ContactPageClient />
    </Suspense>
  )
}
