'use cache'

/**
 * Static Data Cache for Slovak STYRCON Website
 * Implements Next.js 15 use cache directive for optimal performance
 * Optimized for Slovak thermal insulation business content
 */

import { unstable_cache as cache } from 'next/cache'

// Types for Slovak business data
interface STYRCONProduct {
  id: string
  name: string
  category: 'styrcon' | 'polytex' | 'accessories'
  description: string
  technicalSpecs: {
    thermalConductivity: number
    fireResistance: string
    vaporPermeability: number
    density: number
  }
  applications: string[]
  certifications: string[]
  downloadLinks: {
    technicalSheet: string
    certificate: string
    applicationGuide: string
  }
  slovakKeywords: string[]
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: 'technicke' | 'projekty' | 'novinky'
  publishedAt: string
  author: string
  tags: string[]
  image: string
  readingTime: number
}

interface TechnicalDocument {
  id: string
  title: string
  category: 'certifikaty' | 'technicke-listy' | 'navody'
  fileUrl: string
  description: string
  language: 'sk' | 'en' | 'de'
  fileSize: string
  lastUpdated: string
}

// Cached STYRCON product data fetcher
export const getCachedSTYRCONProducts = cache(
  async (): Promise<STYRCONProduct[]> => {
    // Simulate API call - replace with actual data source
    const products: STYRCONProduct[] = [
      {
        id: 'styrcon-basic',
        name: 'STYRCON Basic',
        category: 'styrcon',
        description: 'Základné paropriepustné tepelnoizolačné dosky triedy A1',
        technicalSpecs: {
          thermalConductivity: 0.042,
          fireResistance: 'A1',
          vaporPermeability: 3,
          density: 135
        },
        applications: ['Zatepľovanie fasád', 'Sanačné zatepľovanie', 'Vnútorné zatepľovanie'],
        certifications: ['CE', 'STN', 'ETA'],
        downloadLinks: {
          technicalSheet: '/docs/styrcon-basic-technicke-udaje.pdf',
          certificate: '/docs/styrcon-basic-certifikat.pdf',
          applicationGuide: '/docs/styrcon-basic-navod.pdf'
        },
        slovakKeywords: ['paropriepustné dosky', 'nehorľavá izolácia', 'zateplenie budov']
      },
      {
        id: 'styrcon-plus',
        name: 'STYRCON Plus',
        category: 'styrcon',
        description: 'Vylepšené paropriepustné dosky s vyššou tepelnou izoláciou',
        technicalSpecs: {
          thermalConductivity: 0.038,
          fireResistance: 'A1',
          vaporPermeability: 2.5,
          density: 140
        },
        applications: ['Pasívne domy', 'Energetická sanácia', 'Historické budovy'],
        certifications: ['CE', 'STN', 'ETA', 'PassivHaus'],
        downloadLinks: {
          technicalSheet: '/docs/styrcon-plus-technicke-udaje.pdf',
          certificate: '/docs/styrcon-plus-certifikat.pdf',
          applicationGuide: '/docs/styrcon-plus-navod.pdf'
        },
        slovakKeywords: ['pasívne domy', 'energetická úspora', 'tepelná izolácia']
      },
      {
        id: 'polytex-standard',
        name: 'POLYTEX Standard',
        category: 'polytex',
        description: 'Flexibilné tepelnoizolačné materiály pre rôzne aplikácie',
        technicalSpecs: {
          thermalConductivity: 0.045,
          fireResistance: 'B1',
          vaporPermeability: 4,
          density: 120
        },
        applications: ['Podlahy', 'Strechy', 'Steny'],
        certifications: ['CE', 'STN'],
        downloadLinks: {
          technicalSheet: '/docs/polytex-standard-technicke-udaje.pdf',
          certificate: '/docs/polytex-standard-certifikat.pdf',
          applicationGuide: '/docs/polytex-standard-navod.pdf'
        },
        slovakKeywords: ['flexibilná izolácia', 'podlahové kúrenie', 'strešné zateplenie']
      }
    ]

    return products
  },
  ['styrcon-products'],
  {
    revalidate: 3600, // Revalidate every hour
    tags: ['products', 'styrcon']
  }
)

// Cached blog posts fetcher
export const getCachedBlogPosts = cache(
  async (): Promise<BlogPost[]> => {
    // Simulate API call - replace with actual CMS data
    const posts: BlogPost[] = [
      {
        id: 'ako-sa-da-zateplit-vlhka-stavba',
        title: 'Ako sa dá zatepliť vlhká stavba?',
        slug: 'ako-sa-da-zateplit-vlhka-stavba',
        excerpt: 'Praktický návod na zatepľovanie vlhkých budov s STYRCON riešeniami.',
        content: 'Full content here...',
        category: 'technicke',
        publishedAt: '2024-03-15',
        author: 'RNDr. Vladimír Libant',
        tags: ['zatepľovanie', 'vlhkosť', 'paropriepustnosť'],
        image: 'https://www.e-ma.sk/imgcache/e-img-449.jpg?v=1632883952',
        readingTime: 8
      },
      {
        id: 'styrcon-200-info',
        title: 'STYRCON 200 - Info',
        slug: 'styrcon-200-info',
        excerpt: 'Informácie o produkte STYRCON 200 a jeho vlastnostiach.',
        content: 'Full content here...',
        category: 'technicke',
        publishedAt: '2024-03-12',
        author: 'Admin',
        tags: ['styrcon-200', 'technické údaje', 'produkty'],
        image: 'https://www.e-ma.sk/imgcache/styrcon-200-preview.jpg',
        readingTime: 6
      },
      {
        id: 'blizi-sa-zdrazovanie-klucoveho-materialu',
        title: 'Blíži sa zdražovanie kľúčového materiálu',
        slug: 'blizi-sa-zdrazovanie-klucoveho-materialu',
        excerpt: 'Analýza nadchádzajúceho zdražovania stavebných materiálov a dopad na projekty.',
        content: 'Full content here...',
        category: 'novinky',
        publishedAt: '2024-03-08',
        author: 'Admin',
        tags: ['ceny', 'materiály', 'trh'],
        image: 'https://www.e-ma.sk/imgcache/price-increase-preview.jpg',
        readingTime: 5
      },
      {
        id: 'ako-sa-vyznat-v-omietkach',
        title: 'Ako sa vyznať v omietkach',
        slug: 'ako-sa-vyznat-v-omietkach',
        excerpt: 'Komplexný prehľad minerálnych a pastovitých omietok.',
        content: 'Full content here...',
        category: 'technicke',
        publishedAt: '2024-03-05',
        author: 'Admin',
        tags: ['omietky', 'minerálne', 'akrylátové', 'silikónové'],
        image: 'https://www.e-ma.sk/imgcache/ako-sa-vyznat-v-omietkach-e-news-86-5-400-300-0-ffffff.jpg?v=1633613713',
        readingTime: 10
      },
      {
        id: 'zateplena-tvarnica-styrcon',
        title: 'Zateplená tvárnica STYRCON',
        slug: 'zateplena-tvarnica-styrcon',
        excerpt: 'Nová generácia tepelnoizolačných dosiek pre murivo.',
        content: 'Full content here...',
        category: 'technicke',
        publishedAt: '2024-03-01',
        author: 'Admin',
        tags: ['tvárnica', 'murivo', 'zatepľovanie'],
        image: 'https://www.e-ma.sk/imgcache/styrcon-tvarnica-preview.jpg',
        readingTime: 7
      },
      {
        id: 'ceny-komodit',
        title: 'Ceny komodít',
        slug: 'ceny-komodit',
        excerpt: 'Aktuálny prehľad cien stavebných komodít na trhu.',
        content: 'Full content here...',
        category: 'novinky',
        publishedAt: '2024-02-28',
        author: 'Admin',
        tags: ['ceny', 'komodity', 'trh'],
        image: 'https://www.e-ma.sk/imgcache/commodity-prices-preview.jpg',
        readingTime: 4
      },
      {
        id: 'vyvoj-cien-styrcon-u',
        title: 'Vývoj cien STYRCON-u',
        slug: 'vyvoj-cien-styrcon-u',
        excerpt: 'Analýza vývoja cien STYRCON produktov v poslednom období.',
        content: 'Full content here...',
        category: 'novinky',
        publishedAt: '2024-02-25',
        author: 'Admin',
        tags: ['ceny', 'styrcon', 'vývoj'],
        image: 'https://www.e-ma.sk/imgcache/styrcon-price-development-preview.jpg',
        readingTime: 6
      }
    ]

    return posts
  },
  ['blog-posts'],
  {
    revalidate: 1800, // Revalidate every 30 minutes
    tags: ['blog', 'articles']
  }
)

// Cached technical documents fetcher
export const getCachedTechnicalDocuments = cache(
  async (): Promise<TechnicalDocument[]> => {
    const documents: TechnicalDocument[] = [
      {
        id: 'styrcon-ce-certificate',
        title: 'STYRCON CE Certifikát',
        category: 'certifikaty',
        fileUrl: '/docs/styrcon-ce-certifikat-2024.pdf',
        description: 'Oficiálny CE certifikát pre STYRCON tepelnoizolačné dosky',
        language: 'sk',
        fileSize: '2.3 MB',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'styrcon-installation-guide',
        title: 'STYRCON Montážny návod',
        category: 'navody',
        fileUrl: '/docs/styrcon-montazny-navod-2024.pdf',
        description: 'Komplexný návod na správnu inštaláciu STYRCON dosiek',
        language: 'sk',
        fileSize: '5.7 MB',
        lastUpdated: '2024-02-01'
      },
      {
        id: 'styrcon-technical-specs',
        title: 'STYRCON Technické špecifikácie',
        category: 'technicke-listy',
        fileUrl: '/docs/styrcon-technicke-specifikacie-2024.pdf',
        description: 'Detailné technické údaje všetkých STYRCON produktov',
        language: 'sk',
        fileSize: '3.1 MB',
        lastUpdated: '2024-01-30'
      }
    ]

    return documents
  },
  ['technical-documents'],
  {
    revalidate: 7200, // Revalidate every 2 hours
    tags: ['documents', 'technical']
  }
)

// Cached product by ID fetcher
export const getCachedProductById = cache(
  async (productId: string): Promise<STYRCONProduct | null> => {
    const products = await getCachedSTYRCONProducts()
    return products.find(product => product.id === productId) || null
  },
  ['product-by-id'],
  {
    revalidate: 3600,
    tags: ['product', 'single']
  }
)

// Cached blog post by slug fetcher
export const getCachedBlogPostBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    const posts = await getCachedBlogPosts()
    return posts.find(post => post.slug === slug) || null
  },
  ['blog-post-by-slug'],
  {
    revalidate: 1800,
    tags: ['blog', 'single']
  }
)

// Cache invalidation helper for Slovak business updates
export async function revalidateSTYRCONCache() {
  // This would be called when product data changes
  // Implementation depends on your data update strategy
  console.log('STYRCON cache revalidation triggered')
  return Promise.resolve()
}

// Slovak business-specific search cache
export const getCachedProductSearch = cache(
  async (query: string, category?: string): Promise<STYRCONProduct[]> => {
    const products = await getCachedSTYRCONProducts()

    return products.filter(product => {
      const matchesQuery = (
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.slovakKeywords.some(keyword =>
          keyword.toLowerCase().includes(query.toLowerCase())
        )
      )

      const matchesCategory = !category || product.category === category

      return matchesQuery && matchesCategory
    })
  },
  ['product-search'],
  {
    revalidate: 3600,
    tags: ['search', 'products']
  }
)