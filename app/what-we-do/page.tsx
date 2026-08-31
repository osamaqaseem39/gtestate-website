import { Metadata } from 'next'
import { fetchSiteContent } from '@/lib/api-public'
import WhatWeDoPageClient from './WhatWeDoPageClient'

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchSiteContent('what-we-do')
  return {
    title: content.metaTitle || 'What We Do - GT Estate',
    description:
      content.metaDescription ||
      'Discover our comprehensive real estate services including AI-powered matching, virtual tours, and smart home integration.',
  }
}

export default function WhatWeDo() {
  return <WhatWeDoPageClient />
}
