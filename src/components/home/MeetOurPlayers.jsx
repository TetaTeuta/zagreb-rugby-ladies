import { Button } from "../ui/Button";
import { Link } from "react-router-dom";

const PlayerCard = ({ player, showImage = false }) => {
    return (
        <div className="flex items-center space-x-4 bg-surface/10 rounded p-4 hover:bg-surface/15 transition-colors duration-200">
            <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-text-contrast font-bold text-lg flex-shrink-0">
                {player.name.charAt(0)}
            </div>
            <div className="flex-1">
                <h4 className="font-light tracking-wide uppercase text-text-light">
                    {player.name}
                </h4>
                <p className="text-sm text-gray-300 font-light">
                    {player.position}
                </p>
                {player.quote && (
                    <p className="text-xs text-gray-400 mt-1 italic">
                        "{player.quote.substring(0, 60)}..."
                    </p>
                )}
            </div>
        </div>
    );
};

const MeetOurPlayers = ({ players, title = "Meet Our Players" }) => {
    const playerImages = [
        "/src/assets/images/photos/petra_rugby.jpg",
        "/src/assets/images/photos/lucija_rugby.jpg",
        "/src/assets/images/photos/manuela_rugby.jpg",
    ];

    return (
        <>
            {players.map((player, index) => (
                <div
                    key={player.id}
                    className="relative h-[500px] overflow-hidden rounded group cursor-pointer"
                >
                    <img
                        src={playerImages[index]}
                        alt={player.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 text-text-light">
                        <h3 className="text-2xl font-light tracking-wide uppercase mb-2">
                            {player.name}
                        </h3>
                        <p className="text-lg opacity-90 mb-4 font-light">
                            {player.position}
                        </p>
                        <Button
                            size="sm"
                            className="bg-surface text-text-contrast hover:bg-muted-light rounded px-6"
                            asChild
                        >
                            <Link to="/team">View Profile</Link>
                        </Button>
                    </div>
                </div>
            ))}
        </>
    );
};

export { MeetOurPlayers, PlayerCard };
