/** Public website → GT Estate API (no auth). */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'https://gt-estate-server-zhly.vercel.app'
).replace(/\/$/, '')

export function resolveMediaUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return ''
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl
  if (!API_BASE_URL) return pathOrUrl
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${API_BASE_URL}${path}`
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
}

export type ApiGalleryItem = {
  _id: string
  imageUrl: string
  alt: string
  shape: 'portrait' | 'landscape' | 'square'
  display: 'grid' | 'full-original'
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
  const res = await fetch(`${API_BASE_URL}/api/properties${queryString ? `?${queryString}` : ''}`)
  if (!res.ok) return []
  const data = (await res.json()) as ApiProperty[]
  return Array.isArray(data) ? data : []
}

export async function fetchGalleryItems(): Promise<ApiGalleryItem[]> {
  if (!API_BASE_URL) return []
  const res = await fetch(`${API_BASE_URL}/api/gallery`)
  if (!res.ok) return []
  const data = (await res.json()) as ApiGalleryItem[]
  return Array.isArray(data) ? data : []
}
