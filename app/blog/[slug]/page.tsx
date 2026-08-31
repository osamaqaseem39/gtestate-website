import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import InquiryForm from '@/components/InquiryForm'
import ReachUsSection from '@/components/ReachUsSection'
import { fetchNewsBySlug, resolveMediaUrl } from '@/lib/api-public'
import Image from 'next/image'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await fetchNewsBySlug(slug)
  if (!article) return { title: 'Article - GT Estate' }
  return {
    title: article.metaTitle || `${article.title} - GT Estate`,
    description: article.metaDescription || article.excerpt || '',
  }
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = await fetchNewsBySlug(slug)
  if (!article) notFound()

  const img = resolveMediaUrl(article.imageUrl || '')

  return (
    <main className="min-h-screen bg-black text-white">
      <article className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-32 pb-16 max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-tight mb-6" style={{ fontFamily: 'var(--font-spartan)' }}>
          {article.title}
        </h1>
        {img && (
          <div className="relative aspect-[16/9] mb-8 border border-white/10">
            <Image src={img} alt={article.title} fill className="object-cover" unoptimized priority />
          </div>
        )}
        <div
          className="prose-invert max-w-none text-white/75 [&>p]:mb-4 [&>h2]:mt-8 [&>h2]:text-xl [&>h2]:font-semibold"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
      <ReachUsSection />
      <InquiryForm />
      <Footer />
    </main>
  )
}
