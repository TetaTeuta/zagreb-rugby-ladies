import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { Users, Heart, Zap } from "lucide-react";
import { AnimatedSection } from "../components/ui/AnimatedSection";
import { buildR2ImageUrl } from "../lib/cdn";
import { CallToAction } from "../components/ui/CallToAction";
import trainingData from "../data/training.json";
import {
    SEO,
    createSportsOrganizationData,
    createArticleStructuredData,
} from "../components/ui/SEO";
import { contactConfig } from "../config/contact";
import "../styles/split-bg.css";

const About = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const coaches = [
        {
            name: t("about.coaches.sandi.name"),
            role: t("about.coaches.sandi.role"),
            img: "src/assets/images/players/siluette_placeholder_rugby_ladies.png",
        },
        {
            name: t("about.coaches.kuca.name"),
            role: t("about.coaches.kuca.role"),
            img: "src/assets/images/players/siluette_placeholder_rugby_ladies.png",
        },
        {
            name: t("about.coaches.petra.name"),
            role: t("about.coaches.petra.role"),
            img: buildR2ImageUrl(
                "Players",
                "rugby-woman-player-_7576-petra.jpg"
            ),
        },
    ];

    const values = [
        {
            title: t("about.mission.values.inclusion.title"),
            description: t("about.mission.values.inclusion.description"),
        },
        {
            title: t("about.mission.values.resilience.title"),
            description: t("about.mission.values.resilience.description"),
        },
        {
            title: t("about.mission.values.teamwork.title"),
            description: t("about.mission.values.teamwork.description"),
        },
        {
            title: t("about.mission.values.courage.title"),
            description: t("about.mission.values.courage.description"),
        },
    ];

    // SEO Configuration
    const pageTitle = "About Zagreb Rugby Ladies | Our Story, Mission & Values";
    const pageDescription =
        "Learn about Zagreb Rugby Ladies - our story, mission to empower women through rugby, our values of inclusion and courage, meet our coaches, and discover our training program in Croatia.";
    const keywords =
        "about Zagreb Rugby Ladies, women's rugby team history, rugby mission Croatia, rugby coaches Zagreb, women empowerment through sport, inclusive rugby team, rugby values, rugby training program Zagreb";

    // Structured Data
    const organizationData = createSportsOrganizationData();
    const articleData = createArticleStructuredData({
        headline: "About Zagreb Rugby Ladies - Empowering Women Through Rugby",
        description: pageDescription,
        image: "src/assets/images/logos/zagreb-rugby-ladies-logo-vector.png",
        datePublished: "2020-01-01",
        dateModified: new Date().toISOString().split("T")[0],
    });

    const combinedStructuredData = {
        "@context": "https://schema.org",
        "@graph": [organizationData, articleData],
    };

    const splitImageMission = buildR2ImageUrl(
        "Training",
        "rugby-woman-team-zagreb-training_7750.jpg"
    );

    const splitImageTraining = buildR2ImageUrl(
        "Match",
        "rugby-woman-team-zagreb-match_7471.jpg"
    );

    return (
        <div className="min-h-screen bg-surface">
            <SEO
                title={pageTitle}
                description={pageDescription}
                keywords={keywords}
                canonicalUrl="/about"
                structuredData={combinedStructuredData}
            />

            {/* Hero Section */}
            <div className="relative h-[50svh] overflow-hidden mt-20">
                <div className="absolute inset-0 flex items-center justify-center bg-text-contrast">
                    <img
                        src="src/assets/images/hero/petra-rugby-action.jpg"
                        alt="Zagreb Rugby Ladies player tackling during match - Women's rugby team in action"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: "50% 25%" }}
                    />
                    <div className="absolute inset-0 overlay-cinematic-base opacity-[0.8]"></div>
                    <div className="absolute inset-0 overlay-cinematic-sunset"></div>
                    <div className="absolute inset-0 overlay-cinematic-matte"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center max-w-4xl mx-auto px-6 sm:px-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 tracking-wide font-hero text-white leading-[0.85] drop-shadow-lg">
                            {t("about.hero.title")}
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-none mx-auto">
                            <Button
                                size="lg"
                                variant="blue"
                                asChild
                                className="w-full sm:w-auto"
                            >
                                <Link to="/contact">
                                    {t("about.hero.joinTeam")}
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="yellow"
                                asChild
                                className="w-full sm:w-auto"
                            >
                                <Link to="/team">
                                    {t("about.hero.meetTeam")}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-16 max-w-7xl mx-auto">
                {/* Our Story Section */}
                <AnimatedSection className="mb-8">
                    <div className="relative h-[580px] md:h-[500px] overflow-hidden rounded-custom group cursor-pointer">
                        <img
                            src={buildR2ImageUrl(
                                "Team",
                                "rugby-woman-team-zagreb_7731.jpg"
                            )}
                            alt={t("about.imageAlts.story")}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            style={{ objectPosition: "50% 20%" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-text-contrast/90 via-text-contrast/50 to-transparent"></div>
                        <div className="absolute inset-0 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-start text-text-light">
                            <div className="mb-4 sm:mb-6">
                                <h2 className="text-3xl sm:text-4xl font-light mb-2 tracking-wide font-hero text-text-light leading-[0.85]">
                                    {t("about.story.title")}
                                </h2>
                                <p className="text-base sm:text-lg text-text-light/80 mb-3 sm:mb-4">
                                    {t("about.story.subtitle")}
                                </p>
                            </div>
                            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-text-light/90 leading-relaxed max-w-3xl mb-4 sm:mb-0">
                                <p>{t("about.story.description1")}</p>
                                <p>{t("about.story.description2")}</p>
                            </div>
                            <div className="text-center mt-4 sm:mt-6">
                                <Button
                                    variant="blue"
                                    asChild
                                    className="w-full sm:w-auto"
                                >
                                    <Link to="/team">
                                        {t("about.hero.meetTeam")}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Mission & Values Grid */}
                <AnimatedSection className="mb-8" delay={1}>
                    <div className="text-center mb-8">
                        <h2 className="text-4xl md:text-5xl font-light text-primary mb-4 tracking-wide">
                            {t("about.mission.title")}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                        {/* Mission Section */}
                        <div
                            className="relative min-h-[350px] overflow-hidden rounded-custom group cursor-pointer splitBg-left"
                            style={{
                                backgroundImage: `url(${splitImageMission})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-text-contrast/90 via-text-contrast/50 to-transparent group-hover:opacity-90 transition-opacity duration-500"></div>
                            <div className="relative p-6 sm:p-8 flex flex-col h-full text-text-light z-10">
                                <h3 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                                    {t("about.mission.missionTitle")}
                                </h3>
                                <p className="text-base sm:text-lg text-text-light/90 leading-relaxed mb-6">
                                    {t("about.mission.missionText")}
                                </p>
                                <div className="text-center mt-auto">
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

                        {/* Values Section */}
                        <div
                            className="relative min-h-[400px] overflow-hidden rounded-custom group cursor-pointer splitBg-right"
                            style={{
                                backgroundImage: `url(${splitImageMission})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-text-contrast/90 via-text-contrast/50 to-transparent group-hover:opacity-90 transition-opacity duration-500"></div>
                            <div className="relative p-6 sm:p-8 flex flex-col h-full text-text-light z-10">
                                <h3 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                                    {t("about.mission.valuesTitle")}
                                </h3>
                                <div className="space-y-3 mb-6">
                                    {values.slice(0, 3).map((value, index) => {
                                        const icons = [Users, Heart, Zap];
                                        const Icon = icons[index];
                                        return (
                                            <div
                                                key={index}
                                                className="bg-surface/20 backdrop-blur-sm rounded-custom p-3 sm:p-4 border border-accent/30"
                                            >
                                                <div className="flex items-start space-x-3 sm:space-x-4">
                                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface/30 backdrop-blur-sm rounded-full flex items-center justify-center text-text-light flex-shrink-0 border border-accent/40">
                                                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-light tracking-wide font-hero text-text-light mb-1 sm:mb-2 leading-[0.85] text-sm sm:text-base">
                                                            {value.title.toUpperCase()}
                                                        </h4>
                                                        <p className="text-xs sm:text-sm text-text-light/80 leading-relaxed">
                                                            {value.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="text-center mt-auto">
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
                    </div>
                </AnimatedSection>

                {/* Coaching Staff */}
                <AnimatedSection className="mb-8" delay={2}>
                    <div className="text-center mb-8">
                        <h2 className="text-4xl md:text-5xl font-light text-primary mb-4 tracking-wide">
                            {t("about.coaches.title")}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {coaches.map((coach, index) => (
                            <div
                                key={index}
                                className="relative min-h-[400px] overflow-hidden rounded-custom group cursor-pointer"
                            >
                                <img
                                    src={coach.img}
                                    alt={coach.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-text-contrast/30 via-text-contrast/20 to-transparent"></div>
                                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col text-text-light">
                                    <h3 className="text-2xl sm:text-3xl font-light mb-2 tracking-wide font-hero text-text-light leading-[0.85]">
                                        {coach.name.toUpperCase()}
                                    </h3>
                                    <p className="text-base sm:text-lg opacity-90 mb-6">
                                        {coach.role}
                                    </p>
                                    <div className="mt-auto">
                                        <Button
                                            size="md"
                                            variant="blue"
                                            asChild
                                            className="w-full"
                                        >
                                            <Link to="/contact">
                                                {t(
                                                    "about.coaches.contactCoach"
                                                )}
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Training Information Grid */}
                <AnimatedSection
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4"
                    delay={3}
                >
                    {/* Training Schedule */}
                    <div
                        className="relative min-h-[400px] overflow-hidden rounded-custom group cursor-pointer splitBg-left"
                        style={{
                            backgroundImage: `url(${splitImageTraining})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-text-contrast/90 via-text-contrast/50 to-transparent group-hover:opacity-90 transition-opacity duration-500"></div>
                        <div className="relative p-6 sm:p-8 flex flex-col h-full text-text-light z-10">
                            <h3 className="text-2xl sm:text-3xl font-light tracking-wide font-hero text-text-light leading-[0.85] mb-4 sm:mb-6">
                                {t("about.training.title")}
                            </h3>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                                {trainingData.schedule.map((session, index) => (
                                    <div
                                        key={index}
                                        className="bg-surface/20 backdrop-blur-sm rounded-custom p-2 sm:p-3 text-center border border-accent/30"
                                    >
                                        <div className="text-xs text-text-light/80 uppercase tracking-wide mb-1">
                                            {t(
                                                `training.days.${session.dayKey}`
                                            )}
                                        </div>
                                        <div className="text-base sm:text-lg font-bold text-text-light mb-1">
                                            {session.time}
                                        </div>
                                        <div className="text-xs text-text-light/90">
                                            {t(
                                                `training.types.${session.typeKey}`
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mb-6">
                                <p className="text-text-light/90 text-xs sm:text-sm mb-2">
                                    {t("about.training.trainingAt")}{" "}
                                    <span className="font-semibold text-text-light">
                                        {trainingData.location.name}
                                    </span>
                                </p>
                            </div>
                            <div className="text-center mt-auto">
                                <Button
                                    variant="blue"
                                    asChild
                                    className="w-full sm:w-auto"
                                >
                                    <Link to="/contact">
                                        {t("about.training.joinTraining")}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div
                        className="relative min-h-[400px] overflow-hidden rounded-custom group cursor-pointer splitBg-right"
                        style={{
                            backgroundImage: `url(${splitImageTraining})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-text-contrast/90 via-text-contrast/50 to-transparent group-hover:opacity-90 transition-opacity duration-500"></div>
                        <div className="relative p-6 sm:p-8 flex flex-col h-full text-text-light z-10">
                            <h3 className="text-2xl sm:text-3xl font-light tracking-wide font-hero text-text-light leading-[0.85] mb-4 sm:mb-6">
                                {t("about.contact.title")}
                            </h3>
                            <div className="space-y-3 sm:space-y-4 mb-6">
                                <div className="bg-surface/20 backdrop-blur-sm rounded-custom p-3 sm:p-4 border border-accent/30">
                                    <h4 className="font-light tracking-wide font-hero text-text-light mb-2 leading-[0.85] text-sm sm:text-base">
                                        {t("about.contact.venue")}
                                    </h4>
                                    <p className="text-text-light/90 text-xs sm:text-sm">
                                        {trainingData.location.name}
                                    </p>
                                    <p className="text-text-light/80 text-xs sm:text-sm">
                                        {trainingData.location.address}
                                    </p>
                                </div>
                                <div className="bg-surface/20 backdrop-blur-sm rounded-custom p-3 sm:p-4 border border-accent/30">
                                    <h4 className="font-light tracking-wide font-hero text-text-light mb-2 leading-[0.85] text-sm sm:text-base">
                                        {t("about.contact.contactInfo")}
                                    </h4>
                                    <div className="space-y-1">
                                        <p className="text-text-light/90 text-xs sm:text-sm">
                                            {contactConfig.email}
                                        </p>
                                        <p className="text-text-light/90 text-xs sm:text-sm">
                                            {contactConfig.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-auto">
                                <Button
                                    variant="blue"
                                    asChild
                                    className="w-full sm:w-auto"
                                >
                                    <Link to="/contact">
                                        {t("navigation.contact")}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Call to Action */}
                <CallToAction
                    image="src/assets/images/call_to_action/rugby-player-woman-ball.jpg"
                    imageAlt="Zagreb Rugby Ladies player holding rugby ball - Join our inclusive team"
                    titleKey="about.cta.title"
                    descriptionKey="about.cta.description"
                    primaryButton={{
                        to: "/contact",
                        textKey: "common.joinTraining",
                    }}
                    secondaryButton={{
                        to: "/team",
                        textKey: "about.hero.meetTeam",
                    }}
                />
            </div>
        </div>
    );
};

export default About;
