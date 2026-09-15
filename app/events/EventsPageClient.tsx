'use client'

import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'
import PageLoadAnimation from '@/components/PageLoadAnimation'
import SitePageFooter from '@/components/SitePageFooter'
import { fetchEvents, resolveMediaUrl, type ApiEvent } from '@/lib/api-public'

/** YouTube watch/short links → embed URL; null for direct video files (rendered with <video>). */
function youTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')
    if (host === 'youtu.be') return `https://www.youtube.com/embed/${u.pathname.slice(1)}`
    if (host.endsWith('youtube.com')) {
      if (u.pathname.startsWith('/embed/')) return url
      const id = u.searchParams.get('v') || u.pathname.match(/^\/shorts\/([^/]+)/)?.[1]
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
  } catch {
    /* relative path — a direct upload */
  }
  return null
}

type Lightbox = { images: { src: string; alt: string }[]; index: number }

function EventLightbox({ lightbox, onClose, onNavigate }: {
  lightbox: Lightbox
  onClose: () => void
  onNavigate: (index: number) => void
}) {
  const { images, index } = lightbox
  const count = images.length

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((index + 1) % count)
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + count) % count)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, count, onClose, onNavigate])

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4" onClick={onClose} role="dialog" aria-modal="true">
      <button type="button" onClick={onClose} className="absolute right-4 top-4 p-2 text-white/80 hover:text-white" aria-label="Close">
        <X className="h-7 w-7" />
      </button>
      {count > 1 && (
        <>
          <button type="button" onClick={(e) => { e.stopPropagation(); onNavigate((index - 1 + count) % count) }} className="absolute left-2 md:left-6 p-2 text-white/70 hover:text-white" aria-label="Previous image">
            <ChevronLeft className="h-9 w-9" />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); onNavigate((index + 1) % count) }} className="absolute right-2 md:right-6 p-2 text-white/70 hover:text-white" aria-label="Next image">
            <ChevronRight className="h-9 w-9" />
          </button>
        </>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[index].src}
        alt={images[index].alt}
        className="max-h-[88vh] max-w-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <p className="absolute bottom-4 text-xs text-white/60">{index + 1} / {count}</p>
    </div>
  )
}

export default function EventsPageClient() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [events, setEvents] = useState<ApiEvent[]>([])
  const [loaded, setLoaded] = useState(false)
  const [lightbox, setLightbox] = useState<Lightbox | null>(null)

  useEffect(() => {
    const update = () => setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1024)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .finally(() => setLoaded(true))
  }, [])

  // Old /events/[slug] links redirect to /events#slug; jump there once the list has rendered.
  useEffect(() => {
    if (!loaded || !window.location.hash) return
    document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' })
  }, [loaded])

  const closeLightbox = useCallback(() => setLightbox(null), [])
  const navigateLightbox = useCallback((index: number) => setLightbox((lb) => (lb ? { ...lb, index } : lb)), [])

  return (
    <main className="min-h-screen bg-black text-white">
      <PageLoadAnimation stagger>
        {isDesktop ? (
          <PageHero label="Experiences" title="Our " titleAccent="Events" description="Launches, site visits, and community moments from GT Estates." />
        ) : (
          <MobilePageHero label="Experiences" title="Our" titleAccent="Events" description="Launches and site visits from GT Estates." />
        )}

        <section className="py-12 md:py-20">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-6xl mx-auto">
            {loaded && events.length === 0 ? (
              <p className="text-white/60 text-center py-16">Events will appear here once added from the dashboard.</p>
            ) : (
              <div className="space-y-20 md:space-y-28">
                {events.map((event) => {
                  const images = (event.images || [])
                    .map((img) => ({ src: resolveMediaUrl(img.url), alt: img.alt || img.title || event.title }))
                    .filter((img) => img.src)
                  const videos = (event.videos || []).filter((v) => v.url)
                  return (
                    <article key={event.id} id={event.slug} className="scroll-mt-28">
                      <h2
                        className="text-2xl md:text-4xl font-bold uppercase tracking-tight mb-5"
                        style={{ fontFamily: 'var(--font-spartan)' }}
                      >
                        {event.title}
                      </h2>
                      {event.description && (
                        <div
                          className="max-w-3xl text-white/75 leading-relaxed mb-8 [&>p]:mb-4 [&_a]:text-[#fabb22] [&_a]:underline"
                          dangerouslySetInnerHTML={{ __html: event.description }}
                        />
                      )}

                      {images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                          {images.map((img, i) => (
                            <button
                              key={`${img.src}-${i}`}
                              type="button"
                              onClick={() => setLightbox({ images, index: i })}
                              className="group relative aspect-[4/3] overflow-hidden border border-white/10 focus:outline-none focus-visible:border-[#fabb22]"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </button>
                          ))}
                        </div>
                      )}

                      {videos.length > 0 && (
                        <div className={`grid grid-cols-1 ${videos.length > 1 ? 'md:grid-cols-2' : ''} gap-4 mt-4`}>
                          {videos.map((video, i) => {
                            const embed = youTubeEmbedUrl(video.url)
                            return (
                              <figure key={`${video.url}-${i}`}>
                                <div className="aspect-video border border-white/10 bg-white/5">
                                  {embed ? (
                                    <iframe
                                      src={embed}
                                      title={video.title || `${event.title} video ${i + 1}`}
                                      className="h-full w-full"
                                      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                      loading="lazy"
                                    />
                                  ) : (
                                    <video src={resolveMediaUrl(video.url)} controls preload="metadata" className="h-full w-full bg-black" />
                                  )}
                                </div>
                                {video.title && <figcaption className="mt-2 text-sm text-white/60">{video.title}</figcaption>}
                              </figure>
                            )
                          })}
                        </div>
                      )}
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        <SitePageFooter />
      </PageLoadAnimation>

      {lightbox && <EventLightbox lightbox={lightbox} onClose={closeLightbox} onNavigate={navigateLightbox} />}
    </main>
  )
}
