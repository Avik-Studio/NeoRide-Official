import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { Car, CheckCircle } from 'lucide-react'
import GoogleMapsTest from '@/components/GoogleMapsTest'

export default function TestPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Page Working!</h1>
          <p className="text-gray-600">This confirms that routing and React components are functioning correctly.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="w-5 h-5" />
              NeoRide Test Page
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              If you can see this page, it means:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>React Router is working correctly</li>
              <li>Components are rendering properly</li>
              <li>Tailwind CSS is loaded</li>
              <li>UI components are functional</li>
            </ul>
            
            <div className="flex gap-4 pt-4 flex-wrap">
              <Button onClick={() => navigate('/login')}>
                Go to Login
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  localStorage.setItem('userType', 'customer')
                  navigate('/customer')
                }}
              >
                Test Customer Page
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  localStorage.setItem('userType', 'driver')
                  navigate('/driver')
                }}
              >
                Test Driver Page
              </Button>
              <Button variant="outline" onClick={() => navigate('/auth-test')}>
                Auth Test
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Authentication Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>User Type:</strong> {localStorage.getItem('userType') || 'Not set'}</p>
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    localStorage.setItem('userType', 'admin')
                    window.location.reload()
                  }}
                >
                  Set Admin
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    localStorage.setItem('userType', 'driver')
                    window.location.reload()
                  }}
                >
                  Set Driver
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    localStorage.setItem('userType', 'customer')
                    window.location.reload()
                  }}
                >
                  Set Customer
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => {
                    localStorage.removeItem('userType')
                    window.location.reload()
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current URL Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Current URL:</strong> {window.location.href}</p>
              <p><strong>Pathname:</strong> {window.location.pathname}</p>
              <p><strong>Port:</strong> {window.location.port}</p>
            </div>
          </CardContent>
        </Card>

        {/* Google Maps Test */}
        <GoogleMapsTest />
      </div>
    </div>
  )
}