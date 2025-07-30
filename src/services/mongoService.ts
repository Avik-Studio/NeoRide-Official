import { mongoAPI, localStorageService } from '../api/mongodb';

// Customer Service Functions
export class CustomerService {
  static async createCustomer(customerData: {
    supabaseId: string;
    email: string;
    fullName: string;
    phone: string;
  }): Promise<any> {
    try {
      // Try to use MongoDB API first
      try {
        const result = await mongoAPI.createCustomer(customerData);
        console.log('✅ Customer saved to MongoDB via API:', result._id);
        return result;
      } catch (apiError) {
        console.warn('⚠️ MongoDB API not available, using localStorage fallback');
        // Fallback to localStorage
        const result = await localStorageService.createCustomer(customerData);
        return result;
      }
    } catch (error) {
      console.error('❌ Error creating customer:', error);
      throw error;
    }
  }

  static async getCustomerBySupabaseId(supabaseId: string): Promise<any | null> {
    try {
      try {
        return await mongoAPI.getCustomer(supabaseId);
      } catch (apiError) {
        return await localStorageService.getCustomer(supabaseId);
      }
    } catch (error) {
      console.error('❌ Error fetching customer:', error);
      throw error;
    }
  }

  static async getCustomerByEmail(email: string): Promise<any | null> {
    try {
      // For now, we'll use the supabaseId method as primary lookup
      // In a full implementation, you'd add email lookup to the API
      console.warn('Email lookup not implemented in current API, use getCustomerBySupabaseId instead');
      return null;
    } catch (error) {
      console.error('❌ Error fetching customer by email:', error);
      throw error;
    }
  }

  static async updateCustomer(supabaseId: string, updateData: any): Promise<any | null> {
    try {
      try {
        return await mongoAPI.updateCustomer(supabaseId, updateData);
      } catch (apiError) {
        console.warn('⚠️ Update via API failed, feature not available in localStorage fallback');
        return null;
      }
    } catch (error) {
      console.error('❌ Error updating customer:', error);
      throw error;
    }
  }

  static async deleteCustomer(supabaseId: string): Promise<boolean> {
    try {
      try {
        await mongoAPI.deleteCustomer(supabaseId);
        return true;
      } catch (apiError) {
        console.warn('⚠️ Delete via API failed, feature not available in localStorage fallback');
        return false;
      }
    } catch (error) {
      console.error('❌ Error deleting customer:', error);
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
  }): Promise<any> {
    try {
      // Try to use MongoDB API first
      try {
        const result = await mongoAPI.createDriver(driverData);
        console.log('✅ Driver saved to MongoDB via API:', result._id);
        return result;
      } catch (apiError) {
        console.warn('⚠️ MongoDB API not available, using localStorage fallback');
        // Fallback to localStorage
        const result = await localStorageService.createDriver(driverData);
        return result;
      }
    } catch (error) {
      console.error('❌ Error creating driver:', error);
      throw error;
    }
  }

  static async getDriverBySupabaseId(supabaseId: string): Promise<any | null> {
    try {
      try {
        return await mongoAPI.getDriver(supabaseId);
      } catch (apiError) {
        return await localStorageService.getDriver(supabaseId);
      }
    } catch (error) {
      console.error('❌ Error fetching driver:', error);
      throw error;
    }
  }

  static async getDriverByEmail(email: string): Promise<any | null> {
    try {
      console.warn('Email lookup not implemented in current API, use getDriverBySupabaseId instead');
      return null;
    } catch (error) {
      console.error('❌ Error fetching driver by email:', error);
      throw error;
    }
  }

  static async updateDriver(supabaseId: string, updateData: any): Promise<any | null> {
    try {
      try {
        return await mongoAPI.updateDriver(supabaseId, updateData);
      } catch (apiError) {
        console.warn('⚠️ Update via API failed, feature not available in localStorage fallback');
        return null;
      }
    } catch (error) {
      console.error('❌ Error updating driver:', error);
      throw error;
    }
  }

  static async deleteDriver(supabaseId: string): Promise<boolean> {
    try {
      try {
        await mongoAPI.deleteDriver(supabaseId);
        return true;
      } catch (apiError) {
        console.warn('⚠️ Delete via API failed, feature not available in localStorage fallback');
        return false;
      }
    } catch (error) {
      console.error('❌ Error deleting driver:', error);
      throw error;
    }
  }

  static async getAvailableDrivers(coordinates: [number, number], maxDistance: number = 5000): Promise<any[]> {
    try {
      console.warn('⚠️ getAvailableDrivers not implemented in current API');
      return [];
    } catch (error) {
      console.error('❌ Error fetching available drivers:', error);
      throw error;
    }
  }

  static async approveDriver(supabaseId: string): Promise<any | null> {
    try {
      return await this.updateDriver(supabaseId, { status: 'approved' });
    } catch (error) {
      console.error('❌ Error approving driver:', error);
      throw error;
    }
  }

  static async suspendDriver(supabaseId: string): Promise<any | null> {
    try {
      return await this.updateDriver(supabaseId, { 
        status: 'suspended', 
        isAvailable: false, 
        isOnline: false 
      });
    } catch (error) {
      console.error('❌ Error suspending driver:', error);
      throw error;
    }
  }
}

// General utility functions
export class MongoService {
  static async testConnection(): Promise<boolean> {
    try {
      const result = await mongoAPI.testConnection();
      if (result.connected !== false) {
        console.log('✅ MongoDB API connection test successful');
        return true;
      } else {
        console.log('⚠️ MongoDB API not available, using localStorage fallback');
        return false;
      }
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
      try {
        return await mongoAPI.getStats();
      } catch (apiError) {
        console.warn('⚠️ Stats API not available, returning default values');
        return {
          totalCustomers: 0,
          totalDrivers: 0,
          approvedDrivers: 0,
          pendingDrivers: 0
        };
      }
    } catch (error) {
      console.error('❌ Error fetching stats:', error);
      throw error;
    }
  }
}