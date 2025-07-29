// Theme Context for Dark/Light Mode Management
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first, then system preference, default to light
    const savedTheme = localStorage.getItem('neoride-theme') as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light'; // Default to light mode
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('neoride-theme', newTheme);
  };

  const isDark = theme === 'dark';

  useEffect(() => {
    // Apply theme to document root
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Apply theme-specific CSS custom properties
    if (isDark) {
      // Dark theme colors
      root.style.setProperty('--primary-bg', 'linear-gradient(135deg, #0B1B3A 0%, #101E4B 100%)');
      root.style.setProperty('--card-bg', 'rgba(16, 30, 75, 0.8)');
      root.style.setProperty('--primary-text', '#FFFFFF');
      root.style.setProperty('--sub-text', '#C7C9D3');
      root.style.setProperty('--accent-gradient', 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)');
      root.style.setProperty('--highlight-badge', '#485B8C');
      root.style.setProperty('--secondary-badge', '#5CB3FF');
      root.style.setProperty('--cta-button', '#1E90FF');
      root.style.setProperty('--icon-color', '#6C8BC4');
      root.style.setProperty('--border-color', 'rgba(108, 139, 196, 0.2)');
      root.style.setProperty('--hover-bg', 'rgba(30, 144, 255, 0.1)');
    } else {
      // Light theme colors
      root.style.setProperty('--primary-bg', 'linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%)');
      root.style.setProperty('--card-bg', '#FFFFFF');
      root.style.setProperty('--primary-text', '#1B1F3B');
      root.style.setProperty('--sub-text', '#6C757D');
      root.style.setProperty('--accent-gradient', 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)');
      root.style.setProperty('--highlight-badge', '#007BFF');
      root.style.setProperty('--secondary-badge', '#00A8FF');
      root.style.setProperty('--cta-button', '#007BFF');
      root.style.setProperty('--icon-color', '#6C8BC4');
      root.style.setProperty('--border-color', 'rgba(0, 123, 255, 0.1)');
      root.style.setProperty('--hover-bg', 'rgba(0, 123, 255, 0.05)');
    }
  }, [isDark]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('neoride-theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};