#!/usr/bin/env node

/**
 * Production readiness checklist for STYRCON Slovak website
 * Comprehensive checks for security, performance, and functionality
 */

const fs = require('fs')
const path = require('path')

// Color utilities
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
}

function colorize(text, color) {
  return colors[color] + text + colors.reset
}

function checkExists(filePath, description) {
  const exists = fs.existsSync(filePath)
  const status = exists ? colorize('✅', 'green') : colorize('❌', 'red')
  console.log(`  ${status} ${description}: ${exists ? 'Present' : 'Missing'}`)
  return exists
}

function checkFileContent(filePath, searchTerm, description) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const hasContent = content.includes(searchTerm)
    const status = hasContent ? colorize('✅', 'green') : colorize('⚠️', 'yellow')
    console.log(`  ${status} ${description}: ${hasContent ? 'Configured' : 'Not configured'}`)
    return hasContent
  } catch (error) {
    console.log(`  ${colorize('❌', 'red')} ${description}: File not found`)
    return false
  }
}

function runProductionChecklist() {
  console.log(colorize('\n🏢 STYRCON Production Readiness Checklist', 'cyan'))
  console.log(colorize('=' * 50, 'dim'))

  let totalChecks = 0
  let passedChecks = 0

  // Essential Files Check
  console.log(colorize('\n📁 Essential Files:', 'bright'))
  const essentialFiles = [
    ['package.json', 'Package configuration'],
    ['next.config.ts', 'Next.js configuration'],
    ['tsconfig.json', 'TypeScript configuration'],
    ['.env.example', 'Environment template'],
    ['instrumentation.ts', 'Professional monitoring'],
    ['src/app/manifest.ts', 'PWA manifest'],
    ['public/sw.js', 'Service worker'],
    ['public/robots.txt', 'Search engine directives'],
  ]

  essentialFiles.forEach(([file, desc]) => {
    totalChecks++
    if (checkExists(file, desc)) passedChecks++
  })

  // Security Configuration
  console.log(colorize('\n🔒 Security Configuration:', 'bright'))
  totalChecks++
  if (checkFileContent('next.config.ts', 'contentSecurityPolicy', 'Content Security Policy')) {
    passedChecks++
  }

  totalChecks++
  if (checkFileContent('src/lib/config/env.ts', 'z.string()', 'Environment validation')) {
    passedChecks++
  }

  // Performance Features
  console.log(colorize('\n⚡ Performance Features:', 'bright'))
  totalChecks++
  if (checkFileContent('next.config.ts', 'webpackMemoryOptimizations', 'Memory optimizations')) {
    passedChecks++
  }

  totalChecks++
  if (checkFileContent('next.config.ts', 'optimizePackageImports', 'Package optimizations')) {
    passedChecks++
  }

  totalChecks++
  if (checkExists('src/components/analytics/web-vitals.tsx', 'Web Vitals monitoring')) {
    passedChecks++
  }

  // PWA Features
  console.log(colorize('\n📱 PWA Features:', 'bright'))
  totalChecks++
  if (checkFileContent('src/app/manifest.ts', 'slovakia', 'Slovak localization')) {
    passedChecks++
  }

  totalChecks++
  if (checkFileContent('public/sw.js', 'STYRCON', 'Service worker branding')) {
    passedChecks++
  }

  // Monitoring & Observability
  console.log(colorize('\n📊 Monitoring & Observability:', 'bright'))
  totalChecks++
  if (checkFileContent('instrumentation.ts', '@vercel/otel', 'Professional OpenTelemetry')) {
    passedChecks++
  }

  totalChecks++
  if (checkFileContent('instrumentation.ts', 'business.country', 'Slovak business context')) {
    passedChecks++
  }

  // Build & Development Tools
  console.log(colorize('\n🛠️ Build & Development:', 'bright'))
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

  const requiredScripts = [
    'build:memory',
    'build:profile',
    'analyze:memory',
    'validate:env'
  ]

  requiredScripts.forEach(script => {
    totalChecks++
    const hasScript = packageJson.scripts && packageJson.scripts[script]
    const status = hasScript ? colorize('✅', 'green') : colorize('❌', 'red')
    console.log(`  ${status} ${script}: ${hasScript ? 'Present' : 'Missing'}`)
    if (hasScript) passedChecks++
  })

  // Slovak Business Context
  console.log(colorize('\n🏢 Slovak Business Context:', 'bright'))
  totalChecks++
  if (checkFileContent('src/lib/structured-data.ts', 'SK', 'Slovak structured data')) {
    passedChecks++
  }

  totalChecks++
  if (checkFileContent('src/app/manifest.ts', 'paropriepustné', 'Slovak product description')) {
    passedChecks++
  }

  // Summary
  console.log(colorize('\n📊 Summary:', 'bright'))
  console.log(colorize('=' * 20, 'dim'))

  const percentage = Math.round((passedChecks / totalChecks) * 100)
  const status = percentage >= 90 ? 'green' : percentage >= 75 ? 'yellow' : 'red'

  console.log(`Total checks: ${totalChecks}`)
  console.log(`Passed: ${colorize(passedChecks, 'green')}`)
  console.log(`Failed: ${colorize(totalChecks - passedChecks, 'red')}`)
  console.log(`Score: ${colorize(percentage + '%', status)}`)

  if (percentage >= 90) {
    console.log(colorize('\n🎉 STYRCON website is production-ready!', 'green'))
  } else if (percentage >= 75) {
    console.log(colorize('\n⚠️ STYRCON website needs minor improvements for production.', 'yellow'))
  } else {
    console.log(colorize('\n❌ STYRCON website requires significant improvements before production.', 'red'))
  }

  console.log(colorize('\n💡 Next steps:', 'bright'))
  console.log('  1. Run: npm run build:memory (memory usage analysis)')
  console.log('  2. Run: npm run perf (performance audit)')
  console.log('  3. Run: npm run validate:env (environment validation)')
  console.log('  4. Test PWA features in production build')

  process.exit(percentage >= 75 ? 0 : 1)
}

if (require.main === module) {
  runProductionChecklist()
}

module.exports = { runProductionChecklist }