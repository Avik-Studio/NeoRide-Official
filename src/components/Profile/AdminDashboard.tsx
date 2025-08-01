import React from 'react';
import { motion } from 'framer-motion';
import { Users, Car, Package, DollarSign, TrendingUp, MapPin, Calendar, Settings } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Total Users', value: '2,847', change: '+12%', color: 'text-blue-500' },
    { icon: Car, label: 'Active Drivers', value: '156', change: '+8%', color: 'text-green-500' },
    { icon: Package, label: 'Bookings Today', value: '47', change: '+23%', color: 'text-orange-500' },
    { icon: DollarSign, label: 'Revenue', value: '₹18,45,780', change: '+15%', color: 'text-purple-500' }
  ];

  const recentActivity = [
    { type: 'booking', user: 'Rahul Sharma', action: 'booked Darjeeling Hills package', time: '2 min ago' },
    { type: 'driver', user: 'Amit Kumar', action: 'completed ride to Netaji Subhash Airport', time: '5 min ago' },
    { type: 'user', user: 'Priya Das', action: 'signed up as customer', time: '10 min ago' },
    { type: 'booking', user: 'Sourav Ghosh', action: 'cancelled Sundarbans booking', time: '15 min ago' }
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
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              {stat.value}
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Recent Activity</h2>
        
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-4 border border-white/20 dark:border-gray-600/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'booking' ? 'bg-blue-500/20' :
                    activity.type === 'driver' ? 'bg-green-500/20' :
                    'bg-purple-500/20'
                  }`}>
                    {activity.type === 'booking' ? <Package className="h-5 w-5 text-blue-500" /> :
                     activity.type === 'driver' ? <Car className="h-5 w-5 text-green-500" /> :
                     <Users className="h-5 w-5 text-purple-500" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {activity.user}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {activity.action}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.time}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Admin Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {[
          { icon: Users, title: 'Manage Users', desc: 'View and manage all users', color: 'bg-blue-500' },
          { icon: TrendingUp, title: 'Analytics', desc: 'View detailed reports', color: 'bg-green-500' },
          { icon: Settings, title: 'System Settings', desc: 'Configure application', color: 'bg-purple-500' }
        ].map((action, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 cursor-pointer"
          >
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

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">System Overview</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 dark:text-white">Popular Destinations</h3>
            {['Darjeeling', 'Sundarbans', 'Kolkata', 'Digha'].map((dest, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-300">{dest}</span>
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {Math.floor(Math.random() * 50) + 10} bookings
                </span>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 dark:text-white">Today's Schedule</h3>
            {['New Bookings', 'Pending Reviews', 'Driver Applications', 'Support Tickets'].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {Math.floor(Math.random() * 20) + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;