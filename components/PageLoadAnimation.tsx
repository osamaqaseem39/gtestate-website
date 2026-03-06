'use client'

import React from 'react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
  },
}

type PageLoadAnimationProps = {
  children: React.ReactNode
  /** Stagger direct children with a slight delay between each */
  stagger?: boolean
  className?: string
}

export default function PageLoadAnimation({
  children,
  stagger = false,
  className,
}: PageLoadAnimationProps) {
  if (stagger) {
    const childArray = React.Children.toArray(children)
    return (
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {childArray.map((child, i) => (
          <motion.div key={i} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
