import { forwardRef } from "react";

const Button = forwardRef(
    (
        {
            children,
            variant = "blue",
            size = "md",
            className = "",
            disabled = false,
            loading = false,
            ...props
        },
        ref
    ) => {
        const baseClasses =
            "inline-flex items-center justify-center rounded-sm font-semibold tracking-wide uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg";

        const variants = {
            blue: "btn-blue",
            yellow: "btn-yellow",
        };

        const sizes = {
            sm: "min-h-[44px] px-6 text-sm",
            md: "min-h-[48px] px-8 text-base",
            lg: "min-h-[52px] px-10 text-base",
            xl: "min-h-[56px] px-12 text-base",
        };

        const classes = [
            baseClasses,
            variants[variant],
            sizes[size],
            className,
        ].join(" ");

        return (
            <button
                ref={ref}
                className={classes}
                disabled={disabled || loading}
                {...props}
            >
                {/* Ripple effect */}
                <span className="absolute inset-0 overflow-hidden rounded">
                    <span className="absolute inset-0 translate-x-[-100%] bg-surface/20 group-hover:translate-x-[100%]" />
                </span>

                {loading && (
                    <svg
                        className="mr-2 h-4 w-4 animate-spin relative z-10"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        style={{ animationDuration: "0.8s" }}
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                <span className="relative z-10">{children}</span>
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
