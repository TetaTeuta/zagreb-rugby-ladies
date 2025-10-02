import { Button } from "../ui/Button";

const getTeamLogo = (teamName) => {
    // Map team names to their logos
    const logoMap = {
        "Zagreb Rugby Ladies": "/src/assets/images/logos/logo_vector.png",
        "Rugby Nada Split": "/src/assets/images/logos/nada_logo.jpeg",
        "Split Rugby Club": "/src/assets/images/logos/nada_logo.jpeg",
        "Rijeka Rugby": "/src/assets/images/logos/logo.png", // placeholder
        "Osijek Rugby Club": "/src/assets/images/logos/logo.png", // placeholder
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
    const isHome = isHomeMatch(match, teamName);
    const opponent = getOpponent(match, teamName);
    const result = formatMatchResult(match, teamName);

    return (
        <div className="py-6 border border-border hover:bg-primary/5 transition-colors duration-normal">
            {/* Date and Location */}
            <div className="text-center mb-4">
                <div className="text-sm text-muted mb-1">
                    {new Date(match.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                    })}
                </div>
                <div className="text-sm text-muted">{match.location.name}</div>
            </div>

            {/* Teams and Score */}
            <div className="flex items-center justify-between mb-4">
                {/* Home Team */}
                <div className="flex-1 flex flex-col items-center">
                    <div className="mb-2">
                        <img
                            src={getTeamLogo(isHome ? teamName : opponent)}
                            alt={isHome ? teamName : opponent}
                            className="h-12 w-12 object-contain"
                        />
                    </div>
                    <h3 className="text-lg font-light tracking-wide font-hero text-text-contrast leading-[0.85]">
                        {(isHome ? teamName : opponent).toUpperCase()}
                    </h3>
                </div>

                {/* Score or Time */}
                <div className="px-8">
                    {result ? (
                        <div className="flex items-center gap-4">
                            <div className="text-3xl font-heading font-bold text-text-contrast">
                                {isHome ? result.ourScore : result.theirScore}
                            </div>
                            <div className="bg-text-contrast/10 px-3 py-1 rounded text-xs font-button font-medium text-muted">
                                Full Time
                            </div>
                            <div className="text-3xl font-heading font-bold text-text-contrast">
                                {isHome ? result.theirScore : result.ourScore}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="text-lg font-heading font-bold text-text-contrast mb-1">
                                {match.time}
                            </div>
                            <div className="text-xs text-muted">Kick Off</div>
                        </div>
                    )}
                </div>

                {/* Away Team */}
                <div className="flex-1 flex flex-col items-center">
                    <div className="mb-2">
                        <img
                            src={getTeamLogo(!isHome ? teamName : opponent)}
                            alt={!isHome ? teamName : opponent}
                            className="h-12 w-12 object-contain"
                        />
                    </div>
                    <h3 className="text-lg font-light tracking-wide font-hero text-text-contrast leading-[0.85]">
                        {(!isHome ? teamName : opponent).toUpperCase()}
                    </h3>
                </div>
            </div>

            {/* Action Button */}
            {match.status === "upcoming" && (
                <div className="text-center">
                    <Button variant="primary" size="sm" asChild>
                        <a
                            href={match.location.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Get Directions
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
        <div className="space-y-2">
            {matches.map((match, index) => (
                <div
                    key={match.id}
                    className="px-6 bg-surface rounded-md overflow-hidden"
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
