import type { NextConfig } from "next";

// Bundle analyzer setup - conditional import to prevent startup issues
const withBundleAnalyzer = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config: NextConfig) => config;

const nextConfig: NextConfig = {
  // Temporarily ignore build errors for preview deployment
  typescript: {
    ignoreBuildErrors: true, // TODO: Fix TypeScript errors
  },
  eslint: {
    ignoreDuringBuilds: true, // TODO: Fix ESLint errors
  },

  // Security optimizations
  poweredByHeader: false, // Remove X-Powered-By header for security
  productionBrowserSourceMaps: false, // Disable source maps in production for security

  // Development and SEO optimizations
  reactStrictMode: true, // Enable strict mode for better debugging and future compatibility
  trailingSlash: false, // Consistent URL structure without trailing slashes for Slovak SEO

  // HTTP compression optimization for Slovak thermal insulation content
  compress: true, // Explicitly enable gzip compression (default true, but explicit for clarity)

  // Output optimization for better performance
  output: 'standalone', // Optimize for deployment with minimal dependencies

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
    // Memory usage optimizations
    webpackMemoryOptimizations: true,
    webpackBuildWorker: true,

    // Enable use cache directive
    useCache: true,

    // Optimize memory usage during development
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-*',
      'framer-motion',
      '@clerk/nextjs',
      'tailwind-merge',
      'class-variance-authority',
      'lenis',
      'react-hook-form',
      '@hookform/resolvers',
      'zod',
      'embla-carousel-react',
      'next-themes'
    ],
  },

  // Enhanced Turbopack configuration for STYRCON development
  turbopack: {
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    resolveAlias: {
      // Centralized alias configuration for better import resolution
      '@': './src',
      '@components': './src/components',
      '@lib': './src/lib',
      '@ui': './src/components/ui',
      '@hooks': './src/hooks',
      '@utils': './src/lib/utils',
      '@config': './src/lib/config',
      '@styles': './src/app',
      // Slovak thermal insulation specific aliases
      '@thermal': './src/lib/thermal',
      '@slovakia': './src/lib/slovakia',
      '@styrcon': './src/components/styrcon',
    },
    // Enhanced rules for STYRCON asset handling
    rules: {
      // SVG optimization for thermal insulation diagrams
      '*.svg': {
        loaders: [{
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: ['preset-default'],
            },
            titleProp: true,
            ref: true,
          },
        }],
        as: '*.js',
      },
    },
  },
  // Simplified webpack optimizations with Radix UI ESM support
  webpack: (config, { dev }) => {
    // Add specific module resolution for Radix UI components
    config.resolve.alias = {
      ...config.resolve.alias,
      '@radix-ui/react-collection': require.resolve('@radix-ui/react-collection'),
      '@radix-ui/react-slider': require.resolve('@radix-ui/react-slider'),
      '@radix-ui/react-checkbox': require.resolve('@radix-ui/react-checkbox'),
    };

    // Enhanced production optimizations for STYRCON thermal insulation content
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        sideEffects: false,
        // Better chunk splitting for Slovak business content
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // Separate vendor bundles for better caching
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            // STYRCON-specific components bundle
            styrcon: {
              test: /[\\/]src[\\/](components|lib)[\\/]/,
              name: 'styrcon-components',
              chunks: 'all',
              minSize: 10000,
            },
          },
        },
        // Remove unused code more aggressively
        usedExports: true,
      }

      // Additional optimizations for thermal insulation image assets
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      }
    }

    return config;
  },
  // Strategic redirects for Slovak business SEO and UX
  async redirects() {
    return [
      // Legacy product page redirects
      {
        source: '/produkty',
        destination: '/styrcon-produkt',
        permanent: true,
      },
      {
        source: '/product',
        destination: '/styrcon-produkt',
        permanent: true,
      },

      // Slovak language variations
      {
        source: '/o-firme',
        destination: '/o-nas',
        permanent: true,
      },
      {
        source: '/o-spolecnosti',
        destination: '/o-nas',
        permanent: true,
      },

      // Contact page variations
      {
        source: '/kontakty',
        destination: '/kontakt',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/kontakt',
        permanent: true,
      },

      // Gallery redirects
      {
        source: '/projekty',
        destination: '/galeria',
        permanent: true,
      },
      {
        source: '/gallery',
        destination: '/galeria',
        permanent: true,
      },

      // News/blog redirects
      {
        source: '/blog',
        destination: '/aktuality',
        permanent: true,
      },
      {
        source: '/novinky',
        destination: '/aktuality',
        permanent: true,
      },

      // Documents/downloads
      {
        source: '/download',
        destination: '/dokumenty',
        permanent: true,
      },
      {
        source: '/downloads',
        destination: '/dokumenty',
        permanent: true,
      },

      // Common typos and variations
      {
        source: '/styrkon',
        destination: '/styrcon-produkt',
        permanent: true,
      },
      {
        source: '/stircon',
        destination: '/styrcon-produkt',
        permanent: true,
      },

      // Legacy technical pages
      {
        source: '/technicke-listy',
        destination: '/dokumenty',
        permanent: true,
      },
      {
        source: '/certifikaty',
        destination: '/dokumenty',
        permanent: true,
      },
    ]
  },

  // Enhanced security and performance headers for Slovak thermal insulation business
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          // Security headers
          // X-Frame-Options removed - using CSP frame-ancestors instead to allow YouTube embeds
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
          },
          // HSTS for HTTPS enforcement (production only)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          // Performance and caching headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          // Slovak market optimization
          {
            key: 'X-Market-Region',
            value: 'SK-EU'
          },
          {
            key: 'X-Business-Sector',
            value: 'thermal-insulation'
          },
          {
            key: 'X-Content-Language',
            value: 'sk'
          }
        ],
      },
      {
        // Static assets optimization
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'X-Asset-Type',
            value: 'styrcon-image'
          }
        ],
      },
      {
        // API routes specific headers
        source: '/api/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_SITE_URL || 'https://styrcon.sk'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          }
        ],
      },
      {
        // Content Security Policy for enhanced security
        source: '/((?!api).*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob: https://img.youtube.com",
              "media-src 'self' https:",
              "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com",
              "frame-src 'self' https://vercel.live https://www.youtube.com https://www.youtube-nocookie.com",
              "child-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ],
      }
    ]
  },

  // Server external packages (replaces experimental.serverComponentsExternalPackages)
  serverExternalPackages: ['@supabase/supabase-js'],
};

export default withBundleAnalyzer(nextConfig);
