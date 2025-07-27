import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  LayoutDashboard,
  Users,
  Car,
  MapPin,
  DollarSign,
  BarChart3,
  Settings,
  FileText,
  AlertTriangle,
  Shield,
  Activity,
  Calendar,
  MessageSquare,
  TrendingUp,
  UserCheck,
  CreditCard,
  Bell,
  Database,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react'

interface AdminSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  collapsed?: boolean
  onToggleCollapse?: () => void
}

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Overview & Analytics'
  },
  {
    id: 'rides',
    label: 'Ride Management',
    icon: MapPin,
    description: 'Active & Completed Rides'
  },
  {
    id: 'customers',
    label: 'Customer Management',
    icon: Users,
    description: 'User Accounts & Support'
  },
  {
    id: 'drivers',
    label: 'Driver Management',
    icon: Car,
    description: 'Driver Verification & Performance'
  },
  {
    id: 'finance',
    label: 'Financial Reports',
    icon: DollarSign,
    description: 'Revenue & Profit Analysis'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    description: 'Platform Performance'
  },
  {
    id: 'bookings',
    label: 'Booking System',
    icon: Calendar,
    description: 'Reservation Management'
  },
  {
    id: 'payments',
    label: 'Payment Gateway',
    icon: CreditCard,
    description: 'Transaction Management'
  },
  {
    id: 'support',
    label: 'Customer Support',
    icon: MessageSquare,
    description: 'Tickets & Issues'
  },
  {
    id: 'verification',
    label: 'Verification Center',
    icon: UserCheck,
    description: 'Document Verification'
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    description: 'System Alerts'
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: FileText,
    description: 'Generate Reports'
  },
  {
    id: 'system',
    label: 'System Health',
    icon: Activity,
    description: 'Server & Database Status'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    description: 'Platform Configuration'
  },
  {
    id: 'test',
    label: 'Admin Test',
    icon: Shield,
    description: 'Test Admin Features'
  }
]

export default function AdminSidebar({ 
  activeTab, 
  onTabChange, 
  collapsed = false, 
  onToggleCollapse 
}: AdminSidebarProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userType')
    navigate('/login')
  }
  return (
    <div className={cn(
      "bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Admin Panel</h2>
              <p className="text-xs text-gray-500">NeoRide Control Center</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="h-8 w-8"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-auto p-3",
                collapsed && "justify-center px-2",
                activeTab === item.id && "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <item.icon className={cn("w-5 h-5", collapsed ? "mx-auto" : "")} />
              {!collapsed && (
                <div className="text-left">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {item.description}
                  </div>
                </div>
              )}
            </Button>
          ))}
        </div>
      </ScrollArea>

      {!collapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-slate-700 space-y-3">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4" />
              <span className="text-sm font-medium">System Status</span>
            </div>
            <div className="text-xs opacity-90">All systems operational</div>
            <div className="flex items-center gap-1 mt-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-xs">Live monitoring active</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      )}
      
      {collapsed && (
        <div className="p-2 border-t border-gray-200 dark:border-slate-700">
          <Button 
            variant="outline" 
            size="icon"
            className="w-full text-red-600 border-red-200 hover:bg-red-50"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}