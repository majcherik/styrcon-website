import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { contactFormLimiter, getClientIdentifier } from '@/lib/rate-limiter';
import { validateContactForm, validateRequestSize, validateContentType } from '@/lib/security/validation';
import { verifyCSRFToken, withTimeout } from '@/lib/security/csrf';
import { logger, PerformanceMonitor, sanitizeErrorForClient } from '@/lib/logging/logger';

export async function POST(request: NextRequest) {
  const performanceMonitor = new PerformanceMonitor();

  try {
    logger.apiInfo('Contact form submission started', request);
    // Request validation checks
    if (!validateRequestSize(request, 10 * 1024)) { // 10KB limit
      return NextResponse.json(
        { error: 'Request je príliš veľký' },
        { status: 413 }
      );
    }

    if (!validateContentType(request)) {
      return NextResponse.json(
        { error: 'Neplatný content-type' },
        { status: 400 }
      );
    }

    // CSRF protection
    if (!verifyCSRFToken(request, '')) {
      return NextResponse.json(
        { error: 'Neplatná požiadavka - chýba CSRF ochrana' },
        { status: 403 }
      );
    }

    // Rate limiting check
    const clientId = getClientIdentifier(request);
    const rateLimitResult = contactFormLimiter.check(clientId);

    if (!rateLimitResult.allowed) {
      const resetTime = rateLimitResult.resetTime;
      const waitMinutes = resetTime ? Math.ceil((resetTime - Date.now()) / 60000) : 15;

      return NextResponse.json(
        {
          error: `Príliš veľa pokusov. Skúste znova za ${waitMinutes} minút.`,
          rateLimited: true
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((resetTime! - Date.now()) / 1000))
          }
        }
      );
    }

    const body = await request.json();

    // Validate and sanitize the request data
    const validationResult = validateContactForm(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Neplatné údaje formulára',
          details: validationResult.error?.issues
        },
        { status: 400 }
      );
    }

    const { name, email, phone, company, subject, message } = validationResult.data!;

    // Create server-side Supabase client
    const supabase = await createClient();

    // Save the contact submission to Supabase with timeout
    const result = await withTimeout(
      Promise.resolve(
        supabase
          .from('contact_inquiries')
          .insert({
            name,
            email,
            phone,
            company,
            subject,
            message,
            status: 'new'
          })
          .select()
          .single()
      ),
      15000, // 15 second timeout
      'Database operation timeout'
    );
    const { data: contactData, error: insertError } = result as { data: any; error: any };

    if (insertError) {
      logger.apiError('Database error saving contact inquiry', request, insertError, {
        name,
        email,
        subject
      });

      const sanitizedError = sanitizeErrorForClient(insertError);
      return NextResponse.json(
        {
          error: sanitizedError.message
        },
        { status: 500 }
      );
    }

    // Log successful submission
    logger.apiInfo('Contact form submission saved successfully', request, {
      inquiryId: contactData.id,
      name,
      email,
      subject,
      timestamp: contactData.created_at,
    });

    performanceMonitor.end('Contact form submission');

    // TODO: Implement email notifications
    // await sendNotificationEmail({
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `Nová správa z kontaktného formulára: ${subject}`,
    //   data: { name, email, phone, company, subject, message }
    // });
    //
    // await sendConfirmationEmail({
    //   to: email,
    //   subject: 'Potvrdenie prijatia vašej správy - STYRCON',
    //   data: { name }
    // });

    return NextResponse.json(
      { 
        success: true,
        message: 'Správa bola úspešne odoslaná' 
      },
      { status: 200 }
    );

  } catch (error) {
    logger.apiError('Contact form submission failed', request, error instanceof Error ? error : new Error(String(error)));
    performanceMonitor.end('Contact form submission (failed)');

    const sanitizedError = sanitizeErrorForClient(error);
    return NextResponse.json(
      {
        error: sanitizedError.message
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}