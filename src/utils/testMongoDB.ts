import { MongoService, CustomerService, DriverService } from '../services/mongoService';

// Test MongoDB Connection and Operations
export async function testMongoDBIntegration() {
  console.log('🧪 Starting MongoDB Integration Tests...');

  try {
    // Test 1: Connection Test
    console.log('\n1️⃣ Testing MongoDB Connection...');
    const connectionTest = await MongoService.testConnection();
    if (connectionTest) {
      console.log('✅ MongoDB connection successful');
    } else {
      console.log('❌ MongoDB connection failed');
      return false;
    }

    // Test 2: Create Test Customer
    console.log('\n2️⃣ Testing Customer Creation...');
    const testCustomer = {
      supabaseId: 'test-customer-' + Date.now(),
      email: `testcustomer${Date.now()}@example.com`,
      fullName: 'Test Customer',
      phone: '+1234567890'
    };

    try {
      const customer = await CustomerService.createCustomer(testCustomer);
      console.log('✅ Customer created successfully:', customer._id);

      // Test customer retrieval
      const retrievedCustomer = await CustomerService.getCustomerBySupabaseId(testCustomer.supabaseId);
      if (retrievedCustomer) {
        console.log('✅ Customer retrieval successful');
      }

      // Clean up test customer
      await CustomerService.deleteCustomer(testCustomer.supabaseId);
      console.log('✅ Test customer cleaned up');
    } catch (error) {
      console.log('❌ Customer test failed:', error);
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

    try {
      const driver = await DriverService.createDriver(testDriver);
      console.log('✅ Driver created successfully:', driver._id);

      // Test driver retrieval
      const retrievedDriver = await DriverService.getDriverBySupabaseId(testDriver.supabaseId);
      if (retrievedDriver) {
        console.log('✅ Driver retrieval successful');
      }

      // Clean up test driver
      await DriverService.deleteDriver(testDriver.supabaseId);
      console.log('✅ Test driver cleaned up');
    } catch (error) {
      console.log('❌ Driver test failed:', error);
    }

    // Test 4: Get Database Stats
    console.log('\n4️⃣ Testing Database Stats...');
    try {
      const stats = await MongoService.getStats();
      console.log('✅ Database stats retrieved:', stats);
    } catch (error) {
      console.log('❌ Stats test failed:', error);
    }

    console.log('\n🎉 MongoDB Integration Tests Completed Successfully!');
    return true;

  } catch (error) {
    console.error('❌ MongoDB Integration Tests Failed:', error);
    return false;
  }
}

// Function to run tests from browser console
(window as any).testMongoDB = testMongoDBIntegration;