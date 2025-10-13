// src/pages/Gallery.jsx
import {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useRef,
    memo,
    useDeferredValue,
    startTransition,
} from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Lightbox } from "../components/ui/Lightbox";
import { Play } from "lucide-react";
import { Button } from "../components/ui/Button";
import { cdn } from "../lib/cdn";

const VARIANTS = [320, 640, 1280, 1600];

function buildSrc(slug, ext = "jpg", width = 640) {
    return cdn(`gallery/${slug}_${width}.${ext}`);
}

function buildSrcSet(slug, ext = "jpg") {
    return VARIANTS.map(
        (w) => `${cdn(`gallery/${slug}_${w}.${ext}`)} ${w}w`
    ).join(", ");
}

function formatDate(dateISO) {
    return new Date(dateISO).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

const Thumb = memo(function Thumb({ item, onOpen }) {
    const imgRef = useRef(null);
    useEffect(() => {
        const el = imgRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        const target = e.target;
                        target.dataset.loaded = "1";
                        obs.unobserve(target);
                    }
                });
            },
            { rootMargin: "400px 0px" }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const isVideo = item.type === "video";
    const alt = item.alt || item.title;
    const thumbSlug = isVideo ? item.thumbSlug : item.slug;

    return (
        <div
            className="gallery-card group"
            role="button"
            tabIndex={0}
            aria-label={item.title}
            onClick={() => onOpen(item)}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpen(item);
                }
            }}
        >
            {isVideo ? (
                <img
                    ref={imgRef}
                    src={buildSrc(thumbSlug, "jpg", 640)}
                    alt={alt}
                    className="gallery-card-image"
                    loading="lazy"
                    decoding="async"
                    width={item.w}
                    height={item.h}
                />
            ) : (
                <picture>
                    <source
                        media="(min-width: 1024px)"
                        srcSet={buildSrcSet(item.slug, "avif")}
                        type="image/avif"
                    />
                    <source
                        media="(min-width: 1024px)"
                        srcSet={buildSrcSet(item.slug, "webp")}
                        type="image/webp"
                    />
                    <source
                        srcSet={buildSrcSet(item.slug, "avif")}
                        type="image/avif"
                    />
                    <source
                        srcSet={buildSrcSet(item.slug, "webp")}
                        type="image/webp"
                    />
                    <img
                        ref={imgRef}
                        src={buildSrc(item.slug, "jpg", 640)}
                        alt={alt}
                        className="gallery-card-image"
                        loading="lazy"
                        decoding="async"
                        width={item.w}
                        height={item.h}
                        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                </picture>
            )}
            <div className="gallery-card-overlay" />
            <div className="gallery-card-content">
                <h3 className="gallery-card-title">{item.title}</h3>
                <p className="gallery-card-date">{formatDate(item.dateISO)}</p>
            </div>
            {isVideo && (
                <div className="gallery-card-video-badge" aria-hidden="true">
                    <Play className="h-5 w-5 text-text-contrast" />
                </div>
            )}
        </div>
    );
});

export default function Gallery() {
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [params, setParams] = useSearchParams();
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const gridRef = useRef(null);
    const yearSectionRefs = useRef({});

    // Initializing activeYear and activeCategory based on URL params or defaults
    const activeYearParam = parseInt(params.get("year") || "0", 10);
    const activeCategoryParam = params.get("cat") || "all";

    // Fetch gallery items from manifest.json
    useEffect(() => {
        const fetchGalleryItems = async () => {
            try {
                const response = await fetch("/gallery/manifest.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch gallery manifest");
                }
                const data = await response.json();
                const transformedData = data.map((item) => ({
                    ...item,
                    src: `/gallery/${item.slug}.jpg`,
                    thumbnail: `/gallery/${item.slug}_thumbnail.jpg`,
                }));
                setGalleryItems(transformedData);
                setLoading(false);
            } catch (err) {
                console.error("Error loading gallery items:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchGalleryItems();
    }, []);

    const availableYears = useMemo(() => {
        if (galleryItems.length === 0) return [];
        const years = [...new Set(galleryItems.map((item) => item.year))].sort(
            (a, b) => b - a
        );
        return years;
    }, [galleryItems]);

    const activeYear = useMemo(() => {
        if (availableYears.length === 0) return new Date().getFullYear(); // Fallback if no years available
        return availableYears.includes(activeYearParam)
            ? activeYearParam
            : availableYears[0];
    }, [availableYears, activeYearParam]);

    const [activeCategory, setActiveCategory] = useState(activeCategoryParam);
    useEffect(() => {
        setActiveCategory(activeCategoryParam);
    }, [activeCategoryParam]);

    const deferredCategory = useDeferredValue(activeCategory);

    useEffect(() => {
        const next = new URLSearchParams();
        next.set("year", String(activeYear));
        if (deferredCategory !== "all") next.set("cat", deferredCategory);
        setParams(next, { replace: true });
    }, [activeYear, deferredCategory, setParams]);

    const filtered = useMemo(() => {
        return galleryItems.filter(
            (item) =>
                (deferredCategory === "all" ||
                    item.category === deferredCategory) &&
                item.year === activeYear
        );
    }, [galleryItems, deferredCategory, activeYear]);

    const itemsByYear = useMemo(() => {
        const grouped = {};
        for (const item of filtered) {
            if (!grouped[item.year]) {
                grouped[item.year] = [];
            }
            grouped[item.year].push(item);
        }
        return grouped;
    }, [filtered]);

    const categoryStats = useMemo(() => {
        const stats = {
            all: galleryItems.length,
            training: galleryItems.filter(
                (item) => item.category === "training"
            ).length,
            matches: galleryItems.filter((item) => item.category === "matches")
                .length,
            community: galleryItems.filter(
                (item) => item.category === "community"
            ).length,
        };
        return stats;
    }, [galleryItems]);

    const yearStats = useMemo(() => {
        return availableYears.map((year) => ({
            year,
            count: galleryItems.filter((item) => item.year === year).length,
        }));
    }, [availableYears, galleryItems]);

    useEffect(() => {
        if (galleryItems.length === 0) return; // Don't observe if no items

        const observerOptions = {
            root: null,
            rootMargin: "-50% 0px -50% 0px",
            threshold: 0,
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const year = parseInt(entry.target.dataset.year, 10);
                    if (!Number.isNaN(year) && year !== activeYear) {
                        startTransition(() => {
                            const next = new URLSearchParams(params);
                            next.set("year", String(year));
                            setParams(next, { replace: true });
                        });
                    }
                }
            });
        };

        const observer = new IntersectionObserver(
            observerCallback,
            observerOptions
        );

        Object.values(yearSectionRefs.current).forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            observer.disconnect();
        };
    }, [params, activeYear, setParams, galleryItems]); // Added galleryItems

    const imageItems = useMemo(
        () => filtered.filter((item) => item.type !== "video"),
        [filtered]
    );

    const openItem = useCallback(
        (item) => {
            if (item.type === "video") {
                window.open(item.src, "_blank", "noopener,noreferrer");
                return;
            }
            const idx = imageItems.findIndex((x) => x.id === item.id);
            if (idx !== -1) {
                setCurrentIndex(idx);
                setLightboxOpen(true);
            }
        },
        [imageItems]
    );

    const closeLightbox = useCallback(() => setLightboxOpen(false), []);
    const nextImage = useCallback(
        () => setCurrentIndex((i) => (i + 1) % imageItems.length),
        [imageItems.length]
    );
    const prevImage = useCallback(
        () =>
            setCurrentIndex(
                (i) => (i - 1 + imageItems.length) % imageItems.length
            ),
        [imageItems.length]
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface">
                <p className="text-muted text-lg">Loading gallery items...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface">
                <p className="text-red-500 text-lg">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface">
            <div className="relative h-[50svh] overflow-hidden mt-20">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                    <div className="absolute inset-0 bg-black/20" />
                </div>
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{
                        backgroundImage: `url(${buildSrc(
                            "players/margaux/margaux-rugby",
                            "jpg",
                            1280
                        )})`,
                    }}
                />
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center max-w-4xl mx-auto px-6 sm:px-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 tracking-wide text-text-light leading-tight">
                            CAPTURING MOMENTS. SHARING STORIES.
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button size="lg" variant="blue" asChild>
                                <Link to="/contact">Join Our Team</Link>
                            </Button>
                            <Button size="lg" variant="yellow" asChild>
                                <Link to="/team">Meet Our Players</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-16 max-w-7xl mx-auto">
                <div
                    className="gallery-filters"
                    role="group"
                    aria-label="Photo categories"
                >
                    {[
                        { id: "all", label: "All Photos" },
                        { id: "training", label: "Training" },
                        { id: "matches", label: "Matches" },
                        { id: "community", label: "Community" },
                    ].map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                startTransition(() => {
                                    const next = new URLSearchParams(params);
                                    if (cat.id === "all") next.delete("cat");
                                    else next.set("cat", cat.id);
                                    setParams(next, { replace: true });
                                });
                            }}
                            className={`pill ${
                                activeCategory === cat.id ? "pill-active" : ""
                            }`}
                            aria-pressed={activeCategory === cat.id}
                        >
                            {cat.label}
                            <span className="pill-badge">
                                {categoryStats[cat.id]}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="gallery-layout" ref={gridRef}>
                    <nav
                        aria-label="Years"
                        className="gallery-timeline hidden lg:flex"
                    >
                        <ol role="list">
                            {yearStats.map(({ year, count }) => (
                                <li key={year}>
                                    <button
                                        onClick={() => {
                                            startTransition(() => {
                                                const next =
                                                    new URLSearchParams(params);
                                                next.set("year", String(year));
                                                setParams(next, {
                                                    replace: true,
                                                });
                                                gridRef.current?.scrollIntoView(
                                                    {
                                                        behavior: "smooth",
                                                        block: "start",
                                                    }
                                                );
                                            });
                                        }}
                                        className="gallery-timeline-item"
                                        aria-current={
                                            activeYear === year
                                                ? "page"
                                                : undefined
                                        }
                                    >
                                        <div className="gallery-timeline-dot" />
                                        <div className="gallery-timeline-label">
                                            <div className="gallery-timeline-year">
                                                {year}
                                            </div>
                                            <div className="gallery-timeline-count">
                                                {count} photos
                                            </div>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <div className="lg:hidden mb-6">
                        <select
                            value={activeYear}
                            onChange={(e) => {
                                const y = parseInt(e.target.value, 10);
                                const next = new URLSearchParams(params);
                                next.set("year", String(y));
                                setParams(next, { replace: true });
                                gridRef.current?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                });
                            }}
                            className="gallery-year-select"
                            aria-label="Select year"
                        >
                            {yearStats.map(({ year, count }) => (
                                <option key={year} value={year}>
                                    {year} ({count} photos)
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        {galleryItems.length > 0 ? (
                            <div className="space-y-12">
                                {availableYears.map((year) => (
                                    <section
                                        key={year}
                                        ref={(el) =>
                                            (yearSectionRefs.current[year] = el)
                                        }
                                        data-year={year}
                                        className="scroll-mt-32"
                                    >
                                        <div className="gallery-grid">
                                            {itemsByYear[year]?.map((item) => (
                                                <Thumb
                                                    key={item.id}
                                                    item={item}
                                                    onOpen={openItem}
                                                />
                                            ))}
                                        </div>
                                    </section>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted text-lg">
                                    {loading
                                        ? "Loading gallery items..."
                                        : error
                                        ? `Error: ${error}`
                                        : "No photos found for this selection."}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="relative h-[700px] overflow-hidden rounded group cursor-pointer mt-20">
                    <img
                        src={buildSrc("players/petra/petra-alt", "jpg", 1280)}
                        alt="Join our story"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-text-contrast/70 via-text-contrast/30 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-2xl ml-12 text-text-light">
                            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                Want to Be Part of These Moments?
                            </h2>
                            <p className="text-xl mb-8 opacity-90 leading-relaxed">
                                Join Zagreb Rugby Ladies and create your own
                                unforgettable memories. Every training session,
                                every match, every celebration could include
                                you.
                            </p>
                            <div className="flex gap-4">
                                <Button size="lg" variant="blue" asChild>
                                    <Link to="/contact">Join Training</Link>
                                </Button>
                                <Button size="lg" variant="yellow" asChild>
                                    <Link to="/team">Meet Our Players</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Lightbox
                images={imageItems.map((it) => ({
                    ...it,
                    src: buildSrc(it.slug, "jpg", 1600),
                    thumbnail: buildSrc(it.slug, "jpg", 320),
                }))}
                isOpen={lightboxOpen}
                currentIndex={currentIndex}
                onClose={closeLightbox}
                onNext={nextImage}
                onPrev={prevImage}
            />
        </div>
    );
}
