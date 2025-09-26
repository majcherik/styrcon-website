/**
 * Enhanced Font Configuration for Slovak STYRCON Website
 * Optimized typography for Slovak language with proper diacritics support
 * Focus on thermal insulation business professional appearance
 */

import { Inter, Roboto, Open_Sans, Source_Sans_3 } from 'next/font/google'

/**
 * Primary font - Inter with Slovak language optimization
 * Excellent support for Slovak diacritics: ľščťžýáíéúňôäô
 */
export const inter = Inter({
  subsets: ['latin', 'latin-ext'], // latin-ext crucial for Slovak characters
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true, // Reduces layout shift
})

/**
 * Professional font for business documents and technical specifications
 * Excellent readability for Slovak technical terminology
 */
export const roboto = Roboto({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-roboto',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  fallback: ['Inter', 'system-ui', 'arial'],
  adjustFontFallback: true,
})

/**
 * Alternative sans-serif for specific Slovak business sections
 * Great for technical documentation and certifications
 */
export const openSans = Open_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-open-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  fallback: ['Inter', 'system-ui', 'arial'],
  adjustFontFallback: true,
})

/**
 * Professional font for headings and Slovak business branding
 * Excellent for STYRCON branding and Slovak market presentation
 */
export const sourceSans3 = Source_Sans_3({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-source-sans-3',
  display: 'swap',
  weight: ['300', '400', '600', '700', '900'],
  fallback: ['Inter', 'system-ui', 'arial'],
  adjustFontFallback: true,
})

/**
 * Note: Local brand fonts can be added here when available
 * For now, using Google Fonts for reliable Slovak diacritics support
 */

/**
 * Font loading optimization for Slovak market
 */
export const fontLoadingOptimization = {
  // Critical fonts for above-the-fold Slovak content
  critical: [inter],

  // Important fonts for Slovak business sections
  important: [roboto, sourceSans3],

  // Secondary fonts for specific sections
  secondary: [openSans],
}

/**
 * Slovak typography configuration
 */
export const slovakTypographyConfig = {
  // Font sizes optimized for Slovak text readability
  sizes: {
    'xs': '0.75rem',      // 12px - Small labels, captions
    'sm': '0.875rem',     // 14px - Secondary text
    'base': '1rem',       // 16px - Base Slovak text
    'lg': '1.125rem',     // 18px - Enhanced readability for Slovak
    'xl': '1.25rem',      // 20px - Subheadings
    '2xl': '1.5rem',      // 24px - Section headings
    '3xl': '1.875rem',    // 30px - Page headings
    '4xl': '2.25rem',     // 36px - Hero headings
    '5xl': '3rem',        // 48px - Large display text
  },

  // Line heights optimized for Slovak diacritics
  lineHeights: {
    'tight': '1.25',      // Headings with diacritics
    'snug': '1.375',      // Subheadings
    'normal': '1.5',      // Body text - optimal for Slovak
    'relaxed': '1.625',   // Enhanced readability
    'loose': '2',         // Technical documentation
  },

  // Letter spacing for Slovak professional text
  letterSpacing: {
    'tighter': '-0.025em',
    'tight': '-0.0125em',
    'normal': '0em',
    'wide': '0.025em',    // Good for Slovak headings
    'wider': '0.05em',
    'widest': '0.1em',
  },

  // Font weights for Slovak business hierarchy
  fontWeights: {
    'light': '300',       // Light text, captions
    'normal': '400',      // Body text
    'medium': '500',      // Emphasis
    'semibold': '600',    // Subheadings
    'bold': '700',        // Headings, strong emphasis
    'extrabold': '800',   // Hero text, branding
  },
}

/**
 * CSS custom properties for Slovak typography
 */
export const slovakTypographyCSS = `
  :root {
    /* Primary font family with Slovak support */
    --font-primary: ${inter.style.fontFamily}, system-ui, -apple-system, sans-serif;

    /* Professional font for business content */
    --font-business: ${roboto.style.fontFamily}, var(--font-primary);

    /* Headings font with Slovak character support */
    --font-headings: ${sourceSans3.style.fontFamily}, var(--font-primary);

    /* Technical documentation font */
    --font-technical: ${openSans.style.fontFamily}, var(--font-primary);

    /* Brand font for STYRCON/E-MA branding */
    --font-brand: var(--font-headings);

    /* Slovak-optimized text rendering */
    --text-rendering: optimizeLegibility;
    --font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
    --font-variant-ligatures: common-ligatures contextual;
  }

  /* Enhanced rendering for Slovak diacritics */
  body {
    font-feature-settings: var(--font-feature-settings);
    font-variant-ligatures: var(--font-variant-ligatures);
    text-rendering: var(--text-rendering);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Slovak headings optimization */
  h1, h2, h3, h4, h5, h6 {
    font-feature-settings: "kern" 1, "liga" 1;
    letter-spacing: -0.0125em;
  }

  /* Technical content specific styling */
  .technical-content {
    font-family: var(--font-technical);
    font-feature-settings: "tnum" 1, "kern" 1;
  }

  /* Slovak business content styling */
  .business-content {
    font-family: var(--font-business);
    line-height: 1.6;
  }
`

/**
 * Preload configuration for critical fonts
 */
export const fontPreloadConfig = [
  {
    href: inter.src,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
]

/**
 * Font loading strategy for Slovak market optimization
 */
export const slovakFontLoadingStrategy = {
  // Phase 1: Critical path fonts
  critical: {
    fonts: [inter],
    strategy: 'preload',
    priority: 'high',
  },

  // Phase 2: Important business fonts
  important: {
    fonts: [roboto, sourceSans3],
    strategy: 'prefetch',
    priority: 'medium',
  },

  // Phase 3: Secondary fonts
  secondary: {
    fonts: [openSans],
    strategy: 'lazy',
    priority: 'low',
  },
}

/**
 * Performance metrics for Slovak typography
 */
export interface SlovakTypographyMetrics {
  loadingTime: number
  renderingQuality: 'excellent' | 'good' | 'fair'
  diacriticsSupport: boolean
  businessReadability: number // 1-10 scale
}

/**
 * Utility function to get optimal font for Slovak business content
 */
export function getOptimalSlovakFont(contentType: 'heading' | 'body' | 'technical' | 'brand'): string {
  switch (contentType) {
    case 'heading':
      return `var(--font-headings)`
    case 'body':
      return `var(--font-primary)`
    case 'technical':
      return `var(--font-technical)`
    case 'brand':
      return `var(--font-brand)`
    default:
      return `var(--font-primary)`
  }
}