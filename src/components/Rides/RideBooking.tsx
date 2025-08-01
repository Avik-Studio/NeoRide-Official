import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, DollarSign, Car, Users } from 'lucide-react';

interface RideBookingProps {
  onBookRide?: (rideData: any) => void;
}

const RideBooking: React.FC<RideBookingProps> = ({ onBookRide }) => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedRideType, setSelectedRideType] = useState('economy');
  const [rideEstimate, setRideEstimate] = useState<{
    distance: number;
    duration: number;
    fare: number;
  } | null>(null);
  const [mapError, setMapError] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState(false);

  const rideTypes = [
    {
      id: 'economy',
      name: 'Economy',
      description: 'Affordable rides for everyday travel',
      pricePerKm: 15,
      icon: '🚗',
      color: 'from-green-400 to-green-600',
      features: ['4 seats', 'Basic comfort', 'Reliable drivers']
    },
    {
      id: 'comfort',
      name: 'Comfort',
      description: 'Premium vehicles with extra space',
      pricePerKm: 22,
      icon: '🚙',
      color: 'from-blue-400 to-blue-600',
      features: ['4 seats', 'Premium comfort', 'Top-rated drivers']
    },
    {
      id: 'luxury',
      name: 'Luxury',
      description: 'High-end vehicles for special occasions',
      pricePerKm: 45,
      icon: '🚘',
      color: 'from-purple-400 to-purple-600',
      features: ['4 seats', 'Luxury interior', 'Professional chauffeurs']
    }
  ];

  useEffect(() => {
    // Check if Google Maps API key is available
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey || apiKey === 'your-google-maps-api-key') {
      setMapError('Google Maps API key not configured. Please add VITE_GOOGLE_MAPS_API_KEY to your .env file.');
    }
  }, []);

  const calculateRoute = async () => {
    if (!pickup || !destination) {
      alert('Please enter both pickup and destination locations');
      return;
    }

    setIsCalculating(true);

    try {
      // Simulate route calculation for demo purposes
      // In a real app, you would use Google Maps Directions API
      const mockDistance = Math.random() * 20 + 5; // 5-25 km
      const mockDuration = mockDistance * 3 + Math.random() * 10; // Approximate time
      
      const selectedType = rideTypes.find(type => type.id === selectedRideType);
      const fare = Math.round(mockDistance * (selectedType?.pricePerKm || 15));

      setRideEstimate({
        distance: Math.round(mockDistance * 10) / 10,
        duration: Math.round(mockDuration),
        fare
      });
    } catch (error) {
      console.error('Error calculating route:', error);
      alert('Error calculating route. Please check your locations and try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleBookRide = () => {
    if (rideEstimate && onBookRide) {
      const rideData = {
        pickup,
        destination,
        rideType: selectedRideType,
        estimate: rideEstimate
      };
      onBookRide(rideData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Location Inputs */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Pickup Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-800 dark:text-white"
              placeholder="Enter pickup location (e.g., Salt Lake, Kolkata)"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Destination
          </label>
          <div className="relative">
            <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-800 dark:text-white"
              placeholder="Where to? (e.g., Park Street, Kolkata)"
            />
          </div>
        </div>
      </div>

      <button
        onClick={calculateRoute}
        disabled={!pickup || !destination}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isCalculating ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Calculating...</span>
          </>
        ) : (
          <span>Calculate Route</span>
        )}
      </button>

      {/* Map */}
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 overflow-hidden flex items-center justify-center">
        {mapError ? (
          <div className="text-center p-6">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Map Preview</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
              {mapError}
            </p>
          </div>
        ) : rideEstimate ? (
          <div className="text-center p-6">
            <Navigation className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <p className="text-gray-800 dark:text-white font-semibold mb-2">
              Route: {pickup} → {destination}
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
              <span>{rideEstimate.distance} km</span>
              <span>•</span>
              <span>{rideEstimate.duration} min</span>
            </div>
          </div>
        ) : (
          <div className="text-center p-6">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300">
              Enter pickup and destination to see route
            </p>
          </div>
        )}
      </div>

      {/* Ride Types */}
      {rideEstimate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Choose Your Ride</h3>
          
          <div className="space-y-3">
            {rideTypes.map((type) => (
              <motion.div
                key={type.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedRideType(type.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedRideType === type.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{type.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">{type.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{type.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500">{rideEstimate.duration} min</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Navigation className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500">{rideEstimate.distance} km</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-800 dark:text-white">
                      ₹{Math.round(rideEstimate.distance * type.pricePerKm)}
                    </div>
                    <div className="text-sm text-gray-500">
                      ₹{type.pricePerKm}/km
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBookRide}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Car className="h-5 w-5" />
            <span>Book {rideTypes.find(t => t.id === selectedRideType)?.name} Ride</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default RideBooking;