import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'
import { Car, User, Shield } from 'lucide-react'

export default function Login() {
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPassword, setCustomerPassword] = useState('')
  const [driverEmail, setDriverEmail] = useState('')
  const [driverPassword, setDriverPassword] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [customerAgree, setCustomerAgree] = useState(false)
  const [driverAgree, setDriverAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('customer')
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleLogin = async (role: 'customer' | 'driver' | 'admin') => {
    setLoading(true)
    
    let email = ''
    let password = ''
    let agree = true

    if (role === 'customer') {
      email = customerEmail
      password = customerPassword
      agree = customerAgree
    } else if (role === 'driver') {
      email = driverEmail
      password = driverPassword
      agree = driverAgree
    } else if (role === 'admin') {
      email = adminEmail
      password = adminPassword
      // Admin bypass - check hardcoded credentials
      if (email === 'Admin@example.com' && password === 'Admin@2005') {
        toast({
          title: 'Success',
          description: 'Welcome Admin!',
        })
        // Store admin role for UserContext integration
        localStorage.setItem('userType', 'admin')
        // Redirect directly to admin panel
        navigate('/admin')
        setLoading(false)
        return
      } else {
        toast({
          title: 'Error',
          description: 'Invalid admin credentials',
          variant: 'destructive',
        })
        setLoading(false)
        return
      }
    }

    if (!agree && role !== 'admin') {
      toast({
        title: 'Error',
        description: 'Please agree to the Terms and Conditions',
        variant: 'destructive',
      })
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Handle specific error cases
        if (error.message.includes('Email not confirmed')) {
          toast({
            title: 'Email Not Verified 📧',
            description: 'Please check your email and click the verification link before logging in. Check your spam folder if needed.',
            variant: 'destructive',
          })
        } else {
          toast({
            title: 'Login Error',
            description: error.message,
            variant: 'destructive',
          })
        }
      } else if (data.user) {
        // Check if email is confirmed
        if (!data.user.email_confirmed_at) {
          toast({
            title: 'Email Not Verified 📧',
            description: 'Please verify your email address before logging in. Check your inbox for the verification link.',
            variant: 'destructive',
          })
          // Sign out the user since they're not verified
          await supabase.auth.signOut()
        } else {
          // Store user type for UserContext integration
          localStorage.setItem('userType', role)
          
          toast({
            title: 'Welcome Back! 👋',
            description: `Successfully logged in as ${role}`,
          })
          
          // Redirect to appropriate dashboard based on role
          if (role === 'customer') {
            navigate('/customer')
          } else if (role === 'driver') {
            navigate('/driver')
          } else {
            navigate('/')
          }
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-bounce delay-500"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-blue-300 rounded-full opacity-15 animate-pulse delay-700"></div>
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-blue-400 rounded-full opacity-15 animate-pulse delay-300"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <Car className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Welcome to
          </h1>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            NeoRide
          </h2>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-lg p-1">
              <TabsTrigger 
                value="customer" 
                className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md transition-all"
              >
                <User className="w-4 h-4" />
                Customer
              </TabsTrigger>
              <TabsTrigger 
                value="driver"
                className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md transition-all"
              >
                <Car className="w-4 h-4" />
                Driver
              </TabsTrigger>
              <TabsTrigger 
                value="admin"
                className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md transition-all"
              >
                <Shield className="w-4 h-4" />
                Admin
              </TabsTrigger>
            </TabsList>

            <TabsContent value="customer" className="space-y-4 mt-6">
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email or Phone Number"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={customerPassword}
                  onChange={(e) => setCustomerPassword(e.target.value)}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="customer-terms" 
                    checked={customerAgree}
                    onCheckedChange={(checked) => setCustomerAgree(checked as boolean)}
                  />
                  <label htmlFor="customer-terms" className="text-sm text-gray-600">
                    I agree to the{' '}
                    <Link to="/terms" className="text-blue-600 hover:underline">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
                <Button 
                  onClick={() => handleLogin('customer')}
                  disabled={loading || !customerAgree}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {loading ? 'Logging in...' : 'Login as Customer'}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="driver" className="space-y-4 mt-6">
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email or Phone Number"
                  value={driverEmail}
                  onChange={(e) => setDriverEmail(e.target.value)}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={driverPassword}
                  onChange={(e) => setDriverPassword(e.target.value)}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="driver-terms" 
                    checked={driverAgree}
                    onCheckedChange={(checked) => setDriverAgree(checked as boolean)}
                  />
                  <label htmlFor="driver-terms" className="text-sm text-gray-600">
                    I agree to the{' '}
                    <Link to="/terms" className="text-blue-600 hover:underline">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
                <Button 
                  onClick={() => handleLogin('driver')}
                  disabled={loading || !driverAgree}
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {loading ? 'Logging in...' : 'Login as Driver'}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="admin" className="space-y-4 mt-6">
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Admin Email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                />
                <Input
                  type="password"
                  placeholder="Admin Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                />
                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                  <p><strong>Admin Credentials:</strong></p>
                  <p>Email: Admin@example.com</p>
                  <p>Password: Admin@2005</p>
                </div>
                <Button 
                  onClick={() => handleLogin('admin')}
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {loading ? 'Logging in...' : 'Login as Admin'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}