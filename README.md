# Maetri - Evidence-Based Outcomes When Care Is the Real Work

Built with HTML, JavaScript, and Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with full responsive layout
- **Contact Form**: Advanced form validation and user feedback
- **Smooth Animations**: Fade-in effects and smooth scrolling
- **Professional UI**: Healthcare-appropriate design with trust signals
- **Performance Optimized**: Minified CSS and optimized assets

## 📁 Project Structure

```text
website/
├── index.html              # Main HTML file
├── src/
│   ├── input.css          # Tailwind CSS source
│   └── main.js            # JavaScript functionality
├── dist/
│   └── output.css         # Generated CSS
├── images/                # Image assets (empty)
├── tasks/                 # Development guides
│   └── healthcare-landing-page-guide.md
├── package.json           # NPM configuration
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🛠️ Installation & Setup

1. **Clone or navigate to the project directory**

   ```bash
   cd website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run serve
   ```

   The site will be available at `http://localhost:3000`

## 🎯 Available Scripts

- `npm run serve` - Start local development server
- `npm run build-prod` - Build minified CSS for production
- `npm run deploy` - Deploy to GitHub Pages
- `npm run dev` - Start development with watch mode

## 📝 Page Sections

1. **Navigation** - Fixed header with smooth scroll links
2. **Hero Section** - Main value proposition and call-to-action
3. **Features** - Three key benefits with icons
4. **About** - Company credibility and trust signals  
5. **Testimonials** - Customer reviews with star ratings
6. **Contact Form** - Lead capture form with validation
7. **Footer** - Links and company information

## 🎨 Design Features

- **Color Scheme**: Maetri brand colors - Primary (#5090DA), Secondary (#D8A5A3)
- **Typography**: Inter for body text, Playfair Display for headers
- **Icons**: Font Awesome icons throughout
- **Images**: High-quality Unsplash stock photos
- **Animations**: Fade-in on scroll and hover effects

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## 🔧 Form Integration

The contact form includes:

- Client-side validation
- Email format validation
- Required field checking
- Success/error messaging
- Form reset after submission

To integrate with a backend service:

1. Replace the `sendEmail()` method in `main.js`
2. Add your API endpoint or service (EmailJS, Formspree, etc.)
3. Update error handling as needed

## 🚀 Deployment Options

### GitHub Pages

1. Push code to GitHub repository
2. Run `npm run deploy` to deploy via gh-pages
3. Enable GitHub Pages in repository settings

### Manual Deployment

1. Run `npm run build-prod` to generate production CSS
2. Upload all files to your web server
3. Ensure `index.html` is in the root directory

## 🧪 Testing Checklist

- [x] Contact form validation works
- [x] Form submission handling
- [x] Smooth scrolling navigation
- [x] Responsive design on all devices
- [x] Cross-browser compatibility
- [x] Performance optimization

## 🔗 Live Demo

Visit the deployed site at: `https://joelle-maetri.github.io/maetri`

## 📞 Contact Information

- **Email**: Contact form on website

## 🛡️ Security & Compliance

- HIPAA compliant design considerations
- No sensitive data stored client-side
- Form validation prevents injection attacks
- Secure external CDN resources

## 📈 Performance Features

- Minified CSS (< 50KB)
- Optimized images with proper sizing
- Lazy loading support ready
- Fast loading fonts from Google Fonts

## 🎯 SEO Ready

- Semantic HTML structure
- Meta tags for description and social sharing
- Proper heading hierarchy (h1-h3)
- Alt tags for all images
- Clean URL structure

---

## Built with ❤️ for better healthcare accessibility
