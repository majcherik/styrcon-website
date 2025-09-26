// Structured data helpers for SEO

// Enhanced LocalBusiness schema for better local SEO
export const localBusinessStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/#organization`,
  name: 'E-MA SK s.r.o.',
  alternateName: ['E-MA Slovakia', 'STYRCON Slovakia'],
  description: 'Komerčný a exportný partner pre STYRCON tepelnoizolačné dosky. Profesionálne riešenia pre zateplenie budov na Slovensku.',
  url: process.env.NEXT_PUBLIC_SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.svg`,
    width: 200,
    height: 60
  },
  image: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
  foundingDate: '2020-01-01',
  legalName: 'E-MA SK s.r.o.',
  taxID: 'SK-TAX-ID', // Update with actual tax ID
  vatID: 'SK-VAT-ID', // Update with actual VAT ID
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jelenec',
    addressLocality: 'Jelenec',
    addressRegion: 'Nitriansky kraj',
    postalCode: '916 21',
    addressCountry: 'SK'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 48.3164,
    longitude: 18.1711
  },
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
        closes: '17:00',
        validFrom: '2020-01-01'
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

// Enhanced STYRCON Product schema for better rich snippets
export const styrconProductSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/styrcon-produkt#product`,
  name: 'STYRCON Paropriepustné Tepelnoizolačné Dosky',
  description: 'Nehorľavé paropriepustné tepelnoizolačné dosky triedy A1 pre profesionálne zateplenie budov. Jedinečná kombinácia tepelnej izolácie a paropriepustnosti.',
  category: 'Building Materials > Insulation > Thermal Insulation',
  brand: {
    '@type': 'Brand',
    name: 'STYRCON',
    manufacturer: {
      '@type': 'Organization',
      name: 'Styrcon s.r.o.',
      url: 'https://www.styrcon.sk'
    }
  },
  image: [
    `${process.env.NEXT_PUBLIC_SITE_URL}/images/styrcon-product-1.jpg`,
    `${process.env.NEXT_PUBLIC_SITE_URL}/images/styrcon-product-2.jpg`
  ],
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Trieda nehorľavosti',
      value: 'A1',
      description: 'Najvyššia trieda požiarnej bezpečnosti podľa EN 13501-1'
    },
    {
      '@type': 'PropertyValue',
      name: 'Faktor difúzneho odporu',
      value: '≤ 3',
      unitText: 'μ',
      description: 'Výnimočná paropriepustnosť'
    },
    {
      '@type': 'PropertyValue',
      name: 'Tepelná vodivosť',
      value: '0,041',
      unitText: 'W/mK',
      description: 'Nízka tepelná vodivosť pre výbornú izoláciu'
    },
    {
      '@type': 'PropertyValue',
      name: 'Pevnosť v tlaku',
      value: '≥ 150',
      unitText: 'kPa',
      description: 'Pri 10% deformácii'
    }
  ],
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'EUR',
    seller: {
      '@type': 'Organization',
      name: 'E-MA SK s.r.o.',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/#organization`
    },
    areaServed: 'SK',
    businessFunction: 'https://purl.org/goodrelations/v1#Sell'
  },
  applicationArea: [
    'Thermal insulation of buildings',
    'Renovation of historic buildings',
    'Insulation of damp structures',
    'Fire-resistant insulation systems'
  ]
}

// FAQ Schema for STYRCON products
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/styrcon-produkt#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Aká je trieda nehorľavosti STYRCON dosiek?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'STYRCON dosky majú najvyššiu triedu nehorľavosti A1 podľa normy EN 13501-1, čo znamená, že neprisievajú k požiaru a neprodukujú toxické výpary.'
      }
    },
    {
      '@type': 'Question',
      name: 'Sú STYRCON dosky paropriepustné?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Áno, STYRCON dosky majú výnimočnú paropriepustnosť s faktorom difúzneho odporu μ ≤ 3, čo umožňuje prirodzené vysychanie murív a zabraňuje kondenzácii vlhkosti.'
      }
    },
    {
      '@type': 'Question',
      name: 'Aká je tepelná vodivosť STYRCON dosiek?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'STYRCON dosky majú tepelnú vodivosť λ = 0,041 W/mK, čo zaručuje výbornú tepelnú izoláciu a úsporu energie pri vykurovaní.'
      }
    },
    {
      '@type': 'Question',
      name: 'Na aké aplikácie sa STYRCON dosky hodia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'STYRCON dosky jsou ideálne pre zatepľovanie budov, sanáciu vlhkých stavieb, renováciu historických budov a všade tam, kde je potrebná kombinácia tepelnej izolácie a paropriepustnosti.'
      }
    }
  ]
}

// Keep backward compatibility
export const organizationStructuredData = localBusinessStructuredData