'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Diamond, X } from 'lucide-react'
import SocialMediaLinks from '@/components/SocialMediaLinks'

const TEAL = '#fabb22'

const menuItems = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT US', href: '/about' },
  { name: 'WHAT WE DO', href: '/what-we-do' },
  { name: 'CONTACT US', href: '/contact' },
  { name: 'PROJECTS', href: '/projects' },
  { name: 'TEAM', href: '/team' },
  { name: 'CAREERS', href: '/careers' },
]

type SideMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - blurred dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          {/* Panel - slides from right */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-md bg-black/90 shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col flex-1 pt-16 pb-8 px-8">
              {/* MENU section */}
              <div className="flex items-center gap-2 mb-8">
                <Diamond className="w-3 h-3 shrink-0" style={{ color: TEAL }} fill={TEAL} strokeWidth={0} />
                <h2 className="text-white text-sm font-medium uppercase tracking-wider">Menu</h2>
              </div>
              <nav className="flex flex-col gap-1">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`block py-2 font-medium uppercase tracking-wide transition-colors duration-200 ${
                        isActive
                          ? 'text-white text-2xl'
                          : 'text-white/60 text-lg hover:text-white/90'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </nav>

              {/* Spacer to push bottom content down */}
              <div className="flex-1 min-h-[2rem]" />

              {/* Bottom row: Social (left) + CTA & contact (right) */}
              <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
                {/* Social Media */}
                <div>
                  <h3 className="text-white text-sm font-medium uppercase tracking-wider mb-4">Social Media</h3>
                  <SocialMediaLinks variant="menu" />
                </div>

                {/* CTA + Contact */}
                <div className="flex flex-col items-start sm:items-end gap-4">
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-5 py-3 border text-white text-sm hover:bg-[#fabb22]/10 transition-colors"
                    style={{ borderColor: TEAL }}
                  >
                    <Diamond className="w-3 h-3 shrink-0" style={{ color: TEAL }} fill={TEAL} strokeWidth={0} />
                    Got a project in mind?
                  </Link>
                  <div className="text-white text-sm space-y-1 text-left sm:text-right">
                    <a href="mailto:info@gtestate.com" className="block hover:opacity-80 transition-opacity">
                      info@gtestate.com
                    </a>
                    <a href="tel:+923005999993" className="block hover:opacity-80 transition-opacity">
                      +92 300 5999993
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
