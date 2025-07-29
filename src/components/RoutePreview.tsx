// Enhanced Route Preview Component with Real-time Pricing
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Navigation, 
  Clock, 
  MapPin, 
  IndianRupee, 
  Fuel, 
  RefreshCw,
  TrendingUp,
  Info
} from 'lucide-react';
import { useRouteCalculation } from '../hooks/useRouteCalculation';
import { Skeleton } from './ui/skeleton';
import { useTheme } from '../contexts/ThemeContext';

interface RoutePreviewProps {
  pickupLocation: string;
  dropLocation: string;
  onBookRide?: () => void;
}

export const RoutePreview: React.FC<RoutePreviewProps> = ({
  pickupLocation,
  dropLocation,
  onBookRide
}) => {
  const { isDark } = useTheme();
  const { isLoading, fareData, error, recalculate } = useRouteCalculation(
    pickupLocation,
    dropLocation
  );

  if (!pickupLocation || !dropLocation) {
    return null;
  }

  return (
    <Card className={`mt-4 transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 shadow-xl' 
        : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
    }`}>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Navigation className={`w-5 h-5 transition-colors ${
              isDark ? 'text-cyan-400' : 'text-blue-600'
            }`} />
            <span className={`font-semibold transition-colors ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Route Preview</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={recalculate}
            disabled={isLoading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {/* Route Path */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            <div className="flex-1">
              <div className={`text-sm font-medium transition-colors ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Pickup Location</div>
              <div className={`text-sm truncate transition-colors ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>{pickupLocation}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 ml-1.5">
            <div className="w-px h-6 bg-gray-300"></div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Drop Location</div>
              <div className="text-sm text-gray-600 truncate">{dropLocation}</div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Skeleton className="h-4 w-12 mx-auto mb-2" />
                <Skeleton className="h-6 w-16 mx-auto" />
              </div>
              <div className="text-center">
                <Skeleton className="h-4 w-12 mx-auto mb-2" />
                <Skeleton className="h-6 w-16 mx-auto" />
              </div>
              <div className="text-center">
                <Skeleton className="h-4 w-12 mx-auto mb-2" />
                <Skeleton className="h-6 w-20 mx-auto" />
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-4">
            <div className="text-red-600 text-sm mb-2">{error}</div>
            <Button variant="outline" size="sm" onClick={recalculate}>
              Try Again
            </Button>
          </div>
        )}

        {/* Route Details */}
        {fareData && !isLoading && !error && (
          <>
            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-blue-200 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-gray-700">Time</span>
                </div>
                <div className="text-sm font-bold text-gray-900">
                  {fareData.duration}
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-gray-700">Distance</span>
                </div>
                <div className="text-sm font-bold text-gray-900">
                  {fareData.distance}
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <IndianRupee className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-gray-700">Total Fare</span>
                </div>
                <div className="text-lg font-bold text-green-600">
                  ₹{fareData.totalFare}
                </div>
              </div>
            </div>

            {/* Fare Breakdown */}
            <div className="bg-white rounded-lg p-3 border border-blue-100 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-900">Fare Breakdown</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Fare</span>
                  <span className="font-medium">₹{fareData.baseFare}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Distance ({fareData.distance})
                  </span>
                  <span className="font-medium">₹{fareData.distanceFare}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span className="text-green-600">₹{fareData.totalFare}</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Fuel className="w-3 h-3" />
                <span>Petrol: ₹{fareData.petrolPrice}/L</span>
              </div>
              <div className="flex items-center gap-1">
                <Info className="w-3 h-3" />
                <span>₹{fareData.perKmRate}/km ({fareData.priceCategory})</span>
              </div>
            </div>

            {/* Book Ride Button */}
            {onBookRide && (
              <Button 
                onClick={onBookRide}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Book Ride for ₹{fareData.totalFare}
              </Button>
            )}
          </>
        )}

        {/* Fallback for no data */}
        {!fareData && !isLoading && !error && (
          <div className="text-center py-4 text-gray-500 text-sm">
            Enter pickup and drop locations to see fare estimate
          </div>
        )}
      </CardContent>
    </Card>
  );
};