/**
 * Finds the next upcoming match from the schedule data
 * @param {Object} scheduleData - The schedule data containing all teams and matches
 * @returns {Object|null} - The next match data formatted for NextMatch component, or null if no upcoming matches
 */
export const getNextUpcomingMatch = (scheduleData) => {
    if (!scheduleData?.teams) {
        return null;
    }

    const allMatches = [];

    Object.values(scheduleData.teams).forEach((team) => {
        if (team.matches) {
            team.matches.forEach((match) => {
                if (match.status === "upcoming") {
                    const dateTimeString =
                        match.time != null
                            ? `${match.date}T${match.time}:00`
                            : `${match.date}T12:00:00`;
                    const matchDateTime = new Date(dateTimeString);
                    allMatches.push({
                        ...match,
                        dateTime: matchDateTime,
                        teamData: team,
                    });
                }
            });
        }
    });

    const sortedMatches = allMatches.sort((a, b) => a.dateTime - b.dateTime);
    const nextMatch = sortedMatches[0];

    if (!nextMatch) {
        return null;
    }

    const zagrebTeamName = nextMatch.teamData.name;
    const isHome = nextMatch.homeTeam === zagrebTeamName;

    const opponentName = isHome ? nextMatch.awayTeam : nextMatch.homeTeam;

    const opponent = {
        name: opponentName,
        logo: getTeamLogo(opponentName),
        location: isHome ? null : nextMatch.location,
    };

    const homeVenue = isHome ? nextMatch.location : null;

    return {
        match: {
            date: nextMatch.date,
            time: nextMatch.time,
            isHome: isHome,
            homeTeam: {
                name: zagrebTeamName,
                logo: nextMatch.teamData.logo,
            },
            matchType: nextMatch.matchType,
            season: scheduleData.season,
        },
        opponent: opponent,
        homeVenue: homeVenue,
    };
};

/**
 * Gets the appropriate logo for a team
 * @param {string} teamName - The team name
 * @returns {string} - The logo URL
 */
const getTeamLogo = (teamName) => {
    const logoMap = {
        "Zagreb Rugby Ladies":
            "https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev/logos/zagreb-rugby-ladies-logo-vector.png",
        "Zagreb Rugby Ladies U18":
            "https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev/logos/zagreb-rugby-ladies-logo-vector.png",
        "Rugby Nada Split":
            "https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev/logos/nada-rugby-logo.jpeg",
        "Women's University Rugby Lastavice":
            "https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev/logos/lastavice_logo.jpeg",
    };

    return (
        logoMap[teamName] ||
        "https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev/logos/nada-rugby-logo.jpeg"
    );
};
