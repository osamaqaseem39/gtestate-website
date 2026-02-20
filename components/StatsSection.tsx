'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Building, Users, Star, Zap } from 'lucide-react'

export default function StatsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    {
      icon: Building,
      value: '500+',
      label: 'Smart Properties',
      color: 'neon-blue',
      delay: 0.1,
    },
    {
      icon: Users,
      value: '10K+',
      label: 'Happy Clients',
      color: 'neon-purple',
      delay: 0.2,
    },
    {
      icon: Star,
      value: '99%',
      label: 'Satisfaction Rate',
      color: 'neon-pink',
      delay: 0.3,
    },
    {
      icon: Zap,
      value: '24/7',
      label: 'AI Support',
      color: 'neon-green',
      delay: 0.4,
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent" />

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by <span className="text-gradient">Thousands</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Our innovative approach to real estate has transformed the way people find and experience their dream homes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: stat.delay,
                type: 'spring',
                stiffness: 100
              }}
              className="text-center group"
            >
              <div className={`relative mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-${stat.color}/30 bg-${stat.color}/10 group-hover:bg-${stat.color}/20 transition-all duration-300`}>
                <stat.icon className={`h-8 w-8 text-${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                <div className={`absolute inset-0 rounded-full bg-${stat.color}/20 blur-xl group-hover:blur-2xl transition-all duration-300`} />
              </div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: stat.delay + 0.3,
                  type: 'spring',
                  stiffness: 200
                }}
                className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-gradient transition-colors duration-300"
              >
                {stat.value}
              </motion.div>
              
              <p className="text-white/60 text-sm font-medium group-hover:text-white transition-colors duration-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}