import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, DollarSign, Car, Users, Zap } from 'lucide-react';
import { Loader } from '@googlemaps/js-api-loader';

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
  const [isCalculating, setIsCalculating] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string>('');

  const rideTypes = [
    {
      id: 'economy',
      name: 'Neoride Go',
      description: 'Affordable rides for everyday travel',
      pricePerKm: 12,
      icon: '🚗',
      color: 'from-green-400 to-green-600',
      features: ['4 seats', 'AC', 'Reliable drivers', 'GPS tracking'],
      estimatedTime: '2-5 min'
    },
    {
      id: 'comfort',
      name: 'Neoride Comfort',
      description: 'Premium vehicles with extra space',
      pricePerKm: 18,
      icon: '🚙',
      color: 'from-blue-400 to-blue-600',
      features: ['4 seats', 'Premium AC', 'Top-rated drivers', 'Extra legroom'],
      estimatedTime: '3-7 min'
    },
    {
      id: 'luxury',
      name: 'Neoride Luxury',
      description: 'High-end vehicles for special occasions',
      pricePerKm: 35,
      icon: '🚘',
      color: 'from-purple-400 to-purple-600',
      features: ['4 seats', 'Luxury interior', 'Professional chauffeurs', 'Premium amenities'],
      estimatedTime: '5-10 min'
    }
  ];

  useEffect(() => {
    initializeMap();
  }, []);

  const initializeMap = async () => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey || apiKey === 'your-google-maps-api-key-here') {
      setMapError('Google Maps API key not configured. Add VITE_GOOGLE_MAPS_API_KEY to your .env file.');
      return;
    }

    try {
      const loader = new Loader({
        apiKey,
        version: 'weekly',
        libraries: ['places', 'geometry']
      });

      await loader.load();

      // Initialize map centered on Kolkata
      const mapElement = document.getElementById('ride-map');
      if (mapElement) {
        const mapInstance = new google.maps.Map(mapElement, {
          center: { lat: 22.5726, lng: 88.3639 }, // Kolkata coordinates
          zoom: 12,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        const directionsServiceInstance = new google.maps.DirectionsService();
        const directionsRendererInstance = new google.maps.DirectionsRenderer({
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: '#3B82F6',
            strokeWeight: 4
          }
        });

        directionsRendererInstance.setMap(mapInstance);

        setMap(mapInstance);
        setDirectionsService(directionsServiceInstance);
        setDirectionsRenderer(directionsRendererInstance);
        setIsMapLoaded(true);
      }
    } catch (error) {
      console.error('Error loading Google Maps:', error);
      setMapError('Failed to load Google Maps. Please check your API key and internet connection.');
    }
  };

  const calculateRoute = async () => {
    if (!pickup || !destination) {
      alert('Please enter both pickup and destination locations');
      return;
    }

    setIsCalculating(true);

    try {
      if (directionsService && directionsRenderer && isMapLoaded) {
        // Use Google Maps Directions API
        const request: google.maps.DirectionsRequest = {
          origin: pickup + ', Kolkata, West Bengal, India',
          destination: destination + ', Kolkata, West Bengal, India',
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        };

        directionsService.route(request, (result, status) => {
          if (status === 'OK' && result) {
            directionsRenderer.setDirections(result);
            
            const route = result.routes[0];
            const leg = route.legs[0];
            
            const distance = leg.distance?.value ? leg.distance.value / 1000 : 0; // Convert to km
            const duration = leg.duration?.value ? leg.duration.value / 60 : 0; // Convert to minutes
            
            const selectedType = rideTypes.find(type => type.id === selectedRideType);
            const baseFare = 50; // Base fare in INR
            const fare = Math.round(baseFare + (distance * (selectedType?.pricePerKm || 12)));

            setRideEstimate({
              distance: Math.round(distance * 10) / 10,
              duration: Math.round(duration),
              fare
            });
          } else {
            throw new Error('Could not calculate route: ' + status);
          }
        });
      } else {
        // Fallback calculation for demo
        const mockDistance = Math.random() * 15 + 3; // 3-18 km (realistic for Kolkata)
        const mockDuration = mockDistance * 4 + Math.random() * 10; // Traffic consideration
        
        const selectedType = rideTypes.find(type => type.id === selectedRideType);
        const baseFare = 50;
        const fare = Math.round(baseFare + (mockDistance * (selectedType?.pricePerKm || 12)));

        setRideEstimate({
          distance: Math.round(mockDistance * 10) / 10,
          duration: Math.round(mockDuration),
          fare
        });
      }
    } catch (error) {
      console.error('Error calculating route:', error);
      alert('Error calculating route. Please check your locations and try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleBookRide = () => {
    if (rideEstimate && onBookRide) {
      const selectedType = rideTypes.find(type => type.id === selectedRideType);
      const rideData = {
        pickup,
        destination,
        rideType: selectedRideType,
        rideTypeName: selectedType?.name,
        estimate: rideEstimate,
        estimatedArrival: selectedType?.estimatedTime
      };
      onBookRide(rideData);
    }
  };

  const popularLocations = [
    'Salt Lake City Center',
    'Park Street',
    'Netaji Subhash Airport',
    'Howrah Station',
    'Sealdah Station',
    'New Market',
    'Esplanade',
    'Gariahat'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Book Your Ride
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Quick and reliable rides across Kolkata
        </p>
      </div>

      {/* Location Inputs */}
      <div className="space-y-4">
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
              placeholder="Enter pickup location"
              list="pickup-suggestions"
            />
            <datalist id="pickup-suggestions">
              {popularLocations.map((location, index) => (
                <option key={index} value={location} />
              ))}
            </datalist>
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
              placeholder="Where to?"
              list="destination-suggestions"
            />
            <datalist id="destination-suggestions">
              {popularLocations.map((location, index) => (
                <option key={index} value={location} />
              ))}
            </datalist>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={calculateRoute}
          disabled={!pickup || !destination || isCalculating}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isCalculating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Calculating Route...</span>
            </>
          ) : (
            <>
              <Zap className="h-5 w-5" />
              <span>Find Rides</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Map */}
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 overflow-hidden">
        {mapError ? (
          <div className="h-full flex items-center justify-center p-6">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Map Preview</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
                {mapError}
              </p>
            </div>
          </div>
        ) : (
          <div id="ride-map" className="w-full h-full"></div>
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
            {rideTypes.map((type) => {
              const fare = Math.round(50 + (rideEstimate.distance * type.pricePerKm));
              return (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRideType(type.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedRideType === type.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                      : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{type.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">{type.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{type.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{type.estimatedTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Navigation className="h-3 w-3" />
                            <span>{rideEstimate.distance} km</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{rideEstimate.duration} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-800 dark:text-white">
                        ₹{fare}
                      </div>
                      <div className="text-sm text-gray-500">
                        ₹{type.pricePerKm}/km
                      </div>
                    </div>
                  </div>
                  
                  {selectedRideType === type.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        {type.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBookRide}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
          >
            <Car className="h-5 w-5" />
            <span>Book {rideTypes.find(t => t.id === selectedRideType)?.name}</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default RideBooking;