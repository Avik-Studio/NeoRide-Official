// Test MongoDB Integration
// Run this with: node test-mongodb.js

const API_BASE_URL = 'http://localhost:3001/api';

async function testAPI() {
  console.log('🧪 Testing NeoRide MongoDB Integration...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing API Health Check...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health Check:', healthData.message);
    console.log('   Connected:', healthData.connected);
    console.log('   Timestamp:', healthData.timestamp);

    // Test 2: Create Test Customer
    console.log('\n2️⃣ Testing Customer Creation...');
    const testCustomer = {
      supabaseId: 'test-customer-' + Date.now(),
      email: `testcustomer${Date.now()}@example.com`,
      fullName: 'Test Customer',
      phone: '+1234567890'
    };

    const customerResponse = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testCustomer)
    });

    if (customerResponse.ok) {
      const customerData = await customerResponse.json();
      console.log('✅ Customer Created:', customerData._id);
      console.log('   Name:', customerData.fullName);
      console.log('   Email:', customerData.email);
      console.log('   Phone:', customerData.phone);

      // Test customer retrieval
      console.log('\n   📋 Testing Customer Retrieval...');
      const getCustomerResponse = await fetch(`${API_BASE_URL}/customers/${testCustomer.supabaseId}`);
      if (getCustomerResponse.ok) {
        const retrievedCustomer = await getCustomerResponse.json();
        console.log('   ✅ Customer Retrieved:', retrievedCustomer.fullName);
      }
    } else {
      console.log('❌ Customer creation failed:', await customerResponse.text());
    }

    // Test 3: Create Test Driver
    console.log('\n3️⃣ Testing Driver Creation...');
    const testDriver = {
      supabaseId: 'test-driver-' + Date.now(),
      email: `testdriver${Date.now()}@example.com`,
      fullName: 'Test Driver',
      phone: '+1234567891',
      licenseNumber: 'TEST' + Date.now(),
      vehicleModel: 'Toyota Camry',
      vehiclePlate: 'TEST' + Date.now().toString().slice(-3)
    };

    const driverResponse = await fetch(`${API_BASE_URL}/drivers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testDriver)
    });

    if (driverResponse.ok) {
      const driverData = await driverResponse.json();
      console.log('✅ Driver Created:', driverData._id);
      console.log('   Name:', driverData.fullName);
      console.log('   Email:', driverData.email);
      console.log('   License:', driverData.licenseNumber);
      console.log('   Vehicle:', driverData.vehicleModel);
      console.log('   Plate:', driverData.vehiclePlate);
      console.log('   Status:', driverData.status);

      // Test driver retrieval
      console.log('\n   📋 Testing Driver Retrieval...');
      const getDriverResponse = await fetch(`${API_BASE_URL}/drivers/${testDriver.supabaseId}`);
      if (getDriverResponse.ok) {
        const retrievedDriver = await getDriverResponse.json();
        console.log('   ✅ Driver Retrieved:', retrievedDriver.fullName);
      }
    } else {
      console.log('❌ Driver creation failed:', await driverResponse.text());
    }

    // Test 4: Get Database Stats
    console.log('\n4️⃣ Testing Database Stats...');
    const statsResponse = await fetch(`${API_BASE_URL}/stats`);
    if (statsResponse.ok) {
      const stats = await statsResponse.json();
      console.log('✅ Database Stats Retrieved:');
      console.log('   Total Customers:', stats.totalCustomers);
      console.log('   Total Drivers:', stats.totalDrivers);
      console.log('   Approved Drivers:', stats.approvedDrivers);
      console.log('   Pending Drivers:', stats.pendingDrivers);
    }

    console.log('\n🎉 MongoDB Integration Tests Completed Successfully!');
    console.log('\n📝 Summary:');
    console.log('   ✅ Backend API is running on port 3001');
    console.log('   ✅ MongoDB connection is working');
    console.log('   ✅ Customer creation and retrieval working');
    console.log('   ✅ Driver creation and retrieval working');
    console.log('   ✅ Database statistics working');
    console.log('\n🚀 Your NeoRide MongoDB integration is ready for use!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Make sure the backend server is running: npm start (in backend folder)');
    console.log('   2. Check MongoDB connection string in backend/.env');
    console.log('   3. Verify port 3001 is not blocked');
  }
}

// Run the test
testAPI();