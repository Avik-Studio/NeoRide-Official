import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mongoAPI } from '@/api/mongodb'
import { 
  CheckCircle, 
  AlertTriangle, 
  User, 
  Car,
  Database,
  Loader2,
  RefreshCw
} from 'lucide-react'

interface TestResult {
  success: boolean
  message: string
  data?: any
  error?: string
}

export default function SignupTest() {
  const [customerData, setCustomerData] = useState({
    supabaseId: `test-customer-${Date.now()}`,
    email: 'testcustomer@example.com',
    fullName: 'Test Customer',
    phone: '+1234567890'
  })

  const [driverData, setDriverData] = useState({
    supabaseId: `test-driver-${Date.now()}`,
    email: 'testdriver@example.com',
    fullName: 'Test Driver',
    phone: '+1234567891',
    licenseNumber: 'DL123456789',
    vehicleModel: 'Toyota Camry',
    vehiclePlate: 'ABC-1234'
  })

  const [results, setResults] = useState<{
    connection?: TestResult
    customerCreate?: TestResult
    customerRetrieve?: TestResult
    driverCreate?: TestResult
    driverRetrieve?: TestResult
    stats?: TestResult
  }>({})

  const [loading, setLoading] = useState<string | null>(null)

  const testConnection = async () => {
    setLoading('connection')
    try {
      const result = await mongoAPI.testConnection()
      setResults(prev => ({
        ...prev,
        connection: {
          success: result.connected,
          message: result.connected ? 'API connected to MongoDB' : 'API not connected',
          data: result
        }
      }))
    } catch (error) {
      setResults(prev => ({
        ...prev,
        connection: {
          success: false,
          message: 'Connection test failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }))
    } finally {
      setLoading(null)
    }
  }

  const testCustomerSignup = async () => {
    setLoading('customer')
    try {
      // Create customer
      const createResult = await mongoAPI.createCustomer(customerData)
      setResults(prev => ({
        ...prev,
        customerCreate: {
          success: true,
          message: 'Customer created successfully',
          data: createResult
        }
      }))

      // Retrieve customer to verify storage
      const retrieveResult = await mongoAPI.getCustomer(customerData.supabaseId)
      setResults(prev => ({
        ...prev,
        customerRetrieve: {
          success: true,
          message: 'Customer retrieved from database',
          data: retrieveResult
        }
      }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setResults(prev => ({
        ...prev,
        customerCreate: {
          success: false,
          message: 'Customer signup failed',
          error: errorMessage
        }
      }))
    } finally {
      setLoading(null)
    }
  }

  const testDriverSignup = async () => {
    setLoading('driver')
    try {
      // Create driver
      const createResult = await mongoAPI.createDriver(driverData)
      setResults(prev => ({
        ...prev,
        driverCreate: {
          success: true,
          message: 'Driver created successfully',
          data: createResult
        }
      }))

      // Retrieve driver to verify storage
      const retrieveResult = await mongoAPI.getDriver(driverData.supabaseId)
      setResults(prev => ({
        ...prev,
        driverRetrieve: {
          success: true,
          message: 'Driver retrieved from database',
          data: retrieveResult
        }
      }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setResults(prev => ({
        ...prev,
        driverCreate: {
          success: false,
          message: 'Driver signup failed',
          error: errorMessage
        }
      }))
    } finally {
      setLoading(null)
    }
  }

  const getStats = async () => {
    setLoading('stats')
    try {
      const result = await mongoAPI.getStats()
      setResults(prev => ({
        ...prev,
        stats: {
          success: true,
          message: 'Database statistics retrieved',
          data: result
        }
      }))
    } catch (error) {
      setResults(prev => ({
        ...prev,
        stats: {
          success: false,
          message: 'Failed to get stats',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }))
    } finally {
      setLoading(null)
    }
  }

  const resetTest = () => {
    setCustomerData({
      supabaseId: `test-customer-${Date.now()}`,
      email: 'testcustomer@example.com',
      fullName: 'Test Customer',
      phone: '+1234567890'
    })
    setDriverData({
      supabaseId: `test-driver-${Date.now()}`,
      email: 'testdriver@example.com',
      fullName: 'Test Driver',
      phone: '+1234567891',
      licenseNumber: 'DL123456789',
      vehicleModel: 'Toyota Camry',
      vehiclePlate: 'ABC-1234'
    })
    setResults({})
  }

  const ResultCard = ({ title, result, icon: Icon }: { title: string, result?: TestResult, icon: any }) => (
    <Card className={`${result?.success ? 'border-green-200 bg-green-50' : result?.success === false ? 'border-red-200 bg-red-50' : ''}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Icon className="w-4 h-4" />
          {title}
          {result?.success === true && <CheckCircle className="w-4 h-4 text-green-500" />}
          {result?.success === false && <AlertTriangle className="w-4 h-4 text-red-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {result ? (
          <div className="space-y-2">
            <Badge variant={result.success ? 'default' : 'destructive'}>
              {result.success ? 'Success' : 'Failed'}
            </Badge>
            <p className="text-sm text-gray-600">{result.message}</p>
            {result.error && (
              <p className="text-xs text-red-600 bg-red-50 p-2 rounded">{result.error}</p>
            )}
            {result.data && (
              <details className="text-xs">
                <summary className="cursor-pointer text-blue-600">View Data</summary>
                <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto max-h-32">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </details>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Not tested yet</p>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Signup Storage Test</h1>
          <p className="text-gray-600">Test if user signup data is being stored in MongoDB database</p>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Test Actions</CardTitle>
            <CardDescription>Run these tests to verify signup data storage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={testConnection} 
                disabled={loading === 'connection'}
                className="flex items-center gap-2"
              >
                {loading === 'connection' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                Test Connection
              </Button>
              <Button 
                onClick={testCustomerSignup} 
                disabled={loading === 'customer'}
                className="flex items-center gap-2"
              >
                {loading === 'customer' ? <Loader2 className="w-4 h-4 animate-spin" /> : <User className="w-4 h-4" />}
                Test Customer Signup
              </Button>
              <Button 
                onClick={testDriverSignup} 
                disabled={loading === 'driver'}
                className="flex items-center gap-2"
              >
                {loading === 'driver' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Car className="w-4 h-4" />}
                Test Driver Signup
              </Button>
              <Button 
                onClick={getStats} 
                disabled={loading === 'stats'}
                variant="outline"
                className="flex items-center gap-2"
              >
                {loading === 'stats' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                Get Stats
              </Button>
              <Button 
                onClick={resetTest} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Test
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ResultCard title="API Connection" result={results.connection} icon={Database} />
          <ResultCard title="Customer Creation" result={results.customerCreate} icon={User} />
          <ResultCard title="Customer Retrieval" result={results.customerRetrieve} icon={CheckCircle} />
          <ResultCard title="Driver Creation" result={results.driverCreate} icon={Car} />
          <ResultCard title="Driver Retrieval" result={results.driverRetrieve} icon={CheckCircle} />
          <ResultCard title="Database Stats" result={results.stats} icon={Database} />
        </div>

        {/* Test Data Configuration */}
        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customer">Customer Test Data</TabsTrigger>
            <TabsTrigger value="driver">Driver Test Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="customer">
            <Card>
              <CardHeader>
                <CardTitle>Customer Test Data</CardTitle>
                <CardDescription>Modify the test data for customer signup</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customer-email">Email</Label>
                    <Input
                      id="customer-email"
                      value={customerData.email}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer-name">Full Name</Label>
                    <Input
                      id="customer-name"
                      value={customerData.fullName}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, fullName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer-phone">Phone</Label>
                    <Input
                      id="customer-phone"
                      value={customerData.phone}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer-supabase">Supabase ID</Label>
                    <Input
                      id="customer-supabase"
                      value={customerData.supabaseId}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, supabaseId: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="driver">
            <Card>
              <CardHeader>
                <CardTitle>Driver Test Data</CardTitle>
                <CardDescription>Modify the test data for driver signup</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="driver-email">Email</Label>
                    <Input
                      id="driver-email"
                      value={driverData.email}
                      onChange={(e) => setDriverData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="driver-name">Full Name</Label>
                    <Input
                      id="driver-name"
                      value={driverData.fullName}
                      onChange={(e) => setDriverData(prev => ({ ...prev, fullName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="driver-phone">Phone</Label>
                    <Input
                      id="driver-phone"
                      value={driverData.phone}
                      onChange={(e) => setDriverData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="driver-license">License Number</Label>
                    <Input
                      id="driver-license"
                      value={driverData.licenseNumber}
                      onChange={(e) => setDriverData(prev => ({ ...prev, licenseNumber: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="driver-vehicle">Vehicle Model</Label>
                    <Input
                      id="driver-vehicle"
                      value={driverData.vehicleModel}
                      onChange={(e) => setDriverData(prev => ({ ...prev, vehicleModel: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="driver-plate">Vehicle Plate</Label>
                    <Input
                      id="driver-plate"
                      value={driverData.vehiclePlate}
                      onChange={(e) => setDriverData(prev => ({ ...prev, vehiclePlate: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use This Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Step 1: Test Connection</h4>
                <p className="text-sm text-blue-700">
                  Click "Test Connection" to verify your API is connected to MongoDB. You should see a success message.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Step 2: Test Signup Storage</h4>
                <p className="text-sm text-green-700">
                  Click "Test Customer Signup" and "Test Driver Signup" to create test users and verify they're stored in MongoDB.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Step 3: Check Results</h4>
                <p className="text-sm text-purple-700">
                  Look at the result cards above. Green cards with checkmarks mean the data was successfully stored and retrieved.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}