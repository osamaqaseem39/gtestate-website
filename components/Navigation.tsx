'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ChevronUp,
  Diamond
} from 'lucide-react'
import SideMenu from './SideMenu'

const SCROLL_THRESHOLD = 10
const NAV_HEIGHT = 80

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 50)

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
    { name: 'Careers', href: '/careers' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{
        y: isHeaderVisible ? 0 : -NAV_HEIGHT - 20,
      }}
      transition={{
        type: 'tween',
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Thin horizontal line separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300/30" />
      
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Navigation Links (Left) */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-lg font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-white'
                    : 'text-white hover:text-white/80'
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-6 left-0 right-0 h-px bg-gray-300"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Logo (Center) */}
          <Link
            href="/"
            className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group"
          >
            <div className="relative flex flex-col items-center">
              {/* Small green upward arrow above */}
              <ChevronUp className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-3 h-3 text-light-green" />
              {/* Image logo */}
              <Image
                src="/logo.png"
                alt="GT Estate logo"
                width={260}
                height={80}
                priority
                className="h-16 w-auto object-contain"
              />
              {/* Accessible text / subtle subtitle */}
              <span className="sr-only">GT Estate - Real Estate Services</span>
            </div>
          </Link>

          {/* Header Right Button */}
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="group p-4 text-white flex items-center gap-3 relative"
            >
              {/* Two horizontal lines - top longer than bottom */}
              <div className="flex flex-col gap-2.5 relative">
                <div className="w-7 h-1 bg-white" />
                <div className="w-5 h-1 bg-white" />
              </div>
              {/* Solid diamond shape - moves on hover */}
              <div className="relative flex items-center justify-center" style={{ height: '20px', width: '20px' }}>
                <motion.div
                  initial={{ y: 0, scale: 1 }}
                  whileHover={{
                    y: [-7, 0],
                    scale: [1, 0.8, 0.8],
                    transition: {
                      duration: 0.8,
                      times: [0, 0.3, 1],
                      ease: "easeInOut"
                    }
                  }}
                >
                  <Diamond 
                    className="w-5 h-5 text-white" 
                    fill="white"
                    strokeWidth={0}
                  />
                </motion.div>
              </div>
            </button>
          </div>
        </div>

        {/* Side menu (slides in from right) */}
        <SideMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </motion.nav>
  )
}

