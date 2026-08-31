import { Metadata } from 'next'
import PaymentPlansPageClient from './PaymentPlansPageClient'
import { fetchPageBySlug } from '@/lib/api-public'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPageBySlug('payment-plans')
  return {
    title: page?.metaTitle || 'Payment Plans - GT Estate',
    description: page?.metaDescription || 'View payment plans for GT Estates projects.',
  }
}

export default function PaymentPlansPage() {
  return <PaymentPlansPageClient />
}
