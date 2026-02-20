'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Diamond } from 'lucide-react'

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show custom cursor on desktop devices (not touch devices)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Detect hoverable elements
    const handleLinkHover = () => setIsHovering(true)
    const handleLinkLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Add hover detection for links and buttons
    const links = document.querySelectorAll('a, button')
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover)
      link.addEventListener('mouseleave', handleLinkLeave)
    })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover)
        link.removeEventListener('mouseleave', handleLinkLeave)
      })
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Outer ring - subtle gray border matching header theme */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-gray-300/40 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 20,
        }}
      />
      {/* Inner dot - white matching hero text */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
      {/* Diamond icon on hover - matching header diamond icon */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            opacity: 1,
            scale: 1,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          <Diamond className="w-6 h-6 text-white" strokeWidth={1.5} fill="none" />
        </motion.div>
      )}
    </>
  )
}
