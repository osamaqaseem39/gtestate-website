'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import InquiryForm from '@/components/InquiryForm'
import { fetchSiteContent } from '@/lib/api-public'

const FALLBACK_BODY =
  'Our terms and conditions are being finalized. Please contact us directly with any questions about using our services.'

export default function TermsPageClient() {
  const [body, setBody] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchSiteContent('terms').then((content) => {
      if (!cancelled) {
        setBody(content.body)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative bg-black text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-24 md:py-32">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.35em] text-white/60 mb-4">
              Legal
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-10" style={{ fontFamily: 'var(--font-spartan)' }}>
              Terms & Conditions
            </h1>
            {!loading && (
              <div className="whitespace-pre-wrap text-white/80 text-sm md:text-base leading-relaxed">
                {body?.trim() ? body : FALLBACK_BODY}
              </div>
            )}
          </div>
        </div>
      </section>
      <InquiryForm />
      <Footer />
    </main>
  )
}
