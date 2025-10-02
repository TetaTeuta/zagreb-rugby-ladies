import { forwardRef } from "react";

const Card = forwardRef(
    ({ children, className = "", hover = true, ...props }, ref) => {
        const classes = [
            "bg-surface border border-border rounded-xl overflow-hidden",
            "group relative",
            hover &&
                "hover:shadow-soft hover:border-border-light transition-all duration-normal",
            "focus-within:ring-2 focus-within:ring-border-focus focus-within:ring-offset-2",
            className,
        ]
            .filter(Boolean)
            .join(" ");

        return (
            <div ref={ref} className={classes} {...props}>
                {children}
            </div>
        );
    }
);

const CardHeader = forwardRef(({ children, className = "", ...props }, ref) => {
    const classes = ["flex flex-col space-y-1.5 p-6", className]
        .filter(Boolean)
        .join(" ");

    return (
        <div ref={ref} className={classes} {...props}>
            {children}
        </div>
    );
});

const CardTitle = forwardRef(({ children, className = "", ...props }, ref) => {
    const classes = [
        "text-xl font-hero font-light leading-[0.85] tracking-wide text-text-contrast",
        "group-hover:text-primary transition-colors duration-normal",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <h3 ref={ref} className={classes} {...props}>
            {children}
        </h3>
    );
});

const CardDescription = forwardRef(
    ({ children, className = "", ...props }, ref) => {
        const classes = [
            "text-sm text-text-contrast group-hover:text-text-contrast/80 transition-colors duration-normal",
            className,
        ]
            .filter(Boolean)
            .join(" ");

        return (
            <p ref={ref} className={classes} {...props}>
                {children}
            </p>
        );
    }
);

const CardContent = forwardRef(
    ({ children, className = "", ...props }, ref) => {
        const classes = ["p-6 pt-0", className].filter(Boolean).join(" ");

        return (
            <div ref={ref} className={classes} {...props}>
                {children}
            </div>
        );
    }
);

const CardFooter = forwardRef(({ children, className = "", ...props }, ref) => {
    const classes = ["flex items-center p-6 pt-0", className]
        .filter(Boolean)
        .join(" ");

    return (
        <div ref={ref} className={classes} {...props}>
            {children}
        </div>
    );
});

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
CardDescription.displayName = "CardDescription";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";

export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
};
