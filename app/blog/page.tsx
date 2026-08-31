import { Metadata } from 'next'
import BlogPageClient from './BlogPageClient'
import { fetchPageBySlug } from '@/lib/api-public'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPageBySlug('blog')
  return {
    title: page?.metaTitle || 'Blog - GT Estate',
    description: page?.metaDescription || 'News and insights from GT Estates.',
  }
}

export default function BlogPage() {
  return <BlogPageClient />
}
