import mongoose from 'mongoose';

const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 'mongodb://localhost:27017/NeoRide';

if (!MONGODB_URI) {
  throw new Error('❌ Please define the MONGODB_URI environment variable');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Safe cache access on globalThis
declare global {
  var _mongoose: MongooseCache | undefined;
}

const globalForMongoose = globalThis as typeof globalThis & {
  _mongoose?: MongooseCache;
};

let cached = globalForMongoose._mongoose;

if (!cached) {
  cached = globalForMongoose._mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ Connected to MongoDB');
      return mongoose;
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
