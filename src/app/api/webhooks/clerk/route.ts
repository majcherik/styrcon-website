import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'

/**
 * Clerk webhook handler for user lifecycle events
 * Handles user creation, updates, deletion, and other events
 */

interface ClerkWebhookEvent {
  type: string
  data: {
    id: string
    email_addresses?: Array<{ email_address: string }>
    first_name?: string
    last_name?: string
    image_url?: string
    created_at?: number
    updated_at?: number
    public_metadata?: Record<string, any>
    private_metadata?: Record<string, any>
  }
}

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET

    if (!webhookSecret) {
      console.error('Missing CLERK_WEBHOOK_SECRET environment variable')
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    // Get the headers
    const headerPayload = request.headers
    const svixId = headerPayload.get('svix-id')
    const svixTimestamp = headerPayload.get('svix-timestamp')
    const svixSignature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json(
        { error: 'Missing required headers' },
        { status: 400 }
      )
    }

    // Get the body
    const payload = await request.text()

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(webhookSecret)

    let evt: ClerkWebhookEvent

    // Verify the payload with the headers
    try {
      evt = wh.verify(payload, {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      }) as ClerkWebhookEvent
    } catch (err) {
      console.error('Error verifying webhook:', err)
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 400 }
      )
    }

    // Handle the webhook event
    await handleWebhookEvent(evt)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Handle different types of webhook events
 */
async function handleWebhookEvent(evt: ClerkWebhookEvent) {
  const { type, data } = evt

  console.log(`Processing webhook event: ${type} for user ${data.id}`)

  switch (type) {
    case 'user.created':
      await handleUserCreated(data)
      break

    case 'user.updated':
      await handleUserUpdated(data)
      break

    case 'user.deleted':
      await handleUserDeleted(data)
      break

    case 'session.created':
      await handleSessionCreated(data)
      break

    case 'session.ended':
      await handleSessionEnded(data)
      break

    default:
      console.log(`Unhandled webhook event type: ${type}`)
  }
}

/**
 * Handle user creation
 */
async function handleUserCreated(userData: ClerkWebhookEvent['data']) {
  try {
    console.log('New user created:', {
      id: userData.id,
      email: userData.email_addresses?.[0]?.email_address,
      name: `${userData.first_name} ${userData.last_name}`,
    })

    // Here you would typically:
    // 1. Create user record in your database
    // 2. Set up default permissions/role
    // 3. Send welcome email
    // 4. Initialize user preferences
    // 5. Create analytics tracking

    // Example: Create user in database (pseudo-code)
    // await createUserInDatabase({
    //   clerkId: userData.id,
    //   email: userData.email_addresses?.[0]?.email_address,
    //   firstName: userData.first_name,
    //   lastName: userData.last_name,
    //   imageUrl: userData.image_url,
    //   role: 'user', // Default role
    //   permissions: [],
    //   createdAt: new Date(),
    // })

    // Example: Send welcome email
    // await sendWelcomeEmail(userData.email_addresses?.[0]?.email_address)

    console.log(`User ${userData.id} successfully created in system`)
  } catch (error) {
    console.error('Error handling user creation:', error)
    throw error
  }
}

/**
 * Handle user updates
 */
async function handleUserUpdated(userData: ClerkWebhookEvent['data']) {
  try {
    console.log('User updated:', userData.id)

    // Update user record in your database
    // Handle metadata changes (role, permissions)
    // Update search indexes
    // Sync with external services

    console.log(`User ${userData.id} successfully updated`)
  } catch (error) {
    console.error('Error handling user update:', error)
    throw error
  }
}

/**
 * Handle user deletion
 */
async function handleUserDeleted(userData: ClerkWebhookEvent['data']) {
  try {
    console.log('User deleted:', userData.id)

    // Soft delete or anonymize user data
    // Clean up user-related records
    // Cancel subscriptions
    // Remove from mailing lists
    // Update analytics

    console.log(`User ${userData.id} successfully deleted from system`)
  } catch (error) {
    console.error('Error handling user deletion:', error)
    throw error
  }
}

/**
 * Handle session creation (user login)
 */
async function handleSessionCreated(sessionData: ClerkWebhookEvent['data']) {
  try {
    console.log('New session created for user:', sessionData.id)

    // Log user login for analytics
    // Update last login timestamp
    // Track user activity
    // Send login notifications if enabled

    console.log(`Session created for user ${sessionData.id}`)
  } catch (error) {
    console.error('Error handling session creation:', error)
    throw error
  }
}

/**
 * Handle session end (user logout)
 */
async function handleSessionEnded(sessionData: ClerkWebhookEvent['data']) {
  try {
    console.log('Session ended for user:', sessionData.id)

    // Log user logout
    // Clean up temporary data
    // Update session analytics

    console.log(`Session ended for user ${sessionData.id}`)
  } catch (error) {
    console.error('Error handling session end:', error)
    throw error
  }
}