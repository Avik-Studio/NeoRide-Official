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
  priceCategory?: string; // Price category for UI display (e.g., "1-10km")
}

// Current petrol price in Kolkata (average of last 2 months)
const CURRENT_PETROL_PRICE = 106.50; // INR per liter (Jan 2025 average)

// Pricing configuration as per requirements - 3-tier pricing system
const PRICING_CONFIG = {
  baseFare: 50, // Base fare in INR
  rate1to10km: 18, // INR per km for 1-10km
  rate11to30km: 22, // INR per km for 11-30km
  rate30plusKm: 25, // INR per km for 30+ km
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

    // Apply 3-tier pricing algorithm as per requirements
    let distanceFare = 0;
    let currentRate = 0;
    let priceCategory = '';

    if (distanceInKm <= 10) {
      // 1-10km: ₹18 per km
      distanceFare = distanceInKm * PRICING_CONFIG.rate1to10km;
      currentRate = PRICING_CONFIG.rate1to10km;
      priceCategory = '1-10km';
    } else if (distanceInKm <= 30) {
      // 11-30km: First 10km at ₹18/km + remaining at ₹22/km
      const first10km = 10 * PRICING_CONFIG.rate1to10km;
      const remaining = (distanceInKm - 10) * PRICING_CONFIG.rate11to30km;
      distanceFare = first10km + remaining;
      currentRate = PRICING_CONFIG.rate11to30km; // Show the current tier rate
      priceCategory = '11-30km';
    } else {
      // 30+ km: First 10km at ₹18/km + next 20km at ₹22/km + remaining at ₹25/km
      const first10km = 10 * PRICING_CONFIG.rate1to10km;
      const next20km = 20 * PRICING_CONFIG.rate11to30km;
      const remaining = (distanceInKm - 30) * PRICING_CONFIG.rate30plusKm;
      distanceFare = first10km + next20km + remaining;
      currentRate = PRICING_CONFIG.rate30plusKm; // Show the current tier rate
      priceCategory = '30+ km';
    }

    const baseFare = PRICING_CONFIG.baseFare;
    const totalFare = baseFare + distanceFare;

    return {
      distance: `${distanceInKm.toFixed(1)} km`,
      duration: `${durationInMinutes} mins`,
      baseFare,
      distanceFare: Math.round(distanceFare),
      totalFare: Math.round(totalFare),
      perKmRate: currentRate, // Current tier rate instead of average
      petrolPrice: PRICING_CONFIG.petrolPrice,
      breakdown: {
        baseFare,
        distanceCost: Math.round(distanceFare),
        total: Math.round(totalFare),
      },
      priceCategory, // Add price category for UI
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
    let rate: number;
    let priceCategory: string;

    if (distanceInKm <= 10) {
      rate = PRICING_CONFIG.rate1to10km;
      priceCategory = '1-10km';
    } else if (distanceInKm <= 30) {
      rate = PRICING_CONFIG.rate11to30km;
      priceCategory = '11-30km';
    } else {
      rate = PRICING_CONFIG.rate30plusKm;
      priceCategory = '30+ km';
    }

    return {
      baseFare: PRICING_CONFIG.baseFare,
      perKmRate: rate,
      petrolPrice: PRICING_CONFIG.petrolPrice,
      priceCategory,
      allRates: {
        tier1: PRICING_CONFIG.rate1to10km,
        tier2: PRICING_CONFIG.rate11to30km,
        tier3: PRICING_CONFIG.rate30plusKm,
      },
    };
  }
}

// Export singleton instance
export const googleMapsService = new GoogleMapsService();

// Export types
export type { RouteResponse, FareCalculation };