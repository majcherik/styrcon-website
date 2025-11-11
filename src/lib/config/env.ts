/**
 * Environment configuration management
 * Centralizes and validates all environment variables
 */

import { z } from 'zod'

// Environment variable schemas
const serverEnvSchema = z.object({
  // Node.js
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),

  // Database
  DATABASE_URL: z.string().url().optional(),

  // CMS
  STRAPI_API_URL: z.string().url().optional(),
  STRAPI_API_TOKEN: z.string().optional(),

  // Email
  RESEND_API_KEY: z.string().optional(),
  EMAIL_API_KEY: z.string().optional(),
  CONTACT_EMAIL: z.string().email().optional(),

  // External Services
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  // Authentication
  CLERK_SECRET_KEY: z.string().optional(),

  // Monitoring and telemetry
  ENABLE_INSTRUMENTATION: z.string().optional(),
  NEXT_TELEMETRY_DISABLED: z.string().optional(),

  // Security
  NEXTAUTH_SECRET: z.string().optional(),
  CSRF_SECRET: z.string().optional(),
})

const clientEnvSchema = z.object({
  // Site configuration
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_SITE_NAME: z.string().default('STYRCON - E-MA SK s.r.o.'),

  // Analytics
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_GTAG_ID: z.string().optional(),

  // Media
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().optional(),

  // External services
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),

  // Authentication
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().default('/prihlasenie'),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().default('/registracia'),
  NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: z.string().default('/profil'),
  NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: z.string().default('/profil'),

  // Development
  NEXT_PUBLIC_ENABLE_DEVTOOLS: z.string().optional(),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_AUTH_PAGES: z.string().optional(),
})

// Type definitions
export type ServerEnv = z.infer<typeof serverEnvSchema>
export type ClientEnv = z.infer<typeof clientEnvSchema>

// Environment validation function
function createEnv() {
  const isServer = typeof window === 'undefined'

  // Parse server environment variables (only on server)
  const serverEnv = isServer ? serverEnvSchema.safeParse(process.env) : { success: true, data: {} as ServerEnv }

  // Parse client environment variables (available on both server and client)
  const clientEnv = clientEnvSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_GTAG_ID: process.env.NEXT_PUBLIC_GTAG_ID,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL,
    NEXT_PUBLIC_ENABLE_DEVTOOLS: process.env.NEXT_PUBLIC_ENABLE_DEVTOOLS,
    NEXT_PUBLIC_ENABLE_AUTH_PAGES: process.env.NEXT_PUBLIC_ENABLE_AUTH_PAGES,
  })

  // Collect validation errors
  const errors: string[] = []

  if (!serverEnv.success && isServer) {
    errors.push('❌ Invalid server environment variables:')
    serverEnv.error.issues.forEach((issue) => {
      errors.push(`  • ${issue.path.join('.')}: ${issue.message}`)
    })
  }

  if (!clientEnv.success) {
    errors.push('❌ Invalid client environment variables:')
    clientEnv.error.issues.forEach((issue) => {
      errors.push(`  • ${issue.path.join('.')}: ${issue.message}`)
    })
  }

  if (errors.length > 0) {
    console.error('Environment validation failed:')
    errors.forEach((error) => console.error(error))

    if (process.env.NODE_ENV === 'production') {
      throw new Error('Invalid environment configuration')
    }
  }

  return {
    ...(isServer ? serverEnv.data : {}),
    ...clientEnv.data,
    // Computed values
    isProd: process.env.NODE_ENV === 'production',
    isDev: process.env.NODE_ENV === 'development',
    isTest: process.env.NODE_ENV === 'test',
  } as ServerEnv & ClientEnv & {
    isProd: boolean
    isDev: boolean
    isTest: boolean
  }
}

// Create and export the environment
export const env = createEnv()

// Environment helpers
export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '' // browser should use relative url
  if (env.NEXT_PUBLIC_SITE_URL) return env.NEXT_PUBLIC_SITE_URL
  return `http://localhost:${env.PORT ?? 3000}` // dev SSR should use localhost
}

export const getAbsoluteUrl = (path: string = '') => {
  return `${getBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`
}

// Feature flags based on environment
export const features = {
  analytics: env.isProd && !!env.NEXT_PUBLIC_GA_ID,
  monitoring: env.isProd || env.ENABLE_INSTRUMENTATION === 'true',
  devtools: env.isDev || env.NEXT_PUBLIC_ENABLE_DEVTOOLS === 'true',
  auth: !!env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  authPagesEnabled: env.NEXT_PUBLIC_ENABLE_AUTH_PAGES === 'true',
  database: !!env.DATABASE_URL || !!env.NEXT_PUBLIC_SUPABASE_URL,
  cms: !!env.STRAPI_API_URL,
  email: !!env.RESEND_API_KEY || !!env.EMAIL_API_KEY,
  media: !!env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
} as const

// Log environment status on server startup
if (typeof window === 'undefined' && env.isDev) {
  console.log('🔧 Environment Configuration:')
  console.log(`  • Mode: ${env.NODE_ENV}`)
  console.log(`  • Site URL: ${env.NEXT_PUBLIC_SITE_URL}`)
  console.log(`  • Features:`)
  Object.entries(features).forEach(([key, enabled]) => {
    console.log(`    ${enabled ? '✅' : '❌'} ${key}`)
  })
}