'use client'

import { useState } from 'react'
import { submitInquiry } from '@/lib/submit-inquiry'

const PROPERTY_TYPES = [
  'Residential Plot',
  'Commercial Plot',
  'Files',
  'Luxury Apartments',
  'Farmhouses',
] as const

export default function InquiryForm() {
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitError(null)
    const form = e.currentTarget
    const fd = new FormData(form)
    const fullName = String(fd.get('fullName') || '').trim()
    const phone = String(fd.get('phone') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const propertyType = String(fd.get('propertyType') || '').trim()
    const message = String(fd.get('message') || '').trim()

    setSubmitting(true)
    const result = await submitInquiry({
      name: fullName,
      phone,
      email: email || undefined,
      message: message || undefined,
      propertyType: propertyType || undefined,
      source: 'global',
    })
    setSubmitting(false)

    if (!result.ok) {
      setSubmitError(result.error)
      return
    }
    setDone(true)
    form.reset()
  }

  return (
    <section className="relative bg-black text-white" aria-label="Inquiry form">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 md:py-20">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.35em] text-white/60 mb-3 text-center">
            Get in touch
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Send Us an <span className="text-[#fabb22]">Inquiry</span>
          </h2>

          {done ? (
            <p className="text-white/80 text-sm leading-relaxed text-center">
              Thank you. Our team will get back to you shortly.
            </p>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {submitError ? (
                <p className="text-sm text-red-400" role="alert">
                  {submitError}
                </p>
              ) : null}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-white/70">
                    Full name
                  </label>
                  <input
                    name="fullName"
                    required
                    className="w-full border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/40 focus:border-[#fabb22] focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-white/70">
                    Contact number (WhatsApp preferred)
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/40 focus:border-[#fabb22] focus:outline-none"
                    placeholder="+92 ..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-white/70">
                    Email address <span className="text-white/40">(optional)</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="w-full border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/40 focus:border-[#fabb22] focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-white/70">
                    Property type
                  </label>
                  <select
                    name="propertyType"
                    required
                    className="w-full border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-[#fabb22] focus:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-black">
                      Select type
                    </option>
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-black">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-white/70">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full resize-none border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/40 focus:border-[#fabb22] focus:outline-none"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full border-2 border-[#fabb22] bg-[#fabb22] py-3 text-sm font-semibold uppercase tracking-wider text-black hover:bg-[#fabb22]/90 transition-colors disabled:opacity-60 disabled:pointer-events-none"
              >
                {submitting ? 'Sending…' : 'Send inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
