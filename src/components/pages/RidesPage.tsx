import React from 'react';
import { motion } from 'framer-motion';
import RideBooking from '../Rides/RideBooking';

const RidesPage: React.FC = () => {
  const handleBookRide = (rideData: any) => {
    console.log('Booking ride:', rideData);
    alert(`Ride booked! ${rideData.rideType} from ${rideData.pickup} to ${rideData.destination}`);
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
            Ride{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose from our variety of ride options for your comfort and budget
          </p>
        </div>
      </motion.section>

      {/* Ride Booking */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 dark:border-gray-700/30"
        >
          <RideBooking onBookRide={handleBookRide} />
        </motion.div>
      </div>
    </div>
  );
};

export default RidesPage;