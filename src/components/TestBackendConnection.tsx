import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MongoService } from '@/services/mongoService';

export function TestBackendConnection() {
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setConnectionStatus('loading');
    setError(null);
    
    try {
      // Test the connection
      const isConnected = await MongoService.testConnection();
      
      if (isConnected) {
        setConnectionStatus('success');
        
        // Get the API response from health endpoint
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/health`);
          const data = await response.json();
          setApiResponse(data);
        } catch (healthError) {
          console.error('Error fetching health data:', healthError);
        }
        
        // Get stats
        try {
          const statsData = await MongoService.getStats();
          setStats(statsData);
        } catch (statsError) {
          console.error('Error fetching stats:', statsError);
        }
      } else {
        setConnectionStatus('error');
        setError('Connection test failed. Check console for details.');
      }
    } catch (error) {
      console.error('Connection test error:', error);
      setConnectionStatus('error');
      setError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Backend Connection Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Connection Status:</p>
            <p className={`text-lg font-bold ${
              connectionStatus === 'success' ? 'text-green-600' : 
              connectionStatus === 'error' ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {connectionStatus === 'success' ? '✅ Connected' : 
               connectionStatus === 'error' ? '❌ Failed' : '⏳ Testing...'}
            </p>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <Button onClick={testConnection} variant="outline">
            Test Again
          </Button>
        </div>

        {apiResponse && (
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">API Response:</h3>
            <div className="bg-gray-100 p-3 rounded-md overflow-auto max-h-40">
              <pre className="text-xs">{JSON.stringify(apiResponse, null, 2)}</pre>
            </div>
          </div>
        )}

        {stats && (
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Database Stats:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-blue-50 p-3 rounded-md text-center">
                <p className="text-xs text-blue-700">Customers</p>
                <p className="text-xl font-bold text-blue-900">{stats.totalCustomers}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-md text-center">
                <p className="text-xs text-green-700">Total Drivers</p>
                <p className="text-xl font-bold text-green-900">{stats.totalDrivers}</p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-md text-center">
                <p className="text-xs text-emerald-700">Approved Drivers</p>
                <p className="text-xl font-bold text-emerald-900">{stats.approvedDrivers}</p>
              </div>
              <div className="bg-amber-50 p-3 rounded-md text-center">
                <p className="text-xs text-amber-700">Pending Drivers</p>
                <p className="text-xl font-bold text-amber-900">{stats.pendingDrivers}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-600">
          <p><strong>API URL:</strong> {import.meta.env.VITE_API_BASE_URL || 'Not set'}</p>
          <p className="mt-1"><strong>Environment:</strong> {import.meta.env.MODE}</p>
        </div>
      </CardContent>
    </Card>
  );
}