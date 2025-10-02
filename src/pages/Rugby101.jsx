import { useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Divider } from "../components/ui/Divider";
import { Accordion } from "../components/ui/Accordion";
import { Link } from "react-router-dom";
import { Shield, Users, Target, Clock, CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "../components/ui/AnimatedSection";

const Rugby101 = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const rugbyBasics = [
        {
            icon: Users,
            title: "7 Players Per Team",
            description:
                "Each team has 7 players on the field, creating fast-paced action with more space to run and score.",
        },
        {
            icon: Target,
            title: "Objective",
            description:
                "Score more tries than the opposition by carrying, passing, or kicking the ball into the opponent's try zone.",
        },
        {
            icon: Clock,
            title: "14 Minutes",
            description:
                "A match consists of two 7-minute halves with a 2-minute break at halftime.",
        },
        {
            icon: Shield,
            title: "Safety First",
            description:
                "Proper technique and protective gear ensure rugby is safe. The faster pace promotes skillful play over heavy contact.",
        },
    ];

    const positions = [
        {
            number: 1,
            name: "Forwards (1-3)",
            description: "The foundation and power",
            roles: [
                "Scrum formation",
                "Lineout throwing and catching",
                "Ball security at breakdown",
                "Physical ball carrying",
            ],
            color: "navy", // navy background
        },
        {
            number: 2,
            name: "Backs (4-7)",
            description: "Speed, skill and finishing",
            roles: [
                "Ball distribution and pace",
                "Strategic kicking",
                "Support play and offloading",
                "Try-scoring opportunities",
            ],
            color: "orange", // orange background
        },
    ];

    const scoring = [
        {
            type: "Try",
            points: 5,
            description: "Grounding the ball in the opponent's try zone",
            color: "navy",
        },
        {
            type: "Conversion",
            points: 2,
            description: "Kick through the posts after a try",
            color: "orange",
        },
        {
            type: "Penalty",
            points: 3,
            description: "Kick awarded for opponent infractions",
            color: "navy",
        },
        {
            type: "Drop Goal",
            points: 3,
            description: "Field goal kicked during regular play",
            color: "orange",
        },
    ];

    const faqs = [
        {
            title: "Is rugby sevens safe for beginners?",
            content:
                "Absolutely! Rugby sevens has strict safety protocols and the faster pace actually promotes skillful play over heavy contact. Our coaches prioritize safety and teach proper technique from day one.",
        },
        {
            title: "Do I need to be super fit to play sevens?",
            content:
                "Rugby sevens welcomes all fitness levels. The 7-minute halves mean everyone gets rest, and there are positions that suit different attributes - from pace to power. Fitness develops naturally through training.",
        },
        {
            title: "What equipment do I need?",
            content:
                "For beginners, just comfortable athletic wear and running shoes or rugby boots. The club provides balls and training equipment. Optional protective gear like mouth guards are available as you progress.",
        },
        {
            title: "Can I start playing sevens with no experience?",
            content:
                "Yes! Many players find sevens easier to learn with fewer players and more space. Our beginner-friendly training sessions teach fundamentals step by step in a supportive environment.",
        },
        {
            title: "How is women's sevens different from men's?",
            content:
                "The rules are identical, and women's sevens is an Olympic sport showcasing incredible skill and athleticism. The game emphasizes speed, strategy, and teamwork with equally competitive and exciting play.",
        },
        {
            title: "What's the time commitment?",
            content:
                "We train twice a week with matches on weekends. Training sessions are 90 minutes. You can attend as many sessions as your schedule allows, and we welcome players who can't make every session.",
        },
    ];

    const myths = [
        {
            myth: "Rugby sevens is just sprint rugby",
            reality:
                "While faster, rugby sevens requires strategic thinking, skill, and endurance. The open space creates opportunities for creative play.",
        },
        {
            myth: "Only super fit athletes can play",
            reality:
                "Rugby sevens welcomes all fitness levels. The shorter game time and smaller teams mean more opportunities for everyone to contribute.",
        },
        {
            myth: "It's too fast-paced to learn",
            reality:
                "The simplified format with fewer players makes rugby sevens easier to understand. The action is exciting but the rules remain the same.",
        },
        {
            myth: "Women's sevens isn't as exciting",
            reality:
                "Women's rugby sevens is Olympic sport showcasing incredible skill, speed and athleticism. It's one of the most exciting formats to watch and play.",
        },
    ];

    return (
        <div className="min-h-screen bg-surface">
            {/* Hero Section - No animations as per requirements */}
            <div className="relative h-[500px] overflow-hidden mt-20">
                <div className="absolute inset-0 bg-[url('/src/assets/images/photos/josipa_rugby.jpg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-text-contrast/70 via-text-contrast/50 to-transparent"></div>

                <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center max-w-5xl mx-auto px-6">
                        <div className="inline-flex items-center px-4 py-2 bg-surface/20 backdrop-blur-sm rounded-full text-text-light text-sm font-medium mb-6">
                            Quick Start Guide
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                            Rugby 7s{" "}
                            <span className="text-accent">Essentials</span>
                        </h1>
                        <p className="text-xl text-text-light/90 mb-8 max-w-3xl mx-auto">
                            Everything you need to know to get started with the
                            world's most exciting rugby format
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="blue" asChild>
                                <Link to="/contact">Start Training Today</Link>
                            </Button>
                            <Button size="lg" variant="yellow" asChild>
                                <Link to="/team">Meet Our Team</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Divider />

            <div className="px-4 py-16 max-w-7xl mx-auto">
                {/* Quick Start Guide Section */}
                <AnimatedSection className="mb-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {rugbyBasics.map((basic, index) => {
                            const Icon = basic.icon;
                            const iconColors = [
                                "bg-text-contrast",
                                "bg-accent",
                                "bg-text-contrast",
                                "bg-accent",
                            ];

                            return (
                                <div
                                    key={index}
                                    className="bg-surface rounded-lg p-6 shadow-soft hover:shadow-medium transition-all duration-normal border border-border group"
                                >
                                    {/* Icon Circle */}
                                    <div
                                        className={`w-16 h-16 ${iconColors[index]} rounded-full flex items-center justify-center mb-4`}
                                    >
                                        <Icon className="h-8 w-8 text-text-light" />
                                    </div>

                                    <h3 className="text-xl font-semibold text-text-contrast mb-3">
                                        {basic.title}
                                    </h3>

                                    <p className="text-muted leading-relaxed">
                                        {basic.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </AnimatedSection>

                {/* Points System Section */}
                <AnimatedSection className="mb-20 bg-gray-50 -mx-4 px-4 py-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium mb-4">
                                Points System
                            </div>
                            <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide font-hero text-text-contrast leading-[0.85]">
                                How to{" "}
                                <span className="text-accent">Score</span>
                            </h2>
                            <p className="text-lg text-muted max-w-3xl mx-auto">
                                Four ways to put points on the board and
                                dominate the game
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {scoring.map((score, index) => (
                                <div
                                    key={index}
                                    className="bg-surface rounded-lg p-8 shadow-soft hover:shadow-medium transition-all duration-normal border border-border text-center"
                                >
                                    {/* Points Circle */}
                                    <div
                                        className={`w-20 h-20 ${
                                            score.color === "navy"
                                                ? "bg-text-contrast"
                                                : "bg-accent"
                                        } rounded-full flex items-center justify-center mx-auto mb-6`}
                                    >
                                        <span className="text-3xl font-bold text-text-light">
                                            {score.points}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-semibold text-text-contrast mb-3">
                                        {score.type}
                                    </h3>
                                    <p className="text-muted leading-relaxed">
                                        {score.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* Player Positions Section */}
                <AnimatedSection className="mb-20" delay={1}>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium mb-4">
                            Team Structure
                        </div>
                        <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide font-hero text-text-contrast leading-[0.85]">
                            Player{" "}
                            <span className="text-accent">Positions</span>
                        </h2>
                        <p className="text-lg text-muted max-w-3xl mx-auto">
                            Understanding the unique roles that make rugby
                            sevens so dynamic
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {positions.map((position, index) => (
                            <div
                                key={index}
                                className="bg-surface rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-all duration-normal border border-border"
                            >
                                {/* Header Section */}
                                <div
                                    className={`p-8 ${
                                        position.color === "navy"
                                            ? "bg-text-contrast"
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

                                {/* Content Section */}
                                <div className="p-8">
                                    <h4 className="text-lg font-semibold text-text-contrast mb-4">
                                        Key Responsibilities:
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
                                                                ? "bg-text-contrast"
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
                                        className="w-full"
                                        variant={
                                            position.color === "navy"
                                                ? "blue"
                                                : "yellow"
                                        }
                                        asChild
                                    >
                                        <Link to="/contact">
                                            Learn This Position
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Safety & Equipment Section */}
                <AnimatedSection className="mb-20" delay={2}>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium mb-4">
                            Safety First
                        </div>
                        <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide font-hero text-text-contrast leading-[0.85]">
                            Safety &{" "}
                            <span className="text-accent">Equipment</span>
                        </h2>
                        <p className="text-lg text-muted max-w-3xl mx-auto">
                            Everything you need to play safely and confidently
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* What You Need */}
                        <div className="bg-surface rounded-lg p-8 shadow-soft hover:shadow-medium transition-all duration-normal border border-border">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                                    <Shield className="h-7 w-7 text-text-light" />
                                </div>
                                <h3 className="text-2xl font-semibold text-text-contrast">
                                    What You Need
                                </h3>
                            </div>

                            <ul className="space-y-3">
                                {[
                                    "Comfortable athletic clothing",
                                    "Rugby boots or running shoes",
                                    "Mouth guard (recommended)",
                                    "Water bottle",
                                ].map((item, idx) => (
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
                        </div>

                        {/* Safety Measures */}
                        <div className="bg-surface rounded-lg p-8 shadow-soft hover:shadow-medium transition-all duration-normal border border-border">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 bg-text-contrast rounded-full flex items-center justify-center flex-shrink-0">
                                    <Shield className="h-7 w-7 text-text-light" />
                                </div>
                                <h3 className="text-2xl font-semibold text-text-contrast">
                                    Safety Measures
                                </h3>
                            </div>

                            <ul className="space-y-3">
                                {[
                                    "Proper tackling technique training",
                                    "Progressive contact introduction",
                                    "Qualified first aid at all sessions",
                                    "Regular equipment safety checks",
                                ].map((item, idx) => (
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
                        </div>
                    </div>
                </AnimatedSection>

                {/* Myths vs Reality Section */}
                <AnimatedSection className="mb-20" delay={3}>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-4 py-2 bg-yellow-50 text-yellow-600 rounded-full text-sm font-medium mb-4">
                            Truth Check
                        </div>
                        <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide font-hero text-text-contrast leading-[0.85]">
                            Myths vs{" "}
                            <span className="text-accent">Reality</span>
                        </h2>
                        <p className="text-lg text-muted max-w-3xl mx-auto">
                            Debunking common misconceptions about rugby sevens
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {myths.map((item, index) => (
                            <div
                                key={index}
                                className="bg-surface rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-all duration-normal border border-border"
                            >
                                {/* Myth Section */}
                                <div className="p-6 bg-red-50 border-b border-red-100">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-lg">
                                                ✗
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-red-600 font-semibold text-xs uppercase tracking-wide mb-1">
                                                MYTH
                                            </div>
                                            <h3 className="text-lg font-semibold text-text-contrast">
                                                {item.myth}
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Reality Section */}
                                <div className="p-6">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                                        <div>
                                            <div className="text-text-contrast font-semibold text-xs uppercase tracking-wide mb-1">
                                                REALITY
                                            </div>
                                            <p className="text-muted leading-relaxed">
                                                {item.reality}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>

                {/* FAQ Section */}
                <AnimatedSection className="mb-16" delay={4}>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium mb-4">
                            Common Questions
                        </div>
                        <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide font-hero text-text-contrast leading-[0.85]">
                            <span className="text-accent">FAQ</span>
                        </h2>
                        <p className="text-lg text-muted max-w-3xl mx-auto">
                            Everything you wanted to know about getting started
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto bg-surface rounded-lg shadow-soft border border-border p-6">
                        <Accordion items={faqs} allowMultiple={true} />
                    </div>
                </AnimatedSection>
            </div>

            {/* Call to Action */}
            <div className="relative overflow-hidden bg-text-contrast">
                <div className="absolute inset-0 bg-[url('/src/assets/images/photos/petra_rugby.jpg')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 py-24 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                            Ready to Start Your Rugby Journey?
                        </h2>
                        <p className="text-lg text-text-light/90 mb-10 max-w-2xl mx-auto">
                            Join Zagreb Rugby Ladies and become part of
                            Croatia's premier women's rugby sevens team
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="yellow" asChild>
                                <Link to="/contact">Join Us Today</Link>
                            </Button>
                            <Button size="lg" variant="blue" asChild>
                                <Link to="/team">Contact Us</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rugby101;
