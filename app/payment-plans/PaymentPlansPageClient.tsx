'use client'

import { useEffect, useState } from 'react'
import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'
import PageLoadAnimation from '@/components/PageLoadAnimation'
import SitePageFooter from '@/components/SitePageFooter'
import { fetchPaymentPlanTabs, resolveMediaUrl, type ApiPaymentPlanTab } from '@/lib/api-public'

export default function PaymentPlansPageClient() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [tabs, setTabs] = useState<ApiPaymentPlanTab[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const update = () => setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1024)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    fetchPaymentPlanTabs().then((data) => {
      setTabs(data)
      setActive(0)
    })
  }, [])

  const current = tabs[active]
  const currentImages = (current?.images || [])
    .map((img) => ({ src: resolveMediaUrl(img.url), alt: img.alt || current.title, title: img.title || '' }))
    .filter((img) => img.src)

  return (
    <main className="min-h-screen bg-black text-white">
      <PageLoadAnimation stagger>
        {isDesktop ? (
          <PageHero label="Invest with clarity" title="Payment " titleAccent="Plans" description="Compare installment schedules for our projects." />
        ) : (
          <MobilePageHero label="Invest with clarity" title="Payment" titleAccent="Plans" description="Installment schedules for our projects." />
        )}

        <section className="py-12 md:py-20">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-4xl mx-auto">
            {tabs.length === 0 ? (
              <p className="text-white/60 text-center py-16">Payment plan tabs will appear here once added from the dashboard.</p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
                  {tabs.map((tab, i) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActive(i)}
                      className={`px-4 py-2 text-sm uppercase tracking-wider transition-colors ${
                        i === active ? 'bg-[#fabb22] text-black' : 'text-white/70 hover:text-white border border-white/20'
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
                {current?.description && <p className="text-white/70 mb-6 text-sm">{current.description}</p>}
                {currentImages.length > 0 && (
                  <div className="space-y-4 mb-8">
                    {currentImages.map((img, i) => (
                      <a
                        key={`${img.src}-${i}`}
                        href={img.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border border-white/10 hover:border-[#fabb22]/50 transition-colors"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.src} alt={img.alt} className="block w-full h-auto" loading={i === 0 ? 'eager' : 'lazy'} />
                        {img.title && <p className="px-4 py-2 text-xs text-white/60">{img.title}</p>}
                      </a>
                    ))}
                  </div>
                )}
                {(current?.rows?.length ?? 0) > 0 && (
                <div className="overflow-x-auto border border-white/10">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <thead className="bg-white/5 text-white/60 uppercase tracking-wider text-xs">
                      <tr>
                        <th className="px-4 py-3">Label</th>
                        <th className="px-4 py-3">%</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Due</th>
                        <th className="px-4 py-3">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(current?.rows || []).map((row, i) => (
                        <tr key={i} className="border-t border-white/10">
                          <td className="px-4 py-3">{row.label || '—'}</td>
                          <td className="px-4 py-3">{row.percentage || '—'}</td>
                          <td className="px-4 py-3">{row.amount || '—'}</td>
                          <td className="px-4 py-3">{row.dueOn || '—'}</td>
                          <td className="px-4 py-3">{row.notes || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                )}
                {currentImages.length === 0 && (current?.rows?.length ?? 0) === 0 && (
                  <p className="text-white/50 text-sm">Details for this plan will be available soon.</p>
                )}
              </>
            )}
          </div>
        </section>

        <SitePageFooter />
      </PageLoadAnimation>
    </main>
  )
}
