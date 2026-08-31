'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'
import PageLoadAnimation from '@/components/PageLoadAnimation'
import SitePageFooter from '@/components/SitePageFooter'
import { fetchEvents, resolveMediaUrl, type ApiEvent } from '@/lib/api-public'

export default function EventsPageClient() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [events, setEvents] = useState<ApiEvent[]>([])

  useEffect(() => {
    const update = () => setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1024)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    fetchEvents().then(setEvents)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      <PageLoadAnimation stagger>
        {isDesktop ? (
          <PageHero label="Experiences" title="Our " titleAccent="Events" description="Launches, site visits, and community moments from GT Estates." />
        ) : (
          <MobilePageHero label="Experiences" title="Our" titleAccent="Events" description="Launches and site visits from GT Estates." />
        )}

        <section className="py-12 md:py-20">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-5xl mx-auto space-y-8">
            {events.length === 0 ? (
              <p className="text-white/60 text-center py-16">Events will appear here once added from the dashboard.</p>
            ) : (
              events.map((event) => {
                const cover = event.images?.[0]?.url ? resolveMediaUrl(event.images[0].url) : ''
                return (
                  <Link key={event.id} href={`/events/${event.slug}`} className="flex flex-col md:flex-row gap-6 border border-white/10 p-4 md:p-6 hover:border-[#fabb22]/40 transition-colors">
                    {cover && (
                      <div className="relative w-full md:w-64 h-48 shrink-0">
                        <Image src={cover} alt={event.images?.[0]?.alt || event.title} fill className="object-cover" unoptimized />
                      </div>
                    )}
                    <div>
                      <h2 className="text-xl font-semibold uppercase tracking-tight">{event.title}</h2>
                      {event.description && (
                        <p className="mt-2 text-sm text-white/65 line-clamp-3">{event.description.replace(/<[^>]+>/g, ' ')}</p>
                      )}
                    </div>
                  </Link>
                )
              })
            )}
          </div>
        </section>

        <SitePageFooter />
      </PageLoadAnimation>
    </main>
  )
}
