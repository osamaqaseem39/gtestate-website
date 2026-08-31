import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SitePageFooter from '@/components/SitePageFooter'
import { fetchPageBySlug } from '@/lib/api-public'

const SLUG = 'privacy-policy'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPageBySlug(SLUG)
  return {
    title: page?.metaTitle || page?.title || 'Privacy Policy - GT Estate',
    description: page?.metaDescription || 'GT Estate privacy policy.',
    keywords: page?.metaKeywords ? page.metaKeywords.split(',').map((k) => k.trim()) : undefined,
  }
}

export default async function PrivacyPolicyPage() {
  const page = await fetchPageBySlug(SLUG)

  if (!page || !page.published) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-2xl md:text-4xl font-bold uppercase tracking-tight mb-8"
            style={{ fontFamily: 'var(--font-spartan)' }}
          >
            {page.title}
          </h1>
          <div
            className="max-w-none text-sm md:text-base leading-relaxed text-white/75 [&>h2]:mt-8 [&>h2]:mb-3 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-white [&>h3]:mt-6 [&>h3]:mb-2 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-white [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&_a]:text-amber-400 [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
      <SitePageFooter />
    </main>
  )
}
