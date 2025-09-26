'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { contactFormLimiter, getClientIdentifier } from '@/lib/rate-limiter'
import { validateContactForm } from '@/lib/security/validation'
import { verifyCSRFToken, withTimeout } from '@/lib/security/csrf'
import { logger, PerformanceMonitor, sanitizeErrorForClient } from '@/lib/logging/logger'
import { headers } from 'next/headers'

export type FormState = {
  success?: boolean
  error?: string
  message?: string
  fieldErrors?: Record<string, string[]>
  rateLimited?: boolean
}

function getRequestFromHeaders() {
  const headersList = headers()
  // Create a minimal request-like object for our security functions
  return {
    headers: {
      get: (name: string) => headersList.get(name)
    },
    method: 'POST',
    url: headersList.get('referer') || ''
  } as Request
}

export async function submitContactForm(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const performanceMonitor = new PerformanceMonitor()

  try {
    // Create request object from headers
    const request = getRequestFromHeaders()

    logger.info('Contact form Server Action started', {
      timestamp: new Date().toISOString()
    })

    // Basic CSRF protection using headers
    if (!verifyCSRFToken(request, '')) {
      return {
        error: 'Neplatná požiadavka - chýba CSRF ochrana'
      }
    }

    // Rate limiting check
    const clientId = getClientIdentifier(request)
    const rateLimitResult = contactFormLimiter.check(clientId)

    if (!rateLimitResult.allowed) {
      const resetTime = rateLimitResult.resetTime
      const waitMinutes = resetTime ? Math.ceil((resetTime - Date.now()) / 60000) : 15

      logger.warn('Rate limit exceeded for contact form', {
        clientId,
        waitMinutes
      })

      return {
        error: `Príliš veľa pokusov. Skúste znova za ${waitMinutes} minút.`,
        rateLimited: true
      }
    }

    // Extract and validate form data
    const formDataObj = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      company: formData.get('company')?.toString() || '',
      subject: formData.get('subject')?.toString() || '',
      message: formData.get('message')?.toString() || '',
      gdprConsent: formData.get('gdprConsent') === 'on' || formData.get('gdprConsent') === 'true'
    }

    const validationResult = validateContactForm(formDataObj)

    if (!validationResult.success) {
      const fieldErrors: Record<string, string[]> = {}

      validationResult.error?.issues.forEach((issue) => {
        const field = issue.path[0]?.toString()
        if (field) {
          if (!fieldErrors[field]) {
            fieldErrors[field] = []
          }
          fieldErrors[field].push(issue.message)
        }
      })

      return {
        error: 'Neplatné údaje formulára',
        fieldErrors
      }
    }

    const { name, email, phone, company, subject, message } = validationResult.data

    // Create server-side Supabase client and save to database
    const supabase = await createClient()

    const { data: contactData, error: insertError } = await withTimeout(
      supabase
        .from('contact_inquiries')
        .insert({
          name,
          email,
          phone: phone || null,
          company: company || null,
          subject,
          message,
          status: 'new'
        })
        .select()
        .single(),
      15000,
      'Database operation timeout'
    )

    if (insertError) {
      logger.error('Database error saving contact inquiry', {
        name,
        email,
        subject,
        error: insertError.message
      })

      const sanitizedError = sanitizeErrorForClient(insertError)
      return {
        error: sanitizedError.message
      }
    }

    // Log successful submission
    logger.info('Contact form submission saved successfully', {
      inquiryId: contactData.id,
      name,
      email,
      subject,
      timestamp: contactData.created_at,
    })

    performanceMonitor.end('Contact form Server Action')

    // Revalidate any cached pages if needed
    revalidatePath('/kontakt')

    return {
      success: true,
      message: 'Správa bola úspešne odoslaná. Ďakujeme za váš záujem!'
    }

  } catch (error) {
    logger.error('Contact form Server Action failed', {}, error instanceof Error ? error : new Error(String(error)))
    performanceMonitor.end('Contact form Server Action (failed)')

    const sanitizedError = sanitizeErrorForClient(error)
    return {
      error: sanitizedError.message
    }
  }
}