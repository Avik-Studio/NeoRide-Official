import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export type UserRole = 'customer' | 'driver' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  useEffect(() => {
    // Check if Supabase is properly configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey && 
        supabaseUrl !== 'https://placeholder.supabase.co' && 
        supabaseKey !== 'placeholder-anon-key') {
      setIsSupabaseConnected(true);
    }

    // Check for existing session
    if (isSupabaseConnected) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          fetchUserProfile(session.user);
        }
        setLoading(false);
      });

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      // Check for local storage user in development mode
      const localUser = localStorage.getItem('neoride_user');
      if (localUser) {
        try {
          setUser(JSON.parse(localUser));
        } catch (error) {
          console.error('Error parsing local user:', error);
        }
      }
      setLoading(false);
    }
  }, [isSupabaseConnected]);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error) throw error;

      if (data) {
        setUser({
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Check for admin login
      if (email === 'admin@neoride.com' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin-1',
          email,
          name: 'Admin',
          role: 'admin'
        };
        setUser(adminUser);
        localStorage.setItem('neoride_user', JSON.stringify(adminUser));
        return true;
      }

      if (isSupabaseConnected) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;
        return true;
      } else {
        // Development mode - simulate login
        if (password.length >= 6) {
          const mockUser: User = {
            id: `user-${Date.now()}`,
            email,
            name: email.split('@')[0],
            role: 'customer'
          };
          setUser(mockUser);
          localStorage.setItem('neoride_user', JSON.stringify(mockUser));
          return true;
        } else {
          throw new Error('Password must be at least 6 characters');
        }
      }

    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    try {
      setLoading(true);

      if (isSupabaseConnected) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        });

        if (error) throw error;

        if (data.user) {
          // Create user profile
          const { error: profileError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email,
              name,
              role
            });

          if (profileError) throw profileError;
        }
      } else {
        // Development mode - simulate signup
        if (password.length >= 6) {
          const newUser: User = {
            id: `user-${Date.now()}`,
            email,
            name,
            role
          };
          setUser(newUser);
          localStorage.setItem('neoride_user', JSON.stringify(newUser));
        } else {
          throw new Error('Password must be at least 6 characters');
        }
      }

      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (isSupabaseConnected) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('neoride_user');
    }
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};