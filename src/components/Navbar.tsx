import { useState } from 'react'
import { Car, Settings, LogOut, ChevronDown, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'
import ProfileModal from './ProfileModal'
import SettingsModal from './SettingsModal'
import { ThemeToggle } from './ThemeToggle'
import { useTheme } from '../contexts/ThemeContext'

interface User {
  id: string
  name: string
  email: string
  role: 'customer' | 'driver' | 'admin'
  avatar?: string
  isOnline?: boolean
}

interface NavbarProps {
  user: User | null
  onLogout: () => void
  notificationCount?: number
  onUpdateUser?: (updatedUser: User) => void
}

export default function Navbar({ user, onLogout, onUpdateUser }: NavbarProps) {
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const { isDark } = useTheme()

  if (!user) return null

  const handleUpdateUser = (updatedUser: User) => {
    if (onUpdateUser) {
      onUpdateUser(updatedUser)
    }
  }

  // Enhanced user data for modals
  const enhancedUser = {
    ...user,
    phone: '+91 98765 43210',
    address: 'Flat 4B, Block A, Salt Lake City, Sector V, Kolkata - 700091',
    joinDate: 'January 2024',
    isVerified: true,
    emailVerified: true,
    phoneVerified: false
  }

  return (
    <nav className={`w-full border-b shadow-sm sticky top-0 z-50 transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-r from-slate-900 to-slate-800 border-slate-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700'
            }`}>
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className={`text-2xl font-bold transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              NeoRide
            </span>
          </Link>

          {/* User Profile Section */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`flex items-center space-x-3 px-3 py-2 rounded-full transition-colors ${
                    isDark 
                      ? 'hover:bg-slate-700 text-white' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:flex items-center space-x-2">
                    <span className={`text-sm font-medium transition-colors ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Hey {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-colors ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className={`w-64 transition-all duration-300 ${
                  isDark 
                    ? 'bg-slate-800/95 backdrop-blur-xl border-cyan-500/20 shadow-2xl shadow-cyan-500/10' 
                    : 'bg-white border-gray-200 shadow-lg'
                }`} 
                align="end" 
                forceMount
                style={{
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)'
                    : undefined,
                  border: isDark 
                    ? '1px solid rgba(0, 198, 255, 0.2)'
                    : undefined
                }}
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-2 p-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className={`font-medium transition-colors ${
                          isDark 
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white' 
                            : 'bg-blue-600 text-white'
                        }`}>
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className={`text-sm font-semibold transition-colors ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>{user.name}</p>
                        <p className={`text-xs transition-colors ${
                          isDark ? 'text-gray-300' : 'text-gray-500'
                        }`}>{user.email}</p>
                        <div className="mt-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                            user.role === 'admin' 
                              ? isDark 
                                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' 
                                : 'bg-purple-100 text-purple-800'
                              : user.role === 'driver'
                              ? isDark 
                                ? 'bg-green-600/20 text-green-300 border border-green-500/30' 
                                : 'bg-green-100 text-green-800'
                              : isDark 
                                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                                : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className={`transition-colors ${
                  isDark ? 'bg-slate-600' : 'bg-gray-200'
                }`} />
                <DropdownMenuItem 
                  className={`cursor-pointer transition-all duration-200 ${
                    isDark 
                      ? 'text-gray-300 hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white' 
                      : 'text-gray-700 hover:bg-gray-50 focus:bg-gray-50'
                  }`}
                  onClick={() => setShowProfileModal(true)}
                >
                  <User className="mr-3 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={`cursor-pointer transition-all duration-200 ${
                    isDark 
                      ? 'text-gray-300 hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white' 
                      : 'text-gray-700 hover:bg-gray-50 focus:bg-gray-50'
                  }`}
                  onClick={() => setShowSettingsModal(true)}
                >
                  <Settings className="mr-3 h-4 w-4" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className={`transition-colors ${
                  isDark ? 'bg-slate-600' : 'bg-gray-200'
                }`} />
                <DropdownMenuItem 
                  onClick={onLogout} 
                  className={`cursor-pointer transition-all duration-200 ${
                    isDark 
                      ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300 focus:bg-red-900/20 focus:text-red-300' 
                      : 'text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-600'
                  }`}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={enhancedUser}
      />
      
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        user={enhancedUser}
        onUpdateUser={handleUpdateUser}
      />
    </nav>
  )
}