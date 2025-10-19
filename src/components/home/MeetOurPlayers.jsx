import { useNavigate } from "react-router-dom";
import { PlayerCard } from "../team/PlayerCard";
import { useLocalizedPath } from "../../hooks/useLocalizedPath";

const MeetOurPlayers = ({ players }) => {
    const navigate = useNavigate();
    const getLocalizedPath = useLocalizedPath();

    const handlePlayerClick = () => {
        navigate(getLocalizedPath("/team"));
    };

    return (
        <>
            {players.map((player) => (
                <div key={player.id} className="[&>div]:h-[500px]">
                    <PlayerCard
                        player={player}
                        onPlayerClick={handlePlayerClick}
                    />
                </div>
            ))}
        </>
    );
};

export { MeetOurPlayers };
