// Indian Cities and Popular Locations for NeoRide

export const indianCities = [
  {
    name: 'Kolkata',
    coordinates: { lat: 22.5726, lng: 88.3639 },
    popularLocations: [
      { name: 'Netaji Subhash Airport', address: 'Netaji Subhash Chandra Bose International Airport, Kolkata' },
      { name: 'Victoria Memorial', address: 'Victoria Memorial, Kolkata' },
      { name: 'Park Street', address: 'Park Street, Kolkata' },
      { name: 'Howrah Bridge', address: 'Howrah Bridge, Kolkata' },
      { name: 'South City Mall', address: 'South City Mall, Prince Anwar Shah Road, Kolkata' },
      { name: 'SSKM Hospital', address: 'SSKM Hospital, College Street, Kolkata' },
      { name: 'New Market', address: 'New Market, Lindsay Street, Kolkata' },
      { name: 'Esplanade Metro', address: 'Esplanade Metro Station, Kolkata' },
      { name: 'Salt Lake City', address: 'Salt Lake City, Sector V, Kolkata' },
      { name: 'Howrah Station', address: 'Howrah Railway Station, Kolkata' },
      { name: 'Sealdah Station', address: 'Sealdah Railway Station, Kolkata' },
      { name: 'Dalhousie Square', address: 'Dalhousie Square (BBD Bagh), Kolkata' }
    ]
  },
  {
    name: 'New Delhi',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    popularLocations: [
      { name: 'Indira Gandhi International Airport', address: 'Indira Gandhi International Airport, New Delhi' },
      { name: 'Connaught Place', address: 'Connaught Place, New Delhi' },
      { name: 'Red Fort', address: 'Red Fort, Chandni Chowk, New Delhi' },
      { name: 'India Gate', address: 'India Gate, Rajpath, New Delhi' },
      { name: 'Select City Walk', address: 'Select City Walk Mall, Saket, New Delhi' },
      { name: 'AIIMS', address: 'All India Institute of Medical Sciences, New Delhi' },
      { name: 'Khan Market', address: 'Khan Market, New Delhi' },
      { name: 'Rajiv Chowk Metro', address: 'Rajiv Chowk Metro Station, New Delhi' }
    ]
  },
  {
    name: 'Mumbai',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    popularLocations: [
      { name: 'Chhatrapati Shivaji Airport', address: 'Chhatrapati Shivaji Maharaj International Airport, Mumbai' },
      { name: 'Gateway of India', address: 'Gateway of India, Colaba, Mumbai' },
      { name: 'Marine Drive', address: 'Marine Drive, Mumbai' },
      { name: 'Bandra-Worli Sea Link', address: 'Bandra-Worli Sea Link, Mumbai' },
      { name: 'Phoenix Mills', address: 'Phoenix Mills, Lower Parel, Mumbai' },
      { name: 'Juhu Beach', address: 'Juhu Beach, Mumbai' }
    ]
  },
  {
    name: 'Bangalore',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    popularLocations: [
      { name: 'Kempegowda Airport', address: 'Kempegowda International Airport, Bangalore' },
      { name: 'MG Road', address: 'MG Road, Bangalore' },
      { name: 'Brigade Road', address: 'Brigade Road, Bangalore' },
      { name: 'Electronic City', address: 'Electronic City, Bangalore' },
      { name: 'UB City Mall', address: 'UB City Mall, Bangalore' },
      { name: 'Lalbagh', address: 'Lalbagh Botanical Garden, Bangalore' }
    ]
  },
  {
    name: 'Hyderabad',
    coordinates: { lat: 17.3850, lng: 78.4867 },
    popularLocations: [
      { name: 'Rajiv Gandhi Airport', address: 'Rajiv Gandhi International Airport, Hyderabad' },
      { name: 'Charminar', address: 'Charminar, Hyderabad' },
      { name: 'HITEC City', address: 'HITEC City, Hyderabad' },
      { name: 'Hussain Sagar', address: 'Hussain Sagar Lake, Hyderabad' },
      { name: 'Forum Sujana Mall', address: 'Forum Sujana Mall, Kukatpally, Hyderabad' }
    ]
  },
  {
    name: 'Chennai',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    popularLocations: [
      { name: 'Chennai Airport', address: 'Chennai International Airport, Chennai' },
      { name: 'Marina Beach', address: 'Marina Beach, Chennai' },
      { name: 'T. Nagar', address: 'T. Nagar, Chennai' },
      { name: 'Express Avenue', address: 'Express Avenue Mall, Chennai' },
      { name: 'Chennai Central', address: 'Chennai Central Railway Station, Chennai' }
    ]
  },
  {
    name: 'Kolkata',
    coordinates: { lat: 22.5726, lng: 88.3639 },
    popularLocations: [
      { name: 'Netaji Subhash Airport', address: 'Netaji Subhash Chandra Bose International Airport, Kolkata' },
      { name: 'Victoria Memorial', address: 'Victoria Memorial, Kolkata' },
      { name: 'Park Street', address: 'Park Street, Kolkata' },
      { name: 'Howrah Bridge', address: 'Howrah Bridge, Kolkata' },
      { name: 'South City Mall', address: 'South City Mall, Kolkata' }
    ]
  }
]

export const quickDestinations = [
  { name: 'Airport', icon: '✈️', category: 'transport' },
  { name: 'Mall', icon: '🛍️', category: 'shopping' },
  { name: 'Hospital', icon: '🏥', category: 'healthcare' },
  { name: 'Office', icon: '🏢', category: 'business' },
  { name: 'Metro', icon: '🚇', category: 'transport' },
  { name: 'Market', icon: '🛒', category: 'shopping' },
  { name: 'Hotel', icon: '🏨', category: 'hospitality' },
  { name: 'Restaurant', icon: '🍽️', category: 'food' }
]

export const sampleRides = [
  { from: 'Salt Lake City', to: 'Park Street', fare: '₹180' },
  { from: 'South City Mall', to: 'Netaji Subhash Airport', fare: '₹350' },
  { from: 'New Market', to: 'Howrah Station', fare: '₹120' },
  { from: 'Victoria Memorial', to: 'Esplanade Metro', fare: '₹80' },
  { from: 'Dalhousie Square', to: 'Sealdah Station', fare: '₹90' },
  { from: 'Howrah Bridge', to: 'SSKM Hospital', fare: '₹110' }
]