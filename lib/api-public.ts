export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'https://estate-server-nine.vercel.app'
).replace(/\/$/, '')

export const MEDIA_BASE_URL = (
  process.env.NEXT_PUBLIC_MEDIA_URL || 'https://gt.osamaqaseem.online'
).replace(/\/$/, '')

export function resolveMediaUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return ''
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl
  if (!MEDIA_BASE_URL) return pathOrUrl
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${MEDIA_BASE_URL}${path}`
}

export type ApiProperty = {
  _id: string
  title: string
  location: string
  marla: string
  primaryImage?: string
  featured?: boolean
  description?: string
  status?: string
  type?: string
  price?: number | null
  gallery?: string[]
  sortOrder?: number
}

export type ApiGalleryItem = {
  _id: string
  imageUrl: string
  alt: string
  shape: 'portrait' | 'landscape' | 'square'
  display: 'grid' | 'full-original'
  category?: string
}

export async function fetchFeaturedProperties(): Promise<ApiProperty[]> {
  return fetchProperties({ featured: true })
}

export async function fetchProperties(options?: { featured?: boolean }): Promise<ApiProperty[]> {
  if (!API_BASE_URL) return []
  const query = new URLSearchParams()
  if (typeof options?.featured === 'boolean') {
    query.set('featured', String(options.featured))
  }
  const queryString = query.toString()
  const res = await fetch(`${API_BASE_URL}/properties${queryString ? `?${queryString}` : ''}`)
  if (!res.ok) return []
  const data = (await res.json()) as ApiProperty[]
  return Array.isArray(data) ? data : []
}

export async function fetchPropertyById(id: string): Promise<ApiProperty | null> {
  if (!API_BASE_URL || !id) return null
  const res = await fetch(`${API_BASE_URL}/properties/${encodeURIComponent(id)}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) return null
  const data = (await res.json()) as ApiProperty
  return data?._id ? data : null
}

export async function fetchGalleryItems(): Promise<ApiGalleryItem[]> {
  if (!API_BASE_URL) return []
  const res = await fetch(`${API_BASE_URL}/gallery`)
  if (!res.ok) return []
  const data = (await res.json()) as ApiGalleryItem[]
  return Array.isArray(data) ? data : []
}

export type ApiReview = {
  id: string
  name: string
  role?: string
  image?: string
  rating: number
  text: string
  published?: boolean
}

export type ApiTeamMember = {
  id: string
  name: string
  designation: string
  image?: string
  bio?: string
  published?: boolean
}

export type ApiWhatWeDoContent = {
  missionTitle: string
  missionBody: string
  visionTitle: string
  visionBody: string
  qualitiesTitle: string
  qualitiesBody: string
  projectsTitle: string
  projectsBody: string
  services: string[]
  quote: string
  ctaHeading: string
  ctaBody: string
}

export type ApiPage = {
  id: string
  slug: string
  title: string
  content: string
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
  published?: boolean
}

/** Normalizes Mongoose-style `_id` or Prisma-style `id` into `id`, whichever the backend returns. */
function withId<T extends { id?: string; _id?: string }>(row: T): T & { id: string } {
  return { ...row, id: row.id ?? row._id ?? '' }
}

export async function fetchTestimonials(): Promise<ApiReview[]> {
  if (!API_BASE_URL) return []
  const res = await fetch(`${API_BASE_URL}/reviews?published=true`, { next: { revalidate: 60 } })
  if (!res.ok) return []
  const data = (await res.json()) as ApiReview[]
  return Array.isArray(data) ? data.map(withId) : []
}

export async function fetchTeamMembers(): Promise<ApiTeamMember[]> {
  if (!API_BASE_URL) return []
  const res = await fetch(`${API_BASE_URL}/team?published=true`, { next: { revalidate: 60 } })
  if (!res.ok) return []
  const data = (await res.json()) as ApiTeamMember[]
  return Array.isArray(data) ? data.map(withId) : []
}

export async function fetchWhatWeDoContent(): Promise<ApiWhatWeDoContent | null> {
  if (!API_BASE_URL) return null
  const res = await fetch(`${API_BASE_URL}/what-we-do`, { next: { revalidate: 60 } })
  if (!res.ok) return null
  const data = (await res.json()) as ApiWhatWeDoContent
  return data ?? null
}

export async function fetchPageBySlug(slug: string): Promise<ApiPage | null> {
  if (!API_BASE_URL || !slug) return null
  const res = await fetch(`${API_BASE_URL}/pages/slug/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) return null
  const data = (await res.json()) as ApiPage
  return data ? withId(data) : null
}
