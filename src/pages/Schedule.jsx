import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, MapPin, Clock, Trophy, Users } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Link } from "react-router-dom";
import { MatchSchedule } from "../components/home/MatchSchedule";
import { NextMatch } from "../components/home/NextMatch";
import { AnimatedSection } from "../components/ui/AnimatedSection";
import { CallToAction } from "../components/ui/CallToAction";
import scheduleData from "../data/schedule.json";
import nextMatchData from "../data/nextMatch.json";
import { SEO } from "../components/ui/SEO";
import { buildR2ImageUrl } from "../lib/cdn";

const Schedule = () => {
    const { t } = useTranslation();
    const [activeTeam, setActiveTeam] = useState("senior");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getMatchStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-success/10 text-success border-success";
            case "upcoming":
                return "bg-info/10 text-info border-info";
            default:
                return "bg-muted-light text-text-contrast border-muted-light";
        }
    };

    const isHomeMatch = (match, teamName) => {
        return match.homeTeam === teamName;
    };

    const getOpponent = (match, teamName) => {
        return match.homeTeam === teamName ? match.awayTeam : match.homeTeam;
    };

    const formatMatchResult = (match, teamName) => {
        if (match.status !== "completed" || !match.result) return null;

        const isHome = isHomeMatch(match, teamName);
        const ourScore = isHome
            ? match.result.homeScore
            : match.result.awayScore;
        const theirScore = isHome
            ? match.result.awayScore
            : match.result.homeScore;

        return {
            ourScore,
            theirScore,
            isWin: ourScore > theirScore,
        };
    };

    // SEO Configuration
    const pageTitle = "Match Schedule & Fixtures | Zagreb Rugby Ladies";
    const pageDescription =
        "View Zagreb Rugby Ladies match schedule, upcoming fixtures, past results, and game locations. Follow our senior and junior teams' rugby sevens season in Croatia.";
    const keywords =
        "Zagreb Rugby Ladies schedule, rugby match fixtures Croatia, women's rugby games Zagreb, rugby sevens calendar, upcoming rugby matches Croatia, rugby results Zagreb, rugby match dates, rugby game schedule Croatia";

    // Sports Event Structured Data
    const scheduleStructuredData = {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        name: "Zagreb Rugby Ladies Match Schedule",
        description: pageDescription,
        organizer: {
            "@type": "SportsOrganization",
            name: "Zagreb Rugby Ladies",
        },
    };

    const MatchCard = ({ match, teamName }) => {
        const isHome = isHomeMatch(match, teamName);
        const opponent = getOpponent(match, teamName);
        const result = formatMatchResult(match, teamName);

        return (
            <Card className="bg-surface border-muted-light hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div
                                className={`px-3 py-1 rounded-full text-xs font-medium border ${getMatchStatusColor(
                                    match.status
                                )}`}
                            >
                                {match.status.charAt(0).toUpperCase() +
                                    match.status.slice(1)}
                            </div>
                            <div className="text-xs text-muted uppercase tracking-wide">
                                {match.matchType}
                            </div>
                        </div>
                        {result && (
                            <div
                                className={`px-3 py-1 rounded-full text-sm font-bold ${
                                    result.isWin
                                        ? "bg-success/10 text-success"
                                        : "bg-error/10 text-error"
                                }`}
                            >
                                {result.isWin
                                    ? t("schedule.match.win")
                                    : t("schedule.match.loss")}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span className="text-text-contrast font-medium">
                                    {new Date(match.date).toLocaleDateString(
                                        "en-US",
                                        {
                                            weekday: "long",
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        }
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span className="text-text-contrast font-medium">
                                    {match.time}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Teams Display */}
                    <div className="flex items-center justify-between mb-4 p-4 bg-muted-light rounded-xl">
                        <div className="text-center flex-1">
                            <p
                                className={`font-semibold ${
                                    isHome
                                        ? "text-primary"
                                        : "text-text-contrast"
                                }`}
                            >
                                {teamName}
                            </p>
                            {result && (
                                <p className="text-lg font-bold text-text-contrast mt-1">
                                    {result.ourScore}
                                </p>
                            )}
                        </div>

                        <div className="text-center px-4">
                            <div className="text-muted font-medium">
                                {isHome
                                    ? t("schedule.match.vs")
                                    : t("schedule.match.at")}
                            </div>
                        </div>

                        <div className="text-center flex-1">
                            <p
                                className={`font-semibold ${
                                    !isHome
                                        ? "text-primary"
                                        : "text-text-contrast"
                                }`}
                            >
                                {opponent}
                            </p>
                            {result && (
                                <p className="text-lg font-bold text-text-contrast mt-1">
                                    {result.theirScore}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-2 mb-4">
                        <MapPin className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                            <p className="text-text-contrast font-medium text-sm">
                                {match.location.name}
                            </p>
                            <p className="text-muted text-xs">
                                {match.location.address}
                            </p>
                        </div>
                    </div>

                    {match.status === "upcoming" && (
                        <Button
                            variant="blue"
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
                    )}
                </CardContent>
            </Card>
        );
    };
    const img = buildR2ImageUrl(
        "Match",
        "rugby-woman-team-zagreb-match_7503.jpg"
    );
    return (
        <div className="min-h-screen bg-surface">
            <SEO
                title={pageTitle}
                description={pageDescription}
                keywords={keywords}
                canonicalUrl="/schedule"
                structuredData={scheduleStructuredData}
            />

            {/* Hero Section */}
            <div className="relative h-[50svh] overflow-hidden mt-20">
                <div className="absolute inset-0 flex items-center justify-center bg-text-contrast">
                    <img
                        src="src/assets/images/hero/margaux-rugby-action.jpg"
                        alt="Zagreb Rugby Ladies player in match action - View our schedule"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: "50% 25%" }}
                    />
                    <div className="absolute inset-0 overlay-cinematic-base"></div>
                    <div className="absolute inset-0 overlay-cinematic-sunset"></div>
                    <div className="absolute inset-0 overlay-cinematic-matte"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center max-w-4xl mx-auto px-6 sm:px-8">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                            {t("schedule.hero.title")}
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-none mx-auto">
                            <Button
                                size="lg"
                                variant="blue"
                                asChild
                                className="w-full sm:w-auto"
                            >
                                <Link to="/contact">
                                    {t("schedule.hero.joinMatches")}
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="yellow"
                                asChild
                                className="w-full sm:w-auto"
                            >
                                <Link to="/rugby101">
                                    {t("schedule.hero.learnRugby")}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-16 max-w-7xl mx-auto">
                {/* Next Match */}
                <AnimatedSection divider="wave" className="mb-8">
                    <NextMatch
                        src={img}
                        matchData={nextMatchData.match}
                        opponent={
                            nextMatchData.opponents[
                                nextMatchData.match.opponentKey
                            ]
                        }
                    />
                </AnimatedSection>

                {/* Team Selection */}
                <AnimatedSection className="mb-8" delay={1}>
                    <div className="text-center mb-8">
                        <h2 className="text-4xl md:text-5xl font-light text-primary mb-4 tracking-wide">
                            {t("schedule.title")}
                        </h2>
                        <p className="text-lg text-muted max-w-2xl mx-auto">
                            {t("schedule.subtitle")}
                        </p>
                    </div>

                    {/* Team Toggle */}
                    <div className="flex justify-center mb-12">
                        <div className="inline-flex flex-col sm:flex-row gap-3 sm:gap-4 p-2 bg-surface rounded-lg border-2 border-border shadow-soft">
                            <button
                                onClick={() => setActiveTeam("senior")}
                                className={`
                                    inline-flex items-center justify-center gap-2 
                                    min-h-[44px] px-6 sm:px-8 py-3
                                    font-button font-semibold text-sm sm:text-base uppercase tracking-wide
                                    rounded-custom border-2 
                                    transition-all duration-300 
                                    hover:scale-[1.02] hover:shadow-md
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                                    whitespace-nowrap
                                    ${
                                        activeTeam === "senior"
                                            ? "bg-[#003057] text-white border-transparent shadow-md"
                                            : "bg-transparent text-text-contrast border-border hover:border-[#003057] hover:bg-[#003057]/5"
                                    }
                                `}
                            >
                                <Users className="h-4 w-4 flex-shrink-0" />
                                <span>{t("schedule.teams.senior")}</span>
                            </button>
                            <button
                                onClick={() => setActiveTeam("junior")}
                                className={`
                                    inline-flex items-center justify-center gap-2 
                                    min-h-[44px] px-6 sm:px-8 py-3
                                    font-button font-semibold text-sm sm:text-base uppercase tracking-wide
                                    rounded-custom border-2 
                                    transition-all duration-300 
                                    hover:scale-[1.02] hover:shadow-md
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                                    whitespace-nowrap
                                    ${
                                        activeTeam === "junior"
                                            ? "bg-[#003057] text-white border-transparent shadow-md"
                                            : "bg-transparent text-text-contrast border-border hover:border-[#003057] hover:bg-[#003057]/5"
                                    }
                                `}
                            >
                                <Users className="h-4 w-4 flex-shrink-0" />
                                <span>{t("schedule.teams.junior")}</span>
                            </button>
                        </div>
                    </div>

                    {/* Matches Grid */}
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-6">
                            <h3 className="text-2xl font-light mb-2 tracking-wide font-hero text-text-contrast leading-[0.85]">
                                {scheduleData.teams[
                                    activeTeam
                                ].name.toUpperCase()}
                            </h3>
                            <p className="text-muted mb-8">
                                {scheduleData.teams[activeTeam].matches.length}{" "}
                                {t("schedule.matchesThisSeason")}
                            </p>
                        </div>

                        <MatchSchedule
                            matches={scheduleData.teams[activeTeam].matches}
                            teamName={scheduleData.teams[activeTeam].name}
                            getOpponent={getOpponent}
                            formatMatchResult={formatMatchResult}
                            getMatchStatusColor={getMatchStatusColor}
                            isHomeMatch={isHomeMatch}
                        />
                    </div>
                </AnimatedSection>

                {/* Call to Action */}
                <CallToAction
                    image="src/assets/images/call_to_action/rugby-scrum-action.jpg"
                    imageAlt="Zagreb Rugby Ladies scrum formation in match - Come watch us play"
                    titleKey="schedule.cta.title"
                    descriptionKey="schedule.cta.description"
                    primaryButton={{
                        to: "/contact",
                        textKey: "schedule.cta.getUpdates",
                    }}
                    secondaryButton={{
                        to: "/team",
                        textKey: "schedule.cta.meetPlayers",
                    }}
                />
            </div>
        </div>
    );
};

export default Schedule;
