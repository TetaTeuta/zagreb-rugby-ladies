import { Link } from "react-router-dom";
import { ArrowRight, Users, Heart, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { useState, useEffect } from "react";
import playersData from "../data/players.json";
import trainingData from "../data/training.json";
import nextMatchData from "../data/nextMatch.json";
import { NextMatch } from "../components/home/NextMatch";
import { TrainingSchedule } from "../components/home/TrainingSchedule";
import { MeetOurPlayers } from "../components/home/MeetOurPlayers";
import { Highlights } from "../components/home/Highlights";
import { AnimatedSection } from "../components/ui/AnimatedSection";

const Home = () => {
    const [isHeroVisible, setIsHeroVisible] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Get opponent data using the key from match data
    const currentOpponent =
        nextMatchData.opponents[nextMatchData.match.opponentKey];

    const highlights = [
        {
            icon: Users,
            title: t("home.highlights.inclusive.title"),
            description: t("home.highlights.inclusive.description"),
        },
        {
            icon: Heart,
            title: t("home.highlights.beginner.title"),
            description: t("home.highlights.beginner.description"),
        },
        {
            icon: Zap,
            title: t("home.highlights.strength.title"),
            description: t("home.highlights.strength.description"),
        },
    ];

    // Get 3 random players on each render
    const getRandomPlayers = () => {
        const shuffled = [...playersData].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    };

    const [featuredPlayers] = useState(() => getRandomPlayers());

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsHeroVisible(scrollPosition < window.innerHeight * 0.5);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-surface-elevated">
            <div
                className={`relative h-screen overflow-hidden transition-all duration-1000 ${
                    isHeroVisible
                        ? "translate-y-0"
                        : "-translate-y-20 opacity-95"
                }`}
            >
                <div className="absolute inset-0">
                    <iframe
                        src="https://www.youtube.com/embed/5w2mBzgmUIo?autoplay=1&mute=1&loop=1&playlist=5w2mBzgmUIo&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
                        title="Rugby action"
                        className="w-full h-full object-cover scale-105"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <div className="absolute inset-0 overlay-cinematic-base"></div>
                    <div className="absolute inset-0 overlay-cinematic-sunset"></div>
                    <div className="absolute inset-0 overlay-cinematic-matte"></div>
                </div>

                <div className="absolute inset-0 flex items-end justify-center z-10">
                    <div className="text-center max-w-5xl mx-auto pb-16 sm:pb-20 lg:pb-24 px-6 sm:px-8">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-8 sm:mb-10 tracking-wide font-hero text-text-light leading-[0.85] transition-all duration-1000 ease-out animate-slide-in-up">
                            {t("home.hero.title")}
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                            <Button
                                size="lg"
                                className="bg-surface/95 backdrop-blur-sm text-text-contrast hover:bg-surface"
                                asChild
                            >
                                <Link to="/contact">
                                    {t("home.hero.joinTraining")}
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-text-light/80 bg-text-light/10 backdrop-blur-sm text-text-light hover:bg-surface hover:text-text-contrast"
                                asChild
                            >
                                <Link to="/gallery">
                                    {t("home.hero.watchVideo")}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-16 max-w-7xl mx-auto">
                <AnimatedSection divider="wave" className="mb-8">
                    <NextMatch
                        matchData={nextMatchData.match}
                        opponent={currentOpponent}
                    />
                </AnimatedSection>

                {/* Meet Our Players Section */}
                <AnimatedSection className="mb-8" delay={1}>
                    <div className="text-center mb-8">
                        <h2 className="text-4xl md:text-5xl font-light text-primary mb-4 tracking-wide">
                            {t("home.meetTeam.title")}
                        </h2>
                        <p className="text-lg text-muted max-w-xl mx-auto">
                            {t("home.meetTeam.subtitle")}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <MeetOurPlayers players={featuredPlayers} />
                    </div>
                </AnimatedSection>

                {/* Training Schedule & Highlights Row */}
                <AnimatedSection
                    className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-4"
                    delay={2}
                >
                    <TrainingSchedule trainingData={trainingData} />
                    <Highlights highlights={highlights} />
                </AnimatedSection>

                <div className="relative h-[700px] overflow-hidden rounded group cursor-pointer">
                    <img
                        src="/src/assets/images/photos/petra1_rugby.jpg"
                        alt="Team photo"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-2xl ml-12 text-text-light">
                            <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                                {t("home.cta.title")}
                            </h2>
                            <p className="text-xl mb-8 opacity-90 leading-relaxed">
                                {t("home.cta.description")}
                            </p>
                            <div className="flex gap-4">
                                <Button
                                    size="lg"
                                    className="bg-surface text-text-contrast hover:bg-muted-light"
                                    asChild
                                >
                                    <Link to="/contact">
                                        {t("common.joinTraining")}
                                    </Link>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-text-light/80 bg-text-light/10 backdrop-blur-sm text-text-light hover:bg-surface hover:text-text-contrast"
                                    asChild
                                >
                                    <Link to="/rugby101">
                                        {t("common.learnAboutRugby")}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
