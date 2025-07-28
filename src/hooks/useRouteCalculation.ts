// React Hook for Real-time Route Calculation
import { useState, useEffect, useCallback } from 'react';
import { googleMapsService, type FareCalculation } from '../services/googleMapsService';

interface RouteCalculationState {
  isLoading: boolean;
  fareData: FareCalculation | null;
  error: string | null;
}

export const useRouteCalculation = (pickup: string, destination: string) => {
  const [state, setState] = useState<RouteCalculationState>({
    isLoading: false,
    fareData: null,
    error: null,
  });

  const calculateRoute = useCallback(async () => {
    if (!pickup || !destination || pickup === destination) {
      setState({
        isLoading: false,
        fareData: null,
        error: null,
      });
      return;
    }

    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const fareData = await googleMapsService.calculateRouteAndFare(pickup, destination);
      
      if (fareData) {
        setState({
          isLoading: false,
          fareData,
          error: null,
        });
      } else {
        setState({
          isLoading: false,
          fareData: null,
          error: 'Unable to calculate route. Please check the locations.',
        });
      }
    } catch (error) {
      console.error('Route calculation error:', error);
      setState({
        isLoading: false,
        fareData: null,
        error: 'Failed to calculate route. Please try again.',
      });
    }
  }, [pickup, destination]);

  // Auto-calculate when pickup or destination changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      calculateRoute();
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timeoutId);
  }, [calculateRoute]);

  // Manual recalculation
  const recalculate = useCallback(() => {
    calculateRoute();
  }, [calculateRoute]);

  return {
    ...state,
    recalculate,
  };
};