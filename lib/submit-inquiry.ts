'use server'

import { API_BASE_URL } from './api-public'
import { sendInquiryEmail } from './mail'

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
  console.log('Server Action: submitInquiry triggered', { source: payload.source, name: payload.name })
  const base = API_BASE_URL?.replace(/\/$/, '')
  
  // 1. Send Email directly from the website (Server Action)
  // We do this first or in parallel. If it fails, we still try to save to DB.
  let mailResult: { success: boolean; error?: string } = { success: false, error: 'Not attempted' }
  try {
    mailResult = await sendInquiryEmail({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || '',
      message: payload.message,
      propertyType: payload.propertyType,
      source: payload.source,
    })
  } catch (err) {
    console.error('Error in sendInquiryEmail action:', err)
  }

  // 2. Save to Database via the API server
  if (!base) {
    // If no API base, but mail sent, we might consider it partially successful?
    // But usually we want both.
    if (mailResult.success) return { ok: true }
    return { ok: false, error: 'API is not configured (NEXT_PUBLIC_API_URL).' }
  }

  try {
    const res = await fetch(`${base}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    
    // If API call fails but mail was sent, we still return OK to the user
    // because their inquiry was at least delivered to the team.
    if (!res.ok && !mailResult.success) {
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      return { ok: false, error: data.error || 'Something went wrong. Please try again.' }
    }
    
    return { ok: true }
  } catch (err) {
    if (mailResult.success) return { ok: true }
    return { ok: false, error: 'Network error. Check your connection or try again later.' }
  }
}

