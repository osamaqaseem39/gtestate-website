 'use client'

const CHOICE_ITEMS = [
  {
    label: 'Projects executed',
    value: '741+',
    detail: 'Turnkey renovations and fit‑out projects delivered.',
  },
  {
    label: 'Years of experience',
    value: '28+',
    detail: 'Hands-on industry experience across multiple sectors.',
  },
  {
    label: 'Professional engineers',
    value: '73+',
    detail: 'Specialists guiding every step from plan to handover.',
  },
]

export default function MobileChoiceSection() {
  return (
    <section
      className="bg-black text-white px-4 py-12 space-y-6 sm:px-6"
      aria-label="Why choose GT Estate numbers"
    >
      <div>
        <h2 className="text-2xl font-bold uppercase tracking-tight">
          Make your choice
        </h2>
        <p className="mt-2 text-sm text-white/80">
          A proven track record backed by experience, engineering strength, and on-time delivery.
        </p>
      </div>

      <div className="space-y-4">
        {CHOICE_ITEMS.map((item) => (
          <article
            key={item.label}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-4"
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                {item.label}
              </p>
              <p className="text-xl font-semibold text-teal">{item.value}</p>
            </div>
            <p className="mt-2 text-xs text-white/75">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

