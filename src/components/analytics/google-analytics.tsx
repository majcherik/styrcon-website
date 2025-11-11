'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { env } from '@/lib/config/env'

const COOKIE_CONSENT_KEY = 'styrcon-cookie-consent'
const COOKIE_PREFERENCES_KEY = 'styrcon-cookie-preferences'

/**
 * Advanced Google Analytics integration for Slovak STYRCON website
 * Optimized script loading with conditional strategies and Slovak business tracking
 * GDPR-compliant: Only loads if user accepts analytical cookies
 */
export function GoogleAnalytics() {
  // Only load in production and if GA ID is configured
  if (!env.NEXT_PUBLIC_GA_ID) {
    return null
  }

  const [isLoaded, setIsLoaded] = useState(false)
  const [loadingStrategy, setLoadingStrategy] = useState<'afterInteractive' | 'lazyOnload'>('afterInteractive')
  const [hasConsent, setHasConsent] = useState(false)

  // Check for cookie consent
  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
      const preferences = localStorage.getItem(COOKIE_PREFERENCES_KEY)

      if (consent === 'accepted') {
        // User accepted all cookies
        setHasConsent(true)
      } else if (consent === 'customized' && preferences) {
        // User customized preferences - check if analytical is enabled
        try {
          const prefs = JSON.parse(preferences)
          setHasConsent(prefs.analytical === true)
        } catch (e) {
          setHasConsent(false)
        }
      } else {
        // No consent or rejected
        setHasConsent(false)
      }
    }

    checkConsent()

    // Listen for storage changes (when user updates preferences in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === COOKIE_CONSENT_KEY || e.key === COOKIE_PREFERENCES_KEY) {
        checkConsent()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  useEffect(() => {
    // Determine optimal loading strategy based on device and connection
    const determineLoadingStrategy = () => {
      // Check for low-end devices or slow connections
      const connection = (navigator as any)?.connection
      const isSlowConnection = connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g'
      const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2

      if (isSlowConnection || isLowEndDevice) {
        setLoadingStrategy('lazyOnload')
      } else {
        setLoadingStrategy('afterInteractive')
      }
    }

    determineLoadingStrategy()
  }, [])

  const handleScriptLoad = () => {
    setIsLoaded(true)
    console.log('📊 Google Analytics loaded for STYRCON website with strategy:', loadingStrategy)

    // Enhanced Slovak business tracking initialization
    if (typeof window.gtag === 'function') {
      // Track Slovak market performance
      window.gtag('event', 'analytics_loaded', {
        loading_strategy: loadingStrategy,
        market_region: 'slovakia',
        business_sector: 'thermal_insulation',
        load_time: performance.now()
      })
    }
  }

  const handleScriptError = (error: Event) => {
    console.warn('❌ Failed to load Google Analytics:', error)

    // Fallback analytics for Slovak business insights
    if ('sendBeacon' in navigator) {
      navigator.sendBeacon('/api/analytics-fallback', JSON.stringify({
        event: 'analytics_load_failed',
        market: 'slovakia',
        timestamp: new Date().toISOString()
      }))
    }
  }

  // Only render GA scripts if user has given consent
  if (!hasConsent) {
    return null
  }

  return (
    <>
      {/* Google Analytics gtag script with optimized loading */}
      <Script
        strategy={loadingStrategy}
        src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GA_ID}`}
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />

      {/* Enhanced Google Analytics initialization for Slovak business */}
      <Script
        id="google-analytics-enhanced-init"
        strategy={loadingStrategy}
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Advanced Slovak business configuration
            gtag('config', '${env.NEXT_PUBLIC_GA_ID}', {
              // Slovak thermal insulation business context
              custom_map: {
                'business_country': 'SK',
                'business_sector': 'thermal_insulation',
                'product_category': 'styrcon_polytex',
                'company': 'E-MA SK s.r.o.',
                'brand': 'STYRCON',
                'target_market': 'slovak_construction',
                'business_type': 'distributor'
              },

              // Enhanced performance and privacy settings
              page_title: document.title,
              page_location: window.location.href,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false,

              // Slovak GDPR compliance
              ads_data_redaction: true,
              url_passthrough: false,

              // Advanced measurement for Slovak thermal insulation market
              enhanced_measurements: {
                scrolls: true,
                outbound_clicks: true,
                site_search: true,
                video_engagement: true,
                file_downloads: true,
                page_changes: true
              },

              // Slovak business conversion tracking
              conversion_linker: true,
              send_page_view: false // We'll send custom page views
            });

            // Custom page view with Slovak business context
            gtag('event', 'page_view', {
              business_type: 'thermal_insulation_distributor',
              market_region: 'slovakia',
              language: 'sk',
              currency: 'EUR',
              country: 'Slovakia',
              industry: 'construction_materials',
              product_focus: 'paropriepustne_dosky',
              page_load_strategy: '${loadingStrategy}'
            });

            // Slovak business performance tracking
            gtag('event', 'business_context', {
              market_segment: 'slovak_thermal_insulation',
              product_categories: ['styrcon', 'polytex'],
              business_model: 'b2b_distribution',
              target_customers: ['construction_companies', 'architects', 'contractors'],
              geographic_focus: 'slovakia_czech_republic'
            });

            // Enhanced Slovak market analytics
            if ('connection' in navigator) {
              gtag('event', 'connection_type', {
                effective_type: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                market: 'slovakia'
              });
            }

            // Slovak business user engagement tracking
            let engagementTimer = 0;
            const trackEngagement = () => {
              engagementTimer += 10;
              if (engagementTimer === 30) {
                gtag('event', 'engaged_session_start', {
                  market: 'slovakia',
                  business_focus: 'styrcon_products'
                });
              }
            };
            setInterval(trackEngagement, 10000);

            // Slovak technical document download tracking
            document.addEventListener('click', function(e) {
              const target = e.target.closest('a');
              if (target && target.href) {
                const url = target.href.toLowerCase();
                if (url.includes('.pdf') || url.includes('download') || url.includes('dokument')) {
                  gtag('event', 'file_download', {
                    file_name: target.href.split('/').pop(),
                    file_extension: url.includes('.pdf') ? 'pdf' : 'other',
                    download_context: 'slovak_technical_docs',
                    business_category: url.includes('styrcon') ? 'styrcon' :
                                     url.includes('polytex') ? 'polytex' : 'general'
                  });
                }
              }
            });
          `
        }}
      />

      {/* Slovak business performance monitoring */}
      {isLoaded && (
        <Script
          id="slovak-business-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              // Advanced Slovak market insights
              const trackSlovakBusinessMetrics = () => {
                // Track time spent on key Slovak business pages
                const currentPath = window.location.pathname;
                const businessPages = {
                  '/styrcon-produkt': 'styrcon_product_page',
                  '/polytex-produkt': 'polytex_product_page',
                  '/kontakt': 'contact_page',
                  '/dokumenty': 'documents_page',
                  '/galeria': 'gallery_page'
                };

                if (businessPages[currentPath]) {
                  let timeOnPage = 0;
                  const trackTime = setInterval(() => {
                    timeOnPage += 5;
                    if (timeOnPage === 30) {
                      gtag('event', 'business_page_engagement', {
                        page_type: businessPages[currentPath],
                        engagement_duration: '30_seconds',
                        market: 'slovakia'
                      });
                    } else if (timeOnPage === 60) {
                      gtag('event', 'business_page_deep_engagement', {
                        page_type: businessPages[currentPath],
                        engagement_duration: '60_seconds',
                        market: 'slovakia'
                      });
                      clearInterval(trackTime);
                    }
                  }, 5000);
                }

                // Track Slovak search queries
                const searchInput = document.querySelector('input[type="search"], input[name*="search"]');
                if (searchInput) {
                  searchInput.addEventListener('change', function(e) {
                    const query = e.target.value.toLowerCase();
                    gtag('event', 'search', {
                      search_term: query,
                      search_context: 'slovak_site_search',
                      market: 'slovakia'
                    });
                  });
                }
              };

              // Initialize Slovak business tracking
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', trackSlovakBusinessMetrics);
              } else {
                trackSlovakBusinessMetrics();
              }
            `
          }}
        />
      )}
    </>
  )
}