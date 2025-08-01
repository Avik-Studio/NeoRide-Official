import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Car, MapPin, Calendar, Star, Users, Plane, Hotel, Shield } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Car,
      title: 'Quick Rides',
      description: 'Book instant rides across Kolkata and West Bengal for your daily commute',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Plane,
      title: 'Travel Packages',
      description: 'Curated travel experiences to amazing destinations across India',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Verified drivers and secure payment options for peace of mind',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Star,
      title: 'Top Rated',
      description: '4.9/5 rating from thousands of satisfied customers',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '200+', label: 'Indian Destinations' },
    { number: '1000+', label: 'Daily Rides' },
    { number: '4.9★', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 text-center"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Car className="h-12 w-12 text-blue-500" />
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Neoride
              </h1>
            </div>
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-4">
              Your Journey, Our Priority
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience seamless travel across India with instant rides and curated travel packages. 
              From daily commutes in Kolkata to exploring the beauty of West Bengal, we've got you covered.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-blue-500 text-blue-500 dark:text-blue-400 rounded-xl font-semibold text-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                Sign Up
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/30"
              >
                <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="py-20"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Neoride?
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We combine the convenience of ride-hailing with the excitement of travel planning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/30 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="py-20"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of satisfied customers who trust Neoride for their travel needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Sign Up Now
                  </motion.button>
                </Link>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
                  >
                    Login
                  </motion.button>
                </Link>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full"></div>
            <div className="absolute top-1/2 left-8 w-12 h-12 bg-white/5 rounded-full"></div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;