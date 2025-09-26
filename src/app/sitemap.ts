import { MetadataRoute } from 'next'

/**
 * Dynamic sitemap generation for STYRCON website
 * Includes all static pages and dynamic blog posts
 * Optimized for Slovak thermal insulation business SEO
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://styrcon.sk'
  const currentDate = new Date()

  // Static pages with their priorities and update frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/styrcon-produkt`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/polytex-produkt`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/o-nas`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/galeria`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/polytex-galeria`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/dokumenty`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/aktuality`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Blog post slugs - these should match the static data in [slug]/page.tsx
  const blogPosts = [
    'ako-sa-da-zateplit-vlhka-stavba',
    'styrcon-200-info',
    'blizi-sa-zdrazovanie-klucoveho-materialu',
    'ako-sa-vyznat-v-omietkach',
    'zateplena-tvarnica-styrcon',
    'ceny-komodit',
    'vyvoj-cien-styrcon-u'
  ]

  // Generate blog post URLs
  const blogSitemap: MetadataRoute.Sitemap = blogPosts.map(slug => ({
    url: `${baseUrl}/aktuality/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogSitemap]
}