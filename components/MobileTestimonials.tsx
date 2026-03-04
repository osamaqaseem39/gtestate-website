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
      className="bg-neutral-900 text-white px-4 py-12 sm:px-6"
      aria-label="Client testimonials"
    >
      <div>
        <h2 className="text-2xl font-bold uppercase tracking-tight">
          People who trust us
        </h2>
        <p className="mt-2 text-sm text-white/80">
          A few words from clients we&apos;ve partnered with on renovation and fit‑out projects.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {testimonials.map((t) => (
          <article
            key={t.id}
            className="rounded-2xl bg-white text-neutral-900 p-4 shadow-lg"
          >
            <p className="text-sm leading-relaxed text-neutral-700">{t.text}</p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-neutral-200">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-[11px] text-neutral-500">{t.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-4 w-4"
                    style={{
                      color: '#06B6D4',
                      fill: i <= t.rating ? '#06B6D4' : 'transparent',
                      stroke: '#06B6D4',
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

