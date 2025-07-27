import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdminSidebar from '@/components/admin/AdminSidebar'
import RideManagement from '@/components/admin/RideManagement'
import CustomerManagement from '@/components/admin/CustomerManagement'
import DriverManagement from '@/components/admin/DriverManagement'
import FinancialDashboard from '@/components/admin/FinancialDashboard'
import BookingAnalytics from '@/components/admin/BookingAnalytics'
import AdminTest from '@/components/admin/AdminTest'
import { 
  Users, 
  Car, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  BarChart3,
  MapPin,
  Clock,
  Star,
  Shield,
  Settings,
  FileText,
  Activity,
  Bell,
  Calendar,
  MessageSquare,
  UserCheck,
  CreditCard,
  Database,
  LogOut
} from 'lucide-react'

export default function AdminHome() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userType')
    navigate('/login')
  }
  
  const [stats] = useState({
    totalUsers: 15420,
    activeDrivers: 1250,
    totalRides: 45680,
    revenue: 125430.50,
    avgRating: 4.7,
    activeRides: 89,
    pendingVerifications: 23,
    supportTickets: 12,
    systemAlerts: 3
  })

  const recentActivity = [
    { id: 1, type: 'user_signup', message: 'New customer registered: John Doe', time: '2 mins ago', icon: Users, color: 'text-blue-500' },
    { id: 2, type: 'driver_online', message: 'Driver Sarah went online', time: '5 mins ago', icon: Car, color: 'text-green-500' },
    { id: 3, type: 'ride_completed', message: 'Ride completed: $25.50 earned', time: '8 mins ago', icon: MapPin, color: 'text-purple-500' },
    { id: 4, type: 'issue_reported', message: 'Customer reported payment issue', time: '12 mins ago', icon: AlertTriangle, color: 'text-red-500' },
    { id: 5, type: 'verification', message: 'Driver documents verified', time: '15 mins ago', icon: Shield, color: 'text-blue-500' },
    { id: 6, type: 'payment', message: 'Payment processed: $89.25', time: '18 mins ago', icon: DollarSign, color: 'text-green-500' },
  ]

  const topDrivers = [
    { id: 1, name: 'Michael Johnson', rides: 156, rating: 4.9, earnings: 2450.75, status: 'online' },
    { id: 2, name: 'Sarah Williams', rides: 142, rating: 4.8, earnings: 2280.50, status: 'online' },
    { id: 3, name: 'David Brown', rides: 138, rating: 4.9, earnings: 2195.25, status: 'offline' },
    { id: 4, name: 'Lisa Garcia', rides: 134, rating: 4.7, earnings: 2150.00, status: 'online' },
    { id: 5, name: 'Robert Chen', rides: 128, rating: 4.8, earnings: 2080.75, status: 'offline' },
  ]

  const pendingIssues = [
    { id: 1, type: 'payment', customer: 'Alice Cooper', description: 'Payment failed for ride #12345', priority: 'high', time: '30 mins ago' },
    { id: 2, type: 'driver', driver: 'Bob Smith', description: 'Driver verification pending', priority: 'medium', time: '1 hour ago' },
    { id: 3, type: 'technical', description: 'App crash reported by multiple users', priority: 'high', time: '2 hours ago' },
    { id: 4, type: 'customer', customer: 'Emma Davis', description: 'Account suspension appeal', priority: 'medium', time: '3 hours ago' },
  ]

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'High server load detected', time: '5 mins ago', severity: 'medium' },
    { id: 2, type: 'info', message: 'Scheduled maintenance in 2 hours', time: '1 hour ago', severity: 'low' },
    { id: 3, type: 'error', message: 'Payment gateway timeout', time: '2 hours ago', severity: 'high' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />
      case 'rides':
        return <RideManagement />
      case 'customers':
        return <CustomerManagement />
      case 'drivers':
        return <DriverManagement />
      case 'finance':
        return <FinancialDashboard />
      case 'analytics':
        return <AnalyticsView />
      case 'bookings':
        return <BookingAnalytics />
      case 'payments':
        return <PaymentGatewayView />
      case 'support':
        return <CustomerSupportView />
      case 'verification':
        return <VerificationCenterView />
      case 'notifications':
        return <NotificationsView />
      case 'reports':
        return <ReportsView />
      case 'system':
        return <SystemHealthView />
      case 'settings':
        return <SettingsView />
      case 'test':
        return <AdminTest />
      default:
        return <DashboardOverview />
    }
  }

  const DashboardOverview = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 opacity-80" />
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <div className="text-sm opacity-80">Total Users</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4 text-center">
            <Car className="w-8 h-8 mx-auto mb-2 opacity-80" />
            <div className="text-2xl font-bold">{stats.activeDrivers.toLocaleString()}</div>
            <div className="text-sm opacity-80">Active Drivers</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4 text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2 opacity-80" />
            <div className="text-2xl font-bold">{stats.totalRides.toLocaleString()}</div>
            <div className="text-sm opacity-80">Total Rides</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 mx-auto mb-2 opacity-80" />
            <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
            <div className="text-sm opacity-80">Revenue</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 opacity-80" />
            <div className="text-2xl font-bold">{stats.avgRating}</div>
            <div className="text-sm opacity-80">Avg Rating</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4 text-center">
            <Activity className="w-8 h-8 mx-auto mb-2 opacity-80" />
            <div className="text-2xl font-bold">{stats.activeRides}</div>
            <div className="text-sm opacity-80">Active Rides</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Frequently used admin functions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 hover:bg-blue-50"
                  onClick={() => setActiveTab('rides')}
                >
                  <MapPin className="w-6 h-6 text-blue-500" />
                  <span className="text-sm">Manage Rides</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 hover:bg-green-50"
                  onClick={() => setActiveTab('drivers')}
                >
                  <Car className="w-6 h-6 text-green-500" />
                  <span className="text-sm">Driver Panel</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 hover:bg-purple-50"
                  onClick={() => setActiveTab('customers')}
                >
                  <Users className="w-6 h-6 text-purple-500" />
                  <span className="text-sm">Customers</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 hover:bg-orange-50"
                  onClick={() => setActiveTab('finance')}
                >
                  <DollarSign className="w-6 h-6 text-orange-500" />
                  <span className="text-sm">Financials</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 hover:bg-red-50"
                  onClick={() => setActiveTab('support')}
                >
                  <MessageSquare className="w-6 h-6 text-red-500" />
                  <span className="text-sm">Support</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 hover:bg-indigo-50"
                  onClick={() => setActiveTab('verification')}
                >
                  <UserCheck className="w-6 h-6 text-indigo-500" />
                  <span className="text-sm">Verification</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 hover:bg-teal-50"
                  onClick={() => setActiveTab('analytics')}
                >
                  <BarChart3 className="w-6 h-6 text-teal-500" />
                  <span className="text-sm">Analytics</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 hover:bg-pink-50"
                  onClick={() => setActiveTab('reports')}
                >
                  <FileText className="w-6 h-6 text-pink-500" />
                  <span className="text-sm">Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Top Drivers */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Top Performing Drivers
              </CardTitle>
              <CardDescription>Highest rated and most active drivers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topDrivers.map((driver, index) => (
                <div key={driver.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{driver.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{driver.rides} rides</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{driver.rating}</span>
                        </div>
                        <Badge variant={driver.status === 'online' ? 'default' : 'secondary'} className="text-xs">
                          {driver.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">${driver.earnings.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">This month</div>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setActiveTab('drivers')}
              >
                View All Drivers
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-80 overflow-y-auto space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`p-1 rounded-full ${activity.color}`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Issues */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Pending Issues
                <Badge variant="destructive" className="ml-auto">
                  {pendingIssues.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-80 overflow-y-auto space-y-3">
                {pendingIssues.map((issue) => (
                  <div key={issue.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={issue.priority === 'high' ? 'destructive' : issue.priority === 'medium' ? 'default' : 'secondary'}>
                        {issue.priority}
                      </Badge>
                      <span className="text-xs text-gray-500 capitalize">{issue.type}</span>
                    </div>
                    <p className="text-sm text-gray-900 mb-1">{issue.description}</p>
                    <p className="text-xs text-gray-500">{issue.time}</p>
                    {issue.customer && (
                      <p className="text-xs text-gray-600 mt-1">Customer: {issue.customer}</p>
                    )}
                    {issue.driver && (
                      <p className="text-xs text-gray-600 mt-1">Driver: {issue.driver}</p>
                    )}
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setActiveTab('support')}
              >
                View All Issues
              </Button>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                System Alerts
                <Badge variant="outline" className="ml-auto">
                  {systemAlerts.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'default' : 'secondary'}>
                      {alert.severity}
                    </Badge>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                  <p className="text-sm text-gray-900">{alert.message}</p>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setActiveTab('system')}
              >
                System Health
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  // Placeholder components for other tabs
  const AnalyticsView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>Platform performance and user behavior analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">Comprehensive analytics and insights coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const BookingSystemView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Booking System Management</CardTitle>
          <CardDescription>Manage reservations and booking configurations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Booking System</h3>
              <p className="text-gray-600">Advanced booking management features coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const PaymentGatewayView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Gateway Management</CardTitle>
          <CardDescription>Monitor transactions and payment processing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Gateway</h3>
              <p className="text-gray-600">Payment processing and transaction management</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const CustomerSupportView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Support Center</CardTitle>
          <CardDescription>Manage support tickets and customer inquiries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Support Center</h3>
              <p className="text-gray-600">Customer support and ticket management system</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const VerificationCenterView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Verification Center</CardTitle>
          <CardDescription>Review and approve driver and customer verifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <UserCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Verification Center</h3>
              <p className="text-gray-600">Document verification and approval system</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const NotificationsView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Management</CardTitle>
          <CardDescription>Send and manage platform notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Notifications</h3>
              <p className="text-gray-600">Push notifications and communication management</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const ReportsView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reports & Export</CardTitle>
          <CardDescription>Generate and download platform reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Reports</h3>
              <p className="text-gray-600">Comprehensive reporting and data export tools</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const SystemHealthView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Health Monitor</CardTitle>
          <CardDescription>Monitor server performance and system status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">System Health</h3>
              <p className="text-gray-600">Real-time system monitoring and diagnostics</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const SettingsView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Platform Settings</CardTitle>
          <CardDescription>Configure platform settings and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Settings</h3>
              <p className="text-gray-600">Platform configuration and administrative settings</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex">
      {/* Sidebar */}
      <AdminSidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="container mx-auto px-6 py-6 max-w-7xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {activeTab === 'dashboard' ? 'Admin Dashboard' : 
                   activeTab === 'rides' ? 'Ride Management' :
                   activeTab === 'customers' ? 'Customer Management' :
                   activeTab === 'drivers' ? 'Driver Management' :
                   activeTab === 'finance' ? 'Financial Dashboard' :
                   activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h1>
                <p className="text-gray-600">
                  {activeTab === 'dashboard' ? 'Monitor and manage your ride-sharing platform' :
                   activeTab === 'rides' ? 'Track and manage all ride bookings' :
                   activeTab === 'customers' ? 'Manage customer accounts and support' :
                   activeTab === 'drivers' ? 'Oversee driver performance and earnings' :
                   activeTab === 'finance' ? 'Financial analytics and revenue tracking' :
                   'Platform management and administration'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="px-3 py-1">
                  <Activity className="w-4 h-4 mr-2" />
                  System Healthy
                </Badge>
                <Button variant="outline" size="icon" onClick={() => setActiveTab('settings')}>
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleLogout} title="Logout">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}