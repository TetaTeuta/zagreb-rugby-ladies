import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = (threshold = 0.1, rootMargin = "0px") => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
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
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [isVisible, threshold, rootMargin]);

    return [ref, isVisible];
};
