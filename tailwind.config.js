/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                // Background & Foundations
                bg: "rgb(var(--color-bg) / <alpha-value>)",
                "grad-start": "rgb(var(--color-grad-start) / <alpha-value>)",
                "grad-mid": "rgb(var(--color-grad-mid) / <alpha-value>)",
                "grad-end": "rgb(var(--color-grad-end) / <alpha-value>)",

                // Surface Colors
                surface: {
                    DEFAULT: "rgb(var(--color-surface) / <alpha-value>)",
                    glass: "rgb(var(--color-surface-glass) / <alpha-value>)",
                    dark: "rgb(var(--color-surface-dark) / <alpha-value>)",
                    elevated:
                        "rgb(var(--color-surface-elevated) / <alpha-value>)",
                },

                // Text Colors - Now semantic
                text: {
                    DEFAULT: "rgb(var(--color-text) / <alpha-value>)",
                    light: "rgb(var(--color-text-light) / <alpha-value>)",
                    contrast: "rgb(var(--color-text-contrast) / <alpha-value>)",
                },
                muted: {
                    DEFAULT: "rgb(var(--color-muted) / <alpha-value>)",
                    light: "rgb(var(--color-muted-light) / <alpha-value>)",
                },

                // Brand Colors
                primary: {
                    DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
                    light: "rgb(var(--color-primary-light) / <alpha-value>)",
                    dark: "rgb(var(--color-primary-dark) / <alpha-value>)",
                },
                accent: {
                    DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
                    light: "rgb(var(--color-accent-light) / <alpha-value>)",
                    dark: "rgb(var(--color-accent-dark) / <alpha-value>)",
                },

                // Border Colors
                border: {
                    DEFAULT: "rgb(var(--color-border) / <alpha-value>)",
                    light: "rgb(var(--color-border-light) / <alpha-value>)",
                    focus: "rgb(var(--color-border-focus) / <alpha-value>)",
                },

                // Status Colors
                success: "rgb(var(--color-success) / <alpha-value>)",
                warning: "rgb(var(--color-warning) / <alpha-value>)",
                error: "rgb(var(--color-error) / <alpha-value>)",
            },
            borderRadius: {
                DEFAULT: "var(--radius-sm)",
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
                "2xl": "var(--radius-2xl)",
                "3xl": "var(--radius-3xl)",
            },
            boxShadow: {
                float: "var(--shadow-float)",
                soft: "var(--shadow-soft)",
                medium: "var(--shadow-medium)",
                large: "var(--shadow-large)",
                glow: "var(--shadow-glow)",
            },
            fontFamily: {
                sans: "var(--font-sans)",
                hero: "var(--font-hero)",
                heading: "var(--font-heading)",
                body: "var(--font-body)",
                accent: "var(--font-accent)",
                button: "var(--font-button)",
            },
            fontSize: {
                xs: [
                    "0.75rem",
                    { lineHeight: "1rem", letterSpacing: "0.025em" },
                ],
                sm: [
                    "0.875rem",
                    { lineHeight: "1.25rem", letterSpacing: "0.025em" },
                ],
                base: [
                    "1rem",
                    { lineHeight: "1.5rem", letterSpacing: "0.015em" },
                ],
                lg: [
                    "1.125rem",
                    { lineHeight: "1.75rem", letterSpacing: "0.015em" },
                ],
                xl: [
                    "1.25rem",
                    { lineHeight: "1.75rem", letterSpacing: "0.01em" },
                ],
                "2xl": [
                    "1.5rem",
                    { lineHeight: "2rem", letterSpacing: "0.005em" },
                ],
                "3xl": [
                    "1.875rem",
                    { lineHeight: "2.25rem", letterSpacing: "0" },
                ],
                "4xl": [
                    "2.25rem",
                    { lineHeight: "2.5rem", letterSpacing: "-0.025em" },
                ],
                "5xl": ["3rem", { lineHeight: "1", letterSpacing: "-0.025em" }],
                "6xl": [
                    "3.75rem",
                    { lineHeight: "1", letterSpacing: "-0.025em" },
                ],
                "7xl": [
                    "4.5rem",
                    { lineHeight: "1", letterSpacing: "-0.025em" },
                ],
                "8xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.025em" }],
                "9xl": ["8rem", { lineHeight: "1", letterSpacing: "-0.025em" }],
            },
            spacing: {
                container: "var(--spacing-container)",
                section: "var(--spacing-section)",
                card: "var(--spacing-card)",
            },
            transitionDuration: {
                fast: "var(--transition-fast)",
                normal: "var(--transition-normal)",
                slow: "var(--transition-slow)",
                bounce: "var(--transition-bounce)",
                smooth: "var(--transition-smooth)",
            },
            transitionTimingFunction: {
                "out-quart": "var(--ease-out-quart)",
                "in-out-back": "var(--ease-in-out-back)",
                spring: "var(--ease-spring)",
                smooth: "var(--ease-smooth)",
                card: "var(--ease-card)",
                gentle: "var(--ease-gentle)",
            },
            animation: {
                "slide-in-up":
                    "slideInUp var(--transition-smooth) var(--ease-out-quart)",
                "slide-in-down":
                    "slideInDown var(--transition-smooth) var(--ease-out-quart)",
                "slide-in-left":
                    "slideInLeft var(--transition-smooth) var(--ease-out-quart)",
                "slide-in-right":
                    "slideInRight var(--transition-smooth) var(--ease-out-quart)",
                "fade-in": "fadeIn var(--transition-slow) ease-out",
                "scale-in":
                    "scaleIn var(--transition-smooth) var(--ease-spring)",
                "bounce-in": "bounceIn 0.6s var(--ease-in-out-back)",
                float: "float 3s ease-in-out infinite",
                "pulse-glow": "pulse-glow 2s infinite",
                shimmer: "shimmer 1.5s infinite",
            },
        },
    },
    plugins: [],
};
