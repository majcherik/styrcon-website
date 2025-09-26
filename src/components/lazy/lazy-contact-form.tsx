'use client'

import { Suspense, lazy } from 'react'
import { Mail, Loader2, Send } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Lazy load contact form for better performance
const EnhancedContactForm = lazy(() =>
  import('@/components/forms/enhanced-contact-form').then(module => ({
    default: module.EnhancedContactForm
  }))
)

// Loading component for contact form
function ContactFormFallback() {
  return (
    <Card className="p-6 w-full max-w-lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Kontaktujte nás</h2>
          </div>
          <p className="text-slate-600 text-sm">
            Načítava sa kontaktný formulár...
          </p>
        </div>

        {/* Skeleton form */}
        <div className="space-y-4">
          {/* Name field skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-16 animate-pulse"></div>
            <div className="h-10 bg-slate-100 rounded-md animate-pulse"></div>
          </div>

          {/* Email field skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-20 animate-pulse"></div>
            <div className="h-10 bg-slate-100 rounded-md animate-pulse"></div>
          </div>

          {/* Subject field skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-24 animate-pulse"></div>
            <div className="h-10 bg-slate-100 rounded-md animate-pulse"></div>
          </div>

          {/* Message field skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-20 animate-pulse"></div>
            <div className="h-24 bg-slate-100 rounded-md animate-pulse"></div>
          </div>

          {/* Button skeleton */}
          <Button disabled className="w-full" size="lg">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Načítava sa formulár...
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs text-slate-500">
            STYRCON - E-MA SK s.r.o. | Tepelná izolácia
          </p>
        </div>
      </div>
    </Card>
  )
}

export function LazyContactForm(props: any) {
  return (
    <Suspense fallback={<ContactFormFallback />}>
      <EnhancedContactForm {...props} />
    </Suspense>
  )
}