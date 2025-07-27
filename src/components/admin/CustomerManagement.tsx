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
import { 
  Users, 
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
  Car,
  Clock,
  AlertTriangle,
  UserCheck,
  MessageSquare,
  TrendingUp
} from 'lucide-react'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  status: 'active' | 'inactive' | 'suspended' | 'pending'
  rating: number
  totalRides: number
  totalSpent: number
  joinDate: string
  lastRide: string
  preferredPayment: string
  location: string
  verificationStatus: 'verified' | 'pending' | 'rejected'
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum'
}

const mockCustomers: Customer[] = [
  {
    id: 'CUST001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1234567890',
    avatar: '',
    status: 'active',
    rating: 4.8,
    totalRides: 45,
    totalSpent: 1250.75,
    joinDate: '2023-06-15',
    lastRide: '2024-01-15',
    preferredPayment: 'Credit Card',
    location: 'New York, NY',
    verificationStatus: 'verified',
    loyaltyTier: 'gold'
  },
  {
    id: 'CUST002',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    phone: '+1234567891',
    avatar: '',
    status: 'active',
    rating: 4.6,
    totalRides: 28,
    totalSpent: 780.50,
    joinDate: '2023-08-22',
    lastRide: '2024-01-14',
    preferredPayment: 'Digital Wallet',
    location: 'Los Angeles, CA',
    verificationStatus: 'verified',
    loyaltyTier: 'silver'
  },
  {
    id: 'CUST003',
    name: 'Robert Chen',
    email: 'robert.chen@email.com',
    phone: '+1234567892',
    avatar: '',
    status: 'pending',
    rating: 4.9,
    totalRides: 12,
    totalSpent: 340.25,
    joinDate: '2024-01-10',
    lastRide: '2024-01-13',
    preferredPayment: 'Cash',
    location: 'Chicago, IL',
    verificationStatus: 'pending',
    loyaltyTier: 'bronze'
  },
  {
    id: 'CUST004',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1234567893',
    avatar: '',
    status: 'suspended',
    rating: 3.2,
    totalRides: 8,
    totalSpent: 180.00,
    joinDate: '2023-12-05',
    lastRide: '2024-01-08',
    preferredPayment: 'Credit Card',
    location: 'Miami, FL',
    verificationStatus: 'rejected',
    loyaltyTier: 'bronze'
  }
]

export default function CustomerManagement() {
  const [customers] = useState<Customer[]>(mockCustomers)
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(mockCustomers)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: 'default' as const, color: 'text-green-600', text: 'Active' },
      inactive: { variant: 'secondary' as const, color: 'text-gray-600', text: 'Inactive' },
      suspended: { variant: 'destructive' as const, color: 'text-red-600', text: 'Suspended' },
      pending: { variant: 'outline' as const, color: 'text-yellow-600', text: 'Pending' }
    }
    return variants[status as keyof typeof variants] || variants.pending
  }

  const getLoyaltyBadge = (tier: string) => {
    const variants = {
      bronze: { color: 'bg-amber-100 text-amber-800', text: 'Bronze' },
      silver: { color: 'bg-gray-100 text-gray-800', text: 'Silver' },
      gold: { color: 'bg-yellow-100 text-yellow-800', text: 'Gold' },
      platinum: { color: 'bg-purple-100 text-purple-800', text: 'Platinum' }
    }
    return variants[tier as keyof typeof variants] || variants.bronze
  }

  const getVerificationBadge = (status: string) => {
    const variants = {
      verified: { icon: CheckCircle, color: 'text-green-600', text: 'Verified' },
      pending: { icon: Clock, color: 'text-yellow-600', text: 'Pending' },
      rejected: { icon: XCircle, color: 'text-red-600', text: 'Rejected' }
    }
    return variants[status as keyof typeof variants] || variants.pending
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterCustomers(term, statusFilter)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    filterCustomers(searchTerm, status)
  }

  const filterCustomers = (search: string, status: string) => {
    let filtered = customers

    if (search) {
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.phone.includes(search) ||
        customer.id.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (status !== 'all') {
      filtered = filtered.filter(customer => customer.status === status)
    }

    setFilteredCustomers(filtered)
  }

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    pending: customers.filter(c => c.status === 'pending').length,
    suspended: customers.filter(c => c.status === 'suspended').length,
    verified: customers.filter(c => c.verificationStatus === 'verified').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgRating: customers.reduce((sum, c) => sum + c.rating, 0) / customers.length
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Customers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.active}</div>
            <div className="text-sm text-gray-600">Active</div>
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
            <Ban className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.suspended}</div>
            <div className="text-sm text-gray-600">Suspended</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <UserCheck className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.verified}</div>
            <div className="text-sm text-gray-600">Verified</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.avgRating.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Customer Management
          </CardTitle>
          <CardDescription>Manage customer accounts, verification, and support</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, email, phone, or customer ID..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
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
              <TabsTrigger value="list">Customer List</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Verification</TableHead>
                      <TableHead>Rides</TableHead>
                      <TableHead>Spent</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Loyalty</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => {
                      const statusInfo = getStatusBadge(customer.status)
                      const loyaltyInfo = getLoyaltyBadge(customer.loyaltyTier)
                      const verificationInfo = getVerificationBadge(customer.verificationStatus)
                      
                      return (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={customer.avatar} />
                                <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{customer.name}</div>
                                <div className="text-sm text-gray-500">{customer.id}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="text-sm">{customer.email}</div>
                              <div className="text-sm text-gray-500">{customer.phone}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusInfo.variant}>
                              {statusInfo.text}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <verificationInfo.icon className={`w-4 h-4 ${verificationInfo.color}`} />
                              <span className={`text-sm ${verificationInfo.color}`}>
                                {verificationInfo.text}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-center">
                              <div className="font-medium">{customer.totalRides}</div>
                              <div className="text-xs text-gray-500">rides</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-green-600">
                              ${customer.totalSpent.toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-medium">{customer.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={loyaltyInfo.color}>
                              {loyaltyInfo.text}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setSelectedCustomer(customer)}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                  <DialogHeader>
                                    <DialogTitle>Customer Profile - {customer.name}</DialogTitle>
                                    <DialogDescription>
                                      Complete customer information and activity history
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedCustomer && (
                                    <div className="space-y-6">
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <Card>
                                          <CardHeader className="pb-3">
                                            <CardTitle className="text-sm flex items-center gap-2">
                                              <Users className="w-4 h-4" />
                                              Personal Information
                                            </CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-3">
                                            <div className="flex items-center gap-3">
                                              <Avatar className="h-16 w-16">
                                                <AvatarImage src={selectedCustomer.avatar} />
                                                <AvatarFallback className="text-lg">
                                                  {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                              </Avatar>
                                              <div>
                                                <h3 className="font-semibold text-lg">{selectedCustomer.name}</h3>
                                                <p className="text-sm text-gray-500">{selectedCustomer.id}</p>
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">{selectedCustomer.email}</span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">{selectedCustomer.phone}</span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">{selectedCustomer.location}</span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">Joined {new Date(selectedCustomer.joinDate).toLocaleDateString()}</span>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>

                                        <Card>
                                          <CardHeader className="pb-3">
                                            <CardTitle className="text-sm flex items-center gap-2">
                                              <TrendingUp className="w-4 h-4" />
                                              Activity Summary
                                            </CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                              <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-600">{selectedCustomer.totalRides}</div>
                                                <div className="text-xs text-gray-500">Total Rides</div>
                                              </div>
                                              <div className="text-center">
                                                <div className="text-2xl font-bold text-green-600">${selectedCustomer.totalSpent}</div>
                                                <div className="text-xs text-gray-500">Total Spent</div>
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Rating:</span>
                                                <div className="flex items-center gap-1">
                                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                  <span className="font-medium">{selectedCustomer.rating}</span>
                                                </div>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Last Ride:</span>
                                                <span className="font-medium">{new Date(selectedCustomer.lastRide).toLocaleDateString()}</span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Payment Method:</span>
                                                <span className="font-medium">{selectedCustomer.preferredPayment}</span>
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
                                                <label className="text-sm text-gray-600">Account Status:</label>
                                                <div className="mt-1">
                                                  <Badge variant={getStatusBadge(selectedCustomer.status).variant}>
                                                    {getStatusBadge(selectedCustomer.status).text}
                                                  </Badge>
                                                </div>
                                              </div>
                                              <div>
                                                <label className="text-sm text-gray-600">Verification:</label>
                                                <div className="mt-1 flex items-center gap-1">
                                                  <verificationInfo.icon className={`w-4 h-4 ${verificationInfo.color}`} />
                                                  <span className={`text-sm ${verificationInfo.color}`}>
                                                    {verificationInfo.text}
                                                  </span>
                                                </div>
                                              </div>
                                              <div>
                                                <label className="text-sm text-gray-600">Loyalty Tier:</label>
                                                <div className="mt-1">
                                                  <Badge className={getLoyaltyBadge(selectedCustomer.loyaltyTier).color}>
                                                    {getLoyaltyBadge(selectedCustomer.loyaltyTier).text}
                                                  </Badge>
                                                </div>
                                              </div>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>

                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-sm flex items-center gap-2">
                                            <Car className="w-4 h-4" />
                                            Recent Ride History
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="space-y-3">
                                            {[
                                              { date: '2024-01-15', from: '123 Main St', to: '456 Oak Ave', fare: '$25.50', status: 'completed' },
                                              { date: '2024-01-12', from: '789 Pine St', to: '321 Elm St', fare: '$18.75', status: 'completed' },
                                              { date: '2024-01-10', from: '555 Broadway', to: '777 Park Ave', fare: '$32.00', status: 'completed' }
                                            ].map((ride, index) => (
                                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex-1">
                                                  <div className="text-sm font-medium">{ride.from} → {ride.to}</div>
                                                  <div className="text-xs text-gray-500">{ride.date}</div>
                                                </div>
                                                <div className="text-right">
                                                  <div className="font-medium text-green-600">{ride.fare}</div>
                                                  <Badge variant="secondary" className="text-xs">
                                                    {ride.status}
                                                  </Badge>
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
                                        {selectedCustomer.status === 'active' ? (
                                          <Button variant="destructive" className="gap-2">
                                            <Ban className="w-4 h-4" />
                                            Suspend Account
                                          </Button>
                                        ) : (
                                          <Button className="gap-2">
                                            <CheckCircle className="w-4 h-4" />
                                            Activate Account
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

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Customer Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Active</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div className="w-1/2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">50%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pending</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div className="w-1/4 h-2 bg-yellow-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Suspended</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div className="w-1/4 h-2 bg-red-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Customer Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Avg. Rides per Customer</span>
                        <span className="font-medium">23.25</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Avg. Spending</span>
                        <span className="font-medium">$637.88</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Customer Retention</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Avg. Rating Given</span>
                        <span className="font-medium">4.6/5.0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="loyalty">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['bronze', 'silver', 'gold', 'platinum'].map((tier) => {
                  const tierCustomers = customers.filter(c => c.loyaltyTier === tier)
                  const tierInfo = getLoyaltyBadge(tier)
                  
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
                          <div className="text-2xl font-bold">{tierCustomers.length}</div>
                          <div className="text-sm text-gray-600">Customers</div>
                          <div className="mt-2 text-sm">
                            <div className="font-medium">
                              ${tierCustomers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
                            </div>
                            <div className="text-gray-500">Total Revenue</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}