import { Metadata } from 'next'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contact Us - GT Estate',
  description: 'Get in touch with our team for personalized real estate assistance and support.',
}

export default function Contact() {
  return (
    <main className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-20" />
        
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <span className="inline-block px-4 py-2 bg-neon-blue/10 border border-neon-blue/30 rounded-full text-neon-blue text-sm font-medium mb-4">
                  Get In Touch
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Contact <span className="text-gradient">Our Team</span>
                </h1>
                <p className="text-white/70 text-lg">
                  Ready to start your real estate journey? Our expert team is here to help you 
                  find your perfect property or sell your current home.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/50"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/50"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/50"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/50"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/50"
                    placeholder="Tell us about your real estate needs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold rounded-lg hover:scale-105 transition-transform"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-neon-blue/10 rounded-lg flex items-center justify-center">
                      <span className="text-neon-blue">📞</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Phone</h4>
                      <p className="text-white/60">+1 (555) 123-4567</p>
                      <p className="text-white/60">Mon-Fri 9AM-6PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-neon-purple/10 rounded-lg flex items-center justify-center">
                      <span className="text-neon-purple">✉️</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Email</h4>
                      <p className="text-white/60">info@gtestate.com</p>
                      <p className="text-white/60">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-neon-green/10 rounded-lg flex items-center justify-center">
                      <span className="text-neon-green">📍</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Office</h4>
                      <p className="text-white/60">Lahore</p>
                      <p className="text-white/60">Pakistan</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                <h4 className="text-white font-semibold mb-4">Why Choose Us?</h4>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-center space-x-2">
                    <span className="text-neon-green">✓</span>
                    <span>AI-Powered Property Matching</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-neon-green">✓</span>
                    <span>Virtual Reality Tours</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-neon-green">✓</span>
                    <span>24/7 Customer Support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-neon-green">✓</span>
                    <span>Blockchain Security</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

