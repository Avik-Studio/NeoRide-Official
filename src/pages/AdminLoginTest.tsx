import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useUser } from '@/contexts/UserContext'
import { 
  CheckCircle, 
  AlertTriangle, 
  User, 
  Shield,
  ArrowRight,
  LogOut
} from 'lucide-react'

export default function AdminLoginTest() {
  const { user } = useUser()
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

  const goToAdmin = () => {
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Login Test</h1>
          <p className="text-gray-600">Testing admin authentication and redirection</p>
        </div>

        {/* User Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Current User Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">UserContext Data:</h4>
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">ID</Badge>
                      <span className="text-sm">{user.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Name</Badge>
                      <span className="text-sm">{user.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Email</Badge>
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        Role: {user.role}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="text-red-600">No user data found</div>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-2">localStorage Data:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">userType</Badge>
                    <span className="text-sm">{userType || 'Not set'}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Check */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Admin Status Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userType === 'admin' ? (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-green-800">Admin Access Granted</h4>
                    <p className="text-sm text-green-600">You are logged in as an administrator</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <div>
                    <h4 className="font-semibold text-red-800">No Admin Access</h4>
                    <p className="text-sm text-red-600">Please login with admin credentials</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Test navigation and logout functionality</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {userType === 'admin' ? (
                <>
                  <Button onClick={goToAdmin} className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    Go to Admin Dashboard
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

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Test Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Admin Login Credentials:</h4>
                <div className="text-sm text-blue-700">
                  <p><strong>Email:</strong> Admin@example.com</p>
                  <p><strong>Password:</strong> Admin@2005</p>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Expected Flow:</strong></p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>Login with admin credentials</li>
                  <li>Should redirect to /admin automatically</li>
                  <li>Admin dashboard should load with sidebar</li>
                  <li>Logout should return to login page</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}