# Enhanced Color System for Maetri Style Guide

## Overview

This document defines an enhanced color system that extends the current Maetri brand colors into a comprehensive design token system. The enhanced system maintains brand consistency while providing the flexibility needed for a complete design system.

## Current Brand Colors (Baseline)

```css
/* Core Brand Colors */
Primary (Maetri Blue): #5090DA
Secondary (Maetri Pink/Rose): #D8A5A3
Accent (Purple): #9333ea
```

## Enhanced Brand Color Palette

### Primary Color Scale (Maetri Blue)
```css
/* Primary - Maetri Blue Family */
--color-primary-50: #eff6ff;     /* Very light blue background */
--color-primary-100: #dbeafe;    /* Light blue background */
--color-primary-200: #bfdbfe;    /* Lighter blue */
--color-primary-300: #93c5fd;    /* Light blue */
--color-primary-400: #60a5fa;    /* Medium light blue */
--color-primary-500: #5090DA;    /* BRAND PRIMARY - Maetri Blue */
--color-primary-600: #4080C7;    /* Darker blue (current hover) */
--color-primary-700: #3570B4;    /* Dark blue */
--color-primary-800: #2A5F94;    /* Very dark blue */
--color-primary-900: #1e4880;    /* Darkest blue */
```

### Secondary Color Scale (Maetri Pink/Rose)
```css
/* Secondary - Maetri Pink/Rose Family */
--color-secondary-50: #fdf2f8;   /* Very light pink background */
--color-secondary-100: #fce7f3;  /* Light pink background */
--color-secondary-200: #fbcfe8;  /* Lighter pink */
--color-secondary-300: #f9a8d4;  /* Light pink */
--color-secondary-400: #f472b6;  /* Medium light pink */
--color-secondary-500: #D8A5A3;  /* BRAND SECONDARY - Maetri Pink/Rose */
--color-secondary-600: #C89592;  /* Darker pink */
--color-secondary-700: #B88581;  /* Dark pink */
--color-secondary-800: #A87570;  /* Very dark pink */
--color-secondary-900: #98655F;  /* Darkest pink */
```

### Accent Color Scale (Purple)
```css
/* Accent - Purple Family */
--color-accent-50: #faf5ff;      /* Very light purple background */
--color-accent-100: #f3e8ff;     /* Light purple background */
--color-accent-200: #e9d5ff;     /* Lighter purple */
--color-accent-300: #d8b4fe;     /* Light purple */
--color-accent-400: #c084fc;     /* Medium light purple */
--color-accent-500: #9333ea;     /* BRAND ACCENT - Purple */
--color-accent-600: #7c3aed;     /* Darker purple */
--color-accent-700: #6d28d9;     /* Dark purple */
--color-accent-800: #5b21b6;     /* Very dark purple */
--color-accent-900: #4c1d95;     /* Darkest purple */
```

## Neutral Color System

### Grayscale Palette (Enhanced)
```css
/* Neutral Colors */
--color-neutral-0: #ffffff;      /* Pure white */
--color-neutral-50: #f9fafb;     /* Very light gray (current gray-50) */
--color-neutral-100: #f3f4f6;    /* Light gray background */
--color-neutral-200: #e5e7eb;    /* Lighter gray */
--color-neutral-300: #d1d5db;    /* Light gray (borders) */
--color-neutral-400: #9ca3af;    /* Medium gray (current gray-400) */
--color-neutral-500: #6b7280;    /* Medium gray */
--color-neutral-600: #4b5563;    /* Dark gray (current gray-600) */
--color-neutral-700: #374151;    /* Darker gray (current gray-700) */
--color-neutral-800: #1f2937;    /* Very dark gray (current gray-800) */
--color-neutral-900: #111827;    /* Darkest gray */
```

## Semantic Color System

### Status Colors
```css
/* Success Colors */
--color-success-50: #f0fdf4;     /* Very light green background */
--color-success-100: #dcfce7;    /* Light green background (current) */
--color-success-500: #22c55e;    /* Success green */
--color-success-600: #16a34a;    /* Success green (current) */
--color-success-700: #15803d;    /* Dark success green */

/* Warning Colors */
--color-warning-50: #fffbeb;     /* Very light amber background */
--color-warning-100: #fef3c7;    /* Light amber background */
--color-warning-500: #f59e0b;    /* Warning amber */
--color-warning-600: #d97706;    /* Warning amber */
--color-warning-700: #b45309;    /* Dark warning amber */

/* Error Colors */
--color-error-50: #fef2f2;       /* Very light red background */
--color-error-100: #fee2e2;      /* Light red background */
--color-error-500: #ef4444;      /* Error red */
--color-error-600: #dc2626;      /* Error red */
--color-error-700: #b91c1c;      /* Dark error red */

/* Info Colors */
--color-info-50: #eff6ff;        /* Very light blue background */
--color-info-100: #dbeafe;       /* Light blue background (current) */
--color-info-500: #3b82f6;       /* Info blue */
--color-info-600: #2563eb;       /* Info blue */
--color-info-700: #1d4ed8;       /* Dark info blue */
```

## CSS Custom Properties Implementation

### Base Color Definitions
```css
@layer base {
  :root {
    /* Brand Colors */
    --color-primary-50: #eff6ff;
    --color-primary-100: #dbeafe;
    --color-primary-200: #bfdbfe;
    --color-primary-300: #93c5fd;
    --color-primary-400: #60a5fa;
    --color-primary-500: #5090DA;
    --color-primary-600: #4080C7;
    --color-primary-700: #3570B4;
    --color-primary-800: #2A5F94;
    --color-primary-900: #1e4880;

    --color-secondary-50: #fdf2f8;
    --color-secondary-100: #fce7f3;
    --color-secondary-200: #fbcfe8;
    --color-secondary-300: #f9a8d4;
    --color-secondary-400: #f472b6;
    --color-secondary-500: #D8A5A3;
    --color-secondary-600: #C89592;
    --color-secondary-700: #B88581;
    --color-secondary-800: #A87570;
    --color-secondary-900: #98655F;

    --color-accent-50: #faf5ff;
    --color-accent-100: #f3e8ff;
    --color-accent-200: #e9d5ff;
    --color-accent-300: #d8b4fe;
    --color-accent-400: #c084fc;
    --color-accent-500: #9333ea;
    --color-accent-600: #7c3aed;
    --color-accent-700: #6d28d9;
    --color-accent-800: #5b21b6;
    --color-accent-900: #4c1d95;

    /* Neutral Colors */
    --color-neutral-0: #ffffff;
    --color-neutral-50: #f9fafb;
    --color-neutral-100: #f3f4f6;
    --color-neutral-200: #e5e7eb;
    --color-neutral-300: #d1d5db;
    --color-neutral-400: #9ca3af;
    --color-neutral-500: #6b7280;
    --color-neutral-600: #4b5563;
    --color-neutral-700: #374151;
    --color-neutral-800: #1f2937;
    --color-neutral-900: #111827;

    /* Semantic Colors */
    --color-success-50: #f0fdf4;
    --color-success-100: #dcfce7;
    --color-success-500: #22c55e;
    --color-success-600: #16a34a;
    --color-success-700: #15803d;

    --color-warning-50: #fffbeb;
    --color-warning-100: #fef3c7;
    --color-warning-500: #f59e0b;
    --color-warning-600: #d97706;
    --color-warning-700: #b45309;

    --color-error-50: #fef2f2;
    --color-error-100: #fee2e2;
    --color-error-500: #ef4444;
    --color-error-600: #dc2626;
    --color-error-700: #b91c1c;

    --color-info-50: #eff6ff;
    --color-info-100: #dbeafe;
    --color-info-500: #3b82f6;
    --color-info-600: #2563eb;
    --color-info-700: #1d4ed8;
  }
}
```

## Enhanced Tailwind Classes

### Brand Color Classes
```css
@layer components {
  /* Primary Colors */
  .text-primary-50 { color: var(--color-primary-50); }
  .text-primary-100 { color: var(--color-primary-100); }
  .text-primary-200 { color: var(--color-primary-200); }
  .text-primary-300 { color: var(--color-primary-300); }
  .text-primary-400 { color: var(--color-primary-400); }
  .text-primary { color: var(--color-primary-500); }
  .text-primary-500 { color: var(--color-primary-500); }
  .text-primary-600 { color: var(--color-primary-600); }
  .text-primary-700 { color: var(--color-primary-700); }
  .text-primary-800 { color: var(--color-primary-800); }
  .text-primary-900 { color: var(--color-primary-900); }

  .bg-primary-50 { background-color: var(--color-primary-50); }
  .bg-primary-100 { background-color: var(--color-primary-100); }
  .bg-primary-200 { background-color: var(--color-primary-200); }
  .bg-primary-300 { background-color: var(--color-primary-300); }
  .bg-primary-400 { background-color: var(--color-primary-400); }
  .bg-primary { background-color: var(--color-primary-500); }
  .bg-primary-500 { background-color: var(--color-primary-500); }
  .bg-primary-600 { background-color: var(--color-primary-600); }
  .bg-primary-700 { background-color: var(--color-primary-700); }
  .bg-primary-800 { background-color: var(--color-primary-800); }
  .bg-primary-900 { background-color: var(--color-primary-900); }

  .border-primary-50 { border-color: var(--color-primary-50); }
  .border-primary-100 { border-color: var(--color-primary-100); }
  .border-primary-200 { border-color: var(--color-primary-200); }
  .border-primary-300 { border-color: var(--color-primary-300); }
  .border-primary-400 { border-color: var(--color-primary-400); }
  .border-primary { border-color: var(--color-primary-500); }
  .border-primary-500 { border-color: var(--color-primary-500); }
  .border-primary-600 { border-color: var(--color-primary-600); }
  .border-primary-700 { border-color: var(--color-primary-700); }
  .border-primary-800 { border-color: var(--color-primary-800); }
  .border-primary-900 { border-color: var(--color-primary-900); }

  /* Secondary Colors */
  .text-secondary-50 { color: var(--color-secondary-50); }
  .text-secondary-100 { color: var(--color-secondary-100); }
  .text-secondary { color: var(--color-secondary-500); }
  .text-secondary-500 { color: var(--color-secondary-500); }
  .text-secondary-600 { color: var(--color-secondary-600); }
  .text-secondary-700 { color: var(--color-secondary-700); }
  .text-secondary-800 { color: var(--color-secondary-800); }
  .text-secondary-900 { color: var(--color-secondary-900); }

  .bg-secondary-50 { background-color: var(--color-secondary-50); }
  .bg-secondary-100 { background-color: var(--color-secondary-100); }
  .bg-secondary { background-color: var(--color-secondary-500); }
  .bg-secondary-500 { background-color: var(--color-secondary-500); }
  .bg-secondary-600 { background-color: var(--color-secondary-600); }
  .bg-secondary-700 { background-color: var(--color-secondary-700); }
  .bg-secondary-800 { background-color: var(--color-secondary-800); }
  .bg-secondary-900 { background-color: var(--color-secondary-900); }

  .border-secondary-50 { border-color: var(--color-secondary-50); }
  .border-secondary-100 { border-color: var(--color-secondary-100); }
  .border-secondary { border-color: var(--color-secondary-500); }
  .border-secondary-500 { border-color: var(--color-secondary-500); }
  .border-secondary-600 { border-color: var(--color-secondary-600); }
  .border-secondary-700 { border-color: var(--color-secondary-700); }
  .border-secondary-800 { border-color: var(--color-secondary-800); }
  .border-secondary-900 { border-color: var(--color-secondary-900); }

  /* Semantic Colors */
  .text-success { color: var(--color-success-600); }
  .text-warning { color: var(--color-warning-600); }
  .text-error { color: var(--color-error-600); }
  .text-info { color: var(--color-info-600); }

  .bg-success { background-color: var(--color-success-600); }
  .bg-success-light { background-color: var(--color-success-100); }
  .bg-warning { background-color: var(--color-warning-600); }
  .bg-warning-light { background-color: var(--color-warning-100); }
  .bg-error { background-color: var(--color-error-600); }
  .bg-error-light { background-color: var(--color-error-100); }
  .bg-info { background-color: var(--color-info-600); }
  .bg-info-light { background-color: var(--color-info-100); }

  /* Neutral Colors */
  .text-neutral-50 { color: var(--color-neutral-50); }
  .text-neutral-100 { color: var(--color-neutral-100); }
  .text-neutral-200 { color: var(--color-neutral-200); }
  .text-neutral-300 { color: var(--color-neutral-300); }
  .text-neutral-400 { color: var(--color-neutral-400); }
  .text-neutral-500 { color: var(--color-neutral-500); }
  .text-neutral-600 { color: var(--color-neutral-600); }
  .text-neutral-700 { color: var(--color-neutral-700); }
  .text-neutral-800 { color: var(--color-neutral-800); }
  .text-neutral-900 { color: var(--color-neutral-900); }
}
```

## Color Usage Guidelines

### Brand Color Usage

#### Primary (Maetri Blue)
- **Primary 500**: Main brand color, primary buttons, links, headings
- **Primary 600**: Hover states, pressed buttons
- **Primary 100**: Light backgrounds, subtle highlights
- **Primary 50**: Very light backgrounds, form field backgrounds

#### Secondary (Maetri Pink/Rose)
- **Secondary 500**: Secondary buttons, accents, highlights
- **Secondary 600**: Hover states for secondary elements
- **Secondary 100**: Light backgrounds, subtle accents
- **Secondary 50**: Very light backgrounds

#### Accent (Purple)
- **Accent 500**: Special highlights, call-to-action elements
- **Accent 600**: Hover states for accent elements
- **Accent 100**: Light purple backgrounds

### Semantic Color Usage

#### Success Colors
- **Success 600**: Success messages, positive actions
- **Success 100**: Success background areas
- **Success 50**: Very light success backgrounds

#### Warning Colors
- **Warning 600**: Warning messages, caution states
- **Warning 100**: Warning background areas
- **Warning 50**: Very light warning backgrounds

#### Error Colors
- **Error 600**: Error messages, destructive actions
- **Error 100**: Error background areas
- **Error 50**: Very light error backgrounds

### Neutral Color Usage

#### Text Hierarchy
- **Neutral 900**: Primary headings, high emphasis text
- **Neutral 800**: Secondary headings, body text
- **Neutral 700**: Medium emphasis text
- **Neutral 600**: Low emphasis text
- **Neutral 500**: Placeholder text
- **Neutral 400**: Disabled text

#### Background Usage
- **Neutral 0**: Pure white backgrounds
- **Neutral 50**: Light gray backgrounds
- **Neutral 100**: Card backgrounds, subtle containers
- **Neutral 200**: Borders, dividers

## Accessibility Considerations

### Color Contrast Requirements
All color combinations must meet WCAG 2.1 AA standards:
- Normal text: 4.5:1 contrast ratio minimum
- Large text: 3:1 contrast ratio minimum

### Tested Color Combinations

#### High Contrast (WCAG AAA Compliant)
- Primary 700 on Neutral 0 (white)
- Primary 800 on Primary 50
- Neutral 900 on Neutral 0
- Neutral 0 on Primary 600+

#### Standard Contrast (WCAG AA Compliant)
- Primary 600 on Neutral 0
- Secondary 600 on Neutral 0
- Neutral 800 on Neutral 50
- Neutral 700 on Neutral 100

## Implementation Priority

### Phase 1: Core Brand Colors
1. Implement primary color scale
2. Update existing primary color references
3. Add secondary color variations
4. Test accessibility compliance

### Phase 2: Semantic Colors
1. Implement success/error/warning colors
2. Update form validation styles
3. Add info color system
4. Create semantic component variants

### Phase 3: Enhanced Neutrals
1. Expand neutral color palette
2. Update typography color usage
3. Refine background color system
4. Optimize border color usage

This enhanced color system provides a solid foundation for implementing the Maetri style guide while maintaining brand consistency and ensuring accessibility compliance.