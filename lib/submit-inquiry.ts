import { API_BASE_URL } from './api-public'

export type InquirySource = 'global' | 'contact'

export type SubmitInquiryPayload = {
  name: string
  email?: string
  phone?: string
  message?: string
  propertyType?: string
  source: InquirySource
}

export async function submitInquiry(
  payload: SubmitInquiryPayload
): Promise<{ ok: true } | { ok: false; error: string }> {
  const base = API_BASE_URL?.replace(/\/$/, '')
  if (!base) {
    return { ok: false, error: 'API is not configured (NEXT_PUBLIC_API_URL).' }
  }

  try {
    const res = await fetch(`${base}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = (await res.json().catch(() => ({}))) as { error?: string; message?: string }
    if (!res.ok) {
      return { ok: false, error: data.error || 'Something went wrong. Please try again.' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Network error. Check your connection or try again later.' }
  }
}
