import connectDB from '../lib/mongodb';
import Customer, { ICustomer } from '../models/Customer';
import Driver, { IDriver } from '../models/Driver';

// Customer Service Functions
export class CustomerService {
  static async createCustomer(customerData: {
    supabaseId: string;
    email: string;
    fullName: string;
    phone: string;
  }): Promise<ICustomer> {
    try {
      await connectDB();
      
      const customer = new Customer({
        supabaseId: customerData.supabaseId,
        email: customerData.email.toLowerCase(),
        fullName: customerData.fullName,
        phone: customerData.phone,
        isVerified: false,
        isActive: true,
        preferences: {
          notifications: true,
          smsAlerts: true,
          emailUpdates: true
        },
        paymentMethods: [{
          type: 'cash',
          isDefault: true
        }],
        totalRides: 0,
        averageRating: 0
      });

      const savedCustomer = await customer.save();
      console.log('✅ Customer saved to MongoDB:', savedCustomer._id);
      return savedCustomer;
    } catch (error) {
      console.error('❌ Error creating customer in MongoDB:', error);
      throw error;
    }
  }

  static async getCustomerBySupabaseId(supabaseId: string): Promise<ICustomer | null> {
    try {
      await connectDB();
      return await Customer.findBySupabaseId(supabaseId);
    } catch (error) {
      console.error('❌ Error fetching customer from MongoDB:', error);
      throw error;
    }
  }

  static async getCustomerByEmail(email: string): Promise<ICustomer | null> {
    try {
      await connectDB();
      return await Customer.findByEmail(email);
    } catch (error) {
      console.error('❌ Error fetching customer by email from MongoDB:', error);
      throw error;
    }
  }

  static async updateCustomer(supabaseId: string, updateData: Partial<ICustomer>): Promise<ICustomer | null> {
    try {
      await connectDB();
      return await Customer.findOneAndUpdate(
        { supabaseId },
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
    } catch (error) {
      console.error('❌ Error updating customer in MongoDB:', error);
      throw error;
    }
  }

  static async deleteCustomer(supabaseId: string): Promise<boolean> {
    try {
      await connectDB();
      const result = await Customer.findOneAndDelete({ supabaseId });
      return !!result;
    } catch (error) {
      console.error('❌ Error deleting customer from MongoDB:', error);
      throw error;
    }
  }
}

// Driver Service Functions
export class DriverService {
  static async createDriver(driverData: {
    supabaseId: string;
    email: string;
    fullName: string;
    phone: string;
    licenseNumber: string;
    vehicleModel: string;
    vehiclePlate: string;
  }): Promise<IDriver> {
    try {
      await connectDB();
      
      // Parse vehicle model to extract make and model
      const vehicleParts = driverData.vehicleModel.split(' ');
      const make = vehicleParts[0] || 'Unknown';
      const model = vehicleParts.slice(1).join(' ') || 'Unknown';

      const driver = new Driver({
        supabaseId: driverData.supabaseId,
        email: driverData.email.toLowerCase(),
        fullName: driverData.fullName,
        phone: driverData.phone,
        licenseNumber: driverData.licenseNumber,
        vehicleModel: driverData.vehicleModel,
        vehiclePlate: driverData.vehiclePlate.toUpperCase(),
        status: 'pending',
        isAvailable: false,
        isOnline: false,
        rating: 0,
        totalRides: 0,
        totalEarnings: 0,
        vehicle: {
          make: make,
          model: model,
          year: new Date().getFullYear(), // Default to current year
          color: 'Unknown',
          plateNumber: driverData.vehiclePlate.toUpperCase(),
          type: 'sedan',
          capacity: 4
        },
        location: {
          type: 'Point',
          coordinates: [0, 0], // Default coordinates
          lastUpdated: new Date()
        }
      });

      const savedDriver = await driver.save();
      console.log('✅ Driver saved to MongoDB:', savedDriver._id);
      return savedDriver;
    } catch (error) {
      console.error('❌ Error creating driver in MongoDB:', error);
      throw error;
    }
  }

  static async getDriverBySupabaseId(supabaseId: string): Promise<IDriver | null> {
    try {
      await connectDB();
      return await Driver.findBySupabaseId(supabaseId);
    } catch (error) {
      console.error('❌ Error fetching driver from MongoDB:', error);
      throw error;
    }
  }

  static async getDriverByEmail(email: string): Promise<IDriver | null> {
    try {
      await connectDB();
      return await Driver.findByEmail(email);
    } catch (error) {
      console.error('❌ Error fetching driver by email from MongoDB:', error);
      throw error;
    }
  }

  static async updateDriver(supabaseId: string, updateData: Partial<IDriver>): Promise<IDriver | null> {
    try {
      await connectDB();
      return await Driver.findOneAndUpdate(
        { supabaseId },
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
    } catch (error) {
      console.error('❌ Error updating driver in MongoDB:', error);
      throw error;
    }
  }

  static async deleteDriver(supabaseId: string): Promise<boolean> {
    try {
      await connectDB();
      const result = await Driver.findOneAndDelete({ supabaseId });
      return !!result;
    } catch (error) {
      console.error('❌ Error deleting driver from MongoDB:', error);
      throw error;
    }
  }

  static async getAvailableDrivers(coordinates: [number, number], maxDistance: number = 5000): Promise<IDriver[]> {
    try {
      await connectDB();
      return await Driver.findAvailableDrivers(coordinates, maxDistance);
    } catch (error) {
      console.error('❌ Error fetching available drivers from MongoDB:', error);
      throw error;
    }
  }

  static async approveDriver(supabaseId: string): Promise<IDriver | null> {
    try {
      await connectDB();
      return await Driver.findOneAndUpdate(
        { supabaseId },
        { status: 'approved', updatedAt: new Date() },
        { new: true }
      );
    } catch (error) {
      console.error('❌ Error approving driver in MongoDB:', error);
      throw error;
    }
  }

  static async suspendDriver(supabaseId: string): Promise<IDriver | null> {
    try {
      await connectDB();
      return await Driver.findOneAndUpdate(
        { supabaseId },
        { 
          status: 'suspended', 
          isAvailable: false, 
          isOnline: false,
          updatedAt: new Date() 
        },
        { new: true }
      );
    } catch (error) {
      console.error('❌ Error suspending driver in MongoDB:', error);
      throw error;
    }
  }
}

// General utility functions
export class MongoService {
  static async testConnection(): Promise<boolean> {
    try {
      await connectDB();
      console.log('✅ MongoDB connection test successful');
      return true;
    } catch (error) {
      console.error('❌ MongoDB connection test failed:', error);
      return false;
    }
  }

  static async getStats(): Promise<{
    totalCustomers: number;
    totalDrivers: number;
    approvedDrivers: number;
    pendingDrivers: number;
  }> {
    try {
      await connectDB();
      
      const [totalCustomers, totalDrivers, approvedDrivers, pendingDrivers] = await Promise.all([
        Customer.countDocuments(),
        Driver.countDocuments(),
        Driver.countDocuments({ status: 'approved' }),
        Driver.countDocuments({ status: 'pending' })
      ]);

      return {
        totalCustomers,
        totalDrivers,
        approvedDrivers,
        pendingDrivers
      };
    } catch (error) {
      console.error('❌ Error fetching MongoDB stats:', error);
      throw error;
    }
  }
}