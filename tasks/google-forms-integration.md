# Task: Switch EmailJS to Google Forms Integration

## Overview
Switch the current EmailJS integration to use Google Forms for contact form submissions. This will simplify setup, eliminate API dependencies, and provide a more reliable form submission system.

## Benefits of Google Forms
- **Zero configuration** - No API keys or service setup required
- **100% reliable** - Google's infrastructure handles all submissions
- **Free** - No limits or costs
- **Automatic notifications** - Can email responses to brock@maetri.com
- **Built-in spam protection** - Google's anti-spam measures
- **Data storage** - Responses stored in Google Sheets automatically

## Implementation Steps

### 1. Create Google Form
1. Go to [https://forms.google.com](https://forms.google.com)
2. Create a new form with these fields:
   - **Full Name** (Short answer, Required)
   - **Email Address** (Short answer, Required, Email validation)
   - **Message** (Paragraph, Required)
3. Set up response notifications:
   - Go to Responses tab → Click settings (⚙️) 
   - Enable "Get email notifications for new responses"
   - Add brock@maetri.com as recipient
4. Get form submission URL:
   - Click "Send" → Link tab → Copy URL
   - Note the form ID from URL: `https://docs.google.com/forms/d/e/{FORM_ID}/viewform`

### 2. Create Configuration File

Create a new file `src/config.js` to store Google Forms configuration:

```javascript
// Google Forms Configuration
// This file contains sensitive form URLs and field IDs
export const GOOGLE_FORM_CONFIG = {
    FORM_URL: 'https://docs.google.com/forms/d/e/{FORM_ID}/formResponse',
    
    FIELD_IDS: {
        fullName: 'entry.XXXXXXXX',
        email: 'entry.XXXXXXXX', 
        message: 'entry.XXXXXXXX'
    }
};
```

**Important:** Add this file to `.gitignore` to keep form configuration private.

### 3. Update .gitignore

Add the configuration file to `.gitignore`:

```gitignore
# Google Forms Configuration
src/config.js
```

### 4. Update JavaScript Implementation

Replace the EmailJS integration in `src/main.js`:

```javascript
import { GOOGLE_FORM_CONFIG } from './config.js';

class GoogleFormService {
    constructor() {
        // Load configuration from separate file
        this.FORM_URL = GOOGLE_FORM_CONFIG.FORM_URL;
        this.FIELD_IDS = GOOGLE_FORM_CONFIG.FIELD_IDS;
    }

    submitForm(data) {
        const formData = new FormData();
        formData.append(this.FIELD_IDS.fullName, data.fullName);
        formData.append(this.FIELD_IDS.email, data.email);
        formData.append(this.FIELD_IDS.message, data.message || '');

        // Submit to Google Forms
        return fetch(this.FORM_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Forms
            body: formData
        });
    }
}
```

### 5. Create Example Configuration Template

Create `src/config.example.js` as a template (this will be committed to git):

```javascript
// Google Forms Configuration Template
// Copy this file to config.js and update with your actual values

export const GOOGLE_FORM_CONFIG = {
    // Replace {FORM_ID} with your actual Google Form ID
    FORM_URL: 'https://docs.google.com/forms/d/e/{FORM_ID}/formResponse',
    
    // Replace with actual field IDs from your Google Form
    FIELD_IDS: {
        fullName: 'entry.XXXXXXXX',  // Full Name field ID
        email: 'entry.XXXXXXXX',     // Email field ID  
        message: 'entry.XXXXXXXX'    // Message field ID
    }
};
```

### 3. Update ContactForm Class

Modify the ContactForm class to use GoogleFormService:

```javascript
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.googleFormService = new GoogleFormService();
        this.init();
    }

    sendEmail(data) {
        return this.googleFormService.submitForm(data)
            .then(() => {
                // Google Forms always returns success due to no-cors
                console.log('Form submitted to Google Forms');
                return { status: 'success' };
            })
            .catch((error) => {
                console.error('Google Forms submission error:', error);
                throw error;
            });
    }
}
```

### 6. Get Google Form Field IDs

To get the correct field IDs:

1. Open your Google Form
2. Right-click and "View Page Source" or "Inspect Element"
3. Search for `name="entry.` to find field IDs
4. Look for patterns like:
   - `name="entry.123456789"` (Full Name field)
   - `name="entry.987654321"` (Email field)
   - `name="entry.555666777"` (Message field)
5. Copy `src/config.example.js` to `src/config.js`
6. Update the `FIELD_IDS` object in `src/config.js` with these actual values

### 5. Remove EmailJS Dependencies

1. Remove EmailJS script from `index.html`:
   ```html
   <!-- Remove this line -->
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   ```

2. Remove EmailJS-related code from `main.js`:
   - EmailService class
   - emailjs.init() calls
   - EmailJS template parameters

### 6. Test Implementation

1. Deploy the updated code
2. Test form submission on the website
3. Check Google Forms responses tab for submissions
4. Verify email notifications are sent to brock@maetri.com

## Technical Considerations

### CORS Limitations
- Google Forms requires `mode: 'no-cors'` in fetch request
- This means we can't read the response from Google
- All submissions will appear as "successful" from JavaScript perspective
- Actual success/failure must be checked in Google Forms responses

### Form Validation
- Client-side validation remains the same
- Google Forms provides server-side validation as backup
- Email format validation handled by both client and Google

### User Experience
- Success message should be generic: "Thank you! Your message has been submitted."
- Cannot provide specific error messages from Google Forms
- Form reset should still occur after submission

## Files to Modify

1. **`src/main.js`**
   - Replace EmailService class with GoogleFormService
   - Update sendEmail method
   - Remove EmailJS initialization

2. **`index.html`**
   - Remove EmailJS script tag
   - No other changes needed

3. **`tasks/EMAILJS_SETUP.md`** (Optional)
   - Archive or delete this file
   - Replace with Google Forms setup instructions

## Advantages Over EmailJS

| Feature | EmailJS | Google Forms |
|---------|---------|--------------|
| Setup Complexity | High (API keys, templates) | Low (create form, get URL) |
| Reliability | API dependency | Google infrastructure |
| Cost | Free tier limited | Completely free |
| Maintenance | API key management | Zero maintenance |
| Spam Protection | Basic | Google's advanced filtering |
| Data Storage | None | Automatic Google Sheets |
| Notifications | Email service dependent | Built-in email notifications |

## Testing Checklist

- [ ] Google Form created with correct fields
- [ ] Form field IDs extracted and configured
- [ ] JavaScript updated to use Google Forms API
- [ ] EmailJS dependencies removed
- [ ] Form submission works on live site
- [ ] Responses appear in Google Forms
- [ ] Email notifications sent to brock@maetri.com
- [ ] Client-side validation still works
- [ ] Success/error messages display correctly

## Rollback Plan

If issues arise:
1. Keep EmailJS code in git history
2. Can quickly revert to EmailJS implementation
3. Both solutions can coexist during testing period

---

**Estimated Time:** 1-2 hours
**Priority:** Medium
**Dependencies:** Google account access
**Risk Level:** Low (simple implementation, easy rollback)