import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { useState, useEffect } from "react";

const MobileSidebar = ({ isOpen, onClose, navigationItems, isActiveRoute }) => {
    const { t } = useTranslation();
    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    // Handle animation state
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsAnimating(true);
                });
            });
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    if (!shouldRender) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={handleClose}>
            {/* Backdrop with fade transition */}
            <div
                className="absolute inset-0 bg-text-contrast/50 backdrop-blur-sm"
                style={{
                    opacity: isAnimating ? 1 : 0,
                    transition: "opacity 300ms ease-out",
                }}
            />

            {/* Sidebar panel with slide transition */}
            <div
                className="absolute top-0 right-0 h-full w-full max-w-sm bg-surface shadow-2xl flex flex-col"
                style={{
                    transform: isAnimating
                        ? "translateX(0)"
                        : "translateX(100%)",
                    transition: "transform 300ms ease-out",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-muted-light">
                    <div className="flex items-center space-x-2">
                        <img
                            src="src/assets/images/logos/zagreb-rugby-ladies-logo-vector.png"
                            alt="Zagreb Rugby Ladies Logo"
                            className="h-8 w-8 object-contain"
                        />
                        <span className="text-base font-semibold text-text-contrast">
                            {t("navigation.menu")}
                        </span>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-custom text-muted hover:bg-muted-light transition-colors duration-200"
                        aria-label={t("header.closeMenu")}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {navigationItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.href}
                            onClick={handleClose}
                            className={[
                                "block px-4 py-3 rounded-custom text-base font-medium hover:bg-muted-light transition-all duration-200",
                                isActiveRoute(item.href)
                                    ? "bg-primary text-text-light font-semibold"
                                    : "text-text-contrast",
                            ].join(" ")}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-muted-light space-y-3 mt-auto">
                    <LanguageSwitcher variant="mobile" />
                    <Button variant="yellow" asChild className="w-full">
                        <Link to="/contact" onClick={handleClose}>
                            {t("common.joinUs")}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export { MobileSidebar };
