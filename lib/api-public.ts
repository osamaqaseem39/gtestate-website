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

/** A property gallery image. Legacy docs store a plain URL string; newer ones store this object with alt/title. */
export type ApiPropertyGalleryEntry = {
  url: string
  alt?: string
  title?: string
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
  gallery?: Array<string | ApiPropertyGalleryEntry>
  sortOrder?: number
}

/** Normalizes a raw property gallery entry (legacy string or {url,alt,title}) into a resolved, renderable shape. */
export function normalizePropertyGalleryEntry(
  item: string | ApiPropertyGalleryEntry
): { url: string; alt: string; title: string } | null {
  if (typeof item === 'string') {
    const url = resolveMediaUrl(item)
    return url ? { url, alt: '', title: '' } : null
  }
  const url = resolveMediaUrl(item?.url || '')
  if (!url) return null
  return { url, alt: item.alt || '', title: item.title || '' }
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

export type ApiTeamMember = {
  _id: string
  name: string
  designation: string
  imageUrl?: string
  bio?: string
}

export async function fetchTeamMembers(): Promise<ApiTeamMember[]> {
  if (!API_BASE_URL) return []
  try {
    const res = await fetch(`${API_BASE_URL}/team`)
    if (!res.ok) return []
    const data = (await res.json()) as ApiTeamMember[]
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export type ApiSiteContent = {
  pageKey: string
  label: string
  metaTitle: string
  metaDescription: string
  body: string
}

export async function fetchSiteContent(pageKey: string): Promise<ApiSiteContent> {
  const empty: ApiSiteContent = { pageKey, label: '', metaTitle: '', metaDescription: '', body: '' }
  if (!API_BASE_URL) return empty
  try {
    const res = await fetch(`${API_BASE_URL}/site-content/${encodeURIComponent(pageKey)}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return empty
    const data = (await res.json()) as ApiSiteContent
    return { ...empty, ...data }
  } catch {
    return empty
  }
}

export type ApiReview = {
  _id: string
  name: string
  role?: string
  avatarUrl?: string
  rating?: number
  text: string
}

export async function fetchReviews(): Promise<ApiReview[]> {
  if (!API_BASE_URL) return []
  try {
    const res = await fetch(`${API_BASE_URL}/reviews`)
    if (!res.ok) return []
    const data = (await res.json()) as ApiReview[]
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}
