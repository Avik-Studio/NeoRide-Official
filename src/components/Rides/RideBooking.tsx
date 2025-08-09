import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Car, CreditCard, Star, Navigation, Calculator } from 'lucide-react';
import { Loader } from '@googlemaps/js-api-loader';

interface RideBookingProps {
  onBookRide?: (rideData: any) => void;
}

const RideBooking: React.FC<RideBookingProps> = ({ onBookRide }) => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedRideType, setSelectedRideType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    duration: string;
    distanceValue: number;
  } | null>(null);
  const [fareEstimate, setFareEstimate] = useState<number | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const directionsService = useRef<google.maps.DirectionsService | null>(null);
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null);

  const rideTypes = [
    {
      id: 'neoride-go',
      name: 'Neoride Go',
      description: 'Affordable rides for everyday travel',
      baseRate: 12,
      perKmRate: 8,
      eta: '3-5 min',
      icon: Car,
      features: ['Affordable', 'Reliable', 'Everyday rides']
    },
    {
      id: 'neoride-comfort',
      name: 'Neoride Comfort',
      description: 'Premium comfort with AC cars',
      baseRate: 20,
      perKmRate: 15,
      eta: '2-4 min',
      icon: Car,
      features: ['AC Cars', 'Comfortable', 'Professional drivers']
    },
    {
      id: 'neoride-luxury',
      name: 'Neoride Luxury',
      description: 'Luxury cars for special occasions',
      baseRate: 50,
      perKmRate: 25,
      eta: '5-8 min',
      icon: Car,
      features: ['Luxury cars', 'Premium service', 'VIP treatment']
    }
  ];

  // Initialize Google Maps
  useEffect(() => {
    const initMap = async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
      // Skip Google Maps initialization if no API key is provided
      if (!apiKey || apiKey === 'demo-key' || apiKey.includes('your_') || apiKey.includes('placeholder')) {
        console.warn('Google Maps API key not configured. Using fallback mode.');
        setMapLoaded(false);
        return;
      }

      try {
        const loader = new Loader({
          apiKey: apiKey,
          version: 'weekly',
          libraries: ['places', 'geometry']
        });

        await loader.load();
        
        if (mapRef.current) {
          // Default to Kolkata coordinates
          const kolkataCenter = { lat: 22.5726, lng: 88.3639 };
          
          mapInstance.current = new google.maps.Map(mapRef.current, {
            zoom: 12,
            center: kolkataCenter,
            styles: [
              {
                featureType: 'all',
                elementType: 'geometry.fill',
                stylers: [{ color: '#f5f5f5' }]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#c9c9c9' }]
              }
            ]
          });

          directionsService.current = new google.maps.DirectionsService();
          directionsRenderer.current = new google.maps.DirectionsRenderer({
            suppressMarkers: false,
            polylineOptions: {
              strokeColor: '#3B82F6',
              strokeWeight: 4
            }
          });
          
          directionsRenderer.current.setMap(mapInstance.current);
          setMapLoaded(true);
        }
      } catch (error) {
        console.warn('Google Maps failed to load, using fallback mode:', error);
        setMapLoaded(false);
      }
    };

    initMap();
  }, []);

  // Calculate route and fare when both locations are entered
  useEffect(() => {
    if (pickup && destination && mapLoaded && directionsService.current && directionsRenderer.current) {
      calculateRoute();
    } else if (!pickup || !destination) {
      setRouteInfo(null);
      setFareEstimate(null);
      if (directionsRenderer.current) {
        directionsRenderer.current.setDirections({ routes: [] } as any);
      }
    }
  }, [pickup, destination, mapLoaded]);

  // Update fare when ride type changes
  useEffect(() => {
    if (routeInfo && selectedRideType) {
      calculateFare();
    }
  }, [selectedRideType, routeInfo]);

  const calculateRoute = async () => {
    if (!directionsService.current || !directionsRenderer.current) return;

    try {
      const request: google.maps.DirectionsRequest = {
        origin: pickup,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      };

      const result = await directionsService.current.route(request);
      
      if (result.routes[0]) {
        const route = result.routes[0].legs[0];
        
        setRouteInfo({
          distance: route.distance?.text || 'Unknown',
          duration: route.duration?.text || 'Unknown',
          distanceValue: route.distance?.value || 0
        });

        directionsRenderer.current.setDirections(result);
      }
    } catch (error) {
      console.warn('Route calculation failed, using fallback:', error);
      // Fallback calculation
      const estimatedDistance = Math.random() * 15 + 2; // 2-17 km
      const estimatedDuration = Math.round(estimatedDistance * 3); // ~3 min per km
      
      setRouteInfo({
        distance: `${estimatedDistance.toFixed(1)} km`,
        duration: `${estimatedDuration} min`,
        distanceValue: estimatedDistance * 1000
      });
    }
  };

  const calculateFare = () => {
    if (!routeInfo || !selectedRideType) return;

    const selectedType = rideTypes.find(type => type.id === selectedRideType);
    if (!selectedType) return;

    const distanceKm = routeInfo.distanceValue / 1000;
    const baseFare = selectedType.baseRate;
    const distanceFare = distanceKm * selectedType.perKmRate;
    const totalFare = Math.round(baseFare + distanceFare);

    setFareEstimate(totalFare);
  };

  const handleBookRide = async () => {
    if (!pickup || !destination || !selectedRideType) {
      alert('Please fill all fields and select a ride type');
      return;
    }

    setIsLoading(true);
    
    try {
      const rideData = {
        pickup,
        destination,
        rideType: selectedRideType,
        routeInfo,
        fareEstimate,
        timestamp: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onBookRide) {
        onBookRide(rideData);
      }
      
      alert(`Ride booked successfully! Estimated fare: ₹${fareEstimate}. Driver will arrive in 3-5 minutes.`);
    } catch (error) {
      alert('Failed to book ride. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 pt-4"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">Book Your Ride</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Quick, reliable rides across Kolkata</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Booking Form */}
        <div className="space-y-6">
          {/* Location Inputs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-6 space-y-4 border border-white/30 dark:border-gray-700/30"
          >
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-green-500" />
                <input
                  type="text"
                  placeholder="Pickup location (e.g., Park Street, Kolkata)"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-800 dark:text-white"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-red-500" />
                <input
                  type="text"
                  placeholder="Destination (e.g., Netaji Subhash Airport)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-800 dark:text-white"
                />
              </div>
            </div>

            {/* Route Information */}
            {routeInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Navigation className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                      Distance: {routeInfo.distance}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                      Duration: {routeInfo.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Ride Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Choose Your Ride</h2>
            <div className="grid gap-4">
              {rideTypes.map((ride) => {
                const IconComponent = ride.icon;
                const isSelected = selectedRideType === ride.id;
                const estimatedFare = routeInfo ? 
                  Math.round(ride.baseRate + (routeInfo.distanceValue / 1000) * ride.perKmRate) : 
                  null;

                return (
                  <motion.div
                    key={ride.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-xl p-6 cursor-pointer border-2 transition-all border border-white/30 dark:border-gray-700/30 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedRideType(ride.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white">{ride.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{ride.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">{ride.eta}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">4.8</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {estimatedFare ? (
                          <div className="text-lg font-semibold text-gray-800 dark:text-white">
                            ₹{estimatedFare}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            ₹{ride.baseRate} + ₹{ride.perKmRate}/km
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {ride.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Fare Estimate */}
          {fareEstimate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calculator className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800 dark:text-green-300">Estimated Fare</h3>
                    <p className="text-sm text-green-600 dark:text-green-400">Final fare may vary based on traffic</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  ₹{fareEstimate}
                </div>
              </div>
            </motion.div>
          )}

          {/* Book Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={handleBookRide}
              disabled={isLoading || !pickup || !destination || !selectedRideType}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Booking Ride...</span>
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  <span>Book Ride Now</span>
                  {fareEstimate && <span>- ₹{fareEstimate}</span>}
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Right Column - Map */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Route Map</h2>
          <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden">
            <div
              ref={mapRef}
              className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-xl"
            />
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-300">Loading map...</p>
                <p className="text-gray-600 dark:text-gray-300">Map not available</p>
                    Enter pickup and destination to see route
                  Configure Google Maps API key to enable map features
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RideBooking;