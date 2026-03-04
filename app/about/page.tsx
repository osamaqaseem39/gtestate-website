import { Metadata } from 'next'
import AboutPageClient from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About Us - GT Estate',
  description:
    'Learn about our mission to revolutionize real estate with cutting-edge technology and exceptional service.',
}

export default function About() {
  return <AboutPageClient />
}
