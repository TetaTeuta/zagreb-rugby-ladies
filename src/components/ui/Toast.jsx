import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

const Toast = ({
    type = "info",
    title,
    message,
    isVisible,
    onClose,
    duration = 5000,
    className = "",
}) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const icons = {
        success: CheckCircle,
        error: XCircle,
        warning: AlertCircle,
        info: Info,
    };

    const styles = {
        success: "border-success bg-success text-white",
        error: "border-error bg-error text-white",
        warning: "border-warning bg-warning text-white",
        info: "border-primary bg-primary text-white",
    };

    const iconStyles = {
        success: "text-white",
        error: "text-white",
        warning: "text-white",
        info: "text-white",
    };

    const Icon = icons[type];

    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
            if (duration > 0) {
                const timer = setTimeout(() => {
                    handleClose();
                }, duration);
                return () => clearTimeout(timer);
            }
        }
    }, [isVisible, duration]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            onClose?.();
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <div
            className={[
                "fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ease-in-out",
                isAnimating
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0",
                className,
            ].join(" ")}
        >
            <div
                className={[
                    "rounded-xl border-2 p-4 shadow-2xl backdrop-blur-sm",
                    styles[type],
                ].join(" ")}
            >
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <Icon
                            className={["h-5 w-5", iconStyles[type]].join(" ")}
                        />
                    </div>
                    <div className="ml-3 flex-1">
                        {title && (
                            <h3 className="text-sm font-medium">{title}</h3>
                        )}
                        {message && (
                            <p
                                className={[
                                    "text-sm",
                                    title ? "mt-1" : "",
                                ].join(" ")}
                            >
                                {message}
                            </p>
                        )}
                    </div>
                    <div className="ml-4 flex-shrink-0">
                        <button
                            onClick={handleClose}
                            className="inline-flex rounded-md p-1.5 transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
                            aria-label="Close notification"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Toast provider/context for global toast management
const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (toast) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { ...toast, id }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <>
            {children}
            <div className="fixed top-0 right-0 z-50 space-y-2 p-4">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        isVisible={true}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </>
    );
};

export { Toast, ToastProvider };
