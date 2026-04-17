'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { MapPin, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  API_BASE_URL,
  fetchProperties,
  fetchFeaturedProperties,
  resolveMediaUrl,
  type ApiProperty,
} from '@/lib/api-public'

type ProjectCard = {
  id: string
  title: string
  location: string
  marla: string
  image: string
}

const FALLBACK_PROJECTS: ProjectCard[] = [
  {
    id: '1',
    title: 'Sialkot — 5 Marla Residential',
    location: 'Etihad Town Sialkot',
    marla: '5 Marla · Residential',
    image: '/house-1.jpeg',
  },
  {
    id: '2',
    title: 'Sialkot — 5.33 Marla Commercial',
    location: 'Etihad Town Sialkot',
    marla: '5.33 Marla · Commercial',
    image: '/house-2.jpeg',
  },
  {
    id: '3',
    title: 'Lahore Phase 3 — 2.66 Marla Commercial',
    location: 'Etihad Town Phase 3, Lahore',
    marla: '2.66 Marla · Commercial',
    image: '/house-3.jpeg',
  },
  {
    id: '4',
    title: 'Lahore Phase 3 — 13.33 Marla Commercial',
    location: 'Etihad Town Phase 3, Lahore',
    marla: '13.33 Marla · Commercial',
    image: '/house-4.jpeg',
  },
]

function mapApiProperty(p: ApiProperty): ProjectCard {
  const img = resolveMediaUrl(p.primaryImage || '')
  return {
    id: p._id,
    title: p.title,
    location: p.location,
    marla: p.marla,
    image: img || '/house-1.jpeg',
  }
}

type FeaturedPropertiesProps = {
  /** Fetch only featured items (default) or all properties. */
  featuredOnly?: boolean
}

export default function FeaturedProperties({ featuredOnly = true }: FeaturedPropertiesProps) {
  const [projects, setProjects] = useState<ProjectCard[]>(FALLBACK_PROJECTS)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (!API_BASE_URL) return
    let cancelled = false
    void (async () => {
      try {
        const api = featuredOnly ? await fetchFeaturedProperties() : await fetchProperties()
        if (cancelled || !api.length) return
        setProjects(api.map(mapApiProperty))
      } catch {
        /* keep fallback */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [featuredOnly])

  return (
    <section
      ref={ref}
      className="relative bg-black text-white overflow-hidden"
      aria-label="Featured projects"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          opacity: 0.06,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-14 md:mb-18"
        >
          <p className="text-[11px] md:text-xs font-semibold text-neon-green tracking-[0.35em] uppercase mb-3">
            Our projects
          </p>
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-3">
            Plots &amp; opportunities
          </h2>
          <p className="mt-1 text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Residential and commercial plots in Etihad Town Sialkot and Etihad Town Phase 3 Lahore — curated for
            location and investment value.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group h-full"
              >
                <article className="relative h-full flex flex-col bg-black/85 backdrop-blur-md border border-white/10 rounded-none md:rounded-[18px] shadow-[0_32px_80px_rgba(0,0,0,0.9)] overflow-hidden">
                  <div className="relative h-52 md:h-56 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized={project.image.startsWith('http')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-neon-green text-black text-[11px] font-semibold tracking-[0.18em] uppercase">
                      {project.marla}
                    </span>
                  </div>
                  <div className="px-5 md:px-6 pt-5 pb-6 flex-1 flex flex-col">
                    <h3 className="text-lg md:text-xl font-semibold uppercase tracking-tight mb-2 group-hover:text-neon-green transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-white/60 mb-4 text-xs md:text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-neon-green shrink-0" />
                      <span>{project.location}</span>
                    </div>
                    <div className="mt-auto pt-2">
                      <motion.span className="btn-hero-group w-full block" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link href="/contact" className="btn-hero w-full">
                          <span>Inquire</span>
                          <ArrowRight className="h-4 w-4 text-black" />
                        </Link>
                      </motion.span>
                    </div>
                  </div>
                </article>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-10 md:mt-12"
        >
          <motion.span className="btn-hero-group" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/contact" className="btn-hero">
              Contact for details
            </Link>
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}
