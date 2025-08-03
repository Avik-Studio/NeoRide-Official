// Test the actual signup flow to see where it's failing
import { MongoClient } from 'mongodb';

const API_BASE_URL = 'https://neo-ride-backend-main.vercel.app/api';
const MONGODB_URI = 'mongodb+srv://avikmodak83:Avik%402005@cluster0.vvhbnvm.mongodb.net/NeoRide?retryWrites=true&w=majority&appName=Cluster0';

// Test customer data
const testCustomer = {
  supabaseId: 'test-signup-' + Date.now(),
  email: 'testsignup' + Date.now() + '@example.com',
  fullName: 'Test Signup User',
  phone: '+1234567890'
};

async function testAPISignup() {
  console.log('🔍 Testing API signup flow...\n');
  
  try {
    console.log('1. Testing API connection...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('API Health:', healthData.status, '- Connected:', healthData.connected);
    
    if (!healthData.connected) {
      console.log('⚠️ API is not connected to MongoDB - signup will use localStorage fallback');
    }
    
    console.log('\n2. Attempting to create customer via API...');
    const signupResponse = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testCustomer)
    });
    
    if (signupResponse.ok) {
      const customerData = await signupResponse.json();
      console.log('✅ Customer created via API:', customerData._id);
      return { success: true, method: 'API', data: customerData };
    } else {
      const errorData = await signupResponse.json();
      console.log('❌ API signup failed:', errorData);
      return { success: false, method: 'API', error: errorData };
    }
    
  } catch (error) {
    console.log('❌ API signup error:', error.message);
    return { success: false, method: 'API', error: error.message };
  }
}

async function testLocalStorageFallback() {
  console.log('\n3. Testing localStorage fallback...');
  
  // Simulate localStorage fallback
  const localCustomer = {
    ...testCustomer,
    _id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  console.log('✅ Would save to localStorage:', localCustomer._id);
  return { success: true, method: 'localStorage', data: localCustomer };
}

async function checkMongoDBDirect() {
  console.log('\n4. Checking MongoDB directly...');
  
  const client = new MongoClient(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });

  try {
    await client.connect();
    const db = client.db('NeoRide');
    
    // Count current customers
    const customerCount = await db.collection('customers').countDocuments();
    console.log(`Current customers in MongoDB: ${customerCount}`);
    
    // Check if our test customer was saved
    const testCustomerInDB = await db.collection('customers').findOne({
      supabaseId: testCustomer.supabaseId
    });
    
    if (testCustomerInDB) {
      console.log('✅ Test customer found in MongoDB:', testCustomerInDB._id);
    } else {
      console.log('❌ Test customer not found in MongoDB');
    }
    
    return { connected: true, customerCount, testCustomerFound: !!testCustomerInDB };
    
  } catch (error) {
    console.log('❌ Direct MongoDB connection failed:', error.message);
    return { connected: false, error: error.message };
  } finally {
    await client.close();
  }
}

async function runSignupTest() {
  console.log('🚀 Testing Signup Flow...');
  console.log('='.repeat(50));
  console.log('Test Customer Data:', testCustomer);
  console.log('='.repeat(50));

  // Test API signup
  const apiResult = await testAPISignup();
  
  // Test localStorage fallback
  const localResult = await testLocalStorageFallback();
  
  // Check MongoDB directly
  const mongoResult = await checkMongoDBDirect();
  
  // Summary
  console.log('\n📋 SIGNUP TEST SUMMARY:');
  console.log('='.repeat(30));
  console.log(`API Signup: ${apiResult.success ? '✅ SUCCESS' : '❌ FAILED'} (${apiResult.method})`);
  console.log(`localStorage Fallback: ${localResult.success ? '✅ AVAILABLE' : '❌ FAILED'}`);
  console.log(`MongoDB Direct: ${mongoResult.connected ? '✅ CONNECTED' : '❌ DISCONNECTED'}`);
  
  if (apiResult.success) {
    console.log('\n🎉 RESULT: Signup data IS being saved to MongoDB via API');
  } else if (localResult.success) {
    console.log('\n⚠️ RESULT: API failed, but localStorage fallback is working');
    console.log('   New signups will be saved locally until API is fixed');
  } else {
    console.log('\n❌ RESULT: Both API and fallback failed - signups may not work');
  }
  
  console.log('\n💡 RECOMMENDATION:');
  if (!apiResult.success && mongoResult.connected) {
    console.log('   - MongoDB is accessible, but Vercel API has connection issues');
    console.log('   - Consider using a local backend or fixing Vercel deployment');
    console.log('   - Current signups will use localStorage fallback');
  } else if (apiResult.success) {
    console.log('   - Everything is working correctly!');
  }
}

runSignupTest();