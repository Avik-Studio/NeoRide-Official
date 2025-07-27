import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  User, 
  Car, 
  Star, 
  Eye, 
  Filter,
  Search,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Navigation,
  Phone,
  MessageSquare
} from 'lucide-react'

interface Ride {
  id: string
  customer: {
    name: string
    phone: string
    rating: number
  }
  driver: {
    name: string
    phone: string
    rating: number
    vehicle: string
  }
  pickup: {
    address: string
    time: string
  }
  destination: {
    address: string
    estimatedTime: string
  }
  status: 'active' | 'completed' | 'cancelled' | 'pending'
  fare: number
  distance: number
  duration: string
  paymentMethod: string
  createdAt: string
  completedAt?: string
}

const mockRides: Ride[] = [
  {
    id: 'RD001',
    customer: { name: 'John Doe', phone: '+1234567890', rating: 4.8 },
    driver: { name: 'Mike Johnson', phone: '+1234567891', rating: 4.9, vehicle: 'Toyota Camry - ABC123' },
    pickup: { address: '123 Main St, Downtown', time: '10:30 AM' },
    destination: { address: '456 Oak Ave, Uptown', estimatedTime: '11:15 AM' },
    status: 'active',
    fare: 25.50,
    distance: 8.5,
    duration: '45 mins',
    paymentMethod: 'Credit Card',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'RD002',
    customer: { name: 'Sarah Wilson', phone: '+1234567892', rating: 4.6 },
    driver: { name: 'David Brown', phone: '+1234567893', rating: 4.7, vehicle: 'Honda Accord - XYZ789' },
    pickup: { address: '789 Pine St, Midtown', time: '09:45 AM' },
    destination: { address: '321 Elm St, Suburb', estimatedTime: '10:30 AM' },
    status: 'completed',
    fare: 18.75,
    distance: 6.2,
    duration: '35 mins',
    paymentMethod: 'Digital Wallet',
    createdAt: '2024-01-15T09:45:00Z',
    completedAt: '2024-01-15T10:20:00Z'
  },
  {
    id: 'RD003',
    customer: { name: 'Robert Chen', phone: '+1234567894', rating: 4.9 },
    driver: { name: 'Lisa Garcia', phone: '+1234567895', rating: 4.8, vehicle: 'Nissan Altima - DEF456' },
    pickup: { address: '555 Broadway, Theater District', time: '11:00 AM' },
    destination: { address: '777 Park Ave, Financial District', estimatedTime: '11:45 AM' },
    status: 'pending',
    fare: 32.00,
    distance: 12.3,
    duration: '55 mins',
    paymentMethod: 'Cash',
    createdAt: '2024-01-15T11:00:00Z'
  }
]

export default function RideManagement() {
  const [rides] = useState<Ride[]>(mockRides)
  const [filteredRides, setFilteredRides] = useState<Ride[]>(mockRides)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null)

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: 'default' as const, color: 'bg-blue-500', text: 'Active' },
      completed: { variant: 'secondary' as const, color: 'bg-green-500', text: 'Completed' },
      cancelled: { variant: 'destructive' as const, color: 'bg-red-500', text: 'Cancelled' },
      pending: { variant: 'outline' as const, color: 'bg-yellow-500', text: 'Pending' }
    }
    return variants[status as keyof typeof variants] || variants.pending
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Navigation className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterRides(term, statusFilter)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    filterRides(searchTerm, status)
  }

  const filterRides = (search: string, status: string) => {
    let filtered = rides

    if (search) {
      filtered = filtered.filter(ride => 
        ride.id.toLowerCase().includes(search.toLowerCase()) ||
        ride.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        ride.driver.name.toLowerCase().includes(search.toLowerCase()) ||
        ride.pickup.address.toLowerCase().includes(search.toLowerCase()) ||
        ride.destination.address.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (status !== 'all') {
      filtered = filtered.filter(ride => ride.status === status)
    }

    setFilteredRides(filtered)
  }

  const stats = {
    total: rides.length,
    active: rides.filter(r => r.status === 'active').length,
    completed: rides.filter(r => r.status === 'completed').length,
    cancelled: rides.filter(r => r.status === 'cancelled').length,
    pending: rides.filter(r => r.status === 'pending').length,
    totalRevenue: rides.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.fare, 0)
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Rides</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Navigation className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.active}</div>
            <div className="text-sm text-gray-600">Active Now</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.cancelled}</div>
            <div className="text-sm text-gray-600">Cancelled</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            <div className="text-sm text-gray-600">Revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Ride Management
          </CardTitle>
          <CardDescription>Monitor and manage all ride bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by ride ID, customer, driver, or location..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ride ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Fare</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRides.map((ride) => {
                      const statusInfo = getStatusBadge(ride.status)
                      return (
                        <TableRow key={ride.id}>
                          <TableCell className="font-medium">{ride.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{ride.customer.name}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                {ride.customer.rating}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{ride.driver.name}</div>
                              <div className="text-sm text-gray-500">{ride.driver.vehicle}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs">
                              <div className="text-sm font-medium truncate">{ride.pickup.address}</div>
                              <div className="text-xs text-gray-500">↓</div>
                              <div className="text-sm truncate">{ride.destination.address}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusInfo.variant} className="gap-1">
                              {getStatusIcon(ride.status)}
                              {statusInfo.text}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">${ride.fare}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{ride.pickup.time}</div>
                              <div className="text-gray-500">{ride.duration}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setSelectedRide(ride)}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Ride Details - {ride.id}</DialogTitle>
                                    <DialogDescription>
                                      Complete information about this ride
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedRide && (
                                    <div className="space-y-6">
                                      <div className="grid grid-cols-2 gap-6">
                                        <Card>
                                          <CardHeader className="pb-3">
                                            <CardTitle className="text-sm flex items-center gap-2">
                                              <User className="w-4 h-4" />
                                              Customer Details
                                            </CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-2">
                                            <div className="flex justify-between">
                                              <span className="text-sm text-gray-600">Name:</span>
                                              <span className="font-medium">{selectedRide.customer.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-sm text-gray-600">Phone:</span>
                                              <span className="font-medium">{selectedRide.customer.phone}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-sm text-gray-600">Rating:</span>
                                              <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="font-medium">{selectedRide.customer.rating}</span>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>

                                        <Card>
                                          <CardHeader className="pb-3">
                                            <CardTitle className="text-sm flex items-center gap-2">
                                              <Car className="w-4 h-4" />
                                              Driver Details
                                            </CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-2">
                                            <div className="flex justify-between">
                                              <span className="text-sm text-gray-600">Name:</span>
                                              <span className="font-medium">{selectedRide.driver.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-sm text-gray-600">Phone:</span>
                                              <span className="font-medium">{selectedRide.driver.phone}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-sm text-gray-600">Vehicle:</span>
                                              <span className="font-medium text-sm">{selectedRide.driver.vehicle}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-sm text-gray-600">Rating:</span>
                                              <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="font-medium">{selectedRide.driver.rating}</span>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>

                                      <Card>
                                        <CardHeader className="pb-3">
                                          <CardTitle className="text-sm flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            Trip Information
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                          <div className="grid grid-cols-2 gap-4">
                                            <div>
                                              <label className="text-sm text-gray-600">Pickup Location:</label>
                                              <p className="font-medium">{selectedRide.pickup.address}</p>
                                              <p className="text-sm text-gray-500">Time: {selectedRide.pickup.time}</p>
                                            </div>
                                            <div>
                                              <label className="text-sm text-gray-600">Destination:</label>
                                              <p className="font-medium">{selectedRide.destination.address}</p>
                                              <p className="text-sm text-gray-500">ETA: {selectedRide.destination.estimatedTime}</p>
                                            </div>
                                          </div>
                                          <div className="grid grid-cols-4 gap-4 pt-4 border-t">
                                            <div>
                                              <label className="text-sm text-gray-600">Distance:</label>
                                              <p className="font-medium">{selectedRide.distance} km</p>
                                            </div>
                                            <div>
                                              <label className="text-sm text-gray-600">Duration:</label>
                                              <p className="font-medium">{selectedRide.duration}</p>
                                            </div>
                                            <div>
                                              <label className="text-sm text-gray-600">Fare:</label>
                                              <p className="font-medium text-green-600">${selectedRide.fare}</p>
                                            </div>
                                            <div>
                                              <label className="text-sm text-gray-600">Payment:</label>
                                              <p className="font-medium">{selectedRide.paymentMethod}</p>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>

                                      <div className="flex justify-end gap-2">
                                        <Button variant="outline" className="gap-2">
                                          <Phone className="w-4 h-4" />
                                          Contact Customer
                                        </Button>
                                        <Button variant="outline" className="gap-2">
                                          <MessageSquare className="w-4 h-4" />
                                          Contact Driver
                                        </Button>
                                        <Button className="gap-2">
                                          <MapPin className="w-4 h-4" />
                                          Track Live
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="map">
              <Card>
                <CardContent className="p-6">
                  <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Live Map View</h3>
                      <p className="text-gray-600">Real-time tracking of all active rides</p>
                      <Button className="mt-4">Enable Live Tracking</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Ride Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Completed</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div className="w-1/3 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">33%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Active</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div className="w-1/3 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">33%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pending</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div className="w-1/3 h-2 bg-yellow-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">33%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Average Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Avg. Ride Duration</span>
                        <span className="font-medium">42 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Avg. Distance</span>
                        <span className="font-medium">9.0 km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Avg. Fare</span>
                        <span className="font-medium">$25.42</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Customer Rating</span>
                        <span className="font-medium">4.8/5.0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}