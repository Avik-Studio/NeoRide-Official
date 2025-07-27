import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  Car,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Star,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

interface BookingStats {
  totalBookings: number
  completedBookings: number
  cancelledBookings: number
  pendingBookings: number
  averageBookingValue: number
  peakHours: string[]
  popularRoutes: Array<{
    from: string
    to: string
    count: number
    avgFare: number
  }>
  customerRetention: number
  bookingGrowth: number
}

const mockBookingStats: BookingStats = {
  totalBookings: 15847,
  completedBookings: 14256,
  cancelledBookings: 892,
  pendingBookings: 699,
  averageBookingValue: 28.45,
  peakHours: ['8:00-9:00 AM', '5:00-6:00 PM', '7:00-8:00 PM'],
  popularRoutes: [
    { from: 'Downtown', to: 'Airport', count: 1247, avgFare: 45.50 },
    { from: 'Mall District', to: 'Business Center', count: 986, avgFare: 22.75 },
    { from: 'University', to: 'City Center', count: 834, avgFare: 18.25 },
    { from: 'Residential Area', to: 'Shopping Mall', count: 756, avgFare: 15.80 },
    { from: 'Airport', to: 'Hotel District', count: 623, avgFare: 35.90 }
  ],
  customerRetention: 78.5,
  bookingGrowth: 15.2
}

const hourlyBookings = [
  { hour: '00:00', bookings: 45 },
  { hour: '01:00', bookings: 32 },
  { hour: '02:00', bookings: 28 },
  { hour: '03:00', bookings: 25 },
  { hour: '04:00', bookings: 35 },
  { hour: '05:00', bookings: 58 },
  { hour: '06:00', bookings: 89 },
  { hour: '07:00', bookings: 156 },
  { hour: '08:00', bookings: 234 },
  { hour: '09:00', bookings: 189 },
  { hour: '10:00', bookings: 145 },
  { hour: '11:00', bookings: 167 },
  { hour: '12:00', bookings: 198 },
  { hour: '13:00', bookings: 176 },
  { hour: '14:00', bookings: 154 },
  { hour: '15:00', bookings: 189 },
  { hour: '16:00', bookings: 201 },
  { hour: '17:00', bookings: 267 },
  { hour: '18:00', bookings: 245 },
  { hour: '19:00', bookings: 223 },
  { hour: '20:00', bookings: 198 },
  { hour: '21:00', bookings: 167 },
  { hour: '22:00', bookings: 134 },
  { hour: '23:00', bookings: 89 }
]

export default function BookingAnalytics() {
  const [stats] = useState<BookingStats>(mockBookingStats)
  const [timeRange, setTimeRange] = useState('today')

  const completionRate = (stats.completedBookings / stats.totalBookings) * 100
  const cancellationRate = (stats.cancelledBookings / stats.totalBookings) * 100

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Booking Analytics</h2>
          <p className="text-gray-600">Comprehensive booking insights and patterns</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Data</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Bookings</p>
                <p className="text-3xl font-bold">{stats.totalBookings.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm">{stats.bookingGrowth}% growth</span>
                </div>
              </div>
              <Calendar className="w-12 h-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Completed</p>
                <p className="text-3xl font-bold">{stats.completedBookings.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm">{completionRate.toFixed(1)}% rate</span>
                </div>
              </div>
              <MapPin className="w-12 h-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Cancelled</p>
                <p className="text-3xl font-bold">{stats.cancelledBookings.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="w-4 h-4" />
                  <span className="text-sm">{cancellationRate.toFixed(1)}% rate</span>
                </div>
              </div>
              <Clock className="w-12 h-12 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Pending</p>
                <p className="text-3xl font-bold">{stats.pendingBookings.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Awaiting drivers</span>
                </div>
              </div>
              <Users className="w-12 h-12 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Avg. Value</p>
                <p className="text-3xl font-bold">${stats.averageBookingValue}</p>
                <div className="flex items-center gap-1 mt-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">Per booking</span>
                </div>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Booking Analytics
          </CardTitle>
          <CardDescription>Detailed booking patterns and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="hourly" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="hourly">Hourly Patterns</TabsTrigger>
              <TabsTrigger value="routes">Popular Routes</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="hourly" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Hourly Booking Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {hourlyBookings.map((item, index) => {
                          const maxBookings = Math.max(...hourlyBookings.map(h => h.bookings))
                          const percentage = (item.bookings / maxBookings) * 100
                          const isPeak = stats.peakHours.some(peak => peak.includes(item.hour.split(':')[0]))
                          
                          return (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-16 text-sm font-mono">{item.hour}</div>
                              <div className="flex-1">
                                <Progress 
                                  value={percentage} 
                                  className={`h-3 ${isPeak ? 'bg-red-100' : ''}`}
                                />
                              </div>
                              <div className="w-12 text-sm text-right">{item.bookings}</div>
                              {isPeak && (
                                <Badge variant="destructive" className="text-xs">Peak</Badge>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Peak Hours</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {stats.peakHours.map((hour, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-red-500" />
                            <span className="font-medium">{hour}</span>
                          </div>
                          <Badge variant="destructive">Peak</Badge>
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {hourlyBookings.reduce((sum, h) => sum + h.bookings, 0)}
                          </div>
                          <div className="text-sm text-gray-600">Total Daily Bookings</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="routes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Most Popular Routes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.popularRoutes.map((route, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{route.from} → {route.to}</div>
                            <div className="text-sm text-gray-500">{route.count} bookings</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">${route.avgFare}</div>
                          <div className="text-sm text-gray-500">Avg. fare</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Completion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {completionRate.toFixed(1)}%
                      </div>
                      <Progress value={completionRate} className="mb-4" />
                      <div className="text-sm text-gray-600">
                        {stats.completedBookings.toLocaleString()} of {stats.totalBookings.toLocaleString()} bookings completed
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Cancellation Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600 mb-2">
                        {cancellationRate.toFixed(1)}%
                      </div>
                      <Progress value={cancellationRate} className="mb-4" />
                      <div className="text-sm text-gray-600">
                        {stats.cancelledBookings.toLocaleString()} bookings cancelled
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Customer Retention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {stats.customerRetention}%
                      </div>
                      <Progress value={stats.customerRetention} className="mb-4" />
                      <div className="text-sm text-gray-600">
                        Customers making repeat bookings
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Booking Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">This Month</span>
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                          <span className="font-medium text-green-600">+{stats.bookingGrowth}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Month</span>
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                          <span className="font-medium text-green-600">+8.7%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">3 Months Ago</span>
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                          <span className="font-medium text-green-600">+12.3%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Revenue Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Average Booking Value</span>
                        <span className="font-medium">${stats.averageBookingValue}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Total Revenue</span>
                        <span className="font-medium">${(stats.completedBookings * stats.averageBookingValue).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Revenue Growth</span>
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                          <span className="font-medium text-green-600">+18.5%</span>
                        </div>
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