// MongoDB API Client for Frontend
// This handles communication with a backend API that manages MongoDB operations

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

interface CustomerData {
  supabaseId: string;
  email: string;
  fullName: string;
  phone: string;
}

interface DriverData {
  supabaseId: string;
  email: string;
  fullName: string;
  phone: string;
  licenseNumber: string;
  vehicleModel: string;
  vehiclePlate: string;
}

class MongoDBAPI {
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Customer operations
  async createCustomer(customerData: CustomerData) {
    return this.makeRequest('/customers', {
      method: 'POST',
      body: JSON.stringify(customerData),
    });
  }

  async getCustomer(supabaseId: string) {
    return this.makeRequest(`/customers/${supabaseId}`);
  }

  async updateCustomer(supabaseId: string, updateData: Partial<CustomerData>) {
    return this.makeRequest(`/customers/${supabaseId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async deleteCustomer(supabaseId: string) {
    return this.makeRequest(`/customers/${supabaseId}`, {
      method: 'DELETE',
    });
  }

  // Driver operations
  async createDriver(driverData: DriverData) {
    return this.makeRequest('/drivers', {
      method: 'POST',
      body: JSON.stringify(driverData),
    });
  }

  async getDriver(supabaseId: string) {
    return this.makeRequest(`/drivers/${supabaseId}`);
  }

  async updateDriver(supabaseId: string, updateData: Partial<DriverData>) {
    return this.makeRequest(`/drivers/${supabaseId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async deleteDriver(supabaseId: string) {
    return this.makeRequest(`/drivers/${supabaseId}`, {
      method: 'DELETE',
    });
  }

  // Utility operations
  async testConnection() {
    try {
      return await this.makeRequest('/health');
    } catch (error) {
      return { connected: false, error: error.message };
    }
  }

  async getStats() {
    return this.makeRequest('/stats');
  }
}

export const mongoAPI = new MongoDBAPI();

// Fallback service that stores data locally if API is not available
class LocalStorageService {
  private getStorageKey(type: 'customers' | 'drivers') {
    return `neoride_${type}`;
  }

  private getData(type: 'customers' | 'drivers') {
    const data = localStorage.getItem(this.getStorageKey(type));
    return data ? JSON.parse(data) : [];
  }

  private saveData(type: 'customers' | 'drivers', data: any[]) {
    localStorage.setItem(this.getStorageKey(type), JSON.stringify(data));
  }

  async createCustomer(customerData: CustomerData) {
    const customers = this.getData('customers');
    const newCustomer = {
      ...customerData,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    customers.push(newCustomer);
    this.saveData('customers', customers);
    console.log('✅ Customer saved to localStorage:', newCustomer._id);
    return newCustomer;
  }

  async createDriver(driverData: DriverData) {
    const drivers = this.getData('drivers');
    const newDriver = {
      ...driverData,
      _id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    drivers.push(newDriver);
    this.saveData('drivers', drivers);
    console.log('✅ Driver saved to localStorage:', newDriver._id);
    return newDriver;
  }

  async getCustomer(supabaseId: string) {
    const customers = this.getData('customers');
    return customers.find((c: any) => c.supabaseId === supabaseId) || null;
  }

  async getDriver(supabaseId: string) {
    const drivers = this.getData('drivers');
    return drivers.find((d: any) => d.supabaseId === supabaseId) || null;
  }
}

export const localStorageService = new LocalStorageService();