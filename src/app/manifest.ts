import { MetadataRoute } from 'next'

/**
 * Slovak-localized Web App Manifest for STYRCON website
 * Enables home screen installation and app-like experience
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'STYRCON - Paropriepustné Tepelnoizolačné Dosky',
    short_name: 'STYRCON',
    description: 'Nehorľavé paropriepustné tepelnoizolačné dosky triedy A1 pre profesionálne zateplenie budov na Slovensku. slovakia thermal insulation construction building',

    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1d4ed8', // Primary blue color

    orientation: 'portrait-primary',
    scope: '/',

    lang: 'sk',
    dir: 'ltr',

    categories: [
      'business',
      'construction',
      'building',
      'insulation',
      'thermal'
    ],

    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
    ],
    prefer_related_applications: false,

    // Shortcuts for key Slovak business functions
    shortcuts: [
      {
        name: 'STYRCON Produkt',
        short_name: 'STYRCON',
        description: 'Technické parametre STYRCON dosiek',
        url: '/styrcon-produkt',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },
      {
        name: 'Kontakt',
        short_name: 'Kontakt',
        description: 'Kontaktujte E-MA SK s.r.o.',
        url: '/kontakt',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },
      {
        name: 'Galéria Projektov',
        short_name: 'Galéria',
        description: 'Realizované projekty so STYRCON',
        url: '/galeria',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    ]
  }
}