import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/profil(.*)',
])

// Define public auth routes that should not be protected
const isPublicRoute = createRouteMatcher([
  '/prihlasenie(.*)',
  '/registracia(.*)',
  '/',
])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()

  // Skip protection for public auth routes
  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  // Check if user is trying to access protected route
  if (isProtectedRoute(req)) {
    // If not signed in, redirect to sign in page
    if (!userId) {
      const signInUrl = new URL('/prihlasenie', req.url)
      signInUrl.searchParams.set('redirect_url', req.url)
      return NextResponse.redirect(signInUrl)
    }
  }


  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}