import { useEffect, useRef, useState } from 'react'

export default function GoogleMapsTest() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const testGoogleMaps = async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      
      console.log('Testing Google Maps API...')
      console.log('API Key present:', !!apiKey)
      console.log('API Key value:', apiKey)
      
      if (!apiKey) {
        setStatus('error')
        setErrorMessage('No API key found in environment variables')
        return
      }

      try {
        // Load Google Maps script directly
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
        script.async = true
        script.defer = true
        
        script.onload = () => {
          console.log('Google Maps script loaded successfully')
          
          if (mapRef.current && window.google) {
            try {
              const map = new google.maps.Map(mapRef.current, {
                center: { lat: 22.5726, lng: 88.3639 }, // Kolkata, West Bengal
                zoom: 13,
              })
              
              console.log('Map created successfully')
              setStatus('success')
            } catch (mapError) {
              console.error('Error creating map:', mapError)
              setStatus('error')
              setErrorMessage(`Map creation error: ${mapError}`)
            }
          }
        }
        
        script.onerror = (error) => {
          console.error('Error loading Google Maps script:', error)
          setStatus('error')
          setErrorMessage('Failed to load Google Maps script')
        }
        
        document.head.appendChild(script)
        
        // Cleanup
        return () => {
          document.head.removeChild(script)
        }
      } catch (error) {
        console.error('Error in testGoogleMaps:', error)
        setStatus('error')
        setErrorMessage(`General error: ${error}`)
      }
    }

    testGoogleMaps()
  }, [])

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Google Maps API Test</h3>
      
      <div className="mb-4">
        <p><strong>Status:</strong> {status}</p>
        <p><strong>API Key:</strong> {import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? 'Present' : 'Missing'}</p>
        {errorMessage && (
          <p className="text-red-600"><strong>Error:</strong> {errorMessage}</p>
        )}
      </div>
      
      <div 
        ref={mapRef} 
        className="w-full h-64 bg-gray-200 rounded"
        style={{ minHeight: '256px' }}
      />
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Check the browser console for detailed logs.</p>
        <p>If you see errors, refer to the troubleshooting guide.</p>
      </div>
    </div>
  )
}