import { Button } from "../ui/Button";
import { Link } from "react-router-dom";

const TrainingSchedule = ({ trainingData }) => {
    return (
        <div className="relative h-[462px] overflow-hidden rounded group cursor-pointer">
            <img
                src="/src/assets/images/photos/margaux_rugby.jpg"
                alt="Training session"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute inset-0 p-8 flex flex-col text-text-light">
                <h3 className="text-3xl font-light tracking-wide font-hero text-text-light leading-[0.85] uppercase mb-6">
                    TRAINING SCHEDULE
                </h3>
                <div className="flex-1 flex flex-col justify-between">
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {trainingData.schedule.map((session, index) => (
                            <div
                                key={index}
                                className="bg-surface/20 backdrop-blur-sm rounded p-3 text-center border border-accent/30"
                            >
                                <div className="text-xs text-text-light/80 uppercase tracking-wide mb-1">
                                    {session.day}
                                </div>
                                <div className="text-lg font-light text-text-light mb-1">
                                    {session.time}
                                </div>
                                <div className="text-xs text-text-light/90">
                                    {session.type}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mb-4">
                        <p className="text-text-light/90 text-sm mb-2">
                            Training at{" "}
                            <span className="font-semibold text-text-light">
                                {trainingData.location.name}
                            </span>
                        </p>
                    </div>
                    <div className="text-center">
                        <Button
                            className="bg-surface text-text-contrast hover:bg-muted-light rounded px-8"
                            asChild
                        >
                            <Link to="/contact">Join Training</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { TrainingSchedule };
