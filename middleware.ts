import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { generateNonce, CSP_NONCE_HEADER } from '@/lib/security/nonce'

export function middleware(req: NextRequest) {
  // Generate nonce for this request
  const nonce = generateNonce()

  // Create response
  const response = NextResponse.next();

  // Add enhanced security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  // X-Frame-Options removed - using CSP frame-ancestors instead to avoid conflicts
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Add performance optimization headers
  response.headers.set('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large');
  response.headers.set('Accept-CH', 'Viewport-Width, Width, DPR');
  response.headers.set('Vary', 'Accept-Encoding, Accept, User-Agent');

  // Slovak market optimization
  response.headers.set('X-Market', 'SK');
  response.headers.set('X-Business-Sector', 'thermal-insulation');
  response.headers.set('Content-Language', 'sk');

  // Performance hints for critical resources
  if (req.nextUrl.pathname === '/') {
    response.headers.set('Link', '</styrcon-produkt>; rel=prefetch, </kontakt>; rel=prefetch');
  }

  // Pass nonce to the app
  response.headers.set(CSP_NONCE_HEADER, nonce);

  // Advanced nonce-based CSP for better security
  const isDev = process.env.NODE_ENV === 'development'

  const csp = [
    "default-src 'self'",
    // Script sources with nonce and strict-dynamic
    isDev
      ? `script-src 'self' 'nonce-${nonce}' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com`
      : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com`,
    // Style sources with nonce
    isDev
      ? `style-src 'self' 'nonce-${nonce}' 'unsafe-inline' https://fonts.googleapis.com`
      : `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com`,
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://*.e-ma.sk https://*.styrcon.sk https://picsum.photos https://i.imgur.com https://www.google-analytics.com https://img.youtube.com",
    "media-src 'self' blob:",
    "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://va.vercel-scripts.com",
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
    "child-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  // Permissions Policy for better privacy
  response.headers.set('Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  return response
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}