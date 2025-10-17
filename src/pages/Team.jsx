import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { PlayerCard } from "../components/team/PlayerCard";
import { PlayerModal } from "../components/team/PlayerModal";
import { AnimatedSection } from "../components/ui/AnimatedSection";
import { CallToAction } from "../components/ui/CallToAction";
import { Users, Trophy, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import playersData from "../data/players.json";
import { SEO, createSportsOrganizationData } from "../components/ui/SEO";
import { buildR2ImageUrl, cdn } from "../lib/cdn";
import "../styles/split-bg.css";

const Team = () => {
    const { t } = useTranslation();
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handlePlayerClick = (player) => {
        setSelectedPlayer(player);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedPlayer(null), 300);
    };

    const teamStats = [
        {
            icon: Users,
            number: "30+",
            label: t("team.stats.activePlayers"),
        },
        {
            icon: Trophy,
            number: `${new Date().getFullYear() - 2017}`,
            label: t("team.stats.yearsStrong"),
        },
        {
            icon: Heart,
            number: "100%",
            label: t("team.stats.teamSpirit"),
        },
    ];

    const cultureSplitImage = buildR2ImageUrl(
        "Training",
        "rugby-woman-team-zagreb-training_7749.jpg"
    );

    // SEO Configuration
    const pageTitle = "Meet Zagreb Rugby Ladies Team | Our Players & Culture";
    const pageDescription =
        "Meet the Zagreb Rugby Ladies players - a diverse team of women passionate about rugby sevens. Learn about our inclusive culture, player development, and team spirit in Croatia.";
    const keywords =
        "Zagreb Rugby Ladies players, women's rugby team members, meet rugby players Zagreb, rugby team roster Croatia, women rugby athletes, rugby player profiles, inclusive rugby team, team culture Zagreb";

    // Structured Data
    const organizationData = createSportsOrganizationData();

    return (
        <div className="min-h-screen bg-surface">
            <SEO
                title={pageTitle}
                description={pageDescription}
                keywords={keywords}
                canonicalUrl="/team"
                structuredData={organizationData}
            />

            {/* Hero Section */}
            <div className="relative h-[50svh] overflow-hidden mt-20">
                <div className="absolute inset-0 flex items-center justify-center bg-text-contrast">
                    <img
                        src={cdn("hero/zagreb-rugby-ladies-team-action.jpg")}
                        alt="Zagreb Rugby Ladies full team in action during match - Women's rugby sevens Croatia"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 overlay-cinematic-base opacity-[0.8]"></div>
                    <div className="absolute inset-0 overlay-cinematic-sunset"></div>
                    <div className="absolute inset-0 overlay-cinematic-matte"></div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center max-w-4xl mx-auto px-6 sm:px-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                            {t("team.hero.title")}
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-none mx-auto">
                            <Button
                                size="lg"
                                variant="blue"
                                asChild
                                className="w-full sm:w-auto"
                            >
                                <Link to="/contact">
                                    {t("team.hero.joinTeam")}
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="yellow"
                                asChild
                                className="w-full sm:w-auto"
                            >
                                <Link to="/rugby101">
                                    {t("team.hero.learnRugby")}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-16 max-w-7xl mx-auto">
                {/* Team Stats Section */}
                <AnimatedSection divider="wave" className="mb-8">
                    <div className="relative h-[600px] overflow-hidden rounded-custom group cursor-pointer">
                        <img
                            src={buildR2ImageUrl(
                                "Team",
                                "rugby-woman-team-zagreb_7726.jpg"
                            )}
                            alt={t("team.imageAlts.stats")}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                        <div className="absolute inset-0 p-8 sm:p-10 lg:p-12 flex flex-col justify-end text-text-light">
                            <div className="mb-6">
                                <h2 className="text-4xl text-text-light mb-2 tracking-wide">
                                    {t("team.stats.title")}
                                </h2>
                                <p className="text-lg text-text-light/80 mb-4">
                                    {t("team.stats.subtitle")}
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                {teamStats.map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="bg-surface/20 backdrop-blur-sm rounded-custom p-3 text-center border border-accent/30"
                                        >
                                            <Icon className="h-6 w-6 text-text-light mx-auto mb-1" />
                                            <div className="text-lg font-bold text-text-light mb-1">
                                                {stat.number}
                                            </div>
                                            <div className="text-xs text-text-light/90">
                                                {stat.label}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="text-center">
                                <Button
                                    variant="blue"
                                    asChild
                                    className="w-full sm:w-auto"
                                >
                                    <Link to="/contact">
                                        {t("common.joinTraining")}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Players Section */}
                <AnimatedSection className="mb-8" delay={1}>
                    <div className="text-center mb-8">
                        <h2 className="text-4xl md:text-5xl font-light text-primary mb-4 tracking-wide">
                            {t("team.players.title")}
                        </h2>
                        <p className="text-lg text-muted max-w-2xl mx-auto">
                            {t("team.players.subtitle")}
                        </p>
                    </div>

                    {/* Players Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {playersData.map((player) => (
                            <PlayerCard
                                key={player.id}
                                player={player}
                                onPlayerClick={handlePlayerClick}
                            />
                        ))}
                    </div>
                </AnimatedSection>

                {/* Team Culture Grid */}
                <AnimatedSection
                    className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-4"
                    delay={2}
                >
                    {/* Inclusive Environment */}
                    <div
                        className="relative h-[600px] overflow-hidden rounded-custom group cursor-pointer splitBg-left"
                        style={{
                            backgroundImage: `url(${cultureSplitImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:opacity-90 transition-opacity duration-500"></div>
                        <div className="relative p-8 flex flex-col justify-end h-full text-text-light z-10">
                            <h3 className="text-3xl font-light mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                                {t("team.culture.inclusive.title")}
                            </h3>
                            <p className="text-lg text-text-light/90 leading-relaxed mb-4">
                                {t("team.culture.inclusive.description")}
                            </p>
                            <div className="text-center">
                                <Button
                                    variant="blue"
                                    asChild
                                    className="w-full sm:w-auto"
                                >
                                    <Link to="/contact">
                                        {t("common.joinUs")}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Player Development */}
                    <div
                        className="relative h-[600px] overflow-hidden rounded-custom group cursor-pointer splitBg-right"
                        style={{
                            backgroundImage: `url(${cultureSplitImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:opacity-90 transition-opacity duration-500"></div>
                        <div className="relative p-8 flex flex-col justify-end h-full text-text-light z-10">
                            <h3 className="text-3xl font-light mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                                {t("team.culture.development.title")}
                            </h3>
                            <p className="text-lg text-text-light/90 leading-relaxed mb-4">
                                {t("team.culture.development.description")}
                            </p>
                            <div className="text-center">
                                <Button
                                    variant="blue"
                                    asChild
                                    className="w-full sm:w-auto"
                                >
                                    <Link to="/rugby101">
                                        {t("common.learnMore")}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Call to Action */}
                <CallToAction
                    image={cdn(
                        "call_to_action/rugby-player-woman-with-ball.jpg"
                    )}
                    imageAlt="Zagreb Rugby Ladies player with ball ready to play - Join our team"
                    titleKey="team.cta.title"
                    descriptionKey="team.cta.description"
                    primaryButton={{
                        to: "/contact",
                        textKey: "common.joinTraining",
                    }}
                    secondaryButton={{
                        to: "/rugby101",
                        textKey: "common.learnAboutRugby",
                    }}
                />
            </div>

            {/* Player Modal */}
            <PlayerModal
                player={selectedPlayer}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default Team;
