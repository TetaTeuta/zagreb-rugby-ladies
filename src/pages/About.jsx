import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "../components/layout/Container";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Divider } from "../components/ui/Divider";
import { Link } from "react-router-dom";
import { MapPin, Clock, Mail, Users, Heart, Zap } from "lucide-react";
import { AnimatedSection } from "../components/ui/AnimatedSection";
import trainingData from "../data/training.json";

const About = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const coaches = [
        {
            name: "Juraj Ban",
            role: "Head Coach",
            credentials: "Level 3 World Rugby Certified",
            bio: "Former professional player with 15+ years coaching experience. Passionate about developing young talent and promoting inclusive rugby.",
            image: "/images/coaches/marko.jpg",
        },
        {
            name: "Julije Mirak",
            role: "Assistant Coach & Player Development",
            credentials:
                "Level 2 World Rugby Certified, Sports Psychology Diploma",
            bio: "Specializes in beginner coaching and mental game development. Believes every player has unique potential waiting to be unlocked.",
            image: "/images/coaches/ana.jpg",
        },
        {
            name: "Sandi",
            role: "Fitness & Conditioning Coach",
            credentials: "Certified Strength & Conditioning Specialist",
            bio: "Designs training programs that build strength while preventing injury. Makes fitness fun and accessible for all skill levels.",
            image: "/images/coaches/petra.jpg",
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

    return (
        <div className="min-h-screen bg-surface">
            {/* Hero Section */}
            <div className="relative h-[500px] overflow-hidden mt-20">
                <div className="absolute inset-0 bg-[url('https://i.guim.co.uk/img/static/sys-images/Sport/Pix/pictures/2014/2/8/1391863566865/Rugby-Sevens-Waratahs-blu-018.jpg?width=480&dpr=1&s=none&crop=none')] bg-cover bg-center"></div>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center max-w-4xl mx-auto px-6 sm:px-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 tracking-wide font-hero text-white leading-[0.85] drop-shadow-lg">
                            {t("about.hero.title")}
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button size="lg" variant="blue" asChild>
                                <Link to="/contact">
                                    {t("about.hero.joinTeam")}
                                </Link>
                            </Button>
                            <Button size="lg" variant="yellow" asChild>
                                <Link to="/team">
                                    {t("about.hero.meetTeam")}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Divider />

            <div className="px-4 py-16 max-w-7xl mx-auto">
                {/* Our Story Section */}
                <AnimatedSection divider="wave" className="mb-8">
                    <div className="relative h-[420px] overflow-hidden rounded group cursor-pointer">
                        <img
                            src="/src/assets/images/photos/lucija_rugby.jpg"
                            alt="Our story"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-text-contrast/90 via-text-contrast/50 to-transparent"></div>
                        <div className="absolute inset-0 p-8 sm:p-10 lg:p-12 flex flex-col justify-end text-text-light">
                            <div className="mb-6">
                                <h2 className="text-4xl font-light mb-2 tracking-wide font-hero text-text-light leading-[0.85]">
                                    {t("about.story.title")}
                                </h2>
                                <p className="text-lg text-text-light/80 mb-4">
                                    {t("about.story.subtitle")}
                                </p>
                            </div>
                            <div className="space-y-4 text-text-light/90 leading-relaxed max-w-3xl">
                                <p>{t("about.story.description1")}</p>
                                <p>{t("about.story.description2")}</p>
                            </div>
                            <div className="text-center mt-6">
                                <Button variant="blue" asChild>
                                    <Link to="/team">Meet the Team</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Mission & Values Grid */}
                <div className="mb-8">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide font-hero text-text-contrast leading-[0.85]">
                            {t("about.mission.title")}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-4">
                        {/* Mission Section */}
                        <div className="relative h-[420px] overflow-hidden rounded group cursor-pointer">
                            <img
                                src="/src/assets/images/photos/petra_rugby.jpg"
                                alt="Our mission"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-text-contrast/90 via-text-contrast/50 to-transparent"></div>
                            <div className="absolute inset-0 p-8 flex flex-col text-text-light">
                                <h3 className="text-3xl font-light mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                                    {t("about.mission.missionTitle")}
                                </h3>
                                <div className="flex-1 flex flex-col justify-between">
                                    <p className="text-lg text-text-light/90 leading-relaxed mb-6">
                                        {t("about.mission.missionText")}
                                    </p>
                                    <div className="text-center">
                                        <Button variant="blue" asChild>
                                            <Link to="/contact">Join Us</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Values Section */}
                        <div className="relative h-[420px] overflow-hidden rounded group cursor-pointer">
                            <img
                                src="/src/assets/images/photos/josipa_rugby.jpg"
                                alt="Our values"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-text-contrast/90 via-text-contrast/50 to-transparent"></div>
                            <div className="absolute inset-0 p-8 flex flex-col text-text-light">
                                <h3 className="text-3xl font-light mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                                    {t("about.mission.valuesTitle")}
                                </h3>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="space-y-3 mb-6">
                                        {values
                                            .slice(0, 3)
                                            .map((value, index) => {
                                                const icons = [
                                                    Users,
                                                    Heart,
                                                    Zap,
                                                ];
                                                const Icon = icons[index];
                                                return (
                                                    <div
                                                        key={index}
                                                        className="bg-surface/20 backdrop-blur-sm rounded p-4 border border-accent/30"
                                                    >
                                                        <div className="flex items-start space-x-4">
                                                            <div className="w-12 h-12 bg-surface/30 backdrop-blur-sm rounded-full flex items-center justify-center text-text-light flex-shrink-0 border border-accent/40">
                                                                <Icon className="h-6 w-6" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="font-light tracking-wide font-hero text-text-light mb-2 leading-[0.85]">
                                                                    {value.title.toUpperCase()}
                                                                </h4>
                                                                <p className="text-sm text-text-light/80 leading-relaxed">
                                                                    {
                                                                        value.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                    <div className="text-center">
                                        <Button variant="blue" asChild>
                                            <Link to="/rugby101">
                                                Learn More
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coaching Staff */}
                <div className="mb-8">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide font-hero text-text-contrast leading-[0.85]">
                            {t("about.coaches.title")}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {coaches.map((coach, index) => (
                            <div
                                key={index}
                                className="relative h-[500px] overflow-hidden rounded group cursor-pointer"
                            >
                                <img
                                    src={`/src/assets/images/photos/${
                                        [
                                            "teuta_rugby.jpg",
                                            "manuela_rugby.jpg",
                                            "margaux_rugby.jpg",
                                        ][index]
                                    }`}
                                    alt={coach.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-text-contrast/80 via-text-contrast/40 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 text-text-light">
                                    <h3 className="text-2xl font-light mb-2 tracking-wide font-hero text-text-light leading-[0.85]">
                                        {coach.name.toUpperCase()}
                                    </h3>
                                    <p className="text-lg opacity-90 mb-4">
                                        {coach.role}
                                    </p>
                                    <Button size="sm" variant="blue" asChild>
                                        <Link to="/contact">
                                            {t("about.coaches.contactCoach")}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Training Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-4">
                    {/* Training Schedule */}
                    <div className="relative h-[420px] overflow-hidden rounded group cursor-pointer">
                        <img
                            src="/src/assets/images/photos/petra1_rugby.jpg"
                            alt="Training schedule"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-text-contrast/90 via-text-contrast/50 to-transparent"></div>
                        <div className="absolute inset-0 p-8 flex flex-col text-text-light">
                            <h3 className="text-3xl font-light tracking-wide font-hero text-text-light leading-[0.85] mb-6">
                                {t("about.training.title")}
                            </h3>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {trainingData.schedule.map(
                                        (session, index) => (
                                            <div
                                                key={index}
                                                className="bg-surface/20 backdrop-blur-sm rounded p-3 text-center border border-accent/30"
                                            >
                                                <div className="text-xs text-text-light/80 uppercase tracking-wide mb-1">
                                                    {session.day}
                                                </div>
                                                <div className="text-lg font-bold text-text-light mb-1">
                                                    {session.time}
                                                </div>
                                                <div className="text-xs text-text-light/90">
                                                    {session.type}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="text-center mb-4">
                                    <p className="text-text-light/90 text-sm mb-2">
                                        {t("about.training.trainingAt")}{" "}
                                        <span className="font-semibold text-text-light">
                                            {trainingData.location.name}
                                        </span>
                                    </p>
                                </div>
                                <div className="text-center">
                                    <Button variant="blue" asChild>
                                        <Link to="/contact">
                                            {t("about.training.joinTraining")}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="relative h-[420px] overflow-hidden rounded group cursor-pointer">
                        <img
                            src="/src/assets/images/photos/margaux_rugby.jpg"
                            alt="Contact us"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-text-contrast/90 via-text-contrast/50 to-transparent"></div>
                        <div className="absolute inset-0 p-8 flex flex-col text-text-light">
                            <h3 className="text-3xl font-light tracking-wide font-hero text-text-light leading-[0.85] mb-6">
                                {t("about.contact.title")}
                            </h3>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="space-y-4 mb-6">
                                    <div className="bg-surface/20 backdrop-blur-sm rounded p-4 border border-accent/30">
                                        <h4 className="font-light tracking-wide font-hero text-text-light mb-2 leading-[0.85]">
                                            {t("about.contact.venue")}
                                        </h4>
                                        <p className="text-text-light/90 text-sm">
                                            {trainingData.location.name}
                                        </p>
                                        <p className="text-text-light/80 text-sm">
                                            {trainingData.location.address}
                                        </p>
                                    </div>
                                    <div className="bg-surface/20 backdrop-blur-sm rounded p-4 border border-accent/30">
                                        <h4 className="font-light tracking-wide font-hero text-text-light mb-2 leading-[0.85]">
                                            {t("about.contact.contactInfo")}
                                        </h4>
                                        <div className="space-y-1">
                                            <p className="text-text-light/90 text-sm">
                                                {trainingData.contact.email}
                                            </p>
                                            <p className="text-text-light/90 text-sm">
                                                {trainingData.contact.phone}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <Button variant="blue" asChild>
                                        <Link to="/contact">Contact Us</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="relative h-[700px] overflow-hidden rounded group cursor-pointer">
                    <img
                        src="/src/assets/images/photos/teuta_rugby.jpg"
                        alt="Join our team"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-text-contrast/70 via-text-contrast/30 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-2xl ml-12 text-text-light">
                            <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                                {t("about.cta.title")}
                            </h2>
                            <p className="text-xl mb-8 opacity-90 leading-relaxed">
                                {t("about.cta.description")}
                            </p>
                            <div className="flex gap-4">
                                <Button size="lg" variant="blue" asChild>
                                    <Link to="/contact">Join Training</Link>
                                </Button>
                                <Button size="lg" variant="yellow" asChild>
                                    <Link to="/team">Meet the Team</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
