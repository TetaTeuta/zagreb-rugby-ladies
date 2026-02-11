import { Calendar, Clock, MapPin, Instagram, Facebook } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Countdown } from "../ui/Countdown";
import { Button } from "../ui/Button";
import { buildR2ImageUrl } from "../../lib/cdn";
import { useLocalizedPath } from "../../hooks/useLocalizedPath";
import { getNextUpcomingMatch } from "../../lib/matchUtils";

const NextMatch = ({ scheduleData }) => {
    const { t, i18n } = useTranslation();
    const getLocalizedPath = useLocalizedPath();

    const nextMatchData = getNextUpcomingMatch(scheduleData ?? null);
    const hasMatch = nextMatchData != null;
    const matchData = nextMatchData?.match ?? null;
    const opponent = nextMatchData?.opponent ?? null;
    const homeVenue = nextMatchData?.homeVenue ?? null;

    const dateTimeString =
        matchData?.time != null
            ? `${matchData.date}T${matchData.time}:00`
            : matchData ? `${matchData.date}T12:00:00` : null;
    const matchDateTime = dateTimeString ? new Date(dateTimeString) : null;
    const now = new Date();
    const isFutureMatch =
        matchDateTime != null && matchDateTime > now;

    const showMatchCard = hasMatch && isFutureMatch;

    const location = matchData?.isHome ? homeVenue : opponent?.location;
    const leftTeam = matchData?.isHome ? matchData.homeTeam : opponent;
    const rightTeam = matchData?.isHome ? opponent : matchData?.homeTeam;

    return (
        <div className="relative h-[600px] overflow-hidden rounded-custom group cursor-pointer">
            <img
                src={buildR2ImageUrl(
                    "Match",
                    "rugby-woman-team-zagreb-match_7510.jpg",
                )}
                alt="Match day action"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute inset-0 p-6 sm:p-8 lg:p-12 flex flex-col justify-center text-text-light">
                {showMatchCard ? (
                    <>
                        <div className="mb-6 sm:mb-8">
                            {/* Team Matchup Title */}
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-16 mb-4">
                                {/* Left Team (Home) */}
                                <div className="flex flex-col items-center md:flex-row md:space-x-4 text-center md:text-left">
                                    <img
                                        src={leftTeam.logo}
                                        alt={leftTeam.name}
                                        className="h-16 w-16 sm:h-20 sm:w-20 object-contain mb-2 md:mb-0"
                                    />
                                    <div>
                                        <h3 className="text-text-light font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide uppercase">
                                            {leftTeam.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* VS */}
                                <div className="text-text-light/60 font-light text-xl sm:text-2xl md:text-3xl tracking-widest">
                                    {t("match.vs")}
                                </div>

                                {/* Right Team (Away) */}
                                <div className="flex flex-col items-center md:flex-row md:space-x-4 text-center md:text-right">
                                    <div className="order-2 md:order-1">
                                        <h3 className="text-text-light font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide uppercase">
                                            {rightTeam.name}
                                        </h3>
                                    </div>
                                    <img
                                        src={rightTeam.logo}
                                        alt={rightTeam.name}
                                        className="h-16 w-16 sm:h-20 sm:w-20 object-contain mb-2 md:mb-0 order-1 md:order-2"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Match Details - Compact */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 max-w-2xl mx-auto">
                            <div className="bg-surface/20 backdrop-blur-sm rounded-custom p-2 sm:p-3 text-center border border-accent/30">
                                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-accent mx-auto mb-1" />
                                <p className="text-text-light text-xs sm:text-sm font-medium">
                                    {new Date(
                                        matchData.date
                                    ).toLocaleDateString(
                                        i18n.language === "hr"
                                            ? "hr-HR"
                                            : "en-US",
                                        {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                        },
                                    )}
                                </p>
                            </div>
                            <div className="bg-surface/20 backdrop-blur-sm rounded-custom p-2 sm:p-3 text-center border border-accent/30">
                                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-accent mx-auto mb-1" />
                                <p className="text-text-light text-xs sm:text-sm font-medium">
                                    {matchData.time ?? t("match.timeTbd")}
                                </p>
                            </div>
                            <a
                                href={
                                    location?.mapUrl ||
                                    `https://maps.google.com/?q=${encodeURIComponent(
                                        location?.address || "Zagreb, Croatia",
                                    )}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-surface/20 backdrop-blur-sm rounded-custom p-2 sm:p-3 text-center border border-accent/30 hover:bg-accent/20 hover:border-accent/50 transition-all duration-300 cursor-pointer block"
                            >
                                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-accent mx-auto mb-1" />
                                <p className="text-text-light text-xs sm:text-sm font-medium break-words">
                                    {location?.name || "TBD"}
                                </p>
                            </a>
                        </div>

                        {/* Countdown */}
                        <Countdown targetDate={dateTimeString} />
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8">
                        <h3 className="text-text-light font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide uppercase mb-4">
                            {t("match.comingSoon")}
                        </h3>

                        {/* Call-to-Action Section */}
                        <div className="flex flex-col items-center space-y-4 sm:space-y-6 max-w-md mx-auto">
                            <p className="text-text-light/90 font-light text-base sm:text-lg md:text-xl tracking-wide text-center">
                                {t("match.beFirstToKnow")}
                            </p>

                            {/* Social Media Links */}
                            <div className="flex items-center justify-center gap-4">
                                <a
                                    href="https://www.instagram.com/zagreb_rugby_ladies/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-custom bg-surface/20 backdrop-blur-sm border border-accent/30 hover:bg-accent/20 hover:border-accent/50 transition-all duration-300"
                                    aria-label={t(
                                        "footer.ariaLabels.instagram",
                                    )}
                                >
                                    <Instagram className="h-6 w-6 sm:h-7 sm:w-7 text-accent" />
                                </a>
                                <a
                                    href="https://www.facebook.com/profile.php?id=100063465023928"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-custom bg-surface/20 backdrop-blur-sm border border-accent/30 hover:bg-accent/20 hover:border-accent/50 transition-all duration-300"
                                    aria-label={t("footer.ariaLabels.facebook")}
                                >
                                    <Facebook className="h-6 w-6 sm:h-7 sm:w-7 text-accent" />
                                </a>
                            </div>

                            {/* Join Our Team Button */}
                            <Button
                                size="lg"
                                variant="blue"
                                asChild
                                className="w-full sm:w-auto mt-4"
                            >
                                <Link to={getLocalizedPath("/contact")}>
                                    {t("match.joinOurTeam")}
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export { NextMatch };
