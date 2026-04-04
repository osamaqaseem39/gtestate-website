'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'
import PageLoadAnimation from '@/components/PageLoadAnimation'
import { API_BASE_URL } from '@/lib/api-public'

const POSITIONS = [
  'Sales Executive',
  'Marketing Officer',
  'Tele Sales Representative',
  'Office Coordinator',
  'Site Supervisor',
  'Other',
] as const

const EXPERIENCE = ['Fresher', '1–2 Years', '3–5 Years', '5+ Years'] as const

export default function CareersPageClient() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    const update = () => {
      if (typeof window === 'undefined') return
      setIsDesktop(window.innerWidth >= 1024)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitError(null)

    const form = e.currentTarget

    if (!API_BASE_URL) {
      setSubmitted(true)
      return
    }

    setSubmitting(true)
    try {
      const fd = new FormData(form)
      const res = await fetch(`${API_BASE_URL}/api/careers/applications`, {
        method: 'POST',
        body: fd,
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string; message?: string }
      if (!res.ok) {
        setSubmitError(data.error || 'Something went wrong. Please try again or contact us directly.')
        return
      }
      setSubmitted(true)
      form.reset()
    } catch {
      setSubmitError('Network error. Check your connection or try again later.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <PageLoadAnimation stagger>
        {isDesktop ? (
          <PageHero
            label="Careers"
            title="Join "
            titleAccent="GT Estates"
            description="Build your career with a trusted real estate team. Share your details and we will review your application."
          />
        ) : (
          <MobilePageHero
            label="Careers"
            title="Join"
            titleAccent="GT Estates"
            description="Apply for open roles — we will get back to you after reviewing your profile."
          />
        )}

        <section className="relative border-t border-white/10">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 md:py-24">
            <div className="max-w-2xl mx-auto">
              {submitted ? (
                <p className="text-white/80 text-center leading-relaxed">
                  Thank you for applying. Our HR team will contact you if your profile matches our requirements.
                </p>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {submitError && (
                    <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 px-4 py-3" role="alert">
                      {submitError}
                    </p>
                  )}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                      Full name
                    </label>
                    <input
                      name="fullName"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#fabb22]"
                      placeholder="As on CNIC / passport"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                      Email address
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#fabb22]"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                      Mobile / WhatsApp number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#fabb22]"
                      placeholder="+92 ..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                      Position applying for
                    </label>
                    <select
                      name="position"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white focus:outline-none focus:border-[#fabb22]"
                      defaultValue=""
                    >
                      <option value="" disabled className="bg-black">
                        Select position
                      </option>
                      {POSITIONS.map((p) => (
                        <option key={p} value={p} className="bg-black">
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                      City / location
                    </label>
                    <input
                      name="city"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#fabb22]"
                      placeholder="e.g. Lahore"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                      Years of experience
                    </label>
                    <select
                      name="experience"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white focus:outline-none focus:border-[#fabb22]"
                      defaultValue=""
                    >
                      <option value="" disabled className="bg-black">
                        Select experience
                      </option>
                      {EXPERIENCE.map((x) => (
                        <option key={x} value={x} className="bg-black">
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                      Upload CV / resume (PDF, DOC)
                    </label>
                    <input
                      name="cv"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="w-full text-sm text-white/80 file:mr-4 file:border-0 file:bg-[#fabb22] file:px-4 file:py-2 file:text-black file:font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                      Short message / cover note <span className="text-white/40">(optional)</span>
                    </label>
                    <textarea
                      name="coverNote"
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#fabb22] resize-none"
                      placeholder="Tell us why you would like to join GT Estates"
                    />
                  </div>
                  <label className="flex items-start gap-3 text-sm text-white/80 cursor-pointer">
                    <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 border-white/40" />
                    <span>I agree that my information will be used for recruitment purposes.</span>
                  </label>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-[#fabb22] text-black font-semibold uppercase tracking-wider hover:bg-[#fabb22]/90 transition-colors disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {submitting ? 'Submitting…' : 'Submit application'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </PageLoadAnimation>
    </main>
  )
}
