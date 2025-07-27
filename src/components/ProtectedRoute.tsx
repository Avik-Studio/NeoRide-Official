import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    )
  }

  // Check for stored user types (for hardcoded logins)
  const storedUserType = localStorage.getItem('userType')
  const isLoggedIn = storedUserType === 'admin' || storedUserType === 'driver' || storedUserType === 'customer'

  if (!user && !isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}