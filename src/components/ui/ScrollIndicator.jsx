import { ChevronDown } from "lucide-react";

const ScrollIndicator = ({ className = "" }) => {
    const handleScrollDown = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={handleScrollDown}
            className={`absolute bottom-4 right-4 z-10 lg:hidden ${className}`}
            aria-label="Scroll down to see more content"
        >
            <div className="w-8 h-8 rounded-full bg-text-light/10 backdrop-blur-sm border border-text-light/30 flex items-center justify-center hover:bg-text-light/20 hover:border-text-light/50 transition-all duration-300 active:scale-95">
                <ChevronDown className="h-5 w-5 text-text-light" />
            </div>
        </button>
    );
};

export { ScrollIndicator };
