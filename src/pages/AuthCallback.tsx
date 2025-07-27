import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import { useUser } from '@/contexts/UserContext'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function AuthCallback() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { setUser } = useUser()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Verifying your email...')

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the current session after email confirmation
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Session error:', sessionError)
          setStatus('error')
          setMessage('Failed to verify email. Please try again.')
          toast({
            title: 'Verification Failed',
            description: sessionError.message,
            variant: 'destructive',
          })
          setTimeout(() => navigate('/login'), 3000)
          return
        }

        if (sessionData.session && sessionData.session.user) {
          const user = sessionData.session.user
          console.log('User verified:', user)

          // Check if email is confirmed
          if (user.email_confirmed_at) {
            setStatus('success')
            setMessage('Email verified successfully! Redirecting...')
            
            // Create user object for context
            const userData = {
              id: user.id,
              email: user.email!,
              name: user.user_metadata?.full_name || 'User',
              role: user.user_metadata?.role || 'customer',
              phone: user.user_metadata?.phone || '',
              avatar: user.user_metadata?.avatar_url || ''
            }

            // Set user in context
            setUser(userData)
            
            // Store user type in localStorage
            localStorage.setItem('userType', userData.role)
            
            toast({
              title: 'Email Verified! ✅',
              description: 'Your account has been successfully verified. Welcome to NeoRide!',
            })
            
            // Redirect based on user role
            setTimeout(() => {
              if (userData.role === 'admin') {
                navigate('/admin')
              } else if (userData.role === 'driver') {
                navigate('/driver')
              } else {
                navigate('/customer')
              }
            }, 2000)
          } else {
            setStatus('error')
            setMessage('Email verification is still pending.')
            toast({
              title: 'Verification Pending',
              description: 'Your email is not yet verified. Please check your email and click the confirmation link.',
              variant: 'destructive',
            })
            setTimeout(() => navigate('/login'), 3000)
          }
        } else {
          setStatus('error')
          setMessage('No active session found.')
          toast({
            title: 'Session Error',
            description: 'No active session found. Please try logging in again.',
            variant: 'destructive',
          })
          setTimeout(() => navigate('/login'), 3000)
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        setStatus('error')
        setMessage('An unexpected error occurred during verification.')
        toast({
          title: 'Verification Error',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        })
        setTimeout(() => navigate('/login'), 3000)
      }
    }

    // Handle the auth callback
    handleAuthCallback()

    // Also listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session)
      
      if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
        handleAuthCallback()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate, toast, setUser])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            {status === 'loading' && (
              <div className="w-16 h-16 mx-auto mb-4 text-blue-500">
                <Loader2 className="w-16 h-16 animate-spin" />
              </div>
            )}
            {status === 'success' && (
              <div className="w-16 h-16 mx-auto mb-4 text-green-500">
                <CheckCircle className="w-16 h-16" />
              </div>
            )}
            {status === 'error' && (
              <div className="w-16 h-16 mx-auto mb-4 text-red-500">
                <XCircle className="w-16 h-16" />
              </div>
            )}
          </div>
          
          <h1 className="text-2xl font-bold mb-2 text-gray-900">
            {status === 'loading' && 'Verifying Email'}
            {status === 'success' && 'Email Verified!'}
            {status === 'error' && 'Verification Failed'}
          </h1>
          
          <p className="text-gray-600 mb-4">
            {message}
          </p>
          
          {status === 'loading' && (
            <div className="text-sm text-gray-500">
              Please wait while we verify your email address...
            </div>
          )}
          
          {status === 'success' && (
            <div className="text-sm text-green-600">
              You will be redirected to your dashboard shortly.
            </div>
          )}
          
          {status === 'error' && (
            <div className="text-sm text-red-600">
              You will be redirected to the login page shortly.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}