// Debug script to test signup right now
const API_BASE_URL = 'https://neo-ride-backend-main.vercel.app/api';

const testUser = {
  supabaseId: 'debug-test-' + Date.now(),
  email: 'debugtest' + Date.now() + '@example.com',
  fullName: 'Debug Test User',
  phone: '+9876543210'
};

async function debugSignup() {
  console.log('🔍 Debug Signup Test');
  console.log('='.repeat(30));
  console.log('Testing with user:', testUser);
  console.log('='.repeat(30));

  try {
    console.log('\n1. Testing API health...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const health = await healthResponse.json();
    console.log('API Status:', health.status);
    console.log('MongoDB Connected:', health.connected);

    console.log('\n2. Creating customer...');
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ SUCCESS! Customer created:');
      console.log('  - ID:', result._id);
      console.log('  - Email:', result.email);
      console.log('  - Name:', result.fullName);
      console.log('  - Created:', result.createdAt);
      
      console.log('\n3. Verifying in database...');
      const verifyResponse = await fetch(`${API_BASE_URL}/customers/${testUser.supabaseId}`);
      if (verifyResponse.ok) {
        const verified = await verifyResponse.json();
        console.log('✅ VERIFIED! User found in database:', verified._id);
      } else {
        console.log('❌ Could not verify user in database');
      }
      
    } else {
      const error = await response.json();
      console.log('❌ FAILED! Error:', error);
    }

  } catch (error) {
    console.log('❌ ERROR:', error.message);
  }
}

debugSignup();