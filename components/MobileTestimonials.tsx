 'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Yazan Kharouf',
    role: 'Engineer',
    text: 'Exceptional professionalism and quality from start to finish. The team made every step clear and efficient.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 2,
    name: 'Ahmad Kim',
    role: 'Architect',
    text: 'They truly listened to our vision and brought it to life with precision and style.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
]

export default function MobileTestimonials() {
  return (
    <section
      className="bg-black text-white px-4 py-12 sm:px-6 md:py-16"
      aria-label="Client testimonials"
    >
      <div>
        <h2
          className="text-2xl font-bold uppercase tracking-tight text-white"
          style={{ fontFamily: 'var(--font-spartan)' }}
        >
          People Who Trust
          <span className="block text-cyan-400 mt-1 text-xl">GT Estate</span>
        </h2>
        <p className="mt-3 text-sm text-white/75">
          A few words from clients we&apos;ve partnered with on renovation and fit‑out projects.
        </p>
      </div>

      <div className="mt-6 space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
        {testimonials.map((t) => (
          <article
            key={t.id}
            className="rounded-2xl bg-black/75 border border-white/10 text-white p-4 shadow-lg backdrop-blur-sm"
          >
            <p className="text-sm leading-relaxed text-white/75">{t.text}</p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-neutral-800">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-[11px] text-white/60">{t.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-4 w-4"
                    style={{
                      color: '#fabb22',
                      fill: i <= t.rating ? '#fabb22' : 'transparent',
                      stroke: '#fabb22',
                    }}
                  />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

