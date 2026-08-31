import { Metadata } from 'next'
import PmLoanSchemePageClient from './PmLoanSchemePageClient'
import { fetchPageBySlug } from '@/lib/api-public'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPageBySlug('pm-loan-scheme')
  return {
    title: page?.metaTitle || 'PM Loan Scheme - GT Estate',
    description: page?.metaDescription || 'Apply for the Prime Minister housing loan scheme through GT Estates.',
  }
}

export default function PmLoanSchemePage() {
  return <PmLoanSchemePageClient />
}
