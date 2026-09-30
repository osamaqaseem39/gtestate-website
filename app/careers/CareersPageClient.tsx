'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import InquiryForm from '@/components/InquiryForm'
import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'
import PageLoadAnimation from '@/components/PageLoadAnimation'
import { fetchJobPostings, type ApiJobPosting } from '@/lib/api-public'
import { submitCareerApplication } from '@/lib/submit-career-application'

/** Used only until jobs are posted from the dashboard ("Post a Job"). */
const FALLBACK_POSITIONS = [
  'Sales Executive',
  'Marketing Officer',
  'Tele Sales Representative',
  'Office Coordinator',
  'Site Supervisor',
  'Other',
] as const

const EXPERIENCE = ['Fresher', '1–2 Years', '3–5 Years', '5+ Years'] as const

const CV_ACCEPT = '.pdf,.doc,.docx,.jpg,.jpeg,.png'
const CV_EXTENSIONS = /\.(pdf|doc|docx|jpe?g|png)$/i
/** Hosting caps request bodies at ~4.5 MB, so keep uploads comfortably below that. */
const MAX_CV_BYTES = 4 * 1024 * 1024

function fieldValue(form: HTMLFormElement, name: string): string {
  const el = form.elements.namedItem(name)
  if (!el || !('value' in el)) return ''
  return String((el as HTMLInputElement).value || '').trim()
}

export default function CareersPageClient() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [jobs, setJobs] = useState<ApiJobPosting[]>([])
  const [selectedPosition, setSelectedPosition] = useState('')

  useEffect(() => {
    fetchJobPostings().then(setJobs)
  }, [])

  const positions = jobs.length > 0 ? [...jobs.map((j) => j.title), 'Other'] : [...FALLBACK_POSITIONS]

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
    const fullName = fieldValue(form, 'fullName')
    const email = fieldValue(form, 'email')
    const phone = fieldValue(form, 'phone')
    const position = selectedPosition.trim() || fieldValue(form, 'position')
    const city = fieldValue(form, 'city')
    const experience = fieldValue(form, 'experience')
    const coverNote = fieldValue(form, 'coverNote')
    const consent = (form.elements.namedItem('consent') as HTMLInputElement | null)?.checked

    if (!fullName || !email || !phone || !position || !city || !experience) {
      setSubmitError('Please fill in all required fields.')
      return
    }
    if (!consent) {
      setSubmitError('Please agree that your information may be used for recruitment.')
      return
    }

    const cv = (form.elements.namedItem('cv') as HTMLInputElement | null)?.files?.[0]
    if (cv) {
      if (!CV_EXTENSIONS.test(cv.name)) {
        setSubmitError('CV must be a PDF, DOC, DOCX, JPG, JPEG, or PNG file.')
        return
      }
      if (cv.size > MAX_CV_BYTES) {
        setSubmitError('CV file is too large. Please upload a file under 4 MB.')
        return
      }
    }

    setSubmitting(true)
    try {
      // Same path as contact: server action uses website SMTP + NEXT_PUBLIC_API_URL
      const fd = new FormData()
      fd.set('fullName', fullName)
      fd.set('email', email)
      fd.set('phone', phone)
      fd.set('position', position)
      fd.set('city', city)
      fd.set('experience', experience)
      if (coverNote) fd.set('coverNote', coverNote)
      fd.set('consent', 'true')
      if (cv) fd.set('cv', cv, cv.name)

      const result = await submitCareerApplication(fd)
      if (!result.ok) {
        setSubmitError(result.error)
        return
      }
      setSubmitted(true)
      form.reset()
      setSelectedPosition('')
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
            {jobs.length > 0 && (
              <div className="max-w-4xl mx-auto mb-16">
                <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fabb22] mb-6">Open positions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {jobs.map((job) => {
                    const meta = [job.department, job.location, job.employmentType, job.experience].filter(Boolean)
                    return (
                      <article key={job.id} className="flex flex-col border border-white/10 bg-white/[0.03] p-5">
                        <h3 className="text-lg font-semibold uppercase tracking-tight">{job.title}</h3>
                        {meta.length > 0 && <p className="mt-1 text-xs uppercase tracking-wider text-white/50">{meta.join(' · ')}</p>}
                        {job.description && <p className="mt-3 text-sm text-white/70 whitespace-pre-line">{job.description}</p>}
                        {(job.requirements?.length ?? 0) > 0 && (
                          <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-white/65">
                            {job.requirements!.map((r, i) => (
                              <li key={i}>{r}</li>
                            ))}
                          </ul>
                        )}
                        <a
                          href="#apply"
                          onClick={() => setSelectedPosition(job.title)}
                          className="mt-5 self-start text-xs font-semibold uppercase tracking-wider text-[#fabb22] hover:underline"
                        >
                          Apply for this role →
                        </a>
                      </article>
                    )
                  })}
                </div>
              </div>
            )}
            <div id="apply" className="max-w-2xl mx-auto scroll-mt-28">
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
                      value={selectedPosition}
                      onChange={(e) => setSelectedPosition(e.target.value)}
                    >
                      <option value="" disabled className="bg-black">
                        Select position
                      </option>
                      {positions.map((p) => (
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
                      Upload CV / resume (PDF, DOC, DOCX, JPG, PNG — max 4 MB)
                    </label>
                    <input
                      name="cv"
                      type="file"
                      accept={CV_ACCEPT}
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

        <InquiryForm />
        <Footer />
      </PageLoadAnimation>
    </main>
  )
}
