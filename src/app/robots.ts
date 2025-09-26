import { MetadataRoute } from 'next'

/**
 * Dynamic robots.txt generation for STYRCON website
 * Optimized for Slovak thermal insulation business SEO
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://styrcon.sk'

  return {
    rules: [
      // Main crawlers - full access
      {
        userAgent: ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot'],
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/prihlasenie/',
          '/registracia/',
          '/profil/',
          '/auth/',
          '/_next/',
          '/tmp/',
          '*.json',
          '*.log'
        ],
      },
      // General crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/prihlasenie/',
          '/registracia/',
          '/profil/',
          '/auth/',
          '/_next/',
          '/tmp/',
          '*.json',
          '*.log',
          '/scroll-demo' // Demo pages
        ],
        crawlDelay: 1,
      },
      // Block problematic crawlers
      {
        userAgent: [
          'CCBot',
          'ChatGPT-User',
          'GPTBot',
          'Google-Extended',
          'anthropic-ai'
        ],
        disallow: '/',
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}