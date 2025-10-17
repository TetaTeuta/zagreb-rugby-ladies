import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = (threshold = 0.1, rootMargin = "0px") => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once animated, we can disconnect the observer
                    observer.disconnect();
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        if (ref.current) {
            // Check if element is already visible in viewport on mount
            const rect = ref.current.getBoundingClientRect();
            const isInViewport =
                rect.top < window.innerHeight &&
                rect.bottom > 0 &&
                rect.left < window.innerWidth &&
                rect.right > 0;

            if (isInViewport) {
                // Element already visible, trigger animation immediately
                setIsVisible(true);
            } else {
                // Element not visible yet, observe it
                observer.observe(ref.current);
            }
        }

        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin]);

    return [ref, isVisible];
};
