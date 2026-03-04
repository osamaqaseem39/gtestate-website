import { Metadata } from 'next'
import PropertiesPageClient from './PropertiesPageClient'

export const metadata: Metadata = {
  title: 'Properties - GT Estate',
  description:
    'Browse our extensive collection of premium properties with AI-powered search and virtual tours.',
}

export default function Properties() {
  return <PropertiesPageClient />
}

