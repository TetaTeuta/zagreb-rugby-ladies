import { Button } from "../ui/Button";
import { Link } from "react-router-dom";

const Highlights = ({ highlights, title = "Why Choose Rugby?" }) => {
    return (
        <div className="relative h-[462px] overflow-hidden rounded-custom group cursor-pointer">
            <img
                src="src/assets/images/players/rugby-woman-training-out-lift.jpg"
                alt="Rugby highlights"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute inset-0 p-8 flex flex-col text-text-light">
                <h3 className="text-3xl font-light tracking-wide font-hero text-text-light leading-[0.85] uppercase mb-6">
                    {title}
                </h3>
                <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-3 mb-6">
                        {highlights.map((highlight, index) => {
                            const Icon = highlight.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex items-center space-x-4 bg-surface/20 backdrop-blur-sm rounded-custom p-4 border border-accent/30"
                                >
                                    <div className="w-12 h-12 bg-surface/30 backdrop-blur-sm rounded-full flex items-center justify-center text-accent flex-shrink-0 border border-accent/40">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-light tracking-wide uppercase text-text-light">
                                            {highlight.title}
                                        </h4>
                                        <p className="text-sm text-text-light/80">
                                            {highlight.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="text-center">
                        <Button
                            className="bg-surface text-text-contrast hover:bg-muted-light rounded-custom px-8 w-full sm:w-auto"
                            asChild
                        >
                            <Link to="/rugby101">Learn More</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Highlights };
