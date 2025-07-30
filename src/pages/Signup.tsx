import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'
import { CustomerService, DriverService } from '@/services/mongoService'
import { Car, User, Eye, EyeOff } from 'lucide-react'

export default function Signup() {
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agree: false
  })
  
  const [driverData, setDriverData] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    phone: '',
    licenseNumber: '',
    vehicleModel: '',
    vehiclePlate: '',
    agree: false
  })

  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('customer')
  const [showCustomerPassword, setShowCustomerPassword] = useState(false)
  const [showCustomerConfirmPassword, setShowCustomerConfirmPassword] = useState(false)
  const [showDriverPassword, setShowDriverPassword] = useState(false)
  const [showDriverConfirmPassword, setShowDriverConfirmPassword] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSignup = async (role: 'customer' | 'driver') => {
    setLoading(true)
    
    const data = role === 'customer' ? customerData : driverData
    
    if (data.email !== data.confirmEmail) {
      toast({
        title: 'Error',
        description: 'Email addresses do not match',
        variant: 'destructive',
      })
      setLoading(false)
      return
    }

    if (data.password !== data.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      })
      setLoading(false)
      return
    }

    if (!data.agree) {
      toast({
        title: 'Error',
        description: 'Please agree to the Terms and Conditions',
        variant: 'destructive',
      })
      setLoading(false)
      return
    }

    try {
      // First, create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: data.name,
            phone: data.phone,
            role: role,
          },
        },
      })

      console.log('Signup response:', { authData, authError }) // Debug log

      if (authError) {
        toast({
          title: 'Signup Error',
          description: authError.message,
          variant: 'destructive',
        })
        return
      }

      // If auth user was created successfully, save data to MongoDB
      if (authData.user) {
        try {
          if (role === 'customer') {
            // Save customer data to MongoDB
            await CustomerService.createCustomer({
              supabaseId: authData.user.id,
              email: data.email,
              fullName: data.name,
              phone: data.phone
            });
            console.log('✅ Customer data saved to MongoDB successfully');

            // Also save to Supabase for backup/compatibility (if tables exist)
            try {
              const { error: customerError } = await supabase
                .from('customers')
                .insert({
                  id: authData.user.id,
                  email: data.email,
                  full_name: data.name,
                  phone: data.phone,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                })

              if (customerError) {
                console.warn('Supabase customer data insertion warning:', customerError)
              }
            } catch (supabaseError) {
              console.warn('Supabase tables may not exist yet:', supabaseError)
            }

          } else if (role === 'driver') {
            // Save driver data to MongoDB
            await DriverService.createDriver({
              supabaseId: authData.user.id,
              email: data.email,
              fullName: data.name,
              phone: data.phone,
              licenseNumber: driverData.licenseNumber,
              vehicleModel: driverData.vehicleModel,
              vehiclePlate: driverData.vehiclePlate
            });
            console.log('✅ Driver data saved to MongoDB successfully');

            // Also save to Supabase for backup/compatibility (if tables exist)
            try {
              const { error: driverError } = await supabase
                .from('drivers')
                .insert({
                  id: authData.user.id,
                  email: data.email,
                  full_name: data.name,
                  phone: data.phone,
                  license_number: driverData.licenseNumber,
                  vehicle_model: driverData.vehicleModel,
                  vehicle_plate: driverData.vehiclePlate,
                  status: 'pending',
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                })

              if (driverError) {
                console.warn('Supabase driver data insertion warning:', driverError)
              }
            } catch (supabaseError) {
              console.warn('Supabase tables may not exist yet:', supabaseError)
            }
          }
        } catch (mongoError) {
          console.error('MongoDB insertion error:', mongoError)
          toast({
            title: 'Warning',
            description: 'Account created but some profile data may not have been saved to database.',
            variant: 'destructive',
          })
        }

        // Store user type for when they verify and login
        localStorage.setItem('pendingUserType', role)
        
        if (!authData.user.email_confirmed_at) {
          toast({
            title: 'Check Your Email! 📧',
            description: `We've sent a confirmation email to ${data.email}. Please click the link in the email to verify your account. Check your spam folder if you don't see it.`,
          })
        } else {
          toast({
            title: 'Account Created! ✅',
            description: `${role} account created successfully and saved to database!`,
          })
        }
        navigate('/login')
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
      </div>

      <Card className="w-full max-w-lg relative z-10 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <Car className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Join NeoRide
          </h1>
          <p className="text-gray-600">Create your account to get started</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-lg p-1">
              <TabsTrigger 
                value="customer" 
                className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md transition-all"
              >
                <User className="w-4 h-4" />
                Customer
              </TabsTrigger>
              <TabsTrigger 
                value="driver"
                className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-md transition-all"
              >
                <Car className="w-4 h-4" />
                Driver
              </TabsTrigger>
            </TabsList>

            <TabsContent value="customer" className="space-y-4 mt-6">
              <div className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={customerData.name}
                  onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                  className="h-12 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg text-gray-900"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={customerData.email}
                  onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                  className="h-12 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg text-gray-900"
                />
                <Input
                  type="email"
                  placeholder="Confirm Email"
                  value={customerData.confirmEmail}
                  onChange={(e) => setCustomerData({...customerData, confirmEmail: e.target.value})}
                  className="h-12 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg text-gray-900"
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                  className="h-12 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg text-gray-900"
                />
                <div className="relative">
                  <Input
                    type={showCustomerPassword ? "text" : "password"}
                    placeholder="Password"
                    value={customerData.password}
                    onChange={(e) => setCustomerData({...customerData, password: e.target.value})}
                    className="h-12 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg pr-12 text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCustomerPassword(!showCustomerPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showCustomerPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="relative">
                  <Input
                    type={showCustomerConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={customerData.confirmPassword}
                    onChange={(e) => setCustomerData({...customerData, confirmPassword: e.target.value})}
                    className="h-12 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg pr-12 text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCustomerConfirmPassword(!showCustomerConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showCustomerConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="customer-signup-terms" 
                    checked={customerData.agree}
                    onCheckedChange={(checked) => setCustomerData({...customerData, agree: checked as boolean})}
                    className="w-5 h-5 border-2 border-gray-300 rounded data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <label htmlFor="customer-signup-terms" className="text-sm text-gray-700 cursor-pointer">
                    I agree to the{' '}
                    <Link to="/terms" className="text-blue-600 hover:underline font-medium">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
                <Button 
                  onClick={() => handleSignup('customer')}
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {loading ? 'Creating Account...' : 'Sign Up as Customer'}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="driver" className="space-y-4 mt-6">
              <div className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={driverData.name}
                  onChange={(e) => setDriverData({...driverData, name: e.target.value})}
                  className="h-12 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg text-gray-900"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={driverData.email}
                  onChange={(e) => setDriverData({...driverData, email: e.target.value})}
                  className="h-12 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg text-gray-900"
                />
                <Input
                  type="email"
                  placeholder="Confirm Email"
                  value={driverData.confirmEmail}
                  onChange={(e) => setDriverData({...driverData, confirmEmail: e.target.value})}
                  className="h-12 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg text-gray-900"
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={driverData.phone}
                  onChange={(e) => setDriverData({...driverData, phone: e.target.value})}
                  className="h-12 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg text-gray-900"
                />
                <Input
                  placeholder="Driver License Number"
                  value={driverData.licenseNumber}
                  onChange={(e) => setDriverData({...driverData, licenseNumber: e.target.value})}
                  className="h-12 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg text-gray-900"
                />
                <Input
                  placeholder="Vehicle Model (e.g., Toyota Camry)"
                  value={driverData.vehicleModel}
                  onChange={(e) => setDriverData({...driverData, vehicleModel: e.target.value})}
                  className="h-12 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg text-gray-900"
                />
                <Input
                  placeholder="License Plate Number"
                  value={driverData.vehiclePlate}
                  onChange={(e) => setDriverData({...driverData, vehiclePlate: e.target.value})}
                  className="h-12 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg text-gray-900"
                />
                <div className="relative">
                  <Input
                    type={showDriverPassword ? "text" : "password"}
                    placeholder="Password"
                    value={driverData.password}
                    onChange={(e) => setDriverData({...driverData, password: e.target.value})}
                    className="h-12 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg pr-12 text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowDriverPassword(!showDriverPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showDriverPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="relative">
                  <Input
                    type={showDriverConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={driverData.confirmPassword}
                    onChange={(e) => setDriverData({...driverData, confirmPassword: e.target.value})}
                    className="h-12 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg pr-12 text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowDriverConfirmPassword(!showDriverConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showDriverConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="driver-signup-terms" 
                    checked={driverData.agree}
                    onCheckedChange={(checked) => setDriverData({...driverData, agree: checked as boolean})}
                    className="w-5 h-5 border-2 border-gray-300 rounded data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <label htmlFor="driver-signup-terms" className="text-sm text-gray-700 cursor-pointer">
                    I agree to the{' '}
                    <Link to="/terms" className="text-green-600 hover:underline font-medium">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
                <Button 
                  onClick={() => handleSignup('driver')}
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {loading ? 'Creating Account...' : 'Sign Up as Driver'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}