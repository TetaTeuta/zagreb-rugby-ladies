import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const AnimatedSection = ({
    children,
    className = "",
    delay = 0,
    divider = null, // "wave" or "angled"
}) => {
    const [ref, isVisible] = useScrollAnimation(0.1, "0px 0px -100px 0px");

    const delayClass = delay > 0 ? `delay-${delay}` : "";
    const dividerClass = divider ? `${divider}-divider` : "";

    return (
        <div
            ref={ref}
            className={`fade-in-up ${delayClass} ${dividerClass} ${
                isVisible ? "animate" : ""
            } ${className}`}
        >
            {children}
        </div>
    );
};

export { AnimatedSection };
