import { Calendar, Clock, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Countdown } from "../ui/Countdown";
import { buildR2ImageUrl } from "../../lib/cdn";

const NextMatch = ({ matchData, opponent, homeVenue }) => {
    const { t, i18n } = useTranslation();

    // Determine location based on home/away status
    const location = matchData.isHome ? homeVenue : opponent?.location;

    // Determine which team is home (left) and which is away (right)
    const leftTeam = matchData.isHome ? matchData.homeTeam : opponent;
    const rightTeam = matchData.isHome ? opponent : matchData.homeTeam;

    return (
        <div className="relative h-[600px] overflow-hidden rounded-custom group cursor-pointer">
            <img
                src={buildR2ImageUrl(
                    "Match",
                    "rugby-woman-team-zagreb-match_7510.jpg"
                )}
                alt="Match day action"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute inset-0 p-6 sm:p-8 lg:p-12 flex flex-col justify-center text-text-light">
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
                            {new Date(matchData.date).toLocaleDateString(
                                i18n.language === "hr" ? "hr-HR" : "en-US",
                                {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                }
                            )}
                        </p>
                    </div>
                    <div className="bg-surface/20 backdrop-blur-sm rounded-custom p-2 sm:p-3 text-center border border-accent/30">
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-accent mx-auto mb-1" />
                        <p className="text-text-light text-xs sm:text-sm font-medium">
                            {matchData.time}
                        </p>
                    </div>
                    <a
                        href={
                            location?.mapUrl ||
                            `https://maps.google.com/?q=${encodeURIComponent(
                                location?.address || "Zagreb, Croatia"
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
                <Countdown
                    targetDate={`${matchData.date}T${matchData.time}:00`}
                />
            </div>
        </div>
    );
};

export { NextMatch };
