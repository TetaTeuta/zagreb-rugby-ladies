import { Button } from "../ui/Button";
import { useMemo } from "react";
import { buildR2ImageUrl, cdn } from "../../lib/cdn";
import { useTranslation } from "react-i18next";

const PLACEHOLDER_IMAGES = [
    cdn("players/petra_rugby.jpg"),
    cdn("players/lucija_rugby.jpg"),
    cdn("players/manuela_rugby.jpg"),
    cdn("players/margaux_rugby.jpg"),
    cdn("players/teuta_rugby.jpg"),
    cdn("players/josipa_rugby.jpg"),
    cdn("players/petra1_rugby.jpg"),
];

const resolveImageUrl = (profilePhoto, playerId) => {
    if (profilePhoto?.startsWith("gallery/")) {
        const filename = profilePhoto.replace("gallery/", "");
        return buildR2ImageUrl("Players", filename);
    }

    if (
        profilePhoto?.startsWith("players/") ||
        profilePhoto?.startsWith("players_background/") ||
        profilePhoto?.startsWith("logos/")
    ) {
        return cdn(profilePhoto);
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

    // Map position to translation key
    const getPositionTranslationKey = (position) => {
        const positionMap = {
            "Scrum Half": "team.positions.scrumHalf",
            Prop: "team.positions.prop",
            "Loosehead Prop": "team.positions.looseheadProp",
            "Tighthead Prop": "team.positions.tightheadProp",
            "Fly Half": "team.positions.flyHalf",
            Lock: "team.positions.lock",
            Centre: "team.positions.centre",
            "Inside Centre": "team.positions.insideCentre",
            Fullback: "team.positions.fullback",
            Flanker: "team.positions.flanker",
            Winger: "team.positions.winger",
            Wing: "team.positions.wing",
            "Number 8": "team.positions.number8",
            Hooker: "team.positions.hooker",
            "Second Row": "team.positions.secondRow",
        };
        return positionMap[position] || position;
    };

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
                    {t(getPositionTranslationKey(player.position))}
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
