'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Calendar, 
  ArrowRight, 
  TrendingUp,
  Zap,
  Globe,
  Building
} from 'lucide-react'

// Helper function to format date consistently (avoiding hydration errors)
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

export default function NewsPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const news = [
    {
      id: 1,
      title: 'AI Revolutionizes Property Valuation',
      excerpt: 'Our new AI algorithm can predict property values with 95% accuracy, transforming how we approach real estate investments.',
      date: '2024-01-15',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
      featured: true,
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Virtual Reality Tours Hit New Milestone',
      excerpt: 'Over 10,000 virtual property tours completed this month, proving the future of real estate is immersive.',
      date: '2024-01-12',
      category: 'Innovation',
      image: 'https://images.unsplash.com/photo-1592478411213-6153e4c4c8f4?w=400&h=250&fit=crop',
      featured: false,
      readTime: '3 min read'
    },
    {
      id: 3,
      title: 'Smart Cities Integration Program',
      excerpt: 'NexusReal partners with major cities to integrate smart home technology into urban development plans.',
      date: '2024-01-10',
      category: 'Partnership',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop',
      featured: false,
      readTime: '4 min read'
    }
  ]

  const categories = [
    { name: 'Technology', icon: Zap, color: 'neon-blue' },
    { name: 'Innovation', icon: TrendingUp, color: 'neon-purple' },
    { name: 'Market', icon: Globe, color: 'neon-green' },
    { name: 'Development', icon: Building, color: 'neon-pink' }
  ]

  return (
    <section ref={ref} className="py-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Latest <span className="text-gradient">News & Insights</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Stay updated with the latest trends, innovations, and developments in the future of real estate.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg border transition-all duration-300 group ${
                category.name === 'Technology'
                  ? `bg-${category.color}/10 border-${category.color}/30 text-${category.color}`
                  : 'bg-black/50 border-white/20 text-white/60 hover:border-white/40 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="h-4 w-4" />
              <span className="font-medium">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="group"
            >
              <div className="card card-hover h-full overflow-hidden">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Featured Badge */}
                  {article.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-neon-blue/90 text-black text-xs font-bold rounded-full">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Category */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/50 text-white text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-white/60 mb-4 group-hover:text-white/80 transition-colors duration-300 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-white/40 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(article.date)}</span>
                      </div>
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Read More */}
                  <motion.button 
                    className="flex items-center space-x-2 text-neon-blue hover:text-neon-purple transition-colors duration-300 font-medium"
                    whileHover={{ x: 5 }}
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
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
              Stay Ahead of the Curve
            </h3>
            <p className="text-white/60 mb-6">
              Subscribe to our newsletter and get the latest insights, market trends, and exclusive property updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-black/50 border border-neon-blue/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all duration-300"
              />
              <motion.button 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}