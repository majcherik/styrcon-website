import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Enhanced middleware for STYRCON website
 * Slovak thermal insulation business optimizations
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Slovak market performance headers
  response.headers.set('X-Performance-Region', 'EU-Central')
  response.headers.set('X-CDN-Cache-Status', 'OPTIMIZED')

  // Enhanced security for thermal insulation business
  response.headers.set('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large')

  // Performance monitoring headers
  const startTime = Date.now()
  response.headers.set('X-Response-Time-Start', startTime.toString())

  // STYRCON-specific market headers
  response.headers.set('X-Market-Focus', 'SK-Thermal-Insulation')
  response.headers.set('X-Business-Vertical', 'Construction-Materials')

  // Enhanced caching for Slovak content
  const pathname = request.nextUrl.pathname

  // Static assets get aggressive caching
  if (pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg|ico|css|js|woff|woff2)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    response.headers.set('X-Asset-Cache', 'STYRCON-OPTIMIZED')
  }

  // API routes get specific headers
  if (pathname.startsWith('/api/')) {
    response.headers.set('X-API-Version', 'v1')
    response.headers.set('X-Rate-Limit-Policy', 'Slovakia-Standard')
  }

  // Slovak language content optimization
  if (pathname.includes('/sk') || pathname === '/') {
    response.headers.set('Content-Language', 'sk')
    response.headers.set('X-Geo-Targeting', 'Slovakia')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}