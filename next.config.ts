import type { NextConfig } from "next";

// Bundle analyzer setup - conditional import to prevent startup issues
const withBundleAnalyzer = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config: NextConfig) => config;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.e-ma.sk',
        port: '',
        pathname: '/imgcache/**',
      },
      {
        protocol: 'https',
        hostname: 'www.e-ma.sk',
        port: '',
        pathname: '/design/**',
      },
      {
        protocol: 'https',
        hostname: 'www.styrcon.sk',
        port: '',
        pathname: '/obchod_homedir/**',
      },
      {
        protocol: 'https',
        hostname: 'www.styrcon.sk',
        port: '',
        pathname: '/Data/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Performance and memory optimizations
  experimental: {
    // Optimize memory usage during development
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-*',
      'framer-motion',
      '@clerk/nextjs',
      'tailwind-merge',
      'class-variance-authority',
      'lenis'
    ],
    // Reduce memory usage for large pages
    optimizeCss: process.env.NODE_ENV === 'production',
    // Enable automatic static optimization
    esmExternals: true,
    // Optimize server components (deprecated - moved to serverExternalPackages)
  },
  // Enhanced webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Performance optimizations for both dev and production
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Framework chunks (React, Next.js)
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            chunks: 'all',
            priority: 40,
            enforce: true,
          },
          // UI library chunks
          ui: {
            name: 'ui',
            test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|tailwind-merge|class-variance-authority)[\\/]/,
            chunks: 'all',
            priority: 30,
            enforce: true,
          },
          // Animation libraries
          animations: {
            name: 'animations',
            test: /[\\/]node_modules[\\/](framer-motion|lenis)[\\/]/,
            chunks: 'all',
            priority: 25,
            enforce: true,
          },
          // Vendor chunks
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 20,
          },
          // Common chunks
          common: {
            name: 'common',
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
    };

    // Add performance hints for production
    if (!dev) {
      config.performance = {
        hints: 'warning',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
      };
    }

    return config;
  },
  // Server external packages (replaces experimental.serverComponentsExternalPackages)
  serverExternalPackages: ['@supabase/supabase-js'],
};

export default withBundleAnalyzer(nextConfig);
