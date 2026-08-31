'use client'

import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'
import PageLoadAnimation from '@/components/PageLoadAnimation'
import PmLoanSchemeForm from '@/components/PmLoanSchemeForm'
import SitePageFooter from '@/components/SitePageFooter'
import { useEffect, useState } from 'react'

export default function PmLoanSchemePageClient() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const update = () => setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1024)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      <PageLoadAnimation stagger>
        {isDesktop ? (
          <PageHero
            label="Housing finance"
            title="PM "
            titleAccent="Loan Scheme"
            description="Apply for the Prime Minister housing loan program. Our team will guide you through eligibility and documentation."
          />
        ) : (
          <MobilePageHero
            label="Housing finance"
            title="PM"
            titleAccent="Loan Scheme"
            description="Apply for the Prime Minister housing loan program with GT Estates."
          />
        )}

        <section className="py-12 md:py-20">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-4xl mx-auto">
            <PmLoanSchemeForm />
          </div>
        </section>

        <SitePageFooter />
      </PageLoadAnimation>
    </main>
  )
}
