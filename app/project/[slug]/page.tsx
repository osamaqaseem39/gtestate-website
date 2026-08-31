import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchPropertyBySlug, fetchPropertyById } from '@/lib/api-public'
import ProjectDetailPageClient from '@/components/ProjectDetailPageClient'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const property = (await fetchPropertyBySlug(slug)) || (await fetchPropertyById(slug))
  if (!property) return { title: 'Project Not Found - GT Estate' }
  const description =
    property.description?.trim() ||
    `${property.title} in ${property.location} — ${property.marla}. Inquire with GT Estates.`
  return {
    title: `${property.title} - GT Estate`,
    description: description.slice(0, 160),
  }
}

export default async function ProjectBySlugPage({ params }: PageProps) {
  const { slug } = await params
  const property = (await fetchPropertyBySlug(slug)) || (await fetchPropertyById(slug))
  if (!property) notFound()
  return <ProjectDetailPageClient property={property} />
}
