'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  ArrowRight, 
  Play, 
  Zap, 
  Star,
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react'

export default function CTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    'Free Virtual Tours',
    'AI-Powered Matching',
    '24/7 Support',
    'Smart Contracts'
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-neon-blue/10 via-black to-neon-purple/10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent" />
      
      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-20 w-32 h-32 bg-neon-blue/10 rounded-full blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        className="absolute bottom-20 right-20 w-40 h-40 bg-neon-purple/10 rounded-full blur-2xl"
      />

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
                Ready to Get Started?
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Experience the <span className="text-gradient">Future</span> of Real Estate Today
            </h2>

            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Join thousands of satisfied clients who have already discovered their dream homes 
              through our revolutionary platform. Don't wait - the future of real estate is here.
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
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button 
                className="btn-primary flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Your Search</span>
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

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-6 text-white/60">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-neon-blue" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-neon-purple" />
                <span>info@nexusreal.com</span>
              </div>
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
              
              {/* Success Stats */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-yellow-400 mr-2" />
                  <span className="text-2xl font-bold text-white">4.9/5</span>
                </div>
                <p className="text-white/60">Average Client Rating</p>
              </div>

              {/* Testimonial Quote */}
              <div className="text-center mb-8">
                <div className="h-8 w-8 text-neon-blue mx-auto mb-4 opacity-50">"</div>
                <p className="text-white/80 italic mb-4">
                  "NexusReal completely transformed how I view real estate. The AI-powered matching found me the perfect smart home in just 2 weeks!"
                </p>
                <div className="text-white/60 text-sm">
                  - Sarah Chen, Tech Entrepreneur
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-white/60 mb-2">
                    <span>Client Satisfaction</span>
                    <span>99%</span>
                  </div>
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={inView ? { width: '99%' } : {}}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-white/60 mb-2">
                    <span>Properties Sold</span>
                    <span>500+</span>
                  </div>
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-neon-purple to-neon-pink h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={inView ? { width: '95%' } : {}}
                      transition={{ duration: 2, delay: 0.7 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-white/60 mb-2">
                    <span>AI Accuracy</span>
                    <span>95%</span>
                  </div>
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-neon-pink to-neon-green h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={inView ? { width: '95%' } : {}}
                      transition={{ duration: 2, delay: 0.9 }}
                    />
                  </div>
                </div>
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Limited Time Offer
            </h3>
            <p className="text-white/60 mb-6">
              Get your first virtual tour free and receive a personalized AI property recommendation within 24 hours.
            </p>
            <motion.button 
              className="btn-primary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Claim Your Free Tour Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}