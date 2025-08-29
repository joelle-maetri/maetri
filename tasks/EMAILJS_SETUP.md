# EmailJS Setup Instructions

This guide will help you configure EmailJS to send contact form emails to brock@maetri.com.

## Steps to Setup EmailJS

### 1. Create EmailJS Account
- Go to [https://www.emailjs.com/](https://www.emailjs.com/)
- Sign up for a free account (free tier includes 200 emails per month)

### 2. Add Email Service
- In your EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose your email provider (Gmail, Outlook, etc.)
- Follow the setup instructions to connect your email account
- Note down the **Service ID** (e.g., `service_abc1234`)

### 3. Create Email Template
- Go to "Email Templates" in your dashboard
- Click "Create New Template"
- Use this template content:

```
Subject: {{subject}}

From: {{from_name}} <{{from_email}}>
Reply To: {{reply_to}}

Message:
{{message}}

---
This email was sent from the Maetri contact form.
```

- In template settings, add these variables:
  - `{{from_name}}` - Sender's name
  - `{{from_email}}` - Sender's email
  - `{{message}}` - Message content
  - `{{reply_to}}` - Reply-to email
  - `{{subject}}` - Email subject
  - `{{to_email}}` - Recipient email (brock@maetri.com)

- Note down the **Template ID** (e.g., `template_xyz5678`)

### 4. Get Your Public Key
- Go to "Account" → "General"
- Copy your **Public Key** (e.g., `user_abcdefghijk123456`)

### 5. Update the Code
In `src/main.js`, replace the placeholders:

```javascript
// Replace these values:
emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Your actual public key
static SERVICE_ID = "service_xxxxxxx"; // Your actual service ID  
static TEMPLATE_ID = "template_xxxxxxx"; // Your actual template ID
```

### 6. Test the Setup
1. Deploy your changes
2. Visit your website
3. Fill out the contact form
4. Check brock@maetri.com for the test email
5. Check the browser console for any errors

## Email Template Variables Used

The contact form sends these variables to EmailJS:

- `to_email`: "brock@maetri.com" (recipient)
- `from_name`: User's full name from form
- `from_email`: User's email address from form  
- `message`: User's message from form
- `reply_to`: User's email address (for easy reply)
- `subject`: Auto-generated subject line

## Troubleshooting

### Common Issues:
1. **EmailJS not loaded**: Check that the script tag is loading correctly
2. **CORS errors**: Make sure your domain is added to EmailJS allowed origins
3. **Template not found**: Verify template ID is correct
4. **Service not found**: Verify service ID is correct
5. **Rate limiting**: Free tier has 200 emails/month limit

### Debug Steps:
1. Open browser developer tools
2. Check Console tab for error messages
3. Check Network tab to see if EmailJS requests are successful
4. Verify all IDs match your EmailJS dashboard

## Security Notes

- Public key is safe to expose in client-side code
- EmailJS handles authentication server-side
- Consider adding rate limiting for production use
- Monitor usage in EmailJS dashboard to avoid exceeding limits

## Alternative Setup

If EmailJS doesn't work, you can also:
1. Set up a simple backend API endpoint
2. Use Netlify Forms (if hosting on Netlify)
3. Use Formspree or similar services
4. Integrate with a CRM system