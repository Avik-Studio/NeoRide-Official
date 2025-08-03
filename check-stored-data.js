// Script to check what signup data is actually stored
import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://avikmodak83:Avik%402005@cluster0.vvhbnvm.mongodb.net/NeoRide?retryWrites=true&w=majority&appName=Cluster0';

async function checkStoredData() {
  console.log('🔍 Checking stored signup data...\n');
  
  const client = new MongoClient(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('NeoRide');
    
    // Check customers collection
    console.log('\n📊 CUSTOMERS DATA:');
    console.log('='.repeat(30));
    const customers = await db.collection('customers').find({}).toArray();
    console.log(`Total customers: ${customers.length}`);
    
    if (customers.length > 0) {
      customers.forEach((customer, index) => {
        console.log(`\nCustomer ${index + 1}:`);
        console.log(`  ID: ${customer._id}`);
        console.log(`  Supabase ID: ${customer.supabaseId}`);
        console.log(`  Email: ${customer.email}`);
        console.log(`  Name: ${customer.fullName}`);
        console.log(`  Phone: ${customer.phone}`);
        console.log(`  Created: ${customer.createdAt}`);
        console.log(`  Verified: ${customer.isVerified}`);
      });
    } else {
      console.log('  No customers found in database');
    }
    
    // Check drivers collection
    console.log('\n🚗 DRIVERS DATA:');
    console.log('='.repeat(30));
    const drivers = await db.collection('drivers').find({}).toArray();
    console.log(`Total drivers: ${drivers.length}`);
    
    if (drivers.length > 0) {
      drivers.forEach((driver, index) => {
        console.log(`\nDriver ${index + 1}:`);
        console.log(`  ID: ${driver._id}`);
        console.log(`  Supabase ID: ${driver.supabaseId}`);
        console.log(`  Email: ${driver.email}`);
        console.log(`  Name: ${driver.fullName}`);
        console.log(`  Phone: ${driver.phone}`);
        console.log(`  License: ${driver.licenseNumber}`);
        console.log(`  Vehicle: ${driver.vehicleModel} (${driver.vehiclePlate})`);
        console.log(`  Status: ${driver.status}`);
        console.log(`  Created: ${driver.createdAt}`);
      });
    } else {
      console.log('  No drivers found in database');
    }
    
    // Summary
    console.log('\n📋 SUMMARY:');
    console.log('='.repeat(20));
    console.log(`Total users in MongoDB: ${customers.length + drivers.length}`);
    console.log(`- Customers: ${customers.length}`);
    console.log(`- Drivers: ${drivers.length}`);
    
    if (customers.length > 0 || drivers.length > 0) {
      console.log('\n✅ SUCCESS: Signup data IS being stored in MongoDB!');
    } else {
      console.log('\n⚠️  No signup data found in MongoDB yet.');
      console.log('   This could mean:');
      console.log('   1. No users have signed up yet');
      console.log('   2. API connection issues are causing fallback to localStorage');
      console.log('   3. There might be an issue with the signup process');
    }
    
  } catch (error) {
    console.error('❌ Error checking stored data:', error.message);
  } finally {
    await client.close();
  }
}

checkStoredData();