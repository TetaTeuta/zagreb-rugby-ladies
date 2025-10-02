import { forwardRef, useState } from "react";

const Image = forwardRef(
    (
        {
            src,
            alt,
            className = "",
            fallbackSrc,
            placeholder,
            loading = "lazy",
            onLoad,
            onError,
            aspectRatio = "square",
            showLoader = true,
            ...props
        },
        ref
    ) => {
        const [imageError, setImageError] = useState(false);
        const [imageLoading, setImageLoading] = useState(true);

        const aspectRatioClasses = {
            square: "aspect-square",
            "16/9": "aspect-video",
            "4/3": "aspect-[4/3]",
            "3/2": "aspect-[3/2]",
            auto: "",
        };

        const handleImageLoad = (e) => {
            setImageLoading(false);
            onLoad?.(e);
        };

        const handleImageError = (e) => {
            setImageError(true);
            setImageLoading(false);
            onError?.(e);
        };

        const containerClasses = [
            "relative overflow-hidden",
            aspectRatioClasses[aspectRatio],
            className,
        ]
            .filter(Boolean)
            .join(" ");

        return (
            <div ref={ref} className={containerClasses} {...props}>
                {!imageError ? (
                    <>
                        {/* Loading state */}
                        {imageLoading && showLoader && (
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center animate-pulse">
                                <div className="w-8 h-8 rounded-full bg-primary/30 animate-pulse" />
                            </div>
                        )}

                        {/* Actual image */}
                        <img
                            src={src}
                            alt={alt}
                            loading={loading}
                            className={`w-full h-full object-cover transition-opacity duration-300 ${
                                imageLoading ? "opacity-0" : "opacity-100"
                            }`}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                        />
                    </>
                ) : (
                    // Fallback content
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        {fallbackSrc ? (
                            <img
                                src={fallbackSrc}
                                alt={alt}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.parentNode.querySelector(
                                        ".fallback-placeholder"
                                    ).style.display = "flex";
                                }}
                            />
                        ) : null}
                        <div
                            className={`fallback-placeholder absolute inset-0 flex items-center justify-center ${
                                fallbackSrc ? "hidden" : ""
                            }`}
                        >
                            {placeholder || (
                                <div className="text-center">
                                    <div className="text-4xl mb-2 opacity-50">
                                        📷
                                    </div>
                                    <p className="text-sm text-muted">
                                        Image not available
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
);

Image.displayName = "Image";

export { Image };
