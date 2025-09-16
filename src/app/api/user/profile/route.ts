import { NextResponse } from 'next/server'
import { requireAuth, getCurrentUser } from '@/lib/auth-server'

/**
 * Protected API route that requires authentication
 * Returns current user profile data
 */
export async function GET() {
  try {
    // Require authentication - will throw/redirect if not authenticated
    const userId = await requireAuth()

    // Get current user data
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Používateľ nebol nájdený' },
        { status: 404 }
      )
    }

    // Return user profile data
    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.primaryEmailAddress?.emailAddress,
        imageUrl: user.imageUrl,
        createdAt: user.createdAt,
        lastSignInAt: user.lastSignInAt,
        // Don't expose sensitive data
      }
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Chyba pri načítavaní profilu' },
      { status: 500 }
    )
  }
}

/**
 * Update user profile (protected)
 */
export async function PATCH(request: Request) {
  try {
    const userId = await requireAuth()
    const body = await request.json()

    // Validate and sanitize input
    const { firstName, lastName } = body

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'Meno a priezvisko sú povinné' },
        { status: 400 }
      )
    }

    // In a real app, you would update the user profile here
    // For Clerk, profile updates are typically done client-side
    // This is just an example of a protected API endpoint

    return NextResponse.json({
      success: true,
      message: 'Profil bol úspešne aktualizovaný'
    })
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json(
      { error: 'Chyba pri aktualizácii profilu' },
      { status: 500 }
    )
  }
}