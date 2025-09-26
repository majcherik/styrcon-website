#!/usr/bin/env node

/**
 * Development utilities for optimizing workflow
 * Includes project health checks, bundle analysis, and development tips
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Color utilities
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

function log(message, color = 'reset') {
  console.log(colorize(message, color))
}

// Development workflow commands
const commands = {
  'health': () => checkProjectHealth(),
  'deps': () => checkDependencies(),
  'perf': () => checkPerformance(),
  'tips': () => showDevelopmentTips(),
  'analyze': () => analyzeBundles(),
  'help': () => showHelp(),
}

function showHelp() {
  log('🛠️  STYRCON Development Utils', 'cyan')
  log('=' * 40, 'dim')
  log('')
  log('Available commands:', 'bright')
  log('  npm run dev:utils health  - Check project health', 'green')
  log('  npm run dev:utils deps    - Analyze dependencies', 'green')
  log('  npm run dev:utils perf    - Performance analysis', 'green')
  log('  npm run dev:utils tips    - Development tips', 'green')
  log('  npm run dev:utils analyze - Bundle analysis', 'green')
  log('')
  log('Quick development commands:', 'bright')
  log('  npm run dev:turbo         - Start with Turbopack (faster)', 'yellow')
  log('  npm run dev:safe          - Clean start (if issues)', 'yellow')
  log('  npm run validate:env      - Check environment config', 'yellow')
  log('  npm run build:analyze     - Build with bundle analysis', 'yellow')
  log('')
}

function checkProjectHealth() {
  log('🏥 Project Health Check', 'cyan')
  log('=' * 30, 'dim')

  const checks = [
    {
      name: 'Node version',
      check: () => {
        const version = process.version
        const major = parseInt(version.slice(1).split('.')[0])
        return major >= 18 ? `✅ ${version}` : `❌ ${version} (need >=18)`
      }
    },
    {
      name: 'Package.json',
      check: () => fs.existsSync('package.json') ? '✅ Found' : '❌ Missing'
    },
    {
      name: 'Next.js config',
      check: () => fs.existsSync('next.config.ts') ? '✅ TypeScript config' : fs.existsSync('next.config.js') ? '✅ JavaScript config' : '❌ Missing'
    },
    {
      name: 'TypeScript config',
      check: () => fs.existsSync('tsconfig.json') ? '✅ Configured' : '⚠️  Missing'
    },
    {
      name: 'Tailwind config',
      check: () => fs.existsSync('tailwind.config.ts') || fs.existsSync('tailwind.config.js') ? '✅ Configured' : '❌ Missing'
    },
    {
      name: 'Environment files',
      check: () => {
        const local = fs.existsSync('.env.local')
        const example = fs.existsSync('.env.example')
        if (local && example) return '✅ Both .env.local and .env.example'
        if (example) return '⚠️  Only .env.example (copy to .env.local)'
        return '❌ Missing environment files'
      }
    },
    {
      name: 'Git repository',
      check: () => fs.existsSync('.git') ? '✅ Git initialized' : '⚠️  No git repository'
    },
    {
      name: 'Node modules',
      check: () => fs.existsSync('node_modules') ? '✅ Dependencies installed' : '❌ Run npm install'
    }
  ]

  checks.forEach(({ name, check }) => {
    const result = check()
    log(`  ${name}: ${result}`)
  })

  log('')
}

function checkDependencies() {
  log('📦 Dependency Analysis', 'cyan')
  log('=' * 25, 'dim')

  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

    log(`Total dependencies: ${Object.keys(packageJson.dependencies || {}).length}`, 'bright')
    log(`Dev dependencies: ${Object.keys(packageJson.devDependencies || {}).length}`, 'bright')

    // Check for large packages
    const largeDeps = [
      '@clerk/nextjs',
      'framer-motion',
      '@radix-ui/react-*',
      'next'
    ]

    log('\nLarge dependencies (check for tree-shaking):', 'yellow')
    largeDeps.forEach(dep => {
      const hasExactDep = packageJson.dependencies?.[dep]
      const hasPatternDep = Object.keys(packageJson.dependencies || {}).some(key => key.includes(dep.replace('*', '')))

      if (hasExactDep || hasPatternDep) {
        log(`  📦 ${dep} - Consider optimizePackageImports`, 'dim')
      }
    })

    // Check for outdated patterns
    const devDeps = packageJson.dependencies || {}
    if (devDeps['react'] && devDeps['react'].startsWith('^18')) {
      log('  ✅ Using React 18+', 'green')
    }
    if (devDeps['next'] && parseFloat(devDeps['next'].replace('^', '')) >= 13) {
      log('  ✅ Using Next.js 13+ (App Router)', 'green')
    }

  } catch (error) {
    log('❌ Failed to read package.json', 'red')
  }

  log('')
}

function checkPerformance() {
  log('⚡ Performance Analysis', 'cyan')
  log('=' * 25, 'dim')

  // Check bundle size (requires .next folder)
  if (fs.existsSync('.next')) {
    try {
      log('Build artifacts found:', 'bright')
      log('  ✅ .next folder exists')
      log('  💡 Run "npm run build:analyze" for detailed bundle analysis')
    } catch (error) {
      log('⚠️  Cannot analyze build artifacts', 'yellow')
    }
  } else {
    log('⚠️  No build artifacts found. Run "npm run build" first.', 'yellow')
  }

  // Check for performance optimizations
  const nextConfig = fs.existsSync('next.config.ts') || fs.existsSync('next.config.js')
  if (nextConfig) {
    log('\nNext.js optimizations:', 'bright')
    log('  ✅ Custom Next.js configuration')
    log('  💡 Check optimizePackageImports in next.config')
    log('  💡 Turbopack enabled for dev (use npm run dev:turbo)')
  }

  log('')
  log('Performance tips:', 'bright')
  log('  • Use dynamic imports for large components')
  log('  • Optimize images with next/image')
  log('  • Use React.memo for expensive components')
  log('  • Consider Server Components for static content')
  log('')
}

function showDevelopmentTips() {
  log('💡 Development Tips', 'cyan')
  log('=' * 20, 'dim')

  log('\n🚀 Speed up development:', 'bright')
  log('  • Use "npm run dev:turbo" for faster builds')
  log('  • Enable VSCode TypeScript hero extensions')
  log('  • Use path aliases (@components, @lib, etc.)')
  log('  • Leverage React DevTools and Next.js DevTools')

  log('\n🛠️  Debugging:', 'bright')
  log('  • Source maps enabled in development')
  log('  • Use React DevTools Profiler for performance')
  log('  • Check Network tab for bundle sizes')
  log('  • Use Lighthouse for performance audits')

  log('\n📦 Import optimization:', 'bright')
  log('  • Use tree-shakable imports: import { Button } from "@ui/button"')
  log('  • Avoid default imports from large libraries')
  log('  • Use dynamic imports for code splitting')
  log('  • Check bundle analyzer for large dependencies')

  log('\n🔧 Workflow optimization:', 'bright')
  log('  • Set up ESLint and Prettier in your editor')
  log('  • Use TypeScript strict mode')
  log('  • Enable format on save')
  log('  • Use Git hooks for code quality')

  log('')
}

function analyzeBundles() {
  log('📊 Bundle Analysis', 'cyan')
  log('=' * 20, 'dim')

  if (!fs.existsSync('.next')) {
    log('⚠️  No build found. Run "npm run build" first.', 'yellow')
    return
  }

  log('Bundle analysis available:', 'bright')
  log('  1. Run "npm run build:analyze" for interactive analysis')
  log('  2. Check .next/analyze/ folder for reports')
  log('  3. Use "npm run perf" for Lighthouse analysis')

  // Check for common bundle issues
  const staticDir = '.next/static'
  if (fs.existsSync(staticDir)) {
    try {
      const chunks = fs.readdirSync(path.join(staticDir, 'chunks')).filter(f => f.endsWith('.js'))
      log(`\nFound ${chunks.length} JavaScript chunks`, 'dim')

      // Find large chunks
      const largeChunks = []
      chunks.forEach(chunk => {
        const filePath = path.join(staticDir, 'chunks', chunk)
        const stats = fs.statSync(filePath)
        const sizeKB = Math.round(stats.size / 1024)

        if (sizeKB > 100) {
          largeChunks.push({ name: chunk, size: sizeKB })
        }
      })

      if (largeChunks.length > 0) {
        log('\n⚠️  Large chunks found:', 'yellow')
        largeChunks.forEach(({ name, size }) => {
          log(`  • ${name}: ${size}KB`)
        })
        log('\n💡 Consider code splitting for chunks > 100KB')
      } else {
        log('\n✅ No unusually large chunks detected', 'green')
      }

    } catch (error) {
      log('⚠️  Could not analyze chunks', 'yellow')
    }
  }

  log('')
}

// Main execution
function main() {
  const command = process.argv[2] || 'help'

  if (commands[command]) {
    commands[command]()
  } else {
    log(`❌ Unknown command: ${command}`, 'red')
    log('Run "npm run dev:utils help" for available commands.', 'dim')
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

module.exports = { commands }