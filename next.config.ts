import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
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
        hostname: 'www.styrcon.sk',
        port: '',
        pathname: '/obchod_homedir/**',
      },
    ],
  },
  // Memory and performance optimizations
  experimental: {
    // Optimize memory usage during development
    optimizePackageImports: ['lucide-react', '@radix-ui/react-*'],
    // Reduce memory usage for large pages
    optimizeCss: process.env.NODE_ENV === 'production',
  },
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize memory usage in development
    if (dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
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
    }
    return config;
  },
};

export default nextConfig;
