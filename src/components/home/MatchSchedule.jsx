import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";

const getTeamLogo = (teamName) => {
    // Map team names to their logos
    const logoMap = {
        "Zagreb Rugby Ladies":
            "src/assets/images/logos/zagreb-rugby-ladies-logo-vector.png",
        "Rugby Nada Split": "src/assets/images/logos/nada-rugby-logo.jpeg",
        "Split Rugby Club": "src/assets/images/logos/nada-rugby-logo.jpeg",
        "Rijeka Rugby": "src/assets/images/logos/nada-rugby-logo.jpeg",
        "Osijek Rugby Club": "src/assets/images/logos/nada-rugby-logo.jpeg",
    };

    return logoMap[teamName] || "/src/assets/images/logos/logo.png";
};

const MatchItem = ({
    match,
    teamName,
    getOpponent,
    formatMatchResult,
    isHomeMatch,
}) => {
    const { t } = useTranslation();
    const isHome = isHomeMatch(match, teamName);
    const opponent = getOpponent(match, teamName);
    const result = formatMatchResult(match, teamName);

    return (
        <div className="py-4 sm:py-6 border border-border hover:bg-primary/5 transition-colors duration-normal">
            {/* Date and Location */}
            <div className="text-center mb-4">
                <div className="text-xs sm:text-sm text-muted mb-1">
                    {new Date(match.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                    })}
                </div>
                <div className="text-xs sm:text-sm text-muted truncate px-2">
                    {match.location.name}
                </div>
            </div>

            {/* Teams and Score - Responsive Layout */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mb-4">
                {/* Home Team */}
                <div className="flex-1 flex flex-col items-center min-w-0 px-2">
                    <div className="mb-2">
                        <img
                            src={getTeamLogo(isHome ? teamName : opponent)}
                            alt={isHome ? teamName : opponent}
                            className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                        />
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg font-light tracking-wide font-hero text-text-contrast leading-tight text-center break-words w-full">
                        {(isHome ? teamName : opponent).toUpperCase()}
                    </h3>
                </div>

                {/* Score or Time */}
                <div className="px-2 sm:px-4 md:px-6 flex-shrink-0">
                    {result ? (
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-4">
                            <div className="text-2xl sm:text-3xl font-heading font-bold text-text-contrast">
                                {isHome ? result.ourScore : result.theirScore}
                            </div>
                            <div className="bg-text-contrast/10 px-2 sm:px-3 py-1 rounded text-xs font-button font-medium text-muted whitespace-nowrap">
                                {t("schedule.match.fullTime")}
                            </div>
                            <div className="text-2xl sm:text-3xl font-heading font-bold text-text-contrast">
                                {isHome ? result.theirScore : result.ourScore}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="text-lg sm:text-xl font-heading font-bold text-text-contrast mb-1">
                                {match.time}
                            </div>
                            <div className="text-xs text-muted whitespace-nowrap">
                                {t("schedule.match.kickOff")}
                            </div>
                        </div>
                    )}
                </div>

                {/* Away Team */}
                <div className="flex-1 flex flex-col items-center min-w-0 px-2">
                    <div className="mb-2">
                        <img
                            src={getTeamLogo(!isHome ? teamName : opponent)}
                            alt={!isHome ? teamName : opponent}
                            className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                        />
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg font-light tracking-wide font-hero text-text-contrast leading-tight text-center break-words w-full">
                        {(!isHome ? teamName : opponent).toUpperCase()}
                    </h3>
                </div>
            </div>

            {/* Action Button */}
            {match.status === "upcoming" && (
                <div className="text-center mt-4">
                    <Button
                        variant="blue"
                        size="sm"
                        asChild
                        className="w-full sm:w-auto"
                    >
                        <a
                            href={match.location.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t("schedule.getDirections")}
                        </a>
                    </Button>
                </div>
            )}
        </div>
    );
};

const MatchSchedule = ({
    matches,
    teamName,
    getOpponent,
    formatMatchResult,
    isHomeMatch,
}) => {
    return (
        <div className="space-y-3">
            {matches.map((match, index) => (
                <div
                    key={match.id}
                    className="px-3 sm:px-4 md:px-6 bg-surface rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    style={{ "--index": index }}
                >
                    <MatchItem
                        match={match}
                        teamName={teamName}
                        getOpponent={getOpponent}
                        formatMatchResult={formatMatchResult}
                        isHomeMatch={isHomeMatch}
                    />
                </div>
            ))}
        </div>
    );
};

export { MatchSchedule };
