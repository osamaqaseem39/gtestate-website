'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { submitInquiry } from '@/lib/submit-inquiry'

const PROPERTY_TYPES = [
  'Residential Plot',
  'Commercial Plot',
  'Files',
  'Luxury Apartments',
  'Farmhouses',
] as const

export default function GlobalInquiryForm() {
  const [open, setOpen] = useState(false)
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
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true)
          setDone(false)
          setSubmitError(null)
        }}
        className="fixed bottom-6 left-6 z-[85] flex items-center gap-2 rounded-full border-2 border-[#fabb22] bg-black px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg hover:bg-[#fabb22]/10 transition-colors"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <MessageCircle className="h-5 w-5 text-[#fabb22]" aria-hidden />
        Inquiry
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex justify-start bg-black/60 backdrop-blur-sm">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close inquiry panel"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-form-title"
            className="relative z-10 flex h-full w-full max-w-md flex-col border-r border-white/10 bg-zinc-950 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 id="inquiry-form-title" className="text-lg font-semibold uppercase tracking-tight text-white">
                Inquiry
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded p-2 text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              {done ? (
                <p className="text-white/80 text-sm leading-relaxed">
                  Thank you. Our team will get back to you shortly.
                </p>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {submitError ? (
                    <p className="text-sm text-red-400" role="alert">
                      {submitError}
                    </p>
                  ) : null}
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
        </div>
      )}
    </>
  )
}
