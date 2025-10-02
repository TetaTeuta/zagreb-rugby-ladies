import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Instagram, ExternalLink, Zap } from "lucide-react";
import { useState, useEffect } from "react";

const PlayerModal = ({ player, isOpen, onClose }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    const getImageServices = () => {
        const seed = player.name.replace(/\s+/g, "-").toLowerCase();
        const services = [
            ...(player.photo ? [player.photo] : []),
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                player.name
            )}&size=800&background=5e6ad2&color=fff&bold=true&format=svg`,
            `https://robohash.org/${seed}?set=set1&size=800x600&format=png`,
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=5e6ad2,d6336c&size=800`,
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
            title=""
            description=""
            size="md"
            className="p-0 overflow-hidden"
        >
            <div className="overflow-y-auto max-h-[calc(100vh-8rem)] scrollbar-hide">
                <div className="relative mb-6 border border-white">
                    <div className="relative h-64 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                        {!imageError ? (
                            <>
                                {imageLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-6xl font-light tracking-wide text-primary animate-pulse">
                                            {initials}
                                        </div>
                                    </div>
                                )}
                                <img
                                    src={currentImageSrc}
                                    alt={`${player.name} portrait`}
                                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                                        imageLoading
                                            ? "opacity-0"
                                            : "opacity-100"
                                    }`}
                                    onLoad={handleImageLoad}
                                    onError={handleImageError}
                                />
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-6xl font-light tracking-wide text-primary">
                                    {initials}
                                </span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h2 className="text-4xl font-bold mb-2">
                                {player.name}
                            </h2>
                            <p className="text-base opacity-90">
                                {player.position} • Zagreb Rugby Ladies
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-6 space-y-6">
                    <div>
                        <h3 className="text-sm font-semibold text-muted mb-2">
                            Position
                        </h3>
                        <p className="text-lg text-text font-medium">
                            {player.position}
                        </p>
                    </div>

                    {player.quote && (
                        <div>
                            <h3 className="text-sm font-semibold text-muted mb-2">
                                Player Quote
                            </h3>
                            <blockquote className="text-muted italic border-l-4 border-accent pl-4 py-1">
                                "{player.quote}"
                            </blockquote>
                        </div>
                    )}

                    <div>
                        <h3 className="text-sm font-semibold text-muted mb-2">
                            About {player.name.split(" ")[0]}
                        </h3>
                        <p className="text-text leading-relaxed">
                            {player.about}
                        </p>
                    </div>

                    {player.funFact && (
                        <div className="bg-white rounded-xl border border-gray-200">
                            <div className="p-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-yellow-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold text-text mb-1">
                                            Fun Fact
                                        </h3>
                                        <p className="text-muted text-sm">
                                            {player.funFact}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {player.socials &&
                        Object.keys(player.socials).length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-muted mb-3">
                                    Connect
                                </h3>
                                <div className="flex gap-2">
                                    {player.socials.instagram && (
                                        <Button
                                            variant="blue"
                                            size="sm"
                                            asChild
                                        >
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

                                    {Object.entries(player.socials).map(
                                        ([platform, url]) => {
                                            if (platform === "instagram")
                                                return null;
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

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 pb-6">
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
            </div>
        </Modal>
    );
};

export { PlayerModal };
