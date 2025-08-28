// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// EmailJS configuration
class EmailService {
    constructor() {
        // Initialize EmailJS with your public key
        // To get these values:
        // 1. Go to https://www.emailjs.com/
        // 2. Create an account and add an email service (Gmail, Outlook, etc.)
        // 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{message}}, {{to_email}}
        // 4. Get your public key, service ID, and template ID from EmailJS dashboard
        emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Replace with your EmailJS public key
    }
    
    static SERVICE_ID = "service_xxxxxxx"; // Replace with your EmailJS service ID
    static TEMPLATE_ID = "template_xxxxxxx"; // Replace with your EmailJS template ID
}

// Contact form handling
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.emailService = new EmailService();
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Validation - updated to match current form fields
        if (!data.fullName || !data.email) {
            this.showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!this.validateEmail(data.email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        this.submitForm(data);
    }

    submitForm(data) {
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Integrate with EmailJS or your backend
        this.sendEmail(data)
            .then(() => {
                this.showMessage('Thank you! We will contact you within 24 hours.', 'success');
                this.form.reset();
            })
            .catch(() => {
                this.showMessage('Something went wrong. Please try again.', 'error');
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    }

    sendEmail(data) {
        // Check if EmailJS is available
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS not loaded');
            return Promise.reject(new Error('EmailJS service not available'));
        }
        
        // Prepare template parameters for EmailJS
        const templateParams = {
            to_email: 'brock@maetri.com',
            from_name: data.fullName,
            from_email: data.email,
            message: data.message || 'No message provided',
            reply_to: data.email,
            subject: `New Contact Form Submission from ${data.fullName}`
        };
        
        // Send email via EmailJS
        return emailjs.send(
            EmailService.SERVICE_ID,
            EmailService.TEMPLATE_ID,
            templateParams
        ).then((response) => {
            console.log('Email sent successfully:', response.status, response.text);
            return response;
        }).catch((error) => {
            console.error('EmailJS error:', error);
            throw error;
        });
    }

    showMessage(message, type) {
        // Remove any existing messages
        const existingMessages = this.form.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());

        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message p-4 rounded-lg mb-4 ${type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`;
        messageDiv.textContent = message;
        
        this.form.insertBefore(messageDiv, this.form.firstChild);
        
        setTimeout(() => messageDiv.remove(), 5000);
    }
}

// Mobile menu functionality
class MobileMenu {
    constructor() {
        this.menuBtn = document.getElementById('mobileMenuBtn');
        this.menuOpen = false;
        this.init();
    }

    init() {
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', this.toggleMenu.bind(this));
        }
    }

    toggleMenu() {
        // This is a simple implementation - you can enhance it further
        // For now, it will scroll to the contact section on mobile
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
    new MobileMenu();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('backdrop-blur-md', 'bg-white/95');
    } else {
        nav.classList.remove('backdrop-blur-md', 'bg-white/95');
    }
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.shadow-lg');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('transform', '-translate-y-2');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('transform', '-translate-y-2');
        });
    });
});

// Form field focus effects
document.addEventListener('DOMContentLoaded', () => {
    const formFields = document.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            field.parentElement.classList.add('transform', 'scale-105');
        });
        field.addEventListener('blur', () => {
            field.parentElement.classList.remove('transform', 'scale-105');
        });
    });
});