import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe, ChevronDown } from "lucide-react";

const LanguageSwitcher = ({ className = "", variant = "default" }) => {
    const { i18n, t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { code: "en", name: t("language.english"), flag: "🇺🇸" },
        { code: "hr", name: t("language.croatian"), flag: "🇭🇷" },
    ];

    const currentLanguage =
        languages.find((lang) => lang.code === i18n.language) || languages[0];

    const handleLanguageChange = (languageCode) => {
        i18n.changeLanguage(languageCode);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const baseClasses =
        "relative inline-flex items-center justify-center transition-all duration-normal";

    const variants = {
        default:
            "bg-surface border border-border rounded-lg hover:bg-muted-light/20 hover:border-border-focus",
        header: "bg-surface/10 backdrop-blur-sm border border-text-light/20 rounded-lg hover:bg-surface/20 text-text-light",
        mobile: "w-full bg-surface border border-border rounded-lg hover:bg-muted-light/20",
    };

    const buttonClasses = [
        baseClasses,
        variants[variant],
        "px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
        className,
    ].join(" ");

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={buttonClasses}
                aria-label={t("language.switchTo", {
                    language: currentLanguage.name,
                })}
                aria-expanded={isOpen}
            >
                <Globe className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{currentLanguage.name}</span>
                <span className="sm:hidden">{currentLanguage.flag}</span>
                <ChevronDown
                    className={`h-4 w-4 ml-1 transition-transform duration-normal ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-medium overflow-hidden z-50 animate-fade-in">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            onClick={() => handleLanguageChange(language.code)}
                            className={`w-full px-4 py-3 text-left text-sm hover:bg-muted-light/20 transition-colors duration-normal flex items-center space-x-3 ${
                                language.code === i18n.language
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-text-contrast"
                            }`}
                        >
                            <span className="text-lg">{language.flag}</span>
                            <span>{language.name}</span>
                            {language.code === i18n.language && (
                                <span className="ml-auto text-xs text-primary">
                                    ✓
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export { LanguageSwitcher };
