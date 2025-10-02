import { forwardRef } from "react";

const Container = forwardRef(
    (
        {
            children,
            className = "",
            size = "default",
            floating = true,
            ...props
        },
        ref
    ) => {
        const sizes = {
            sm: "max-w-4xl",
            default: "max-w-7xl",
            lg: "max-w-8xl",
            full: "max-w-none",
        };

        const baseClasses = "mx-auto px-4 sm:px-6 lg:px-8";

        const containerClasses = floating
            ? [baseClasses, "py-4 sm:py-8", className].join(" ")
            : [baseClasses, className].join(" ");

        const contentClasses = floating
            ? [
                  "rounded-2xl bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80 shadow-float border border-accent/10 p-6 sm:p-8 lg:p-12",
                  sizes[size],
              ].join(" ")
            : [sizes[size]].join(" ");

        return (
            <div ref={ref} className={containerClasses} {...props}>
                {floating ? (
                    <div className={contentClasses}>{children}</div>
                ) : (
                    <div className={contentClasses}>{children}</div>
                )}
            </div>
        );
    }
);

const Section = forwardRef(
    ({ children, className = "", id, ...props }, ref) => {
        const classes = ["py-12 sm:py-16 lg:py-20", className].join(" ");

        return (
            <section ref={ref} id={id} className={classes} {...props}>
                {children}
            </section>
        );
    }
);

Container.displayName = "Container";
Section.displayName = "Section";

export { Container, Section };
