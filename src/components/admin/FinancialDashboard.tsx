import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  CreditCard,
  Wallet,
  PieChart,
  BarChart3,
  Download,
  RefreshCw,
  Calendar,
  Users,
  Car,
  MapPin,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

interface FinancialData {
  totalRevenue: number
  monthlyRevenue: number
  weeklyRevenue: number
  dailyRevenue: number
  driverEarnings: number
  platformCommission: number
  operatingCosts: number
  netProfit: number
  transactionVolume: number
  averageRideFare: number
  revenueGrowth: number
  profitMargin: number
}

interface PaymentMethod {
  name: string
  percentage: number
  amount: number
  color: string
}

interface RevenueBreakdown {
  category: string
  amount: number
  percentage: number
  change: number
  color: string
}

const mockFinancialData: FinancialData = {
  totalRevenue: 125430.50,
  monthlyRevenue: 45680.25,
  weeklyRevenue: 12450.75,
  dailyRevenue: 2890.50,
  driverEarnings: 87801.35,
  platformCommission: 18765.08,
  operatingCosts: 8950.25,
  netProfit: 28714.82,
  transactionVolume: 1847,
  averageRideFare: 25.42,
  revenueGrowth: 12.5,
  profitMargin: 22.9
}

const paymentMethods: PaymentMethod[] = [
  { name: 'Credit Card', percentage: 45, amount: 56443.73, color: 'bg-blue-500' },
  { name: 'Digital Wallet', percentage: 35, amount: 43900.68, color: 'bg-green-500' },
  { name: 'Cash', percentage: 15, amount: 18814.58, color: 'bg-yellow-500' },
  { name: 'Bank Transfer', percentage: 5, amount: 6271.53, color: 'bg-purple-500' }
]

const revenueBreakdown: RevenueBreakdown[] = [
  { category: 'Ride Fares', amount: 98750.25, percentage: 78.7, change: 8.5, color: 'bg-blue-500' },
  { category: 'Booking Fees', amount: 15680.15, percentage: 12.5, change: 15.2, color: 'bg-green-500' },
  { category: 'Cancellation Fees', amount: 6890.10, percentage: 5.5, change: -2.1, color: 'bg-yellow-500' },
  { category: 'Premium Services', amount: 4110.00, percentage: 3.3, change: 25.8, color: 'bg-purple-500' }
]

const monthlyData = [
  { month: 'Jan', revenue: 38500, profit: 8800 },
  { month: 'Feb', revenue: 42300, profit: 9650 },
  { month: 'Mar', revenue: 39800, profit: 9120 },
  { month: 'Apr', revenue: 45200, profit: 10340 },
  { month: 'May', revenue: 48900, profit: 11200 },
  { month: 'Jun', revenue: 52100, profit: 11930 },
  { month: 'Jul', revenue: 49800, profit: 11400 },
  { month: 'Aug', revenue: 53600, profit: 12280 },
  { month: 'Sep', revenue: 51200, profit: 11720 },
  { month: 'Oct', revenue: 55800, profit: 12780 },
  { month: 'Nov', revenue: 58200, profit: 13330 },
  { month: 'Dec', revenue: 45680, profit: 10460 }
]

export default function FinancialDashboard() {
  const [data] = useState<FinancialData>(mockFinancialData)
  const [timeRange, setTimeRange] = useState('month')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Financial Dashboard</h2>
          <p className="text-gray-600">Revenue, profits, and financial analytics</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
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
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold">{formatCurrency(data.totalRevenue)}</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm">{formatPercentage(data.revenueGrowth)} vs last month</span>
                </div>
              </div>
              <DollarSign className="w-12 h-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Net Profit</p>
                <p className="text-3xl font-bold">{formatCurrency(data.netProfit)}</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm">{formatPercentage(data.profitMargin)} margin</span>
                </div>
              </div>
              <TrendingUp className="w-12 h-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Driver Earnings</p>
                <p className="text-3xl font-bold">{formatCurrency(data.driverEarnings)}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">70% of total revenue</span>
                </div>
              </div>
              <Car className="w-12 h-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Platform Commission</p>
                <p className="text-3xl font-bold">{formatCurrency(data.platformCommission)}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Target className="w-4 h-4" />
                  <span className="text-sm">15% commission rate</span>
                </div>
              </div>
              <PieChart className="w-12 h-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Revenue Breakdown
            </CardTitle>
            <CardDescription>Revenue sources and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sources" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="sources">Revenue Sources</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sources" className="space-y-4">
                {revenueBreakdown.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded ${item.color}`}></div>
                        <span className="font-medium">{item.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(item.amount)}</div>
                        <div className="flex items-center gap-1 text-sm">
                          {item.change >= 0 ? (
                            <ArrowUpRight className="w-3 h-3 text-green-500" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 text-red-500" />
                          )}
                          <span className={item.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                            {formatPercentage(item.change)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="trends" className="space-y-4">
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Revenue Trends</h3>
                    <p className="text-gray-600">Interactive chart showing revenue trends over time</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="comparison" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(data.monthlyRevenue)}</div>
                    <div className="text-sm text-blue-600">This Month</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(data.monthlyRevenue * 0.85)}</div>
                    <div className="text-sm text-green-600">Last Month</div>
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">
                    {formatPercentage((data.monthlyRevenue - data.monthlyRevenue * 0.85) / (data.monthlyRevenue * 0.85) * 100)}
                  </div>
                  <div className="text-sm text-gray-600">Month-over-Month Growth</div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Payment Methods & Quick Stats */}
        <div className="space-y-6">
          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded ${method.color}`}></div>
                      <span className="text-sm font-medium">{method.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{method.percentage}%</div>
                      <div className="text-xs text-gray-500">{formatCurrency(method.amount)}</div>
                    </div>
                  </div>
                  <Progress value={method.percentage} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Key Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Transaction Volume</span>
                <span className="font-bold">{data.transactionVolume.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Ride Fare</span>
                <span className="font-bold">{formatCurrency(data.averageRideFare)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Operating Costs</span>
                <span className="font-bold">{formatCurrency(data.operatingCosts)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Profit Margin</span>
                <span className="font-bold text-green-600">{data.profitMargin}%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Financial Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Monthly Performance
            </CardTitle>
            <CardDescription>Revenue and profit trends over the year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.slice(-6).map((month, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">{month.month}</span>
                    </div>
                    <div>
                      <div className="font-medium">Revenue: {formatCurrency(month.revenue)}</div>
                      <div className="text-sm text-gray-500">Profit: {formatCurrency(month.profit)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">
                      {((month.profit / month.revenue) * 100).toFixed(1)}% margin
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Financial Health
            </CardTitle>
            <CardDescription>Key financial indicators and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-medium">Revenue Growth</div>
                    <div className="text-sm text-gray-500">Strong upward trend</div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Healthy</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-medium">Profit Margin</div>
                    <div className="text-sm text-gray-500">Above industry average</div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Excellent</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="font-medium">Operating Costs</div>
                    <div className="text-sm text-gray-500">Monitor for optimization</div>
                  </div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Watch</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Cash Flow</div>
                    <div className="text-sm text-gray-500">Positive and stable</div>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Strong</Badge>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">A+</div>
                <div className="text-sm text-gray-600">Overall Financial Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Recent High-Value Transactions
          </CardTitle>
          <CardDescription>Latest significant financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: 'TXN001', type: 'Ride Payment', amount: 125.50, customer: 'John Doe', time: '2 mins ago', status: 'completed' },
              { id: 'TXN002', type: 'Driver Payout', amount: -87.85, driver: 'Mike Johnson', time: '5 mins ago', status: 'processed' },
              { id: 'TXN003', type: 'Ride Payment', amount: 89.25, customer: 'Sarah Wilson', time: '8 mins ago', status: 'completed' },
              { id: 'TXN004', type: 'Platform Fee', amount: 15.75, customer: 'Robert Chen', time: '12 mins ago', status: 'collected' },
              { id: 'TXN005', type: 'Refund', amount: -45.00, customer: 'Lisa Garcia', time: '15 mins ago', status: 'refunded' }
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.amount > 0 ? (
                      <ArrowUpRight className="w-5 h-5 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{transaction.type}</div>
                    <div className="text-sm text-gray-500">
                      {transaction.customer && `Customer: ${transaction.customer}`}
                      {transaction.driver && `Driver: ${transaction.driver}`}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
                  </div>
                  <div className="text-sm text-gray-500">{transaction.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}