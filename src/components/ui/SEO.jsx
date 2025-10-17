import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { cdn } from "../../lib/cdn";

/**
 * SEO Component for managing meta tags and structured data
 *
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - SEO keywords (optional)
 * @param {string} props.canonicalUrl - Canonical URL (optional)
 * @param {string} props.ogImage - Open Graph image URL (optional)
 * @param {string} props.ogType - Open Graph type (default: "website")
 * @param {Object} props.structuredData - JSON-LD structured data (optional)
 * @param {string} props.language - Page language (default: current i18n language)
 */
export const SEO = ({
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    ogType = "website",
    structuredData,
    language,
}) => {
    const { i18n } = useTranslation();
    const currentLanguage = language || i18n.language;

    // Default values
    const siteName = "Zagreb Rugby Ladies";
    const defaultDescription =
        "Learn rugby with Zagreb Rugby Ladies. Comprehensive guide to rugby rules, positions, scoring, and safety. Perfect for beginners wanting to start their rugby journey.";
    const defaultImage = cdn("logos/zagreb-rugby-ladies-logo-vector.png");

    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const metaDescription = description || defaultDescription;
    const imageUrl = ogImage || defaultImage;

    // Construct full URL for Open Graph
    const baseUrl = window.location.origin;
    const fullCanonicalUrl = canonicalUrl
        ? `${baseUrl}${canonicalUrl}`
        : window.location.href;
    const fullImageUrl = imageUrl.startsWith("http")
        ? imageUrl
        : `${baseUrl}${imageUrl}`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <html lang={currentLanguage} />
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Canonical URL */}
            {canonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullCanonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={fullImageUrl} />
            <meta property="og:site_name" content={siteName} />
            <meta
                property="og:locale"
                content={currentLanguage === "hr" ? "hr_HR" : "en_US"}
            />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullCanonicalUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={fullImageUrl} />

            {/* Additional SEO Tags */}
            <meta
                name="robots"
                content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
            />
            <meta name="googlebot" content="index, follow" />

            {/* Language Alternates */}
            <link
                rel="alternate"
                hrefLang="en"
                href={`${baseUrl}/en${
                    canonicalUrl || window.location.pathname
                }`}
            />
            <link
                rel="alternate"
                hrefLang="hr"
                href={`${baseUrl}/hr${
                    canonicalUrl || window.location.pathname
                }`}
            />
            <link
                rel="alternate"
                hrefLang="x-default"
                href={fullCanonicalUrl}
            />

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

/**
 * Creates FAQ structured data for search engines
 * @param {Array} faqItems - Array of {question, answer} objects
 * @returns {Object} JSON-LD structured data
 */
export const createFAQStructuredData = (faqItems) => {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };
};

/**
 * Creates HowTo structured data for search engines
 * @param {Object} params
 * @returns {Object} JSON-LD structured data
 */
export const createHowToStructuredData = ({
    name,
    description,
    steps,
    image,
}) => {
    return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: name,
        description: description,
        image: image,
        step: steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.name,
            text: step.text,
            url: step.url || undefined,
        })),
    };
};

/**
 * Creates Article structured data for search engines
 * @param {Object} params
 * @returns {Object} JSON-LD structured data
 */
export const createArticleStructuredData = ({
    headline,
    description,
    image,
    datePublished,
    dateModified,
    authorName = "Zagreb Rugby Ladies",
    publisherName = "Zagreb Rugby Ladies",
    publisherLogo = cdn("logos/zagreb-rugby-ladies-logo-vector.png"),
}) => {
    const baseUrl = window.location.origin;
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: headline,
        description: description,
        image: image ? `${baseUrl}${image}` : undefined,
        datePublished: datePublished,
        dateModified: dateModified || datePublished,
        author: {
            "@type": "Organization",
            name: authorName,
            url: baseUrl,
        },
        publisher: {
            "@type": "Organization",
            name: publisherName,
            logo: {
                "@type": "ImageObject",
                url: `${baseUrl}${publisherLogo}`,
            },
        },
    };
};

/**
 * Creates SportsOrganization structured data
 * @returns {Object} JSON-LD structured data
 */
export const createSportsOrganizationData = () => {
    const baseUrl = window.location.origin;
    return {
        "@context": "https://schema.org",
        "@type": "SportsOrganization",
        name: "Zagreb Rugby Ladies",
        description:
            "Women's rugby team in Zagreb, Croatia. Empowering girls and young women through rugby sevens.",
        url: baseUrl,
        logo: `${baseUrl}/${cdn("logos/zagreb-rugby-ladies-logo-vector.png")}`,
        sport: "Rugby Sevens",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Zagreb",
            addressCountry: "HR",
        },
        sameAs: [
            // Add social media URLs here
            "https://www.instagram.com/zagrebrugbyladies",
            "https://www.facebook.com/zagrebrugbyladies",
        ],
    };
};
