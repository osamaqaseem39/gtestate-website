'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Zap, 
  Target, 
  Users, 
  Award,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react'

export default function AboutPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    'AI-Powered Property Matching',
    'Virtual Reality Tours',
    'Smart Home Integration',
    '24/7 Customer Support',
    'Blockchain Security',
    'Predictive Analytics'
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent" />

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-neon-blue/10 border border-neon-blue/30 rounded-full text-neon-blue text-sm font-medium mb-4">
                <Zap className="inline w-4 h-4 mr-2" />
                About NexusReal
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Redefining the <span className="text-gradient">Future</span> of Real Estate
            </h2>

            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              We're not just selling properties; we're creating the next generation of living spaces. 
              Our cutting-edge technology, AI-powered insights, and immersive experiences are 
              transforming how people discover, experience, and invest in real estate.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="h-5 w-5 text-neon-green flex-shrink-0" />
                  <span className="text-white/80">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                className="btn-primary flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
              <motion.button 
                className="btn-secondary flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="h-4 w-4" />
                <span>Watch Demo</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="card p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-neon-purple/5" />
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient mb-2">500+</div>
                  <div className="text-white/60 text-sm">Properties Sold</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient mb-2">10K+</div>
                  <div className="text-white/60 text-sm">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient mb-2">99%</div>
                  <div className="text-white/60 text-sm">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient mb-2">24/7</div>
                  <div className="text-white/60 text-sm">AI Support</div>
                </div>
              </div>

              {/* Mission Statement */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-white/60 leading-relaxed">
                  To revolutionize real estate through technology, making property 
                  discovery and investment accessible, transparent, and intelligent 
                  for everyone.
                </p>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-neon-blue/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-neon-purple/20 rounded-full blur-xl"
            />
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Our Core Values</h3>
            <p className="text-white/60 max-w-2xl mx-auto">
              These principles guide everything we do and shape our vision for the future of real estate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Innovation',
                description: 'Constantly pushing boundaries with cutting-edge technology and creative solutions.',
                color: 'neon-blue'
              },
              {
                icon: Users,
                title: 'Customer First',
                description: 'Every decision we make is centered around delivering exceptional value to our clients.',
                color: 'neon-purple'
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'Committed to the highest standards of quality in everything we do.',
                color: 'neon-pink'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${value.color}/10 border border-${value.color}/30 mb-6 group-hover:bg-${value.color}/20 transition-all duration-300`}>
                  <value.icon className={`h-8 w-8 text-${value.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4 group-hover:text-gradient transition-colors duration-300">
                  {value.title}
                </h4>
                <p className="text-white/60 group-hover:text-white/80 transition-colors duration-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}