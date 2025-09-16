/**
 * Environment validation and configuration utilities
 * Ensures all required environment variables are present and valid
 */

interface EnvironmentConfig {
  // Clerk Authentication
  clerkPublishableKey: string
  clerkSecretKey: string
  clerkWebhookSecret?: string

  // Site Configuration
  siteUrl: string
  siteName: string

  // Database
  databaseUrl?: string
  supabaseUrl?: string
  supabaseAnonKey?: string
  supabaseServiceRoleKey?: string

  // External Services
  strapiApiUrl?: string
  strapiApiToken?: string
  cloudinaryCloudName?: string
  emailApiKey?: string
  contactEmail?: string

  // Analytics
  googleAnalyticsId?: string

  // Environment
  nodeEnv: 'development' | 'production' | 'test'
  isProduction: boolean
  isDevelopment: boolean
}

/**
 * Validate and parse environment variables
 */
export function validateEnvironment(): EnvironmentConfig {
  const errors: string[] = []

  // Helper function to get required env var
  const getRequired = (key: string): string => {
    const value = process.env[key]
    if (!value) {
      errors.push(`Missing required environment variable: ${key}`)
      return ''
    }
    return value
  }

  // Helper function to get optional env var
  const getOptional = (key: string): string | undefined => {
    return process.env[key] || undefined
  }

  // Validate required variables
  const config: EnvironmentConfig = {
    // Clerk (required)
    clerkPublishableKey: getRequired('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'),
    clerkSecretKey: getRequired('CLERK_SECRET_KEY'),
    clerkWebhookSecret: getOptional('CLERK_WEBHOOK_SECRET'),

    // Site configuration (required)
    siteUrl: getRequired('NEXT_PUBLIC_SITE_URL'),
    siteName: getOptional('NEXT_PUBLIC_SITE_NAME') || 'STYRCON',

    // Database (optional)
    databaseUrl: getOptional('DATABASE_URL'),
    supabaseUrl: getOptional('NEXT_PUBLIC_SUPABASE_URL'),
    supabaseAnonKey: getOptional('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    supabaseServiceRoleKey: getOptional('SUPABASE_SERVICE_ROLE_KEY'),

    // External services (optional)
    strapiApiUrl: getOptional('STRAPI_API_URL'),
    strapiApiToken: getOptional('STRAPI_API_TOKEN'),
    cloudinaryCloudName: getOptional('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME'),
    emailApiKey: getOptional('EMAIL_API_KEY'),
    contactEmail: getOptional('CONTACT_EMAIL'),

    // Analytics (optional)
    googleAnalyticsId: getOptional('NEXT_PUBLIC_GA_ID'),

    // Environment
    nodeEnv: (process.env.NODE_ENV as any) || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
  }

  // Validate URLs
  try {
    new URL(config.siteUrl)
  } catch {
    errors.push('NEXT_PUBLIC_SITE_URL must be a valid URL')
  }

  if (config.strapiApiUrl) {
    try {
      new URL(config.strapiApiUrl)
    } catch {
      errors.push('STRAPI_API_URL must be a valid URL')
    }
  }

  if (config.supabaseUrl) {
    try {
      new URL(config.supabaseUrl)
    } catch {
      errors.push('NEXT_PUBLIC_SUPABASE_URL must be a valid URL')
    }
  }

  // Validate email
  if (config.contactEmail && !isValidEmail(config.contactEmail)) {
    errors.push('CONTACT_EMAIL must be a valid email address')
  }

  // Production-specific validations
  if (config.isProduction) {
    if (!config.clerkWebhookSecret) {
      errors.push('CLERK_WEBHOOK_SECRET is required in production')
    }

    if (config.siteUrl.includes('localhost')) {
      errors.push('NEXT_PUBLIC_SITE_URL cannot use localhost in production')
    }

    if (!config.googleAnalyticsId) {
      console.warn('Warning: NEXT_PUBLIC_GA_ID not set in production')
    }
  }

  // If there are errors, throw them
  if (errors.length > 0) {
    throw new Error(
      `Environment validation failed:\n${errors.map(e => `  - ${e}`).join('\n')}`
    )
  }

  return config
}

/**
 * Simple email validation
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Get validated environment configuration
 * Cached after first call for performance
 */
let cachedConfig: EnvironmentConfig | null = null

export function getEnvConfig(): EnvironmentConfig {
  if (!cachedConfig) {
    cachedConfig = validateEnvironment()
  }
  return cachedConfig
}

/**
 * Check if specific features are enabled based on environment
 */
export function getFeatureFlags() {
  const config = getEnvConfig()

  return {
    // Authentication features
    hasWebhooks: !!config.clerkWebhookSecret,

    // Database features
    hasDatabase: !!config.databaseUrl,
    hasSupabase: !!(config.supabaseUrl && config.supabaseAnonKey),

    // External service features
    hasStrapi: !!(config.strapiApiUrl && config.strapiApiToken),
    hasCloudinary: !!config.cloudinaryCloudName,
    hasEmail: !!config.emailApiKey,

    // Analytics features
    hasAnalytics: !!config.googleAnalyticsId,

    // Environment features
    isDevelopment: config.isDevelopment,
    isProduction: config.isProduction,

    // Security features
    hasHttps: config.siteUrl.startsWith('https://'),
  }
}

/**
 * Development environment helpers
 */
export function getDevelopmentHelpers() {
  const config = getEnvConfig()

  if (!config.isDevelopment) {
    return null
  }

  return {
    showEnvironmentInfo: true,
    enableDebugLogs: true,
    skipEmailVerification: true,
    allowTestData: true,
    showPerformanceMetrics: true,
  }
}

/**
 * Production environment checks
 */
export function getProductionChecks() {
  const config = getEnvConfig()

  if (!config.isProduction) {
    return null
  }

  const checks = {
    hasHttps: config.siteUrl.startsWith('https://'),
    hasWebhooks: !!config.clerkWebhookSecret,
    hasAnalytics: !!config.googleAnalyticsId,
    hasProperDomain: !config.siteUrl.includes('localhost'),
    hasContactEmail: !!config.contactEmail,
  }

  const warnings: string[] = []

  if (!checks.hasHttps) warnings.push('Site URL should use HTTPS in production')
  if (!checks.hasWebhooks) warnings.push('Webhook secret not configured')
  if (!checks.hasAnalytics) warnings.push('Google Analytics not configured')
  if (!checks.hasContactEmail) warnings.push('Contact email not configured')

  return {
    checks,
    warnings,
    isReadyForProduction: warnings.length === 0,
  }
}