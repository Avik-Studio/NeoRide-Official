// Google Maps Service for Real-time Route Calculation
// Implements dynamic pricing based on actual distance and time

interface RouteResponse {
  distance: {
    text: string;
    value: number; // in meters
  };
  duration: {
    text: string;
    value: number; // in seconds
  };
  status: string;
}

interface FareCalculation {
  distance: string;
  duration: string;
  baseFare: number;
  distanceFare: number;
  totalFare: number;
  perKmRate: number;
  petrolPrice: number;
  breakdown: {
    baseFare: number;
    distanceCost: number;
    total: number;
  };
}

// Current petrol price in Kolkata (average of last 2 months)
const CURRENT_PETROL_PRICE = 106.50; // INR per liter (Jan 2025 average)

// Pricing configuration as per requirements
const PRICING_CONFIG = {
  baseFare: 50, // Base fare in INR
  rateUnder10km: 25, // INR per km for distance under 10km
  rateOver10km: 35, // INR per km for distance over 10km
  petrolPrice: CURRENT_PETROL_PRICE,
};

class GoogleMapsService {
  private directionsService: google.maps.DirectionsService | null = null;
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Wait for Google Maps to be loaded
      if (typeof google === 'undefined' || !google.maps) {
        throw new Error('Google Maps not loaded');
      }

      this.directionsService = new google.maps.DirectionsService();
      this.isInitialized = true;
      console.log('Google Maps Service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google Maps Service:', error);
      throw error;
    }
  }

  async getRouteData(pickup: string, destination: string): Promise<RouteResponse | null> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (!this.directionsService) {
      console.error('Directions service not available');
      return null;
    }

    return new Promise((resolve, reject) => {
      this.directionsService!.route(
        {
          origin: pickup,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            const route = result.routes[0];
            const leg = route.legs[0];
            
            resolve({
              distance: {
                text: leg.distance?.text || '0 km',
                value: leg.distance?.value || 0,
              },
              duration: {
                text: leg.duration?.text || '0 mins',
                value: leg.duration?.value || 0,
              },
              status: 'OK',
            });
          } else {
            console.error('Directions request failed:', status);
            reject(new Error(`Directions request failed: ${status}`));
          }
        }
      );
    });
  }

  calculateFare(distanceInMeters: number, durationInSeconds: number): FareCalculation {
    const distanceInKm = distanceInMeters / 1000;
    const durationInMinutes = Math.ceil(durationInSeconds / 60);

    // Apply pricing algorithm as per requirements
    let perKmRate: number;
    let distanceFare: number;

    if (distanceInKm <= 10) {
      // Under or equal to 10km: ₹25 per km
      perKmRate = PRICING_CONFIG.rateUnder10km;
      distanceFare = distanceInKm * perKmRate;
    } else {
      // Over 10km: ₹35 per km
      perKmRate = PRICING_CONFIG.rateOver10km;
      distanceFare = distanceInKm * perKmRate;
    }

    const baseFare = PRICING_CONFIG.baseFare;
    const totalFare = baseFare + distanceFare;

    return {
      distance: `${distanceInKm.toFixed(1)} km`,
      duration: `${durationInMinutes} mins`,
      baseFare,
      distanceFare: Math.round(distanceFare),
      totalFare: Math.round(totalFare),
      perKmRate,
      petrolPrice: PRICING_CONFIG.petrolPrice,
      breakdown: {
        baseFare,
        distanceCost: Math.round(distanceFare),
        total: Math.round(totalFare),
      },
    };
  }

  async calculateRouteAndFare(pickup: string, destination: string): Promise<FareCalculation | null> {
    try {
      const routeData = await this.getRouteData(pickup, destination);
      
      if (!routeData) {
        console.error('Failed to get route data');
        return null;
      }

      const fareCalculation = this.calculateFare(
        routeData.distance.value,
        routeData.duration.value
      );

      console.log('Route calculation successful:', {
        pickup,
        destination,
        distance: fareCalculation.distance,
        duration: fareCalculation.duration,
        totalFare: fareCalculation.totalFare,
      });

      return fareCalculation;
    } catch (error) {
      console.error('Error calculating route and fare:', error);
      return null;
    }
  }

  // Get current petrol price (average of last 2 months)
  getCurrentPetrolPrice(): number {
    return PRICING_CONFIG.petrolPrice;
  }

  // Get pricing breakdown for display
  getPricingInfo(distanceInKm: number) {
    const rate = distanceInKm <= 10 ? PRICING_CONFIG.rateUnder10km : PRICING_CONFIG.rateOver10km;
    return {
      baseFare: PRICING_CONFIG.baseFare,
      perKmRate: rate,
      petrolPrice: PRICING_CONFIG.petrolPrice,
      priceCategory: distanceInKm <= 10 ? 'Under 10km' : 'Over 10km',
    };
  }
}

// Export singleton instance
export const googleMapsService = new GoogleMapsService();

// Export types
export type { RouteResponse, FareCalculation };