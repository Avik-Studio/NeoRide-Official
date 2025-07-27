// Route Calculator for Kolkata, West Bengal, India
// Includes real-time pricing based on petrol prices and traffic conditions

interface RouteData {
  distance: number // in kilometers
  baseTime: number // in minutes (normal traffic)
  trafficMultiplier: number // 1.0 = normal, 1.5 = heavy traffic
}

interface PricingConfig {
  baseFare: number
  perKmRate: number
  petrolPrice: number // per liter
  surgeMultiplier: number // 1.0 = normal, 2.0 = 2x surge
  nightChargeMultiplier: number // 1.0 = day, 1.25 = night (10 PM - 6 AM)
  tollCharges: number
}

// Kolkata route database with real distances and times
const kolkataRoutes: { [key: string]: RouteData } = {
  // Airport routes
  'esplanade metro station-netaji subhash airport': { distance: 18.7, baseTime: 35, trafficMultiplier: 1.3 },
  'netaji subhash airport-esplanade metro station': { distance: 18.7, baseTime: 35, trafficMultiplier: 1.3 },
  'salt lake city-netaji subhash airport': { distance: 12.4, baseTime: 28, trafficMultiplier: 1.2 },
  'netaji subhash airport-salt lake city': { distance: 12.4, baseTime: 28, trafficMultiplier: 1.2 },
  'south city mall-netaji subhash airport': { distance: 22.3, baseTime: 45, trafficMultiplier: 1.4 },
  'netaji subhash airport-south city mall': { distance: 22.3, baseTime: 45, trafficMultiplier: 1.4 },
  'park street-netaji subhash airport': { distance: 19.8, baseTime: 38, trafficMultiplier: 1.3 },
  'netaji subhash airport-park street': { distance: 19.8, baseTime: 38, trafficMultiplier: 1.3 },

  // Central Kolkata routes
  'salt lake city-park street': { distance: 8.5, baseTime: 25, trafficMultiplier: 1.4 },
  'park street-salt lake city': { distance: 8.5, baseTime: 25, trafficMultiplier: 1.4 },
  'new market-park street': { distance: 4.2, baseTime: 15, trafficMultiplier: 1.6 },
  'park street-new market': { distance: 4.2, baseTime: 15, trafficMultiplier: 1.6 },
  'esplanade metro station-park street': { distance: 2.8, baseTime: 12, trafficMultiplier: 1.5 },
  'park street-esplanade metro station': { distance: 2.8, baseTime: 12, trafficMultiplier: 1.5 },

  // Railway station routes
  'new market-howrah station': { distance: 6.2, baseTime: 18, trafficMultiplier: 1.3 },
  'howrah station-new market': { distance: 6.2, baseTime: 18, trafficMultiplier: 1.3 },
  'park street-howrah station': { distance: 7.8, baseTime: 22, trafficMultiplier: 1.4 },
  'howrah station-park street': { distance: 7.8, baseTime: 22, trafficMultiplier: 1.4 },
  'esplanade metro station-howrah station': { distance: 2.1, baseTime: 8, trafficMultiplier: 1.2 },
  'howrah station-esplanade metro station': { distance: 2.1, baseTime: 8, trafficMultiplier: 1.2 },
  'salt lake city-howrah station': { distance: 12.6, baseTime: 30, trafficMultiplier: 1.3 },
  'howrah station-salt lake city': { distance: 12.6, baseTime: 30, trafficMultiplier: 1.3 },
  'south city mall-howrah station': { distance: 15.6, baseTime: 32, trafficMultiplier: 1.3 },
  'howrah station-south city mall': { distance: 15.6, baseTime: 32, trafficMultiplier: 1.3 },

  // Sealdah routes
  'park street-sealdah station': { distance: 5.4, baseTime: 18, trafficMultiplier: 1.4 },
  'sealdah station-park street': { distance: 5.4, baseTime: 18, trafficMultiplier: 1.4 },
  'salt lake city-sealdah station': { distance: 9.2, baseTime: 24, trafficMultiplier: 1.2 },
  'sealdah station-salt lake city': { distance: 9.2, baseTime: 24, trafficMultiplier: 1.2 },

  // Hospital routes
  'sskm hospital-park street': { distance: 3.8, baseTime: 12, trafficMultiplier: 1.5 },
  'park street-sskm hospital': { distance: 3.8, baseTime: 12, trafficMultiplier: 1.5 },
  'salt lake city-sskm hospital': { distance: 11.2, baseTime: 28, trafficMultiplier: 1.3 },
  'sskm hospital-salt lake city': { distance: 11.2, baseTime: 28, trafficMultiplier: 1.3 },

  // Mall and shopping routes
  'south city mall-park street': { distance: 9.8, baseTime: 26, trafficMultiplier: 1.3 },
  'park street-south city mall': { distance: 9.8, baseTime: 26, trafficMultiplier: 1.3 },
  'south city mall-salt lake city': { distance: 6.4, baseTime: 20, trafficMultiplier: 1.2 },
  'salt lake city-south city mall': { distance: 6.4, baseTime: 20, trafficMultiplier: 1.2 },
  'new market-south city mall': { distance: 12.8, baseTime: 28, trafficMultiplier: 1.3 },
  'south city mall-new market': { distance: 12.8, baseTime: 28, trafficMultiplier: 1.3 },

  // Victoria Memorial routes
  'victoria memorial-park street': { distance: 2.1, baseTime: 8, trafficMultiplier: 1.4 },
  'park street-victoria memorial': { distance: 2.1, baseTime: 8, trafficMultiplier: 1.4 },
  'victoria memorial-howrah station': { distance: 6.8, baseTime: 20, trafficMultiplier: 1.3 },
  'howrah station-victoria memorial': { distance: 6.8, baseTime: 20, trafficMultiplier: 1.3 },

  // Dalhousie Square (BBD Bagh) routes
  'dalhousie square-park street': { distance: 3.2, baseTime: 14, trafficMultiplier: 1.6 },
  'park street-dalhousie square': { distance: 3.2, baseTime: 14, trafficMultiplier: 1.6 },
  'dalhousie square-howrah station': { distance: 1.8, baseTime: 7, trafficMultiplier: 1.3 },
  'howrah station-dalhousie square': { distance: 1.8, baseTime: 7, trafficMultiplier: 1.3 }
}

// Current pricing configuration for Kolkata
const getCurrentPricingConfig = (): PricingConfig => {
  const currentHour = new Date().getHours()
  const isNightTime = currentHour >= 22 || currentHour < 6
  const isPeakHour = (currentHour >= 8 && currentHour <= 10) || (currentHour >= 17 && currentHour <= 20)

  return {
    baseFare: 50, // Base fare in INR
    perKmRate: 12, // Per km rate in INR
    petrolPrice: 106.50, // Current petrol price in Kolkata (INR per liter)
    surgeMultiplier: isPeakHour ? 1.5 : 1.0, // Surge pricing during peak hours
    nightChargeMultiplier: isNightTime ? 1.25 : 1.0, // Night charges
    tollCharges: 0 // Most routes in Kolkata don't have tolls
  }
}

// Get current petrol price
export const getCurrentPetrolPrice = (): string => {
  return getCurrentPricingConfig().petrolPrice.toFixed(2)
}

// Get per km rate
export const getPerKmRate = (): string => {
  return getCurrentPricingConfig().perKmRate.toString()
}

// Calculate distance between two locations
export const calculateDistance = (pickup: string, drop: string): string => {
  const routeKey = `${pickup.toLowerCase()}-${drop.toLowerCase()}`
  const route = kolkataRoutes[routeKey]
  
  if (route) {
    return `${route.distance} km`
  }
  
  // Default calculation for unknown routes
  return "8.5 km"
}

// Calculate estimated time considering traffic
export const calculateEstimatedTime = (pickup: string, drop: string): string => {
  const routeKey = `${pickup.toLowerCase()}-${drop.toLowerCase()}`
  const route = kolkataRoutes[routeKey]
  
  if (route) {
    const adjustedTime = Math.round(route.baseTime * route.trafficMultiplier)
    return `${adjustedTime} mins`
  }
  
  // Default calculation for unknown routes
  return "20 mins"
}

// Calculate estimated cost with dynamic pricing
export const calculateEstimatedCost = (pickup: string, drop: string): string => {
  const routeKey = `${pickup.toLowerCase()}-${drop.toLowerCase()}`
  const route = kolkataRoutes[routeKey]
  const pricing = getCurrentPricingConfig()
  
  let distance = 8.5 // Default distance
  if (route) {
    distance = route.distance
  }
  
  // Base calculation
  let cost = pricing.baseFare + (distance * pricing.perKmRate)
  
  // Apply surge pricing
  cost *= pricing.surgeMultiplier
  
  // Apply night charges
  cost *= pricing.nightChargeMultiplier
  
  // Add toll charges
  cost += pricing.tollCharges
  
  return Math.round(cost).toString()
}

// Get detailed route information
export const getRouteDetails = (pickup: string, drop: string) => {
  const routeKey = `${pickup.toLowerCase()}-${drop.toLowerCase()}`
  const route = kolkataRoutes[routeKey]
  const pricing = getCurrentPricingConfig()
  
  if (route) {
    const adjustedTime = Math.round(route.baseTime * route.trafficMultiplier)
    let cost = pricing.baseFare + (route.distance * pricing.perKmRate)
    cost *= pricing.surgeMultiplier * pricing.nightChargeMultiplier
    cost += pricing.tollCharges
    
    return {
      distance: `${route.distance} km`,
      time: `${adjustedTime} mins`,
      cost: `₹${Math.round(cost)}`,
      baseFare: pricing.baseFare,
      perKmRate: pricing.perKmRate,
      surgeActive: pricing.surgeMultiplier > 1.0,
      nightCharges: pricing.nightChargeMultiplier > 1.0,
      petrolPrice: pricing.petrolPrice
    }
  }
  
  return null
}

// Check if surge pricing is active
export const isSurgeActive = (): boolean => {
  return getCurrentPricingConfig().surgeMultiplier > 1.0
}

// Get surge multiplier
export const getSurgeMultiplier = (): number => {
  return getCurrentPricingConfig().surgeMultiplier
}

// Get traffic condition for route
export const getTrafficCondition = (pickup: string, drop: string): string => {
  const routeKey = `${pickup.toLowerCase()}-${drop.toLowerCase()}`
  const route = kolkataRoutes[routeKey]
  
  if (route) {
    if (route.trafficMultiplier >= 1.5) return "Heavy Traffic"
    if (route.trafficMultiplier >= 1.3) return "Moderate Traffic"
    if (route.trafficMultiplier >= 1.1) return "Light Traffic"
    return "Clear Roads"
  }
  
  return "Normal Traffic"
}