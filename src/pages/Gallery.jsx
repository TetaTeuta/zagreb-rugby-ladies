import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Lightbox } from "../components/ui/Lightbox";
import { Play, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "../components/ui/AnimatedSection";

const Gallery = () => {
    const [selectedAlbum, setSelectedAlbum] = useState("all");
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

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Sample gallery data using local images
    const albums = [
        { id: "all", name: "All Photos", count: 12 },
        { id: "training", name: "Training", count: 5 },
        { id: "matches", name: "Matches", count: 4 },
        { id: "community", name: "Community", count: 3 },
    ];

    const galleryItems = [
        {
            id: 1,
            type: "image",
            src: "/src/assets/images/photos/teuta_rugby.jpg",
            thumbnail: "/src/assets/images/photos/teuta_rugby.jpg",
            alt: "Team training session",
            title: "Weekly Training Session",
            description: "Players practicing rucking and mauling techniques",
            album: "training",
            date: "2024-03-15",
        },
        {
            id: 2,
            type: "image",
            src: "/src/assets/images/photos/manuela_rugby.jpg",
            thumbnail: "/src/assets/images/photos/manuela_rugby.jpg",
            alt: "Match action shot",
            title: "Zagreb vs Rijeka",
            description: "Intense match action from our league game",
            album: "matches",
            date: "2024-03-10",
        },
        {
            id: 3,
            type: "image",
            src: "/src/assets/images/photos/margaux_rugby.jpg",
            thumbnail: "/src/assets/images/photos/margaux_rugby.jpg",
            alt: "Team celebration",
            title: "Post-Match Celebration",
            description: "Celebrating another great game with the team",
            album: "community",
            date: "2024-03-10",
        },
        {
            id: 4,
            type: "image",
            src: "/src/assets/images/photos/petra_rugby.jpg",
            thumbnail: "/src/assets/images/photos/petra_rugby.jpg",
            alt: "Fitness training",
            title: "Fitness & Conditioning",
            description: "Building strength and endurance",
            album: "training",
            date: "2024-03-08",
        },
        {
            id: 5,
            type: "video",
            src: "https://www.youtube.com/embed/5w2mBzgmUIo",
            thumbnail: "/src/assets/images/photos/lucija_rugby.jpg",
            alt: "Training highlights video",
            title: "Training Highlights",
            description: "Best moments from this week's training sessions",
            album: "training",
            date: "2024-03-05",
        },
        {
            id: 6,
            type: "image",
            src: "/src/assets/images/photos/josipa_rugby.jpg",
            thumbnail: "/src/assets/images/photos/josipa_rugby.jpg",
            alt: "Try scoring moment",
            title: "Winning Try",
            description: "The moment that sealed our victory",
            album: "matches",
            date: "2024-02-28",
        },
        {
            id: 7,
            type: "image",
            src: "/src/assets/images/photos/petra1_rugby.jpg",
            thumbnail: "/src/assets/images/photos/petra1_rugby.jpg",
            alt: "Team huddle",
            title: "Team Strategy Meeting",
            description: "Planning our next move during halftime",
            album: "training",
            date: "2024-03-12",
        },
        {
            id: 8,
            type: "image",
            src: "/src/assets/images/photos/teuta_rugby.jpg",
            thumbnail: "/src/assets/images/photos/teuta_rugby.jpg",
            alt: "Team group photo",
            title: "Season Opener",
            description: "Ready for another amazing season",
            album: "community",
            date: "2024-02-20",
        },
        {
            id: 9,
            type: "image",
            src: "/src/assets/images/photos/manuela_rugby.jpg",
            thumbnail: "/src/assets/images/photos/manuela_rugby.jpg",
            alt: "Action shot during match",
            title: "Championship Quarter-Final",
            description: "Fighting for every meter in the championship",
            album: "matches",
            date: "2024-02-25",
        },
        {
            id: 10,
            type: "image",
            src: "/src/assets/images/photos/margaux_rugby.jpg",
            thumbnail: "/src/assets/images/photos/margaux_rugby.jpg",
            alt: "Training equipment",
            title: "Equipment Check",
            description: "Making sure everything is ready for the big game",
            album: "training",
            date: "2024-02-18",
        },
        {
            id: 11,
            type: "image",
            src: "/src/assets/images/photos/petra_rugby.jpg",
            thumbnail: "/src/assets/images/photos/petra_rugby.jpg",
            alt: "Community event",
            title: "Youth Rugby Workshop",
            description: "Teaching the next generation about rugby",
            album: "community",
            date: "2024-02-15",
        },
        {
            id: 12,
            type: "image",
            src: "/src/assets/images/photos/lucija_rugby.jpg",
            thumbnail: "/src/assets/images/photos/lucija_rugby.jpg",
            alt: "Victory celebration",
            title: "Tournament Champions",
            description: "Our biggest victory of the season",
            album: "matches",
            date: "2024-02-10",
        },
    ];

    const filteredItems =
        selectedAlbum === "all"
            ? galleryItems
            : galleryItems.filter((item) => item.album === selectedAlbum);

    const imageItems = filteredItems.filter((item) => item.type === "image");

    const openLightbox = (imageId) => {
        const imageIndex = imageItems.findIndex((item) => item.id === imageId);
        if (imageIndex !== -1) {
            setCurrentImageIndex(imageIndex);
            setLightboxOpen(true);
        }
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === imageItems.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? imageItems.length - 1 : prev - 1
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-surface">
            {/* Hero Section */}
            <div className="relative h-[500px] overflow-hidden mt-20">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="absolute inset-0 bg-[url('/src/assets/images/photos/margaux_rugby.jpg')] bg-cover bg-center opacity-30"></div>

                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center max-w-4xl mx-auto px-6 sm:px-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 tracking-wide text-text-light leading-tight">
                            CAPTURING MOMENTS. SHARING STORIES.
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                size="lg"
                                className="bg-surface/95 backdrop-blur-sm text-text-contrast hover:bg-surface hover:scale-105 px-8 py-3 text-base font-medium rounded transition-all duration-300 shadow-lg hover:shadow-xl"
                                asChild
                            >
                                <Link to="/contact">Join Our Team</Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-text-light/80 bg-surface/10 backdrop-blur-sm text-text-light hover:bg-surface hover:text-text-contrast px-8 py-3 text-base font-medium rounded transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                                asChild
                            >
                                <Link to="/team">Meet Our Players</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-16 max-w-7xl mx-auto">
                {/* Intro Section */}
                <AnimatedSection divider="wave" className="mb-8">
                    <div className="relative h-[600px] overflow-hidden rounded group cursor-pointer">
                        <img
                            src="/src/assets/images/photos/teuta_rugby.jpg"
                            alt="Our story in pictures"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-text-contrast/90 via-text-contrast/50 to-transparent"></div>
                        <div className="absolute inset-0 p-8 sm:p-10 lg:p-12 flex flex-col justify-end text-text-light">
                            <div className="mb-6">
                                <h2 className="text-4xl font-bold text-text-light mb-2 tracking-wide">
                                    OUR STORY IN PICTURES
                                </h2>
                                <p className="text-lg text-text-light/80 mb-4">
                                    Every training session, match, and
                                    celebration tells our story.
                                </p>
                            </div>
                            <div className="space-y-4 text-text-light/90 leading-relaxed max-w-3xl">
                                <p>
                                    From intense training sessions to triumphant
                                    matches, these moments capture the spirit,
                                    dedication, and joy of Zagreb Rugby Ladies.
                                </p>
                                <p>
                                    Each photo tells a story of determination,
                                    friendship, and the incredible journey of
                                    women who dared to step onto the rugby
                                    field.
                                </p>
                            </div>
                            <div className="text-center mt-6">
                                <Button
                                    className="bg-surface text-text-contrast hover:bg-muted-light rounded px-8"
                                    asChild
                                >
                                    <Link to="/contact">
                                        Be Part of Our Story
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Album Filter */}
                <div className="mb-8">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-contrast mb-4 tracking-tight">
                            Gallery Collections
                        </h2>
                        <p className="text-lg text-muted max-w-2xl mx-auto">
                            Explore our memories organized by moments that
                            matter most to us.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        {albums.map((album) => (
                            <Button
                                key={album.id}
                                variant={
                                    selectedAlbum === album.id
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                onClick={() => setSelectedAlbum(album.id)}
                                className="flex items-center gap-2"
                            >
                                {album.name}
                                <span className="text-xs opacity-75">
                                    ({album.count})
                                </span>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className="mb-8">
                    {filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                            {filteredItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="relative h-[350px] overflow-hidden rounded group cursor-pointer"
                                    onClick={() => {
                                        if (item.type === "image") {
                                            openLightbox(item.id);
                                        } else if (item.type === "video") {
                                            window.open(item.src, "_blank");
                                        }
                                    }}
                                >
                                    <img
                                        src={item.thumbnail || item.src}
                                        alt={item.alt}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-text-contrast/0 group-hover:bg-text-contrast/20 transition-colors duration-300" />

                                    {/* Title overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                        <h3 className="text-text-light font-medium text-sm mb-1 line-clamp-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-text-light/80 text-xs line-clamp-1">
                                            {formatDate(item.date)}
                                        </p>
                                    </div>

                                    {/* Video indicator */}
                                    {item.type === "video" && (
                                        <div className="absolute top-3 right-3 p-2 rounded-full bg-text-contrast/70">
                                            <Play className="h-4 w-4 text-text-light" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted text-lg">
                                No photos found for the selected album.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => setSelectedAlbum("all")}
                                className="mt-4"
                            >
                                Show All Photos
                            </Button>
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Gallery Stats */}
                    <div className="bg-surface rounded-xl p-8 border border-muted-light hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                            <Calendar className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-6 text-text-contrast">
                            Our Collection
                        </h3>
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-muted-light/50 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-primary mb-1">
                                    {galleryItems.length}
                                </div>
                                <div className="text-xs text-muted font-medium">
                                    Total Media
                                </div>
                            </div>
                            <div className="bg-muted-light/50 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-primary mb-1">
                                    {
                                        galleryItems.filter(
                                            (item) => item.type === "image"
                                        ).length
                                    }
                                </div>
                                <div className="text-xs text-muted font-medium">
                                    Photos
                                </div>
                            </div>
                            <div className="bg-muted-light/50 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-primary mb-1">
                                    {
                                        galleryItems.filter(
                                            (item) => item.type === "video"
                                        ).length
                                    }
                                </div>
                                <div className="text-xs text-muted font-medium">
                                    Videos
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <Button
                                className="bg-primary text-text-light hover:bg-primary-dark rounded-lg px-8 py-3"
                                asChild
                            >
                                <Link to="/contact">Join Our Story</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Recent Highlights */}
                    <div className="bg-surface rounded-xl p-8 border border-muted-light hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                        <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                            <Play className="h-8 w-8 text-accent" />
                        </div>
                        <h3 className="text-2xl font-bold mb-6 text-text-contrast">
                            Recent Highlights
                        </h3>
                        <div className="space-y-4 mb-8">
                            {[
                                "Championship Victory 2024",
                                "New Player Recruitment Drive",
                                "Community Outreach Program",
                                "International Friendly Match",
                            ].map((highlight, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center p-3 bg-muted-light/50 rounded-lg"
                                >
                                    <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-accent text-sm font-bold">
                                            •
                                        </span>
                                    </div>
                                    <p className="text-muted font-medium">
                                        {highlight}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            <Button
                                className="bg-primary text-text-light hover:bg-primary-dark rounded-lg px-8 py-3"
                                asChild
                            >
                                <Link to="/team">Meet Our Team</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="relative h-[700px] overflow-hidden rounded group cursor-pointer">
                    <img
                        src="/src/assets/images/photos/petra1_rugby.jpg"
                        alt="Join our story"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-text-contrast/70 via-text-contrast/30 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-2xl ml-12 text-text-light">
                            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                Want to Be Part of These Moments?
                            </h2>
                            <p className="text-xl mb-8 opacity-90 leading-relaxed">
                                Join Zagreb Rugby Ladies and create your own
                                unforgettable memories. Every training session,
                                every match, every celebration could include
                                you.
                            </p>
                            <div className="flex gap-4">
                                <Button
                                    size="lg"
                                    className="bg-surface text-text-contrast hover:bg-muted-light rounded px-8 py-4 text-lg font-semibold"
                                    asChild
                                >
                                    <Link to="/contact">Join Training</Link>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-text-light text-text-light hover:bg-surface hover:text-text-contrast rounded px-8 py-4 text-lg font-semibold flex items-center gap-2"
                                    asChild
                                >
                                    <Link to="/team">Meet Our Players</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <Lightbox
                images={imageItems}
                isOpen={lightboxOpen}
                currentIndex={currentImageIndex}
                onClose={closeLightbox}
                onNext={nextImage}
                onPrev={prevImage}
            />
        </div>
    );
};

export default Gallery;
