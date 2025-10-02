import { Button } from "../ui/Button";

const PlayerCard = ({ player, onPlayerClick, imagePath }) => {
    // Use local rugby photos as placeholders with correct import paths
    const placeholderImages = [
        "src/assets/images/photos/petra_rugby.jpg",
        "src/assets/images/photos/lucija_rugby.jpg",
        "src/assets/images/photos/manuela_rugby.jpg",
        "src/assets/images/photos/margaux_rugby.jpg",
        "src/assets/images/photos/teuta_rugby.jpg",
        "src/assets/images/photos/josipa_rugby.jpg",
        "src/assets/images/photos/petra1_rugby.jpg",
    ];

    // Use provided imagePath or fallback to placeholder
    const imageIndex = player.id % placeholderImages.length;
    const playerImage =
        imagePath || player.photo || placeholderImages[imageIndex];

    return (
        <div
            className="relative h-[400px] overflow-hidden rounded group cursor-pointer"
            onClick={() => onPlayerClick(player)}
        >
            <img
                src={playerImage}
                alt={player.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-text-light">
                <h3 className="text-lg font-light tracking-wide uppercase mb-1">
                    {player.name}
                </h3>
                <p className="text-sm opacity-90 mb-3 font-light">
                    {player.position}
                </p>
                <Button
                    size="sm"
                    className="bg-surface text-text-contrast hover:bg-muted-light rounded px-4 py-1 text-xs font-medium"
                >
                    View Profile
                </Button>
            </div>
        </div>
    );
};

export { PlayerCard };
