/**
 * Brevo (Sendinblue) Email Service
 * Handles sending email notifications for contact form submissions
 */

import * as brevo from '@getbrevo/brevo';

// Initialize Brevo API client
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY || ''
);

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string | undefined;
  company?: string | undefined;
  subject: string;
  message: string;
}

/**
 * Send contact form notification email to admin(s)
 * @param data Contact form data from user submission
 * @returns Promise with success status
 */
export async function sendContactNotification(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate required environment variables
    if (!process.env.BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY is not configured');
    }

    if (!process.env.ADMIN_EMAIL) {
      throw new Error('ADMIN_EMAIL is not configured');
    }

    // Build recipient list (one or two admin emails)
    const recipients = [{ email: process.env.ADMIN_EMAIL }];

    if (process.env.ADMIN_EMAIL_2) {
      recipients.push({ email: process.env.ADMIN_EMAIL_2 });
    }

    // Create HTML email body
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              background: #f8fafc;
              padding: 30px;
              border-radius: 0 0 8px 8px;
              border: 1px solid #e2e8f0;
              border-top: none;
            }
            .field {
              margin-bottom: 20px;
              background: white;
              padding: 15px;
              border-radius: 6px;
              border-left: 4px solid #3b82f6;
            }
            .field-label {
              font-weight: 600;
              color: #1e40af;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .field-value {
              color: #334155;
              font-size: 15px;
            }
            .message-box {
              background: white;
              padding: 20px;
              border-radius: 6px;
              border: 1px solid #e2e8f0;
              margin-top: 10px;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              text-align: center;
              color: #64748b;
              font-size: 13px;
            }
            .footer a {
              color: #3b82f6;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📧 Nová správa z kontaktného formulára</h1>
          </div>

          <div class="content">
            <div class="field">
              <div class="field-label">Meno</div>
              <div class="field-value">${data.name}</div>
            </div>

            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value">
                <a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">
                  ${data.email}
                </a>
              </div>
            </div>

            ${data.phone ? `
              <div class="field">
                <div class="field-label">Telefón</div>
                <div class="field-value">
                  <a href="tel:${data.phone}" style="color: #3b82f6; text-decoration: none;">
                    ${data.phone}
                  </a>
                </div>
              </div>
            ` : ''}

            ${data.company ? `
              <div class="field">
                <div class="field-label">Spoločnosť</div>
                <div class="field-value">${data.company}</div>
              </div>
            ` : ''}

            <div class="field">
              <div class="field-label">Predmet</div>
              <div class="field-value">${data.subject}</div>
            </div>

            <div class="field">
              <div class="field-label">Správa</div>
              <div class="message-box">${data.message}</div>
            </div>
          </div>

          <div class="footer">
            <p>
              Táto správa bola odoslaná cez kontaktný formulár na stránke
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://styrcon.sk'}">
                ${process.env.NEXT_PUBLIC_SITE_NAME || 'STYRCON'}
              </a>
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 10px;">
              ${new Date().toLocaleString('sk-SK', {
                dateStyle: 'full',
                timeStyle: 'short',
                timeZone: 'Europe/Bratislava'
              })}
            </p>
          </div>
        </body>
      </html>
    `;

    // Create plain text version (fallback for email clients that don't support HTML)
    const textContent = `
NOVÁ SPRÁVA Z KONTAKTNÉHO FORMULÁRA
====================================

MENO: ${data.name}
EMAIL: ${data.email}
${data.phone ? `TELEFÓN: ${data.phone}\n` : ''}${data.company ? `SPOLOČNOSŤ: ${data.company}\n` : ''}
PREDMET: ${data.subject}

SPRÁVA:
${data.message}

---
Odoslané: ${new Date().toLocaleString('sk-SK', {
  dateStyle: 'full',
  timeStyle: 'short',
  timeZone: 'Europe/Bratislava'
})}
Webová stránka: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://styrcon.sk'}
    `.trim();

    // Prepare email send request
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = `Nová správa z kontaktného formulára: ${data.subject}`;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.textContent = textContent;
    sendSmtpEmail.sender = {
      name: 'STYRCON Kontaktný Formulár',
      email: process.env.ADMIN_EMAIL // Brevo requires verified sender email
    };
    sendSmtpEmail.to = recipients;
    sendSmtpEmail.replyTo = {
      email: data.email,
      name: data.name
    };

    // Add tags for tracking
    sendSmtpEmail.tags = ['contact-form', 'styrcon-website'];

    // Send email via Brevo API
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log('Contact form notification sent successfully:', {
      messageId: response.messageId,
      recipients: recipients.length
    });

    return { success: true };

  } catch (error) {
    console.error('Error sending contact form notification:', error);

    // Return error details for logging
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Validate Brevo API configuration
 * @returns Object with validation status and any error messages
 */
export function validateBrevoConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!process.env.BREVO_API_KEY || process.env.BREVO_API_KEY === 'your-brevo-api-key-here') {
    errors.push('BREVO_API_KEY is not configured or is using placeholder value');
  }

  if (!process.env.ADMIN_EMAIL) {
    errors.push('ADMIN_EMAIL is not configured');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
