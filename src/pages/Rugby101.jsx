import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { Accordion } from "../components/ui/Accordion";
import { Card, CardContent } from "../components/ui/Card";
import { Link } from "react-router-dom";
import { Shield, Users, Target, Clock, CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "../components/ui/AnimatedSection";
import { CallToAction } from "../components/ui/CallToAction";
import {
    SEO,
    createFAQStructuredData,
    createArticleStructuredData,
    createHowToStructuredData,
} from "../components/ui/SEO";

const IconCircle = ({ Icon, color, size = "default", children }) => {
    const sizeClasses = {
        default: "w-16 h-16 mt-3 mb-4",
        large: "w-20 h-20 mx-auto mb-6 mt-3",
    };

    return (
        <div
            className={`${sizeClasses[size]} ${color} rounded-full flex items-center justify-center`}
        >
            {Icon ? <Icon className="h-8 w-8 text-text-light" /> : children}
        </div>
    );
};

const Rugby101 = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const rugbyBasics = [
        {
            icon: Users,
            title: t("rugby101.basics.playersPerTeam.title"),
            description: t("rugby101.basics.playersPerTeam.description"),
        },
        {
            icon: Target,
            title: t("rugby101.basics.objective.title"),
            description: t("rugby101.basics.objective.description"),
        },
        {
            icon: Clock,
            title: t("rugby101.basics.duration.title"),
            description: t("rugby101.basics.duration.description"),
        },
        {
            icon: Shield,
            title: t("rugby101.basics.safety.title"),
            description: t("rugby101.basics.safety.description"),
        },
    ];

    const positions = [
        {
            number: 1,
            name: t("rugby101.positions.forwards.title"),
            description: t("rugby101.positions.forwards.subtitle"),
            roles: t("rugby101.positions.forwards.roles", {
                returnObjects: true,
            }),
            color: "navy",
        },
        {
            number: 2,
            name: t("rugby101.positions.backs.title"),
            description: t("rugby101.positions.backs.subtitle"),
            roles: t("rugby101.positions.backs.roles", { returnObjects: true }),
            color: "orange",
        },
    ];

    const scoring = [
        {
            type: t("rugby101.scoring.try.title"),
            points: 5,
            description: t("rugby101.scoring.try.description"),
            color: "navy",
        },
        {
            type: t("rugby101.scoring.conversion.title"),
            points: 2,
            description: t("rugby101.scoring.conversion.description"),
            color: "orange",
        },
        {
            type: t("rugby101.scoring.penalty.title"),
            points: 3,
            description: t("rugby101.scoring.penalty.description"),
            color: "navy",
        },
        {
            type: t("rugby101.scoring.dropGoal.title"),
            points: 3,
            description: t("rugby101.scoring.dropGoal.description"),
            color: "orange",
        },
    ];

    const faqItems = t("rugby101.faq.items", { returnObjects: true });
    const faqs = faqItems.map((item) => ({
        title: item.question,
        content: item.answer,
    }));

    const mythItems = t("rugby101.myths.items", { returnObjects: true });
    const myths = mythItems.map((item) => ({
        myth: item.myth,
        reality: item.reality,
    }));

    // SEO Configuration
    const pageTitle =
        "Rugby 101: Complete Guide to Rugby Sevens Rules & How to Play";
    const pageDescription =
        "Learn everything about rugby sevens - rules, positions, scoring, safety tips, and FAQs. Perfect beginner's guide for women interested in playing rugby in Zagreb, Croatia.";
    const keywords =
        "rugby rules, rugby sevens, how to play rugby, rugby for beginners, rugby positions, rugby scoring, women's rugby, rugby safety, learn rugby, rugby guide, rugby Croatia, rugby Zagreb";

    // Structured Data for FAQ
    const faqStructuredData = createFAQStructuredData(faqItems);

    // Structured Data for Article
    const articleStructuredData = createArticleStructuredData({
        headline: "Rugby 101: Complete Beginner's Guide to Rugby Sevens",
        description: pageDescription,
        image: "/zagreb-rugby-ladies-logo.png",
        datePublished: "2024-01-01",
        dateModified: new Date().toISOString().split("T")[0],
    });

    // Structured Data for HowTo
    const howToStructuredData = createHowToStructuredData({
        name: "How to Start Playing Rugby Sevens",
        description:
            "A step-by-step guide to getting started with rugby sevens for beginners",
        image: "/zagreb-rugby-ladies-logo.png",
        steps: [
            {
                name: "Understand the Basics",
                text: "Learn that rugby sevens has 7 players per team, plays for 14 minutes total (two 7-minute halves), and focuses on scoring tries by carrying the ball into the opponent's try zone.",
            },
            {
                name: "Know the Scoring System",
                text: "Familiarize yourself with how points are scored: 5 points for a try, 2 for conversion, 3 for penalty kick, and 3 for drop goal.",
            },
            {
                name: "Learn Player Positions",
                text: "Understand the two main position groups: Forwards (1-3) handle scrums and physical play, while Backs (4-7) focus on speed and finishing.",
            },
            {
                name: "Get the Right Equipment",
                text: "Start with comfortable athletic clothing, rugby boots or running shoes, a mouth guard, and water bottle. The club provides training equipment.",
            },
            {
                name: "Join Training Sessions",
                text: "Contact Zagreb Rugby Ladies to join beginner-friendly training sessions where you'll learn proper techniques and safety protocols.",
                url: window.location.origin + "/contact",
            },
        ],
    });

    // Combine all structured data
    const combinedStructuredData = {
        "@context": "https://schema.org",
        "@graph": [
            faqStructuredData,
            articleStructuredData,
            howToStructuredData,
        ],
    };

    return (
        <div className="min-h-screen bg-surface">
            <SEO
                title={pageTitle}
                description={pageDescription}
                keywords={keywords}
                canonicalUrl="/rugby101"
                ogType="article"
                structuredData={combinedStructuredData}
            />

            <div className="relative h-[50svh] overflow-hidden mt-20">
                <div className="absolute inset-0 flex items-center justify-center bg-text-contrast">
                    <img
                        src="src/assets/images/hero/zagreb-rugby-ladies-team-running.jpg"
                        alt="Zagreb Rugby Ladies team running on the field during training - Women's rugby sevens action shot"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 overlay-cinematic-base opacity-[0.85]"></div>
                    <div className="absolute inset-0 overlay-cinematic-sunset"></div>
                    <div className="absolute inset-0 overlay-cinematic-matte"></div>
                </div>

                <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center max-w-5xl mx-auto px-6">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                            {t("rugby101.hero.title")}{" "}
                        </h1>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md sm:max-w-none mx-auto">
                            <Button
                                size="lg"
                                variant="blue"
                                asChild
                                className="w-full sm:w-auto"
                            >
                                <Link to="/contact">
                                    {t("common.joinTraining")}
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="yellow"
                                asChild
                                className="w-full sm:w-auto"
                            >
                                <Link to="/team">{t("navigation.team")}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-16 max-w-7xl mx-auto">
                <AnimatedSection className="mb-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {rugbyBasics.map((basic, index) => {
                            const Icon = basic.icon;
                            const iconColors = [
                                "bg-surface-navy",
                                "bg-accent",
                                "bg-surface-navy",
                                "bg-accent",
                            ];

                            return (
                                <Card
                                    key={index}
                                    className="shadow-soft hover:shadow-medium"
                                >
                                    <CardContent className="p-6">
                                        <IconCircle
                                            Icon={Icon}
                                            color={iconColors[index]}
                                        />

                                        <h3 className="text-xl font-semibold text-text-contrast mb-3">
                                            {basic.title}
                                        </h3>

                                        <p className="text-muted leading-relaxed">
                                            {basic.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </AnimatedSection>

                <AnimatedSection className="mb-20 bg-gray-50 -mx-4 px-4 py-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide font-hero text-text-contrast leading-[0.85]">
                                {t("rugby101.scoring.title")}
                            </h2>
                            <p className="text-lg text-muted max-w-3xl mx-auto">
                                {t("rugby101.scoring.description")}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {scoring.map((score, index) => (
                                <Card
                                    key={index}
                                    className="shadow-soft hover:shadow-medium text-center"
                                >
                                    <CardContent className="p-8">
                                        <IconCircle
                                            size="large"
                                            color={
                                                score.color === "navy"
                                                    ? "bg-surface-navy"
                                                    : "bg-accent"
                                            }
                                        >
                                            <span className="text-3xl font-bold text-text-light">
                                                {score.points}
                                            </span>
                                        </IconCircle>

                                        <h3 className="text-xl font-semibold text-text-contrast mb-3">
                                            {score.type}
                                        </h3>
                                        <p className="text-muted leading-relaxed">
                                            {score.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection className="mb-20" delay={1}>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide font-hero text-text-contrast leading-[0.85]">
                            {t("rugby101.positions.title")}{" "}
                            <span className="text-accent">
                                {t("rugby101.positions.titleAccent")}
                            </span>
                        </h2>
                        <p className="text-lg text-muted max-w-3xl mx-auto">
                            {t("rugby101.positions.description")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {positions.map((position, index) => (
                            <Card
                                key={index}
                                className="shadow-soft hover:shadow-medium overflow-hidden"
                            >
                                <div
                                    className={`p-8 ${
                                        position.color === "navy"
                                            ? "bg-surface-navy"
                                            : "bg-accent"
                                    } text-text-light`}
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 bg-surface/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-2xl font-bold">
                                                {position.number}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-semibold mb-2">
                                                {position.name}
                                            </h3>
                                            <p className="text-text-light/90">
                                                {position.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="p-8">
                                    <h4 className="text-lg font-semibold text-text-contrast mb-4 mt-3">
                                        {t(
                                            "rugby101.positions.keyResponsibilities"
                                        )}
                                    </h4>
                                    <ul className="space-y-3 mb-6">
                                        {position.roles.map(
                                            (role, roleIndex) => (
                                                <li
                                                    key={roleIndex}
                                                    className="flex items-start gap-3"
                                                >
                                                    <span
                                                        className={`w-1.5 h-1.5 ${
                                                            position.color ===
                                                            "navy"
                                                                ? "bg-surface-navy"
                                                                : "bg-accent"
                                                        } rounded-full mt-2 flex-shrink-0`}
                                                    ></span>
                                                    <span className="text-muted">
                                                        {role}
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>

                                    <Button
                                        variant={
                                            position.color === "navy"
                                                ? "blue"
                                                : "yellow"
                                        }
                                        asChild
                                        className="w-full"
                                    >
                                        <Link to="/contact">
                                            {t(
                                                "rugby101.positions.learnPosition"
                                            )}
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </AnimatedSection>

                <AnimatedSection className="mb-20" delay={2}>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide font-hero text-text-contrast leading-[0.85]">
                            {t("rugby101.safety.title")}{" "}
                            <span className="text-accent">
                                {t("rugby101.safety.titleAccent")}
                            </span>
                        </h2>
                        <p className="text-lg text-muted max-w-3xl mx-auto">
                            {t("rugby101.safety.description")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="shadow-soft hover:shadow-medium">
                            <CardContent className="p-8">
                                <IconCircle Icon={Shield} color="bg-accent" />
                                <h3 className="text-2xl font-semibold text-text-contrast mb-6">
                                    {t("rugby101.safety.whatYouNeed.title")}
                                </h3>

                                <ul className="space-y-3">
                                    {t("rugby101.safety.whatYouNeed.items", {
                                        returnObjects: true,
                                    }).map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-3"
                                        >
                                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                                            <span className="text-muted">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="shadow-soft hover:shadow-medium">
                            <CardContent className="p-8">
                                <IconCircle
                                    Icon={Shield}
                                    color="bg-surface-navy"
                                />
                                <h3 className="text-2xl font-semibold text-text-contrast mb-6">
                                    {t("rugby101.safety.safetyMeasures.title")}
                                </h3>

                                <ul className="space-y-3">
                                    {t("rugby101.safety.safetyMeasures.items", {
                                        returnObjects: true,
                                    }).map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-3"
                                        >
                                            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                                            <span className="text-muted">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </AnimatedSection>

                <AnimatedSection className="mb-20" delay={3}>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide font-hero text-text-contrast leading-[0.85]">
                            {t("rugby101.myths.title")}{" "}
                            <span className="text-accent">
                                {t("rugby101.myths.titleAccent")}
                            </span>
                        </h2>
                        <p className="text-lg text-muted max-w-3xl mx-auto">
                            {t("rugby101.myths.description")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {myths.map((item, index) => (
                            <Card
                                key={index}
                                className="shadow-soft hover:shadow-medium overflow-hidden"
                            >
                                <div className="p-6 bg-red-50 border-b border-red-100">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-lg">
                                                ✗
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-red-600 font-semibold text-xs uppercase tracking-wide mb-1">
                                                {t("rugby101.myths.mythLabel")}
                                            </div>
                                            <h3 className="text-lg font-semibold text-text-contrast">
                                                {item.myth}
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    <div className="flex items-start gap-3 mt-3">
                                        <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-3" />
                                        <div>
                                            <div className="text-text-contrast font-semibold text-xs uppercase tracking-wide mb-1">
                                                {t(
                                                    "rugby101.myths.realityLabel"
                                                )}
                                            </div>
                                            <p className="text-muted leading-relaxed">
                                                {item.reality}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </AnimatedSection>

                <AnimatedSection className="mb-16" delay={4}>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide font-hero text-text-contrast leading-[0.85]">
                            <span className="text-accent">
                                {t("rugby101.faq.title")}
                            </span>
                        </h2>
                        <p className="text-lg text-muted max-w-3xl mx-auto">
                            {t("rugby101.faq.description")}
                        </p>
                    </div>

                    <Card className="max-w-4xl mx-auto shadow-soft">
                        <CardContent className="p-6">
                            <Accordion items={faqs} />
                        </CardContent>
                    </Card>
                </AnimatedSection>

                {/* Call to Action */}
                <CallToAction
                    image="src/assets/images/call_to_action/rugby-players-woman-team.jpg"
                    imageAlt="Women's rugby team celebrating together on the field - Join Zagreb Rugby Ladies"
                    titleKey="rugby101.cta.title"
                    descriptionKey="rugby101.cta.description"
                    primaryButton={{
                        to: "/contact",
                        textKey: "rugby101.cta.joinButton",
                    }}
                    secondaryButton={{
                        to: "/contact",
                        textKey: "rugby101.cta.contactButton",
                    }}
                />
            </div>
        </div>
    );
};

export default Rugby101;
