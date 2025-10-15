import { useState, useEffect, useMemo, memo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Lightbox } from "../components/ui/Lightbox";
import { Button } from "../components/ui/Button";
import { CallToAction } from "../components/ui/CallToAction";
import { buildR2ImageUrl } from "../lib/cdn";
import { SEO } from "../components/ui/SEO";

const Thumb = memo(function Thumb({ filename, category, onOpen }) {
    const imageUrl = buildR2ImageUrl(category, filename);

    return (
        <div
            className="gallery-card group"
            role="button"
            tabIndex={0}
            aria-label={`${category} - Zagreb Rugby Ladies`}
            onClick={() => onOpen({ filename, category })}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpen({ filename, category });
                }
            }}
        >
            <img
                src={imageUrl}
                alt={`${category} - Zagreb Rugby Ladies`}
                className="gallery-card-image"
                loading="lazy"
                decoding="async"
            />
            <div className="gallery-card-overlay" />
            <div className="gallery-card-content">
                <h3 className="gallery-card-title">{category}</h3>
            </div>
        </div>
    );
});

export default function Gallery() {
    const { t } = useTranslation();
    const [galleryManifest, setGalleryManifest] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [params, setParams] = useSearchParams();
    const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 });
    const [randomizedAllImages, setRandomizedAllImages] = useState([]);

    const activeCategory = params.get("cat") || "all";

    useEffect(() => {
        fetch("/gallery/manifest.json")
            .then((res) => {
                if (!res.ok)
                    throw new Error("Failed to fetch gallery manifest");
                return res.json();
            })
            .then((data) => {
                setGalleryManifest(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading gallery manifest:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (Object.keys(galleryManifest).length === 0) return;

        const storageKey = "gallery-shuffled-order";
        const stored = sessionStorage.getItem(storageKey);

        if (stored) {
            try {
                setRandomizedAllImages(JSON.parse(stored));
                return;
            } catch (e) {
                console.error("Failed to parse stored gallery order:", e);
            }
        }

        const allImages = Object.entries(galleryManifest).flatMap(
            ([category, imageFiles]) =>
                imageFiles.map((filename) => ({ filename, category }))
        );

        const shuffled = [...allImages];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        setRandomizedAllImages(shuffled);
        sessionStorage.setItem(storageKey, JSON.stringify(shuffled));
    }, [galleryManifest]);

    const categoryStats = useMemo(() => {
        const stats = { all: 0 };
        Object.entries(galleryManifest).forEach(([category, images]) => {
            const count = images.length;
            stats[category.toLowerCase()] = count;
            stats.all += count;
        });
        return stats;
    }, [galleryManifest]);

    const categories = useMemo(() => {
        const manifestCategories = Object.keys(galleryManifest).map((k) =>
            k.toLowerCase()
        );

        // Map category IDs to translation keys
        const getCategoryLabel = (cat) => {
            const categoryMap = {
                training: "gallery.collections.training",
                matches: "gallery.collections.matches",
                match: "gallery.collections.matches",
                players: "gallery.collections.players",
                team: "gallery.collections.team",
                community: "gallery.collections.community",
            };

            return categoryMap[cat]
                ? t(categoryMap[cat])
                : cat.charAt(0).toUpperCase() + cat.slice(1);
        };

        return [
            { id: "all", label: t("gallery.allPhotos") },
            ...manifestCategories.map((cat) => ({
                id: cat,
                label: getCategoryLabel(cat),
            })),
        ];
    }, [galleryManifest, t]);

    const filteredImages = useMemo(() => {
        if (activeCategory === "all") {
            return randomizedAllImages;
        }

        const categoryKey = Object.keys(galleryManifest).find(
            (key) => key.toLowerCase() === activeCategory.toLowerCase()
        );

        return categoryKey
            ? galleryManifest[categoryKey].map((filename) => ({
                  filename,
                  category: categoryKey,
              }))
            : [];
    }, [randomizedAllImages, galleryManifest, activeCategory]);

    const lightboxImages = useMemo(
        () =>
            filteredImages.map(({ filename, category }) => ({
                src: buildR2ImageUrl(category, filename),
                thumbnail: buildR2ImageUrl(category, filename),
            })),
        [filteredImages]
    );

    const openItem = ({ filename, category }) => {
        const idx = filteredImages.findIndex(
            (img) => img.filename === filename && img.category === category
        );
        if (idx !== -1) {
            setLightbox({ isOpen: true, index: idx });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface">
                <p className="text-muted text-lg">{t("gallery.loading")}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface">
                <p className="text-red-500 text-lg">
                    {t("gallery.error")}: {error}
                </p>
            </div>
        );
    }

    // SEO Configuration
    const pageTitle = "Photo Gallery | Zagreb Rugby Ladies in Action";
    const pageDescription =
        "Browse our photo gallery showcasing Zagreb Rugby Ladies in training, matches, and team events. See women's rugby sevens action shots, team moments, and community events in Croatia.";
    const keywords =
        "Zagreb Rugby Ladies photos, women's rugby gallery, rugby action shots Croatia, rugby team photos Zagreb, women athletes photos, rugby sevens images, rugby training photos, rugby match photos Croatia";

    // Image Gallery Structured Data
    const galleryStructuredData = {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        name: "Zagreb Rugby Ladies Photo Gallery",
        description: pageDescription,
        about: {
            "@type": "SportsOrganization",
            name: "Zagreb Rugby Ladies",
        },
    };

    return (
        <div className="min-h-screen bg-surface">
            <SEO
                title={pageTitle}
                description={pageDescription}
                keywords={keywords}
                canonicalUrl="/gallery"
                structuredData={galleryStructuredData}
            />

            {/* Hero Section */}
            <div className="relative h-[50svh] overflow-hidden mt-20">
                <div className="absolute inset-0 flex items-center justify-center bg-text-contrast">
                    <img
                        src="/src/assets/images/hero/josipa-rugby-kick.jpg"
                        alt="Zagreb Rugby Ladies player kicking during match - Women's rugby action photography"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: "50% 25%" }}
                    />
                    <div className="absolute inset-0 overlay-cinematic-base opacity-70"></div>
                    <div className="absolute inset-0 overlay-cinematic-sunset"></div>
                    <div className="absolute inset-0 overlay-cinematic-matte"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center max-w-4xl mx-auto px-6 sm:px-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                            {t("gallery.hero.title")}
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-none mx-auto">
                            <Button
                                size="lg"
                                variant="blue"
                                asChild
                                className="w-full sm:w-auto"
                            >
                                <Link to="/contact">
                                    {t("gallery.hero.joinTeam")}
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="yellow"
                                asChild
                                className="w-full sm:w-auto"
                            >
                                <Link to="/team">
                                    {t("gallery.hero.meetPlayers")}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Content */}
            <div className="px-4 py-16 max-w-7xl mx-auto">
                {/* Category Filters */}
                <div
                    className="gallery-filters"
                    role="group"
                    aria-label={t("gallery.photoCategories")}
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() =>
                                setParams(
                                    cat.id === "all" ? {} : { cat: cat.id },
                                    { replace: true }
                                )
                            }
                            className={`pill ${
                                activeCategory === cat.id ? "pill-active" : ""
                            }`}
                            aria-pressed={activeCategory === cat.id}
                        >
                            {cat.label}
                            <span className="pill-badge">
                                {categoryStats[cat.id] || 0}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="mt-12">
                    {filteredImages.length > 0 ? (
                        <div className="gallery-grid">
                            {filteredImages.map(
                                ({ filename, category }, idx) => (
                                    <Thumb
                                        key={`${category}-${filename}-${idx}`}
                                        filename={filename}
                                        category={category}
                                        onOpen={openItem}
                                    />
                                )
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted text-lg">
                                {t("gallery.noPhotos")}
                            </p>
                        </div>
                    )}
                </div>

                {/* Call to Action */}
                <div className="mt-20">
                    <CallToAction
                        image="/src/assets/images/call_to_action/rugby-team-woman-shot.jpg"
                        imageAlt="Zagreb Rugby Ladies team portrait - Join us and be part of our story"
                        titleKey="gallery.cta.title"
                        descriptionKey="gallery.cta.description"
                        primaryButton={{
                            to: "/contact",
                            textKey: "common.joinTraining",
                        }}
                        secondaryButton={{
                            to: "/team",
                            textKey: "gallery.hero.meetPlayers",
                        }}
                    />
                </div>
            </div>

            {/* Lightbox */}
            <Lightbox
                images={lightboxImages}
                isOpen={lightbox.isOpen}
                currentIndex={lightbox.index}
                onClose={() =>
                    setLightbox((prev) => ({ ...prev, isOpen: false }))
                }
                onNext={() =>
                    setLightbox((prev) => ({
                        ...prev,
                        index: (prev.index + 1) % lightboxImages.length,
                    }))
                }
                onPrev={() =>
                    setLightbox((prev) => ({
                        ...prev,
                        index:
                            (prev.index - 1 + lightboxImages.length) %
                            lightboxImages.length,
                    }))
                }
            />
        </div>
    );
}
