import { Metadata } from 'next'
import { fetchSiteContent } from '@/lib/api-public'
import TermsPageClient from './TermsPageClient'

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchSiteContent('terms')
  return {
    title: content.metaTitle || 'Terms & Conditions | GT Estate',
    description:
      content.metaDescription ||
      "Read the terms and conditions for using GT Estate's services and website.",
  }
}

export default function TermsPage() {
  return <TermsPageClient />
}
