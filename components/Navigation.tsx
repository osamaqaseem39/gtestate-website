'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

const SCROLL_THRESHOLD = 10
const NAV_HEIGHT = 80

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)
  const pathname = usePathname()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 20)

      if (currentScrollY <= SCROLL_THRESHOLD) {
        setIsHeaderVisible(true)
      } else if (currentScrollY > lastScrollY.current && currentScrollY > NAV_HEIGHT) {
        setIsHeaderVisible(false)
      } else if (currentScrollY < lastScrollY.current) {
        setIsHeaderVisible(true)
      }

      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'About Us', href: '/about' },
    { name: 'What We Do', href: '/what-we-do' },
    { name: 'Projects', href: '/projects' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Events', href: '/events' },
    { name: 'Blog', href: '/blog' },
    { name: 'PM Loan', href: '/pm-loan-scheme' },
    { name: 'Careers', href: '/careers' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isHeaderVisible ? 0 : -NAV_HEIGHT - 20 }}
      transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-[100] isolate transition-colors duration-300 ${
        scrolled ? 'bg-black/85 backdrop-blur-lg shadow-lg shadow-black/20' : 'bg-black/40 backdrop-blur-md'
      }`}
    >
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="relative flex items-center h-20">
          <div className="flex-1 flex items-center justify-start min-w-0">
            <div className="hidden xl:flex items-center gap-4 2xl:gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative whitespace-nowrap text-sm 2xl:text-base font-medium transition-colors ${
                    pathname === item.href ? 'text-white' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
          >
            <ChevronUp className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 w-3 h-3 text-[#fabb22]" />
            <Image
              src="/logo.png"
              alt="GT Estate logo"
              width={260}
              height={80}
              priority
              className="h-12 sm:h-14 xl:h-16 w-auto object-contain"
            />
            <span className="sr-only">GT Estate - Real Estate Services</span>
          </Link>

          <div className="flex-1 flex items-center justify-end xl:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="p-3 text-white"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <div className="flex flex-col gap-2">
                <div className={`h-0.5 w-7 bg-white transition-transform ${mobileOpen ? 'translate-y-2.5 rotate-45' : ''}`} />
                <div className={`h-0.5 w-7 bg-white transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
                <div className={`h-0.5 w-5 bg-white transition-transform ${mobileOpen ? '-translate-y-2.5 -rotate-45 w-7' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="xl:hidden overflow-hidden border-t border-white/10 pb-4"
            >
              <nav className="flex flex-col gap-1 pt-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-2 py-2.5 text-sm font-medium uppercase tracking-wide ${
                      pathname === item.href ? 'text-[#fabb22]' : 'text-white/80'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link href="/team" className="px-2 py-2.5 text-sm font-medium uppercase tracking-wide text-white/80">
                  Team
                </Link>
                <Link href="/contact" className="px-2 py-2.5 text-sm font-medium uppercase tracking-wide text-white/80">
                  Contact
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
