#!/usr/bin/env node

/**
 * Environment validation script
 * Run this before deployment to ensure all required environment variables are set
 */

const fs = require('fs')
const path = require('path')

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
}

function colorize(text, color) {
  return colors[color] + text + colors.reset
}

// Load environment variables
require('dotenv').config({ path: '.env.local' })
require('dotenv').config({ path: '.env' })

// Environment validation rules
const validationRules = {
  required: {
    production: [
      'NEXT_PUBLIC_SITE_URL',
      'NODE_ENV',
    ],
    development: [
      'NEXT_PUBLIC_SITE_URL',
    ]
  },
  conditional: {
    // If one is set, others should be set too
    auth: ['NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', 'CLERK_SECRET_KEY'],
    database_supabase: ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'],
    email_resend: ['RESEND_API_KEY', 'CONTACT_EMAIL'],
    cms: ['STRAPI_API_URL', 'STRAPI_API_TOKEN'],
    analytics: ['NEXT_PUBLIC_GA_ID'],
  },
  format: {
    urls: [
      'NEXT_PUBLIC_SITE_URL',
      'NEXT_PUBLIC_SUPABASE_URL',
      'STRAPI_API_URL',
      'DATABASE_URL',
    ],
    emails: [
      'CONTACT_EMAIL',
    ],
    secrets: [
      'CLERK_SECRET_KEY',
      'SUPABASE_SERVICE_ROLE_KEY',
      'RESEND_API_KEY',
      'NEXTAUTH_SECRET',
      'CSRF_SECRET',
    ]
  }
}

// Validation functions
function isValidUrl(string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

function isValidEmail(string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(string)
}

function isValidSecret(string) {
  return string && string.length >= 32 && !string.includes('your_') && !string.includes('test_') && string !== 'your-secret-here'
}

function validateEnvironment() {
  const env = process.env.NODE_ENV || 'development'
  const issues = []
  const warnings = []
  const info = []

  console.log(colorize('🔧 Environment Validation Report', 'cyan'))
  console.log(colorize('='.repeat(50), 'dim'))
  console.log(`Environment: ${colorize(env, 'bright')}`)
  console.log()

  // Check required variables
  const requiredVars = validationRules.required[env] || []
  console.log(colorize('Required Variables:', 'bright'))

  for (const varName of requiredVars) {
    const value = process.env[varName]
    if (!value) {
      issues.push(`Missing required variable: ${varName}`)
      console.log(`  ❌ ${varName}: ${colorize('Missing', 'red')}`)
    } else {
      console.log(`  ✅ ${varName}: ${colorize('Set', 'green')}`)
    }
  }

  // Check conditional groups
  console.log()
  console.log(colorize('Feature Configurations:', 'bright'))

  for (const [group, vars] of Object.entries(validationRules.conditional)) {
    const setVars = vars.filter(v => process.env[v])
    const missingVars = vars.filter(v => !process.env[v])

    if (setVars.length > 0 && missingVars.length > 0) {
      warnings.push(`Incomplete ${group} configuration: missing ${missingVars.join(', ')}`)
      console.log(`  ⚠️  ${group}: ${colorize('Incomplete', 'yellow')} (${setVars.length}/${vars.length})`)
    } else if (setVars.length === vars.length) {
      console.log(`  ✅ ${group}: ${colorize('Complete', 'green')}`)
    } else {
      console.log(`  ➖ ${group}: ${colorize('Not configured', 'dim')}`)
    }
  }

  // Format validation
  console.log()
  console.log(colorize('Format Validation:', 'bright'))

  // URLs
  for (const varName of validationRules.format.urls) {
    const value = process.env[varName]
    if (value) {
      if (!isValidUrl(value)) {
        issues.push(`Invalid URL format: ${varName}`)
        console.log(`  ❌ ${varName}: ${colorize('Invalid URL', 'red')}`)
      } else {
        console.log(`  ✅ ${varName}: ${colorize('Valid URL', 'green')}`)
      }
    }
  }

  // Emails
  for (const varName of validationRules.format.emails) {
    const value = process.env[varName]
    if (value) {
      if (!isValidEmail(value)) {
        issues.push(`Invalid email format: ${varName}`)
        console.log(`  ❌ ${varName}: ${colorize('Invalid email', 'red')}`)
      } else {
        console.log(`  ✅ ${varName}: ${colorize('Valid email', 'green')}`)
      }
    }
  }

  // Secrets (only in production)
  if (env === 'production') {
    console.log()
    console.log(colorize('Security Validation:', 'bright'))

    for (const varName of validationRules.format.secrets) {
      const value = process.env[varName]
      if (value) {
        if (!isValidSecret(value)) {
          issues.push(`Insecure secret: ${varName}`)
          console.log(`  ❌ ${varName}: ${colorize('Insecure/placeholder value', 'red')}`)
        } else {
          console.log(`  ✅ ${varName}: ${colorize('Secure', 'green')}`)
        }
      }
    }
  }

  // Environment-specific checks
  console.log()
  console.log(colorize('Environment-Specific Checks:', 'bright'))

  if (env === 'production') {
    if (process.env.NEXT_PUBLIC_SITE_URL?.includes('localhost')) {
      warnings.push('Production environment is using localhost URL')
      console.log(`  ⚠️  NEXT_PUBLIC_SITE_URL: ${colorize('Using localhost in production', 'yellow')}`)
    }

    if (!process.env.CONTACT_EMAIL || process.env.CONTACT_EMAIL.includes('localhost')) {
      warnings.push('Production should have a real contact email')
      console.log(`  ⚠️  CONTACT_EMAIL: ${colorize('Should be real email in production', 'yellow')}`)
    }
  }

  if (env === 'development') {
    if (process.env.NEXT_TELEMETRY_DISABLED !== '1') {
      info.push('Consider disabling Next.js telemetry in development')
    }
  }

  // Summary
  console.log()
  console.log(colorize('Summary:', 'bright'))
  console.log('='.repeat(20))

  if (issues.length === 0) {
    console.log(colorize('✅ All critical validations passed!', 'green'))
  } else {
    console.log(colorize(`❌ ${issues.length} critical issue(s) found:`, 'red'))
    issues.forEach(issue => console.log(`  • ${issue}`))
  }

  if (warnings.length > 0) {
    console.log(colorize(`⚠️  ${warnings.length} warning(s):`, 'yellow'))
    warnings.forEach(warning => console.log(`  • ${warning}`))
  }

  if (info.length > 0) {
    console.log(colorize(`ℹ️  ${info.length} info:`, 'blue'))
    info.forEach(infoItem => console.log(`  • ${infoItem}`))
  }

  console.log()

  // Exit with error code if there are critical issues
  if (issues.length > 0) {
    console.log(colorize('❌ Environment validation failed. Please fix the issues above.', 'red'))
    process.exit(1)
  } else {
    console.log(colorize('✅ Environment validation completed successfully!', 'green'))
    process.exit(0)
  }
}

// Run validation
if (require.main === module) {
  validateEnvironment()
}

module.exports = { validateEnvironment }