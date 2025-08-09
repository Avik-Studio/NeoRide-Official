import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, MapPin, Clock, Star, Users, Shield } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-32">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-yellow-400">Quick Rides</span> First
            </h1>
            <p className="text-2xl md:text-3xl mb-6 text-blue-100">
              Then Explore with Travel Packages
            </p>
            <p className="text-xl mb-12 text-blue-200 max-w-4xl mx-auto">
              Get instant rides across Kolkata in minutes, then discover West Bengal's beauty with our curated travel experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/rides">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-12 py-5 rounded-2xl text-xl transition-colors shadow-2xl min-w-[250px]"
                >
                  🚗 Book Quick Ride
                </motion.button>
              </Link>
              <Link to="/packages">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white hover:bg-white hover:text-blue-600 font-bold px-12 py-5 rounded-2xl text-xl transition-colors min-w-[250px]"
                >
                  ✈️ Travel Packages
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Neoride?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the best of West Bengal with our reliable, safe, and comfortable transportation services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Car,
                title: "Premium Rides",
                description: "Choose from economy to luxury vehicles for every occasion and budget.",
                color: "text-blue-600"
              },
              {
                icon: MapPin,
                title: "Local Expertise",
                description: "Navigate Kolkata and West Bengal with drivers who know every street.",
                color: "text-green-600"
              },
              {
                icon: Clock,
                title: "24/7 Service",
                description: "Round-the-clock availability for all your transportation needs.",
                color: "text-purple-600"
              },
              {
                icon: Star,
                title: "Top Rated",
                description: "Consistently rated 4.8+ stars by thousands of satisfied customers.",
                color: "text-yellow-600"
              },
              {
                icon: Users,
                title: "Trusted Drivers",
                description: "All drivers are verified, trained, and committed to your safety.",
                color: "text-red-600"
              },
              {
                icon: Shield,
                title: "Safe & Secure",
                description: "Advanced safety features and real-time tracking for peace of mind.",
                color: "text-indigo-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow"
              >
                <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50,000+", label: "Happy Customers" },
              { number: "1,000+", label: "Verified Drivers" },
              { number: "25+", label: "Cities Covered" },
              { number: "4.8★", label: "Average Rating" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
              >
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-200">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Experience Neoride?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of satisfied customers who trust Neoride for their daily commute and travel adventures.
            </p>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-12 py-4 rounded-lg text-lg transition-colors"
              >
                Get Started Today
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;