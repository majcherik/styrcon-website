/**
 * Clerk Configuration Validation for STYRCON Website
 * Slovak thermal insulation business authentication setup
 */

interface ClerkConfig {
  publishableKey: string
  secretKey: string
  signInUrl: string
  signUpUrl: string
  signInFallbackUrl: string
  signUpFallbackUrl: string
}

interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  config: Partial<ClerkConfig>
}

/**
 * Validates Clerk environment variables and configuration
 */
export function validateClerkConfig(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Get environment variables
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  const secretKey = process.env.CLERK_SECRET_KEY
  const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL
  const signUpUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL
  const signInFallbackUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
  const signUpFallbackUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL

  // Validate publishable key
  if (!publishableKey) {
    errors.push('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing')
  } else if (!publishableKey.startsWith('pk_')) {
    errors.push('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY must start with "pk_"')
  } else if (publishableKey.includes('your-publishable-key')) {
    errors.push('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY appears to be a placeholder')
  }

  // Validate secret key
  if (!secretKey) {
    errors.push('CLERK_SECRET_KEY is missing')
  } else if (!secretKey.startsWith('sk_')) {
    errors.push('CLERK_SECRET_KEY must start with "sk_"')
  } else if (secretKey.includes('your-secret-key')) {
    errors.push('CLERK_SECRET_KEY appears to be a placeholder')
  }

  // Validate Slovak URLs
  if (!signInUrl || signInUrl !== '/prihlasenie') {
    warnings.push('NEXT_PUBLIC_CLERK_SIGN_IN_URL should be "/prihlasenie" for Slovak localization')
  }

  if (!signUpUrl || signUpUrl !== '/registracia') {
    warnings.push('NEXT_PUBLIC_CLERK_SIGN_UP_URL should be "/registracia" for Slovak localization')
  }

  if (!signInFallbackUrl || signInFallbackUrl !== '/profil') {
    warnings.push('NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL should be "/profil"')
  }

  if (!signUpFallbackUrl || signUpFallbackUrl !== '/profil') {
    warnings.push('NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL should be "/profil"')
  }

  // Check for test vs production keys
  if (publishableKey?.includes('_test_')) {
    warnings.push('Using Clerk test keys - ensure this is correct for your environment')
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    config: {
      publishableKey,
      secretKey: secretKey ? `${secretKey.substring(0, 10)}...` : undefined,
      signInUrl,
      signUpUrl,
      signInFallbackUrl,
      signUpFallbackUrl
    }
  }
}

/**
 * Logs Clerk configuration validation results with Slovak context
 */
export function logClerkValidation(): void {
  if (typeof window === 'undefined') {
    // Server-side validation
    const validation = validateClerkConfig()

    console.log('🏢 STYRCON Clerk Configuration Validation:')
    console.log('📍 Slovak Thermal Insulation Business Setup')

    if (validation.isValid) {
      console.log('✅ Clerk configuration is valid')
    } else {
      console.error('❌ Clerk configuration has errors:')
      validation.errors.forEach(error => console.error(`  • ${error}`))
    }

    if (validation.warnings.length > 0) {
      console.warn('⚠️ Clerk configuration warnings:')
      validation.warnings.forEach(warning => console.warn(`  • ${warning}`))
    }

    console.log('📋 Current configuration:', validation.config)
  }
}

/**
 * Check if Clerk can be initialized based on environment
 */
export function canInitializeClerk(): boolean {
  const validation = validateClerkConfig()
  return validation.isValid && typeof window !== 'undefined'
}

/**
 * Get Slovak error messages for Clerk issues
 */
export function getClerkErrorMessage(error: string): string {
  const errorMessages: Record<string, string> = {
    'Failed to load Clerk': 'Nepodarilo sa načítať autentifikačný systém. Skontrolujte internetové pripojenie.',
    'Invalid publishable key': 'Neplatný verejný kľúč pre autentifikáciu.',
    'Network error': 'Chyba siete. Skontrolujte pripojenie na internet.',
    'Session expired': 'Relácia vypršala. Prihláste sa znovu.',
    'Access denied': 'Prístup zamietnutý. Nemáte dostatočné oprávnenia.',
    'User not found': 'Používateľ nebol nájdený.',
    'Invalid credentials': 'Neplatné prihlasovacie údaje.',
    'Too many requests': 'Príliš veľa požiadaviek. Skúste to neskôr.'
  }

  // Find matching error message
  for (const [key, message] of Object.entries(errorMessages)) {
    if (error.toLowerCase().includes(key.toLowerCase())) {
      return message
    }
  }

  return 'Nastala chyba pri autentifikácii. Skúste to neskôr alebo kontaktujte podporu.'
}

/**
 * Development helper for Clerk debugging
 */
export function debugClerkInitialization(): void {
  if (process.env.NODE_ENV === 'development') {
    logClerkValidation()

    // Check CSP issues
    if (typeof window !== 'undefined') {
      console.log('🔍 Checking CSP for Clerk domains...')

      // Test connection to Clerk
      fetch('https://api.clerk.com/v1/health')
        .then(() => console.log('✅ Can connect to Clerk API'))
        .catch(() => console.warn('⚠️ Cannot connect to Clerk API - check CSP or network'))
    }
  }
}