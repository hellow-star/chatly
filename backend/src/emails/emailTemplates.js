export function createWelcomeEmailTemplate(name, clientURL){
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Our App</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8f9fa;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table width="100%" max-width="600px" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
                    <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 600; letter-spacing: -0.5px; line-height: 1.3;">Welcome, ${name}!</h1>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="background-color: #ffffff; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                    <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #495057;">
                      Thank you for signing up! We're thrilled to have you join our community.
                    </p>

                    <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.6; color: #495057;">
                      Click the button below to begin your journey with us:
                    </p>

                    <!-- CTA Button -->
                    <div style="text-align: center; margin: 40px 0;">
                      <a href="${clientURL}"
                         style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; letter-spacing: 0.5px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3); transition: all 0.3s ease;">
                        Get Started
                      </a>
                    </div>

                    <p style="margin: 32px 0 16px 0; font-size: 16px; line-height: 1.6; color: #495057;">
                      If you have any questions or need assistance, our support team is always here to help.
                    </p>

                    <p style="margin: 16px 0 0 0; font-size: 16px; line-height: 1.6; color: #495057;">
                      Best regards,<br>
                      <strong style="color: #667eea;">The App Team</strong>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 0 0 0; text-align: center;">
                    <p style="margin: 0; font-size: 14px; color: #6c757d; line-height: 1.6;">
                      This email was sent to you because you signed up for our service.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

