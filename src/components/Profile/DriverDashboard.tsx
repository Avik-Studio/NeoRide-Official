import React from 'react';
import { motion } from 'framer-motion';
import { Car, DollarSign, Star, Users, Calendar, MapPin, Clock } from 'lucide-react';

const DriverDashboard: React.FC = () => {
  const stats = [
    { icon: Car, label: 'Total Rides', value: '247', color: 'text-blue-500' },
    { icon: DollarSign, label: 'Earnings', value: '₹2,58,750', color: 'text-green-500' },
    { icon: Star, label: 'Rating', value: '4.9', color: 'text-yellow-500' },
    { icon: Users, label: 'Happy Customers', value: '189', color: 'text-purple-500' }
  ];

  const recentRides = [
    {
      id: '1',
      customer: 'Rajesh Gupta',
      destination: 'Netaji Subhash Airport',
      date: '2024-01-15',
      amount: 450,
      status: 'completed'
    },
    {
      id: '2',
      customer: 'Anita Roy',
      destination: 'Park Street',
      date: '2024-01-14',
      amount: 280,
      status: 'completed'
    }
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

      {/* Recent Rides */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Recent Rides</h2>
        
        <div className="space-y-4">
          {recentRides.map((ride, index) => (
            <motion.div
              key={ride.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-4 border border-white/20 dark:border-gray-600/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {ride.customer}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{ride.destination}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{ride.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800 dark:text-white">
                    ₹{ride.amount}
                  </div>
                  <span className="text-sm px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300">
                    {ride.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Driver Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {[
          { icon: Car, title: 'Go Online', desc: 'Start accepting rides', color: 'bg-green-500' },
          { icon: Clock, title: 'View Schedule', desc: 'Manage your availability', color: 'bg-blue-500' },
          { icon: DollarSign, title: 'Earnings Report', desc: 'View detailed earnings', color: 'bg-purple-500' }
        ].map((action, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 cursor-pointer"
          >
            <action.icon className="h-8 w-8 text-white mb-4" />
            <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
              {action.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {action.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DriverDashboard;