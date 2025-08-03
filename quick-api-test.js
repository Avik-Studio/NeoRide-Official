// Quick API test to check MongoDB connection
import https from 'https';

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

async function testAPI() {
  console.log('🔍 Testing API endpoints...\n');
  
  try {
    console.log('1. Testing /api/health...');
    const health = await makeRequest('https://neo-ride-backend-main.vercel.app/api/health');
    console.log('Health Response:', JSON.stringify(health, null, 2));
    
    console.log('\n2. Testing /api/debug...');
    const debug = await makeRequest('https://neo-ride-backend-main.vercel.app/api/debug');
    console.log('Debug Response:', JSON.stringify(debug, null, 2));
    
  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
  }
}

testAPI();