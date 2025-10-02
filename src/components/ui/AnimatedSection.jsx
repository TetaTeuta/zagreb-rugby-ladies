import { useScrollAnimation } from "../../hooks/useScrollAnimation";

/**
 * AnimatedSection - Centralized animation wrapper for consistent transitions
 *
 * Provides a unified fade-in + upward slide animation for all content sections.
 * Uses Intersection Observer for performant scroll-triggered animations.
 *
 * @param {ReactNode} children - Content to animate
 * @param {string} className - Additional CSS classes
 * @param {number} delay - Animation delay (0-3, maps to 0.1s-0.3s increments)
 * @param {string} divider - Optional divider style ("wave" or "angled")
 *
 * Animation: Fade-in with 40px upward slide, 0.8s ease-out timing
 * Trigger: When element enters viewport (10% threshold, 100px margin)
 */
const AnimatedSection = ({
    children,
    className = "",
    delay = 0,
    divider = null,
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
