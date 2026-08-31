'use client'

import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { X } from 'lucide-react'
import { submitInquiry } from '@/lib/submit-inquiry'

const WHATSAPP_NUMBER = '923005999993'

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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open])

  function handleClose() {
    setOpen(false)
  }

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
      <div className="fixed bottom-6 left-6 z-[85] flex flex-col items-center gap-3">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
        >
          <FaWhatsapp className="h-7 w-7" />
        </a>
        <button
          type="button"
          onClick={() => {
            setDone(false)
            setSubmitError(null)
            setOpen(true)
          }}
          className="rounded-full border-2 border-[#fabb22] bg-[#fabb22] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-black shadow-lg transition-transform hover:scale-105"
        >
          Inquiry
        </button>
      </div>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Close inquiry form"
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div
            className="fixed inset-0 z-[91] flex justify-start pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-label="Send an inquiry"
          >
            <div className="pointer-events-auto flex h-full w-full max-w-md flex-col border-r border-white/10 bg-black text-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/60">
                    Get in touch
                  </p>
                  <h2 className="mt-1 text-xl font-bold">
                    Send Us an <span className="text-[#fabb22]">Inquiry</span>
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded p-2 text-white/70 transition-colors hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                {done ? (
                  <p className="text-sm leading-relaxed text-white/80">
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
                      className="w-full border-2 border-[#fabb22] bg-[#fabb22] py-3 text-sm font-semibold uppercase tracking-wider text-black transition-colors hover:bg-[#fabb22]/90 disabled:pointer-events-none disabled:opacity-60"
                    >
                      {submitting ? 'Sending…' : 'Send inquiry'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}
