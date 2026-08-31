import { Metadata } from 'next'
import { fetchPageBySlug } from '@/lib/api-public'
import WhatWeDoPageClient from './WhatWeDoPageClient'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPageBySlug('what-we-do')
  return {
    title: page?.metaTitle || 'What We Do - GT Estate',
    description:
      page?.metaDescription ||
      'Discover our comprehensive real estate services including AI-powered matching, virtual tours, and smart home integration.',
  }
}

export default function WhatWeDo() {
  return <WhatWeDoPageClient />
}
