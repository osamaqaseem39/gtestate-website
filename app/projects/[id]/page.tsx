import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { fetchPropertyById } from '@/lib/api-public'
import ProjectDetailPageClient from '@/components/ProjectDetailPageClient'

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const property = await fetchPropertyById(id)
  if (!property) return { title: 'Project Not Found - GT Estate' }
  return {
    title: `${property.title} - GT Estate`,
    description: (property.description || `${property.title} — ${property.marla}`).slice(0, 160),
  }
}

export default async function LegacyProjectPage({ params }: PageProps) {
  const { id } = await params
  const property = await fetchPropertyById(id)
  if (!property) notFound()
  if (property.slug) redirect(`/project/${property.slug}`)
  return <ProjectDetailPageClient property={property} />
}
