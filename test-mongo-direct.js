// Test MongoDB connection directly
import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://avikmodak83:Avik%402005@cluster0.vvhbnvm.mongodb.net/NeoRide?retryWrites=true&w=majority&appName=Cluster0';

async function testDirectConnection() {
  console.log('🔍 Testing direct MongoDB connection...\n');
  
  const client = new MongoClient(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected successfully!');
    
    console.log('Testing database access...');
    const db = client.db('NeoRide');
    const collections = await db.listCollections().toArray();
    console.log('✅ Database accessible!');
    console.log('Collections:', collections.map(c => c.name));
    
    // Test creating a document
    console.log('\nTesting document creation...');
    const testCollection = db.collection('test');
    const result = await testCollection.insertOne({
      test: true,
      timestamp: new Date(),
      message: 'Connection test successful'
    });
    console.log('✅ Document created:', result.insertedId);
    
    // Clean up test document
    await testCollection.deleteOne({ _id: result.insertedId });
    console.log('✅ Test document cleaned up');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Error details:', error);
  } finally {
    await client.close();
    console.log('Connection closed.');
  }
}

testDirectConnection();