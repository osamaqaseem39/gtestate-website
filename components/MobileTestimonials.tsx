 'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'GT Estates Client',
    role: 'Investor',
    text: 'GT Estates made my investment journey smooth and completely stress-free. Their guidance was honest, clear, and truly professional from start to finish.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 2,
    name: 'GT Estates Client',
    role: 'Investor',
    text: 'I was impressed by their transparency and market knowledge. They helped me make the right decision with full confidence.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 3,
    name: 'GT Estates Client',
    role: 'Investor',
    text: 'Exceptional service and attention to detail. GT Estates understands client needs and delivers beyond expectations every time.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 4,
    name: 'GT Estates Client',
    role: 'Investor',
    text: 'A trustworthy team that values long-term relationships. Their professionalism really sets them apart in the real estate market.',
    image:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 5,
    name: 'GT Estates Client',
    role: 'Investor',
    text: 'The entire process was handled with great care and efficiency. Highly recommended for anyone looking for reliable property consultation.',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 6,
    name: 'GT Estates Client',
    role: 'Investor',
    text: 'GT Estates provided me with expert advice and honest insights, making my investment secure and worthwhile.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 7,
    name: 'GT Estates Client',
    role: 'Investor',
    text: 'From consultation to final deal, everything was seamless. Their commitment to quality service is truly remarkable.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 8,
    name: 'GT Estates Client',
    role: 'Investor',
    text: 'I appreciate their client-first approach and transparent dealings. It’s rare to find such dedication and integrity.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 9,
    name: 'GT Estates Client',
    role: 'Investor',
    text: 'A premium experience with a professional team. They made real estate investment simple and rewarding for me.',
    image:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 10,
    name: 'GT Estates Client',
    role: 'Investor',
    text: 'Highly satisfied with their services. GT Estates delivers trust, expertise, and long-term value in every interaction.',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
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
          What Clients Say
          <span className="block text-cyan-400 mt-1 text-xl">GT Estates</span>
        </h2>
        <p className="mt-3 text-sm text-white/75">
          A few words from clients we&apos;ve partnered with on residential and commercial plot investments.
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

