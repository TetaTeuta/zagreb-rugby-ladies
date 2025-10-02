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

    if (!isOpen || !images.length) return null;

    const currentImage = images[currentIndex];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-text-contrast/90"
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery"
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-text-contrast/50 text-text-light hover:bg-text-contrast/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close gallery"
            >
                <X className="h-6 w-6" />
            </button>

            {/* Previous button */}
            {images.length > 1 && (
                <button
                    onClick={onPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-lg bg-text-contrast/50 text-text-light hover:bg-text-contrast/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="h-8 w-8" />
                </button>
            )}

            {/* Next button */}
            {images.length > 1 && (
                <button
                    onClick={onNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-lg bg-text-contrast/50 text-text-light hover:bg-text-contrast/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label="Next image"
                >
                    <ChevronRight className="h-8 w-8" />
                </button>
            )}

            {/* Main image */}
            <div
                ref={lightboxRef}
                className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center p-4"
                tabIndex={-1}
            >
                <img
                    src={currentImage.src}
                    alt={currentImage.alt || `Image ${currentIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                        e.target.src = "/images/placeholder-image.jpg";
                    }}
                />

                {/* Image info */}
                {(currentImage.title || currentImage.description) && (
                    <div className="absolute bottom-4 left-4 right-4 bg-text-contrast/70 text-text-light p-4 rounded-lg">
                        {currentImage.title && (
                            <h3 className="text-lg font-semibold mb-1">
                                {currentImage.title}
                            </h3>
                        )}
                        {currentImage.description && (
                            <p className="text-sm opacity-90">
                                {currentImage.description}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Image counter */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-text-contrast/70 text-text-light text-sm rounded-full">
                    {currentIndex + 1} / {images.length}
                </div>
            )}

            {/* Backdrop click to close */}
            <div
                className="absolute inset-0 -z-10"
                onClick={onClose}
                aria-hidden="true"
            />
        </div>
    );
};

export { Lightbox };
