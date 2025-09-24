// Structured data helpers for SEO

export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'E-MA SK s.r.o.',
  alternateName: 'E-MA Slovakia',
  description: 'Komerčný a exportný partner pre STYRCON tepelnoizolačné dosky. Profesionálne riešenia pre zateplenie budov na Slovensku.',
  url: process.env.NEXT_PUBLIC_SITE_URL,
  logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.svg`,
  foundingDate: '2020', // Update with actual founding date
  legalName: 'E-MA SK s.r.o.',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+421-xxx-xxx-xxx',
      contactType: 'customer service',
      email: 'info@e-ma-sk.com',
      availableLanguage: ['sk', 'en'],
      areaServed: 'SK',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00'
      }
    },
    {
      '@type': 'ContactPoint',
      telephone: '+421-xxx-xxx-xxx',
      contactType: 'sales',
      email: 'predaj@e-ma-sk.com',
      availableLanguage: ['sk']
    }
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Adresa bude doplnená',
    addressLocality: 'Mesto',
    postalCode: 'PSČ',
    addressCountry: 'SK',
    addressRegion: 'Slovensko'
  },
  sameAs: [
    // Social media links will be added here
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'STYRCON produkty',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'STYRCON tepelnoizolačné dosky'
        }
      }
    ]
  },
  keywords: 'styrcon, tepelná izolácia, zateplenie budov, paropriepustné dosky, nehorľavá izolácia, Slovensko',
  areaServed: {
    '@type': 'Country',
    name: 'Slovensko',
    alternateName: 'Slovakia'
  }
};

export const productStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'STYRCON',
  description: 'Paropriepustné tepelnoizolačné dosky triedy A1 s výnimočnou paropriepustnosťou',
  brand: {
    '@type': 'Brand',
    name: 'STYRCON'
  },
  manufacturer: {
    '@type': 'Organization',
    name: 'Styrcon s.r.o.'
  },
  category: 'Building Materials',
  material: 'Minerálna vlna',
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Reakcia na oheň',
      value: 'A1'
    },
    {
      '@type': 'PropertyValue',
      name: 'Tepelná vodivosť',
      value: '0,041 W/mK'
    },
    {
      '@type': 'PropertyValue',
      name: 'Paropriepustnosť',
      value: 'μ ≤ 3'
    }
  ],
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'EUR'
    }
  }
};

export const localBusinessStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'E-MA SK s.r.o.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Adresa bude doplnená',
    addressLocality: 'Mesto',
    addressRegion: 'Región',
    postalCode: 'PSČ',
    addressCountry: 'SK'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 0, // Will be updated with real coordinates
    longitude: 0
  },
  telephone: '+421-xxx-xxx-xxx',
  email: 'info@e-ma-sk.com',
  url: process.env.NEXT_PUBLIC_SITE_URL,
  openingHours: 'Mo-Fr 08:00-17:00',
  priceRange: '$$'
};

export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'STYRCON - E-MA SK s.r.o.',
  url: process.env.NEXT_PUBLIC_SITE_URL,
  description: 'STYRCON paropriepustné tepelnoizolačné dosky triedy A1. E-MA SK s.r.o. - komerčný a exportný partner.',
  inLanguage: 'sk-SK',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
};