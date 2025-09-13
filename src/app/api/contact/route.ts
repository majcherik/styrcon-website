import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';
import { createClient } from '@/lib/supabase/server';

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

    // Create server-side Supabase client
    const supabase = await createClient();

    // Save the contact submission to Supabase
    const { data: contactData, error: insertError } = await supabase
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
      .single();

    if (insertError) {
      console.error('Error saving contact inquiry:', insertError);
      return NextResponse.json(
        { 
          error: 'Nastala chyba pri ukladaní správy. Skúste to prosím znova.' 
        },
        { status: 500 }
      );
    }

    // Log successful submission
    console.log('Contact form submission saved:', {
      id: contactData.id,
      name,
      email,
      subject,
      timestamp: contactData.created_at,
    });

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