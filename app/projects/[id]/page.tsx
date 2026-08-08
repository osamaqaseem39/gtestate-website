import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchPropertyById } from '@/lib/api-public'
import ProjectDetailPageClient from './ProjectDetailPageClient'

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const property = await fetchPropertyById(id)
  if (!property) {
    return { title: 'Project Not Found - GT Estate' }
  }
  const description =
    property.description?.trim() ||
    `${property.title} in ${property.location} — ${property.marla}. Inquire with GT Estates.`
  return {
    title: `${property.title} - GT Estate`,
    description: description.slice(0, 160),
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params
  const property = await fetchPropertyById(id)
  if (!property) notFound()
  return <ProjectDetailPageClient property={property} />
}
