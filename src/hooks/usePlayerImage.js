import { useState, useEffect, useMemo, useCallback } from "react";
import { buildR2ImageUrl } from "../lib/cdn";

const generateFallbackImages = (playerName) => {
    const seed = playerName.replace(/\s+/g, "-").toLowerCase();

    return [
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            playerName
        )}&size=800&background=5e6ad2&color=fff&bold=true&format=svg`,
        `https://robohash.org/${seed}?set=set1&size=800x600&format=png`,
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=5e6ad2,d6336c&size=800`,
    ];
};

const resolveImageUrl = (photoPath) => {
    if (!photoPath) return null;

    if (photoPath.startsWith("gallery/")) {
        const filename = photoPath.replace("gallery/", "");
        return buildR2ImageUrl("Players", filename);
    }

    return photoPath;
};

export const usePlayerImage = (player, isOpen) => {
    const [imageState, setImageState] = useState({
        currentIndex: 0,
        isLoading: true,
        hasError: false,
    });

    const imageUrls = useMemo(() => {
        if (!player) return [];

        const primaryUrl = resolveImageUrl(player.bannerPhoto || player.photo);
        const fallbacks = generateFallbackImages(player.name);

        return primaryUrl ? [primaryUrl, ...fallbacks] : fallbacks;
    }, [player?.bannerPhoto, player?.photo, player?.name]);

    const currentImageUrl = imageUrls[imageState.currentIndex];

    const handleImageLoad = useCallback(() => {
        setImageState((prev) => ({
            ...prev,
            isLoading: false,
            hasError: false,
        }));
    }, []);

    const handleImageError = useCallback(() => {
        setImageState((prev) => {
            const isLastImage = prev.currentIndex >= imageUrls.length - 1;

            if (isLastImage) {
                return { ...prev, isLoading: false, hasError: true };
            }

            return {
                ...prev,
                currentIndex: prev.currentIndex + 1,
                isLoading: true,
                hasError: false,
            };
        });
    }, [imageUrls.length]);

    // Reset state when modal opens/closes or player changes
    useEffect(() => {
        if (isOpen && player) {
            setImageState({
                currentIndex: 0,
                isLoading: true,
                hasError: false,
            });
        }
    }, [isOpen, player]);

    return {
        imageUrl: currentImageUrl,
        isLoading: imageState.isLoading,
        hasError: imageState.hasError,
        onLoad: handleImageLoad,
        onError: handleImageError,
    };
};
