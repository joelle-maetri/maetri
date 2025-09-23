# Maetri Style Guide Implementation with Tailwind CSS

## Overview

This document outlines the implementation plan for integrating the Maetri Style Guide (Maetri-style-guide.docx) with the current Tailwind CSS framework. The goal is to create a comprehensive design system that ensures brand consistency across all website components.

## Current State Analysis

### Existing Tailwind Configuration
- **Base Font**: IBM Plex Sans (recently updated)
- **Accent Font**: Playfair Display (serif)
- **Primary Color**: #5090DA (Maetri Blue)
- **Secondary Color**: #D8A5A3 (Maetri Pink/Rose)
- **Button System**: Primary and Secondary button styles
- **Container**: Max-width 1200px with responsive behavior

### Current Color Palette
```css
Primary: #5090DA
Secondary: #D8A5A3
Accent: #9333ea
Grays: #9ca3af, #4b5563, #374151, #1f2937, #f9fafb
Status: #16a34a (green), #dbeafe (blue), #dcfce7 (green-light), #f3e8ff (purple-light)
```

## Implementation Plan

### Phase 1: Style Guide Analysis and Documentation
- [ ] **Extract Style Guide Content**
  - Convert .docx to readable format (PDF/HTML/MD)
  - Document all design tokens: colors, typography, spacing, shadows
  - Identify component specifications and variations
  - Note brand guidelines and usage rules

- [ ] **Gap Analysis**
  - Compare style guide requirements with current implementation
  - Identify missing components and styles
  - Document conflicts between current CSS and style guide
  - Create priority matrix for implementation

### Phase 2: Design Token Configuration

#### Color System Enhancement
- [ ] **Update Color Palette**
  - Verify primary and secondary colors match style guide
  - Add any missing brand colors
  - Create color variations (tints, shades, opacity levels)
  - Update Tailwind custom color classes

```css
/* Expected additions to input.css */
@layer components {
  /* Brand Colors - verify against style guide */
  .text-brand-primary { color: #5090DA; }
  .text-brand-secondary { color: #D8A5A3; }
  .text-brand-accent { color: [from-style-guide]; }
  
  .bg-brand-primary { background-color: #5090DA; }
  .bg-brand-secondary { background-color: #D8A5A3; }
  
  /* Color variations */
  .text-primary-light { color: [lighter-variant]; }
  .text-primary-dark { color: [darker-variant]; }
}
```

#### Typography System
- [ ] **Font Hierarchy Implementation**
  - Verify IBM Plex Sans weights and fallbacks
  - Confirm Playfair Display usage guidelines
  - Add missing font weights if specified in style guide
  - Create typography scale classes

```css
/* Typography scale */
.text-display { font-size: 3.5rem; line-height: 1.1; } /* 56px */
.text-h1 { font-size: 2.5rem; line-height: 1.2; }     /* 40px */
.text-h2 { font-size: 2rem; line-height: 1.25; }      /* 32px */
.text-h3 { font-size: 1.5rem; line-height: 1.33; }    /* 24px */
.text-body-lg { font-size: 1.125rem; line-height: 1.56; } /* 18px */
.text-body { font-size: 1rem; line-height: 1.5; }     /* 16px */
.text-small { font-size: 0.875rem; line-height: 1.43; } /* 14px */
.text-caption { font-size: 0.75rem; line-height: 1.33; } /* 12px */
```

#### Spacing System
- [ ] **Spacing Scale Verification**
  - Confirm current spacing scale matches style guide
  - Add any custom spacing values
  - Create semantic spacing classes

```css
/* Semantic spacing */
.space-section { margin: 4rem 0; }      /* 64px */
.space-component { margin: 2rem 0; }    /* 32px */
.space-element { margin: 1rem 0; }      /* 16px */
.space-tight { margin: 0.5rem 0; }      /* 8px */
```

### Phase 3: Component System Development

#### Button System Enhancement
- [ ] **Button Variants**
  - Verify existing primary/secondary buttons
  - Add any missing button states (disabled, loading, etc.)
  - Create button size variations
  - Add icon button support

```css
/* Button sizes */
.btn-sm { padding: 0.5rem 1rem; font-size: 0.875rem; }
.btn-md { padding: 0.75rem 1.5rem; font-size: 1rem; }
.btn-lg { padding: 1rem 2rem; font-size: 1.125rem; }
.btn-xl { padding: 1.25rem 2.5rem; font-size: 1.25rem; }

/* Button states */
.btn-disabled { opacity: 0.5; cursor: not-allowed; }
.btn-loading { position: relative; }
```

#### Form Components
- [ ] **Form Element Styling**
  - Input field styles (text, email, textarea)
  - Form validation states
  - Label and helper text styling
  - Checkbox and radio button styling

```css
/* Form components */
.form-input {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #5090DA;
  box-shadow: 0 0 0 3px rgba(80, 144, 218, 0.1);
}

.form-error {
  border-color: #ef4444;
}
```

#### Card Components
- [ ] **Card System**
  - Base card styling
  - Card variations (elevated, outlined, etc.)
  - Card content areas (header, body, footer)

```css
.card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-elevated {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### Phase 4: Layout and Grid System

#### Grid System
- [ ] **Layout Grid Implementation**
  - Verify 12-column grid system
  - Create semantic grid classes
  - Add responsive breakpoint variations

#### Container System
- [ ] **Container Variations**
  - Verify max-width values across breakpoints
  - Add container size variations
  - Create fluid container options

### Phase 5: Component Library Documentation

#### Style Guide Components
- [ ] **Create Component Examples**
  - Button showcase with all variants
  - Typography scale demonstration
  - Color palette display
  - Form element examples
  - Card component variations

#### Usage Guidelines
- [ ] **Implementation Guide**
  - Component usage examples
  - Do's and don'ts
  - Accessibility guidelines
  - Responsive behavior documentation

### Phase 6: Implementation and Testing

#### CSS Build Process
- [ ] **Update Build Configuration**
  - Ensure all custom classes are included in build
  - Verify CSS purging doesn't remove needed classes
  - Test responsive behavior across devices

#### Quality Assurance
- [ ] **Cross-browser Testing**
  - Test all components across major browsers
  - Verify responsive design functionality
  - Check accessibility compliance
  - Validate color contrast ratios

## File Structure

```
src/
├── input.css                 # Main Tailwind CSS file
├── components/
│   ├── buttons.css           # Button component styles
│   ├── forms.css             # Form component styles
│   ├── cards.css             # Card component styles
│   └── typography.css        # Typography utilities
├── tokens/
│   ├── colors.css            # Color design tokens
│   ├── spacing.css           # Spacing design tokens
│   └── typography.css        # Typography design tokens
└── utilities/
    ├── layout.css            # Layout utilities
    └── responsive.css        # Responsive utilities
```

## Implementation Checklist

### Discovery Phase
- [ ] Convert style guide document to accessible format
- [ ] Document all design tokens and specifications
- [ ] Create comprehensive component inventory
- [ ] Identify integration points with current codebase

### Development Phase
- [ ] Update color system to match style guide
- [ ] Implement typography scale and font hierarchy
- [ ] Create enhanced button component system
- [ ] Develop form component library
- [ ] Build card and layout components
- [ ] Add responsive design utilities

### Documentation Phase
- [ ] Create live style guide page
- [ ] Document component usage guidelines
- [ ] Create implementation examples
- [ ] Add accessibility documentation

### Testing Phase
- [ ] Cross-browser compatibility testing
- [ ] Responsive design validation
- [ ] Performance impact assessment
- [ ] Accessibility compliance check

### Deployment Phase
- [ ] Update production CSS build
- [ ] Deploy style guide documentation
- [ ] Train team on new component system
- [ ] Monitor for implementation issues

## Success Metrics

- **Design Consistency**: All components follow style guide specifications
- **Developer Experience**: Easy-to-use component classes with clear documentation
- **Performance**: No significant impact on CSS bundle size
- **Accessibility**: All components meet WCAG 2.1 AA standards
- **Maintainability**: Clear design token system for easy updates

## Timeline Estimate

- **Week 1**: Style guide analysis and documentation
- **Week 2**: Design token implementation and color system
- **Week 3**: Component development (buttons, forms, cards)
- **Week 4**: Layout system and responsive utilities
- **Week 5**: Documentation and testing
- **Week 6**: Deployment and team training

## Dependencies

- Access to original Maetri style guide document
- Design team input for clarification of specifications
- QA resources for comprehensive testing
- Dev team coordination for implementation

## Risk Mitigation

- **Style Guide Access**: Ensure style guide is accessible in readable format
- **Breaking Changes**: Implement changes incrementally to avoid disruption
- **Performance Impact**: Monitor CSS bundle size and optimize as needed
- **Browser Support**: Test thoroughly across target browser matrix

This implementation plan provides a structured approach to integrating the Maetri style guide with the current Tailwind CSS setup while maintaining design consistency and developer productivity.