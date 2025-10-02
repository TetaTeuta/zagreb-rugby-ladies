import { forwardRef } from "react";

const Input = forwardRef(
    ({ type = "text", className = "", error = false, ...props }, ref) => {
        const classes = [
            "flex h-11 w-full rounded-xl border bg-surface px-3 py-2 text-sm transition-colors duration-normal",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
                ? "border-error focus-visible:ring-error"
                : "border-border focus-visible:ring-border-focus",
            className,
        ].join(" ");

        return <input type={type} className={classes} ref={ref} {...props} />;
    }
);

const Textarea = forwardRef(
    ({ className = "", error = false, ...props }, ref) => {
        const classes = [
            "flex min-h-[80px] w-full rounded-xl border bg-surface px-3 py-2 text-sm transition-colors duration-normal",
            "placeholder:text-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
                ? "border-error focus-visible:ring-error"
                : "border-border focus-visible:ring-border-focus",
            className,
        ].join(" ");

        return <textarea className={classes} ref={ref} {...props} />;
    }
);

const Label = forwardRef(({ className = "", ...props }, ref) => {
    const classes = [
        "text-sm font-hero font-light leading-none text-text peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
    ].join(" ");

    return <label ref={ref} className={classes} {...props} />;
});

const Select = forwardRef(
    ({ className = "", error = false, children, ...props }, ref) => {
        const classes = [
            "flex h-11 w-full rounded-xl border bg-surface px-3 py-2 text-sm transition-colors duration-normal",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
                ? "border-error focus-visible:ring-error"
                : "border-border focus-visible:ring-border-focus",
            className,
        ].join(" ");

        return (
            <select className={classes} ref={ref} {...props}>
                {children}
            </select>
        );
    }
);

Input.displayName = "Input";
Textarea.displayName = "Textarea";
Label.displayName = "Label";
Select.displayName = "Select";

export { Input, Textarea, Label, Select };
