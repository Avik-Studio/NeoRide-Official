import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'
import { useUser } from '@/contexts/UserContext'
import { 
  CheckCircle, 
  AlertTriangle, 
  User, 
  Car,
  Shield,
  ArrowRight,
  LogOut,
  Users
} from 'lucide-react'

export default function AuthTest() {
  const { user: authUser } = useAuth()
  const { user: neoRideUser } = useUser()
  const navigate = useNavigate()
  const [userType, setUserType] = useState<string | null>(null)

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType')
    setUserType(storedUserType)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userType')
    navigate('/login')
  }

  const goToDashboard = () => {
    if (userType === 'admin') {
      navigate('/admin')
    } else if (userType === 'driver') {
      navigate('/driver')
    } else if (userType === 'customer') {
      navigate('/customer')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Authentication Test</h1>
          <p className="text-gray-600">Testing user authentication and role-based access</p>
        </div>

        {/* Current Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Supabase Auth
              </CardTitle>
            </CardHeader>
            <CardContent>
              {authUser ? (
                <div className="space-y-2">
                  <Badge variant="default" className="bg-green-500">Authenticated</Badge>
                  <div className="text-sm">
                    <p><strong>ID:</strong> {authUser.id.slice(0, 8)}...</p>
                    <p><strong>Email:</strong> {authUser.email}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Badge variant="secondary">Not Authenticated</Badge>
                  <p className="text-sm text-gray-600">No Supabase user found</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Context
              </CardTitle>
            </CardHeader>
            <CardContent>
              {neoRideUser ? (
                <div className="space-y-2">
                  <Badge variant="default" className="bg-blue-500">Active</Badge>
                  <div className="text-sm">
                    <p><strong>Name:</strong> {neoRideUser.name}</p>
                    <p><strong>Role:</strong> {neoRideUser.role}</p>
                    <p><strong>Email:</strong> {neoRideUser.email}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Badge variant="secondary">No User Data</Badge>
                  <p className="text-sm text-gray-600">UserContext not populated</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                localStorage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant={userType ? 'default' : 'secondary'}>
                  {userType ? 'Set' : 'Not Set'}
                </Badge>
                <div className="text-sm">
                  <p><strong>userType:</strong> {userType || 'None'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Role Status */}
        <Card>
          <CardHeader>
            <CardTitle>Role-Based Access Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Customer */}
              <div className={`p-4 rounded-lg border-2 ${userType === 'customer' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <User className={`w-6 h-6 ${userType === 'customer' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <h3 className="font-semibold">Customer</h3>
                  {userType === 'customer' && <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>
                <p className="text-sm text-gray-600 mb-3">Access to booking rides and ride history</p>
                <Button 
                  variant={userType === 'customer' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => navigate('/customer')}
                  disabled={userType !== 'customer'}
                >
                  Customer Dashboard
                </Button>
              </div>

              {/* Driver */}
              <div className={`p-4 rounded-lg border-2 ${userType === 'driver' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <Car className={`w-6 h-6 ${userType === 'driver' ? 'text-green-600' : 'text-gray-400'}`} />
                  <h3 className="font-semibold">Driver</h3>
                  {userType === 'driver' && <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>
                <p className="text-sm text-gray-600 mb-3">Access to ride requests and earnings</p>
                <Button 
                  variant={userType === 'driver' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => navigate('/driver')}
                  disabled={userType !== 'driver'}
                >
                  Driver Dashboard
                </Button>
              </div>

              {/* Admin */}
              <div className={`p-4 rounded-lg border-2 ${userType === 'admin' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <Shield className={`w-6 h-6 ${userType === 'admin' ? 'text-purple-600' : 'text-gray-400'}`} />
                  <h3 className="font-semibold">Admin</h3>
                  {userType === 'admin' && <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>
                <p className="text-sm text-gray-600 mb-3">Full platform management access</p>
                <Button 
                  variant={userType === 'admin' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => navigate('/admin')}
                  disabled={userType !== 'admin'}
                >
                  Admin Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Test navigation and authentication</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {userType ? (
                <>
                  <Button onClick={goToDashboard} className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    Go to Dashboard
                  </Button>
                  <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button onClick={() => navigate('/login')} className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Go to Login
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Test Credentials */}
        <Card>
          <CardHeader>
            <CardTitle>Test Credentials</CardTitle>
            <CardDescription>Use these credentials to test different user roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Customer Login</h4>
                <div className="text-sm text-blue-700">
                  <p>Use any valid email/password</p>
                  <p>Select "Customer" tab</p>
                  <p>Creates Supabase user</p>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Driver Login</h4>
                <div className="text-sm text-green-700">
                  <p>Use any valid email/password</p>
                  <p>Select "Driver" tab</p>
                  <p>Creates Supabase user</p>
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Admin Login</h4>
                <div className="text-sm text-purple-700">
                  <p><strong>Email:</strong> Admin@example.com</p>
                  <p><strong>Password:</strong> Admin@2005</p>
                  <p>Hardcoded credentials</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expected Flow */}
        <Card>
          <CardHeader>
            <CardTitle>Expected Authentication Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">1. Login Process</h4>
                <p className="text-sm text-gray-600">
                  Login → Role Selection → Credentials → Success Toast → Redirect to Role Dashboard
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">2. Dashboard Access</h4>
                <p className="text-sm text-gray-600">
                  Dashboard Loads → Navbar Appears → User Data Populated → Role-Specific Features Available
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">3. Logout Process</h4>
                <p className="text-sm text-gray-600">
                  Logout Button → Clear localStorage → Clear Supabase Session → Redirect to Login
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}