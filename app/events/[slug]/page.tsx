import { permanentRedirect } from 'next/navigation'

type PageProps = { params: Promise<{ slug: string }> }

/** Events live on a single page now; keep old per-event URLs working by jumping to that event's section. */
export default async function LegacyEventDetailPage({ params }: PageProps) {
  const { slug } = await params
  permanentRedirect(`/events#${encodeURIComponent(slug)}`)
}
