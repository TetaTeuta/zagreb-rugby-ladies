import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Instagram, ExternalLink, Zap } from "lucide-react";
import { usePlayerImage } from "../../hooks/usePlayerImage";
import { useTranslation } from "react-i18next";

const PlayerInitials = ({ name }) => {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("");

    return (
        <span className="text-6xl font-light tracking-wide text-primary">
            {initials}
        </span>
    );
};

const PlayerBanner = ({
    player,
    imageUrl,
    isLoading,
    hasError,
    onLoad,
    onError,
}) => {
    const { t } = useTranslation();

    // Map position to translation key (same as PlayerCard)
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
        <div className="relative mb-6 border border-white">
            <div className="relative h-64 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                {!hasError ? (
                    <>
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="animate-pulse">
                                    <PlayerInitials name={player.name} />
                                </div>
                            </div>
                        )}
                        <img
                            src={imageUrl}
                            alt={`${player.name} portrait`}
                            className={`w-full h-full object-cover transition-opacity duration-300 ${
                                isLoading ? "opacity-0" : "opacity-100"
                            }`}
                            onLoad={onLoad}
                            onError={onError}
                        />
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <PlayerInitials name={player.name} />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h2 className="text-4xl font-bold mb-2">{player.name}</h2>
                    <p className="text-base opacity-90">
                        {t(getPositionTranslationKey(player.position))} •{" "}
                        {t("team.playerModal.clubName")}
                    </p>
                </div>
            </div>
        </div>
    );
};

const InfoSection = ({ title, children }) => (
    <div>
        <h3 className="text-sm font-semibold text-muted mb-2">{title}</h3>
        {children}
    </div>
);

const PlayerQuote = ({ player }) => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language || "en";
    const quote =
        player.translations?.[currentLanguage]?.quote ||
        player.translations?.en?.quote ||
        "";

    return (
        <InfoSection title={t("team.playerModal.playerQuote")}>
            <blockquote className="text-muted italic border-l-4 border-accent pl-4 py-1">
                "{quote}"
            </blockquote>
        </InfoSection>
    );
};

const PlayerAbout = ({ player }) => {
    const { t, i18n } = useTranslation();
    const firstName = player.name.split(" ")[0];
    const currentLanguage = i18n.language || "en";
    const about =
        player.translations?.[currentLanguage]?.about ||
        player.translations?.en?.about ||
        "";

    return (
        <InfoSection title={t("team.playerModal.about", { name: firstName })}>
            <p className="text-text leading-relaxed">{about}</p>
        </InfoSection>
    );
};

const PlayerFunFact = ({ player }) => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language || "en";
    const funFact =
        player.translations?.[currentLanguage]?.funFact ||
        player.translations?.en?.funFact ||
        "";

    return (
        <div className="bg-white rounded-custom border border-gray-200">
            <div className="p-4">
                <div className="flex items-start gap-3">
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-text mb-1">
                            {t("team.playerModal.funFact")}
                        </h3>
                        <p className="text-muted text-sm">{funFact}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PlayerActions = ({ onClose }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col sm:flex-row gap-3 pt-4 pb-6">
            <Button variant="blue" className="flex-1" asChild>
                <a href="mailto:zrkzagreb@zagreb-rugby.hr?subject=Interest in Joining">
                    {t("team.playerModal.joinTeam")}
                </a>
            </Button>
            <Button variant="yellow" onClick={onClose}>
                {t("team.playerModal.close")}
            </Button>
        </div>
    );
};

const PlayerModal = ({ player, isOpen, onClose }) => {
    const { t, i18n } = useTranslation();
    const imageState = usePlayerImage(player, isOpen);
    const currentLanguage = i18n.language || "en";

    if (!player) return null;

    // Helper function to check if translation exists
    const hasTranslation = (key) => {
        return (
            player.translations?.[currentLanguage]?.[key] ||
            player.translations?.en?.[key]
        );
    };

    // Map position to translation key (same as PlayerCard)
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
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title=""
            description=""
            size="md"
            className="p-0 overflow-hidden"
        >
            <div className="overflow-y-auto max-h-[calc(100vh-8rem)] scrollbar-hide">
                <PlayerBanner player={player} {...imageState} />

                <div className="px-6 space-y-6">
                    <InfoSection title={t("team.playerModal.position")}>
                        <p className="text-lg text-text font-medium">
                            {t(getPositionTranslationKey(player.position))}
                        </p>
                    </InfoSection>

                    {hasTranslation("quote") && <PlayerQuote player={player} />}

                    <PlayerAbout player={player} />

                    {hasTranslation("funFact") && (
                        <PlayerFunFact player={player} />
                    )}
                    <PlayerActions onClose={onClose} />
                </div>
            </div>
        </Modal>
    );
};

export { PlayerModal };
