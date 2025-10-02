import { Calendar, Clock, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Countdown } from "../ui/Countdown";

const NextMatch = ({ matchData, opponent }) => {
    const { t, i18n } = useTranslation();
    return (
        <div className="relative h-[600px] overflow-hidden rounded group cursor-pointer">
            <img
                src="https://www.telegraph.co.uk/content/dam/rugby-union/2019/03/13/TELEMMGLPICT000190683981_trans_NvBQzQNjv4Bqg21xs0VcZiA4CV6qr0RdEBo6c-7YxqXVwjqXYLBnJIY.jpeg?imwidth=1920"
                alt="Match day action"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute inset-0 p-8 sm:p-10 lg:p-12 flex flex-col justify-center text-text-light">
                <div className="mb-8">
                    {/* Team Matchup Title */}
                    <div className="flex items-center justify-center gap-8 sm:gap-12 lg:gap-16 mb-4">
                        <div className="flex items-center space-x-4">
                            <img
                                src={matchData.homeTeam.logo}
                                alt={matchData.homeTeam.name}
                                className="h-16 w-16 object-contain"
                            />
                            <div>
                                <h3 className="text-text-light font-light text-3xl sm:text-4xl tracking-wide uppercase">
                                    {matchData.homeTeam.name}
                                </h3>
                            </div>
                        </div>

                        {/* VS */}
                        <div className="text-text-light/60 font-light text-2xl sm:text-3xl tracking-widest">
                            {t("match.vs")}
                        </div>

                        {/* Opponent Team */}
                        <div className="flex items-center space-x-4">
                            <div>
                                <h3 className="text-text-light font-light text-3xl sm:text-4xl text-right tracking-wide uppercase">
                                    {opponent.name}
                                </h3>
                            </div>
                            <img
                                src={opponent.logo}
                                alt={opponent.name}
                                className="h-16 w-16 object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Match Details - Compact */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-surface/20 backdrop-blur-sm rounded p-3 text-center border border-accent/30">
                        <Calendar className="h-5 w-5 text-accent mx-auto mb-1" />
                        <p className="text-text-light text-sm font-medium">
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
                    <div className="bg-surface/20 backdrop-blur-sm rounded p-3 text-center border border-accent/30">
                        <Clock className="h-5 w-5 text-accent mx-auto mb-1" />
                        <p className="text-text-light text-sm font-medium">
                            {matchData.time}
                        </p>
                    </div>
                    <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                            matchData.location.name + ", Zagreb, Croatia"
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-surface/20 backdrop-blur-sm rounded p-3 text-center border border-accent/30 hover:bg-accent/20 hover:border-accent/50 transition-all duration-300 cursor-pointer block"
                    >
                        <MapPin className="h-5 w-5 text-accent mx-auto mb-1" />
                        <p className="text-text-light text-sm font-medium">
                            {matchData.location.name}
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
