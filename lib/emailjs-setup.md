# EmailJS Setup Documentation

This document explains how to set up EmailJS for the Pirex Computers contact form.

## EmailJS Template Configuration

To properly receive emails from the contact form, you need to configure your EmailJS template with the following variables:

### Template Variables

Your EmailJS template should include these variables:

- `{{from_name}}` - Customer's full name
- `{{from_email}}` - Customer's email address
- `{{contact_number}}` - Customer's phone number (optional)
- `{{subject}}` - Message subject
- `{{message}}` - Customer's message
- `{{to_email}}` - Your business email (pirexcomputers.co.zw)

### Example Template HTML

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Contact Form Submission - Pirex Computers</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #d10e00; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #d10e00; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>Pirex Computers - Technology Solutions</p>
        </div>
        
        <div class="content">
            <h2>Customer Information</h2>
            
            <div class="field">
                <span class="label">Name:</span> {{from_name}}
            </div>
            
            <div class="field">
                <span class="label">Email:</span> {{from_email}}
            </div>
            
            <div class="field">
                <span class="label">Phone:</span> {{contact_number}}
            </div>
            
            <div class="field">
                <span class="label">Subject:</span> {{subject}}
            </div>
            
            <div class="field">
                <span class="label">Message:</span>
                <div style="margin-top: 10px; padding: 15px; background: white; border-left: 4px solid #d10e00;">
                    {{message}}
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>This message was sent through the Pirex Computers contact form.</p>
            <p>Please respond to the customer at: {{from_email}}</p>
        </div>
    </div>
</body>
</html>
```

### Example Template Text (Plain Text Version)

```text
New Contact Form Submission - Pirex Computers
============================================

Customer Information:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{contact_number}}
- Subject: {{subject}}

Message:
{{message}}

---
This message was sent through the Pirex Computers contact form.
Please respond to the customer at: {{from_email}}
```

## EmailJS Service Configuration

### 1. Create EmailJS Account
1. Go to https://emailjs.com
2. Create an account or sign in
3. Create a new service (Gmail, Outlook, etc.)

### 2. Service Settings
- **Service ID**: Use the value from `service_id` in emailjs.ts
- **Template ID**: Use the value from `template_id` in emailjs.ts
- **Public Key**: Use the value from `public_key` in emailjs.ts

### 3. Email Service Setup

#### For Gmail:
1. Select Gmail service
2. Connect your Gmail account
3. Set the "To Email" to your business email

#### For Custom SMTP:
1. Select EmailJS service
2. Configure SMTP settings for your domain
3. Set authentication credentials

### 4. Template Configuration Steps

1. Go to Email Templates in your EmailJS dashboard
2. Create a new template or edit existing one
3. Set the template ID to match `template_wveqbsf`
4. Configure the following settings:
   - **To Email**: {{to_email}} or your fixed business email
   - **From Email**: {{from_email}}
   - **From Name**: {{from_name}}
   - **Subject**: Contact Form: {{subject}}
   - **Content**: Use the HTML template above

### 5. Test Configuration

Use the EmailJS dashboard test feature to ensure:
- Template renders correctly
- Variables are populated
- Emails are delivered to the correct address

## Security Considerations

### Public Key Security
- The public key in `emailjs.ts` is safe to expose in client-side code
- EmailJS public keys are designed for frontend use
- Rate limiting is handled by EmailJS service

### Domain Restrictions
Consider adding domain restrictions in EmailJS dashboard:
1. Go to Security settings
2. Add your domain (e.g., pirexcomputers.co.zw)
3. This prevents unauthorized use of your EmailJS service

### Email Validation
The form includes client-side validation:
- Email format validation
- Required field validation
- Message length validation
- Phone number format validation

## Troubleshooting

### Common Issues

1. **Template Not Found**
   - Verify template_id matches your EmailJS template
   - Check template is active in dashboard

2. **Service Not Found**
   - Verify service_id matches your EmailJS service
   - Ensure service is properly configured

3. **Public Key Invalid**
   - Check public_key matches your EmailJS account
   - Verify account is active

4. **Emails Not Sending**
   - Check EmailJS dashboard for send logs
   - Verify email service connection
   - Test template in EmailJS dashboard

5. **Template Variables Not Working**
   - Ensure variable names match exactly (case-sensitive)
   - Check template syntax: {{variable_name}}
   - Test with EmailJS template tester

### Debug Mode

To enable debugging, add console logs in the contact form hook:

```typescript
console.log("EmailJS Config:", { service_id, template_id, public_key });
console.log("Form Data:", data);
```

### Rate Limiting

EmailJS has usage limits:
- Free tier: 200 emails/month
- Check your usage in EmailJS dashboard
- Consider upgrading for higher volume

## Integration Details

The contact form integration:

1. **Form Submission**: User fills out contact form
2. **Validation**: Client-side validation using Zod
3. **EmailJS Call**: Form data sent to EmailJS service
4. **Email Generation**: EmailJS processes template with form data
5. **Delivery**: Email sent to configured business email
6. **User Feedback**: Success/error toast notification

### Form Data Mapping

```typescript
const templateParams = {
  from_name: data.full_name,        // Customer's name
  from_email: data.email,           // Customer's email
  contact_number: data.contact_number || "Not provided", // Optional phone
  subject: data.subject,            // Message subject
  message: data.message,            // Customer's message
  to_email: "info@pirexcomputers.co.zw", // Your business email
};
```

## Backup Solutions

If EmailJS fails, the system will:
1. Display error message to user
2. Log error details to console
3. User can try again or contact directly

Consider implementing fallback methods:
- Direct mailto links
- Phone contact options
- Alternative contact forms