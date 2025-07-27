import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

export interface User {
  id: string
  name: string
  email: string
  role: 'customer' | 'driver' | 'admin'
  avatar?: string
  isOnline?: boolean
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  updateUserRole: (role: 'customer' | 'driver' | 'admin') => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const { user: authUser } = useAuth()
  const [user, setUser] = useState<User | null>(null)

  // Update user data when auth user changes
  useEffect(() => {
    if (authUser) {
      const displayName = authUser.user_metadata?.full_name || 
                          authUser.user_metadata?.name || 
                          authUser.email?.split('@')[0] || 
                          'User'
      
      // Get user type from localStorage (set during login or signup)
      const storedUserType = localStorage.getItem('userType') || 
                             localStorage.getItem('pendingUserType') || 
                             authUser.user_metadata?.role || 
                             'customer'
      
      // Clear pending user type once we've used it
      if (localStorage.getItem('pendingUserType')) {
        localStorage.setItem('userType', storedUserType)
        localStorage.removeItem('pendingUserType')
      }
      
      setUser({
        id: authUser.id,
        name: displayName,
        email: authUser.email || '',
        role: storedUserType as 'customer' | 'driver' | 'admin',
        avatar: authUser.user_metadata?.avatar_url || '',
        isOnline: false,
      })
    } else {
      // Check if user is logged in via localStorage (for hardcoded logins)
      const storedUserType = localStorage.getItem('userType')
      if (storedUserType === 'admin') {
        setUser({
          id: 'admin-1',
          name: 'Administrator',
          email: 'admin@neoride.com',
          role: 'admin',
          avatar: '',
          isOnline: true,
        })
      } else if (storedUserType === 'driver') {
        setUser({
          id: 'driver-1',
          name: 'Test Driver',
          email: 'driver@neoride.com',
          role: 'driver',
          avatar: '',
          isOnline: false,
        })
      } else if (storedUserType === 'customer') {
        setUser({
          id: 'customer-1',
          name: 'Test Customer',
          email: 'customer@neoride.com',
          role: 'customer',
          avatar: '',
          isOnline: false,
        })
      } else {
        setUser(null)
        // Clear stored user type on logout
        localStorage.removeItem('userType')
      }
    }
  }, [authUser])

  const updateUserRole = (role: 'customer' | 'driver' | 'admin') => {
    if (user) {
      setUser({ 
        ...user, 
        role,
        isOnline: role === 'driver' ? false : undefined 
      })
      // Update localStorage as well
      localStorage.setItem('userType', role)
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, updateUserRole }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}