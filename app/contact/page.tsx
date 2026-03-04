import { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact Us - GT Estate',
  description: 'Get in touch with our team for personalized real estate assistance and support.',
}

export default function Contact() {
  return <ContactPageClient />
}
