# Contact Form Modal Implementation (EmailJS Integration)

## Overview

Refactor the contact form from a dedicated section into a modal popup that can be triggered from multiple locations: the "Get Started Today" button in the hero section and a "Contact" button in the main navigation menu. This provides better user experience by allowing contact access from anywhere on the page without scrolling.

Email JS: https://www.emailjs.com/pricing/

## Requirements

### Modal Functionality
- **Trigger Locations**: 
  - Hero section "Get Started Today" button
  - Navigation menu "Contact" button
- **Modal Behavior**: 
  - Overlay background with blur effect
  - Close on outside click or ESC key
  - Responsive design for all devices
  - Smooth open/close animations

### Form Fields (Same as Original)
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
Add EmailJS CDN to the HTML head (same as original):
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script
  src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit"
  async
  defer
></script>
<script type="module" src="./src/config.js"></script>
```

### HTML Structure Updates

#### Navigation Menu Update
```html
<!-- Navigation -->
<nav class="bg-white shadow-md fixed w-full top-0 z-50">
    <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
            <div class="text-2xl font-bold text-primary">
                <img :src="getImagePath('logos/maetri_logo-md-color.png')" alt="Maetri Logo" class="w-43 inline-block">
            </div>
            <!-- Add Contact button to navigation -->
            <div class="flex items-center space-x-4">
                <button @click="openContactModal" class="btn-secondary px-6 py-2 text-sm">
                    Contact
                </button>
            </div>
        </div>
    </div>
</nav>
```

#### Hero Section Update
```html
<!-- Hero Section - Update CTA button -->
<section :id="section_1.section_name ? section_1.section_name.replace(/\s+/g, '_') : 'hero_section'" class="pt-24 pb-16" style="background-color: #e0e7ff;">
    <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="pt-16">
                <h5 class="font-medium m-0 text-sm tracking-wider text-gray-500 mb-4">THE CORE BELIEF</h5>
                <h1 class="m-0 text-4xl lg:text-5xl font-semibold text-gray-800 mb-6 font-sans leading-tight">
                    {{ section_1.headline || 'Default headline...' }}
                </h1>
                <p class="text-lg text-gray-600 mb-8 leading-relaxed">
                    {{ section_1.subtext || 'Default subtext...' }}
                </p>
                <div class="flex flex-col sm:flex-row gap-4">
                    <!-- Update button to trigger modal instead of scroll -->
                    <button @click="openContactModal" class="btn-primary text-center inline-block cursor-pointer">
                        Get Started Today
                    </button>
                </div>
            </div>
            <div class="lg:block">
                <img :src="getImagePath(section_1.feature_image)" alt="Healthcare technology" class="w-full h-auto rounded-lg shadow-lg">
            </div>
        </div>
    </div>
</section>
```

#### Contact Modal Structure
```html
<!-- Contact Modal -->
<div v-if="showContactModal" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeContactModal">
    <!-- Modal Overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"></div>
    
    <!-- Modal Content -->
    <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto transform transition-all">
            
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 class="text-3xl font-semibold font-sans text-gray-800">
                    Get In Touch
                </h2>
                <button @click="closeContactModal" class="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <!-- Modal Body -->
            <div class="p-6">
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
                        <div id="recaptcha-container-modal"></div>
                    </div>

                    <!-- Modal Footer -->
                    <div class="flex justify-end space-x-4 pt-4">
                        <button 
                            type="button" 
                            @click="closeContactModal"
                            class="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            :disabled="!isFormValid || isSubmitting"
                            :class="{'opacity-50 cursor-not-allowed': !isFormValid || isSubmitting}"
                            class="btn-primary px-8 py-3"
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
</div>
```

### Vue.js Implementation

#### Data Properties
```javascript
import { emailjsConfig } from './config.js';

data() {
    return {
        // ... existing data
        showContactModal: false,
        contactForm: {
            fullName: '',
            email: ''
        },
        errors: {},
        isSubmitting: false,
        submitMessage: '',
        submitSuccess: false,
        recaptchaToken: null,
        emailjsConfig: emailjsConfig,
        recaptchaWidgetId: null
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
    
    openContactModal() {
        this.showContactModal = true;
        this.resetForm();
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        
        // Initialize reCAPTCHA after modal is shown
        this.$nextTick(() => {
            this.initializeRecaptcha();
        });
    },

    closeContactModal() {
        this.showContactModal = false;
        this.resetForm();
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Reset reCAPTCHA
        if (this.recaptchaWidgetId !== null && window.grecaptcha) {
            window.grecaptcha.reset(this.recaptchaWidgetId);
        }
    },

    initializeRecaptcha() {
        if (window.grecaptcha && !this.recaptchaWidgetId) {
            this.recaptchaWidgetId = window.grecaptcha.render('recaptcha-container-modal', {
                'sitekey': recaptchaConfig.siteKey,
                'callback': this.onRecaptchaVerify,
                'expired-callback': this.onRecaptchaExpired
            });
        }
    },

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
                to_email: 'contact@maetri.com',
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
                
                // Close modal after successful submission (with delay)
                setTimeout(() => {
                    this.closeContactModal();
                }, 2000);
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
        this.submitMessage = '';
        this.submitSuccess = false;
        this.isSubmitting = false;
    },

    onRecaptchaVerify(token) {
        this.recaptchaToken = token;
    },

    onRecaptchaExpired() {
        this.recaptchaToken = null;
    },

    // Handle ESC key to close modal
    handleKeydown(event) {
        if (event.key === 'Escape' && this.showContactModal) {
            this.closeContactModal();
        }
    }
},
```

#### Vue.js Lifecycle
```javascript
mounted() {
    // Initialize EmailJS when the app mounts
    if (window.emailjs) {
        emailjs.init(this.emailjsConfig.publicKey);
    }
    
    // Add ESC key listener
    document.addEventListener('keydown', this.handleKeydown);
},

beforeUnmount() {
    // Clean up event listener
    document.removeEventListener('keydown', this.handleKeydown);
    
    // Restore body scroll if modal was open
    document.body.style.overflow = '';
}
```

### reCAPTCHA Integration

#### Updated reCAPTCHA Configuration
```javascript
import { recaptchaConfig } from "./config.js";

// Global function for reCAPTCHA callback (not needed for modal implementation)
// reCAPTCHA will be initialized programmatically when modal opens
```

## Styling Considerations

### CSS Additions
```css
/* Modal styling */
.modal-overlay {
    backdrop-filter: blur(4px);
}

/* Form styling enhancements */
.form-input:focus {
    outline: none;
    border-color: #5090da;
    box-shadow: 0 0 0 3px rgba(80, 144, 218, 0.1);
}

.form-error {
    border-color: #ef4444;
}

/* Modal animations */
.modal-enter-active, .modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
    opacity: 0;
}

.modal-content-enter-active, .modal-content-leave-active {
    transition: all 0.3s ease;
}

.modal-content-enter-from, .modal-content-leave-to {
    opacity: 0;
    transform: scale(0.9) translateY(-50px);
}

/* reCAPTCHA responsive styling */
@media (max-width: 768px) {
    .g-recaptcha {
        transform: scale(0.85);
        transform-origin: 0 0;
    }
    
    /* Modal responsive adjustments */
    .modal-content {
        margin: 1rem;
        max-height: calc(100vh - 2rem);
    }
}

/* Prevent body scroll when modal is open */
body.modal-open {
    overflow: hidden;
}
```

### Responsive Design
- **Modal Container**: Full viewport height with centered content
- **Modal Content**: `max-w-2xl` with responsive margins
- **Mobile Optimization**: Reduced margins and adjusted reCAPTCHA scaling
- **Scroll Handling**: Body scroll disabled when modal is open

## Updated Implementation Steps

1. **Setup EmailJS & reCAPTCHA** (Same as original)
   - Create EmailJS account at [emailjs.com](https://www.emailjs.com/)
   - Setup reCAPTCHA v2 with domain registration

2. **Configuration Files** (Same as original)
   - Copy `src/config.example.js` to `src/config.js`
   - Replace placeholder values with actual keys
   - Add `src/config.js` to `.gitignore`

3. **Remove Contact Section**
   - Remove or comment out the existing contact form section
   - Update any scroll-to-contact functionality

4. **Add Navigation Contact Button**
   - Add contact button to main navigation
   - Style with `.btn-secondary` class

5. **Update Hero CTA Button**
   - Change from scroll action to modal trigger
   - Update click handler to `openContactModal`

6. **Implement Modal Structure**
   - Add modal HTML with overlay and content
   - Include form fields and reCAPTCHA container
   - Add proper ARIA attributes for accessibility

7. **Add Vue.js Modal Logic**
   - Implement modal show/hide functionality
   - Add ESC key and outside-click handlers
   - Handle body scroll prevention
   - Manage reCAPTCHA initialization in modal

8. **Testing & Deployment**
   - Test modal opening from both trigger locations
   - Verify form submission and EmailJS integration
   - Test mobile responsiveness and modal behavior
   - Verify accessibility and keyboard navigation

## Benefits of Modal Approach

### User Experience
- **Immediate Access**: Contact form available from any page location
- **No Page Navigation**: Users don't lose their current context
- **Focused Interaction**: Modal draws attention to contact action
- **Responsive Design**: Better mobile experience than full-page form

### Technical Advantages
- **Single Form Instance**: One form implementation for multiple triggers
- **Better State Management**: Modal state is easier to control
- **Improved Analytics**: Can track modal opens vs form submissions
- **Flexible Positioning**: Can be triggered from anywhere on the page

### Design Benefits
- **Cleaner Layout**: Removes dedicated contact section
- **More Content Space**: Page real estate freed up for other content
- **Consistent Branding**: Modal matches overall design system
- **Enhanced CTAs**: Multiple strategic contact points

## Accessibility Considerations

### Modal Accessibility
- **Focus Management**: Focus trapped within modal when open
- **ARIA Labels**: Proper `aria-labelledby` and `aria-describedby`
- **ESC Key Support**: Modal closes on ESC key press
- **Screen Reader Support**: Proper announcement of modal state

### Implementation
```html
<!-- Modal with accessibility attributes -->
<div 
    v-if="showContactModal" 
    class="fixed inset-0 z-50 overflow-y-auto" 
    role="dialog" 
    aria-labelledby="modal-title" 
    aria-modal="true"
    @click.self="closeContactModal"
>
    <!-- Modal content with proper heading structure -->
    <h2 id="modal-title" class="text-3xl font-semibold font-sans text-gray-800">
        Get In Touch
    </h2>
</div>
```

## Testing Checklist

- [ ] Modal opens from hero section CTA button
- [ ] Modal opens from navigation contact button  
- [ ] Modal closes on ESC key press
- [ ] Modal closes on outside click
- [ ] Form validation works correctly
- [ ] reCAPTCHA initializes properly in modal
- [ ] EmailJS integration sends emails successfully
- [ ] Modal is responsive on all devices
- [ ] Body scroll is prevented when modal is open
- [ ] Focus is properly managed for accessibility
- [ ] Success message displays and modal auto-closes
- [ ] Error handling works for failed submissions

## Success Metrics

- Modal open rate from different trigger points
- Form completion rate vs original contact section
- User engagement with modal vs scroll-to-form
- Mobile usability improvements
- Contact conversion rate increase
- Page performance impact (minimal)

This modal implementation provides a more modern, accessible, and user-friendly contact experience while maintaining all the security and functionality of the original EmailJS integration.