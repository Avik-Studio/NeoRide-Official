import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Increase chunk size warning limit to 1000kb (default is 500kb)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better optimization
        manualChunks: {
          // Vendor chunk for React and core libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // UI components chunk - only include packages that exist in dependencies
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-avatar',
            '@radix-ui/react-toast',
            '@radix-ui/react-tabs',
            '@radix-ui/react-select',
            '@radix-ui/react-label',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-switch',
            '@radix-ui/react-slider',
            '@radix-ui/react-progress',
            '@radix-ui/react-separator',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-popover',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group'
          ],
          // Maps and external services
          maps: ['@googlemaps/js-api-loader'],
          // Supabase and authentication
          auth: ['@supabase/supabase-js'],
          // Form handling and validation
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Utility libraries
          utils: [
            'lucide-react',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
            'date-fns',
            'cmdk',
            'sonner',
            'vaul',
            'input-otp',
            'next-themes'
          ],
          // Query and data management
          query: ['@tanstack/react-query'],
          // Charts and visualization
          charts: ['recharts'],
          // Carousel and interactive components
          carousel: ['embla-carousel-react'],
          // Resizable panels
          panels: ['react-resizable-panels']
        }
      }
    },
    // Additional build optimizations
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false, // Disable sourcemaps in production for smaller builds
    cssCodeSplit: true, // Enable CSS code splitting
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@supabase/supabase-js',
        '@googlemaps/js-api-loader',
        'lucide-react'
      ]
    }
  }
}));
