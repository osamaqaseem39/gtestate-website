'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import ReachUsSection from '@/components/ReachUsSection'
import PageHero from '@/components/PageHero'
import MobilePageHero from '@/components/MobilePageHero'
import MobileContactFormSection from '@/components/MobileContactFormSection'

export default function ContactPageClient() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const update = () => {
      if (typeof window === 'undefined') return
      setIsDesktop(window.innerWidth >= 1024)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <main className="min-h-screen bg-black">
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
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 text-sm font-medium uppercase tracking-wider mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium uppercase tracking-wider mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium uppercase tracking-wider mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 resize-none"
                      placeholder="Tell us about your real estate needs"
                    />
                  </div>
                  <span className="btn-hero-group w-full block">
                    <button type="submit" className="btn-hero w-full">
                      Send Message
                    </button>
                  </span>
                </form>

                <div className="space-y-8">
                  <div>
                    <h3
                      className="text-2xl font-bold text-white mb-6 uppercase tracking-tight"
                      style={{ fontFamily: 'var(--font-spartan)' }}
                    >
                      Get In Touch
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-400">
                          ◆
                        </div>
                        <div>
                          <h4 className="text-white font-semibold uppercase tracking-wider">
                            Phone
                          </h4>
                          <p className="text-white/60">+92 300 1234567</p>
                          <p className="text-white/60 text-sm">Mon–Fri 9AM–6PM</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-400">
                          ◆
                        </div>
                        <div>
                          <h4 className="text-white font-semibold uppercase tracking-wider">
                            Email
                          </h4>
                          <p className="text-white/60">info@gtestate.com</p>
                          <p className="text-white/60 text-sm">
                            We&apos;ll respond within 24 hours
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-400">
                          ◆
                        </div>
                        <div>
                          <h4 className="text-white font-semibold uppercase tracking-wider">
                            Office
                          </h4>
                          <p className="text-white/60">Lahore</p>
                          <p className="text-white/60 text-sm">Pakistan</p>
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
                        <span className="text-cyan-400">◆</span>
                        <span>AI-Powered Property Matching</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-cyan-400">◆</span>
                        <span>Virtual Reality Tours</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-cyan-400">◆</span>
                        <span>24/7 Customer Support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-cyan-400">◆</span>
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
    </main>
  )
}

