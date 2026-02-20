'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ChevronUp,
  Menu,
  X,
  Diamond
} from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'About Us', href: '/about' },
    { name: 'What We Do', href: '/what-we-do' },
    { name: 'Projects', href: '/projects' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
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
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group">
            <div className="relative">
              {/* Small green upward arrow above */}
              <ChevronUp className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 text-light-green" />
              {/* Main logo text */}
              <span className="text-2xl font-semibold text-teal tracking-tight uppercase" style={{ letterSpacing: '0.02em' }}>
                GT ESTATE
              </span>
            </div>
            {/* Subtitle */}
            <span className="text-[10px] text-light-green mt-0.5 tracking-wider uppercase">
              REAL ESTATE SERVICES
            </span>
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

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-300/30 mt-4"
          >
            <div className="py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 text-lg font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-white bg-white/5'
                      : 'text-white hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

