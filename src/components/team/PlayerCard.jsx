import { Button } from "../ui/Button";
import { useMemo } from "react";
import { buildR2ImageUrl } from "../../lib/cdn";
import { useTranslation } from "react-i18next";

const PLACEHOLDER_IMAGES = [
    "src/assets/images/players/petra_rugby.jpg",
    "src/assets/images/players/lucija_rugby.jpg",
    "src/assets/images/players/manuela_rugby.jpg",
    "src/assets/images/players/margaux_rugby.jpg",
    "src/assets/images/players/teuta_rugby.jpg",
    "src/assets/images/players/josipa_rugby.jpg",
    "src/assets/images/players/petra1_rugby.jpg",
];

const resolveImageUrl = (profilePhoto, playerId) => {
    if (profilePhoto?.startsWith("gallery/")) {
        const filename = profilePhoto.replace("gallery/", "");
        return buildR2ImageUrl("Players", filename);
    }

    if (profilePhoto) {
        return profilePhoto;
    }

    const fallbackIndex = playerId % PLACEHOLDER_IMAGES.length;
    return PLACEHOLDER_IMAGES[fallbackIndex];
};

const PlayerCard = ({ player, onPlayerClick, imagePath }) => {
    const { t } = useTranslation();

    const imageUrl = useMemo(
        () =>
            imagePath ||
            resolveImageUrl(player.profilePhoto || player.photo, player.id),
        [imagePath, player.profilePhoto, player.photo, player.id]
    );

    return (
        <div
            className="relative h-[400px] overflow-hidden rounded-custom group cursor-pointer"
            onClick={() => onPlayerClick(player)}
            role="button"
            tabIndex={0}
            aria-label={t("team.playerModal.viewPlayerProfile", {
                name: player.name,
            })}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onPlayerClick(player);
                }
            }}
        >
            <img
                src={imageUrl}
                alt={player.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 text-text-light">
                <h3 className="text-lg font-light tracking-wide uppercase mb-1">
                    {player.name}
                </h3>
                <p className="text-sm opacity-90 mb-3 font-light">
                    {player.position}
                </p>
                <Button
                    size="sm"
                    className="bg-surface text-text-contrast hover:bg-muted-light rounded-custom px-4 py-1 text-xs font-medium"
                >
                    {t("team.playerModal.viewProfile")}
                </Button>
            </div>
        </div>
    );
};

export { PlayerCard };
