# Contact Form with Captcha Implementation (EmailJS Integration)

## Overview
Create a custom contact form to replace the current Google Forms iframe with a clean, branded form that includes captcha protection and integrates with EmailJS for serverless email delivery through the existing Vue.js application.

## Requirements

### Form Fields
- **Full Name** (required)
  - Input type: text
  - Validation: Required, minimum 2 characters
  - Placeholder: "Your full name"

- **Email** (required)
  - Input type: email
  - Validation: Required, valid email format
  - Placeholder: "your.email@example.com"

### Form Elements
- **CTA Button**: "Contact Us"
  - Style: Use existing `.btn-primary` class
  - State: Disabled until form is valid and captcha is completed

### Captcha Integration
- **Service**: Google reCAPTCHA v2
- **Implementation**: Client-side validation integrated with EmailJS
- **Fallback**: Form submission disabled without captcha completion

### EmailJS Integration
- **Service**: EmailJS for serverless email delivery
- **Template**: Custom email template with form data
- **Authentication**: Public key and service ID configuration

## Technical Implementation

### Dependencies
Add EmailJS CDN to the HTML head:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit" async defer></script>
<script type="module" src="./src/config.js"></script>
```

### HTML Structure
```html
<!-- Contact Form Section -->
<section id="contact" class="py-16 bg-primary">
    <div class="container mx-auto px-6">
        <div class="max-w-2xl mx-auto">
            <div class="bg-white rounded-xl shadow-lg p-8">
                <h2 class="text-3xl font-semibold font-sans text-gray-800 mb-6 text-center">
                    Get In Touch
                </h2>
                
                <form @submit.prevent="submitContactForm" class="space-y-6">
                    <!-- Full Name Field -->
                    <div>
                        <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <input 
                            type="text" 
                            id="fullName"
                            v-model="contactForm.fullName"
                            :class="{'border-red-500': errors.fullName}"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Your full name"
                            required
                        >
                        <p v-if="errors.fullName" class="text-red-500 text-sm mt-1">{{ errors.fullName }}</p>
                    </div>

                    <!-- Email Field -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <input 
                            type="email" 
                            id="email"
                            v-model="contactForm.email"
                            :class="{'border-red-500': errors.email}"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="your.email@example.com"
                            required
                        >
                        <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
                    </div>

                    <!-- reCAPTCHA -->
                    <div class="flex justify-center">
                        <div id="recaptcha-container"></div>
                    </div>

                    <!-- Submit Button -->
                    <div class="text-center">
                        <button 
                            type="submit" 
                            :disabled="!isFormValid || isSubmitting"
                            :class="{'opacity-50 cursor-not-allowed': !isFormValid || isSubmitting}"
                            class="btn-primary px-8 py-3 text-lg"
                        >
                            {{ isSubmitting ? 'Sending...' : 'Contact Us' }}
                        </button>
                    </div>

                    <!-- Success/Error Messages -->
                    <div v-if="submitMessage" :class="submitSuccess ? 'text-green-600' : 'text-red-600'" class="text-center mt-4">
                        {{ submitMessage }}
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
```

### Vue.js Implementation

#### Data Properties
```javascript
import { emailjsConfig } from './config.js';

data() {
    return {
        // ... existing data
        contactForm: {
            fullName: '',
            email: ''
        },
        errors: {},
        isSubmitting: false,
        submitMessage: '',
        submitSuccess: false,
        recaptchaToken: null,
        emailjsConfig: emailjsConfig
    }
},
```

#### Computed Properties
```javascript
computed: {
    // ... existing computed
    isFormValid() {
        return this.contactForm.fullName.trim().length >= 2 && 
               this.isValidEmail(this.contactForm.email) && 
               this.recaptchaToken !== null;
    }
},
```

#### Methods
```javascript
methods: {
    // ... existing methods
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    validateForm() {
        this.errors = {};
        
        if (this.contactForm.fullName.trim().length < 2) {
            this.errors.fullName = 'Full name must be at least 2 characters';
        }
        
        if (!this.isValidEmail(this.contactForm.email)) {
            this.errors.email = 'Please enter a valid email address';
        }
        
        return Object.keys(this.errors).length === 0;
    },

    async submitContactForm() {
        if (!this.validateForm() || !this.recaptchaToken) {
            return;
        }

        this.isSubmitting = true;
        this.submitMessage = '';

        try {
            // Initialize EmailJS if not already done
            if (!window.emailjs) {
                throw new Error('EmailJS not loaded');
            }

            // Initialize EmailJS with public key
            emailjs.init(this.emailjsConfig.publicKey);

            // Prepare template parameters
            const templateParams = {
                from_name: this.contactForm.fullName,
                from_email: this.contactForm.email,
                to_email: 'contact@maetri.com', // Your email
                message: `New contact form submission from ${this.contactForm.fullName} (${this.contactForm.email})`,
                'g-recaptcha-response': this.recaptchaToken
            };

            // Send email via EmailJS
            const response = await emailjs.send(
                this.emailjsConfig.serviceId,
                this.emailjsConfig.templateId,
                templateParams
            );

            if (response.status === 200) {
                this.submitSuccess = true;
                this.submitMessage = 'Thank you! Your message has been sent successfully.';
                this.resetForm();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('EmailJS Error:', error);
            this.submitSuccess = false;
            this.submitMessage = 'Sorry, there was an error sending your message. Please try again.';
        } finally {
            this.isSubmitting = false;
        }
    },

    resetForm() {
        this.contactForm = { fullName: '', email: '' };
        this.errors = {};
        this.recaptchaToken = null;
        // Reset reCAPTCHA
        if (window.grecaptcha) {
            window.grecaptcha.reset();
        }
    },

    onRecaptchaVerify(token) {
        this.recaptchaToken = token;
    },

    onRecaptchaExpired() {
        this.recaptchaToken = null;
    }
}
```

### reCAPTCHA Integration

#### reCAPTCHA Initialization (Updated)
```javascript
import { recaptchaConfig } from './config.js';

// Global function for reCAPTCHA callback
window.onRecaptchaLoad = function() {
    window.grecaptcha.render('recaptcha-container', {
        'sitekey': recaptchaConfig.siteKey,
        'callback': window.app.onRecaptchaVerify,
        'expired-callback': window.app.onRecaptchaExpired
    });
};
```

### EmailJS Setup

#### Vue.js App Lifecycle
```javascript
mounted() {
    // Initialize EmailJS when the app mounts
    if (window.emailjs) {
        emailjs.init(this.emailjsConfig.publicKey);
    }
}
```

## EmailJS Configuration

### EmailJS Account Setup
1. **Create EmailJS Account**: Sign up at [emailjs.com](https://www.emailjs.com/)
2. **Add Email Service**: 
   - Gmail, Outlook, or custom SMTP
   - Configure authentication
3. **Create Email Template**
4. **Get Service Credentials**

### Email Template Setup
Create a template in EmailJS dashboard with these variables:
```html
Subject: New Contact Form Submission - {{from_name}}

Hello,

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Submitted: {{submission_date}}

Message: {{message}}

Best regards,
Maetri Contact Form
```

### Service Configuration
Required EmailJS IDs:
- **Service ID**: Your email service identifier
- **Template ID**: Your email template identifier  
- **Public Key**: Your EmailJS public key

### Security Features
1. **Domain Restrictions**: Configure allowed domains in EmailJS
2. **Rate Limiting**: Built-in EmailJS rate limiting
3. **Template Variables**: Sanitized automatically by EmailJS
4. **reCAPTCHA Integration**: Client-side validation prevents spam

## Styling Considerations

### CSS Additions
```css
/* Form styling enhancements */
.form-input:focus {
    outline: none;
    border-color: #5090DA;
    box-shadow: 0 0 0 3px rgba(80, 144, 218, 0.1);
}

.form-error {
    border-color: #ef4444;
}

/* reCAPTCHA responsive styling */
@media (max-width: 768px) {
    .g-recaptcha {
        transform: scale(0.85);
        transform-origin: 0 0;
    }
}
```

### Responsive Design
- Form container: `max-w-2xl` on desktop, full width on mobile
- Input fields: Full width with proper padding
- reCAPTCHA: Centered and responsive scaling

## Security Considerations

1. **Domain Restrictions**: Configure EmailJS to only accept requests from your domain
2. **Rate Limiting**: EmailJS provides built-in rate limiting per account
3. **reCAPTCHA Protection**: Prevents automated spam submissions
4. **Input Validation**: Client-side validation with proper error handling
5. **SSL/HTTPS**: Ensure secure data transmission
6. **API Key Security**: Use public key only (never expose private keys)

## Testing Checklist

- [ ] Form validation works for all fields
- [ ] reCAPTCHA integration functions correctly
- [ ] EmailJS integration sends emails successfully
- [ ] Form submission handles success/error states
- [ ] Responsive design works on all devices
- [ ] Email delivery works in production environment
- [ ] Domain restrictions are properly configured
- [ ] Rate limiting prevents abuse
- [ ] Accessibility standards are met
- [ ] Error handling for EmailJS failures

## Configuration

### Configuration File Setup

#### Create `src/config.example.js`
```javascript
// EmailJS Configuration
// Copy this file to config.js and replace with your actual values

export const emailjsConfig = {
    serviceId: 'service_xxxxxxx',        // Your EmailJS Service ID
    templateId: 'template_xxxxxxx',      // Your EmailJS Template ID  
    publicKey: 'xxxxxxxxxxxxxxxxxx'     // Your EmailJS Public Key
};

export const recaptchaConfig = {
    siteKey: 'your_recaptcha_site_key_here'  // Your reCAPTCHA Site Key
};
```

#### Create `src/config.js`
```javascript
// EmailJS Configuration - ACTUAL VALUES
// This file should not be committed to version control

export const emailjsConfig = {
    serviceId: 'service_abc123',         // Replace with your actual Service ID
    templateId: 'template_xyz789',       // Replace with your actual Template ID
    publicKey: 'your_actual_public_key'  // Replace with your actual Public Key
};

export const recaptchaConfig = {
    siteKey: 'your_actual_recaptcha_site_key'  // Replace with your actual reCAPTCHA Site Key
};
```

### Updated reCAPTCHA Configuration
```javascript
import { recaptchaConfig } from './config.js';

// Global function for reCAPTCHA callback
window.onRecaptchaLoad = function() {
    window.grecaptcha.render('recaptcha-container', {
        'sitekey': recaptchaConfig.siteKey,
        'callback': window.app.onRecaptchaVerify,
        'expired-callback': window.app.onRecaptchaExpired
    });
};
```

### File Structure
```
src/
├── config.example.js    # Template file (commit to git)
├── config.js           # Actual config (add to .gitignore)
└── main.js            # Vue.js app with config import
```

### .gitignore Update
Add to your `.gitignore` file:
```gitignore
# Configuration files with sensitive data
src/config.js
```

### EmailJS Dashboard Configuration
1. **Service Setup**: Add Gmail/Outlook service
2. **Template Variables**: Configure with: `from_name`, `from_email`, `message`, `g-recaptcha-response`
3. **Domain Restrictions**: Add your domain to allowed origins
4. **Auto-Reply**: Optional confirmation email to user

## Implementation Steps

1. **Setup EmailJS**
   - Create EmailJS account at [emailjs.com](https://www.emailjs.com/)
   - Add email service (Gmail/Outlook)
   - Create email template with required variables
   - Configure domain restrictions

2. **Setup reCAPTCHA**
   - Register domain with Google reCAPTCHA
   - Get site key for client-side integration

3. **Configuration Files**
   - Copy `src/config.example.js` to `src/config.js`
   - Replace placeholder values with actual EmailJS and reCAPTCHA keys
   - Add `src/config.js` to `.gitignore` to prevent committing sensitive keys
   - Keep `src/config.example.js` in version control as template

4. **Frontend Implementation**
   - Add EmailJS and reCAPTCHA CDN scripts to index.html
   - Import configuration from `src/config.js` in main.js
   - Replace Google Forms iframe with custom form HTML
   - Implement Vue.js form logic with EmailJS integration
   - Add form validation and error handling
   - Style the form components with existing CSS classes

5. **Security Configuration**
   - Configure EmailJS domain restrictions
   - Ensure `config.js` is in `.gitignore`
   - Verify reCAPTCHA domain settings

6. **Testing & Deployment**
   - Test form submission flow with EmailJS
   - Verify email delivery to intended recipient
   - Test reCAPTCHA functionality
   - Test responsive design on all devices
   - Deploy and verify production functionality
   - Ensure config files are properly excluded from deployment

## Success Metrics

- Form submission success rate > 95%
- EmailJS delivery reliability > 99%
- reCAPTCHA spam prevention effectiveness
- User experience feedback
- Page load performance impact
- Zero server maintenance overhead

## Benefits of EmailJS Integration

### Advantages
- **No Backend Required**: Serverless email delivery
- **Easy Setup**: No server configuration needed
- **Built-in Security**: Domain restrictions and rate limiting
- **Reliable Delivery**: Professional email service integration
- **Cost Effective**: Free tier available for moderate usage
- **Quick Implementation**: Ready to deploy immediately

### Limitations
- **Client-side Only**: No server-side reCAPTCHA verification
- **Rate Limits**: Monthly email quotas based on plan
- **Dependency**: Relies on EmailJS service availability
- **Template Management**: Changes require EmailJS dashboard access

## Alternative Considerations
If server-side reCAPTCHA verification is required, consider:
1. **Netlify Forms** with Functions
2. **Vercel API Routes** with EmailJS
3. **Custom serverless functions** (AWS Lambda, etc.)