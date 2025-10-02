import { useState, useEffect } from "react";

const Countdown = ({ targetDate, className = "" }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const timeUnits = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
    ];

    return (
        <div className={`flex justify-center ${className}`}>
            <div className="flex gap-4 sm:gap-6 lg:gap-8">
                {timeUnits.map((unit, index) => (
                    <div key={unit.label} className="text-center">
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-text-light font-mono tracking-wide">
                            {String(unit.value).padStart(2, "0")}
                        </div>
                        <div className="text-xs sm:text-sm text-text-light/80 uppercase tracking-wide mt-1">
                            {unit.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { Countdown };
