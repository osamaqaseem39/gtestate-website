'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Home, 
  Building, 
  Zap,
  Filter,
  SlidersHorizontal
} from 'lucide-react'

export default function QuickSearch() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [searchType, setSearchType] = useState('buy')
  const [showFilters, setShowFilters] = useState(false)

  const propertyTypes = [
    { name: 'All', icon: Home },
    { name: 'Apartments', icon: Building },
    { name: 'Houses', icon: Home },
    { name: 'Villas', icon: Building },
    { name: 'Penthouses', icon: Building },
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
            Find Your <span className="text-gradient">Dream Home</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Use our advanced search filters to find the perfect property that matches your lifestyle and budget.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full"
        >
          <div className="card p-8">
            {/* Search Type Toggle */}
            <div className="flex justify-center mb-8">
              <div className="flex border border-neon-blue/30 rounded-lg overflow-hidden">
                <button
                  onClick={() => setSearchType('buy')}
                  className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-all duration-300 ${
                    searchType === 'buy'
                      ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-black'
                      : 'bg-transparent text-white hover:bg-white/5'
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span>Buy</span>
                </button>
                <button
                  onClick={() => setSearchType('rent')}
                  className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-all duration-300 ${
                    searchType === 'rent'
                      ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-black'
                      : 'bg-transparent text-white hover:bg-white/5'
                  }`}
                >
                  <Building className="h-4 w-4" />
                  <span>Rent</span>
                </button>
              </div>
            </div>

            {/* Main Search Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neon-blue" />
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border border-neon-blue/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Property Type */}
              <div className="relative">
                <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neon-purple" />
                <select className="w-full pl-12 pr-4 py-4 bg-black/50 border border-neon-purple/30 rounded-lg text-white focus:ring-2 focus:ring-neon-purple focus:border-transparent transition-all duration-300">
                  <option>Property Type</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Villa</option>
                  <option>Penthouse</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neon-pink" />
                <select className="w-full pl-12 pr-4 py-4 bg-black/50 border border-neon-pink/30 rounded-lg text-white focus:ring-2 focus:ring-neon-pink focus:border-transparent transition-all duration-300">
                  <option>Price Range</option>
                  <option>$0 - $500,000</option>
                  <option>$500,000 - $1,000,000</option>
                  <option>$1,000,000 - $2,000,000</option>
                  <option>$2,000,000+</option>
                </select>
              </div>

              {/* Search Button */}
              <motion.button 
                className="btn-primary flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </motion.button>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex justify-center">
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-neon-blue hover:text-neon-purple transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Advanced Filters</span>
                <motion.div
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Filter className="h-4 w-4" />
                </motion.div>
              </motion.button>
            </div>

            {/* Advanced Filters */}
            <motion.div
              initial={false}
              animate={{ 
                height: showFilters ? 'auto' : 0,
                opacity: showFilters ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-neon-blue/20 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Bedrooms */}
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">Bedrooms</label>
                    <select className="w-full px-4 py-3 bg-black/50 border border-neon-blue/30 rounded-lg text-white focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all duration-300">
                      <option>Any</option>
                      <option>1+</option>
                      <option>2+</option>
                      <option>3+</option>
                      <option>4+</option>
                      <option>5+</option>
                    </select>
                  </div>

                  {/* Bathrooms */}
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">Bathrooms</label>
                    <select className="w-full px-4 py-3 bg-black/50 border border-neon-purple/30 rounded-lg text-white focus:ring-2 focus:ring-neon-purple focus:border-transparent transition-all duration-300">
                      <option>Any</option>
                      <option>1+</option>
                      <option>2+</option>
                      <option>3+</option>
                      <option>4+</option>
                    </select>
                  </div>

                  {/* Square Footage */}
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">Min. Sq Ft</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-3 bg-black/50 border border-neon-pink/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-neon-pink focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  {/* Smart Features */}
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">Smart Features</label>
                    <select className="w-full px-4 py-3 bg-black/50 border border-neon-green/30 rounded-lg text-white focus:ring-2 focus:ring-neon-green focus:border-transparent transition-all duration-300">
                      <option>Any</option>
                      <option>Smart Home</option>
                      <option>AI Integration</option>
                      <option>Security System</option>
                      <option>Energy Efficient</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Property Type Quick Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12"
          >
            <h3 className="text-xl font-bold text-white mb-6 text-center">Browse by Category</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {propertyTypes.map((type, index) => (
                <motion.button
                  key={type.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-center space-x-2 px-6 py-3 bg-black/50 border border-neon-blue/30 rounded-lg text-white hover:bg-neon-blue/10 hover:border-neon-blue/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <type.icon className="h-5 w-5 group-hover:text-neon-blue transition-colors duration-300" />
                  <span>{type.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}