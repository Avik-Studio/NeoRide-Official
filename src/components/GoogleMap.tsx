import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface GoogleMapProps {
  pickup?: string
  destination?: string
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void
  className?: string
}

export default function GoogleMap({ pickup, destination, onLocationSelect, className = '' }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null)
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const initMap = async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY'
      
      console.log('Google Maps API Key:', apiKey ? 'Present' : 'Missing')
      console.log('Environment variables:', import.meta.env)
      
      if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
        console.warn('Google Maps API key not configured. Please set VITE_GOOGLE_MAPS_API_KEY in your .env file')
        setIsLoaded(true)
        return
      }

      const loader = new Loader({
        apiKey: apiKey,
        version: 'weekly',
        libraries: ['places']
      })

      try {
        await loader.load()
        
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 22.5726, lng: 88.3639 }, // Default to Kolkata, West Bengal, India
            zoom: 13,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          })

          const directionsServiceInstance = new google.maps.DirectionsService()
          const directionsRendererInstance = new google.maps.DirectionsRenderer({
            suppressMarkers: false,
            polylineOptions: {
              strokeColor: '#4F46E5',
              strokeWeight: 4
            }
          })

          directionsRendererInstance.setMap(mapInstance)

          setMap(mapInstance)
          setDirectionsService(directionsServiceInstance)
          setDirectionsRenderer(directionsRendererInstance)
          setIsLoaded(true)

          // Add click listener for location selection
          if (onLocationSelect) {
            mapInstance.addListener('click', (event: google.maps.MapMouseEvent) => {
              if (event.latLng) {
                const geocoder = new google.maps.Geocoder()
                geocoder.geocode(
                  { location: event.latLng },
                  (results, status) => {
                    if (status === 'OK' && results && results[0]) {
                      onLocationSelect({
                        lat: event.latLng!.lat(),
                        lng: event.latLng!.lng(),
                        address: results[0].formatted_address
                      })
                    }
                  }
                )
              }
            })
          }
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error)
        console.error('This might be due to:')
        console.error('1. Invalid API key')
        console.error('2. API key restrictions')
        console.error('3. Required APIs not enabled in Google Cloud Console')
        console.error('4. Billing not enabled for the Google Cloud project')
        setIsLoaded(true) // Set to true to show fallback
      }
    }

    initMap()
  }, [onLocationSelect])

  useEffect(() => {
    if (isLoaded && map && directionsService && directionsRenderer && pickup && destination) {
      // Clear previous route
      directionsRenderer.setDirections({ routes: [] } as any)

      const request: google.maps.DirectionsRequest = {
        origin: pickup,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      }

      directionsService.route(request, (result, status) => {
        if (status === 'OK' && result) {
          directionsRenderer.setDirections(result)
        } else {
          console.error('Directions request failed:', status)
        }
      })
    }
  }, [isLoaded, map, directionsService, directionsRenderer, pickup, destination])

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg"
        style={{ minHeight: '400px' }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      {isLoaded && !map && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Map Preview</h3>
            <p className="text-gray-600 mb-4">Google Maps integration ready for Kolkata</p>
            {pickup && destination && (
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium">From:</span>
                    <span className="text-gray-600">{pickup}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="font-medium">To:</span>
                    <span className="text-gray-600">{destination}</span>
                  </div>
                </div>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-4">
              Configure Google Maps API key to enable full functionality
            </p>
          </div>
        </div>
      )}
    </div>
  )
}