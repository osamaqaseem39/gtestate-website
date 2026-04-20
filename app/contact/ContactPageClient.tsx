'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import ReachUsSection from '@/components/ReachUsSection'
import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'
import MobileContactFormSection from '@/components/MobileContactFormSection'
import PageLoadAnimation from '@/components/PageLoadAnimation'
import { submitInquiry } from '@/lib/submit-inquiry'

export default function ContactPageClient() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [desktopSubmitting, setDesktopSubmitting] = useState(false)
  const [desktopError, setDesktopError] = useState<string | null>(null)
  const [desktopDone, setDesktopDone] = useState(false)

  useEffect(() => {
    const update = () => {
      if (typeof window === 'undefined') return
      setIsDesktop(window.innerWidth >= 1024)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  async function handleDesktopSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setDesktopError(null)
    const form = e.currentTarget
    const fd = new FormData(form)
    const first = String(fd.get('firstName') || '').trim()
    const last = String(fd.get('lastName') || '').trim()
    const name = [first, last].filter(Boolean).join(' ').trim()
    const email = String(fd.get('email') || '').trim()
    const phone = String(fd.get('phone') || '').trim()
    const message = String(fd.get('message') || '').trim()

    if (!name) {
      setDesktopError('Please enter your name.')
      return
    }

    setDesktopSubmitting(true)
    const result = await submitInquiry({
      name,
      email,
      phone,
      message: message || undefined,
      source: 'contact',
    })
    setDesktopSubmitting(false)

    if (!result.ok) {
      setDesktopError(result.error)
      return
    }
    setDesktopDone(true)
    form.reset()
  }

  return (
    <main className="min-h-screen bg-black">
      <PageLoadAnimation stagger>
        {isDesktop ? (
          <PageHero
          label="Get In Touch"
          title="Contact "
          titleAccent="Our Team"
          description="Ready to start your real estate journey? Our expert team is here to help you find your perfect property or sell your current home."
        />
      ) : (
        <MobilePageHero
          label="Get in touch"
          title="Contact"
          titleAccent="our team"
          description="Tell us what you’re planning and we’ll help you move it forward."
        />
        )}

        {isDesktop ? (
          <section className="relative bg-black text-white">
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 md:py-24">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <form className="space-y-6" onSubmit={handleDesktopSubmit}>
                  {desktopDone ? (
                    <p className="text-white/80 text-sm leading-relaxed">
                      Thank you. Our team will get back to you shortly.
                    </p>
                  ) : (
                    <>
                      {desktopError ? (
                        <p className="text-sm text-red-400" role="alert">
                          {desktopError}
                        </p>
                      ) : null}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white/80 text-sm font-medium uppercase tracking-wider mb-2">
                            First Name
                          </label>
                          <input
                            name="firstName"
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 text-sm font-medium uppercase tracking-wider mb-2">
                            Last Name
                          </label>
                          <input
                            name="lastName"
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50"
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium uppercase tracking-wider mb-2">
                          Email
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium uppercase tracking-wider mb-2">
                          Phone
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium uppercase tracking-wider mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 resize-none"
                          placeholder="Tell us about your real estate needs"
                        />
                      </div>
                      <span className="btn-hero-group w-full block">
                        <button
                          type="submit"
                          disabled={desktopSubmitting}
                          className="btn-hero w-full disabled:opacity-60 disabled:pointer-events-none"
                        >
                          {desktopSubmitting ? 'Sending…' : 'Send Message'}
                        </button>
                      </span>
                    </>
                  )}
                </form>

                <div className="space-y-8">
                  <div>
                    <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.35em] text-white/60 mb-4">
                      Contact details
                    </p>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-400">
                          ◆
                        </div>
                        <div>
                          <h4 className="text-white font-semibold uppercase tracking-wider">
                            Call / WhatsApp
                          </h4>
                          <p className="text-white/60">+92 300 5999993</p>
                          <p className="text-white/60 text-sm">Mon–Fri 9AM–6PM</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-400">
                          ◆
                        </div>
                          <h4 className="text-white font-semibold uppercase tracking-wider">
                            Email
                          </h4>
                          <p className="text-white/60">info@synovolabs.com</p>
                          <p className="text-white/60 text-sm">
                            We&apos;ll respond within 24 hours
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-400">
                          ◆
                        </div>
                        <div>
                          <h4 className="text-white font-semibold uppercase tracking-wider">
                            Visit Us
                          </h4>
                          <p className="text-white/60">GT Commercial Building #C43, 3rd Floor,</p>
                          <p className="text-white/60 text-sm">Near Tehzeeb Bakers, Lake City, Lahore</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10">
                    <h4 className="text-white font-semibold mb-4 uppercase tracking-wider">
                      Why Choose Us?
                    </h4>
                    <ul className="space-y-3 text-white/60 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="text-amber-400">◆</span>
                        <span>AI-Powered Property Matching</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-amber-400">◆</span>
                        <span>Virtual Reality Tours</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-amber-400">◆</span>
                        <span>24/7 Customer Support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-amber-400">◆</span>
                        <span>Blockchain Security</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        ) : (
          <MobileContactFormSection />
        )}

        <ReachUsSection />
        <Footer />
      </PageLoadAnimation>
    </main>
  )
}

