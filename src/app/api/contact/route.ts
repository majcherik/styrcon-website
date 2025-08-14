import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Meno musí obsahovať aspoň 2 znaky'),
  email: z.string().email('Neplatná emailová adresa'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, 'Predmet je povinný'),
  message: z.string().min(10, 'Správa musí obsahovať aspoň 10 znakov'),
  gdprConsent: z.boolean().refine(val => val === true, {
    message: 'Súhlas so spracovaním údajov je povinný'
  })
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request data
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Neplatné údaje formulára',
          details: validationResult.error.issues 
        },
        { status: 400 }
      );
    }

    const { name, email, phone, company, subject, message } = validationResult.data;

    // In a real application, you would:
    // 1. Save the contact submission to a database
    // 2. Send an email notification to the company
    // 3. Send a confirmation email to the user
    
    // For now, we'll just log the submission and return success
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      company,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real application, implement email sending here:
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
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        error: 'Nastala serverová chyba. Skúste to prosím znova.' 
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