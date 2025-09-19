# Dynamic Content Refactoring Document

## Overview
This document outlines the refactoring plan to make the index.html dynamically load content from the JSON file `content/content-v1.0.0.json`.

## Current State Analysis

### JSON Content Structure
The current JSON file contains three main sections:
- `main_header`: Logo and menu items
- `section_1`: Primary headline and subtext
- `section_2`: Secondary content with multiple text elements
- `section_3`: Third section with headline and subtext

### HTML Structure Analysis
The current index.html has hardcoded content in several sections:
- Hero section (lines 40-68): Contains static headline and description
- Features section (lines 70-101): Has hardcoded content
- About section (lines 104-137): Contains static text and descriptions

## Refactoring Plan

### 1. Content Mapping
Map JSON content to HTML sections:

#### Hero Section (section_1)
- `section_1.headline` → Hero section h1 (line 45-48)
- `section_1.subtext` → Hero section description (line 49-53)
- `section_1.feature_image` → Hero section image (line 64)

#### Features Section (section_2) 
- `section_2.headline` → Features section main headline
- `section_2.subtext` → Array of strings, each creating a new paragraph element
- `section_2.feature_image` → Features section image

#### About Section (section_3)
- `section_3.headline` → About section headline
- `section_3.subtext` → Array of strings, each creating a new paragraph element
- `section_3.feature_image` → About section image

### 2. Implementation Approach

#### Vue.js-based Dynamic Loading (Recommended)
1. Convert HTML to Vue.js single-file application
2. Use Vue.js reactive data binding for content
3. Fetch JSON data and bind to Vue data properties
4. Leverage Vue.js template syntax for dynamic rendering
5. Handle image loading and fallbacks with Vue directives

#### Benefits of Vue.js Approach
- Reactive data binding eliminates manual DOM manipulation
- Template syntax provides clean separation of concerns
- Built-in directives for conditional rendering and loops
- Component-based architecture for scalability
- Better state management and error handling

### 3. Required Code Changes

#### Vue.js Integration
- Add Vue.js CDN or npm package
- Convert HTML template to Vue.js template syntax
- Create Vue.js application instance
- Implement reactive data properties for content
- Add computed properties and methods for content handling

#### HTML Template Changes
- Convert to Vue.js template with directives (v-for, v-if, v-text)
- Remove hardcoded content and replace with Vue bindings
- Add Vue.js mounting point (#app)
- Maintain semantic HTML structure

#### CSS Considerations
- Ensure styles work with Vue.js directives
- Add loading states with v-if/v-else
- Handle variable content lengths with Vue transitions

### 4. Benefits of Refactoring
- Content management separated from code
- Easy content updates without touching HTML
- Scalable content structure
- Better maintainability
- Support for multiple language versions in future

### 5. Vue.js Implementation Priority
1. Add Vue.js to the project (CDN or npm)
2. Create Vue.js application structure
3. Convert HTML template to Vue.js template
4. Implement content loading with Vue.js data properties
5. Add reactive content binding for all sections
6. Test and validate Vue.js integration
7. Optimize with Vue.js best practices

### 6. Vue.js File Structure
```
website/
├── content/
│   └── content-v1.0.0.json
├── src/
│   ├── main.js (Vue.js application - no Google Forms integration)
│   └── components/ (optional for future scaling)
├── index.html (Vue.js template with iframe Google Form)
└── tasks/
    └── dynamic-content-refactor.md (this file)
```

**Note:** The `config.js` file is no longer needed since Google Forms integration is removed from JavaScript and handled via iframe.

### 7. Vue.js Technical Implementation

#### Vue.js Application (src/main.js)
```javascript
const { createApp } = Vue;

createApp({
    data() {
        return {
            content: null,
            loading: true,
            error: null
        }
    },
    
    computed: {
        section_1() {
            return {
                ...this.content?.section_1 || {},
                section_name: this.content?.section_1?.section_name || 'hero section'
            };
        },
        section_2() {
            return {
                ...this.content?.section_2 || {},
                section_name: this.content?.section_2?.section_name || 'the problem'
            };
        },
        section_3() {
            return {
                ...this.content?.section_3 || {},
                section_name: this.content?.section_3?.section_name || 'why now'
            };
        },
        headerContent() {
            return this.content?.main_header || {};
        }
    },
    
    methods: {
        async loadContent() {
            try {
                this.loading = true;
                const response = await fetch('./content/content-v1.0.0.json');
                if (!response.ok) throw new Error('Failed to load content');
                this.content = await response.json();
                this.error = null;
            } catch (error) {
                console.error('Content loading error:', error);
                this.error = 'Failed to load content. Please refresh the page.';
            } finally {
                this.loading = false;
            }
        },
        
        getImagePath(imageName) {
            return imageName ? `./images/${imageName}` : '';
        },
        
        scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        
        toggleMobileMenu() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        
        initializeScrollEffects() {
            // Navigation scroll effect
            window.addEventListener('scroll', () => {
                const nav = document.querySelector('nav');
                if (window.scrollY > 100) {
                    nav.classList.add('backdrop-blur-md', 'bg-white/95');
                } else {
                    nav.classList.remove('backdrop-blur-md', 'bg-white/95');
                }
            });
        },
        
        initializeAnimations() {
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
            document.querySelectorAll('section').forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(section);
            });

            // Add hover effects to cards
            const cards = document.querySelectorAll('.shadow-lg');
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.classList.add('transform', '-translate-y-2');
                });
                card.addEventListener('mouseleave', () => {
                    card.classList.remove('transform', '-translate-y-2');
                });
            });
        }
    },
    
    async mounted() {
        await this.loadContent();
        this.initializeScrollEffects();
        this.initializeAnimations();
    }
}).mount('#app');
```

#### HTML Template Updates (index.html)
Key changes for Vue.js integration:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Existing head content -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>

<body class="bg-gray-50" id="app">
    <!-- Loading State -->
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p class="text-gray-600">Loading...</p>
        </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div class="text-center">
            <p class="text-red-600 mb-4">{{ error }}</p>
            <button @click="loadContent" class="btn-primary">Retry</button>
        </div>
    </div>

    <!-- Main Content -->
    <div v-if="!loading && !error">
        <!-- Navigation -->
        <nav class="bg-white shadow-md fixed w-full top-0 z-50">
            <div class="container mx-auto px-6 py-4">
                <div class="flex justify-between items-center">
                    <div class="text-2xl font-bold text-primary">
                        <img :src="getImagePath('logos/maetri_plain-w-icon.png')" alt="Maetri Logo" class="w-43 inline-block">
                    </div>
                    <!-- Navigation items removed - keep logo only -->
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section :id="section_1.section_name ? section_1.section_name.replace(/\s+/g, '_') : 'hero_section'" class="pt-24 pb-16" style="background-color: #e0e7ff;">
            <div class="container mx-auto px-6">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div class="pt-16">
                        <h5 class="font-light m-0 text-sm tracking-wider text-gray-500 mb-4">THE CORE BELIEF</h5>
                        <h1 class="m-0 text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-serif leading-tight">
                            {{ section_1.headline || 'Default headline...' }}
                        </h1>
                        <p class="text-lg text-gray-600 mb-8 leading-relaxed">
                            {{ section_1.subtext || 'Default subtext...' }}
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4">
                            <a @click="scrollToSection('contact')" class="btn-primary text-center inline-block cursor-pointer">
                                Get Started Today
                            </a>
                            <a @click="scrollToSection(section_2.section_name ? section_2.section_name.replace(/\s+/g, '_') : 'the_problem')" class="btn-secondary text-center inline-block cursor-pointer">
                                Learn More
                            </a>
                        </div>
                    </div>
                    <div class="md:block">
                        <img :src="getImagePath(section_1.feature_image)" alt="Healthcare technology" class="w-full h-auto rounded-lg shadow-lg">
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section :id="section_2.section_name ? section_2.section_name.replace(/\s+/g, '_') : 'the_problem'" class="special-linear-bg-transparent-to-white pb-16 py-16">
            <div class="container mx-auto px-6">
                <div class="text-center mx-auto max-w-4xl mb-12 bg-secondary text-white px-8 py-6 rounded-full shadow-lg">
                    <h5 class="m-0 font-light text-sm tracking-wider mb-2">WHAT ARE EARLY ALERTS</h5>
                    <h2 class="m-0 text-2xl md:text-3xl font-bold font-serif leading-tight">
                        {{ section_2.headline || 'Default features headline...' }}
                    </h2>
                </div>

                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div class="transition-transform hover:scale-105 duration-300">
                        <img :src="getImagePath(section_2.feature_image)" alt="Features" class="w-full h-auto rounded-lg shadow-md">
                    </div>

                    <div class="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div v-if="section_2.subtext">
                            <p v-for="text in section_2.subtext" :key="text" class="text-lg text-gray-600 mb-4 leading-relaxed">
                                {{ text }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section :id="section_3.section_name ? section_3.section_name.replace(/\s+/g, '_') : 'why_now'" class="py-16 bg-gray-50">
            <div class="container mx-auto px-6">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div class="order-2 md:order-1">
                        <img :src="getImagePath(section_3.feature_image)" alt="About" class="w-full h-auto rounded-lg shadow-md mb-6">
                        <div v-if="section_3.subtext">
                            <p v-for="text in section_3.subtext" :key="text" class="text-lg text-gray-600 leading-relaxed mb-4">
                                {{ text }}
                            </p>
                        </div>
                    </div>
                    <div class="order-1 md:order-2">
                        <h5 class="m-0 font-light text-sm tracking-wider text-gray-500 mb-4">WHAT MAETRI DETECTS</h5>
                        <h2 class="m-0 text-3xl md:text-4xl font-bold text-gray-800 mb-8 font-serif leading-tight">
                            {{ section_3.headline || 'Default about headline...' }}
                        </h2>
                        <!-- Existing table content can remain static or be moved to JSON -->
                    </div>
                </div>
            </div>
        </section>

        <!-- Rest of existing sections remain the same -->
        
        <!-- Contact Form Section (Keep existing iframe) -->
        <section id="contact" class="py-16 bg-primary">
            <div class="container mx-auto px-6">
                <div class="max-w-4xl mx-auto">
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSeG3cy5zFq2WTqJ-DV0C_QmBQO4B1NJoo2dsF0VXCRdjGRBMQ/viewform?embedded=true"
                        width="100%" height="821" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                </div>
            </div>
        </section>
    </div>

    <script type="module" src="./src/main.js"></script>
</body>
</html>
```

#### Vue.js Directives Strategy

**Vue.js Template Binding:**
- `{{ section_1.headline }}` - Text interpolation for headlines
- `{{ section_1.subtext }}` - Text interpolation for single strings  
- `:src="getImagePath(section_1.feature_image)"` - Dynamic image binding
- `v-for="text in section_2.subtext"` - Loop through arrays to create paragraphs
- `v-if="loading"` / `v-else` - Conditional rendering for loading states
- `@click="scrollToSection('features')"` - Event binding for navigation

**Key Vue.js Features Used:**
- **Computed Properties:** Clean data access with `section_1`, `section_2`, `section_3`
- **Methods:** `loadContent()`, `getImagePath()`, `scrollToSection()`  
- **Lifecycle Hooks:** `mounted()` for initialization
- **Conditional Rendering:** Loading and error states
- **List Rendering:** Dynamic paragraph creation from arrays
- **Event Handling:** Click handlers for navigation and forms

### 8. Vue.js Benefits & Risk Mitigation

#### Benefits of Vue.js Approach
- **Reactive Data Binding:** Automatic UI updates when content changes
- **Template Syntax:** Clean, readable HTML with minimal JavaScript
- **Built-in Directives:** `v-for`, `v-if`, `v-show` for dynamic content
- **Computed Properties:** Efficient derived data without manual updates
- **Component Architecture:** Easy to scale and maintain
- **Developer Experience:** Excellent debugging and development tools

#### Risk Mitigation
- **Fallback Content:** Use `|| 'Default text...'` in templates for missing data
- **Error Handling:** Dedicated error state with retry functionality
- **Loading States:** Professional loading spinner and error messages
- **SEO Considerations:** Consider server-side rendering (SSR) if SEO is critical
- **Progressive Enhancement:** App works with JavaScript disabled (static fallbacks)
- **Accessibility:** Maintain semantic HTML structure and proper ARIA attributes
- **Performance:** Vue.js is lightweight and won't significantly impact load times

#### Migration Strategy
1. **Incremental Migration:** Convert one section at a time
2. **Preserve Existing Functionality:** Keep all current features working
3. **Testing:** Test all interactive elements (forms, navigation, animations)
4. **Backward Compatibility:** Ensure site works if Vue.js fails to load