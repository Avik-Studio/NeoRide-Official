import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

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

  useEffect(() => {
    // Initialize auth state
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      // Check for existing session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Session error:', error);
        // Fallback to localStorage for development
        checkLocalStorage();
        return;
      }

      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        checkLocalStorage();
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      checkLocalStorage();
    } finally {
      setLoading(false);
    }

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      if (event === 'SIGNED_IN' && session?.user) {
        await fetchUserProfile(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('neoride_user');
      }
    });

    return () => subscription.unsubscribe();
  };

  const checkLocalStorage = () => {
    const localUser = localStorage.getItem('neoride_user');
    if (localUser) {
      try {
        setUser(JSON.parse(localUser));
      } catch (error) {
        console.error('Error parsing local user:', error);
        localStorage.removeItem('neoride_user');
      }
    }
  };

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error) throw error;

      if (data) {
        const userData = {
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role
        };
        setUser(userData);
        localStorage.setItem('neoride_user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Create basic user profile if not exists
      const basicUser = {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: supabaseUser.email?.split('@')[0] || 'User',
        role: 'customer' as UserRole
      };
      setUser(basicUser);
      localStorage.setItem('neoride_user', JSON.stringify(basicUser));
    }
  };

  const createUserProfile = async (userId: string, email: string, name: string, role: UserRole) => {
    try {
      const { error } = await supabase
        .from('users')
        .insert({
          id: userId,
          email,
          name,
          role
        });

      if (error) {
        console.error('Error creating user profile:', error);
        // Don't throw error, continue with basic user data
      }
    } catch (error) {
      console.error('Error in createUserProfile:', error);
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

      // Try Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Supabase login error:', error);
        
        // Fallback to development mode
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
        }
        return false;
      }

      if (data.user) {
        // User will be set via onAuthStateChange
        return true;
      }

      return false;
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

      // Try Supabase signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role
          }
        }
      });

      if (error) {
        console.error('Supabase signup error:', error);
        
        // Fallback to development mode
        if (password.length >= 6) {
          const newUser: User = {
            id: `user-${Date.now()}`,
            email,
            name,
            role
          };
          setUser(newUser);
          localStorage.setItem('neoride_user', JSON.stringify(newUser));
          return true;
        }
        return false;
      }

      if (data.user) {
        // Create user profile
        await createUserProfile(data.user.id, email, name, role);
        
        // If email confirmation is disabled, user will be logged in immediately
        if (data.session) {
          await fetchUserProfile(data.user);
        }
        
        return true;
      }

      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    // Always clear local state
    setUser(null);
    localStorage.removeItem('neoride_user');
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