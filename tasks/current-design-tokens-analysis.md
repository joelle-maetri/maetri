# Current Design Tokens Analysis - Maetri Website

## Overview

This document provides a comprehensive analysis of the current design tokens implemented in the Maetri website's Tailwind CSS configuration. This analysis serves as the foundation for implementing the Maetri style guide integration.

## Current Color System

### Brand Colors
```css
Primary: #5090DA (Maetri Blue)
Secondary: #D8A5A3 (Maetri Pink/Rose)
Accent: #9333ea (Purple)
```

### Grayscale Palette
```css
White: #ffffff
Gray 50: #f9fafb (light backgrounds)
Gray 400: #9ca3af (medium text)
Gray 600: #4b5563 (dark text)
Gray 700: #374151 (borders, darker text)
Gray 800: #1f2937 (very dark text, dark backgrounds)
```

### Status Colors
```css
Green 600: #16a34a (success states)
Blue 100: #dbeafe (light blue backgrounds)
Green 100: #dcfce7 (light green backgrounds)
Purple 100: #f3e8ff (light purple backgrounds)
```

### Color Usage Classes
**Text Colors:**
- `.text-primary` - Maetri Blue
- `.text-secondary` - Maetri Pink/Rose
- `.text-accent` - Purple accent
- `.text-white`, `.text-gray-400`, `.text-gray-600`, `.text-gray-700`, `.text-gray-800`

**Background Colors:**
- `.bg-primary` - Maetri Blue
- `.bg-secondary` - Maetri Pink/Rose
- `.bg-white`, `.bg-gray-50`, `.bg-gray-800`
- `.bg-blue-100`, `.bg-green-100`, `.bg-purple-100`

**Border Colors:**
- `.border-primary` - Maetri Blue
- `.border-secondary` - Maetri Pink/Rose
- `.border-gray-300`, `.border-gray-700`

## Typography System

### Font Families
```css
Primary: 'IBM Plex Sans', sans-serif (main text)
Accent: 'Playfair Display', serif (decorative headers)
```

### Font Weights
```css
Light: 300
Regular: 400 (body text)
Medium: 500 (h3-h6)
Semibold: 600 (h1-h2)
Bold: 700
```

### Font Size Scale
```css
Small: 0.875rem (14px)
Base: 1rem (16px) - implied default
Large: 1.125rem (18px)
XL: 1.25rem (20px)
2XL: 1.5rem (24px)
3XL: 1.875rem (30px)
4XL: 2.25rem (36px)
5XL: 3rem (48px)
6XL: 3.75rem (60px) - XL breakpoint only
```

### Typography Utilities
- `.font-serif` - Playfair Display
- `.font-sans` - IBM Plex Sans
- `.font-light` to `.font-bold` - Weight variations
- `.tracking-wider` - Letter spacing
- `.leading-tight`, `.leading-relaxed` - Line height

## Button System

### Primary Button
```css
Background: #5090DA (Maetri Blue)
Color: white
Padding: 1rem 2rem
Border radius: 0.5rem
Font weight: 600 (semibold)
Hover: #4080C7 (darker blue) + translateY(-2px) + shadow
```

### Secondary Button
```css
Border: 2px solid #5090DA
Color: #5090DA
Background: transparent
Padding: 1rem 2rem
Border radius: 0.5rem
Font weight: 600 (semibold)
Hover: bg-primary + white text + translateY(-2px)
```

### Button States
- Default styling with smooth transitions (0.3s ease)
- Hover effects with vertical translation and shadow
- Responsive sizing for mobile devices

## Spacing System

### Padding Scale
```css
p-4: 1rem (16px)
p-6: 1.5rem (24px)
p-8: 2rem (32px)
p-10: 2.5rem (40px)
px/py variants available
```

### Margin Scale
```css
m-0: 0
mb-2: 0.5rem (8px)
mb-4: 1rem (16px)
mb-6: 1.5rem (24px)
mb-8: 2rem (32px)
mb-12: 3rem (48px)
mb-16: 4rem (64px)
```

### Gap System
```css
gap-2: 0.5rem (8px)
gap-4: 1rem (16px)
gap-6: 1.5rem (24px)
gap-8: 2rem (32px)
gap-12: 3rem (48px)
```

## Layout System

### Container
```css
Max-width: 1200px
Center aligned: margin 0 auto
Responsive padding: 0 1.5rem default
```

### Grid System
- 2, 3, 4 column variations
- Responsive grid utilities for md and lg breakpoints
- Column span utilities for complex layouts

### Responsive Breakpoints
```css
sm: 640px (small screens and up)
md: 768px (medium screens and up)
lg: 1024px (large screens and up)
xl: 1280px (extra large screens and up)
```

## Shadow System

### Box Shadows
```css
shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)
shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)
shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)
```

## Border Radius System

```css
rounded: 0.25rem (4px)
rounded-lg: 0.5rem (8px)
rounded-xl: 0.75rem (12px)
```

## Custom Components

### Special Background Gradient
```css
.special-linear-bg-transparent-to-white
Linear gradient from #e0e7ff to white
```

### Custom Card Component
```css
.custom-card
White background, rounded corners, subtle shadow
Hover effects: increased shadow + translateY(-4px)
```

### Text Gradient
```css
.text-gradient
Linear gradient: #5090DA to #D8A5A3
Background-clip: text for gradient text effect
```

## Current Gaps and Opportunities

### Missing Design Tokens
1. **Extended Color Variations**
   - No tints/shades of brand colors
   - Limited opacity variations
   - Missing semantic color names

2. **Typography Hierarchy**
   - No semantic typography classes (display, heading, body)
   - Limited line-height options
   - No paragraph spacing utilities

3. **Spacing Semantics**
   - No semantic spacing (section, component, element)
   - Limited spacing between responsive breakpoints

4. **Component Variations**
   - Button size variations limited
   - No disabled/loading states for buttons
   - Limited form component styling

5. **Layout Components**
   - Basic container system
   - No layout component variations
   - Limited grid semantic classes

## Recommended Enhancements

### Phase 1: Color System Enhancement
- Add brand color variations (light, dark, opacity levels)
- Create semantic color naming
- Implement CSS custom properties for dynamic theming

### Phase 2: Typography System Expansion
- Implement complete typography scale
- Add semantic typography classes
- Create proper heading hierarchy

### Phase 3: Component System Development
- Enhanced button variants and states
- Form component library
- Card component variations

### Phase 4: Layout System Improvement
- Semantic grid system
- Container variations
- Layout component patterns

## Implementation Priority

**High Priority:**
1. Color system standardization
2. Typography hierarchy completion
3. Button system enhancement

**Medium Priority:**
1. Form component development
2. Layout system improvements
3. Shadow/border enhancements

**Low Priority:**
1. Animation system
2. Custom component library
3. Theme customization

This analysis provides the foundation for implementing the Maetri style guide while building upon the existing Tailwind CSS infrastructure.