import { Metadata } from 'next'
import ProjectsPageClient from './ProjectsPageClient'

export const metadata: Metadata = {
  title: 'Projects - GT Estate',
  description: 'Browse our portfolio of premium real estate projects and developments.',
}

export default function Projects() {
  return <ProjectsPageClient />
}
