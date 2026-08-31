import { Metadata } from 'next'
import { fetchSiteContent } from '@/lib/api-public'
import PrivacyPageClient from './PrivacyPageClient'

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchSiteContent('privacy')
  return {
    title: content.metaTitle || 'Privacy Policy | GT Estate',
    description:
      content.metaDescription ||
      "Read GT Estate's privacy policy covering how we collect, use, and protect your information.",
  }
}

export default function PrivacyPage() {
  return <PrivacyPageClient />
}
