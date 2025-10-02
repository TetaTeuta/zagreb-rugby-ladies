import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Instagram, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

const PlayerModal = ({ player, isOpen, onClose }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Reset image state when modal opens/closes or player changes
    useEffect(() => {
        if (isOpen && player) {
            setImageError(false);
            setImageLoading(true);
            setCurrentImageIndex(0);
        }
    }, [isOpen, player]);

    if (!player) return null;

    const initials = player.name
        .split(" ")
        .map((n) => n[0])
        .join("");

    // Generate multiple fallback image URLs
    const getImageServices = () => {
        const seed = player.name.replace(/\s+/g, "-").toLowerCase();
        const services = [
            // If player has a photo URL, prioritize it first
            ...(player.photo ? [player.photo] : []),
            // UI-Avatars - most reliable service
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                player.name
            )}&size=400&background=5e6ad2&color=fff&bold=true&format=svg`,
            // Robohash - fun robot avatars as fallback
            `https://robohash.org/${seed}?set=set1&size=400x400&format=png`,
            // DiceBear - cartoon avatars as last resort
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=5e6ad2,d6336c&size=400`,
        ];
        return services;
    };

    const imageServices = getImageServices();
    const currentImageSrc = imageServices[currentImageIndex];

    const handleImageLoad = () => {
        setImageLoading(false);
        setImageError(false);
    };

    const handleImageError = () => {
        // Try next image service if available
        if (currentImageIndex < imageServices.length - 1) {
            setCurrentImageIndex((prev) => prev + 1);
            setImageLoading(true);
        } else {
            setImageError(true);
            setImageLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={player.name}
            description={`${player.position} • Zagreb Rugby Ladies`}
            size="lg"
        >
            <div className="space-y-6">
                {/* Player Image/Avatar */}
                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                            {!imageError ? (
                                <>
                                    {imageLoading && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-28 h-28 rounded-full bg-primary/30 flex items-center justify-center animate-pulse">
                                                <span className="text-2xl font-light tracking-wide text-primary">
                                                    {initials}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <img
                                        src={currentImageSrc}
                                        alt={`${player.name} portrait`}
                                        className={`w-full h-full object-cover rounded-full transition-opacity duration-300 ${
                                            imageLoading
                                                ? "opacity-0"
                                                : "opacity-100"
                                        }`}
                                        onLoad={handleImageLoad}
                                        onError={handleImageError}
                                    />
                                </>
                            ) : (
                                <div className="w-28 h-28 rounded-full bg-primary/30 flex items-center justify-center">
                                    <span className="text-2xl font-light tracking-wide text-primary">
                                        {initials}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-text mb-1">
                                Position
                            </h3>
                            <p className="text-primary font-medium">
                                {player.position}
                            </p>
                        </div>

                        {player.quote && (
                            <div>
                                <h3 className="text-lg font-semibold text-text mb-2">
                                    Player Quote
                                </h3>
                                <blockquote className="text-muted italic border-l-4 border-primary pl-4">
                                    "{player.quote}"
                                </blockquote>
                            </div>
                        )}
                    </div>
                </div>

                {/* About */}
                <div>
                    <h3 className="text-lg font-semibold text-text mb-3">
                        About {player.name.split(" ")[0]}
                    </h3>
                    <p className="text-muted leading-relaxed">{player.about}</p>
                </div>

                {/* Fun Fact */}
                {player.funFact && (
                    <div className="bg-primary/5 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-text mb-2">
                            Fun Fact
                        </h3>
                        <p className="text-muted">{player.funFact}</p>
                    </div>
                )}

                {/* Social Links */}
                {player.socials && Object.keys(player.socials).length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-text mb-3">
                            Connect
                        </h3>
                        <div className="flex gap-2">
                            {player.socials.instagram && (
                                <Button variant="blue" size="sm" asChild>
                                    <a
                                        href={player.socials.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2"
                                    >
                                        <Instagram className="h-4 w-4" />
                                        Instagram
                                    </a>
                                </Button>
                            )}

                            {/* Add other social links if needed */}
                            {Object.entries(player.socials).map(
                                ([platform, url]) => {
                                    if (platform === "instagram") return null; // Already handled above
                                    return (
                                        <Button
                                            key={platform}
                                            variant="blue"
                                            size="sm"
                                            asChild
                                        >
                                            <a
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                                {platform
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    platform.slice(1)}
                                            </a>
                                        </Button>
                                    );
                                }
                            )}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                    <Button variant="blue" className="flex-1" asChild>
                        <a href="mailto:team@zagreb-rugby-ladies.hr?subject=Interest in Joining">
                            Join the Team
                        </a>
                    </Button>
                    <Button variant="yellow" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export { PlayerModal };
