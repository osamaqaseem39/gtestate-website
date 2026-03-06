'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const CLIENTS = [
  'FARAH Experiences',
  'Yas Asset Management',
  'Department of Culture and Tourism',
  'AL FORSAN International Sports Resort',
  'MIRAL',
  'Healthpoint',
  'ABU DHABI AIRPORTS',
]

export default function MobileMajorClients() {
  return (
    <section
      className="bg-black text-white px-4 py-12 space-y-8 sm:px-6 md:py-16"
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

      <div className="relative mt-2 overflow-hidden">
        <motion.div
          className="flex gap-4 whitespace-nowrap"
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{
            ease: 'linear',
            duration: 25,
            repeat: Infinity,
          }}
        >
          {[...CLIENTS, ...CLIENTS].map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-white/70 flex-shrink-0"
            >
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-teal" />
              <span>{name}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

