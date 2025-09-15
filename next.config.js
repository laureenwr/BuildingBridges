/** @type {import('next').NextConfig} */
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
  // Ensure stable builds
  swcMinify: true,
  
  // Optimize for production builds
  compress: true,
  
  // Experimental features - remove problematic settings that cause client reference manifest issues
  experimental: {
    // Disable problematic features that cause manifest generation issues
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Webpack configuration for better builds and caching
  webpack: (config, { dev, isServer }) => {
    // Better error handling for development cache issues
    if (dev) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
        cacheDirectory: path.resolve(__dirname, '.next/cache/webpack'),
      };
    }
    
    // Ensure proper handling of client components
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Ensure proper module resolution
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts'],
      '.jsx': ['.jsx', '.tsx'],
    };
    
    // Add explicit alias for components to help with Vercel builds
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': path.resolve(__dirname, 'components'),
      '@/lib': path.resolve(__dirname, 'lib'),
      '@': __dirname,
    };
    
    return config;
  },
  
  // Prevent build issues with empty pages
  typescript: {
    // Don't type-check during build to avoid stopping on type errors
    ignoreBuildErrors: false,
  },
  
  // Logging configuration
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;

