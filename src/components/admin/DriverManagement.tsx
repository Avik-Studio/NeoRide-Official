import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { 
  Car, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Eye, 
  Edit, 
  Ban, 
  CheckCircle,
  XCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Clock,
  AlertTriangle,
  UserCheck,
  MessageSquare,
  TrendingUp,
  FileText,
  Shield,
  Activity,
  Navigation,
  Fuel,
  Settings,
  Award
} from 'lucide-react'

interface Driver {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  status: 'online' | 'offline' | 'suspended' | 'pending'
  rating: number
  totalRides: number
  totalEarnings: number
  weeklyEarnings: number
  monthlyEarnings: number
  joinDate: string
  lastActive: string
  vehicle: {
    make: string
    model: string
    year: number
    plate: string
    color: string
  }
  documents: {
    license: 'verified' | 'pending' | 'rejected'
    insurance: 'verified' | 'pending' | 'rejected'
    registration: 'verified' | 'pending' | 'rejected'
    background: 'verified' | 'pending' | 'rejected'
  }
  location: string
  completionRate: number
  acceptanceRate: number
  cancellationRate: number
  averageResponseTime: number
  performanceTier: 'bronze' | 'silver' | 'gold' | 'platinum'
}

const mockDrivers: Driver[] = [
  {
    id: 'DRV001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    avatar: '',
    status: 'online',
    rating: 4.9,
    totalRides: 342,
    totalEarnings: 185450.75,
    weeklyEarnings: 28250.50,
    monthlyEarnings: 107890.25,
    joinDate: '2023-03-15',
    lastActive: '2024-01-15T14:30:00Z',
    vehicle: {
      make: 'Maruti Suzuki',
      model: 'Swift Dzire',
      year: 2022,
      plate: 'WB 02 AB 1234',
      color: 'Silver'
    },
    documents: {
      license: 'verified',
      insurance: 'verified',
      registration: 'verified',
      background: 'verified'
    },
    location: 'Park Street Area',
    completionRate: 98.5,
    acceptanceRate: 92.3,
    cancellationRate: 1.5,
    averageResponseTime: 45,
    performanceTier: 'platinum'
  },
  {
    id: 'DRV002',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43211',
    avatar: '',
    status: 'online',
    rating: 4.7,
    totalRides: 256,
    totalEarnings: 138920.50,
    weeklyEarnings: 21580.75,
    monthlyEarnings: 84650.25,
    joinDate: '2023-05-22',
    lastActive: '2024-01-15T13:45:00Z',
    vehicle: {
      make: 'Hyundai',
      model: 'Xcent',
      year: 2021,
      plate: 'WB 02 CD 5678',
      color: 'Black'
    },
    documents: {
      license: 'verified',
      insurance: 'verified',
      registration: 'verified',
      background: 'verified'
    },
    location: 'Salt Lake City',
    completionRate: 96.8,
    acceptanceRate: 89.5,
    cancellationRate: 3.2,
    averageResponseTime: 52,
    performanceTier: 'gold'
  },
  {
    id: 'DRV003',
    name: 'Amit Das',
    email: 'amit.das@email.com',
    phone: '+91 98765 43212',
    avatar: '',
    status: 'offline',
    rating: 4.8,
    totalRides: 189,
    totalEarnings: 104450.25,
    weeklyEarnings: 16500.00,
    monthlyEarnings: 65570.50,
    joinDate: '2023-07-10',
    lastActive: '2024-01-15T09:20:00Z',
    vehicle: {
      make: 'Tata',
      model: 'Tigor',
      year: 2020,
      plate: 'WB 02 EF 9012',
      color: 'White'
    },
    documents: {
      license: 'verified',
      insurance: 'verified',
      registration: 'pending',
      background: 'verified'
    },
    location: 'New Market Area',
    completionRate: 94.2,
    acceptanceRate: 87.1,
    cancellationRate: 5.8,
    averageResponseTime: 38,
    performanceTier: 'silver'
  },
  {
    id: 'DRV004',
    name: 'Sneha Banerjee',
    email: 'sneha.banerjee@email.com',
    phone: '+91 98765 43213',
    avatar: '',
    status: 'pending',
    rating: 0,
    totalRides: 0,
    totalEarnings: 0,
    weeklyEarnings: 0,
    monthlyEarnings: 0,
    joinDate: '2024-01-10',
    lastActive: '2024-01-15T10:00:00Z',
    vehicle: {
      make: 'Maruti Suzuki',
      model: 'Baleno',
      year: 2023,
      plate: 'WB 02 GH 3456',
      color: 'Blue'
    },
    documents: {
      license: 'pending',
      insurance: 'pending',
      registration: 'pending',
      background: 'pending'
    },
    location: 'Howrah Area',
    completionRate: 0,
    acceptanceRate: 0,
    cancellationRate: 0,
    averageResponseTime: 0,
    performanceTier: 'bronze'
  }
]

export default function DriverManagement() {
  const [drivers] = useState<Driver[]>(mockDrivers)
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>(mockDrivers)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)

  const getStatusBadge = (status: string) => {
    const variants = {
      online: { variant: 'default' as const, color: 'text-green-600', text: 'Online', icon: Activity },
      offline: { variant: 'secondary' as const, color: 'text-gray-600', text: 'Offline', icon: Clock },
      suspended: { variant: 'destructive' as const, color: 'text-red-600', text: 'Suspended', icon: Ban },
      pending: { variant: 'outline' as const, color: 'text-yellow-600', text: 'Pending', icon: AlertTriangle }
    }
    return variants[status as keyof typeof variants] || variants.pending
  }

  const getPerformanceBadge = (tier: string) => {
    const variants = {
      bronze: { color: 'bg-amber-100 text-amber-800', text: 'Bronze' },
      silver: { color: 'bg-gray-100 text-gray-800', text: 'Silver' },
      gold: { color: 'bg-yellow-100 text-yellow-800', text: 'Gold' },
      platinum: { color: 'bg-purple-100 text-purple-800', text: 'Platinum' }
    }
    return variants[tier as keyof typeof variants] || variants.bronze
  }

  const getDocumentStatus = (status: string) => {
    const variants = {
      verified: { icon: CheckCircle, color: 'text-green-600', text: 'Verified' },
      pending: { icon: Clock, color: 'text-yellow-600', text: 'Pending' },
      rejected: { icon: XCircle, color: 'text-red-600', text: 'Rejected' }
    }
    return variants[status as keyof typeof variants] || variants.pending
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterDrivers(term, statusFilter)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    filterDrivers(searchTerm, status)
  }

  const filterDrivers = (search: string, status: string) => {
    let filtered = drivers

    if (search) {
      filtered = filtered.filter(driver => 
        driver.name.toLowerCase().includes(search.toLowerCase()) ||
        driver.email.toLowerCase().includes(search.toLowerCase()) ||
        driver.phone.includes(search) ||
        driver.id.toLowerCase().includes(search.toLowerCase()) ||
        driver.vehicle.plate.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (status !== 'all') {
      filtered = filtered.filter(driver => driver.status === status)
    }

    setFilteredDrivers(filtered)
  }

  const stats = {
    total: drivers.length,
    online: drivers.filter(d => d.status === 'online').length,
    offline: drivers.filter(d => d.status === 'offline').length,
    pending: drivers.filter(d => d.status === 'pending').length,
    suspended: drivers.filter(d => d.status === 'suspended').length,
    totalEarnings: drivers.reduce((sum, d) => sum + d.totalEarnings, 0),
    avgRating: drivers.filter(d => d.rating > 0).reduce((sum, d) => sum + d.rating, 0) / drivers.filter(d => d.rating > 0).length || 0,
    totalRides: drivers.reduce((sum, d) => sum + d.totalRides, 0)
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Car className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Drivers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Activity className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.online}</div>
            <div className="text-sm text-gray-600">Online</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.offline}</div>
            <div className="text-sm text-gray-600">Offline</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Ban className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.suspended}</div>
            <div className="text-sm text-gray-600">Suspended</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">₹{stats.totalEarnings.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Earnings</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.avgRating.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Navigation className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.totalRides}</div>
            <div className="text-sm text-gray-600">Total Rides</div>
          </CardContent>
        </Card>
      </div>

      {/* Driver Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            Driver Management
          </CardTitle>
          <CardDescription>Manage driver accounts, verification, and performance tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, email, phone, or license plate..."
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
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
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
              <TabsTrigger value="list">Driver List</TabsTrigger>
              <TabsTrigger value="earnings">Earnings Report</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Driver</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Rides</TableHead>
                      <TableHead>Earnings</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDrivers.map((driver) => {
                      const statusInfo = getStatusBadge(driver.status)
                      const performanceInfo = getPerformanceBadge(driver.performanceTier)
                      
                      return (
                        <TableRow key={driver.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={driver.avatar} />
                                <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{driver.name}</div>
                                <div className="text-sm text-gray-500">{driver.id}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{driver.vehicle.year} {driver.vehicle.make} {driver.vehicle.model}</div>
                              <div className="text-sm text-gray-500">{driver.vehicle.plate} • {driver.vehicle.color}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusInfo.variant} className="gap-1">
                              <statusInfo.icon className="w-3 h-3" />
                              {statusInfo.text}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {driver.rating > 0 ? (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="font-medium">{driver.rating}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="text-center">
                              <div className="font-medium">{driver.totalRides}</div>
                              <div className="text-xs text-gray-500">rides</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-green-600">
                                ₹{driver.totalEarnings.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500">
                                ₹{driver.weeklyEarnings.toLocaleString()} this week
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={performanceInfo.color}>
                              {performanceInfo.text}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setSelectedDriver(driver)}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Driver Profile - {driver.name}</DialogTitle>
                                    <DialogDescription>
                                      Complete driver information, earnings, and performance metrics
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedDriver && (
                                    <div className="space-y-6">
                                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <Card>
                                          <CardHeader className="pb-3">
                                            <CardTitle className="text-sm flex items-center gap-2">
                                              <Car className="w-4 h-4" />
                                              Driver Information
                                            </CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-3">
                                            <div className="flex items-center gap-3">
                                              <Avatar className="h-16 w-16">
                                                <AvatarImage src={selectedDriver.avatar} />
                                                <AvatarFallback className="text-lg">
                                                  {selectedDriver.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                              </Avatar>
                                              <div>
                                                <h3 className="font-semibold text-lg">{selectedDriver.name}</h3>
                                                <p className="text-sm text-gray-500">{selectedDriver.id}</p>
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">{selectedDriver.email}</span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">{selectedDriver.phone}</span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">{selectedDriver.location}</span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">Joined {new Date(selectedDriver.joinDate).toLocaleDateString()}</span>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>

                                        <Card>
                                          <CardHeader className="pb-3">
                                            <CardTitle className="text-sm flex items-center gap-2">
                                              <DollarSign className="w-4 h-4" />
                                              Earnings Summary
                                            </CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-4">
                                            <div className="text-center">
                                              <div className="text-2xl font-bold text-green-600">₹{selectedDriver.totalEarnings.toLocaleString()}</div>
                                              <div className="text-xs text-gray-500">Total Earnings</div>
                                            </div>
                                            <div className="space-y-2">
                                              <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">This Week:</span>
                                                <span className="font-medium">₹{selectedDriver.weeklyEarnings.toLocaleString()}</span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">This Month:</span>
                                                <span className="font-medium">₹{selectedDriver.monthlyEarnings.toLocaleString()}</span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Avg per Ride:</span>
                                                <span className="font-medium">
                                                  ₹{selectedDriver.totalRides > 0 ? (selectedDriver.totalEarnings / selectedDriver.totalRides).toFixed(2) : '0.00'}
                                                </span>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>

                                        <Card>
                                          <CardHeader className="pb-3">
                                            <CardTitle className="text-sm flex items-center gap-2">
                                              <TrendingUp className="w-4 h-4" />
                                              Performance Metrics
                                            </CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-4">
                                            <div className="space-y-3">
                                              <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                  <span>Completion Rate</span>
                                                  <span className="font-medium">{selectedDriver.completionRate}%</span>
                                                </div>
                                                <Progress value={selectedDriver.completionRate} className="h-2" />
                                              </div>
                                              <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                  <span>Acceptance Rate</span>
                                                  <span className="font-medium">{selectedDriver.acceptanceRate}%</span>
                                                </div>
                                                <Progress value={selectedDriver.acceptanceRate} className="h-2" />
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Avg Response:</span>
                                                <span className="font-medium">{selectedDriver.averageResponseTime}s</span>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>

                                        <Card>
                                          <CardHeader className="pb-3">
                                            <CardTitle className="text-sm flex items-center gap-2">
                                              <Shield className="w-4 h-4" />
                                              Account Status
                                            </CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-4">
                                            <div className="space-y-3">
                                              <div>
                                                <label className="text-sm text-gray-600">Status:</label>
                                                <div className="mt-1">
                                                  <Badge variant={getStatusBadge(selectedDriver.status).variant} className="gap-1">
                                                    <statusInfo.icon className="w-3 h-3" />
                                                    {getStatusBadge(selectedDriver.status).text}
                                                  </Badge>
                                                </div>
                                              </div>
                                              <div>
                                                <label className="text-sm text-gray-600">Performance Tier:</label>
                                                <div className="mt-1">
                                                  <Badge className={getPerformanceBadge(selectedDriver.performanceTier).color}>
                                                    {getPerformanceBadge(selectedDriver.performanceTier).text}
                                                  </Badge>
                                                </div>
                                              </div>
                                              <div>
                                                <label className="text-sm text-gray-600">Rating:</label>
                                                <div className="mt-1 flex items-center gap-1">
                                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                  <span className="font-medium">{selectedDriver.rating || 'N/A'}</span>
                                                </div>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Card>
                                          <CardHeader>
                                            <CardTitle className="text-sm flex items-center gap-2">
                                              <Car className="w-4 h-4" />
                                              Vehicle Information
                                            </CardTitle>
                                          </CardHeader>
                                          <CardContent>
                                            <div className="space-y-3">
                                              <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Make & Model:</span>
                                                <span className="font-medium">{selectedDriver.vehicle.year} {selectedDriver.vehicle.make} {selectedDriver.vehicle.model}</span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">License Plate:</span>
                                                <span className="font-medium">{selectedDriver.vehicle.plate}</span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Color:</span>
                                                <span className="font-medium">{selectedDriver.vehicle.color}</span>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>

                                        <Card>
                                          <CardHeader>
                                            <CardTitle className="text-sm flex items-center gap-2">
                                              <FileText className="w-4 h-4" />
                                              Document Verification
                                            </CardTitle>
                                          </CardHeader>
                                          <CardContent>
                                            <div className="space-y-3">
                                              {Object.entries(selectedDriver.documents).map(([doc, status]) => {
                                                const docInfo = getDocumentStatus(status)
                                                return (
                                                  <div key={doc} className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600 capitalize">{doc}:</span>
                                                    <div className="flex items-center gap-1">
                                                      <docInfo.icon className={`w-4 h-4 ${docInfo.color}`} />
                                                      <span className={`text-sm ${docInfo.color}`}>
                                                        {docInfo.text}
                                                      </span>
                                                    </div>
                                                  </div>
                                                )
                                              })}
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>

                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-sm flex items-center gap-2">
                                            <Navigation className="w-4 h-4" />
                                            Recent Activity
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="space-y-3">
                                            {[
                                              { date: '2024-01-15', activity: 'Completed ride to Netaji Subhash Airport', earnings: '₹350', rating: 5 },
                                              { date: '2024-01-15', activity: 'Completed ride to Park Street', earnings: '₹180', rating: 4 },
                                              { date: '2024-01-14', activity: 'Completed ride to South City Mall', earnings: '₹150', rating: 5 },
                                              { date: '2024-01-14', activity: 'Completed ride to SSKM Hospital', earnings: '₹220', rating: 5 }
                                            ].map((activity, index) => (
                                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex-1">
                                                  <div className="text-sm font-medium">{activity.activity}</div>
                                                  <div className="text-xs text-gray-500">{activity.date}</div>
                                                </div>
                                                <div className="text-right">
                                                  <div className="font-medium text-green-600">{activity.earnings}</div>
                                                  <div className="flex items-center gap-1">
                                                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                                    <span className="text-xs">{activity.rating}</span>
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </CardContent>
                                      </Card>

                                      <div className="flex justify-end gap-2">
                                        <Button variant="outline" className="gap-2">
                                          <MessageSquare className="w-4 h-4" />
                                          Send Message
                                        </Button>
                                        <Button variant="outline" className="gap-2">
                                          <Edit className="w-4 h-4" />
                                          Edit Profile
                                        </Button>
                                        {selectedDriver.status === 'online' || selectedDriver.status === 'offline' ? (
                                          <Button variant="destructive" className="gap-2">
                                            <Ban className="w-4 h-4" />
                                            Suspend Driver
                                          </Button>
                                        ) : selectedDriver.status === 'pending' ? (
                                          <Button className="gap-2">
                                            <CheckCircle className="w-4 h-4" />
                                            Approve Driver
                                          </Button>
                                        ) : (
                                          <Button className="gap-2">
                                            <CheckCircle className="w-4 h-4" />
                                            Reactivate Driver
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="earnings">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">₹{stats.totalEarnings.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Driver Earnings</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">₹{(stats.totalEarnings / drivers.filter(d => d.totalRides > 0).length || 0).toFixed(0)}</div>
                    <div className="text-sm text-gray-600">Avg per Driver</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">₹{Math.max(...drivers.map(d => d.totalEarnings)).toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Top Earner</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Navigation className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">₹{(stats.totalEarnings / stats.totalRides || 0).toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Avg per Ride</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Top Earning Drivers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {drivers
                      .filter(d => d.totalEarnings > 0)
                      .sort((a, b) => b.totalEarnings - a.totalEarnings)
                      .slice(0, 5)
                      .map((driver, index) => (
                        <div key={driver.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium">{driver.name}</div>
                              <div className="text-sm text-gray-500">{driver.totalRides} rides</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">₹{driver.totalEarnings.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">₹{driver.monthlyEarnings.toLocaleString()} this month</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['platinum', 'gold', 'silver', 'bronze'].map((tier) => {
                  const tierDrivers = drivers.filter(d => d.performanceTier === tier)
                  const tierInfo = getPerformanceBadge(tier)
                  
                  return (
                    <Card key={tier}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Badge className={tierInfo.color}>
                            {tierInfo.text}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{tierDrivers.length}</div>
                          <div className="text-sm text-gray-600">Drivers</div>
                          <div className="mt-2 text-sm">
                            <div className="font-medium">
                              {tierDrivers.length > 0 ? (tierDrivers.reduce((sum, d) => sum + d.rating, 0) / tierDrivers.length).toFixed(1) : '0.0'}
                            </div>
                            <div className="text-gray-500">Avg Rating</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="verification">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {['license', 'insurance', 'registration', 'background'].map((docType) => {
                    const pendingCount = drivers.filter(d => d.documents[docType as keyof typeof d.documents] === 'pending').length
                    
                    return (
                      <Card key={docType}>
                        <CardContent className="p-4 text-center">
                          <FileText className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                          <div className="text-2xl font-bold">{pendingCount}</div>
                          <div className="text-sm text-gray-600 capitalize">{docType} Pending</div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Pending Verifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {drivers
                        .filter(d => Object.values(d.documents).some(status => status === 'pending'))
                        .map((driver) => (
                          <div key={driver.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={driver.avatar} />
                                <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{driver.name}</div>
                                <div className="text-sm text-gray-500">{driver.id}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {Object.entries(driver.documents)
                                .filter(([_, status]) => status === 'pending')
                                .map(([doc, _]) => (
                                  <Badge key={doc} variant="outline" className="text-xs">
                                    {doc}
                                  </Badge>
                                ))}
                              <Button size="sm" className="gap-1">
                                <Eye className="w-3 h-3" />
                                Review
                              </Button>
                            </div>
                          </div>
                        ))}
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