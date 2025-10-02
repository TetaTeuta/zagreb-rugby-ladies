import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Accordion } from "../components/ui/Accordion";
import { Link } from "react-router-dom";
import { Shield, Users, Target, Clock, Heart } from "lucide-react";
import { AnimatedSection } from "../components/ui/AnimatedSection";

const Rugby101 = () => {
    const [isHeroVisible, setIsHeroVisible] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsHeroVisible(scrollPosition < window.innerHeight * 0.5);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const rugbyBasics = [
        {
            icon: Users,
            title: "7 Players Per Team",
            description:
                "Each team has 7 players on the field, creating fast-paced action with more space to run and score.",
            color: "blue",
        },
        {
            icon: Target,
            title: "Objective",
            description:
                "Score more tries than the opposition by carrying, passing, or kicking the ball into the opponent's try zone.",
            color: "orange",
        },
        {
            icon: Clock,
            title: "14 Minutes",
            description:
                "A match consists of two 7-minute halves with a 2-minute break at halftime.",
            color: "green",
        },
        {
            icon: Shield,
            title: "Safety First",
            description:
                "Proper technique and protective gear ensure rugby is safe. The faster pace promotes skillful play over heavy contact.",
            color: "purple",
        },
    ];

    const positions = [
        {
            name: "Forwards (1-3)",
            description: "The foundation and power",
            roles: [
                "Scrum formation",
                "Lineout throwing and catching",
                "Ball security at breakdown",
                "Physical ball carrying",
            ],
        },
        {
            name: "Backs (4-7)",
            description: "Speed, skill and finishing",
            roles: [
                "Ball distribution and pace",
                "Strategic kicking",
                "Support play and offloading",
                "Try-scoring opportunities",
            ],
        },
    ];

    const scoring = [
        {
            type: "Try",
            points: 5,
            description: "Grounding the ball in the opponent's try zone",
            color: "from-emerald-500 to-teal-600",
        },
        {
            type: "Conversion",
            points: 2,
            description: "Kick through the posts after a try",
            color: "from-blue-500 to-indigo-600",
        },
        {
            type: "Penalty",
            points: 3,
            description: "Kick awarded for opponent infractions",
            color: "from-orange-500 to-red-500",
        },
        {
            type: "Drop Goal",
            points: 3,
            description: "Field goal kicked during regular play",
            color: "from-purple-500 to-pink-600",
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
            title: "What if I'm not naturally fast?",
            content:
                "Rugby sevens is for everyone! While speed helps, the game also requires strategy, strength, and skill. Every player brings different attributes, and our club focuses on developing each player's unique strengths.",
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
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-[500px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="absolute inset-0 bg-[url('/src/assets/images/photos/josipa_rugby.jpg')] bg-cover bg-center opacity-30"></div>

                <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center max-w-5xl mx-auto px-6">
                        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-6">
                            🏉 Complete Rugby Guide
                        </div>
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-light mb-6 tracking-wide font-hero text-white leading-[0.85]">
                            RUGBY{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                                7S
                            </span>{" "}
                            101
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
                            Master the fastest, most exciting format in rugby
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-white text-gray-900 hover:bg-gray-100"
                                asChild
                            >
                                <Link to="/contact">Start Training Today</Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900"
                                asChild
                            >
                                <Link to="/team">Meet Our Team</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-20 max-w-7xl mx-auto">
                {/* Rugby Basics - Bento Grid Style */}
                <AnimatedSection className="mb-24" delay={1}>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-bold mb-6">
                            ⚡ Quick Start Guide
                        </div>
                        <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-wide font-hero text-gray-900 leading-[0.85]">
                            Rugby 7s{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                Essentials
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Everything you need to know to get started with the
                            world's most exciting rugby format
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {rugbyBasics.map((basic, index) => {
                            const Icon = basic.icon;
                            const colors = {
                                blue: "from-blue-500 to-blue-600",
                                orange: "from-orange-500 to-red-500",
                                green: "from-emerald-500 to-teal-600",
                                purple: "from-purple-500 to-pink-600",
                            };

                            return (
                                <div
                                    key={index}
                                    className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden"
                                >
                                    {/* Background Gradient */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${
                                            colors[basic.color]
                                        } opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                                    ></div>

                                    {/* Icon Container */}
                                    <div
                                        className={`w-16 h-16 bg-gradient-to-br ${
                                            colors[basic.color]
                                        } rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}
                                    >
                                        <Icon className="h-8 w-8 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                                        {basic.title}
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                                        {basic.description}
                                    </p>

                                    {/* Decorative Element */}
                                    <div
                                        className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${
                                            colors[basic.color]
                                        } rounded-full opacity-10 group-hover:scale-125 transition-transform duration-500`}
                                    ></div>
                                </div>
                            );
                        })}
                    </div>
                </AnimatedSection>

                {/* Positions - Side by Side Cards */}
                <AnimatedSection className="mb-24" delay={2}>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-bold mb-6">
                            👥 Team Structure
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                            Player{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                                Positions
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Understanding the unique roles that make rugby
                            sevens so dynamic
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {positions.map((position, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* Header Section */}
                                <div
                                    className={`p-8 bg-gradient-to-br ${
                                        index === 0
                                            ? "from-blue-500 to-indigo-600"
                                            : "from-emerald-500 to-teal-600"
                                    } text-white relative overflow-hidden`}
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                            <span className="text-2xl font-black">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-black mb-2">
                                            {position.name}
                                        </h3>
                                        <p className="text-white/90 text-lg">
                                            {position.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-8">
                                    <h4 className="text-lg font-bold text-gray-900 mb-6">
                                        Key Responsibilities:
                                    </h4>
                                    <div className="space-y-4">
                                        {position.roles.map(
                                            (role, roleIndex) => (
                                                <div
                                                    key={roleIndex}
                                                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group-hover:shadow-sm"
                                                >
                                                    <div
                                                        className={`w-2 h-2 ${
                                                            index === 0
                                                                ? "bg-blue-500"
                                                                : "bg-emerald-500"
                                                        } rounded-full mt-2 flex-shrink-0`}
                                                    ></div>
                                                    <p className="text-gray-700 font-medium">
                                                        {role}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>

                                    <div className="mt-8">
                                        <Button
                                            className={`w-full bg-gradient-to-r ${
                                                index === 0
                                                    ? "from-blue-500 to-indigo-600"
                                                    : "from-emerald-500 to-teal-600"
                                            } text-white font-bold py-3 rounded-2xl hover:scale-105 transition-transform shadow-lg`}
                                            asChild
                                        >
                                            <Link to="/contact">
                                                Learn This Position
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Scoring - Floating Cards */}
                <AnimatedSection className="mb-24" delay={3}>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-6">
                            🎯 Points System
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                            How to{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                                Score
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Four ways to put points on the board and dominate
                            the game
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {scoring.map((score, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-6 border border-gray-100 text-center overflow-hidden"
                            >
                                {/* Background Effect */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${score.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                                ></div>

                                {/* Points Circle */}
                                <div className="relative mb-8">
                                    <div
                                        className={`w-24 h-24 bg-gradient-to-br ${score.color} rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                                    >
                                        <span className="text-3xl font-black text-white">
                                            {score.points}
                                        </span>
                                    </div>
                                    {/* Animated Ring */}
                                    <div
                                        className={`absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r ${score.color} p-1 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`}
                                    >
                                        <div className="w-full h-full bg-white rounded-full"></div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {score.type}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {score.description}
                                </p>

                                {/* Accent Line */}
                                <div
                                    className={`w-16 h-1 bg-gradient-to-r ${score.color} rounded-full mx-auto mt-6 group-hover:w-24 transition-all duration-500`}
                                ></div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Safety & Equipment - Split Layout */}
                <AnimatedSection className="mb-24" delay={4}>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-bold mb-6">
                            🛡️ Safety First
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                            Safety &{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">
                                Equipment
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Everything you need to play safely and confidently
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* What You Need */}
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-10 border border-orange-100 group hover:shadow-xl transition-all duration-500">
                            <div className="flex items-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Heart className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 ml-4">
                                    What You Need
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {[
                                    "Comfortable athletic clothing",
                                    "Rugby boots or running shoes",
                                    "Mouth guard (recommended)",
                                    "Water bottle",
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center space-x-4 p-4 bg-white/60 rounded-2xl border border-white/50"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-sm font-bold">
                                                ✓
                                            </span>
                                        </div>
                                        <p className="text-gray-700 font-medium">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Safety Measures */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 border border-blue-100 group hover:shadow-xl transition-all duration-500">
                            <div className="flex items-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Shield className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 ml-4">
                                    Safety Measures
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {[
                                    "Proper tackling technique training",
                                    "Progressive contact introduction",
                                    "Qualified first aid at all sessions",
                                    "Regular equipment safety checks",
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center space-x-4 p-4 bg-white/60 rounded-2xl border border-white/50"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-sm font-bold">
                                                ✓
                                            </span>
                                        </div>
                                        <p className="text-gray-700 font-medium">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Myths vs Reality - Card Layout */}
                <AnimatedSection className="mb-24" delay={5}>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold mb-6">
                            💡 Truth Check
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                            Myths vs{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
                                Reality
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Debunking common misconceptions about rugby sevens
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {myths.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                            >
                                {/* Myth Section */}
                                <div className="p-8 bg-gradient-to-r from-red-50 to-pink-50 border-b border-red-100">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-xl">
                                                ✗
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-red-600 font-bold text-sm uppercase tracking-wide mb-2">
                                                MYTH
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {item.myth}
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Reality Section */}
                                <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-xl">
                                                ✓
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-green-600 font-bold text-sm uppercase tracking-wide mb-2">
                                                REALITY
                                            </div>
                                            <p className="text-gray-700 leading-relaxed">
                                                {item.reality}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>

                {/* FAQ */}
                <AnimatedSection className="mb-16" delay={6}>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-bold mb-6">
                            ❓ Common Questions
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                FAQ
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Everything you wanted to know about getting started
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <Accordion items={faqs} allowMultiple={true} />
                        </div>
                    </div>
                </AnimatedSection>
            </div>

            {/* Call to Action */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                <div className="absolute inset-0 bg-[url('/src/assets/images/photos/petra_rugby.jpg')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 py-24 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
                            Ready to Join the{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                                Action?
                            </span>
                        </h2>
                        <p className="text-xl md:text-2xl text-white/90 mb-12 font-light max-w-3xl mx-auto">
                            Experience the thrill of rugby sevens firsthand.
                            Join our beginner-friendly training sessions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Button
                                size="lg"
                                className="bg-white text-gray-900 hover:bg-gray-100 rounded-2xl"
                                asChild
                            >
                                <Link to="/contact">Start Training Now</Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 rounded-2xl"
                                asChild
                            >
                                <Link to="/team">Meet Our Players</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rugby101;
