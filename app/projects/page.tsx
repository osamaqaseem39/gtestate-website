import { Metadata } from 'next'
import { fetchSiteContent } from '@/lib/api-public'
import ProjectsPageClient from './ProjectsPageClient'

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchSiteContent('projects')
  return {
    title: content.metaTitle || 'Projects - GT Estate',
    description:
      content.metaDescription || 'Browse our portfolio of premium real estate projects and developments.',
  }
}

export default function Projects() {
  return <ProjectsPageClient />
}
