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
    <Card className={`mt-4 transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10' 
        : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
    }`} style={{
      background: isDark 
        ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)'
        : undefined,
      border: isDark 
        ? '1px solid rgba(0, 198, 255, 0.2)'
        : undefined
    }}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Navigation className={`w-5 h-5 transition-colors ${
              isDark ? 'text-cyan-400' : 'text-blue-600'
            }`} />
            <span className={`text-lg font-semibold transition-colors ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Route Preview</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={recalculate}
            disabled={isLoading}
            className={`h-8 w-8 p-0 transition-all duration-300 ${
              isDark 
                ? 'hover:bg-slate-700 text-gray-300 hover:text-cyan-400' 
                : 'hover:bg-gray-100'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {/* Route Path */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/30"></div>
            <div className="flex-1">
              <div className={`text-sm font-medium transition-colors mb-1 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>Pickup Location</div>
              <div className={`text-base font-semibold truncate transition-colors ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>{pickupLocation}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-1.5">
            <div className={`w-px h-8 transition-colors ${
              isDark ? 'bg-slate-600' : 'bg-gray-300'
            }`}></div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/30"></div>
            <div className="flex-1">
              <div className={`text-sm font-medium transition-colors mb-1 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>Drop Location</div>
              <div className={`text-base font-semibold truncate transition-colors ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>{dropLocation}</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`w-full h-px mb-6 transition-colors ${
          isDark ? 'bg-slate-600' : 'bg-gray-200'
        }`}></div>

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
            {/* Trip Info Grid */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className={`w-4 h-4 transition-colors ${
                    isDark ? 'text-cyan-400' : 'text-blue-600'
                  }`} />
                  <span className={`text-sm font-medium transition-colors ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>Time</span>
                </div>
                <div className={`text-xl font-bold transition-colors ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {fareData.duration}
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className={`w-4 h-4 transition-colors ${
                    isDark ? 'text-cyan-400' : 'text-blue-600'
                  }`} />
                  <span className={`text-sm font-medium transition-colors ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>Distance</span>
                </div>
                <div className={`text-xl font-bold transition-colors ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {fareData.distance}
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <IndianRupee className="w-4 h-4 text-green-500" />
                  <span className={`text-sm font-medium transition-colors ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>Fare</span>
                </div>
                <div className="text-2xl font-bold text-green-500">
                  ₹{fareData.totalFare}
                </div>
              </div>
            </div>

            {/* Fare Breakdown */}
            <div className={`rounded-lg p-4 mb-6 transition-all duration-300 ${
              isDark 
                ? 'bg-slate-700/50 border border-slate-600' 
                : 'bg-white border border-blue-100'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className={`w-4 h-4 transition-colors ${
                  isDark ? 'text-cyan-400' : 'text-green-600'
                }`} />
                <span className={`text-sm font-semibold transition-colors ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Fare Breakdown</span>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className={`transition-colors ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>Base Fare</span>
                  <span className={`font-medium transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>₹{fareData.baseFare}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`transition-colors ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Distance ({fareData.distance})
                  </span>
                  <span className={`font-medium transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>₹{fareData.distanceFare}</span>
                </div>
                <div className={`border-t pt-3 flex justify-between font-bold text-base transition-colors ${
                  isDark ? 'border-slate-600' : 'border-gray-200'
                }`}>
                  <span className={`transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Total Amount</span>
                  <span className="text-green-500 text-lg">₹{fareData.totalFare}</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex items-center justify-between text-xs mb-6">
              <div className="flex items-center gap-2">
                <Fuel className={`w-3 h-3 transition-colors ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <span className={`transition-colors ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>Petrol: ₹{fareData.petrolPrice}/L</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className={`w-3 h-3 transition-colors ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <span className={`transition-colors ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>₹{fareData.perKmRate}/km ({fareData.priceCategory})</span>
              </div>
            </div>

            {/* Book Ride Button */}
            {onBookRide && (
              <Button 
                onClick={onBookRide}
                className={`w-full h-12 text-base font-semibold rounded-lg transition-all duration-500 transform hover:scale-105 ${
                  isDark 
                    ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/40' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                }`}
                style={{
                  background: isDark 
                    ? 'linear-gradient(135deg, #00D4FF 0%, #0099FF 50%, #0066FF 100%)'
                    : undefined,
                  boxShadow: isDark 
                    ? '0 10px 30px -5px rgba(0, 212, 255, 0.4), 0 0 20px rgba(0, 212, 255, 0.2)'
                    : undefined
                }}
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