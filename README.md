# Zagreb Rugby Ladies Website

Official website for Zagreb Rugby Ladies - a women's rugby sevens team based in Zagreb, Croatia.

## About

This is a modern, bilingual (English/Croatian) web application built for the Zagreb Rugby Ladies team. The website provides information about the team, schedules, player profiles, photo gallery, and contact information to help grow the women's rugby community in Croatia.

## Tech Stack

-   **Framework**: [React 19](https://react.dev/) with [Vite 5](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Routing**: [React Router 7](https://reactrouter.com/)
-   **Internationalization**: [i18next](https://www.i18next.com/) with [react-i18next](https://react.i18next.com/)
-   **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
-   **SEO**: [React Helmet Async](https://github.com/staylor/react-helmet-async)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Linting**: [ESLint 9](https://eslint.org/)

## Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js** (version 18.x or higher recommended)
-   **npm** (comes with Node.js)

## Getting Started Locally

### 1. Clone the Repository

```bash
git clone <repository-url>
cd zagreb-rugby-ladies
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables (Optional)

Create a `.env` file in the root directory if you want to configure optional services:

```env
# Cloudflare R2 CDN Base URL (for gallery images)
VITE_R2_BASE_URL=https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev

# Contact Information (optional overrides)
VITE_CONTACT_EMAIL=zrkzagreb@zagreb-rugby.hr
VITE_CONTACT_PHONE=+385 91 404 2005
VITE_CONTACT_WHATSAPP=+385 91 404 2005
```

**Note**: The application will work without these environment variables using default fallback values.

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

### 5. Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist/` directory.

### 6. Preview Production Build

```bash
npm run preview
```

## Available Scripts

| Script                    | Description                              |
| ------------------------- | ---------------------------------------- |
| `npm run dev`             | Start development server with hot reload |
| `npm run build`           | Build production-ready application       |
| `npm run preview`         | Preview production build locally         |
| `npm run lint`            | Run ESLint to check code quality         |
| `npm run gallery:list`    | List all gallery images                  |
| `npm run gallery:add`     | Add new images to gallery manifest       |
| `npm run gallery:remove`  | Remove images from gallery manifest      |
| `npm run gallery:shuffle` | Randomize gallery image order            |
| `npm run gallery:help`    | Show gallery management help             |

## Deployment

The application is deployed and hosted on **[Vercel](https://vercel.com/)**, which provides optimal performance and seamless integration with Vite projects.

### Build Configuration

-   **Build Command**: `npm run build`
-   **Output Directory**: `dist`
-   **Node Version**: 18.x or higher

### Environment Variables for Deployment

Make sure to set the following environment variables in your deployment platform:

```
VITE_R2_BASE_URL=<your-r2-cdn-url>
VITE_CONTACT_EMAIL=<team-email>
VITE_CONTACT_PHONE=<team-phone>
VITE_CONTACT_WHATSAPP=<whatsapp-number>
```

## Third-Party Services

### 1. Cloudflare R2 (CDN)

-   **Purpose**: Image hosting and delivery for the photo gallery
-   **Configuration**: Set `VITE_R2_BASE_URL` environment variable
-   **Documentation**: [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
-   **Fallback**: Application works without R2, using local paths as fallback

### 2. i18next Browser Language Detector

-   **Purpose**: Automatic language detection based on browser settings
-   **Storage**: Uses sessionStorage to persist language preference
-   **Languages**: English (en) and Croatian (hr)
-   **No external API required**

### 3. React Helmet Async

-   **Purpose**: Dynamic SEO meta tags for better search engine visibility
-   **Configuration**: Integrated in component level
-   **No external service required**

## Project Structure

```
zagreb-rugby-ladies/
├── public/                  # Static assets
│   ├── gallery/            # Gallery images manifest
│   ├── robots.txt          # SEO robots file
│   └── sitemap.xml         # SEO sitemap
├── src/
│   ├── assets/             # Images and media
│   │   └── images/         # Categorized images
│   ├── components/         # React components
│   │   ├── home/          # Home page components
│   │   ├── layout/        # Layout components (Header, Footer, etc.)
│   │   ├── team/          # Team/player components
│   │   └── ui/            # Reusable UI components
│   ├── config/            # Configuration files
│   ├── data/              # JSON data files
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── locales/           # Translation files
│   │   ├── en/            # English translations
│   │   └── hr/            # Croatian translations
│   ├── pages/             # Page components
│   ├── styles/            # Global styles
│   ├── i18n.js            # i18next configuration
│   ├── main.jsx           # Application entry point
│   └── App.jsx            # Main App component
├── scripts/               # Utility scripts
│   ├── update-gallery-manifest.js
│   └── shuffle-gallery-manifest.js
├── dist/                  # Production build output
└── package.json           # Dependencies and scripts
```

## Internationalization

The website supports two languages:

-   **English** (en) - Default fallback language
-   **Croatian** (hr) - Local language

Language detection order:

1. User's session storage preference
2. Browser language settings
3. Fallback to English

Users can manually switch languages using the language switcher in the UI.

## Gallery Management

The application includes scripts to manage the photo gallery:

```bash
# List all images in the gallery
npm run gallery:list

# Add new images to the gallery
npm run gallery:add

# Remove images from the gallery
npm run gallery:remove

# Shuffle gallery order
npm run gallery:shuffle
```

Gallery images are hosted on Cloudflare R2 CDN for optimal performance and delivery.

## Design System

The application features a comprehensive design system inspired by modern minimalist design principles, using the official Zagreb Rugby Ladies jersey colors.

### Brand Colors

The color palette is based on the official team jersey colors:

-   **Primary (Navy)**: `#003057` - Official jersey navy blue
-   **Accent (Gold)**: `#FFB81C` - Official jersey gold
-   **Background**: `#F9FAFB` - Clean light gray
-   **Surface**: `#FFFFFF` - Pure white

### Typography

-   **Font Family**: [Inter](https://fonts.google.com/specimen/Inter) - Clean, modern sans-serif
-   **Font Weights**: 400 (regular), 500 (medium), 600 (semi-bold), 700 (bold), 800 (extra-bold), 900 (black)
-   **Text Classes**: `.hero-title`, `.section-title`, `.card-title`, `.body-text`, `.accent-text`, `.button-text`

### Color System

The design system uses CSS variables for theming flexibility:

```css
/* Primary Colors */
--color-primary: 0 48 87; /* Navy */
--color-accent: 255 184 28; /* Gold */

/* Surface Colors */
--color-surface: 255 255 255; /* White */
--color-surface-dark: 0 48 87; /* Navy */

/* Text Colors */
--color-text: 15 15 20; /* Dark text */
--color-text-light: 255 255 255; /* Light text */
--color-muted: 120 120 130; /* Muted text */
```

### Spacing System

-   **Container**: `1rem` (16px)
-   **Section**: `3rem` (48px)
-   **Card**: `1.5rem` (24px)

### Border Radius

-   **Small**: `0.5rem` (8px)
-   **Medium**: `0.75rem` (12px)
-   **Large**: `1rem` (16px)
-   **Extra Large**: `1.25rem` (20px)
-   **2XL**: `1.5rem` (24px)
-   **3XL**: `2rem` (32px)

### Shadow System

-   **Soft**: Subtle shadows for cards
-   **Medium**: Standard elevation
-   **Large**: Prominent elevation
-   **Float**: Floating element effect
-   **Glow**: Brand color glow effect

### Animations & Transitions

-   **Fast**: 150ms - Quick interactions
-   **Normal**: 200ms - Standard transitions
-   **Slow**: 300ms - Smooth animations
-   **Smooth**: 350ms - Card animations
-   **Bounce**: 400ms - Playful bounce effect

Easing curves include: `ease-out-quart`, `ease-in-out-back`, `ease-spring`, `ease-smooth`, `ease-card`, and `ease-gentle`.

### Card Variants

-   **Glass Card**: `.card-glass` - Frosted glass effect with backdrop blur
-   **Elevated Card**: `.card-elevated` - Clean card with subtle shadow
-   **Accent Glow Card**: `.card-accent-glow` - Card with gold accent glow on hover

### Button System

Two primary button variants matching the team colors:

-   **Blue Button**: `.btn-blue` - Navy background with white text
-   **Yellow Button**: `.btn-yellow` - Gold background with black text

All buttons include hover, active, and focus-visible states for optimal accessibility.

### Responsive Breakpoints

-   **Mobile (Small)**: < 480px
-   **Mobile (Large)**: 480px - 639px
-   **Tablet (Portrait)**: 640px - 767px
-   **Tablet (Landscape)**: 768px - 1023px
-   **Desktop**: 1024px - 1439px
-   **Large Screens**: 1440px+

### Accessibility

-   WCAG AAA compliant color contrasts
-   Focus-visible states for keyboard navigation
-   Reduced motion support via `prefers-reduced-motion`
-   Semantic HTML structure
-   ARIA labels and roles

## Development Notes

### Hot Module Replacement (HMR)

Vite provides fast HMR during development for instant feedback.

### Code Quality

-   ESLint is configured for code quality checks
-   Run `npm run lint` before committing

### Responsive Design

The application is fully responsive and optimized for:

-   Mobile devices (320px+)
-   Tablets (768px+)
-   Desktops (1024px+)
-   Large screens (1536px+)

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run `npm run lint` to check code quality
4. Test your changes locally with `npm run dev`
5. Build to ensure no errors: `npm run build`
6. Submit a pull request

## License

This project is proprietary and belongs to Zagreb Rugby Ladies.

## Contact

For questions or support regarding the website:

-   **Email**: zrkzagreb@zagreb-rugby.hr
-   **Phone**: +385 91 404 2005
-   **WhatsApp**: +385 91 404 2005

---

Built with love for the Zagreb Rugby Ladies community ❤️
