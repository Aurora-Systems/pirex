# Contact Page

This contact page provides a comprehensive contact solution for Pirex Computers with multiple ways for customers to get in touch.

## Features

### 📝 Contact Form
- **Validated Form**: Uses React Hook Form with Zod validation
- **Required Fields**: Name, Email, Subject, Message
- **Optional Field**: Phone Number
- **Real-time Validation**: Client-side validation with error messages
- **Success Feedback**: Toast notifications and success state
- **Loading States**: Visual feedback during form submission

### 📞 Contact Information
- **Business Address**: Main office location
- **Phone Numbers**: Multiple contact numbers
- **Email Addresses**: General and sales contact emails
- **Business Hours**: Operating hours for each day

### 🗺️ Interactive Map
- **Google Maps Integration**: Embedded map showing office location
- **Multiple Locations**: Main office and service center
- **Accessibility**: Proper ARIA labels and titles

### 🎨 Design Features
- **Glass Morphism**: Modern glass card design
- **Responsive Layout**: Mobile-first responsive design
- **Dark Mode Support**: Theme-aware components
- **Loading States**: Smooth loading animations
- **Toast Notifications**: User feedback using Sonner

## Technical Implementation

### Components Used
- **UI Components**: Card, Button, Input, Textarea, Form components
- **Icons**: Lucide React icons for visual elements
- **Form Handling**: React Hook Form with Zod validation
- **Notifications**: Sonner for toast messages

### EmailJS Integration
- **Client-side Email**: Direct email sending using EmailJS service
- **Template Variables**: Configured template with form data mapping
- **Error Handling**: Comprehensive error logging and user feedback
- **Validation**: Client-side validation using Zod before sending

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Classes**: Glass morphism effects
- **Color Scheme**: Consistent with brand colors (gold accents)
- **Typography**: Clear hierarchy and readability

## Form Validation Rules

- **Name**: Minimum 2 characters
- **Email**: Valid email format required
- **Phone**: Optional field, minimum 10 characters if provided
- **Subject**: Minimum 5 characters
- **Message**: Minimum 10 characters

## Accessibility Features

- **Semantic HTML**: Proper form labels and structure
- **ARIA Labels**: Screen reader friendly
- **Keyboard Navigation**: Full keyboard accessibility
- **Error Messages**: Clear validation feedback
- **Focus Management**: Proper focus indicators

## EmailJS Configuration

The contact form uses EmailJS for direct email sending with these template variables:
- `{{from_name}}` - Customer's full name (maps to form field: full_name)
- `{{from_email}}` - Customer's email address (maps to form field: email)
- `{{contact_number}}` - Customer's phone number (maps to form field: contact_number)
- `{{subject}}` - Message subject (maps to form field: subject)
- `{{message}}` - Customer's message (maps to form field: message)
- `{{to_email}}` - Business email (hardcoded: info@pirexcomputers.co.zw)

### EmailJS Setup Required
1. Configure EmailJS service with service ID: `bVCCYKwge#?2`
2. Create email template with ID: `template_wveqbsf`
3. Set up public key: `wommR0fk9XjXZuYqo`
4. Template should include all variables listed above

## Future Enhancements

- **Database Storage**: Save submissions to database for record keeping
- **CRM Integration**: Connect to customer management system
- **File Attachments**: Allow document uploads
- **Live Chat**: Real-time customer support
- **Appointment Booking**: Schedule service appointments
- **Auto-responder**: Send confirmation emails to customers

## Usage

The contact page is accessible at `/contact` and includes:

1. **Navigation**: Added to main navbar
2. **Form Submission**: Handles both success and error states
3. **Quick Actions**: Direct phone and email links
4. **Location Information**: Multiple office locations

## Configuration

To customize the contact information:

1. Update the contact details in the page component
2. Replace the Google Maps embed URL with your location
3. Modify business hours and contact methods
4. Update email addresses and phone numbers

## Dependencies

- **@emailjs/browser**: Email sending service
- **React Hook Form**: Form state management
- **Zod validation**: Form validation schema
- **Sonner**: Toast notifications
- **Lucide React**: Icons
- **Next.js 16+**: App Router framework

## Error Handling

The form includes comprehensive error handling:
- **EmailJS Errors**: Specific error messages for common EmailJS issues
- **Network Errors**: Fallback messages for connectivity issues
- **Validation Errors**: Real-time form validation feedback
- **Debug Logging**: Detailed console logging for troubleshooting