import { Metadata } from 'next'
import { fetchPageBySlug } from '@/lib/api-public'
import ProjectsPageClient from './ProjectsPageClient'

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPageBySlug('projects')
  return {
    title: page?.metaTitle || 'Projects - GT Estate',
    description:
      page?.metaDescription || 'Browse our portfolio of premium real estate projects and developments.',
  }
}

export default function Projects() {
  return <ProjectsPageClient />
}
