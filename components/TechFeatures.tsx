'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Smartphone, 
  Cpu, 
  Shield, 
  Zap, 
  Eye, 
  Wifi,
  Home,
  Lock,
  Camera,
  Brain
} from 'lucide-react'

export default function TechFeatures() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: Smartphone,
      title: 'Smart Home Control',
      description: 'Control every aspect of your home with our intuitive mobile app',
      color: 'neon-blue',
    },
    {
      icon: Cpu,
      title: 'AI Integration',
      description: 'Advanced AI learns your preferences and optimizes your living space',
      color: 'neon-purple',
    },
    {
      icon: Shield,
      title: 'Security Systems',
      description: 'State-of-the-art security with facial recognition and smart locks',
      color: 'neon-green',
    },
    {
      icon: Eye,
      title: 'Virtual Tours',
      description: 'Immersive 360° virtual reality tours from anywhere in the world',
      color: 'neon-pink',
    },
    {
      icon: Wifi,
      title: 'IoT Connectivity',
      description: 'Seamless integration with all your smart devices and appliances',
      color: 'neon-blue',
    },
    {
      icon: Brain,
      title: 'Predictive Analytics',
      description: 'Smart algorithms predict maintenance needs and energy optimization',
      color: 'neon-purple',
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-gradient">Cutting-Edge</span> Technology
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Experience the future of living with our integrated smart home technology and AI-powered features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100
              }}
              className="group"
            >
              <div className="card card-hover h-full p-8 relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`relative mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-${feature.color}/10 border border-${feature.color}/30 group-hover:bg-${feature.color}/20 transition-all duration-300`}>
                  <feature.icon className={`h-8 w-8 text-${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                  <div className={`absolute inset-0 rounded-xl bg-${feature.color}/20 blur-lg group-hover:blur-xl transition-all duration-300`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gradient transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/60 group-hover:text-white/80 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${feature.color} to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Experience the Future?
            </h3>
            <p className="text-white/60 mb-6">
              Schedule a virtual tour and see how our technology can transform your living experience.
            </p>
            <motion.button 
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Virtual Tour
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}