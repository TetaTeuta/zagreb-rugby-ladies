# Environment Variables Setup

This document explains how to configure contact information and other environment variables for the Zagreb Rugby Ladies website.

## Quick Setup

1. Create a `.env` file in the root directory of the project
2. Copy the contents below into your `.env` file
3. Update the values with your actual contact information

## Required Environment Variables

```bash
# Contact Information
VITE_CONTACT_EMAIL=zrkzagreb@zagreb-rugby.hr
VITE_CONTACT_PHONE=+385 91 404 2005
VITE_CONTACT_WHATSAPP=+385 91 404 2005

# Basin Form Endpoint
VITE_BASIN_ENDPOINT=https://usebasin.com/f/f286bdaf593f
```

## How It Works

All contact information is centralized in `/src/config/contact.js`. This file reads from environment variables and provides fallback values if they're not set.

### Usage in Components

Import the config in any component:

```javascript
import { contactConfig, getEmailLink, getPhoneLink } from '../config/contact';

// Use the values
console.log(contactConfig.email); // zrkzagreb@zagreb-rugby.hr
console.log(contactConfig.phone); // +385 91 404 2005

// Use helper functions
<a href={getEmailLink()}>Email Us</a>
<a href={getPhoneLink()}>Call Us</a>
```

## Benefits

-   **Single Source of Truth**: Change contact info in one place (`.env` file)
-   **Environment-Specific**: Different contacts for dev/staging/production
-   **Type-Safe**: TypeScript/IntelliSense support
-   **Secure**: `.env` files are gitignored and never committed

## Updating Contact Information

To change the email or phone number:

1. Open the `.env` file in the project root
2. Update the values:
    ```bash
    VITE_CONTACT_EMAIL=new-email@example.com
    VITE_CONTACT_PHONE=+385 XX XXX XXXX
    ```
3. Restart the development server (`npm run dev`)
4. The changes will be reflected across the entire site

## Files Using Contact Config

The contact configuration is used in:

-   `/src/pages/Contact.jsx` - Contact page
-   `/src/components/layout/Footer.jsx` - Footer component
-   `/src/pages/About.jsx` - About page
-   Any other component importing from `/src/config/contact.js`

## Important Notes

-   Environment variables must start with `VITE_` to be exposed to the client
-   Changes to `.env` require restarting the dev server
-   Never commit `.env` files to version control
-   Use `.env.example` as a template for other developers
