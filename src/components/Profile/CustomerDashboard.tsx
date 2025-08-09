import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, CreditCard, Star, Clock, Plane } from 'lucide-react';

const CustomerDashboard: React.FC = () => {
  const bookings = [
    {
      id: '1',
      destination: 'Darjeeling Hills',
      date: '2024-02-15',
      status: 'confirmed',
      amount: 15999,
      tier: 'Luxury'
    },
    {
      id: '2',
      destination: 'Sundarbans',
      date: '2024-03-20',
      status: 'pending',
      amount: 12999,
      tier: 'Medium'
    }
  ];

  const stats = [
    { icon: Plane, label: 'Total Trips', value: '12', color: 'text-blue-500' },
    { icon: MapPin, label: 'Countries Visited', value: '8', color: 'text-green-500' },
    { icon: Star, label: 'Average Rating', value: '4.8', color: 'text-yellow-500' },
    { icon: Clock, label: 'Member Since', value: '2023', color: 'text-purple-500' }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid md:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30"
          >
            <stat.icon className={`h-8 w-8 ${stat.color} mb-4`} />
            <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              {stat.value}
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Recent Bookings</h2>
        
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-4 border border-white/20 dark:border-gray-600/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <MapPin className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {booking.destination}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{booking.date}</span>
                      </div>
                      <span className="capitalize px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300">
                        {booking.tier}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800 dark:text-white">
                    ₹{booking.amount}
                  </div>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                      : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {[
          { icon: Calendar, title: 'Book New Trip', desc: 'Explore new destinations', path: '/packages' },
          { icon: CreditCard, title: 'Payment History', desc: 'View transaction history', action: 'payment' },
          { icon: Star, title: 'Reviews & Ratings', desc: 'Share your experiences', action: 'reviews' }
        ].map((action, index) => (
          action.path ? (
            <Link key={index} to={action.path}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 cursor-pointer"
              >
                <action.icon className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {action.desc}
                </p>
              </motion.div>
            </Link>
          ) : (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (action.action === 'payment') {
                  alert('Payment History:\n\nDarjeeling Hills - ₹15,999 (Paid)\nSundarbans - ₹12,999 (Pending)\nKolkata Heritage - ₹8,999 (Paid)\n\nTotal Spent: ₹36,997');
                } else if (action.action === 'reviews') {
                  alert('Your Reviews:\n\nDarjeeling Hills - 5★\n"Amazing experience! The tea gardens were beautiful."\n\nKolkata Heritage - 4★\n"Great cultural tour, learned a lot about the city."\n\nAverage Rating: 4.5★');
                }
              }}
              className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 cursor-pointer"
            >
              <action.icon className="h-8 w-8 text-blue-500 mb-4" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                {action.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {action.desc}
              </p>
            </motion.div>
          )
        ))}
      </motion.div>
    </div>
  );
};

export default CustomerDashboard;