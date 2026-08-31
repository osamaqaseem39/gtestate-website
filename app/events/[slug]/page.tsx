import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import InquiryForm from '@/components/InquiryForm'
import ReachUsSection from '@/components/ReachUsSection'
import { fetchEventBySlug, resolveMediaUrl } from '@/lib/api-public'
import Image from 'next/image'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await fetchEventBySlug(slug)
  if (!event) return { title: 'Event - GT Estate' }
  return {
    title: event.metaTitle || `${event.title} - GT Estate`,
    description: event.metaDescription || '',
  }
}

function embedVideoUrl(url: string): string | null {
  if (!url) return null
  if (url.includes('youtube.com/watch')) {
    const id = new URL(url).searchParams.get('v')
    return id ? `https://www.youtube.com/embed/${id}` : null
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0]
    return id ? `https://www.youtube.com/embed/${id}` : null
  }
  return url
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params
  const event = await fetchEventBySlug(slug)
  if (!event) notFound()

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-32 pb-16 max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-tight mb-8" style={{ fontFamily: 'var(--font-spartan)' }}>
          {event.title}
        </h1>
        {event.description && (
          <div className="text-white/75 mb-10 [&>p]:mb-4" dangerouslySetInnerHTML={{ __html: event.description }} />
        )}
        {(event.images?.length ?? 0) > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {event.images!.map((img, i) => {
              const src = resolveMediaUrl(img.url)
              if (!src) return null
              return (
                <div key={i} className="relative aspect-[4/3] border border-white/10">
                  <Image src={src} alt={img.alt || event.title} title={img.title} fill className="object-cover" unoptimized />
                </div>
              )
            })}
          </div>
        )}
        {(event.videos?.length ?? 0) > 0 && (
          <div className="space-y-6">
            {event.videos!.map((vid, i) => {
              const embed = embedVideoUrl(vid.url)
              if (!embed) return null
              return (
                <div key={i} className="aspect-video border border-white/10">
                  <iframe src={embed} title={vid.title || `Video ${i + 1}`} className="w-full h-full" allowFullScreen />
                </div>
              )
            })}
          </div>
        )}
      </div>
      <ReachUsSection />
      <InquiryForm />
      <Footer />
    </main>
  )
}
