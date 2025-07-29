// Theme Toggle Button Component
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={`
        relative h-9 w-9 rounded-full transition-all duration-300 ease-in-out
        ${isDark 
          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white shadow-lg' 
          : 'bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-600 hover:to-slate-800 text-white shadow-lg'
        }
        hover:scale-105 active:scale-95
      `}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative">
        {isDark ? (
          <Sun 
            className="h-4 w-4 transition-all duration-300 rotate-0 scale-100" 
            strokeWidth={2.5}
          />
        ) : (
          <Moon 
            className="h-4 w-4 transition-all duration-300 rotate-0 scale-100" 
            strokeWidth={2.5}
          />
        )}
      </div>
      
      {/* Glow effect */}
      <div className={`
        absolute inset-0 rounded-full transition-opacity duration-300
        ${isDark 
          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 blur-md' 
          : 'bg-gradient-to-r from-slate-700 to-slate-900 opacity-20 blur-md'
        }
      `} />
    </Button>
  );
};