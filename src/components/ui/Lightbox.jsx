import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Lightbox = ({
    images,
    isOpen,
    currentIndex,
    onClose,
    onNext,
    onPrev,
}) => {
    const lightboxRef = useRef(null);
    const previousActiveElement = useRef(null);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const [swipeOffset, setSwipeOffset] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Focus management and accessibility
    useEffect(() => {
        if (isOpen) {
            previousActiveElement.current = document.activeElement;
            lightboxRef.current?.focus();
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            previousActiveElement.current?.focus();
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            switch (e.key) {
                case "Escape":
                    onClose();
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    onPrev();
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    onNext();
                    break;
                default:
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose, onNext, onPrev]);

    // Reset swipe state when image changes
    useEffect(() => {
        setSwipeOffset(0);
        setIsTransitioning(true);

        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [currentIndex]);

    // Touch swipe handlers
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = null;
        setIsTransitioning(false);
    };

    const handleTouchMove = (e) => {
        if (!touchStartX.current) return;

        touchEndX.current = e.touches[0].clientX;
        const diff = touchEndX.current - touchStartX.current;

        // Apply resistance at boundaries
        const resistance = 0.5;
        setSwipeOffset(diff * resistance);
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) {
            setSwipeOffset(0);
            return;
        }

        const swipeDistance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50; // minimum distance for a swipe to register

        setIsTransitioning(true);

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swiped left - show next image
                onNext();
            } else {
                // Swiped right - show previous image
                onPrev();
            }
        }

        // Reset values with a small delay for transition
        setTimeout(() => {
            setSwipeOffset(0);
            setIsTransitioning(false);
        }, 50);

        touchStartX.current = null;
        touchEndX.current = null;
    };

    if (!isOpen || !images.length) return null;

    const currentImage = images[currentIndex];

    return (
        <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery"
        >
            {/* Top bar with close button and counter */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-6 bg-gradient-to-b from-black/60 to-transparent">
                {currentImage.title && (
                    <div className="text-text-light text-lg font-medium">
                        {currentImage.title}
                    </div>
                )}
                <div className="flex items-center gap-4 ml-auto">
                    {images.length > 1 && (
                        <div className="text-text-light/80 text-sm font-medium">
                            {currentIndex + 1} / {images.length}
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg bg-white/10 text-text-light hover:bg-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        aria-label="Close gallery"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Navigation buttons - positioned at bottom */}
            {images.length > 1 && (
                <div className="absolute bottom-20 left-0 right-0 z-20 flex items-center justify-center gap-6 pb-4">
                    <button
                        onClick={onPrev}
                        className="p-4 rounded-full bg-white/10 text-text-light hover:bg-white/20 hover:scale-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white backdrop-blur-sm"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </button>
                    <button
                        onClick={onNext}
                        className="p-4 rounded-full bg-white/10 text-text-light hover:bg-white/20 hover:scale-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white backdrop-blur-sm"
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-8 w-8" />
                    </button>
                </div>
            )}

            {/* Main image container */}
            <div
                ref={lightboxRef}
                className="w-full h-full flex items-center justify-center p-8 pt-24 pb-32"
                tabIndex={-1}
                onClick={onClose}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <img
                    src={currentImage.src}
                    alt={
                        currentImage.alt ||
                        currentImage.title ||
                        `Image ${currentIndex + 1}`
                    }
                    className="max-w-full max-h-full w-auto h-auto object-contain shadow-2xl"
                    style={{
                        maxWidth: "95vw",
                        maxHeight: "85vh",
                        transform: `translateX(${swipeOffset}px)`,
                        transition: isTransitioning
                            ? "transform 0.3s ease-out, opacity 0.3s ease-out"
                            : "none",
                        opacity: isTransitioning
                            ? 0.7
                            : 1 - Math.abs(swipeOffset) / 1000,
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onError={(e) => {
                        e.target.src = "/images/placeholder-image.jpg";
                    }}
                />
            </div>

            {/* Bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/60 to-transparent">
                {currentImage.dateISO && (
                    <div className="px-8 py-6">
                        <p className="text-text-light/80 text-sm">
                            {new Date(currentImage.dateISO).toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export { Lightbox };
