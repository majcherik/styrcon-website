import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { getCacheHeaders } from '@/lib/cache/strategies'

export async function POST(request: NextRequest) {
  try {
    // Simple auth check - in production, use proper authentication
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.REVALIDATE_TOKEN

    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { tag, tags } = body

    if (tag) {
      revalidateTag(tag)
      console.log(`Revalidated cache tag: ${tag}`)
    }

    if (tags && Array.isArray(tags)) {
      for (const tagName of tags) {
        revalidateTag(tagName)
        console.log(`Revalidated cache tag: ${tagName}`)
      }
    }

    return NextResponse.json(
      { message: 'Cache revalidated successfully', revalidated: tag || tags },
      {
        status: 200,
        headers: getCacheHeaders('dynamic')
      }
    )
  } catch (error) {
    console.error('Cache revalidation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Health check for cron job
  return NextResponse.json(
    { message: 'Revalidation endpoint is healthy', timestamp: new Date().toISOString() },
    {
      status: 200,
      headers: getCacheHeaders('dynamic')
    }
  )
}