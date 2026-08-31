'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import InquiryForm from '@/components/InquiryForm'
import ReachUsSection from '@/components/ReachUsSection'
import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'
import PageLoadAnimation from '@/components/PageLoadAnimation'
import Link from 'next/link'
import Image from 'next/image'
import { fetchTeamMembers, resolveMediaUrl } from '@/lib/api-public'

/** Add photos as public/team/nasir.jpg and public/team/usman.jpg — recommended 800×1000px (4:5) or 800×800px square, JPG/WebP, under ~500KB each. */
const FALLBACK_LEADERSHIP = [
  {
    name: 'Sir Nasir Sahib',
    role: 'Leadership',
    image: '/team/nasir.jpg',
    area: 'Strategic direction & investment oversight',
  },
  {
    name: 'Sir Usman Sahib',
    role: 'Leadership',
    image: '/team/usman.jpg',
    area: 'Operations & business growth',
  },
] as const

type TeamCardMember = {
  name: string
  role: string
  image: string
  area: string
}

export default function TeamPageClient() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [members, setMembers] = useState<TeamCardMember[]>([])

  useEffect(() => {
    const update = () => {
      if (typeof window === 'undefined') return
      setIsDesktop(window.innerWidth >= 1024)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    let cancelled = false
    fetchTeamMembers()
      .then((data) => {
        if (cancelled) return
        const mapped: TeamCardMember[] = data.map((m) => ({
          name: m.name,
          role: m.designation,
          image: m.imageUrl ? resolveMediaUrl(m.imageUrl) : '',
          area: m.bio?.trim() ? m.bio.trim() : '',
        }))
        setMembers(mapped)
      })
      .catch(() => {
        if (!cancelled) setMembers([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  const LEADERSHIP: TeamCardMember[] =
    members.length > 0 ? members : FALLBACK_LEADERSHIP.map((m) => ({ ...m }))

  return (
    <main className="min-h-screen bg-black">
      <PageLoadAnimation stagger>
        {isDesktop ? (
          <PageHero
            label="Our People"
            title="Meet "
            titleAccent="Leadership"
            description="The vision and leadership behind GT Estates — guiding clients with integrity and market expertise."
          />
        ) : (
          <MobilePageHero
            label="Our people"
            title="Meet"
            titleAccent="leadership"
            description="The leadership team guiding GT Estates and your investments."
          />
        )}

        <section className="relative bg-black text-white">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">
              <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.35em] text-white/60 mb-10">
                Leadership
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                {LEADERSHIP.map((member, index) => (
                  <article
                    key={`${member.name}-${index}`}
                    className="flex flex-col border border-white/10 bg-white/5 overflow-hidden hover:border-amber-400/40 transition-colors"
                  >
                    <div className="relative aspect-[4/5] w-full bg-zinc-800">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      ) : null}
                    </div>
                    <div className="p-6 space-y-2">
                      <h3
                        className="text-xl font-semibold text-white uppercase tracking-tight"
                        style={{ fontFamily: 'var(--font-spartan)' }}
                      >
                        {member.name}
                      </h3>
                      <p className="text-amber-400 text-sm font-medium uppercase tracking-wider">{member.role}</p>
                      {member.area ? (
                        <p className="text-white/60 text-sm leading-relaxed">{member.area}</p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="text-center mt-16">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-black font-semibold uppercase tracking-wider hover:bg-amber-300 transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </section>

        <ReachUsSection />
        <InquiryForm />
        <Footer />
      </PageLoadAnimation>
    </main>
  )
}
