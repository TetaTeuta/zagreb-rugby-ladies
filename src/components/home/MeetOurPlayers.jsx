import { useNavigate } from "react-router-dom";
import { PlayerCard } from "../team/PlayerCard";

const MeetOurPlayers = ({ players }) => {
    const navigate = useNavigate();

    const handlePlayerClick = () => {
        navigate("/team");
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
