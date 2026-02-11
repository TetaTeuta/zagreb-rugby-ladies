import { Link } from "react-router-dom";
import { Users, Heart, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { useState, useEffect } from "react";
import playersData from "../data/players.json";
import trainingData from "../data/training.json";
import scheduleData from "../data/schedule.json";
import { NextMatch } from "../components/home/NextMatch";
import { getNextUpcomingMatch } from "../lib/matchUtils";
import { TrainingSchedule } from "../components/home/TrainingSchedule";
import { MeetOurPlayers } from "../components/home/MeetOurPlayers";
import { Highlights } from "../components/home/Highlights";
import { AnimatedSection } from "../components/ui/AnimatedSection";
import { CallToAction } from "../components/ui/CallToAction";
import {
    SEO,
    createSportsOrganizationData,
    createSportsEventData,
} from "../components/ui/SEO";
import { ScrollIndicator } from "../components/ui/ScrollIndicator";
import { Sponsors } from "../components/layout/Sponsors";
import { cdn } from "../lib/cdn";
import { useLocalizedPath } from "../hooks/useLocalizedPath";

const Home = () => {
    const { t } = useTranslation();
    const getLocalizedPath = useLocalizedPath();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Get next upcoming match from schedule data
    const nextMatchData = getNextUpcomingMatch(scheduleData);

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

    const getRandomPlayers = () => {
        const firstNine = playersData.slice(0, 9);
        const shuffled = [...firstNine].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    };

    const [featuredPlayers] = useState(() => getRandomPlayers());

    // SEO Configuration
    const { i18n } = useTranslation();
    const pageTitle =
        i18n.language === "hr"
            ? "Ženski Ragbi Klub u Zagrebu, Hrvatska"
            : "Women's Rugby Team in Zagreb, Croatia";
    const pageDescription =
        i18n.language === "hr"
            ? "Pridruži se Zagreb Rugby Ladies - ženski ragbi sedam klub koji osnažuje djevojke i žene kroz sport. Treninzi za početnice u Zagrebu, Hrvatska. Iskustvo nije potrebno!"
            : "Join Zagreb Rugby Ladies - women's rugby sevens team empowering girls and young women through sport. Beginner-friendly training in Zagreb, Croatia. No experience needed!";
    const keywords =
        i18n.language === "hr"
            ? "ženski ragbi, ženski ragbi Zagreb, ženski ragbi klub, ženski ragbi klub Zagreb, ragbi za žene, ragbi za žene Zagreb, žene ragbi, ragbi klub Zagreb, Zagreb Rugby Ladies, ženski sport Zagreb, trenirati ragbi Zagreb, pridružiti se ragbi, ragbi trening, ragbi sedam, ženski ragbi Hrvatska, učiti ragbi, početi igrati ragbi, ragbi pravila, kako igrati ragbi"
            : "women's rugby, women's rugby Zagreb, women's rugby club, women's rugby club Zagreb, rugby for women, rugby for women Zagreb, ladies rugby, rugby team Zagreb, Zagreb Rugby Ladies, women's sports Zagreb, train rugby Zagreb, join rugby, rugby training, rugby sevens, women's rugby Croatia, learn rugby, start playing rugby, rugby rules, how to play rugby";

    // Structured Data for Sports Organization and Next Match Event
    const organizationData = createSportsOrganizationData();

    // Create Event structured data for the next match if available
    let combinedStructuredData = [organizationData];

    if (nextMatchData) {
        const location = nextMatchData.match.isHome
            ? nextMatchData.homeVenue
            : nextMatchData.opponent.location;

        const nextMatchEventData = createSportsEventData({
            name: `${nextMatchData.match.homeTeam.name} vs ${nextMatchData.opponent.name}`,
            description: `${nextMatchData.match.matchType} - ${nextMatchData.match.season}. Watch Zagreb Rugby Ladies in action!`,
            date: nextMatchData.match.date,
            time: nextMatchData.match.time,
            location: location,
            homeTeam: nextMatchData.match.homeTeam,
            awayTeam: {
                name: nextMatchData.opponent.name,
                logo: nextMatchData.opponent.logo,
            },
            eventStatus: "EventScheduled",
            matchType: nextMatchData.match.matchType,
            isFree: true,
        });

        combinedStructuredData = [organizationData, nextMatchEventData];
    }

    return (
        <div className="min-h-screen bg-surface-elevated">
            <SEO
                title={pageTitle}
                description={pageDescription}
                keywords={keywords}
                canonicalUrl="/"
                structuredData={combinedStructuredData}
            />

            <div className="relative h-screen overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-text-contrast">
                    <img
                        src={cdn("hero/josipa-rugby-action.jpg")}
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
                                <Link to={getLocalizedPath("/contact")}>
                                    {t("home.hero.joinTraining")}
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="yellow"
                                asChild
                                className="w-full sm:w-auto"
                            >
                                <Link to={getLocalizedPath("/gallery")}>
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
                    <NextMatch scheduleData={scheduleData} />
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
                    image={cdn("call_to_action/rugby-player-scrum.jpg")}
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

            {/* Sponsors Section */}
            <Sponsors />
        </div>
    );
};

export default Home;
