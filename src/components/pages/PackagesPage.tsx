import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, Users } from 'lucide-react';
import BookingModal from '../Booking/BookingModal';

const PackagesPage: React.FC = () => {
  const [bookingModal, setBookingModal] = React.useState<{ isOpen: boolean; package: any | null }>({
    isOpen: false,
    package: null
  });

  const packages = [
    {
      id: 1,
      title: 'Darjeeling Hills',
      destination: 'Darjeeling, West Bengal',
      price: 15999,
      duration: '7 days',
      image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
      rating: 4.8,
      reviews: 124,
      features: ['Tea Garden Tours', 'Toy Train Ride', 'Hill Station Hotels', 'All Meals']
    },
    {
      id: 2,
      title: 'Sundarbans Safari',
      destination: 'Sundarbans, West Bengal',
      price: 12999,
      duration: '5 days',
      image: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg',
      rating: 4.9,
      reviews: 89,
      features: ['Mangrove Safari', 'Tiger Spotting', 'Boat Rides', 'Local Cuisine']
    },
    {
      id: 3,
      title: 'Kolkata Heritage',
      destination: 'Kolkata, West Bengal',
      price: 8999,
      duration: '6 days',
      image: 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg',
      rating: 4.7,
      reviews: 156,
      features: ['Victoria Memorial', 'Howrah Bridge', 'Street Food Tours', 'Cultural Heritage']
    },
    {
      id: 4,
      title: 'Digha Beach',
      destination: 'Digha, West Bengal',
      price: 6999,
      duration: '4 days',
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      rating: 4.6,
      reviews: 78,
      features: ['Beach Activities', 'Sea Food', 'Beach Resorts', 'Water Sports']
    }
  ];

  const handleBookPackage = (pkg: any) => {
    setBookingModal({ isOpen: true, package: pkg });
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 text-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
            Travel{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Packages
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover our curated selection of amazing travel experiences
          </p>
        </div>
      </motion.section>

      {/* Packages Grid */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 pb-16"
      >
        <div className="grid md:grid-cols-2 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
              whileHover={{ y: -10 }}
              className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/30 dark:border-gray-700/30"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{pkg.rating}</span>
                    <span className="text-sm text-gray-500">({pkg.reviews})</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {pkg.title}
                  </h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ₹{pkg.price}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      per person
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-4 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{pkg.destination}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-gray-800 dark:text-white">Includes:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Star className="h-3 w-3 text-blue-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBookPackage(pkg)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  >
                    Book Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal({ isOpen: false, package: null })}
        package={bookingModal.package}
      />
    </div>
  );
};

export default PackagesPage;