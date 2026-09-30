'use server'

import { API_BASE_URL } from './api-public'
import { sendCareerApplicationEmail } from './mail'

const CV_EXTENSIONS = /\.(pdf|doc|docx|jpe?g|png)$/i
const MAX_CV_BYTES = 4 * 1024 * 1024

function str(formData: FormData, key: string): string {
  return String(formData.get(key) || '').trim()
}

/**
 * Same pattern as contact `submitInquiry`:
 * 1) email via website SMTP credentials
 * 2) save via the shared API (`NEXT_PUBLIC_API_URL`) from the server (no browser CORS)
 */
export async function submitCareerApplication(
  formData: FormData,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const fullName = str(formData, 'fullName')
  const email = str(formData, 'email')
  const phone = str(formData, 'phone')
  const position = str(formData, 'position')
  const city = str(formData, 'city')
  const experience = str(formData, 'experience')
  const coverNote = str(formData, 'coverNote')
  const consent = str(formData, 'consent')
  const cvEntry = formData.get('cv')
  const cvFile = cvEntry instanceof File && cvEntry.size > 0 ? cvEntry : null

  if (!fullName || !email || !phone || !position || !city || !experience) {
    return { ok: false, error: 'Please fill in all required fields.' }
  }
  if (consent !== 'true' && consent !== 'on') {
    return { ok: false, error: 'Please agree that your information may be used for recruitment.' }
  }
  if (cvFile) {
    if (!CV_EXTENSIONS.test(cvFile.name)) {
      return { ok: false, error: 'CV must be a PDF, DOC, DOCX, JPG, JPEG, or PNG file.' }
    }
    if (cvFile.size > MAX_CV_BYTES) {
      return { ok: false, error: 'CV file is too large. Please upload a file under 4 MB.' }
    }
  }

  const base = API_BASE_URL?.replace(/\/$/, '')
  let cvBuffer: Buffer | undefined
  if (cvFile) {
    cvBuffer = Buffer.from(await cvFile.arrayBuffer())
  }

  let mailResult: { success: boolean; error?: string } = { success: false, error: 'Not attempted' }
  try {
    mailResult = await sendCareerApplicationEmail({
      fullName,
      email,
      phone,
      position,
      city,
      experience,
      coverNote: coverNote || undefined,
      cv:
        cvFile && cvBuffer
          ? {
              filename: cvFile.name,
              content: cvBuffer,
              contentType: cvFile.type || 'application/octet-stream',
            }
          : undefined,
    })
  } catch (err) {
    console.error('Error in sendCareerApplicationEmail:', err)
  }

  if (!base) {
    if (mailResult.success) return { ok: true }
    return { ok: false, error: 'API is not configured (NEXT_PUBLIC_API_URL).' }
  }

  try {
    const outbound = new FormData()
    outbound.set('fullName', fullName)
    outbound.set('email', email)
    outbound.set('phone', phone)
    outbound.set('position', position)
    outbound.set('city', city)
    outbound.set('experience', experience)
    if (coverNote) outbound.set('coverNote', coverNote)
    outbound.set('consent', 'true')
    if (cvFile && cvBuffer) {
      outbound.set(
        'cv',
        new Blob([new Uint8Array(cvBuffer)], { type: cvFile.type || 'application/octet-stream' }),
        cvFile.name,
      )
    }

    // Same API host as contact; Nest mounts careers at both /careers and /api/careers
    const res = await fetch(`${base}/api/careers/applications`, {
      method: 'POST',
      body: outbound,
    })

    if (!res.ok && !mailResult.success) {
      const data = (await res.json().catch(() => ({}))) as { error?: string; message?: string }
      if (res.status === 413) {
        return { ok: false, error: 'CV file is too large. Please upload a file under 4 MB.' }
      }
      return {
        ok: false,
        error: data.error || data.message || 'Something went wrong. Please try again.',
      }
    }

    return { ok: true }
  } catch (err) {
    console.error('Career application API error:', err)
    if (mailResult.success) return { ok: true }
    return { ok: false, error: 'Network error. Check your connection or try again later.' }
  }
}
