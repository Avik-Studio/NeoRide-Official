import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Car, 
  MapPin, 
  Clock, 
  Star, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  ArrowRight,
  Calendar,
  Shield,
  Zap,
  Globe,
  Award,
  BarChart3
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import { UserProvider, useUser } from '@/contexts/UserContext'

function HomeContent() {
  const { user: authUser } = useAuth()
  const { user: neoRideUser, updateUserRole } = useUser()
  const { toast } = useToast()
  const navigate = useNavigate()

  // Redirect admin users to admin panel
  useEffect(() => {
    if (neoRideUser?.role === 'admin') {
      navigate('/admin')
    } else if (neoRideUser?.role === 'driver') {
      navigate('/driver')
    } else if (neoRideUser?.role === 'customer') {
      navigate('/customer')
    }
  }, [neoRideUser?.role, navigate])

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Success',
          description: 'You have been logged out',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    }
  }

  // Role-specific content
  const getRoleContent = () => {
    switch (neoRideUser?.role) {
      case 'customer':
        return {
          hero: {
            title: "Your Next Ride Awaits",
            subtitle: "Book premium rides with professional drivers in seconds",
            stats: [
              { label: "Total Rides", value: "24", icon: Car },
              { label: "Saved Routes", value: "8", icon: MapPin },
              { label: "Rating", value: "4.9", icon: Star },
              { label: "This Month", value: "$156", icon: DollarSign }
            ]
          },
          quickActions: [
            { title: "Book a Ride", description: "Find and book your next ride", icon: Car, color: "bg-blue-500", href: "/book" },
            { title: "Track Ride", description: "Monitor your current journey", icon: MapPin, color: "bg-green-500", href: "/track" },
            { title: "Ride History", description: "View your past trips", icon: Clock, color: "bg-purple-500", href: "/rides" },
            { title: "Wallet", description: "Manage payments & balance", icon: DollarSign, color: "bg-orange-500", href: "/wallet" }
          ]
        }
      case 'driver':
        return {
          hero: {
            title: "Ready to Drive & Earn",
            subtitle: "Connect with passengers and maximize your earnings today",
            stats: [
              { label: "Completed Rides", value: "142", icon: Car },
              { label: "Rating", value: "4.8", icon: Star },
              { label: "This Week", value: "$847", icon: DollarSign },
              { label: "Online Hours", value: "32h", icon: Clock }
            ]
          },
          quickActions: [
            { title: "Go Online", description: "Start accepting ride requests", icon: Zap, color: "bg-green-500", href: "/online" },
            { title: "Available Rides", description: "View nearby ride requests", icon: MapPin, color: "bg-blue-500", href: "/available" },
            { title: "Earnings", description: "Track your daily earnings", icon: TrendingUp, color: "bg-purple-500", href: "/earnings" },
            { title: "My Rides", description: "Manage current & past rides", icon: Activity, color: "bg-orange-500", href: "/rides" }
          ]
        }
      case 'admin':
        return {
          hero: {
            title: "NeoRide Command Center",
            subtitle: "Monitor operations and manage the entire platform",
            stats: [
              { label: "Active Users", value: "2,847", icon: Users },
              { label: "Daily Rides", value: "1,234", icon: Car },
              { label: "Revenue Today", value: "$12.4K", icon: DollarSign },
              { label: "Platform Rating", value: "4.7", icon: Star }
            ]
          },
          quickActions: [
            { title: "Analytics", description: "View platform performance", icon: BarChart3, color: "bg-blue-500", href: "/admin" },
            { title: "User Management", description: "Manage drivers & customers", icon: Users, color: "bg-green-500", href: "/admin/users" },
            { title: "Revenue Reports", description: "Financial insights & reports", icon: TrendingUp, color: "bg-purple-500", href: "/admin/revenue" },
            { title: "System Health", description: "Monitor platform status", icon: Activity, color: "bg-orange-500", href: "/admin/health" }
          ]
        }
      default:
        return {
          hero: {
            title: "Welcome to NeoRide",
            subtitle: "Your premium ride-sharing experience starts here",
            stats: []
          },
          quickActions: []
        }
    }
  }

  const content = getRoleContent()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {neoRideUser && (
        <Navbar 
          user={neoRideUser} 
          onLogout={handleLogout} 
          notificationCount={3}
        />
      )}
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/5 dark:to-purple-400/5" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent animate-fade-in mb-6">
              {content.hero.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {content.hero.subtitle}
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Badge variant="secondary" className="px-3 py-1">
                <Globe className="w-3 h-3 mr-1" />
                Available 24/7
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <Shield className="w-3 h-3 mr-1" />
                Verified Drivers
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <Award className="w-3 h-3 mr-1" />
                Premium Service
              </Badge>
            </div>
          </div>

          {/* Stats Grid */}
          {content.hero.stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {content.hero.stats.map((stat, index) => (
                <Card key={stat.label} className="text-center hover-scale animate-fade-in border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        <stat.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Quick Actions</h2>
          <p className="text-muted-foreground">Everything you need at your fingertips</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {content.quickActions.map((action, index) => (
            <Card key={action.title} className="group cursor-pointer hover-scale animate-fade-in border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity & Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="lg:col-span-1 animate-fade-in border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900" style={{ animationDelay: '0.5s' }}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <Users className="h-4 w-4" />
                </div>
                Profile Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                  {neoRideUser?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{neoRideUser?.name}</h3>
                  <p className="text-sm text-muted-foreground">{neoRideUser?.email}</p>
                  <Badge variant="outline" className="mt-1">
                    {neoRideUser?.role?.charAt(0).toUpperCase() + neoRideUser?.role?.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Account Status</span>
                  <Badge variant={authUser?.email_confirmed_at ? "default" : "secondary"}>
                    {authUser?.email_confirmed_at ? 'Verified' : 'Pending'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Member Since</span>
                  <span className="text-sm font-medium">
                    {authUser?.created_at ? new Date(authUser.created_at).toLocaleDateString() : 'Today'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card className="lg:col-span-2 animate-fade-in border-0 shadow-lg" style={{ animationDelay: '0.6s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white">
                  <Activity className="h-4 w-4" />
                </div>
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest interactions with NeoRide</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Account created", time: "Just now", icon: Users, color: "text-green-500" },
                  { action: "Profile setup completed", time: "2 minutes ago", icon: Shield, color: "text-blue-500" },
                  { action: "Welcome email sent", time: "5 minutes ago", icon: Calendar, color: "text-purple-500" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200">
                    <div className={`p-2 rounded-full bg-background ${activity.color}`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-blue-900 dark:text-blue-100">Getting Started Tip</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Try switching between different roles using the buttons above to explore all features!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <UserProvider>
      <HomeContent />
    </UserProvider>
  )
}