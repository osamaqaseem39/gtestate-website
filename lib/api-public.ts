export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'https://estate-server-nine.vercel.app'
).replace(/\/$/, '')

export const MEDIA_BASE_URL = (
  process.env.NEXT_PUBLIC_MEDIA_URL || 'https://gt.osamaqaseem.online'
).replace(/\/$/, '')

export function resolveMediaUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return ''
  const raw = pathOrUrl.trim()
  if (!raw) return ''
  // Browser-only blob: preview URLs must never be persisted or rendered on the public site
  if (raw.startsWith('blob:') || raw.startsWith('data:')) return ''
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  if (!MEDIA_BASE_URL) return raw
  const path = raw.startsWith('/') ? raw : `/${raw}`
  return `${MEDIA_BASE_URL}${path}`
}

/** Prefer Express `primaryImage` / Nest `images[]` primary entry. */
export function resolvePropertyPrimaryImage(property: {
  primaryImage?: string
  images?: Array<{ url?: string; isPrimary?: boolean }>
}): string {
  const direct = resolveMediaUrl(property.primaryImage || '')
  if (direct) return direct
  const images = property.images
  if (!Array.isArray(images) || images.length === 0) return ''
  const primary = images.find((img) => img?.isPrimary && img.url) || images.find((img) => img?.url)
  return resolveMediaUrl(primary?.url || '')
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
  slug?: string
  location: string
  marla: string
  primaryImage?: string
  images?: Array<{ url?: string; isPrimary?: boolean }>
  featured?: boolean
  description?: string
  status?: string
  type?: string
  price?: number | null
  gallery?: Array<string | ApiPropertyGalleryEntry>
  inventory?: ApiInventoryItem[]
  paymentPlan?: ApiPaymentPlan
  sortOrder?: number
}

export type ApiInventoryItem = {
  _id?: string
  category?: string
  label?: string
  size?: string
  price?: string
  status?: string
  notes?: string
}

export type ApiPaymentPlanRow = {
  milestone?: string
  percentage?: string
  amount?: string
  dueOn?: string
  notes?: string
}

export type ApiPaymentPlan = {
  enabled?: boolean
  title?: string
  rows?: ApiPaymentPlanRow[]
}

export type ApiNewsArticle = {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  imageUrl?: string
  metaTitle?: string
  metaDescription?: string
  published?: boolean
  featured?: boolean
  createdAt?: string
}

export type ApiEvent = {
  id: string
  title: string
  slug: string
  description?: string
  images?: Array<{ url: string; alt?: string; title?: string }>
  videos?: Array<{ url: string; title?: string }>
  metaTitle?: string
  metaDescription?: string
  published?: boolean
}

export type ApiPaymentPlanTab = {
  id: string
  title: string
  slug: string
  description?: string
  rows?: Array<{ label?: string; percentage?: string; amount?: string; dueOn?: string; notes?: string }>
  published?: boolean
  sortOrder?: number
}

export function propertyHref(property: { _id: string; slug?: string }): string {
  if (property.slug) return `/project/${property.slug}`
  return `/projects/${property._id}`
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

export async function fetchPropertyBySlug(slug: string): Promise<ApiProperty | null> {
  if (!API_BASE_URL || !slug) return null
  const res = await fetch(`${API_BASE_URL}/properties/slug/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) return null
  const data = (await res.json()) as ApiProperty
  return data?._id ? data : null
}

export async function fetchNewsArticles(): Promise<ApiNewsArticle[]> {
  if (!API_BASE_URL) return []
  const res = await fetch(`${API_BASE_URL}/news?published=true`, { next: { revalidate: 60 } })
  if (!res.ok) return []
  const data = (await res.json()) as ApiNewsArticle[]
  return Array.isArray(data) ? data.map(withId) : []
}

export async function fetchNewsBySlug(slug: string): Promise<ApiNewsArticle | null> {
  if (!API_BASE_URL || !slug) return null
  const res = await fetch(`${API_BASE_URL}/news/slug/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) return null
  const data = (await res.json()) as ApiNewsArticle
  return data ? withId(data) : null
}

export async function fetchEvents(): Promise<ApiEvent[]> {
  if (!API_BASE_URL) return []
  const res = await fetch(`${API_BASE_URL}/events?published=true`, { next: { revalidate: 60 } })
  if (!res.ok) return []
  const data = (await res.json()) as ApiEvent[]
  return Array.isArray(data) ? data.map(withId) : []
}

export async function fetchEventBySlug(slug: string): Promise<ApiEvent | null> {
  if (!API_BASE_URL || !slug) return null
  const res = await fetch(`${API_BASE_URL}/events/slug/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) return null
  const data = (await res.json()) as ApiEvent
  return data ? withId(data) : null
}

export async function fetchPaymentPlanTabs(): Promise<ApiPaymentPlanTab[]> {
  if (!API_BASE_URL) return []
  const res = await fetch(`${API_BASE_URL}/payment-plans?published=true`, { next: { revalidate: 60 } })
  if (!res.ok) return []
  const data = (await res.json()) as ApiPaymentPlanTab[]
  return Array.isArray(data) ? data.map(withId) : []
}

export async function submitLoanApplication(payload: Record<string, string>): Promise<{ ok: boolean; error?: string }> {
  if (!API_BASE_URL) return { ok: false, error: 'API not configured' }
  try {
    const res = await fetch(`${API_BASE_URL}/loan-applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as { error?: string }
      return { ok: false, error: err.error || 'Submission failed' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Network error' }
  }
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
  avatarUrl?: string
  rating: number
  text: string
  published?: boolean
}

export type ApiTeamMember = {
  id: string
  name: string
  designation: string
  image?: string
  imageUrl?: string
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

function normalizeReview(row: ApiReview & { _id?: string }): ApiReview {
  const withIds = withId(row)
  return {
    ...withIds,
    image: withIds.image || withIds.avatarUrl || '',
  }
}

function normalizeTeamMember(row: ApiTeamMember & { _id?: string }): ApiTeamMember {
  const withIds = withId(row)
  return {
    ...withIds,
    image: withIds.image || withIds.imageUrl || '',
  }
}

export async function fetchTestimonials(): Promise<ApiReview[]> {
  if (!API_BASE_URL) return []
  const res = await fetch(`${API_BASE_URL}/reviews?published=true`, { next: { revalidate: 60 } })
  if (!res.ok) return []
  const data = (await res.json()) as ApiReview[]
  return Array.isArray(data) ? data.map(normalizeReview) : []
}

export async function fetchTeamMembers(): Promise<ApiTeamMember[]> {
  if (!API_BASE_URL) return []
  const res = await fetch(`${API_BASE_URL}/team?published=true`, { next: { revalidate: 60 } })
  if (!res.ok) return []
  const data = (await res.json()) as ApiTeamMember[]
  return Array.isArray(data) ? data.map(normalizeTeamMember) : []
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
