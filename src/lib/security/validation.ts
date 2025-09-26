import * as z from 'zod'
import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHtml(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br'],
    ALLOWED_ATTR: []
  })
}

/**
 * Sanitize plain text input by removing potentially dangerous characters
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and > characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

/**
 * Validate and sanitize email addresses
 */
export function sanitizeEmail(email: string): string {
  const emailSchema = z.string().email()
  const parsed = emailSchema.safeParse(email.toLowerCase().trim())
  return parsed.success ? parsed.data : ''
}

/**
 * Sanitize phone numbers (Slovak format)
 */
export function sanitizePhone(phone: string): string {
  return phone
    .replace(/[^\d+\s()-]/g, '') // Only allow digits, +, spaces, parentheses, hyphens
    .trim()
}

/**
 * Enhanced contact form validation schema with sanitization
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Meno musí obsahovať aspoň 2 znaky')
    .max(50, 'Meno je príliš dlhé')
    .transform(sanitizeText),
  email: z
    .string()
    .email('Neplatná emailová adresa')
    .transform(sanitizeEmail),
  phone: z
    .string()
    .optional()
    .transform((phone) => phone ? sanitizePhone(phone) : undefined),
  company: z
    .string()
    .max(100, 'Názov spoločnosti je príliš dlhý')
    .optional()
    .transform((company) => company ? sanitizeText(company) : undefined),
  subject: z
    .string()
    .min(1, 'Predmet je povinný')
    .max(100, 'Predmet je príliš dlhý')
    .transform(sanitizeText),
  message: z
    .string()
    .min(10, 'Správa musí obsahovať aspoň 10 znakov')
    .max(1000, 'Správa je príliš dlhá')
    .transform(sanitizeHtml),
  gdprConsent: z
    .boolean()
    .refine(val => val === true, {
      message: 'Súhlas so spracovaním údajov je povinný'
    })
})

/**
 * Data Transfer Object for safe contact form data
 */
export type ContactFormDTO = z.infer<typeof contactFormSchema>

/**
 * Validate and sanitize contact form data
 */
export function validateContactForm(data: unknown): {
  success: boolean
  data?: ContactFormDTO
  error?: z.ZodError
} {
  const result = contactFormSchema.safeParse(data)
  return {
    success: result.success,
    data: result.success ? result.data : undefined,
    error: result.success ? undefined : result.error
  }
}

/**
 * Server-side request validation
 */
export function validateRequestSize(request: Request, maxSize: number = 1024 * 1024): boolean {
  const contentLength = request.headers.get('content-length')
  if (!contentLength) return true // Let it pass if no content-length header

  return parseInt(contentLength) <= maxSize
}

/**
 * Validate request content type
 */
export function validateContentType(request: Request, allowedTypes: string[] = ['application/json']): boolean {
  const contentType = request.headers.get('content-type')
  if (!contentType) return false

  return allowedTypes.some(type => contentType.includes(type))
}