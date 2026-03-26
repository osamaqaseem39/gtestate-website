'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  ChevronUp,
} from 'lucide-react'

export default function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const navLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Team', href: '/team' },
    { name: 'Projects', href: '/projects' },
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={ref} className="bg-black relative overflow-hidden">
      {/* Marquee - WE ARE GT ESTATE */}
      <div className="relative border-b border-white/10 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        <div className="flex py-4 whitespace-nowrap text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight animate-footer-marquee w-max">
          <span className="flex items-center shrink-0 gap-2 pr-8">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                GT ESTATE <span className="text-[#fabb22] text-xl sm:text-2xl md:text-3xl">◆</span> WE ARE{' '}
              </span>
            ))}
          </span>
          <span className="flex items-center shrink-0 gap-2 pr-8" aria-hidden>
            {[...Array(6)].map((_, i) => (
              <span key={`d-${i}`} className="inline-flex items-center gap-2">
                GT ESTATE <span className="text-[#fabb22] text-xl sm:text-2xl md:text-3xl">◆</span> WE ARE{' '}
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Main Footer Content - columns + optional image area */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* HOME / Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-white font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="text-[#fabb22] text-[8px]">◆</span> Home
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-[#fabb22] transition-colors duration-200 uppercase text-sm tracking-wide"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white font-semibold uppercase tracking-wider mb-4">Contact</h3>
            <div className="space-y-2 text-white/90 text-sm">
              <a href="mailto:info@gtestate.com" className="flex items-center gap-2 hover:text-[#fabb22] transition-colors">
                <Mail className="w-4 h-4 text-[#fabb22] shrink-0" />
                info@gtestate.com
              </a>
              <a href="tel:+923005999993" className="flex items-center gap-2 hover:text-[#fabb22] transition-colors">
                <Phone className="w-4 h-4 text-[#fabb22] shrink-0" />
                +92 300 5999993
              </a>
              <a href="https://www.gtestate.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#fabb22] transition-colors">
                www.gtestate.com
              </a>
            </div>
          </motion.div>

          {/* SOCIAL MEDIA + CAREERS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-white font-semibold uppercase tracking-wider mb-4">Social Media</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-white border border-white/40 rounded p-2 hover:border-[#fabb22] hover:text-[#fabb22] transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold uppercase tracking-wider mb-4">Careers</h3>
                <p className="text-white/90 text-sm">
                  Apply on{' '}
                  <a href="mailto:careers@gtestate.com" className="text-[#fabb22] hover:underline">
                    careers@gtestate.com
                </a>
              </p>
            </div>
          </motion.div>

          {/* Got a project in mind? + Back to top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col justify-between items-start lg:items-end"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#fabb22] text-white text-sm hover:bg-[#fabb22]/10 transition-colors"
            >
              <span className="text-[#fabb22] text-[8px]">◆</span> Got a project in mind?
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 flex items-center justify-center gap-2 w-12 h-12 border border-[#fabb22] text-white text-xs uppercase tracking-wider hover:bg-[#fabb22]/10 transition-colors rotate-45 [&>svg]:-rotate-45"
              aria-label="Back to top"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/70 text-sm"
        >
          <div>© 2025 GT ESTATE. All Rights Reserved.</div>
          <div className="flex items-center gap-2">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms and conditions</Link>
          </div>
          <div>By GT ESTATE</div>
        </motion.div>
      </div>
    </footer>
  )
}

