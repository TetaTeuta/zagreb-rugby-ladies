import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const Modal = ({
    isOpen,
    onClose,
    children,
    title,
    description,
    className = "",
    size = "md",
}) => {
    const modalRef = useRef(null);
    const previousActiveElement = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    const sizes = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-7xl",
    };

    // Handle animation state
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            // Small delay to ensure DOM is ready before animation
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsAnimating(true);
                });
            });
        } else {
            setIsAnimating(false);
            // Wait for animation to complete before unmounting
            const timer = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Focus trap and accessibility
    useEffect(() => {
        if (isOpen) {
            previousActiveElement.current = document.activeElement;
            modalRef.current?.focus();
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            previousActiveElement.current?.focus();
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    // Handle tab focus trap
    useEffect(() => {
        if (!isOpen) return;

        const handleTab = (e) => {
            if (e.key !== "Tab") return;

            const modal = modalRef.current;
            if (!modal) return;

            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement?.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement?.focus();
                    e.preventDefault();
                }
            }
        };

        document.addEventListener("keydown", handleTab);
        return () => document.removeEventListener("keydown", handleTab);
    }, [isOpen]);

    if (!shouldRender) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            aria-describedby={description ? "modal-description" : undefined}
            style={{
                opacity: isAnimating ? 1 : 0,
                transition: "opacity 300ms ease-out",
            }}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-text-contrast/50 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
                style={{
                    opacity: isAnimating ? 1 : 0,
                    transition: "opacity 300ms ease-out",
                }}
            />

            {/* Modal */}
            <div
                ref={modalRef}
                className={[
                    "relative w-full rounded-custom bg-surface shadow-float border border-white",
                    sizes[size],
                    className,
                ].join(" ")}
                tabIndex={-1}
                style={{
                    opacity: isAnimating ? 1 : 0,
                    transform: isAnimating ? "scale(1)" : "scale(0.95)",
                    transformOrigin: "center center",
                    transition:
                        "opacity 300ms ease-out, transform 300ms ease-out",
                }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 rounded-lg p-1 bg-white/90 text-text transition-colors hover:bg-white hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-md"
                    aria-label="Close modal"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Header */}
                {(title || description) && (
                    <div className="mb-6 pr-8">
                        {title && (
                            <h2
                                id="modal-title"
                                className="text-xl font-semibold text-text"
                            >
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p
                                id="modal-description"
                                className="mt-2 text-sm text-muted"
                            >
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="overflow-auto max-h-[calc(100vh-8rem)]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export { Modal };
