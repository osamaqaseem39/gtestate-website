'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'
import PageLoadAnimation from '@/components/PageLoadAnimation'
import SitePageFooter from '@/components/SitePageFooter'
import { fetchNewsArticles, resolveMediaUrl, type ApiNewsArticle } from '@/lib/api-public'

export default function BlogPageClient() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [articles, setArticles] = useState<ApiNewsArticle[]>([])

  useEffect(() => {
    const update = () => setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1024)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    fetchNewsArticles().then(setArticles)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      <PageLoadAnimation stagger>
        {isDesktop ? (
          <PageHero label="Insights" title="Our " titleAccent="Blog" description="Updates, market notes, and project news from GT Estates." />
        ) : (
          <MobilePageHero label="Insights" title="Our" titleAccent="Blog" description="Updates and news from GT Estates." />
        )}

        <section className="py-12 md:py-20">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-5xl mx-auto">
            {articles.length === 0 ? (
              <p className="text-white/60 text-center py-16">Blog posts will appear here once published from the dashboard.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articles.map((article) => {
                  const img = resolveMediaUrl(article.imageUrl || '')
                  return (
                    <Link key={article.id} href={`/blog/${article.slug}`} className="group border border-white/10 bg-white/[0.03] overflow-hidden hover:border-[#fabb22]/40 transition-colors">
                      {img && (
                        <div className="relative h-48">
                          <Image src={img} alt={article.title} fill className="object-cover" unoptimized />
                        </div>
                      )}
                      <div className="p-6">
                        <h2 className="text-lg font-semibold uppercase tracking-tight group-hover:text-[#fabb22] transition-colors">{article.title}</h2>
                        {article.excerpt && <p className="mt-2 text-sm text-white/65 line-clamp-3">{article.excerpt}</p>}
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        <SitePageFooter />
      </PageLoadAnimation>
    </main>
  )
}
