// Test script to verify if signup data is being stored in MongoDB
// This script will help you check if user registration data is properly saved

const API_BASE_URL = 'https://neo-ride-backend-main.vercel.app/api';

// Test data for customer and driver signup
const testCustomer = {
  supabaseId: 'test-customer-' + Date.now(),
  email: 'testcustomer@example.com',
  fullName: 'Test Customer',
  phone: '+1234567890'
};

const testDriver = {
  supabaseId: 'test-driver-' + Date.now(),
  email: 'testdriver@example.com',
  fullName: 'Test Driver',
  phone: '+1234567891',
  licenseNumber: 'DL123456789',
  vehicleModel: 'Toyota Camry',
  vehiclePlate: 'ABC-1234'
};

// Helper function to make API requests
async function makeRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${JSON.stringify(data)}`);
    }

    return data;
  } catch (error) {
    console.error(`❌ API request failed for ${endpoint}:`, error.message);
    throw error;
  }
}

// Test functions
async function testAPIConnection() {
  console.log('\n🔍 Testing API Connection...');
  try {
    const health = await makeRequest('/health');
    console.log('✅ API Health Check:', health);
    return health.connected;
  } catch (error) {
    console.log('❌ API Connection Failed:', error.message);
    return false;
  }
}

async function testCustomerSignup() {
  console.log('\n👤 Testing Customer Signup...');
  try {
    // Create customer
    const customer = await makeRequest('/customers', {
      method: 'POST',
      body: JSON.stringify(testCustomer)
    });
    
    console.log('✅ Customer Created:', {
      id: customer._id,
      supabaseId: customer.supabaseId,
      email: customer.email,
      fullName: customer.fullName
    });

    // Verify customer was stored by retrieving it
    const retrievedCustomer = await makeRequest(`/customers/${testCustomer.supabaseId}`);
    console.log('✅ Customer Retrieved from Database:', {
      id: retrievedCustomer._id,
      email: retrievedCustomer.email,
      createdAt: retrievedCustomer.createdAt
    });

    return customer;
  } catch (error) {
    console.log('❌ Customer Signup Test Failed:', error.message);
    return null;
  }
}

async function testDriverSignup() {
  console.log('\n🚗 Testing Driver Signup...');
  try {
    // Create driver
    const driver = await makeRequest('/drivers', {
      method: 'POST',
      body: JSON.stringify(testDriver)
    });
    
    console.log('✅ Driver Created:', {
      id: driver._id,
      supabaseId: driver.supabaseId,
      email: driver.email,
      fullName: driver.fullName,
      status: driver.status
    });

    // Verify driver was stored by retrieving it
    const retrievedDriver = await makeRequest(`/drivers/${testDriver.supabaseId}`);
    console.log('✅ Driver Retrieved from Database:', {
      id: retrievedDriver._id,
      email: retrievedDriver.email,
      licenseNumber: retrievedDriver.licenseNumber,
      createdAt: retrievedDriver.createdAt
    });

    return driver;
  } catch (error) {
    console.log('❌ Driver Signup Test Failed:', error.message);
    return null;
  }
}

async function getStats() {
  console.log('\n📊 Getting Database Statistics...');
  try {
    const stats = await makeRequest('/stats');
    console.log('✅ Database Stats:', stats);
    return stats;
  } catch (error) {
    console.log('❌ Stats Request Failed:', error.message);
    return null;
  }
}

async function cleanupTestData(customer, driver) {
  console.log('\n🧹 Cleaning up test data...');
  
  if (customer) {
    try {
      await makeRequest(`/customers/${testCustomer.supabaseId}`, { method: 'DELETE' });
      console.log('✅ Test customer deleted');
    } catch (error) {
      console.log('⚠️ Failed to delete test customer:', error.message);
    }
  }
  
  if (driver) {
    try {
      await makeRequest(`/drivers/${testDriver.supabaseId}`, { method: 'DELETE' });
      console.log('✅ Test driver deleted');
    } catch (error) {
      console.log('⚠️ Failed to delete test driver:', error.message);
    }
  }
}

// Main test function
async function runSignupStorageTest() {
  console.log('🚀 Starting Signup Storage Test...');
  console.log('='.repeat(50));

  let customer = null;
  let driver = null;

  try {
    // Test API connection
    const isConnected = await testAPIConnection();
    if (!isConnected) {
      console.log('\n❌ Cannot proceed - API is not connected to MongoDB');
      return;
    }

    // Get initial stats
    await getStats();

    // Test customer signup
    customer = await testCustomerSignup();

    // Test driver signup
    driver = await testDriverSignup();

    // Get final stats
    await getStats();

    // Summary
    console.log('\n📋 Test Summary:');
    console.log('='.repeat(30));
    console.log(`Customer Signup: ${customer ? '✅ SUCCESS' : '❌ FAILED'}`);
    console.log(`Driver Signup: ${driver ? '✅ SUCCESS' : '❌ FAILED'}`);
    
    if (customer && driver) {
      console.log('\n🎉 All tests passed! Signup data is being stored in MongoDB.');
    } else {
      console.log('\n⚠️ Some tests failed. Check the error messages above.');
    }

  } catch (error) {
    console.error('\n💥 Test suite failed:', error.message);
  } finally {
    // Clean up test data
    await cleanupTestData(customer, driver);
  }

  console.log('\n✨ Test completed!');
}

// Run the test
runSignupStorageTest();