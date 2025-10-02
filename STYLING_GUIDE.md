# Centralized Styling System Guide

## Overview

This project now uses a centralized design system where all styling variables are defined in one place. This means you can change the primary color, fonts, spacing, and other design tokens from a single location and have them update throughout the entire application.

## 🎨 How to Change Primary Color

To change the primary color across the entire application, simply update this line in `src/index.css`:

```css
--color-primary: 79 70 229; /* CHANGE HERE TO UPDATE EVERYWHERE */
```

Example color values (RGB format without commas):

-   Purple: `79 70 229`
-   Blue: `59 130 246`
-   Green: `34 197 94`
-   Red: `239 68 68`
-   Orange: `245 158 11`

## 🎯 Design System Structure

### Colors

All colors are defined as CSS custom properties in `src/index.css`:

```css
/* Brand Colors - SINGLE SOURCE OF TRUTH */
--color-primary: 79 70 229; /* Main brand color */
--color-primary-light: 109 100 259; /* Lighter variant */
--color-primary-dark: 59 50 199; /* Darker variant */

--color-accent: 245 158 11; /* Secondary brand color */
--color-surface: 255 255 255; /* Card backgrounds */
--color-text: 15 15 20; /* Primary text */
--color-text-light: 255 255 255; /* Light text (white) */
--color-text-contrast: 0 0 0; /* High contrast text (black) */
--color-border: 229 231 235; /* Default borders */
```

### Typography

Font families are centralized:

```css
--font-sans: "Poppins", "Inter", "system-ui", sans-serif;
--font-hero: "Bebas Neue", "Oswald", sans-serif;
--font-heading: "Oswald", "Montserrat", sans-serif;
--font-body: "Poppins", "Inter", sans-serif;
--font-button: "Montserrat", sans-serif;
```

### Spacing & Layout

```css
--spacing-container: 1rem;
--spacing-section: 3rem;
--spacing-card: 1.5rem;
```

### Shadows

```css
--shadow-soft: 0 1px 3px 0 rgb(0 0 0 / 0.1);
--shadow-medium: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-large: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-float: 0 10px 30px -10px rgb(0 0 0 / 0.35);
```

## 📝 How to Use in Components

### ✅ Good - Using Design System

```jsx
// Use semantic color tokens
<div className="bg-surface text-text border-border">
  <h3 className="text-primary font-heading">Title</h3>
  <p className="text-muted">Description</p>
</div>

// Use design system variables
<Button variant="primary" size="md">Click me</Button>
```

### ❌ Bad - Hardcoded Values

```jsx
// Don't use hardcoded Tailwind colors
<div className="bg-white text-black border-gray-200">
    <h3 className="text-purple-600 font-bold">Title</h3>
    <p className="text-gray-500">Description</p>
</div>
```

## 🔧 Available Tailwind Tokens

### Colors

-   `bg-primary`, `text-primary`, `border-primary`
-   `bg-accent`, `text-accent`, `border-accent`
-   `bg-surface`, `text-text`, `border-border`
-   `text-text-light`, `text-text-contrast`
-   `text-muted`, `text-muted-light`
-   `border-border-light`, `border-border-focus`
-   `bg-success`, `bg-warning`, `bg-error`

### Fonts

-   `font-sans`, `font-hero`, `font-heading`, `font-body`, `font-button`

### Shadows

-   `shadow-soft`, `shadow-medium`, `shadow-large`, `shadow-float`, `shadow-glow`

### Transitions

-   `duration-fast`, `duration-normal`, `duration-slow`
-   `ease-smooth`, `ease-card`, `ease-gentle`

## 🎬 Animations

Standardized animations are available:

-   `animate-fade-in`
-   `animate-slide-in-up`
-   `animate-scale-in`
-   `animate-float`
-   `animate-pulse-glow`

## 📱 Responsive Design

The floating wrapper system is fully responsive and uses the design system:

```jsx
<div className="floating-wrapper">
    <div className="floating-container-global">{/* Your content */}</div>
</div>
```

## 🔄 Theme Switching

An alternative theme is pre-configured. To activate it, add `data-theme="alt"` to any element:

```jsx
<div data-theme="alt">
    {/* This section will use purple/pink color scheme */}
</div>
```

## 📋 Migration Checklist

When updating existing components:

1. ✅ Replace `bg-white` → `bg-surface`
2. ✅ Replace `text-black` → `text-text-contrast`
3. ✅ Replace `text-gray-300` → `text-muted-light`
4. ✅ Replace `border-gray-200` → `border-border`
5. ✅ Replace hardcoded font families → `font-*` tokens
6. ✅ Replace hardcoded transitions → `duration-*` tokens
7. ✅ Add semantic hover states with design system colors

## 🚀 Benefits

-   **Single source of truth**: Change primary color in one place
-   **Consistency**: All components use the same color palette
-   **Maintainability**: Easy to update design across entire app
-   **Performance**: CSS custom properties are more efficient
-   **Type safety**: Tailwind autocomplete works with semantic tokens
-   **Theme support**: Easy to add dark mode or alternative themes
