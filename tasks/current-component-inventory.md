# Current Component Inventory - Maetri Website

## Overview

This document catalogs all existing UI components and design patterns currently implemented in the Maetri website. This inventory serves as the baseline for style guide implementation and component standardization.

## Page Structure Components

### 1. Navigation Component
**Location:** `index.html:39-48`
```html
<nav class="bg-white shadow-md fixed w-full top-0 z-50">
  <div class="container mx-auto px-6 py-4">
    <div class="flex justify-between items-center">
      <div class="text-2xl font-bold text-primary">
        <img src="..." alt="Maetri Logo" class="w-43 inline-block">
      </div>
    </div>
  </div>
</nav>
```

**Design Properties:**
- Fixed positioning with z-index 50
- White background with medium shadow
- Container with custom max-width (1200px)
- Logo with custom width (172px)
- Brand primary color text

**Enhancement Opportunities:**
- Add navigation menu items
- Mobile hamburger menu
- Active state styling
- Dropdown menu support

### 2. Loading State Component
**Location:** `index.html:21-26`
```html
<div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-white z-50">
  <div class="text-center">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
    <p class="text-gray-600">Loading...</p>
  </div>
</div>
```

**Design Properties:**
- Full-screen overlay with high z-index
- Centered content layout
- Spinning animation with brand primary color
- Consistent typography and spacing

### 3. Error State Component
**Location:** `index.html:28-34`
```html
<div v-if="error" class="fixed inset-0 flex items-center justify-center bg-white z-50">
  <div class="text-center">
    <p class="text-red-600 mb-4">{{ error }}</p>
    <button @click="loadContent" class="btn-primary">Retry</button>
  </div>
</div>
```

**Design Properties:**
- Full-screen overlay design
- Error message in red color
- Primary button for retry action
- Centered layout with proper spacing

## Section Components

### 4. Hero Section
**Location:** `index.html:51-72`
```html
<section class="pt-24 pb-16" style="background-color: #e0e7ff;">
  <div class="container mx-auto px-6">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div class="pt-16">
        <h1 class="m-0 text-4xl lg:text-5xl font-semibold text-gray-800 mb-6 font-sans leading-tight">
        <p class="text-lg text-gray-600 mb-8 leading-relaxed">
        <div class="flex flex-col sm:flex-row gap-4">
          <a class="btn-primary text-center inline-block cursor-pointer">
      </div>
      <div class="lg:block">
        <img class="w-full h-auto rounded-lg shadow-lg">
</section>
```

**Design Properties:**
- Light blue background (#e0e7ff)
- Two-column responsive grid layout
- Large typography with IBM Plex Sans
- Primary CTA button
- Hero image with rounded corners and shadow
- Responsive typography scaling (4xl to 5xl)

**Enhancement Opportunities:**
- Multiple CTA button options
- Background pattern/gradient options
- Video background support
- Animation entrance effects

### 5. Features Section
**Location:** `index.html:75-94`
```html
<section class="special-linear-bg-transparent-to-white pb-16 py-16">
  <div class="container mx-auto px-6">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div class="transition-transform hover:scale-105 duration-300">
        <img class="w-full h-auto rounded-lg shadow-md">
      </div>
      <div class="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 class="m-0 text-2xl lg:text-3xl font-semibold font-sans leading-tight">
        <div v-if="section_2.subtext">
          <p v-for="text in section_2.subtext" class="text-lg text-gray-600 mb-4 leading-relaxed">
</section>
```

**Design Properties:**
- Custom gradient background (blue to white)
- Two-column responsive layout with image and content
- Hover effects on both image and content card
- White content card with rounded corners
- Multiple paragraph support with v-for
- Smooth transitions and shadow effects

### 6. About Section
**Location:** `index.html:97-115`
```html
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-6">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div class="order-2 lg:order-1">
        <img class="w-full h-auto rounded-lg shadow-md mb-6">
      </div>
      <div class="order-1 lg:order-2">
        <h2 class="m-0 text-3xl lg:text-4xl font-semibold text-gray-800 mb-8 font-sans leading-tight">
        <div v-if="section_3.subtext">
          <p v-for="text in section_3.subtext" class="text-lg text-gray-600 leading-relaxed mb-4">
</section>
```

**Design Properties:**
- Light gray background
- Reversed column order on large screens
- Larger heading typography (3xl to 4xl)
- Consistent image and text styling
- Responsive order switching

## UI Components

### 7. Button System

#### Primary Button
```css
.btn-primary {
  background-color: #5090DA;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}
```

**Hover States:**
- Background color change to #4080C7
- Vertical translation (-2px)
- Box shadow with brand color

#### Secondary Button
```css
.btn-secondary {
  border: 2px solid #5090DA;
  color: #5090DA;
  background-color: transparent;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}
```

**Enhancement Opportunities:**
- Button size variations (small, medium, large, extra-large)
- Icon button support
- Disabled and loading states
- Full-width button option
- Destructive/warning button variants

### 8. Footer Component
**Location:** `index.html:131-151`
```html
<footer class="bg-gray-800 text-white py-12">
  <div class="container mx-auto px-6">
    <div class="grid lg:grid-cols-4 gap-8">
      <div class="lg:col-span-2">
        <div class="text-2xl font-bold mb-4 text-primary">
          <img alt="Maetri Logo" class="w-43 inline-block">
        </div>
        <p class="text-gray-400 leading-relaxed mb-4">
        <p class="text-sm text-gray-500">
      </div>
    </div>
    <div class="border-t border-gray-700 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center text-gray-400 text-sm">
      <p>&copy; 2025 Maetri. All rights reserved.</p>
      <div class="mt-4 lg:mt-0 space-x-4">
        <a href="#" class="text-secondary">Privacy Policy</a>
        <a href="#" class="text-secondary">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
```

**Design Properties:**
- Dark background with white text
- Multi-column responsive grid
- Logo with brand primary color
- Secondary color for links
- Border separator for bottom section
- Responsive layout adjustments

## Custom Design Patterns

### 9. Special Background Gradient
```css
.special-linear-bg-transparent-to-white {
  background: linear-gradient(to bottom, #e0e7ff 0%, #e0e7ff 15%, #fff 15%, #fff 100%);
}
```

**Usage:** Transition between hero section and content sections

### 10. Image Components
**Common Pattern:**
```html
<img class="w-full h-auto rounded-lg shadow-lg">
<img class="w-full h-auto rounded-lg shadow-md">
```

**Design Properties:**
- Full-width responsive images
- Automatic height
- Rounded corners (lg = 0.5rem)
- Shadow variations (md/lg)
- Hover effects on some instances

### 11. Card Components

#### Content Card (Features Section)
```html
<div class="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
```

#### Custom Card (CSS)
```css
.custom-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}
```

**Enhancement Opportunities:**
- Card header/footer sections
- Card with images
- Outlined card variants
- Elevated card variations

## Typography Patterns

### 12. Heading Hierarchy
```html
h1: text-4xl lg:text-5xl font-semibold text-gray-800 font-sans leading-tight
h2: text-2xl lg:text-3xl font-semibold font-sans leading-tight
h2 (large): text-3xl lg:text-4xl font-semibold text-gray-800 font-sans leading-tight
```

### 13. Body Text Patterns
```html
p: text-lg text-gray-600 leading-relaxed
p (small): text-sm text-gray-500
```

## Layout Patterns

### 14. Container System
```html
<div class="container mx-auto px-6">
```

**Properties:**
- Max-width: 1200px
- Centered with auto margins
- Consistent horizontal padding

### 15. Grid Layouts
```html
<div class="grid lg:grid-cols-2 gap-12 items-center">
<div class="grid lg:grid-cols-4 gap-8">
```

**Common Patterns:**
- Two-column layouts for content sections
- Large gap spacing (gap-12 = 3rem)
- Vertical alignment with items-center

## Missing Component Categories

### Form Components
- Input fields
- Textareas
- Checkboxes and radio buttons
- Form labels and validation
- Form groups and layouts

### Navigation Components
- Breadcrumbs
- Pagination
- Tabs
- Sidebar navigation

### Feedback Components
- Alerts and notifications
- Tooltips
- Progress indicators
- Badges

### Data Display Components
- Tables
- Lists
- Statistics/metrics
- Testimonials

### Interactive Components
- Modals/dialogs
- Accordions
- Dropdowns
- Carousels

## Component Enhancement Priorities

### High Priority
1. **Button System Enhancement**
   - Size variations (sm, md, lg, xl)
   - State variations (disabled, loading)
   - Icon support

2. **Form Component Library**
   - Input field styling
   - Form validation states
   - Form layout patterns

3. **Card Component Variations**
   - Header/footer sections
   - Different elevation levels
   - Content organization patterns

### Medium Priority
1. **Navigation Enhancements**
   - Mobile menu system
   - Active state styling
   - Dropdown menus

2. **Typography System**
   - Semantic typography classes
   - Complete heading hierarchy
   - Text utility variations

### Low Priority
1. **Advanced Interactive Components**
   - Modal system
   - Accordion components
   - Carousel/slider components

2. **Data Display Components**
   - Table styling
   - List variations
   - Statistics displays

This component inventory provides a comprehensive foundation for implementing the Maetri style guide while identifying areas for enhancement and standardization.