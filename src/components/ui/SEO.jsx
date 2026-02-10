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

    const productionUrl = "https://www.zagreb-rugby-ladies.eu";
    const baseUrl = productionUrl;

    const fullCanonicalUrl = (() => {
        // If canonical URL is explicitly provided
        if (canonicalUrl) {
            // If it's already a full URL, use it as-is
            if (canonicalUrl.startsWith("http")) {
                return canonicalUrl;
            }

            // Construct language-specific canonical URL based on current language
            // Croatian pages should have /hr prefix, English pages should not
            const basePath = canonicalUrl.replace(/^\/hr/, ""); // Remove /hr if present
            const localizedPath =
                currentLanguage === "hr" ? `/hr${basePath}` : basePath;

            return `${productionUrl}${localizedPath}`;
        }

        // If no canonical URL provided, construct from current path
        // Each language version should point to itself as canonical
        const currentPath = window.location.pathname;
        return `${productionUrl}${currentPath}`;
    })();

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
            <link rel="canonical" href={fullCanonicalUrl} />

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
            {(() => {
                // Extract base path from either canonicalUrl or current pathname
                let pathToUse = canonicalUrl || window.location.pathname;

                // If canonicalUrl is a full URL, extract just the pathname
                if (pathToUse.startsWith("http")) {
                    try {
                        pathToUse = new URL(pathToUse).pathname;
                    } catch {
                        // If URL parsing fails, fall back to current pathname
                        pathToUse = window.location.pathname;
                    }
                }

                const basePath = pathToUse.replace(/^\/hr/, "") || "/";

                // Construct language-specific URLs
                // English version: base path without /hr
                const enPath = basePath === "/" ? "/" : basePath;
                // Croatian version: base path with /hr prefix
                const hrPath = basePath === "/" ? "/hr/" : `/hr${basePath}`;

                return (
                    <>
                        <link
                            rel="alternate"
                            hrefLang="en"
                            href={`${productionUrl}${
                                enPath === "/" ? "" : enPath
                            }`}
                        />
                        <link
                            rel="alternate"
                            hrefLang="hr"
                            href={`${productionUrl}${hrPath}`}
                        />
                        <link
                            rel="alternate"
                            hrefLang="x-default"
                            href={`${productionUrl}${
                                enPath === "/" ? "" : enPath
                            }`}
                        />
                    </>
                );
            })()}

            {/* Structured Data */}
            {structuredData && (
                <>
                    {Array.isArray(structuredData) ? (
                        structuredData.map((data, index) => (
                            <script key={index} type="application/ld+json">
                                {JSON.stringify(data)}
                            </script>
                        ))
                    ) : (
                        <script type="application/ld+json">
                            {JSON.stringify(structuredData)}
                        </script>
                    )}
                </>
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
    const baseUrl = "https://www.zagreb-rugby-ladies.eu";
    const logoUrl = publisherLogo.startsWith("http")
        ? publisherLogo
        : `${baseUrl}${publisherLogo}`;
    const imageFullUrl = image
        ? image.startsWith("http")
            ? image
            : `${baseUrl}${image}`
        : undefined;

    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: headline,
        description: description,
        image: imageFullUrl,
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
                url: logoUrl,
            },
        },
    };
};

/**
 * Creates SportsOrganization structured data
 * @returns {Object} JSON-LD structured data
 */
export const createSportsOrganizationData = () => {
    const baseUrl = "https://www.zagreb-rugby-ladies.eu";
    const logoUrl = cdn("logos/zagreb-rugby-ladies-logo-vector.png");

    return {
        "@context": "https://schema.org",
        "@type": "SportsOrganization",
        name: "Zagreb Rugby Ladies",
        description:
            "Women's rugby team in Zagreb, Croatia. Empowering girls and young women through rugby sevens.",
        url: baseUrl,
        logo: logoUrl,
        sport: "Rugby Sevens",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Zagreb",
            addressCountry: "HR",
        },
        sameAs: [
            "https://www.instagram.com/zagrebrugbyladies",
            "https://www.facebook.com/zagrebrugbyladies",
        ],
    };
};

/**
 * Creates SportsEvent structured data for rugby matches
 * @param {Object} params
 * @param {string} params.name - Event name
 * @param {string} params.description - Event description
 * @param {string} params.date - Match date (YYYY-MM-DD)
 * @param {string|null} params.time - Match time (HH:MM) or null if not scheduled yet
 * @param {Object} params.location - Location object with name, address, city, country
 * @param {Object} params.homeTeam - Home team object with name and logo
 * @param {Object} params.awayTeam - Away team object with name and logo
 * @param {string} params.eventStatus - Event status (EventScheduled, EventPostponed, EventCancelled, EventRescheduled)
 * @param {string} params.matchType - Type of match (e.g., "Championship Match")
 * @param {boolean} params.isFree - Whether the event is free to attend (default: true)
 * @returns {Object} JSON-LD structured data
 */
export const createSportsEventData = ({
    name,
    description,
    date,
    time,
    location,
    homeTeam,
    awayTeam,
    eventStatus = "EventScheduled",
    matchType = "SportsEvent",
    isFree = true,
}) => {
    const baseUrl = "https://www.zagreb-rugby-ladies.eu";

    // Create ISO 8601 datetime strings (null when time is not scheduled yet)
    const startDateTime = time != null ? `${date}T${time}:00` : null;
    let endDateTime = null;
    if (time != null) {
        const endDate = new Date(`${date}T${time}:00`);
        endDate.setHours(endDate.getHours() + 2);
        endDateTime = endDate.toISOString().slice(0, 16) + ":00";
    }

    const eventData = {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        name: name,
        description: description,
        ...(startDateTime != null && { startDate: startDateTime }),
        ...(endDateTime != null && { endDate: endDateTime }),
        eventStatus: `https://schema.org/${eventStatus}`,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
            "@type": "Place",
            name: location.name,
            address: {
                "@type": "PostalAddress",
                streetAddress: location.address,
                addressLocality: location.city,
                addressCountry: location.country,
            },
        },
        organizer: {
            "@type": "SportsOrganization",
            name: "Zagreb Rugby Ladies",
            url: baseUrl,
        },
        performer: [
            {
                "@type": "SportsTeam",
                name: homeTeam.name,
                logo: homeTeam.logo,
            },
            {
                "@type": "SportsTeam",
                name: awayTeam.name,
                logo: awayTeam.logo,
            },
        ],
    };

    // Add offers (ticket information)
    if (isFree) {
        eventData.offers = {
            "@type": "Offer",
            price: "0",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: baseUrl,
            validFrom: new Date().toISOString().split("T")[0],
        };
    }

    // Add location URL if available
    if (location.mapUrl) {
        eventData.location.url = location.mapUrl;
    }

    return eventData;
};

/**
 * Creates an ItemList of SportsEvents for schedule pages
 * @param {Array} matches - Array of match objects
 * @param {string} teamName - Name of the team
 * @returns {Object} JSON-LD structured data
 */
export const createSportsEventListData = (matches, teamName) => {
    const baseUrl = "https://www.zagreb-rugby-ladies.eu";

    const eventList = matches
        .filter((match) => match.status === "upcoming")
        .map((match, index) => {
            const isHome = match.homeTeam === teamName;
            const opponent = isHome ? match.awayTeam : match.homeTeam;

            const startDate =
                match.time != null ? `${match.date}T${match.time}:00` : null;
            const endDate =
                match.time != null
                    ? (() => {
                          const end = new Date(
                              `${match.date}T${match.time}:00`,
                          );
                          end.setHours(end.getHours() + 2);
                          return end.toISOString().slice(0, 16) + ":00";
                      })()
                    : null;

            return {
                "@type": "SportsEvent",
                name: `${match.homeTeam} vs ${match.awayTeam}`,
                description: `${match.matchType} - ${match.homeTeam} vs ${match.awayTeam}`,
                ...(startDate != null && { startDate }),
                ...(endDate != null && { endDate }),
                eventStatus: "https://schema.org/EventScheduled",
                eventAttendanceMode:
                    "https://schema.org/OfflineEventAttendanceMode",
                location: {
                    "@type": "Place",
                    name: match.location.name,
                    address: {
                        "@type": "PostalAddress",
                        streetAddress: match.location.address,
                    },
                },
                organizer: {
                    "@type": "SportsOrganization",
                    name: "Zagreb Rugby Ladies",
                    url: baseUrl,
                },
                performer: [
                    {
                        "@type": "SportsTeam",
                        name: match.homeTeam,
                    },
                    {
                        "@type": "SportsTeam",
                        name: match.awayTeam,
                    },
                ],
                offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "EUR",
                    availability: "https://schema.org/InStock",
                    url: baseUrl,
                },
            };
        });

    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: eventList.map((event, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: event,
        })),
    };
};
