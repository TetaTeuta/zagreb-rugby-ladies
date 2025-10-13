import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardTitle } from "../components/ui/Card";
import { PlayerCard } from "../components/team/PlayerCard";
import { PlayerModal } from "../components/team/PlayerModal";
import { AnimatedSection } from "../components/ui/AnimatedSection";
import { Users, Trophy, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import playersData from "../data/players.json";

const Team = () => {
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
            label: "Active Players",
        },
        {
            icon: Trophy,
            number: "5",
            label: "Years Strong",
        },
        {
            icon: Heart,
            number: "100%",
            label: "Team Spirit",
        },
    ];

    return (
        <div className="min-h-screen bg-surface">
            {/* Hero Section */}
            <div className="relative h-[500px] overflow-hidden mt-20">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="absolute inset-0 bg-[url('/src/assets/images/players/petra_rugby.jpg')] bg-cover bg-center opacity-30"></div>

                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center max-w-4xl mx-auto px-6 sm:px-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                            INSPIRING STORIES. UNSTOPPABLE SPIRIT.
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button size="lg" variant="blue" asChild>
                                <Link to="/contact">Join Our Team</Link>
                            </Button>
                            <Button size="lg" variant="yellow" asChild>
                                <Link to="/rugby101">Learn About Rugby</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-16 max-w-7xl mx-auto">
                {/* Team Stats Section */}
                <AnimatedSection divider="wave" className="mb-8">
                    <div className="relative h-[600px] overflow-hidden rounded group cursor-pointer">
                        <img
                            src="/src/assets/images/players/teuta_rugby.jpg"
                            alt="Team stats"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                        <div className="absolute inset-0 p-8 sm:p-10 lg:p-12 flex flex-col justify-end text-text-light">
                            <div className="mb-6">
                                <h2 className="text-4xl font-bold text-text-light mb-2 tracking-wide">
                                    OUR TEAM
                                </h2>
                                <p className="text-lg text-text-light/80 mb-4">
                                    Every player has a unique journey.
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                {teamStats.map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="bg-surface/20 backdrop-blur-sm rounded p-3 text-center border border-accent/30"
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
                                <Button variant="blue" asChild>
                                    <Link to="/contact">Join Training</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Players Section */}
                <AnimatedSection className="mb-8" delay={1}>
                    <div className="text-center mb-8">
                        <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide font-hero text-text-contrast leading-[0.85]">
                            MEET OUR PLAYERS
                        </h2>
                        <p className="text-lg text-muted max-w-2xl mx-auto">
                            Meet the incredible women who are redefining what it
                            means to be strong, fearless, and unstoppable.
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
                    <div className="relative h-[600px] overflow-hidden rounded group cursor-pointer">
                        <img
                            src="/src/assets/images/players/lucija_rugby.jpg"
                            alt="Inclusive environment"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                        <div className="absolute inset-0 p-8 flex flex-col justify-end text-text-light">
                            <h3 className="text-3xl font-light mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                                INCLUSIVE ENVIRONMENT
                            </h3>
                            <p className="text-lg text-text-light/90 leading-relaxed mb-4">
                                We welcome players of all backgrounds, skill
                                levels, and experience. Whether you're a
                                complete beginner or seasoned athlete, you'll
                                find your place on our team.
                            </p>
                            <div className="text-center">
                                <Button variant="blue" asChild>
                                    <Link to="/contact">Join Us</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Player Development */}
                    <div className="relative h-[600px] overflow-hidden rounded group cursor-pointer">
                        <img
                            src="/src/assets/images/players/manuela_rugby.jpg"
                            alt="Player development"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                        <div className="absolute inset-0 p-8 flex flex-col justify-end text-text-light">
                            <h3 className="text-3xl font-light mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                                PLAYER DEVELOPMENT
                            </h3>
                            <p className="text-lg text-text-light/90 leading-relaxed mb-4">
                                We're committed to helping every player reach
                                their full potential, both as athletes and as
                                confident individuals.
                            </p>
                            <div className="text-center">
                                <Button variant="blue" asChild>
                                    <Link to="/rugby101">Learn More</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Call to Action */}
                <div className="relative h-[700px] overflow-hidden rounded group cursor-pointer">
                    <img
                        src="/src/assets/images/players/margaux_rugby.jpg"
                        alt="Join our team"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-2xl ml-12 text-text-light">
                            <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-wide font-hero text-text-light leading-[0.85]">
                                WANT TO JOIN OUR TEAM?
                            </h2>
                            <p className="text-xl mb-8 opacity-90 leading-relaxed">
                                We're always looking for new players who want to
                                challenge themselves, make friends, and be part
                                of something special. No experience
                                required—just bring your enthusiasm!
                            </p>
                            <div className="flex gap-4">
                                <Button size="lg" variant="blue" asChild>
                                    <Link to="/contact">Join Training</Link>
                                </Button>
                                <Button size="lg" variant="yellow" asChild>
                                    <Link to="/rugby101">
                                        Learn About Rugby
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
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
