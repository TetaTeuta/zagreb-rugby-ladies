import { Link } from "react-router-dom";
import { Users, Heart, Zap } from "lucide-react";
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
import { CallToAction } from "../components/ui/CallToAction";
import { SEO, createSportsOrganizationData } from "../components/ui/SEO";
import { ScrollIndicator } from "../components/ui/ScrollIndicator";

const Home = () => {
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

    // SEO Configuration
    const pageTitle = "Women's Rugby Sevens Team in Zagreb, Croatia";
    const pageDescription =
        "Join Zagreb Rugby Ladies - women's rugby sevens team empowering girls and young women through sport. Beginner-friendly training in Zagreb, Croatia. No experience needed!";
    const keywords =
        "women's rugby Zagreb, rugby sevens Croatia, women's sports Zagreb, rugby team Croatia, join rugby Zagreb, women athletes Croatia, rugby training Zagreb, girls rugby Croatia";

    // Structured Data for Sports Organization
    const organizationData = createSportsOrganizationData();

    const img =
        "https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev/Match/rugby-woman-team-zagreb-match_7541.jpg";

    return (
        <div className="min-h-screen bg-surface-elevated">
            <SEO
                title={pageTitle}
                description={pageDescription}
                keywords={keywords}
                canonicalUrl="/"
                structuredData={organizationData}
            />

            <div className="relative h-screen overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-text-contrast">
                    <img
                        src="src/assets/images/hero/josipa-rugby-action.jpg"
                        alt="Zagreb Rugby Ladies player in action during match - Women's rugby sevens in Croatia"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 overlay-cinematic-base"></div>
                    <div className="absolute inset-0 overlay-cinematic-sunset"></div>
                    <div className="absolute inset-0 overlay-cinematic-matte"></div>
                </div>

                <div className="absolute inset-0 flex items-end justify-center z-10">
                    <div className="text-center max-w-5xl mx-auto pb-16 sm:pb-20 lg:pb-24 px-6 sm:px-8">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-8 sm:mb-10 tracking-wide font-hero text-text-light leading-[0.85]">
                            {t("home.hero.title")}
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full max-w-md sm:max-w-none mx-auto">
                            <Button
                                size="lg"
                                variant="blue"
                                asChild
                                className="w-full sm:w-auto"
                            >
                                <Link to="/contact">
                                    {t("home.hero.joinTraining")}
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="yellow"
                                asChild
                                className="w-full sm:w-auto"
                            >
                                <Link to="/gallery">
                                    {t("gallery.collections.title")}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <ScrollIndicator />
            </div>

            <div className="px-4 py-16 max-w-7xl mx-auto">
                <AnimatedSection divider="wave" className="mb-8">
                    <NextMatch
                        matchData={nextMatchData.match}
                        opponent={currentOpponent}
                        src={img}
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

                <CallToAction
                    image="src/assets/images/call_to_action/rugby-player-scrum.jpg"
                    imageAlt="Women's rugby scrum action - Join Zagreb Rugby Ladies training"
                    titleKey="home.cta.title"
                    descriptionKey="home.cta.description"
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
        </div>
    );
};

export default Home;
