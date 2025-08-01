import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Only throw error in production or when actually using Supabase features
const isPlaceholder = supabaseUrl === 'https://placeholder.supabase.co';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'customer' | 'driver' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role: 'customer' | 'driver' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: 'customer' | 'driver' | 'admin';
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          user_id: string;
          package_id: string;
          booking_type: 'package' | 'ride';
          destination: string;
          date: string;
          amount: number;
          tier: string;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          payment_screenshot?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          package_id: string;
          booking_type: 'package' | 'ride';
          destination: string;
          date: string;
          amount: number;
          tier: string;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          payment_screenshot?: string;
          created_at?: string;
        };
        Update: {
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          payment_screenshot?: string;
        };
      };
      rides: {
        Row: {
          id: string;
          user_id: string;
          driver_id?: string;
          pickup_location: string;
          destination: string;
          distance: number;
          estimated_fare: number;
          actual_fare?: number;
          status: 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          driver_id?: string;
          pickup_location: string;
          destination: string;
          distance: number;
          estimated_fare: number;
          actual_fare?: number;
          status?: 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
          created_at?: string;
        };
        Update: {
          driver_id?: string;
          actual_fare?: number;
          status?: 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
        };
      };
    };
  };
};