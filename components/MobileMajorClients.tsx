 'use client'

import Image from 'next/image'

const CLIENTS = [
  'Al Forsan International Sports Resort',
  'Yas Asset Management',
  'Department of Culture & Tourism',
  'Abu Dhabi Airports',
]

export default function MobileMajorClients() {
  return (
    <section
      className="bg-black text-white px-4 py-12 space-y-8 sm:px-6"
      aria-label="Major clients"
    >
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-teal">
          Major clients
        </p>
        <h2 className="mt-2 text-2xl font-bold uppercase tracking-tight">
          Trusted partners
        </h2>
        <p className="mt-3 text-sm text-white/80">
          We collaborate with leading brands and institutions across the region.
        </p>
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-white/5">
        <Image
          src="/house-1.jpeg"
          alt="Project highlight"
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="absolute inset-x-4 bottom-4 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
            Al Forsan
          </p>
          <p className="text-sm text-white/90">
            International sports resort and hospitality development.
          </p>
        </div>
      </div>

      <ul className="space-y-2 text-xs text-white/75">
        {CLIENTS.map((name) => (
          <li
            key={name}
            className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2"
          >
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-teal" />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

