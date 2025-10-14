import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const { t } = useTranslation();

    const navigationItems = [
        { name: t("navigation.home"), href: "/" },
        { name: t("navigation.about"), href: "/about" },
        { name: t("navigation.team"), href: "/team" },
        { name: t("navigation.schedule"), href: "/schedule" },
        { name: t("navigation.rugby101"), href: "/rugby101" },
        { name: t("navigation.gallery"), href: "/gallery" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = () => {
            setIsMenuOpen(false);
        };
        if (isMenuOpen) {
            document.addEventListener("click", handleClickOutside);
            return () =>
                document.removeEventListener("click", handleClickOutside);
        }
    }, [isMenuOpen]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    const isActiveRoute = (path) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };

    return (
        <>
            <header
                className={[
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "bg-surface/95 backdrop-blur-md shadow-sm"
                        : "bg-surface/90 backdrop-blur-sm",
                ].join(" ")}
            >
                <div className="bg-primary text-center py-1 text-sm text-muted-light hidden sm:block">
                    {t("header.banner")}
                </div>

                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center gap-4">
                        <Link
                            to="/"
                            className="flex items-center space-x-2 focus-visible:outline-none flex-shrink-0"
                        >
                            <img
                                src="src/assets/images/logos/zagreb-rugby-ladies-logo-vector.png"
                                alt="Zagreb Rugby Ladies Logo"
                                className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 object-contain"
                            />
                            <span className="text-base sm:text-lg font-semibold text-text-contrast tracking-wide hidden sm:block">
                                Zagreb Rugby Ladies
                            </span>
                        </Link>

                        <nav className="hidden lg:flex items-center space-x-2 xl:space-x-6 flex-1 justify-center">
                            {navigationItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.href}
                                    className={[
                                        "relative text-text-contrast font-medium text-sm py-2 px-2 xl:px-3 transition-all duration-200 group whitespace-nowrap",
                                        isActiveRoute(item.href)
                                            ? "font-semibold"
                                            : "",
                                    ].join(" ")}
                                >
                                    {item.name}
                                    {/* Hover underline */}
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-200 group-hover:w-full"></span>
                                    {/* Active underline */}
                                    {isActiveRoute(item.href) && (
                                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"></span>
                                    )}
                                </Link>
                            ))}

                            <Button size="sm" variant="yellow" asChild>
                                <Link to="/contact">{t("common.joinUs")}</Link>
                            </Button>
                        </nav>

                        <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
                            <div className="hidden lg:block">
                                <LanguageSwitcher variant="header" />
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMenuOpen(!isMenuOpen);
                                }}
                                className="lg:hidden p-2 rounded-lg text-text-contrast hover:bg-muted-light"
                                aria-label={t("header.toggleMenu")}
                                aria-expanded={isMenuOpen}
                            >
                                {isMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-text-contrast/50 backdrop-blur-sm" />

                    <div
                        className="absolute top-0 right-0 h-full w-full max-w-sm bg-surface shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-4 border-b border-muted-light">
                            <div className="flex items-center space-x-2">
                                <img
                                    src="/zagreb-rugby-logo.png"
                                    alt="Zagreb Rugby Ladies Logo"
                                    className="h-8 w-8 object-contain"
                                />
                                <span className="text-base font-semibold text-text-contrast">
                                    {t("navigation.menu")}
                                </span>
                            </div>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 rounded-lg text-muted hover:bg-muted-light"
                                aria-label={t("header.closeMenu")}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <nav className="p-4 space-y-1">
                            {navigationItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.href}
                                    className={[
                                        "block px-4 py-3 rounded-lg text-base font-medium hover:bg-muted-light transition-all duration-200",
                                        isActiveRoute(item.href)
                                            ? "bg-accent text-text-light font-semibold"
                                            : "text-text-contrast",
                                    ].join(" ")}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="p-4 border-t border-muted-light mt-auto space-y-3">
                            <LanguageSwitcher variant="mobile" />
                            <Button variant="yellow" asChild>
                                <Link to="/contact">{t("common.joinUs")}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export { Header };
