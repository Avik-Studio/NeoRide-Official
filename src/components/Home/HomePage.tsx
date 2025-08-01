import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Star, Users, Car, Plane, Hotel, Navigation } from 'lucide-react';
import BookingModal from '../Booking/BookingModal';
import RideBooking from '../Rides/RideBooking';

interface Package {
  id: string;
  title: string;
  destination: string;
  price: number;
  duration: string;
  image: string;
  rating: number;
  features: string[];
}

interface PricingTier {
  name: string;
  price: number;
  perks: string[];
  color: string;
}

const HomePage: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('medium');
  const [bookingModal, setBookingModal] = useState<{ isOpen: boolean; package: Package | null }>({
    isOpen: false,
    package: null
  });
  const [activeTab, setActiveTab] = useState<'packages' | 'rides'>('packages');
  const [availablePackages, setAvailablePackages] = useState<Package[]>([]);

  const packages: Package[] = [
    {
      id: '1',
      title: 'Darjeeling Hills',
      destination: 'Darjeeling, West Bengal',
      price: 15999,
      duration: '7 days',
      image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
      rating: 4.8,
      features: ['Tea Garden Tours', 'Toy Train Ride', 'Hill Station Hotels', 'Tiger Hill Sunrise']
    },
    {
      id: '2',
      title: 'Sundarbans Safari',
      destination: 'Sundarbans, West Bengal',
      price: 12999,
      duration: '5 days',
      image: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg',
      rating: 4.9,
      features: ['Mangrove Safari', 'Tiger Spotting', 'Boat Rides', 'Local Cuisine']
    },
    {
      id: '3',
      title: 'Kolkata Heritage',
      destination: 'Kolkata, West Bengal',
      price: 8999,
      duration: '6 days',
      image: 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg',
      rating: 4.7,
      features: ['Victoria Memorial', 'Howrah Bridge', 'Street Food Tours', 'Cultural Heritage']
    }
  ];

  const pricingTiers: PricingTier[] = [
    {
      name: 'Standard',
      price: 3999,
      perks: ['Basic transportation', 'Standard accommodation', '24/7 support', 'Travel insurance'],
      color: 'bg-green-500'
    },
    {
      name: 'Medium',
      price: 7999,
      perks: ['Premium transportation', 'Comfort accommodation', 'Priority support', 'Travel insurance', 'Meal inclusion', 'Local guide'],
      color: 'bg-blue-500'
    },
    {
      name: 'Luxury',
      price: 12999,
      perks: ['Luxury transportation', 'Premium accommodation', 'VIP support', 'Comprehensive insurance', 'All meals included', 'Personal guide', 'Spa access', 'Priority booking'],
      color: 'bg-purple-500'
    }
  ];

  const handleBookPackage = (pkg: Package) => {
    setBookingModal({ isOpen: true, package: pkg });
  };

  const handleBookRide = (rideData: any) => {
    console.log('Booking ride:', rideData);
    // Here you would typically send the ride booking to your API
    alert(`Ride booked! ${rideData.rideType} from ${rideData.pickup} to ${rideData.destination}`);
  };

  const searchPackages = () => {
    if (destination) {
      // Filter packages based on destination
      const filtered = packages.filter(pkg => 
        pkg.destination.toLowerCase().includes(destination.toLowerCase()) ||
        pkg.title.toLowerCase().includes(destination.toLowerCase())
      );
      setAvailablePackages(filtered);
    } else {
      setAvailablePackages([]);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 text-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6"
          >
            Discover Amazing{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Travel Experiences
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            Book your perfect travel package with Neoride and create unforgettable memories
          </motion.p>
        </div>
      </motion.section>

      {/* Booking Form */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 mb-16"
      >
        <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 dark:border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Plan Your Journey</h2>
            
            {/* Tab Switcher */}
            <div className="flex bg-white/30 dark:bg-gray-800/30 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('packages')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'packages'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                }`}
              >
                <Plane className="h-4 w-4 inline mr-2" />
                Travel Packages
              </button>
              <button
                onClick={() => setActiveTab('rides')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'rides'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                }`}
              >
                <Car className="h-4 w-4 inline mr-2" />
                Quick Rides
              </button>
            </div>
          </div>
          
          {activeTab === 'packages' ? (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Destination and Date */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Destination
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-800 dark:text-white"
                      placeholder="Where do you want to go?"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Travel Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-800 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={searchPackages}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Search Packages
                </button>

                {/* Available Packages */}
                {availablePackages.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800 dark:text-white">Available Packages:</h3>
                    {availablePackages.map((pkg) => (
                      <div key={pkg.id} className="bg-white/30 dark:bg-gray-800/30 rounded-lg p-4 border border-white/20 dark:border-gray-600/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white">{pkg.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{pkg.destination}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-800 dark:text-white">₹{pkg.price}</div>
                            <button
                              onClick={() => handleBookPackage(pkg)}
                              className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                            >
                              Book
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing Tiers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Choose Your Experience
                </label>
                <div className="space-y-3">
                  {pricingTiers.map((tier) => (
                    <motion.div
                      key={tier.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTier(tier.name.toLowerCase())}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedTier === tier.name.toLowerCase()
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${tier.color}`} />
                          <h3 className="font-semibold text-gray-800 dark:text-white">{tier.name}</h3>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                          <span className="font-bold text-gray-800 dark:text-white">{tier.price}</span>
                        </div>
                      </div>
                      {selectedTier === tier.name.toLowerCase() && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-2"
                        >
                          {tier.perks.map((perk, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">{perk}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <RideBooking onBookRide={handleBookRide} />
          )}
        </div>
      </motion.section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal({ isOpen: false, package: null })}
        package={bookingModal.package}
      />

      {/* Featured Packages */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">
          Featured Travel Packages
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.8 }}
              whileHover={{ y: -10 }}
              className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/30 dark:border-gray-700/30"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{pkg.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{pkg.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">{pkg.destination}</p>
                
                <div className="space-y-2 mb-4">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Star className="h-3 w-3 text-blue-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">₹{pkg.price}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">/ {pkg.duration}</span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBookPackage(pkg)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Quick Stats */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 py-16"
      >
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { icon: Users, number: '50K+', label: 'Happy Travelers' },
            { icon: Car, number: '200+', label: 'Destinations' },
            { icon: Plane, number: '1000+', label: 'Flights Booked' },
            { icon: Hotel, number: '500+', label: 'Hotel Partners' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
              className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30"
            >
              <stat.icon className="h-8 w-8 text-blue-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;