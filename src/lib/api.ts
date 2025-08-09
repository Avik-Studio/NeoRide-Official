import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('neoride_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove('neoride_token');
      Cookies.remove('neoride_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  googleAuth: (credential: string) => api.post('/auth/google', { credential }),
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// Rides API
export const ridesAPI = {
  bookRide: (rideData: any) => api.post('/rides/book', rideData),
  getMyRides: (params?: any) => api.get('/rides/my-rides', { params }),
  findDrivers: (data: any) => api.post('/rides/find-drivers', data),
  cancelRide: (rideId: string) => api.patch(`/rides/${rideId}/cancel`),
  rateRide: (rideId: string, data: any) => api.patch(`/rides/${rideId}/rate`, data),
};

// Packages API
export const packagesAPI = {
  getPackages: (params?: any) => api.get('/packages', { params }),
  getPackage: (id: string) => api.get(`/packages/${id}`),
  createPackage: (data: any) => api.post('/packages', data),
};

// Users API
export const usersAPI = {
  updateProfile: (data: any) => api.patch('/users/profile', data),
  getStats: () => api.get('/users/stats'),
};

export default api;