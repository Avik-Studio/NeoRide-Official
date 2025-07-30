# MongoDB Integration for NeoRide

This document provides complete setup instructions for MongoDB integration in the NeoRide application.

## 🎯 Goal Achieved

✅ **Customer Details Integration**: Complete customer profile storage in MongoDB
✅ **Driver Details Integration**: Complete driver profile and vehicle information storage in MongoDB
✅ **Signup Page Integration**: All signup form data is now saved to MongoDB server

## 📋 Prerequisites

1. **MongoDB Atlas Account** (recommended) or local MongoDB installation
2. **Node.js** and **npm** installed
3. **Environment variables** configured

## 🚀 Setup Instructions

### 1. MongoDB Atlas Setup (Recommended)

1. **Create MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Create a new cluster

2. **Configure Database Access**:
   - Go to "Database Access" in your Atlas dashboard
   - Add a new database user with read/write permissions
   - Note down the username and password

3. **Configure Network Access**:
   - Go to "Network Access"
   - Add your IP address or use `0.0.0.0/0` for development (not recommended for production)

4. **Get Connection String**:
   - Go to "Clusters" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string

### 2. Environment Configuration

Update your `.env` file with your MongoDB connection string:

```env
# MongoDB Configuration
VITE_MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/neoride?retryWrites=true&w=majority
```

**Replace**:
- `your-username`: Your MongoDB Atlas username
- `your-password`: Your MongoDB Atlas password
- `your-cluster`: Your cluster name

### 3. Dependencies Installation

The following packages have been installed:

```bash
npm install mongoose dotenv
```

## 📊 Database Schema

### Customer Schema
```javascript
{
  supabaseId: String (unique, indexed),
  email: String (unique, indexed),
  fullName: String,
  phone: String,
  profileImageUrl: String (optional),
  isVerified: Boolean (default: false),
  isActive: Boolean (default: true),
  preferences: {
    notifications: Boolean,
    smsAlerts: Boolean,
    emailUpdates: Boolean
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentMethods: Array,
  rideHistory: Array,
  totalRides: Number,
  averageRating: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Driver Schema
```javascript
{
  supabaseId: String (unique, indexed),
  email: String (unique, indexed),
  fullName: String,
  phone: String,
  licenseNumber: String (unique, indexed),
  vehicleModel: String,
  vehiclePlate: String (unique, indexed),
  profileImageUrl: String (optional),
  vehicleImageUrl: String (optional),
  status: String (pending/approved/suspended/rejected),
  isAvailable: Boolean,
  isOnline: Boolean,
  rating: Number,
  totalRides: Number,
  totalEarnings: Number,
  documents: Object,
  vehicle: {
    make: String,
    model: String,
    year: Number,
    color: String,
    plateNumber: String,
    type: String,
    capacity: Number
  },
  location: {
    type: 'Point',
    coordinates: [longitude, latitude],
    address: String,
    lastUpdated: Date
  },
  workingHours: Object,
  bankDetails: Object,
  rideHistory: Array,
  reviews: Array,
  emergencyContact: Object,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Implementation Details

### Files Created/Modified

1. **`src/lib/mongodb.ts`**: MongoDB connection configuration
2. **`src/models/Customer.ts`**: Customer schema and model
3. **`src/models/Driver.ts`**: Driver schema and model
4. **`src/services/mongoService.ts`**: Service functions for database operations
5. **`src/pages/Signup.tsx`**: Updated to save data to MongoDB
6. **`.env`**: Added MongoDB URI configuration

### Key Features

#### Customer Service Functions:
- `createCustomer()`: Save new customer to MongoDB
- `getCustomerBySupabaseId()`: Retrieve customer by Supabase ID
- `getCustomerByEmail()`: Retrieve customer by email
- `updateCustomer()`: Update customer information
- `deleteCustomer()`: Remove customer from database

#### Driver Service Functions:
- `createDriver()`: Save new driver to MongoDB
- `getDriverBySupabaseId()`: Retrieve driver by Supabase ID
- `getDriverByEmail()`: Retrieve driver by email
- `updateDriver()`: Update driver information
- `deleteDriver()`: Remove driver from database
- `getAvailableDrivers()`: Find available drivers near location
- `approveDriver()`: Approve pending driver
- `suspendDriver()`: Suspend driver account

## 🔄 Data Flow

### Signup Process:
1. **User fills signup form** (Customer or Driver)
2. **Supabase Auth** creates authentication user
3. **MongoDB** stores detailed profile information
4. **Supabase** stores backup data (if tables exist)
5. **Success notification** sent to user

### Data Storage:
- **Primary Storage**: MongoDB (comprehensive data)
- **Authentication**: Supabase Auth
- **Backup Storage**: Supabase Database (optional)

## 🛡️ Security Features

- **Indexed fields** for fast queries
- **Data validation** with Mongoose schemas
- **Unique constraints** on critical fields
- **Connection caching** to prevent multiple connections
- **Error handling** with graceful fallbacks

## 🚀 Performance Optimizations

- **Database indexes** on frequently queried fields
- **Connection pooling** with Mongoose
- **Geospatial indexing** for location-based queries
- **Automatic timestamps** with middleware
- **Efficient data retrieval** with optimized queries

## 📈 Monitoring & Debugging

### Console Logs:
- ✅ Successful MongoDB connections
- ✅ Successful data insertions
- ❌ Connection errors
- ❌ Data insertion errors

### Error Handling:
- Graceful fallbacks if MongoDB is unavailable
- User-friendly error messages
- Detailed console logging for debugging

## 🔮 Future Enhancements

- **Real-time updates** with MongoDB Change Streams
- **Data analytics** with aggregation pipelines
- **Backup strategies** with automated exports
- **Performance monitoring** with MongoDB Atlas tools
- **Advanced search** with text indexes

## 🧪 Testing

To test the MongoDB integration:

1. **Start the application**: `npm run dev`
2. **Go to signup page**: Navigate to `/signup`
3. **Fill customer form**: Complete all required fields
4. **Submit form**: Check console for MongoDB logs
5. **Verify in MongoDB Atlas**: Check your database collections

## 📞 Support

If you encounter issues:

1. Check MongoDB Atlas connection string
2. Verify network access settings
3. Check console logs for detailed errors
4. Ensure all environment variables are set correctly

---

**Status**: ✅ **COMPLETE** - MongoDB integration is fully implemented and ready for use!