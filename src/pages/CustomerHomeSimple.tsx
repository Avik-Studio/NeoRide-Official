import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { 
  MapPin, 
  Clock, 
  CreditCard, 
  Star, 
  Navigation, 
  Phone,
  MessageCircle,
  Car,
  Plus,
  History,
  Wallet,
  Settings,
  User,
  Search,
  LogOut
} from 'lucide-react'

export default function CustomerHomeSimple() {
  const [pickupLocation, setPickupLocation] = useState('')
  const [dropLocation, setDropLocation] = useState('')
  const [rideStatus, setRideStatus] = useState<'idle' | 'searching' | 'found' | 'ongoing'>('idle')
  const { toast } = useToast()
  const navigate = useNavigate()

  const recentRides = [
    { id: 1, from: 'Home', to: 'Office', date: '2024-01-20', fare: '$12.50', rating: 5 },
    { id: 2, from: 'Mall', to: 'Airport', date: '2024-01-18', fare: '$25.00', rating: 4 },
    { id: 3, from: 'Restaurant', to: 'Home', date: '2024-01-15', fare: '$8.75', rating: 5 },
  ]

  const handleBookRide = () => {
    if (!pickupLocation || !dropLocation) {
      toast({
        title: 'Error',
        description: 'Please enter both pickup and drop locations',
        variant: 'destructive',
      })
      return
    }

    setRideStatus('searching')
    
    // Simulate finding a driver
    setTimeout(() => {
      setRideStatus('found')
      toast({
        title: 'Driver Found!',
        description: 'John is on his way to pick you up',
      })
    }, 3000)
  }

  const handleLogout = () => {
    localStorage.removeItem('userType')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Simple Navbar */}
      <div className="w-full bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">NeoRide</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Customer Dashboard</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-600">Where would you like to go today?</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="px-3 py-1">
              <Wallet className="w-4 h-4 mr-2" />
              $45.20
            </Badge>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Booking Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Book a Ride Card */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Book Your Ride
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Enter your pickup and destination
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-green-500" />
                    <Input
                      placeholder="Pickup location"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="pl-12 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-red-500" />
                    <Input
                      placeholder="Where to?"
                      value={dropLocation}
                      onChange={(e) => setDropLocation(e.target.value)}
                      className="pl-12 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                    />
                  </div>
                </div>

                {rideStatus === 'idle' && (
                  <Button 
                    onClick={handleBookRide}
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Book Ride Now
                  </Button>
                )}

                {rideStatus === 'searching' && (
                  <div className="text-center py-4">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                    <p className="text-gray-600">Searching for nearby drivers...</p>
                  </div>
                )}

                {rideStatus === 'found' && (
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">John Doe</h3>
                            <p className="text-sm text-gray-600">Toyota Camry • ABC 123</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm">4.8 (120 rides)</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-gray-600">Arriving in 3 minutes</span>
                        <Badge className="bg-green-500">On the way</Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <History className="w-6 h-6" />
                    <span className="text-sm">Ride History</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Wallet className="w-6 h-6" />
                    <span className="text-sm">Wallet</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Star className="w-6 h-6" />
                    <span className="text-sm">Rate Rides</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Settings className="w-6 h-6" />
                    <span className="text-sm">Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Rides */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Recent Rides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentRides.map((ride) => (
                  <div key={ride.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span className="font-medium">{ride.from}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span>{ride.to}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{ride.date}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(ride.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-green-600">{ride.fare}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Wallet Balance */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Wallet Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">$45.20</div>
                <Button variant="secondary" size="sm" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Money
                </Button>
              </CardContent>
            </Card>

            {/* Promo Card */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Special Offer!</h3>
                <p className="text-sm mb-4">Get 20% off on your next 3 rides</p>
                <Button variant="secondary" size="sm">
                  Claim Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}