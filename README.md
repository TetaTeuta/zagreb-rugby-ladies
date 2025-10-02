# Zagreb Rugby Ladies Website

A modern, high-performing marketing and community website for Zagreb Rugby Ladies. Built to inspire girls and young women in Croatia to try rugby, showcase the team culture, and provide a simple webshop for merchandise.

## 🏉 Features

### Core Pages

-   **Home**: Hero section with motivational messaging, key highlights, training schedule, featured players, and shop teaser
-   **About Us**: Club story, mission/values, coaching staff bios, and training details
-   **Team**: Player grid with modal details, position filtering, and team culture information
-   **Rugby 101**: Comprehensive beginner's guide with safety info, positions, scoring, and FAQs
-   **Gallery**: Photo and video gallery with lightbox viewing and album filtering
-   **Shop**: Coming soon - Team merchandise with Stripe integration
-   **Contact**: Contact form with validation, training schedule, and location details

### Design & UX

-   **Floating Design**: Main content floats over dark matte gradient background
-   **Matte Color Palette**: Sophisticated, dusty tones avoiding glossy/neon colors
-   **Responsive**: Mobile-first design supporting 320px to 1440px+ screens
-   **Accessibility**: WCAG 2.2 AA compliant with proper focus management and semantic HTML
-   **Modern Typography**: Inter, Manrope, and Outfit font families

### Technical Features

-   **Theming System**: Easy color scheme changes via CSS variables
-   **Performance Optimized**: Lighthouse scores ≥ 90 on all metrics
-   **Form Handling**: React Hook Form with validation
-   **Component Library**: Reusable UI components with consistent styling
-   **Data Management**: JSON-based content for easy updates

## 🚀 Quick Start

### Prerequisites

-   Node.js 20.19.0+ (or compatible version)
-   npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd zagreb-rugby-ladies
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view the site.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎨 Theming

The website uses a powerful theming system that allows for easy customization without touching component code.

### CSS Variables

The main theme colors are defined in `/src/index.css`:

```css
:root {
    --color-bg: 18 18 22; /* dark matte surface */
    --color-grad-start: 28 28 36; /* gradient start */
    --color-grad-end: 10 10 14; /* gradient end */
    --color-surface: 246 246 248; /* light card surface */
    --color-text: 20 20 24; /* main text */
    --color-muted: 100 102 112; /* muted text */
    --color-primary: 94 106 211; /* dusty indigo */
    --color-accent: 214 93 177; /* muted magenta */
}
```

### Changing Colors

To change the color scheme:

1. Update the CSS variables in `/src/index.css`
2. Colors use RGB space-separated values for Tailwind compatibility
3. The Tailwind config automatically picks up these variables

### Alternative Themes

You can create alternative themes by adding data attributes:

```css
[data-theme="alt"] {
    --color-primary: 168 85 247; /* purple */
    --color-accent: 236 72 153; /* pink */
}
```

## 📁 Project Structure

```
src/
├── assets/                 # Static assets (logo, images)
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   ├── Input.jsx
│   │   ├── Accordion.jsx
│   │   └── Lightbox.jsx
│   ├── layout/            # Layout components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Container.jsx
│   ├── shop/              # Shop-specific components (coming soon)
│   └── team/              # Team-specific components
│       ├── PlayerCard.jsx
│       └── PlayerModal.jsx
├── data/                  # JSON data files
│   ├── players.json
│   ├── products.json
│   └── training.json
├── pages/                 # Main page components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Team.jsx
│   ├── Rugby101.jsx
│   ├── Gallery.jsx
│   ├── Shop.jsx
│   └── Contact.jsx
├── hooks/                 # Custom React hooks (coming soon)
├── index.css             # Main styles with theme variables
├── main.jsx              # App entry point
└── App.jsx               # Main app component with routing
```

## 📝 Content Management

### Player Data

Edit `/src/data/players.json` to update player information:

```json
{
    "id": "player-id",
    "name": "Player Name",
    "position": "Position",
    "about": "Player description",
    "photo": "/images/players/photo.jpg",
    "quote": "Inspirational quote",
    "socials": {
        "instagram": "https://instagram.com/player"
    },
    "funFact": "Interesting fact about the player"
}
```

### Product Data

Edit `/src/data/products.json` to update merchandise:

```json
{
    "id": "product-id",
    "name": "Product Name",
    "price": 38.0,
    "currency": "EUR",
    "images": ["/images/products/product.jpg"],
    "variants": [{ "size": "M", "stock": 15 }],
    "description": "Product description",
    "features": ["Feature 1", "Feature 2"],
    "category": "hoodies"
}
```

### Training Schedule

Edit `/src/data/training.json` to update training information:

```json
{
    "location": {
        "name": "Venue Name",
        "address": "Full Address",
        "mapUrl": "Google Maps URL"
    },
    "schedule": [
        {
            "day": "Monday",
            "time": "18:30",
            "duration": "90 minutes",
            "type": "Skills & Fitness"
        }
    ],
    "contact": {
        "email": "contact@email.com",
        "phone": "+385 99 123 4567"
    }
}
```

## 🛠 Environment Variables

Create a `.env.local` file for environment-specific configurations:

```env
# Stripe (for webshop)
VITE_STRIPE_PUBLIC_KEY=pk_test_...

# Contact form endpoint
VITE_CONTACT_ENDPOINT=https://api.example.com/contact

# Analytics (optional)
VITE_GTAG_ID=G-XXXXXXXXXX
```

## 🧪 Testing

Run linting:

```bash
npm run lint
```

For comprehensive testing setup, consider adding:

-   Jest + React Testing Library for unit tests
-   Playwright or Cypress for E2E testing
-   Lighthouse CI for performance monitoring

## 📱 Performance

The website is optimized for performance with:

-   **Code splitting**: Routes are loaded dynamically
-   **Image optimization**: Responsive images with modern formats
-   **CSS optimization**: Tailwind CSS purging unused styles
-   **Bundle optimization**: Vite's built-in optimizations

Target Lighthouse scores: ≥90 on all metrics.

## 🌐 Deployment

### Recommended Hosting

-   **Netlify**: Drag and drop the `dist` folder
-   **Vercel**: Connect your Git repository
-   **Cloudflare Pages**: Deploy via Git integration

### Deployment Configuration

For single-page application routing, add redirects:

**Netlify** (`public/_redirects`):

```
/*    /index.html   200
```

**Vercel** (`vercel.json`):

```json
{
    "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is built for Zagreb Rugby Ladies. All rights reserved.

## 📞 Support

For questions or support:

-   Email: team@zagreb-rugby-ladies.hr
-   Create an issue in this repository

---

**Built with ❤️ for Zagreb Rugby Ladies**
