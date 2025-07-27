import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/useAuth'
import { useUser } from '@/contexts/UserContext'
import Navbar from '@/components/Navbar'
import { 
  Car, 
  DollarSign, 
  Clock, 
  Star, 
  Navigation, 
  Phone,
  MessageCircle,
  MapPin,
  TrendingUp,
  Calendar,
  Fuel,
  Settings,
  BarChart3,
  User,
  CheckCircle,
  AlertCircle,
  IndianRupee
} from 'lucide-react'

export default function DriverHome() {
  const [isOnline, setIsOnline] = useState(false)
  const [currentRide, setCurrentRide] = useState<any>(null)
  const [earnings, setEarnings] = useState({ today: 2850.50, week: 18450.25, month: 67250.75 })
  const { toast } = useToast()
  const { user: authUser } = useAuth()
  const { user: neoRideUser } = useUser()
  const navigate = useNavigate()

  // Check authentication and redirect if not logged in or not a driver
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType')
    
    // If no auth user and no stored driver type, redirect to login
    if (!authUser && storedUserType !== 'driver') {
      navigate('/login')
      return
    }

    // If we have a neoRideUser but they're not a driver, redirect to appropriate page
    if (neoRideUser && neoRideUser.role !== 'driver') {
      if (neoRideUser.role === 'admin') {
        navigate('/admin')
      } else if (neoRideUser.role === 'customer') {
        navigate('/customer')
      }
      return
    }

    // If stored type is driver but no neoRideUser yet, that's okay - let it load
  }, [authUser, neoRideUser, navigate])

  const todayStats = {
    rides: 12,
    hours: 8.5,
    rating: 4.8,
    earnings: 2850.50
  }

  const recentRides = [
    { id: 1, passenger: 'Priya Sharma', from: 'Salt Lake City', to: 'Netaji Subhash Airport', fare: 350, rating: 5, time: '2:30 PM' },
    { id: 2, passenger: 'Rajesh Kumar', from: 'South City Mall', to: 'Jadavpur University', fare: 180, rating: 4, time: '1:45 PM' },
    { id: 3, passenger: 'Anita Das', from: 'SSKM Hospital', to: 'Park Street', fare: 120, rating: 5, time: '12:15 PM' },
  ]

  const handleToggleOnline = () => {
    setIsOnline(!isOnline)
    toast({
      title: isOnline ? 'Going Offline' : 'Going Online',
      description: isOnline ? 'You will not receive ride requests' : 'You are now available for rides',
    })
  }

  const simulateRideRequest = () => {
    if (isOnline && !currentRide) {
      setCurrentRide({
        passenger: 'Arjun Banerjee',
        pickup: 'New Market, Lindsay Street, Kolkata',
        destination: 'Howrah Railway Station, Kolkata',
        fare: 150,
        distance: '5.2 km',
        duration: '18 mins'
      })
      toast({
        title: 'New Ride Request!',
        description: 'Arjun Banerjee wants a ride',
      })
    }
  }

  useEffect(() => {
    if (isOnline) {
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          simulateRideRequest()
        }
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [isOnline, currentRide])

  const handleLogout = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem('userType')
      
      // If there's a Supabase user, sign them out
      if (authUser) {
        const { supabase } = await import('@/lib/supabase')
        await supabase.auth.signOut()
      }
      
      toast({
        title: 'Success',
        description: 'Logged out successfully',
      })
      
      navigate('/login')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to logout',
        variant: 'destructive',
      })
    }
  }

  // Show loading if still checking authentication
  const storedUserType = localStorage.getItem('userType')
  if (!authUser && storedUserType !== 'driver') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Navbar */}
      {neoRideUser && (
        <Navbar 
          user={neoRideUser} 
          onLogout={handleLogout} 
          notificationCount={1}
        />
      )}
      
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Driver Dashboard{neoRideUser?.name ? ` - ${neoRideUser.name}` : ''}
            </h1>
            <p className="text-gray-600">Manage your rides and earnings</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">
                {isOnline ? 'Online' : 'Offline'}
              </span>
              <Switch
                checked={isOnline}
                onCheckedChange={handleToggleOnline}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
            <Badge variant={isOnline ? "default" : "secondary"} className={isOnline ? "bg-green-500" : ""}>
              {isOnline ? 'Available' : 'Offline'}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Ride or Status */}
            {currentRide ? (
              <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Navigation className="w-5 h-5" />
                    Current Ride
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{currentRide.passenger}</h3>
                        <p className="text-blue-100 text-sm">{currentRide.distance} • {currentRide.duration}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">₹{currentRide.fare}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-300" />
                      <span className="text-sm">{currentRide.pickup}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-300" />
                      <span className="text-sm">{currentRide.destination}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="secondary" className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="secondary" className="flex-1">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="flex-1"
                      onClick={() => setCurrentRide(null)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg border-0">
                <CardContent className="p-8 text-center">
                  {isOnline ? (
                    <div>
                      <Car className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready for Rides</h3>
                      <p className="text-gray-600">You're online and available for ride requests</p>
                    </div>
                  ) : (
                    <div>
                      <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">You're Offline</h3>
                      <p className="text-gray-600">Turn on availability to start receiving ride requests</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Today's Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="shadow-lg border-0">
                <CardContent className="p-4 text-center">
                  <Car className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{todayStats.rides}</div>
                  <div className="text-sm text-gray-600">Rides Today</div>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-0">
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{todayStats.hours}h</div>
                  <div className="text-sm text-gray-600">Hours Online</div>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-0">
                <CardContent className="p-4 text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{todayStats.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-0">
                <CardContent className="p-4 text-center">
                  <IndianRupee className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">₹{todayStats.earnings}</div>
                  <div className="text-sm text-gray-600">Today's Earnings</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Rides */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Rides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentRides.map((ride) => (
                  <div key={ride.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{ride.passenger}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{ride.from}</span>
                          <span>→</span>
                          <span>{ride.to}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{ride.time}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(ride.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">₹{ride.fare}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Earnings Summary */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Earnings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm opacity-90">Today</div>
                  <div className="text-2xl font-bold">₹{earnings.today}</div>
                </div>
                <div>
                  <div className="text-sm opacity-90">This Week</div>
                  <div className="text-xl font-semibold">₹{earnings.week}</div>
                </div>
                <div>
                  <div className="text-sm opacity-90">This Month</div>
                  <div className="text-xl font-semibold">₹{earnings.month}</div>
                </div>
                <Button variant="secondary" size="sm" className="w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>

            {/* Vehicle Status */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Vehicle Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Fuel Level</span>
                  <div className="flex items-center gap-2">
                    <Fuel className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Next Service</span>
                  <span className="font-medium">4,000 km</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Insurance</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Break
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Vehicle Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Earnings Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}